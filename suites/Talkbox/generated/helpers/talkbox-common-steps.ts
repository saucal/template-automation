// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Talkbox - Common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, extractUserFromEmail, placeOrderElement, subscriptionMenu } from './common-steps-for-all-projects';

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

// GI: "03 - Place order - Email" (67c89cabc4f6da836ce1bf00)
export async function _03PlaceOrderEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Your Order Is In!")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(1).order_item > td.td:nth-of-type(1)`).first()).toContainText(`Current Box Shipment: The Snacks & Kitchen Box

Bundle: 4 Boxes

Delivery Pacing: 1 Box Every 2 months`);
  await expect(page.locator(`tr:nth-of-type(2).order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(4).order_item > td.td:nth-of-type(1)`).or(page.locator(`tr:nth-of-type(3).order_item > td.td:nth-of-type(1)`)).first()).toContainText(`${vars.prod_desc3 ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(3).order_item > td.td:nth-of-type(1)`).first()).toContainText(`Consistency Crew Membership (renews monthly)`);
  }
  await expect(page.locator(`tr:nth-of-type(1).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(2).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(4).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).or(page.locator(`tr:nth-of-type(3).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(3).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.ccPrice ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  await expect(page.locator(`tfoot > tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(4) > td.td`).first()).toContainText(`card - 4242`);
  await expect(page.locator(`tfoot > tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(6) > td.td`).first()).toContainText(`Order Note for Testing this field`);
  await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toContainText(`Billing Address
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toContainText(`Shipping Address
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
}

// GI: "03 - Place order - Email renewal" (67c8a55dc4c19f03efbd1944)
export async function _03PlaceOrderEmailRenewal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "Your Order Is In!")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(1).order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.discount ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(5) > td.td`).first()).toContainText(`Credit card / debit card - 4242`);
  await expect(page.locator(`tr:nth-of-type(6) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(7) > td.td`).first()).toContainText(`Order Note for Testing this field`);
  await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
}

// GI: "04 - Refund by Admin" (67c89cacc4c19f03efbb9336)
export async function _04RefundByAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    await refundUpsell(page, vars);
  }
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const quantityElements = Array.from<any>(
  document.querySelectorAll<HTMLTableElement>('div:not(.wfocu-admin-offers-refund) > table tbody#order_line_items > tr > td.quantity > div.view')
).filter(el => !el.querySelector('small.refunded'));

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
  vars.total2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice2 = parseFloat(`${vars.unitPrice2}`.replace('$','')) * 1.0825
const total = parseFloat(`${vars.total}`.replace('$',''))
const total2 = (total - unitPrice2).toFixed(2)

return '$'+total2
 }, vars);
  await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total2 ?? ''}`);
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toBeVisible();
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

// GI: "05 - Refund Email" (67c89cacc4f6da836ce1bf1f)
export async function _05RefundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  if (vars.project === 'nopong') {
    await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  }
  if (vars.project === 'cashForeClub') {
    await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
}

// GI: "Add CC product" (69136622638b729792d1c5bc)
export async function addCCProduct(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}crew/`);
  await page.waitForLoadState('load');
  vars.CCrew = `yes`;
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('#joincrew > div.alignnone.wp-block-kadence-rowlayout:nth-of-type(4) > .kt-has-3-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap:nth-of-type(3) > a.kb-button.kt-button.button.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn > .kt-btn-inner-text')

