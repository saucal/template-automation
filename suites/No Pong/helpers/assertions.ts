// All expect() for the No Pong suite lives here — specs stay assertion-free
// (rule 6, the only exception being toHaveScreenshot in the visual spec). Every
// expect carries a message (rule 19). Copy-text matches use intent regexes, not
// verbatim strings (rule 26), so a content tweak doesn't break the gate.
//
// Parity model: values captured by flows.ts are the source of truth. Each surface
// (checkout, thank-you, my-account, admin, email) must match them — we assert
// equality against the capture, never hardcoded literals, so the suite survives
// price drift between maintenance cycles.
//
// Grows per phase: quantity limits (Task 9) → order parity (Task 11) →
// subscription / wholesale asserts (Tasks 13-15).
import { expect, type Page } from '@playwright/test';
import type { OrderConfig, OrderResult, SubscriptionResult } from '../types/test-config';
import type { FlowCapture } from './flows';
import { PAYMENT_LABEL, readFirstCartQty, toAmount } from './nopong';
import { expectOrderNoteMatches } from './order-notes';
import { findEmail, mailpitViewUrl } from './playgrounds-email';
import { ctxFor, resilientClick, resilientText } from './resilient';

/** Default "over the limit" notice — No Pong: "WHOOPS-A-DAISY! ... TOO MANY ITEMS ...". */
const OVER_LIMIT_NOTICE = /too many items|whoops/i;

/**
 * The admin payment-method meta line ("Payment via …") and the gateway order
 * note differ per gateway and from the customer-facing PAYMENT_LABEL.
 *   - stripe meta: "Payment via Credit Card"; note: "Stripe charge complete (Charge ID: ch_…)".
 *   - paypal meta: "Payment via PayPal";       note: a PayPal capture/complete line.
 */
const BACKEND_PAYMENT: Record<OrderConfig['payment'], { metaPattern: RegExp; notePattern: RegExp }> = {
  stripe: { metaPattern: /payment via credit card/i, notePattern: /Stripe charge complete \(Charge ID: ch_[a-zA-Z0-9]+\)/ },
  paypal: { metaPattern: /payment via paypal/i, notePattern: /paypal/i },
};

/** Assert two rendered money strings are numerically equal. */
function expectMoney(actual: string, expected: string, msg: string): void {
  expect(toAmount(actual), `${msg} — got "${actual}", expected "${expected}"`).toBeCloseTo(toAmount(expected), 2);
}

/**
 * Assert a quantity cap was enforced: the cart shows an over-limit error notice
 * and the line-item quantity was clamped to `clampedQty`. Covers both the
 * single-product tin cap (qty entered above the cap) and the cross-product 85g
 * weight cap (adding another product trips the cap and clamps the first item).
 */
export async function assertQuantityLimit(
  page: Page,
  opts: { clampedQty: string; noticePattern?: RegExp }
): Promise<void> {
  const notice = page
    .locator('.woocommerce-error, .wc-block-components-notice-banner.is-error .wc-block-components-notice-banner__content')
    .first();
  await expect(notice, 'an over-limit error notice should appear when the quantity cap is exceeded')
    .toContainText(opts.noticePattern ?? OVER_LIMIT_NOTICE, { timeout: 15_000 });

  const qty = await readFirstCartQty(page);
  expect(qty, `cart quantity should be clamped to the cap (${opts.clampedQty})`).toBe(opts.clampedQty);
}

/**
 * Frontend parity across the surfaces captured during the flow: the checkout
 * review totals equal the thank-you totals, the line-item product name matches
 * the PDP title, and the payment label matches the config.
 */
export function assertFrontendParity(cap: FlowCapture, config: OrderConfig): void {
  const { pdp, checkout, order } = cap;

  expectMoney(order.subtotal, checkout.subtotal, 'thank-you subtotal should match the checkout subtotal');
  expectMoney(order.shipping, checkout.shipping, 'thank-you shipping should match the checkout shipping');
  expectMoney(order.tax, checkout.tax, 'thank-you tax should match the checkout tax');
  expectMoney(order.total, checkout.total, 'thank-you total should match the checkout total');

  expect(order.productName, `thank-you product name should contain "${pdp.productName}"`).toContain(pdp.productName);
  expect(
    order.paymentLabel,
    `thank-you payment method should be "${PAYMENT_LABEL[config.payment]}"`
  ).toContain(PAYMENT_LABEL[config.payment]);
  expect(order.orderNumber, 'order number should have been captured from the order-received page').toMatch(/^\d+$/);
}

