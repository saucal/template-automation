// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "AU - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, checkTheTotal, extractUserFromEmail, register } from '../helpers/common-steps-for-all-projects';
import { calculateShipping, checkEarningPointsCartCheckout, creditsVariables, login } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('AU - Basic WooCommerce Test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "phone": "3059689789",
    "street3": "123 False Shipping",
    "countryComplete": "Australia",
    "Symbol": "$",
    "project": "nopong",
    "country": "AU",
    "state": "NSW",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "currency": "AUD",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "city": "Sydney",
    "stateComplete": "New South Wales",
    "zipCode": "2000",
    "adminUser": "giAdmin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - AU - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`.primary-navigation a[href*="/my-account/"]`).or(page.locator(`ul > li.menu-item.menu-item-type-post_type.menu-item-object-page.nopong-my-account-menu > div > a`)).first()).toHaveText(`LOGIN OR SIGN UP`);
  });

  test('01 - AU - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`a[href*="/my-account/"].label`).first()).toContainText(`Login or Sign up`);
  });

  test('02 - AU - Home Slider Autoplay verification', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.entry-content > h2.has-text-align-center.has-text-color.wp-block-heading`).first()).toContainText(`you are our Heroes`);
    await page.screenshot({ fullPage: true });
    await page.waitForTimeout(12000);
    await page.screenshot({ fullPage: true });
  });

  test('02 - AU - Home Slider Autoplay verification', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.entry-content > h2.has-text-align-center.has-text-color.wp-block-heading`).first()).toContainText(`you are our Heroes`);
    await page.screenshot({ fullPage: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      vars.elId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const el = Array.from<any>(document.querySelectorAll("div#tns2-mw div.tns-item.tns-slide-active"));
let elId= [el[0].id];

return elId
 }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      vars.elId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const el = Array.from<any>(document.querySelectorAll("div#tns2-mw div.tns-item.tns-slide-active"));
let elId= [el[0].id,el[1].id,el[2].id];

return elId
 }, vars);
    }
    await page.waitForTimeout(12000);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width  767 }, vars)) {
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

  test('03 - AU - Home Slider Manual verification', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "next")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "next")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#tns1-item4 > img.tns-lazy-img.loaded.tns-complete`).or(page.locator(`#tns1-item2 > img.tns-lazy-img.loaded.tns-complete`)).first()).toBeVisible();
  });

  test('04 - AU - Site Country verification', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.label`).first()).toContainText(`${vars.country ?? ''}`);
  });

  test('05 - AU - Simple Product Shop Page', async ({ page }) => {
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

  test('05 - AU - Simple Product Shop Page', async ({ page }) => {
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

  test('06 - AU - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - AU - Simple Product Shop Page
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
    // ↑ end 05 - AU - Simple Product Shop Page
    await creditsVariables(page, vars);
    vars.prod_desc = ((await page.locator(`.product-main .product_title`).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/a/div[contains(@class, 'wc-block-grid__product-title')]`)).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")
