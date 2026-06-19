// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Hawk Ridge - Place order Backend + Email - CC"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { acceptCookies, adminLogin, checkOrderAndSubscriptionsOnMyAccount, extractUserFromEmail, fillCC, fillCheckout, thankYouPage } from '../helpers/hawk-ridge-common-steps';

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

test.describe('Hawk Ridge - Place order Backend + Email - CC', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "hawkRidge",
    "zipCode": "94102-5949",
    "country": "US",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}`,
    "street3": "298 Gough St",
    "street4": "5th Floor",
    "company2": "Shipping Inc.",
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "$",
    "password": process.env.PASSWORD ?? '',
    "orderNote": "Testing Note",
    "firstName": "QA",
    "company": "Test Inc.",
    "state": "CA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "payment": "stripe",
    "street": "1658 Market St",
    "poNumber": "321123123",
    "street2": "Ap. 4",
    "city": "San Francisco",
    "stateComplete": "California",
    "countryComplete": "United States (US)",
    "phone": "17412345678",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 12 - Simple product page
    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    await page.locator(`a[href="/product-category/3d-printers"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.swiper-carousel`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-simple.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    // ↑ end 12 - Simple product page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation')

return !element }, vars)) {
      await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(3) > .elementor-element.elementor-align-center.wc-cart-icon--yes.wc-cart-icon--cart-medium.wc-cart-badge--yes.elementor-widget.elementor-widget-global.elementor-widget-bdt-wc-mini-cart > .elementor-widget-container > .bdt-mini-cart-wrapper > a[href="#"].bdt-offcanvas-button.bdt-mini-cart-button > .bdt-mini-cart-inner > .bdt-mini-cart-button-icon > .bdt-cart-icon > i.ep-icon-cart`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > .bdt-mini-cart-products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents > .bdt-mini-cart-product-item.cart_item > div:nth-of-type(2) > .bdt-mini-cart-product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > .bdt-mini-cart-products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents > .bdt-mini-cart-product-item.cart_item > div:nth-of-type(2) > .bdt-mini-cart-product-price > .quantity > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-subtotal > div:nth-of-type(2) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-footer-buttons > a[href*="/checkout"].bdt-button.bdt-button-checkout > .bdt-button-text`).filter({ visible: true }).first().click({ force: true });
    await fillCheckout(page, vars);
    await expect(page.locator(`tr.cart_item > td.product-name`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = `${vars.unitPrice ?? ''}`;
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    if ('bundle' !== vars.product) {
      vars.shippingPrice = ((await page.locator(`#shipping_method > li > label > span > bdi`).or(page.locator(`#shipping_method > li > label`)).textContent()) ?? '').trim();
    }
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotal}`.replace('$','').replaceAll(',',''));
let shippingPrice
if (`${vars.shippingPrice}` !== '') {
    shippingPrice = parseFloat(`${vars.shippingPrice}`.replace('$','').replaceAll(',',''));
} else {
    shippingPrice = 0
}
const taxPrice = parseFloat(`${vars.taxPrice}`.replace('$','').replaceAll(',',''));
const total = parseFloat(`${vars.total}`.replace('$','').replaceAll(',',''));
const total2 = parseFloat((subtotal + taxPrice + shippingPrice).toFixed(2));

return total === total2 }, vars)).toBeTruthy();
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await thankYouPage(page, vars);
    await checkOrderAndSubscriptionsOnMyAccount(page, vars);
  });

  test('02 - Place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await adminLogin(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).or(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    if (vars.paymentMethod === 'Purchase Order') {
      await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`On hold`);
    }
    if (vars.paymentMethod !== 'Purchase Order') {
      await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    }
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
    await expect(page.locator(`.order_note`).first()).toHaveText(`Customer provided note:
