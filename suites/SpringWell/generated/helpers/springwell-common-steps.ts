// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "SpringWell - Common steps"
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

// GI: "Accept cookies and close popup" (69a9f9d64ec32f1b870a5e8d)
export async function acceptCookiesAndClosePopup(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    {
      const _lbl = page.locator(`label[for="ketch-banner-button-primary"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ketch-banner-button-primary`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector<HTMLButtonElement>('#ketch-banner-button-primary')

return !!elem }, vars)) {
    {
      const _lbl = page.locator(`label[for="ketch-banner-button-primary"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Accept All")]`).or(page.locator(`#ketch-banner-button-primary`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try {
    await expect(page.locator(`.lepopup-element-html-content > a[href="#"]`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector<HTMLAnchorElement>('.lepopup-element-html-content > a[href="#"]')

return !!elem }, vars)) {
    await page.locator(`.lepopup-element-html-content > a[href="#"]`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Backend order" (685abd7715b3a115491d5617)
export async function backendOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`.order_note`).first()).toHaveText(`Customer provided note:
${vars.notes ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3).item a[href*="/wp-admin/post.php?post="]`).or(page.locator(`tr:nth-of-type(1).item a[href*="/wp-admin/post.php?post="]`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3).item td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr:nth-of-type(1).item td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.variable1 !== '') {
    await expect(page.locator(`tr:nth-of-type(3).item td.name`).or(page.locator(`tr:nth-of-type(1).item td.name`)).first()).toContainText(`${vars.variable1 ?? ''}`);
  }
  if (vars.variable2 !== '') {
    await expect(page.locator(`tr:nth-of-type(3).item td.name`).or(page.locator(`tr:nth-of-type(1).item td.name`)).first()).toContainText(`${vars.variable2 ?? ''}`);
  }
  if (vars.upgrade !== '') {
    await expect(page.locator(`tr:nth-of-type(1).item a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.upgrade_desc ?? ''}`);
  }
  if (vars.upgrade !== '') {
    await expect(page.locator(`tr:nth-of-type(1).item td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.upgrade ?? ''}`);
  }
  if (vars.addon !== '') {
    await expect(page.locator(`tr:nth-of-type(2).item a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.addon_desc ?? ''}`);
  }
  if (vars.addon !== '') {
    await expect(page.locator(`tr:nth-of-type(2).item td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.addon ?? ''}`);
  }
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
}

// GI: "Check Order and Subscriptions on My Account" (68503443f0c060ffbcd4c114)
export async function checkOrderAndSubscriptionsOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  vars.orderNumber = ((await page.locator(`.order > strong`).or(page.locator(`.order > span`)).or(page.locator(`iframe#wcp-checkout-iframe .order > strong`)).textContent()) ?? '').trim();
  await expect(page.locator(`.email > strong`).or(page.locator(`.email > span`)).or(page.locator(`iframe#wcp-checkout-iframe .email > strong`)).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`iframe#wcp-checkout-iframe strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`span > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.total ?? ''}`);
  await orderDetailsMyAccountThankYouPage(page, vars);
  await page.locator(`body > div.elementor.elementor-location-header > section > div > div > div > div > div > div.topbar > div > ul > li.account-dropdown`).or(page.locator(`body > header > section > div > div > div > div > div > div.topbar > div > ul > li.account-dropdown`)).first().hover();
  await page.locator(`a[href*="/account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).or(page.locator(`a[href*="/account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  await orderDetailsMyAccountThankYouPage(page, vars);
  if (vars.subscription === 'yes') {
    await subscriptionDetails(page, vars);
  }
}

// GI: "Check the total" (69aacde875b939711423dde1)
export async function checkTheTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotal}`;
let shipping = `${vars.shippingPrice}`;
let tax = `${vars.taxPrice}`;
let total = `${vars.total}`;

if (shipping.includes("Free") || shipping === ''){
    shipping = "0.00";
};

unit = unit.replace(",","");
shipping = shipping.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit+shipping+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
}

// GI: "Close popup" (684c80fd77cd2d1a619ccc2c)
export async function closePopup(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(10000);
  try {
    await page.locator(`xpath=//a[contains(text(), "×")]`).or(page.locator(`a[onclick="return lepopup_close();"]`)).or(page.locator(`#lepopup-popup-35 > div:nth-child(1) > div > div.lepopup-element.lepopup-element-10.lepopup-element-html.lepopup-animated.lepopup-fadeIn > div > a`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "Close Privacy popup" (68b9ed90cee4fa6dde82c7db)
export async function closePrivacyPopup(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`svg.ketch-h-6 > path`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "Exit test" (68c7fd2a189a381f8e7f2e98)
export async function exitTest(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.startUrl === vars.prodUrl) {
    // TODO: command="exit" target="" value="passing"
  }
}

// GI: "Extract user from email" (684c8d42f0c060ffbc7f23e9)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /^(qa\+)?(\w+)[^@]+/g
const str = `${vars.email}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Fill Affirm" (685079cd5a6b7c1f4825f845)
export async function fillAffirm(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Visa ending in 1111`;
  vars.paymentMethodMeta = `Credit Cards`;
  {
    const _lbl = page.locator(`label[for="payment_method_braintree_cc"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_braintree_cc`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`iframe[name="braintree-hosted-field-number"]`).first().contentFrame().locator(`#credit-card-number`).first().fill(`4111111111111111`); } catch { await page.locator(`iframe[name="braintree-hosted-field-number"]`).first().contentFrame().locator(`#credit-card-number`).first().selectOption(`4111111111111111`); }
  try { await page.locator(`iframe[name="braintree-hosted-field-expirationDate"]`).first().contentFrame().locator(`#expiration`).first().fill(`1230`); } catch { await page.locator(`iframe[name="braintree-hosted-field-expirationDate"]`).first().contentFrame().locator(`#expiration`).first().selectOption(`1230`); }
}

// GI: "Fill CC" (6850339777cd2d1a6158faba)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Visa ending in 1111`;
  vars.paymentMethodMeta = `Credit Cards`;
  {
    const _lbl = page.locator(`label[for="payment_method_braintree_cc"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_braintree_cc`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`iframe[name="braintree-hosted-field-number"]`).first().contentFrame().locator(`#credit-card-number`).first().fill(`4111111111111111`); } catch { await page.locator(`iframe[name="braintree-hosted-field-number"]`).first().contentFrame().locator(`#credit-card-number`).first().selectOption(`4111111111111111`); }
  try { await page.locator(`iframe[name="braintree-hosted-field-expirationDate"]`).first().contentFrame().locator(`#expiration`).first().fill(`1229`); } catch { await page.locator(`iframe[name="braintree-hosted-field-expirationDate"]`).first().contentFrame().locator(`#expiration`).first().selectOption(`1229`); }
}

// GI: "Fill Checkout" (685028b677cd2d1a6151a9ba)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
  await page.locator(`#select2-billing_country-container > span`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//li[contains(text(), "${vars.countryComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
  try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
  await page.locator(`#select2-billing_state-container > span`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.stateComplete ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.stateComplete ?? ''}`); }
  await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  await page.locator(`xpath=//span[contains(text(), "Ship to a different address?")]`).or(page.locator(`#ship-to-different-address > label.woocommerce-form__label.woocommerce-form__label-for-checkbox.checkbox > span`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
  try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
  await page.locator(`xpath=//span[contains(text(), "Select a country / region…")]`).or(page.locator(`#select2-shipping_country-container > span`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//li[contains(text(), "${vars.countryComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
  try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
  try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  await page.locator(`xpath=//span[contains(text(), "Select an option…")]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.stateComplete ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.stateComplete ?? ''}`); }
  await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#order_comments`).first().fill(`${vars.notes ?? ''}`); } catch { await page.locator(`#order_comments`).first().selectOption(`${vars.notes ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Fill PayPal" (685aa42d4b1c6abf25d1fb2e)
export async function fillPayPal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `${vars.payPalUser ?? ''}`;
  vars.paymentMethodMeta = `PayPal`;
  {
    const _lbl = page.locator(`label[for="payment_method_braintree_paypal"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_braintree_paypal`).filter({ visible: true }).first().click({ force: true }); }
  }
  await payPalTemplate(page, vars);
}

// GI: "Login" (684c8e56388232057b710322)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const url = page.url()

return url.includes(vars.startUrlaccount/') })()) {
    await page.locator(`.account-dropdown > a[href*="/account/"]`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#my-account-menu`)).not.toHaveCount(0);
  await expect(page.locator(`.yith-wcmap-banners-wrapper`)).not.toHaveCount(0);
}

// GI: "Login Admin" (685041cf388232057bd2bc60)
export async function loginAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}backend`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).or(page.locator(`#username`)).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`#username`)).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().selectOption(`${vars.adminPass ?? ''}`); }
  try {
    vars.answer = ((await page.locator(`label[for="jetpack_protect_answer"]`).textContent()) ?? '').trim();
  } catch { /* optional step: extract */ }
  try {
    vars.result = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const expression = `${vars.answer}`; // Example, can be "7 - 8 =", "7 * 8 =", or "7 / 8 ="
const parts = expression.split(/\s+/).filter(str => str !== "=" && str !== ""); // Split by one or more spaces, remove "=" and empty strings
const [num1, operator, num2] = parts;
let result;

switch (operator) {
  case "+":
    result = parseFloat(num1) + parseFloat(num2);
    break;
  case "-":
    result = parseFloat(num1) - parseFloat(num2);
    break;
  case "*":
    result = parseFloat(num1) * parseFloat(num2);
    break;
  case "/":
    result = num2 !== "0" ? parseFloat(num1) / parseFloat(num2) : "Error: Division by zero";
    break;
  default:
    result = "Error: Invalid operator";
}

return result }, vars);
  } catch { /* optional step: extractEval */ }
  try {
    try { await page.locator(`#jetpack_protect_answer`).first().fill(`${vars.result ?? ''}`); } catch { await page.locator(`#jetpack_protect_answer`).first().selectOption(`${vars.result ?? ''}`); }
  } catch { /* optional step: assign */ }
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

// GI: "Logout" (684c89a8388232057b706b0b)
export async function logout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="#"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(),'Logout']`).or(page.locator(`a[href*="?action=logout&redirect_to=https%3A%2F%2Fspringwellwater-staging.mystagingwebsite.com"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Order details My account & Thank you page" (685039ca388232057bd06d85)
export async function orderDetailsMyAccountThankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`tr:nth-of-type(3).order_item a[href*="/product/"]`).or(page.locator(`tr:nth-of-type(1).order_item a[href*="/product/"]`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.variable2 !== '') {
    await expect(page.locator(`tr:nth-of-type(3).order_item`).or(page.locator(`tr:nth-of-type(1).order_item`)).first()).toContainText(`${vars.variable2 ?? ''}`);
  }
  if (vars.variable1 !== '') {
    await expect(page.locator(`tr:nth-of-type(3).order_item`).or(page.locator(`tr:nth-of-type(1).order_item`)).first()).toContainText(`${vars.variable1 ?? ''}`);
  }
  await expect(page.locator(`tr:nth-of-type(3).order_item > td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr:nth-of-type(1).order_item > td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
  if (vars.upgrade_desc !== '') {
    await expect(page.locator(`tr:nth-of-type(1).order_item a[href*="/product/"]`).first()).toContainText(`${vars.upgrade_desc ?? ''}`);
  }
  if (vars.upgrade_desc !== '') {
    await expect(page.locator(`tr:nth-of-type(1).order_item > td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.upgrade ?? ''}`);
  }
  if (vars.addon_desc !== '') {
    await expect(page.locator(`tr:nth-of-type(2).order_item a[href*="/product/"]`).first()).toContainText(`${vars.addon_desc ?? ''}`);
  }
  if (vars.addon_desc !== '') {
    await expect(page.locator(`tr:nth-of-type(2).order_item > td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.addon ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe#wcp-checkout-iframe tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(2) > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(6) > td`).first()).toHaveText(`${vars.notes ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  if (vars.subscription === 'yes') {
    vars.subscriptionID = ((await page.locator(`a[href*="/account/view-subscription/"][aria-label*="View subscription number"]`).textContent()) ?? '').trim();
  }
  if (vars.subscription === 'yes') {
    vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.subscriptionID}`.replace('#','') }, vars);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.total ?? ''} ${vars.freq ?? ''}`);
  }
}

