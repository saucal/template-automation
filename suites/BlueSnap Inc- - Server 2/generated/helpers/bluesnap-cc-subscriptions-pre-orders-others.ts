// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - CC - Subscriptions & Pre Orders & Others"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { activatePayPal, activatePreOrder, addPreOrderProductUpfrontToCart, addPreOrderProductUponReleaseToCart, addSimpleProductToCart, addSimpleProductToCartDownloadable, addSimpleProductToCartVirtual, addSimpleSubscriptionProductToCartDownloadable, addSimpleSubscriptionProductToCartVirtual, addVariableSubscriptionProductToCart, addVariableSubscriptionProductToCartDaily, blueSnapSandboxEndLookForTransaction, capturePayPalPayment, checkACHCCSavedOnCheckout, checkCartIsEmpty, checkPreOrderFailed, checkTranscationIsPresentOnOrderBackend, completePreOrderWithAdmin, customerPayPendingOrder, customerPayPendingOrderDeclineTransaction, deactivatePayPal, extractDate, extractFourDigitsOfCC, extractPftoken, fillCCInfo26X, fillCCInfoAddNewOneAlreadyPresentOtherCC26X, fillCheckoutDataCreateAccount, fillCheckoutDataNotCreatingAccount, fillCheckoutDataSubscription, fillCheckoutDataSubscriptionLoggedUser, forceRenewOrderToFail, getBlueSnapVersion, getGroupLogRequestResponse, getGroupLogRequestResponseTransactions, getGroupLogRequestResponseTransactionsDeclined, getLogRequestResponseCurrencyRate, getLogRequestResponseNoRecurringOndemand, getLogRequestResponseNoTransactions, getLogRequestResponsePaymentFieldsTokens, getLogRequestResponseRecurringOndemand, getLogRequestResponseRecurringOndemandForDecline, getLogRequestResponseRecurringOndemandSubsID, getLogRequestResponseUpgrade, getLogRequestResponseVaultedShopper, getPreOrderVersion, getSiteTitle, getTransactionDetailsFromBluesnap, getVariablesForSubscriptions, getWooOrderDetails, getWooOrderFailed, getWooSubscriptionDetails, goToMyAccount, goToOrderWithAdmin, goToPendingPaymentOrder, goToSubscriptionWithAdmin, logIn, loginAdmin, payOrderPendingPayment, payPalBlueSnapTemplate, paymentMethodMenuACHCCAvailable, paymentSectionEnabled, placeOrder, placePreOrder, placePreOrderDeclineTransaction, preOrderMenu, register, renewByAdmin, renewSubscription, saveCC, selectCCAsPaymentMethod, settingsActivateMultiCurrency, settingsActivateSaveCards, settingsDeactivateMultiCurrency, settingsDeactivateSaveCards, settingsDeactivateWooCommerce, settingsSubscriptionDisableRetry, settingsSubscriptionEnableRetry, subscriptionMenu, upgradeSubscription, useAMEX, useDiners, useMASTER, useVisaDecline, verifyDeclineTransaction, verifyEmailAdminAndCustomer, verifyEmailOnlyCustomer, verifyLogsTRAUTHCAPTUREChangePM26X, verifyLogsTRAUTHCAPTUREPreORderUponReleaseComplete, verifyLogsTRAUTHCAPTURERenewal, verifyLogsTRAUTHCAPTUREUpgrade26X, verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X, verifyLogsTransactions26X, verifyNoVaultedShopperRequest, verifyVaultedShopper, verifyVaultedShopperAddPaymentMethodOnMyAccount } from './bluesnap-common-steps-for-suites';
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

// GI: "BLU-001-019" (69049f8f1a085ce44e20032a)
export async function bLU001019(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getSiteTitle(page, vars);
  await getBlueSnapVersion(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (Number(blueSnapVs[0]) <= 3 && Number(blueSnapVs[1]) <= 1) 
        ||
        (Number(blueSnapVs[0]) === 2 && Number(blueSnapVs[1]) <= 6) })()) {
    await deactivatePayPal(page, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2) })()) {
    await activatePayPal(page, vars);
  }
  await activatePreOrder(page, vars);
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.payment = `cc`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_019 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_019}}`;
  await extractFourDigitsOfCC(page, vars);
  await addSimpleSubscriptionProductToCartVirtual(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-019" (6633ced61aac3ea14f22eff9)
export async function bLU001019(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001019(page, vars);
}

// GI: "BLU-001-020" (69049f8f1a085ce44e20032b)
export async function bLU001020(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}/wp-admin/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).first().fill(`demouser`); } catch { await page.locator(`#user_login`).first().selectOption(`demouser`); }
  try { await page.locator(`#user_pass`).first().fill(`demopass`); } catch { await page.locator(`#user_pass`).first().selectOption(`demopass`); }
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
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-020" (6633ced61aac3ea14f22effa)
export async function bLU001020(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001020(page, vars);
}

