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
import type { OrderConfig } from '../types/test-config';
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
