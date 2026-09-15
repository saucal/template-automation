// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Payoneer - Common Steps for Tests"
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

// GI: "3DS challenge" (69778cc265fd97d14e2468a2)
export async function _3DSChallenge(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`center > h1`).first()).toHaveText(`ACS Emulator for 3DS V2`);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
}

// GI: "Add Download Product to Cart" (69778cc265fd97d14e2468a3)
export async function addDownloadProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prodType = `download`;
  await page.goto(`${vars.startUrl ?? ''}checkout/?add-to-cart=40`);
  await page.waitForLoadState('load');
  vars.sessionDate = `${vars.payDate ?? ''}`;
  await extractDate(page, vars);
  await page.waitForLoadState('load');
}

// GI: "Add Payment Method" (69778cc265fd97d14e2468a4)
export async function addPaymentMethod(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await login(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#payment_method_mastercard_merchant_cloud , #payment_method_acme')

return !!element }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`).or(page.locator(`label[for="payment_method_acme"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_mastercard_merchant_cloud`).or(page.locator(`#payment_method_acme`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await page.waitForTimeout(5000);
}

// GI: "Add Physical Product to Cart" (69778cc265fd97d14e2468a5)
export async function addPhysicalProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prodType = `physical`;
  await page.goto(`${vars.startUrl ?? ''}checkout/?add-to-cart=32`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
}

// GI: "Add Physical Subscription Product to Cart" (69778cc265fd97d14e2468a6)
export async function addPhysicalSubscriptionProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prodType = `physical`;
  vars.freq = `MONTHLY`;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=1274`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await page.locator(`a[href*='checkout']`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  vars.sessionDate = `${vars.payDate ?? ''}`;
}

// GI: "Add Virtual Product to Cart" (69778cc365fd97d14e2468a7)
export async function addVirtualProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prodType = `virtual`;
  await page.goto(`${vars.startUrl ?? ''}checkout/?add-to-cart=31`);
  await page.waitForLoadState('load');
  await extractDate(page, vars);
  vars.sessionDate = `${vars.payDate ?? ''}`;
  await page.waitForLoadState('load');
}

// GI: "Capture/Void Payment by Admin" (69778cc365fd97d14e2468a8)
export async function captureVoidPaymentByAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const transactionType = vars.transactionType

return transactionType !== 'void' })()) {
    await expect(page.locator(`.mpgs-void-form`).or(page.locator(`.acme-void-form`)).or(page.locator(`.mastercard_merchant_cloud-void-form`))).not.toHaveCount(0);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'void' })()) {
    {
      const _lbl = page.locator(`label[for="acme_void_transaction_button"]`).or(page.locator(`label[for="mastercard_merchant_cloud_void_transaction_button"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Cancel Authorization")]`).or(page.locator(`#acme_void_transaction_button`)).or(page.locator(`#mastercard_merchant_cloud_void_transaction_button`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'void' })()) {
    await extractDate(page, vars);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' })()) {
    vars.totalCapture = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`
total = parseFloat(total.replace('$',''))
total = total/4
return total.toFixed(2) }, vars);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' })()) {
    vars.totalCapture = `${vars.total ?? ''}`;
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' || transactionType === 'totalCapture' })()) {
    try { await page.locator(`#acme_capture_amount`).or(page.locator(`#mastercard_merchant_cloud_capture_amount`)).first().fill(`${vars.totalCapture ?? ''}`); } catch { await page.locator(`#acme_capture_amount`).or(page.locator(`#mastercard_merchant_cloud_capture_amount`)).first().selectOption(`${vars.totalCapture ?? ''}`); }
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' || transactionType === 'totalCapture' })()) {
    await page.locator(`xpath=//button[contains(text(), "Capture")]`).or(page.locator(`p > button[type="submit"].button.button-primary`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' || transactionType === 'totalCapture' })()) {
    await extractDate(page, vars);
  }
  await expect(page.locator(`#message > p`).first()).toContainText(`Order updated.`);
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`On hold`);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'void' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Cancelled`);
  }
  if ((() => { let producType = vars.prodType
const transactionType = vars.transactionType
return (producType === 'virtual' || producType === 'physical')
        && transactionType === 'totalCapture' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  }
  if ((() => { let producType = vars.prodType
const transactionType = vars.transactionType

return producType === 'download'
        &&  transactionType === 'totalCapture' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toHaveText(`${vars.paymentMethodTitle ?? ''} payment was Partially Captured. Captured Amount: $${vars.totalCapture ?? ''}`);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'void' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toHaveText(`Authorization was cancelled successfully. Order status changed from On hold to Cancelled.`);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toHaveText(`${vars.paymentMethodTitle ?? ''} payment was Captured (Order ID: ${vars.transaction_id ?? ''})`);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' })()) {
    vars.restTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const totalCapture = vars.totalCapture
let total = `${vars.total}`
total = parseFloat(total.replace('$',''))
const restTotal = total - totalCapture

return restTotal.toFixed(2)
 }, vars);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' })()) {
    await expect(page.locator(`.mpgs-capture-form > span > .woocommerce-Price-amount.amount`).or(page.locator(`.acme-capture-form > span > .woocommerce-Price-amount.amount`)).or(page.locator(`.mastercard_merchant_cloud-capture-form > span > .woocommerce-Price-amount.amount`)).first()).toHaveText(`$${vars.restTotal ?? ''}`);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' })()) {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' })()) {
    await expect(page.locator(`td:nth-of-type(1) > .description`).first()).toContainText(`via ${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' || transactionType === 'void' })()) {
    await expect(page.locator(`.mpgs-void-form`)).toHaveCount(0);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' || transactionType === 'void' })()) {
    await expect(page.locator(`.acme-void-form`)).toHaveCount(0);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' || transactionType === 'void' })()) {
    await expect(page.locator(`.mastercard_merchant_cloud-void-form`)).toHaveCount(0);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'partialCapture' })()) {
    await expect(page.locator(`.mpgs-capture-form`).or(page.locator(`.acme-capture-form`)).or(page.locator(`.mastercard_merchant_cloud-capture-form`))).not.toHaveCount(0);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' || transactionType === 'void' })()) {
    await expect(page.locator(`.mpgs-capture-form`)).toHaveCount(0);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' || transactionType === 'void' })()) {
    await expect(page.locator(`.acme-capture-form`)).toHaveCount(0);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'totalCapture' || transactionType === 'void' })()) {
    await expect(page.locator(`.mastercard_merchant_cloud-capture-form`)).toHaveCount(0);
  }
}

// GI: "Check My Account" (69778cc365fd97d14e2468a9)
export async function checkMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    await page.goto(`${vars.startUrl ?? ''}cart/`);
    await page.waitForLoadState('load');
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-cart__empty-cart__title`)).first()).toContainText(`Your cart is currently empty`);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    await getWooOrderDetails(page, vars);
  }
  await page.goto(`${vars.startUrl ?? ''}my-account/view-order/${vars.orderNumber ?? ''}/`);
  await page.waitForLoadState('load');
  if ((() => { let producType = vars.prodType
const transactionType = vars.transactionType
const transaction = vars.transaction

return producType === 'download'
        && transactionType === 'capture'
        && transaction !== 'declined' })()) {
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Completed`);
  }
  if ((() => { let producType = vars.prodType
const transactionType = vars.transactionType
const transaction = vars.transaction

return (producType === 'virtual' || producType === 'physical')
        && transactionType === 'capture'
        && transaction !== 'declined' })()) {
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
  }
  if ((() => { const transactionType = vars.transactionType
const transaction = vars.transaction

return transactionType === 'authorize' && transaction !== 'declined' })()) {
    await expect(page.locator(`mark.order-status`).first()).toContainText(`On hold`);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Failed`);
  }
  if (!vars.blog.includes('block')) {
    await expect(page.locator(`tr:nth-of-type(${vars.paymentIndex ?? ''}) > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  }
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
}