// GI: "BLU-001-021" (69049f8f1a085ce44e20032c)
export async function bLU001021(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsActivateSaveCards(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`{{email-BLU-001_019}}`); } catch { await page.locator(`#username`).first().selectOption(`{{email-BLU-001_019}}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await subscriptionMenu(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Renew now")]`).or(page.locator(`a[href*="/my-account/?subscription_renewal_early=${vars.subscriptionID ?? ''}&subscription_renewal=true"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await expect(page.locator(`.wc_payment_method.payment_method_bluesnap_ach`)).toHaveCount(0);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  vars.renewOrder = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).first()).toContainText(`#${vars.subscriptionID ?? ''}`);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`).or(page.locator(`td > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toHaveText(`${vars.status ?? ''}`);
  await subscriptionMenu(page, vars);
  vars.orderNumber = `${vars.renewOrder ?? ''}`;
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-021" (6633ced61aac3ea14f22effb)
export async function bLU001021(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001021(page, vars);
}

// GI: "BLU-001-022" (69049f8f1a085ce44e20032d)
export async function bLU001022(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.testId = `BLU-001-022`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.checklogs = ``;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_022 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_022}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getVariablesForSubscriptions(page, vars);
  await goToMyAccount(page, vars);
  await subscriptionMenu(page, vars);
  vars.totalOld = `${vars.total ?? ''}`;
  vars.checklogs = `upgrade`;
  await upgradeSubscription(page, vars);
  vars.useSavedCC = `yes`;
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  vars.totalRenewOld = `${vars.totalRenew ?? ''}`;
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseUpgrade(page, vars);
  await verifyLogsTRAUTHCAPTUREUpgrade26X(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-022" (6633ced61aac3ea14f22effc)
export async function bLU001022(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001022(page, vars);
}

// GI: "BLU-001-023" (69049f8f1a085ce44e20032e)
export async function bLU001023(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}/wp-admin/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).first().fill(`demouser`); } catch { await page.locator(`#user_login`).first().selectOption(`demouser`); }
  try { await page.locator(`#user_pass`).first().fill(`demopass`); } catch { await page.locator(`#user_pass`).first().selectOption(`demopass`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
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
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.checklogs = `renew`;
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-023" (6633ced61aac3ea14f22effd)
export async function bLU001023(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001023(page, vars);
}

// GI: "BLU-001-024" (69049f8f1a085ce44e20032f)
export async function bLU001024(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Completed`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.useSavedCC = ``;
  vars.checklogs = `changepm`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_024 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_024}}`;
  await extractFourDigitsOfCC(page, vars);
  await addSimpleSubscriptionProductToCartDownloadable(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getVariablesForSubscriptions(page, vars);
  await goToMyAccount(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "My Subscription")]`).or(page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Change payment")]`).or(page.locator(`a[href*="/checkout/order-pay/${vars.subscriptionID ?? ''}/?pay_for_order=true&key=wc_order_"]`)).filter({ visible: true }).first().click({ force: true });
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await fillCCInfoAddNewOneAlreadyPresentOtherCC26X(page, vars);
  await extractDate(page, vars);
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;


return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector('#place_order');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  vars.totalOld = `${vars.total ?? ''}`;
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await getLogRequestResponseUpgrade(page, vars);
  await verifyLogsTRAUTHCAPTUREChangePM26X(page, vars);
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method updated.`);
  await checkCartIsEmpty(page, vars);
}

// GI: "BLU-001-024" (6633ced61aac3ea14f22effe)
export async function bLU001024(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001024(page, vars);
}

// GI: "BLU-001-025" (69049f8f1a085ce44e200330)
export async function bLU001025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}/wp-admin/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).first().fill(`demouser`); } catch { await page.locator(`#user_login`).first().selectOption(`demouser`); }
  try { await page.locator(`#user_pass`).first().fill(`demopass`); } catch { await page.locator(`#user_pass`).first().selectOption(`demopass`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
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
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getTransactionDetailsFromBluesnap(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-025" (6633ced61aac3ea14f22efff)
export async function bLU001025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001025(page, vars);
}

// GI: "BLU-001-026" (69049f8f1a085ce44e200331)
export async function bLU001026(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `subscription`;
  vars.useSavedCC = `yes`;
  vars.status = `Processing`;
  vars.user = `old`;
  vars.username = `{{email-BLU-001_024}}`;
  await logIn(page, vars);
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelectorAll(".woocommerce-SavedPaymentMethods-token, span[id*='radio-control-wc-payment-method-saved-tokens']").length >= 2
 }, vars)).toBeTruthy();
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-026" (6633ced61aac3ea14f22f000)
export async function bLU001026(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001026(page, vars);
}

// GI: "BLU-001-027" (69049f8f1a085ce44e200332)
export async function bLU001027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.useSavedCC = ``;
  vars.order = `fail`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_027 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email-BLU-001_027}}`;
  vars.email = `{{email-BLU-001_027}}`;
  await extractFourDigitsOfCC(page, vars);
  await register(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscriptionLoggedUser(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getVariablesForSubscriptions(page, vars);
  await forceRenewOrderToFail(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key=wc_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Renew subscription")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Renew subscription")]`)).or(page.locator(`button.wc-block-components-checkout-place-order-button div.wc-block-components-checkout-place-order-button__text`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-027" (6633ced61aac3ea14f22f001)
export async function bLU001027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001027(page, vars);
}

// GI: "BLU-001-028" (69049f8f1a085ce44e200333)
export async function bLU001028(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
  vars.useSavedCC = ``;
  vars.user = `new`;
  vars.pay = `now`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_028 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_028}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillCCInfo26X(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
|| 
(Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0) })()) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`).or(page.locator(`.wc-block-components-payment-methods__save-card-info > label > input`))).toHaveCount(0);
  }
  await placePreOrder(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
  vars.orderNumber028 = `${vars.orderNumber ?? ''}`;
  vars.subsID028 = `${vars.subsID ?? ''}`;
  vars.total028 = `${vars.total ?? ''}`;
  vars.lastName028 = `${vars.lastName ?? ''}`;
  vars.vaultedShopperId028 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-028" (6633ced61aac3ea14f22f002)
export async function bLU001028(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001028(page, vars);
}

// GI: "BLU-001-029 - Step 1 - Pay Later order" (69049f8f1a085ce44e200334)
export async function bLU001029Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
  vars.test = `preorder`;
  vars.pay = `later`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001-029 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001-029}}`;
  vars.username = `{{email-BLU-001-029}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_pre_orders_pay_later"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-pre_orders_pay_later"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_pre_orders_pay_later`).or(page.locator(`#radio-control-wc-payment-method-options-pre_orders_pay_later`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`)).toHaveCount(0);
  }
  await placePreOrder(page, vars);
  await preOrderMenu(page, vars);
  await getWooOrderDetails(page, vars);
}

// GI: "BLU-001-029 - Step 1 - Pay Later order" (6633ced61aac3ea14f22f003)
export async function bLU001029Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001029Step1PayLaterOrder(page, vars);
}

// GI: "BLU-001-029 - Step 2 - Admin Complete preorder" (69049f8f1a085ce44e200335)
export async function bLU001029Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  vars.status = `Pending payment`;
  await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`)).first()).toContainText(`${vars.status ?? ''}`);
}

