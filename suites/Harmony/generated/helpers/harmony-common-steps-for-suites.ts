// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Harmony - Common Steps for suites"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, subscriptionMenuHarmony } from './common-steps-for-all-projects';

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

// GI: "Add Private Order Note" (644fdce400e2acd59f62211b)
export async function addPrivateOrderNote(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="order_note_type"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#order_note_type`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="add_order_note"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#add_order_note`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#add_order_note`).first().fill(`Testing Private note`); } catch { await page.locator(`#add_order_note`).first().selectOption(`Testing Private note`); }
  await page.locator(`button[type="button"].add_note`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`li.note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Testing Private note`);
}

// GI: "Admin login" (68e52d92798cc0605317d843)
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

return element != null && element != undefined  }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await expect(page.locator(`#adminmenumain`)).not.toHaveCount(0);
}

// GI: "Check My Account Order Details" (68e52cbda2ca9569f1b81110)
export async function checkMyAccountOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "SAU/CAL")]`).or(page.locator(`.beta > a[href*="/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
  await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await checkOrderDetails(page, vars);
}

// GI: "Check order Details" (68e52b1da2ca9569f1b7c3df)
export async function checkOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`tbody > tr > td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.signUpFee === '') {
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.signUpFee !== '') {
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotal ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(2) > td > span`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(3) > td`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(4) > td > span`).first()).toContainText(`${vars.total ?? ''}`);
  if (vars.country === 'CA') {
    await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if (vars.country === 'US') {
    await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  await currencyChecker(page, vars);
}

// GI: "Check renewal Total" (66daef8678ca24491ea1b166)
export async function checkRenewalTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let unitPrice = `${vars.unitPrice}`
let subtotal = `${vars.subtotalRenew}`;
let discount = `${vars.discountRenew}`

if (discount === ""){
    discount = "0.00";
};

let tax = `${vars.taxRenew}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.totalRenew}`;

subtotal = subtotal.replace(",","").trim();
unitPrice = unitPrice.replace(",","").trim();
discount = discount.replace(",","").trim();
tax = tax.replace(",","").trim();
total = total.replace(",","").trim();

unitPrice = Number(unitPrice.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));


let total2 = unitPrice-discount+tax;
total2 = Number(total2.toFixed(2));

return total === total2 && subtotal === unitPrice }, vars)).toBeTruthy();
}

// GI: "Check Total" (66da289478ca24491e7f334e)
export async function checkTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let unitPrice = `${vars.unitPrice}`
let signUpFee = `${vars.signUpFee}`
let subtotal = `${vars.subtotal}`;
let discount = `${vars.discount}`
if (signUpFee === ""){
    signUpFee = "0.00";
};
if (discount === ""){
    discount = "0.00";
};

let tax = `${vars.taxPrice}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.total}`;

subtotal = subtotal.replace(",","").trim();
signUpFee = signUpFee.replace(",","").trim();
unitPrice = unitPrice.replace(",","").trim();
discount = discount.replace(",","").trim();
tax = tax.replace(",","").trim();
total = total.replace(",","").trim();

unitPrice = Number(unitPrice.replace(`${vars.Symbol}`,""));
signUpFee = Number(signUpFee.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let subtotal2 = unitPrice+signUpFee
subtotal2 = Number(subtotal2.toFixed(2));

let total2 = subtotal2-discount+tax;
total2 = Number(total2.toFixed(2));

return total === total2 && subtotal === subtotal2 }, vars)).toBeTruthy();
  if (vars.subscription === 'yes') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let taxRenew = `${vars.taxRenew}`;
let totalRenew = `${vars.totalRenew}`;

unit = unit.replace(",","");
taxRenew = taxRenew.replace(",","");
totalRenew = totalRenew.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
taxRenew = Number(taxRenew.replace(`${vars.Symbol}`,""));
totalRenew = Number(totalRenew.replace(`${vars.Symbol}`,""));

let totalRenew2 = unit+taxRenew;
totalRenew2 = Number(totalRenew2.toFixed(2));

return totalRenew === totalRenew2 }, vars)).toBeTruthy();
  }
}

// GI: "Currency checker" (60d347cb0181726b14076931)
export async function currencyChecker(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elements = Array.from<any>(document.querySelectorAll(
  "span > bdi > .woocommerce-Price-currencySymbol, span:not(.order-attribution-total-spend):not(.order-attribution-average-order-value) > span > .woocommerce-Price-currencySymbol"
));

// Filter for visible elements
const visibleElements = Array.from<any>(elements).filter(el => {
  const style = window.getComputedStyle(el);
  return (
    style.display !== "none" && 
    style.visibility !== "hidden" && 
    style.opacity !== "0" && 
    el.offsetParent !== null // Ensures it's not detached or hidden by a parent
  );
});


let result = [];
const isCurrencySymbol = (currentValue) => currentValue === `${vars.Symbol}`;

    for (let i = 0; i < visibleElements.length; i++) {
        result.push(visibleElements[i].textContent);
    }
    
    return result.every(isCurrencySymbol);
 }, vars)).toBeTruthy();
}

