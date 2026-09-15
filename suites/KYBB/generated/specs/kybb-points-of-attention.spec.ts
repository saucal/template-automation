// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "KYBB - Points of Attention"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';

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

test.describe('KYBB - Points of Attention', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('Search No results', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    {
      const _lbl = page.locator(`label[for="woocommerce-product-search-field-0"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#woocommerce-product-search-field-0`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#woocommerce-product-search-field-0`).first().fill(`abcdefg`); } catch { await page.locator(`#woocommerce-product-search-field-0`).first().selectOption(`abcdefg`); }
    await page.locator(`xpath=//button[contains(text(), "Search")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.woocommerce-products-header__title`).first()).toContainText(`Search results: “abcdefg”`);
    await expect(page.locator(`.noProductRow > h2`).first()).toContainText(`CAN'T FIND IT?`);
    await expect(page.locator(`.noProductRow > h4:nth-of-type(1)`)).not.toHaveCount(0);
  });

  test('Search with results', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    {
      const _lbl = page.locator(`label[for="woocommerce-product-search-field-0"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#woocommerce-product-search-field-0`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#woocommerce-product-search-field-0`).first().fill(`weight`); } catch { await page.locator(`#woocommerce-product-search-field-0`).first().selectOption(`weight`); }
    await page.locator(`#woocommerce-product-search-field-0`).first().press('Enter');
    await expect(page.locator(`h1.woocommerce-products-header__title`).first()).toContainText(`Search results: “weight”`);
    await expect(page.locator(`h2.woocommerce-loop-product__title > a[href*="/shop/fitness-exercise/vinyl-coated-dumbbells/"]`).first()).toContainText(`Vinyl Coated Weights`);
  });

});