// GI: "BLU-001-029 - Step 2 - Admin Complete preorder" (6633ced61aac3ea14f22f004)
export async function bLU001029Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001029Step2AdminCompletePreorder(page, vars);
}

// GI: "BLU-001-029 - Step 3 - Pay Preorder" (69049f8f1a085ce44e200336)
export async function bLU001029Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
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
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-029 - Step 3 - Pay Preorder" (6633ced61aac3ea14f22f005)
export async function bLU001029Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001029Step3PayPreorder(page, vars);
}

// GI: "BLU-001-030" (69049f8f1a085ce44e200337)
export async function bLU001030(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 && Number(PreOrderVs[0]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0])  >=2 })()) {
    vars.status = `Pre-ordered`;
  }
  vars.test = `preorder`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.payForOrder = `no`;
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
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.orderNumber030 = `${vars.orderNumber ?? ''}`;
  vars.subsID030 = `${vars.subsID ?? ''}`;
  vars.total028 = `${vars.total ?? ''}`;
  vars.lastName030 = `${vars.lastName ?? ''}`;
  vars.vaultedShopperId030 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-001-030" (6633ced61aac3ea14f22f006)
export async function bLU001030(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001030(page, vars);
}

// GI: "BLU-001-031" (69049f8f1a085ce44e200338)
export async function bLU001031(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 
&& Number(PreOrderVs[0]) <= 2 })()) {
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
  await useVisaDecline(page, vars);
  vars.email-BLU-001_031 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_031}}`;
  vars.username = `{{email-BLU-001_031}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placePreOrderDeclineTransaction(page, vars);
  await getWooOrderFailed(page, vars);
  await getLogRequestResponseRecurringOndemandForDecline(page, vars);
  await verifyDeclineTransaction(page, vars);
  await checkPreOrderFailed(page, vars);
  await goToPendingPaymentOrder(page, vars);
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).filter({ visible: true }).first().click({ force: true }); }
  }
  await extractPftoken(page, vars);
  await fillCCInfo26X(page, vars);
  vars.payForOrder = `yes`;
  await placePreOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
}

// GI: "BLU-001-031" (6633ced61aac3ea14f22f007)
export async function bLU001031(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001031(page, vars);
}

// GI: "BLU-001-032 - Step 1 - Pay Later order" (69049f8f1a085ce44e200339)
export async function bLU001032Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 
&& Number(PreOrderVs[0]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  vars.test = `preorder`;
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) >= 2 })()) {
    vars.status = `Pre-ordered`;
  }
  vars.pay = `later`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001-032 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001-032}}`;
  vars.username = `{{email-BLU-001-032}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_pre_orders_pay_later"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-pre_orders_pay_later"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_pre_orders_pay_later`).or(page.locator(`#radio-control-wc-payment-method-options-pre_orders_pay_later`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`)).toHaveCount(0);
  }
  await placePreOrder(page, vars);
  await preOrderMenu(page, vars);
  await getWooOrderDetails(page, vars);
}

// GI: "BLU-001-032 - Step 1 - Pay Later order" (6633ced61aac3ea14f22f008)
export async function bLU001032Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001032Step1PayLaterOrder(page, vars);
}

