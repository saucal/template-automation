// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Pur Crystal - Basic WooCommerce Tests - USer"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, checkOrderOnEmail, checkTheTotal, login, placeOrderElement, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';

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

test.describe('Pur Crystal - Basic WooCommerce Tests - USer', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "qty": "2",
    "Symbol": "$",
    "street2": "Ap. 4",
    "city": "Miami",
    "state": "FL",
    "phone": "6546546547",
    "stateComplete": "Florida",
    "zipCode": "33126",
    "company2": "Shipping Inc.",
    "countryComplete": "United States (US)",
    "project": "purCrystal",
    "street3": "AP. Shipping",
    "currency": "USD",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Testing Inc.",
    "street": "1000 NW 42nd Ave",
    "shortState": "FL",
    "includeTax": "false",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - New User - CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 12 - Checkout page
    // ↓ 11 - Cart page
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.goto(`${vars.site ?? ''}crystals-minerals/meteorite/`);
    await page.waitForLoadState('load');
    await page.locator(`li.instock.product-type-simple > a[href*='/shop/crystals-minerals/meteorite']`).or(page.locator(`li.instock.product-type-simple > a.woocommerce-loop-product__link`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.elementor-widget-container > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`input[name="quantity"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/cart/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`table.shop_table > tbody > tr.woocommerce-cart-form__cart-item.cart_item > .product-name > a[href*="/shop/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    // ↑ end 11 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table > tbody > tr > td.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''}  × ${vars.qty ?? ''}`);
    // ↑ end 12 - Checkout page
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing ZIP Code is a required field.
Billing Phone is a required field.
Billing Email address is a required field.
Please read and accept the terms and conditions to proceed with your order.
No shipping method has been selected. Please double check your address, or contact us if you need any help.`);
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
    try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
    try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
    try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="select2-billing_state-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-billing_state-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.stateComplete ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.stateComplete ?? ''}`); }
    await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`xpath=//span[contains(text(), "Create an account?")]`).or(page.locator(`.elementor-heading-title`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
    try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street ?? ''}`); }
    try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street3 ?? ''}`); }
    try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="select2-shipping_state-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-shipping_state-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.stateComplete ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.stateComplete ?? ''}`); }
    await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
    await blockUI(page, vars);
    vars.shippingPrice = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#payment_method_authorize_net_aim_emulation')

return !!element }, vars)) {
      {
        const _lbl = page.locator(`label[for="payment_method_authorize_net_aim_emulation"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#payment_method_authorize_net_aim_emulation`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.method > strong`).first()).toContainText(`Credit Card`);
    await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prod_desc ?? ''} × ${vars.qty ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toContainText(`Credit Card`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await page.locator(`.elementor-column.elementor-top-column.elementor-element.elementor-element-3cbde5e > .elementor-widget-wrap.elementor-element-populated > .elementor-element.elementor-widget__width-auto.elementor-widget.elementor-widget-account_links > .elementor-widget-container > .account-links > a[href="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prod_desc ?? ''} × ${vars.qty ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toContainText(`Credit Card`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  });

  test('02 - Place order - New User - CC - backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    await checkOrderOnEmail(page, vars);
    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.waitForLoadState('load');
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`tbody#the-list > tr:first-of-type td.order_number > a.order-view > strong`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h2.woocommerce-order-data__heading`).first()).toContainText(`Order #${vars.orderNumber ?? ''} details`);
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
    await expect(page.locator(`.wc-order-status span#select2-order_status-container`).first()).toContainText(`Processing`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`.address > p:nth-of-type(3)`).first()).toHaveText(`Phone:
${vars.phone ?? ''}`);
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`#order_line_items tr > td.name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`#order_line_items td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#order_line_items td.quantity > .view`).first()).toHaveText(`× ${vars.qty ?? ''}`);
    await expect(page.locator(`#order_line_items td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`#order_shipping_line_items td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:last-of-type > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('04 - Refund by Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).or(page.locator(`tbody > tr:nth-of-type(1) > td:nth-of-type(1) > a:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
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
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(6) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      vars.shippingTax = ((await page.locator(`tr.shipping > td.line_tax:nth-of-type(6) > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(6) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingTax = `${vars.shippingTax}`
shippingTax = shippingTax.replace(`${vars.Symbol}`,'')

return shippingTax }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(6) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax:nth-of-type(6) > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax:nth-of-type(6) > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTax ?? ''}`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(7) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      vars.shippingTax2 = ((await page.locator(`tr.shipping > td.line_tax:nth-of-type(7) > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(7) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      vars.shippingTax2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingTax = `${vars.shippingTax2}`
shippingTax = shippingTax.replace(`${vars.Symbol}`,'')

return shippingTax }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(7) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax:nth-of-type(7) > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTax2 ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax:nth-of-type(7) > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTax2 ?? ''}`); }
    }
    try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
    await expect(page.locator(`button[type="button"].button.button-primary > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('05 - Refund Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    if (vars.project === 'nopong') {
      await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    if (vars.project === 'cashForeClub') {
      await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    await expect(page.locator(`tr.order-totals-last > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  });

});
