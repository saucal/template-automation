// ALL expect() calls live here (rule 6). Implements the capture-once parity model:
// facts captured ONCE at order-received (OrderResult) are re-asserted on My Account,
// the admin editor, and the order email. Every expect carries a message (rule 19).
import { expect, type Page } from '@playwright/test';
import type { OrderConfig, OrderResult } from '../types/test-config';
import { toAmount, readTotals, openAdminOrder, readAdminOrderStatus, readOrderNotes, ORDER_DETAILS_TABLE } from './vesica';
import { ctxFor, resilientText } from './resilient';
import { findEmail } from './playgrounds-email';

/** True when both strings are numeric money and equal to the cent. */
function moneyEq(a: string | undefined, b: string | undefined): boolean {
  const na = toAmount(a), nb = toAmount(b);
  if (Number.isNaN(na) || Number.isNaN(nb)) return false;
  return Math.abs(na - nb) < 0.01;
}

/**
 * Thank-you internal consistency: total = subtotal + shipping + tax (tax-exclusive
 * region — Vesica is US, AvaTax adds a Tax row). Rows legitimately absent read as 0.
 */
export function assertOrderParity(result: OrderResult, config: OrderConfig): void {
  const { subtotal, shipping, tax, total } = result.totals;
  const sum = [subtotal, shipping, tax].reduce((acc, v) => acc + (Number.isNaN(toAmount(v)) ? 0 : toAmount(v)), 0);
  expect(
    Math.abs(sum - toAmount(total)),
    `[${config.testId}] order total ${total} should equal subtotal+shipping+tax (${subtotal}+${shipping}+${tax})`
  ).toBeLessThan(0.01);

  const expectedLabel = config.payment === 'paypal' ? /paypal/i : /credit card/i;
  expect(
    result.paymentLabel,
    `[${config.testId}] thank-you payment label "${result.paymentLabel}" should match ${expectedLabel}`
  ).toMatch(expectedLabel);
}

/**
 * My Account view-order parity. Guest users have no account (rule 18) — skip early.
 * Re-reads totals + payment label on view-order and compares to the captured result.
 */
export async function assertMyAccount(shopperPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  // Only a logged-in shopper reaches view-order; guest/new checkout redirects to
  // login (rule 18). My-account parity is asserted on the logged-user order.
  if (config.user !== 'logged') return;

  await shopperPage.goto(`my-account/view-order/${result.postId}/`, { waitUntil: 'load' });
  const ctx = ctxFor(shopperPage);

  const label = await resilientText(ctx, {
    primary: shopperPage.locator('li.woocommerce-order-overview__payment-method.method > strong')
      .or(shopperPage.locator('.woocommerce-order-details, .order_details')),
    ai: 'the payment method on the my-account order view',
  });
  expect(
    label.toLowerCase(),
    `[${config.testId}] my-account payment label should include "${result.paymentLabel}"`
  ).toContain(result.paymentLabel.toLowerCase());

  const totals = await readTotals(shopperPage, ORDER_DETAILS_TABLE);
  expect(
    moneyEq(totals.total, result.totals.total),
    `[${config.testId}] my-account total ${totals.total} should equal thank-you total ${result.totals.total}`
  ).toBeTruthy();
}

/**
 * Admin editor parity (legacy post.php): status matches config, and the gateway
 * "Payment via <Method>" order note is present (scan-all + regex, rule 16).
 */
export async function assertBackend(adminPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  await openAdminOrder(adminPage, result.postId);

  const status = await readAdminOrderStatus(adminPage);
  expect(
    status,
    `[${config.testId}] admin order status should be "${config.expectedStatus}"`
  ).toBe(config.expectedStatus.toLowerCase());

  const notes = await readOrderNotes(adminPage);
  const label = config.payment === 'paypal' ? 'PayPal' : 'Credit Card';
  const notePattern = new RegExp(`Payment via ${label}`, 'i');
  expect(
    notes.some((n) => notePattern.test(n)),
    `[${config.testId}] expected an admin order note matching ${notePattern}\nnotes:\n${notes.join('\n---\n')}`
  ).toBeTruthy();
}

