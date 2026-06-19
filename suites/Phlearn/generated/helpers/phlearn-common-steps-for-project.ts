// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Phlearn - Common steps for project"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, extractUserFromEmail, placeOrderElement } from './common-steps-for-all-projects';
import { _01HomePage } from './template-woocommerce-tests';

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

// GI: "“Forgot password?” flow" (692d80c30e1e837d8cd8cd24)
export async function forgotPasswordFlow(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`i.ph-avatar`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/my-account/lost-password/"]`).or(page.locator(`a[href*="/my-phlearn/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#login > div > div > div.modal-body > form > input[type=text]:nth-child(3)`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#login > div > div > div.modal-body > form > input[type=text]:nth-child(3)`).first().selectOption(`${vars.username ?? ''}`); }
  await page.locator(`button[type="submit"].woocommerce-Button`).or(page.locator(`button[name="recovery_password"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.wc-block-components-notice-banner.is-success`).or(page.locator(`div.confirmation-area > h1`)).or(page.locator(`div.woocommerce-message`)).first()).toContainText(`Password reset email has been sent.`);
  await page.locator(`a[href="#"].button`).filter({ visible: true }).first().click({ force: true });
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#password_1`).or(page.locator(`iframe.phlearn-iframe #password_1`)).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).or(page.locator(`iframe.phlearn-iframe #password_1`)).first().selectOption(`${vars.password2 ?? ''}`); }
  try { await page.locator(`#password_2`).or(page.locator(`iframe.phlearn-iframe #password_2`)).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).or(page.locator(`iframe.phlearn-iframe #password_2`)).first().selectOption(`${vars.password2 ?? ''}`); }
  await page.locator(`button[type="submit"].woocommerce-Button`).or(page.locator(`iframe.phlearn-iframe button.woocommerce-Button.button`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div.modal-body div.h1`).first()).toContainText(`Welcome back!`);
}

// GI: "02 - Place order - Backend (Copy)" (67c84d29c4f6da836cc4a41f)
export async function _02PlaceOrderBackendCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await adminLogin(page, vars);
  await page.goto(`${vars.startUrl ?? ''}wp-admin/edit.php?post_type=shop_order`);
  await page.waitForLoadState('load');
  await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''}
${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`a.wc-order-item-name[href*="/wp-admin/post.php?post="]`).first()).toContainText(`Phlearn PRO Membership - Yearly`);
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(2) > tbody > tr:nth-child(1) > td.total > span > bdi`).or(page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(1) > td.total > span > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if ((() => { const discount = vars.discount

return discount !== '' })()) {
    await expect(page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(2) > tbody > tr:nth-child(2) > td.total > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:last-child > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
}

// GI: "03 - Place order - Email (Copy)" (67c84d29c4c19f03efa6cdab)
export async function _03PlaceOrderEmailCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Your Phlearn Order From")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`table.em_wrapper > tbody > tr:nth-of-type(6) > td > table > tbody > tr > td > table:nth-of-type(1) > tbody > tr > td`).first()).toContainText(`Phlearn PRO Membership - Yearly x1`);
  await expect(page.locator(`td:nth-of-type(2) > table.em_wrapper > tbody > tr:nth-of-type(6) > td > table > tbody > tr > td > table > tbody .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
}

// GI: "04 - Refund by Admin (Copy)" (67c84d29c4f6da836cc4a438)
export async function _04RefundByAdminCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
  try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
  await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Cancelled`);
  await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `\\${vars.total}`
    const pattern = new RegExp(`Braintree \\(Credit Card\\) Void in the amount of ${total} approved. \\(Transaction ID [a-zA-Z0-9]+\\)`);
    console.log(pattern)
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
}

// GI: "05 - Placer order - New User - Backend (Copy)" (692e0966638b729792b4ac86)
export async function _05PlacerOrderNewUserBackendCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _03PlaceOrderEmailCopy(page, vars);
  await _02PlaceOrderBackendCopy(page, vars);
  await _04RefundByAdminCopy(page, vars);
  await _05RefundEmailCopy(page, vars);
}

// GI: "05 - Placer order - New User (Copy)" (692e09660e1e837d8cedca2a)
export async function _05PlacerOrderNewUserCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  // ↓ 01 - Home page
  await _01HomePage(page, vars);
  try {
    await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
  } catch { /* optional step: assertElementVisible */ }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  // ↑ end 01 - Home page
  vars.username = `${vars.email ?? ''}`;
  await page.locator(`xpath=//a[contains(text(), "Sign Up")]`).or(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(3) > a[href*="/subscribe/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Get Started")]`).or(page.locator(`a[href="#subscriptions-link"][title="Join PHLEARN PRO"]`)).filter({ visible: true }).first().click({ force: true });
  vars.unitPrice = ((await page.locator(`.variation.year > .price`).textContent()) ?? '').trim();
  await page.locator(`.variation.year > button[name="continue"][type="submit"].continue`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[name="username"]`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`input[name="username"]`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`input[name="password"]`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`input[name="password"]`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register And Continue")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
  await fillCheckout(page, vars);
  await fillCC(page, vars);
  await placeOrderElement(page, vars);
  await _3DSStep(page, vars);
  await blockUI(page, vars);
  await expect(page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`a.button`)).not.toHaveCount(0);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`a.button`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  await page.waitForLoadState('load');
  await page.reload();
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await page.locator(`img.lazy.avatar.avatar-45`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.avatar-menu-item > ul > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(3) > a[href*="/my-phlearn/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.phlearn-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  vars.nextYear = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let d = new Date();
let year = d.getFullYear();
year = year +1;
return year
 }, vars);
  await expect(page.locator(`div.order-date > time`).first()).toContainText(`${vars.nextYear ?? ''}`);
  await page.locator(`xpath=//span[contains(text(), "View Related Orders")]`).or(page.locator(`a[href="#"] > span`)).filter({ visible: true }).first().click({ force: true });
  vars.orderNumber = ((await page.locator(`.rel-subtitle > a`).textContent()) ?? '').trim();
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const orderNumber = `${vars.orderNumber}`.match(/\d+/g)

return orderNumber[0] }, vars);
  await page.locator(`.rel-subtitle > a`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  if ((() => { const discount = vars.discount

return discount !== '' })()) {
    await expect(page.locator(`td.order-total-value.discount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.discount ?? ''}`);
  }
  await expect(page.locator(`td.order-total-value.order_total > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.woocommerce-table.woocommerce-table--customer-details.shop_table.customer_details:nth-of-type(1) > tbody > tr > td`).first()).toContainText(`${vars.username ?? ''}`);
  await expect(page.locator(`table.woocommerce-table.woocommerce-table--customer-details.shop_table.customer_details:nth-of-type(2) > tbody > tr:nth-of-type(1) > td`).first()).toContainText(`${vars.fullName ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(2) > td`).first()).toContainText(`${vars.zipCode ?? ''}`);
}

