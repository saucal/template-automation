// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Ride1Up - Common Steps for all Projects"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';

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

// GI: "Block Image sizes" (63c71c660b7aefb972ffc43c)
export async function blockImageSizes(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // fetch all elements
const elems = Array.from<any>(document.querySelectorAll("body *"));
// loop through elements and set static dimensions
elems.forEach((elem) => {
    const style = window.getComputedStyle(elem);
    elem.style.setProperty("height", style.height, "important");
    elem.style.setProperty("max-height", style.height, "important");
    elem.style.setProperty("min-height", "0", "important");
    elem.style.setProperty("padding", style.padding, "important");
    elem.style.setProperty("margin", style.margin, "important");
}) }, vars);
}

// GI: "BlockUI" (63c71c660b7aefb972ffc43d)
export async function blockUI(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await expect(page.locator(`.blockUI`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let block = document.getElementsByClassName("blockUI")
return block.length > 0 }, vars)) {
      await expect(page.locator(`.blockUI`)).toHaveCount(0);
    }
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForTimeout(1000);
}

// GI: "Calculate Subtotal" (63c71c660b7aefb972ffc43e)
export async function calculateSubtotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let currency = vars.currency
let project = vars.project
return currency === "USD" || currency === "GBP" })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").trim());
const qty = vars.qty;
let subtotal = price * qty
subtotal = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(subtotal)
return subtotal }, vars);
  }
  if ((() => { let currency = vars.currency
return currency === "EUR" })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = `${vars.unitPrice}`.replace(`${vars.Symbol}`,"");
price = parseFloat(price.replace(",",".").trim());
const qty = vars.qty;
let subtotal = price * qty
subtotal = `${vars.Symbol}` + Intl.NumberFormat('de-DE',{
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(subtotal);
return subtotal }, vars);
  }
  if ((() => { let currency = vars.currency
let project = vars.project
return currency === "AUD" || currency === "CAD" })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").trim());
const qty = vars.qty;
let subtotal = price * qty
subtotal = `${vars.Symbol}`+subtotal.toFixed(2);
return subtotal }, vars);
  }
}

// GI: "Check the total" (63c71c660b7aefb972ffc43f)
export async function checkTheTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotalPrice}`;
let shipping = `${vars.shippingPrice}`;
let tax = `${vars.taxPrice}`;
let total = `${vars.total}`;

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

// GI: "Extract pass from email" (63c71c660b7aefb972ffc440)
export async function extractPassFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+\w+[^@]/g;
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Extract price from element" (63c71c660b7aefb972ffc441)
export async function extractPriceFromElement(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /(\$[0-9,]+(\.[0-9]{2})?)/g;
const str = `${vars.price}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
}

// GI: "Extract user from email" (63c71c660b7aefb972ffc442)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(30000);
  if ((() => { let project = vars.project
return project != "elka" })()) {
    vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+\w+[^@]/g;
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  }
  if ((() => { let project = vars.project
return project === "elka" })()) {
    vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+[^@]/g;
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  }
  if ((() => { let project = vars.project
return project != "talkbox" && project != "scout" && project != "Deans" })()) {
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}/latest`);
    await page.waitForLoadState('load');
  }
  if ((() => { let project = vars.project
return project === "talkbox" || project === "scout" || project === "Deans" })()) {
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
  }
}

// GI: "Get Woo order details" (63c71c660b7aefb972ffc443)
export async function getWooOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const order = vars.orderNumber;
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.url}/wp-json/wc/v3/orders/`+order;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers,
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.transaction_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.transaction_id }, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return Number(jsonOrder.total) }, vars);
  vars.paymentMethodTitle = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.payment_method_title }, vars);
  vars.payDateRenew = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.date_modified }, vars);
  vars.shippingTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_total }, vars);
  vars.shippingTaxTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_tax }, vars);
}

