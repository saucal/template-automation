// Customer account-flow helpers for No Pong — registration, My Account tabs,
// login/logout, forgot-password. Replaces GI Basic tests 09 (registration / My
// Account links / login) and 11 (forgot-password).
//
// No Pong registration is INLINE-PASSWORD (#reg_email + #reg_password) — NOT the
// passwordless "set password via email" flow leggari used. So registration needs
// no email round-trip; only forgot-password reads the reset link from Mailpit.
//
// Every DOM action/read goes through the resilient wrapper (rule 23). The
// cohesive `assertMyAccountLinks` keeps its expects here (rule 6 exception for a
// feature-cohesive assert helper); every expect carries a message (rule 19).
import { expect, type Page } from '@playwright/test';
import { dismissPopups } from './nopong';
import { findEmail } from './playgrounds-email';
import { ctxFor, resilientClick, resilientFill, resilientText } from './resilient';

/**
 * Register a new customer (inline password). Lands logged-in on the My Account
 * dashboard. GI: common "Registration" → #reg_email / #reg_password / submit.
 */
export async function registerNewUser(page: Page, email: string, password: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('my-account/?sc_bypass=1');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  await resilientFill(ctx, { primary: page.locator('#reg_email'), ai: 'the registration email field' }, email);
  await resilientFill(ctx, { primary: page.locator('#reg_password'), ai: 'the registration password field' }, password);
  // The register form only arms after the password field fires a blur/change
  // (password-strength validation). `.fill()` sets the value without blurring,
  // so the first Register click is otherwise absorbed and the submit no-ops.
  await page.locator('#reg_password').blur().catch(() => {});
  await resilientClick(ctx, {
    primary: page.locator('button.woocommerce-form-register__submit'),
    alt: page.getByRole('button', { name: /register/i }),
    ai: 'the Register button',
  });
  await page.waitForLoadState('load');

  await expect(
    page.locator('.woocommerce-MyAccount-navigation, .woocommerce-account-dashboard').first(),
    'registration should land on the logged-in My Account dashboard'
  ).toBeVisible({ timeout: 15_000 });
}

/**
 * Assert the standard My Account tabs render their empty-state notices for a
 * freshly-registered customer. GI 09: Orders / Subscriptions / Addresses /
 * Payment methods / Account details.
 */
export async function assertMyAccountLinks(page: Page): Promise<void> {
  const ctx = ctxFor(page);

  await page.goto('my-account/orders/');
  await page.waitForLoadState('load');
  const orders = await resilientText(ctx, {
    primary: page.locator('.woocommerce-info, .wc-block-components-notice-banner__content').first(),
    ai: 'the empty-orders notice',
  });
  expect(orders, 'Orders tab should show the no-orders notice').toMatch(/no order has been made/i);

  await page.goto('my-account/subscriptions/');
  await page.waitForLoadState('load');
  const subs = await resilientText(ctx, {
    primary: page.locator('div.woocommerce_account_subscriptions p, .woocommerce-info').first(),
    ai: 'the no-subscriptions notice',
  });
  expect(subs, 'Subscriptions tab should show the no-active-subscriptions notice').toMatch(/no active subscriptions/i);

  await page.goto('my-account/edit-address/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('div.woocommerce-Addresses, .woocommerce-Address'),
    'Addresses tab should render the address columns'
  ).not.toHaveCount(0);

  await page.goto('my-account/payment-methods/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('a.button, .woocommerce-Message, .woocommerce-info').first(),
    'Payment methods tab should render (add-method button or empty notice)'
  ).toBeVisible({ timeout: 10_000 });

  await page.goto('my-account/edit-account/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('form.woocommerce-EditAccountForm, form.edit-account'),
    'Account-details form should render'
  ).not.toHaveCount(0);
}

/** Log out via the My Account logout link. */
export async function logoutAccount(page: Page): Promise<void> {
  await page.goto('my-account/customer-logout/');
  await page.waitForLoadState('load').catch(() => {});
  // Some themes interpose a "Confirm and log out" page.
  await page.getByRole('link', { name: /confirm and log out/i }).first().click({ timeout: 3_000 }).catch(() => {});
}

/** Log in to an existing account. GI common "Login": #username / #password. */
export async function loginAccount(page: Page, email: string, password: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('my-account/');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  await resilientFill(ctx, { primary: page.locator('#username'), ai: 'the login username / email field' }, email);
  await resilientFill(ctx, { primary: page.locator('#password'), ai: 'the login password field' }, password);
  await resilientClick(ctx, {
    primary: page.locator('button[name="login"]'),
    alt: page.getByRole('button', { name: /^log in$/i }),
    ai: 'the Log in button',
  });
  await page.waitForLoadState('load');

  await expect(
    page.locator('.woocommerce-MyAccount-navigation').first(),
    'login should reveal the My Account navigation'
  ).toBeVisible({ timeout: 15_000 });
}

/**
 * Forgot-password flow: request reset → follow the reset email link → set a new
 * password. GI 11: "Lost your password?" → #user_login → reset → email "Reset
 * your Password" link → #password_1/#password_2 → confirm. Leaves the account on
 * `newPassword`.
 */
export async function forgotPassword(page: Page, email: string, newPassword: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('my-account/lost-password/');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  await resilientFill(ctx, { primary: page.locator('#user_login'), ai: 'the username / email field' }, email);
  await resilientClick(ctx, {
    primary: page.locator('.woocommerce-Button.button').filter({ visible: true }).first(),
    alt: page.getByRole('button', { name: /reset password/i }),
    ai: 'the Reset password button',
  });
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-message, .wc-block-components-notice-banner__content').first(),
    'a password-reset confirmation should show'
  ).toContainText(/password reset email has been sent|check your email/i);

  // Follow the reset link from the email (may be a SendGrid-wrapped CTA).
  const msg = await findEmail(email, { subjectFilter: 'Password' });
  expect(msg, `a password-reset email for ${email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  const html = msg!.HTML ?? '';
  const link =
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*reset[^<]*password/i)?.[1] ??
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*(?:set|create)[^<]*password/i)?.[1] ??
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*click here/i)?.[1];
  expect(link, `reset email should contain a reset-password link\nsubject: ${msg!.Subject}`).toBeTruthy();

  await page.goto(link!.replace(/&amp;/g, '&'));
  await page.waitForLoadState('load');
  await dismissPopups(page);
  await page.locator('#password_1').waitFor({ state: 'visible', timeout: 15_000 });
  await resilientFill(ctx, { primary: page.locator('#password_1'), ai: 'the new password field' }, newPassword);
  await resilientFill(ctx, { primary: page.locator('#password_2'), ai: 'the confirm password field' }, newPassword);
  await resilientClick(ctx, {
    primary: page.locator('button.woocommerce-Button.button').filter({ visible: true }).first(),
    alt: page.getByRole('button', { name: /save|reset|set password/i }),
    ai: 'the save / reset password button',
  });
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-message, .wc-block-components-notice-banner__content').first(),
    'password should be reset successfully'
  ).toContainText(/password has been reset successfully/i);
}