// GI: "Check Subscription Backend" (69778cc365fd97d14e2468aa)
export async function checkSubscriptionBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.hpos === "off") {
    await page.goto(`${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit`);
    await page.waitForLoadState('load');
  }
  if (vars.hpos === "on") {
    await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionID ?? ''}`);
    await page.waitForLoadState('load');
  }
  await expect(page.locator(`.acme`).first()).toContainText(`WooCommerce Gateway Acme Plugin`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
}

// GI: "Check Transaction" (69778cc365fd97d14e2468ab)
export async function checkTransaction(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const transaction_id = `${vars.transaction_id}`;
  const url = `${vars.startUrl}` + 'wp-json/custom/v1/get-mastercard-order/?order_id='+transaction_id

  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  fetch(url, {method:'GET', headers: headers})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
}

// GI: "Check transcation is present on Order backend" (69778cc365fd97d14e2468ac)
export async function checkTranscationIsPresentOnOrderBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementsByClassName('wp-menu-name')

return element.length === 0 }, vars)) {
    await loginAdmin(page, vars);
  }
  vars.hpos = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let hpos = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('a[href="admin.php?page=wc-orders"]'))
let legacy = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('a[href="edit.php?post_type=shop_order"]'))

if (hpos.length !== 0) {
    return "on"
}

if (legacy.length !== 0) {
    return "off"
}
 }, vars);
  if (vars.hpos === "off") {
    await page.goto(`${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit`);
    await page.waitForLoadState('load');
  }
  if (vars.hpos === "on") {
    await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}`);
    await page.waitForLoadState('load');
  }
  if ((() => { const transactionType = vars.transactionType
const transaction = vars.transaction

return transactionType === 'capture'
        &&
        transaction !== 'declined' })()) {
    await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod ?? ''} (${vars.transaction_id ?? ''})`);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod ?? ''}`);
  }
  if ((() => { let producType = vars.prodType
const transactionType = vars.transactionType
const transaction = vars.transaction

return (producType === 'virtual' || producType === 'physical')
        && 
        transactionType === 'capture'
        &&
        transaction !== 'declined' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  }
  if ((() => { let producType = vars.prodType
const transactionType = vars.transactionType
const transaction = vars.transaction

return producType === 'download'
        && 
        transactionType === 'capture'
        &&
        transaction !== 'declined' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  }
  if ((() => { const transactionType = vars.transactionType
const transaction = vars.transaction

return transactionType === 'authorize'
        &&
        transaction !== 'declined' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`On hold`);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Failed`);
  }
  if ((() => { const refund = vars.refund
const transactionType = vars.transactionType
const threeDS = vars.threeDS
const transaction = vars.transaction

return refund !== 'exceed' && transactionType === 'capture'
        && threeDS !== 'inactive'
        && transaction !== 'declined' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`${vars.paymentMethod ?? ''} payment was Captured (Order ID: ${vars.transaction_id ?? ''})`);
  }
  if ((() => { const transaction = vars.transaction
const challenge = vars.challenge

return transaction === 'declined' && challenge !== 'fail' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Failure message is Your card was declined\.\. Notification ID is [0-9]+/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent)); }, vars)).toBeTruthy();
  }
  if ((() => { const transaction = vars.transaction
const challenge = vars.challenge

return transaction === 'declined' && challenge === 'fail' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Failure message is The provided PaymentMethod has failed authentication\. You can provide payment_method_data or a new PaymentMethod to attempt to fulfill this PaymentIntent again\.\. Notification ID is [0-9]+/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent)); }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund
const transactionType = vars.transactionType
const transaction = vars.transaction

return refund !== 'exceed' && transactionType === 'authorize'
        &&
        transaction !== 'declined' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`${vars.paymentMethod ?? ''} payment was Authorized (Order ID: ${vars.transaction_id ?? ''})`);
  }
  if ((() => { const refund = vars.refund
const transactionType = vars.transactionType
const threeDS = vars.threeDS
const transaction = vars.transaction

return refund !== 'exceed' && transactionType === 'capture'
        && 
        threeDS === 'inactive'
        &&
        transaction !== 'declined' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`${vars.paymentMethod ?? ''} payment was Captured (Order ID: ${vars.transaction_id ?? ''})`);
  }
  if ((() => { const subscription = vars.subscription

return subscription === 'yes' })()) {
    await checkSubscriptionBackend(page, vars);
  }
  if ((() => { const refund = vars.refund
const transaction = vars.transaction

return refund !== 'exceed'
        &&
        transaction !== 'declined' })()) {
    await verifyEmailAdminAndCustomer(page, vars);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    await verifyEmailOnlyAdmin(page, vars);
  }
}

// GI: "Clean emails" (69c3f0b1416cd0bd7acceea9)
export async function cleanEmails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.extraFilter = `subject: ${vars.title ?? ''}`;
  await deletePlaygroundsEmail(page, vars);
  vars.extraFilter = ``;
}

// GI: "Create order for user by API" (69778cc365fd97d14e2468ad)
export async function createOrderForUserByAPI(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/orders/?customer_id=${vars.userId}`;
  const data = `{"currency":"USD","billing":{"first_name":"${vars.firstName}","last_name":"${vars.lastName}","company":"${vars.company}","address_1":"${vars.street}","address_2":"${vars.address2}","city":"${vars.city}","state":"FL","postcode":"${vars.zipCode}","country":"US","email":"${vars.email}","phone":"${vars.phone}"},"line_items":[{"product_id":32,"quantity":1}]}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      body: data,
      headers: headers
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return Number(jsonOrder.total) }, vars);
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.id }, vars);
  vars.prodType = `virtual`;
}

// GI: "Delete Playgrounds Email" (69778cc365fd97d14e2468ae)
export async function deletePlaygroundsEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.extraFilter === '') {
    vars.extraFilter = ``;
  }
  try {
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });  return new Promise(async (resolve, reject) => {   
    const data = new URLSearchParams();
    data.append('action', 'delete_mail');
    data.append('email', `${vars.playgroundsEmail}`);
    data.append('extraFilter', `${vars.extraFilter}`);
    
    const response = await fetch(ajax_object.ajax_url, {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
    const result = await response.json();
    
    if (!result.success) {
        console.error('Failed to delete mail');
        reject();
    } else {
        console.log('Mail deleted successfully');
        resolve()
    }
}) }, vars);
  } catch { /* optional step: eval */ }
}

// GI: "Extract date" (69778cc365fd97d14e2468b2)
export async function extractDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payDate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = new Date();
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);

return date }, vars);
}

// GI: "Extract four digits of CC" (69778cc365fd97d14e2468b3)
export async function extractFourDigitsOfCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.fourDigits = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let card = `${vars.CCard}`
let four = card.substr(card.length - 4);
return four }, vars);
  vars.sixDigits = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let card = `${vars.CCard}`
let six = card.substr(0,6);
return six }, vars);
}

// GI: "Extract logs by payDate" (69778cc365fd97d14e2468b4)
export async function extractLogsByPayDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const transaction = vars.transaction
const refund = vars.refund

return transaction !== 'declined' && !refund })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const date = `${vars.payDate}`;
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-log?date=`+date+"&raw_rows=1&contains=Successfully";
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
  }
  if ((() => { const transaction = vars.transaction
const refund = vars.refund

return transaction === 'declined' && !refund })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const date = `${vars.payDate}`;
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-log?date=`+date+"&raw_rows=1&contains=WARNING";
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
  }
  if ((() => { const refund = vars.refund

return !!refund })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const date = `${vars.payDate}`;
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-log?date=`+date+"&raw_rows=1&contains=refund";
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
  }
}

// GI: "Extract Session GET" (69778cc365fd97d14e2468af)
export async function extractSessionGET(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.sessionGetLogs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const session = `/session/${vars.session}`;
  const date = `${vars.payDate}`;
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-log?date=`+date+"&url="+session;
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
}

// GI: "Extract Session POST" (69778cc365fd97d14e2468b0)
export async function extractSessionPOST(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.sessionPostLogs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const session = '/session';
  const date = `${vars.sessionDate}`;
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-log?date=`+date+"&url="+session;
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
}

// GI: "Extract Token POST" (69778cc365fd97d14e2468b1)
export async function extractTokenPOST(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.tokenLogs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const session = '/token';
  const date = `${vars.payDate}`;
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-log?date=`+date+"&url="+session;
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
}

// GI: "Extract transaction PUT" (69778cc365fd97d14e2468b5)
export async function extractTransactionPUT(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.transactionPutLogs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const session = `PUT Request: https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}`;
  const date = `${vars.payDate}`;
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-log?date=`+date+"&url="+session;
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
}

// GI: "Fill CC" (69778cc365fd97d14e2468b6)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit / Debit cards`;
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`).first().selectOption(`${vars.CCard ?? ''}`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`).first().fill(`${vars.month ?? ''}${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`).first().selectOption(`${vars.month ?? ''}${vars.year ?? ''}`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`).first().selectOption(`${vars.cvv ?? ''}`); }
  if ((() => { const paymentFlow = vars.paymentFlow

return paymentFlow === 'hosted' })()) {
    {
      const _lbl = page.locator(`label[for="payment-button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment-button`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Fill Checkout" (69778cc365fd97d14e2468b8)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_first_name`).or(page.locator(`#billing-first_name`)).or(page.locator(`#shipping-first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`#billing-first_name`)).or(page.locator(`#shipping-first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).or(page.locator(`#billing-last_name`)).or(page.locator(`#shipping-last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).or(page.locator(`#billing-last_name`)).or(page.locator(`#shipping-last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_company`).or(page.locator(`#billing-company`)).or(page.locator(`#shipping-company`)).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).or(page.locator(`#billing-company`)).or(page.locator(`#shipping-company`)).first().selectOption(`${vars.company ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="select2-billing_country-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-billing_country-container`).or(page.locator(`select#billing-country`)).or(page.locator(`select#shipping-country`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.country ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.country ?? ''}`); }
  } catch { /* optional step: assign */ }
  try { await page.locator(`xpath=//li[contains(text(), "${vars.country ?? ''}")]`).or(page.locator(`xpath=//option[contains(text(), "${vars.country ?? ''}")]`)).filter({ visible: true }).first().click(); } catch { await page.locator('select').filter({ has: page.locator('option', { hasText: `${vars.country ?? ''}` }) }).first().selectOption({ label: `${vars.country ?? ''}` }); }
  try { await page.locator(`#billing_address_1`).or(page.locator(`#billing-address_1`)).or(page.locator(`#shipping-address_1`)).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).or(page.locator(`#billing-address_1`)).or(page.locator(`#shipping-address_1`)).first().selectOption(`${vars.street ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-components-address-form__address_2-toggle')

return !!element }, vars)) {
    await page.locator(`.wc-block-components-address-form__address_2-toggle`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#billing_address_2`).or(page.locator(`#billing-address_2`)).or(page.locator(`#shipping-address_2`)).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`#billing-address_2`)).or(page.locator(`#shipping-address_2`)).first().selectOption(`${vars.address2 ?? ''}`); }
  try { await page.locator(`#billing_city`).or(page.locator(`#billing-city`)).or(page.locator(`#shipping-city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).or(page.locator(`#billing-city`)).or(page.locator(`#shipping-city`)).first().selectOption(`${vars.city ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="select2-billing_state-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-billing_state-container`).or(page.locator(`select#billing-state`)).or(page.locator(`select#shipping-state`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.state ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.state ?? ''}`); }
  } catch { /* optional step: assign */ }
  try { await page.locator(`xpath=//li[contains(text(), "${vars.state ?? ''}")]`).or(page.locator(`xpath=//option[contains(text(), "${vars.state ?? ''}")]`)).filter({ visible: true }).first().click(); } catch { await page.locator('select').filter({ has: page.locator('option', { hasText: `${vars.state ?? ''}` }) }).first().selectOption({ label: `${vars.state ?? ''}` }); }
  try { await page.locator(`#billing_postcode`).or(page.locator(`#billing-postcode`)).or(page.locator(`#shipping-postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`#billing-postcode`)).or(page.locator(`#shipping-postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#billing_phone`).or(page.locator(`#billing-phone`)).or(page.locator(`#shipping-phone`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).or(page.locator(`#billing-phone`)).or(page.locator(`#shipping-phone`)).first().selectOption(`${vars.phone ?? ''}`); }
  try { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().selectOption(`${vars.email ?? ''}`); }
  if ((() => { let user = vars.user

return user === "new" && vars.subscription !== 'yes' })()) {
    await page.locator(`xpath=//span[contains(text(), "Create an account?")]`).or(page.locator(`.form-row > label.woocommerce-form__label.woocommerce-form__label-for-checkbox.checkbox > span`)).or(page.locator(`xpath=//span[contains(text(), "Create an account with ${vars.title ?? ''}")]`)).or(page.locator(`div.wc-block-components-checkbox.fwc-block-checkout__create-account > label > input`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let user = vars.user

return user === "new" || vars.subscription == 'yes' })()) {
    try { await page.locator(`#account_password`).or(page.locator(`div.wc-block-components-address-form__password > input`)).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).or(page.locator(`div.wc-block-components-address-form__password > input`)).first().selectOption(`${vars.password ?? ''}`); }
  }
  await blockUI(page, vars);
}

// GI: "Get Site Title" (69c3f079416cd0bd7acce444)
export async function getSiteTitle(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.siteSettings = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/settings`;
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
  vars.blog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let siteSettings = vars.siteSettings
let title = siteSettings.title
title = title.toLowerCase().replace(/\s/g,'_')

return title
 }, vars);
  vars.title = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let siteSettings = vars.siteSettings
let title = siteSettings.title

return title
 }, vars);
  await cleanEmails(page, vars);
}

// GI: "Get users" (69778cc365fd97d14e2468bb)
export async function getUsers(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myUsers = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/customers/?search=${vars.username}`;
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
  vars.userId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonUsers = vars.myUsers
return jsonUsers[0].id }, vars);
}

// GI: "Get Woo order details" (69778cc365fd97d14e2468b9)
export async function getWooOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/orders?status=failed`;
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
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let jsonOrder = vars.myOrder
jsonOrder = jsonOrder[0]

return jsonOrder }, vars);
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const order = vars.orderNumber;
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/orders/`+order;
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
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.charge_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.meta_data.find(meta => meta.key === "_payoneer_payment_charge_id")?.value }, vars);
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.payoneer_transaction_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.meta_data.find(meta => meta.key === "_payoneer_payment_transaction_id")?.value }, vars);
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.transaction_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.transaction_id }, vars);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.id }, vars);
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder

    const currencyStr = `${vars.total}`
    // Remove any non-numeric characters except commas, dots, and minus signs
    let cleaned = currencyStr.replace(/[^\d,.-]/g, '');

    // If the string has both '.' and ',', determine which is the decimal separator
    if (cleaned.includes('.') && cleaned.includes(',')) {
        if (cleaned.lastIndexOf('.') > cleaned.lastIndexOf(',')) {
            // Case: US format "$1,000.00" (comma as thousands separator, dot as decimal)
            cleaned = cleaned.replace(/,/g, '');
        } else {
            // Case: EU format "1.000,87 €" (dot as thousands separator, comma as decimal)
            cleaned = cleaned.replace(/\./g, '').replace(',', '.');
        }
    } else {
        // If only a comma exists, assume EU format
        if (cleaned.includes(',')) {
            cleaned = cleaned.replace(',', '.');
        }
        // If only a dot exists, assume US format (no change needed)
    }


