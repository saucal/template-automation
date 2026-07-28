// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Red Apple - Basic tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, checkOrderOnBackend, scrollFullPage } from '../helpers/common-steps-for-all-projects';
import { adminOrdersLogin, checkRedAppleOrderOnEmail, fillBillingAddress, fillShippingAddress, fillStripeForm, getOrderNumberFromURL, logoutFromAccount } from '../helpers/red-apple-common-steps-for-suite';

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

test.describe('Red Apple - Basic tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "streetBilling": "727 EAST MARKET STREET",
    "streetShipping": "101 S Franklin St",
    "cityBilling": "Louisville",
    "stateBilling": "Kentucky",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "billingAddress2": "Building D",
    "shippingAddress2": "First Floor",
    "cityShipping": "Greensburg",
    "stateShipping": "Indiana",
    "stateShippingShort": "IN",
    "password": process.env.PASSWORD ?? '',
    "project": "redApple",
    "phone": "(512) 942-2061",
    "countryShort": "US",
    "countryBilling": "United States (US)",
    "countryShipping": "United States (US)",
    "postCodeShipping": "47240",
    "postCodeBilling": "40202",
    "firstName": "Maintenance",
    "lastName": "Test",
    "adminUser": "guest@saucal.com",
    "stateBillingShort": "KY",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`div > h1`).first()).toHaveText(`Clean Beauty
Gluten Free
Vegan Makeup`);
  });

  test('xx - Buy custom bundle & order email validation', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.project = `redApple`;
    vars.product = `bundle`;
    vars.email = `qa+gi_order+${vars.alphanumeric ?? ''}@email.ghostinspector.com`;
    vars.username = `${vars.email ?? ''}`;
    await page.locator(`#site-navigation > div > ul >li:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.post-275770 > div:nth-child(3) > div h2 > a`).filter({ visible: true }).first().click({ force: true });
    vars.productPrice = ((await page.locator(`.summary > .price > ins > span > bdi`).textContent()) ?? '').trim();
    vars.productName = ((await page.locator(`.summary > h1`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="woobt_checkbox_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#woobt_checkbox_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.subTotal = ((await page.locator(`p.price > ins > span.amount`).textContent()) ?? '').trim();
    await expect(page.locator(`.woobt-total > ins > span`).first()).toContainText(`${vars.subTotal ?? ''}`);
    {
      const _lbl = page.locator(`label[for="woobt_checkbox_2"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#woobt_checkbox_2`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.{{subTotal}} = ((await page.locator(`p.price > ins > span.amount`).textContent()) ?? '').trim();
    await expect(page.locator(`.woobt-total > ins > span`).first()).toContainText(`${vars.subTotal ?? ''}`);
    await expect(page.locator(`.woobt-wrap > .woobt-summary > .woobt-text:nth-child(1)`).first()).toBeVisible();
    vars.cartSubTotal = ((await page.locator(`.woobt-total > ins > span`).textContent()) ?? '').trim();
    await page.locator(`form > button.single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`ul > li.woocommerce-mini-cart-item:nth-child(1) > a`).first()).toContainText(`${vars.productName ?? ''}`);
    await page.locator(`a.wc-forward:nth-child(1)`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.productName ?? ''}`);
    await expect(page.locator(`td.product-price`).first()).toContainText(`${vars.productPrice ?? ''}`);
    await expect(page.locator(`.cart-subtotal > td > span > bdi`).first()).toContainText(`${vars.cartSubTotal ?? ''}`);
    vars.freeShipping = ((await page.locator(`#shipping_method > li:nth-child(1)  > label`).textContent()) ?? '').trim();
    await page.locator(`.checkout-button`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await fillBillingAddress(page, vars);
    await expect(page.locator(`#shipping_country`)).not.toHaveCount(0);
    await fillShippingAddress(page, vars);
    try {
      await expect(page.locator(`#shipping_state`).first()).toContainText(`IN`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`#shipping_city`).first()).toContainText(`Greensburg`);
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await expect(page.locator(`#billing_state`).first()).toContainText(`KY`);
    await expect(page.locator(`#billing_city`).first()).toContainText(`Louisville`);
    try {
      try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    } catch { /* optional step: assign */ }
    await expect(page.locator(`.cart-subtotal > td > span > bdi`).first()).toContainText(`${vars.cartSubTotal ?? ''}`);
    await expect(page.locator(`tr.shipping >td > ul > li:nth-child(1) > label`).first()).toContainText(`Free Shipping`);
    await page.screenshot({ fullPage: true });
    await fillStripeForm(page, vars);
    await page.waitForTimeout(10000);
    await blockUI(page, vars);
    await page.waitForTimeout(7000);
    await blockUI(page, vars);
    try {
      await expect(page.locator(`h4`).or(page.locator(`.woocommerce-notice`)).first()).toContainText(`Your order has been received`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`tr:nth-child(1) > th > div`).or(page.locator(`tr:nth-child(1) >td > a`)).first()).toContainText(`${vars.productName ?? ''}`);
    await expect(page.locator(`tr:nth-child(1) > td.cfw-cart-item-subtotal > span`).or(page.locator(`tr:nth-child(1) > td.product-total > span`)).first()).toContainText(`${vars.productPrice ?? ''}`);
    await checkRedAppleOrderOnEmail(page, vars);
  });

  test('xx - Buy simple product & admin order validation', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.project = `redApple`;
    vars.email = `qa+gi_order_+${vars.alphanumeric ?? ''}@saucal.com`;
    await page.locator(`#site-navigation > div > ul >li:nth-child(4) > a`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`li:nth-child(3) > div > div > div > div > span.price >span.amount >bdi`).textContent()) ?? '').trim();
    vars.productName = ((await page.locator(`li.entry:nth-child(3) >div  >div  >div  >div  >div > h2.entry-title`).textContent()) ?? '').trim();
    await page.locator(`li.entry:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(8) > a:nth-child(1)`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-mini-cart-item > a:nth-child(2)`).first()).toContainText(`${vars.productName ?? ''}`);
    await page.locator(`a.wc-forward:nth-child(1)`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#shipping_method > li:nth-child(1) > label`).first()).toContainText(`Flat Rate: `);
    vars.qty = ((await page.locator(`input.input-text.qty`).textContent()) ?? '').trim();
    vars.flatRatePrice = ((await page.locator(`#shipping_method > li:nth-child(1) > label > span > bdi`).textContent()) ?? '').trim();
    vars.tax = ((await page.locator(`.tax-total> td > span > bdi`).textContent()) ?? '').trim();
    vars.subtotalPrice = ((await page.locator(`.cart-subtotal > td > span > bdi`).textContent()) ?? '').trim();
    vars.cartTotal = ((await page.locator(`.order-total > td > strong > span > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.productName ?? ''}`);
    await expect(page.locator(`td.product-price`).first()).toContainText(`${vars.productPrice ?? ''}`);
    await page.locator(`#shipping_method > li:nth-child(2) > input`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.checkout-button`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await fillBillingAddress(page, vars);
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await fillShippingAddress(page, vars);
    try {
      try { await page.locator(`#shipping_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#shipping_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    } catch { /* optional step: assign */ }
    await expect(page.locator(`.shipping > td > span > bdi`).or(page.locator(`#shipping_method > li:nth-child(1) > label > span > bdi`)).first()).toContainText(`${vars.flatRatePrice ?? ''}`);
    await expect(page.locator(`.tax-total> td > span > bdi`).first()).toContainText(`${vars.tax ?? ''}`);
    await expect(page.locator(`.order-total> td > strong > span > bdi`).first()).toContainText(`${vars.cartTotal ?? ''}`);
    await fillStripeForm(page, vars);
    await blockUI(page, vars);
    await page.waitForTimeout(1500);
    vars.orderNumberInThankyou = ((await page.locator(`div.title > h5`).or(page.locator(`.order_details > li:nth-child(1) > strong`)).textContent()) ?? '').trim();
    if (0 > 1) {
      vars.orderNumber = `0`;
    }
    if (0 > 1) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let order = document.querySelector('div.title > h5').textContent;
order = (order.trim().slice(6));
console.log(order);
return orderNumber = order;

/*let order = vars.orderNumber;
order = (order.trim());
Number(orderNumber);
orderNumber = (order.slice(6));
return orderNumber;*/

 }, vars);
    }
    await getOrderNumberFromURL(page, vars);
    await logoutFromAccount(page, vars);
    await adminOrdersLogin(page, vars);
    await page.goto(`${vars.orderLink ?? ''}`);
    await page.waitForLoadState('load');
    await checkOrderOnBackend(page, vars);
  });

  test('xx - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#primary-menu > li:nth-child(3)`).first().hover();
    await page.locator(`#primary-menu > li:nth-child(3) > ul > li:nth-child(1) > a`).filter({ visible: true }).first().click({ force: true });
    vars.productName = ((await page.locator(`div > h1.entry-title`).textContent()) ?? '').trim();
    vars.productPrice = ((await page.locator(`p >span > bdi`).textContent()) ?? '').trim();
    vars.complementOneName = ((await page.locator(`.woobt-wrap > div.woobt-products > div:nth-child(2) > .woobt-title > span > a`).textContent()) ?? '').trim();
    vars.complementTwoName = ((await page.locator(`.woobt-wrap > div.woobt-products > div:nth-child(3) > .woobt-title > span > a`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="pa_blush-color"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#pa_blush-color`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#pa_blush-color > option:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
    vars.complementOnePrice = ((await page.locator(`.woobt-wrap > div.woobt-products > div:nth-child(2) > .woobt-price > div > ins > span > bdi`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="woobt_checkbox_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#woobt_checkbox_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.complementTwoPrice = ((await page.locator(`.woobt-wrap > div.woobt-products > div:nth-child(3) > .woobt-price > div > ins > span > bdi`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="woobt_checkbox_2"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#woobt_checkbox_2`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`div > button.single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.header-cart-inner-wrap > button.header-cart-button`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`p > a.wc-forward`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr:nth-child(1) > td.product-name`).first()).toContainText(`${vars.productName ?? ''}`);
    await expect(page.locator(`tr:nth-child(2) > td.product-name`).first()).toContainText(`${vars.complementOneName ?? ''}`);
    await expect(page.locator(`tr:nth-child(3) > td.product-name`).first()).toContainText(`${vars.complementTwoName ?? ''}`);
    try {
      await expect(page.locator(`tr:nth-child(1) > td.product-price`).first()).toContainText(`${vars.productPrice ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`tr:nth-child(2) > td.product-price`).first()).toContainText(`${vars.complementOnePrice ?? ''}`);
    await expect(page.locator(`tr:nth-child(3) > td.product-price`).first()).toContainText(`${vars.complementTwoPrice ?? ''}`);
    await expect(page.locator(`#shipping_method > li:nth-child(1) > label`).first()).toContainText(`Free Shipping`);
    await expect(page.locator(`#shipping_method > li:nth-child(2) > label`).first()).toContainText(`Flat Rate`);
    await expect(page.locator(`#shipping_method > li:nth-child(3) > label`).first()).toContainText(`Priority Mail`);
    try {
      await page.locator(`.fgf-gift-product-selection`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`.fgf-gift-product-selection > optgroup > option:nth-child(1)`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`.button.fgf-add-gift-product`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await expect(page.locator(`tr:nth-child(4) > td.product-price`).first()).toContainText(`Free`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`.checkout-button.wc-forward`).first()).toBeVisible();
  });

  test('xx - Product Eye Shadow Palettes Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#primary-menu > li:nth-child(2) > a`).first().hover();
    await page.locator(`#menu-item-341452 > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.products > li:nth-child(11) > div > a`).filter({ visible: true }).first().click({ force: true });
    vars.complementPriceOld = ((await page.locator(`.woobt-products > div:nth-child(3) > .woobt-price > div >  span > bdi`).or(page.locator(`.woobt-products > div:nth-child(3) > .woobt-price > div > del`)).textContent()) ?? '').trim();
    vars.complementPriceNew = ((await page.locator(`.woobt-products > div:nth-child(3) > .woobt-price > div >  span > bdi`).or(page.locator(`.woobt-products > div:nth-child(3) > .woobt-price > div > ins`)).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="woobt_checkbox_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#woobt_checkbox_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`div.woobt-text.woobt-additional`).first()).toContainText(`Additional price: ${vars.complementPriceNew ?? ''}`);
    try {
      await expect(page.locator(`div.woobt-text.woobt-additional`).first()).toContainText(`Additional price: ${vars.complementPriceOld ?? ''} ${vars.complementPriceNew ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
  });

  test('xx - Register & account site', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `qa+gi_register_${vars.alphanumeric ?? ''}@saucal.com`;
    await page.locator(`div.header-account-wrap > .header-account-button`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.register-link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#reg_billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#reg_billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#reg_billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#reg_billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`.woocommerce-form-register__submit`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.user-email`).first()).toContainText(`${vars.email ?? ''}`);
    await page.screenshot({ fullPage: true });
    await page.locator(`a.yith-orders`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No order has been made yet. Browse products`);
    await page.locator(`li.group-autoship > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.yith-payment-methods`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.screenshot({ fullPage: true });
    await page.locator(`li.group-account-info > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.yith-edit-address`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.col-2 > address`).first()).toContainText(`You have not set up this type of address yet.`);
  });

  test('xx - Register & forgot password', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `qa+gi_register_${vars.alphanumeric ?? ''}@saucal.com`;
    await page.locator(`div.header-account-wrap > .header-account-button`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.register-link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#reg_billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#reg_billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#reg_billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#reg_billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`.woocommerce-form-register__submit`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.user-email`).first()).toContainText(`${vars.email ?? ''}`);
    await page.screenshot({ fullPage: true });
    await page.locator(`a.yith-orders`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No order has been made yet. Browse products`);
    await page.locator(`li.group-autoship > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.yith-payment-methods`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.screenshot({ fullPage: true });
    await page.locator(`li.group-account-info > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.yith-edit-address`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.col-2 > address`).first()).toContainText(`You have not set up this type of address yet.`);
    await page.locator(`.logout`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.header-account-wrap > .header-account-button`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.lost_password > small > a`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`button.woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
  });

  test('xx - Shop page', async ({ page }) => {
    await page.goto(`/ral-shop/`);
    await page.waitForLoadState('load');

    await scrollFullPage(page, vars);
    await page.screenshot({ fullPage: true });
    await expect(page.locator(`h1.page-title`).first()).toContainText(`Shop Red Apple Lipstick Clean Beauty`);
    await page.locator(`#filter_303505_0 > h4`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="filter_303505_0_157"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#filter_303505_0_157`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`span.filter-count`).first()).toContainText(`1`);
    await page.locator(`a.apply-filters`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`ul.products > li:nth-child(1) > div > div > div > div > div > h2 > a`).first()).toContainText(`Chic CarryAll`);
    await page.locator(`#filter_303505_1 > h4`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="filter_303505_1_8094"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#filter_303505_1_8094`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`a.apply-filters`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#main > div.yith-wcan-active-filters.no-titles.enhanced > h4`).first()).toBeVisible();
    await page.screenshot({ fullPage: true });
    await page.locator(`button.reset-filters`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#main > div.yith-wcan-active-filters.no-titles.enhanced > h4`)).toHaveCount(0);
  });

  test('xx - Shop Page Lips', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#site-navigation > div > ul >li:nth-child(1) > a`).filter({ visible: true }).first().click({ force: true });
  });

});
