// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "2.6.x"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { activatePreOrder, addPreOrderProductUpfrontToCart, addPreOrderProductUponReleaseToCart, addSimpleProductToCart, checkCartIsEmpty, checkTranscationIsPresentOnOrderBackend, completePreOrderWithAdmin, deactivatePayPal, extractDate, extractFourDigitsOfCC, fillACHInfo, fillCCInfo26X, fillCheckoutDataCreateAccount, fillCheckoutDataNotCreatingAccount, getAllLogsRequestResponseRecurringOndemandSubsID, getAltTransactionDetailsFromBluesnap, getBlueSnapVersion, getGroupLogRequestResponseTransactions, getLogRequestResponseAltTransactions, getLogRequestResponseIPN, getLogRequestResponseRecurringOndemand, getLogRequestResponseRecurringOndemandSubsID, getLogRequestResponseVaultedShopper, getPreOrderVersion, getSiteTitle, getTransactionDetailsFromBluesnap, getWooOrderDetails, getWooOrderFailed, goToOrderWithAdmin, loginAdmin, paymentMethodMenuACHCCAvailable, placeOrder, placeOrderGuestUserErrorMessage, placePreOrder, preOrderMenu, preOrderUpfrontProductsCheckBackend, runSpecificForRenewOrders, saveCC, use3DSCC, verifyEmailAdminAndCustomer, verifyEmailOnlyAdmin, verifyEmailOnlyCustomer, verifyLogsTRAUTHCAPTURERenewal, verifyLogsTRGuestShopperACH, verifyLogsTRNewShopperAUTHCAPTUREACHSubscription, verifyVaultedShopper } from './bluesnap-common-steps-for-suites';

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

// GI: "BLU-001-050" (6239bacd6f3ed7a04de1d99e)
export async function bLU001050(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.3dsSetting = `activated`;
  vars.auth = ``;
  vars.test = `3ds`;
  vars.payment = `cc`;
  vars.pay = ``;
  vars.status = `Processing`;
  vars.3ds = `1.0a`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-050 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-050}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  // TODO: unresolved GI test ID 6239ec326f3ed7a04d06da1a — inline steps manually
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
}

// GI: "BLU-001-050 - Admin side" (6239bacd6f3ed7a04de1d99f)
export async function bLU001050AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-051" (6239bacd6f3ed7a04de1d9a0)
export async function bLU001051(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.3ds = `1.0d`;
  await use3DSCC(page, vars);
  vars.error_message = `Secure authentication has failed. Please try again.`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`).first()).not.toBeVisible();
  await placeOrderGuestUserErrorMessage(page, vars);
  await getWooOrderFailed(page, vars);
}

// GI: "BLU-002-035" (6633cc7b1aac3ea14f22447a)
export async function bLU002035(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getSiteTitle(page, vars);
  await getBlueSnapVersion(page, vars);
  await deactivatePayPal(page, vars);
  await activatePreOrder(page, vars);
  await getPreOrderVersion(page, vars);
  vars.email_BLU-002-035 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-035}}`;
  vars.pay = `now`;
  vars.test = `preorder`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) <= 7 && Number(PreOrderVs[2]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) >= 2 })()) {
    vars.status = `Pre-ordered`;
  }
  vars.preOrderStatus = `Active`;
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillACHInfo(page, vars);
  await placePreOrder(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getWooOrderDetails(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "pre-ordered" }, vars)).toBeTruthy();
  await checkCartIsEmpty(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTUREACHSubscription(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
  vars.subsID035 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.subscriptionId }, vars);
}

// GI: "BLU-002-035 - Step 2 - Admin Complete preorder" (6633cc7b1aac3ea14f22447b)
export async function bLU002035Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  vars.status = `On hold`;
  await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_status.column-order_status mark.order-status > span`).or(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_status.column-order_status mark.order-status > span`)).first()).toContainText(`${vars.status ?? ''}`);
  await getWooOrderDetails(page, vars);
  await getAllLogsRequestResponseRecurringOndemandSubsID(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logsAll = vars.logsAll
return logsAll.length === 2 }, vars)).toBeTruthy();
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
  vars.transaction_id035 = `${vars.transaction_id ?? ''}`;
  vars.vaultedShopperId035 = `${vars.vaultedShopperId ?? ''}`;
  vars.orderNumber035 = `${vars.orderNumber ?? ''}`;
  vars.total035 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-037" (6239ba546f3ed7a04de1976e)
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
  await verifyEmailAdminAndCustomer(page, vars);
  vars.transaction_id037 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber037 = `${vars.orderNumber ?? ''}`;
  vars.vaultedShopperId037 = `${vars.vaultedShopperId ?? ''}`;
  vars.total037 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-037 - Step 2 - Admin Complete preorder" (6239ba546f3ed7a04de1976f)
