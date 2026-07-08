// All expect() for the PLS suite lives here — specs stay assertion-free (rule 6,
// the only exception being toHaveScreenshot in the visual spec). Every expect
// carries a message (rule 19). Copy-text matches use intent regexes, not
// verbatim strings (rule 26), so a content tweak doesn't break the gate.
//
// Parity model: values captured by flows.ts are the source of truth. Each
// surface (cart, checkout summary, thank-you, My Account, admin, emails) must
// match them — never hardcoded literals, so the suite survives price drift
// between maintenance cycles.
import { expect, type Page } from '@playwright/test';
import type { BillingDetails, OrderConfig, OrderResult, Participant, Totals } from '../types/test-config';
import type { CartCapture, FlowCapture } from './flows';
import {
  BILLING,
  CREDENTIAL_OPTIONS,
  fillRefundForm,
  isLoggedIn,
  normalizeProductName,
  openAdminOrder,
  ORDER_DETAILS_TABLE,
  ORDER_NOTE,
  PAYMENT_LABEL,
  readTotals,
  REFUND_REASON,
  toAmount,
  waitForBlocksReady,
} from './pls';
import { expectOrderNoteMatches } from './order-notes';
import { findEmail, mailpitViewUrl, type MailpitMessage } from './playgrounds-email';
import { ctxFor, resilientClick, resilientText } from './resilient';

// ---------------------------------------------------------------------------
// Shared primitives.
// ---------------------------------------------------------------------------

/** Assert two rendered money strings are numerically equal. Both-empty = the row
 *  is legitimately absent on both surfaces (virtual course: no shipping/tax) — skip. */
function expectMoney(actual: string, expected: string, msg: string): void {
  if (!actual && !expected) return;
  expect(toAmount(actual), `${msg} — got "${actual}", expected "${expected}"`).toBeCloseTo(toAmount(expected), 2);
}

/** Full totals parity between two surfaces (subtotal / discount / total; shipping
 *  and tax ride along for future-proofing — '' on both sides today). */
function expectTotals(actual: Totals, expected: Totals, where: string): void {
  expectMoney(actual.subtotal, expected.subtotal, `${where} subtotal should match`);
  expectMoney(actual.discount, expected.discount, `${where} discount should match`);
  expectMoney(actual.shipping, expected.shipping, `${where} shipping should match`);
  expectMoney(actual.tax, expected.tax, `${where} tax should match`);
  expectMoney(actual.total, expected.total, `${where} total should match`);
}

/** Case-insensitive substring assert (labels change case per surface). */
function expectContainsCI(haystack: string, needle: string, msg: string): void {
  expect(haystack.toLowerCase(), `${msg} — got "${haystack}"`).toContain(needle.toLowerCase());
}

/**
 * Assert an address block shows the billing identity — the stable parts only
 * (names incl. the custom middle name, street, city, ZIP); state/country
 * formatting varies per surface.
 */
function assertAddressShown(addressText: string, billing: BillingDetails, where: string): void {
  for (const part of [billing.firstName, billing.middleName, billing.lastName, billing.street, billing.city, billing.zip]) {
    expect(addressText, `${where} should display the order address part "${part}"`).toContain(part);
  }
}

/** Assert a participant's identity facts all appear in one rendered text blob. */
function assertParticipantShown(blob: string, p: Participant, where: string): void {
  const text = blob.replace(/\s+/g, ' ');
  for (const part of [p.firstName, p.middleName, p.lastName, p.email, p.credentials]) {
    expect(text, `${where} should show participant detail "${part}"`).toContain(part);
  }
  // Phone renders with or without dashes depending on surface — compare digits.
  expect(text.replace(/-/g, ''), `${where} should show participant phone ${p.phone}`).toContain(p.phone.replace(/-/g, ''));
}

// ---------------------------------------------------------------------------
// Cart parity (GI Basic 14 — Cart page).
// ---------------------------------------------------------------------------

/**
 * Cart parity against the PDP capture: the line shows the course name + period,
 * the per-seat price equals the PDP price, the WCS line subscription-price is
 * qty × unit, and subtotal/total agree with it (minus any discount).
 */
