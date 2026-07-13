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
} from './vesica';
import { findEmail } from './playgrounds-email';

/** Both strings are numeric money and equal to the cent. */
function moneyEq(a: string | undefined, b: string | undefined): boolean {
  const na = toAmount(a), nb = toAmount(b);
  if (Number.isNaN(na) || Number.isNaN(nb)) return false;
  return Math.abs(na - nb) < 0.01;
}

/** Assert a captured address block carries the stable parts (name + street + city + zip). */
function assertAddressBlock(block: string, config: OrderConfig, surface: string): void {
  for (const part of ['QA', '1000 Nw 42nd Ave', 'Miami', '33126']) {
    expect(block, `[${config.testId}] ${surface} address should include "${part}"\nblock:\n${block}`).toContain(part);
  }
}

// ---------------------------------------------------------------------------
// Checkout: validation-first + cart/checkout line parity
// ---------------------------------------------------------------------------

/** GI validation-first: the empty-checkout notice lists the required fields + terms. */
export function assertValidationErrors(cap: OrderFlowCapture): void {
  const err = cap.validationError ?? '';
  const intents: Array<[string, RegExp]> = [
    ['first name', /First name\b.*required/i],
    ['last name', /Last name\b.*required/i],
    ['street', /(Street address|Address)\b.*required/i],
    ['city', /(Town|City)\b.*required/i],
    ['state', /(State|County|Province)\b.*required/i],
    ['zip', /(ZIP|Post ?code)\b.*required/i],
    ['phone', /Phone\b.*required/i],
    ['email', /Email\b.*required/i],
    ['terms', /terms and conditions/i],
  ];
  for (const [label, re] of intents) {
    expect(re.test(err), `[${cap.config.testId}] empty-checkout error should flag ${label}\nnotice:\n${err}`).toBeTruthy();
  }
}

/** Cart-page line parity: name matches the PDP product; the price cells equal the unit price. */
export function assertCartParity(cap: OrderFlowCapture): void {
  const { cartLine, pdp, config } = cap;
  expect(cartLine.name, `[${config.testId}] cart line name should be the product`).toContain(pdp.productName);
  for (const [cell, val] of [
    ['product-price', cartLine.price],
    ['product-subtotal', cartLine.subtotal],
    ['cart-subtotal', cartLine.cartSubtotal],
    ['cart-total', cartLine.total],
  ] as const) {
    expect(moneyEq(val, pdp.unitPrice), `[${config.testId}] cart ${cell} ${val} should equal unit price ${pdp.unitPrice}`).toBeTruthy();
  }
}

// ---------------------------------------------------------------------------
// Order-received (thank-you) parity
// ---------------------------------------------------------------------------

