// Admin login for the per-project auth setup (specs/auth.setup.ts). One setup project
// per region×tier logs into ITS OWN host and writes auth/admin-<project>.json; the
// matching test project loads that file. So only the site you actually run authenticates
// — a develop host being down never blocks a preprod run, and vice versa.
//
// Login quirks carried over from the GI `adminLoginSkip2FA` flow: an optional Jetpack
// SSO toggle (to reveal the native WP login when SSO is enabled) and an optional
// "confirm admin email" interstitial after submit.
import { type Page } from '@playwright/test';
import path from 'path';

/** Storage-state path for a project. The setup project writes it; the test project
 *  reads it. The `setup-` prefix is stripped so `setup-au-preprod` and `au-preprod`
 *  resolve to the SAME file (auth/admin-au-preprod.json). */
export function authStatePath(projectName: string): string {
  return path.join(__dirname, 'auth', `admin-${projectName.replace(/^setup-/, '')}.json`);
}

/** Origin (scheme + host) of a URL, with a trailing slash. */
export function originOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).origin + '/';
  } catch {
    return null;
  }
}

/** Log the admin in on one host. */
export async function loginOnHost(page: Page, origin: string): Promise<void> {
  await page.goto(`${origin}wp-login.php`, { waitUntil: 'domcontentloaded' });

  // Optional: when Jetpack SSO is active the native form is hidden behind a toggle.
  const ssoToggle = page.locator('a.jetpack-sso-toggle').filter({ visible: true });
  if (await ssoToggle.count()) await ssoToggle.first().click({ force: true }).catch(() => {});

  await page.locator('#user_login').fill(process.env.WP_ADMIN_USER!);
  await page.locator('#user_pass').fill(process.env.ADMIN_PASS!);
  await page.locator('#wp-submit').click();

  // After submit WP either redirects toward wp-admin / confirm-email, OR shows
  // #login_error (bad creds, blocked account). Race them with `commit` (fires when
  // the matching navigation commits, not after a full `load` — VIP's self-redirecting
  // "Loading…" page makes `load` slow/flaky). BOTH waits are non-fatal: a bad-creds
  // run is caught explicitly below with a clear message, and the recovery loop
  // further down (goto wp-admin → wait for #wpadminbar) handles the slow-redirect
  // case — so we never abort here on a 30s "waiting for navigation" timeout.
  await Promise.race([
    page.waitForURL(/wp-admin|confirm_admin_email/, { timeout: 45_000, waitUntil: 'commit' }).catch(() => {}),
    page.locator('#login_error').filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 45_000 }).catch(() => {}),
  ]);
  const loginError = page.locator('#login_error').filter({ visible: true });
  if (await loginError.count()) {
    const msg = (await loginError.first().innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
    throw new Error(
      `loginOnHost(${origin}): WP login failed — "${msg}". ` +
        `Check WP_ADMIN_USER / ADMIN_PASS in .env (and that the account isn't 2FA/SSO-gated).`
    );
  }
  const confirmEmail = page.locator('#correct-admin-email').filter({ visible: true });
  if (await confirmEmail.count()) {
    await confirmEmail.first().click({ force: true }).catch(() => {});
    await page.waitForURL(/wp-admin/, { timeout: 15_000 }).catch(() => {});
  }

  // VIP serves a "Loading…" interstitial after submit that redirects itself to
  // wp-admin a few times, so the URL can stay at wp-login.php and our own goto
  // can collide with that in-flight navigation (net::ERR_ABORTED). Retry the
  // goto, then confirm auth via the admin bar — a reliable logged-in signal.
  for (let attempt = 1; ; attempt++) {
    try {
      await page.goto(`${origin}wp-admin/`, { waitUntil: 'load' });
      break;
    } catch (err) {
      if (attempt >= 5) throw err;
      await page.waitForTimeout(1_000);
    }
  }
  // Robustly wait for wp-admin. The confirm-admin-email interstitial can appear
  // (a) after the initial login, (b) after the direct wp-admin goto on VIP (the
  // loading page races `waitForLoadState`). Loop until wpadminbar is visible,
  // handling each confirmation as it appears.
  for (let pass = 0; pass < 8; pass++) {
    const confirmCheck = page.locator('#correct-admin-email').filter({ visible: true });
    if (await confirmCheck.count()) {
      await confirmCheck.first().click({ force: true }).catch(() => {});
      await page.waitForLoadState('load');
      await page.goto(`${origin}wp-admin/`, { waitUntil: 'load' }).catch(() => {});
      continue;
    }
    if (await page.locator('#wpadminbar').isVisible({ timeout: 5_000 }).catch(() => false)) break;
    // Neither confirm button nor admin bar — may still be on a VIP loading interstitial.
    await page.waitForTimeout(2_000);
  }
  const adminBarVisible = await page.locator('#wpadminbar').isVisible({ timeout: 10_000 }).catch(() => false);
  if (!adminBarVisible) {
    throw new Error(`loginOnHost(${origin}): admin bar not visible after login. Current URL: ${page.url()}`);
  }
}