${vars.orderNote ?? ''}`);
    await expect(page.locator(`tr:nth-child(1) a[href*="/wp-admin/post.php?post"]`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr:nth-child(1) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
    }
    if (vars.product !== 'bundle') {
      await expect(page.locator(`tr:nth-child(1) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.bundled_item:nth-child(2) a[href*="/wp-admin/post.php?post"]`).first()).toHaveText(`${vars.prodTitle1 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.item.bundled_item:nth-of-type(2) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice1 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.bundled_item:nth-child(3) a[href*="/wp-admin/post.php?post"]`).first()).toHaveText(`${vars.prodTitle2 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.item.bundled_item:nth-of-type(3) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice2 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.bundled_item:nth-child(4) a[href*="/wp-admin/post.php?post"]`).first()).toContainText(`${vars.prodTitle3 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.item.bundled_item:nth-of-type(4) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice3 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.bundled_item:nth-child(5) a[href*="/wp-admin/post.php?post"]`).first()).toContainText(`${vars.prodTitle4 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.item.bundled_item.last > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice4 ?? ''}`);
    }
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    if (vars.product !== 'bundle') {
      await expect(page.locator(`div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(2) > td.total > span > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    }
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:last-child > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    if (vars.paymentMethod === 'Purchase Order') {
      {
        const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`xpath=//span[contains(text(), "On hold")]`).or(page.locator(`#select2-order_status-container`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.paymentMethod === 'Purchase Order') {
      {
        const _lbl = page.locator(`label[for="select2-order_status-result-0vvp-wc-completed"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`xpath=//li[contains(text(), "Completed")]`).or(page.locator(`#select2-order_status-result-0vvp-wc-completed`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.paymentMethod === 'Purchase Order') {
      await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
    }
  });

  test('03 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item:nth-child(1) div.yaymail-product-name`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-child(1) .yaymail_item_price_content > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(2) .yaymail-product-name`).first()).toContainText(`${vars.prodTitle1 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(3) .yaymail-product-name`).first()).toContainText(`${vars.prodTitle2 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(4) .yaymail-product-name`).first()).toContainText(`${vars.prodTitle3 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(5) .yaymail-product-name`).first()).toContainText(`${vars.prodTitle4 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(2) > .yaymail_item_price_content .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice1 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(3) .yaymail_item_price_content .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice2 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(4) .yaymail_item_price_content .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice3 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(5) .yaymail_item_price_content .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice4 ?? ''}`);
    }
    await expect(page.locator(`tfoot .yaymail-order-detail-row-cart_subtotal  span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-tax  span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tfoot .yaymail-order-detail-row-payment_method > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-order_total > td > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-order_note > td`).first()).toContainText(`${vars.orderNote ?? ''}`);
    await expect(page.locator(`td.yaymail-billing-address-column > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td.yaymail-shipping-address-column > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  });

  test('04 - Refund by Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await adminLogin(page, vars);
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
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).or(page.locator(`button[type="button"].button.button-primary > .wc-order-refund-amount > .woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).or(page.locator(`button[type="button"].button.button-primary > .wc-order-refund-amount > .woocommerce-Price-amount.amount`)).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    if (vars.paymentMethod !== 'Purchase Order') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = new RegExp(`Refunded ${total} – Refund ID: re_[a-zA-Z0-9]+ – Reason: Testing Refund`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
    }
  });

  test('05 - Refund Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-refund_0 > td > span`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-order_total > td > del`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-order_total > td > ins > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  });

  test('06 - Place order - Logged User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.savedCC = `yes`;
    vars.shippingPrice = ``;
    vars.taxPrice = ``;
    vars.logged = `yes`;
    await acceptCookies(page, vars);
    await page.goto(`${vars.startUrl ?? ''}my-account`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/my-account/lost-password"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toHaveText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Password Reset Request')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Click here to reset your password')]`).or(page.locator(`div > p:nth-of-type(2) > span > a`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toHaveText(`Your password has been reset successfully.`);
    await expect(page.locator(`.woocommerce-MyAccount-content-wrapper`)).not.toHaveCount(0);
    // ↓ 10 - Variable product page
    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`div[data-ep-wrapper-link*="store"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    await page.locator(`a[href="/product-category/software"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.swiper-carousel`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-variable.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`.variations select:nth-of-type(1) > option[selected]`).or(page.locator(`h1.product_title`)).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="license-type"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#license-type`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#license-type > option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-Price-amount > bdi`)).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#license-type') }, vars)) {
      vars.licenseType = ((await page.locator(`#license-type`).textContent()) ?? '').trim();
    }
    // ↑ end 10 - Variable product page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation')

return !element }, vars)) {
      await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(3) > .elementor-element.elementor-align-center.wc-cart-icon--yes.wc-cart-icon--cart-medium.wc-cart-badge--yes.elementor-widget.elementor-widget-global.elementor-widget-bdt-wc-mini-cart > .elementor-widget-container > .bdt-mini-cart-wrapper > a[href="#"].bdt-offcanvas-button.bdt-mini-cart-button > .bdt-mini-cart-inner > .bdt-mini-cart-button-icon > .bdt-cart-icon > i.ep-icon-cart`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > .bdt-mini-cart-products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents > .bdt-mini-cart-product-item.cart_item > div:nth-of-type(2) > .bdt-mini-cart-product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > .bdt-mini-cart-products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents > .bdt-mini-cart-product-item.cart_item > div:nth-of-type(2) > .bdt-mini-cart-product-price > .quantity > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-subtotal > div:nth-of-type(2) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-footer-buttons > a[href*="/checkout"].bdt-button.bdt-button-checkout > .bdt-button-text`).filter({ visible: true }).first().click({ force: true });
    await fillCheckout(page, vars);
    await expect(page.locator(`tr.cart_item > td.product-name`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = `${vars.unitPrice ?? ''}`;
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const product = `${vars.product}`
const element = document.querySelector('#shipping_method > li > label')

return 'bundle' !== product && !!element }, vars)) {
      vars.shippingPrice = ((await page.locator(`#shipping_method > li > label > span > bdi`).or(page.locator(`#shipping_method > li > label`)).textContent()) ?? '').trim();
    }
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotal}`.replace('$','').replaceAll(',',''));
let shippingPrice
if (`${vars.shippingPrice}` !== '') {
    shippingPrice = parseFloat(`${vars.shippingPrice}`.replace('$','').replaceAll(',',''));
} else {
    shippingPrice = 0
}
const taxPrice = parseFloat(`${vars.taxPrice}`.replace('$','').replaceAll(',',''));
const total = parseFloat(`${vars.total}`.replace('$','').replaceAll(',',''));
const total2 = parseFloat((subtotal + taxPrice + shippingPrice).toFixed(2));

return total === total2 }, vars)).toBeTruthy();
    if ((() => { const savedCC = vars.savedCC

return savedCC !== '' })()) {
      await fillCC(page, vars);
    }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await thankYouPage(page, vars);
    await checkOrderAndSubscriptionsOnMyAccount(page, vars);
  });

  test('07 - Place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await adminLogin(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).or(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    if (vars.paymentMethod === 'Purchase Order') {
      await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`On hold`);
    }
    if (vars.paymentMethod !== 'Purchase Order' && vars.shippingPrice !== '') {
      await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    }
    if (vars.paymentMethod !== 'Purchase Order' && vars.shippingPrice === '') {
      await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
    }
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
    await expect(page.locator(`.order_note`).first()).toHaveText(`Customer provided note:
${vars.orderNote ?? ''}`);
    await expect(page.locator(`tr:nth-child(1) a[href*="/wp-admin/post.php?post"]`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr:nth-child(1) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
    }
    if (vars.product !== 'bundle') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all price <bdi> elements
const priceElements = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>('tr > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi'));

let total = 0;
const prices = [];

priceElements.forEach(el => {
  const text = el.innerText.trim(); // e.g., "$1,999.99"
  
  // Remove $ and commas, then convert to number
  const value = parseFloat(text.replace(/[$,]/g, ''));
  
  if (!isNaN(value)) {
    prices.push(value);
    total += value;
  }
});

console.log('Individual prices:', prices);
console.log('Total sum:', total);
console.log('Formatted total: $' + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));


return `${vars.unitPrice}` === '$' + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }, vars)).toBeTruthy();
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.bundled_item:nth-child(2) a[href*="/wp-admin/post.php?post"]`).first()).toHaveText(`${vars.prodTitle1 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.item.bundled_item:nth-of-type(2) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice1 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.bundled_item:nth-child(3) a[href*="/wp-admin/post.php?post"]`).first()).toHaveText(`${vars.prodTitle2 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.item.bundled_item:nth-of-type(3) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice2 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.bundled_item:nth-child(4) a[href*="/wp-admin/post.php?post"]`).first()).toContainText(`${vars.prodTitle3 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.item.bundled_item:nth-of-type(4) > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice3 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.bundled_item:nth-child(5) a[href*="/wp-admin/post.php?post"]`).first()).toContainText(`${vars.prodTitle4 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.item.bundled_item.last > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice4 ?? ''}`);
    }
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    if (vars.product !== 'bundle' && vars.shippingPrice !== '') {
      await expect(page.locator(`div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(2) > td.total > span > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    }
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:last-child > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    if (vars.paymentMethod === 'Purchase Order') {
      {
        const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`xpath=//span[contains(text(), "On hold")]`).or(page.locator(`#select2-order_status-container`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.paymentMethod === 'Purchase Order') {
      {
        const _lbl = page.locator(`label[for="select2-order_status-result-0vvp-wc-completed"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`xpath=//li[contains(text(), "Completed")]`).or(page.locator(`#select2-order_status-result-0vvp-wc-completed`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.paymentMethod === 'Purchase Order') {
      await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
    }
  });

  test('08 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "order is now complete")]`).or(page.locator(`xpath=//a[contains(text(), "order has been received!")]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item:nth-child(1) div.yaymail-product-name`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-child(1) .yaymail_item_price_content > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(2) .yaymail-product-name`).first()).toContainText(`${vars.prodTitle1 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(3) .yaymail-product-name`).first()).toContainText(`${vars.prodTitle2 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(4) .yaymail-product-name`).first()).toContainText(`${vars.prodTitle3 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(5) .yaymail-product-name`).first()).toContainText(`${vars.prodTitle4 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(2) > .yaymail_item_price_content .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice1 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(3) .yaymail_item_price_content .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice2 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(4) .yaymail_item_price_content .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice3 ?? ''}`);
    }
    if (vars.product === 'bundle') {
      await expect(page.locator(`tr.order_item:nth-child(5) .yaymail_item_price_content .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice4 ?? ''}`);
    }
    await expect(page.locator(`tfoot .yaymail-order-detail-row-cart_subtotal  span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-tax  span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tfoot .yaymail-order-detail-row-payment_method > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-order_total > td > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr.yaymail-order-detail-row-order_note > td`).first()).toContainText(`${vars.orderNote ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  });

});
