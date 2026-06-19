// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "LIVE - Scout Books - Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal } from '../helpers/common-steps-for-all-projects';

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

test.describe('LIVE - Scout Books - Tests', () => {

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

});
