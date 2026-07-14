// ALL expect() calls live here (rule 6). Full GI parity for the Vesica user suite:
// validation-first, cart/checkout line parity, order-received rows + address,
// My-Account order view, admin backend, membership, full refund, refund email.
// Every expect carries a message (rule 19); label/field asserts match intent, not
// pinned copy (rules 26/35).
import { expect, type Page } from '@playwright/test';
import type { OrderConfig, OrderResult } from '../types/test-config';
import type { OrderFlowCapture } from './flows';
import {
  toAmount,
  readTotals,
  openAdminOrder,
  readAdminOrderStatus,
  readOrderNotes,
  goToMyAccountOrders,
  goToViewOrder,
  ORDER_DETAILS_TABLE,
  BILLING,
  SHIPPING,
  calcSubtotal,
} from './purcrystal';
import { findEmail } from './playgrounds-email';

/** Both strings are numeric money and equal to the cent. */
function moneyEq(a: string | undefined, b: string | undefined): boolean {
  const na = toAmount(a), nb = toAmount(b);
  if (Number.isNaN(na) || Number.isNaN(nb)) return false;
  return Math.abs(na - nb) < 0.01;
}

/** Assert a captured address block carries the stable parts of the order's billing
 *  address — derived from BILLING (never hardcoded), so changing BILLING (e.g. to a
 *  taxable address) keeps the assertion correct. Skips state/country (long-vs-short
 *  form differs per surface) and uses the ZIP's leading 5 digits (surfaces vary +4). */
function assertAddressBlock(block: string, config: OrderConfig, surface: string): void {
  const parts = [BILLING.firstName, BILLING.address, BILLING.city, BILLING.zip.split('-')[0]];
  for (const part of parts) {
    expect(block, `[${config.testId}] ${surface} address should include "${part}"\nblock:\n${block}`).toContain(part);
  }
}

// ---------------------------------------------------------------------------
// Checkout: validation-first + cart/checkout line parity
// ---------------------------------------------------------------------------

/** GI validation-first: the empty-checkout notice lists the required fields + terms. */
export function assertValidationErrors(cap: OrderFlowCapture): void {
  const err = cap.validationError ?? '';
  // Pur Crystal's empty-checkout notice lists first/last/street/city/zip/phone/email +
  // terms + "no shipping method" (no State line — matches the GI error text exactly).
  const intents: Array<[string, RegExp]> = [
    ['first name', /First name\b.*required/i],
    ['last name', /Last name\b.*required/i],
    ['street', /(Street address|Address)\b.*required/i],
    ['city', /(Town|City)\b.*required/i],
    ['zip', /(ZIP|Post ?code)\b.*required/i],
    ['phone', /Phone\b.*required/i],
    ['email', /Email\b.*required/i],
    ['terms', /terms and conditions/i],
    ['shipping method', /no shipping method has been selected/i],
  ];
  for (const [label, re] of intents) {
    expect(re.test(err), `[${cap.config.testId}] empty-checkout error should flag ${label}\nnotice:\n${err}`).toBeTruthy();
  }
}

/** Cart-page line parity: name matches the PDP product; the unit-price cell equals the
 *  unit price and the subtotal/total cells equal unit price × qty (GI calculateSubtotal). */
export function assertCartParity(cap: OrderFlowCapture): void {
  const { cartLine, pdp, config } = cap;
  const subtotal = calcSubtotal(pdp.unitPrice, pdp.qty);
  expect(cartLine.name, `[${config.testId}] cart line name should be the product`).toContain(pdp.productName);
  expect(Math.abs(toAmount(cartLine.price) - toAmount(pdp.unitPrice)) < 0.01,
    `[${config.testId}] cart product-price ${cartLine.price} should equal unit price ${pdp.unitPrice}`).toBeTruthy();
  for (const [cell, val] of [
    ['product-subtotal', cartLine.subtotal],
    ['cart-subtotal', cartLine.cartSubtotal],
    ['cart-total', cartLine.total],
  ] as const) {
    expect(Math.abs(toAmount(val) - subtotal) < 0.01,
      `[${config.testId}] cart ${cell} ${val} should equal unit×qty ${subtotal.toFixed(2)} (${pdp.unitPrice}×${pdp.qty})`).toBeTruthy();
  }
}

// ---------------------------------------------------------------------------
// Order-received (thank-you) parity
// ---------------------------------------------------------------------------