return jsonOrder.total === cleaned }, vars)).toBeTruthy();
  if ((() => { const paymentFlow = vars.paymentFlow

return paymentFlow === 'embedded' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "payoneer-checkout" }, vars)).toBeTruthy();
  }
  if ((() => { const paymentFlow = vars.paymentFlow

return paymentFlow === 'hosted' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "payoneer-hosted" }, vars)).toBeTruthy();
  }
  vars.shippingTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_total }, vars);
  vars.shippingTaxTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_tax }, vars);
}

// GI: "Get Woo subscription details" (69778cc365fd97d14e2468ba)
export async function getWooSubscriptionDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.mySubscription = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const subscription = vars.subscriptionID;
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/subscriptions/`+subscription;
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
  vars.token = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.mySubscription
return jsonOrder.meta_data.find(meta => meta.key === "acme_payment_token")?.value }, vars);
}

// GI: "Login" (69778cc365fd97d14e2468bc)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}my-account`);
  await page.waitForLoadState('load');
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`My account`);
}

// GI: "Login admin" (69778cc365fd97d14e2468bd)
export async function loginAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
return element != null && element != undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "My Account - Subscription" (69778cc365fd97d14e2468be)
export async function myAccountSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
  await expect(page.locator(`.subscription-payment-method`).first()).toContainText(`Via WooCommerce Gateway Acme Plugin`);
}

// GI: "Pay for Order - Create order" (69778cc365fd97d14e2468c0)
export async function payForOrderCreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout-2/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).or(page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`)).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  vars.sessionDate = `${vars.payDate ?? ''}`;
}

// GI: "Place Order" (69778cc365fd97d14e2468c1)
export async function placeOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="payment_method_payoneer-checkout"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-payoneer-checkout"]`)).or(page.locator(`label[for="payment_method_payoneer-hosted"]`)).or(page.locator(`label[for="radio-control-wc-payment-method-options-payoneer-hosted"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_payoneer-checkout`).or(page.locator(`#radio-control-wc-payment-method-options-payoneer-checkout`)).or(page.locator(`#payment_method_payoneer-hosted`)).or(page.locator(`#radio-control-wc-payment-method-options-payoneer-hosted`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { let paymentFlow = vars.paymentFlow

return paymentFlow === 'embedded' })()) {
    await fillCC(page, vars);
  }
  if ((() => { let paymentFlow = vars.paymentFlow

return paymentFlow === 'embedded' })()) {
    await blockUI(page, vars);
  }
  vars.tfootIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.shop_table tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let tfootIndex = -1;
Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    tfootIndex = index + 1;
  }
});

return tfootIndex }, vars);
  vars.totalIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.shop_table tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let targetTfoot = null;

Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    targetTfoot = tfoot;
  }
});

// Process the target <tfoot>
let result;
let totalIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText.includes('Total')) {
        totalIndex = index;
      }
    }
  });
}
  return totalIndex + 1 }, vars);
  vars.total = ((await page.locator(`tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.totalIndex ?? ''}):not(.recurring-total) > td span.woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.wc-block-components-totals-item__value > span`)).or(page.locator(`tfoot > tr.order-total:not(.recurring-total) > td span.woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  await expect(page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`))).not.toHaveCount(0);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const placeOrder = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button')
function isElementVisible(element) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);

  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0"
  );
}


return isElementVisible(placeOrder) }, vars)) {
    await placeOrderButtonEnabled(page, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const placeOrder = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button')
function isElementVisible(element) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);

  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0"
  );
}


return isElementVisible(placeOrder) }, vars)) {
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try {
    if ((() => { const challenge = vars.challenge
const paymentFlow = vars.paymentFlow


return paymentFlow === 'embedded' && challenge === 'yes' })()) {
      await expect(page.locator(`iframe[src*='js.stripe.com']`).first().contentFrame().locator(`iframe#challengeFrame button#test-source-authorize-3ds`)).not.toHaveCount(0);
    }
  } catch { /* optional step: assertElementPresent */ }
  if ((() => { const challenge = vars.challenge
const paymentFlow = vars.paymentFlow


return paymentFlow === 'embedded' && challenge === 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*='js.stripe.com']`).first().contentFrame().locator(`iframe#challengeFrame button#test-source-authorize-3ds`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  try {
    if ((() => { const challenge = vars.challenge
const paymentFlow = vars.paymentFlow


return paymentFlow === 'embedded' && challenge === 'fail' })()) {
      await expect(page.locator(`iframe[src*='js.stripe.com']`).first().contentFrame().locator(`iframe#challengeFrame button#test-source-fail-3ds`)).not.toHaveCount(0);
    }
  } catch { /* optional step: assertElementPresent */ }
  if ((() => { const challenge = vars.challenge
const paymentFlow = vars.paymentFlow


return paymentFlow === 'embedded' && challenge === 'fail' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*='js.stripe.com']`).first().contentFrame().locator(`iframe#challengeFrame button#test-source-fail-3ds`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let paymentFlow = vars.paymentFlow

return paymentFlow === 'hosted' })()) {
    await page.locator(`input[aria-label="cards"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let paymentFlow = vars.paymentFlow

return paymentFlow === 'hosted' })()) {
    await fillCC(page, vars);
  }
  if ((() => { let paymentFlow = vars.paymentFlow

return paymentFlow === 'hosted' })()) {
    vars.paymentMethod = `Payoneer Hosted`;
  }
  if ((() => { const challenge = vars.challenge
const paymentFlow = vars.paymentFlow


return paymentFlow === 'hosted' && challenge === 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*='js.stripe.com']`).first().contentFrame().locator(`iframe#challengeFrame button#test-source-authorize-3ds`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { const challenge = vars.challenge
const paymentFlow = vars.paymentFlow


return paymentFlow === 'hosted' && challenge === 'fail' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*='js.stripe.com']`).first().contentFrame().locator(`iframe#challengeFrame button#test-source-fail-3ds`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  await page.waitForLoadState('load');
  await extractDate(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    await thankYouPage(page, vars);
  }
  if ((() => { const user = vars.user


return user ==='new' || user === 'old' })()) {
    await checkMyAccount(page, vars);
  }
  if ((() => { const user = vars.user
const transaction = vars.transaction
const challenge = vars.challenge
const paymentFlow = vars.paymentFlow

return  transaction === 'declined' && challenge !== 'fail'
        && user ==='guest' && paymentFlow === 'embedded' })()) {
    await expect(page.locator(`.woocommerce-error`).or(page.locator(`div.wc-block-store-notice.is-error > div > div`)).first()).toHaveText(`Payment declined
Check your details before trying again, or use another payment method. For any additional information please contact your issuing bank or payment method provider.`);
  }
  if ((() => { const user = vars.user
const transaction = vars.transaction
const challenge = vars.challenge

return  transaction === 'declined' && challenge !== 'fail'
        && user ==='guest' && !vars.blog.includes('block') })()) {
    await expect(page.locator(`#payment-form > div.pyr-stripe-comp-123 > div:nth-child(2)`).first()).toHaveText(`Payment declined. Check your details before trying again, or use another payment method. For any additional information please contact your issuing bank or payment method provider.`);
  }
  if ((() => { const user = vars.user
const transaction = vars.transaction
const challenge = vars.challenge
const paymentFlow = vars.paymentFlow

return  transaction === 'declined' && challenge === 'fail'
        && user ==='guest' && paymentFlow === 'embedded' })()) {
    await expect(page.locator(`.woocommerce-error`).or(page.locator(`div.wc-block-store-notice.is-error > div > div`)).first()).toHaveText(`Your payment failed
Try again with another payment method`);
  }
  if ((() => { const user = vars.user
const transaction = vars.transaction
const challenge = vars.challenge
const paymentFlow = vars.paymentFlow

return !vars.blog.includes('block') && transaction === 'declined' && challenge === 'fail'
        && user ==='guest' && paymentFlow === 'embedded' })()) {
    await expect(page.locator(`#payment-form > div.pyr-stripe-comp-123 > div:nth-child(2)`).first()).toHaveText(`Your payment failed. Try again with another payment method`);
  }
  if ((() => { const user = vars.user
const transaction = vars.transaction
const challenge = vars.challenge
const paymentFlow = vars.paymentFlow

return  transaction === 'declined' && challenge === 'fail'
        && user ==='guest' && paymentFlow === 'hosted' })()) {
    await expect(page.locator(`.woocommerce-error`).or(page.locator(`div.wc-block-store-notice.is-error > div > div`)).first()).toHaveText(`Payment failed. Please try with another payment gateway`);
  }
}

// GI: "Place Order button enabled" (69778cc365fd97d14e2468c2)
export async function placeOrderButtonEnabled(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });     return new Promise((resolve) => {
    const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');

    if (!targetElement.disabled) {
      // If the attribute is already false, resolve the promise immediately
      resolve(true);
      return;
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'disabled' &&
          !targetElement.disabled
        ) {
          observer.disconnect();
          resolve(true);
          break;
        }
      }
    });

    observer.observe(targetElement, { attributes: true });
  }); }, vars)).toBeTruthy();
}

