// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - CC - Authorize Only & 3DS"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { addPreOrderProductUpfrontToCart, addPreOrderProductUponReleaseToCart, addSimpleProductToCart, addSimpleProductToCartDownloadable, addSimpleProductToCartVirtual, addVariableSubscriptionProductToCart, cancelAuhorizeOnlyOrder, captureAuhorizeOnlyOrder, checkACHCCSavedOnCheckout, checkCartIsEmpty, checkTranscationIsPresentOnOrderBackend, completePreOrderWithAdmin, createOrderForUserByAPI, customerPayPendingOrder, extractDate, extractFourDigitsOfCC, extractPftoken, fillCCInfo26X, fillCheckoutDataCreateAccount, fillCheckoutDataNotCreatingAccount, fillCheckoutDataSubscription, getBlueSnapVersion, getGroupLogRequestResponse, getGroupLogRequestResponseTransactions, getLogRequestResponsePaymentFieldsTokens, getLogRequestResponseRecurringOndemand, getLogRequestResponseRecurringOndemandSubsID, getLogRequestResponseVaultedShopper, getPreOrderVersion, getSiteTitle, getTransactionDetailsFromBluesnap, getUsers, getWooOrderDetails, getWooOrderFailed, getWooSubscriptionDetails, goToOrderWithAdmin, logIn, loginAdmin, payOrderPendingPayment, paymentMethodMenuACHCCAvailable, placeOrder, placeOrderGuestUserErrorMessage, placePreOrder, preOrderMenu, register, renewByAdmin, saveCC, settingsActivateOnly3DS, settingsActivateOnlyCapture, settingsDeactivateOnly3DS, settingsDeactivateOnlyCapture, settingsExcludeTax, subscriptionMenu, use3DSCC, useAMEX, useMASTER, verifyLogsTRAUTHCAPTURERenewal, verifyLogsTRAUTHREVERSALCAPTURE, verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X, verifyLogsTransactions26X, verifyNoVaultedShopperRequest, verifyVaultedShopper } from './bluesnap-common-steps-for-suites';

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

// GI: "BLU-001-043" (69049f1434ec47aacc5be3c6)
export async function bLU001043(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getSiteTitle(page, vars);
  await getBlueSnapVersion(page, vars);
  await settingsExcludeTax(page, vars);
  await settingsDeactivateOnlyCapture(page, vars);
  vars.payment = `cc`;
  vars.status = `On hold`;
  vars.auth = `only`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-043 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-043}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.orderNumber043 = `${vars.orderNumber ?? ''}`;
  vars.total043 = `${vars.total ?? ''}`;
  vars.lastName043 = `${vars.lastName ?? ''}`;
  vars.vaultedShopperId043 = `${vars.vaultedShopperId ?? ''}`;
  vars.transaction_id043 = `${vars.transaction_id ?? ''}`;
}

// GI: "BLU-001-043" (6633cc811aac3ea14f224af4)
export async function bLU001043(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001043(page, vars);
}

// GI: "BLU-001-043" (6904a46b1a085ce44e20cacc)
export async function bLU001043(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001043(page, vars);
}

// GI: "BLU-001-043 - Admin side" (69049f1434ec47aacc5be3c7)
export async function bLU001043AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "bluesnap" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "Credit/Debit Card" }, vars)).toBeTruthy();
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  await expect(page.locator(`li.note.system-note > .note_content > p`).first()).toContainText(`Bluesnap charge authorized (Charge ID: ${vars.transaction_id ?? ''}). Process order to take payment, or cancel to remove the pre-authorization. Order status changed from Pending payment to On hold.`);
}

// GI: "BLU-001-043 - Admin side" (6633cc811aac3ea14f224af5)
export async function bLU001043AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001043AdminSide(page, vars);
}

// GI: "BLU-001-043 - Admin side" (6904a46b1a085ce44e20cacd)
export async function bLU001043AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001043AdminSide(page, vars);
}

// GI: "BLU-001-044" (69049f1434ec47aacc5be3c8)
export async function bLU001044(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_044 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_044}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await subscriptionMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-044" (6633cc811aac3ea14f224af6)
export async function bLU001044(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001044(page, vars);
}

