// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Gruum - Common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI } from './common-steps-for-all-projects';

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

// GI: "Admin Login" (68c17db15081f036c98acf80)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`a.jetpack-sso-toggle:nth-child(3)`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try { await page.locator(`#user_login`).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
}

// GI: "Check order Details in backend" (68c17e045081f036c98ae251)
export async function checkOrderDetailsInBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod2 ?? ''}`);
  if (vars.product !== 'bundle') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const status = document.querySelector('#select2-order_status-container').textContent

return status === 'Processing' || status === 'Shampoo & Conditioners' }, vars)).toBeTruthy();
  }
  if (vars.product === 'bundle') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const status = document.querySelector('#select2-order_status-container').textContent

return status === 'Processing' || status === 'Holiday Heroes + items' }, vars)).toBeTruthy();
  }
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:gi_order_"]`).or(page.locator(`a[href*="mailto:gi_subs_"]`)).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if (vars.shippingPrice === 'Standard') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`£0.00`);
  }
  if (vars.shippingPrice !== 'Standard') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  if (vars.paymentMethod !== 'PayPal') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const total = `${vars.total}`
function checkAdminNote(note) {
    const pattern = new RegExp  (`A payment of ${total} was successfully charged using WooPayments \\(pi_[a-zA-Z0-9]+\\)`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  }
  if (vars.paymentMethod === 'PayPal') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const total = `${vars.total}`
function checkAdminNote(note) {
    const pattern = new RegExp  (`Braintree \\(PayPal\\) Sandbox Payment Approved \\(Transaction ID [a-zA-Z0-9]+\\)`);
    return pattern.test(note);
}
//Braintree (PayPal) Sandbox Payment Approved (Transaction ID jtk5b7f2)
// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  }
}

// GI: "Extract user from email " (68c176074a33650754453dbc)
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

