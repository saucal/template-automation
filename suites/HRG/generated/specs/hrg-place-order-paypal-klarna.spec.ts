// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "HRG - Place Order - PayPal & Klarna"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI } from '../helpers/common-steps-for-all-projects';
import { checkOrderDetailsThankYouPageAndMyAccount, checkTotal, closePopup, extractUserFromEmail, fillCheckout, fillKlarna, fillPayPal, goToMyAccountCheckOrderDetails, login, placeOrderNewUserBackend, placeOrderNewUserEmail, placeOrderNewUserRefund, placeOrderNewUserRefundEmail, thankYouPage } from '../helpers/hrg-common-steps';

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

test.describe('HRG - Place Order - PayPal & Klarna', () => {

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
    "street4": "4th Floor",
    "password": process.env.PASSWORD ?? '',
    "company2": "Saucal Shipping",
    "currency": "USD",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
    "street": "123 False Street",
    "stateComplete": "California",
    "city": "San Francisco",
    "includeTax": "false",
    "countryComplete": "United States (US)",
    "zipCode": "94102",
    "phone": "4089211861",
    "street3": "123 False Shipping",
    "Symbol": "$",
    "state": "CA",
    "project": "sewing",
    "country": "US",
    "subscription": "false",
    "street2": "Ap. 4",
    "password2": process.env.PASSWORD2 ?? '',
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
      await page.goto(`${vars.startUrl ?? ''}shop/`);
      await page.waitForLoadState('load');
      await page.locator(`li.product-type-simple.instock a`).filter({ visible: true }).first().click({ force: true });
      vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`div.elementor-widget-woocommerce-product-price .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.elementor-widget-woocommerce-product-price .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      await closePopup(page, vars);
      // ↑ end 09 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 10 - Variable product page
      await page.goto(`${vars.startUrl ?? ''}shop/`);
      await page.waitForLoadState('load');
      await page.waitForLoadState('load');
      await page.locator(`li.product-type-variable.instock a`).filter({ visible: true }).first().click({ force: true });
      await page.goto(`${vars.startUrl ?? ''}product/4-inch-pod-light-kit-for-2024-2026-subaru-crosstrek/`);
      await page.waitForLoadState('load');
      await page.waitForLoadState('load');
      vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#t-shirt-size') }, vars)) {
        {
          const _lbl = page.locator(`label[for="t-shirt-size"]`).filter({ visible: true });
          if (await _lbl.count() > 0) { await _lbl.first().click(); }
          else { await page.locator(`#t-shirt-size`).filter({ visible: true }).first().click({ force: true }); }
        }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#t-shirt-size') }, vars)) {
        try { await page.locator(`#t-shirt-size`).first().fill(`L`); } catch { await page.locator(`#t-shirt-size`).first().selectOption(`L`); }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#t-shirt-size') }, vars)) {
        vars.variable1 = ((await page.locator(`#t-shirt-size`).textContent()) ?? '').trim();
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#material') }, vars)) {
        {
          const _lbl = page.locator(`label[for="material"]`).filter({ visible: true });
          if (await _lbl.count() > 0) { await _lbl.first().click(); }
          else { await page.locator(`#material`).filter({ visible: true }).first().click({ force: true }); }
        }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#material') }, vars)) {
        try { await page.locator(`#material`).first().fill(`Steel`); } catch { await page.locator(`#material`).first().selectOption(`Steel`); }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#material') }, vars)) {
        vars.variable1 = ((await page.locator(`#material`).textContent()) ?? '').trim();
      }
      vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.elementor-widget-woocommerce-product-price .price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.elementor-widget-woocommerce-product-price .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      await closePopup(page, vars);
      // ↑ end 10 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.woocommerce-message')