// GI: "BLU-001-044" (6904a46b1a085ce44e20cace)
export async function bLU001044(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001044(page, vars);
}

// GI: "BLU-001-044 - Renew" (69049f1434ec47aacc5be3c9)
export async function bLU001044Renew(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "bluesnap" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "Credit/Debit Card" }, vars)).toBeTruthy();
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Bluesnap transaction complete (Transaction ID: ${vars.transaction_id ?? ''})`);
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-044 - Renew" (6633cc811aac3ea14f224af7)
export async function bLU001044Renew(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001044Renew(page, vars);
}

// GI: "BLU-001-044 - Renew" (6904a46b1a085ce44e20cacf)
export async function bLU001044Renew(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001044Renew(page, vars);
}

// GI: "BLU-001-045" (69049f1434ec47aacc5be3ca)
export async function bLU001045(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getPreOrderVersion(page, vars);
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 && Number(PreOrderVs[0]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) >= 2 })()) {
    vars.status = `Pre-ordered`;
  }
  vars.test = `preorder`;
  vars.user = `new`;
  vars.pay = `now`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_045 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_045}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`))).toHaveCount(0);
  await placePreOrder(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await checkCartIsEmpty(page, vars);
  vars.orderNumber028 = `${vars.orderNumber ?? ''}`;
  vars.subsID028 = `${vars.subsID ?? ''}`;
  vars.total028 = `${vars.total ?? ''}`;
  vars.lastName028 = `${vars.lastName ?? ''}`;
  vars.vaultedShopperId028 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-045" (6633cc811aac3ea14f224af8)
export async function bLU001045(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001045(page, vars);
}

// GI: "BLU-001-045" (6904a46b1a085ce44e20cad0)
export async function bLU001045(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001045(page, vars);
}

// GI: "BLU-001-046 - Step 1 - Pay Later order" (69049f1434ec47aacc5be3cb)
export async function bLU001046Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 && Number(PreOrderVs[0]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) >= 2 })()) {
    vars.status = `Pre-ordered`;
  }
  vars.test = `preorder`;
  vars.auth = `only`;
  vars.pay = `later`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001-046 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001-046}}`;
  vars.username = `{{email-BLU-001-046}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_pre_orders_pay_later"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-pre_orders_pay_later"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_pre_orders_pay_later`).or(page.locator(`#radio-control-wc-payment-method-options-pre_orders_pay_later`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placePreOrder(page, vars);
  await preOrderMenu(page, vars);
  await getWooOrderDetails(page, vars);
}

// GI: "BLU-001-046 - Step 1 - Pay Later order" (6633cc811aac3ea14f224af9)
export async function bLU001046Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001046Step1PayLaterOrder(page, vars);
}

// GI: "BLU-001-046 - Step 1 - Pay Later order" (6904a46b1a085ce44e20cad1)
export async function bLU001046Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001046Step1PayLaterOrder(page, vars);
}

