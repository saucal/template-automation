// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "LIVE - Lens - Tests"
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

test.describe('LIVE - Lens - Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "CCard": "4242424242424242",
    "month": "05",
    "year": "27",
    "cvv": "123",
    "street": "123 False Street",
    "city": "Ottawa",
    "state": "ON",
    "country": "CA",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Testing Inc.",
    "phone": "6134564567",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "zipCode": "K1S 3V6",
    "street3": "123 false Shipping Street",
    "project": "lens",
    "stateComplete": "Ontario",
    "countryComplete": "Canada",
    "Symbol": "$",
    "url": "https://lensdistortions.com",
    "street2": "Of. 2",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`.kt-blocks-accordion-header.kt-acccordion-button-label-show[aria-expanded="true"]`)).toHaveCount(0);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href="${vars.url ?? ''}/music/"]`).first()).toContainText(`MUSIC`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(2) > a[href="${vars.url ?? ''}/sfx/"]`).first()).toContainText(`SFX`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(3) > a[href="${vars.url ?? ''}/color/"]`).first()).toContainText(`COLOR`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(4) > a[href="${vars.url ?? ''}/vfx/"]`).first()).toContainText(`VFX`);
    await expect(page.locator(`.not-logged-only > a[href="/my-account/"]`).first()).toContainText(`Log in`);
    await expect(page.locator(`a[href="/pricing/"].button`).first()).toContainText(`Join`);
  });

  test('02 - Color Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#primary-menu > li > a[href*="/color/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Music Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#primary-menu > li > a[href*="/music/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - SFX Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#primary-menu > li > a[href*="/sfx/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - VFX Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#primary-menu > li > a[href*="/vfx/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('06 - Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="/pricing/"].button`).filter({ visible: true }).first().click({ force: true });
  });

  test('07 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 06 - Product Page
    await page.waitForLoadState('load');
    await page.locator(`a[href="/pricing/"].button`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 06 - Product Page
    vars.prod = ((await page.locator(`div[data-plan-id="241413"] > div.ld-product-column--plan-name`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod = `${vars.prod}`

if (prod === "All-Access") {
    return "ALL-ACCESS, MONTHLY"
} }, vars);
    await page.locator(`a[href="/?add-to-cart=241413"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="ld_registration_agreement"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ld_registration_agreement`).filter({ visible: true }).first().click({ force: true }); }
    }
    try {
      {
        const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#mailchimp_woocommerce_newsletter`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await page.locator(`input[name="register"][type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.ld-product-title`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
  });

});
