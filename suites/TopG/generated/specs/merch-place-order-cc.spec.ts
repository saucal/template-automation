// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Merch - Place Order - CC"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, extractUserFromEmail, login, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { nextPaymentDate } from '../helpers/merch-common-test-steps';

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

test.describe('Merch - Place Order - CC', () => {

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
    "password2": process.env.PASSWORD2 ?? '',
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Ship`,
    "street": "101 S Franklin St",
    "phone": "3453453456",
    "qty": "3",
    "street2": "Ap. 4",
    "street3": "123 False Shipping",
    "street4": "Ap. Shipp",
    "city": "Greensburg",
    "zipCode": "47240",
    "country": "US",
    "state": "IN",
    "stateComplete": "Indiana",
    "countryComplete": "United States (US)",
    "company": "Testing",
    "company2": "Testing Shipping",
    "Symbol": "$",
    "currency": "USD",
    "project": "topg-merch",
    "password": process.env.PASSWORD ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('07 - Place order - New user - 01 - Frontend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 06 - Checkout page
    // ↓ 12 - Fireblood page
    await page.locator(`.menu-item > a[href*="/choose-your-path/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.fireblood-content`)).not.toHaveCount(0);
    await expect(page.locator(`.qty-options`)).not.toHaveCount(0);
    await expect(page.locator(`.plan-columns`)).not.toHaveCount(0);
    vars.prod_desc = ((await page.locator(`.hero-header > h1`).textContent()) ?? '').trim();
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = document.querySelector<HTMLButtonElement>('button.add-to-cart').innerText;

const price = text.match(/\$\d+\.\d{2}/);

return price[0] }, vars);
    // ↑ end 12 - Fireblood page
    try {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let title = `${vars.prod_desc}`
title = title.toUpperCase();
return title
 }, vars);
    } catch { /* optional step: extractEval */ }
    await page.locator(`button.add-to-cart`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`

return prod_desc.charAt(0).toUpperCase() + prod_desc.slice(1).toLowerCase(); }, vars);
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
    await expect(page.locator(`ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.cart-subtotal:nth-of-type(1) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total.adp-discount > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$10.00`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total:nth-of-type(4) > td > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.cart-subtotal:nth-of-type(6) > td > .topg_recurring_cart_totals > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total:nth-of-type(7) > td > .topg_recurring_cart_totals > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.subscription-details`).first()).toContainText(`/ month`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.cart-subtotal:nth-of-type(6) > td > .topg_recurring_cart_totals`).first()).toContainText(`/ month`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total:nth-of-type(7) > td > .topg_recurring_cart_totals`).first()).toContainText(`/ month`);
    vars.nextPay = ((await page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total:nth-of-type(7) > td > .first-payment-date > small`).textContent()) ?? '').trim();
    await nextPaymentDate(page, vars);
    // ↑ end 06 - Checkout page
    await calculateSubtotal(page, vars);
    await page.locator(`div > p > a.button.checkout`).filter({ visible: true }).first().click({ force: true });
    await placeOrderElement(page, vars);
    try {
      await expect(page.locator(`.woocommerce_error > li`).first()).toContainText(`Invalid card number.`);
    } catch { /* optional step: assertTextPresent */ }
    vars.total = ((await page.locator(`div.topg-exclusive-cart > div > div.cart_totals > table > tbody > tr.order-total > td strong > span.amount > bdi`).textContent()) ?? '').trim();
    try { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#ccnumber`).or(page.locator(`#openpath-card-number`)).first().fill(`4111 1111 1111 1111`); } catch { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#ccnumber`).or(page.locator(`#openpath-card-number`)).first().selectOption(`4111 1111 1111 1111`); }
    try { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#ccexp`).or(page.locator(`#openpath-card-expiry`)).first().fill(`12 / 26`); } catch { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#ccexp`).or(page.locator(`#openpath-card-expiry`)).first().selectOption(`12 / 26`); }
    try { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#cvv`).or(page.locator(`#openpath-card-cvc`)).first().fill(`123`); } catch { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#cvv`).or(page.locator(`#openpath-card-cvc`)).first().selectOption(`123`); }
    await page.locator(`form.checkout.woocommerce-checkout`).filter({ visible: true }).first().click({ force: true });
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`INVALID OR MISSING CARD NUMBER.
INVALID OR MISSING CARD EXPIRY DATE.
BILLING FIRST NAME IS A REQUIRED FIELD.
BILLING LAST NAME IS A REQUIRED FIELD.
BILLING COUNTRY / REGION IS A REQUIRED FIELD.
BILLING STREET ADDRESS IS A REQUIRED FIELD.
BILLING TOWN / CITY IS A REQUIRED FIELD.
BILLING STATE / COUNTY IS A REQUIRED FIELD.
BILLING POSTCODE / ZIP IS A REQUIRED FIELD.
BILLING PHONE IS A REQUIRED FIELD.
BILLING EMAIL ADDRESS IS A REQUIRED FIELD.
PLEASE ENTER AN ADDRESS TO CONTINUE.`);
    await expect(page.locator(`td.product-name > a`).first()).toContainText(`${vars.title ?? ''}`);
    await expect(page.locator(`td.product-name > div > div >span`).first()).toContainText(`${vars.qty ?? ''}`);
    vars.productSubTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = `${vars.unitPrice}`.slice(1);
price = parseFloat(price);
return vars.qty * price }, vars);
    await expect(page.locator(`td.product-subtotal > span`).first()).toContainText(`${vars.productSubTotal ?? ''}`);
    await wooCommerceCheckoutTemplate(page, vars);
    try { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#ccnumber`).or(page.locator(`#openpath-card-number`)).first().fill(`5123 4500 0000 0008`); } catch { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#ccnumber`).or(page.locator(`#openpath-card-number`)).first().selectOption(`5123 4500 0000 0008`); }
    try { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#ccexp`).or(page.locator(`#openpath-card-expiry`)).first().fill(`12 / 26`); } catch { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#ccexp`).or(page.locator(`#openpath-card-expiry`)).first().selectOption(`12 / 26`); }
    try { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#cvv`).or(page.locator(`#openpath-card-cvc`)).first().fill(`512`); } catch { await page.locator(`iframe[src*="secure.nmi.com"]`).first().contentFrame().locator(`#cvv`).or(page.locator(`#openpath-card-cvc`)).first().selectOption(`512`); }
    await page.locator(`form.checkout.woocommerce-checkout`).filter({ visible: true }).first().click({ force: true });
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    try {
      await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    } catch { /* optional step: assertText */ }
    vars.titleLower = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let name = `${vars.title}`;
name = name.toLowerCase();
return name }, vars);
    try {
      await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.titleLower ?? ''} × ${vars.qty ?? ''}
Size:

${vars.size ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tr:nth-of-type(2) > td`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`Payment information`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await page.locator(`toMyAccount`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toHaveText(`${vars.title ?? ''} - ${vars.color ?? ''}, ${vars.size ?? ''} × ${vars.qty ?? ''}
Color:

${vars.color ?? ''}

Size:

${vars.size ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`strong > .woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tr:nth-of-type(2) > td`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`Payment information`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    } catch { /* optional step: assertText */ }
  });

  test('07 - Place order - New user - 02 - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.site = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let site = window.location.href
return site }, vars);
    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your Top G Exclusive order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`#body_content_inner > div:nth-of-type(1) > h2`).first()).toContainText(`You will be granted one free NFT per purchased item.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`#body_content_inner > div:nth-of-type(1) > p`).first()).toContainText(`We will provide claim instructions once your order has been delivered.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toHaveText(`${vars.title ?? ''} - ${vars.color ?? ''}, ${vars.size ?? ''}
Color:

${vars.color ?? ''}

Size:

${vars.size ?? ''}`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(2)`).first()).toContainText(`${vars.qty ?? ''}`);
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.td`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
    try {
      await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`Payment information`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    vars.admin = `yes`;
    vars.username = `guest@saucal.com`;
    vars.pass = `1JnvJtXdTB6YC&ihfk868JS2`;
    await login(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
    try {
      vars.nft1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = document.querySelector(`tr#post-${vars.orderNumber} > td.nft_codes.column-nft_codes`)
