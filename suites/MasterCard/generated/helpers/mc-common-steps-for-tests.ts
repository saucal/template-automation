// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "MC - Common Steps for Tests"
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

// GI: "3DS challenge" (6942e5c02ab7b3e70a790209)
export async function _3DSChallenge(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`center > h1`).first()).toHaveText(`ACS Emulator for 3DS V2`);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
}

// GI: "Add Download Product to Cart" (676ebbd5186faa7fdcbb796a)
export async function addDownloadProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prodType = `download`;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=1594`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await page.locator(`a[href*='checkout']`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  vars.sessionDate = `${vars.payDate ?? ''}`;
}

// GI: "Add Payment Method" (67b47120ad35d6706cfa1330)
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

// GI: "Add Physical Product to Cart" (676eb9b335aed64d30770a83)
export async function addPhysicalProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prodType = `physical`;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=1103`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await page.locator(`a[href*='checkout']`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  vars.sessionDate = `${vars.payDate ?? ''}`;
}

// GI: "Add Physical Subscription Product to Cart" (68f23c34c75f80212a7e2c13)
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

// GI: "Add Virtual Product to Cart" (676ebbe3186faa7fdcbb79e3)
export async function addVirtualProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prodType = `virtual`;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=1593`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await page.locator(`a[href*='checkout']`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  vars.sessionDate = `${vars.payDate ?? ''}`;
}

// GI: "Capture/Void Payment by Admin" (678ff044be7bfb2606f33f25)
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

// GI: "Check My Account" (6772bfba186faa7fdc3b2447)
export async function checkMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const tokenizedCards = vars.tokenizedCards

return tokenizedCards !== 'inactive' })()) {
    await page.goto(`${vars.startUrl ?? ''}my-account/payment-methods/`);
    await page.waitForLoadState('load');
  }
  if ((() => { const tokenizedCards = vars.tokenizedCards

return tokenizedCards === 'inactive' })()) {
    await page.goto(`${vars.startUrl ?? ''}my-account/`);
    await page.waitForLoadState('load');
  }
  if ((() => { const savingCC = vars.savingCC
const savedCC = vars.savedCC
const CCsaved = vars.CCsaved
const tokenizedCards = vars.tokenizedCards
const subscription = vars.subscription

return savingCC !== 'yes' && savedCC !== 'yes' 
        && CCsaved === 0 && tokenizedCards !== 'inactive' 
        && subscription !== 'yes' })()) {
    await expect(page.locator(`.woocommerce-info`).first()).toHaveText(`No saved methods found.`);
  }
  if ((() => { const savingCC = vars.savingCC
const savedCC = vars.savedCC
const CCsaved = vars.CCsaved
const tokenizedCards = vars.tokenizedCards
const subscription = vars.subscription

return (savingCC == 'yes' && CCsaved === 1 && tokenizedCards !== 'inactive')
        || subscription === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''}`);
  }
  if ((() => { const savingCC = vars.savingCC
const savedCC = vars.savedCC
const CCsaved = vars.CCsaved
const tokenizedCards = vars.tokenizedCards
const subscription = vars.subscription
const upgrade = vars.upgrade

return (savingCC == 'yes' && CCsaved === 1 && tokenizedCards !== 'inactive')
        || (subscription === 'yes' && upgrade !== 'yes') })()) {
    await expect(page.locator(`tr:nth-of-type(2) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`)).toHaveCount(0);
  }
  if ((() => { const savingCC = vars.savingCC
const savedCC = vars.savedCC
const CCsaved = vars.CCsaved
const tokenizedCards = vars.tokenizedCards

return savingCC === 'yes' && CCsaved >= 1 && tokenizedCards !== 'inactive' })()) {
    await expect(page.locator(`tr:nth-of-type(${vars.CCsaved ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toHaveText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''}`);
  }
  if ((() => { const savingCC = vars.savingCC
const savedCC = vars.savedCC
const CCsaved = vars.CCsaved
const tokenizedCards = vars.tokenizedCards

return savingCC === 'yes' && CCsaved >= 1 && tokenizedCards !== 'inactive' })()) {
    await expect(page.locator(`tr:nth-of-type(${vars.CCsaved ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--expires`).first()).toHaveText(`${vars.month ?? ''}/${vars.year ?? ''}`);
  }
  if ((() => { const tokenizedCards = vars.tokenizedCards
const hosted = vars.hosted

return tokenizedCards === 'inactive' || hosted === 'checkout' })()) {
    await expect(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--payment-methods > a`)).toHaveCount(0);
  }
  if ((() => { const tokenizedCards = vars.tokenizedCards
const hosted = vars.hosted

return tokenizedCards !== 'inactive' && hosted === 'session' })()) {
    await expect(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--payment-methods > a`)).not.toHaveCount(0);
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    await page.goto(`${vars.startUrl ?? ''}cart-2/`);
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
  if ((() => { const producType = vars.prodType
const upgrade = vars.upgrade

return producType === 'physical' && upgrade !== 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`WooCommerce Gateway Acme Plugin`);
  }
  if ((() => { const producType = vars.prodType
const upgrade = vars.upgrade

return producType === 'physical' && upgrade !== 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { const producType = vars.prodType
const upgrade = vars.upgrade

return producType === 'virtual' || producType === 'download' 
        || upgrade === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`WooCommerce Gateway Acme Plugin`);
  }
  if ((() => { const producType = vars.prodType
const upgrade = vars.upgrade

return producType === 'virtual' || producType === 'download' 
        || upgrade === 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { const subscription = vars.subscription

return subscription === 'yes' })()) {
    await myAccountSubscription(page, vars);
  }
}

// GI: "Check Subscription Backend" (690e00d8575507267f4f7107)
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

// GI: "Check Transaction" (6772b49a186faa7fdc389444)
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

// GI: "Check transcation is present on Order backend" (6772b0e0186faa7fdc37aed3)
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
    await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''}`);
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
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`${vars.paymentMethodTitle ?? ''} payment was Captured (Order ID: ${vars.transaction_id ?? ''})`);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Error processing payment.`);
  }
  if ((() => { const refund = vars.refund
const transactionType = vars.transactionType
const transaction = vars.transaction

return refund !== 'exceed' && transactionType === 'authorize'
        &&
        transaction !== 'declined' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`${vars.paymentMethodTitle ?? ''} payment was Authorized (Order ID: ${vars.transaction_id ?? ''})`);
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
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`${vars.paymentMethodTitle ?? ''} payment was Captured (Order ID: ${vars.transaction_id ?? ''})`);
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

// GI: "Create order for user by API" (6787d6d0e9793a10009b4d47)
export async function createOrderForUserByAPI(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/orders/?customer_id=${vars.userId}`;
  const data = `{"currency":"USD","billing":{"first_name":"${vars.firstName}","last_name":"${vars.lastName}","company":"${vars.company}","address_1":"${vars.street}","address_2":"${vars.address2}","city":"${vars.city}","state":"FL","postcode":"${vars.zipCode}","country":"US","email":"${vars.email}","phone":"${vars.phone}"},"line_items":[{"product_id":1593,"quantity":1}]}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      body: data,
      headers: headers,
      credentials: 'omit'
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

// GI: "Delete Playgrounds Email" (67adf606e66fdcb2f9ab01c2)
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

// GI: "Extract date" (676ec1fb35aed64d30777b56)
export async function extractDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payDate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = new Date();
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);

return date }, vars);
}