// GI: "Next Payment date" (63c71c660b7aefb972ffc444)
export async function nextPaymentDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // let nextPay = `${vars.nextPay}`
// nextPay = Date.parse(nextPay)
// nextPay = new Date(nextPay)
// let date = new Date()

// return date.getMonth()+1 === nextPay.getMonth() 
// && date.getDate() === nextPay.getDate()
// && date.getYear() === nextPay.getYear()

let nextPay = `${vars.nextPay}`
nextPay = Date.parse(nextPay)
nextPay = new Date(nextPay)
let date = new Date()

let monthAssess = ( date.getMonth()+1 ) % 12 === nextPay.getMonth()
let yearAssess = 11 === date.getMonth() ? date.getYear() + 1 === nextPay.getYear() : date.getYear() === nextPay.getYear()

return monthAssess && date.getDate() === nextPay.getDate() && yearAssess
 }, vars)).toBeTruthy();
}

// GI: "Page full loaded" (63c71c660b7aefb972ffc445)
export async function pageFullLoaded(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
    (document.readyState) || reject("Can't resolve document readystate");
    let listener;
    (/^c/).test(document.readyState) ? resolve(true) : document.addEventListener("load", listener = event => {
      document.removeEventListener("load", listener);
      resolve(true);
    });
}) }, vars)).toBeTruthy();
}

// GI: "PayPal template" (63c71c660b7aefb972ffc446)
export async function payPalTemplate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[title="PayPal"]`).first().contentFrame().locator(`.paypal-button.paypal-button-number-0`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[title="PayPal"]`).first().click({ force: true }); _ok = true; } catch {} }
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
  {
    const _lbl = page.locator(`label[for="payment-submit-btn"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment-submit-btn`).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    {
      const _lbl = page.locator(`label[for="payment-submit-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment-submit-btn`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
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

// GI: "Place Order Element" (63c71c660b7aefb972ffc447)
export async function placeOrderElement(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`#place_order`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#place_order`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
}

// GI: "Renew by Admin" (63c71c660b7aefb972ffc448)
export async function renewByAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subsID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  // TODO: command="dragAndDrop" target="select[name=\"wc_order_action\"]" value="#wp-admin-bar-wp-logo > a[href*=\"/wp-admin/about.php\"].ab-item"
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#message > p`).first()).toContainText(`Subscription updated.`);
  vars.renewID = ((await page.locator(`#subscription_renewal_orders > div.inside > div > table > tbody > tr:first-of-type > td:nth-child(1) > a`).or(page.locator(`#woocommerce-order-notes > div.inside > ul > li:nth-child(3) > div > p > a`)).textContent()) ?? '').trim();
  vars.renewID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let renew = `${vars.renewID}`;
renew = renew.replace("#","");
return renew
 }, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  vars.orderNumber = `${vars.renewID ?? ''}`;
}

// GI: "Reset email - WP Engine sites" (63c71c660b7aefb972ffc44a)
export async function resetEmailWPEngineSites(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.urlNew = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href
url = url+"&ghostinspector=true"

return url }, vars);
  await page.goto(`${vars.urlNew ?? ''}`);
  await page.waitForLoadState('load');
  vars.resetPassUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let emailObject = document.getElementById("ghostinspector");
let resetUrl = emailObject.getAttribute("href");

return resetUrl }, vars);
  await page.goto(`${vars.resetPassUrl ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Scroll Full page" (63c71c660b7aefb972ffc44b)
export async function scrollFullPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var body = document.documentElement || document.body;
body.scrollTop = 0;
window.scroller = setInterval(function(){
  body.scrollTop += 500;
}, 500); }, vars);
  await page.waitForTimeout(10000);
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); clearInterval(window.scroller);
var body = document.documentElement || document.body;
body.scrollTop = 0; }, vars);
}

// GI: "Subscription Menu" (63c71c660b7aefb972ffc44c)
export async function subscriptionMenu(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await page.locator(`a[href*="/my-account/subsriptions/"]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--subscriptions > a`)).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).first()).toContainText(`#${vars.subscriptionID ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(1) > td.subscription-status.order-status.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-status.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Active`);
  }
  await page.locator(`a[href*="/view-subscription/${vars.subscriptionID ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Subscription #${vars.subscriptionID ?? ''}`);
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
  await expect(page.locator(`tr:nth-of-type(4) > td:nth-of-type(2)`).first()).toContainText(`${vars.nextPay ?? ''}`);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
