// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "LIVE Mood - WP & WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';
import { addProductToCart, closePopup } from '../helpers/mood-common-steps';

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

test.describe('LIVE Mood - WP & WooCommerce Tests', () => {

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

});
