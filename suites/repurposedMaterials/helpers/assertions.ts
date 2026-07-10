// Parity assertions for the repurposedMATERIALS place-order suite.
//
// Values captured by flows.ts are the source of truth. Each surface (checkout,
// thank-you, my-account, admin, email) must match — we assert equality against
// the capture, never hardcoded literals.
import { expect, type Page } from '@playwright/test';
import type { OrderConfig, OrderResult } from '../types/test-config';
import { BILLING, ORDER_NOTE, PAYMENT_LABEL, toAmount } from './repurposed';
import { expectOrderNoteMatches } from './order-notes';
import { findEmail, mailpitViewUrl } from './playgrounds-email';
import { ctxFor, resilientClick, resilientText } from './resilient';

/** Assert two rendered money strings are numerically equal. */
function expectMoney(actual: string, expected: string, msg: string): void {
  expect(toAmount(actual), `${msg} — got "${actual}", expected "${expected}"`).toBeCloseTo(toAmount(expected), 2);
}

/** Collapse whitespace (incl. nbsp) for label comparison. */
const norm = (s: string): string => (s ?? '').replace(/\s+/g, ' ').trim();

/** Assert a rendered block contains every expected token (verbatim, whitespace-normalised). */
function expectContainsAll(actual: string | null | undefined, tokens: string[], msg: string): void {
  const hay = norm(actual ?? '');
  for (const t of tokens) {
    expect(hay, `${msg} — missing "${t}" in: ${hay}`).toContain(t);
  }
}

// Address tokens that render verbatim on every surface (state renders as its full
// name and country carries a suffix, so those are excluded — street/company/name
// are the discriminators between the billing and the distinct shipping address).
const BILLING_TOKENS = [BILLING.firstName, BILLING.lastName, BILLING.company, BILLING.street, BILLING.street2, BILLING.city, BILLING.zip];
const SHIPPING_TOKENS = [BILLING.firstName, BILLING.shippingLastName, BILLING.shippingCompany, BILLING.shippingStreet, BILLING.shippingStreet2, BILLING.city, BILLING.zip];

/** Digits-only compare for phone numbers (rendering reformats separators). */
const digits = (s: string | null | undefined): string => (s ?? '').replace(/\D/g, '');

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
  checkoutPrices: { subtotal: string; shipping: string; tax: string; ccFee?: string; total: string },
  result: OrderResult
): void {
  expectMoney(result.subtotal, checkoutPrices.subtotal, 'thank-you subtotal should match checkout');
  if (checkoutPrices.shipping) expectShipping(result.shipping, checkoutPrices.shipping, 'thank-you shipping should match checkout');
  if (checkoutPrices.tax) expectMoney(result.tax, checkoutPrices.tax, 'thank-you tax should match checkout');
  // CC technology-fee parity (GI Check_Order_Details step 10): result.ccFee comes
  // from the thank-you table (flows.ts), so this compares thank-you vs checkout.
  if (checkoutPrices.ccFee) expectMoney(result.ccFee, checkoutPrices.ccFee, 'thank-you CC fee should match checkout');
  expectMoney(result.total, checkoutPrices.total, 'thank-you total should match checkout');
}

/**
 * Money-correctness (GI Check_Total): the captured checkout numbers must add up —
 * total === subtotal − discount + tax + shipping + fee — and subtotal === unitPrice × qty.
 * Shipping that renders as a method label (local pickup) / "Free" counts as 0, as GI does.
 */
