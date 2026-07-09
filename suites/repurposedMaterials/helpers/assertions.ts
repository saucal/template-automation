// Parity assertions for the repurposedMATERIALS place-order suite.
//
// Values captured by flows.ts are the source of truth. Each surface (checkout,
// thank-you, my-account, admin, email) must match — we assert equality against
// the capture, never hardcoded literals.
import { expect, type Page } from '@playwright/test';
import type { OrderConfig, OrderResult } from '../types/test-config';
import { PAYMENT_LABEL, toAmount } from './repurposed';
import { expectOrderNoteMatches } from './order-notes';
import { findEmail, mailpitViewUrl } from './playgrounds-email';
import { ctxFor, resilientClick, resilientText } from './resilient';

/** Assert two rendered money strings are numerically equal. */
function expectMoney(actual: string, expected: string, msg: string): void {
  expect(toAmount(actual), `${msg} — got "${actual}", expected "${expected}"`).toBeCloseTo(toAmount(expected), 2);
}

/** Collapse whitespace (incl. nbsp) for label comparison. */
const norm = (s: string): string => (s ?? '').replace(/\s+/g, ' ').trim();

/**
 * Shipping renders as money (e.g. "$5.00") OR a method label (e.g. local pickup,
 * "Pick-Up at Retail Location ..."). Compare as money when both sides are numeric,
 * else as normalized text.
 */
function expectShipping(actual: string, expected: string, msg: string): void {
  const a = toAmount(actual);
  const e = toAmount(expected);
  if (Number.isNaN(a) || Number.isNaN(e)) {
    expect(norm(actual), `${msg} — got "${actual}", expected "${expected}"`).toBe(norm(expected));
  } else {
    expect(a, `${msg} — got "${actual}", expected "${expected}"`).toBeCloseTo(e, 2);
  }
}

/** Thank-you page parity: order number, product, payment, prices. */
export function assertThankYouPage(result: OrderResult): void {
  expect(result.orderNumber, 'order number should be captured').toMatch(/^\d+$/);
  expect(result.productName, 'product name should be captured').toBeTruthy();
  expect(result.paymentLabel, `payment should be "${PAYMENT_LABEL}"`).toContain(PAYMENT_LABEL);
  expect(result.total, 'total should be captured').toBeTruthy();
}

/** Checkout vs thank-you parity. */
export function assertCheckoutParity(
  checkoutPrices: { subtotal: string; shipping: string; tax: string; total: string },
  result: OrderResult
): void {
  expectMoney(result.subtotal, checkoutPrices.subtotal, 'thank-you subtotal should match checkout');
  if (checkoutPrices.shipping) expectShipping(result.shipping, checkoutPrices.shipping, 'thank-you shipping should match checkout');
  if (checkoutPrices.tax) expectMoney(result.tax, checkoutPrices.tax, 'thank-you tax should match checkout');
  expectMoney(result.total, checkoutPrices.total, 'thank-you total should match checkout');
}

/** My-account parity: navigate to orders, view order, check product + total. */
export async function assertMyAccount(shopperPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  if (config.user === 'guest') return;

  const ctx = ctxFor(shopperPage);
  await shopperPage.goto('/my-account/orders/');
  await shopperPage.waitForLoadState('load');

  const status = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-orders-table__cell-order-status').first(),
    ai: 'the order status in the My Account orders list',
  });
  expect(status, `order status should be "${config.expectedStatus}"`).toContain(config.expectedStatus);

  const orderLink = shopperPage.locator(`a[href*="/my-account/view-order/${result.orderNumber}/"]`).first();
  await expect(orderLink, `orders list should contain order #${result.orderNumber}`).toBeVisible();
  await resilientClick(ctx, { primary: orderLink, ai: `the link to order #${result.orderNumber}` });
  await shopperPage.waitForLoadState('load');

  const viewProduct = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-table__product-name').first(),
    ai: 'the product name on the view-order page',
  });
  expect(viewProduct, `view-order should show "${result.productName}"`).toContain(result.productName);

  const viewTotal = await resilientText(ctx, {
    primary: shopperPage.locator('tr:has(th:text-is("Total:")) td .woocommerce-Price-amount.amount').last(),
    ai: 'the order total on the view-order page',
  });
  expectMoney(viewTotal, result.total, 'view-order total should match');
}

/** Backend parity: admin order editor — status, product, total, payment note. */
export async function assertBackendOrder(adminPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(adminPage);
  await adminPage.goto(`/wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`);
  await adminPage.waitForLoadState('load');

  const status = await adminPage.locator('#order_status').inputValue().catch(() => '');
  expect(
    status || ((await adminPage.locator('#select2-order_status-container').first().textContent()) ?? '').trim(),
    `admin order status should be ${config.expectedStatus}`
  ).toMatch(new RegExp(config.expectedStatus, 'i'));

  const adminItem = await resilientText(ctx, {
    primary: adminPage.locator('.woocommerce_order_items td.name, #order_line_items td.name').first(),
    ai: 'the product name in the admin order editor',
  });
  expect(adminItem, `admin should list "${result.productName}"`).toContain(result.productName);

  const adminTotal = await resilientText(ctx, {
    primary: adminPage.locator('.wc-order-totals .total .woocommerce-Price-amount.amount, .wc_order_total .amount').last(),
    ai: 'the order total in admin',
  });
  expectMoney(adminTotal, result.total, 'admin total should match');

  // Accept.Blue payment note
  await expectOrderNoteMatches(
    adminPage,
    /accept\.blue Gateway v2 Payment Completed with Transaction Id of '\d+'/,
    'admin should have an Accept.Blue payment-completed note'
  );
}