return element.length }, vars);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if ((() => { let length = vars.n
return length === 3 })()) {
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxRenew ?? ''}`);
  }
  if ((() => { let length = vars.n
return length === 3 })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  }
  if ((() => { let length = vars.n
return length === 2 })()) {
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  }
  await expect(page.locator(`td.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`td.order-number > a[href*="/view-order/${vars.orderNumber ?? ''}/"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
  if ((() => { let country = vars.country
return country === "CA" })()) {
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if ((() => { let country = vars.country
return country === "US" })()) {
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
}

// GI: "URL of current page" (63c71c660b7aefb972ffc44d)
export async function uRLOfCurrentPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.site = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href
return url }, vars);
}

// GI: "WooCommerce Checkout template" (63c71c660b7aefb972ffc44e)
export async function wooCommerceCheckoutTemplate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "harmony" 
|| project === "Phlearn" || project === "hunchie" 
|| project === "inspire" || project === "kybb" 
|| (project === "leggari" && step === "2") || project === "lens" 
|| project === "mckeen" || project === "mavenfair" 
|| project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout" })()) {
    try { await page.locator(`#billing_first_name`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#billing_first_name`).first()).toHaveText(`${vars.firstName ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.firstName = ((await page.locator(`#billing_first_name`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "inspire" 