elements = elements.innerText
elements = elements.split(/\r?\n/)
return elements[0]
 }, vars);
    } catch { /* optional step: extractEval */ }
    try {
      vars.nft2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = document.querySelector(`tr#post-${vars.orderNumber} > td.nft_codes.column-nft_codes`)
elements = elements.innerText
elements = elements.split(/\r?\n/)
return elements[1]
 }, vars);
    } catch { /* optional step: extractEval */ }
    try {
      vars.nft3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = document.querySelector(`tr#post-${vars.orderNumber} > td.nft_codes.column-nft_codes`)
elements = elements.innerText
elements = elements.split(/\r?\n/)
return elements[2]
 }, vars);
    } catch { /* optional step: extractEval */ }
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit card`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}Customer provided note:
Order Note for Testing this field`);
    await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href="tel:3453453456"]`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.quantity > .view`).first()).toHaveText(`× ${vars.qty ?? ''}`);
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingPrice}`
if (shippingPrice.includes("Free")){
    shippingPrice = "$0.00";
};
return shippingPrice }, vars);
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    try {
      await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`All products were imported to Printful order`);
    } catch { /* optional step: assertTextPresent */ }
    {
      const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-order_status-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Completed")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.order_data_column > ul > li:nth-of-type(1)`).first()).toContainText(`${vars.nft1 ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.order_data_column > ul > li:nth-of-type(2)`).first()).toContainText(`${vars.nft2 ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`.order_data_column > ul > li:nth-of-type(3)`).first()).toContainText(`${vars.nft3 ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`li.note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Order status changed from Processing to Completed.`);
    vars.site = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let site = window.location.href
return site }, vars);
    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your Top G Exclusive order is now complete")]`).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`#body_content_inner > div:nth-of-type(1) > h2`).first()).toContainText(`You are granted one free NFT per purchased item`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`#body_content_inner > div:nth-of-type(1) > p`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`div:nth-of-type(1) > ul > li:nth-of-type(1)`).first()).toContainText(`${vars.nft1 ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`div:nth-of-type(1) > ul > li:nth-of-type(2)`).first()).toContainText(`${vars.nft2 ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`ul > li:nth-of-type(3)`).first()).toContainText(`${vars.nft3 ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toHaveText(`${vars.title ?? ''} - ${vars.color ?? ''}, ${vars.size ?? ''}