// GI: "Playgrounds Email" (69778cc365fd97d14e2468c3)
export async function playgroundsEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.extraFilter === '') {
    vars.extraFilter = ``;
  }
  vars.limit = `1000`;
  try {
    vars.emailTest = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(async (resolve, reject) => {
    let attempts = 0; 

    const fetchEmail = async () => {
        try {
            if (!ajax_object || !ajax_object.ajax_url) {
                throw new Error("ajax_object is not defined or missing ajax_url.");
            }

            const data = new URLSearchParams();
            data.append('action', 'fetch_mail');
            data.append('email', `${vars.playgroundsEmail}`);
            data.append('extraFilter', `${vars.extraFilter}`);
            data.append('limit', vars.limit);

            const response = await fetch(ajax_object.ajax_url, {
                method: 'POST',
                body: data,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const result = await response.json();

            if (result.success && result.data) {
                resolve(JSON.parse(result.data));
            } else {
                throw new Error(result.message || 'No email found yet.');
            }
        } catch (error) {
            attempts++;
            console.warn(`Attempt ${attempts} failed: ${error.message}`);

            if (attempts < 10) {
                setTimeout(fetchEmail, 3000 * (attempts + 1)); // Exponential backoff
            } else {
                reject(new Error('Failed to fetch email after multiple attempts.'));
            }
        }
    };

    fetchEmail();
}) }, vars);
  } catch { /* optional step: extractEval */ }
  vars.emails = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(async (resolve, reject) => {
        try {
            // Create a URLSearchParams object to hold the POST request data
            const data = new URLSearchParams();
            data.append('action', 'fetch_mail'); // The 'action' to call the PHP function
            data.append('email', `${vars.playgroundsEmail}`);
            data.append('extraFilter', `${vars.extraFilter}`);
            data.append('limit', vars.limit);
            
            console.log( ajax_object );

            // Perform the AJAX request directly in the browser console
            const response = await fetch(ajax_object.ajax_url, { // Replace with your site URL
                method: 'POST',
                body: data,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Convert the response to JSON
            const result = await response.json();

            // Check if the request was successful
            if (result.success) {
                resolve(JSON.parse(result.data)); // Resolve with the mail data
            } else {
                reject(new Error('Failed to fetch mail'));
            }
        } catch (error) {
            reject(error); // Reject the promise with the caught error
        }
}) }, vars);
  if ((() => { let messages = vars.emails

return messages.messages.length === 0 })()) {
    await page.waitForTimeout(10000);
  }
  if ((() => { let messages = vars.emails

return messages.messages.length === 0 })()) {
    vars.emails = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(async (resolve, reject) => {
        try {
            // Create a URLSearchParams object to hold the POST request data
            const data = new URLSearchParams();
            data.append('action', 'fetch_mail'); // The 'action' to call the PHP function
            data.append('email', `${vars.playgroundsEmail}`);
            data.append('extraFilter', `${vars.extraFilter}`);
            data.append('limit', vars.limit);
            
            console.log( ajax_object );

            // Perform the AJAX request directly in the browser console
            const response = await fetch(ajax_object.ajax_url, { // Replace with your site URL
                method: 'POST',
                body: data,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Convert the response to JSON
            const result = await response.json();

            // Check if the request was successful
            if (result.success) {
                resolve(JSON.parse(result.data)); // Resolve with the mail data
            } else {
                reject(new Error('Failed to fetch mail'));
            }
        } catch (error) {
            reject(error); // Reject the promise with the caught error
        }
}) }, vars);
  }
  if ((() => { let messages = vars.emails

return messages.messages.length === 0 })()) {
    vars.emails = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(async (resolve, reject) => {
        try {
            // Create a URLSearchParams object to hold the POST request data
            const data = new URLSearchParams();
            data.append('action', 'fetch_mail'); // The 'action' to call the PHP function
            data.append('email', `${vars.playgroundsEmail}`);
            data.append('extraFilter', `${vars.extraFilter}`);
            data.append('limit', vars.limit);
            
            console.log( ajax_object );

            // Perform the AJAX request directly in the browser console
            const response = await fetch(ajax_object.ajax_url, { // Replace with your site URL
                method: 'POST',
                body: data,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Convert the response to JSON
            const result = await response.json();

            // Check if the request was successful
            if (result.success) {
                resolve(JSON.parse(result.data)); // Resolve with the mail data
            } else {
                reject(new Error('Failed to fetch mail'));
            }
        } catch (error) {
            reject(error); // Reject the promise with the caught error
        }
}) }, vars);
  }
  vars.emailURL = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let messages = vars.emails
const id = messages.messages[0].ID

return 'https://mail.playgrounds.saucal.io/view/'+ id +'.html' }, vars);
  await page.goto(`${vars.emailURL ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Refund order" (69778cc365fd97d14e2468c4)
export async function refundOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  if ((() => { const refund = vars.refund
return refund === 'full' })()) {
    try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  }
  if ((() => { const refund = vars.refund
return refund === 'full' })()) {
    try { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().fill(`${vars.shippingTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingTotal ?? ''}`); }
  }
  if ((() => { const refund = vars.refund
return refund === 'full' })()) {
    try { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTaxTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTaxTotal ?? ''}`); }
  }
  if ((() => { const refund = vars.refund
return refund === 'partial' })()) {
    vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`
total = parseFloat(total.replace('$',''))
total = total/4
return total.toFixed(2) }, vars);
  }
  if ((() => { const refund = vars.refund
return refund === 'exceed' })()) {
    vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`
total = parseFloat(total.replace('$',''))
total = total - vars.partialRefund + 0.01
return total.toFixed(2) }, vars);
  }
  if ((() => { const refund = vars.refund
return refund === 'partial' || refund === 'exceed' })()) {
    vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
return total.toFixed(2) }, vars);
  }
  if ((() => { const refund = vars.refund
return refund === 'partial' || refund === 'exceed' })()) {
    vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
return total.toFixed(2) }, vars);
  }
  if ((() => { const refund = vars.refund
return refund === 'partial' || refund === 'exceed' })()) {
    try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  }
  if ((() => { const refund = vars.refund
return refund === 'partial' || refund === 'exceed' })()) {
    try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  }
  try { await page.locator(`#refund_reason`).first().fill(`${vars.id ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.id ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  if ((() => { const refund = vars.refund
return refund === 'full' })()) {
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if ((() => { const refund = vars.refund
return refund === 'full' })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if ((() => { const refund = vars.refund
return refund === 'full' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  }
  if ((() => { const refund = vars.refund
return refund === 'partial' })()) {
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  if ((() => { const refund = vars.refund
return refund === 'partial' })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  if ((() => { const refund = vars.refund
return refund === 'partial' })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  }
  await expect(page.locator(`td.name > .description`).first()).toContainText(`Refunded by Payoneer Checkout. Transaction ID:`);
  vars.refundID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const pattern = /Refunded by Payoneer Checkout. Transaction ID: ([a-z0-9]+)/;

const notes = document.querySelector<HTMLTableCellElement>('td.name > .description').textContent;

const match = notes.match(pattern)

// Check if any note matches the pattern
return match[1] }, vars);
}

// GI: "Register" (69778cc365fd97d14e2468c5)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`My account`);
}

// GI: "Renewal Order" (69778cc365fd97d14e2468c6)
export async function renewalOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.hpos === "off") {
    await page.goto(`${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit`);
    await page.waitForLoadState('load');
  }
  if (vars.hpos === "on") {
    await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionID ?? ''}`);
    await page.waitForLoadState('load');
  }
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  await extractDate(page, vars);
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#message > p`).first()).toContainText(`Subscription updated.`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  vars.orderNumber = ((await page.locator(`#subscription_renewal_orders > div.inside > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a`).textContent()) ?? '').trim();
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const renew = `${vars.orderNumber}`.match(/\d+/)[0]

return renew }, vars);
}