export function assertCartParity(cap: CartCapture, config: { qty: number }): void {
  const { course, cart, listing } = cap;
  const unit = toAmount(course.unitPrice);

  expect(unit, `PDP price should be a real amount > 0 (got "${course.unitPrice}")`).toBeGreaterThan(0);
  // The grid listing price ("From: $18.00") must agree with the selected variation.
  expectMoney(listing.listingPrice, course.unitPrice, 'course listing price should match the PDP variation price');

  const lineName = normalizeProductName(cart.line.name);
  expect(lineName, `cart line should name the course (got "${cart.line.name}")`).toContain(normalizeProductName(course.productName));
  if (course.periodLabel) {
    expect(lineName, `cart line should carry the subscription period "${course.periodLabel}"`).toContain(normalizeProductName(course.periodLabel));
  }

  expect(cart.line.qty, `cart quantity should be ${config.qty}`).toBe(String(config.qty));
  expectMoney(cart.line.price, course.unitPrice, 'cart per-seat price should match the PDP price');

  const expectedSubtotal = (unit * config.qty).toFixed(2);
  expectMoney(cart.line.subscriptionPrice, expectedSubtotal, `cart line subscription price should be qty × unit (${config.qty} × ${course.unitPrice})`);
  expectMoney(cart.totals.subtotal, expectedSubtotal, 'cart subtotal should be qty × unit');

  const discount = Number.isNaN(toAmount(cart.totals.discount)) ? 0 : toAmount(cart.totals.discount);
  expectMoney(cart.totals.total, (toAmount(cart.totals.subtotal) - discount).toFixed(2), 'cart total should be subtotal − discount');
}

// ---------------------------------------------------------------------------
// Order parity — frontend surfaces.
// ---------------------------------------------------------------------------

/**
 * Frontend parity for a placed order: checkout summary vs cart, thank-you vs
 * checkout, participants review echoed on the thank-you, payment method label,
 * sequential order number shape, customer note, and one Active subscription per
 * seat at the per-seat price.
 */
export function assertFrontendParity(cap: FlowCapture, config: OrderConfig): void {
  const { course, cart, checkout, order, result } = cap;

  // Checkout summary vs cart (same figures, different renderer).
  expect(normalizeProductName(checkout.itemName), `checkout summary should name the course (got "${checkout.itemName}")`).toContain(
    normalizeProductName(course.productName)
  );
  expectMoney(checkout.subtotal, cart.totals.subtotal, 'checkout subtotal should match the cart subtotal');
  expectMoney(checkout.total, cart.totals.total, 'checkout total should match the cart total');

  // Thank-you vs checkout (full breakdown).
  expectTotals(order, checkout, 'thank-you vs checkout');

  // Wizard credential dropdowns: one select per seat, each carrying the full list.
  expect(cap.credentialOptions.length, `checkout should render one credentials select per seat (${config.qty})`).toBe(config.qty);
  for (const [i, opts] of cap.credentialOptions.entries()) {
    for (const expected of CREDENTIAL_OPTIONS) {
      expect(opts, `participant ${i + 1} credentials dropdown should offer "${expected}"`).toContain(expected);
    }
  }

  expect(normalizeProductName(order.productName), `thank-you product name should contain "${course.productName}" (got "${order.productName}")`).toContain(
    normalizeProductName(course.productName)
  );
  expectContainsCI(order.paymentLabel, PAYMENT_LABEL, `thank-you payment method should be "${PAYMENT_LABEL}"`);
  expect(order.email, 'thank-you should show the purchaser email').toBe(result.email);
  // Sequential order numbers (wt-sequential-order-numbers): 'O-08924', not the post id.
  expect(order.orderNumber, 'order number should look like a sequential display number').toMatch(/^O-\d+$/);
  expect(order.postId, 'the order post id should have been captured from the order-received URL').toMatch(/^\d+$/);
  expect(order.note, `thank-you should echo the customer note "${ORDER_NOTE}"`).toContain(ORDER_NOTE);

  assertAddressShown(order.address, BILLING, 'thank-you page');

  // Participants review: one block per seat, each with the full identity.
  expect(order.participantBlocks.length, `thank-you should list ${config.qty} participants`).toBe(config.qty);
  for (const [i, p] of result.participants.entries()) {
    assertParticipantShown(order.participantBlocks[i] ?? '', p, `thank-you participant #${i + 1}`);
  }

  // Related subscriptions: the order spawns one subscription per seat, each
  // Active at the per-seat price.
  expect(order.subscriptions.length, `the order should create one subscription per seat (${config.qty})`).toBe(config.qty);
  for (const sub of order.subscriptions) {
    expect(sub.status, `subscription ${sub.number} should be Active after purchase`).toMatch(/active/i);
    expectMoney(sub.total, course.unitPrice, `subscription ${sub.number} total should be the per-seat price`);
  }
}