Color:

${vars.color ?? ''}

Size:

${vars.size ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tr.order_item > td.td:nth-of-type(2)`).first()).toContainText(`${vars.qty ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingPrice}`
if (shippingPrice.includes("$0.00")){
    shippingPrice = "Free shipping";
};
return shippingPrice }, vars);
    } catch { /* optional step: extractEval */ }
    try {
      await expect(page.locator(`tr:nth-of-type(2) > td.td`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`Credit card`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    } catch { /* optional step: assertText */ }
    await page.goto(`${vars.site ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const quantityElements = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>('tbody#order_line_items > tr > td.quantity > div.view'));
console.log('Found quantity elements:', quantityElements.length);

const quantities = [];

quantityElements.forEach((element, index) => {
    // Log raw content
    const text = element.textContent.trim();
    console.log(`Element ${index + 1} raw text: '${text}'`);
    
    // Try multiple extraction methods
    let qty;
    
    // Method 1: Original regex
    const match1 = text.match(/x\s*(\d+)/);
    if (match1 && match1[1]) {
        qty = parseInt(match1[1], 10);
        console.log(`Element ${index + 1} - Matched with regex 1: ${qty}`);
    } else {
        // Method 2: Simpler digit extraction
        const match2 = text.match(/\d+/);
        if (match2) {
            qty = parseInt(match2[0], 10);
            console.log(`Element ${index + 1} - Matched with regex 2: ${qty}`);
        }
    }
    
    if (qty !== undefined) {
        quantities.push(qty);
    } else {
        console.log(`Element ${index + 1} - No quantity extracted`);
    }
});

console.log('Extracted quantities:', quantities);

// Assign to refund inputs
const refundInputs = Array.from<any>(document.querySelectorAll<HTMLInputElement>('input[type="number"].refund_order_item_qty'));
console.log('Found refund inputs:', refundInputs.length);

refundInputs.forEach((input, index) => {
    if (index < quantities.length) {
        input.value = quantities[index];
        console.log(`Assigned ${quantities[index]} to refund input #${index + 1}`);
        
        // Trigger WooCommerce recalculation
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    }
}); }, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount')

return shipping !== null  }, vars)) {
      vars.shippingPriceWithoutTax = ((await page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount')

return shipping !== null  }, vars)) {
      try { await page.locator(`tr.shipping > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().fill(`${vars.shippingPriceWithoutTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingPriceWithoutTax ?? ''}`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).first().fill(`shippingTax`); } catch { await page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).first().selectOption(`shippingTax`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTax ?? ''}`); }
    }
    try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  });

});
