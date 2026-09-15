// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BM - Common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, placeOrderElement } from './common-steps-for-all-projects';

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

// GI: "Check Order on My Account" (681ab0975a5ac9fb568aca7f)
export async function checkOrderOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`img#sa_close`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  vars.subtotalPrice = `${vars.subtotalProduct ?? ''}`;
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  vars.orderNumber = ((await page.locator(`.order > strong`).or(page.locator(`.order > span`)).textContent()) ?? '').trim();
  await expect(page.locator(`.email > strong`).or(page.locator(`.email > span`)).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`span > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.method > strong`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
  if (vars.weight !== '') {
    await expect(page.locator(`tr > td > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.weight ?? ''}`);
  }
  if (vars.size !== '') {
    await expect(page.locator(`tr > td > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.size ?? ''}`);
  }
  if (vars.prod_desc.includes('Ball')) {
    await expect(page.locator(`ul.wc-item-meta`).first()).toContainText(`Drilling Protection:

Yes - Covers Cracking During Ball Drilling

Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Specific Requests:

Testing request

Money Saving Options:

Add Max Tack Ball Cleaner 8oz.

Money Saving Options:

Add BowlersMart Blue Shammy`);
  }
  if (vars.prod_desc.includes('Shoes')) {
    await expect(page.locator(`ul.wc-item-meta`).first()).toContainText(`Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Money Saving Options:

Add KR Strikeforce Pure Slide Conditioner

Money Saving Options:

Add 3G Shoe Fresheners

FREE Gift with Purchase!:

${vars.shirt ?? ''}`);
  }
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`iframe#wcp-checkout-iframe td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe#wcp-checkout-iframe tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(2) > td`)).or(page.locator(`iframe#wcp-checkout-iframe tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`)).first()).toContainText(`FREE`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingProtection ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(6) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  if (false) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await page.goto(`${vars.startUrl ?? ''}my-account/`);
  await page.waitForLoadState('load');
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  try {
    await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  } catch { /* optional step: assertText */ }
  await page.locator(`xpath=//a[contains(text(),'${vars.orderNumber ?? ''}')]`).filter({ visible: true }).first().click({ force: true });
  if (vars.weight !== '') {
    await expect(page.locator(`tr > td > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.weight ?? ''}`);
  }
  if (vars.size !== '') {
    await expect(page.locator(`tr > td > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.size ?? ''}`);
  }
  if (vars.prod_desc.includes('Ball')) {
    await expect(page.locator(`ul.wc-item-meta`).first()).toContainText(`Drilling Protection:

Yes - Covers Cracking During Ball Drilling

Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Specific Requests:

Testing request

Money Saving Options:

Add Max Tack Ball Cleaner 8oz.

Money Saving Options:

Add BowlersMart Blue Shammy`);
  }
  if (vars.prod_desc.includes('Shoes')) {
    await expect(page.locator(`ul.wc-item-meta`).first()).toContainText(`Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Money Saving Options:

Add KR Strikeforce Pure Slide Conditioner

Money Saving Options:

Add 3G Shoe Fresheners

FREE Gift with Purchase!:

${vars.shirt ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(2) > td`)).first()).toContainText(`FREE`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingProtection ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(6) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  if (false) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
}

// GI: "Exit Test - Prod Site" (68bec4b8eeab2f751a2da7a8)
export async function exitTestProdSite(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.startUrl === vars.prodUrl) {
    // TODO: command="exit" target="" value="passing"
  }
}

// GI: "Extract user from email" (681a8e2c5a5ac9fb568853a9)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(30000);
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /^(qa\+)?(\w+)[^@]+/g
const str = `${vars.email}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Fill Amazon Pay" (681b7ffd5a5ac9fb56c453bb)
export async function fillAmazonPay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#ap_email`).first().fill(`christian+test2@saucal.com`); } catch { await page.locator(`#ap_email`).first().selectOption(`christian+test2@saucal.com`); }
  try { await page.locator(`#ap_password`).first().fill(`fric2171Biot`); } catch { await page.locator(`#ap_password`).first().selectOption(`fric2171Biot`); }
  {
    const _lbl = page.locator(`label[for="signInSubmit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#signInSubmit`).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`.a-box.a-first > .a-box-inner > .margin-right`).first()).toHaveText(`asdasd`);
  } catch { /* optional step: assertText */ }
  vars.totalAmazon = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,''))

return `${vars.Symbol} `+total }, vars);
  await expect(page.locator(`.a-size-base.order-amount`).first()).toContainText(`${vars.totalAmazon ?? ''}`);
  await page.locator(`#continue-button > .a-button-inner > input[type="submit"].a-button-input`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.a-box-inner > .a-spinner.a-spinner-medium`).filter({ visible: true }).first().click({ force: true });
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve) => {
  const checkExistence = setInterval(() => {
    let blockElements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('.a-box-inner > .a-spinner.a-spinner-medium'));

    if (blockElements.length === 0) {
      clearInterval(checkExistence);
      console.log("✅ Spinner unblocked!");
      resolve(true);
    } else {
      console.log("⏳ Waiting for  Spinner to unblock...");
    }
  }, 1000);
}) }, vars);
  await blockUI(page, vars);
}

// GI: "Fill CC" (681a936dc233b949d21e0a45)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Visa credit card`;
  {
    const _lbl = page.locator(`label[for="payment_method_woocommerce_payments"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_woocommerce_payments`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-numberInput`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-numberInput`).first().selectOption(`4242 4242 4242 4242`); }
  vars.year = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const nextYear = (new Date().getFullYear() + 1).toString().slice(-2);
return nextYear }, vars);
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-expiryInput`).first().fill(`12 / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-expiryInput`).first().selectOption(`12 / ${vars.year ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-cvcInput`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-cvcInput`).first().selectOption(`123`); }
}

