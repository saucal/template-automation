// Account / auth helpers. Login uses the Login-With-Ajax plugin (spinner
// .lwa-loading appears then disappears). Forgot-password reads the reset link
// through the email abstraction.
import { type Page, expect } from '@playwright/test';
import { PATHS } from './openstudio';
import { forgotPasswordLink } from './email';

export async function loginAccount(page: Page, email: string, password: string): Promise<void> {
  await page.goto(PATHS.myAccount, { waitUntil: 'load' });
  const trigger = page.locator('button.header-account-button, a[href*="/my-account/"]').first();
  if (await trigger.count()) await trigger.click().catch(() => {});
  await page.locator('#username, input[name="username"]').first().fill(email);
  await page.locator('#password, input[name="password"]').first().fill(password);
  await page.locator('button[name="login"], input.button-primary[value="Log In"]').first().click();
  await page.locator('.lwa-loading').first().waitFor({ state: 'hidden' }).catch(() => {});
}

export async function logoutAccount(page: Page): Promise<void> {
  await page.goto(PATHS.myAccount, { waitUntil: 'load' });
  await page.getByRole('link', { name: /Log out/i }).first().click();
}

export async function assertMyAccountLinks(page: Page): Promise<void> {
  await page.goto(PATHS.myAccount, { waitUntil: 'load' });
  await expect(page.locator(`a[href*="${PATHS.orders}"]`).first()).toBeVisible();
  await expect(page.locator(`a[href*="${PATHS.dashboard}"]`).first()).toBeVisible();
}

/**
 * Request a password reset, read the reset link from the inbox, set a new
 * password. `emailPage` is the email-context page; `page` is the shopper page.
 */
export async function forgotPassword(page: Page, emailPage: Page, email: string, newPassword: string): Promise<void> {
  await page.goto(PATHS.lostPassword, { waitUntil: 'load' });
  await page.locator('#user_login, input[name="email"]').first().fill(email);
  await page.locator('button[name="recovery_password"], button.woocommerce-Button[type="submit"]').first().click();
  await expect(page.locator('.woocommerce-message, .wc-block-components-notice-banner.is-success').first())
    .toContainText(/Password reset email has been sent/i);

  const link = await forgotPasswordLink(emailPage, email);
  await page.goto(link, { waitUntil: 'load' });
  await page.locator('#password_1').fill(newPassword);
  await page.locator('#password_2').fill(newPassword);
  await page.locator('button[type="submit"]').first().click();
  await expect(page.locator('.woocommerce-message').first()).toContainText(/password has been reset/i);
}
