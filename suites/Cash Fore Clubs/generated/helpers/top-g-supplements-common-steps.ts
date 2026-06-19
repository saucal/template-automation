// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Top G supplements common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, extractUserFromEmail, uRLOfCurrentPage } from './common-steps-for-all-projects';

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

// GI: "Admin login" (6764ac53cce3ff20fb52732f)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.orderLink ?? ''}`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).first().fill(`${vars.admin ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.admin ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Calculate bulk discount" (6761ffeb7a599a5bc84b7288)
export async function calculateBulkDiscount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let qty = document.querySelector<HTMLInputElement>("input.qty").getAttribute("value");
qty = parseInt(qty);
return qty == 2; }, vars)) {
    vars.bulkDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let bulk;
let unitPrice = `${vars.unitPrice}`;
unitPrice = unitPrice.slice(1);
unitPrice = parseFloat(unitPrice);
//let qty = document.querySelector<HTMLInputElement>("input.qty").getAttribute("value");
qty = parseInt(`${vars.quantity}`);
let subTotal = unitPrice * qty;
bulk = Math.round(subTotal/10)
return bulk;
 }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let qty = document.querySelector<HTMLInputElement>("input.qty").getAttribute("value");
qty = parseInt(qty);
return qty > 2; }, vars)) {
    vars.bulkDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let bulk;
let unitPrice = `${vars.unitPrice}`;
unitPrice = unitPrice.slice(1);
unitPrice = parseFloat(unitPrice);
//let qty = document.querySelector<HTMLInputElement>("input.qty").getAttribute("value");
qty = parseInt(`${vars.quantity}`);
let subTotal = unitPrice * qty;
bulk = (subTotal/20).toFixed(2);
return bulk;
 }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let bulk = document.querySelector<HTMLTableRowElement>("tr.cart-discount > td > .woocommerce-Price-amount.amount ");
return bulk == null; }, vars)) {
    vars.bulkDiscount = `0.00`;
  }
}

// GI: "Calculate total" (6762f20dcce3ff20fb0a4c4b)
export async function calculateTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); if(`${vars.shippingCost}` == "Free shipping"){
    shippingCost = 0.00;
}else{ shippingCost = `${vars.shippingCost}`.slice(1)};
shippingCost = parseFloat(shippingCost);
let subTotal = `${vars.subTotal}`;
let subtotalPrice = `${vars.subtotalPrice}`;

subTotal = subTotal.length ? parseFloat(subTotal) : parseFloat(subtotalPrice);
console.log('Subtotal: ', subTotal);
let taxCost = `${vars.taxCost}`.slice(1);
taxCost = parseFloat(taxCost);
let total = subTotal + shippingCost + taxCost - vars.bulkDiscount
return total;

 }, vars);
}