// ---------------------------------------------------------------------------
// My Account parity.
// ---------------------------------------------------------------------------

/**
 * My Account parity (the shopper is signed in as the auto-created purchaser
 * account after checkout): the orders list shows the order with the expected
 * status, view-order repeats totals/participants/address, and the subscriptions
 * list carries one Active subscription per seat.
 */
export async function assertMyAccount(shopperPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  const { result, course } = cap;
  const ctx = ctxFor(shopperPage);

  await shopperPage.goto('my-account/orders/');
  await shopperPage.waitForLoadState('load');

  const row = shopperPage.locator('tr.woocommerce-orders-table__row').filter({ hasText: result.orderNumber }).first();
  await expect(row, `My Account orders list should contain order ${result.orderNumber}`).toBeVisible({ timeout: 15_000 });
  const status = await resilientText(ctx, {
    primary: row.locator('td.woocommerce-orders-table__cell-order-status'),
    ai: `the status of order ${result.orderNumber} in the orders list`,
  });
  expect(status, `My Account order status should be "${config.expectedStatus}"`).toContain(config.expectedStatus);

  await resilientClick(ctx, {
    primary: row.getByRole('link', { name: /view/i }).first(),
    alt: row.locator('a[href*="/my-account/view-order/"]').first(),
    ai: `the View link of order ${result.orderNumber}`,
  });
  await shopperPage.waitForLoadState('load');

  await expect(
    shopperPage.locator('mark.order-number').first(),
    `view-order should reference order ${result.orderNumber}`
  ).toContainText(result.orderNumber);
  await expect(
    shopperPage.locator('mark.order-status').first(),
    `view-order status should be ${config.expectedStatus}`
  ).toContainText(new RegExp(config.expectedStatus, 'i'));

  const viewProduct = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-table__product-name a[href*="/product/"], td.product-name').first(),
    ai: 'the product name on the view-order page',
  });
  expect(normalizeProductName(viewProduct), `view-order should show course "${result.productName}" (got "${viewProduct}")`).toContain(
    normalizeProductName(result.productName)
  );

  const view = await readTotals(shopperPage, ORDER_DETAILS_TABLE);
  expectTotals(view, result, 'view-order');

  const viewParticipants = (
    await shopperPage.locator('.pls-confirmation-summary__participant').allInnerTexts().catch(() => [])
  ).map((t) => t.replace(/\s+/g, ' ').trim());
  expect(viewParticipants.length, `view-order should list ${config.qty} participants`).toBe(config.qty);
  for (const [i, p] of result.participants.entries()) {
    assertParticipantShown(viewParticipants[i] ?? '', p, `view-order participant #${i + 1}`);
  }

  const viewAddress = await resilientText(ctx, {
    primary: shopperPage.locator('.woocommerce-customer-details address').first(),
    alt: shopperPage.locator('.woocommerce-customer-details').first(),
    ai: 'the billing address block on the view-order page',
  });
  assertAddressShown(viewAddress, BILLING, 'My Account view-order');

  // Subscriptions tab: one Active subscription per seat at the per-seat price.
  await shopperPage.goto('my-account/subscriptions/');
  await shopperPage.waitForLoadState('load');
  const subRows = shopperPage.locator('tr.order.woocommerce-orders-table__row');
  await expect(subRows.first(), 'the subscriptions list should render').toBeVisible({ timeout: 15_000 });
  for (const number of result.subscriptionNumbers) {
    const subRow = subRows.filter({ hasText: number }).first();
    await expect(subRow, `subscriptions list should contain ${number}`).toBeVisible();
    await expect(subRow.locator('td.subscription-status'), `${number} should be Active`).toContainText(/active/i);
    const subTotal = await subRow.locator('td.subscription-total .woocommerce-Price-amount').first().textContent();
    expectMoney(subTotal ?? '', course.unitPrice, `${number} recurring total should be the per-seat price`);
  }
}