// GI: "Extract four digits of CC" (67768c3135aed64d300ffbba)
export async function extractFourDigitsOfCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.fourDigits = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let card = `${vars.CCard}`
let four = card.substr(card.length - 4);
return four }, vars);
  vars.sixDigits = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let card = `${vars.CCard}`
let six = card.substr(0,6);
return six }, vars);
}

// GI: "Extract logs by payDate" (67a9ea126b884a2255094ea5)
export async function extractLogsByPayDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const date = `${vars.payDate}`;
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-log?date=`+date;
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

// GI: "Extract Session GET" (67adec6ae66fdcb2f9a882e9)
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

// GI: "Extract Session POST" (67adec143683d16ed63e47e4)
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

// GI: "Extract Token POST" (67aded26e66fdcb2f9a8b78b)
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

// GI: "Extract transaction PUT" (67af5d933683d16ed695941f)
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

// GI: "Fill CC" (67852ea435aed64d30bd1cfd)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let savedCC = `${vars.savedCC}`
let element = Array.from<any>(document.querySelectorAll<HTMLInputElement>('div.payment_method_acme li.woocommerce-SavedPaymentMethods-token, label > input[name="radio-control-wc-payment-method-saved-tokens"] , div.payment_method_mastercard_merchant_cloud li.woocommerce-SavedPaymentMethods-token'));

return savedCC != 'yes' && element.length >= 1 }, vars)) {
    {
      const _lbl = page.locator(`label[for="wc-mastercard_merchant_cloud-payment-token-new"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-mastercard_merchant_cloud"]`)).or(page.locator(`label[for="wc-acme-payment-token-new"]`)).or(page.locator(`label[for="radio-control-wc-payment-method-options-acme"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wc-mastercard_merchant_cloud-payment-token-new`).or(page.locator(`#radio-control-wc-payment-method-options-mastercard_merchant_cloud`)).or(page.locator(`#wc-acme-payment-token-new`)).or(page.locator(`#radio-control-wc-payment-method-options-acme`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let savedCC = `${vars.savedCC}`
let element = Array.from<any>(document.querySelectorAll<HTMLInputElement>('div.payment_method_acme li.woocommerce-SavedPaymentMethods-token, label > input[name="radio-control-wc-payment-method-saved-tokens"] , div.payment_method_mastercard_merchant_cloud li.woocommerce-SavedPaymentMethods-token'));

return savedCC != 'yes' && element.length >= 1 }, vars)) {
    await blockUI(page, vars);
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    await blockUI(page, vars);
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`${vars.CCard ?? ''}`); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    await blockUI(page, vars);
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`${vars.month ?? ''}`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`${vars.month ?? ''}`); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    await blockUI(page, vars);
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`${vars.year ?? ''}`); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    await blockUI(page, vars);
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`${vars.cvv ?? ''}`); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC != 'yes' })()) {
    await page.keyboard.press('Tab');
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const user = `${vars.user}`
const tokenizedCards = `${vars.tokenizedCards}`
const checkout = document.querySelector<HTMLFormElement>('form.woocommerce-checkout')

return user === "guest" && tokenizedCards !== 'inactive' && !!checkout
 }, vars)) {
    await expect(page.locator(`xpath=//label[contains(text(), "Save to account")]`).or(page.locator(`label[for="wc-acme-new-payment-method"]`)).or(page.locator(`label[for="wc-mastercard_merchant_cloud-new-payment-method"]`)).first()).not.toBeVisible();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const user = `${vars.user}`
const tokenizedCards = `${vars.tokenizedCards}`
const checkout = document.querySelector('.wp-block-woocommerce-checkout')

return user === "guest" && tokenizedCards !== 'inactive'  && !!checkout }, vars)) {
    await expect(page.locator(`xpath=//span[contains(text(), "Save payment information to my account for future purchases.")]`).or(page.locator(`div.wc-block-components-payment-methods__save-card-info`))).toHaveCount(0);
  }
  if ((() => { const tokenizedCards = vars.tokenizedCards
const subscription = vars.subscription

return tokenizedCards === 'inactive' || subscription === 'yes' })()) {
    await expect(page.locator(`label[for="wc-acme-new-payment-method"]`).or(page.locator(`label[for="wc-mastercard_merchant_cloud-new-payment-method"]`))).toHaveCount(0);
  }
  if ((() => { const tokenizedCards = vars.tokenizedCards
const subscription = vars.subscription

return tokenizedCards === 'inactive' || subscription === 'yes' })()) {
    await expect(page.locator(`xpath=//li[@class='wc_payment_method payment_method_mastercard_merchant_cloud']//label[contains(text(), "Save to account")]`)).toHaveCount(0);
  }
  if ((() => { const tokenizedCards = vars.tokenizedCards
const subscription = vars.subscription

return tokenizedCards === 'inactive' || subscription === 'yes' })()) {
    await expect(page.locator(`xpath=//span[contains(text(), "Save payment information to my account for future purchases.")]`)).toHaveCount(0);
  }
  if ((() => { const tokenizedCards = vars.tokenizedCards
const subscription = vars.subscription

return tokenizedCards === 'inactive' || subscription === 'yes' })()) {
    await expect(page.locator(`div.wc-block-components-payment-methods__save-card-info.input`)).toHaveCount(0);
  }
  if ((() => { const user = vars.user
const tokenizedCards = vars.tokenizedCards
const addPaymentMethod = vars.addPaymentMethod

return  user === "new" 
        &&
        tokenizedCards !== 'inactive' 
        && 
        addPaymentMethod !== 'yes' })()) {
    await expect(page.locator(`xpath=//label[contains(text(), "Save to account")]`).or(page.locator(`label[for="wc-acme-new-payment-method"]`)).or(page.locator(`xpath=//span[contains(text(), "Save payment information to my account for future purchases.")]`)).or(page.locator(`div.wc-block-components-payment-methods__save-card-info.input`)).or(page.locator(`label[for="wc-mastercard_merchant_cloud-new-payment-method"]`)).first()).toBeVisible();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const savingCC = `${vars.savingCC}`
const checkbox = document.querySelector<HTMLInputElement>('input#wc-acme-new-payment-method, div.wc-block-components-payment-methods__save-card-info input, input#wc-mastercard_merchant_cloud-new-payment-method');
const tokenizedCards = `${vars.tokenizedCards}`


return savingCC === "yes" && (checkbox as HTMLInputElement).checked === false  }, vars)) {
    await page.locator(`xpath=//label[contains(text(), "Save to account")]`).or(page.locator(`label[for="wc-acme-new-payment-method"]`)).or(page.locator(`xpath=//span[contains(text(), "Save payment information to my account for future purchases.")]`)).or(page.locator(`div.wc-block-components-payment-methods__save-card-info input`)).or(page.locator(`label[for="wc-mastercard_merchant_cloud-new-payment-method"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC === 'yes' })()) {
    vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLInputElement>('li.woocommerce-SavedPaymentMethods-token > label, label > input[name="radio-control-wc-payment-method-saved-tokens"]'))

return element.length }, vars);
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC === 'yes' })()) {
    await expect(page.locator(`li:nth-of-type(${vars.n ?? ''}).woocommerce-SavedPaymentMethods-token > label`).or(page.locator(`label[for*='radio-control-wc-payment-method-saved-tokens']:nth-of-type(${vars.n ?? ''}) > div`)).first()).toContainText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''} (expires ${vars.month ?? ''}/${vars.year ?? ''})`);
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC === 'yes' })()) {
    await page.locator(`li:nth-of-type(${vars.n ?? ''}).woocommerce-SavedPaymentMethods-token > input`).or(page.locator(`label:nth-of-type(${vars.n ?? ''}) > input[name='radio-control-wc-payment-method-saved-tokens']`)).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Fill CC Hosted Checkout" (678532289bf3007e2b7ce601)
export async function fillCCHostedCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.session = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let session = document.querySelector('app-root')

if (session !== null) {
      session = session.getAttribute('data-session-id')
    } else {
      session = document.querySelector('#acme-hosted-checkout-container, #mastercard_merchant_cloud-hosted-checkout-container').getAttribute('data-session-id')
    }  
      

return session
 }, vars);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`xpath=//span[contains(text(), "Credit or Debit card")]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`.payment-option__credit-debit-text`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`.payment-option__credit-debit-text`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#nameOnCard`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#nameOnCard`)).first().fill(`QA Test`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#nameOnCard`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#nameOnCard`)).first().selectOption(`QA Test`); }
  try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`)).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`)).first().selectOption(`${vars.CCard ?? ''}`); }
  try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`)).first().fill(`${vars.month ?? ''}`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`)).first().selectOption(`${vars.month ?? ''}`); }
  try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`)).first().fill(`${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`)).first().selectOption(`${vars.year ?? ''}`); }
  try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`)).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`)).first().selectOption(`${vars.cvv ?? ''}`); }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`#label-transactional-currency`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#label-transactional-currency`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`#pay-label`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#pay-label`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  await extractDate(page, vars);
  try {
    await expect(page.locator(`.absolute`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`.absolute`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    await page.keyboard.press('Tab');
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    await page.keyboard.press('Tab');
  }
  if ((() => { const challenge = vars.challenge

return challenge === 'yes' })()) {
    await page.keyboard.press('Enter');
  }
  try {
    await expect(page.locator(`.absolute`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`.absolute`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`iframe#challengeFrame .absolute`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe#challengeFrame .absolute`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`iframe#challengeFrame mc-sonic[type="default"]`).or(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`iframe#challengeFrame mc-sonic[type="default"]`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`iframe#challengeFrame .fixed`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
}

// GI: "Fill Checkout" (676eba5935aed64d307712f3)
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
  try {
    try { await page.locator(`#billing_address_2`).or(page.locator(`#billing-address_2`)).or(page.locator(`#shipping-address_2`)).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`#billing-address_2`)).or(page.locator(`#shipping-address_2`)).first().selectOption(`${vars.address2 ?? ''}`); }
  } catch { /* optional step: assign */ }
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
    await page.locator(`xpath=//span[contains(text(), "Create an account?")]`).or(page.locator(`.form-row > label.woocommerce-form__label.woocommerce-form__label-for-checkbox.checkbox > span`)).or(page.locator(`xpath=//span[contains(text(), "Create an account with Testing Site")]`)).or(page.locator(`div.wc-block-components-checkbox.fwc-block-checkout__create-account > label > span`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let user = vars.user

return user === "new" || vars.subscription == 'yes' })()) {
    try { await page.locator(`#account_password`).or(page.locator(`div.wc-block-components-address-form__password > input`)).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).or(page.locator(`div.wc-block-components-address-form__password > input`)).first().selectOption(`${vars.password ?? ''}`); }
  }
  await blockUI(page, vars);
}