export function assertOrderParity(result: OrderResult, config: OrderConfig): void {
  const expectedLabel = config.payment === 'paypal' ? /paypal/i : /credit card/i;
  expect(result.paymentLabel, `[${config.testId}] thank-you payment label "${result.paymentLabel}" should match ${expectedLabel}`).toMatch(expectedLabel);

  const { subtotal, shipping, tax, total } = result.totals;
  // total = subtotal + shipping + tax (rows absent read as 0). This math check covers
  // every order shape — membership (no shipping, tax by address), physical (ship+tax) —
  // so there is no membership-specific totals rule (tax now applies via the AZ address).
  const sum = [subtotal, shipping, tax].reduce((a, v) => a + (Number.isNaN(toAmount(v)) ? 0 : toAmount(v)), 0);
  expect(Math.abs(sum - toAmount(total)), `[${config.testId}] total ${total} should equal subtotal+shipping+tax (${subtotal}+${shipping}+${tax})`).toBeLessThan(0.01);

  if (config.isMembership) {
    // Membership/virtual product: no physical shipment → no shipping COST.
    expect(toAmount(shipping) === 0 || Number.isNaN(toAmount(shipping)), `[${config.testId}] membership order should have no shipping cost (got "${shipping}")`).toBeTruthy();
  }
  if (config.expectShipping) {
    expect(toAmount(shipping) > 0, `[${config.testId}] order should have a non-$0 shipping row (got "${shipping}")`).toBeTruthy();
  }
  if (config.expectTax) {
    expect(toAmount(tax) > 0, `[${config.testId}] order should have a non-$0 tax row (got "${tax}")`).toBeTruthy();
  }

  assertAddressBlock(result.billingBlock, config, 'thank-you billing');
  if (config.shipToDifferent) {
    // GI ships to a different address → a second (shipping) block with the shipping company.
    expect(result.shippingBlock, `[${config.testId}] order-received should render a separate shipping address block`).toBeTruthy();
    expect(result.shippingBlock ?? '', `[${config.testId}] shipping block should show the shipping company "${SHIPPING.company}"\nblock:\n${result.shippingBlock}`).toContain(SHIPPING.company as string);
  }
}

// ---------------------------------------------------------------------------
// My Account (orders list + view-order)
// ---------------------------------------------------------------------------

export async function assertMyAccount(shopperPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  // Guest checkout on this site auto-creates + auto-logs-in the purchaser, so both
  // 'new' and 'logged' reach My Account; a true 'guest' (no account) would not.
  if (config.user === 'guest') return;

  await goToMyAccountOrders(shopperPage);
  const statusCell = shopperPage.locator('.woocommerce-orders-table__cell-order-status').first();
  await expect(statusCell, `[${config.testId}] orders list should show status "${config.expectedStatus}"`).toContainText(config.expectedStatus);

  await goToViewOrder(shopperPage, result.orderNumber);
  await expect(shopperPage.locator('mark.order-number').first(), `[${config.testId}] view-order should show order number ${result.orderNumber}`).toContainText(result.orderNumber);
  await expect(shopperPage.locator('mark.order-status').first(), `[${config.testId}] view-order status should be "${config.expectedStatus}"`).toContainText(config.expectedStatus);

  // Product line: name link + line total (GI asserts both on view-order).
  await expect(
    shopperPage.locator('td.product-name a[href*="/product/"], td.woocommerce-table__product-name a').first(),
    `[${config.testId}] view-order should list the product "${result.productName}"`
  ).toContainText(result.productName);
  const productTotal = ((await shopperPage.locator('td.woocommerce-table__product-total .woocommerce-Price-amount.amount > bdi, td.product-total .woocommerce-Price-amount.amount > bdi').first().textContent().catch(() => '')) ?? '');
  // Line total = subtotal (unit price × qty), not the unit price.
  expect(moneyEq(productTotal, result.totals.subtotal), `[${config.testId}] view-order product total ${productTotal} should equal line subtotal ${result.totals.subtotal}`).toBeTruthy();

  // On view-order the payment method is a ROW in the order-details table
  // ("Payment method: <label>"), not the order-received overview's `.method > strong`.
  const pmRow = shopperPage
    .locator('.woocommerce-table--order-details tfoot tr, table.shop_table.order_details tfoot tr')
    .filter({ hasText: /payment method/i })
    .first();
  const label = ((await pmRow.locator('td').first().innerText().catch(() => '')) ?? '').toLowerCase();
  expect(label, `[${config.testId}] view-order payment method row should show "${result.paymentLabel}"`).toContain(result.paymentLabel.toLowerCase());

  // Every total ROW must match the captured order-received values (not just the total).
  const totals = await readTotals(shopperPage, ORDER_DETAILS_TABLE);
  for (const row of ['subtotal', 'shipping', 'tax', 'total'] as const) {
    const captured = result.totals[row];
    // Only assert rows that exist on the captured order (absent/empty → surface omits it).
    if (!captured || Number.isNaN(toAmount(captured))) continue;
    expect(
      moneyEq(totals[row], captured),
      `[${config.testId}] view-order ${row} ${totals[row]} should equal order-received ${row} ${captured}`
    ).toBeTruthy();
  }

  // Billing address parity on view-order (GI asserts the address block here too).
  const address = ((await shopperPage.locator('.woocommerce-customer-details address').first().innerText().catch(() => '')) ?? '');
  assertAddressBlock(address, config, 'view-order billing');
}