// ---------------------------------------------------------------------------
// Backend (admin) parity.
// ---------------------------------------------------------------------------

/**
 * Backend parity (admin context): the order editor shows the sequential order
 * number, expected status, Stripe payment meta + charge note, billing address
 * (incl. middle name), customer note, the single line item at qty × unit with
 * the participants summary, and matching totals.
 */
export async function assertBackend(adminPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  const { result } = cap;
  const ctx = ctxFor(adminPage);
  await openAdminOrder(adminPage, result.postId);

  await expect(
    adminPage.locator('.woocommerce-order-data__heading, h2.woocommerce-order-data__heading').first(),
    `admin editor should be for order ${result.orderNumber}`
  ).toContainText(result.orderNumber);

  const statusText =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() ||
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    '';
  expect(statusText, `admin order status should be ${config.expectedStatus}`).toMatch(new RegExp(config.expectedStatus, 'i'));

  await expect(
    adminPage.locator('.woocommerce-order-data__meta').first(),
    `admin order should show the "${PAYMENT_LABEL}" payment-method meta`
  ).toContainText(/payment via credit \/ debit card/i);

  const adminAddress = await resilientText(ctx, {
    primary: adminPage.locator('.order_data_column .address').first(),
    ai: 'the billing address in the admin order editor',
  });
  assertAddressShown(adminAddress, BILLING, 'admin order editor');

  await expect(
    adminPage.locator('.order_note, .note_content').first(),
    `admin order should carry the customer note "${ORDER_NOTE}"`
  ).toContainText(ORDER_NOTE);

  const adminItem = await resilientText(ctx, {
    primary: adminPage.locator('#order_line_items td.name .wc-order-item-name, #order_line_items td.name a').first(),
    ai: 'the order line-item product name in the admin order editor',
  });
  expect(normalizeProductName(adminItem), `admin line item should be "${result.productName}" (got "${adminItem}")`).toContain(
    normalizeProductName(result.productName)
  );

  await expect(
    adminPage.locator('#order_line_items tr.item td.quantity .view').first(),
    `admin line item should show quantity ${result.qty}`
  ).toContainText(String(result.qty));

  const lineCost = await adminPage
    .locator('#order_line_items tr.item td.line_cost .view .woocommerce-Price-amount')
    .first()
    .textContent();
  expectMoney(lineCost ?? '', result.subtotal, 'admin line cost should equal the order subtotal');

  const adminParticipants = (
    await adminPage.locator('.pls-confirmation-summary__participant').allInnerTexts().catch(() => [])
  ).map((t) => t.replace(/\s+/g, ' ').trim());
  expect(adminParticipants.length, `admin line item should list ${config.qty} participants`).toBe(config.qty);
  for (const [i, p] of result.participants.entries()) {
    assertParticipantShown(adminParticipants[i] ?? '', p, `admin participant #${i + 1}`);
  }

  // First wc-order-totals table: Items Subtotal … Order Total (Stripe appends its
  // own fee/payout table after it — scope to the first, rule from the reference suite).
  const itemsSubtotal = await adminPage
    .locator('table.wc-order-totals tr')
    .filter({ hasText: /items subtotal/i })
    .locator('td.total .woocommerce-Price-amount')
    .first()
    .textContent()
    .catch(() => '');
  expectMoney(itemsSubtotal ?? '', result.subtotal, 'admin Items Subtotal should match the order subtotal');

  const orderTotal = await adminPage
    .locator('table.wc-order-totals tr')
    .filter({ hasText: /order total/i })
    .locator('td.total .woocommerce-Price-amount')
    .first()
    .textContent()
    .catch(() => '');
  expectMoney(orderTotal ?? '', result.total, 'admin Order Total should match the order total');

  await expectOrderNoteMatches(
    adminPage,
    /Stripe charge complete \(Charge ID: ch_[a-zA-Z0-9]+\)/,
    'admin order should have the Stripe charge-complete gateway note'
  );
}

// ---------------------------------------------------------------------------
// Email parity.
// ---------------------------------------------------------------------------

