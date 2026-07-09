// Customer account-flow helpers: registration, My Account tabs, login, forgot-password.
// Actions go through the resilient wrapper (rule 23).
import { expect, type Page } from '@playwright/test';
import { dismissOverlays, uncheckNewsletters } from './repurposed';
import { findEmail } from './playgrounds-email';
import { ctxFor, resilientClick, resilientFill, resilientText } from './resilient';

/**
 * Follow a WooCommerce set-password email link and set the password. Shared by
 * passwordless registration ("account has been created" email) and forgot-password
 * ("password reset" email) — same #password_1/#password_2 set-password page.
 */
async function setPasswordViaEmail(page: Page, email: string, password: string, subjectFilter: string): Promise<void> {
  const ctx = ctxFor(page);
  const msg = await findEmail(email, { subjectFilter });
  expect(msg, `a set-password email (subject "${subjectFilter}") for ${email} should arrive in Mailpit`).not.toBeNull();

  const html = msg!.HTML ?? '';
  const link =
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*(?:set|reset)[^<]*password/i)?.[1] ??
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*click here/i)?.[1];
  expect(link, 'email should contain a set/reset-password link').toBeTruthy();

  await page.goto(link!.replace(/&amp;/g, '&'));
  await page.waitForLoadState('load');
  await page.locator('#password_1').waitFor({ state: 'visible', timeout: 15_000 });
  await resilientFill(ctx, { primary: page.locator('#password_1'), ai: 'the new password field' }, password);
  await resilientFill(ctx, { primary: page.locator('#password_2'), ai: 'the confirm password field' }, password);
  await resilientClick(ctx, {
    primary: page.getByRole('button', { name: /save|reset|set password/i }).or(page.locator('button[type="submit"].woocommerce-Button')),
    ai: 'the save / reset password button',
  });
  await page.waitForLoadState('load');
}

/**
 * Register a new customer account (GI parity, Basic test 12). Registration here is
 * PASSWORDLESS — "A link to set a new password will be sent to your email address" —
 * so we register with email only, opt out of the newsletter, then verify the email
 * by following the "account has been created" set-password link and setting the
 * password. WooCommerce logs the customer in once the password is set.
 */
export async function registerCustomer(page: Page, email: string, password: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('/my-account/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);

  await resilientFill(ctx, { primary: page.locator('#reg_email'), ai: 'the registration email field' }, email);

  // Opt out of the newsletter (checked by default on this site).
  await uncheckNewsletters(page);

  await resilientClick(ctx, {
    primary: page.locator('button[name="register"]'),
    alt: page.getByRole('button', { name: /register/i }),
    ai: 'the Register button',
  });
  await page.waitForLoadState('load');
  await logoutAccount(page); // ensure we're logged out before verifying the email (some sites log you in immediately after registration, others only after setting the password)
  // Verify the email + set the password via the "account has been created" link.
  await setPasswordViaEmail(page, email, password, 'created');

  // Setting the password logs the customer in.
  await expect(
    page.locator('a[href*="customer-logout"], .woocommerce-MyAccount-navigation').first(),
    'should be logged in after setting the account password'
  ).toBeVisible();
}

/** Login with username + password. */
export async function loginAccount(page: Page, username: string, password: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('/my-account/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);

  await resilientFill(ctx, { primary: page.locator('#username'), ai: 'the username field' }, username);
  await resilientFill(ctx, { primary: page.locator('#password'), ai: 'the password field' }, password);
  await resilientClick(ctx, {
    primary: page.locator('button[name="login"]'),
    alt: page.getByRole('button', { name: /log in/i }),
    ai: 'the Log in button',
  });
  await page.waitForLoadState('load');

  await expect(
    page.locator('.woocommerce-MyAccount-navigation, .woocommerce-MyAccount-content').first(),
    'should be logged into My Account'
  ).toBeVisible();
}

/** Log out of the account. */
export async function logoutAccount(page: Page): Promise<void> {
  await page.goto('/my-account/customer-logout/');
  await page.waitForLoadState('load').catch(() => {});
  await page.getByRole('link', { name: /confirm and log out/i }).first().click({ timeout: 3_000 }).catch(() => {});
}

/** Assert the standard My Account tabs render for a logged-in customer. */
export async function assertMyAccountTabs(page: Page): Promise<void> {
  await page.goto('/my-account/orders/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);
  await expect(
    page.locator('.woocommerce-orders-table, .woocommerce-info').first(),
    'Orders tab should render'
  ).toBeVisible();

  await page.goto('/my-account/store-credit/');
  await page.waitForLoadState('load');
  await expect(page.locator('.acfw-store-credit-history, .woocommerce-info').first(), 'Store Credits tab should render').toBeVisible();

  await page.goto('/my-account/downloads/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-info, .woocommerce-order-downloads').first(),
    'Downloads tab should render'
  ).toBeVisible();

  await page.goto('/my-account/edit-address/');
  await page.waitForLoadState('load');
  await expect(page.locator('.woocommerce-Addresses, .woocommerce-Address').first(), 'Addresses tab should render').toBeVisible();

  await page.goto('/my-account/payment-methods/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-PaymentMethods, .woocommerce-info').first(),
    'Payment methods tab should render'
  ).toBeVisible();

  await page.goto('/my-account/edit-account/');
  await page.waitForLoadState('load');
  await expect(page.locator('.woocommerce-EditAccountForm, form.edit-account').first(), 'Account details form should render').toBeVisible();
}

/**
 * Forgot-password flow: request reset → follow the reset email link → set a new password.
 */
export async function forgotPassword(page: Page, email: string, newPassword: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('/my-account/lost-password/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);

  await resilientFill(ctx, { primary: page.locator('#user_login'), ai: 'the username / email field' }, email);
  await resilientClick(ctx, {
    primary: page.locator('button[value="Reset password"]').or(page.getByRole('button', { name: /reset password/i })),
    ai: 'the Reset password button',
  });
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-message').first(),
    'a password-reset confirmation should show'
  ).toContainText(/reset email has been sent|check your email/i);

  await setPasswordViaEmail(page, email, newPassword, 'password');
  await expect(
    page.locator('.woocommerce-message').first(),
    'password should be reset successfully'
  ).toContainText(/reset successfully/i);
}
