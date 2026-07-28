// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "STAGING - Scout Books - Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, extractUserFromEmail, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { login, register } from '../helpers/scout-books-common-steps-for-suites';

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

test.describe('STAGING - Scout Books - Tests', () => {

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
    "street": "123 False Street",
    "street3": "123 False Shipping",
    "city": "Miami",
    "zipCode": "33126",
    "phone": "6135465467",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Ship`,
    "project": "scout",
    "countryComplete": "United States (US)",
    "state": "FL",
    "stateComplete": "Florida",
    "Symbol": "$",
    "currency": "USD",
    "company": "Testing Inc.",
    "street2": "Ap 4.",
    "street4": "Ap. Shipp",
    "company2": "Shipp Inc.",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
  });

  test('02 - Shop Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#nav-menu-item-2363 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
  });

  test('03 - Product Page - Custom', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#nav-menu-item-1128 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
  });

  test('03 - Product Page - DIY', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#nav-menu-item-1229 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
  });

  test('04 - Blog page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#nav-menu-item-61 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // fetch all elements
const elems = Array.from<any>(document.querySelectorAll("body *"));
// loop through elements and set static dimensions
elems.forEach((elem) => {
    const style = window.getComputedStyle(elem);
    elem.style.setProperty("height", style.height, "important");
    elem.style.setProperty("max-height", style.height, "important");
    elem.style.setProperty("min-height", "0", "important");
    elem.style.setProperty("padding-top", style.paddingTop, "important");
    elem.style.setProperty("padding-bottom", style.paddingBottom, "important");
    elem.style.setProperty("margin-top", style.marginTop, "important");
    elem.style.setProperty("margin-bottom", style.marginBottom, "important");
}) }, vars);
  });

  test('05 - Post page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Blog page
    await page.waitForLoadState('load');
    await page.locator(`#nav-menu-item-61 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // fetch all elements
const elems = Array.from<any>(document.querySelectorAll("body *"));
// loop through elements and set static dimensions
elems.forEach((elem) => {
    const style = window.getComputedStyle(elem);
    elem.style.setProperty("height", style.height, "important");
    elem.style.setProperty("max-height", style.height, "important");
    elem.style.setProperty("min-height", "0", "important");
    elem.style.setProperty("padding-top", style.paddingTop, "important");
    elem.style.setProperty("padding-bottom", style.paddingBottom, "important");
    elem.style.setProperty("margin-top", style.marginTop, "important");
    elem.style.setProperty("margin-bottom", style.marginBottom, "important");
}) }, vars);
    // ↑ end 04 - Blog page
    await page.locator(`article > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('06 - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 03 - Product Page - Custom
    await page.waitForLoadState('load');
    await page.locator(`#nav-menu-item-1128 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 03 - Product Page - Custom
    vars.prod_desc = ((await page.locator(`h1.product_title.entry-title`).textContent()) ?? '').trim();
    vars.pages = `500`;
    vars.color = `Red`;
    vars.style = `Lined`;
    vars.staples = `Gold`;
    vars.time = `15 Days`;
    await page.locator(`img.round.radio-image[alt="${vars.pages ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.color ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.no`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.style ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.staples ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.time ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`.price.amount > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name > a[href*="/shop/custom-pocket-scout-books/?attribute_pa_quantity=500"]:nth-of-type(1)`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await page.locator(`input[type="button"].plus`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="update_cart"]`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    vars.qty = ((await page.locator(`td.product-quantity > div > input.input-text.qty.text`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  });

  test('07 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 06 - Cart Page
    // ↓ 03 - Product Page - Custom
    await page.waitForLoadState('load');
    await page.locator(`#nav-menu-item-1128 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 03 - Product Page - Custom
    vars.prod_desc = ((await page.locator(`h1.product_title.entry-title`).textContent()) ?? '').trim();
    vars.pages = `500`;
    vars.color = `Red`;
    vars.style = `Lined`;
    vars.staples = `Gold`;
    vars.time = `15 Days`;
    await page.locator(`img.round.radio-image[alt="${vars.pages ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.color ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.no`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.style ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.staples ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.time ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`.price.amount > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name > a[href*="/shop/custom-pocket-scout-books/?attribute_pa_quantity=500"]:nth-of-type(1)`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await page.locator(`input[type="button"].plus`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="update_cart"]`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    vars.qty = ((await page.locator(`td.product-quantity > div > input.input-text.qty.text`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    // ↑ end 06 - Cart Page
    await page.locator(`a[href*="/checkout/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1 > span`).first()).toContainText(`Checkout`);
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.pages ?? ''}  × ${vars.qty ?? ''}`);
    vars.name = ((await page.locator(`td.product-name`).textContent()) ?? '').trim();
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  });

  test('08 - Place order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 07 - Checkout page
    // ↓ 06 - Cart Page
    // ↓ 03 - Product Page - Custom
    await page.waitForLoadState('load');
    await page.locator(`#nav-menu-item-1128 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 03 - Product Page - Custom
    vars.prod_desc = ((await page.locator(`h1.product_title.entry-title`).textContent()) ?? '').trim();
    vars.pages = `500`;
    vars.color = `Red`;
    vars.style = `Lined`;
    vars.staples = `Gold`;
    vars.time = `15 Days`;
    await page.locator(`img.round.radio-image[alt="${vars.pages ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.color ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.no`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.style ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.staples ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`img.round.radio-image[alt="${vars.time ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`.price.amount > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name > a[href*="/shop/custom-pocket-scout-books/?attribute_pa_quantity=500"]:nth-of-type(1)`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await page.locator(`input[type="button"].plus`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="update_cart"]`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    vars.qty = ((await page.locator(`td.product-quantity > div > input.input-text.qty.text`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    // ↑ end 06 - Cart Page
    await page.locator(`a[href*="/checkout/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1 > span`).first()).toContainText(`Checkout`);
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.pages ?? ''}  × ${vars.qty ?? ''}`);
    vars.name = ((await page.locator(`td.product-name`).textContent()) ?? '').trim();
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    // ↑ end 07 - Checkout page
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`CARD EXPIRATION DATE IS INVALID
BILLING FIRST NAME IS A REQUIRED FIELD.
BILLING LAST NAME IS A REQUIRED FIELD.
BILLING STREET ADDRESS IS A REQUIRED FIELD.
BILLING TOWN / CITY IS A REQUIRED FIELD.
BILLING ZIP CODE IS A REQUIRED FIELD.
BILLING PHONE IS A REQUIRED FIELD.
BILLING EMAIL ADDRESS IS A REQUIRED FIELD.
SHIPPING FIRST NAME IS A REQUIRED FIELD.
SHIPPING LAST NAME IS A REQUIRED FIELD.
SHIPPING STREET ADDRESS IS A REQUIRED FIELD.
SHIPPING TOWN / CITY IS A REQUIRED FIELD.
SHIPPING ZIP CODE IS A REQUIRED FIELD.`);
    await wooCommerceCheckoutTemplate(page, vars);
    await page.locator(`li.wc_payment_method.payment_method_cheque > label`).filter({ visible: true }).first().click({ force: true });
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await expect(page.locator(`h1 > span`).first()).toContainText(`Success!
Your order has been received.`);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`td.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.pages ?? ''}`);
    await expect(page.locator(`td.product-name > strong`).first()).toContainText(`× ${vars.qty ?? ''}`);
    await expect(page.locator(`td.product-name > ul > li:nth-of-type(1)`).first()).toHaveText(`Quantity: ${vars.pages ?? ''}`);
    await expect(page.locator(`.wc-item-meta > li:nth-of-type(2)`).first()).toContainText(`Cover Ink Color: ${vars.color ?? ''}`);
    await expect(page.locator(`.wc-item-meta > li:nth-of-type(3)`).first()).toContainText(`Page Style: ${vars.style ?? ''}`);
    await expect(page.locator(`.wc-item-meta > li:nth-of-type(4)`).first()).toContainText(`Staple Color: ${vars.staples ?? ''}`);
    await expect(page.locator(`.wc-item-meta > li:nth-of-type(5)`).first()).toContainText(`Production Time: ${vars.time ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tbody > tr:nth-of-type(1) > td`).first()).toContainText(`Order Note for Testing this field`);
    await expect(page.locator(`table.woocommerce-table > tbody > tr:nth-of-type(2) > td`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tbody > tr:nth-of-type(3) > td`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await page.locator(`li > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`On hold`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-actions > a.woocommerce-button.wp-element-button.button.view`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`td.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.pages ?? ''}`);
    await expect(page.locator(`td.product-name > strong`).first()).toContainText(`× ${vars.qty ?? ''}`);
    await expect(page.locator(`td.product-name > ul > li:nth-of-type(1)`).first()).toHaveText(`Quantity: ${vars.pages ?? ''}`);
    await expect(page.locator(`.wc-item-meta > li:nth-of-type(2)`).first()).toContainText(`Cover Ink Color: ${vars.color ?? ''}`);
    await expect(page.locator(`.wc-item-meta > li:nth-of-type(3)`).first()).toContainText(`Page Style: ${vars.style ?? ''}`);
    await expect(page.locator(`.wc-item-meta > li:nth-of-type(4)`).first()).toContainText(`Staple Color: ${vars.staples ?? ''}`);
    await expect(page.locator(`.wc-item-meta > li:nth-of-type(5)`).first()).toContainText(`Production Time: ${vars.time ?? ''}`);
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tbody > tr:nth-of-type(1) > td`).first()).toContainText(`Order Note for Testing this field`);
    await expect(page.locator(`table.woocommerce-table > tbody > tr:nth-of-type(2) > td`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`tbody > tr:nth-of-type(3) > td`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  });

  test('09 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    vars.username = `${vars.emailReg ?? ''}`;
    vars.user = `${vars.alphanumeric ?? ''}`;
    await register(page, vars);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`NO ORDER HAS BEEN MADE YET.`);
    await page.locator(`a[href*="/my-account/downloads/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Message`).first()).toContainText(`NO DOWNLOADS AVAILABLE YET.`);
    await page.locator(`a[href*="/my-account/wc-smart-coupons/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Message`).first()).toHaveText(`SORRY, NO COUPONS AVAILABLE FOR YOU.`);
    await page.locator(`a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > p`).first()).toContainText(`The following addresses will be used on the checkout page by default.`);
    await page.locator(`a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#account_display_name`).first()).toContainText(`${vars.user ?? ''}`);
    await expect(page.locator(`#account_email`).first()).toContainText(`${vars.username ?? ''}`);
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
    await page.locator(`div.mc-closeModal`).filter({ visible: true }).first().click({ force: true });
  });

  test('10 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    vars.user = `${vars.alphanumeric ?? ''}`;
    await register(page, vars);
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/my-account/lost-password/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-ResetPassword > p:nth-of-type(1)`).first()).toContainText(`Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.`);
    {
      const _lbl = page.locator(`label[for="user_login"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#user_login`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`input[type="submit"].woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`PASSWORD RESET EMAIL HAS BEEN SENT.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request for Scout Books")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password2 ?? ''}`;
    {
      const _lbl = page.locator(`label[for="password_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password_1`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.pass ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.pass ?? ''}`); }
    await page.locator(`button[type="submit"].woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    await login(page, vars);
  });

});
