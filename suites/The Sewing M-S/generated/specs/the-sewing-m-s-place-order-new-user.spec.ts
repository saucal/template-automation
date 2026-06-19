// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "The Sewing M.S. - Place Order - New User"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { checkOrderDetailsThankYouPageAndMyAccount, checkTotal, extractUserFromEmail, fillCC, fillCheckout, goToMyAccountCheckOrderDetails, placeOrderNewUserBackend, placeOrderNewUserEmail, placeOrderNewUserRefund, placeOrderNewUserRefundEmail, thankYouPage } from '../helpers/the-sewing-m-s-common-steps';

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

test.describe('The Sewing M.S. - Place Order - New User', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "stateComplete": "California",
    "city": "San Francisco",
    "includeTax": "false",
    "zipCode": "94102",
    "phone": "3059689789",
    "street3": "123 False Shipping",
    "countryComplete": "United States (US)",
    "Symbol": "$",
    "state": "CA",
    "project": "sewing",
    "country": "US",
    "subscription": "false",
    "street2": "Ap. 4",
    "password2": process.env.PASSWORD2 ?? '',
    "street4": "4th Floor",
    "password": process.env.PASSWORD ?? '',
    "currency": "USD",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place Order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.coupon = `false`;
    vars.refund = `false`;
    vars.product = `simple`;
    // ↓ 11 - Cart page
    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 09 - Simple product page
      await page.locator(`xpath=//a[contains(text(), "Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/shop/"]`)).filter({ visible: true }).first().click({ force: true });
      await page.locator(`li.product-type-simple.instock > a`).filter({ visible: true }).first().click({ force: true });
      vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      await expect(page.locator(`.summary > .yith-ywraq-add-to-quote > .yith-ywraq-add-button > a[href="#"].add-request-quote-button.button`).first()).toContainText(`Get a quote`);
      // ↑ end 09 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 10 - Variable product page
      await page.locator(`#mega-menu-item-16674 > a`).first().hover();
      await page.locator(`xpath=//a[contains(text(), "Sewing Furniture")]`).or(page.locator(`#mega-menu-item-1239 > a`)).filter({ visible: true }).first().click({ force: true });
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector<HTMLAnchorElement>('li.product-type-variable.instock > a') }, vars)) {
        await page.locator(`#fl-main-content > div > div > div.fl-content.fl-woo-content-right.fl-content-right > nav.woocommerce-pagination > ul > li:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector<HTMLAnchorElement>('li.product-type-variable.instock > a') }, vars)) {
        await page.locator(`#fl-main-content > div > div > div.fl-content.fl-woo-content-right.fl-content-right > nav.woocommerce-pagination > ul > li:nth-child(4) > a`).filter({ visible: true }).first().click({ force: true });
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return false === !document.querySelector<HTMLAnchorElement>('li.product-type-variable.instock > a') }, vars)) {
        await page.locator(`li.product-type-variable.instock > a`).filter({ visible: true }).first().click({ force: true });
      }
      vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return false === !document.querySelector('#color') }, vars)) {
        {
          const _lbl = page.locator(`label[for="color"]`).filter({ visible: true });
          if (await _lbl.count() > 0) { await _lbl.first().click(); }
          else { await page.locator(`#color`).filter({ visible: true }).first().click({ force: true }); }
        }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return false === !document.querySelector('#color') }, vars)) {
        try { await page.locator(`#color`).first().fill(`Gray`); } catch { await page.locator(`#color`).first().selectOption(`Gray`); }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return false === !document.querySelector('#color') }, vars)) {
        vars.color = ((await page.locator(`#color`).textContent()) ?? '').trim();
      }
      vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 10 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await page.locator(`xpath=//a[contains(text(),'View cart')]`).or(page.locator(`#fl-main-content > div > div > div > div.woocommerce-notices-wrapper > div > a`)).filter({ visible: true }).first().click({ force: true });
    if (vars.product === 'simple' || vars.product === '') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''} - ${vars.color ?? ''}`);
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.shippingPrice = ((await page.locator(`#shipping_method > li:nth-child(1) > label > span > bdi`).or(page.locator(`#shipping_method > li:nth-child(1) > label`)).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTotal(page, vars);
    // ↑ end 11 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
  });

  test('02 - Place Order - New User - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('03 - Place Order - New User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

  test('04 - Place Order - New User - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefund(page, vars);
  });

  test('05 - Place Order - New User - Refund - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefundEmail(page, vars);
  });

  test('06 - Place Order - Logged User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.logged = `yes`;
    vars.savedCC = `true`;
    vars.product = `variable`;
    vars.saveCC = `false`;
    vars.coupon = `false`;
    vars.refund = `false`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Your The Sewing Machine Shop account has been created!')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Set your new password.')]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    // ↓ 11 - Cart page
    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 09 - Simple product page
      await page.locator(`xpath=//a[contains(text(), "Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/shop/"]`)).filter({ visible: true }).first().click({ force: true });
      await page.locator(`li.product-type-simple.instock > a`).filter({ visible: true }).first().click({ force: true });
      vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      await expect(page.locator(`.summary > .yith-ywraq-add-to-quote > .yith-ywraq-add-button > a[href="#"].add-request-quote-button.button`).first()).toContainText(`Get a quote`);
      // ↑ end 09 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 10 - Variable product page
      await page.locator(`#mega-menu-item-16674 > a`).first().hover();
      await page.locator(`xpath=//a[contains(text(), "Sewing Furniture")]`).or(page.locator(`#mega-menu-item-1239 > a`)).filter({ visible: true }).first().click({ force: true });
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector<HTMLAnchorElement>('li.product-type-variable.instock > a') }, vars)) {
        await page.locator(`#fl-main-content > div > div > div.fl-content.fl-woo-content-right.fl-content-right > nav.woocommerce-pagination > ul > li:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector<HTMLAnchorElement>('li.product-type-variable.instock > a') }, vars)) {
        await page.locator(`#fl-main-content > div > div > div.fl-content.fl-woo-content-right.fl-content-right > nav.woocommerce-pagination > ul > li:nth-child(4) > a`).filter({ visible: true }).first().click({ force: true });
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return false === !document.querySelector<HTMLAnchorElement>('li.product-type-variable.instock > a') }, vars)) {
        await page.locator(`li.product-type-variable.instock > a`).filter({ visible: true }).first().click({ force: true });
      }
      vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return false === !document.querySelector('#color') }, vars)) {
        {
          const _lbl = page.locator(`label[for="color"]`).filter({ visible: true });
          if (await _lbl.count() > 0) { await _lbl.first().click(); }
          else { await page.locator(`#color`).filter({ visible: true }).first().click({ force: true }); }
        }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return false === !document.querySelector('#color') }, vars)) {
        try { await page.locator(`#color`).first().fill(`Gray`); } catch { await page.locator(`#color`).first().selectOption(`Gray`); }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return false === !document.querySelector('#color') }, vars)) {
        vars.color = ((await page.locator(`#color`).textContent()) ?? '').trim();
      }
      vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 10 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await page.locator(`xpath=//a[contains(text(),'View cart')]`).or(page.locator(`#fl-main-content > div > div > div > div.woocommerce-notices-wrapper > div > a`)).filter({ visible: true }).first().click({ force: true });
    if (vars.product === 'simple' || vars.product === '') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''} - ${vars.color ?? ''}`);
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.shippingPrice = ((await page.locator(`#shipping_method > li:nth-child(1) > label > span > bdi`).or(page.locator(`#shipping_method > li:nth-child(1) > label`)).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTotal(page, vars);
    // ↑ end 11 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
  });

  test('07 - Place Order - Logged User - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('08 - Place Order - Logged User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

});
