// High-level order/account flow orchestrators. Compose helpers/vesica.ts steps and
// return a captured OrderResult; NO expect() here (assertions live in assertions.ts).
import { type Page } from '@playwright/test';
import type { OrderConfig, OrderResult } from '../types/test-config';
import {
  addToCart,
  goToCart,
  proceedToCheckout,
  fillCheckoutAddress,
  placeOrderAuthNet,
  payPayPal,
  readOrderReceived,
  requestPasswordReset,
  setNewPassword,
  BILLING,
  brandConfig,
  orderEmail,
} from './vesica';

export interface OrderPages {
  shopperPage: Page;
  adminPage?: Page;
  emailPage?: Page;
}

/**
 * Place an order end-to-end and capture it. Steps:
 *  1. prime home, add the product, click to cart, proceed to checkout
 *  2. fill billing (unique per-run email unless a reused account email is given)
 *  3. pay (Auth.Net CC test-prefilled, or PayPal PPCP popup)
 *  4. read order-received into an OrderResult (the capture-once parity source)
 */
export async function runOrderFlow(
  { shopperPage: page }: OrderPages,
  config: OrderConfig
): Promise<OrderResult> {
  const email = config.accountEmail ?? orderEmail(config.testId.toLowerCase().replace(/[^a-z0-9]+/g, '_'));

  await page.goto('/', { waitUntil: 'load' });
  await addToCart(page, (config.product ?? brandConfig.product).id);
  await goToCart(page);
  await proceedToCheckout(page);
  await fillCheckoutAddress(page, { ...BILLING, email });

  if (config.payment === 'paypal') await payPayPal(page);
  else await placeOrderAuthNet(page);

  const result = await readOrderReceived(page, config);
  result.billingEmail = email;
  return result;
}

/** Register a new account (passwordless) at /my-account/ — returns the email used.
 *  Verification (set-password via email link) is asserted separately. */
export async function runRegisterFlow(page: Page): Promise<string> {
  const email = orderEmail('reg');
  await page.goto('my-account/', { waitUntil: 'load' });
  await page.locator('#reg_email').fill(email).catch(async () => {
    await page.locator('input[name="email"]').first().fill(email);
  });
  // Some register forms arm submit on the password field's blur; this site's
  // registration is passwordless (email only) so a direct submit is fine.
  await page.getByRole('button', { name: /register/i })
    .or(page.locator('button[name="register"]'))
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