desc = desc.replaceAll('“','"')
desc = desc.replaceAll('”','"')

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.product-main .woocommerce-Price-amount`).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/*[contains(@class, 'price')]/ins/*[contains(@class, 'woocommerce-Price-amount')]`)).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/*[contains(@class, 'price')]/*[contains(@class, 'woocommerce-Price-amount')]`)).textContent()) ?? '').trim();
    await page.locator(`li:not([data-slug*='bundle']) a[href*="?add-to-cart="]`).or(page.locator(`form.cart .single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).or(page.locator(`#masthead div > ul > li > a.cart-contents`)).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = `2`;
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (vars.logged !== 'yes') {
      await calculateShipping(page, vars);
    }
    try {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    vars.taxPrice = ((await page.locator(`tr.order-total > td > small > span`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
  });

  test('06 - AU - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - AU - Simple Product Shop Page
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
    // ↑ end 05 - AU - Simple Product Shop Page
    vars.prod_desc = ((await page.locator(`ul.wc-block-grid__products > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`li:nth-of-type(1) > .price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    await page.locator(`a[href*="?add-to-cart="]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = `2`;
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    try {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    vars.taxPriceSmall = ((await page.locator(`tr.order-total > td > small > span`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
  });

  test('07 - AU - Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 06 - AU - Cart Page
    // ↓ 05 - AU - Simple Product Shop Page
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
    // ↑ end 05 - AU - Simple Product Shop Page
    await creditsVariables(page, vars);
    vars.prod_desc = ((await page.locator(`.product-main .product_title`).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/a/div[contains(@class, 'wc-block-grid__product-title')]`)).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")
desc = desc.replaceAll('“','"')
desc = desc.replaceAll('”','"')

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.product-main .woocommerce-Price-amount`).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/*[contains(@class, 'price')]/ins/*[contains(@class, 'woocommerce-Price-amount')]`)).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/*[contains(@class, 'price')]/*[contains(@class, 'woocommerce-Price-amount')]`)).textContent()) ?? '').trim();
    await page.locator(`li:not([data-slug*='bundle']) a[href*="?add-to-cart="]`).or(page.locator(`form.cart .single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).or(page.locator(`#masthead div > ul > li > a.cart-contents`)).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = `2`;
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (vars.logged !== 'yes') {
      await calculateShipping(page, vars);
    }
    try {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    vars.taxPrice = ((await page.locator(`tr.order-total > td > small > span`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 06 - AU - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
  });

  test('07 - AU - Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 06 - AU - Cart Page
    // ↓ 05 - AU - Simple Product Shop Page
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
    // ↑ end 05 - AU - Simple Product Shop Page
    vars.prod_desc = ((await page.locator(`ul.wc-block-grid__products > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`li:nth-of-type(1) > .price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    await page.locator(`a[href*="?add-to-cart="]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = `2`;
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    try {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    vars.taxPriceSmall = ((await page.locator(`tr.order-total > td > small > span`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    // ↑ end 06 - AU - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.blockUI`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`.blockUI`)).toHaveCount(0);
    } catch { /* optional step: assertElementNotPresent */ }
  });

  test('09 - AU - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    vars.name = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let email = `${vars.username}`
email = email.replace('+','').replace('@saucal.com','').toLowerCase()
return email }, vars);
    await expect(page.locator(`a[href*="/my-account/"].label`).or(page.locator(`div > div > div > div.woocommerce-account-dashboard > h2`)).first()).toContainText(`Hello, ${vars.name ?? ''}!`);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-message.woocommerce-message--info.woocommerce-Message.woocommerce-Message--info.woocommerce-info`).or(page.locator(`div.woocommerce-info`)).or(page.locator(`div.wc-block-components-notice-banner__content`)).first()).toContainText(`No order has been made yet.`);
    await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce_account_subscriptions > p`).first()).toContainText(`You have no active subscriptions.`);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.u-columns.woocommerce-Addresses.col2-set.addresses`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > div > div > a.button`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#post-8 > div > div > div > form`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(1500);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`)).filter({ visible: true }).first().click({ force: true });
  });

  test('10 - AU - Subscription test - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`ul > li.menu-item.menu-item-type-post_type.menu-item-object-page a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
    (document.readyState) || reject("Can't resolve document readystate");
    let listener;
    (/^c/).test(document.readyState) ? resolve(true) : document.addEventListener("load", listener = event => {
      document.removeEventListener("load", listener);
      resolve(true);
    });
}) }, vars);
    vars.email = `qa+gi_subs_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.username = `${vars.email ?? ''}`;
    await page.locator(`a[href*="?add-to-cart=1270"]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a.cart-contents`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`h1.entry-title > em`).first()).toContainText(`Cart`);
    vars.qty = `2`;
    try { await page.locator(`input[aria-label="Product quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[aria-label="Product quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`.subscription-price > .subscription-details`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await page.reload();
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Calculate shipping")]`).or(page.locator(`a[href="#"]`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-calc_shipping_country-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-calc_shipping_country-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Australia")]`).filter({ visible: true }).first().click({ force: true });
    try {
      {
        const _lbl = page.locator(`label[for="select2-calc_shipping_state-container"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#select2-calc_shipping_state-container`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    try {
      await page.locator(`xpath=//li[contains(text(), "Queensland")]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try { await page.locator(`#calc_shipping_city`).first().fill(`Nobby`); } catch { await page.locator(`#calc_shipping_city`).first().selectOption(`Nobby`); }
    try { await page.locator(`#calc_shipping_postcode`).first().fill(`4360`); } catch { await page.locator(`#calc_shipping_postcode`).first().selectOption(`4360`); }
    await page.locator(`button[name="calc_shipping"]`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await page.locator(`xpath=//label[contains(text(), "Regular")]`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`td.product-name`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`td.product-price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    vars.subProdPrice = ((await page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.signUpFee = ((await page.locator(`.subscription-details > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.discount = ((await page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`tr.order-total:not(.recurring-total) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.smallTaxPrice = ((await page.locator(`tr.order-total:not(.recurring-total) > td > small.includes_tax > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.recurringSubtotal = ((await page.locator(`tr.cart-subtotal.recurring-total > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.recurringTotal = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.recurringSmallTax = ((await page.locator(`tr.order-total.recurring-total > td > small.includes_tax > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subProdPrice = parseFloat(`${vars.subProdPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const signUpFee = parseFloat(`${vars.signUpFee}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const recurringSubtotal = parseFloat(`${vars.recurringSubtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const recurringTotal = parseFloat(`${vars.recurringTotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

const qty = vars.qty;
let subProdPrice2 = price * qty
let subtotal2 = subProdPrice2 + ( signUpFee * 2 )
let total2 = subtotal2

return subProdPrice === subProdPrice2 
        && subtotal2 === subtotal 
        && total2 === total
        && subProdPrice2 === recurringSubtotal
        && subProdPrice2 === recurringTotal }, vars)).toBeTruthy();
  });

  test('10 - AU - Subscription test - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
    (document.readyState) || reject("Can't resolve document readystate");
    let listener;
    (/^c/).test(document.readyState) ? resolve(true) : document.addEventListener("load", listener = event => {
      document.removeEventListener("load", listener);
      resolve(true);
    });
}) }, vars);
    vars.email = `qa+gi_subs_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.username = `${vars.email ?? ''}`;
    await page.locator(`a[href="?add-to-cart=1270"]`).or(page.locator(`button[value="1270"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`h1.entry-title > em`).first()).toContainText(`Cart`);
    vars.qty = `2`;
    try { await page.locator(`input[aria-label="Product quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[aria-label="Product quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`.subscription-price > .subscription-details`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Calculate shipping")]`).or(page.locator(`a[href="#"]`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-calc_shipping_country-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-calc_shipping_country-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Australia")]`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-calc_shipping_state-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-calc_shipping_state-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Queensland")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#calc_shipping_city`).first().fill(`Nobby`); } catch { await page.locator(`#calc_shipping_city`).first().selectOption(`Nobby`); }
    try { await page.locator(`#calc_shipping_postcode`).first().fill(`4360`); } catch { await page.locator(`#calc_shipping_postcode`).first().selectOption(`4360`); }
    await page.locator(`button[name="calc_shipping"]`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await page.locator(`xpath=//label[contains(text(), "Regular")]`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`td.product-name`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`td.product-price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    vars.subProdPrice = ((await page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.signUpFee = ((await page.locator(`.subscription-details > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.discount = ((await page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.smallTaxPrice = ((await page.locator(`tr.order-total:nth-of-type(4) > td > small.includes_tax > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.recurringSubtotal = ((await page.locator(`tr.cart-subtotal:nth-of-type(6) > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.recurringTotal = ((await page.locator(`tr.order-total:nth-of-type(8) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.recurringSmallTax = ((await page.locator(`tr.order-total:nth-of-type(8) > td > small.includes_tax > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subProdPrice = parseFloat(`${vars.subProdPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const signUpFee = parseFloat(`${vars.signUpFee}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const recurringSubtotal = parseFloat(`${vars.recurringSubtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const recurringTotal = parseFloat(`${vars.recurringTotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

const qty = vars.qty;
let subProdPrice2 = price * qty
let subtotal2 = subProdPrice2 + signUpFee
let total2 = subtotal2

return subProdPrice === subProdPrice2 
        && subtotal2 === subtotal 
        && total2 === total
        && subProdPrice2 === recurringSubtotal
        && subProdPrice2 === recurringTotal }, vars)).toBeTruthy();
  });

  test('11 - AU - "Forgot password?" flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-form.woocommerce-form-login.login`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/wp-login.php?action=lostpassword"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`.woocommerce-Button.button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#post-8 > div > div > div.woocommerce-message`).or(page.locator(`#post-8> div > div > div.wc-block-components-notice-banner`)).or(page.locator(`div.wc-block-components-notice-banner > div.wc-block-components-notice-banner__content`)).first()).toHaveText(`PASSWORD RESET EMAIL HAS BEEN SENT.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Reset your Password")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button.woocommerce-Button.button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-message`).or(page.locator(`div > div > div.wc-block-components-notice-banner`)).or(page.locator(`div.wc-block-components-notice-banner > div.wc-block-components-notice-banner__content`)).first()).toHaveText(`YOUR PASSWORD HAS BEEN RESET SUCCESSFULLY.`);
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

  test('12 - AU - FAQ Accordion', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page > a[href*="/faq/"]`).or(page.locator(`ul > li.menu-item.menu-item-type-post_type.menu-item-object-page > a[href*="/faq/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`FREQUENTLY ASKED QUESTIONS`);
    await page.locator(`div:nth-of-type(1) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(1) > div:nth-of-type(2) > p`).first()).toBeVisible();
    await page.locator(`div:nth-of-type(1) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(1) > div:nth-of-type(2) > p`).first()).not.toBeVisible();
    await page.locator(`div:nth-of-type(7) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > div`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(7) > div:nth-of-type(2) > p`).first()).toBeVisible();
    await expect(page.locator(`iframe[src*="https://www.youtube.com/embed/vR-3tEP_o18"]`).first().contentFrame().locator(`#movie_player > div.ytp-cued-thumbnail-overlay > div`).or(page.locator(`div.rll-youtube-player > div[data-id='vR-3tEP_o18'] > button`))).not.toHaveCount(0);
    await page.locator(`div:nth-of-type(7) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(7) > div:nth-of-type(2) > p`).first()).not.toBeVisible();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const ele = document.querySelector("div.wp-block-nopong-limited-accordion-item > div > svg");
let el = ele.getBoundingClientRect();
return(el.width == 16); }, vars)).toBeTruthy();
  });

  test('12 - AU - FAQ Accordion', async ({ page }) => {
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
    await expect(page.locator(`div[data-id="LFtTHbat4l4"].rll-youtube-player > div > button`).first()).toBeVisible();
    await page.locator(`div:nth-of-type(7) > .header.has-icon-align-left.has-background.has-brand-pink-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(7) > div:nth-of-type(2) > p`).first()).not.toBeVisible();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const ele = document.querySelector("div.wp-block-nopong-limited-accordion-item > div > svg");
let el = ele.getBoundingClientRect();
return(el.width == 16); }, vars)).toBeTruthy();
  });

  test('13 - AU - In the news', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#menu-item-3129812 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`).first()).toBeVisible();
    await expect(page.locator(`.entry-content`).first()).toBeVisible();
  });

  test('13 - AU - In the news', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#menu-item-3129812 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`).first()).toBeVisible();
    await expect(page.locator(`.entry-content`).first()).toBeVisible();
  });

  test('14 - AU - WP Store Locator', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/stockists/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title > em`).first()).toContainText(`Stockists`);
    await expect(page.locator(`#h-we-love-to-support-small-businesses-after-all-we-re-one-of-them-nbsp-buying-from-one-of-our-stockists-is-a-convenient-way-to-support-local-business-if-there-s-one-near-you`).or(page.locator(`h5.wp-block-heading`)).first()).toContainText(`We love to support small businesses, after all, we’re one of them!  Buying from one of our stockists is a convenient way to support local business if there’s one near you.`);
    vars.store = ((await page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).textContent()) ?? '').trim();
    await page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/stockist/"]`).first()).toHaveText(`${vars.store ?? ''}`);
    await page.locator(`div > img`).filter({ visible: true }).first().click({ force: true });
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
    try { await page.locator(`#wpsl-search-input`).first().fill(`alice`); } catch { await page.locator(`#wpsl-search-input`).first().selectOption(`alice`); }
    await page.locator(`div.pac-item:nth-of-type(1) > .pac-item-query`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="wpsl-search-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-btn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).first()).toHaveText(`GO VITA ALICE SPRINGS`);
    await expect(page.locator(`li:nth-of-type(2) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).first()).toHaveText(`Complete Balance`);
    try {
      await expect(page.locator(`div[aria-label="Map"] > div:nth-of-type(2)`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    await page.locator(`xpath=//a[contains(text(), "Complete Balance")]`).or(page.locator(`li:nth-of-type(2) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/stockist/megans-beauty/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`COMPLETE BALANCE`);
    vars.url = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href;
return url; }, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const expect = `${vars.startUrl}stockist/megans-beauty/`;
const actual = `${vars.url}`;

return actual == expect; }, vars)).toBeTruthy();
  });

  test('14 - AU - WP Store Locator', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/stockists/"] > em`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title > em`).first()).toContainText(`Stockists`);
    await expect(page.locator(`#h-we-love-to-support-small-businesses-after-all-we-re-one-of-them-buying-from-one-of-our-stockists-is-a-convenient-way-to-support-local-business-if-there-s-one-near-you`).first()).toContainText(`We love to support small businesses, after all, we’re one of them!  Buying from one of our stockists is a convenient way to support local business if there’s one near you.`);
    vars.store = ((await page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).textContent()) ?? '').trim();
    await page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/stockist/"]`).first()).toHaveText(`${vars.store ?? ''}`);
    await page.locator(`div > img`).filter({ visible: true }).first().click({ force: true });
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
    try { await page.locator(`#wpsl-search-input`).first().fill(`alice`); } catch { await page.locator(`#wpsl-search-input`).first().selectOption(`alice`); }
    await page.locator(`div.pac-item:nth-of-type(1) > .pac-item-query`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="wpsl-search-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpsl-search-btn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`li:nth-of-type(1) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).first()).toHaveText(`GO VITA ALICE SPRINGS`);
    await expect(page.locator(`li:nth-of-type(2) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`).first()).toHaveText(`Complete Balance`);
    try {
      await expect(page.locator(`div[aria-label="Map"] > div:nth-of-type(2)`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    await page.locator(`xpath=//a[contains(text(), "Complete Balance")]`).or(page.locator(`li:nth-of-type(2) > .wpsl-store-location > p:nth-of-type(1) > strong > a.wpsl-store-details`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/stockist/megans-beauty/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`COMPLETE BALANCE`);
    vars.url = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href;
return url; }, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const expect = "https://no-pong-au-develop.go-vip.net/stockist/megans-beauty/";
const actual = `${vars.url}`;

return actual == expect; }, vars)).toBeTruthy();
  });

  test('15 - AU - Tin Limit', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}products/`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="?add-to-cart=616"]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`17`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`17`); }
    await page.locator(`td.actions`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`div.woocommerce-notices-wrapper > div.wc-block-components-notice-banner.is-error > div.wc-block-components-notice-banner__content`)).first()).toHaveText(`WHOOPS-A-DAISY! IT LOOKS LIKE YOU'VE ADDED TOO MANY ITEMS AND WE'VE HAD TO REMOVE SOME.`);
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`div.woocommerce-notices-wrapper > div.wc-block-components-notice-banner.is-success > div.wc-block-components-notice-banner__content`)).first()).toHaveText(`CART UPDATED.`);
    await expect(page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first()).toContainText(`12`);
  });

  test('15 - AU - Tin Limit', async ({ page }) => {
    await page.goto(`/products/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="?add-to-cart=616"]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`17`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`17`); }
    await page.locator(`td.actions`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`div.woocommerce-notices-wrapper > div.wc-block-components-notice-banner.is-error > div.wc-block-components-notice-banner__content`)).first()).toHaveText(`WHOOPS-A-DAISY! IT LOOKS LIKE YOU'VE ADDED TOO MANY ITEMS TO YOUR CART AND WE HAD TO REMOVE SOME ITEMS.`);
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`div.woocommerce-notices-wrapper > div.wc-block-components-notice-banner.is-success > div.wc-block-components-notice-banner__content`)).first()).toHaveText(`CART UPDATED.`);
    await expect(page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first()).toContainText(`12`);
  });

  test('16 - AU - 85g Limit', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`ul > li.menu-item.menu-item-type-post_type.menu-item-object-page > a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="?add-to-cart=616"]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`11`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`11`); }
    await page.locator(`.coupon`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first()).toHaveText(`11`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$76.45`);
    await page.locator(`ul > li.menu-item.menu-item-type-post_type.menu-item-object-page > a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="?add-to-cart=1684403"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`div.wc-block-components-notice-banner.is-error > div.wc-block-components-notice-banner__content`)).first()).toContainText(`WHOOPS-A-DAISY! IT LOOKS LIKE YOU'VE ADDED TOO MANY ITEMS AND WE'VE HAD TO REMOVE SOME.`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`xpath=//input[@value='5']`).first()).toHaveText(`5`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$34.75`);
  });

  test('16 - AU - 85g Limit', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="?add-to-cart=616"]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`11`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`11`); }
    await page.locator(`.coupon`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first()).toHaveText(`11`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$76.45`);
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`xpath=//a[contains(text(), "CHECK THEM OUT HERE!")]`).or(page.locator(`a[href*="/limited-edition/"]`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`a[href="?add-to-cart=1684403"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`div.wc-block-components-notice-banner.is-error > div.wc-block-components-notice-banner__content`)).first()).toContainText(`WHOOPS-A-DAISY! IT LOOKS LIKE YOU'VE ADDED TOO MANY ITEMS AND WE'VE HAD TO REMOVE SOME.`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`xpath=//input[@value='5']`).first()).toHaveText(`5`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$34.75`);
  });

  test('19 - AU - Subscription popup verification', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`ul > li.menu-item.menu-item-type-post_type.menu-item-object-page > a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`#h-choose-your-monthly-club-here`).first()).toHaveText(`CHOOSE YOUR MONTHLY CLUB HERE`);
    await expect(page.locator(`a[href*="?add-to-cart=704019"]`).first()).toHaveText(`Join the Club`);
    await page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(3)`).or(page.locator(`a[href*="?add-to-cart=704019"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).not.toBeVisible();
    }
  });

  test('19 - AU - Subscription popup verification', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(5) > a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`#h-choose-your-monthly-club-here`).first()).toHaveText(`CHOOSE YOUR MONTHLY CLUB HERE`);
    await expect(page.locator(`a[href="?add-to-cart=704019"]`).first()).toHaveText(`Join the Club`);
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

  test('20 - AU - Menu Toggle', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.label`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.popup-content`).first()).toBeVisible();
    await page.screenshot({ fullPage: true });
    await expect(page.locator(`ul.sites > li.current > a > span.country`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  });

});
