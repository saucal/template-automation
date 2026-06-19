// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "2.5.x"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { addPreOrderProductUpfrontToCart, addSimpleProductToCart, checkCartIsEmpty, checkTranscationIsPresentOnOrderBackend, completePreOrderWithAdmin, extractDate, extractFourDigitsOfCC, fillACHInfo, fillCheckoutDataCreateAccount, fillCheckoutDataNotCreatingAccount, getAltTransactionDetailsFromBluesnap, getGroupLogRequestResponseTransactions, getLogRequestResponseAltTransactions, getLogRequestResponseIPN, getLogRequestResponseVaultedShopper, getTransactionDetailsFromBluesnap, getWooOrderDetails, getWooOrderFailed, goToOrderWithAdmin, loginAdmin, paymentMethodMenuACHCCAvailable, placeOrder, placeOrderGuestUserErrorMessage, placePreOrder, preOrderMenu, preOrderUpfrontProductsCheckBackend, saveCC, use3DSCC, verifyLogsTRGuestShopperACH, verifyVaultedShopper } from './bluesnap-common-steps-for-suites';

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

// GI: "05 - About us page" (68cab9df7f80fc466de4475e)
export async function _05AboutUsPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="/about-us"] > .e-n-menu-title-text`).filter({ visible: true }).first().click({ force: true });
}

// GI: "BLU-001-050" (620ab6a1d9e39f83d079f7a3)
export async function bLU001050(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.3dsSetting = `activated`;
  vars.auth = ``;
  vars.pay = ``;
  vars.payment = `cc`;
  vars.test = `3ds`;
  vars.3ds = `1.0a`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-050 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-050}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  // TODO: unresolved GI test ID 60af9da0373d3a09feedc5a4 — inline steps manually
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  // TODO: unresolved GI test ID 60afe414c894e66ce1685dc7 — inline steps manually
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
}

// GI: "BLU-001-050 - Admin side" (620ab6a1d9e39f83d079f7a4)
export async function bLU001050AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-051" (620ab6a1d9e39f83d079f7a1)
export async function bLU001051(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.3ds = `1.0d`;
  await use3DSCC(page, vars);
  vars.error_message = `Secure authentication has failed. Please try again.`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  // TODO: unresolved GI test ID 60af9da0373d3a09feedc5a4 — inline steps manually
  await expect(page.locator(`#wc-bluesnap-new-payment-method`).first()).not.toBeVisible();
  await placeOrderGuestUserErrorMessage(page, vars);
  await getWooOrderFailed(page, vars);
}