// GI: "Fill CC" (68c19d7bcee4fa6dde0cae8d)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Visa credit card – 0000`;
  vars.paymentMethod2 = `Cards`;
  await page.locator(`label[for="payment_method_woocommerce_payments"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-numberInput`).first().fill(`4000 0082 6000 0000`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-numberInput`).first().selectOption(`4000 0082 6000 0000`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-expiryInput`).first().fill(`12/27`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-expiryInput`).first().selectOption(`12/27`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-cvcInput`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-cvcInput`).first().selectOption(`123`); }
}

// GI: "Fill Checkout" (68c179234a33650754460515)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await fillCheckoutStep1(page, vars);
  await fillCheckoutStep2(page, vars);
}

// GI: "Fill Checkout step 1" (68c178a24a3365075445db54)
export async function fillCheckoutStep1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  if (vars.subscription !== 'yes') {
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#sgm_optin') }, vars)) {
    {
      const _lbl = page.locator(`label[for="sgm_optin"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#sgm_optin`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await page.locator(`xpath=//button[contains(text(), "Continue to address")]`).or(page.locator(`.flux-step.flux-step--1 > footer.flux-footer > button.flux-button`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Fill Checkout Step 2" (68c178ee5081f036c9899817)
export async function fillCheckoutStep2(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  try { await page.locator(`#sgwcav_postcode_lookup`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#sgwcav_postcode_lookup`).first().selectOption(`${vars.zipCode ?? ''}`); }
  await expect(page.locator(`button[name="sgwcav_postcode_lookup_button"].disabled`)).toHaveCount(0);
  await page.locator(`xpath=//button[contains(text(), "Find Address")]`).or(page.locator(`button[name="sgwcav_postcode_lookup_button"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`xpath=//span[contains(text(), "Select your address to populate the form.")]`)).not.toHaveCount(0);
  await page.locator(`xpath=//span[contains(text(), "Select your address to populate the form.")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//li[contains(text(), "${vars.street ?? ''}")]`).or(page.locator(`li.select2-results__option.select2-results__option--highlighted`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
  await expect(page.locator(`#billing_address_1`).first()).toHaveText(`${vars.street ?? ''}`);
  try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
  vars.city2 = ((await page.locator(`#billing_city`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const city = `${vars.city}`.toLowerCase()
const city2 = `${vars.city2}`.toLowerCase()

return city === city2 }, vars)).toBeTruthy();
  try { await page.locator(`#billing_state`).first().fill(`${vars.county ?? ''}`); } catch { await page.locator(`#billing_state`).first().selectOption(`${vars.county ?? ''}`); }
  await expect(page.locator(`#billing_postcode`).first()).toHaveText(`${vars.zipCode ?? ''}`);
  await page.locator(`xpath=//span[contains(text(), "Ship to a different address?")]`).or(page.locator(`#ship-to-different-address > label.woocommerce-form__label.woocommerce-form__label-for-checkbox.checkbox > span:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
  try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
  try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
  try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
  try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#shipping_state`).first().fill(`${vars.county ?? ''}`); } catch { await page.locator(`#shipping_state`).first().selectOption(`${vars.county ?? ''}`); }
  try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Continue to payment")]`).or(page.locator(`.flux-step.flux-step--2 > footer.flux-footer > button.flux-button`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Fill PayPal" (68c31fc383fba1b5fc21c6b8)
export async function fillPayPal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `PayPal`;
  vars.paymentMethod2 = `PayPal`;
  await page.locator(`label[for="payment_method_braintree_paypal"]`).filter({ visible: true }).first().click({ force: true });
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[name*="paypal_buttons"]`).first().contentFrame().locator(`div[aria-label="Pay with PayPal"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`#email`).first().fill(`${vars.payPalUser ?? ''}`); } catch { await page.locator(`#email`).first().selectOption(`${vars.payPalUser ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Next")]`).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`div > span.sr-only`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  await expect(page.locator(`div > span.sr-only`)).toHaveCount(0);
  try { await page.locator(`div > input#password[name='login_password']`).first().fill(`${vars.payPalPass ?? ''}`); } catch { await page.locator(`div > input#password[name='login_password']`).first().selectOption(`${vars.payPalPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="btnLogin"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Log In")]`).or(page.locator(`#btnLogin`)).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="consentButton"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`[data-testid="consentButton"]`).or(page.locator(`xpath=//button[contains(text(), "Save and Continue")]`)).or(page.locator(`#consentButton`)).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Login" (68c16e5e5081f036c9877210)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (page.url() !== vars.startUrlmy-account/') {
    await page.locator(`a[href*="/my-account/"] > .icon > svg`).filter({ visible: true }).first().click({ force: true });
  }
  if (page.url() !== vars.startUrlmy-account/') {
    await page.waitForLoadState('load');
  }
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.myaccount-dashboard-sidebar`)).not.toHaveCount(0);
}

// GI: "Next order date" (68c1e8ed5081f036c99b4db6)
export async function nextOrderDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); /*let nextPay = `${vars.nextPay}`
nextPay = Date.parse(nextPay)
nextPay = new Date(nextPay)
let date = new Date()

let monthAssess = ( date.getMonth()+1 ) % 12 === nextPay.getMonth()
let yearAssess = 11 === date.getMonth() ? date.getYear() + 1 === nextPay.getYear() : date.getYear() === nextPay.getYear()

return monthAssess && date.getDate() === nextPay.getDate() && yearAssess*/

let nextPay = `${vars.nextPay}`;
const country = `${vars.country}`;

nextPay = Date.parse(nextPay);
nextPay = new Date(nextPay);

// Set time zone and locale based on country
let timeZone;
if (country === 'AU') {
  timeZone = 'Australia/Sydney';
} else if (country === 'CA') {
  timeZone = 'America/Toronto';
} else {
  timeZone = 'America/New_York';
}

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

return date.getDate() === nextPay.getDate() &&
       (date.getMonth() + 1) === nextPay.getMonth() &&
       date.getFullYear() === nextPay.getFullYear(); }, vars)).toBeTruthy();
}

// GI: "Place Order - New User - Backend" (68c17d375081f036c98aaf44)
export async function placeOrderNewUserBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await checkOrderDetailsInBackend(page, vars);
  if (vars.subscription === 'true') {
    await subscriptionBackend(page, vars);
  }
}

// GI: "Place Order - New User - Email" (6883cfb5e5d3587e1594b02d)
export async function placeOrderNewUserEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Your grüum order confirmation from")]`).filter({ visible: true }).first().click({ force: true });
  vars.prodDesc3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.prodDesc}`.replace('–','-') }, vars);
  await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc3 ?? ''}`);
  await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(2) > td.td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(4) > td.td`).first()).toContainText(`${vars.paymentMethod2 ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
  if (vars.subscription === 'true') {
    await expect(page.locator(`#body_content_inner > div:nth-child(4) > table > tbody > tr > td:nth-child(4)`).first()).toContainText(`${vars.total ?? ''} ${vars.period2 ?? ''}`);
  }
}

// GI: "Place Order - New User - Refund" (68c17f1a5081f036c98b1f8e)
export async function placeOrderNewUserRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  vars.refund = `true`;
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
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
  if (vars.paymentMethod === 'PayPal') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`
    const pattern = new RegExp(`Braintree \\(PayPal\\) Refund in the amount of ${total} approved. \\(Transaction ID [a-zA-Z0-9]+\\)`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent));
 }, vars)).toBeTruthy();
  }
  if (vars.paymentMethod !== 'PayPal') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`
    const pattern = new RegExp(`A refund of ${total} was successfully processed using WooPayments. Reason: Testing Refund. \\(re_[a-zA-Z0-9]+\\)`);
    return pattern.test(note);
}
//A refund of £22.95 was successfully processed using WooPayments. Reason: Testing Refund. (re_3SMwpw2HOLdFMK8z02oI6SPT)
// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent));
 }, vars)).toBeTruthy();
  }
}