// GI: "Subscription Upgrade, Manual renew, Cancel, Change payment MEthod" (69778cc365fd97d14e2468c7)
export async function subscriptionUpgradeManualRenewCancelChangePaymentMEthod(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "My Subscription")]`).or(page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { const manualRenew = vars.manualRenew

return manualRenew === 'yes' })()) {
    await page.locator(`xpath=//a[contains(text(), "Renew now")]`).or(page.locator(`a[href*="/my-account/?subscription_renewal_early=4992&subscription_renewal=true"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { const upgrade = vars.upgrade

return upgrade === 'yes' })()) {
    await page.locator(`xpath=//a[contains(text(), "Upgrade or Downgrade")]`).or(page.locator(`a[href*="/product/variable-subscription/?switch-subscription="]`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { const upgrade = vars.upgrade

return upgrade === 'yes' })()) {
    {
      const _lbl = page.locator(`label[for="pa_size"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#pa_size`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { const upgrade = vars.upgrade

return upgrade === 'yes' })()) {
    try { await page.locator(`#pa_size`).first().fill(`l`); } catch { await page.locator(`#pa_size`).first().selectOption(`l`); }
  }
  if ((() => { const upgrade = vars.upgrade

return upgrade === 'yes' })()) {
    {
      const _lbl = page.locator(`label[for="pa_color"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#pa_color`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { const upgrade = vars.upgrade

return upgrade === 'yes' })()) {
    try { await page.locator(`#pa_color`).first().fill(`blue`); } catch { await page.locator(`#pa_color`).first().selectOption(`blue`); }
  }
  if ((() => { const upgrade = vars.upgrade

return upgrade === 'yes' })()) {
    await page.locator(`xpath=//button[contains(text(), "Switch subscription")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { const upgrade = vars.upgrade

return upgrade === 'yes' })()) {
    await expect(page.locator(`.woocommerce-message`)).not.toHaveCount(0);
  }
  if ((() => { const upgrade = vars.upgrade

return upgrade === 'yes' })()) {
    await page.locator(`a[href*="/checkout"]`).filter({ visible: true }).first().click({ force: true });
  }
  await page.waitForLoadState('load');
  await extractDate(page, vars);
  vars.sessionDate = `${vars.payDate ?? ''}`;
  await page.waitForTimeout(10000);
}

// GI: "Thank you page" (69c3f6773a7b83a505966f1c)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.tfootIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.shop_table tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let tfootIndex = -1;
Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    tfootIndex = index + 1;
  }
});

return tfootIndex }, vars);
  vars.totalIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.shop_table tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let targetTfoot = null;

Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    targetTfoot = tfoot;
  }
});

// Process the target <tfoot>
let result;
let totalIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText.includes('Total')) {
        totalIndex = index;
      }
    }
  });
}
  return totalIndex + 1 }, vars);
  vars.paymentIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.shop_table tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let targetTfoot = null;

Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    targetTfoot = tfoot;
  }
});

// Process the target <tfoot>
let result;
let totalIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText.includes('Payment method')) {
        totalIndex = index;
      }
    }
  });
}
  return totalIndex + 1 }, vars);
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  if (!vars.blog.includes('block')) {
    await expect(page.locator(`.method > strong`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  }
  if (!vars.blog.includes('block')) {
    await expect(page.locator(`tr:nth-of-type(${vars.paymentIndex ?? ''}) > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  }
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
}

// GI: "Total from currency to number" (69778cc365fd97d14e2468c8)
export async function totalFromCurrencyToNumber(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });     const currencyStr = `${vars.total}`
    // Remove any non-numeric characters except commas, dots, and minus signs
    let cleaned = currencyStr.replace(/[^\d,.-]/g, '');

    // If the string has both '.' and ',', determine which is the decimal separator
    if (cleaned.includes('.') && cleaned.includes(',')) {
        if (cleaned.lastIndexOf('.') > cleaned.lastIndexOf(',')) {
            // Case: US format "$1,000.00" (comma as thousands separator, dot as decimal)
            cleaned = cleaned.replace(/,/g, '');
        } else {
            // Case: EU format "1.000,87 €" (dot as thousands separator, comma as decimal)
            cleaned = cleaned.replace(/\./g, '').replace(',', '.');
        }
    } else {
        // If only a comma exists, assume EU format
        if (cleaned.includes(',')) {
            cleaned = cleaned.replace(',', '.');
        }
        // If only a dot exists, assume US format (no change needed)
    }

    return parseFloat(cleaned); }, vars);
}

// GI: "Use AMEX Challenge" (69778cc365fd97d14e2468c9)
export async function useAMEXChallenge(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `340000099900051`;
  vars.CCName = `Amex`;
  vars.month = `01`;
  vars.year = `39`;
  vars.cvv = `1000`;
  vars.ShortName = `AMEX`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `yes`;
}

// GI: "Use AMEX Frictionless" (69778cc365fd97d14e2468ca)
export async function useAMEXFrictionless(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `340353278080900`;
  vars.CCName = `Amex`;
  vars.month = `01`;
  vars.year = `39`;
  vars.cvv = `1000`;
  vars.ShortName = `AMEX`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Use MASTER Challenge" (69778cc365fd97d14e2468cb)
export async function useMASTERChallenge(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `5123450000000008`;
  vars.CCName = `MasterCard`;
  vars.month = `01`;
  vars.year = `39`;
  vars.cvv = `100`;
  vars.ShortName = `MASTERCARD`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `yes`;
}

// GI: "Use MASTER Frictionless - ACS No" (69778cc365fd97d14e2468cc)
export async function useMASTERFrictionlessACSNo(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `5555555555000018`;
  vars.CCName = `MasterCard`;
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.month = `01`;
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.month = `04`;
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.year = `39`;
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.year = `27`;
  }
  vars.cvv = `100`;
  vars.ShortName = `MASTERCARD`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Use MASTER Frictionless - ACS Yes" (69778cc365fd97d14e2468cd)
export async function useMASTERFrictionlessACSYes(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `5123456789012346`;
  vars.CCName = `MasterCard`;
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.month = `01`;
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.month = `05`;
  }
  vars.year = `39`;
  vars.cvv = `100`;
  vars.ShortName = `MASTERCARD`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Use MASTER Frictionless - Auth Rejected" (69778cc365fd97d14e2468ce)
export async function useMASTERFrictionlessAuthRejected(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `5506900140100503`;
  vars.CCName = `MasterCard`;
  vars.month = `01`;
  vars.year = `39`;
  vars.cvv = `100`;
  vars.ShortName = `MASTERCARD`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Use VISA Challenge" (69778cc365fd97d14e2468cf)
export async function useVISAChallenge(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4000000000003220`;
  vars.CCName = `Visa`;
  vars.month = `01`;
  vars.year = `33`;
  vars.cvv = `100`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `yes`;
}

// GI: "Use VISA Frictionless" (69778cc365fd97d14e2468d0)
export async function useVISAFrictionless(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4242424242424242`;
  vars.CCName = `Visa`;
  vars.month = `01`;
  vars.year = `29`;
  vars.cvv = `100`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Use VISA Frictionless - Attempted" (69778cc365fd97d14e2468d1)
export async function useVISAFrictionlessAttempted(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4440000042200022`;
  vars.CCName = `Visa`;
  vars.month = `01`;
  vars.year = `39`;
  vars.cvv = `100`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `attempted`;
}

// GI: "Use VISA Frictionless Declined" (6980c69df70f37399ab861bb)
export async function useVISAFrictionlessDeclined(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4000000000000002`;
  vars.CCName = `Visa`;
  vars.month = `01`;
  vars.year = `29`;
  vars.cvv = `100`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Use VISA Refund fails" (6980d0c1f70f37399abaaa0f)
export async function useVISARefundFails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4000000000005126`;
  vars.CCName = `Visa`;
  vars.month = `01`;
  vars.year = `29`;
  vars.cvv = `100`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Use VISA Refund starts pending" (6980d0ba76f083a565f9113f)
export async function useVISARefundStartsPending(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4000000000007726`;
  vars.CCName = `Visa`;
  vars.month = `01`;
  vars.year = `29`;
  vars.cvv = `100`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Verify Agreement" (69778cc365fd97d14e2468d2)
export async function verifyAgreement(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.amountVariability === 'FIXED' && 
    log.response.body.agreement.amountVariability === 'FIXED' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.type === 'RECURRING' &&
    log.response.body.agreement.type === 'RECURRING' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.id === `acme_subscription-order-${vars.subscriptionID}` &&
    log.response.body.agreement.id === `acme_subscription-order-${vars.subscriptionID}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.paymentFrequency === `${vars.freq}` &&
    log.response.body.agreement.paymentFrequency === `${vars.freq}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const date = new Date(dateString);
const formattedDate = date.toISOString().split('T')[0];

return log.request.body.agreement.startDate === formattedDate &&
    log.response.body.agreement.startDate === undefined }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const frequency = `${vars.freq}`;
let formattedDate;

if (frequency === "MONTHLY") {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + 1); // Add one month
  formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  console.log(formattedDate); // Output: "2025-11-17"
}

return log.request.body.agreement.expiryDate === formattedDate &&
    log.response.body.agreement.expiryDate === formattedDate }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const frequency = `${vars.freq}`;
let daysInMonth;

if (frequency === "MONTHLY") {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based month (November is 10)
  daysInMonth = parseInt(new Date(year, month + 1, 0).getDate());
}

return log.request.body.agreement.minimumDaysBetweenPayments === daysInMonth &&
    log.response.body.agreement.minimumDaysBetweenPayments === daysInMonth }, vars)).toBeTruthy();
}

