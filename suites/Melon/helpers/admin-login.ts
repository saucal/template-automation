// Lazy per-environment admin auth (rule 32). Melon runs on multiple hosts
// (maintenance + staging); a single global-setup would authenticate all of them
// every run. Instead, the fixture calls ensureAdminState(project, baseURL) on
// first adminPage/emailPage use, so only the host we actually run logs in.
//
// State is keyed by project name → auth/admin-<project>.json.
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Ensure a wp-admin storageState file exists for this environment; create it by
 * logging in once if missing. Returns the absolute path to the state file.
 * Idempotent: reuses an existing file. Lands on wp-admin then persists cookies.
 */
export async function ensureAdminState(project: string, baseURL: string): Promise<string> {
  const authDir = path.join(__dirname, '..', 'auth');
  const stateFile = path.join(authDir, `admin-${project}.json`);
  if (fs.existsSync(stateFile)) return stateFile;

  fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();

  // Go straight to wp-login.php (not wp-admin/, which bounces through login with a
  // redirect_to chain). baseURL ends with '/'; resolve against it.
  await page.goto(new URL('wp-login.php', baseURL).href);
  await page.locator('#user_login').fill(process.env.WP_ADMIN_USER!);
  await page.locator('#user_pass').fill(process.env.ADMIN_PASS!);
  // Fire the submit but DON'T let the click block on its post-login navigation — the
  // multisite redirect layer chains slow redirects and the click's built-in
  // "wait for scheduled navigations" times out. The submit still fires; we then wait
  // for the wp-admin landing with a generous, tolerant timeout.
  await page.locator('#wp-submit').click({ timeout: 5_000 }).catch(() => {});
  await page.waitForURL('**/wp-admin/**', { timeout: 60_000 });
  await page.waitForLoadState('load').catch(() => {});

  await ctx.storageState({ path: stateFile });
  await browser.close();
  // ponytail: no cross-worker .lock — orders specs run serial so two workers
  // won't race the same project's login. Add a .lock if parallel admin appears.
  return stateFile;
}