// GI: "BLU-001-046 - Step 2 - Admin Complete preorder" (69049f1434ec47aacc5be3cc)
export async function bLU001046Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  vars.status = `Pending payment`;
  await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`)).first()).toContainText(`${vars.status ?? ''}`);
}

// GI: "BLU-001-046 - Step 2 - Admin Complete preorder" (6633cc811aac3ea14f224afa)
export async function bLU001046Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001046Step2AdminCompletePreorder(page, vars);
}

// GI: "BLU-001-046 - Step 2 - Admin Complete preorder" (6904a46b1a085ce44e20cad2)
export async function bLU001046Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001046Step2AdminCompletePreorder(page, vars);
}

// GI: "BLU-001-046 - Step 3 - Pay Preorder" (69049f1434ec47aacc5be3cd)
export async function bLU001046Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `On hold`;
  vars.user = `new`;
  vars.saveCC = `no`;
  vars.useSavedCC = `no`;
  vars.payForOrder = `yes`;
  await logIn(page, vars);
  await payOrderPendingPayment(page, vars);
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await extractPftoken(page, vars);
  await fillCCInfo26X(page, vars);
  await customerPayPendingOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.total046 = `${vars.total ?? ''}`;
  vars.lastName046 = `${vars.lastName ?? ''}`;
  vars.orderNumber046 = `${vars.orderNumber ?? ''}`;
  vars.transaction_id046 = `${vars.transaction_id ?? ''}`;
  vars.vaultedShopperId046 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-046 - Step 3 - Pay Preorder" (6633cc811aac3ea14f224afb)
export async function bLU001046Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001046Step3PayPreorder(page, vars);
}

// GI: "BLU-001-046 - Step 3 - Pay Preorder" (6904a46b1a085ce44e20cad3)
export async function bLU001046Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001046Step3PayPreorder(page, vars);
}

// GI: "BLU-001-047" (69049f1434ec47aacc5be3ce)
export async function bLU001047(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `On hold`;
  vars.test = `preorder`;
  vars.auth = `only`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.payForOrder = `no`;
  vars.useSavedCC = `no`;
  vars.pay = `upfront`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_030 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_030}}`;
  vars.username = `{{email-BLU-001_030}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUpfrontToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placePreOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await verifyLogsTransactions26X(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
}

// GI: "BLU-001-047" (6633cc811aac3ea14f224afc)
export async function bLU001047(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001047(page, vars);
}

// GI: "BLU-001-047" (6904a46b1a085ce44e20cad4)
export async function bLU001047(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001047(page, vars);
}

// GI: "BLU-001-048" (69049f1434ec47aacc5be3cf)
export async function bLU001048(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.auth = `capture`;
  vars.email = `{{email_BLU-001-043}}`;
  vars.orderNumber = `${vars.orderNumber043 ?? ''}`;
  vars.total = `${vars.total043 ?? ''}`;
  vars.lastName = `${vars.lastName043 ?? ''}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId043 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id043 ?? ''}`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await captureAuhorizeOnlyOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Bluesnap charge complete (Charge ID: ${vars.transaction_id ?? ''})`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await verifyLogsTRAUTHREVERSALCAPTURE(page, vars);
}

// GI: "BLU-001-048" (6633cc811aac3ea14f224afd)
export async function bLU001048(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001048(page, vars);
}

// GI: "BLU-001-048" (6904a46b1a085ce44e20cad5)
export async function bLU001048(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001048(page, vars);
}

// GI: "BLU-001-049" (69049f1434ec47aacc5be3d0)
export async function bLU001049(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.auth = `cancel`;
  vars.email = `{{email-BLU-001-046}}`;
  vars.orderNumber = `${vars.orderNumber046 ?? ''}`;
  vars.lastName = `${vars.lastName046 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id046 ?? ''}`;
  vars.total = `${vars.total046 ?? ''}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId046 ?? ''}`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await cancelAuhorizeOnlyOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Cancelled`);
  await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Pre-Authorization Released`);
  await verifyLogsTRAUTHREVERSALCAPTURE(page, vars);
  await settingsActivateOnlyCapture(page, vars);
}

// GI: "BLU-001-049" (6633cc811aac3ea14f224afe)
export async function bLU001049(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001049(page, vars);
}

// GI: "BLU-001-049" (6904a46b1a085ce44e20cad6)
export async function bLU001049(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001049(page, vars);
}

// GI: "BLU-001-052" (69049f1434ec47aacc5be3d1)
export async function bLU001052(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsActivateOnlyCapture(page, vars);
  vars.pay = ``;
  vars.payment = `cc`;
  vars.test = `3ds`;
  vars.auth = ``;
  vars.3dsSetting = `activated`;
  vars.status = `Processing`;
  vars.3ds = `2.0a`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.lastName = `${vars.alphanumeric ?? ''}`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-052 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-052}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
}

// GI: "BLU-001-052" (6633cc811aac3ea14f224aff)
export async function bLU001052(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001052(page, vars);
}

// GI: "BLU-001-052" (6904a46b1a085ce44e20cad7)
export async function bLU001052(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001052(page, vars);
}

// GI: "BLU-001-052 - Admin side" (69049f1434ec47aacc5be3d2)
export async function bLU001052AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-052 - Admin side" (6633cc811aac3ea14f224b00)
export async function bLU001052AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001052AdminSide(page, vars);
}

// GI: "BLU-001-052 - Admin side" (6904a46b1a085ce44e20cad8)
export async function bLU001052AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001052AdminSide(page, vars);
}

