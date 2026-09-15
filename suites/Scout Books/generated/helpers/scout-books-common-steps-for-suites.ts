// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Scout Books - Common Steps for suites"
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

// GI: "Login" (63b594e97371c255272bab23)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="username"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#username`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`input[name="login"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(1)`).first()).toHaveText(`Hello ${vars.user ?? ''} (not ${vars.user ?? ''}? Log out)`);
}

// GI: "Register" (63b594411b9923d1cbcab86b)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#reg_username`).first().fill(`${vars.user ?? ''}`); } catch { await page.locator(`#reg_username`).first().selectOption(`${vars.user ?? ''}`); }
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`input[name="register"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(1)`).first()).toHaveText(`Hello ${vars.user ?? ''} (not ${vars.user ?? ''}? Log out)`);
}
