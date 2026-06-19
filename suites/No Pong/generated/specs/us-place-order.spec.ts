// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "US - Place Order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, checkTheTotal, extractUserFromEmail, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { adminLoginSkip2FA, storiesAssertion } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('US - Place Order', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "phone": "+14165551234",
    "adminUser": "qa+giadmin@saucal.com",
    "street3": "123 False Shipping",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "Symbol": "$",
    "state": "FL",
    "country": "US",
    "countryComplete": "United States (US)",
    "project": "nopong",
    "password": process.env.PASSWORD ?? '',
    "currency": "USD",
    "password2": process.env.PASSWORD2 ?? '',
    "includeTax": "false",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "city": "Miami",
    "stateComplete": "Florida",
    "zipCode": "33126",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - US - Place Order - New User', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    // ↓ Checkout Page
    // ↓ Cart Page
    // ↓ Shop Page
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Shop Page
    vars.prod_desc = ((await page.locator(`#main > div > div > div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns.has-multiple-rows.alignfull > ul > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) a[href*="?add-to-cart="]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    // ↑ end Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.blockUI`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`.blockUI`)).toHaveCount(0);
    } catch { /* optional step: assertElementNotPresent */ }
    // ↑ end Checkout Page
    await wooCommerceCheckoutTemplate(page, vars);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`05 / 28`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`05 / 28`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    try {
      {
        const _lbl = page.locator(`label[for="wc-stripe-new-payment-method"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#wc-stripe-new-payment-method`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await placeOrderElement(page, vars);
    await storiesAssertion(page, vars);
    await blockUI(page, vars);
    await expect(page.locator(`p.woocommerce-notice`).first()).toContainText(`THANK YOU!
 
YOUR ORDER HAS BEEN RECEIVED.`);
    await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.username ?? ''}`);
    vars.orderNumber = ((await page.locator(`li.woocommerce-order-overview__order.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.total > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
    await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`tr.order .woocommerce-Price-amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  });

  test('02 - US - Place Order - New User - Email', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your No Pong USA Order Confirmation")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`Credit / Debit Card`);
    await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  });

  test('03 - US - Place Order - New User - Backend', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}wp-admin`);
    await page.waitForLoadState('load');
    await adminLoginSkip2FA(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Credit / Debit Card`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
    await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    try {
      await expect(page.locator(`a[href*="/wp-admin/admin-ajax.php?action=generate_wpo_wcpdf&document_type=invoice&order_ids=${vars.orderNumber ?? ''}&access_key=wc_order_"]`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Stripe charge complete \(Charge ID: ch_[a-zA-Z0-9]+\)/;
    return pattern.test(note);
}

let note = document.querySelector('ul.order_notes > li:nth-of-type(1) > div > p').textContent

return checkAdminNote(note)
 }, vars)).toBeTruthy();
  });

  test('04 - US - Place Order - New User - Refund', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}wp-admin`);
    await page.waitForLoadState('load');
    await adminLoginSkip2FA(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
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
      vars.shippingTax = ((await page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTax ?? ''}`); }
    }
    try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = new RegExp(`Refunded ${total} – Refund ID: re_[a-zA-Z0-9]+ – Reason: Testing Refund`);
    return pattern.test(note);
}


let note = document.querySelector('ul.order_notes > li:nth-of-type(3) > div > p').textContent

return checkRefundNote(note) }, vars)).toBeTruthy();
  });

  test('05 - US - Place Order - New User - Refund Email', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  });

});
