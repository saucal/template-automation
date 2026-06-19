// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "CA - Place Order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, checkTheTotal, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { calculateShipping, checkEarningPointsCartCheckout, checkOrderDetailsThankYouPageAndMyAccount, creditsVariables, fillCC, fillCheckout, goToMyAccountCheckOrderDetails, login, placeOrderNewUserBackend, placeOrderNewUserEmail, placeOrderNewUserRefund, placeOrderNewUserRefundEmail, storiesAssertion, thankYouPage } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('CA - Place Order', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "phone": "+14165551234",
    "city": "Ottawa",
    "stateComplete": "Ontario",
    "zipCode": "K1S 3V6",
    "includeTax": "false",
    "adminUser": "qa+giadmin@saucal.com",
    "street3": "123 False Shipping",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "nopong",
    "Symbol": "$",
    "state": "ON",
    "country": "CA",
    "countryComplete": "Canada",
    "subscription": "false",
    "password": process.env.PASSWORD ?? '',
    "currency": "CAD",
    "password2": process.env.PASSWORD2 ?? '',
    "street2": "Ap. 4",
    "street4": "4th floor",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - CA - Place Order - New User', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.logged = `no`;
    vars.savedCC = `false`;
    vars.saveCC = `true`;
    vars.coupon = `false`;
    vars.refund = `false`;
    vars.redeeming = `false`;
    if (vars.logged === 'yes') {
      await login(page, vars);
    }
    // ↓ 07 - CA - Checkout Page
    // ↓ 06 - CA - Cart Page
    // ↓ 05 - CA- Simple Product Shop Page (Copy)
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`li:nth-of-type(1) > a > div.wc-block-grid__product-image`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).not.toBeVisible();
    }
    // ↑ end 05 - CA- Simple Product Shop Page (Copy)
    await creditsVariables(page, vars);
    vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('ul.wc-block-grid__products > li a[href*="?add-to-cart="]'))
const length = elements.length;
const randomNumber = Math.floor(Math.random() * length) + 1;

return randomNumber }, vars);
    vars.prod_desc = ((await page.locator(`div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-child(${vars.n ?? ''}) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .wc-block-grid__product-add-to-cart > a`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > a`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).or(page.locator(`#masthead > div > ul > li > a`)).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (vars.logged !== 'yes') {
      await calculateShipping(page, vars);
    }
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label .woocommerce-Price-amount`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 06 - CA - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 07 - CA - Checkout Page
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await storiesAssertion(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
  });

  test('02 - CA - Place Order - New User - Email', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('03 - CA - Place Order - New User - Backend', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

  test('05 - CA - Place Order - New User - Refund ', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefund(page, vars);
  });

  test('06 - CA - Place Order - New User - Refund Email', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefundEmail(page, vars);
  });

  test('07 - CA - Place Order - Logged User', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.logged = `yes`;
    vars.savedCC = `true`;
    vars.saveCC = `false`;
    vars.coupon = `false`;
    vars.refund = `false`;
    vars.redeeming = `false`;
    if (vars.logged === 'yes') {
      await login(page, vars);
    }
    // ↓ 07 - CA - Checkout Page
    // ↓ 06 - CA - Cart Page
    // ↓ 05 - CA- Simple Product Shop Page (Copy)
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`li:nth-of-type(1) > a > div.wc-block-grid__product-image`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).not.toBeVisible();
    }
    // ↑ end 05 - CA- Simple Product Shop Page (Copy)
    await creditsVariables(page, vars);
    vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('ul.wc-block-grid__products > li a[href*="?add-to-cart="]'))
const length = elements.length;
const randomNumber = Math.floor(Math.random() * length) + 1;

return randomNumber }, vars);
    vars.prod_desc = ((await page.locator(`div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-child(${vars.n ?? ''}) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .wc-block-grid__product-add-to-cart > a`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > a`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).or(page.locator(`#masthead > div > ul > li > a`)).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (vars.logged !== 'yes') {
      await calculateShipping(page, vars);
    }
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label .woocommerce-Price-amount`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 06 - CA - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 07 - CA - Checkout Page
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await storiesAssertion(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
  });

  test('08 - CA - Place Order - Logged User - Email', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('09 - CA - Place Order - Logged User - Backend', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

  test('10 - Minimum redeem points', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    // ↓ 06 - CA - Cart Page
    // ↓ 05 - CA- Simple Product Shop Page (Copy)
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`li:nth-of-type(1) > a > div.wc-block-grid__product-image`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).not.toBeVisible();
    }
    // ↑ end 05 - CA- Simple Product Shop Page (Copy)
    await creditsVariables(page, vars);
    vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('ul.wc-block-grid__products > li a[href*="?add-to-cart="]'))
const length = elements.length;
const randomNumber = Math.floor(Math.random() * length) + 1;

return randomNumber }, vars);
    vars.prod_desc = ((await page.locator(`div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-child(${vars.n ?? ''}) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > .wc-block-grid__product-add-to-cart > a`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products > ul > li:nth-of-type(${vars.n ?? ''}) > a`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).or(page.locator(`#masthead > div > ul > li > a`)).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (vars.logged !== 'yes') {
      await calculateShipping(page, vars);
    }
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label .woocommerce-Price-amount`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 06 - CA - Cart Page
    if ((() => { //minimum balance for user to redeem variable is vars.minBalance
return vars.minBalance <= vars.balance })()) {
      await expect(page.locator(`.npl-redeemable-form label[for='npl-redeemable-form-use']`).or(page.locator(`.npl-credits-form`)).first()).toBeVisible();
    }
    if ((() => { //minimum balance for user to redeem variable is vars.minBalance
return vars.minBalance > vars.balance })()) {
      await expect(page.locator(`.npl-redeemable-form label[for='npl-redeemable-form-use']`).or(page.locator(`.npl-credits-form`)).first()).not.toBeVisible();
    }
  });

});