// GI: "Get users" (6787d725e9793a10009b5ad2)
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
      credentials: 'omit'
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

// GI: "Get Woo order details" (6772b204186faa7fdc37efe4)
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
      credentials: 'omit'
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
      credentials: 'omit'
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
    vars.transaction_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.meta_data.find(meta => meta.key === "mastercard_merchant_cloud_order_id")?.value }, vars);
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.id }, vars);
  }
  vars.paymentMethodTitle = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.payment_method_title }, vars);
  if ((() => { const renewal = vars.renewal

return renewal !== 'yes' })()) {
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
  }
  if ((() => { const renewal = vars.renewal

return renewal === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder

    const currencyStr = `${vars.totalRenew}`
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
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "mastercard_merchant_cloud" }, vars)).toBeTruthy();
  vars.shippingTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_total }, vars);
  vars.shippingTaxTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_tax }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "WooCommerce Gateway Acme Plugin" }, vars)).toBeTruthy();
}

// GI: "Get Woo subscription details" (691739f8638b7297927f2143)
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
      credentials: 'omit'
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

// GI: "Login" (6776895204ed5cc20e43beec)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}my-account`);
  await page.waitForLoadState('load');
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`My account`);
}

// GI: "Login admin" (6772b04235aed64d30a10177)
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

