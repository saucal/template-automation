// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "CA - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, checkTheTotal, extractUserFromEmail, register } from '../helpers/common-steps-for-all-projects';
import { calculateShipping, changeHeightToSlider, checkEarningPointsCartCheckout, creditsVariables, login } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('CA - Basic WooCommerce Test', () => {

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
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "city": "Ottawa",
    "stateComplete": "Ontario",
    "zipCode": "K1S 3V6",
    "phone": "6139689789",
    "street3": "123 False Shipping",
    "Symbol": "$",
    "state": "ON",
    "country": "CA",
    "countryComplete": "Canada",
    "project": "nopong",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "currency": "CAD",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('"Forgot password?" flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`xpath=//a[contains(text(), "Logout")]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-form.woocommerce-form-login.login`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/wp-login.php?action=lostpassword"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`.woocommerce-Button.button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`PASSWORD RESET EMAIL HAS BEEN SENT.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).or(page.locator(`p > a`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password_1`).first().selectOption(`fric2172Biot`); }
    try { await page.locator(`#password_2`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password_2`).first().selectOption(`fric2172Biot`); }
    await page.locator(`button.woocommerce-Button.button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`YOUR PASSWORD HAS BEEN RESET SUCCESSFULLY.`);
    try {
      await page.locator(`.woocommerce-MyAccount-navigation-link--customer-logout a`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`#password`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password`).first().selectOption(`fric2172Biot`); }
    await page.locator(`button[name="login"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-navigation`)).not.toHaveCount(0);
  });

  test('01 - CA - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await changeHeightToSlider(page, vars);
  });

  test('01 - CA - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await changeHeightToSlider(page, vars);
  });

  test('02 - CA - Home Slider Autoplay verification', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.entry-content > h2.has-text-align-center.has-text-color.wp-block-heading`).first()).toContainText(`you are our Heroes`);
    await page.screenshot({ fullPage: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      vars.elId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const el = Array.from<any>(document.querySelectorAll("div#tns2-mw div.tns-item.tns-slide-active"));
let elId= [el[0].id,el[1].id,el[2].id];

return elId
 }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      vars.elId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const el = Array.from<any>(document.querySelectorAll("div#tns2-mw div.tns-item.tns-slide-active"));
let elId= [el[0].id];

return elId
 }, vars);
    }
    await page.waitForTimeout(12000);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const el2 = Array.from<any>(document.querySelectorAll("div#tns2-mw div.tns-item.tns-slide-active"));
let elId2 = [el2[0].id,el2[1].id,el2[2].id]

const elId = vars.elId
return(elId != elId2)
 }, vars)).toBeTruthy();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const el2 = Array.from<any>(document.querySelectorAll("div#tns2-mw div.tns-item.tns-slide-active"));
let elId2 = [el2[0].id]

const elId = vars.elId
return(elId != elId2)
 }, vars)).toBeTruthy();
    }
    await page.screenshot({ fullPage: true });
  });

  test('03 - CA - Home Slider Manual verification', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "prev")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(1)`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "prev")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(1)`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.tns-item.tns-slide-cloned:nth-of-type(3) > img.tns-lazy-img.loaded.tns-complete`)).not.toHaveCount(0);
  });

  test('04 - CA - Site Country verification', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(6) > a[href*="/ca/products/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.label`).first()).toContainText(`${vars.country ?? ''}`);
  });

  test('05 - CA- Simple Product Shop Page (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('05 - CA- Simple Product Shop Page (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('06 - CA - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('06 - CA - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
    vars.prod_desc = ((await page.locator(`#main > div > div > div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns.has-multiple-rows.alignfull > ul > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    await page.locator(`a[href="?add-to-cart=616"]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label .woocommerce-Price-amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
  });

  test('07 - CA - Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('07 - CA - Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
    vars.prod_desc = ((await page.locator(`#main > div > div > div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns.has-multiple-rows.alignfull > ul > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    await page.locator(`a[href="?add-to-cart=616"]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label .woocommerce-Price-amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    // ↑ end 06 - CA - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.blockUI`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`.blockUI`)).toHaveCount(0);
    } catch { /* optional step: assertElementNotPresent */ }
  });

  test('09 - CA - Registration, My Account links and Login (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    try {
      await expect(page.locator(`a[href*="/ca/my-account/"].label`).or(page.locator(`div.nopong-touch-accordion > a[href*="/ca/my-account/"]`)).first()).toContainText(`Login Or Sign up`);
    } catch { /* optional step: assertTextPresent */ }
    await register(page, vars);
    vars.name = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let email = `${vars.username}`
email = email.replace('+','').replace('@saucal.com','').toLowerCase()
return email }, vars);
    await expect(page.locator(`a[href*="/ca/my-account/"].label`).or(page.locator(`div.woocommerce-account-dashboard > h2`)).first()).toContainText(`Hello, ${vars.name ?? ''}!`);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-message.woocommerce-message--info.woocommerce-Message.woocommerce-Message--info.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner__content`)).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No order has been made yet.`);
    await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce_account_subscriptions > p`).first()).toContainText(`You have no active subscriptions.`);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.u-columns.woocommerce-Addresses.col2-set.addresses`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > div > div > a.button`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#post-8 > div > div > div > form`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`#post-8 > div.entry-content > div > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`)).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`#post-8 > div.entry-content > div > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`)).filter({ visible: true }).first().click({ force: true });
  });

  test('12 - CA - FAQ Accordion (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/faq/"]`).or(page.locator(`li.menu-item a[href*="/faq/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`FREQUENTLY ASKED QUESTIONS`);
    await page.locator(`div:nth-of-type(1) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(1) > div:nth-of-type(2) > p`).first()).toBeVisible();
    await page.locator(`div:nth-of-type(1) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(1) > div:nth-of-type(2) > p`).first()).not.toBeVisible();
    await page.locator(`div:nth-of-type(7) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > div`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(7) > div:nth-of-type(2) > p`).first()).toBeVisible();
    await expect(page.locator(`#post-1161 > div > div.wp-block-nopong-limited-accordion.nopong-limited-accordion--block.has-icon-align-left > div.wp-block-nopong-limited-accordion-item.open > div.nopong-limited-accordion-item--body > figure > div > div > div > div > img`).first()).toBeVisible();
    await page.locator(`div:nth-of-type(7) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(7) > div:nth-of-type(2) > p`).first()).not.toBeVisible();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const ele = document.querySelector("div.wp-block-nopong-limited-accordion-item > div > svg");