export function assertMoneyMath(
  values: { unitPrice: string; subtotal: string; shipping: string; tax: string; ccFee: string; total: string },
  opts?: { qty?: number; discount?: string }
): void {
  const qty = opts?.qty ?? 1;
  const n = (s: string | undefined): number => {
    const v = toAmount(s ?? ''); // NaN for a label like "Pick-Up at Retail Location" → 0
    return Number.isNaN(v) ? 0 : v;
  };
  const subtotal = n(values.subtotal);
  const discount = n(opts?.discount);
  const tax = n(values.tax);
  const shipping = n(values.shipping);
  const fee = n(values.ccFee);
  const total = n(values.total);
  const computed = Number((subtotal - discount + tax + shipping + fee).toFixed(2));

  expect(total, `total should equal subtotal − discount + tax + shipping + fee (total=${total}, computed=${computed})`).toBeCloseTo(computed, 2);
  expect(subtotal, `subtotal should equal unitPrice × ${qty} (subtotal=${subtotal}, unit=${n(values.unitPrice)})`).toBeCloseTo(n(values.unitPrice) * qty, 2);
}

/**
 * Thank-you page detail parity (GI Check_Order_Details): order note, billing +
 * (distinct) shipping address, and the selected variation labels. Must run while
 * the shopper is still on the order-received page (before assertMyAccount navigates).
 */