// GI: "FastSpring Payment Gateway" (66da1b0989b30b261f2e84c8)
export async function fastSpringPaymentGateway(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Pay with FastSpring`;
  await expect(page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`div.total-group.pricegroup > div#total-label > div > span > span.ng-binding`).first()).toContainText(`${vars.total ?? ''}`);
  if (vars.taxPrice !== '') {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`div.taxline > span:not(.ng-hide) > span[ng-show='taxRate'] > span.ng-binding`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let saved = vars.saved

return saved !== "yes" })()) {
    try { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`#card-number`).first().fill(`4242424242424242`); } catch { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`#card-number`).first().selectOption(`4242424242424242`); }
  }
  if ((() => { let saved = vars.saved

return saved !== "yes" })()) {
    try { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`#card-expire-month-year`).first().fill(`12 / 30`); } catch { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`#card-expire-month-year`).first().selectOption(`12 / 30`); }
  }
  if ((() => { let saved = vars.saved

return saved !== "yes" })()) {
    try { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`#card-security`).first().fill(`*RK6W`); } catch { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`#card-security`).first().selectOption(`*RK6W`); }
  }
  if ((() => { let saved = vars.saved

return saved === 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`#savedPaymentMethod`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`#compliance-checkbox`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  await expect(page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`button.btn.pay-button.ng-binding.ng-scope`).first()).toContainText(`${vars.total ?? ''}`);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`button.btn.pay-button.ng-binding.ng-scope`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  await expect(page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`strong.pin-total-price`).first()).toContainText(`${vars.total ?? ''}`);
  if (vars.taxPrice !== '') {
    await expect(page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`div.taxline.ng-binding.ng-scope`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[name="fsc-popup-frame"]`).first().contentFrame().locator(`.btn.btn-primary.continue-button`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
}

// GI: "Fill Bank Transfer" (68e8325adc40aecad0d653fd)
export async function fillBankTransfer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="payment_method_bacs"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bacs`).filter({ visible: true }).first().click({ force: true }); }
  }
  vars.{{paymentMethod}} = `Direct Bank Transfer`;
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#terms_acceptance').checked }, vars)) {
    {
      const _lbl = page.locator(`label[for="terms_acceptance"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms_acceptance`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Fill CC" (68e5187ba2ca9569f1b39612)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit / Debit Card`;
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`${vars.cc ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`${vars.cc ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`${vars.month ?? ''} / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`${vars.month ?? ''} / ${vars.year ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`${vars.cvv ?? ''}`); }
  try {
    await page.locator(`xpath=//label[contains(text(), "Save payment information to my account for future purchases.")]`).or(page.locator(`label[for="wc-stripe-new-payment-method"]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "Fill Checkout" (68e5144d798cc0605310a6d5)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try {
    try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
  } catch { /* optional step: assign */ }
  if (false) {
    try { await page.locator(`#billing_invoice_cc_email_addresses`).first().fill(`${vars.emailCC ?? ''}`); } catch { await page.locator(`#billing_invoice_cc_email_addresses`).first().selectOption(`${vars.emailCC ?? ''}`); }
  }
  await expect(page.locator(`#select2-billing_country-container`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
  // skipped: select-open click on '#billing_state' (Select2 pattern)
  await page.locator(`#billing_state`).first().selectOption(`${vars.state ?? ''}`);
  try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="billing_phone"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_phone`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  if (vars.own === 'yes') {
    await page.locator(`xpath=//label[contains(text(), "on your own behalf")]`).or(page.locator(`label[for="billing_behalf_company_own"].radio`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.own !== 'yes') {
    await page.locator(`xpath=//label[contains(text(), "on behalf of a company")]`).or(page.locator(`label[for="billing_behalf_company_company"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.own !== 'yes') {
    try { await page.locator(`#billing_legal_name`).first().fill(`Legal Inc.`); } catch { await page.locator(`#billing_legal_name`).first().selectOption(`Legal Inc.`); }
  }
  if (vars.own !== 'yes') {
    try { await page.locator(`#billing_registered_address`).first().fill(`123 False, Miami FL 33126 US`); } catch { await page.locator(`#billing_registered_address`).first().selectOption(`123 False, Miami FL 33126 US`); }
  }
  if (vars.own !== 'yes') {
    try { await page.locator(`#billing_company_number`).first().fill(`1231231234`); } catch { await page.locator(`#billing_company_number`).first().selectOption(`1231231234`); }
  }
  if (vars.own !== 'yes') {
    try { await page.locator(`#billing_incorporation_place`).first().fill(`test`); } catch { await page.locator(`#billing_incorporation_place`).first().selectOption(`test`); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`td.product-total > span > span.woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.signUpFee !== '') {
    await expect(page.locator(`td.product-total > span > span.subscription-details > span > bdi`).first()).toHaveText(`${vars.signUpFee ?? ''}`);
  }
  vars.subtotal = ((await page.locator(`tr.cart-subtotal:not(.recurring-total) > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  if (vars.country !== 'CA') {
    await blockUI(page, vars);
  }
  if (vars.country !== 'CA') {
    await page.waitForTimeout(10000);
  }
  if (vars.country !== 'CA') {
    await blockUI(page, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tr.tax-rate > td > .woocommerce-Price-amount.amount , tr.fee .woocommerce-Price-amount.amount')

return !element == false }, vars)) {
    vars.taxPrice = ((await page.locator(`tr.tax-rate:not(.recurring-total) > td > span.woocommerce-Price-amount.amount`).or(page.locator(`tr.fee:not(.recurring-total) .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  vars.total = ((await page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total:not(.recurring-total) > td > strong > span`).or(page.locator(`tr:not(.recurring-total) strong > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  if (vars.subscription === 'yes') {
    await expect(page.locator(`tr.cart-subtotal.recurring-total > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.subscription === 'yes') {
    vars.taxRenew = ((await page.locator(`tr.tax-rate.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee.recurring-total .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if (vars.subscription === 'yes') {
    vars.totalRenew = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  {
    const _lbl = page.locator(`label[for="terms"]`).or(page.locator(`label[for="terms_acceptance"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms`).or(page.locator(`#terms_acceptance`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await checkTotal(page, vars);
}

// GI: "loading price" (67d4901692add9437d67563a)
export async function loadingPrice(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve) => {
  const checkExistence = setInterval(() => {
    let prices = Array.from<any>(document.querySelectorAll('p.price > span.wcpbc-price.loading'));

    if (prices.length === 0) {
      clearInterval(checkExistence);
      console.log("✅ Prices loaded!");
      resolve(true);
    } else {
      console.log("⏳ Waiting for  Prices to load...");
    }
  }, 200);
}) }, vars)).toBeTruthy();
}

// GI: "Login" (68e52f51798cc060531823bb)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    vars.emailUser = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+?\w+[^@]/g;
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  } catch { /* optional step: extractEval */ }
  try { await page.locator(`#username`).or(page.locator(`input[name="username"]`)).or(page.locator(`div.lwa-username > input`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).or(page.locator(`input[name="username"]`)).or(page.locator(`div.lwa-username > input`)).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).or(page.locator(`input[name="password"]`)).or(page.locator(`div.lwa-password > input`)).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).or(page.locator(`input[name="password"]`)).or(page.locator(`div.lwa-password > input`)).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`button[name="login"]`).or(page.locator(`input.button-primary[value="Log In"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "My Account Order Details" (68e8196edc40aecad0d16e99)
export async function myAccountOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "SAU/CAL")]`).or(page.locator(`.beta > a[href*="/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
  await expect(page.locator(`tr:first-of-type > td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
  await checkOrderDetails(page, vars);
  await currencyChecker(page, vars);
  await subscriptionMenuHarmony(page, vars);
  await currencyChecker(page, vars);
}

// GI: "Next Payment date" (62cd5d81760cc3cd6b6d3f7d)
export async function nextPaymentDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let nextPay = `${vars.nextPay}`
nextPay = Date.parse(nextPay)
nextPay = new Date(nextPay)

// Set time zone and locale based on country
const timeZone = 'America/Toronto';

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

let monthAssess = ( date.getMonth()+1 ) % 12 === nextPay.getMonth()
let yearAssess = 11 === date.getMonth() ? date.getYear() + 1 === nextPay.getYear() : date.getYear() === nextPay.getYear()

return monthAssess && date.getDate() === nextPay.getDate() && yearAssess
 }, vars)).toBeTruthy();
}

// GI: "Product- Managed Hosting & Maintenance" (68e532b8a2ca9569f1b9389c)
export async function productManagedHostingMaintenance(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/managed-woocommerce-hosting-maintenance/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await loadingPrice(page, vars);
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Up to 2,500 orders per month`); } catch { await page.locator(`#plan`).first().selectOption(`Up to 2,500 orders per month`); }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a:nth-of-type(1)');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124176` }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a:last-of-type');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124178` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a:nth-of-type(1)');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124175` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a:last-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124177` }, vars)).toBeTruthy();
  }
  vars.unitPrice = ((await page.locator(`p.price > span > span > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
  vars.variable = ((await page.locator(`#plan`).textContent()) ?? '').trim();
  await currencyChecker(page, vars);
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Register" (60cc8e574f70ce5aa473cd26)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.entry-content`)).not.toHaveCount(0);
}

// GI: "Subscription details Thank you page" (68e80193bb4ffb8ae2b0cd18)
export async function subscriptionDetailsThankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscriptionID = ((await page.locator(`td.subscription-id > a[href*="/view-subscription/"]`).textContent()) ?? '').trim();
  vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ID = `${vars.subscriptionID}`
ID = ID.replace("#","")
return ID }, vars);
  if (!vars.paymentMethod.includes('Bank')) {
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  }
  if (vars.paymentMethod.includes('Bank')) {
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Pending`);
  }
  await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  vars.nextPay = ((await page.locator(`td.subscription-next-payment`).textContent()) ?? '').trim();
  if (!vars.paymentMethod.includes('Bank')) {
    await nextPaymentDate(page, vars);
  }
}

// GI: "Thank You Page" (68e529dda2ca9569f1b78889)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`.total > strong > span > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.method > strong`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
}