return !!element }, vars)) {
    vars.ccPrice = ((await page.locator(`#joincrew > div.alignnone.wp-block-kadence-rowlayout:nth-of-type(4) > .kt-has-3-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap:nth-of-type(3) > a.kb-button.kt-button.button.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn > .kt-btn-inner-text`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('#joincrew > div.alignnone.wp-block-kadence-rowlayout:nth-of-type(4) > .kt-has-3-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap:nth-of-type(3) > a[href*="/checkout/?add-to-cart=683882"].kb-button.kt-button.button.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn > .kt-btn-inner-text')
return !!element }, vars)) {
    await page.locator(`#joincrew > div.alignnone.wp-block-kadence-rowlayout:nth-of-type(4) > .kt-has-3-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap:nth-of-type(3) > a[href*="/checkout/?add-to-cart=683882"].kb-button.kt-button.button.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn > .kt-btn-inner-text`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.ccPrice !== '') {
    vars.ccPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const ccPrice = `${vars.ccPrice}`

let result = ccPrice.match(/\d+\.*\d*/g)

result = '$' + (parseFloat(result[0])).toFixed(2)

return result
 }, vars);
  }
  if (vars.ccPrice === '') {
    vars.ccPrice = `$47.00`;
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('#joincrew > div.alignnone.wp-block-kadence-rowlayout:nth-of-type(4) > .kt-has-3-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap:nth-of-type(3) > a.kb-button.kt-button.button.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn > .kt-btn-inner-text')
return !!element }, vars)) {
    await page.locator(`#joincrew > div.alignnone.wp-block-kadence-rowlayout:nth-of-type(4) > .kt-has-3-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap:nth-of-type(3) > a.kb-button.kt-button.button.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn > .kt-btn-inner-text`).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('#joincrew > div.alignnone.wp-block-kadence-rowlayout:nth-of-type(4) > .kt-has-3-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap:nth-of-type(3) > a.kb-button.kt-button.button.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn > .kt-btn-inner-text')
return !element }, vars)) {
    await page.goto(`${vars.startUrl ?? ''}checkout/?add-to-cart=683882`);
    await page.waitForLoadState('load');
  }
}

// GI: "Admin Login" (69136035638b729792d06142)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).or(page.locator(`#username`)).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`#username`)).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
let admin = `${vars.admin}`
return element != null && element != undefined && admin === "yes" }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try {
    await expect(page.locator(`#adminmenumain`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
}

// GI: "Check Order and Subscriptions on My Account" (69134b99638b729792cc9e82)
export async function checkOrderAndSubscriptionsOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = Array.from<any>(document.querySelectorAll('body > div.woofunnels-container.wflp-canvas.wffn-page-template > div:nth-child(1) > div > div > div.bwf-inner-col > div.bwf-section-wrap > div > div > h6.bwf-adv-heading.bwf-width-default'))[0].innerText.split('#')[1]

return elem }, vars);
  await expect(page.locator(`p.bwf-adv-heading > strong`).first()).toContainText(`${vars.email ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div:nth-child(1) > div > div.wfty_p_name > a > span'))[0].innerText.split('\n')[0]

return elem === `${vars.language} - The Snacks & Kitchen Box` }, vars)).toBeTruthy();
  await expect(page.locator(`a[href*="/product/use-spanish-at-home/"] > span`).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    await expect(page.locator(`a[href*="/product/power-practice-planner/"] > span`).first()).toContainText(`${vars.prod_desc3 ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew
return CCrew !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(1) > div > div > div.bwf-inner-col > div > div > div > div > div > div > div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div:nth-child(1) > a > div.wfty_rightDiv > span`)).first()).toHaveText(`${vars.subPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew
return CCrew !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(1) > div > div > div.bwf-inner-col > div > div > div > div > div > div > div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div:nth-child(3) > div.wfty_rightDiv > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    vars.unitPrice2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice2 = `${vars.unitPrice2}`
unitPrice2 = Number(unitPrice2.replace(",","").replace(`${vars.Symbol}`,""));

const priceWOTax = (unitPrice2 / 1.0825).toFixed(2)

return `${vars.Symbol}`+priceWOTax
 }, vars);
  }
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    await expect(page.locator(`div:nth-child(1) > div > div > div.bwf-inner-col > div > div > div > div > div > div > div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div:nth-child(4) > div.wfty_rightDiv > span`).first()).toContainText(`${vars.unitPrice2 ?? ''}`);
  }
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice2 = `${vars.unitPrice2}`
unitPrice2 = Number(unitPrice2.replace(",","").replace(`${vars.Symbol}`,""));

let subtotalPrice = `${vars.subtotalPrice}`
subtotalPrice = Number(subtotalPrice.replace(",","").replace(`${vars.Symbol}`,""));

subtotalPrice = (subtotalPrice + unitPrice2).toFixed(2)

return `${vars.Symbol}`+subtotalPrice
 }, vars);
  }
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    vars.taxPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice2 = `${vars.unitPrice2}`
unitPrice2 = Number(unitPrice2.replace(",","").replace(`${vars.Symbol}`,""));

let taxPrice = `${vars.taxPrice}`
taxPrice = Number(taxPrice.replace(",","").replace(`${vars.Symbol}`,""));

let taxPrice2 = Math.round(unitPrice2 * 8.25) / 100

