// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Gruum - Place Order - Subscription - CC"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { fillCC, fillCheckout, placeOrderNewUserBackend, placeOrderNewUserEmail, thankYouPage, verifyOrderDetailsInMyAccount } from '../helpers/gruum-common-steps';

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

test.describe('Gruum - Place Order - Subscription - CC', () => {

  const vars = new Proxy<Record<string, string>>({
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "lastName2": `${Math.random().toString(36).substring(2, 10)}2`,
    "Symbol": "£",
    "zipCode": "WC2H 7LA",
    "company2": "Shipping Inc.",
    "street4": "5th Floor",
    "street3": "30 Leicester Square",
    "countryComplete": "United Kingdom (UK)",
    "country": "UK",
    "street2": "Ap. 4",
    "company": "Test Inc.",
    "street": "29-30 Leicester Square",
    "subscription": "yes",
    "city": "LONDON",
    "emailReg": `gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "county": "Greater London",
    "prodUrl": "https://gruum.com/",
    "email": `gi_subs_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "phone": "+447412345678",
    "emailForgot": `gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place Order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.startUrl === vars.prodUrl) {
      // TODO: command="exit" target="" value="passing"
    }
    vars.email = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.email}`.toLowerCase() }, vars);
    vars.username = `${vars.email ?? ''}`;
    vars.qty = `1`;
    // ↓ 09 - Simple Product page
    await page.goto(`${vars.startUrl ?? ''}shop/`);
    await page.waitForLoadState('load');
    await page.locator(`li.instock.product-type-simple > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.{{prodDesc}} = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-add-to-cart-radio:nth-of-type(1) > label > .product-add-to-cart-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subPrice = ((await page.locator(`.product-add-to-cart-price.product-add-to-cart-price-subscription-scheme > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`#product-description > .toggle-heading`)).not.toHaveCount(0);
    await expect(page.locator(`div.toggle:nth-of-type(2) > .toggle-heading`)).not.toHaveCount(0);
    await expect(page.locator(`div.toggle:nth-of-type(3) > .toggle-heading`)).not.toHaveCount(0);
    await page.waitForLoadState('load');
    // ↑ end 09 - Simple Product page
    await page.locator(`div.product-add-to-cart-radio:nth-of-type(2) > label > .circle > span`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.wcsatt-options-wrapper.wcsatt-options-wrapper-count-4.wcsatt-options-init > div`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.wcsatt-options-wrapper.wcsatt-options-wrapper-count-4.wcsatt-options-init > .wcsatt-options-product > li.subscription-option:nth-of-type(3) > label`).filter({ visible: true }).first().click({ force: true });
    vars.period = ((await page.locator(`.wcsatt-options-wrapper > div > .text > .text`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(),'Add to basket')][2]`).or(page.locator(`div.col-md-5.column-details > div > div.product-add-to-cart.product-add-to-cart-has-subscription-schemes > div.product-add-to-cart-box.product-add-to-cart-box-subscription.product-add-to-cart-box-subscription-schemes > form > div.button-wrap > button`)).filter({ visible: true }).first().click({ force: true });
    vars.prodDescA = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.prodDesc}`.replace('–','-') }, vars);
    await expect(page.locator(`a[href*="/product/"].product-name`).first()).toHaveText(`${vars.prodDescA ?? ''}`);
    await expect(page.locator(`.woocommerce-mini-cart-item > .product-details > .price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subPrice ?? ''}`);
    vars.period2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.period}`.toLowerCase() }, vars);
    await expect(page.locator(`.woocommerce-mini-cart-frequency > .header > .text`).first()).toHaveText(`${vars.period2 ?? ''}`);
    await expect(page.locator(`.price.pull-right > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subPrice ?? ''}`);
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await fillCheckout(page, vars);
    vars.shippingPrice = ((await page.locator(`label[for="shipping_method_0_flat_rate1"] > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subtotal = ((await page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`td.product-total > span.subscription-price > span.woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await expect(page.locator(`div.purchase-frequency`).first()).toHaveText(`${vars.period2 ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    vars.total = ((await page.locator(`td > strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.subPrice}`.replace('£','').trim())
const shippingPrice = parseFloat(`${vars.shippingPrice}`.replace('£','').trim())
const qty = vars.qty
const subtotal = parseFloat(`${vars.subtotal}`.replace('£','').trim())
const total2 = parseFloat((subtotal + shippingPrice).toFixed(2))
const subtotal2 = parseFloat((unitPrice * qty).toFixed(2))
const total = parseFloat(`${vars.total}`.replace('£','').trim())
return total2 === total && subtotal2 === subtotal }, vars)).toBeTruthy();
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await verifyOrderDetailsInMyAccount(page, vars);
  });

  test('02 - Place Order - New User - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.startUrl === vars.prodUrl) {
      // TODO: command="exit" target="" value="passing"
    }
    await placeOrderNewUserEmail(page, vars);
  });

  test('03 - Place Order - New User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.startUrl === vars.prodUrl) {
      // TODO: command="exit" target="" value="passing"
    }
    await placeOrderNewUserBackend(page, vars);
  });

  test('04 - Place Order - New User - Renew', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.startUrl === vars.prodUrl) {
      // TODO: command="exit" target="" value="passing"
    }
    await placeOrderNewUserBackend(page, vars);
  });

});