// GI: "BLU-002-037" (62264bd1ee28e97e1ad1ad7a)
export async function bLU002037(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-037 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-037}}`;
  vars.pay = `upfront`;
  vars.test = `preorder`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.preOrderStatus = `Active`;
  await addPreOrderProductUpfrontToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillACHInfo(page, vars);
  await placePreOrder(page, vars);
  await getLogRequestResponseAltTransactions(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await checkCartIsEmpty(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.transaction_id037 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber037 = `${vars.orderNumber ?? ''}`;
  vars.vaultedShopperId037 = `${vars.vaultedShopperId ?? ''}`;
  vars.total037 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-037 - Step 2 - Admin Complete preorder" (62264f7bee28e97e1ad3c04a)
export async function bLU002037Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await preOrderUpfrontProductsCheckBackend(page, vars);
}

// GI: "BLU-002-038" (62264cb30271df9af556bc61)
export async function bLU002038(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-038 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-038}}`;
  vars.pay = `upfront`;
  vars.test = `preorder`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.preOrderStatus = `Active`;
  await addPreOrderProductUpfrontToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillACHInfo(page, vars);
  await placePreOrder(page, vars);
  await getLogRequestResponseAltTransactions(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await checkCartIsEmpty(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.transaction_id038 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber038 = `${vars.orderNumber ?? ''}`;
  vars.vaultedShopperId038 = `${vars.vaultedShopperId ?? ''}`;
  vars.total038 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-041" (6226503cee28e97e1ad4304e)
export async function bLU002041(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-041 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-041}}`;
  vars.pay = `upfront`;
  vars.test = `preorder`;
  vars.user = `new`;
  vars.trans = `declined`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberD ?? ''}`;
  vars.routingNumber = `${vars.routingNumberD ?? ''}`;
  vars.status = `On hold`;
  vars.preOrderStatus = `Active`;
  await addPreOrderProductUpfrontToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillACHInfo(page, vars);
  await placePreOrder(page, vars);
  await getLogRequestResponseAltTransactions(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await checkCartIsEmpty(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.transaction_id041 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber041 = `${vars.orderNumber ?? ''}`;
  vars.vaultedShopperId041 = `${vars.vaultedShopperId ?? ''}`;
  vars.total041 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-041 - Step 2 - Admin Complete preorder" (6226503c0271df9af558b724)
export async function bLU002041Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await preOrderUpfrontProductsCheckBackend(page, vars);
}

// GI: "BLU-002-042" (6226503cee28e97e1ad43095)
export async function bLU002042(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-042 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-042}}`;
  vars.pay = `upfront`;
  vars.test = `preorder`;
  vars.user = `new`;
  vars.trans = `declined`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberD ?? ''}`;
  vars.routingNumber = `${vars.routingNumberD ?? ''}`;
  vars.status = `On hold`;
  vars.preOrderStatus = `Active`;
  await addPreOrderProductUpfrontToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillACHInfo(page, vars);
  await placePreOrder(page, vars);
  await getLogRequestResponseAltTransactions(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await checkCartIsEmpty(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.transaction_id042 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber042 = `${vars.orderNumber ?? ''}`;
  vars.vaultedShopperId042 = `${vars.vaultedShopperId ?? ''}`;
  vars.total042 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-056" (622ba3936f3ed7a04db213c2)
export async function bLU002056(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber037 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id037 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  if ((() => { let logs = vars.logs
return logs.length != undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length != undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let length = document.getElementsByClassName("note_content").length
return length }, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toHaveText(`Order status changed from Pre ordered to Processing.`);
  if ((() => { let n = vars.n
return n === 7 })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`ACH Transaction approved via IPN request.`);
  }
  if ((() => { let n = vars.n
return n === 5 })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`ACH Transaction approved via IPN request.`);
  }
}

// GI: "BLU-002-057" (622ba396aacde4b9871daccd)
export async function bLU002057(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber038 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id038 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  if ((() => { let logs = vars.logs
return logs.length != undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length != undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`ACH Transaction approved via IPN request.`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toHaveText(`Order status changed from Pre ordered to Processing.`);
}

// GI: "BLU-002-059" (622ba4846f3ed7a04db2ad75)
export async function bLU002059(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber041 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id041 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await page.waitForTimeout(270000);
  await getLogRequestResponseIPN(page, vars);
  if ((() => { let logs = vars.logs
return logs.length != undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.transactionType === "DECLINE" }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length != undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.transactionType === "DECLINE" }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let status = document.getElementById("select2-order_status-container")
status = status.getInnerHTML()
return status === "Failed" || status === "Pre ordered" }, vars)).toBeTruthy();
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let status = document.getElementById("select2-order_status-container")
status = status.getInnerHTML()
return status === "Failed" }, vars)) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`BlueSnap ACH Declined IPN request received. A chargeback has been created for this transaction. Reason: null-null. Order status changed from Pre ordered to Failed.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let status = document.getElementById("select2-order_status-container")
status = status.getInnerHTML()
return status === "Pre ordered" }, vars)) {
    await expect(page.locator(`li.note.system-note:nth-of-type(4) > .note_content > p`).first()).toContainText(`BlueSnap ACH Declined IPN request received. A chargeback has been created for this transaction. Reason: null-null. Order status changed from Pre ordered to Failed.`);
  }
}

// GI: "BLU-002-060" (622ba487aacde4b9871e3a66)
export async function bLU002060(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber042 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id042 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.transactionType === "DECLINE" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Failed`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`BlueSnap ACH Declined IPN request received. A chargeback has been created for this transaction. Reason: null-null. Order status changed from On hold to Failed.`);
}