export async function assertThankYouDetails(page: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  // Order note — rendered as a row in the order-details table / customer note area.
  const orderRegion = norm(
    (await page.locator('.woocommerce-order, .woocommerce-order-details, section.woocommerce-customer-details').first().textContent().catch(() => '')) ?? ''
  );
  expect(orderRegion, 'thank-you should display the customer order note').toContain(ORDER_NOTE);

  // Billing address.
  const billing = await page
    .locator('.woocommerce-column--billing-address address, .woocommerce-column--1 address, section.woocommerce-customer-details address')
    .first()
    .textContent()
    .catch(() => '');
  expectContainsAll(billing, BILLING_TOKENS, 'thank-you billing address');

  // Distinct shipping address — only new/guest checkout enters one (see fillCheckout).
  if (config.user !== 'logged') {
    const shipping = await page
      .locator('.woocommerce-column--shipping-address address, .woocommerce-column--2 address')
      .first()
      .textContent()
      .catch(() => '');
    expectContainsAll(shipping, SHIPPING_TOKENS, 'thank-you shipping address');
  }

  // Variation labels appear in the product-name cell of the order table.
  if (result.variations?.length) {
    const prod = norm((await page.locator('td.woocommerce-table__product-name, td.product-name').first().textContent().catch(() => '')) ?? '');
    for (const v of result.variations) {
      expect(prod, `thank-you product row should show variation "${v}"`).toContain(v);
    }
  }
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

  // --- Depth (GI Check_order_Details_in_backend) -------------------------------

  // Customer email (mailto) + phone (tel).
  const mailHref = (await adminPage.locator('a[href*="mailto:"]').first().getAttribute('href').catch(() => '')) ?? '';
  expect(mailHref, `admin should link the customer email ${result.email}`).toContain(result.email);
  const telText = (await adminPage.locator('a[href^="tel:"]').first().textContent().catch(() => '')) ?? '';
  expect(digits(telText), 'admin should show the customer phone').toContain(digits(BILLING.phone));

  // Customer-provided order note.
  const adminNote = (await adminPage.locator('.order_note, ul.order_notes').first().textContent().catch(() => '')) ?? '';
  expect(norm(adminNote), 'admin should show the customer order note').toContain(ORDER_NOTE);

  // Billing + (distinct) shipping address blocks.
  const adminBilling = await adminPage.locator('div.order_data_column:nth-of-type(2) .address').first().textContent().catch(() => '');
  expectContainsAll(adminBilling, BILLING_TOKENS, 'admin billing address');
  if (config.user !== 'logged') {
    const adminShipping = await adminPage.locator('div.order_data_column:nth-of-type(3) .address').first().textContent().catch(() => '');
    expectContainsAll(adminShipping, SHIPPING_TOKENS, 'admin shipping address');
  }

  // Line-item cost = unit price; CC fee line; free-pickup shipping row = $0.
  const itemCost = (await adminPage.locator('td.item_cost .woocommerce-Price-amount.amount bdi, td.item_cost .woocommerce-Price-amount.amount').first().textContent().catch(() => '')) ?? '';
  if (itemCost) expectMoney(itemCost, result.unitPrice, 'admin line-item cost should match the unit price');
  const adminFee = (await adminPage.locator('#order_fee_line_items td.line_cost .woocommerce-Price-amount.amount bdi, #order_fee_line_items td.line_cost .woocommerce-Price-amount.amount').first().textContent().catch(() => '')) ?? '';
  if (adminFee && result.ccFee) expectMoney(adminFee, result.ccFee, 'admin CC fee line should match the captured fee');
  const adminShipRow = adminPage.locator('tr.shipping td.line_cost .view .woocommerce-Price-amount.amount').first();
  if ((await adminShipRow.count()) > 0) {
    expect(toAmount((await adminShipRow.textContent().catch(() => '')) ?? ''), 'admin shipping (free local pickup) should be $0').toBeCloseTo(0, 2);
  }

  // Variation labels in the admin line-item name.
  if (result.variations?.length) {
    const adminProd = norm((await adminPage.locator('.woocommerce_order_items td.name, #order_line_items td.name').first().textContent().catch(() => '')) ?? '');
    for (const v of result.variations) {
      expect(adminProd, `admin line item should show variation "${v}"`).toContain(v);
    }
  }
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

  // Reload to see updated notes + refund rows
  await adminPage.reload();
  await adminPage.waitForLoadState('load');

  // --- Refund depth (GI Place_Order Refund steps 20-24) ------------------------

  // Status → Refunded.
  const refundStatus =
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    ((await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => '')) ?? '');
  expect(refundStatus, 'order status should be Refunded after a full refund').toMatch(/refund/i);

  // A refund line is present, showing the full order total as a negative amount.
  await expect(adminPage.locator('tr.refund td.name').first(), 'a refund line should be present').toBeVisible();
  const refundLine = (await adminPage.locator('tr.refund td.line_cost .woocommerce-Price-amount.amount').first().textContent().catch(() => '')) ?? '';
  expect(Math.abs(toAmount(refundLine)), 'refund line should equal the order total').toBeCloseTo(toAmount(result.total), 2);

  // Refunded-total column matches the order total.
  const refundedTotal = (await adminPage.locator('td.total.refunded-total .woocommerce-Price-amount.amount bdi, td.total.refunded-total .woocommerce-Price-amount.amount').first().textContent().catch(() => '')) ?? '';
  if (refundedTotal) {
    expect(Math.abs(toAmount(refundedTotal)), 'refunded-total should equal the order total').toBeCloseTo(toAmount(result.total), 2);
  }

  // Refund note carries the refunded amount (GI: "Refund with amount of {{total}}").
  const totalPattern = toAmount(result.total).toFixed(2).replace('.', '\\.');
  await expectOrderNoteMatches(
    adminPage,
    new RegExp(`accept\\.blue Gateway v2 Refund with amount of \\$?${totalPattern}`),
    'admin should have an Accept.Blue refund note with the refunded amount'
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

  // Depth (GI Place_Order Email): order note, CC fee, billing name, variations.
  expect(text, 'email should include the customer order note').toContain(ORDER_NOTE);
  if (result.ccFee && toAmount(result.ccFee) > 0) {
    expect(compact, `email should show the CC fee ${result.ccFee}`).toContain(amount(result.ccFee));
  }
  expect(text, 'email should include the billing name').toContain(`${BILLING.firstName} ${BILLING.lastName}`);
  for (const v of result.variations ?? []) {
    expect(text, `email should show variation "${v}"`).toContain(v);
  }
}

/** Email parity: find refund email in Mailpit. */
export async function assertRefundEmail(result: OrderResult): Promise<void> {
  const msg = await findEmail(result.email, { subjectFilter: 'refund' });
  expect(msg, `refund email for ${result.email} should arrive`).not.toBeNull();

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  const compact = text.replace(/[\s,]+/g, '');
  expect(text, `refund email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  // GI Refund_Email: the refunded amount (= full order total) appears in the email.
  expect(compact, `refund email should show the refunded total ${result.total}`).toContain(toAmount(result.total).toFixed(2));
}