|| project === "kybb" || (project === "leggari" && step === "2")
|| project === "lens" || project === "mckeen" 
|| project === "mavenfair" || project ==="weedpleez"
|| project === "nopong"|| project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#billing_last_name`).first()).toHaveText(`${vars.lastName ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.lastName = ((await page.locator(`#billing_last_name`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "hunchie" || project === "kybb" 
|| project === "mckeen" || project === "mavenfair" 
|| project === "nopong"|| project === "melon"
 || project === "talkbox" || project === "botany" })()) {
    {
      const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "2" })()) {
    {
      const _lbl = page.locator(`label[for="billing_same_as_shipping"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#billing_same_as_shipping`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project
return project === "elka" || project === "harmony" 
|| project === "kybb" || project === "lens"
|| ( project === "leggari" && step === "2" )
|| project === "mckeen" || project === "mavenfair" 
|| project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#billing_company`).first()).toHaveText(`${vars.company ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.company = ((await page.locator(`#billing_company`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.licKey = ((await page.locator(`#aim`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "harmony" || project === "2m" })()) {
    try { await page.locator(`#billing_invoice_cc_email_addresses`).first().fill(`${vars.emailCC ?? ''}`); } catch { await page.locator(`#billing_invoice_cc_email_addresses`).first().selectOption(`${vars.emailCC ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    try { await page.locator(`#po_number`).first().fill(`${vars.PONumber ?? ''}`); } catch { await page.locator(`#po_number`).first().selectOption(`${vars.PONumber ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" || project === "mckeen" 
|| project ==="weedpleez" })()) {
    await expect(page.locator(`#billing_country_field > span`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "harmony" || project === "hunchie" 
|| project === "kybb"
|| project === "mavenfair" || project === "nopong"
|| project === "melon" || project === "scout" })()) {
    await expect(page.locator(`#select2-billing_country-container`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  // skipped: select-open click on '#billing_country' (Select2 pattern)
  if ((() => { let project = vars.project
let step = vars.step
return project === "2m" || project === "elka" 
|| (project === "leggari" && step === "2") || project === "lens"
|| project === "talkbox" || project === "botany" })()) {
    await page.locator(`#billing_country`).first().selectOption(`${vars.country ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "2m" 
|| project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "inspire" 
|| project === "kybb"|| (project === "leggari" && step === "2") 
|| project === "lens" || project === "mckeen" 
|| project === "mavenfair" || project ==="weedpleez"
|| project === "nopong" || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "elka"|| (project === "leggari" && step === "2") 
|| project === "lens" || project === "mckeen" 
|| project === "mavenfair" || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "2m" 
|| project === "elka" || project === "harmony"  
|| project === "hunchie" || project === "inspire" 
|| project === "kybb"|| (project === "leggari" && step === "2")
|| project === "lens" || project === "mavenfair" 
|| project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout" })()) {
    try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "mckeen" })()) {
    await expect(page.locator(`#billing_city_field > span`).first()).toHaveText(`${vars.city ?? ''}`);
  }
  // skipped: select-open click on '#billing_state' (Select2 pattern)
  if ((() => { let project = vars.project
let step = vars.step
let country = vars.country
return project === "Deans" || project === "2m" 
|| project === "elka" || project === "harmony"
|| project === "inspire" || (project === "leggari" && step === "2")
|| project === "lens" || project ==="weedpleez"
|| project === "nopong" || (project === "melon" && country === "IT")
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    await page.locator(`#billing_state`).first().selectOption(`${vars.state ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "kybb" 
|| project === "mavenfair" })()) {
    await expect(page.locator(`#select2-billing_state-container`).first()).toHaveText(`${vars.stateComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "mckeen" })()) {
    await expect(page.locator(`#billing_state_field > span`).first()).toHaveText(`${vars.stateComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "Phlearn" 
|| project === "2m" || project === "elka" 
|| project === "harmony" || project === "hunchie" 
|| project === "inspire" || project === "kybb" 
|| (project === "leggari" && step === "2") || project === "lens" 
|| project === "mavenfair" || project ==="weedpleez"
|| project === "nopong"|| project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#billing_postcode`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "mckeen" })()) {
    await expect(page.locator(`#billing_postcode`).first()).toHaveText(`${vars.zipCode ?? ''}`);
  }
  try {
    if ((() => { let project = vars.project
return project === "leggari" })()) {
      try { await page.locator(`#address_type`).first().fill(`Residential`); } catch { await page.locator(`#address_type`).first().selectOption(`Residential`); }
    }
  } catch { /* optional step: assign */ }
  try {
    if ((() => { let project = vars.project
return project === "leggari" })()) {
      try { await page.locator(`#address_type`).first().fill(`residential`); } catch { await page.locator(`#address_type`).first().selectOption(`residential`); }
    }
  } catch { /* optional step: assign */ }
  if ((() => { let project = vars.project
let step = vars.step
return project === "2m" || project === "elka" 
|| project === "harmony" || project === "hunchie" 
|| project === "inspire" || project === "kybb" 
|| (project === "leggari" && step === "2") || project === "mckeen" 
|| project === "mavenfair" || project ==="weedpleez"
|| project === "nopong" || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return (project === "leggari" && step === "2") })()) {
    vars.phoneCode = ((await page.locator(`#billing_phone_field .iti__selected-dial-code`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#billing_phone`).first()).toHaveText(`${vars.phone ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    try { await page.locator(`#billing_mobile_phone`).first().fill(`${vars.mobile ?? ''}`); } catch { await page.locator(`#billing_mobile_phone`).first().selectOption(`${vars.mobile ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "inspire" 
|| project === "kybb" || project === "mckeen" 
|| project === "mavenfair" || project === "nopong"
|| (project === "leggari" && step === "2") || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "2m" || project === "harmony" })()) {
    try { await page.locator(`#billing_invoice_cc_email_addresses`).first().fill(`${vars.emailCC ?? ''}`); } catch { await page.locator(`#billing_invoice_cc_email_addresses`).first().selectOption(`${vars.emailCC ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" || project === "lens" })()) {
    await expect(page.locator(`#billing_email`).first()).toHaveText(`${vars.username ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "lens" })()) {
    await expect(page.locator(`#billing_custom_tax_id`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "hunchie" || (project === "leggari" && step === "2")
|| project === "lens" || project === "mckeen" })()) {
    {
      const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).or(page.locator(`label[for="kl_newsletter_checkbox"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#mailchimp_woocommerce_newsletter`).or(page.locator(`#kl_newsletter_checkbox`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.projectvars.type
let step = vars.step
return project === "elka" || project === "hunchie" 
|| project === "inspire" || project === "kybb" 
|| (project === "leggari" && step === "2") || project === "mckeen" 
|| project === "mavenfair" || project === "nopong"
|| project === "melon" || project === "botany"
|| project === "scout" })()) {
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.projectvars.type
return project === "inspireSub" })()) {
    await expect(page.locator(`#createaccount`)).toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "inspire" 
|| project === "mckeen" || project === "mavenfair"
 || project === "nopong" || project === "scout" })()) {
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "scout" })()) {
    try { await page.locator(`#account_username`).first().fill(`${vars.firstName ?? ''}${vars.lastName ?? ''}`); } catch { await page.locator(`#account_username`).first().selectOption(`${vars.firstName ?? ''}${vars.lastName ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#ship-to-different-address-checkbox`).first()).toBeVisible();
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "Deans" 
|| project === "kybb" || project === "mckeen" 
|| project === "mavenfair" || project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout" })()) {
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "Deans" 
|| project === "kybb" || project === "mckeen" 
|| project === "mavenfair" || project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout" })()) {
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || (project === "leggari" && step === "2") 
|| project === "mckeen" || project === "mavenfair"
 || project === "nopong"|| project === "melon"
 || project === "botany" || project === "scout" })()) {
    try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
  }
  // skipped: select-open click on '#shipping_country' (Select2 pattern)
  if ((() => { let project = vars.project
let step = vars.step
return (project === "leggari" && step === "2") || project === "talkbox"
|| project === "botany" })()) {
    await page.locator(`#shipping_country`).first().selectOption(`${vars.country ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "Deans" || project === "mckeen" 
|| (project === "nopong" && (country === "CA" || country === "US")) })()) {
    await expect(page.locator(`#shipping_country_field > span`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "hunchie" || project === "kybb" 
|| project === "mavenfair" || (project === "nopong" && country === "AU")
|| project === "melon" || project === "scout" })()) {
    await expect(page.locator(`#select2-shipping_country-container`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "hunchie" 
|| project === "kybb" || (project === "leggari" && step === "2")
|| project === "mckeen" || project === "mavenfair"
|| project === "nopong" || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || (project === "leggari" && step === "2")  
|| project === "mckeen" || project === "mavenfair"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout" })()) {
    try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "hunchie" 
|| project === "kybb" || (project === "leggari" && step === "2") 
|| project === "mavenfair" || project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout" })()) {
    try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  }
  // skipped: select-open click on '#shipping_state' (Select2 pattern)
  if ((() => { let project = vars.project
let step = vars.step
let country = vars.country
return project === "Deans" || (project === "leggari" && step === "2")
|| project === "nopong" || (project === "melon" && country === "IT")
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    await page.locator(`#shipping_state`).first().selectOption(`${vars.state ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "kybb" 
|| project === "mavenfair" })()) {
    await expect(page.locator(`#select2-shipping_state-container`).first()).toHaveText(`${vars.stateComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "hunchie" 
|| project === "kybb" || (project === "leggari" && step === "2") 
|| project === "mavenfair" || project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout" })()) {
    try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  await blockUI(page, vars);
  if ((() => { let project = vars.project
return project === "Deans" || project === "talkbox" })()) {
    try { await page.locator(`#shipping_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#shipping_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    try { await page.locator(`#shipping_mobile_phone`).first().fill(`${vars.mobile ?? ''}`); } catch { await page.locator(`#shipping_mobile_phone`).first().selectOption(`${vars.mobile ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "elka" })()) {
    await page.locator(`div:nth-of-type(1) > a[href="#"].fusion-button.button-default.fusion-button-default-size.button.continue-checkout`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "x" || project === "Deans" 
|| project === "elka" || project === "hunchie" 
|| project === "kybb" || project === "melon" 
|| project === "talkbox" || project === "botany"
|| project === "scout" })()) {
    try { await page.locator(`#order_comments`).first().fill(`Order Note for Testing this field`); } catch { await page.locator(`#order_comments`).first().selectOption(`Order Note for Testing this field`); }
  }
  if ((() => { let project = vars.project
return project === "elka" })()) {
    await page.locator(`div:nth-of-type(2) > a[href="#"].fusion-button.button-default.fusion-button-default-size.continue-checkout.button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "2" })()) {
    await page.locator(`.wfacp-left-panel.wfacp_page.pre_built.single_step > .wfacp-two-step-erap.wfacp-next-btn-wrap.center > button[type="button"].button.button-primary.wfacp_next_page_button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await expect(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing-description > .billing_subtitle > .subscription-price > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$${vars.subPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.subPrice = ((await page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "2m" 
|| project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "kybb" 
|| (project === "leggari" && step === "3") || project === "mckeen" 
|| project === "mavenfair" || project ==="weedpleez"
 || project === "nopong" || project === "botany" })()) {
    await expect(page.locator(`td.product-name`).or(page.locator(`div.product-info`)).or(page.locator(`.wfacp_mini_cart_item_title`)).or(page.locator(`h3.ld-product-title`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.prod_desc = ((await page.locator(`tr:nth-of-type(1).cart_item > td.product-name > div > div > div.check-name`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.prod_desc2 = ((await page.locator(`tr:nth-of-type(2).cart_item > td.product-name > div > div > div.check-name`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "Deans" 
|| project === "harmony" || project === "hunchie" 
|| project === "kybb" || project === "mavenfair"
|| (project === "leggari" && step === "3") })()) {
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.unitPrice = ((await page.locator(`tr:nth-of-type(2).cart_item > td.product-total > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subPrice = `${vars.subPrice}`
let unitPrice = `${vars.unitPrice}`

subPrice = subPrice.replace(",","");
unitPrice = unitPrice.replace(",","");

subPrice = Number(subPrice.replace(`${vars.Symbol}`,""));
unitPrice = Number(unitPrice.replace(`${vars.Symbol}`,""));

let subtotal = subPrice+unitPrice;
subtotal = `${vars.Symbol}`+subtotal.toFixed(2);

return subtotal }, vars);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "Deans" 
|| project === "harmony" || project === "hunchie" 
|| project === "kybb" || project === "mavenfair"
|| (project === "leggari" && step === "3") })()) {
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  try {
    if ((() => { let project = vars.project
return project === "mckeen" || project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "scout"  || project === "botany" })()) {
      await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`td.product-total > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  try {
    if ((() => { let project = vars.project
return project === "mckeen" || project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "scout"  || project === "botany" })()) {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.unitPrice = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    await expect(page.locator(`td.product-total`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "lens" })()) {
    vars.unitPrice = ((await page.locator(`.ld-product-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "lens" })()) {
    await expect(page.locator(`.amount > strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.discount = ((await page.locator(`tr.cart-discount > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  try {
    if ((() => { let project = vars.project
return project === "elka" || project ==="weedpleez" })()) {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    }
  } catch { /* optional step: extract */ }
  try {
    if ((() => { let project = vars.project
return project === "scout" })()) {
      await page.locator(`ul#shipping_method > li:nth-child(2) > label > .woocommerce-Price-amount.amount > bdi`).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  try {
    if ((() => { let project = vars.project
return project === "scout" })()) {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(2) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    }
  } catch { /* optional step: extract */ }
  if ((() => { let project = vars.project
return project === "scout" })()) {
    await blockUI(page, vars);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "3" })()) {
    vars.shippingPrice = ((await page.locator(`li:nth-of-type(1).wfacp_single_shipping_method > div > .wfacp_shipping_price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`li:nth-of-type(1).wfacp_single_shipping_method > div > .wfacp_shipping_price`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "3" })()) {
    vars.shippingDesc = ((await page.locator(`li:nth-of-type(1).wfacp_single_shipping_method > div > .wfacp_shipping_radio > label`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "Deans" })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(1) > label`).first()).toHaveText(`Free shipping`);
  }
  if ((() => { let project = vars.project
return project === "talkbox"  || project === "botany" })()) {
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let country =vars.country
return project === "nopong" && country === "CA" })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(1) > label`).first()).toHaveText(`Lettermail (untracked)`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "kybb" || project === "mckeen"
|| (project === "nopong" && (country === "AU" || country === "US"))
|| project === "melon" })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "3" })()) {
    await expect(page.locator(`tr.shipping_total_fee > td:nth-of-type(2) > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.shipping_total_fee > td:nth-of-type(2)`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "harmony" && country === "CA" })()) {
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "nopong" && country === "AU"
|| project === "melon" })()) {
    await expect(page.locator(`tr.order-total > td > small > span`).or(page.locator(`small.includes_tax > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return  project === "kybb" || project === "mckeen" 

|| (project === "nopong" && country === "CA") })()) {
    await expect(page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { let country = vars.country
let project = vars.project
return project === "nopong" && country === "CA" })()) {
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "elka" 
|| (project === "leggari" && step === "3") || project === "talkbox"
|| project === "botany" })()) {
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.recurringTax = ((await page.locator(`tr.tax-total.recurring-total > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.recurringTotal = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "hunchie" })()) {
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "2m" || project === "Deans" 
|| project === "elka" || project === "harmony" 
|| project ==="weedpleez" || project === "nopong" 
|| (project === "leggari" && step === "3") || project === "talkbox"
|| project === "botany" || project === "scout" })()) {
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "lens" })()) {
    vars.total = ((await page.locator(`tr.order-total:nth-of-type(5) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "kybb" 
|| project === "mckeen" || project === "mavenfair"
|| project === "melon" })()) {
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.order-total > td > strong > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "2m" || project === "Deans" 
|| project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "kybb" 
|| (project === "leggari" && step === "3") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let shipping = `${vars.shippingPrice}`;
if (shipping.includes("Free")){
    shipping = "0.00";
};
let tax = `${vars.taxPrice}`;
let total = `${vars.total}`;

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
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "3" })()) {
    await page.locator(`.wfacp-left-panel.wfacp_page.two_step > .wfacp-two-step-erap.wfacp-next-btn-wrap.center > button[type="button"].button.button-primary.wfacp_next_page_button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mckeen" || project ==="weedpleez"
|| project === "nopong" || project === "melon" || project === "talkbox"
|| project === "scout" || project === "botany" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotalPrice}`;
let shipping = `${vars.shippingPrice}`;
let discount = `${vars.discount}`
if (discount === ""){
    discount = "0.00";
};
if (shipping.includes("Free")){
    shipping = "0.00";
};
let tax = `${vars.taxPrice}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.total}`;

unit = unit.replace(",","");
discount = discount.replace(",","");
shipping = shipping.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit-discount+shipping+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
  }
  if ((() => { let project = vars.project
return project === "kybb" })()) {
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.subPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    await expect(page.locator(`tr.order-total:nth-of-type(5) > td > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.subPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "2m" || project === "harmony" 
|| project === "mckeen" || project === "mavenfair" 
|| project ==="weedpleez"|| project === "nopong"
|| (project === "leggari" && step === "3") || project === "talkbox"
|| project === "botany" })()) {
    {
      const _lbl = page.locator(`label[for="terms"]`).or(page.locator(`label[for="terms_acceptance"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).or(page.locator(`#terms_acceptance`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}
