// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "STAGING Mood - WP & WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, blockUI, extractUserFromEmail, login, myAccountLinks, placeOrderElement, register, uRLOfCurrentPage, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { addProductToCart, checkEmailOrder, checkThankYouPageAndOrderOnMyAccount, closePopup } from '../helpers/mood-common-steps';

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

test.describe('STAGING Mood - WP & WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "mood",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "countryComplete": "United States (US)",
    "state": "FL",
    "stateComplete": "Florida",
    "Symbol": "$",
    "country": "US",
    "currency": "USD",
    "company": "Testing",
    "company2": "Testing Shipping",
    "street": "123 False St",
    "street2": "Ap. 4",
    "street3": "123 False Shipping",
    "street4": "Ap. Shipp",
    "city": "Miami",
    "zipCode": "33126",
    "phone": "14324322345",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Ship`,
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
  });

  test('02 - Under 21 years of Age', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-no`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.age-gate__error`).first()).toContainText(`You are not old enough to view this content`);
    await blockImageSizes(page, vars);
  });

  test('03 - Modal popup discount', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var body = document.documentElement || document.body;
body.scrollTop = 1000; }, vars);
    await expect(page.locator(`body > div > div.needsclick > div.needsclick > div.needsclick > div.needsclick`)).not.toHaveCount(0);
  });

  test('04 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`div.hamburg-bars`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.hm-nav-shop > a[href*="/shop/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - Category page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Shop page
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`div.hamburg-bars`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.hm-nav-shop > a[href*="/shop/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Shop page
    vars.qty = ((await page.locator(`div:nth-of-type(1) > div > div.wcpf-checkbox-list > div:nth-of-type(1).wcpf-item.wcpf-checkbox-item .wcpf-product-counts`).textContent()) ?? '').trim();
    vars.qty = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let qty = `${vars.qty}`;
let numberPattern = /\d+/g;
qty = qty.match(numberPattern)
return qty[0] }, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`.filter-block-btn`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`div:nth-of-type(1) > div > div.wcpf-checkbox-list > div:nth-of-type(1).wcpf-item.wcpf-checkbox-item`).filter({ visible: true }).first().click({ force: true });
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let check = document.querySelector<HTMLInputElement>("div:nth-of-type(1) > div > div.wcpf-checkbox-list > div:nth-of-type(1).wcpf-item.wcpf-checkbox-item .wcpf-input.wcpf-input-checkbox");
return (check as HTMLInputElement).checked }, vars)).toBeTruthy();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`div.hm-filter-close-mobile > button`).filter({ visible: true }).first().click({ force: true });
    }
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let list = Array.from<any>(document.querySelectorAll("ul.products > li"));
return list.length === vars.qty }, vars)).toBeTruthy();
  });

  test('06 - Variable Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Shop page
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`div.hamburg-bars`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.hm-nav-shop > a[href*="/shop/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Shop page
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let product = document.querySelector<HTMLAnchorElement>("a.product_type_variable");
product.previousElementSibling.click(); }, vars);
    await closePopup(page, vars);
    await expect(page.locator(`span.stamped-product-reviews-badge`)).not.toHaveCount(0);
    await expect(page.locator(`section.Product_Reviews_Block`)).not.toHaveCount(0);
  });

  test('07 - Simple product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Shop page
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`div.hamburg-bars`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.hm-nav-shop > a[href*="/shop/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Shop page
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let product = document.querySelector("li.product-type-simple");
product.firstElementChild.click(); }, vars);
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await closePopup(page, vars);
    }
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await expect(page.locator(`span.stamped-product-reviews-badge`)).not.toHaveCount(0);
    }
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await expect(page.locator(`section.Product_Reviews_Block`)).not.toHaveCount(0);
    }
  });

  test('08 - Reviews page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    // ↑ end 01 - Home page
    await page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/reviews/"]`).filter({ visible: true }).first().click({ force: true });
    await closePopup(page, vars);
    await page.locator(`div.acc__card:nth-of-type(1) > .acc__title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.acc__card:nth-of-type(2) > .acc__title`).filter({ visible: true }).first().click({ force: true });
  });

  test('09 - Delta 8 page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    // ↑ end 01 - Home page
    await page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/what-is-delta-8/"]`).filter({ visible: true }).first().click({ force: true });
    await closePopup(page, vars);
    await page.locator(`div.acc__card:nth-of-type(3) > .acc__title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.acc__card:nth-of-type(4) > .acc__title`).filter({ visible: true }).first().click({ force: true });
  });

  test('10 - Register, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    // ↑ end 01 - Home page
    await register(page, vars);
    await myAccountLinks(page, vars);
    await login(page, vars);
  });

  test('11 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    // ↑ end 01 - Home page
    await register(page, vars);
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce > div > div.u-column1.col-1 > h2`).first()).toContainText(`Login`);
    await page.locator(`a[href*="/my-account/lost-password/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-ResetPassword > p:nth-of-type(1)`).first()).toContainText(`Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.`);
    {
      const _lbl = page.locator(`label[for="user_login"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#user_login`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`button[type="submit"].woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button[type="submit"].woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

  test('12 - Normal Cart', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await uRLOfCurrentPage(page, vars);
    vars.variable = `no`;
    await addProductToCart(page, vars);
    await page.goto(`${vars.site ?? ''}/cart`);
    await page.waitForLoadState('load');
  });

  test('13 - Side Cart', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.variable = `yes`;
    vars.shipping = `free`;
    await addProductToCart(page, vars);
  });

  test('14 - Checkout', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.variable = `yes`;
    vars.shipping = `free`;
    await addProductToCart(page, vars);
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.cfw-cart-item-title`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.var ?? ''}`);
    await expect(page.locator(`td.cfw-cart-item-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`a[aria-label="Edit"]`).first()).toContainText(`${vars.qty ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  });

  test('15 - Place order - New user - Up-Sell', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.variable = `yes`;
    vars.shipping = `free`;
    vars.upsell = `yes`;
    await addProductToCart(page, vars);
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = `${vars.prod_desc ?? ''} - ${vars.var ?? ''}`;
    await expect(page.locator(`td.cfw-cart-item-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`a[aria-label="Edit"]`).first()).toContainText(`${vars.qty ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await placeOrderElement(page, vars);
    await expect(page.locator(`li.parsley-required`)).not.toHaveCount(0);
    await wooCommerceCheckoutTemplate(page, vars);
    await page.locator(`#cfw_order_bumps_below_cart_items > div.cfw-order-bump.cfw-module:nth-of-type(1) > .cfw-order-bump-header > label > input[name="cfw_order_bump[]"][type="checkbox"].cfw_order_bump_check`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc2 = ((await page.locator(`tr.cart-item-row.cart_item.product_cat-Pre-Rolls > th.cfw-cart-item-description > .cfw-cart-item-title`).textContent()) ?? '').trim();
    vars.unitPrice2 = ((await page.locator(`tr.cart-item-row.cart_item.product_cat-Pre-Rolls > td.cfw-cart-item-subtotal > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.price2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var currency = `${vars.unitPrice2}`;
return currency.replace(/[vars.Symbol,]+/g,""); }, vars);
    vars.price3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var currency = `${vars.subtotalPrice}`;
return currency.replace(/[vars.Symbol,]+/g,""); }, vars);
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var price2 = vars.price2;
var subtotal = vars.price3 + price2;
subtotal = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(subtotal)
return subtotal }, vars);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="hm_asr_checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#hm_asr_checkbox`).filter({ visible: true }).first().click({ force: true }); }
    }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = ((await page.locator(`.title > h5`).or(page.locator(`li.woocommerce-order-overview__order.order > strong`)).textContent()) ?? '').trim();
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let orderNumber = `${vars.orderNumber}`
const numbers = orderNumber.match(/\d+/g);
return numbers[0] }, vars);
    await checkThankYouPageAndOrderOnMyAccount(page, vars);
    await page.locator(`a[title="Hello Mood"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.loginBtn > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    vars.points = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotal = `${vars.subtotalPrice}`
subtotal = subtotal.replace(/[vars.Symbol,]+/g,"");
let points = Math.floor(subtotal * 2);
return points }, vars);
    await page.locator(`a[href*="/my-account/my-points/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`span.points_collected`).first()).toHaveText(`${vars.points ?? ''}`);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`On hold`);
    await expect(page.locator(`tr:nth-of-type(1) > td > span.woocommerce-Price-amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/checkout/order-received/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await checkThankYouPageAndOrderOnMyAccount(page, vars);
    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await checkEmailOrder(page, vars);
  });

  test('16 - Place order - Old user', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.variable = `no`;
    vars.shipping = ``;
    vars.upsell = `no`;
    vars.username = `${vars.email ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    // ↑ end 01 - Home page
    await login(page, vars);
    await addProductToCart(page, vars);
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.cfw-cart-item-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`a[aria-label="Edit"]`).first()).toContainText(`${vars.qty ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await page.locator(`button#ywpar_apply_discounts`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let points = vars.points;
let discount = points /100;
discount = Intl.NumberFormat('en-US', { style: 'currency', currency: `${vars.currency}`}).format(discount);
return discount }, vars);
    await expect(page.locator(`tr.cart-discount > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.discount ?? ''}`);
    vars.shippingPrice = ((await page.locator(`tr.woocommerce-shipping-totals > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotalPrice}`;
let shipping = `${vars.shippingPrice}`;
let discount = `${vars.discount}`
if (discount === ""){
    discount = "0.00";
};
if (shipping.includes("Free") || shipping.includes("Lettermail (untracked)")){
    shipping = "0.00";
};
let tax = `${vars.taxPrice}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.total}`;

unit = unit.replace(",","");
discount = discount.replace(",","");
shipping = shipping.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit-discount+shipping+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
    try { await page.locator(`#shipping_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#shipping_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = ((await page.locator(`.title > h5`).or(page.locator(`li.woocommerce-order-overview__order.order > strong`)).textContent()) ?? '').trim();
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let orderNumber = `${vars.orderNumber}`
const numbers = orderNumber.match(/\d+/g);
return numbers[0] }, vars);
    await checkThankYouPageAndOrderOnMyAccount(page, vars);
    await page.locator(`a[title="Hello Mood"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.loginBtn > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toHaveText(`On hold`);
    await expect(page.locator(`tr:nth-of-type(1) > td > span.woocommerce-Price-amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/checkout/order-received/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await checkThankYouPageAndOrderOnMyAccount(page, vars);
    await extractUserFromEmail(page, vars);
    await checkEmailOrder(page, vars);
  });

});