// GI: "Verify Agreement Authentication" (69778cc365fd97d14e2468d3)
export async function verifyAgreementAuthentication(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body === null && 
    log.response.body.agreement.amountVariability === 'FIXED' }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'no' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.amountVariability === 'FIXED' && 
    log.response.body.agreement.amountVariability === 'FIXED' }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body === null && 
    log.response.body.agreement.type === 'RECURRING' }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'no' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.type === 'RECURRING' && 
    log.response.body.agreement.type === 'RECURRING' }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body === null && 
    log.response.body.agreement.id === `acme_subscription-order-${vars.subscriptionID}` }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'no' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.id === `acme_subscription-order-${vars.subscriptionID}` && 
    log.response.body.agreement.id === `acme_subscription-order-${vars.subscriptionID}` }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body === null && 
    log.response.body.agreement.paymentFrequency === `${vars.freq}` }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'no' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.paymentFrequency === `${vars.freq}` && 
    log.response.body.agreement.paymentFrequency === `${vars.freq}` }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const date = new Date(dateString);
const formattedDate = date.toISOString().split('T')[0];

return log.request.body === null && 
    log.response.body.agreement.startDate === undefined }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'no' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const date = new Date(dateString);
const formattedDate = date.toISOString().split('T')[0];

return log.request.body.agreement.startDate === formattedDate && 
    log.response.body.agreement.startDate === undefined }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const frequency = `${vars.freq}`;
let formattedDate;

if (frequency === "MONTHLY") {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + 1); // Add one month
  formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  console.log(formattedDate); // Output: "2025-11-17"
}

return log.request.body === null && 
    log.response.body.agreement.expiryDate === formattedDate }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'no' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const frequency = `${vars.freq}`;
let formattedDate;

if (frequency === "MONTHLY") {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + 1); // Add one month
  formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  console.log(formattedDate); // Output: "2025-11-17"
}

return log.request.body.agreement.expiryDate === formattedDate && 
    log.response.body.agreement.expiryDate === formattedDate }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const frequency = `${vars.freq}`;
let daysInMonth;

if (frequency === "MONTHLY") {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based month (November is 10)
  daysInMonth = parseInt(new Date(year, month + 1, 0).getDate());
}

return log.request.body === null && 
    log.response.body.agreement.minimumDaysBetweenPayments === daysInMonth }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'no' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const frequency = `${vars.freq}`;
let daysInMonth;

if (frequency === "MONTHLY") {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based month (November is 10)
  daysInMonth = parseInt(new Date(year, month + 1, 0).getDate());
}

return log.request.body.agreement.minimumDaysBetweenPayments === daysInMonth && 
    log.response.body.agreement.minimumDaysBetweenPayments === daysInMonth }, vars)).toBeTruthy();
  }
}

// GI: "Verify Agreement Authorize/Capture" (69778cc365fd97d14e2468d4)
export async function verifyAgreementAuthorizeCapture(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const renewal = vars.renewal

return renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.amountVariability === 'FIXED' && 
    log.response.body.agreement.amountVariability === 'FIXED' }, vars)).toBeTruthy();
  }
  if ((() => { const renewal = vars.renewal

return renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.type === 'RECURRING' &&
    log.response.body.agreement.type === 'RECURRING' }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.id === `acme_subscription-order-${vars.subscriptionID}` &&
    log.response.body.agreement.id === `acme_subscription-order-${vars.subscriptionID}` }, vars)).toBeTruthy();
  if ((() => { const renewal = vars.renewal

return renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.agreement.paymentFrequency === `${vars.freq}` &&
    log.response.body.agreement.paymentFrequency === `${vars.freq}` }, vars)).toBeTruthy();
  }
  if ((() => { const renewal = vars.renewal

return renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const date = new Date(dateString);
const formattedDate = date.toISOString().split('T')[0];

return log.request.body.agreement.startDate === formattedDate &&
    log.response.body.agreement.startDate === formattedDate }, vars)).toBeTruthy();
  }
  if ((() => { const renewal = vars.renewal

return renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const frequency = `${vars.freq}`;
let formattedDate;

if (frequency === "MONTHLY") {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + 1); // Add one month
  formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  console.log(formattedDate); // Output: "2025-11-17"
}

return log.request.body.agreement.expiryDate === formattedDate &&
    log.response.body.agreement.expiryDate === formattedDate }, vars)).toBeTruthy();
  }
  if ((() => { const renewal = vars.renewal

return renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const dateString = `${vars.payDate}`;
const frequency = `${vars.freq}`;
let daysInMonth;

if (frequency === "MONTHLY") {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based month (November is 10)
  daysInMonth = parseInt(new Date(year, month + 1, 0).getDate());
}

return log.request.body.agreement.minimumDaysBetweenPayments === daysInMonth &&
    log.response.body.agreement.minimumDaysBetweenPayments === daysInMonth }, vars)).toBeTruthy();
  }
}

// GI: "Verify Authenticate Payer log" (69778cc365fd97d14e2468d5)
export async function verifyAuthenticatePayerLog(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const savedCC = vars.savedCC
return savedCC !== 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[2] }, vars);
  }
  if ((() => { const savedCC = vars.savedCC
return savedCC === 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[3] }, vars);
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'PUT' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-1` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'AUTHENTICATE_PAYER' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.session.id === `${vars.session}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.currency === 'USD' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.id === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'AUTHENTICATION_INITIATED' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'PENDING' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.brand === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let month = `${vars.month}`
month = Number(month)

return log.response.body.sourceOfFunds.provided.card.expiry.month === month.toString()
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let year = `${vars.year}`
year = Number(year)

return log.response.body.sourceOfFunds.provided.card.expiry.year === year.toString() }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.number === `${vars.sixDigits}xxxxxx${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.scheme === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.type === 'CARD' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.transaction.amount === total }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.currency === 'USD' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.id === `${vars.transaction_id}-1` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.type === 'AUTHENTICATION' }, vars)).toBeTruthy();
  if ((() => { const subscription = vars.subscription

return subscription === 'yes' })()) {
    await verifyAgreement(page, vars);
  }
}

// GI: "Verify Authentication log" (69778cc365fd97d14e2468d6)
export async function verifyAuthenticationLog(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC
const challenge = vars.challenge

return hosted === 'session' && savedCC !== 'yes' && challenge !== 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[2] }, vars);
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC
const challenge = vars.challenge

return hosted === 'session' && savedCC === 'yes' && challenge !== 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[3] }, vars);
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC
const challenge = vars.challenge

return hosted === 'session' && savedCC !== 'yes' && challenge === 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[4] }, vars);
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC
const challenge = vars.challenge

return hosted === 'session' && savedCC === 'yes' && challenge === 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[5] }, vars);
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[0] }, vars);
  }
  if ((() => { const hosted = vars.hosted
const challenge = vars.challenge

return hosted === 'session' && challenge !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'PUT' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const challenge = vars.challenge

return hosted === 'checkoutR' || challenge === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'GET' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const challenge = vars.challenge

return hosted === 'session' && challenge == 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-1` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const challenge = vars.challenge

return hosted === 'session' && challenge !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'AUTHENTICATE_PAYER' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const challenge = vars.challenge

return hosted === 'session' && challenge !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')

return log.request.body.order.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const challenge = vars.challenge

return hosted === 'session' && challenge !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.session.id === `${vars.session}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.id === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.id === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge
const hosted = vars.hosted
return hosted === 'session' && challenge !== 'attempted' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.authenticationStatus === 'AUTHENTICATION_SUCCESSFUL' }, vars)).toBeTruthy();
  }
  if ((() => { const challenge = vars.challenge
const hosted = vars.hosted
return hosted === 'session' && challenge === 'attempted' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.authenticationStatus === 'AUTHENTICATION_ATTEMPTED' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.authenticationStatus === 'AUTHENTICATION_SUCCESSFUL' }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'SUCCESS' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.brand === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let month = `${vars.month}`
month = Number(month)

return log.response.body.sourceOfFunds.provided.card.expiry.month === month.toString()
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let year = `${vars.year}`
year = Number(year)

return log.response.body.sourceOfFunds.provided.card.expiry.year === year.toString() }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.number === `${vars.sixDigits}xxxxxx${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.scheme === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.type === 'CARD' }, vars)).toBeTruthy();
  if ((() => { const hosted = vars.hosted
return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.transaction.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.id === `${vars.transaction_id}-1` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.type === 'AUTHENTICATION' }, vars)).toBeTruthy();
  }
  if ((() => { const subscription =vars.subscription

return subscription === 'yes' })()) {
    await verifyAgreementAuthentication(page, vars);
  }
}

// GI: "Verify Authorize/Capture log" (69778cc365fd97d14e2468d7)
export async function verifyAuthorizeCaptureLog(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const savedCC = vars.savedCC
const challenge = vars.challenge
const transactionType = vars.transactionType
const payForOrder = vars.payForOrder

return  threeDS === 'active' 
        &&
        hosted === 'session' 
        &&
        savedCC !== 'yes'
        &&
        challenge !== 'yes' 
        &&
        payForOrder !== 'yes'
        &&
        (
            transactionType === 'capture' 
            ||
            transactionType === 'authorize'
        ) })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[3] }, vars);
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const savedCC = vars.savedCC
const challenge = vars.challenge
const transactionType = vars.transactionType

return  threeDS === 'active'
        &&
        hosted === 'session'
        &&
        savedCC === 'yes'
        &&
        challenge !== 'yes'
        && 
        (
            transactionType === 'capture' 
            ||
            transactionType === 'authorize'
        ) })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[4] }, vars);
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const savedCC = vars.savedCC
const challenge = vars.challenge
const transactionType = vars.transactionType
const renewal = vars.renewal


return  threeDS === 'active'
        &&
        renewal !== 'yes'
        &&
        hosted === 'session' 
        &&
        savedCC !== 'yes'
        &&
        challenge === 'yes'
        && 
        (
            transactionType === 'capture' 
            ||
            transactionType === 'authorize'
        ) })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[5] }, vars);
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const savedCC = vars.savedCC
const challenge = vars.challenge
const transactionType = vars.transactionType
const payForOrder = vars.payForOrder