// GI: "My Account - Subscription" (68f260c44118fc2581dc13ec)
export async function myAccountSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
  await expect(page.locator(`.subscription-payment-method`).first()).toContainText(`Via WooCommerce Gateway Acme Plugin`);
}

// GI: "Pay for Order - Create order" (67ab53673683d16ed6bd834e)
export async function payForOrderCreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  vars.sessionDate = `${vars.payDate ?? ''}`;
}

// GI: "Pay MasterCard" (676ed4689bf3007e2b51ac1b)
export async function payMasterCard(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let hosted = vars.hosted

return hosted === 'session' })()) {
    {
      const _lbl = page.locator(`label[for="payment_method_acme"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-acme"]`)).or(page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`)).or(page.locator(`label[for="radio-control-wc-payment-method-options-mastercard_merchant_cloud"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_acme`).or(page.locator(`#radio-control-wc-payment-method-options-acme`)).or(page.locator(`#payment_method_mastercard_merchant_cloud`)).or(page.locator(`#radio-control-wc-payment-method-options-mastercard_merchant_cloud`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let hosted = vars.hosted

return hosted === 'session' })()) {
    await fillCC(page, vars);
  }
  if ((() => { let hosted = vars.hosted

return hosted === 'checkoutR' })()) {
    await fillCCHostedCheckout(page, vars);
  }
}