/** Order email parity — the order-confirmation email carries the captured total. */
export async function assertOrderEmail(emailPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const msg = await findEmail(result.billingEmail, { subjectFilter: 'order', attempts: 40 });
  expect(msg, `[${config.testId}] an order email to ${result.billingEmail} should arrive`).not.toBeNull();
  const body = `${msg?.HTML ?? ''}${msg?.Text ?? ''}`;
  const totalNum = toAmount(result.totals.total).toFixed(2);
  expect(
    body.includes(totalNum) || body.includes(result.totals.total),
    `[${config.testId}] order email should show the total ${result.totals.total}`
  ).toBeTruthy();
}

/**
 * Post-refund parity. Call AFTER performRefund(). Status becomes the gateway's
 * refunded status (config-driven: Auth.Net → Refunded, a voiding gateway → Cancelled)
 * and a refund note is present.
 */
export async function assertRefund(adminPage: Page, config: OrderConfig): Promise<void> {
  const expectedStatus = (config.refund?.status ?? 'Refunded').toLowerCase();
  const status = await readAdminOrderStatus(adminPage);
  expect(
    status,
    `[${config.testId}] order status after refund should be "${expectedStatus}"`
  ).toBe(expectedStatus);

  const notes = await readOrderNotes(adminPage);
  const pattern = config.refund?.notePattern ?? /refund/i;
  expect(
    notes.some((n) => pattern.test(n)),
    `[${config.testId}] expected a refund note matching ${pattern}\nnotes:\n${notes.join('\n---\n')}`
  ).toBeTruthy();
}

/** Refund email parity — the customer refund email arrives for the order account. */
export async function assertRefundEmail(emailPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const msg = await findEmail(result.billingEmail, { subjectFilter: 'refund', contains: 'refund', attempts: 40 });
  expect(msg, `[${config.testId}] a refund email to ${result.billingEmail} should arrive`).not.toBeNull();
}

// ---------------------------------------------------------------------------
// Account flows
// ---------------------------------------------------------------------------

/** A page rendered its main content (not an error/empty shell) — behaviour, not pinned copy. */
export async function assertPageRenders(page: Page, name: string): Promise<void> {
  await expect(
    page.locator('main, #main, .elementor, article, .site-main').first(),
    `${name} page should render its main content`
  ).toBeVisible({ timeout: 15_000 });
}

/** The my-account nav is visible → the shopper is logged in. */
export async function assertLoggedIn(page: Page): Promise<void> {
  await expect(
    page.locator('.woocommerce-MyAccount-navigation'),
    'my-account navigation should be visible after login'
  ).toBeVisible({ timeout: 20_000 });
}

/** After requesting a reset, a confirmation notice shows. */
export async function assertPasswordResetRequested(page: Page): Promise<void> {
  await expect(
    page.locator('.woocommerce-message, .woocommerce-info').first(),
    'a password-reset confirmation notice should show'
  ).toContainText(/email|reset|link/i);
}

/** Extract the set-password / reset link from the emailed message for `email`. */
export async function resetLinkFromEmail(email: string): Promise<string> {
  const msg = await findEmail(email, { contains: 'password', attempts: 40 });
  expect(msg, `a set-password email to ${email} should arrive`).not.toBeNull();
  const body = `${msg?.HTML ?? ''}${msg?.Text ?? ''}`;
  // WooCommerce reset links land on /my-account/lost-password/?action=rp&key=…&login=…
  const url = body.match(/https?:\/\/[^\s"'<>]*(?:reset-password|lost-password|action=rp)[^\s"'<>]*/i)?.[0];
  expect(url, `the email should contain a set-password link\nbody:\n${body.slice(0, 500)}`).toBeTruthy();
  return url as string;
}

/** After setting a new password, WooCommerce confirms the change. */
export async function assertPasswordWasReset(page: Page): Promise<void> {
  await expect(
    page.locator('.woocommerce-message, .woocommerce-MyAccount-content, body').first(),
    'a password-changed confirmation should show'
  ).toContainText(/password.*(changed|reset|updated)|log in/i);
}