// ---------------------------------------------------------------------------
// Admin backend (legacy post.php)
// ---------------------------------------------------------------------------

export async function assertBackend(adminPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  await openAdminOrder(adminPage, result.postId);

  await expect(adminPage.locator('h2.woocommerce-order-data__heading').first(), `[${config.testId}] admin heading should be "Order #${result.orderNumber} details"`).toContainText(`Order #${result.orderNumber}`);

  const label = config.payment === 'paypal' ? 'PayPal' : 'Credit Card';
  await expect(adminPage.locator('.woocommerce-order-data__meta').first(), `[${config.testId}] admin should show "Payment via ${label}"`).toContainText(`Payment via ${label}`);

  const status = await readAdminOrderStatus(adminPage);
  expect(status, `[${config.testId}] admin order status should be "${config.expectedStatus}"`).toContain(config.expectedStatus);

  const billing = ((await adminPage.locator('div.order_data_column:nth-of-type(2) > .address').first().innerText().catch(() => '')) ?? '');
  assertAddressBlock(billing, config, 'admin billing');
  await expect(adminPage.locator(`a[href="mailto:${result.billingEmail}"]`).first(), `[${config.testId}] admin should link the billing email ${result.billingEmail}`).toContainText(result.billingEmail);
  await expect(adminPage.locator('.address').first(), `[${config.testId}] admin should show the billing phone`).toContainText(BILLING.phone);

  // Shipping address column (GI Pur Crystal ships to a different address).
  if (config.shipToDifferent) {
    const ship = ((await adminPage.locator('div.order_data_column:nth-of-type(3) > .address').first().innerText().catch(() => '')) ?? '');
    expect(ship, `[${config.testId}] admin shipping column should show the shipping company "${SHIPPING.company}"\nblock:\n${ship}`).toContain(SHIPPING.company as string);
  }

  await expect(adminPage.locator('tr > td.name > a').first(), `[${config.testId}] admin line item should be the product`).toContainText(result.productName);
  const itemCost = ((await adminPage.locator('td.item_cost > .view .woocommerce-Price-amount.amount > bdi').first().textContent().catch(() => '')) ?? '').trim();
  expect(moneyEq(itemCost, result.unitPrice), `[${config.testId}] admin item cost ${itemCost} should equal unit price ${result.unitPrice}`).toBeTruthy();
  const lineCost = ((await adminPage.locator('td.line_cost > .view .woocommerce-Price-amount.amount > bdi').first().textContent().catch(() => '')) ?? '').trim();
  expect(moneyEq(lineCost, result.totals.subtotal), `[${config.testId}] admin line cost ${lineCost} should equal line subtotal ${result.totals.subtotal}`).toBeTruthy();

  // Gateway order note (scan-all + regex, rule 16).
  const notes = await readOrderNotes(adminPage);
  const notePattern = new RegExp(`Payment via ${label}`, 'i');
  expect(notes.some((n) => notePattern.test(n)), `[${config.testId}] expected an order note matching ${notePattern}\nnotes:\n${notes.join('\n---\n')}`).toBeTruthy();
}

// ---------------------------------------------------------------------------
// Membership (GI CC order grants membership)
// ---------------------------------------------------------------------------