// GI: "BLU-001-053" (69049f1434ec47aacc5be3d3)
export async function bLU001053(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.3ds = `2.0d`;
  await use3DSCC(page, vars);
  vars.error_message = `Secure authentication has failed. Please try again.`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await fillCCInfo26X(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2 && !element === false }, vars)) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`).first()).not.toBeVisible();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 4 && !element === false }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content .wc-block-components-payment-methods__save-card-info`)).toHaveCount(0);
  }
  await placeOrderGuestUserErrorMessage(page, vars);
  await getWooOrderFailed(page, vars);
}

// GI: "BLU-001-053" (6633cc811aac3ea14f224b01)
export async function bLU001053(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001053(page, vars);
}

// GI: "BLU-001-053" (6904a46b1a085ce44e20cad9)
export async function bLU001053(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001053(page, vars);
}

// GI: "BLU-001-054" (69049f1434ec47aacc5be3d4)
export async function bLU001054(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.3ds = `2.0aW`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-054 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-054}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.vaultedShopperId054 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-054" (6633cc811aac3ea14f224b02)
export async function bLU001054(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001054(page, vars);
}

// GI: "BLU-001-054" (6904a46b1a085ce44e20cada)
export async function bLU001054(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001054(page, vars);
}

// GI: "BLU-001-054 - Admin side" (69049f1434ec47aacc5be3d5)
export async function bLU001054AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-054 - Admin side" (6633cc811aac3ea14f224b03)
export async function bLU001054AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001054AdminSide(page, vars);
}

// GI: "BLU-001-054 - Admin side" (6904a46b1a085ce44e20cadb)
export async function bLU001054AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001054AdminSide(page, vars);
}

// GI: "BLU-001-055" (69049f1434ec47aacc5be3d6)
export async function bLU001055(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.3ds = `2.0dW`;
  await use3DSCC(page, vars);
  vars.error_message = `Secure authentication has failed. Please try again.`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await fillCCInfo26X(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2 && !element === false }, vars)) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`).first()).not.toBeVisible();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 4 && !element === false }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content .wc-block-components-payment-methods__save-card-info`)).toHaveCount(0);
  }
  await placeOrderGuestUserErrorMessage(page, vars);
  await getWooOrderFailed(page, vars);
}

// GI: "BLU-001-055" (6633cc811aac3ea14f224b04)
export async function bLU001055(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001055(page, vars);
}

// GI: "BLU-001-055" (6904a46b1a085ce44e20cadc)
export async function bLU001055(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001055(page, vars);
}