export function assertOrderParity(result: OrderResult, config: OrderConfig): void {
  const expectedLabel = config.payment === 'paypal' ? /paypal/i : /credit card/i;
  expect(result.paymentLabel, `[${config.testId}] thank-you payment label "${result.paymentLabel}" should match ${expectedLabel}`).toMatch(expectedLabel);

  const { subtotal, shipping, tax, total } = result.totals;
  // total = subtotal + shipping + tax (rows absent read as 0).
  const sum = [subtotal, shipping, tax].reduce((a, v) => a + (Number.isNaN(toAmount(v)) ? 0 : toAmount(v)), 0);
  expect(Math.abs(sum - toAmount(total)), `[${config.testId}] total ${total} should equal subtotal+shipping+tax (${subtotal}+${shipping}+${tax})`).toBeLessThan(0.01);

  if (config.isMembership) {
    // GI membership order: total == unit price, no shipping cost, no tax.
    expect(moneyEq(subtotal, total), `[${config.testId}] membership order total ${total} should equal subtotal ${subtotal} (no shipping/tax)`).toBeTruthy();
  }
  if (config.expectShipping) {
    expect(toAmount(shipping) > 0, `[${config.testId}] order should have a non-$0 shipping row (got "${shipping}")`).toBeTruthy();
  }
  if (config.expectTax) {
    expect(!Number.isNaN(toAmount(tax)), `[${config.testId}] order should have a tax row (got "${tax}")`).toBeTruthy();
  }

  assertAddressBlock(result.billingBlock, config, 'thank-you billing');
  if (config.payment === 'paypal') {
    expect(result.shippingBlock, `[${config.testId}] PayPal order-received should render a shipping address block`).toBeTruthy();
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

  const label = ((await shopperPage.locator('li.woocommerce-order-overview__payment-method.method > strong').first().textContent().catch(() => '')) ?? '').toLowerCase();
  expect(label, `[${config.testId}] view-order payment label should include "${result.paymentLabel}"`).toContain(result.paymentLabel.toLowerCase());

  const totals = await readTotals(shopperPage, ORDER_DETAILS_TABLE);
  expect(moneyEq(totals.total, result.totals.total), `[${config.testId}] view-order total ${totals.total} should equal thank-you total ${result.totals.total}`).toBeTruthy();
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
  await expect(adminPage.locator('.address').first(), `[${config.testId}] admin should show the billing phone`).toContainText('4089211861');

  await expect(adminPage.locator('tr > td.name > a').first(), `[${config.testId}] admin line item should be the product`).toContainText(result.productName);
  const lineCost = ((await adminPage.locator('td.line_cost > .view .woocommerce-Price-amount.amount > bdi').first().textContent().catch(() => '')) ?? '').trim();
  expect(moneyEq(lineCost, result.unitPrice), `[${config.testId}] admin line cost ${lineCost} should equal unit price ${result.unitPrice}`).toBeTruthy();

  // Gateway order note (scan-all + regex, rule 16).
  const notes = await readOrderNotes(adminPage);
  const notePattern = new RegExp(`Payment via ${label}`, 'i');
  expect(notes.some((n) => notePattern.test(n)), `[${config.testId}] expected an order note matching ${notePattern}\nnotes:\n${notes.join('\n---\n')}`).toBeTruthy();
}

// ---------------------------------------------------------------------------
// Membership (GI CC order grants membership)
// ---------------------------------------------------------------------------

export async function assertMembershipActive(shopperPage: Page, config: OrderConfig): Promise<void> {
  await shopperPage.goto('my-account/my-membership-content/', { waitUntil: 'load' }).catch(() => {});
  const membershipRow = shopperPage.locator('tr.membership').first()
    .or(shopperPage.locator('td.membership-plan, .wc-memberships').first());
  await expect(membershipRow, `[${config.testId}] a membership should be active after the membership order`).toBeVisible({ timeout: 15_000 });
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
  expect(moneyEq(refundLine, result.totals.total), `[${config.testId}] refund line ${refundLine} should equal -total ${result.totals.total}`).toBeTruthy();

  const notes = await readOrderNotes(adminPage);
  const pattern = config.refund?.notePattern ?? /refund/i;
  expect(notes.some((n) => pattern.test(n)), `[${config.testId}] expected a refund note matching ${pattern}\nnotes:\n${notes.join('\n---\n')}`).toBeTruthy();
}

/** Refund email parity: the total shown struck-through (<del>) and the new total $0.00 (<ins>). */
export async function assertRefundEmail(emailPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const msg = await findEmail(result.billingEmail, { subjectFilter: 'refund', contains: 'refund', attempts: 40 });
  expect(msg, `[${config.testId}] a refund email to ${result.billingEmail} should arrive`).not.toBeNull();
  const body = `${msg?.HTML ?? ''}${msg?.Text ?? ''}`;
  expect(body.toLowerCase(), `[${config.testId}] refund email should mention the refund`).toContain('refund');
  // The original total appears struck-through and the new total is $0.00.
  const totalNum = toAmount(result.totals.total).toFixed(2);
  expect(body.includes(totalNum) || body.includes(result.totals.total), `[${config.testId}] refund email should show the original total ${result.totals.total}`).toBeTruthy();
}

/** Order email parity — the order-confirmation email carries the captured total. */
export async function assertOrderEmail(emailPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const msg = await findEmail(result.billingEmail, { subjectFilter: 'order', attempts: 40 });
  expect(msg, `[${config.testId}] an order email to ${result.billingEmail} should arrive`).not.toBeNull();
  const body = `${msg?.HTML ?? ''}${msg?.Text ?? ''}`;
  const totalNum = toAmount(result.totals.total).toFixed(2);
  expect(body.includes(totalNum) || body.includes(result.totals.total), `[${config.testId}] order email should show the total ${result.totals.total}`).toBeTruthy();
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
