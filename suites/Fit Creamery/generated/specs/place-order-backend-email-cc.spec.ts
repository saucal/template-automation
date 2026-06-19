// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Place order Backend + Email - CC"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { acceptUpsell, checkOrderOnMyAccount, closeReminder, extractUserFromEmail, fillCC, fillCheckout, loginAdmin, refundUpsell } from '../helpers/fit-creamery-common-steps';

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

test.describe('Place order Backend + Email - CC', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "fitCreamery",
    "zipCode": "27024",
    "phone": "17412345678",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Shipping Inc.",
    "street3": "30 Leicester Square",
    "street4": "5th Floor",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "$",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Test Inc.",
    "street": "30 Leicester Square",
    "street2": "Ap. 4",
    "city": "LOWGAP",
    "state": "NC",
    "stateComplete": "North Carolina",
    "country": "US",
    "countryComplete": "United States (US)",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`svg.e-eicon-close > use`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "PICK YOUR FLAVOR")]`).or(page.locator(`a[href*="/pick-your-flavor/"].elementor-element.elementor-element-15cae8c5 > .e-con-inner > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > span`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="#choose-package"].elementor-element.e-con-boxed.e-con.e-child:nth-of-type(1) > .e-con-inner > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > p`).or(page.locator(`xpath=//a[@href='#choose-package']//p[contains(text(),'chocolate')]`)).filter({ visible: true }).first().click({ force: true });
    vars.prices = ((await page.locator(`a[href*="/step/checkout?wcf-add-to-cart=1659&wcf-qty=4"] > .label`).textContent()) ?? '').trim();
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = `${vars.prices}`;
const prices = text.match(/\$[0-9]+/g);

return prices[0] + '.00' }, vars);
    vars.salePrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = `${vars.prices}`;
const prices = text.match(/\$[0-9]+/g);

return prices[1] + '.00' }, vars);
    try {
      await page.locator(`xpath=//*[contains(text(),'No thanks')]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`a[href*="/step/checkout?wcf-add-to-cart=1659&wcf-qty=4"] > .label > span:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    try {
      {
        const _lbl = page.locator(`label[for="fc-no-thanks-btn"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#fc-no-thanks-btn`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name > .wcf-product-image > .wcf-product-name`).first()).toHaveText(`Fit Sweet Ice Cream Mix - Chocolate`);
    vars.prod_desc = ((await page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name > .wcf-product-image > .wcf-product-name`).textContent()) ?? '').trim();
    await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name > strong.product-quantity`).first()).toContainText(`× 4`);
    await fillCheckout(page, vars);
    await closeReminder(page, vars);
    await fillCC(page, vars);
    await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tfoot > tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = `${vars.unitPrice ?? ''}`;
    vars.{{discount}} = ((await page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tfoot > tr.cart-discount.coupon-30-off-applied > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    await expect(page.locator(`div#order_review ul#shipping_method > li:nth-of-type(1) > label`).first()).toContainText(`Free shipping`);
    vars.taxPrice = ((await page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tfoot > tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tfoot > tr.order-total > td > strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').replace(',','').trim())
const discount = parseFloat(`${vars.discount}`.replace('$','').replace(',','').trim())
const taxPrice = parseFloat(`${vars.taxPrice}`.replace('$','').replace(',','').trim())
const total = parseFloat(`${vars.total}`.replace('$','').replace(',','').trim())
const total2 = parseFloat((unitPrice - discount + taxPrice).toFixed(2))

return total === total2
 }, vars)).toBeTruthy();
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#wcf-upsell-offer')

return element !== null && element !== undefined }, vars)) {
      await acceptUpsell(page, vars);
    }
    await page.waitForLoadState('load');
    await page.locator(`xpath=//span[contains(text(), "Close this window")]`).or(page.locator(`a[href="#"] > .elementor-button-content-wrapper > .elementor-button-text`)).filter({ visible: true }).first().click({ force: true });
    await checkOrderOnMyAccount(page, vars);
  });

  test('02 - Place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await loginAdmin(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`table.woocommerce_order_items > tbody[id="order_line_items"] > tr.item:nth-of-type(1) > td.name > a.wc-order-item-name`).first()).toContainText(`Fit Sweet Ice Cream Mix - Chocolate`);
    await expect(page.locator(`table.woocommerce_order_items > tbody[id="order_line_items"] > tr.item:nth-of-type(2) > td.name > a.wc-order-item-name`).first()).toContainText(`Fit Sweet Ice Cream Mix - ${vars.flavor ?? ''}`);
    vars.salePrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').replace(',','').trim())
const discount = parseFloat(`${vars.discount}`.replace('$','').replace(',','').trim())

const amount = unitPrice - discount;
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
const subtotal = usdFormatter.format(amount);

return subtotal }, vars);
    await expect(page.locator(`tr.item:nth-of-type(1) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.salePrice ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(2) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.upsellPrice ?? ''}`);
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.discount ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(5) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('03 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Order confirmation & bonus! Order #${vars.orderNumber ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item:nth-of-type(1) > td.td:nth-of-type(1)`).first()).toContainText(`Fit Sweet Ice Cream Mix - Chocolate`);
    await expect(page.locator(`tr.order_item:nth-of-type(1) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.upsellPrice !== '') {
      await expect(page.locator(`tr.order_item:nth-of-type(2) > td.td:nth-of-type(1)`).first()).toContainText(`Fit Sweet Ice Cream Mix - ${vars.flavor ?? ''}`);
    }
    if (vars.upsellPrice !== '') {
      await expect(page.locator(`tr.order_item:nth-of-type(2) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.upsellPrice ?? ''}`);
    }
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.discount ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td.td`).first()).toHaveText(`Free shipping (3-8 days)`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(5) > td.td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(6) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) > div > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > div > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  });

  test('04 - Refund by Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await loginAdmin(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
    if (vars.upsellPrice !== '') {
      await refundUpsell(page, vars);
    }
    await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const quantityElements = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>('div#woocommerce-order-items tbody#order_line_items > tr:nth-of-type(1) > td.quantity > div.view'));
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
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    vars.refund1 = ((await page.locator(`tr.refund:nth-of-type(1) > td.line_cost > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.refund2 = ((await page.locator(`tr.refund:nth-of-type(2) > td.line_cost > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const refund1 = parseFloat(`${vars.refund1}`.replace('$','').replaceAll(',','').replace('-','').trim())
const refund2 = parseFloat(`${vars.refund2}`.replace('$','').replaceAll(',','').replace('-','').trim())
const total = parseFloat(`${vars.total}`.replace('$','').replaceAll(',','').replace('-','').trim())

const total2 = parseFloat((refund1 + refund2).toFixed(2))

return total === total2
 }, vars)).toBeTruthy();
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`li.note.system-note:nth-of-type(4) > .note_content > p`)).not.toHaveCount(0);
    if (vars.upsellPrice !== '') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const pattern = new RegExp(`CartFlows Offer Refund & Refund ID : re_[a-zA-Z0-9]+`);
    return pattern.test(note);
}


// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
    }
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const pattern = new RegExp(`Transaction ID : re_[a-zA-Z0-9]+`);
    return pattern.test(note);
}


// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
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
      await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  });

});
