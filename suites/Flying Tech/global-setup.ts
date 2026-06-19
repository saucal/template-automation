import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '.env') });

export default async function globalSetup() {
  const authDir = path.join(__dirname, 'auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();

  await page.goto(`${process.env.BASE_URL}/wp-admin`);
  await page.locator('#user_login').fill(process.env.WP_ADMIN_USER!);
  await page.locator('#user_pass').fill(process.env.ADMIN_PASS!);
  await page.locator('#wp-submit').click();
  await page.waitForURL('**/wp-admin/**');

  await ctx.storageState({ path: path.join(authDir, 'admin.json') });
  await browser.close();
}