// GI: "05 - Refund Email (Copy)" (67c84d29c4c19f03efa6cdb9)
export async function _05RefundEmailCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > span.woocommerce-Price-amount.amount`).first()).toContainText(`-${vars.total ?? ''}`);
  await expect(page.locator(`table > tbody td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > del`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`table > tbody td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0`);
}

// GI: "10 - Registration, My Account links and Login" (692d86a3638b729792a0ab8a)
export async function _10RegistrationMyAccountLinksAndLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `no`;
  vars.username = `${vars.emailReg ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await register(page, vars);
  await myAccountLinksAndLogout(page, vars);
  await login(page, vars);
}

// GI: "11 - “Forgot password?” flow" (692d807d0e1e837d8cd8c7f2)
export async function _11ForgotPasswordFlow(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.pass = `${vars.password ?? ''}`;
  vars.username = `${vars.emailForgot ?? ''}`;
  await register(page, vars);
  await logout(page, vars);
  await forgotPasswordFlow(page, vars);
  vars.pass = `${vars.password2 ?? ''}`;
  await login(page, vars);
}

// GI: "3DS step" (692a03c2638b729792791310)
export async function _3DSStep(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#Cardinal-CCA-IFrame #content > div:nth-child(2) > form:nth-child(2) > input.input-field`).first().fill(`1234`); } catch { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#Cardinal-CCA-IFrame #content > div:nth-child(2) > form:nth-child(2) > input.input-field`).first().selectOption(`1234`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#Cardinal-CCA-IFrame #content > div:nth-child(2) > form:nth-child(2) > input.button.primary`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
}

// GI: "Admin Login" (692d80bd0e1e837d8cd8cca0)
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

// GI: "Checkout Retry" (6543d83e5d4962e44b4db289)
export async function checkoutRetry(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let errorMes = document.querySelector('.woocommerce-NoticeGroup-checkout .woocommerce-error').textContent;
return(errorMes == 'Error processing checkout. Please try again.') }, vars)) {
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Extract user from email" (692d81ef638b7297929fd527)
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

// GI: "fill CC" (692a021e638b72979278f5d3)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#braintree-hosted-field-number input#credit-card-number`).first().fill(`4111111111111111`); } catch { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#braintree-hosted-field-number input#credit-card-number`).first().selectOption(`4111111111111111`); }
  try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#braintree-hosted-field-expirationDate input#expiration`).first().fill(`12/29`); } catch { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#braintree-hosted-field-expirationDate input#expiration`).first().selectOption(`12/29`); }
  try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#braintree-hosted-field-cvv input#cvv`).first().fill(`123`); } catch { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#braintree-hosted-field-cvv input#cvv`).first().selectOption(`123`); }
}

// GI: "Fill checkout" (6929f9960e1e837d8cb14233)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_postcode`).or(page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_postcode`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_postcode`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  vars.total = ((await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing-description > .billing_subtitle > .subscription-price > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const findCheckoutIframe = () => {
  return document.querySelector<HTMLIFrameElement>('iframe[src*="phamily-develop.go-vip.net/checkout/"][src*="iframe_checkout=1"]')
    || document.querySelector<HTMLIFrameElement>('iframe.phlearn-iframe.checkout');
};