// GI: "BLU-001-056" (69049f1434ec47aacc5be3d7)
export async function bLU001056(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `old`;
  vars.IDTest = `BLU-001-056`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.3ds = `2.0aW`;
  vars.username = `{{email_BLU-001-054}}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId054 ?? ''}`;
  await use3DSCC(page, vars);
  await logIn(page, vars);
  await addSimpleProductToCart(page, vars);
  await checkACHCCSavedOnCheckout(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-056" (6633cc811aac3ea14f224b05)
export async function bLU001056(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001056(page, vars);
}

// GI: "BLU-001-056" (6904a46b1a085ce44e20cadd)
export async function bLU001056(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001056(page, vars);
}

// GI: "BLU-001-056 - Admin side" (69049f1434ec47aacc5be3d8)
export async function bLU001056AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "bluesnap" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "Credit/Debit Card" }, vars)).toBeTruthy();
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Bluesnap transaction complete (Transaction ID: ${vars.transaction_id ?? ''})`);
}

// GI: "BLU-001-056 - Admin side" (6633cc811aac3ea14f224b06)
export async function bLU001056AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001056AdminSide(page, vars);
}

// GI: "BLU-001-056 - Admin side" (6904a46b1a085ce44e20cade)
export async function bLU001056AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001056AdminSide(page, vars);
}

// GI: "BLU-001-057" (69049f1434ec47aacc5be3d9)
export async function bLU001057(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.productID = `7170`;
  vars.IDTest = ``;
  vars.test = `BLU-001-057`;
  vars.user = `new`;
  vars.payForOrder = `yes`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.3ds = `2.0aW`;
  vars.status = `Completed`;
  vars.email_BLU-001-057 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email_BLU-001-057}}`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-057}}`;
  await register(page, vars);
  vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await extractPftoken(page, vars);
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.vaultedShopperId057 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-057" (6633cc811aac3ea14f224b07)
export async function bLU001057(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001057(page, vars);
}

// GI: "BLU-001-057" (6904a46b1a085ce44e20cadf)
export async function bLU001057(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001057(page, vars);
}

// GI: "BLU-001-057 - Admin side" (69049f1434ec47aacc5be3da)
export async function bLU001057AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-057 - Admin side" (6633cc811aac3ea14f224b08)
export async function bLU001057AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001057AdminSide(page, vars);
}

// GI: "BLU-001-057 - Admin side" (6904a46b1a085ce44e20cae0)
export async function bLU001057AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001057AdminSide(page, vars);
}

// GI: "BLU-001-058" (69049f1434ec47aacc5be3db)
export async function bLU001058(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `BLU-001-058`;
  vars.3ds = `no`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.status = `Completed`;
  vars.email_BLU-001-058 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email_BLU-001-058}}`;
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-058}}`;
  await register(page, vars);
  vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await extractPftoken(page, vars);
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.vaultedShopperId058 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-058" (6633cc811aac3ea14f224b09)
export async function bLU001058(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001058(page, vars);
}

// GI: "BLU-001-058" (6904a46b1a085ce44e20cae1)
export async function bLU001058(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001058(page, vars);
}

// GI: "BLU-001-058 - Admin side" (69049f1434ec47aacc5be3dc)
export async function bLU001058AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-058 - Admin side" (6633cc811aac3ea14f224b0a)
export async function bLU001058AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001058AdminSide(page, vars);
}

// GI: "BLU-001-058 - Admin side" (6904a46b1a085ce44e20cae2)
export async function bLU001058AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001058AdminSide(page, vars);
}

// GI: "BLU-001-059" (69049f1434ec47aacc5be3dd)
export async function bLU001059(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.IDTest = `BLU-001-059`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.vaultedShopperId = `${vars.vaultedShopperId057 ?? ''}`;
  vars.3ds = `2.0aW`;
  vars.status = `Completed`;
  vars.username = `{{email_BLU-001-057}}`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-057}}`;
  await logIn(page, vars);
  vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-059" (6633cc811aac3ea14f224b0b)
export async function bLU001059(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001059(page, vars);
}

// GI: "BLU-001-059" (6904a46b1a085ce44e20cae3)
export async function bLU001059(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001059(page, vars);
}

// GI: "BLU-001-059 - Admin side" (69049f1434ec47aacc5be3de)
export async function bLU001059AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-059 - Admin side" (6633cc811aac3ea14f224b0c)
export async function bLU001059AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001059AdminSide(page, vars);
}

// GI: "BLU-001-059 - Admin side" (6904a46b1a085ce44e20cae4)
export async function bLU001059AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001059AdminSide(page, vars);
}

// GI: "BLU-001-060" (69049f1434ec47aacc5be3df)
export async function bLU001060(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.IDTest = `BLU-001-060`;
  vars.3ds = `no`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.status = `Completed`;
  vars.vaultedShopperId = `${vars.vaultedShopperId058 ?? ''}`;
  vars.username = `{{email_BLU-001-058}}`;
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-058}}`;
  await logIn(page, vars);
  vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-060" (6633cc811aac3ea14f224b0d)
export async function bLU001060(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001060(page, vars);
}

// GI: "BLU-001-060" (6904a46b1a085ce44e20cae5)
export async function bLU001060(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001060(page, vars);
}

// GI: "BLU-001-060 - Admin side" (69049f1434ec47aacc5be3e0)
export async function bLU001060AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-060 - Admin side" (6633cc811aac3ea14f224b0e)
export async function bLU001060AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001060AdminSide(page, vars);
}

// GI: "BLU-001-060 - Admin side" (6904a46b1a085ce44e20cae6)
export async function bLU001060AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001060AdminSide(page, vars);
}

// GI: "BLU-001-061" (69049f1434ec47aacc5be3e1)
export async function bLU001061(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsDeactivateOnly3DS(page, vars);
  vars.payForOrder = ``;
  vars.3dsSetting = `deactivated`;
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.3ds = `2.0aW`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-061 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-061}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.vaultedShopperId061 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-061" (6633cc811aac3ea14f224b0f)
export async function bLU001061(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001061(page, vars);
}

// GI: "BLU-001-061" (6904a46b1a085ce44e20cae7)
export async function bLU001061(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001061(page, vars);
}

// GI: "BLU-001-061 - Admin side" (69049f1434ec47aacc5be3e2)
export async function bLU001061AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "bluesnap" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "Credit/Debit Card" }, vars)).toBeTruthy();
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Bluesnap transaction complete (Transaction ID: ${vars.transaction_id ?? ''})`);
}