// GI: "BLU-001-032 - Step 2 - Admin Complete preorder" (69049f8f1a085ce44e20033a)
export async function bLU001032Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  vars.status = `Pending payment`;
  await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`)).first()).toContainText(`${vars.status ?? ''}`);
}

// GI: "BLU-001-032 - Step 2 - Admin Complete preorder" (6633ced61aac3ea14f22f009)
export async function bLU001032Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001032Step2AdminCompletePreorder(page, vars);
}

// GI: "BLU-001-032 - Step 3 - Pay Preorder" (69049f8f1a085ce44e20033b)
export async function bLU001032Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  await logIn(page, vars);
  await payOrderPendingPayment(page, vars);
  await useVisaDecline(page, vars);
  await extractPftoken(page, vars);
  await fillCCInfo26X(page, vars);
  await extractDate(page, vars);
  await customerPayPendingOrderDeclineTransaction(page, vars);
  await getGroupLogRequestResponseTransactionsDeclined(page, vars);
  await verifyDeclineTransaction(page, vars);
  await page.reload();
  await page.waitForLoadState('load');
  await useAMEX(page, vars);
  await extractPftoken(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await customerPayPendingOrder(page, vars);
  await checkCartIsEmpty(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
}

// GI: "BLU-001-032 - Step 3 - Pay Preorder" (6633ced61aac3ea14f22f00a)
export async function bLU001032Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001032Step3PayPreorder(page, vars);
}

// GI: "BLU-001-033" (69049f8f1a085ce44e20033c)
export async function bLU001033(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 && Number(PreOrderVs[0]) <= 2 })()) {
    vars.status = `Processing`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) >= 2 })()) {
    vars.status = `Pre-ordered`;
  }
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.test = `preorder`;
  vars.pay = `upfront`;
  vars.preOrderStatus = `Active`;
  await useVisaDecline(page, vars);
  vars.email-BLU-001_033 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_033}}`;
  vars.username = `{{email-BLU-001_033}}`;
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
  await placePreOrderDeclineTransaction(page, vars);
  await checkPreOrderFailed(page, vars);
  await getWooOrderFailed(page, vars);
  await getGroupLogRequestResponseTransactionsDeclined(page, vars);
  await verifyDeclineTransaction(page, vars);
  await goToPendingPaymentOrder(page, vars);
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await extractPftoken(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await customerPayPendingOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await checkCartIsEmpty(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
}

// GI: "BLU-001-033" (6633ced61aac3ea14f22f00b)
export async function bLU001033(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001033(page, vars);
}

// GI: "BLU-001-034" (69049f8f1a085ce44e20033d)
export async function bLU001034(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.email = `{{email-BLU-001_028}}`;
  vars.test = `preorder`;
  vars.pay = `now`;
  vars.orderNumber = `${vars.orderNumber028 ?? ''}`;
  vars.subsID = `${vars.subsID028 ?? ''}`;
  vars.total = `${vars.total028 ?? ''}`;
  vars.lastName = `${vars.lastName028 ?? ''}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId028 ?? ''}`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Order ${vars.orderNumber ?? ''}")]`).or(page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"]`)).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await getLogRequestResponseUpgrade(page, vars);
  await verifyLogsTRAUTHCAPTUREPreORderUponReleaseComplete(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-001-034" (6633ced61aac3ea14f22f00c)
export async function bLU001034(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001034(page, vars);
}

// GI: "BLU-001-035" (69049f8f1a085ce44e20033e)
export async function bLU001035(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.email = `{{email-BLU-001_030}}`;
  vars.pay = `upfront`;
  vars.test = `preorder`;
  vars.orderNumber = `${vars.orderNumber030 ?? ''}`;
  vars.subsID = `${vars.subsID030 ?? ''}`;
  vars.total = `${vars.total030 ?? ''}`;
  vars.lastName = `${vars.lastName030 ?? ''}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId030 ?? ''}`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Order ${vars.orderNumber ?? ''}")]`).or(page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"]`)).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await getLogRequestResponseNoRecurringOndemand(page, vars);
  await getLogRequestResponseNoTransactions(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-001-035" (6633ced61aac3ea14f22f00d)
export async function bLU001035(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001035(page, vars);
}

// GI: "BLU-001-069" (69049f8f1a085ce44e20033f)
export async function bLU001069(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsDeactivateSaveCards(page, vars);
  vars.lastName = `${vars.alphanumeric ?? ''}`;
  vars.saveCC = `disabled`;
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_068 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_068}}`;
  await extractFourDigitsOfCC(page, vars);
  await addSimpleSubscriptionProductToCartVirtual(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  vars.user = `old`;
  await addSimpleProductToCart(page, vars);
  await expect(page.locator(`.woocommerce-SavedPaymentMethods-token`)).toHaveCount(0);
}

// GI: "BLU-001-069" (6633ced61aac3ea14f22f00e)
export async function bLU001069(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001069(page, vars);
}

// GI: "BLU-001-070" (69049f8f1a085ce44e200340)
export async function bLU001070(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsDeactivateSaveCards(page, vars);
  vars.test = ``;
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `disabled`;
  vars.useSavedCC = `no`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-070 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-070}}`;
  await addSimpleProductToCartVirtual(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
}

// GI: "BLU-001-070" (6633ced61aac3ea14f22f00f)
export async function bLU001070(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001070(page, vars);
}

// GI: "BLU-001-071" (69049f8f1a085ce44e200341)
export async function bLU001071(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await deactivatePayPal(page, vars);
  vars.testID = `BLU-001-071`;
  await addSimpleSubscriptionProductToCartVirtual(page, vars);
  await addSimpleSubscriptionProductToCartDownloadable(page, vars);
  await blockUI(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let items = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tbody > tr.cart_item, tbody > tr.wc-block-cart-items__row"))
return items.length === 1 }, vars)).toBeTruthy();
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2) })()) {
    await activatePayPal(page, vars);
  }
}

// GI: "BLU-001-071" (6633ced61aac3ea14f22f010)
export async function bLU001071(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001071(page, vars);
}