// GI: "Check order on backend" (6764afd8cce3ff20fb52cb06)
export async function checkOrderOnBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let textCc = document.querySelector('.woocommerce-order-data__meta').textContent;
textCc = textCc.slice(6,29);
return textCc == "Payment via Credit card"; }, vars)).toBeTruthy();
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.billingStreet ?? ''}
${vars.billingCity ?? ''}, ${vars.billingStateShort ?? ''} ${vars.billingZip ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.shippingStreet ?? ''}
${vars.optionalAddress ?? ''}
${vars.shippingCity ?? ''}, ${vars.shippingStateShort ?? ''} ${vars.shippingZip ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-child(2) > div:nth-child(2) > p:nth-child(2) > a`).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.shippingCost = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingCost}`
if (shippingPrice.includes("Free")){
    shippingPrice = "$0.00";
};
return shippingPrice }, vars);
  await expect(page.locator(`.shipping > td:nth-child(2) > div.view:nth-child(1)`).first()).toContainText(`${vars.shippingText ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingCost ?? ''}`);
  await expect(page.locator(`div.wc-order-data-row:not(.wc-order-refund-items) > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$${vars.subTotal ?? ''}`);
  vars.bulkDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let discount = parseInt(vars.bulkDiscount);
return discount.toFixed(2); }, vars);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$${vars.bulkDiscount ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingCost ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$${vars.total ?? ''}`);
}

// GI: "Check order on Email  (Copy)" (6769a8d3cce3ff20fba5c9c6)
export async function checkOrderOnEmailCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractUsernameCopy(page, vars);
  try {
    await expect(page.locator(`#header_wrapper > h1`).first()).toContainText(`Thank you for your order`);
  } catch { /* optional step: assertTextPresent */ }
  try {
    await expect(page.locator(`.td > tbody > tr > td:nth-child(1)`).first()).toContainText(`${vars.productName ?? ''}`);
  } catch { /* optional step: assertTextPresent */ }
  try {
    await expect(page.locator(`.td > tbody > tr > td:nth-child(2)`).first()).toContainText(`${vars.quantity ?? ''}`);
  } catch { /* optional step: assertTextPresent */ }
  try {
    await expect(page.locator(`.td > tbody > tr > td:nth-child(3)`).first()).toHaveText(`$${vars.total ?? ''}`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`tfoot > tr:nth-child(1) > td`).first()).toHaveText(`$${vars.total ?? ''}`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`tfoot > tr:nth-child(2) > td`).first()).toContainText(`${vars.shippingText ?? ''}`);
  } catch { /* optional step: assertTextPresent */ }
  try {
    await expect(page.locator(`tfoot > tr:nth-child(3) > td`).first()).toContainText(`${vars.tax ?? ''}`);
  } catch { /* optional step: assertTextPresent */ }
  try {
    await expect(page.locator(`tfoot > tr:nth-child(4) > td`).first()).toContainText(`Credit Card`);
  } catch { /* optional step: assertTextPresent */ }
  try {
    await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.total ?? ''}`);
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`tbody > tr > td:nth-child(1) > .address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.billingStreet ?? ''}
${vars.address2 ?? ''}
${vars.billingCity ?? ''}, ${vars.billingStateShort ?? ''} ${vars.billingZip ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
}

// GI: "Close modal" (675cc6d37a599a5bc8c00889)
export async function closeModal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let form = document.querySelector<HTMLFormElement>('#slf-form').checkVisibility();
return form; }, vars)) {
    await page.locator(`div.elements > div:nth-child(5) > button.slf-button > p`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Extract shipping cost" (6761f85b7a599a5bc84a82e8)
export async function extractShippingCost(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shipping = document.querySelector<HTMLTableRowElement>("tr.topg-checkout-shipping > td").textContent.trim();
//let shippingText = document.querySelector<HTMLTableRowElement>("tr.topg-checkout-shipping > td").textContent.trim();

return shipping == "Free shipping"
 }, vars)) {
    vars.shippingCost = `Free shipping`;
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector<HTMLTableRowElement>("tr.topg-checkout-shipping > td > .woocommerce-Price-amount.amount") != null; }, vars)) {
    vars.shippingCost = ((await page.locator(`tr.topg-checkout-shipping > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
}

// GI: "Extract username (Copy)" (6769b9c3e039f5ae2553ae39)
export async function extractUsernameCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const email = `${vars.email}`;
let extractedUserName = email.slice(0,26);
console.log(extractedUserName);
return extractedUserName; }, vars);
}

// GI: "Fill billing information" (676065b5e7eba6ef02a43164)
export async function fillBillingInformation(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#billing_email_confirm`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email_confirm`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_address_1`).first().fill(`${vars.billingStreet ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.billingStreet ?? ''}`); }
  try { await page.locator(`#billing_state`).first().fill(`${vars.billingStateShort ?? ''}`); } catch { await page.locator(`#billing_state`).first().selectOption(`${vars.billingStateShort ?? ''}`); }
  try { await page.locator(`#billing_city`).first().fill(`${vars.billingCity ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.billingCity ?? ''}`); }
  try { await page.locator(`#billing_postcode`).first().fill(`${vars.billingZip ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.billingZip ?? ''}`); }
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
}

// GI: "Fill credit card info" (676068e47a599a5bc8036dcb)
export async function fillCreditCardInfo(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    try { await page.locator(`#authnet-card-number-toSkip`).first().fill(`${vars.creditCard ?? ''}`); } catch { await page.locator(`#authnet-card-number-toSkip`).first().selectOption(`${vars.creditCard ?? ''}`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`#authnet-card-expiry-toSkip`).first().fill(`01/27`); } catch { await page.locator(`#authnet-card-expiry-toSkip`).first().selectOption(`01/27`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`#authnet-card-cvc-toSkip`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`#authnet-card-cvc-toSkip`).first().selectOption(`${vars.cvv ?? ''}`); }
  } catch { /* optional step: assign */ }
  {
    const _lbl = page.locator(`label[for="authnet-card-number"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#authnet-card-number`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#authnet-card-number`).first().fill(`${vars.creditCard ?? ''}`); } catch { await page.locator(`#authnet-card-number`).first().selectOption(`${vars.creditCard ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="authnet-card-expiry"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#authnet-card-expiry`).filter({ visible: true }).first().click({ force: true }); }
  }
  // TODO: unknown keypress value="48"
  await page.locator(`#authnet-card-expiry`).first().press('48');
  // TODO: unknown keypress value="49"
  await page.locator(`#authnet-card-expiry`).first().press('49');
  // TODO: unknown keypress value="50"
  await page.locator(`#authnet-card-expiry`).first().press('50');
  // TODO: unknown keypress value="57"
  await page.locator(`#authnet-card-expiry`).first().press('57');
  {
    const _lbl = page.locator(`label[for="authnet-card-cvc"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#authnet-card-cvc`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#authnet-card-cvc`).first().fill(`100`); } catch { await page.locator(`#authnet-card-cvc`).first().selectOption(`100`); }
}

// GI: "Fill shipping information" (67606750e7eba6ef02a461b7)
export async function fillShippingInformation(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#shipping_address_1`).first().fill(`${vars.shippingStreet ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.shippingStreet ?? ''}`); }
  try { await page.locator(`#shipping_address_2`).first().fill(`${vars.optionalAddress ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.optionalAddress ?? ''}`); }
  try { await page.locator(`#shipping_city`).first().fill(`${vars.shippingCity ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.shippingCity ?? ''}`); }
  try { await page.locator(`#shipping_state`).first().fill(`${vars.shippingStateShort ?? ''}`); } catch { await page.locator(`#shipping_state`).first().selectOption(`${vars.shippingStateShort ?? ''}`); }
  try { await page.locator(`#shipping_postcode`).first().fill(`${vars.shippingZip ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.shippingZip ?? ''}`); }
}

// GI: "Get order number from URL" (67634a54cce3ff20fb176f84)
export async function getOrderNumberFromURL(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await uRLOfCurrentPage(page, vars);
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href;
let part = url.split('/');
let orderNumber = part[5];
return orderNumber; }, vars);
  vars.baseUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return baseUrl = window.location.protocol + "//" + window.location.host }, vars);
  vars.orderLink = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let orderLink = `${vars.baseUrl}/wp-admin/post.php?post=${vars.orderNumber}&action=edit`