// GI: "Fill checkout" (681a9283c233b949d21dc2d8)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
  try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#billing_country`).first().fill(`${vars.country ?? ''}`); } catch { await page.locator(`#billing_country`).first().selectOption(`${vars.country ?? ''}`); }
  try { await page.locator(`#billing_state`).first().fill(`${vars.state ?? ''}`); } catch { await page.locator(`#billing_state`).first().selectOption(`${vars.state ?? ''}`); }
  try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  await page.locator(`xpath=//span[contains(text(), "Create an Account - Join Striking Rewards & Earn Points on Your Order")]`).or(page.locator(`.form-row > label.woocommerce-form__label.woocommerce-form__label-for-checkbox.checkbox > span`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#account_username`).first().fill(`${vars.alphanumeric ?? ''}`); } catch { await page.locator(`#account_username`).first().selectOption(`${vars.alphanumeric ?? ''}`); }
  try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
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
    try { await page.locator(`#shipping_country`).first().fill(`${vars.country ?? ''}`); } catch { await page.locator(`#shipping_country`).first().selectOption(`${vars.country ?? ''}`); }
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
    try { await page.locator(`#shipping_state`).first().fill(`${vars.state ?? ''}`); } catch { await page.locator(`#shipping_state`).first().selectOption(`${vars.state ?? ''}`); }
  }
  if (false) {
    try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  try { await page.locator(`#order_comments`).first().fill(`Test order note`); } catch { await page.locator(`#order_comments`).first().selectOption(`Test order note`); }
}

// GI: "Fill PayPal" (681b86bf8723f313c7b5bea1)
export async function fillPayPal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `PayPal`;
}

// GI: "Go To My Account" (681a7c745a5ac9fb5686c9a6)
export async function goToMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`i.icon-user`).or(page.locator(`a[href='${vars.startUrl ?? ''}my-account/`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Login" (681a89855a5ac9fb5688157c)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Login Admin" (681e5290e75bee6181bf18be)
export async function loginAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
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
      else { await page.locator(`#correct-admin-email`).or(page.locator(`xpath=//*[contains(text(),'The email is correct')]`)).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
  await expect(page.locator(`#wpadminbar`)).not.toHaveCount(0);
}

// GI: "Register" (681a7d57c233b949d217a9c6)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#reg_username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Select Amazon Pay" (681b7fa18723f313c7b2767f)
export async function selectAmazonPay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Amazon Pay`;
  {
    const _lbl = page.locator(`label[for="payment_method_amazon_payments_advanced"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_amazon_payments_advanced`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
}

// GI: "Select Pay with Affirm" (682490ebab4ff4354d50e80a)
export async function selectPayWithAffirm(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Affirm`;
  {
    const _lbl = page.locator(`label[for="payment_method_woocommerce_payments_affirm"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_woocommerce_payments_affirm`).filter({ visible: true }).first().click({ force: true }); }
  }
  await placeOrderElement(page, vars);
  await page.waitForTimeout(40000);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="success-in-context-supported-btn"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Authorize Test Payment")]`).or(page.locator(`#success-in-context-supported-btn`)).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Select PayPal" (681b86848723f313c7b5a815)
export async function selectPayPal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `PayPal`;
  {
    const _lbl = page.locator(`label[for="payment_method_ppcp-gateway"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_ppcp-gateway`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[title="PayPal"]`).first().contentFrame().locator(`img.paypal-logo.paypal-logo-paypal`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try {
    {
      const _lbl = page.locator(`label[for="backToInputEmailLink"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#backToInputEmailLink`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
  try { await page.locator(`input#email`).or(page.locator(`input[name='login_email']`)).or(page.locator(`input#login_email`)).first().fill(`${vars.payPalUser ?? ''}`); } catch { await page.locator(`input#email`).or(page.locator(`input[name='login_email']`)).or(page.locator(`input#login_email`)).first().selectOption(`${vars.payPalUser ?? ''}`); }
  await page.locator(`button#btnNext`).or(page.locator(`button[name='btnNext']`)).or(page.locator(`xpath=//button[contains(text(),'Next')]`)).or(page.locator(`#publicCredentialSubmitForm > button`)).filter({ visible: true }).first().click({ force: true });
  try {
    await page.locator(`xpath=//a[contains(text(),'Log in with a password instead')]`).or(page.locator(`xpath=//button[contains(text(),'Use Password Instead')]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try { await page.locator(`div > input#password`).or(page.locator(`input[name='login_password']`)).first().fill(`${vars.payPalPass ?? ''}`); } catch { await page.locator(`div > input#password`).or(page.locator(`input[name='login_password']`)).first().selectOption(`${vars.payPalPass ?? ''}`); }
  await page.locator(`button[data-atomic-wait-intent='Submit_Password']`).or(page.locator(`button#btnLogin`)).or(page.locator(`button[name='btnLogin']`)).or(page.locator(`xpath=//button[contains(text(), "Log In")][1]`)).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="payment-submit-btn"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`[data-testid="submit-button-initial"]`).or(page.locator(`xpath=//button[contains(text(), "Complete Purchase")]`)).or(page.locator(`#payment-submit-btn`)).or(page.locator(`#one-time-cta > div > div > div.pe-2`)).or(page.locator(`xpath=//button[@id='one-time-cta']/div/div/div[contains(text(), "Pay")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`.Spinner_spinner_2t_Ob`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
}