return !!element }, vars)) {
      await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.product === 'simple' || vars.product === '') {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replace('–','-')

return prod_desc }, vars);
    }
    if (vars.product === 'simple' || vars.product === '') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''} – ${vars.variable1 ?? ''}`);
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tr.shipping > td > #shipping_method > li > label')

return !!element }, vars)) {
      vars.shippingPrice = ((await page.locator(`tr.shipping > td > #shipping_method > li > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.shipping > td > #shipping_method > li > label`)).textContent()) ?? '').trim();
    }
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTotal(page, vars);
    // ↑ end 11 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    await fillCheckout(page, vars);
    await fillKlarna(page, vars);
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

  test('06 - Place Order - Logged User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.logged = `yes`;
    vars.product = `variable`;
    vars.coupon = `false`;
    vars.refund = `false`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Your HRG Offroad account has been created!')]`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
    // ↓ 11 - Cart page
    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 09 - Simple product page
      await page.goto(`${vars.startUrl ?? ''}shop/`);
      await page.waitForLoadState('load');
      await page.locator(`li.product-type-simple.instock a`).filter({ visible: true }).first().click({ force: true });
      vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`div.elementor-widget-woocommerce-product-price .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.elementor-widget-woocommerce-product-price .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      await closePopup(page, vars);
      // ↑ end 09 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 10 - Variable product page
      await page.goto(`${vars.startUrl ?? ''}shop/`);
      await page.waitForLoadState('load');
      await page.waitForLoadState('load');
      await page.locator(`li.product-type-variable.instock a`).filter({ visible: true }).first().click({ force: true });
      await page.goto(`${vars.startUrl ?? ''}product/4-inch-pod-light-kit-for-2024-2026-subaru-crosstrek/`);
      await page.waitForLoadState('load');
      await page.waitForLoadState('load');
      vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#t-shirt-size') }, vars)) {
        {
          const _lbl = page.locator(`label[for="t-shirt-size"]`).filter({ visible: true });
          if (await _lbl.count() > 0) { await _lbl.first().click(); }
          else { await page.locator(`#t-shirt-size`).filter({ visible: true }).first().click({ force: true }); }
        }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#t-shirt-size') }, vars)) {
        try { await page.locator(`#t-shirt-size`).first().fill(`L`); } catch { await page.locator(`#t-shirt-size`).first().selectOption(`L`); }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#t-shirt-size') }, vars)) {
        vars.variable1 = ((await page.locator(`#t-shirt-size`).textContent()) ?? '').trim();
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#material') }, vars)) {
        {
          const _lbl = page.locator(`label[for="material"]`).filter({ visible: true });
          if (await _lbl.count() > 0) { await _lbl.first().click(); }
          else { await page.locator(`#material`).filter({ visible: true }).first().click({ force: true }); }
        }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#material') }, vars)) {
        try { await page.locator(`#material`).first().fill(`Steel`); } catch { await page.locator(`#material`).first().selectOption(`Steel`); }
      }
      if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('#material') }, vars)) {
        vars.variable1 = ((await page.locator(`#material`).textContent()) ?? '').trim();
      }
      vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.elementor-widget-woocommerce-product-price .price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.elementor-widget-woocommerce-product-price .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      await closePopup(page, vars);
      // ↑ end 10 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.woocommerce-message')

return !!element }, vars)) {
      await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.product === 'simple' || vars.product === '') {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replace('–','-')

return prod_desc }, vars);
    }
    if (vars.product === 'simple' || vars.product === '') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''} – ${vars.variable1 ?? ''}`);
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tr.shipping > td > #shipping_method > li > label')

return !!element }, vars)) {
      vars.shippingPrice = ((await page.locator(`tr.shipping > td > #shipping_method > li > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.shipping > td > #shipping_method > li > label`)).textContent()) ?? '').trim();
    }
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTotal(page, vars);
    // ↑ end 11 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    await fillCheckout(page, vars);
    await fillPayPal(page, vars);
    await blockUI(page, vars);
    vars.email = `${vars.payPalUser ?? ''}`;
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

  test('09 - Place Order - New User - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefund(page, vars);
  });

  test('10 - Place Order - New User - Refund - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefundEmail(page, vars);
  });

});
