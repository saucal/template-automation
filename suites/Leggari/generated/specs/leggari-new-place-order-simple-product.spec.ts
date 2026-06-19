// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Leggari New - Place order Simple product"
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

test.describe('Leggari New - Place order Simple product', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": "GI Leggari",
    "zipCode": "98512",
    "state": "WA",
    "phone": "2016299320",
    "shippingStreet": "525 N. Third Avenue",
    "shippingStreet2": "Suite 101",
    "billingStreet": "1300 N. Oregon Ave.",
    "billingStreet2": "First Floor",
    "street3": "street shipping",
    "street4": "Ap. 4",
    "password2": process.env.PASSWORD2 ?? '',
    "country": "US",
    "password": process.env.PASSWORD ?? '',
    "stateComplete": "Washington",
    "Symbol": "$",
    "countryComplete": "United States (US)",
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "leggari",
    "phoneCode": "+1",
    "addressType": "true",
    "company2": "Testing Inc.",
    "street": "1401 W 1st Ave",
    "street2": "Apartment 2",
    "city": "Tumwater",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('09 - Simple product place order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.affirm = `yes`;
    vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.qty = `2`;
    vars.product = `simple`;
    await page.goto(`${vars.startUrl ?? ''}product/leggari-squeegee/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    vars.prodDesc = ((await page.locator(`.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = `${vars.prodDesc ?? ''}`;
    vars.unitPrice = ((await page.locator(`div.summary > p.price ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary > p.price .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`
unitPrice = unitPrice.replace(`${vars.Symbol}`,"").trim();
let qty = vars.qty
let subtotal = unitPrice * qty
return `${vars.Symbol}`+(Math.round(subtotal*100)/100).toFixed(2) }, vars);
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > ul > li > a:nth-child(2)`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > ul > li > span > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > p.woocommerce-mini-cart__total.total > span > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await page.locator(`a[href*="/checkout/"].checkout.button`).or(page.locator(`xpath=//a[contains(text(),'Checkout')]`)).filter({ visible: true }).first().click({ force: true });
    await fillAddressStep1(page, vars);
    await checkoutSection2(page, vars);
    await checkoutSection3(page, vars);
    await page.waitForTimeout(5000);
    await checkOrderAndSubscriptionsOnMyAccount(page, vars);
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`Affirm Pay over time`);
  });

  test('09 - Simple product place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _09PlaceOrder02Backend(page, vars);
  });

  test('09 - Simple product place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.site = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let site = window.location.href
return site }, vars);
    vars.username = `${vars.email ?? ''}`;
    await checkOrderOnEmail(page, vars);
  });

});