export async function bLU002037Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await preOrderUpfrontProductsCheckBackend(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-002-038" (6239ba546f3ed7a04de19770)
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
  await verifyEmailAdminAndCustomer(page, vars);
  vars.transaction_id038 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber038 = `${vars.orderNumber ?? ''}`;
  vars.vaultedShopperId038 = `${vars.vaultedShopperId ?? ''}`;
  vars.total038 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-039" (6633cc7b1aac3ea14f22447f)
export async function bLU002039(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-039 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.payForOrder = ``;
  vars.email = `{{email_BLU-002-039}}`;
  vars.pay = `now`;
  vars.test = `preorder`;
  vars.user = `new`;
  vars.trans = `declined`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberD ?? ''}`;
  vars.routingNumber = `${vars.routingNumberD ?? ''}`;
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 && Number(PreOrderVs[0]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) == 2 })()) {
    vars.status = `Pre-ordered`;
  }
  vars.preOrderStatus = `Active`;
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillACHInfo(page, vars);
  await placePreOrder(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "pre-ordered" }, vars)).toBeTruthy();
  await checkCartIsEmpty(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTUREACHSubscription(page, vars);
  vars.transaction_id039original = `${vars.transaction_id ?? ''}`;
  vars.orderNumber039 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID039 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId039 = `${vars.vaultedShopperId ?? ''}`;
  vars.total039 = `${vars.total ?? ''}`;
  vars.subsID039 = `${vars.subsID ?? ''}`;
}

// GI: "BLU-002-039 - Step 2 - Admin Complete preorder" (6633cc7b1aac3ea14f224480)
export async function bLU002039Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  vars.status = `On hold`;
  await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} mark.order-status > span`).or(page.locator(`tr#order-${vars.orderNumber ?? ''} mark.order-status > span`)).first()).toContainText(`${vars.status ?? ''}`);
  await getWooOrderDetails(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  vars.vaultedShopperId039 = `${vars.vaultedShopperId ?? ''}`;
  vars.orderNumber039 = `${vars.orderNumber ?? ''}`;
  vars.total039 = `${vars.total ?? ''}`;
  vars.transaction_id039 = `${vars.transaction_id ?? ''}`;
}

// GI: "BLU-002-041" (6239ba546f3ed7a04de19776)
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

// GI: "BLU-002-041 - Step 2 - Admin Complete preorder" (6239ba546f3ed7a04de19777)
export async function bLU002041Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await preOrderUpfrontProductsCheckBackend(page, vars);
}

// GI: "BLU-002-042" (6239ba546f3ed7a04de19778)
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

// GI: "BLU-002-055" (6633cc7b1aac3ea14f224484)
export async function bLU002055(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(180000);
  vars.payForOrder = ``;
  vars.subsID = `${vars.subsID035 ?? ''}`;
  vars.email = `{{email_BLU-002-035}}`;
  await runSpecificForRenewOrders(page, vars);
  vars.orderNumber = `${vars.orderNumber035 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id035 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  if ((() => { let logs = vars.logs
return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.transactionType === "RECURRING" }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length != undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.transactionType === "RECURRING" }, vars)).toBeTruthy();
  }
  if ((() => { let logs = vars.logs
return logs.length != undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  await verifyEmailOnlyCustomer(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`ACH Transaction approved via IPN request.`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Order status changed from On hold to Processing.`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let notes = Array.from<any>(document.querySelectorAll("li.note.system-note > .note_content > p"));
let n = 0;
let bool = true
while (n < notes.length) {
    if (notes[n].innerText.includes("to Failed")) {
        bool = false;
        break;
    }
    n++;
}
return bool }, vars)).toBeTruthy();
}

// GI: "BLU-002-056" (6239ba546f3ed7a04de1977a)
export async function bLU002056(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber037 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id037 ?? ''}`;
  vars.email = `{{email_BLU-002-037}}`;
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
  await verifyEmailOnlyCustomer(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let length = document.getElementsByClassName("note_content").length
return length }, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Order status changed from Pre ordered to Processing.`);
  if ((() => { let n = vars.n
return n === 7 })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`ACH Transaction approved via IPN request.`);
  }
  if ((() => { let n = vars.n
return n === 5 })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`ACH Transaction approved via IPN request.`);
  }
}

// GI: "BLU-002-057" (6239ba546f3ed7a04de1977b)
export async function bLU002057(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber038 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id038 ?? ''}`;
  vars.email = `{{email_BLU-002-038}}`;
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
  await verifyEmailOnlyCustomer(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`ACH Transaction approved via IPN request.`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Order status changed from Pre ordered to Processing.`);
}

// GI: "BLU-002-058" (6633cc7b1aac3ea14f224485)
export async function bLU002058(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(270000);
  vars.paymentMethodTitle = `ACH/ECP Transactions`;
  vars.test = `ipn`;
  vars.subsID = `${vars.subsID039 ?? ''}`;
  await runSpecificForRenewOrders(page, vars);
  vars.orderNumber = `${vars.orderNumber039 ?? ''}`;
  vars.transaction_idOriginal = `${vars.transaction_id039original ?? ''}`;
  vars.transaction_id = `${vars.transaction_id039 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await verifyEmailOnlyAdmin(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.waitForTimeout(120000);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs


return logs.content.transactionType === "SUBSCRIPTION_CHARGE_FAILURE" || logs[1].content.transactionType === "SUBSCRIPTION_CHARGE_FAILURE" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.referenceNumber === `${vars.transaction_idOriginal}` || logs[1].content.referenceNumber === `${vars.transaction_idOriginal}` }, vars)).toBeTruthy();
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Failed`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`BlueSnap ACH Subscription Charge failure IPN received. Reason: REJECTED: Payment ID ${vars.transaction_id ?? ''} has failed. Order status changed from On hold to Failed.`);
}

// GI: "BLU-002-059" (6239ba546f3ed7a04de1977d)
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
  await verifyEmailOnlyAdmin(page, vars);
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

// GI: "BLU-002-060" (6239ba546f3ed7a04de1977e)
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
  await verifyEmailOnlyAdmin(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Failed`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`BlueSnap ACH Declined IPN request received. A chargeback has been created for this transaction. Reason: null-null. Order status changed from On hold to Failed.`);
}
