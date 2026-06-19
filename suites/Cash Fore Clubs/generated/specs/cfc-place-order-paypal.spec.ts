// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "CFC - Place order - PayPal"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail, login, payPalTemplate } from '../helpers/common-steps-for-all-projects';

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

test.describe('CFC - Place order - PayPal', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "site": "https://cashforeclubs-staging.mystagingwebsite.com/",
    "project": "cashForeClub",
    "city": "London",
    "county": "Greater London",
    "zipCode": "BR1 1DE",
    "phone": "4089211861",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Shipping Inc.",
    "street3": "30 Leicester Square",
    "street4": "5th Floor",
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "password": process.env.PASSWORD ?? '',
    "countryComplete": "United Kingdom (UK)",
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "£",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Test Inc.",
    "street": "30 Leicester Square",
    "street2": "Ap. 4",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - Guest user', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Shop page
    await page.locator(`.full-width > a.cg-menu-link.main-menu-link`).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All clubs")]`).or(page.locator(`a[href="/shop/"].cg-menu-link > span`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const firstProductTop = Array.from<any>(document.querySelectorAll(
  "ul.products > li.product-type-simple.instock"
))[0];

const firstLink = firstProductTop.querySelector("a");

if (firstLink) {
  firstLink.click();
} else {
  console.log("No product found in stock");
} }, vars);
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`button[type='button']#ppcp-axo-billing-email-submit-button`).or(page.locator(`xpath=//button[contains(text(),'Continue')]`)).filter({ visible: true }).first().click({ force: true });
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
    try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.county ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.county ?? ''}`); }
    await page.locator(`xpath=//li[contains(text(), "${vars.county ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
    if (false) {
      {
        const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (false) {
      try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    }
    if (false) {
      try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
    }
    if (false) {
      try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
    }
    if (false) {
      try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
    }
    if (false) {
      try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
    }
    if (false) {
      try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
    }
    if (false) {
      {
        const _lbl = page.locator(`label[for="select2-shipping_state-container"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#select2-shipping_state-container`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (false) {
      try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.county ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.county ?? ''}`); }
    }
    if (false) {
      await page.locator(`xpath=//li[contains(text(), "${vars.county ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    }
    if (false) {
      try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
    }
    try { await page.locator(`#order_comments`).first().fill(`Optional Order notes`); } catch { await page.locator(`#order_comments`).first().selectOption(`Optional Order notes`); }
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const shippingPrice = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

let total2 = subtotal + shippingPrice

return price === subtotal 
        && total2 === total }, vars)).toBeTruthy();
    await page.locator(`label[for="payment_method_ppcp-gateway"]`).filter({ visible: true }).first().click({ force: true });
    await payPalTemplate(page, vars);
    await blockUI(page, vars);
    vars.{{orderNumber}} = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.payPalUser ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.method > strong`).first()).toContainText(`PayPal`);
    await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} × 1`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`PayPal`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td`).first()).toContainText(`Optional Order notes`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.payPalUser ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
    await page.locator(`li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"][aria-label="View order number ${vars.orderNumber ?? ''}"]`).first()).toHaveText(`#${vars.orderNumber ?? ''}`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} × 1`);
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`PayPal`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td`).first()).toContainText(`Optional Order notes`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.payPalUser ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
  });

  test('02 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.payPalUser ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your Cash Fore Clubs order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.order-totals-subtotal > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr.order-totals-shipping > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr.order-totals-payment_method > td.td`).first()).toContainText(`PayPal`);
    await expect(page.locator(`tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr.order-customer-note > td.td`).first()).toContainText(`Optional Order notes`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.payPalUser ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}`);
  });

  test('03 - Place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`PayPal`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}${vars.phone ?? ''}`);
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}Email address:
${vars.email ?? ''}`);
    await expect(page.locator(`.order_note`).first()).toHaveText(`Customer provided note:
Optional Order notes`);
    await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('03 - Place order - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Refund by Admin
    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    if (vars.project === '2m') {
      await page.goto(`${vars.startUrl ?? ''}wp-admin`);
      await page.waitForLoadState('load');
    }
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
    if (vars.project === 'nopong') {
      await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`Refunded ${vars.total ?? ''}`);
    }
    if (vars.project === '2m') {
      await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Refunded ${vars.totalOrder ?? ''}`);
    }
    if (vars.project === 'cashForeClub') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Function to check for PayPal refund ID note in WooCommerce admin notes
function hasPayPalRefundNote() {
    // Select all note content paragraphs
    const notes = Array.from<any>(document.querySelectorAll('li.note.system-note > .note_content > p'));
    
    // Regular expression to match "PayPal refund ID:" followed by any alphanumeric string
    const refundIdPattern = /PayPal refund ID:\s*[A-Za-z0-9]+/;
    
    // Check each note for the pattern
    for (const note of notes) {
        if (refundIdPattern.test(note.textContent.trim())) {
            return true;
        }
    }
    
    return false;
}

return hasPayPalRefundNote() }, vars)).toBeTruthy();
    }
    // ↑ end 04 - Refund by Admin
  });

  test('03 - Place order - Refund - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Refund Email
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    if (vars.project === 'nopong') {
      await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    if (vars.project === 'cashForeClub') {
      await expect(page.locator(`tr.order-totals-refund > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    await expect(page.locator(`tbody > tr.order-totals-total > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tbody > tr.order-totals-total > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
    // ↑ end 05 - Refund Email
  });

});
