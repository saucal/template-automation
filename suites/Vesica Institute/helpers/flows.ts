// High-level order flow orchestrator. Composes helpers/purcrystal.ts steps and returns
// a captured OrderFlowCapture; NO expect() here (assertions live in assertions.ts).
// Mirrors the GI "Pur Crystal - Basic WooCommerce Tests - User" flow (CC, qty 2,
// ship-to-different-address).
import { type Page } from '@playwright/test';
import type { OrderConfig, OrderResult, CapturedTotals } from '../types/test-config';
import {
  pickFirstProduct,
  addToCartFromPdp,
  readCartLine,
  proceedToCheckout,
  selectCreditCard,
  submitEmptyCheckoutForErrors,
  fillCheckoutAddress,
  enableCreateAccount,
  fillShippingAddress,
  captureCheckoutTotals,
  placeOrderAuthNet,
  payPayPal,
  readOrderReceived,
  loginShopper,
  logoutShopper,
  setNewPassword,
  requestPasswordReset,
  BILLING,
  SHIPPING,
  DEFAULT_QTY,
  orderEmail,
  type PdpCapture,
} from './purcrystal';
import { resetLinkFromEmail } from './assertions';
import { ctxFor, resilientFill, resilientClick } from './resilient';

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
  const pdp = await pickFirstProduct(page, config.categoryPath, { qty: config.qty ?? DEFAULT_QTY, type: 'simple' });
  await addToCartFromPdp(page);
  const cartLine = await readCartLine(page);
  await proceedToCheckout(page);

  // PC's default gateway (ppcp-card-button) hides the classic #place_order button;
  // select Auth.Net first so the place-order button exists for the validation-first submit.
  await selectCreditCard(page);
  // GI Pur Crystal orders as a guest: validation-first, fill billing, ship-to-different.
  const validationError = await submitEmptyCheckoutForErrors(page);
  await fillCheckoutAddress(page, { ...BILLING, email });
  // GI creates an account during checkout → purchaser auto-logs-in for My-Account parity.
  await enableCreateAccount(page);
  if (config.shipToDifferent) await fillShippingAddress(page, SHIPPING);

  const checkoutTotals = await captureCheckoutTotals(page);

  if (config.payment === 'paypal') await payPayPal(page);
  else await placeOrderAuthNet(page);

  const result = await readOrderReceived(page, config);
  result.billingEmail = email;
  result.unitPrice = pdp.unitPrice || result.unitPrice;
  result.productName = result.productName || pdp.productName;

  return { config, pdp, cartLine, validationError, checkoutTotals, result };
}

// ---------------------------------------------------------------------------
// Account flows (register / login / forgot-password). Mirrors the Vesica GI
// "Register user" + "Forgot password flow" tests. This site registers
// PASSWORDLESS — the account-created email carries a "set your new password"
// link (same set-password page as a reset), so registration and reset share
// completeSetPassword. NO expect() here — assertions live in assertions.ts.
// ---------------------------------------------------------------------------

/**
 * Register a new account (passwordless) at /my-account/ — returns the email used.
 * The confirmation email carries the set-password link (followed by the spec).
 */
export async function runRegisterFlow(page: Page): Promise<string> {
  const email = orderEmail('reg');
  await page.goto('my-account/', { waitUntil: 'load' });
  const ctx = ctxFor(page);
  await resilientFill(
    ctx,
    { primary: page.locator('#reg_email'), alt: page.locator('input[name="email"]').first(), ai: 'the registration email field' },
    email
  );
  await resilientClick(ctx, {
    primary: page.getByRole('button', { name: /register/i }),
    alt: page.locator('button.woocommerce-form-register__submit, button[name="register"]').first(),
    ai: 'the Register button',
  });
  return email;
}

/** Follow a set-password link (from email) and set the new password. */
export async function completeSetPassword(page: Page, resetUrl: string, newPassword: string): Promise<void> {
  // The link is an ESP tracking redirect (track.smtpsendemail.com → kinsta reset page);
  // 'load' never settles through the redirect chain + Cloudflare — wait for DOM only.
  await page.goto(resetUrl, { waitUntil: 'domcontentloaded' });
  await setNewPassword(page, newPassword);
}

/**
 * Establish a usable account from a just-registered email: follow the set-password
 * link, set `password`, then log in. Leaves the shopper logged in as `email`.
 */
export async function establishAccountViaEmail(page: Page, email: string, password: string): Promise<void> {
  const link = await resetLinkFromEmail(email);
  await completeSetPassword(page, link, password);
  await logoutShopper(page);
  await loginShopper(page, email, password);
}

/** Request a password reset for `email` (the emailed link is followed in the spec). */
export async function runForgotPasswordFlow(page: Page, email: string): Promise<void> {
  await requestPasswordReset(page, email);
}
