// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "WeedPleez - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, extractUserFromEmail, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { login } from '../helpers/weedpleez-common-steps-for-suites';

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

test.describe('WeedPleez - Basic WooCommerce Test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "username": "qa+gi_staging_user@saucal.com",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Testing Inc.",
    "street": "123 False Street",
    "city": "Ottawa",
    "state": "ON",
    "zipCode": "K1S 3V6",
    "phone": "6135465465",
    "stateComplete": "Ontario",
    "country": "CA",
    "countryComplete": "Canada",
    "project": "weedpleez",
    "Symbol": "$",
    "currency": "CAD",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.locator(`#menu-item-861 > a > span`).first().hover();
    await page.locator(`xpath=//span[contains(text(), "Products")]`).or(page.locator(`#menu-item-24 > a[href*="/shop/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('02 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Shop page
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.locator(`#menu-item-861 > a > span`).first().hover();
    await page.locator(`xpath=//span[contains(text(), "Products")]`).or(page.locator(`#menu-item-24 > a[href*="/shop/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 01 - Shop page
    await page.locator(`a[href*="/product/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Product page
    // ↓ 01 - Shop page
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.locator(`#menu-item-861 > a > span`).first().hover();
    await page.locator(`xpath=//span[contains(text(), "Products")]`).or(page.locator(`#menu-item-24 > a[href*="/shop/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 01 - Shop page
    await page.locator(`a[href*="/product/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Product page
    try {
      await page.locator(`tr.woocommerce-grouped-product-list-item.membership-content.access-granted.product.type-product.status-publish.instock.product_cat-concentrates-cbd.product_cat-oils-cbd > td.woocommerce-grouped-product-list-item__quantity > .quantity > input[title="Qty"][placeholder="0"][type="number"].input-text.qty.text`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      try { await page.locator(`tr.woocommerce-grouped-product-list-item.membership-content.access-granted.product.type-product.status-publish.instock.product_cat-concentrates-cbd.product_cat-oils-cbd > td.woocommerce-grouped-product-list-item__quantity > .quantity > input[title="Qty"][placeholder="0"][type="number"].input-text.qty.text`).first().fill(`1`); } catch { await page.locator(`tr.woocommerce-grouped-product-list-item.membership-content.access-granted.product.type-product.status-publish.instock.product_cat-concentrates-cbd.product_cat-oils-cbd > td.woocommerce-grouped-product-list-item__quantity > .quantity > input[title="Qty"][placeholder="0"][type="number"].input-text.qty.text`).first().selectOption(`1`); }
    } catch { /* optional step: assign */ }
    try {
      await page.locator(`td.value > select`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`td.value > select > option:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      vars.unitPrice = ((await page.locator(`tbody > tr:first-child > td.woocommerce-grouped-product-list-item__price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tbody > tr:first-child > td.woocommerce-grouped-product-list-item__price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`#main .product .summary .tab-details ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`#main .product .summary .tab-details .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    try {
      if ((() => { let price = vars.unitPrice;

return price === ""; })()) {
        vars.unitPrice = ((await page.locator(`div.woocommerce-variation-price > span > ins > span.woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.woocommerce-variation-price > span > span.woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    if ((() => { let price = vars.unitPrice;

return price === ""; })()) {
      await page.locator(`div:nth-of-type(1) > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-of-type(1) > .price > span:first-child.woocommerce-Price-amount.amount > bdi`)).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/cart/"].button`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`.cart_item input.qty`).first().fill(`1`); } catch { await page.locator(`.cart_item input.qty`).first().selectOption(`1`); }
    await page.locator(`button[name="update_cart"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    try {
      vars.shippPrice = ((await page.locator(`label[for="shipping_method_0_flat_rate7"] > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`label[for="shipping_method_0_dokan_product_shipping"] > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = `${vars.unitPrice}`;
let shipping = `${vars.shippPrice}`;
let total = `${vars.total}`
price = Number(price.replace("$",""));
shipping = Number(shipping.replace("$",""));
total = Number(total.replace("$",""));

let total2 = price+shipping;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
  });

  test('04 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.goto(`https://staging.canadawholesalevape.com/cart/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - Place order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.goto(`https://staging.canadawholesalevape.com/cart/`);
    await page.waitForLoadState('load');
    vars.prod_desc = ((await page.locator(`td.product-name > a[href*="/product/"]`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.qty = ((await page.locator(`input.qty`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await placeOrderElement(page, vars);
    try {
      await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).first()).toContainText(`Billing First name is a required field.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.woocommerce-error > li:nth-of-type(2)`).first()).toContainText(`Billing Last name is a required field.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Billing Street address is a required field.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Billing Town / City is a required field.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Billing Province is a required field.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Billing Postal code is a required field.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Billing Phone is a required field.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Please read and accept the terms and conditions to proceed with your order.`);
    } catch { /* optional step: assertTextPresent */ }
    await wooCommerceCheckoutTemplate(page, vars);
    await blockUI(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.username ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await page.locator(`xpath=//span[contains(text(), "My Account")]`).or(page.locator(`#menu-item-20 > a[href*="/my-account/"] > span`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td > mark.order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.username ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  });

  test('06 - My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number`)).not.toHaveCount(0);
    try {
      await expect(page.locator(`tr.membership-product:nth-of-type(1) > td.membership-product-image`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await page.locator(`xpath=//a[contains(text(), "Back to Dashboard")]`).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/my-account/downloads/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-column1`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
  });

  test('07 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/my-account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

  test('Mobile Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `KYWnNc6$)@Au4(Xs(Opt9WwO`;
    await login(page, vars);
    try {
      {
        const _lbl = page.locator(`label[for="ts-top-mobile-menu"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#ts-top-mobile-menu`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await expect(page.locator(`#main-nav`).first()).toBeVisible();
  });

});
