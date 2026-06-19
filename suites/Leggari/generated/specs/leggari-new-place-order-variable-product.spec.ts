// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Leggari New - Place order Variable product"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { checkOrderAndSubscriptionsOnMyAccount, checkOrderOnEmail } from '../helpers/common-steps-for-all-projects';
import { checkoutSection2, checkoutSection3, fillAddressStep1 } from '../helpers/leggari-new-common-steps-for-suites';
import { _09PlaceOrder02Backend } from '../helpers/template-woocommerce-tests';

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

test.describe('Leggari New - Place order Variable product', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": "GI Leggari",
    "country": "US",
    "project": "leggari",
    "phoneCode": "+1",
    "addressType": "true",
    "company2": "Testing Inc.",
    "street": "1401 W 1st Ave",
    "street2": "Apartment 2",
    "city": "Tumwater",
    "zipCode": "98512",
    "state": "WA",
    "phone": "3098698799",
    "shippingStreet": "525 N. Third Avenue",
    "shippingStreet2": "Suite 101",
    "billingStreet": "1300 N. Oregon Ave.",
    "billingStreet2": "First Floor",
    "street3": "street shipping",
    "street4": "Ap. 4",
    "password2": process.env.PASSWORD2 ?? '',
    "password": process.env.PASSWORD ?? '',
    "stateComplete": "Washington",
    "Symbol": "$",
    "countryComplete": "United States (US)",
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('10 - Variable product place order ', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.qty = `2`;
    vars.product = `variable`;
    // ↓ 02 - Single items and accesories
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-48004 > a`).or(page.locator(`xpath=//a[contains(text(),'Single Items & Accessories')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Single items and accesories
    await page.locator(`#sample-kits > div > div > div > div > ul > li:nth-child(6) > a`).or(page.locator(`#sample-kits > div > div.wp-block-group.leggari-blocks__products-list__content > div > div > ul > li:nth-child(1) a`)).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product_title`).or(page.locator(`h3.product_title`)).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="base"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#base`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#base`).first().fill(`Sky Blue`); } catch { await page.locator(`#base`).first().selectOption(`Sky Blue`); }
    vars.base = `Sky Blue`;
    {
      const _lbl = page.locator(`label[for="highlight"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#highlight`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#highlight`).first().fill(`Gold`); } catch { await page.locator(`#highlight`).first().selectOption(`Gold`); }
    vars.highlight = `Gold`;
    vars.unitPrice = ((await page.locator(`div.summary > p.price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary > p.price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`
unitPrice = unitPrice.replace(`${vars.Symbol}`,"").trim();
let qty = vars.qty
let subtotal = unitPrice * qty
return `${vars.Symbol}`+(Math.round(subtotal*100)/100).toFixed(2) }, vars);
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > ul > li > a:nth-child(2)`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > p.woocommerce-mini-cart__total.total > span > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "Checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await fillAddressStep1(page, vars);
    await checkoutSection2(page, vars);
    await checkoutSection3(page, vars);
    await checkOrderAndSubscriptionsOnMyAccount(page, vars);
  });

  test('10 - Variable product place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _09PlaceOrder02Backend(page, vars);
  });

  test('10 - Variable product place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.site = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let site = window.location.href
return site }, vars);
    vars.username = `${vars.email ?? ''}`;
    await checkOrderOnEmail(page, vars);
  });

});