export async function assertMembershipActive(shopperPage: Page, config: OrderConfig): Promise<void> {
  // GI membership signals: `tr.membership` on the My-Account dashboard (test 02) and a
  // `a[href*="my-membership-content"]` link → `td.membership-plan` + "My Membership"
  // breadcrumb (test 01). Check the dashboard first, then follow the membership link.
  await shopperPage.goto('my-account/', { waitUntil: 'load' });
  const dashboardSignal = shopperPage
    .locator('tr.membership')
    .or(shopperPage.locator('a[href*="my-membership-content"], a[href*="members-area"]'))
    .first();
  await expect(
    dashboardSignal,
    `[${config.testId}] My Account should show a membership (tr.membership or a My-Membership link) after the membership order`
  ).toBeVisible({ timeout: 15_000 });

  // Follow the membership link and confirm the membership content (plan row / breadcrumb).
  const memberLink = shopperPage.locator('a[href*="my-membership-content"], a[href*="members-area"]').first();
  if (await memberLink.count().catch(() => 0)) {
    await memberLink.click({ force: true }).catch(() => {});
    await shopperPage.waitForLoadState('load').catch(() => {});
    const content = shopperPage
      .locator('td.membership-plan')
      .or(shopperPage.locator('nav[aria-label="Breadcrumb"]').filter({ hasText: /my membership/i }))
      .or(shopperPage.locator('.wc-memberships, .my-membership'))
      .first();
    await expect(
      content,
      `[${config.testId}] the My Membership page should list the membership plan`
    ).toBeVisible({ timeout: 15_000 });
  }
}

// ---------------------------------------------------------------------------
// Refund (full — incl shipping) + refund email
// ---------------------------------------------------------------------------

/** Post-refund parity: status Refunded, a refund line for -total, refunded-total = total, refund note. */
export async function assertRefund(adminPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const expectedStatus = config.refund?.status ?? 'Refunded';
  const status = await readAdminOrderStatus(adminPage);
  expect(status, `[${config.testId}] order status after refund should be "${expectedStatus}"`).toContain(expectedStatus);

  await expect(adminPage.locator('tr.refund > td.name'), `[${config.testId}] a refund line should be added to the order`).not.toHaveCount(0);
  const refundLine = ((await adminPage.locator('tr.refund > td.line_cost > .view .woocommerce-Price-amount.amount').first().textContent().catch(() => '')) ?? '');
  // The refund line renders NEGATIVE (-$total); compare magnitudes.
  expect(
    Math.abs(Math.abs(toAmount(refundLine)) - Math.abs(toAmount(result.totals.total))) < 0.01,
    `[${config.testId}] refund line ${refundLine} should equal -total ${result.totals.total}`
  ).toBeTruthy();

  const notes = await readOrderNotes(adminPage);
  const pattern = config.refund?.notePattern ?? /refund/i;
  expect(notes.some((n) => pattern.test(n)), `[${config.testId}] expected a refund note matching ${pattern}\nnotes:\n${notes.join('\n---\n')}`).toBeTruthy();
}

/** Strip HTML tags + entities so a money amount can be matched in an email body. */
function plainText(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ').replace(/\s+/g, ' ');
}
/** True when the email body renders a money amount (matches the numeric value). */
function bodyHasAmount(body: string, val: string | undefined): boolean {
  const n = toAmount(val);
  if (Number.isNaN(n)) return true; // absent row (e.g. no shipping) — nothing to assert
  return plainText(body).includes(n.toFixed(2));
}

/**
 * Refund email parity (GI test 02 refund email): the original total is struck-through
 * (<del>) and the new total is $0.00 (<ins>) — a full refund. Assert the del/ins
 * structure carries those exact values.
 */
export async function assertRefundEmail(emailPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const msg = await findEmail(result.billingEmail, { subjectFilter: 'refund', contains: 'refund', attempts: 40 });
  expect(msg, `[${config.testId}] a refund email to ${result.billingEmail} should arrive`).not.toBeNull();
  const html = `${msg?.HTML ?? ''}`;
  const totalNum = toAmount(result.totals.total).toFixed(2);

  const dels = html.match(/<del\b[^>]*>[\s\S]*?<\/del>/gi) ?? [];
  const ins = html.match(/<ins\b[^>]*>[\s\S]*?<\/ins>/gi) ?? [];
  expect(
    dels.some((d) => plainText(d).includes(totalNum)),
    `[${config.testId}] refund email should strike through the original total ${result.totals.total} in a <del>\nhtml:\n${html.slice(0, 800)}`
  ).toBeTruthy();
  expect(
    ins.some((i) => plainText(i).includes('0.00')),
    `[${config.testId}] refund email should show the new total $0.00 in an <ins>\nhtml:\n${html.slice(0, 800)}`
  ).toBeTruthy();
}

/**
 * Order email parity (GI checkOrderOnEmail): the confirmation email carries the product,
 * subtotal, tax, total (+ shipping for a physical order) and the payment-method label —
 * all matching the captured order values.
 */