// GI: "Place Order" (676ec16435aed64d3077699b)
export async function placeOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="payment_method_acme"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-acme"]`)).or(page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`)).or(page.locator(`label[for="radio-control-wc-payment-method-options-mastercard_merchant_cloud"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_acme`).or(page.locator(`#radio-control-wc-payment-method-options-acme`)).or(page.locator(`#payment_method_mastercard_merchant_cloud`)).or(page.locator(`#radio-control-wc-payment-method-options-mastercard_merchant_cloud`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { let hosted = vars.hosted

return hosted === 'session' })()) {
    await payMasterCard(page, vars);
  }
  if ((() => { let hosted = vars.hosted

return hosted === 'session' })()) {
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
  if ((() => { const subscription = vars.subscription
const manualRenew = vars.manualRenew

return subscription === 'yes' && manualRenew !== 'yes' })()) {
    vars.totalRenew = ((await page.locator(`tfoot > tr.order-total.recurring-total > td span.woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__title span.wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
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
  await extractDate(page, vars);
  if ((() => { const hosted = vars.hosted
const payForOrder = vars.payForOrder

return hosted === 'checkoutR' && payForOrder !== 'yes' })()) {
    vars.sessionDate = `${vars.payDate ?? ''}`;
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const hosted = `${vars.hosted}`
const session = document.querySelector('#acme_session_id, #mastercard_merchant_cloud_session_id')


return hosted === 'session' && !!session }, vars)) {
    vars.session = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const session = document.querySelector('#acme_session_id, #mastercard_merchant_cloud_session_id').getAttribute('value')
return session }, vars);
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
    if ((() => { const hosted = vars.hosted
const session = vars.session

return hosted === 'session' && session == '' })()) {
      vars.session = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const session = document.querySelector('#acme_session_id , #mastercard_merchant_cloud_session_id').getAttribute('value')
return session }, vars);
    }
  } catch { /* optional step: extractEval */ }
  if ((() => { const hosted = vars.hosted
const session = vars.session

return hosted === 'session' && session == '' })()) {
    await extractSessionPOST(page, vars);
  }
  if ((() => { const hosted = vars.hosted
const session = vars.session

return hosted === 'session' && session == '' })()) {
    vars.session = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.sessionPostLogs

return logs[0].content[0].response.body.session.id
 }, vars);
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
    await blockUI(page, vars);
  }
  await page.waitForLoadState('load');
  if ((() => { const challenge = vars.challenge
const hosted = vars.hosted
const threeDS = vars['3ds']

return hosted === 'session' && challenge === 'yes' && threeDS !== 'inactive' })()) {
    await expect(page.locator(`center > h1`).first()).toHaveText(`ACS Emulator for 3DS V2`);
  }
  if ((() => { const challenge = vars.challenge
const hosted = vars.hosted
const threeDS = vars['3ds']

return hosted === 'session' && challenge === 'yes' && threeDS !== 'inactive' })()) {
    await page.keyboard.press('Tab');
  }
  if ((() => { const challenge = vars.challenge
const hosted = vars.hosted
const threeDS = vars['3ds']

return hosted === 'session' && challenge === 'yes' && threeDS !== 'inactive' })()) {
    await page.keyboard.press('Tab');
  }
  if ((() => { const challenge = vars.challenge
const hosted = vars.hosted
const threeDS = vars['3ds']

return hosted === 'session' && challenge === 'yes' && threeDS !== 'inactive' })()) {
    await page.keyboard.press('Enter');
  }
  if ((() => { let hosted = vars.hosted

return hosted === 'checkoutR' })()) {
    await payMasterCard(page, vars);
  }
  await page.waitForLoadState('load');
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`Order received`);
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    await expect(page.locator(`.method > strong`).first()).toContainText(`WooCommerce Gateway Acme Plugin`);
  }
  if ((() => { let producType = vars.prodType
const transaction = vars.transaction
const upgrade = vars.upgrade

return  transaction !== 'declined'
        &&
        producType === 'physical'
        &&
        upgrade !== 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`WooCommerce Gateway Acme Plugin`);
  }
  if ((() => { let producType = vars.prodType
const transaction = vars.transaction
const upgrade = vars.upgrade

return  transaction !== 'declined'
        &&
        producType === 'physical'
        &&
        upgrade !== 'yes' })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let producType = vars.prodType
const transaction = vars.transaction
const upgrade = vars.upgrade

return  transaction !== 'declined'
        &&
        (
            producType === 'virtual' 
            || 
            producType === 'download'
            ||
            upgrade === 'yes'
        ) })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`WooCommerce Gateway Acme Plugin`);
  }
  if ((() => { let producType = vars.prodType
const transaction = vars.transaction
const upgrade = vars.upgrade

return  transaction !== 'declined'
        &&
        (
            producType === 'virtual' 
            || 
            producType === 'download'
            ||
            upgrade === 'yes'
        ) })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { const subscription = vars.subscription
const upgrade = vars.upgrade
const manualRenew = vars.manualRenew

return subscription === 'yes' && upgrade !== 'yes' && manualRenew !== 'yes' })()) {
    vars.subscriptionID = ((await page.locator(`td.subscription-id > a`).textContent()) ?? '').trim();
  }
  if ((() => { const subscription = vars.subscription
const upgrade = vars.upgrade
const manualRenew = vars.manualRenew

return subscription === 'yes' && upgrade !== 'yes' && manualRenew !== 'yes' })()) {
    vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.subscriptionID}`;
const number = str.match(/\d+/)[0];
return number }, vars);
  }
  if ((() => { const upgrade = vars.upgrade
const manualRenew = vars.manualRenew

return upgrade == 'yes' || manualRenew === 'yes' })()) {
    await expect(page.locator(`td.subscription-id > a`).first()).toContainText(`${vars.subscriptionID ?? ''}`);
  }
  if ((() => { const user = vars.user
const subscription = vars.subscription


return user ==='new' || user === 'old' || subscription === 'yes' })()) {
    await checkMyAccount(page, vars);
  }
  if ((() => { const user = vars.user
const transaction = vars.transaction

return  transaction === 'declined'
        && user ==='guest' })()) {
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Do not honour`);
  }
}

// GI: "Place Order button enabled" (676ec1e4186faa7fdcbbc512)
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

// GI: "Playgrounds Email" (67adf606e66fdcb2f9ab0208)
export async function playgroundsEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.emails = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(async (resolve, reject) => {
  const to = encodeURIComponent(`${vars.playgroundsEmail}`);
  const order = `${vars.orderNumber}`
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/get-mail/?to=`+to+"&contains="+order;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, { method: 'GET', headers })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)))
      .then(data => {
        const mail = data.mails && data.mails[0];
        if (!mail) return reject(new Error('no mail found'));
        const f = document.createElement('iframe');
        f.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;border:0;background:#fff;z-index:2147483647';
        f.srcdoc = mail.message;            // render email HTML
        document.body.appendChild(f);
        resolve(mail.subject);              // GI assertion can use this
      })
      .catch(reject);
}) }, vars);
}

