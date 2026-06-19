// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "The Sewing M.S. - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { checkTotal, extractUserFromEmail, fillCC, login, register } from '../helpers/the-sewing-m-s-common-steps';

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

test.describe('The Sewing M.S. - Basic WooCommerce Tests', () => {

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
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`.fl-module-product-carousel`)).not.toHaveCount(0);
    await expect(page.locator(`#categories-slider`)).not.toHaveCount(0);
    await expect(page.locator(`.pp-testimonials`)).not.toHaveCount(0);
    await expect(page.locator(`div > div > div > div > div > div > div.pp-logos-content.is-carousel`)).not.toHaveCount(0);
  });

  test('02 - Header', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#mega-menu-item-16674 a > span`).first().hover();
  });

  test('03 - Footer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`.pp-social-icons`)).not.toHaveCount(0);
  });

  test('04 - Reviews', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-1204 > a`).filter({ visible: true }).first().click({ force: true });
  });

  test('05 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href='${vars.startUrl ?? ''}shop/']`).filter({ visible: true }).first().click({ force: true });
    vars.qty = ((await page.locator(`label[for="wpc-checkbox-taxonomy-product_cat-20"] > .wpc-term-count > .wpc-term-count-value`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="wpc-checkbox-taxonomy-product_cat-20"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpc-checkbox-taxonomy-product_cat-20`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-result-count`).first()).toContainText(`Showing 1–15 of ${vars.qty ?? ''} results`);
    await page.locator(`xpath=//a[contains(text(), "4")]`).or(page.locator(`a[href*="/shop/page/4/?category=sewing-machines"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`nav[aria-label="Breadcrumb"]`).first()).toContainText(`Page 4`);
    await expect(page.locator(`.woocommerce-result-count`).first()).toContainText(`Showing 46–60 of ${vars.qty ?? ''} results`);
  });

  test('06 - Contact Us', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#top-main-menu a[href*="/contact-us/"].mega-menu-link`).or(page.locator(`#top-main-menu-mobile a[href*="/contact-us/"].mega-menu-link`)).or(page.locator(`xpath=//a[contains(text(),'Contact')]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('07 - Registration, My Account links & Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Your The Sewing Machine Shop account has been created!')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Set your new password.')]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    await page.locator(`xpath=//a[contains(text(), "Quotes")]`).or(page.locator(`a[href*="/my-account/quotes/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.ywraq-no-quote-in-list`).first()).toContainText(`No quote request available.`);
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
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Your The Sewing Machine Shop account has been created!')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Set your new password.')]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    if (!page.url().includes('/my-account') && !page.url().includes('/login')) {
      await page.locator(`#top-main-menu-bar .pp-offcanvas-toggle-icon.fal.fa-user-circle`).or(page.locator(`#top-main-menu-mobile .pp-offcanvas-toggle-icon.fal.fa-user-circle`)).filter({ visible: true }).first().click({ force: true });
    }
    if (!page.url().includes('/my-account') && !page.url().includes('/login')) {
      await page.locator(`.pp-offcanvas-content-visible a[href*="/my-account/"].pp-login-register`).or(page.locator(`xpath=//a[contains(text(), "Register")]`)).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`xpath=//a[contains(text(), "Forgot your password?")]`).or(page.locator(`a.pp-login-lost-password`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`button[name="pp-login-form-lost-pw"]`).or(page.locator(`xpath=//span[contains(text(), "Reset password")]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.pp-lf-success`).first()).toContainText(`A password reset email has been sent to the email address for your account, but may take several minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request for")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div > pre > a[href*='${vars.startUrl ?? ''}login/?reset_pass=1&key=']`).or(page.locator(`#content > pre > a`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="password_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//span[contains(text(), "Save")]`).or(page.locator(`.pp-login-form--button-text`)).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

  test('09 - Simple product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/shop/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.product-type-simple.instock > a`).filter({ visible: true }).first().click({ force: true });
    vars.{{prod_desc}} = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await expect(page.locator(`.summary > .yith-ywraq-add-to-quote > .yith-ywraq-add-button > a[href="#"].add-request-quote-button.button`).first()).toContainText(`Get a quote`);
  });

  test('10 - Variable product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('11 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('12 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
    if (vars.product === 'simple' || vars.product === '') {
      await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.color ?? ''}`);
    }
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`#shipping_method > li:nth-child(1) > label > span > bdi`).or(page.locator(`#shipping_method > li:nth-child(1) > label`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Billing Email address is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing ZIP Code is a required field.
Billing Phone is a required field.`);
  });

});