// GI: "BLU-001-072" (69049f8f1a085ce44e200342)
export async function bLU001072(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsActivateSaveCards(page, vars);
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  await useDiners(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-072 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-072}}`;
  await addSimpleProductToCartVirtual(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
}

// GI: "BLU-001-072" (6633ced61aac3ea14f22f011)
export async function bLU001072(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001072(page, vars);
}

// GI: "BLU-001-073" (69049f8f1a085ce44e200343)
export async function bLU001073(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `BLU-001-073`;
  vars.user = `new`;
  vars.email_BLU-001-073 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email_BLU-001-073}}`;
  await useDiners(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-073}}`;
  await register(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await page.reload();
  await page.waitForLoadState('load');
  await extractPftoken(page, vars);
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
  await fillCCInfo26X(page, vars);
  await extractDate(page, vars);
  await expect(page.locator(`#place_order`)).not.toHaveCount(0);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  vars.vaultedShopperId = ``;
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method successfully added.`);
  await getGroupLogRequestResponse(page, vars);
  await verifyVaultedShopperAddPaymentMethodOnMyAccount(page, vars);
}

// GI: "BLU-001-073" (6633ced61aac3ea14f22f012)
export async function bLU001073(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001073(page, vars);
}

// GI: "BLU-001-074" (69049f8f1a085ce44e200344)
export async function bLU001074(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.username = `{{email_BLU-001-073}}`;
  vars.email = `{{email_BLU-001-073}}`;
  await logIn(page, vars);
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await useDiners(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await checkACHCCSavedOnCheckout(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-074" (6633ced61aac3ea14f22f013)
export async function bLU001074(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001074(page, vars);
}

// GI: "BLU-001-075" (69049f8f1a085ce44e200345)
export async function bLU001075(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.useSavedCC = ``;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_075 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_075}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCartDaily(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await expect(page.locator(`.woocommerce > .woocommerce-info`)).toHaveCount(0);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await expect(page.locator(`.woocommerce > .woocommerce-info`)).toHaveCount(0);
  await checkCartIsEmpty(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.cart-empty')

return !element === false
 }, vars)) {
    // TODO: command="assertTextNotPresent" target=[{"selector":".woocommerce .woocommerce-info"},{"selector":".wc-block-components-notice-banner.is-info"}] value="You can't purchase a subscription with a renewal period smaller than 1 week using ACH/ECP Transactions."
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wp-block-woocommerce-empty-cart-block')

return !element === false
 }, vars)) {
    await expect(page.locator(`.woocommerce .woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`))).toHaveCount(0);
  }
}

// GI: "BLU-001-075" (6633ced61aac3ea14f22f014)
export async function bLU001075(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001075(page, vars);
}

// GI: "BLU-001-076" (69049f8f1a085ce44e200346)
export async function bLU001076(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await deactivatePayPal(page, vars);
  await settingsDeactivateWooCommerce(page, vars);
  await loginAdmin(page, vars);
  await expect(page.locator(`.notice > p > strong`)).not.toHaveCount(0);
  await expect(page.locator(`.notice > p > strong`).first()).toHaveText(`WooCommerce Bluesnap Gateway is inactive because WooCommerce is not installed and active.`);
  await page.locator(`a[href="plugins.php"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="activate-woocommerce"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#activate-woocommerce`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`#message > p`).first()).toContainText(`Plugin activated.`);
  await expect(page.locator(`.notice > p > strong`)).toHaveCount(0);
}

// GI: "BLU-001-076" (6633ced61aac3ea14f22f015)
export async function bLU001076(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001076(page, vars);
}

// GI: "BLU-001-077" (69049f8f1a085ce44e200347)
export async function bLU001077(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.order = `fail`;
  vars.subStatus = `Active`;
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (Number(blueSnapVs[0]) <= 3 && Number(blueSnapVs[1]) <= 1) 
        || 
        (Number(blueSnapVs[0]) === 2 && Number(blueSnapVs[1]) <= 6) })()) {
    await deactivatePayPal(page, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2) })()) {
    await activatePayPal(page, vars);
  }
  await settingsSubscriptionEnableRetry(page, vars);
  await useAMEX(page, vars);
  vars.email-BLU-001_027 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email-BLU-001_027}}`;
  vars.email = `{{email-BLU-001_027}}`;
  await extractFourDigitsOfCC(page, vars);
  await register(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscriptionLoggedUser(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getVariablesForSubscriptions(page, vars);
  await forceRenewOrderToFail(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key=wc_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await useVisaDecline(page, vars);
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.checkout.woocommerce-checkout')

return !element === false
 }, vars)) {
    {
      const _lbl = page.locator(`label[for="wc-bluesnap-payment-token-new"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wc-bluesnap-payment-token-new`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')

return !element === false }, vars)) {
    await selectCCAsPaymentMethod(page, vars);
  }
  await fillCCInfo26X(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//*[contains(text(), "Renew subscription")]`).or(page.locator(`#place_order`)).or(page.locator(`.wc-block-components-checkout-place-order-button__text`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`div > div:nth-child(1) > ul.woocommerce-error`).or(page.locator(`ul.woocommerce-error > li`)).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toHaveText(`This is the new error message for 14002|INCORRECT_INFORMATION`);
}

// GI: "BLU-001-077" (6633ced61aac3ea14f22f016)
export async function bLU001077(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001077(page, vars);
}

// GI: "BLU-001-077 - Admin side" (69049f8f1a085ce44e200348)
export async function bLU001077AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.url ?? ''}/wp-admin/`);
  await page.waitForLoadState('load');
  vars.subStatus = `On hold`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`li:nth-of-type(2) div.note_content > p`).first()).toContainText(`This is the new error message for 14002|INCORRECT_INFORMATION`);
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).or(page.locator(`a[href="admin.php?page=wc-orders--shop_subscription"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#order-${vars.subscriptionID ?? ''} > td.status.column-status > mark > span`).or(page.locator(`#post-${vars.subscriptionID ?? ''} > td.status.column-status > mark > span`)).first()).toHaveText(`${vars.subStatus ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionID ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.subStatus ?? ''}`);
}

// GI: "BLU-001-077 - Admin side" (6633ced61aac3ea14f22f017)
export async function bLU001077AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001077AdminSide(page, vars);
}

// GI: "BLU-001-077 - Admin side failed order hook" (69049f8f1a085ce44e200349)
export async function bLU001077AdminSideFailedOrderHook(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-status&tab=action-scheduler`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "Pending")]`).or(page.locator(`a[href="/wp-admin/tools.php?page=action-scheduler&status=pending"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#plugin-search-input`).first().fill(`woocommerce_scheduled_subscription_payment_retry`); } catch { await page.locator(`#plugin-search-input`).first().selectOption(`woocommerce_scheduled_subscription_payment_retry`); }
  {
    const _lbl = page.locator(`label[for="search-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#search-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`tr:last-of-type > td.args.column-args > ul > li > code`).first()).toContainText(`'order_id' => ${vars.orderNumber ?? ''}`);
  await page.locator(`tr:last-of-type > td.hook`).first().hover();
  await page.locator(`tr:last-of-type > td.hook > div > span.run > a`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div#message.updated > p`).first()).toHaveText(`Successfully executed action: woocommerce_scheduled_subscription_payment_retry`);
}

