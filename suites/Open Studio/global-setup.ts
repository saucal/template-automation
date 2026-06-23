// Logs the admin in on the single Open Studio host and persists storage state
// (auth/admin.json) for the admin fixture.
//
// Login quirks carried over from the GI admin-login flow: an optional Jetpack SSO
// toggle (to reveal the native WP login when SSO is enabled) and an optional
// "confirm admin email" interstitial after submit. The post-submit retry loop +
// admin-bar wait guard against hosts that serve a self-redirecting interstitial.
import { chromium, type Page, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '.env') });

/** Origin (scheme + host) of a URL, with a trailing slash. */
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

  await page.waitForLoadState('domcontentloaded');
  const confirmEmail = page.locator('#correct-admin-email').filter({ visible: true });
  if (await confirmEmail.count()) {
    await confirmEmail.first().click({ force: true }).catch(() => {});
    await page.waitForLoadState('domcontentloaded');
  }

  for (let attempt = 1; ; attempt++) {
    try {
      await page.goto(`${origin}wp-admin/`, { waitUntil: 'domcontentloaded' });
      break;
    } catch (err) {
      if (attempt >= 5) throw err;
      await page.waitForTimeout(1_000);
    }
  }
  await page.locator('#wpadminbar').waitFor({ state: 'visible', timeout: 30_000 });
}

export default async function globalSetup() {
  const authDir = path.join(__dirname, 'auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const host = originOf(process.env.BASE_URL);
  if (!host) throw new Error('global-setup: BASE_URL not set in .env');

  const browser = await chromium.launch();
  const ctx: BrowserContext = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();

  await loginOnHost(page, host);

  await ctx.storageState({ path: path.join(authDir, 'admin.json') });
  await browser.close();
}