return  threeDS === 'active'
        &&
        hosted === 'session'
        &&
        (
            (savedCC === 'yes'
            &&
            challenge === 'yes')
            ||
            (payForOrder === 'yes'
            &&
            challenge !== 'yes')
        )
        &&
        (
            transactionType === 'capture' 
            ||
            transactionType === 'authorize'
        ) })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[6] }, vars);
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const savedCC = vars.savedCC

return  (
            threeDS === 'inactive' 
            && 
            savedCC !== 'yes'
        ) })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[1] }, vars);
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const savedCC = vars.savedCC

return  (
            threeDS === 'inactive' 
            && 
            savedCC === 'yes'
        ) })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[2] }, vars);
  }
  if ((() => { const transactionType = vars.transactionType
return  transactionType === 'partialCapture' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[logs[0].content.length - 2] }, vars);
  }
  if ((() => { const transactionType = vars.transactionType
return transactionType === 'totalCapture' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[logs[0].content.length - 1] }, vars);
  }
  if ((() => { const hosted = vars.hosted
const renewal = vars.renewal
return hosted === 'checkoutR' ||  renewal === 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[0] }, vars);
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'PUT' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'GET' }, vars)).toBeTruthy();
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const transactionType = vars.transactionType
const renewal = vars.renewal

return  hosted === 'session'
        &&
        threeDS !== 'inactive'
        &&
        (
            transactionType === 'authorize'
            ||
            transactionType == 'capture'
        )
        &&
        renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-2` }, vars)).toBeTruthy();
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const renewal = vars.renewal

return hosted === 'session' && (threeDS === 'inactive' || renewal === 'yes') })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-1`
 }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-3`
 }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { let transactionType = vars.transactionType
const hosted = vars.hosted
return  transactionType === 'capture' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'PAY' }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'CAPTURE' }, vars)).toBeTruthy();
  }
  if ((() => { let transactionType = vars.transactionType
const hosted = vars.hosted
return transactionType === 'authorize' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'AUTHORIZE' }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted
const renewal =vars.renewal

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session'
        &&
        renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.session.id === `${vars.session}` }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted
const renewal = vars.renewal

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session'
        &&
        renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.order.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted
const renewal = vars.renewal

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session'
        &&
        renewal !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')

return log.request.body.order.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted
const renewal = vars.renewal

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session'
        &&
        renewal === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.totalRenew}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.order.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted
const renewal = vars.renewal

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session'
        &&
        renewal === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.totalRenew}`
total = total.replace('$','')

return log.request.body.order.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.totalCapture}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.transaction.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.totalCapture}`
total = total.replace('$','')

return log.request.body.transaction.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.order.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.transaction.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
let transactionType = vars.transactionType

return  hosted === 'session'
        &&
        (
            transactionType === 'capture' 
            ||
            transactionType === 'authorize'
        ) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.id === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.id === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.id === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
let transactionType = vars.transactionType

return  hosted === 'session'
    &&
        (
            transactionType === 'capture' 
            ||
            transactionType === 'authorize'
        ) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.reference === `${vars.orderNumber}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
let transactionType = vars.transactionType

return  hosted === 'session'
    &&
        (
            transactionType === 'capture' 
            ||
            transactionType === 'authorize'
        ) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.order.reference === vars.orderNumber }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.reference === `${vars.orderNumber}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.reference === `${vars.orderNumber}` }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted
const transaction = vars.transaction
    
return  transactionType === 'capture'
        &&
        hosted === 'session'
        &&
        transaction !== 'declined' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'CAPTURED' }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted
const transaction = vars.transaction
    
return  transactionType === 'capture'
        &&
        hosted === 'session'
        &&
        transaction === 'declined' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'FAILED' }, vars)).toBeTruthy();
  }
  if ((() => { let transactionType = vars.transactionType

return transactionType === 'partialCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'PARTIALLY_CAPTURED' }, vars)).toBeTruthy();
  }
  if ((() => { let transactionType = vars.transactionType
const hosted = vars.hosted
return transactionType === 'capture' && hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.status === 'CAPTURED' }, vars)).toBeTruthy();
  }
  if ((() => { let transactionType = vars.transactionType
const hosted = vars.hosted

return  transactionType === 'authorize' 
        && 
        hosted === 'session'
        &&
        transaction!== 'declined' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'AUTHORIZED' }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted
const transaction = vars.transaction
    
return  transactionType === 'authorize'
        &&
        hosted === 'session'
        &&
        transaction === 'declined' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'FAILED' }, vars)).toBeTruthy();
  }
  if ((() => { let transactionType = vars.transactionType
const hosted = vars.hosted
return transactionType === 'authorize' && hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.status === 'AUTHORIZED' }, vars)).toBeTruthy();
  }
  if ((() => { const transaction = vars.transaction
    
return transaction !== 'declined' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'SUCCESS' }, vars)).toBeTruthy();
  }
  if ((() => { const transaction = vars.transaction
    
return transaction === 'declined' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'FAILURE' }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.brand === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let month = `${vars.month}`
month = Number(month)

return log.response.body.sourceOfFunds.provided.card.expiry.month === month.toString()
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let year = `${vars.year}`
year = Number(year)

return log.response.body.sourceOfFunds.provided.card.expiry.year === year.toString() }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.number === `${vars.sixDigits}xxxxxx${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.scheme === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.type === 'CARD' }, vars)).toBeTruthy();
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.transaction.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const hosted = vars.hosted

return  transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const renewal = vars.renewal

return hosted === 'session' && (threeDS === 'inactive' || renewal === 'yes') })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.id === `${vars.transaction_id}-1` }, vars)).toBeTruthy();
  }
  if ((() => { const threeDS = vars['3ds']
const hosted = vars.hosted
const transactionType = vars.transactionType
const renewal = vars.renewal

return  hosted === 'session'
        &&
        threeDS !== 'inactive'
        &&
        renewal !== 'yes'
        &&
        transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.id === `${vars.transaction_id}-2` }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType

return  transactionType === 'partialCapture'
        ||
        transactionType === 'totalCapture' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.id === `${vars.transaction_id}-3` }, vars)).toBeTruthy();
  }
  if ((() => { const renewal = vars.renewal

return renewal === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.token === `${vars.token}` }, vars)).toBeTruthy();
  }
  if ((() => { const subscription = vars.subscription

return subscription === 'yes' })()) {
    await verifyAgreementAuthorizeCapture(page, vars);
  }
}

// GI: "verify Email - Admin and Customer" (69778cc365fd97d14e2468de)
export async function verifyEmailAdminAndCustomer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(5000);
  vars.playgroundsEmail = `${vars.email ?? ''}`;
  vars.extraFilter = `subject: ${vars.orderNumber ?? ''}`;
  await playgroundsEmail(page, vars);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableElement>("#body_content_inner > div:nth-of-type(1) > table > tfoot > tr > td.td"))
len = len.length -1
return len }, vars);
  if (!vars.blog.includes('block')) {
    await expect(page.locator(`tr.order-totals.order-totals-payment_method > td`).or(page.locator(`#body_content_inner > div:nth-of-type(1) > table > tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`)).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  }
  await page.goto(`${vars.startUrl ?? ''}`);
  await page.waitForLoadState('load');
  await deletePlaygroundsEmail(page, vars);
  vars.playgroundsEmail = `qa+${vars.blog ?? ''}@playgrounds.saucal.io`;
  vars.extraFilter = `subject: ${vars.orderNumber ?? ''}`;
  await playgroundsEmail(page, vars);
  if (!vars.blog.includes('block')) {
    await expect(page.locator(`tr.order-totals.order-totals-payment_method > td`).or(page.locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`)).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  }
  await page.goto(`${vars.startUrl ?? ''}`);
  await page.waitForLoadState('load');
  await deletePlaygroundsEmail(page, vars);
}

// GI: "verify Email - Only Admin" (69778cc365fd97d14e2468df)
export async function verifyEmailOnlyAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.playgroundsEmail = `qa+${vars.blog ?? ''}@playgrounds.saucal.io`;
  vars.extraFilter = `subject: ${vars.orderNumber ?? ''}`;
  await playgroundsEmail(page, vars);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
len = len.length -1
return len }, vars);
  if (!vars.blog.includes('block')) {
    await expect(page.locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`).or(page.locator(`tbody > tr.order-totals.order-totals-payment_method > td`)).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  }
  await page.goto(`${vars.startUrl ?? ''}`);
  await page.waitForLoadState('load');
  await deletePlaygroundsEmail(page, vars);
}

// GI: "verify Email - only Customer" (69778cc365fd97d14e2468e0)
export async function verifyEmailOnlyCustomer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.playgroundsEmail = `${vars.email ?? ''}`;
  if ((() => { let test = vars.refund
return test !== "full" && test !== "partial" })()) {
    vars.extraFilter = `subject: ${vars.orderNumber ?? ''}`;
  }
  if ((() => { let test = vars.refund
return test === "full" || test === "partial" })()) {
    vars.extraFilter = `subject: ${vars.orderNumber ?? ''} subject:refunded`;
  }
  await playgroundsEmail(page, vars);
  if ((() => { let test = vars.refund
return test != "full" && test != "partial" })()) {
    vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
len = len.length -1
return len }, vars);
  }
  if ((() => { let test = vars.refund
return test === "full" || test === "partial" })()) {
    vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
len = len.length -2
return len }, vars);
  }
  if (!vars.blog.includes('block')) {
    await expect(page.locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`).or(page.locator(`tr.order-totals.order-totals-payment_method > td`)).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  }
  await page.goto(`${vars.startUrl ?? ''}`);
  await page.waitForLoadState('load');
  await deletePlaygroundsEmail(page, vars);
}

// GI: "Verify Initiate Authentication log" (69778cc365fd97d14e2468d8)
export async function verifyInitiateAuthenticationLog(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const savedCC = vars.savedCC
return savedCC !== 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[1] }, vars);
  }
  if ((() => { const savedCC = vars.savedCC
return savedCC === 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[2] }, vars);
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'PUT' }, vars)).toBeTruthy();
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-1` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'INITIATE_AUTHENTICATION' }, vars)).toBeTruthy();
  if (false) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.authentication.channel === 'PAYER_BROWSER' }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.session.id === `${vars.session}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.currency === 'USD' }, vars)).toBeTruthy();
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.id === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.transaction_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.id }, vars);
  }
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'AUTHENTICATION_INITIATED' }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'SUCCESS' }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.brand === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let month = `${vars.month}`
month = Number(month)

return log.response.body.sourceOfFunds.provided.card.expiry.month === month.toString()
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let year = `${vars.year}`
year = Number(year)

return log.response.body.sourceOfFunds.provided.card.expiry.year === year.toString() }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.number === `${vars.sixDigits}xxxxxx${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.scheme === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.type === 'CARD' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.transaction.amount === 0 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.currency === 'USD' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.id === `${vars.transaction_id}-1` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.type === 'AUTHENTICATION' }, vars)).toBeTruthy();
}