let el = ele.getBoundingClientRect();
return(el.width == 16); }, vars)).toBeTruthy();
  });

  test('12 - CA - FAQ Accordion (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/faq/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`FREQUENTLY ASKED QUESTIONS`);
    await page.locator(`div:nth-of-type(1) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(1) > div:nth-of-type(2) > p`).first()).toBeVisible();
    await page.locator(`div:nth-of-type(1) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(1) > div:nth-of-type(2) > p`).first()).not.toBeVisible();
    await page.locator(`div:nth-of-type(7) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > div`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(7) > div:nth-of-type(2) > p`).first()).toBeVisible();
    await expect(page.locator(`#post-1161 > div > div.wp-block-nopong-limited-accordion.nopong-limited-accordion--block.has-icon-align-left > div.wp-block-nopong-limited-accordion-item.open > div.nopong-limited-accordion-item--body > figure > div > div > div > div > img`).first()).toBeVisible();
    await page.locator(`div:nth-of-type(7) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(7) > div:nth-of-type(2) > p`).first()).not.toBeVisible();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const ele = document.querySelector("div.wp-block-nopong-limited-accordion-item > div > svg");
let el = ele.getBoundingClientRect();
return(el.width == 16); }, vars)).toBeTruthy();
  });

  test('13 - CA - In the news (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href*='/no-pong-in-the-news/']`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`).first()).toBeVisible();
    await expect(page.locator(`.entry-content`).first()).toBeVisible();
  });

  test('13 - CA - In the news (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#menu-item-468349> a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`).first()).toBeVisible();
    await expect(page.locator(`.entry-content`).first()).toBeVisible();
  });

  test('14 - CA - WP Store Locator (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Retailers")]`).or(page.locator(`a[href*="/ca/retailers/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Retailers`);
    await expect(page.locator(`p:nth-child(2) > strong`).or(page.locator(`h5.wp-block-heading:nth-child(2)`)).first()).toContainText(`We LOVE to support small businesses – after all, we are one!`);
    try { await page.locator(`#wpsl-search-input`).first().fill(`Calgary, Alberta`); } catch { await page.locator(`#wpsl-search-input`).first().selectOption(`Calgary, Alberta`); }
    {
      const _lbl = page.locator(`label[for="wpsl-search-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-btn`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.store = ((await page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).textContent()) ?? '').trim();
    await page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`li:nth-child(1) > div.wpsl-store-location > p:nth-child(1) > strong > a`).or(page.locator(`li:nth-child(1) div.wpsl-store-location > p:nth-child(1) > strong > a`)).first()).toHaveText(`${vars.store ?? ''}`);
    {
      const _lbl = page.locator(`label[for="wpsl-search-input"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-input`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#wpsl-search-input`).first().fill(`wanaka`); } catch { await page.locator(`#wpsl-search-input`).first().selectOption(`wanaka`); }
    {
      const _lbl = page.locator(`label[for="wpsl-search-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-btn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForTimeout(500);
    await expect(page.locator(`.wpsl-no-results-msg`).first()).toContainText(`No results found`);
    {
      const _lbl = page.locator(`label[for="wpsl-search-input"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-input`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#wpsl-search-input`).first().fill(`Osoyoos`); } catch { await page.locator(`#wpsl-search-input`).first().selectOption(`Osoyoos`); }
    await page.locator(`div.pac-item:nth-of-type(1) > .pac-item-query`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="wpsl-search-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-btn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).first()).toHaveText(`LAZY E BOUTIQUE`);
    await expect(page.locator(`li:nth-of-type(2) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).first()).toHaveText(`THE LASH LOT BEAUTY LOUNGE`);
    try {
      await expect(page.locator(`div[aria-label="Map"] > div:nth-of-type(2)`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    await page.locator(`xpath=//a[contains(text(), "THE LASH LOT BEAUTY LOUNGE")]`).or(page.locator(`li:nth-of-type(2) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div:nth-child(2) > div:nth-child(2) > div > div:nth-child(4) > div > div > div > div.gm-style-iw.gm-style-iw-c > div > div > div > p > strong > a`).or(page.locator(`div> div > div > div> div > div > div > p > strong > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`THE LASH LOT BEAUTY LOUNGE`);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const expect = `${vars.startUrl}retailer/the-lash-lot-beauty-lounge/`;
const actual = window.location.href;

return actual == expect; }, vars)).toBeTruthy();
  });

  test('14 - CA - WP Store Locator (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Retailers")]`).or(page.locator(`a[href*="/retailers/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Retailers`);
    await expect(page.locator(`h5#h-we-love-to-support-small-businesses-after-all-we-are-one-nbsp`).first()).toContainText(`We LOVE to support small businesses – after all, we are one!`);
    await page.locator(`xpath=//a[contains(text(), "LES HAIR BY STÉPHANIE")]`).or(page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`li:nth-child(1) > div.wpsl-store-location > p:nth-child(1) > strong > a`).first()).toHaveText(`LES HAIR BY STÉPHANIE`);
    await page.locator(`li:nth-child(2) > div.wpsl-store-location > p:nth-child(1) > strong > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-child(2) > div:nth-child(2) > div > div:nth-child(4) > div > div > div > div.gm-style-iw.gm-style-iw-c > div > div > div > p > strong > a`).or(page.locator(`#wpsl-stores > ul > li:nth-child(2) > div > p > strong > a`)).first()).toHaveText(`TROPICAL DREAMS DIVE ADVENTURES`);
    {
      const _lbl = page.locator(`label[for="wpsl-search-input"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-input`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#wpsl-search-input`).first().fill(`wanaka`); } catch { await page.locator(`#wpsl-search-input`).first().selectOption(`wanaka`); }
    {
      const _lbl = page.locator(`label[for="wpsl-search-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-btn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.wpsl-no-results-msg`).first()).toContainText(`No results found`);
    {
      const _lbl = page.locator(`label[for="wpsl-search-input"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-input`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#wpsl-search-input`).first().fill(`Osoyoos`); } catch { await page.locator(`#wpsl-search-input`).first().selectOption(`Osoyoos`); }
    await page.locator(`div.pac-item:nth-of-type(1) > .pac-item-query`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="wpsl-search-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-btn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).first()).toHaveText(`LAZY E BOUTIQUE`);
    await expect(page.locator(`li:nth-of-type(2) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).first()).toHaveText(`THE LASH LOT BEAUTY LOUNGE`);
    try {
      await expect(page.locator(`div[aria-label="Map"] > div:nth-of-type(2)`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    await page.locator(`xpath=//a[contains(text(), "THE LASH LOT BEAUTY LOUNGE")]`).or(page.locator(`li:nth-of-type(2) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div:nth-child(2) > div:nth-child(2) > div > div:nth-child(4) > div > div > div > div.gm-style-iw.gm-style-iw-c > div > div > div > p > strong > a`).or(page.locator(`div> div > div > div> div > div > div > p > strong > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`THE LASH LOT BEAUTY LOUNGE`);
    vars.url = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href;
return url; }, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const expect = "https://www.nopong.ca/retailer/the-lash-lot-beauty-lounge/";
const actual = `${vars.url}`;

return actual == expect; }, vars)).toBeTruthy();
  });

  test('15 - CA - Subscription popup verification (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`li.menu-item a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`#h-choose-your-monthly-club-here`).first()).toHaveText(`CHOOSE YOUR MONTHLY CLUB HERE`);
    await expect(page.locator(`a[href*="?add-to-cart=1270"]`).first()).toHaveText(`Join the Club`);
    await page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(3)`).or(page.locator(`a[href*="?add-to-cart=1270"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).not.toBeVisible();
    }
  });

  test('15 - CA - Subscription popup verification (Copy)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`div.nopong-storefront-button`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`#h-choose-your-monthly-club-here`).first()).toHaveText(`CHOOSE YOUR MONTHLY CLUB HERE`);
    await expect(page.locator(`a[href="?add-to-cart=1270"]`).first()).toHaveText(`Join the Club`);
    await page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(3)`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).not.toBeVisible();
    }
  });

});
