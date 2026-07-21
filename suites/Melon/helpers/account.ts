// Account flows (GI "07 Registration/Login" + "08 Forgot password"), built from the
// GI JSON. Registration is PASSWORDLESS (rule 28): submit email → "account created"
// email → follow the set-password link → set #password_1/#password_2 (verifies email
// AND logs in). Forgot-password reuses the same set-password page. GI captured the
// email via ghostinspector.com; here we use the Playgrounds plugin (rule 14).
//
// DOM + orchestration only — assertions live in assertions.ts.
import { type Page } from '@playwright/test';
import { closePopup } from './melon';
import { fetchPasswordLinkFromEmail } from './playgrounds-email';
import { ctxFor, resilientClick, resilientFill } from './resilient';

export const ACCOUNT = {
  registerEmailSubject: 'Your account on Melon Optics',
  resetEmailSubject: 'Password Reset for Melon Optics',
} as const;

const S = {
  regEmail: '#reg_email',
  register: 'button[name="register"]',
  username: '#username',
  password: '#password',
  login: 'button[name="login"]',
  pass1: '#password_1',
  pass2: '#password_2',
  setPasswordSubmit: 'button[type="submit"].woocommerce-Button, button[type="submit"]',
  lostPasswordLink: 'a[href*="/my-account/lost-password/"]',
  userLogin: '#user_login',
  lostPasswordSubmit: 'button[type="submit"].woocommerce-Button, button[value="Reset password"]',
  logout: '.account-navigation-wrap a[href*="/my-account/customer-logout/"]',
  accountNav: '.woocommerce-MyAccount-navigation',
  ordersTab: '.woocommerce-MyAccount-navigation a[href*="/orders"], .account-navigation-wrap a[href*="/orders"]',
} as const;

/** Unique per-run test email so repeated runs don't collide on an existing account. */
export function uniqueEmail(): string {
  return `qa+melon_${Date.now()}@playgrounds.saucal.io`;
}

/** Go to the My Account page (priming visit — rule 30 allows goto for account/backend pages). */
async function goToMyAccount(page: Page, region: { path: string; mocs: string }): Promise<void> {
  await page.goto(`${region.path}my-account/?mocs=${region.mocs}`);
  await page.waitForLoadState('load');
  await closePopup(page);
}

/**
 * Reach a placed order in My Account the customer way (rule 30): land on My Account
 * (account-page prime), click the Orders tab, then the order's "View" button — instead
 * of a direct goto to /view-order/<id>/. Assumes the shopper is logged in (the WFACP
 * checkout auto-creates + logs in the account).
 */
export async function openMyAccountOrder(
  page: Page,
  region: { path: string; mocs: string },
  orderNumber: string
): Promise<void> {
  await goToMyAccount(page, region);
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator(S.ordersTab).filter({ visible: true }).first(),
    ai: 'the Orders tab in the account navigation',
  });
  await page.waitForLoadState('load');
  await resilientClick(ctx, {
    primary: page.locator(`a.view[href*="view-order/${orderNumber}/"], a.woocommerce-button[href*="view-order/${orderNumber}/"]`).filter({ visible: true }).first(),
    ai: `the "View" button for order ${orderNumber}`,
  });
  await page.waitForLoadState('load');
}

/**
 * Open the password-setup email, follow its link on the shopper page, and set the
 * password (this verifies the email + logs the user in). Shared by register + forgot.
 */
async function followPasswordEmailAndSet(
  shopperPage: Page,
  emailPage: Page,
  email: string,
  subject: string,
  password: string
): Promise<void> {
  // Read the ESP tracker link off the rendered email (emailPage), then follow it
  // on the shopper page — it 302s to the real set-password page. The Listrak
  // tracker redirect chain can be slower than the suite's default 15s action
  // timeout, so give this specific navigation more headroom.
  const link = await fetchPasswordLinkFromEmail(emailPage, email, subject);
  await shopperPage.goto(link, { timeout: 45_000 });
  await shopperPage.waitForLoadState('load');
  await shopperPage.locator(S.pass1).waitFor({ state: 'visible', timeout: 20_000 });

  await resilientFill(ctxFor(shopperPage), { primary: shopperPage.locator(S.pass1), ai: 'the new password field' }, password);
  await resilientFill(ctxFor(shopperPage), { primary: shopperPage.locator(S.pass2), ai: 'the confirm password field' }, password);
  await resilientClick(ctxFor(shopperPage), { primary: shopperPage.locator(S.setPasswordSubmit).first(), ai: 'the Save password button' });
  await shopperPage.waitForLoadState('load');
}

/**
 * Register a new (passwordless) account and set its password via the emailed link.
 * Leaves the shopper logged in as the new account.
 */
export async function registerAccount(
  shopperPage: Page,
  emailPage: Page,
  region: { path: string; mocs: string },
  email: string,
  password: string
): Promise<void> {
  await goToMyAccount(shopperPage, region);
  await resilientFill(ctxFor(shopperPage), { primary: shopperPage.locator(S.regEmail), ai: 'the register email field' }, email);
  await resilientClick(ctxFor(shopperPage), { primary: shopperPage.locator(S.register), ai: 'the Register button' });
  await shopperPage.waitForLoadState('load');
  // Register auto-logs-in with a TEMP password + emails a set-password link; follow it
  // to set our known password (so the later log-in step can use it).
  await followPasswordEmailAndSet(shopperPage, emailPage, email, ACCOUNT.registerEmailSubject, password);
}

/** Log in with credentials on the My Account page. */
export async function loginAccount(
  shopperPage: Page,
  region: { path: string; mocs: string },
  email: string,
  password: string
): Promise<void> {
  await goToMyAccount(shopperPage, region);
  await resilientFill(ctxFor(shopperPage), { primary: shopperPage.locator(S.username), ai: 'the login username field' }, email);
  await resilientFill(ctxFor(shopperPage), { primary: shopperPage.locator(S.password), ai: 'the login password field' }, password);
  await resilientClick(ctxFor(shopperPage), { primary: shopperPage.locator(S.login), ai: 'the Log in button' });
  await shopperPage.waitForLoadState('load');
}

/** Log the current user out via the My Account logout link. */
export async function logout(shopperPage: Page): Promise<void> {
  await resilientClick(ctxFor(shopperPage), { primary: shopperPage.locator(S.logout).first(), ai: 'the Logout link' });
  await shopperPage.waitForLoadState('load');
}

/** Submit the lost-password form for an existing account (stops at the "email sent" notice). */
export async function requestPasswordReset(
  shopperPage: Page,
  region: { path: string; mocs: string },
  email: string
): Promise<void> {
  await goToMyAccount(shopperPage, region);
  await resilientClick(ctxFor(shopperPage), { primary: shopperPage.locator(S.lostPasswordLink).first(), ai: 'the Lost your password link' });
  await shopperPage.waitForLoadState('load');
  await resilientFill(ctxFor(shopperPage), { primary: shopperPage.locator(S.userLogin), ai: 'the reset email field' }, email);
  await resilientClick(ctxFor(shopperPage), { primary: shopperPage.locator(S.lostPasswordSubmit).first(), ai: 'the Reset password button' });
  await shopperPage.waitForLoadState('load');
}

/** Complete a requested reset via the emailed link, setting a new password. Leaves the shopper logged in. */
export async function completePasswordReset(
  shopperPage: Page,
  emailPage: Page,
  email: string,
  newPassword: string
): Promise<void> {
  await followPasswordEmailAndSet(shopperPage, emailPage, email, ACCOUNT.resetEmailSubject, newPassword);
}

export const ACCOUNT_SELECTORS = S;