taxPrice = (taxPrice + taxPrice2).toFixed(2)

return `${vars.Symbol}`+taxPrice
 }, vars);
  }
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotalPrice = `${vars.subtotalPrice}`
subtotalPrice = Number(subtotalPrice.replace(",","").replace(`${vars.Symbol}`,""));

let taxPrice = `${vars.taxPrice}`
taxPrice = Number(taxPrice.replace(",","").replace(`${vars.Symbol}`,""));


let total2 = (subtotalPrice + taxPrice).toFixed(2)


return `${vars.Symbol}`+total2
 }, vars);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr:nth-of-type(2) > td`)).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  vars.subscriptionID = ((await page.locator(`tbody > tr:nth-child(1) > td.subscription-id > a[href*="/account/view-subscription"]`).textContent()) ?? '').trim();
  await expect(page.locator(`tbody > tr:nth-child(1) > td.subscription-id > small`).first()).toContainText(`Active`);
  vars.nextPayment = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tbody > tr:nth-child(1) > td.subscription-total.order-total').innerText

  const text = element.toLowerCase();

  // 1. Explicit "no more payments" / prepaid cases → no recurring charge
  if (
    text.includes('no more payments')
  ) {
    return null; // No future billing
  }

  // 2. Look for "every X months" or "every month"
  const match = element.match(/every\s+([0-9]+|\w+)\s+months?/i);

  if (!match) {
    return null; // Could not detect a recurring interval
  }

  let monthsToAdd;

  if (match[1] === 'month') {
    monthsToAdd = 1;                    // "every month" or "every a month"
  } else {
    monthsToAdd = parseInt(match[1], 10);
    if (isNaN(monthsToAdd)) return null;
  }

  // 3. Calculate next date from today
  const next = new Date();
  next.setMonth(next.getMonth() + monthsToAdd);

  // 4. Return formatted string exactly like "August 5, 2026"
  return next.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
 }, vars);
  await expect(page.locator(`tbody > tr:nth-child(1) > td.subscription-next-payment`).first()).toHaveText(`${vars.nextPayment ?? ''}`);
  await expect(page.locator(`tbody > tr:nth-child(1) > td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.subscriptionID2 = ((await page.locator(`tbody > tr:nth-child(2) > td.subscription-id > a[href*="/account/view-subscription"]`).textContent()) ?? '').trim();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tbody > tr:nth-child(2) > td.subscription-id > small`).first()).toContainText(`Active`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.nextPayment2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tbody > tr:nth-child(2) > td.subscription-total.order-total').innerText

  const text = element.toLowerCase();

  // 1. Explicit "no more payments" / prepaid cases → no recurring charge
  if (
    text.includes('no more payments')
  ) {
    return null; // No future billing
  }

  // 2. Look for "every X months" or "every month"
  const match = element.match(/every\s+([0-9]+|\w+)\s+months?/i);

  if (!match) {
    return null; // Could not detect a recurring interval
  }

  let monthsToAdd;

  if (match[1] === 'month') {
    monthsToAdd = 1;                    // "every month" or "every a month"
  } else {
    monthsToAdd = parseInt(match[1], 10);
    if (isNaN(monthsToAdd)) return null;
  }

  // 3. Calculate next date from today
  const next = new Date();
  next.setMonth(next.getMonth() + monthsToAdd);

  // 4. Return formatted string exactly like "August 5, 2026"
  return next.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
 }, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tbody > tr:nth-child(2) > td.subscription-next-payment`).first()).toHaveText(`${vars.nextPayment2 ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tbody > tr:nth-child(2) > td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal2 ?? ''}`);
  }
  await expect(page.locator(`.woocommerce-customer-details--maincolumn > address`).or(page.locator(`div:nth-child(1) > div > div > div.bwf-inner-col > div.wfty-cust-details-block > div > div.wfty_box.wfty_customer_info > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(4) > div > div.wfty_view`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`.col-1 .woocommerce-customer-details--phone`).or(page.locator(`div:nth-child(1) > div > div > div.bwf-inner-col > div.wfty-cust-details-block > div > div.wfty_box.wfty_customer_info > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(2) > div.wfty_view`)).first()).toHaveText(`${vars.phone ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details--email`).or(page.locator(`div:nth-child(1) > div > div > div.bwf-inner-col > div.wfty-cust-details-block > div > div.wfty_box.wfty_customer_info > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(1) > div.wfty_view`)).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`.woocommerce-column > address`).or(page.locator(`div:nth-child(1) > div > div > div.bwf-inner-col > div.wfty-cust-details-block > div > div.wfty_box.wfty_customer_info > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(5) > div > div.wfty_view`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await page.locator(`a[href*="/my-account/"]`).or(page.locator(`a[href*="/account/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.u-column1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`.u-column2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).or(page.locator(`a[href*="/account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).or(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell-order-number`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { const CCrew = vars.CCrew
return CCrew !== 'yes' && vars.subscription === "yes" })()) {
    vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subscriptionID = `${vars.subscriptionID}`
return subscriptionID.replace("#","") }, vars);
  }
  if ((() => { const CCrew = vars.CCrew
return CCrew !== 'yes' && vars.subscription === "yes" })()) {
    await expect(page.locator(`td.subscription-id > a`).first()).toContainText(`${vars.subscriptionID ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew
return CCrew !== 'yes' && vars.subscription === "yes" })()) {
    await expect(page.locator(`td.subscription-total > span`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew
return CCrew !== 'yes' && vars.subscription === "yes" })()) {
    await subscriptionMenu(page, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.ccPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (false) {
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(1) > td.subscription-total.order-total.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-total.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.subscriptionID2 = ((await page.locator(`tr:nth-child(2).order.woocommerce-orders-table__row.woocommerce-orders-table__row--status-active td.subscription-id`).textContent()) ?? '').trim();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.subscriptionID2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subscriptionID = `${vars.subscriptionID2}`
return subscriptionID.replace("#","") }, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(2) > td.subscription-total.order-total.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-total.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal2 ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.{{nextPayment2}} = ((await page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(2) > td.subscription-next-payment.order-date.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-next-payment.woocommerce-orders-table__cell-order-date`).textContent()) ?? '').trim();
  }
}