export async function assertOrderEmail(emailPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const msg = await findEmail(result.billingEmail, { subjectFilter: 'order', attempts: 40 });
  expect(msg, `[${config.testId}] an order email to ${result.billingEmail} should arrive`).not.toBeNull();
  const body = `${msg?.HTML ?? ''}${msg?.Text ?? ''}`;
  const text = plainText(body);

  expect(text, `[${config.testId}] order email should list the product "${result.productName}"`).toContain(result.productName);
  expect(bodyHasAmount(body, result.totals.subtotal), `[${config.testId}] order email should show subtotal ${result.totals.subtotal}`).toBeTruthy();
  expect(bodyHasAmount(body, result.totals.tax), `[${config.testId}] order email should show tax ${result.totals.tax}`).toBeTruthy();
  expect(bodyHasAmount(body, result.totals.total), `[${config.testId}] order email should show total ${result.totals.total}`).toBeTruthy();
  if (config.expectShipping) {
    expect(bodyHasAmount(body, result.totals.shipping), `[${config.testId}] order email should show shipping ${result.totals.shipping}`).toBeTruthy();
  }
  const label = config.payment === 'paypal' ? 'PayPal' : 'Credit Card';
  expect(text, `[${config.testId}] order email should show the payment method "${label}"`).toContain(label);
}

// ---------------------------------------------------------------------------
// Account flows
// ---------------------------------------------------------------------------

export async function assertLoggedIn(page: Page): Promise<void> {
  await expect(page.locator('.woocommerce-MyAccount-navigation'), 'my-account navigation should be visible after login').toBeVisible({ timeout: 20_000 });
}

export async function assertPasswordResetRequested(page: Page): Promise<void> {
  await expect(page.locator('.woocommerce-message, .woocommerce-info').first(), 'a password-reset confirmation notice should show').toContainText(/email|reset|link/i);
}

/** Decode the handful of HTML entities that appear in href attributes. */
function decodeHref(url: string): string {
  return url.replace(/&amp;/g, '&').replace(/&#0?38;/g, '&').replace(/&#x26;/gi, '&');
}

/**
 * Extract the set-password / reset link from the account-created (or lost-password)
 * email. The site sends through an ESP that REWRITES links as tracking redirects
 * (track.smtpsendemail.com → the real kinsta reset URL), so we can't match the reset
 * URL directly — grab the href of the "set your new password" anchor and let goto
 * follow the redirect. Falls back to a direct reset URL, then any tracking link.
 */
export async function resetLinkFromEmail(email: string): Promise<string> {
  const msg = await findEmail(email, { contains: 'password', attempts: 40 });
  expect(msg, `a set-password email to ${email} should arrive`).not.toBeNull();
  const html = msg?.HTML ?? '';
  const text = msg?.Text ?? '';

  const anchors = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  const setPwAnchor = anchors.find(([, , label]) => /set\s+(?:a\s+)?(?:your\s+)?(?:new\s+)?password|create.*password/i.test(label.replace(/<[^>]+>/g, ' ')));
  const url =
    setPwAnchor?.[1] ??
    html.match(/https?:\/\/[^\s"'<>]*(?:reset-password|lost-password|action=rp)[^\s"'<>]*/i)?.[0] ??
    text.match(/https?:\/\/[^\s"'<>]*(?:reset-password|lost-password|action=rp)[^\s"'<>]*/i)?.[0] ??
    anchors.map((a) => a[1]).find((h) => /track\.smtpsendemail|\/ls\/click|smtp/i.test(h));

  expect(url, `the email should contain a set-password link\nhtml:\n${html.slice(0, 900)}`).toBeTruthy();
  return decodeHref(url as string);
}

export async function assertPasswordWasReset(page: Page): Promise<void> {
  await expect(page.locator('.woocommerce-message, .woocommerce-MyAccount-content, body').first(), 'a password-changed confirmation should show').toContainText(/password.*(changed|reset|updated)|log in/i);
}

/** The contact form showed its success confirmation (match intent, not exact copy — rule 26). */
export async function assertContactFormSubmitted(page: Page): Promise<void> {
  await expect(
    page.locator('div.page .elementor-widget-container, .elementor-message-success, main').first(),
    'contact form should confirm the message was sent'
  ).toContainText(/message was sent|get back to you/i, { timeout: 90_000 });
}

/** A page rendered its main content — behaviour, not pinned copy (visual specs). */
export async function assertPageRenders(page: Page, name: string): Promise<void> {
  await expect(page.locator('main, #main, .elementor, article, .site-main').first(), `${name} page should render its main content`).toBeVisible({ timeout: 15_000 });
}
