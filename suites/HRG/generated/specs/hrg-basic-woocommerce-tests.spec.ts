// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "HRG - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { checkTotal, closePopup, extractUserFromEmail, fillCC, login, register } from '../helpers/hrg-common-steps';

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

test.describe('HRG - Basic WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "$",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Testing Inc.",
    "phone": "3211231234",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`.elementor-element.elementor-element-36b43d4e > .elementor-widget-container > h2.elementor-size-default`).first()).toContainText(`Featured`);
    await expect(page.locator(`ul.products`).first()).toBeVisible();
  });

  test('02 - Header', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('03 - Footer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('07 - Registration, My Account links & Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Congratulations! Registration Complete on HRG Offroad')]`).or(page.locator(`xpath=//a[contains(text(),'Welcome to HRG Offroad')]`)).filter({ visible: true }).first().click({ force: true });
    await page.goto(`${vars.startUrl ?? ''}`);
    await page.waitForLoadState('load');
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Quotes")]`).or(page.locator(`a[href*="/my-account/quotes/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-MyAccount-content > div.woocommerce-message.woocommerce-message--info.woocommerce-Message.woocommerce-Message--info.woocommerce-info`).first()).toContainText(`No quote has been made yet.`);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/my-account/downloads/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-columns`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
  });

  test('08 - Forgot Password flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `${vars.emailReg ?? ''}`;
    await register(page, vars);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    if (!page.url().includes('/my-account') && !page.url().includes('/login')) {
      await page.locator(`a[href*="/my-account"]`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`form > p.woocommerce-LostPassword.lost_password > a`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`button[name="pp-login-form-lost-pw"]`).or(page.locator(`xpath=//*[contains(text(), "Reset password")]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Reset your password for")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#body_content_inner > div > p:nth-child(7) > a`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="password_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//span[contains(text(), "Save")]`).or(page.locator(`button[type='submit'].woocommerce-Button.button`)).filter({ visible: true }).first().click({ force: true });
  });

  test('09 - Simple product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}shop/`);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-simple.instock a`).filter({ visible: true }).first().click({ force: true });
    vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.elementor-widget-woocommerce-product-price .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.elementor-widget-woocommerce-product-price .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await closePopup(page, vars);
  });

  test('10 - Variable product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('11 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('12 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
    if (vars.product === 'simple' || vars.product === '') {
      await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.variable1 ?? ''}`);
    }
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await closePopup(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Billing First name is a required field.
Billing Last name is a required field.
Billing Country / Region is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP Code is a required field.
Billing Phone is a required field.
Billing Email address is a required field.
Shipping First name is a required field.
Shipping Last name is a required field.
Shipping Country / Region is a required field.
Shipping Street address is a required field.
Shipping Town / City is a required field.
Shipping State is a required field.
Shipping ZIP Code is a required field.
Shipping Phone is a required field.
Please read and accept the terms and conditions to proceed with your order.`);
  });

});
