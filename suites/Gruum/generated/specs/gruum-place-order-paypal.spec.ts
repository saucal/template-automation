// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Gruum - Place Order - PayPal"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI } from '../helpers/common-steps-for-all-projects';
import { fillCheckout, fillPayPal, placeOrderNewUserBackend, placeOrderNewUserEmail, placeOrderNewUserRefund, placeOrderNewUserRefundEmail, thankYouPage, verifyOrderDetailsInMyAccount } from '../helpers/gruum-common-steps';

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

test.describe('Gruum - Place Order - PayPal', () => {

  const vars = new Proxy<Record<string, string>>({
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "street2": "Ap. 4",
    "city": "LONDON",
    "emailReg": `gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "county": "Greater London",
    "prodUrl": "https://gruum.com/",
    "email": `gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "phone": "+447412345678",
    "emailForgot": `gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
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
    "company": "Test Inc.",
    "street": "29-30 Leicester Square",
    "bundle": "yes",
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
    vars.product = `bundle`;
    // ↓ 11 - Bundle Product page
    await page.locator(`.hamburger-menu.hamburger-menu-white`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/product-category/gift-sets/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`li:nth-of-type(1) > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.product-price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.bundled_product.bundled_product_summary.product.bundled_item_optional > .details > h4.bundled_product_title.product_title > .bundled_product_title_inner > .item_title')
 }, vars)) {
      vars.optionalDesc = ((await page.locator(`.bundled_product.bundled_product_summary.product.bundled_item_optional > .details > h4.bundled_product_title.product_title > .bundled_product_title_inner > .item_title`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.bundled_product.bundled_product_summary.product.bundled_item_optional > .details > h4.bundled_product_title.product_title > .bundled_product_title_inner > .item_title')
 }, vars)) {
      vars.optionalPrice = ((await page.locator(`.bundled-item-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    }
    vars.products = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const productList = document.querySelector('.toggle-content ul');
const products = Array.from<any>(productList.querySelectorAll('li')).map(item => item.textContent.trim());
const filteredProducts = products.filter(item => !item.includes("(Optional)"));

return filteredProducts }, vars);
    // ↑ end 11 - Bundle Product page
    await page.locator(`form > div.row > div.col-md-5.column-details > div > div.cart.bundle_data.has-quantity > div.bundle_wrap > div.bundle_button > div.button-wrap > button`).or(page.locator(`xpath=//button[contains(text(),'Add to basket')]`)).filter({ visible: true }).first().click({ force: true });
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const products2 = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>('tr.bundle-child-not-sold-individually > td.product-name')).map(item => item.textContent.trim());
const products = vars.products

const areArraysEqual = products.length === products2.length && 
                      products.every((item, index) => item === products2[index]);

return areArraysEqual
 }, vars)).toBeTruthy();
    await expect(page.locator(`tr.collapsable-group-parent > td.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label[for="shipping_method_0_flat_rate1"] > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`label[for="shipping_method_0_flat_rate1"]`)).textContent()) ?? '').trim();
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await fillCheckout(page, vars);
    await expect(page.locator(`label[for="shipping_method_0_flat_rate1"] > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`label[for="shipping_method_0_flat_rate1"]`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`td.product-total > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr:nth-of-type(2) > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    vars.total = ((await page.locator(`td > strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace('£','').trim())
let shippingPrice;

if (`${vars.shippingPrice}`.includes('Standard') || `${vars.shippingPrice}`.includes('Free')) {
    shippingPrice = 0
} else {
    shippingPrice = parseFloat(`${vars.shippingPrice}`.replace('£','').trim())
}

const qty = vars.qty
const subtotal = parseFloat(`${vars.subtotal}`.replace('£','').trim())
const total2 = parseFloat((subtotal + shippingPrice).toFixed(2))
const subtotal2 = parseFloat((unitPrice * qty).toFixed(2))
const total = parseFloat(`${vars.total}`.replace('£','').trim())
return total2 === total && subtotal2 === subtotal }, vars)).toBeTruthy();
    await fillPayPal(page, vars);
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    await page.waitForLoadState('load');
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

  test('04 - Place Order - New User - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.startUrl === vars.prodUrl) {
      // TODO: command="exit" target="" value="passing"
    }
    await placeOrderNewUserRefund(page, vars);
  });

  test('05 - Place Order - New User - Refund - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.startUrl === vars.prodUrl) {
      // TODO: command="exit" target="" value="passing"
    }
    await placeOrderNewUserRefundEmail(page, vars);
  });

});