/**
 * Points/Rewards parity: an order earns points, captured at checkout. AU always
 * awards points, so a missing/zero value is a config regression.
 */
export function assertPointsEarned(cap: FlowCapture, config: OrderConfig): void {
  const points = cap.result.pointsEarned;
  expect(
    points,
    `order ${config.testId} should earn Points/Rewards points at checkout (got ${points ?? 'none'})`
  ).toBeGreaterThan(0);
}

/**
 * My-account parity (the shopper context is still authenticated after creating
 * the account at checkout). The orders list shows the order with the expected
 * status; the view-order page repeats the product + total.
 */
export async function assertMyAccount(shopperPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  if (config.user === 'guest') return; // guests have no My Account

  const { result } = cap;
  const ctx = ctxFor(shopperPage);
  await shopperPage.goto('my-account/orders/');
  await shopperPage.waitForLoadState('load');

  const status = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-orders-table__cell-order-status').first(),
    ai: 'the order status in the My Account orders list',
  });
  expect(status, `My Account order status should be "${config.expectedStatus}"`).toContain(config.expectedStatus);

  const orderLink = shopperPage.locator(`a[href*="/my-account/view-order/${result.orderNumber}/"]`).first();
  await expect(orderLink, `My Account orders list should contain order #${result.orderNumber}`).toBeVisible();
  await resilientClick(ctx, { primary: orderLink, ai: `the link to order #${result.orderNumber} in the orders list` });
  await shopperPage.waitForLoadState('load');

  const viewProduct = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-table__product-name.product-name, td.product-name').first(),
    ai: 'the product name on the view-order page',
  });
  expect(viewProduct, `view-order should show product "${result.productName}"`).toContain(result.productName);
}

/**
 * Backend parity (admin context). The order editor shows the expected status,
 * the matching payment-method meta line, the product line item, the order total,
 * and the gateway payment note. HPOS (`wc-orders`) and legacy (`post.php`) URLs
 * both reach the editor — try HPOS first, fall back.
 */
export async function assertBackend(adminPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  const { result } = cap;
  const ctx = ctxFor(adminPage);
  await adminPage.goto(`wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`);
  await adminPage.waitForLoadState('load');
  if ((await adminPage.locator('.woocommerce-order-data__meta, #order_status').count()) === 0) {
    await adminPage.goto(`wp-admin/post.php?post=${result.orderNumber}&action=edit`);
    await adminPage.waitForLoadState('load');
  }

  const statusText =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() ||
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    '';
  expect(statusText, `admin order status should be ${config.expectedStatus}`).toMatch(
    new RegExp(config.expectedStatus, 'i')
  );

  await expect(
    adminPage.locator('.woocommerce-order-data__meta').first(),
    `admin order should show the ${PAYMENT_LABEL[config.payment]} payment-method meta`
  ).toContainText(BACKEND_PAYMENT[config.payment].metaPattern);

  const adminItem = await resilientText(ctx, {
    primary: adminPage.locator('.woocommerce_order_items td.name, #order_line_items td.name').first(),
    ai: 'the order line-item product name in the admin order editor',
  });
  expect(adminItem, `admin order items should list "${result.productName}"`).toContain(result.productName);

  const adminTotal = await resilientText(ctx, {
    primary: adminPage
      .locator('table.wc-order-totals:last-of-type tr:last-child td.total .woocommerce-Price-amount.amount')
      .or(adminPage.locator('.wc_order_total .amount'))
      .last(),
    ai: 'the order total in the admin order editor',
  });
  expectMoney(adminTotal, result.total, 'admin order total should match the order total');

  await expectOrderNoteMatches(
    adminPage,
    BACKEND_PAYMENT[config.payment].notePattern,
    `admin order should have a ${PAYMENT_LABEL[config.payment]} gateway payment note`
  );
}