// GI: "Refund order" (678a5cf8e9793a100010a4d6)
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
  await extractDate(page, vars);
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
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
return refund === 'full' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toHaveText(`Refund of ${vars.total ?? ''} processed. Reason: ${vars.id ?? ''}`);
  }
  if ((() => { const refund = vars.refund
return refund === 'full' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toHaveText(`Order status changed from Processing to Refunded.`);
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
  if ((() => { const refund = vars.refund
return refund === 'partial' })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toHaveText(`Refund of $${vars.partialRefund ?? ''} processed. Reason: ${vars.id ?? ''}`);
  }
}

// GI: "Register" (6787d654e9793a10009b3c3f)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`My account`);
}

// GI: "Renewal Order" (690e43658f28ed23936249af)
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

// GI: "Subscription Upgrade, Manual renew, Cancel, Change payment MEthod" (6915d94c3426ec073142dc90)
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

// GI: "Total from currency to number" (67af4eabe66fdcb2f9231315)
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

// GI: "Use AMEX Challenge" (67a268596b884a2255fdd375)
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

// GI: "Use AMEX Frictionless" (67a2696d883e2a95087fe266)
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

// GI: "Use MASTER Challenge" (67914cf9ee4d857413db9b45)
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

// GI: "Use MASTER Frictionless - ACS No" (6776a0b404ed5cc20e468283)
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

// GI: "Use MASTER Frictionless - ACS Yes" (676ed32e35aed64d30791eae)
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

// GI: "Use MASTER Frictionless - Auth Rejected" (67914e5dee4d857413dc1066)
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

// GI: "Use VISA Challenge" (67914d352a21c5b64b34e681)
export async function useVISAChallenge(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4440000009900010`;
  vars.CCName = `Visa`;
  vars.month = `01`;
  vars.year = `39`;
  vars.cvv = `100`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `yes`;
}

// GI: "Use VISA Frictionless" (67914da32a21c5b64b352ef1)
export async function useVISAFrictionless(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4440000042200014`;
  vars.CCName = `Visa`;
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.month = `01`;
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.month = `08`;
  }
  if ((() => { const transaction = vars.transaction

return transaction !== 'declined' })()) {
    vars.year = `39`;
  }
  if ((() => { const transaction = vars.transaction

return transaction === 'declined' })()) {
    vars.year = `28`;
  }
  vars.cvv = `100`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.challenge = `no`;
}

