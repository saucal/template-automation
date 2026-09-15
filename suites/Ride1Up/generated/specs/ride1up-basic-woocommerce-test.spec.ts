// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Ride1Up - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { login, register } from '../helpers/botany-farms-common-steps-for-suites';
import { blockImageSizes, blockUI, calculateSubtotal, extractUserFromEmail, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';

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

test.describe('Ride1Up - Basic WooCommerce Test', () => {

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
    "street": "1810 MacSween Street",
    "street3": "123 False Shipping",
    "city": "Port Hawkesbury",
    "zipCode": "B9A 2H5",
    "phone": "902-227-9524",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Ship`,
    "project": "Ride1Up",
    "countryComplete": "Canada",
    "state": "NS",
    "stateComplete": "Nova Scotia",
    "Symbol": "$",
    "country": "CA",
    "currency": "CAD",
    "company": "Testing",
    "company2": "Testing Shipping",
    "street2": "Ap. 4",
    "street4": "Ap. Shipp",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
  });

  test('02 - Shop Parts & Accessories Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`xpath=//li[@id="menu-item-439"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Shop Parts & Accessories Page
    await page.waitForLoadState('load');
    await page.locator(`xpath=//li[@id="menu-item-439"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop Parts & Accessories Page
    await page.locator(`xpath=//li[@id="menu-item-88068"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/product/roadster-v2/"] > img.attachment-medium_large.size-medium_large`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`form.needsclick`)).not.toHaveCount(0);
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`xpath=//*[@id="product-57143"]/div[1]/div/div/div/div[3]/form/div[2]/div[1]/div[3]/span/span/bdi`)).textContent()) ?? '').trim();
  });

  test('04 - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 03 - Product Page
    // ↓ 02 - Shop Parts & Accessories Page
    await page.waitForLoadState('load');
    await page.locator(`xpath=//li[@id="menu-item-439"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop Parts & Accessories Page
    await page.locator(`xpath=//li[@id="menu-item-88068"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/product/roadster-v2/"] > img.attachment-medium_large.size-medium_large`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`form.needsclick`)).not.toHaveCount(0);
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`xpath=//*[@id="product-57143"]/div[1]/div/div/div/div[3]/form/div[2]/div[1]/div[3]/span/span/bdi`)).textContent()) ?? '').trim();
    // ↑ end 03 - Product Page
    await page.locator(`xpath=//*[@id="product-57143"]/div[1]/div/div/div/div[3]/form/div[2]/div[2]/div/div[2]/button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`“${vars.prod_desc ?? ''}” has been added to your cart.`);
    try {
      await page.locator(`#page > .masthead.inline-header.right.widgets.full-height.full-width.shadow-decoration.dt-parent-menu-clickable > .top-bar > .right-widgets.mini-widgets > div.near-logo-first-switch.near-logo-second-switch:nth-of-type(2) > .round-counter-style > a[href*="/cart/"].wc-ico-cart.round-counter-style > i.the7-mw-icon-cart-bold`).first().hover();
    } catch { /* optional step: mouseOver */ }
    await page.locator(`a.button.view-cart`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`input[type="button"].plus`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="update_cart"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message-text`).first()).toContainText(`Cart updated.`);
    vars.qty = ((await page.locator(`input.input-text.qty.text`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    try {
      await page.locator(`svg.needsclick > path`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
  });

  test('05 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Cart Page
    // ↓ 03 - Product Page
    // ↓ 02 - Shop Parts & Accessories Page
    await page.waitForLoadState('load');
    await page.locator(`xpath=//li[@id="menu-item-439"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop Parts & Accessories Page
    await page.locator(`xpath=//li[@id="menu-item-88068"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/product/roadster-v2/"] > img.attachment-medium_large.size-medium_large`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`form.needsclick`)).not.toHaveCount(0);
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`xpath=//*[@id="product-57143"]/div[1]/div/div/div/div[3]/form/div[2]/div[1]/div[3]/span/span/bdi`)).textContent()) ?? '').trim();
    // ↑ end 03 - Product Page
    await page.locator(`xpath=//*[@id="product-57143"]/div[1]/div/div/div/div[3]/form/div[2]/div[2]/div/div[2]/button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`“${vars.prod_desc ?? ''}” has been added to your cart.`);
    try {
      await page.locator(`#page > .masthead.inline-header.right.widgets.full-height.full-width.shadow-decoration.dt-parent-menu-clickable > .top-bar > .right-widgets.mini-widgets > div.near-logo-first-switch.near-logo-second-switch:nth-of-type(2) > .round-counter-style > a[href*="/cart/"].wc-ico-cart.round-counter-style > i.the7-mw-icon-cart-bold`).first().hover();
    } catch { /* optional step: mouseOver */ }
    await page.locator(`a.button.view-cart`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`input[type="button"].plus`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="update_cart"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message-text`).first()).toContainText(`Cart updated.`);
    vars.qty = ((await page.locator(`input.input-text.qty.text`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    try {
      await page.locator(`svg.needsclick > path`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 04 - Cart Page
    await page.locator(`a[href*="/checkout/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
  });

  test('06 - Place order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Checkout page
    // ↓ 04 - Cart Page
    // ↓ 03 - Product Page
    // ↓ 02 - Shop Parts & Accessories Page
    await page.waitForLoadState('load');
    await page.locator(`xpath=//li[@id="menu-item-439"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop Parts & Accessories Page
    await page.locator(`xpath=//li[@id="menu-item-88068"]/a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/product/roadster-v2/"] > img.attachment-medium_large.size-medium_large`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`form.needsclick`)).not.toHaveCount(0);
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`xpath=//*[@id="product-57143"]/div[1]/div/div/div/div[3]/form/div[2]/div[1]/div[3]/span/span/bdi`)).textContent()) ?? '').trim();
    // ↑ end 03 - Product Page
    await page.locator(`xpath=//*[@id="product-57143"]/div[1]/div/div/div/div[3]/form/div[2]/div[2]/div/div[2]/button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`“${vars.prod_desc ?? ''}” has been added to your cart.`);
    try {
      await page.locator(`#page > .masthead.inline-header.right.widgets.full-height.full-width.shadow-decoration.dt-parent-menu-clickable > .top-bar > .right-widgets.mini-widgets > div.near-logo-first-switch.near-logo-second-switch:nth-of-type(2) > .round-counter-style > a[href*="/cart/"].wc-ico-cart.round-counter-style > i.the7-mw-icon-cart-bold`).first().hover();
    } catch { /* optional step: mouseOver */ }
    await page.locator(`a.button.view-cart`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`input[type="button"].plus`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="update_cart"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message-text`).first()).toContainText(`Cart updated.`);
    vars.qty = ((await page.locator(`input.input-text.qty.text`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    try {
      await page.locator(`svg.needsclick > path`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 04 - Cart Page
    await page.locator(`a[href*="/checkout/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 05 - Checkout page
    {
      const _lbl = page.locator(`label[for="payment_method_square_credit_card"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_square_credit_card`).filter({ visible: true }).first().click({ force: true }); }
    }
    await placeOrderElement(page, vars);
    await expect(page.locator(`span.sq-card-message.sq-card-message-error.sq-visible`).first()).toHaveText(`Enter a valid card number.`);
    await placeOrderElement(page, vars);
    try {
      await expect(page.locator(`div.woocommerce-error > ul.woocommerce-error-text`).first()).toContainText(`Invalid Phone Number. Please specify phone number in correct format, e.g. (+1) 230 2345
Billing First name is a required field.
Billing Last name is a required field.
Billing Country / Region is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP Code is a required field.
Billing Email address is a required field.
Please read and accept the terms and conditions to proceed with your order.
Please enter an address to continue.`);
    } catch { /* optional step: assertTextPresent */ }
    await wooCommerceCheckoutTemplate(page, vars);
    try { await page.locator(`iframe[src*="sandbox.web.squarecdn.com"]`).first().contentFrame().locator(`#cardNumber`).first().fill(`4111111111111111`); } catch { await page.locator(`iframe[src*="sandbox.web.squarecdn.com"]`).first().contentFrame().locator(`#cardNumber`).first().selectOption(`4111111111111111`); }
    try { await page.locator(`iframe[src*="sandbox.web.squarecdn.com"]`).first().contentFrame().locator(`#expirationDate`).first().fill(`12/26`); } catch { await page.locator(`iframe[src*="sandbox.web.squarecdn.com"]`).first().contentFrame().locator(`#expirationDate`).first().selectOption(`12/26`); }
    try { await page.locator(`iframe[src*="sandbox.web.squarecdn.com"]`).first().contentFrame().locator(`#cvv`).first().fill(`111`); } catch { await page.locator(`iframe[src*="sandbox.web.squarecdn.com"]`).first().contentFrame().locator(`#cvv`).first().selectOption(`111`); }
    await placeOrderElement(page, vars);
    await page.waitForTimeout(10000);
    await blockUI(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-name.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.shop_table.customer_details > tbody > tr:nth-of-type(1) > td`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`tbody > tr:nth-of-type(2) > td`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`tbody > tr:nth-of-type(3) > td`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`tbody > tr:nth-of-type(4) > td`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.shop_table.customer_details > tbody > tr:nth-of-type(1) > td`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`table.shop_table.customer_details > tbody > tr:nth-of-type(2) > td`).first()).toHaveText(`${vars.phone ?? ''}`);
    await expect(page.locator(`tbody > tr:nth-of-type(3) > td`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`tbody > tr:nth-of-type(4) > td`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  });

  test('07 - Register, My Account links', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    vars.username = `${vars.emailReg ?? ''}`;
    await register(page, vars);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`No order has been made yet.`);
    await page.locator(`a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-column1 > header.woocommerce-Address-title.title > h3`).first()).toContainText(`Billing address`);
    await expect(page.locator(`.u-column2 > header.woocommerce-Address-title.title > h3`).first()).toContainText(`Shipping address`);
    await page.locator(`a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Message`).first()).toContainText(`No saved methods found.`);
    await page.locator(`a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//*[@id="the7-body"]/div[11]/div/div/div/div/div/div/form/div/div[7]/div/button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('08 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
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
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button[type="submit"].woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

  test('add to cart', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/product/roadster-v2/"][aria-label="Select options for “Roadster v2”"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('product', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/product/roadster-v2/"] > img.attachment-medium_large.size-medium_large`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
  });

});
