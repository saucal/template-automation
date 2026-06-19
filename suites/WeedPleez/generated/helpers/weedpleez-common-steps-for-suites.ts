// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "WeedPleez - Common Steps for suites"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';

async function _giEval(page: any, fn: any, vars: any): Promise<any> {
  for (let i = 0; i < 3; i++) {
    try { return await page.evaluate(fn, vars); }
    catch (e: any) {
      if (i < 2 && /Execution context was destroyed|Target page, context or browser has been closed|frame got detached/i.test(e?.message || '')) {
        await page.waitForLoadState('domcontentloaded').catch(() => {});
        continue;
      }
      throw e;
    }
  }
}

// GI: "Login" (60e83ef0ed68ff17964e2963)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForLoadState('load');
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password2 ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(1)`).first()).toContainText(`Hello Staging User (not Staging User? Log out)`);
}