// GI: "Use VISA Frictionless - Attempted" (67914dca2a21c5b64b35480c)
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

// GI: "Verify Agreement" (68f29c08bb0792d9338811d8)
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

// GI: "Verify Agreement Authentication" (68f29e51c75f80212a8c8de7)
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

// GI: "Verify Agreement Authorize/Capture" (68f2ad94bb0792d9338a0a4e)
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

// GI: "Verify Authenticate Payer log" (67a2ba756b884a22550bfd7a)
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

// GI: "Verify Authentication log" (677fdd1b35aed64d3044c6df)
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

// GI: "Verify Authorize/Capture log" (67782ed704ed5cc20e6c4106)
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

return log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-2`
        ||
        log.request.url === `https://test-gateway.mastercard.com/api/rest/version/100/merchant/TESTSAUCAL1/order/${vars.transaction_id}/transaction/${vars.transaction_id}-3` }, vars)).toBeTruthy();
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

return  log.response.body.transaction.id === `${vars.transaction_id}-2`
        ||
        log.response.body.transaction.id === `${vars.transaction_id}-3` }, vars)).toBeTruthy();
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

// GI: "verify Email - Admin and Customer" (67adf606e66fdcb2f9ab024e)
export async function verifyEmailAdminAndCustomer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.playgroundsEmail = `${vars.email ?? ''}`;
  await playgroundsEmail(page, vars);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const f = document.querySelector<HTMLIFrameElement>('iframe[srcdoc]');                 // or [...document.querySelectorAll<HTMLIFrameElement>('iframe')] if several
const doc = f.contentDocument || f.contentWindow.document;


let len = Array.from<any>(doc.querySelectorAll("#body_content_inner > div:nth-of-type(1) > table > tfoot > tr > td.td"))
len = len.length -1
return len }, vars);
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tr.order-totals.order-totals-payment_method > td`).or(page.locator(`#body_content_inner > div:nth-of-type(1) > table > tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`)).or(page.locator(`tr.order-totals.order-totals-payment_method > td`)).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`#body_content_inner > div:nth-of-type(1) > table > tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  vars.playgroundsEmail = `christian+admin@saucal.com`;
  await playgroundsEmail(page, vars);
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tr.order-totals.order-totals-payment_method > td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "verify Email - Only Admin" (67adf606e66fdcb2f9ab024f)
export async function verifyEmailOnlyAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.playgroundsEmail = `christian+admin@saucal.com`;
  await playgroundsEmail(page, vars);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