// GI: "PayPal template" (685aa49115b3a1154917fdaf)
export async function payPalTemplate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="www.sandbox.paypal.com"]`).first().contentFrame().locator(`.paypal-button-label-container`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[name*="paypal_buttons"]`).first().contentFrame().locator(`.paypal-button-label-container`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try {
    await expect(page.locator(`.loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await page.locator(`xpath=//a[contains(text(), "Click to Continue")]`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try {
    {
      const _lbl = page.locator(`label[for="backToInputEmailLink"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#backToInputEmailLink`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
  try { await page.locator(`#email`).first().fill(`${vars.payPalUser ?? ''}`); } catch { await page.locator(`#email`).first().selectOption(`${vars.payPalUser ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="btnNext"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#btnNext`).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`.loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try { await page.locator(`div#login_passworddiv > div > input#password`).first().fill(`${vars.payPalPass ?? ''}`); } catch { await page.locator(`div#login_passworddiv > div > input#password`).first().selectOption(`${vars.payPalPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="btnLogin"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#btnLogin`).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`.loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await expect(page.locator(`.loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForTimeout(5000);
  await expect(page.locator(`#consentButton`).or(page.locator(`xpath=//button[contains(text(),'Save and Continue')]`)).or(page.locator(`button[data-id='payment-submit-btn']`)).or(page.locator(`xpath=//button[contains(text(),'Complete Purchase')]`))).not.toHaveCount(0);
  {
    const _lbl = page.locator(`label[for="consentButton"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#consentButton`).or(page.locator(`xpath=//button[contains(text(),'Save and Continue')]`)).or(page.locator(`button[data-id='payment-submit-btn']`)).or(page.locator(`xpath=//button[contains(text(),'Complete Purchase')]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`.loader`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.loader`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`))).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForTimeout(10000);
  await page.waitForLoadState('load');
  await blockUI(page, vars);
}

// GI: "Register" (684c8930f0c060ffbc7ec993)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.account-dropdown > a[href*="/account/"]`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="reg_email"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#reg_email`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.yith-wcmap-banners-wrapper`)).not.toHaveCount(0);
}

// GI: "Renewal order" (685abc219ce7a61f50d1f085)
export async function renewalOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "#${vars.subscriptionID ?? ''}")]`).or(page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`)).filter({ visible: true }).first().click({ force: true });
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`div.woocommerce_subscriptions_related_orders > table > tbody > tr:nth-of-type(1) > td:nth-of-type(1) > a[href*="/wp-admin/post.php?post="]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Subscription details" (685ab9c79ce7a61f50d17b60)
export async function subscriptionDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/account/view-subscription/${vars.subscriptionID ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
  await expect(page.locator(`td.product-name`)).not.toHaveCount(0);
  await expect(page.locator(`td.product-total`).first()).toHaveText(`${vars.unitPrice ?? ''} ${vars.freq ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toContainText(`${vars.shippinPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toHaveText(`${vars.total ?? ''} ${vars.freq ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
}