/** Perform refund in admin + verify refund order note. */
export async function performAndAssertRefund(adminPage: Page, result: OrderResult): Promise<void> {
  const ctx = ctxFor(adminPage);
  // Navigate to order if not already there
  if (!adminPage.url().includes(result.orderNumber)) {
    await adminPage.goto(`/wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`);
    await adminPage.waitForLoadState('load');
  }

  await resilientClick(ctx, {
    primary: adminPage.locator('button.refund-items'),
    ai: 'the Refund button in the admin order',
  });

  // Fill the refund form for a FULL refund (GI parity — Place_Order Refund step).
  // Without this the refund amount stays $0, the gateway refund never fires, and
  // no refund note is written.
  await adminPage.locator('input.refund_order_item_qty').first().waitFor({ state: 'visible', timeout: 10_000 });
  await adminPage.evaluate(() => {
    const num = (s: string | null | undefined) => parseFloat((s ?? '').replace(/[^0-9.]/g, '')) || 0;

    // Line items: copy ordered qty → refund qty so WC auto-fills the line totals.
    const qtyViews = document.querySelectorAll('tbody#order_line_items > tr > td.quantity > div.view');
    const qtys = Array.from(qtyViews).map((el) => {
      const t = (el.textContent ?? '').trim();
      const m = t.match(/x\s*(\d+)/);
      if (m) return parseInt(m[1], 10);
      const d = t.match(/\d+/);
      return d ? parseInt(d[0], 10) : 1;
    });
    document.querySelectorAll<HTMLInputElement>('input.refund_order_item_qty').forEach((input, i) => {
      input.value = String(qtys[i] ?? 1);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Fee + shipping rows: copy the displayed amount into the matching refund input.
    const copy = (viewSel: string, inputSel: string) => {
      const inputs = document.querySelectorAll<HTMLInputElement>(inputSel);
      document.querySelectorAll(viewSel).forEach((view, i) => {
        const input = inputs[i];
        if (!input) return;
        input.value = String(num(view.textContent));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    };
    copy('tr.fee > td.line_cost > .view > .woocommerce-Price-amount.amount', 'tr.fee > td.line_cost > .refund > input.refund_line_total');
    copy('tr.fee > td.line_tax > .view > .woocommerce-Price-amount.amount', 'tr.fee > td.line_tax > .refund > input.refund_line_tax');
    copy('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount', 'tr.shipping > td.line_cost > .refund > input.refund_line_total');
    copy('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount', 'tr.shipping > td.line_tax > .refund > input.refund_line_tax');

    const reason = document.querySelector<HTMLInputElement>('#refund_reason');
    if (reason) reason.value = 'Testing Refund';
  });

  // The gateway refund button only acts when the computed amount is > 0.
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

  // Accept the confirmation dialog
  adminPage.on('dialog', (dialog) => dialog.accept());
  await resilientClick(ctx, { primary: refundBtn.first(), ai: 'the Refund via Accept.Blue button' });

  // Wait for refund to process
  await adminPage.waitForLoadState('load');
  await adminPage.waitForTimeout(3_000);

  // Reload to see updated notes
  await adminPage.reload();
  await adminPage.waitForLoadState('load');

  await expectOrderNoteMatches(
    adminPage,
    /accept\.blue Gateway v2 Refund/,
    'admin should have an Accept.Blue refund note'
  );
}

/** Email parity: find order-confirmation email in Mailpit, assert order# + product + total. */
export async function assertOrderEmail(result: OrderResult): Promise<void> {
  const msg = await findEmail(result.email, { subjectFilter: 'received' });
  expect(msg, `order-confirmation email for ${result.email} should arrive`).not.toBeNull();

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  const compact = text.replace(/[\s,]+/g, '');
  const amount = (money: string) => toAmount(money).toFixed(2);

  expect(text, `email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  expect(text, `email should reference product "${result.productName}"`).toContain(result.productName);
  expect(compact, `email should show total ${result.total}`).toContain(amount(result.total));
  expect(text, `email should show payment "${PAYMENT_LABEL}"`).toContain(PAYMENT_LABEL);
}

/** Email parity: find refund email in Mailpit. */
export async function assertRefundEmail(result: OrderResult): Promise<void> {
  const msg = await findEmail(result.email, { subjectFilter: 'refund' });
  expect(msg, `refund email for ${result.email} should arrive`).not.toBeNull();

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  expect(text, `refund email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
}