// GI: "Verify Refund log" (69778cc365fd97d14e2468d9)
export async function verifyRefundLog(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const refund = vars.refund

return refund === 'exceed' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.transactionPutLogs

return logs[0].content.length === 0 }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund !== 'exceed' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[1] }, vars);
  }
  if ((() => { const refund = vars.refund

return refund !== 'exceed' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'PUT' }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund !== 'exceed' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-3` }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund !== 'exceed' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'REFUND' }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund === 'full' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')

return log.request.body.transaction.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund === 'partial' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.partialRefund}`
total = total.replace('$','')

return log.request.body.transaction.amount === total }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund !== 'exceed' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.transaction.currency === 'USD' }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund === 'full' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = parseFloat(total.replace('$',''))

return log.response.body.order.totalRefundedAmount === total }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund === 'partial' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.totalRefundedAmount === vars.partialRefund }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund === 'full' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'REFUNDED' }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund === 'partial' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'PARTIALLY_REFUNDED' }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return refund !== 'exceed' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'SUCCESS' }, vars)).toBeTruthy();
  }
}

// GI: "Verify Saved token log" (69778cc365fd97d14e2468da)
export async function verifySavedTokenLog(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.tokenLogs
const log = logs[0].content[0]

return log }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'POST' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === 'https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/token' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.session.id === `${vars.session}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'SUCCESS' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.brand === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.expiry === `${vars.month}${vars.year}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.number === `${vars.sixDigits}xxxxxx${vars.fourDigits}`
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.type === 'CARD'
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.status === 'VALID' }, vars)).toBeTruthy();
  vars.token = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.token
 }, vars);
}

// GI: "Verify Session" (69778cc365fd97d14e2468db)
export async function verifySession(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const addPaymentMethod = vars.addPaymentMethod
return addPaymentMethod !== 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.sessionPostLogs

return logs[0].content[0] }, vars);
  }
  if ((() => { const addPaymentMethod = vars.addPaymentMethod
return addPaymentMethod !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'POST' || log.request.type === 'PUT' }, vars)).toBeTruthy();
  }
  if ((() => { const addPaymentMethod = vars.addPaymentMethod
return addPaymentMethod !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === 'https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/session' 
        ||
       log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/session/${vars.session}` }, vars)).toBeTruthy();
  }
  if ((() => { const addPaymentMethod = vars.addPaymentMethod
return addPaymentMethod !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'SUCCESS'
        ||
       log.response.body.session.updateStatus === 'SUCCESS' }, vars)).toBeTruthy();
  }
  if ((() => { const addPaymentMethod = vars.addPaymentMethod
return addPaymentMethod !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.session.id === `${vars.session}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'INITIATE_CHECKOUT' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`

    const currencyStr = `${vars.total}`
    // Remove any non-numeric characters except commas, dots, and minus signs
    let cleaned = currencyStr.replace(/[^\d,.-]/g, '');

    // If the string has both '.' and ',', determine which is the decimal separator
    if (cleaned.includes('.') && cleaned.includes(',')) {
        if (cleaned.lastIndexOf('.') > cleaned.lastIndexOf(',')) {
            // Case: US format "$1,000.00" (comma as thousands separator, dot as decimal)
            cleaned = cleaned.replace(/,/g, '');
        } else {
            // Case: EU format "1.000,87 €" (dot as thousands separator, comma as decimal)
            cleaned = cleaned.replace(/\./g, '').replace(',', '.');
        }
    } else {
        // If only a comma exists, assume EU format
        if (cleaned.includes(',')) {
            cleaned = cleaned.replace(',', '.');
        }
        // If only a dot exists, assume US format (no change needed)
    }

return log.request.body.order.amount === cleaned

 }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.order.currency === 'USD'

 }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
const transaction_id = `${vars.transaction_id}`
return log.request.body.order.id === transaction_id }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'checkoutR' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.order.reference === vars.orderNumber }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.sessionGetLogs

return logs[0].content[0] }, vars);
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/session/${vars.session}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'PUT' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'UPDATE_SESSION' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.sourceOfFunds.token === `${vars.token}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.session.id === `${vars.session}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.session.updateStatus === 'SUCCESS' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.token === `${vars.token}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC !== 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.sessionGetLogs

return logs[0].content[0] }, vars);
  }
  if ((() => { const hosted = vars.hosted
const savedCC = vars.savedCC

return hosted === 'session' && savedCC === 'yes' })()) {
    vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.sessionGetLogs

return logs[0].content[1] }, vars);
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/session/${vars.session}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'GET' }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.session.id === `${vars.session}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.session.updateStatus === 'SUCCESS' }, vars)).toBeTruthy();
  }
  if ((() => { const savedCC = vars.savedCC
const hosted = vars.hosted

return savedCC !== 'yes' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.brand === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { const savedCC = vars.savedCC
const hosted = vars.hosted

return savedCC !== 'yes' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let month = `${vars.month}`
month = Number(month)

return log.response.body.sourceOfFunds.provided.card.expiry.month === month.toString()
 }, vars)).toBeTruthy();
  }
  if ((() => { const savedCC = vars.savedCC
const hosted = vars.hosted

return savedCC !== 'yes' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let year = `${vars.year}`
year = Number(year)

return log.response.body.sourceOfFunds.provided.card.expiry.year === year.toString() }, vars)).toBeTruthy();
  }
  if ((() => { const savedCC = vars.savedCC
const hosted = vars.hosted

return savedCC !== 'yes' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.number === `${vars.sixDigits}xxxxxx${vars.fourDigits}` }, vars)).toBeTruthy();
  }
  if ((() => { const savedCC = vars.savedCC
const hosted = vars.hosted

return savedCC !== 'yes' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.scheme === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { const savedCC = vars.savedCC
const hosted = vars.hosted

return savedCC !== 'yes' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.securityCode === 'xxx' }, vars)).toBeTruthy();
  }
  if ((() => { const savedCC = vars.savedCC
const hosted = vars.hosted

return savedCC === 'yes' && hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.token === `${vars.token}` }, vars)).toBeTruthy();
  }
  if ((() => { const hosted = vars.hosted

return hosted === 'session' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.type === 'CARD' }, vars)).toBeTruthy();
  }
}

// GI: "Verify Transaction on logs" (69778cc365fd97d14e2468dc)
export async function verifyTransactionOnLogs(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractLogsByPayDate(page, vars);
  if ((() => { const transaction = vars.transaction
const refund = vars.refund


return transaction !== 'declined' && !refund })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].rows[0].includes(`Successfully completed payment, CHARGE longId is ${vars.charge_id}`) }, vars)).toBeTruthy();
  }
  if ((() => { const transaction = vars.transaction
const challenge = vars.challenge
const refund = vars.refund

return transaction === 'declined' && challenge === 'fail' && !refund })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].rows[0].includes('The provided PaymentMethod has failed authentication. You can provide payment_method_data or a new PaymentMethod to attempt to fulfill this PaymentIntent again.') }, vars)).toBeTruthy();
  }
  if ((() => { const transaction = vars.transaction
const challenge = vars.challenge
const refund = vars.refund

return transaction === 'declined' && challenge !== 'fail' && !refund })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].rows[0].includes('Your card was declined.') }, vars)).toBeTruthy();
  }
  if ((() => { const refund = vars.refund

return !!refund })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const refundWCId = vars.orderNumber + 1

return  logs[0].rows[0].includes('Map WC refund '+refundWCId+` to payout ${vars.refundID}.`)
        &&
        logs[0].rows[1].includes('Payout API request result: Instant refund processed successfully') }, vars)).toBeTruthy();
  }
}

// GI: "Verify Void log" (69778cc365fd97d14e2468dd)
export async function verifyVoidLog(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.log = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs

return logs[0].content[logs[0].content.length - 2] }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.type === 'PUT' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-3`
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.apiOperation === 'VOID' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.request.body.transaction.targetTransactionId === `${vars.transaction_id}-2` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.order.amount === total }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.currency === 'USD' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.id === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.reference === `${vars.orderNumber}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.order.status === 'CANCELLED' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.result === 'SUCCESS' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.brand === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let month = `${vars.month}`
month = Number(month)

return log.response.body.sourceOfFunds.provided.card.expiry.month === month.toString()
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let year = `${vars.year}`
year = Number(year)

return log.response.body.sourceOfFunds.provided.card.expiry.year === year.toString() }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.number === `${vars.sixDigits}xxxxxx${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.provided.card.scheme === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.sourceOfFunds.type === 'CARD' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log
let total = `${vars.total}`
total = total.replace('$','')
total = parseFloat(total)

return log.response.body.transaction.amount === total }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.currency === 'USD' }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.id === `${vars.transaction_id}-3` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const log = vars.log

return log.response.body.transaction.type === 'VOID_AUTHORIZATION' }, vars)).toBeTruthy();
}