// GI: "Place Order - New User - Refund Email" (68c17f7d5081f036c98b30f3)
export async function placeOrderNewUserRefundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#body_content_inner > p:nth-of-type(1)`).first()).toContainText(`Hi ${vars.firstName ?? ''},`);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return '£' + parseFloat(`${vars.total}`.replace('£','')) }, vars);
  await expect(page.locator(`#body_content_inner > p:nth-of-type(2)`).first()).toContainText(`Hi there - we're just getting in touch to confirm that we have issued a full refund for order ${vars.orderNumber ?? ''}. The total amount we have refunded you for this order is ${vars.total ?? ''}.`);
}

// GI: "Place Order - New User - Renew" (68c2af025081f036c9baec67)
export async function placeOrderNewUserRenew(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await page.locator(`a[href="admin.php?page=wc-orders--shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await page.locator(`a[href*="admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionNumber ?? ''}"] > strong`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(1) > td:nth-of-type(5) > .amount > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
  await page.locator(`tr:nth-of-type(1) a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id="][aria-label*="Edit order number"]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Register" (68c16f4d4a3365075443c1dc)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (page.url() !== vars.startUrlmy-account/') {
    await page.locator(`a[href*="/my-account/"] > .icon > svg`).filter({ visible: true }).first().click({ force: true });
  }
  await page.waitForLoadState('load');
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  try { await page.locator(`#reg_confirm_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_confirm_password`).first().selectOption(`${vars.password ?? ''}`); }
  await expect(page.locator(`button[name="register"][disabled]`)).toHaveCount(0);
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Subscription - Backend" (68c17e794a3365075447b150)
export async function subscriptionBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionNumber ?? ''}"]`)).not.toHaveCount(0);
  await expect(page.locator(`mark.order-status > span`).first()).toContainText(`Active`);
  await expect(page.locator(`.amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`xpath=//a[contains(text(), "#${vars.subscriptionNumber ?? ''}")]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionNumber ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:qa+gi_subs_"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(3)`).first()).toContainText(`${vars.phone ?? ''}`);
  await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
}

// GI: "Thank you page" (68c19eb483fba1b5fc76508c)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = ((await page.locator(`h1.text-center`).textContent()) ?? '').trim();
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const orderNumber = `${vars.orderNumber}`.match(/\d+/g);

return orderNumber[0] }, vars);
  await expect(page.locator(`#h-your-confirmation-email-will-be-sent-to-you-shortly`).first()).toContainText(`Your confirmation email will be sent to you shortly.`);
  await expect(page.locator(`#wc-order-delivery-map`)).not.toHaveCount(0);
  await page.locator(`path.cls-1`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Verify Order details in My Account" (68c19fb5cee4fa6dde0d19a2)
export async function verifyOrderDetailsInMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/"] > .icon > svg`).filter({ visible: true }).first().click({ force: true });
  if (vars.subscription === 'yes') {
    vars.subNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return parseFloat(`${vars.orderNumber}`) + 1 }, vars);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`h3.my-account-subscriptions-heading`).first()).toContainText(`My subscription`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`.subscription-id`).first()).toContainText(`#${vars.subNumber ?? ''}`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`.subscription-status`).first()).toContainText(`Active`);
  }
  if (vars.subscription === 'yes') {
    vars.{{orderDate}} = ((await page.locator(`li:nth-of-type(1) > .subscription-detail-content.clearfix > .value.pull-left`).textContent()) ?? '').trim();
  }
  if (vars.subscription === 'yes') {
    vars.{{nextOrder}} = ((await page.locator(`li:nth-of-type(2) > .subscription-detail-content.clearfix > .value.pull-left`).textContent()) ?? '').trim();
  }
  if (vars.subscription === 'yes') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let dateStr1 = `${vars.orderDate}`;
