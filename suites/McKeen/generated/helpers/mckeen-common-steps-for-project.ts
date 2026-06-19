// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "McKeen - Common steps for project"
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

// GI: "Login" (600195ae97354979a954a453)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.header-social > .container > .header-social__holder > a[href="/my-account"].my-account`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#customer_login`)).not.toHaveCount(0);
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`button[name="login"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-navigation`)).not.toHaveCount(0);
}

// GI: "Registration" (6001950597354979a954a03b)
export async function registration(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.header-social > .container > .header-social__holder > a[href="/my-account"].my-account`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  vars.password = `fric2171Biot`;
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#mailchimp_woocommerce_newsletter`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-navigation`)).not.toHaveCount(0);
}
