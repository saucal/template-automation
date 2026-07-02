// Logs the admin in on every host the suite touches and persists ONE storage
// state (auth/admin.json) whose cookies cover them all.
//
// No Pong topology: AU is a standalone host; CA/US are multisite subsites under a
// shared parent host. One login on the AU host + one on the CA/US parent host
// covers all three regions (the subsite cookie is scoped to the parent host).
//
// Login quirks carried over from the GI `adminLoginSkip2FA` flow: an optional
// Jetpack SSO toggle (to reveal the native WP login when SSO is enabled) and an
// optional "confirm admin email" interstitial after submit.
import { chromium, type Page, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '.env') });

/** Origin (scheme + host) of a URL, with a trailing slash. Used to find the host to log into. */
function originOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).origin + '/';
  } catch {
    return null;
  }
}

/** Log the admin in on one host. */
async function loginOnHost(page: Page, origin: string): Promise<void> {
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

export default async function globalSetup() {
  const authDir = path.join(__dirname, 'auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  // Hosts to authenticate: AU host + the CA/US parent origin (deduped).
  const auHost = originOf(process.env.BASE_URL_AU);
  const multisiteHost = originOf(process.env.BASE_URL_CA) ?? originOf(process.env.BASE_URL_US);
  const hosts = [...new Set([auHost, multisiteHost].filter((h): h is string => !!h))];

  if (hosts.length === 0) {
    throw new Error('global-setup: no BASE_URL_AU / BASE_URL_CA / BASE_URL_US set in .env');
  }

  const browser = await chromium.launch();
  const ctx: BrowserContext = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();

  for (const host of hosts) {
    await loginOnHost(page, host);
  }

  await ctx.storageState({ path: path.join(authDir, 'admin.json') });
  await browser.close();
}