// GI: "BLU-001-077 - Admin side failed order hook" (6633ced61aac3ea14f22f018)
export async function bLU001077AdminSideFailedOrderHook(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001077AdminSideFailedOrderHook(page, vars);
}

// GI: "BLU-001-079 - Failed Upgrade" (69049f8f1a085ce44e20034a)
export async function bLU001079FailedUpgrade(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.testId = `BLU-001-022`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.checklogs = `upgrade`;
  vars.subStatus = `Active`;
  await settingsSubscriptionDisableRetry(page, vars);
  await useAMEX(page, vars);
  vars.email-BLU-001_079 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_079}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getVariablesForSubscriptions(page, vars);
  await goToMyAccount(page, vars);
  await subscriptionMenu(page, vars);
  vars.totalOld = `${vars.total ?? ''}`;
  await upgradeSubscription(page, vars);
  {
    const _lbl = page.locator(`label[for="wc-bluesnap-payment-token-new"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wc-bluesnap-payment-token-new`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await useVisaDecline(page, vars);
  await fillCCInfo26X(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`div.wp-block-woocommerce-checkout.wc-block-checkout > div.wc-block-components-notices > div > div > div`).or(page.locator(`ul.woocommerce-error > li`)).first()).toHaveText(`This is the new error message for 14002|INCORRECT_INFORMATION`);
  await getWooOrderFailed(page, vars);
}

// GI: "BLU-001-079 - Failed Upgrade" (6633ced61aac3ea14f22f019)
export async function bLU001079FailedUpgrade(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001079FailedUpgrade(page, vars);
}