console.log(orderLink)
return orderLink; }, vars);
  try {
    vars.orderSelector = `a [href="${vars.orderLink ?? ''}"] > strong`;
  } catch { /* optional step: store */ }
}

// GI: "Place order" (6762f5d4cce3ff20fb0b2555)
export async function placeOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`#place_order`).first()).toBeVisible();
  {
    const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Refund by Admin" (67c84273c4c19f03efa34b6a)
export async function refundByAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`PayPal refund ID:`);
  }
}

// GI: "Refund Email" (67c84273c4f6da836cc0d72d)
export async function refundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
}

// GI: "Thank you page validation" (67634911cce3ff20fb174c9e)
export async function thankYouPageValidation(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`section > h1`).first()).toContainText(`Your Order has been Received`);
  await expect(page.locator(`section > a.button`).first()).toContainText(`Back to Home`);
  await getOrderNumberFromURL(page, vars);
}

// GI: "Validate order in account" (67658e0ff569292e70a9119f)
export async function validateOrderInAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`div:nth-child(3) > div.order-header > a`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await expect(page.locator(`td > a`).first()).toContainText(`${vars.productName ?? ''}`);
  await expect(page.locator(`td >span > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tfoot >tr:nth-child(2) > td > span`).first()).toHaveText(`${vars.shippingCost ?? ''}`);
  await expect(page.locator(`tfoot >tr:nth-child(3) > td > span`).first()).toHaveText(`${vars.taxCost ?? ''}`);
  try {
    await expect(page.locator(`tfoot >tr:nth-child(4) > td`).first()).toContainText(`Credit card`);
  } catch { /* optional step: assertTextPresent */ }
  await expect(page.locator(`tfoot >tr:nth-child(5) > td > span`).first()).toHaveText(`$${vars.total ?? ''}`);
}