len = len.length -1
return len }, vars);
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals.order-totals-payment_method > td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "verify Email - only Customer" (67adf606e66fdcb2f9ab0250)
export async function verifyEmailOnlyCustomer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.playgroundsEmail = `${vars.email ?? ''}`;
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
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tr.order-totals.order-totals-payment_method > td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "Verify Initiate Authentication log" (67896384e9793a1000e97555)
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

// GI: "Verify Refund log" (67782f2d35aed64d3039253c)
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

// GI: "Verify Saved token log" (67782edb35aed64d30391a61)
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

// GI: "Verify Session" (677beece04ed5cc20e98de60)
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

// GI: "Verify Transaction on logs" (6776d49535aed64d3018e90e)
export async function verifyTransactionOnLogs(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const refund = vars.refund

return refund !== 'exceed' })()) {
    await extractLogsByPayDate(page, vars);
  }
  if ((() => { const refund = vars.refund

return refund === 'exceed' })()) {
    await extractTransactionPUT(page, vars);
  }
  if ((() => { const transactionType = vars.transactionType
const renewal = vars.renewal

return  transactionType !== 'refund' 
        && 
        transactionType !== 'void'
        &&
        transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        renewal !== 'yes' })()) {
    await extractSessionPOST(page, vars);
  }
  if ((() => { const transactionType = vars.transactionType
const renewal = vars.renewal

return  transactionType !== 'refund' 
        && 
        transactionType !== 'void'
        &&
        transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        renewal !== 'yes' })()) {
    await extractSessionGET(page, vars);
  }
  if ((() => { //const savingCC = vars.savingCC
//const subscription = vars.subscription
//const tokenizedCards = vars.tokenizedCards
//const savedCC = vars.savedCC

//return savingCC === 'yes' ||  tokenizedCards === 'inactive' 
//    || (subscription === 'yes' && savedCC !== 'yes')

return true })()) {
    await extractTokenPOST(page, vars);
  }
  if ((() => { const tokenizedCards = vars.tokenizedCards
const savedCC = vars.savedCC
const renewal = vars.renewal
const upgrade = vars.upgrade

return (tokenizedCards === 'inactive' || savedCC == 'yes'
       || renewal === 'yes') && upgrade !== 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.tokenLogs

return logs[0].content.length === 0 }, vars)).toBeTruthy();
  }
  if ((() => { const transactionType = vars.transactionType
const renewal = vars.renewal

return  transactionType !== 'refund' 
        && 
        transactionType !== 'void'
        &&
        transactionType !== 'partialCapture'
        &&
        transactionType !== 'totalCapture'
        &&
        renewal !== 'yes' })()) {
    await verifySession(page, vars);
  }
  if ((() => { const transactionType = vars.transactionType
const threeDS = vars['3ds']
const hosted = vars.hosted
const renewal = vars.renewal

return (transactionType === 'authorize' || transactionType === 'capture')
        && threeDS === 'active' && hosted === 'session'
        && renewal !== 'yes' })()) {
    await verifyInitiateAuthenticationLog(page, vars);
  }
  if ((() => { const transactionType = vars.transactionType
const threeDS = vars['3ds']
const hosted = vars.hosted
const challenge = vars.challenge
const renewal = vars.renewal

return (transactionType === 'authorize' || transactionType === 'capture')
        && threeDS === 'active' && hosted === 'session' && challenge === 'yes'
        && renewal !== 'yes' })()) {
    await verifyAuthenticatePayerLog(page, vars);
  }
  if ((() => { const transactionType = vars.transactionType
const threeDS = vars['3ds']
const hosted = vars.hosted
const renewal = vars.renewal

return (transactionType === 'authorize' || transactionType === 'capture')
        && threeDS === 'active' && hosted === 'session'
        && renewal !== 'yes' })()) {
    await verifyAuthenticationLog(page, vars);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'authorize' 
    || transactionType === 'capture' })()) {
    await verifyAuthorizeCaptureLog(page, vars);
  }
  if ((() => { const savingCC = vars.savingCC
const transactionType = vars.transactionType
const tokenizedCards = vars.tokenizedCards
const subscription = vars.subscription
const savedCC = vars.savedCC
const renewal = vars.renewal

return (savingCC === 'yes' &&  tokenizedCards !== 'inactive') 
        || (subscription === 'yes' && savedCC !== 'yes' && renewal !== 'yes') })()) {
    await verifySavedTokenLog(page, vars);
  }
  if ((() => { const transactionType = vars.transactionType

return transactionType === 'refund' })()) {
    await verifyRefundLog(page, vars);
  }
}

// GI: "Verify Void log" (67aa196f883e2a9508e564d2)
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