let dateMatch = dateStr1.match(/(\d{2})\/(\d{2})\/(\d{4})/);
let extractedDate = dateMatch ? `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}` : null;
let [day1, month1, year1] = extractedDate.split('/');

// Create a Date object and add 2 months properly
let date1 = new Date(year1, month1 - 1, day1);  // month is 0-based in Date constructor
date1.setMonth(date1.getMonth() + 2);  // This handles overflow correctly

// Second date
let dateStr2 = `${vars.nextOrder}`;
let [day2, month2, year2] = dateStr2.split('/');

let targetDate = new Date(year2, month2 - 1, day2);

// Compare the resulting dates
let result = date1.getDate() === targetDate.getDate() &&
             date1.getMonth() === targetDate.getMonth() &&
             date1.getFullYear() === targetDate.getFullYear();

return result

 }, vars)).toBeTruthy();
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`li:nth-of-type(3) > .subscription-detail-content.clearfix > .value.pull-left`).first()).toContainText(`${vars.period2 ?? ''}`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`.value > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  await page.locator(`i.i-order-history`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.order-id`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
  await expect(page.locator(`div.order-meta:nth-of-type(3) > .order-meta-detail`).first()).toContainText(`Processing`);
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`div.order-meta:nth-of-type(4) > .order-meta-detail`).first()).toHaveText(`One time purchase`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`div.order-meta:nth-of-type(4) > .order-meta-detail`).first()).toHaveText(`Subscription`);
  }
  await page.locator(`i.fa.fa-solid`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div.order-content-meta-data:nth-of-type(1) > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await expect(page.locator(`div.order-content-meta-data:nth-of-type(2) > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
  vars.prodDesc2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.prodDesc}`.replace(' | ', '\n'); }, vars);
  await expect(page.locator(`tr.order-content-item:not(.bundled-item) > td.order-content-item-name`).first()).toHaveText(`${vars.prodDesc2 ?? ''}`);
  if (vars.bundle === 'yes') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const products2 = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>('tr.order-content-item.bundled-item > td.order-content-item-name')).map(item => item.textContent.trim());
const products = vars.products

const areArraysEqual = products.length === products2.length && 
                      products.every((item, index) => item.replace(' | ', '') === products2[index]);

return areArraysEqual }, vars)).toBeTruthy();
  }
  await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`div.order-total.clearfix:nth-of-type(1) > .pull-right > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`div.order-total.clearfix:nth-of-type(2) > .pull-right > .woocommerce-Price-amount.amount`).or(page.locator(`div.order-total.clearfix:nth-of-type(2) > .pull-right`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`div.order-total.clearfix:nth-of-type(3) > .pull-right > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`div.order-total.clearfix:nth-of-type(4) > .pull-right`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  if (vars.subscription === 'yes') {
    await verifySubscriptionMyAccount(page, vars);
  }
}

// GI: "Verify Subscription My Account" (68c1fbb683fba1b5fca9d066)
export async function verifySubscriptionMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/"] > .icon > svg`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`i.i-your-plan`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.subscription-id`).first()).toContainText(`#${vars.subscriptionNumber ?? ''}`);
  await expect(page.locator(`.subscription-status`).first()).toContainText(`Active`);
  await expect(page.locator(`td.subscription-content-item-name > strong`).first()).toContainText(`${vars.prodDesc ?? ''}`);
  await expect(page.locator(`td.subscription-content-item-amount > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  await expect(page.locator(`td.subscription-content-item-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  await expect(page.locator(`div.subscription-total.clearfix:nth-of-type(1) > .pull-right > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`div.subscription-total.clearfix:nth-of-type(2) > .pull-right > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`div.subscription-total.clearfix:nth-of-type(3) > .pull-right`).first()).toHaveText(`${vars.total ?? ''} ${vars.period2 ?? ''}`);
  await expect(page.locator(`div.subscription-sidebar-item:nth-of-type(1) > .subscription-sidebar-item-content`).first()).toContainText(`${vars.nextOrder ?? ''}`);
  await expect(page.locator(`div.subscription-sidebar-item:nth-of-type(5) > .subscription-sidebar-item-content`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
}