const frame = findCheckoutIframe();
if (frame) {
  console.log('Found immediately!', frame);
} else {
  // Wait until it appears with the correct src
  const checker = setInterval(() => {
    const iframe = findCheckoutIframe();
    if (iframe && iframe.src.includes('iframe_checkout=1')) {
      clearInterval(checker);
      console.log('Iframe ready!', iframe);
      // Your code here
    }
  }, 100);
}
let discountElement;

if (frame !== null) {
      try {
        let iframeDocument = frame.contentWindow?.document || frame.contentDocument;
        discountElement = iframeDocument?.querySelector('#billing-description > span > span.woocommerce-Price-amount.amount');
      } catch (error) {
        console.warn('Cross-origin iframe detected, skipping iframe check.');
      }
}
return !discountElement === false
 }, vars)) {
    vars.discount = ((await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing-description > span > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`;
let discount = `${vars.discount}`
if (discount === ""){
    discount = "0.00";
};
let total = `${vars.total}`;

unitPrice = unitPrice.replace(",","").trim();
discount = discount.replace(",","").trim();
total = total.replace(",","").trim();

unitPrice = Number(unitPrice.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unitPrice-discount;

total2 = Number(total2.toFixed(2));


return total === total2 }, vars)).toBeTruthy();
}

// GI: "Login" (603cf5b8e340e4516e66e9ea)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`i.ph-avatar`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[name="username"]`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`input[name="username"]`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`input[name="password"]`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`input[name="password"]`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Login And Continue")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`img.lazy.avatar.avatar-45`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.avatar-menu-item > ul > .menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href*="/my-phlearn/favorites/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.dashboard-header`)).not.toHaveCount(0);
}

// GI: "logout" (692d80c70e1e837d8cd8cda3)
export async function logout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`img.lazy.avatar.avatar-45`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.avatar-menu-item > ul > .menu-item.menu-item-type-custom.menu-item-object-custom > a[href*="/my-phlearn/customer-logout/?customer-logout=true"]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "My Account links and logout" (692d8715638b729792a0c1d1)
export async function myAccountLinksAndLogout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`div.woocommerce > div.woocommerce-MyAccount-content`)).not.toHaveCount(0);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-phlearn/continue-watching"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div.woocommerce > div.woocommerce-MyAccount-content`)).not.toHaveCount(0);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-phlearn/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.tutorial-list-error`).first()).toHaveText(`You haven't made any purchases yet.`);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-phlearn/referrals/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.hp-head > p`).first()).toHaveText(`Share the joy of learning, and earn a month of PHLEARN PRO.
No Subscription required, no limit on free months.`);
  await page.locator(`a[href*="/my-phlearn/phlearn-change-password/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`legend`).first()).toHaveText(`Password change`);
  await page.locator(`a[href*="/my-account/payment-methods/"]`).or(page.locator(`a[href*="/my-phlearn/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > .wc-block-components-notice-banner.is-info`).or(page.locator(`div > div.woocommerce-MyAccount-content > div.woocommerce-info`)).first()).toHaveText(`No saved methods found.`);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-phlearn/account"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#profile`)).not.toHaveCount(0);
  await logout(page, vars);
}

// GI: "Phlearn BlockUI" (66e9c71ecb4c47193246ce76)
export async function phlearnBlockUI(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await expect(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`.blockUI`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let iframePhlearn = document.querySelector<HTMLIFrameElement>('iframe[src="https://phamily-develop.go-vip.net/checkout/?iframe_checkout=1"]');
iframeDocument = iframePhlearn.contentDocument || iframePhlearn.contentWindow.document

let block = iframeDocument.getElementsByClassName("blockUI")
return block.length > 0 }, vars)) {
      await expect(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`.blockUI`)).toHaveCount(0);
    }
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForTimeout(1500);
}

// GI: "Register" (692d80ca0e1e837d8cd8cdfa)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`i.ph-avatar`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="#signup"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#reg_email`).or(page.locator(`input[name="username"]`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).or(page.locator(`input[name="username"]`)).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).or(page.locator(`input[name="password"]`)).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#reg_password`).or(page.locator(`input[name="password"]`)).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(),'Register And Continue')]`).or(page.locator(`#login > div > div > div.modal-body > form > div.login-email-option > button`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`img.lazy.avatar.avatar-45`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.avatar-menu-item > ul > .menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href*="/my-phlearn/favorites/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div.woocommerce > div.dashboard-header`)).not.toHaveCount(0);
}

// GI: "Registration" (603cf1cce340e4516e66afd3)
export async function registration(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForLoadState('load');
  await page.locator(`i.ph-avatar`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="#signup"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`input[name="username"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[name="username"]`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`input[name="username"]`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`input[name="password"]`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`input[name="password"]`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register And Continue")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await page.locator(`img.lazy.avatar.avatar-45`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.avatar-menu-item > ul > .menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href*="/my-phlearn/favorites/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.dashboard-header`)).not.toHaveCount(0);
}
