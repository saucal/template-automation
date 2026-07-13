// Lazy admin login. The admin/email fixtures call ensureAdminState on first use,
// which logs into the site only if auth/admin-<project>.json is missing or stale —
// no globalSetup, no visible "setup" test in the runner.
//
// Login quirks carried over from the GI `adminLoginSkip2FA` flow: an optional Jetpack
// SSO toggle (to reveal the native WP login when SSO is enabled) and an optional
// "confirm admin email" interstitial after submit.
import { chromium, type Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/** Per-project storage-state path (auth/admin-<project>.json). */
export function authStatePath(projectName: string): string {
  return path.join(__dirname, 'auth', `admin-${projectName}.json`);
}

/** Re-auth this far BEFORE the login cookie's real expiry, so a long full-suite run
 *  can't have the admin session lapse mid-run. */
const STATE_EXPIRY_BUFFER_SEC = 30 * 60;

/**
 * True when `file` exists and its WordPress admin session is still valid. WP stores
 * `wordpress_logged_in_<hash>` as a session cookie (storageState `expires: -1`), so the
 * cookie attribute tells us nothing — the authoritative expiry is the 2nd pipe-field of
 * the cookie VALUE (`user|EXPIRATION|token|hmac`). Missing/corrupt/expired → false → re-login.
 */
export function isStateFresh(file: string): boolean {
  try {
    const state = JSON.parse(fs.readFileSync(file, 'utf8')) as { cookies?: Array<{ name?: string; value?: string }> };
    const login = (state.cookies ?? []).find((c) => c.name?.startsWith('wordpress_logged_in_'));
    if (!login?.value) return false;
    const expiration = Number(decodeURIComponent(login.value).split('|')[1]);
    return Number.isFinite(expiration) && expiration > Date.now() / 1000 + STATE_EXPIRY_BUFFER_SEC;
  } catch {
    return false;
  }
}

/**
 * Lazily ensure the admin storage state for THIS project exists, logging in only if
 * it's missing — so only the site you actually run authenticates, with no visible
 * "setup" test in the runner. Called from the admin fixtures' lazy openContext thunk,
 * so the login fires only when a test really uses adminPage/emailPage.
 *
 * Reuse the cached state only while it's still fresh: WP's `wordpress_logged_in_*`
 * cookie is stored as a SESSION cookie (storageState `expires: -1`), so its real
 * expiry lives in the cookie VALUE (`user|EXPIRATION|token|hmac`) — an expired one
 * silently replays as logged-out. `isStateFresh` re-logs-in when it's gone/stale.
 *
 * A cross-worker lock (exclusive-create .lock) makes exactly one worker perform the
 * login; the others wait for a FRESH file so they never read a half-written or stale one.
 */
export async function ensureAdminState(projectName: string, baseURL: string | undefined): Promise<string> {
  const file = authStatePath(projectName);
  if (isStateFresh(file)) return file;

  const origin = originOf(baseURL);
  if (!origin) throw new Error(`admin auth: project "${projectName}" has no baseURL — set BASE_URL in .env`);

  fs.mkdirSync(path.dirname(file), { recursive: true });
  const lock = `${file}.lock`;
  try {
    fs.writeFileSync(lock, String(process.pid), { flag: 'wx' });
  } catch {
    // Another worker holds the lock — wait (up to 2 min) for it to write a fresh state.
    for (let i = 0; i < 120 && !isStateFresh(file); i++) await new Promise((r) => setTimeout(r, 1000));
    if (!isStateFresh(file)) throw new Error(`admin auth: timed out waiting for a fresh ${file} from another worker`);
    return file;
  }
  try {
    // Re-check under the lock: a worker that held it just before us may have already
    // refreshed the state, so don't log in a second time.
    if (isStateFresh(file)) return file;
    const browser = await chromium.launch();
    try {
      const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
      await loginOnHost(await ctx.newPage(), origin);
      await ctx.storageState({ path: file });
    } finally {
      await browser.close();
    }
  } finally {
    fs.rmSync(lock, { force: true });
  }
  return file;
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
      await page.goto(`${origin}wp-admin/`, { waitUntil: 'domcontentloaded' });
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
      await page.waitForLoadState('domcontentloaded');
      await page.goto(`${origin}wp-admin/`, { waitUntil: 'domcontentloaded' }).catch(() => {});
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