// GI: "Extract user from email" (69a0ac4d3dc7ceb27c36a27b)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(30000);
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /^(qa\+)?(\w+)[^@]+/g
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Fill Checkout" (691347b8638b729792cb6856)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_first_name`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_first_name`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_first_name`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).or(page.locator(`iframe#wcp-checkout-iframe #billing_last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).or(page.locator(`iframe#wcp-checkout-iframe #billing_last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
  // skipped: select-open click on '#billing_country' (Select2 pattern)
  if ((() => { const user = vars.user
return user === 'new' })()) {
    await page.locator(`#billing_country`).first().selectOption(`${vars.country ?? ''}`);
  }
  try { await page.locator(`#billing_address_1`).or(page.locator(`iframe#wcp-checkout-iframe #billing_address_1`)).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).or(page.locator(`iframe#wcp-checkout-iframe #billing_address_1`)).first().selectOption(`${vars.street ?? ''}`); }
  try { await page.locator(`#billing_city`).or(page.locator(`iframe#wcp-checkout-iframe #billing_city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).or(page.locator(`iframe#wcp-checkout-iframe #billing_city`)).first().selectOption(`${vars.city ?? ''}`); }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    await page.locator(`#billing_address_2_collapse_label > a`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#billing_address_2`).or(page.locator(`iframe#wcp-checkout-iframe #billing_address_2`)).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`iframe#wcp-checkout-iframe #billing_address_2`)).first().selectOption(`${vars.street2 ?? ''}`); }
  // skipped: select-open click on '#billing_state' (Select2 pattern)
  if ((() => { const user = vars.user
return user === 'new' })()) {
    await page.locator(`#billing_state`).first().selectOption(`${vars.state ?? ''}`);
  }
  try { await page.locator(`#billing_postcode`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_postcode`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_postcode`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    try { await page.locator(`#billing_phone`).or(page.locator(`iframe#wcp-checkout-iframe #billing_phone`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).or(page.locator(`iframe#wcp-checkout-iframe #billing_phone`)).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    try { await page.locator(`#billing_email`).or(page.locator(`iframe#wcp-checkout-iframe #billing_email`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).or(page.locator(`iframe#wcp-checkout-iframe #billing_email`)).first().selectOption(`${vars.email ?? ''}`); }
  }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    try { await page.locator(`#shipping_first_name`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    try { await page.locator(`#shipping_last_name`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_last_name`)).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_last_name`)).first().selectOption(`${vars.lastName2 ?? ''}`); }
  }
  // skipped: select-open click on '#shipping_country' (Select2 pattern)
  if ((() => { const user = vars.user
return user === 'new' })()) {
    await page.locator(`#shipping_country`).first().selectOption(`${vars.country ?? ''}`);
  }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    try { await page.locator(`#shipping_address_1`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_address_1`)).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_address_1`)).first().selectOption(`${vars.street3 ?? ''}`); }
  }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    await page.locator(`#shipping_address_2_collapse_label > a`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    try { await page.locator(`#shipping_address_2`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_address_2`)).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_address_2`)).first().selectOption(`${vars.street4 ?? ''}`); }
  }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    try { await page.locator(`#shipping_city`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_city`)).first().selectOption(`${vars.city ?? ''}`); }
  }
  // skipped: select-open click on '#shipping_state' (Select2 pattern)
  if ((() => { const user = vars.user
return user === 'new' })()) {
    await page.locator(`#shipping_state`).first().selectOption(`${vars.state ?? ''}`);
  }
  if ((() => { const user = vars.user
return user === 'new' })()) {
    try { await page.locator(`#shipping_postcode`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('#shipping_phone')

return !!elem }, vars)) {
    try { await page.locator(`#shipping_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#shipping_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  try {
    try { await page.locator(`#order_comments`).or(page.locator(`iframe#wcp-checkout-iframe #order_comments`)).first().fill(`Order Note for Testing this field`); } catch { await page.locator(`#order_comments`).or(page.locator(`iframe#wcp-checkout-iframe #order_comments`)).first().selectOption(`Order Note for Testing this field`); }
  } catch { /* optional step: assign */ }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  vars.subPrice = ((await page.locator(`#wfacp_mini_cart_items_f04a2fdd > table > tbody > tr:nth-child(1) > td.product-total > span.woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(2) div:not(.wfacp_min_cart_widget) > table > tbody > tr:nth-child(1) > td.product-total > span.woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector<HTMLTableRowElement>('div:nth-child(2) tbody > tr:nth-child(1) > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span').innerText
const beforeBreak = elem.split('\n')[0].trim();

return beforeBreak }, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('.wfob_checkbox.wfob_bump_product')

return !elem }, vars)) {
    vars.prod_desc2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector<HTMLTableElement>('div:nth-child(2) div:not(.wfacp_min_cart_widget) > table > tbody > tr:nth-child(2) > td.product-name-area > div.product-name.wfacp_summary_img_true > div > span').innerText
const beforeBreak = elem.split('x')[0].trim();

return beforeBreak }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('.wfob_checkbox.wfob_bump_product')

return !elem }, vars)) {
    vars.unitPrice = ((await page.locator(`div:nth-child(2) div:not(.wfacp_min_cart_widget) > table > tbody > tr:nth-child(2) > td.product-total > ins > span.woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(2) div:not(.wfacp_min_cart_widget) > table > tbody > tr:nth-child(2) > td.product-total > span.woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subPrice = `${vars.subPrice}`
let unitPrice = `${vars.unitPrice}`

if (unitPrice === "") {
    unitPrice = "$0.00"
}

subPrice = subPrice.replace(",","");
unitPrice = unitPrice.replace(",","");

subPrice = Number(subPrice.replace(`${vars.Symbol}`,""));
unitPrice = Number(unitPrice.replace(`${vars.Symbol}`,""));

let subtotal = subPrice+unitPrice;
subtotal = `${vars.Symbol}`+subtotal.toFixed(2);

return subtotal }, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(3).cart_item > td.product-name > div > div > div.check-name`).or(page.locator(`div:nth-child(2) div:not(.wfacp_min_cart_widget) > table > tbody > tr:nth-child(3) > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toContainText(`Consistency Crew Membership (renews monthly)`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(3) .subscription-price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(2) div:not(.wfacp_min_cart_widget) > table > tbody > tr:nth-child(3) > td.product-total > span.woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.ccPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subPrice = `${vars.subPrice}`
let unitPrice = `${vars.unitPrice}`
let ccPrice = `${vars.ccPrice}`

if (unitPrice === "") {
    unitPrice = "$0.00"
}

subPrice = subPrice.replace(",","");
unitPrice = unitPrice.replace(",","");
ccPrice = ccPrice.replace(",","");

subPrice = Number(subPrice.replace(`${vars.Symbol}`,""));
unitPrice = Number(unitPrice.replace(`${vars.Symbol}`,""));
ccPrice = Number(ccPrice.replace(`${vars.Symbol}`,""));

let subtotal = subPrice+unitPrice+ccPrice;
subtotal = `${vars.Symbol}`+subtotal.toFixed(2);

return subtotal }, vars);
  }
  await expect(page.locator(`div:nth-child(2) tbody tr.cart-subtotal:not(.tax-total) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector<HTMLTableRowElement>('tr.cart-discount > td > .woocommerce-Price-amount.amount')

return !!elem }, vars)) {
    vars.discount = ((await page.locator(`div:nth-child(2) tbody tr.cart-discount > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  await blockUI(page, vars);
  vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label`).or(page.locator(`ul#shipping_method > li:nth-child(1) > div > label`)).or(page.locator(`div:nth-child(2) tbody tr.shipping_total_fee > td:nth-child(2) > span`)).textContent()) ?? '').trim();
  vars.taxPrice = ((await page.locator(`div:nth-child(2) tbody tr.cart-subtotal.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.total = ((await page.locator(`div:nth-child(2) tbody > tr.order-total > td > strong > span`).or(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    await expect(page.locator(`tr.cart-subtotal.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr.cart-subtotal.recurring-total > td > span`)).first()).toHaveText(`${vars.subPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.cart-subtotal.recurring-total:nth-child(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.cart-subtotal.recurring-total:nth-child(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.ccPrice ?? ''}`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.recurringTax = ((await page.locator(`tr.tax-total.recurring-total:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.recurringTax2 = ((await page.locator(`tr.tax-total.recurring-total:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.recurringTotal = ((await page.locator(`tr.order-total.recurring-total:nth-of-type(6) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.recurringTotal2 = ((await page.locator(`tr.order-total.recurring-total:nth-of-type(7) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.order-total.recurring-total:nth-of-type(6) > td`).first()).toContainText(`every 8 months`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`tr.order-total.recurring-total:nth-of-type(7) > td`).first()).toContainText(`/ month`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    vars.recurringTax = ((await page.locator(`tr.tax-total.recurring-total > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    vars.recurringTotal = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotalPrice}`;
let shipping = `${vars.shippingPrice}`;
let discount = `${vars.discount}`
if (discount === ""){
    discount = "0.00";
};
if (shipping.includes("Free") || shipping.includes("Lettermail (untracked)")){
    shipping = "0.00";
};
let tax = `${vars.taxPrice}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.total}`;

unit = unit.replace(",","").trim();
discount = discount.replace(",","").trim();
shipping = shipping.replace(",","").trim();
tax = tax.replace(",","").trim();
total = total.replace(",","").trim();

unit = Number(unit.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit-discount+shipping+tax;

total2 = Number(total2.toFixed(2));


return total === total2 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subPrice}`;
let shipping = `${vars.recurringShipping}`;
let discount = `${vars.recurrintDiscount}`
if (discount === ""){
    discount = "0.00";
};
if (shipping.includes("Free") || shipping.includes("Lettermail (untracked)") || shipping === ''){
    shipping = "0.00";
};
let tax = `${vars.recurringTax}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.recurringTotal}`;

unit = unit.replace(",","").trim();
discount = discount.replace(",","").trim();
shipping = shipping.replace(",","").trim();
tax = tax.replace(",","").trim();
total = total.replace(",","").trim();

unit = Number(unit.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit-discount+shipping+tax;

total2 = Number(total2.toFixed(2));


return total === total2 }, vars)).toBeTruthy();
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.ccPrice}`;
let shipping = `${vars.recurringShipping2}`;
let discount = `${vars.recurrintDiscount2}`
if (discount === ""){
    discount = "0.00";
};
if (shipping.includes("Free") || shipping.includes("Lettermail (untracked)") || shipping === ''){
    shipping = "0.00";
};
let tax = `${vars.recurringTax2}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.recurringTotal2}`;

unit = unit.replace(",","").trim();
discount = discount.replace(",","").trim();
shipping = shipping.replace(",","").trim();
tax = tax.replace(",","").trim();
total = total.replace(",","").trim();

unit = Number(unit.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit-discount+shipping+tax;

total2 = Number(total2.toFixed(2));


return total === total2 }, vars)).toBeTruthy();
  }
  {
    const _lbl = page.locator(`label[for="terms"]`).or(page.locator(`label[for="terms_acceptance"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms`).or(page.locator(`#terms_acceptance`)).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "FunnelKit flow" (699f52b31bdb128593b69a16)
export async function funnelKitFlow(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    vars.prod_desc3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('h1.bwf-adv-heading').innerText.trim()

return elem }, vars);
  }
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    vars.unitPrice2 = ((await page.locator(`.wfocu-sale-price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.wfocu-regular-price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  }
  if ((() => { const upsell = vars.upsell

return upsell === 'yes' })()) {
    await page.locator(`div.bwf-inner-col:nth-of-type(2) > .bwf-btn-wrap.wfocu-accept-button.wp-block-wrap > a.bwf-btn.solid.wfocu_upsell > .bwf-btn-inner-text`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { const upsell = vars.upsell
const CCrew = vars.CCrew

return upsell !== 'yes' && CCrew !== 'yes' })()) {
    await page.locator(`.bwf-btn-wrap.bwf-0fef18c9 > a.bwf-btn.solid.wfocu_skip_offer > .bwf-btn-inner-text`).filter({ visible: true }).first().click({ force: true });
  }
  await expect(page.locator(`#wfocuswal-content > img`)).not.toHaveCount(0);
  try {
    await expect(page.locator(`#wfocuswal-content > img`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await page.locator(`.bwf-btn-wrap > a.bwf-btn.solid.wfocu_skip_offer > .bwf-btn-inner-text`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try {
    await expect(page.locator(`#wfocuswal-content > img`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`#wfocuswal-content > img`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
}

// GI: "Login" (63a1c5299034282736afc4a2)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/account/?redirect_to="]`).or(page.locator(`#header-aside > div > div > a.signin-button`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`button[name="login"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.MyAccount-content--dashboard > .wc-MyAccount-sub-heading > h2`).or(page.locator(`#learndash-content`))).not.toHaveCount(0);
}

// GI: "New User subscription product" (691346ed638b729792cb29ff)
export async function newUserSubscriptionProduct(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.qty = `1`;
  vars.variable = `no`;
  vars.subscription = `yes`;
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="billing_same_as_shipping"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_same_as_shipping`).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillCheckout(page, vars);
  if ((() => { const user = vars.user

return user === 'new' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
  }
  if ((() => { const user = vars.user

return user === 'new' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / 26`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / 26`); }
  }
  if ((() => { const user = vars.user

return user === 'new' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
  }
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await funnelKitFlow(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  if ((() => { const CCrew = vars.CCrew
return CCrew !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = Array.from<any>(document.querySelectorAll('body > div.woofunnels-container.wflp-canvas.wffn-page-template > div:nth-child(1) > div > div > div.bwf-inner-col > div.bwf-section-wrap > div > div > h6.bwf-adv-heading.bwf-width-default'))[1].innerText

return elem === `Congratulations, ${vars.firstName}!` }, vars)).toBeTruthy();
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`body > div.woofunnels-container.wflp-canvas.wffn-page-template > div:nth-child(1) > div > div > div.bwf-inner-col > div.bwf-section-wrap > div > div > p.has-text-align-center`).first()).toContainText(`Get ready to move through your boxes at a record-level pace with record-level fun!`);
  }
  await checkOrderAndSubscriptionsOnMyAccount(page, vars);
}

// GI: "Next Payment date" (69139a7f28d2a810e81c84d8)
export async function nextPaymentDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let nextPay = `${vars.nextPay}`
nextPay = Date.parse(nextPay)
nextPay = new Date(nextPay)

// Set time zone and locale based on country
const timeZone = 'America/Chicago';

const now = new Date();

const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use false for 24-hour format
});

const date = new Date(formatter.format(now));
date.setMonth(date.getMonth() + vars.m);

let monthAssess = date.getMonth() === nextPay.getMonth()
let yearAssess = date.getYear() === nextPay.getYear()
let dateAssess

if (vars.m === 2) {
    dateAssess = date.getDate() === nextPay.getDate()
} else {
    dateAssess = 28 === nextPay.getDate()
}

return monthAssess && dateAssess && yearAssess
 }, vars)).toBeTruthy();
}

// GI: "Refund Upsell" (69a0a7aa8ce9cb3f6234d552)
export async function refundUpsell(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`button[type="button"].button.wcf-offer-refund`).or(page.locator(`a.button.wfocu-refund`)).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
}

// GI: "Renew + BackEnd" (69135bf1638b729792cf9e5e)
export async function renewBackEnd(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.admin_user ?? ''}`;
  vars.pass = `${vars.admin_pass ?? ''}`;
  await adminLogin(page, vars);
  vars.stagingMode = ((await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).textContent()) ?? '').trim();
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Card`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table:nth-child(1) > tbody > tr:nth-child(2) > td.total > span > bdi`).first()).toHaveText(`$0.00`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table:nth-child(1) > tbody > tr:nth-child(3) > td.total > span > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) td:nth-of-type(5) > .amount`).first()).toHaveText(`${vars.recurringTotal ?? ''} every 8 months`);
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.subscriptionID = `${vars.subscriptionID1 ?? ''}`;
  }
  await renewByAdmin(page, vars);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  }
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  }
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    vars.subscriptionID = `${vars.subscriptionID2 ?? ''}`;
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await renewByAdmin(page, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let staging = vars.stagingMode
const CCrew = vars.CCrew

return CCrew === 'yes' && false === staging.includes("staging") })()) {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
  }
  if ((() => { let staging = vars.stagingMode
const CCrew = vars.CCrew

return CCrew === 'yes' && false === staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  }
  if ((() => { let staging = vars.stagingMode
const CCrew = vars.CCrew

return CCrew === 'yes' && staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pending payment`);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew === 'yes' })()) {
    await expect(page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(2) > td.total > span > bdi`).first()).toHaveText(`${vars.ccPrice ?? ''}`);
  }
}

// GI: "Renew by Admin" (6913610128d2a810e813eed0)
export async function renewByAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  // TODO: command="dragAndDrop" target="select[name=\"wc_order_action\"]" value="#wp-admin-bar-wp-logo > a[href*=\"/wp-admin/about.php\"].ab-item"
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`.notice.notice-success.is-dismissible.updated > p`).first()).toContainText(`Subscription updated.`);
  } catch { /* optional step: assertTextPresent */ }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  vars.stagingMode = ((await page.locator(`li#toplevel_page_woocommerce > ul > li > a[href*="subscription"]`).or(page.locator(`#menu-posts-shop_subscription > a > div.wp-menu-name`)).textContent()) ?? '').trim();
  if ((vars.subscriptionID1 === vars.subscriptionID && vars.CCrew === 'yes')
        || vars.CCrew !== 'yes') {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  }
  if (vars.subscriptionID2 === vars.subscriptionID && vars.CCrew == 'yes') {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`On hold`);
  }
  vars.renewID = ((await page.locator(`#subscription_renewal_orders > div.inside > div > table > tbody > tr:first-of-type > td:nth-child(1) > a`).or(page.locator(`#woocommerce-order-notes > div.inside > ul > li:nth-child(3) > div > p > a`)).textContent()) ?? '').trim();
  vars.renewID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let renew = `${vars.renewID}`;
renew = renew.replace("#","");
return renew
 }, vars);
}

// GI: "required fields" (699f0a918ce9cb3f62ee32ea)
export async function requiredFields(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.qty = `1`;
  vars.variable = `no`;
  vars.subscription = `yes`;
  vars.user = `new`;
  await blockUI(page, vars);
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    await placeOrderElement(page, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    await blockUI(page, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    await blockUI(page, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / 26`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / 26`); }
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
  }
  {
    const _lbl = page.locator(`label[for="billing_same_as_shipping"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_same_as_shipping`).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    await placeOrderElement(page, vars);
  }
  if ((() => { const CCrew = vars.CCrew

return CCrew !== 'yes' })()) {
    await blockUI(page, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
const CCrew = `${vars.CCrew}`


return width === 1920 && CCrew !== 'yes' }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toHaveText(`Invalid recurring shipping method.
Billing First name is a required field.
Billing Last name is a required field.
Billing Email is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing Postcode is a required field.
Shipping Street address is a required field.
Shipping Town / City is a required field.
Shipping Postcode is a required field.
Please read and accept the terms and conditions to proceed with your order.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
const CCrew = `${vars.CCrew}`
return width === 360 && CCrew !== 'yes' }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toHaveText(`Invalid recurring shipping method.
Billing Email is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing Postcode is a required field.
Shipping Street address is a required field.
Shipping Town / City is a required field.
Shipping Postcode is a required field.
Please read and accept the terms and conditions to proceed with your order.`);
  }
}