// GI: "BLU-001-079B- Admin side Order Note" (69049f8f1a085ce44e20034b)
export async function bLU001079BAdminSideOrderNote(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.orderNumber = `${vars.orderNumber ?? ''}`;
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div.note_content > p`).or(page.locator(`ul.order_notes > li > div.note_content > p`)).first()).toContainText(`This is the new error message for 14002|INCORRECT_INFORMATION`);
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).or(page.locator(`a[href="admin.php?page=wc-orders--shop_subscription"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.post-${vars.subscriptionID ?? ''} > td.status.column-status > mark.subscription-status.order-status.tips > span`).or(page.locator(`tr#order-${vars.subscriptionID ?? ''} > td.status.column-status > mark.subscription-status.order-status.tips > span`)).first()).toHaveText(`${vars.subStatus ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionID ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`${vars.subStatus ?? ''}`);
}

// GI: "BLU-001-079B- Admin side Order Note" (6633ced61aac3ea14f22f01a)
export async function bLU001079BAdminSideOrderNote(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001079BAdminSideOrderNote(page, vars);
}

// GI: "BLU-001-080" (69049f8f1a085ce44e20034c)
export async function bLU001080(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await activatePayPal(page, vars);
  await getBlueSnapVersion(page, vars);
  vars.payment = `cc`;
  await addSimpleProductToCart(page, vars);
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 0) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  {
    const _lbl = page.locator(`label[for="select2-billing_country-container"]`).or(page.locator(`label[for="shipping-country"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-billing_country-container`).or(page.locator(`#shipping-country`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`xpath=//li[contains(text(), "Canada")]`).or(page.locator(`xpath=//option[contains(text(), "Canada")]`)).filter({ visible: true }).first().click(); } catch { await page.locator('select').filter({ has: page.locator('option', { hasText: `Canada` }) }).first().selectOption({ label: `Canada` }); }
  await blockUI(page, vars);
  if ((() => { let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 0) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#payment_method_ppcp-gateway') === false }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_ppcp-gateway"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_ppcp-gateway`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let BlueSnapVs = `${vars.BlueSnapVs}`;
BlueSnapVs = BlueSnapVs.split('.');

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && !document.querySelector('#payment_method_ppcp-gateway') === false }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  if ((() => { let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 4) })()) {
    await expect(page.locator(`#payment_method_bluesnap_ach`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap_ach`))).toHaveCount(0);
  }
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap__label > span`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 0) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (Number(blueSnapVs[0]) <= 3 && Number(blueSnapVs[1]) <= 1) 
        || 
        (Number(blueSnapVs[0]) === 2 && Number(blueSnapVs[1]) <= 6) })()) {
    await deactivatePayPal(page, vars);
  }
}

// GI: "BLU-001-080" (6633ced61aac3ea14f22f01b)
export async function bLU001080(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001080(page, vars);
}

// GI: "BLU-001-081 " (69049f8f1a085ce44e20034d)
export async function bLU001081(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useVisaDecline(page, vars);
  vars.email-BLU-001_019 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_019}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCartDaily(page, vars);
  await expect(page.locator(`#post-6 > div > div > div.woocommerce-info`).or(page.locator(`#post-6 > div > div > div.wc-block-components-notice-banner.is-info`)).or(page.locator(`div.wc-block-components-notices > div > div > div`)).first()).toBeVisible();
  await expect(page.locator(`div > div > div.woocommerce-info`).or(page.locator(`div > div > div.wc-block-components-notice-banner.is-info`)).or(page.locator(`div.wc-block-components-notices > div > div > div`)).first()).toContainText(`You can`);
  await expect(page.locator(`div > div > div.woocommerce-info`).or(page.locator(`div > div > div.wc-block-components-notice-banner.is-info`)).or(page.locator(`div.wc-block-components-notices > div > div > div`)).first()).toContainText(`t purchase a subscription with a renewal period smaller than 1 week using ACH/ECP Transactions.`);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.checkout.woocommerce-checkout') }, vars)) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.wp-block-woocommerce-checkout') }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content > div > label > input.wc-block-components-checkbox__input`)).toHaveCount(0);
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Sign Up Now")]`)).or(page.locator(`xpath=//div[contains(text(), "Sign Up Now")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.waitForTimeout(10000);
  await expect(page.locator(`#post-6 > div > div > div:nth-child(1) > ul > li`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).or(page.locator(`div.wc-block-components-notices > div > div > div`)).first()).toBeVisible();
  await expect(page.locator(`#post-6 > div > div > div:nth-child(1) > ul > li`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).or(page.locator(`div.wc-block-components-notices > div > div > div`)).first()).toHaveText(`This is the new error message for 14002|INCORRECT_INFORMATION`);
}

// GI: "BLU-001-081 " (6633ced61aac3ea14f22f01c)
export async function bLU001081(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001081(page, vars);
}

// GI: "BLU-001-082 A - SCART-1056" (69049f8f1a085ce44e20034e)
export async function bLU001082ASCART1056(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await activatePayPal(page, vars);
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  vars.email-BLU-001_082 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_082}}`;
  await addSimpleSubscriptionProductToCartVirtual(page, vars);
  await addVariableSubscriptionProductToCartDaily(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.wp-block-woocommerce-checkout') }, vars)) {
    vars.block = `true`;
  }
  if (vars.block) {
    // TODO: command="exit" target="" value="passing"
  }
  await fillCheckoutDataSubscription(page, vars);
  await payPalBlueSnapTemplate(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await page.locator(`tr:nth-child(1) > td.subscription-actions.order-actions > a`).filter({ visible: true }).first().click({ force: true });
  vars.subscriptionId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let b = window.location.pathname
//vars.url
subId = b.split('/').slice(1);
return subId[3]; }, vars);
  if (!vars.blog.includes('blocks')) {
    vars.adminUrl = `${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.subscriptionId ?? ''}&action=edit`;
  }
  if (vars.blog.includes('blocks')) {
    vars.adminUrl = `${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionId ?? ''}`;
  }
  await page.waitForTimeout(15000);
  await page.locator(`tr:nth-child(7) > td:nth-child(2) > a.button.cancel`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await page.waitForLoadState('load');
}

// GI: "BLU-001-082 A - SCART-1056" (6633ced61aac3ea14f22f01d)
export async function bLU001082ASCART1056(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001082ASCART1056(page, vars);
}

// GI: "BLU-001-082 B - SCART-1056 Admin side" (69049f8f1a085ce44e20034f)
export async function bLU001082BSCART1056AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.goto(`${vars.adminUrl ?? ''}`);
  await page.waitForLoadState('load');
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let status = document.querySelector<HTMLFormElement>('p.form-field-wide > span > span > span > #select2-order_status-container').innerText;
if (status == 'Cancelled' || status == 'Pending Cancellation'){
    return true
    
} }, vars)).toBeTruthy();
  // TODO: command="assertTextNotPresent" target="ul.order_notes > li:nth-child(1) > div > p" value="Error during subscription status transition"
  // TODO: command="assertTextNotPresent" target="ul.order_notes > li:nth-child(2) > div > p" value="Error during subscription status transition"
  // TODO: command="assertTextNotPresent" target="ul.order_notes > li:nth-child(3) > div > p" value="Error during subscription status transition"
  vars.orderStatus = ((await page.locator(`.order-status > span:nth-child(1)`).textContent()) ?? '').trim();
  if ((() => { let status = vars.orderStatus
return status == 'On hold'; })()) {
    await capturePayPalPayment(page, vars);
  }
  await expect(page.locator(`p.form-field-wide > span > span > span > #select2-order_status-container`).first()).toHaveText(`Pending Cancellation`);
  {
    const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//span[contains(text(), "Active")]`).or(page.locator(`#select2-order_status-container`)).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="select2-order_status-result-6yyu-wc-cancelled"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//li[contains(text(), "Cancelled")]`).or(page.locator(`#select2-order_status-result-6yyu-wc-cancelled`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(5000);
  await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Cancelled`);
  // TODO: command="assertTextNotPresent" target="li.note:nth-of-type(1) > .note_content" value="Error during subscription status transition"
  // TODO: command="assertTextNotPresent" target="li.note.system-note:nth-of-type(2) > .note_content" value="Error during subscription status transition"
  // TODO: command="assertTextNotPresent" target="li.note.system-note:nth-of-type(3) > .note_content" value="Error during subscription status transition"
}

// GI: "BLU-001-082 B - SCART-1056 Admin side" (6633ced61aac3ea14f22f01e)
export async function bLU001082BSCART1056AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001082BSCART1056AdminSide(page, vars);
}

// GI: "BLU-001-083 A scart-992 - Create subscription" (69049f8f1a085ce44e200350)
export async function bLU001083AScart992CreateSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (Number(blueSnapVs[0]) <= 3 && Number(blueSnapVs[1]) <= 1) 
        || 
        (Number(blueSnapVs[0]) === 2 && Number(blueSnapVs[1]) <= 6) })()) {
    await deactivatePayPal(page, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2) })()) {
    await deactivatePayPal(page, vars);
  }
  vars.subscriptionID = `${vars.subscriptionID ?? ''}`;
  vars.testID = ``;
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.payment = `cc`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_083 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_083}}`;
  await extractFourDigitsOfCC(page, vars);
  await addSimpleSubscriptionProductToCartVirtual(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
}

// GI: "BLU-001-083 A scart-992 - Create subscription" (6633ced61aac3ea14f22f01f)
export async function bLU001083AScart992CreateSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001083AScart992CreateSubscription(page, vars);
}

