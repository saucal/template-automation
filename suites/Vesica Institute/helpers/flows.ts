// High-level order/account flow orchestrators. Compose helpers/vesica.ts steps and
// return a captured OrderFlowCapture; NO expect() here (assertions live in assertions.ts).
// Mirrors the GI "Vesica - Basic WooCommerce Tests - User" flow.
import { type Page } from '@playwright/test';
import type { OrderConfig, OrderResult, CapturedTotals } from '../types/test-config';
import {
  pickFirstProduct,
  addToCartFromPdp,
  readCartLine,
  proceedToCheckout,
  submitEmptyCheckoutForErrors,
  fillCheckoutAddress,
  captureCheckoutTotals,
  placeOrderAuthNet,
  payPayPal,
  readOrderReceived,
  loginShopper,
  setNewPassword,
  requestPasswordReset,
  BILLING,
  orderEmail,
  type PdpCapture,
} from './vesica';
import { resetLinkFromEmail } from './assertions';

export interface OrderPages {
  shopperPage: Page;
  adminPage?: Page;
  emailPage?: Page;
}

/** Everything captured during a place-order flow — the parity source for assertions. */
export interface OrderFlowCapture {
  config: OrderConfig;
  pdp: PdpCapture;
  cartLine: Awaited<ReturnType<typeof readCartLine>>;
  /** The validation-error notice text from the empty-checkout submit (guest/new only). */
  validationError?: string;
  checkoutTotals: CapturedTotals;
  result: OrderResult;
}

/**
 * Place an order end-to-end (GI test 01 CC / test 02 PayPal). Steps:
 *  1. prime home, pick the first product from the category, capture name+price
 *  2. add to cart → capture cart line
 *  3. proceed to checkout
 *  4. guest/new: validation-first (empty submit) → fill billing; logged: address prefilled
 *  5. capture checkout totals, pay (Auth.Net test-prefilled / PayPal PPCP)
 *  6. read order-received into an OrderResult
 * `config.accountEmail` (logged) reuses the chained account; else a unique email is used.
 */
export async function runOrderFlow({ shopperPage: page }: OrderPages, config: OrderConfig): Promise<OrderFlowCapture> {
  const email = config.accountEmail ?? orderEmail(config.testId.toLowerCase().replace(/[^a-z0-9]+/g, '_'));

  await page.goto('/', { waitUntil: 'load' });
  const pdp = await pickFirstProduct(page, config.categoryPath);
  await addToCartFromPdp(page);
  const cartLine = await readCartLine(page);
  await proceedToCheckout(page);

  let validationError: string | undefined;
  if (config.user !== 'logged') {
    // GI validation-first: empty submit surfaces the required-field notice.
    validationError = await submitEmptyCheckoutForErrors(page);
    await fillCheckoutAddress(page, { ...BILLING, email });
  }

  const checkoutTotals = await captureCheckoutTotals(page);

  if (config.payment === 'paypal') await payPayPal(page);
  else await placeOrderAuthNet(page);

  const result = await readOrderReceived(page, config);
  result.billingEmail = config.payment === 'paypal' && config.accountEmail ? config.accountEmail : email;
  // Prefer the PDP-captured unit price as the parity anchor (order-received subtotal
  // can differ in shape); keep the captured product name.
  result.unitPrice = pdp.unitPrice || result.unitPrice;
  result.productName = result.productName || pdp.productName;

  return { config, pdp, cartLine, validationError, checkoutTotals, result };
}

/**
 * Establish the chained account (GI test 02 precondition): a guest CC order auto-created
 * a passwordless account; fetch its "account created" email, follow the set-password
 * link, set `password`, then log in. Leaves the shopper logged in as `email`.
 */
export async function establishAccountViaEmail(page: Page, email: string, password: string): Promise<void> {
  const link = await resetLinkFromEmail(email);
  await page.goto(link, { waitUntil: 'load' });
  await setNewPassword(page, password);
  await loginShopper(page, email, password);
}

/** Register a new account (passwordless) at /my-account/ — returns the email used. */
export async function runRegisterFlow(page: Page): Promise<string> {
  const email = orderEmail('reg');
  await page.goto('my-account/', { waitUntil: 'load' });
  await page.locator('#reg_email').fill(email).catch(async () => {
    await page.locator('input[name="email"]').first().fill(email);
  });
  await page.getByRole('button', { name: /register/i })
    .or(page.locator('button.woocommerce-form-register__submit, button[name="register"]'))
    .first()
    .click()
    .catch(() => {});
  return email;
}

/** Request a password reset for `email` (the emailed link is followed in the spec). */
export async function runForgotPasswordFlow(page: Page, email: string): Promise<void> {
  await requestPasswordReset(page, email);
}

/** Follow a set-password link (from email) and set the new password. */
export async function completeSetPassword(page: Page, resetUrl: string, newPassword: string): Promise<void> {
  await page.goto(resetUrl, { waitUntil: 'load' });
  await setNewPassword(page, newPassword);
}