function emailText(msg: MailpitMessage): string {
  return `${msg.Subject} ${(msg.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg.Text ?? ''}`.replace(/\s+/g, ' ').trim();
}

/**
 * Purchaser emails: the order confirmation (subject carries the sequential order
 * number) with product/totals/payment/address parity, and the "account has been
 * created" email for the auto-created purchaser account.
 */
export async function assertPurchaserEmails(emailPage: Page, cap: FlowCapture, _config: OrderConfig): Promise<void> {
  const { result } = cap;

  const msg = await findEmail(result.email, { subjectFilter: 'Order Confirmation' });
  expect(msg, `an order-confirmation email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});

  const text = emailText(msg!);
  const compact = text.replace(/[\s,]+/g, '');
  expect(text, `order email subject/body should reference order ${result.orderNumber}`).toContain(result.orderNumber);
  expect(normalizeProductName(text), `order email should reference course "${result.productName}"`).toContain(
    normalizeProductName(result.productName)
  );
  for (const [label, val] of [['subtotal', result.subtotal], ['total', result.total]] as const) {
    if (Number.isNaN(toAmount(val))) continue;
    expect(compact, `order email should show the order ${label} ${val}`).toContain(toAmount(val).toFixed(2));
  }
  expectContainsCI(text, PAYMENT_LABEL, `order email should show payment method "${PAYMENT_LABEL}"`);
  expect(text, `order email should carry the customer note "${ORDER_NOTE}"`).toContain(ORDER_NOTE);
  assertAddressShown(text, BILLING, 'order email');

  const account = await findEmail(result.email, { subjectFilter: 'account' });
  expect(account, `an account-created email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  expect(account!.Subject, 'purchaser account email should be the account-created notification').toMatch(/account has been created/i);
}

/**
 * Participant emails (seats 2+): each recipient gets an account-created email
 * AND a "Your new course" email naming the purchaser and the course.
 */
export async function assertParticipantEmails(emailPage: Page, cap: FlowCapture): Promise<void> {
  const { result } = cap;
  const purchaser = result.participants[0];

  for (const p of result.participants.slice(1)) {
    const account = await findEmail(p.email, { subjectFilter: 'account' });
    expect(account, `an account-created email for participant ${p.email} should arrive`).not.toBeNull();
    expect(account!.Subject, `participant ${p.email} account email subject`).toMatch(/account has been created/i);

    const courseMail = await findEmail(p.email, { subjectFilter: 'new course' });
    expect(courseMail, `a "Your new course" email for participant ${p.email} should arrive`).not.toBeNull();
    await emailPage.goto(mailpitViewUrl(courseMail!.ID)).catch(() => {});
    const text = emailText(courseMail!);
    expect(text, 'course email should name the purchaser').toContain(`${purchaser.firstName} ${purchaser.middleName} ${purchaser.lastName}`);
    expect(text, 'course email should reference the purchaser email').toContain(purchaser.email);
    expect(normalizeProductName(text), `course email should reference course "${result.productName}"`).toContain(
      normalizeProductName(result.productName)
    );
  }
}

/** Refund-email parity: subject "has been refunded", carrying number + total. */
export async function assertRefundEmail(emailPage: Page, cap: FlowCapture): Promise<void> {
  const { result } = cap;
  const msg = await findEmail(result.email, { subjectFilter: 'refunded' });
  expect(msg, `a refund email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});

  const text = emailText(msg!);
  expect(text, `refund email should reference order ${result.orderNumber}`).toContain(result.orderNumber);
  expect(text.replace(/[\s,]+/g, ''), `refund email should show the refunded total ${result.total}`).toContain(
    toAmount(result.total).toFixed(2)
  );
}

// ---------------------------------------------------------------------------
// Refund (admin) — perform + assert.
// ---------------------------------------------------------------------------

/**
 * Perform a FULL refund in the admin order editor and assert the gateway note +
 * post-refund state (GI Place Order 04). Stripe issues a real refund → status
 * Refunded, note "Refunded {total} – Refund ID: re_… – Reason: Testing Refund".
 * The form is filled (qty per line + reason) and the computed amount polled > 0
 * before submitting — a $0 gateway refund silently no-ops (rule 27).
 */
export async function performAndAssertRefund(adminPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  const { result } = cap;
  const ctx = ctxFor(adminPage);

  // adminPage may be an uninitialised lazy proxy (this test touches it first) —
  // Promise.resolve flattens the proxied url() and forces init.
  const currentUrl = await Promise.resolve(adminPage.url());
  if (!currentUrl.includes(result.postId)) await openAdminOrder(adminPage, result.postId);

  await fillRefundForm(adminPage, REFUND_REASON);

  const refundBtn = adminPage.locator('button.do-api-refund');
  await refundBtn.first().waitFor({ state: 'visible', timeout: 10_000 });
  await expect
    .poll(
      async () =>
        toAmount(
          await adminPage
            .locator('.do-api-refund .wc-order-refund-amount .woocommerce-Price-amount.amount')
            .first()
            .textContent()
            .catch(() => '')
        ),
      { timeout: 10_000, message: 'computed refund amount should be > 0 before submitting' }
    )
    .toBeGreaterThan(0);

  // WC pops a native confirm ("Are you sure you wish to process this refund?").
  adminPage.on('dialog', (dialog) => void dialog.accept());
  await resilientClick(ctx, { primary: refundBtn.first(), ai: 'the Refund via Stripe button' });

  await adminPage.waitForLoadState('load');
  await waitForBlocksReady(adminPage);
  await adminPage.waitForTimeout(3_000);
  await adminPage.waitForLoadState('load');

  const escTotal = result.total.replace(/[.$]/g, (c) => `\\${c}`);
  const notePattern =
    config.refundNotePattern ??
    new RegExp(`Refunded ${escTotal} – Refund ID: re_[a-zA-Z0-9]+ – Reason: ${REFUND_REASON}`);
  await expectOrderNoteMatches(adminPage, notePattern, 'admin order should have the Stripe gateway refund note');

  const statusText =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() ||
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    '';
  const expected = config.refundedStatus ?? 'Refunded';
  expect(statusText, `order status after refund should be ${expected}`).toMatch(new RegExp(expected, 'i'));

  const refundLine = await adminPage
    .locator('tr.refund td.line_cost .view .woocommerce-Price-amount')
    .first()
    .textContent()
    .catch(() => '');
  expectMoney((refundLine ?? '').replace('-', ''), result.total, 'the refund line should reverse the full order total');
}

// ---------------------------------------------------------------------------
// Login / password / My Account tabs (basic account spec).
// ---------------------------------------------------------------------------

/** Login must land on the account dashboard (polled — rule 33). */
export async function assertLoggedIn(page: Page): Promise<void> {
  await expect(
    page.locator('.woocommerce-MyAccount-navigation').first(),
    'login should reveal the My Account navigation'
  ).toBeVisible({ timeout: 15_000 });
}

/**
 * Walk the My Account tabs of the staging customer (GI Basic 11): each tab
 * renders its expected content. Content matches are intent regexes (rule 26).
 */
export async function assertMyAccountTabs(page: Page): Promise<void> {
  const ctx = ctxFor(page);

  await page.goto('my-account/orders/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-MyAccount-content').first(),
    'Orders tab should render (orders table or empty notice)'
  ).toContainText(/no order has been made|order/i, { timeout: 15_000 });

  await page.goto('my-account/subscriptions/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-MyAccount-content').first(),
    'Subscriptions tab should render (subscriptions table or empty notice)'
  ).toContainText(/subscription/i, { timeout: 15_000 });

  // Smart Coupons tab.
  await page.goto('my-account/wc-smart-coupons/');
  await page.waitForLoadState('load');
  const couponsHeading = await resilientText(ctx, {
    primary: page.locator('.woocommerce-MyAccount-content h2').first(),
    alt: page.locator('.woocommerce-MyAccount-content').first(),
    ai: 'the Coupons tab heading in My Account',
  });
  expect(couponsHeading, 'Coupons tab should show the Smart Coupons heading').toMatch(/coupons|store credit/i);

  await page.goto('my-account/edit-address/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-MyAccount-content .woocommerce-Address-title, .woocommerce-Addresses'),
    'Addresses tab should render the address columns'
  ).not.toHaveCount(0);

  await page.goto('my-account/payment-methods/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-MyAccount-content').first(),
    'Payment methods tab should render (saved methods or the empty notice)'
  ).toContainText(/no saved methods|payment method/i, { timeout: 15_000 });

  await page.goto('my-account/edit-account/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('form.woocommerce-EditAccountForm'),
    'Account-details form should render'
  ).not.toHaveCount(0);
}

/** The lost-password request must confirm (and not be rate-limited). */
export async function assertPasswordResetRequested(page: Page): Promise<void> {
  const notice = page
    .locator('.woocommerce-message, .woocommerce-error, .wc-block-components-notice-banner__content')
    .first();
  await expect(notice, 'a password-reset notice should show after submitting the form').toBeVisible({ timeout: 15_000 });
  const text = (await notice.textContent()) ?? '';
  if (/rate limit|too many|wait a few/i.test(text)) {
    throw new Error(`WP password-reset rate limit hit — wait a few minutes and re-run.\nNotice: "${text.trim()}"`);
  }
  await expect(notice, 'the reset request should confirm').toContainText(/password reset email has been sent|check your email/i);
}

/** Follow the reset email, extract the set-password link. Throws if absent. */
export async function resetLinkFromEmail(email: string): Promise<string> {
  const msg = await findEmail(email, { subjectFilter: 'Password' });
  expect(msg, `a password-reset email for ${email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  const html = msg!.HTML ?? '';
  const link =
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*reset[^<]*password/i)?.[1] ??
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*(?:set|create)[^<]*password/i)?.[1] ??
    html.match(/<a[^>]+href="([^"]+key=[^"]+)"/i)?.[1];
  expect(link, `reset email should contain a reset-password link\nsubject: ${msg!.Subject}`).toBeTruthy();
  return link!.replace(/&amp;/g, '&');
}

/** The set-password submit must confirm the reset. */
export async function assertPasswordWasReset(page: Page): Promise<void> {
  await expect(
    page.locator('.woocommerce-message, .wc-block-components-notice-banner__content').first(),
    'password should be reset successfully'
  ).toContainText(/password has been reset/i, { timeout: 15_000 });
}

// ---------------------------------------------------------------------------
// Basic-page behaviour asserts.
// ---------------------------------------------------------------------------

/** Course PDP sanity (GI Basic 13): quantity input visible on a course page. */
export async function assertCoursePageReady(page: Page): Promise<void> {
  await expect(
    page.locator('form.cart input.qty').first(),
    'the course page should render a quantity field'
  ).toBeVisible({ timeout: 15_000 });
  await expect(
    page.getByRole('button', { name: /sign up now/i }).first(),
    'the course page should render the Sign up now button'
  ).toBeVisible();
}

/**
 * CE-requirements-by-state search (GI Basic 04): selecting a state and submitting
 * must land on a results view mentioning the state (behaviour, not pinned copy).
 */
export async function assertStateSearchResults(page: Page, stateName: RegExp): Promise<void> {
  await expect(
    page.locator('#content, main, .entry-content').first(),
    'the state CE search should return content naming the searched state'
  ).toContainText(stateName, { timeout: 15_000 });
}

/** Kadence advanced-form success notice (contact / course-inquiry forms). */
export async function assertKadenceFormSuccess(page: Page): Promise<void> {
  await expect(
    page.locator('.kb-adv-form-message.kb-adv-form-success').first(),
    'the form should show the Kadence success message after submitting'
  ).toBeVisible({ timeout: 20_000 });
}

/**
 * Weglot menu-translation parity (GI Basic 17). Asserts the primary nav renders
 * the expected labels for the active language — labels are the stable regression
 * surface; body copy is content-managed and drifts (rule 35).
 */
export async function assertMenuLanguage(page: Page, lang: 'en' | 'es'): Promise<void> {
  const nav = page.getByRole('navigation', { name: /primary/i }).first();
  const labels: Record<'en' | 'es', RegExp[]> = {
    en: [/home/i, /courses/i, /private ce/i, /contact/i],
    es: [/inicio/i, /cursos/i, /ce privado/i, /contacto|póngase en contacto/i],
  };
  const navText = (await nav.innerText()).replace(/\s+/g, ' ');
  for (const re of labels[lang]) {
    expect(navText, `primary nav should show a ${lang.toUpperCase()} label matching ${re}`).toMatch(re);
  }
}