// GI: "BLU-001-061 - Admin side" (6633cc811aac3ea14f224b10)
export async function bLU001061AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001061AdminSide(page, vars);
}

// GI: "BLU-001-061 - Admin side" (6904a46b1a085ce44e20cae8)
export async function bLU001061AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001061AdminSide(page, vars);
}

// GI: "BLU-001-062" (69049f1434ec47aacc5be3e3)
export async function bLU001062(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.3ds = `no`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-062 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-062}}`;
  await addSimpleProductToCartVirtual(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.vaultedShopperId062 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-062" (6633cc811aac3ea14f224b11)
export async function bLU001062(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001062(page, vars);
}

// GI: "BLU-001-062" (6904a46b1a085ce44e20cae9)
export async function bLU001062(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001062(page, vars);
}

// GI: "BLU-001-062 - Admin side" (69049f1434ec47aacc5be3e4)
export async function bLU001062AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-062 - Admin side" (6633cc811aac3ea14f224b12)
export async function bLU001062AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001062AdminSide(page, vars);
}

// GI: "BLU-001-062 - Admin side" (6904a46b1a085ce44e20caea)
export async function bLU001062AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001062AdminSide(page, vars);
}

// GI: "BLU-001-063" (69049f1434ec47aacc5be3e5)
export async function bLU001063(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.3ds = `2.0aW`;
  vars.username = `{{email_BLU-001-061}}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId061 ?? ''}`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await logIn(page, vars);
  await addSimpleProductToCart(page, vars);
  await checkACHCCSavedOnCheckout(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-063" (6633cc811aac3ea14f224b13)
export async function bLU001063(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001063(page, vars);
}

// GI: "BLU-001-063" (6904a46b1a085ce44e20caeb)
export async function bLU001063(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001063(page, vars);
}

// GI: "BLU-001-063 - Admin side" (69049f1434ec47aacc5be3e6)
export async function bLU001063AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-063 - Admin side" (6633cc811aac3ea14f224b14)
export async function bLU001063AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001063AdminSide(page, vars);
}

// GI: "BLU-001-063 - Admin side" (6904a46b1a085ce44e20caec)
export async function bLU001063AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001063AdminSide(page, vars);
}

// GI: "BLU-001-064" (69049f1434ec47aacc5be3e7)
export async function bLU001064(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Completed`;
  vars.3ds = `no`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.vaultedShopperId = `${vars.vaultedShopperId062 ?? ''}`;
  vars.username = `{{email_BLU-001-062}}`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await logIn(page, vars);
  await addSimpleProductToCartDownloadable(page, vars);
  await checkACHCCSavedOnCheckout(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-064" (6633cc811aac3ea14f224b15)
export async function bLU001064(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001064(page, vars);
}

// GI: "BLU-001-064" (6904a46b1a085ce44e20caed)
export async function bLU001064(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001064(page, vars);
}

// GI: "BLU-001-064 - Admin side" (69049f1434ec47aacc5be3e8)
export async function bLU001064AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-064 - Admin side" (6633cc811aac3ea14f224b16)
export async function bLU001064AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001064AdminSide(page, vars);
}

// GI: "BLU-001-064 - Admin side" (6904a46b1a085ce44e20caee)
export async function bLU001064AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001064AdminSide(page, vars);
}