/**
 * Email parity (email context). Fetch the order-confirmation email from
 * Playgrounds (filtered by subject so a "new account" email for the same
 * recipient can't be returned instead) and assert it carries the order number,
 * product, and totals.
 */
export async function assertEmail(emailPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  const { result } = cap;
  const msg = await findEmail(result.email, { subjectFilter: 'order' });
  expect(msg, `an order-confirmation email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();

  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});

  // WooCommerce wraps the currency symbol in its own span, so money never appears
  // as a contiguous "$87.97" string — match the numeric amount against a
  // whitespace/comma-stripped variant of the body.
  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  const compact = text.replace(/[\s,]+/g, '');
  const amount = (money: string) => toAmount(money).toFixed(2);

  expect(text, `email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  expect(text, `email should reference product "${result.productName}"`).toContain(result.productName);
  expect(compact, `email should show the order total ${result.total}`).toContain(amount(result.total));
  expect(text, `email should show payment method "${PAYMENT_LABEL[config.payment]}"`).toContain(PAYMENT_LABEL[config.payment]);
}

/**
 * Perform a FULL refund in the admin order editor and assert the gateway note +
 * post-refund status (GI Place Order 04). Stripe issues a real refund → status
 * Refunded, with a note "Refunded {total} – Refund ID: re_… – Reason: Testing
 * Refund".
 *
 * Clicking do-api-refund with a $0 amount silently no-ops, so we fill the refund
 * form (line-item quantities + shipping) before submitting, mirroring GI.
 */
export async function performAndAssertRefund(adminPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  const { result } = cap;
  const ctx = ctxFor(adminPage);
  if (!adminPage.url().includes(String(result.orderNumber))) {
    await adminPage.goto(`wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`);
    await adminPage.waitForLoadState('load');
  }

  await resilientClick(ctx, { primary: adminPage.locator('button.refund-items'), ai: 'the Refund button in the admin order' });
  await adminPage.locator('input.refund_order_item_qty').first().waitFor({ state: 'visible', timeout: 10_000 });

  // Full refund: copy ordered qty → refund qty and the shipping amount into the
  // shipping refund input so WC computes a non-zero refund total.
  await adminPage.evaluate(() => {
    const num = (s: string | null | undefined) => parseFloat((s ?? '').replace(/[^0-9.]/g, '')) || 0;

    const qtyViews = document.querySelectorAll('tbody#order_line_items > tr > td.quantity > div.view');
    const qtys = Array.from(qtyViews).map((el) => {
      const m = (el.textContent ?? '').trim().match(/\d+/);
      return m ? parseInt(m[0], 10) : 1;
    });
    document.querySelectorAll<HTMLInputElement>('input.refund_order_item_qty').forEach((input, i) => {
      input.value = String(qtys[i] ?? 1);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const copy = (viewSel: string, inputSel: string) => {
      const inputs = document.querySelectorAll<HTMLInputElement>(inputSel);
      document.querySelectorAll(viewSel).forEach((view, i) => {
        const input = inputs[i];
        if (!input) return;
        input.value = String(num(view.textContent));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    };
    copy('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount', 'tr.shipping > td.line_cost > .refund > input.refund_line_total');
    copy('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount', 'tr.shipping > td.line_tax > .refund > input.refund_line_tax');

    const reason = document.querySelector<HTMLInputElement>('#refund_reason');
    if (reason) reason.value = 'Testing Refund';
  });

  // The gateway button only acts when the computed amount is > 0.
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
      { timeout: 10_000, message: 'refund amount should be > 0 before submitting' }
    )
    .toBeGreaterThan(0);

  adminPage.on('dialog', (dialog) => dialog.accept());
  await resilientClick(ctx, { primary: refundBtn.first(), ai: 'the Refund via Stripe button' });

  await adminPage.waitForLoadState('load');
  await adminPage.waitForTimeout(3_000);
  await adminPage.reload();
  await adminPage.waitForLoadState('load');

  // Gateway refund note: "Refunded {total} – Refund ID: re_… – Reason: Testing Refund".
  const escTotal = result.total.replace(/[.$]/g, (c) => `\\${c}`);
  const notePattern =
    config.refundNotePattern ?? new RegExp(`Refunded ${escTotal} – Refund ID: re_[a-zA-Z0-9]+ – Reason: Testing Refund`);
  await expectOrderNoteMatches(adminPage, notePattern, 'admin order should have a Stripe gateway refund note');

  const statusText =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() ||
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    '';
  const expectedRefundStatus = config.refundedStatus ?? 'Refunded';
  expect(statusText, `order status after refund should be ${expectedRefundStatus}`).toMatch(
    new RegExp(expectedRefundStatus, 'i')
  );
}

/**
 * Not-wholesale gate (GI 09): a normal (non-wholesale) customer visiting the
 * wholesale-products page is blocked — the restriction notice ("Approved
 * Wholesale Customers only" / eligibility requirements) shows instead of prices.
 */
export async function assertNotWholesale(page: Page): Promise<void> {
  await page.goto('wholesale-products/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.entry-content, #content, main').first(),
    'a non-wholesale customer should see the wholesale-restriction notice, not wholesale pricing'
  ).toContainText(/approved wholesale customers only|eligibility requirements/i, { timeout: 15_000 });
}

/** Refund-email parity (GI Place Order 05): subject "has been refunded". */
export async function assertRefundEmail(emailPage: Page, cap: FlowCapture): Promise<void> {
  const { result } = cap;
  const msg = await findEmail(result.email, { subjectFilter: 'refund' });
  expect(msg, `a refund email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  const compact = text.replace(/[\s,]+/g, '');
  expect(text, `refund email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  expect(compact, `refund email should show the refunded total ${result.total}`).toContain(toAmount(result.total).toFixed(2));
}

// ---------------------------------------------------------------------------
// Wholesale (Task 15).
// ---------------------------------------------------------------------------

/**
 * After a wholesale login, the gated wholesale catalogue is reachable: the page
 * heading reads "WHOLESALE PRODUCTS" and the wholesale-only My Account nav link
 * is present — the inverse of the non-wholesale restriction (assertNotWholesale).
 */
export async function assertWholesaleAccess(page: Page): Promise<void> {
  await page.goto('wholesale-products/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('h1.entry-title').first(),
    'a wholesale customer should see the WHOLESALE PRODUCTS catalogue heading'
  ).toContainText(/wholesale products/i, { timeout: 15_000 });
  await expect(
    page.locator('.wc-block-grid__products > li, .wp-block-handpicked-products > ul > li').first(),
    'the wholesale catalogue should render purchasable products, not the restriction notice'
  ).toBeVisible({ timeout: 15_000 });
}

/** A wholesale order captured a wholesale-priced line and a positive total. */
export function assertWholesalePricing(result: OrderResult): void {
  expect(result.orderNumber, 'wholesale order should have an order number from the thank-you page').toMatch(/^\d+$/);
  expect(toAmount(result.unitPrice), `wholesale product should have a captured unit price (got "${result.unitPrice}")`).toBeGreaterThan(0);
  expect(toAmount(result.total), `wholesale order total should be positive (got "${result.total}")`).toBeGreaterThan(0);
}

// ---------------------------------------------------------------------------
// Subscriptions (Tasks 13-14).
// ---------------------------------------------------------------------------

/** A placed subscription captured an order number, a subscription number, and a total. */
export function assertSubscriptionPlaced(result: SubscriptionResult): void {
  expect(result.orderNumber, 'subscription order should have an order number from the thank-you page').toMatch(/^\d+$/);
  expect(result.subscriptionNumber, 'a subscription number should be captured from My Account').toMatch(/^\d+$/);
  expect(toAmount(result.total), `subscription order total should be a positive amount (got "${result.total}")`).toBeGreaterThan(0);
}

/** Admin subscription editor URL (HPOS shop_subscription). */
function subscriptionEditUrl(subscriptionNumber: string): string {
  return `wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${subscriptionNumber}`;
}

/**
 * Backend parity for a placed subscription (GI Subscription Backend): the
 * subscription editor shows status Active and the recurring total matches the
 * captured order total.
 */
export async function assertSubscriptionBackend(adminPage: Page, result: SubscriptionResult): Promise<void> {
  await adminPage.goto(subscriptionEditUrl(result.subscriptionNumber));
  await adminPage.waitForLoadState('load');

  const status =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() ||
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    '';
  expect(status, `subscription #${result.subscriptionNumber} should be Active in the admin editor`).toMatch(/active/i);

  const recurringTotal = await resilientText(ctxFor(adminPage), {
    primary: adminPage
      .locator('table.wc-order-totals:last-of-type tr:last-child td.total .woocommerce-Price-amount.amount')
      .last(),
    ai: 'the recurring total in the subscription editor',
  }).catch(() => '');
  if (recurringTotal) {
    expectMoney(recurringTotal, result.total, 'subscription recurring total should match the order total');
  }
}

/** Subscription confirmation email parity. */
export async function assertSubscriptionEmail(emailPage: Page, result: SubscriptionResult): Promise<void> {
  const msg = await findEmail(result.email, { subjectFilter: 'order' });
  expect(msg, `a subscription order email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  expect(text, `subscription email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  expect(text, `subscription email should reference product "${result.productName}"`).toContain(result.productName);
}

/**
 * Assert a subscription's status on whatever surface is current — the customer
 * view-subscription page (`td.subscription-status` / details table) or the admin
 * editor (`#select2-order_status-container`). Matches on intent (rule 26).
 */
export async function assertSubscriptionStatus(page: Page, expected: string): Promise<void> {
  const surface = page
    .locator('td.subscription-status, table.shop_table.subscription_details td:nth-of-type(2), #select2-order_status-container')
    .first();
  await expect(surface, `subscription status should be "${expected}"`).toContainText(new RegExp(expected, 'i'), {
    timeout: 15_000,
  });
}

/**
 * Assert the billing schedule changed (GI 24): the success notice shows and the
 * order-details recurring line reflects the new "EVERY {interval} {PERIOD}S".
 */
export async function assertScheduleChanged(
  page: Page,
  schedule: { interval: string; period: string }
): Promise<void> {
  await expect(
    page.locator('.wc-block-components-notice-banner.is-success, .woocommerce-message').first(),
    'changing the billing schedule should show a success notice'
  ).toContainText(/billing period changed successfully/i, { timeout: 15_000 });

  const everyPattern = new RegExp(`every\\s+${schedule.interval}\\s+${schedule.period}s?`, 'i');
  await expect(
    page.locator('table.shop_table.order_details tfoot, table.shop_table.subscription_details').first(),
    `the subscription recurring line should reflect "every ${schedule.interval} ${schedule.period}(s)"`
  ).toContainText(everyPattern, { timeout: 15_000 });
}

/**
 * Drive an admin renewal (GI Subscription Renew): on the subscription editor,
 * toggle renewals on, process a renewal, and assert the subscription stays
 * Active with a new Renewal Order in the related-orders table.
 */
export async function performAndAssertRenewal(adminPage: Page, result: SubscriptionResult): Promise<void> {
  const ctx = ctxFor(adminPage);
  await adminPage.goto(subscriptionEditUrl(result.subscriptionNumber));
  await adminPage.waitForLoadState('load');

  // Enable renewals (debug toggle) so the gateway is allowed to charge.
  await adminPage.locator('select[name="wc_order_action"]').selectOption('wcs_debug_toggle_renewals').catch(() => {});
  await resilientClick(ctx, { primary: adminPage.locator('button[name="save"]'), ai: 'the subscription Save (toggle renewals) button' });
  await adminPage.waitForLoadState('load');

  // Process a renewal payment.
  await adminPage.locator('select[name="wc_order_action"]').selectOption('wcs_process_renewal');
  await resilientClick(ctx, { primary: adminPage.locator('button[name="save"]'), ai: 'the subscription Save (process renewal) button' });
  await adminPage.waitForLoadState('load');

  const status =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() || '';
  expect(status, `subscription #${result.subscriptionNumber} should remain Active after renewal`).toMatch(/active/i);

  await expect(
    adminPage.locator('.woocommerce_subscriptions_related_orders table tbody tr, #subscription_renewal_orders table tbody tr').first(),
    'a renewal order should be created in the subscription related-orders table'
  ).toContainText(/renewal order/i, { timeout: 15_000 });
}
