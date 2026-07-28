// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Flying Tech - Basic Tests - Guest"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { register } from '../helpers/common-step';
import { blockImageSizes, extractUserFromEmail, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';

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

test.describe('Flying Tech - Basic Tests - Guest', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "flyingTech",
    "Symbol": "£",
    "site": "https://khrff7b2hz-staging.onrocket.site/",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await uRLOfCurrentPage(page, vars);
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
  });

  test('02 - Shop', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`[id="menu-main-navigation"] a[href*="/shop/"].woodmart-nav-link > .nav-link-text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title.title`).first()).toContainText(`Shop`);
  });

  test('03 - New Products', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-main-navigation a[href*="/new-products/"].woodmart-nav-link > .nav-link-text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title.title`).first()).toContainText(`New Products`);
  });

  test('04 - Brand page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`header li.menu-item.menu-item-type-custom.menu-item-object-custom.item-level-0.menu-mega-dropdown.menu-item-has-children.dropdown-load-ajax:nth-of-type(6) > a[href="#"].woodmart-nav-link > .nav-link-text`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`header li.menu-item.menu-item-type-custom.menu-item-object-custom.item-level-0.menu-mega-dropdown.menu-item-has-children.dropdown-load-ajax:nth-of-type(6) > a[href="#"].woodmart-nav-link > .nav-link-text`).first().hover();
    await page.locator(`div.whb-column:nth-of-type(2) > [aria-label="Main navigation"].wd-header-nav.wd-header-main-nav.text-left.wd-design-1 > [id="menu-main-navigation"].menu.wd-nav.wd-nav-main.wd-style-default.wd-gap-s.dropdowns-loaded.wd-offsets-calculated > li.menu-item.menu-item-type-custom.menu-item-object-custom.item-level-0.menu-mega-dropdown.menu-item-has-children.dropdown-load-ajax:nth-of-type(6) > .wd-dropdown-menu.wd-dropdown.wd-design-full-width.color-scheme-dark > .container.wd-entry-content > .wpb-content-wrapper > .vc_row.wpb_row > .wpb_column.vc_column_container > .vc_column-inner > .wpb_wrapper > .wd-brands.brands-widget.wd-style-bordered.text-center > div > div.wd-col:nth-of-type(4) > .wd-brand-item.brand-item > a[href*="/brand/atomrc/"][title="ATOMRC"].wd-fill`).or(page.locator(`a[href*="/brand/atomrc/"][title="ATOMRC"].wd-fill`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title.title`).first()).toContainText(`ATOMRC`);
    await blockImageSizes(page, vars);
  });

  test('05 - Sales page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`header a[href*="/sale-products/"].woodmart-nav-link > .nav-link-text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title.title`).first()).toContainText(`Sale Products`);
    await blockImageSizes(page, vars);
  });

  test('06 - Blogs page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}blog/`);
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title.title`).first()).toContainText(`Blog`);
  });

  test('07 - Submit Contact form', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}contact/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//span[contains(text(), "CONTACT US")]`).or(page.locator(`a[href="/contact"] > .nav-link-text`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "WRITE US A MESSAGE")]`).or(page.locator(`a[href="#contact-form-popup"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="your-name"]`).first().fill(`QA`); } catch { await page.locator(`input[name="your-name"]`).first().selectOption(`QA`); }
    try { await page.locator(`input[name="your-email"]`).first().fill(`qa+gi_${vars.alphanumeric ?? ''}@saucal.com`); } catch { await page.locator(`input[name="your-email"]`).first().selectOption(`qa+gi_${vars.alphanumeric ?? ''}@saucal.com`); }
    try { await page.locator(`input[name="phone"]`).first().fill(`1231231234`); } catch { await page.locator(`input[name="phone"]`).first().selectOption(`1231231234`); }
    try { await page.locator(`input[name="order-no"]`).first().fill(`1234`); } catch { await page.locator(`input[name="order-no"]`).first().selectOption(`1234`); }
    try { await page.locator(`textarea[name="your-message"]`).first().fill(`Testing the message`); } catch { await page.locator(`textarea[name="your-message"]`).first().selectOption(`Testing the message`); }
    try { await page.locator(`input[type="text"].wpcf7-form-control.wpcf7-quiz`).first().fill(`8`); } catch { await page.locator(`input[type="text"].wpcf7-form-control.wpcf7-quiz`).first().selectOption(`8`); }
    await page.locator(`input[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wpcf7-response-output`).first()).toContainText(`Thank you for your message. It has been sent.`);
  });

  test('08 - FAQ Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/faqs"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="#1521971623927-0f59ec23-2f56"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div[id='1521971623927-0f59ec23-2f56'] .vc_tta-panel-body`).first()).toBeVisible();
    await page.locator(`a[href="#1521971623927-0f59ec23-2f56"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div[id='1521971623927-0f59ec23-2f56'] .vc_tta-panel-body`).first()).not.toBeVisible();
    await page.locator(`a[href="#1521971623927-0f59ec23-2f56"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="#1520801425233-a47a581c-1dd2"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div[id='1520801425233-a47a581c-1dd2'] .vc_tta-panel-body`).first()).toBeVisible();
    await page.locator(`xpath=//span[contains(text(), "How do I initiate a return or exchange?")]`).or(page.locator(`a[href="#1520801044816-d8488493-3be3"] > .vc_tta-title-text`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div[id='1520801044816-d8488493-3be3'] .vc_tta-panel-body`).first()).toBeVisible();
    await page.locator(`xpath=//span[contains(text(), "Do I need to pay for return shipping?")]`).or(page.locator(`a[href="#1520801044852-56acc31a-df41"] > .vc_tta-title-text`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div[id='1520801044852-56acc31a-df41'] .vc_tta-panel-body`).first()).toBeVisible();
  });

  test('09 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.wd-sticky-nav-title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.item-level-0.menu-simple-dropdown > a[href*="/product-category/pre-built-drones-kits/"].woodmart-nav-link`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop`).first().hover();
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.product_title.entry-title.wd-entities-title`)).not.toHaveCount(0);
  });

  test('10 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.wd-sticky-nav-title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.item-level-0.menu-simple-dropdown > a[href*="/product-category/pre-built-drones-kits/"].woodmart-nav-link`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop`).first().hover();
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.variable = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let version = document.querySelector('#version')
return !version === false
 }, vars);
    if (vars.variable) {
      {
        const _lbl = page.locator(`label[for="version"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#version`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.variable) {
      vars.version = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select the form element
const form = document.querySelector('.variations_form');

// Get the data-product_variations attribute
const variationsData = form.getAttribute('data-product_variations');

// Parse the JSON string into a JavaScript object
const variations = JSON.parse(variationsData);

// Filter the available variations
const availableVariations = variations.filter(variation => variation.is_in_stock && variation.variation_is_active);

return availableVariations[0].attributes.attribute_version
 }, vars);
    }
    if (vars.variable) {
      try { await page.locator(`#version`).first().fill(`${vars.version ?? ''}`); } catch { await page.locator(`#version`).first().selectOption(`${vars.version ?? ''}`); }
    }
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary.entry-summary > div > p.price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary.entry-summary > div > p.price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prodDesc}`.replaceAll('–','-')
return prodDesc }, vars);
    if (vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''}`);
    }
    if (false === vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`xpath=//a[contains(text(), "View basket")]`).or(page.locator(`a[href*="/cart/"]`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "View basket")]`).or(page.locator(`a[href*="/cart/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.shippingPrice = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`li:nth-of-type(1) > label`)).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let shippingPrice = `${vars.shippingPrice}`

if (shippingPrice.includes('FREE')) {
    shippingPrice = '0.00'
}

shippingPrice = parseFloat(shippingPrice.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

let total2 = subtotal + shippingPrice

return price === subtotal 
        && total2 === total }, vars)).toBeTruthy();
  });

  test('11 - Checkout page - Step 1', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 10 - Cart page
    await page.locator(`.wd-sticky-nav-title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.item-level-0.menu-simple-dropdown > a[href*="/product-category/pre-built-drones-kits/"].woodmart-nav-link`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop`).first().hover();
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.variable = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let version = document.querySelector('#version')
return !version === false
 }, vars);
    if (vars.variable) {
      {
        const _lbl = page.locator(`label[for="version"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#version`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.variable) {
      vars.version = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select the form element
const form = document.querySelector('.variations_form');

// Get the data-product_variations attribute
const variationsData = form.getAttribute('data-product_variations');

// Parse the JSON string into a JavaScript object
const variations = JSON.parse(variationsData);

// Filter the available variations
const availableVariations = variations.filter(variation => variation.is_in_stock && variation.variation_is_active);

return availableVariations[0].attributes.attribute_version
 }, vars);
    }
    if (vars.variable) {
      try { await page.locator(`#version`).first().fill(`${vars.version ?? ''}`); } catch { await page.locator(`#version`).first().selectOption(`${vars.version ?? ''}`); }
    }
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary.entry-summary > div > p.price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary.entry-summary > div > p.price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prodDesc}`.replaceAll('–','-')
return prodDesc }, vars);
    if (vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''}`);
    }
    if (false === vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`xpath=//a[contains(text(), "View basket")]`).or(page.locator(`a[href*="/cart/"]`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "View basket")]`).or(page.locator(`a[href*="/cart/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.shippingPrice = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`li:nth-of-type(1) > label`)).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let shippingPrice = `${vars.shippingPrice}`

if (shippingPrice.includes('FREE')) {
    shippingPrice = '0.00'
}

shippingPrice = parseFloat(shippingPrice.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

let total2 = subtotal + shippingPrice

return price === subtotal 
        && total2 === total }, vars)).toBeTruthy();
    // ↑ end 10 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('11 - Checkout page - Step 2', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 11 - Checkout page - Step 1
    // ↓ 10 - Cart page
    await page.locator(`.wd-sticky-nav-title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.item-level-0.menu-simple-dropdown > a[href*="/product-category/pre-built-drones-kits/"].woodmart-nav-link`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop`).first().hover();
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.variable = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let version = document.querySelector('#version')
return !version === false
 }, vars);
    if (vars.variable) {
      {
        const _lbl = page.locator(`label[for="version"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#version`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.variable) {
      vars.version = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select the form element
const form = document.querySelector('.variations_form');

// Get the data-product_variations attribute
const variationsData = form.getAttribute('data-product_variations');

// Parse the JSON string into a JavaScript object
const variations = JSON.parse(variationsData);

// Filter the available variations
const availableVariations = variations.filter(variation => variation.is_in_stock && variation.variation_is_active);

return availableVariations[0].attributes.attribute_version
 }, vars);
    }
    if (vars.variable) {
      try { await page.locator(`#version`).first().fill(`${vars.version ?? ''}`); } catch { await page.locator(`#version`).first().selectOption(`${vars.version ?? ''}`); }
    }
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary.entry-summary > div > p.price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary.entry-summary > div > p.price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prodDesc}`.replaceAll('–','-')
return prodDesc }, vars);
    if (vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''}`);
    }
    if (false === vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`xpath=//a[contains(text(), "View basket")]`).or(page.locator(`a[href*="/cart/"]`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "View basket")]`).or(page.locator(`a[href*="/cart/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.shippingPrice = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`li:nth-of-type(1) > label`)).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let shippingPrice = `${vars.shippingPrice}`

if (shippingPrice.includes('FREE')) {
    shippingPrice = '0.00'
}

shippingPrice = parseFloat(shippingPrice.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

let total2 = subtotal + shippingPrice

return price === subtotal 
        && total2 === total }, vars)).toBeTruthy();
    // ↑ end 10 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 11 - Checkout page - Step 1
    await page.locator(`xpath=//span[contains(text(), "Step 2. Check Order (Click Here)")]`).or(page.locator(`a[href="#1711561135041-fd073c70-bca1"] > .vc_tta-title-text`)).filter({ visible: true }).first().click({ force: true });
  });

  test('11 - Checkout page - Step 3', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 11 - Checkout page - Step 1
    // ↓ 10 - Cart page
    await page.locator(`.wd-sticky-nav-title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.item-level-0.menu-simple-dropdown > a[href*="/product-category/pre-built-drones-kits/"].woodmart-nav-link`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop`).first().hover();
    await page.locator(`div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.variable = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let version = document.querySelector('#version')
return !version === false
 }, vars);
    if (vars.variable) {
      {
        const _lbl = page.locator(`label[for="version"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#version`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.variable) {
      vars.version = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select the form element
const form = document.querySelector('.variations_form');

// Get the data-product_variations attribute
const variationsData = form.getAttribute('data-product_variations');

// Parse the JSON string into a JavaScript object
const variations = JSON.parse(variationsData);

// Filter the available variations
const availableVariations = variations.filter(variation => variation.is_in_stock && variation.variation_is_active);

return availableVariations[0].attributes.attribute_version
 }, vars);
    }
    if (vars.variable) {
      try { await page.locator(`#version`).first().fill(`${vars.version ?? ''}`); } catch { await page.locator(`#version`).first().selectOption(`${vars.version ?? ''}`); }
    }
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary.entry-summary > div > p.price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary.entry-summary > div > p.price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prodDesc}`.replaceAll('–','-')
return prodDesc }, vars);
    if (vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''}`);
    }
    if (false === vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`xpath=//a[contains(text(), "View basket")]`).or(page.locator(`a[href*="/cart/"]`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "View basket")]`).or(page.locator(`a[href*="/cart/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.shippingPrice = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`li:nth-of-type(1) > label`)).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let shippingPrice = `${vars.shippingPrice}`

if (shippingPrice.includes('FREE')) {
    shippingPrice = '0.00'
}

shippingPrice = parseFloat(shippingPrice.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

let total2 = subtotal + shippingPrice

return price === subtotal 
        && total2 === total }, vars)).toBeTruthy();
    // ↑ end 10 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 11 - Checkout page - Step 1
    await page.locator(`xpath=//span[contains(text(), "Step 3. Payment (Click Here)")]`).or(page.locator(`a[href="#1711561261565-26c82784-a5ba"] > .vc_tta-title-text`)).filter({ visible: true }).first().click({ force: true });
  });

  test('12 - Resgiter - Logout - Login - My Account menus', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    await page.locator(`header > div > div.whb-row.whb-general-header.whb-not-sticky-row.whb-without-bg.whb-border-fullwidth.whb-color-dark.whb-flex-flex-middle > div > div > div > div.wd-header-my-account > a[href*="/my-account/"][title="My account"] > .wd-tools-text`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.wd-switch-to-register`).filter({ visible: true }).first().click({ force: true });
    await register(page, vars);
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#username`).first().fill(`${vars.emailReg ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.emailReg ?? ''}`); }
    try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--orders > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No order has been made yet.`);
    await page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--downloads > a[href*="/my-account/downloads/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No downloads available yet.`);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--edit-address > a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-columns.woocommerce-Addresses.col2-set.addresses`).first()).toBeVisible();
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--payment-methods > a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--edit-account > a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`).first()).toBeVisible();
    await page.locator(`xpath=//a[contains(text(), "Waitlist")]`).or(page.locator(`nav.woocommerce-MyAccount-navigation > ul > li.woocommerce-MyAccount-navigation-link:nth-of-type(7) > a[href*="/my-account/waiting-list/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wd-empty-wtl`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Wishlist")]`).or(page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--wishlist > a[href*="/wishlist/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wd-empty-wishlist`)).not.toHaveCount(0);
    await page.locator(`div.wd-my-account-sidebar li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--my-tech-tokens > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.ywpar_summary_badge`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('13 - Forgot Password flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    await page.locator(`header > div > div.whb-row.whb-general-header.whb-not-sticky-row.whb-without-bg.whb-border-fullwidth.whb-color-dark.whb-flex-flex-middle > div > div > div > div.wd-header-my-account > a[href*="/my-account/"][title="My account"] > .wd-tools-text`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Create an Account")]`).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.wd-switch-to-register`).filter({ visible: true }).first().click({ force: true });
    await register(page, vars);
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/my-account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Reset your password for Flying Tech")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Reset your password")]`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="password_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="password_2"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password_2`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    try {
      try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
    } catch { /* optional step: assign */ }
    try {
      try { await page.locator(`#password`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password2 ?? ''}`); }
    } catch { /* optional step: assign */ }
    try {
      await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
  });

});