// GI: "BLU-001-065" (69049f1434ec47aacc5be3e9)
export async function bLU001065(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `BLU-001-065`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.3ds = `2.0aW`;
  vars.status = `Completed`;
  vars.email_BLU-001-065 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email_BLU-001-065}}`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-065}}`;
  await register(page, vars);
  vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await extractPftoken(page, vars);
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.vaultedShopperId065 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-065" (6633cc811aac3ea14f224b17)
export async function bLU001065(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001065(page, vars);
}

// GI: "BLU-001-065" (6904a46b1a085ce44e20caef)
export async function bLU001065(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001065(page, vars);
}

// GI: "BLU-001-065 - Admin side" (69049f1434ec47aacc5be3ea)
export async function bLU001065AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-065 - Admin side" (6633cc811aac3ea14f224b18)
export async function bLU001065AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001065AdminSide(page, vars);
}

// GI: "BLU-001-065 - Admin side" (6904a46b1a085ce44e20caf0)
export async function bLU001065AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001065AdminSide(page, vars);
}

// GI: "BLU-001-066" (69049f1434ec47aacc5be3eb)
export async function bLU001066(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `BLU-001-066`;
  vars.3ds = `no`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.status = `Completed`;
  vars.email_BLU-001-066 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email_BLU-001-066}}`;
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-066}}`;
  await register(page, vars);
  vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await extractPftoken(page, vars);
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.vaultedShopperId066 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-066" (6633cc811aac3ea14f224b19)
export async function bLU001066(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001066(page, vars);
}

// GI: "BLU-001-066" (6904a46b1a085ce44e20caf1)
export async function bLU001066(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001066(page, vars);
}

// GI: "BLU-001-066 - Admin Side" (69049f1434ec47aacc5be3ec)
export async function bLU001066AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-066 - Admin Side" (6633cc811aac3ea14f224b1a)
export async function bLU001066AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001066AdminSide(page, vars);
}

// GI: "BLU-001-066 - Admin Side" (6904a46b1a085ce44e20caf2)
export async function bLU001066AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001066AdminSide(page, vars);
}

// GI: "BLU-001-067" (69049f1434ec47aacc5be3ed)
export async function bLU001067(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `BLU-001-065`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.vaultedShopperId = `${vars.vaultedShopperId065 ?? ''}`;
  vars.3ds = `2.0aW`;
  vars.status = `Completed`;
  vars.username = `{{email_BLU-001-065}}`;
  await use3DSCC(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-065}}`;
  await logIn(page, vars);
  vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-067" (6633cc811aac3ea14f224b1b)
export async function bLU001067(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001067(page, vars);
}

// GI: "BLU-001-067" (6904a46b1a085ce44e20caf3)
export async function bLU001067(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001067(page, vars);
}

// GI: "BLU-001-067 - Admin side" (69049f1434ec47aacc5be3ee)
export async function bLU001067AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-067 - Admin side" (6633cc811aac3ea14f224b1c)
export async function bLU001067AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001067AdminSide(page, vars);
}

// GI: "BLU-001-067 - Admin side" (6904a46b1a085ce44e20caf4)
export async function bLU001067AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001067AdminSide(page, vars);
}

// GI: "BLU-001-068" (69049f1434ec47aacc5be3ef)
export async function bLU001068(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `BLU-001-066`;
  vars.3ds = `no`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.status = `Completed`;
  vars.vaultedShopperId = `${vars.vaultedShopperId066 ?? ''}`;
  vars.username = `{{email_BLU-001-066}}`;
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-066}}`;
  await logIn(page, vars);
  vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
  await getUsers(page, vars);
  await createOrderForUserByAPI(page, vars);
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await settingsActivateOnly3DS(page, vars);
}

// GI: "BLU-001-068" (6633cc811aac3ea14f224b1d)
export async function bLU001068(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001068(page, vars);
}

// GI: "BLU-001-068" (6904a46b1a085ce44e20caf5)
export async function bLU001068(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001068(page, vars);
}

// GI: "BLU-001-068 - Admin side" (69049f1434ec47aacc5be3f0)
export async function bLU001068AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-068 - Admin side" (6633cc811aac3ea14f224b1e)
export async function bLU001068AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001068AdminSide(page, vars);
}

// GI: "BLU-001-068 - Admin side" (6904a46b1a085ce44e20caf6)
export async function bLU001068AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001068AdminSide(page, vars);
}