// GI: "BLU-001-083 B scart-992 - Cancel subscription from BS control panel" (69049f8f1a085ce44e200351)
export async function bLU001083BScart992CancelSubscriptionFromBSControlPanel(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.transaction_id = `${vars.transaction_id ?? ''}`;
  vars.bluSnSubId = `${vars.bluSnSubId ?? ''}`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  vars.transaction_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const transaction_id = document.querySelector<HTMLAnchorElement>('#order_data > p > a, #order_data > div.order_data_header > div:nth-child(1) > p > a').innerText;
return transaction_id }, vars);
  await page.locator(`#order_data > p > a`).or(page.locator(`#order_data > div.order_data_header > div:nth-child(1) > p > a`)).filter({ visible: true }).first().click({ force: true });
  await blueSnapSandboxEndLookForTransaction(page, vars);
  await expect(page.locator(`tr:nth-child(4) > td.plain9BlackOnNone > span`).first()).toHaveText(`Active`);
  vars.bluSnSubId = ((await page.locator(`legend > a`).textContent()) ?? '').trim();
  await page.locator(`td > #btnCancelSubscription1`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#cancelSubscriptionBox1 > input`).first().fill(`Test Scart-992`); } catch { await page.locator(`#cancelSubscriptionBox1 > input`).first().selectOption(`Test Scart-992`); }
  await page.locator(`#cancelSubscriptionBox1 > button.btn.btn-warning`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#subInfo1 > div > table > tbody > tr:nth-child(4) > td.plain9BlackOnNone`).first()).toContainText(` Subscription has been canceled`);
}

// GI: "BLU-001-083 B scart-992 - Cancel subscription from BS control panel" (6633ced61aac3ea14f22f020)
export async function bLU001083BScart992CancelSubscriptionFromBSControlPanel(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001083BScart992CancelSubscriptionFromBSControlPanel(page, vars);
}

// GI: "BLU-001-083 C scart-992 - Renew subscription as user" (69049f8f1a085ce44e200352)
export async function bLU001083CScart992RenewSubscriptionAsUser(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscriptionID = `${vars.subscriptionID ?? ''}`;
  vars.bluSnSubId = `${vars.bluSnSubId ?? ''}`;
  await page.goto(`${vars.startUrl ?? ''}/my-account/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`form > p:nth-child(3) > button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`nav > ul > li:nth-child(4) > a`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`header.entry-header > h1`).first()).toContainText(`Subscription #${vars.subscriptionID ?? ''}`);
  await page.locator(`td > a.subscription_renewal_early`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`div > ul.woocommerce-error > li`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toContainText(`Subscription service failure because subscription ID: ${vars.bluSnSubId ?? ''} cannot be found.`);
}

// GI: "BLU-001-083 C scart-992 - Renew subscription as user" (6633ced61aac3ea14f22f021)
export async function bLU001083CScart992RenewSubscriptionAsUser(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001083CScart992RenewSubscriptionAsUser(page, vars);
}

// GI: "BLU-001-083 D scart-992 - Verify failed order as admin" (69049f8f1a085ce44e200353)
export async function bLU001083DScart992VerifyFailedOrderAsAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await goToSubscriptionWithAdmin(page, vars);
  await page.locator(`ul > li:nth-child(1) > div > p > a`).or(page.locator(`#subscription_renewal_orders > div.inside > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Failed`);
  await expect(page.locator(`ul > li > div > p`).first()).toContainText(`Error processing payment. Reason: Subscription service failure because subscription ID: ${vars.bluSnSubId ?? ''} cannot be found. Order status changed from Pending payment to Failed.`);
}

// GI: "BLU-001-083 D scart-992 - Verify failed order as admin" (6633ced61aac3ea14f22f022)
export async function bLU001083DScart992VerifyFailedOrderAsAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001083DScart992VerifyFailedOrderAsAdmin(page, vars);
}

// GI: "BLU-001-084-pay renewal after failed payment - scart-997" (69049f8f1a085ce44e200354)
export async function bLU001084PayRenewalAfterFailedPaymentScart997(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.order = `fail`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_080 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email-BLU-001_080}}`;
  vars.email = `{{email-BLU-001_080}}`;
  await extractFourDigitsOfCC(page, vars);
  await register(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscriptionLoggedUser(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getVariablesForSubscriptions(page, vars);
  await forceRenewOrderToFail(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key=wc_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await useVisaDecline(page, vars);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="wc-bluesnap-payment-token-new"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wc-bluesnap-payment-token-new`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillCCInfo26X(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Renew subscription")]`).or(page.locator(`#place_order`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//div[contains(text(), "Renew subscription")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`.woocommerce-error`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toHaveText(`This is the new error message for 14002|INCORRECT_INFORMATION`);
  await paymentSectionEnabled(page, vars);
  await useMASTER(page, vars);
  await fillCCInfo26X(page, vars);
  await renewSubscription(page, vars);
}

// GI: "BLU-001-084-pay renewal after failed payment - scart-997" (6633ced61aac3ea14f22f023)
export async function bLU001084PayRenewalAfterFailedPaymentScart997(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001084PayRenewalAfterFailedPaymentScart997(page, vars);
}

// GI: "BLU-003-061" (69049f8f1a085ce44e200355)
export async function bLU003061(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`select[name="bluesnap_currency_selector"]`)).not.toHaveCount(0);
  await addSimpleProductToCart(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let rates = vars.rates
return rates.request.datetime }, vars);
  await settingsDeactivateMultiCurrency(page, vars);
  await page.reload();
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await expect(page.locator(`select[name="bluesnap_currency_selector"]`)).toHaveCount(0);
  await addSimpleProductToCartDownloadable(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let rates = vars.rates
return `${vars.date}` === rates.request.datetime }, vars)).toBeTruthy();
  await settingsActivateMultiCurrency(page, vars);
}

// GI: "BLU-003-061" (6633ced61aac3ea14f22f024)
export async function bLU003061(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU003061(page, vars);
}
