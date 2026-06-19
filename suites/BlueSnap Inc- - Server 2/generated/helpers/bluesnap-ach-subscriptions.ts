// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - ACH - Subscriptions"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { addSimpleSubscriptionProductToCartDownloadable, addSimpleSubscriptionProductToCartVirtual, addVariableSubscriptionProductToCart, addVariableSubscriptionProductToCartDaily, blueSnapSandboxEndRefund, checkACHCCSavedOnCheckout, checkCartIsEmpty, checkTranscationIsPresentOnOrderBackend, deactivatePayPal, extractDate, extractFourDigitsOfCC, extractPftoken, fillACHInfo, fillBillingDetails, fillCCInfo26X, fillCheckoutDataSubscription, forceRenewOrderToFail, getAltTransactionDetailsFromBluesnap, getBlueSnapVersion, getGroupLogRequestResponse, getLogRequestResponseIPN, getLogRequestResponseRecurringOndemand, getLogRequestResponseRecurringOndemandSubsID, getLogRequestResponseRefunds, getLogRequestResponseUpgrade, getSiteTitle, getTransactionDetailsFromBluesnap, getWooOrderDetails, getWooSubscriptionDetails, goToOrderWithAdmin, logIn, loginAdmin, paymentMethodMenuACHCCAvailable, placeOrder, placeOrderButtonEnabled, register, renewByAdmin, runSpecificForRenewOrders, subscriptionMenu, upgradeSubscription, useMASTER, verifyEmailAdminAndCustomer, verifyEmailOnlyAdmin, verifyEmailOnlyCustomer, verifyLogsTRAUTHCAPTUREChangePM26X, verifyLogsTRAUTHCAPTURERefund, verifyLogsTRAUTHCAPTURERenewal, verifyLogsTRAUTHCAPTUREUpgrade26X, verifyLogsTRNewShopperAUTHCAPTUREACHSubscription, verifyNoVaultedShopperRequest } from './bluesnap-common-steps-for-suites';
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

// GI: "BLU-002-018" (6846ef70388232057b7502e0)
export async function bLU002018(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getSiteTitle(page, vars);
  await getBlueSnapVersion(page, vars);
  await deactivatePayPal(page, vars);
  vars.email_BLU-002-018 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-018}}`;
  vars.product = `subscription`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `Pending`;
  await addSimpleSubscriptionProductToCartVirtual(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTUREACHSubscription(page, vars);
  await subscriptionMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  vars.transaction_id018 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber018 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID018 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId018 = `${vars.vaultedShopperId ?? ''}`;
  vars.total018 = `${vars.total ?? ''}`;
  vars.totalRenew018 = `${vars.totalRenew ?? ''}`;
  vars.shippingTotal018 = `${vars.shippingTotal ?? ''}`;
  vars.shippingTaxTotal018 = `${vars.shippingTaxTotal ?? ''}`;
  vars.myOrder018 = `${vars.myOrder ?? ''}`;
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-018" (6633cc7f1aac3ea14f22460e)
export async function bLU002018(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018(page, vars);
}

// GI: "BLU-002-018" (6846f4e7388232057b76067c)
export async function bLU002018(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018(page, vars);
}

// GI: "BLU-002-018 - Admin side" (6846ef70388232057b7502e1)
export async function bLU002018AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).or(page.locator(`a[href="admin.php?page=wc-orders--shop_subscription"]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`tr.iedit.author-other.level-1.type-shop_subscription.hentry:nth-of-type(1) > td.status.column-status > mark.subscription-status.order-status.tips > span`).or(page.locator(`tr.type-shop_subscription:nth-of-type(1) > td.status.column-status > mark.subscription-status.order-status.tips > span`)).first()).toHaveText(`${vars.subStatus ?? ''}`);
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`tr.iedit.level-1.type-shop_subscription.hentry:nth-of-type(1) > td.recurring_total.column-recurring_total > small.meta`).or(page.locator(`tr.type-shop_subscription:nth-of-type(1) > td.recurring_total.column-recurring_total > small.meta`)).first()).toContainText(`Via ${vars.paymentMethodTitle ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionID ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementsByClassName("order-status")
let n = element.length
let text = element[n-1].innerText
return text === "On hold" }, vars)) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pending`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementsByClassName("order-status")
let n = element.length
let text = element[n-1].innerText
return text === "Processing" }, vars)) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  }
  await expect(page.locator(`.bluesnap_ach`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-018 - Admin side" (6633cc7f1aac3ea14f22460f)
export async function bLU002018AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018AdminSide(page, vars);
}

// GI: "BLU-002-018 - Admin side" (6846f4e7388232057b76067d)
export async function bLU002018AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018AdminSide(page, vars);
}

// GI: "BLU-002-018 for BLU-002-023" (6846ef70388232057b7502e2)
export async function bLU002018ForBLU002023(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-023 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-023}}`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `On hold`;
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  vars.transaction_id023 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber023 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID023 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId023 = `${vars.vaultedShopperId ?? ''}`;
  vars.total023 = `${vars.total ?? ''}`;
  vars.subsID023 = `${vars.subsID ?? ''}`;
  vars.totalRenew023 = `${vars.totalRenew ?? ''}`;
  vars.myOrder023 = `${vars.myOrder ?? ''}`;
}

// GI: "BLU-002-018 for BLU-002-023" (6633cc7f1aac3ea14f224610)
export async function bLU002018ForBLU002023(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002023(page, vars);
}

// GI: "BLU-002-018 for BLU-002-023" (6846f4e7388232057b76067e)
export async function bLU002018ForBLU002023(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002023(page, vars);
}

// GI: "BLU-002-018 for BLU-002-024" (6846ef70388232057b7502e3)
export async function bLU002018ForBLU002024(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-024 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-024}}`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `On hold`;
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  vars.transaction_id024 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber024 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID024 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId024 = `${vars.vaultedShopperId ?? ''}`;
  vars.total024 = `${vars.total ?? ''}`;
  vars.subsID024 = `${vars.subsID ?? ''}`;
  vars.totalRenew024 = `${vars.totalRenew ?? ''}`;
}

// GI: "BLU-002-018 for BLU-002-024" (6633cc7f1aac3ea14f224611)
export async function bLU002018ForBLU002024(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002024(page, vars);
}

// GI: "BLU-002-018 for BLU-002-024" (6846f4e7388232057b76067f)
export async function bLU002018ForBLU002024(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002024(page, vars);
}

// GI: "BLU-002-018 for BLU-002-025" (6846ef70388232057b7502e4)
export async function bLU002018ForBLU002025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-025 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-025}}`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `On hold`;
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  vars.transaction_id025 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber025 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID025 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId025 = `${vars.vaultedShopperId ?? ''}`;
  vars.total025 = `${vars.total ?? ''}`;
  vars.totalRenew025 = `${vars.totalRenew ?? ''}`;
  vars.subsID025 = `${vars.subsID ?? ''}`;
}

// GI: "BLU-002-018 for BLU-002-025" (6633cc7f1aac3ea14f224612)
export async function bLU002018ForBLU002025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002025(page, vars);
}

// GI: "BLU-002-018 for BLU-002-025" (6846f4e7388232057b760680)
export async function bLU002018ForBLU002025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002025(page, vars);
}

// GI: "BLU-002-018 for BLU-002-026" (6846ef70388232057b7502e5)
export async function bLU002018ForBLU002026(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-026 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-026}}`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `On hold`;
  await addSimpleSubscriptionProductToCartDownloadable(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  vars.transaction_id026 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber026 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID026 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId026 = `${vars.vaultedShopperId ?? ''}`;
  vars.total026 = `${vars.total ?? ''}`;
  vars.totalRenew026 = `${vars.totalRenew ?? ''}`;
  vars.subsID026 = `${vars.subsID ?? ''}`;
  vars.myOrder026 = `${vars.myOrder ?? ''}`;
}

// GI: "BLU-002-018 for BLU-002-026" (6633cc7f1aac3ea14f224613)
export async function bLU002018ForBLU002026(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002026(page, vars);
}

// GI: "BLU-002-018 for BLU-002-026" (6846f4e7388232057b760681)
export async function bLU002018ForBLU002026(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002026(page, vars);
}

// GI: "BLU-002-018 for BLU-002-027" (6846ef70388232057b7502e6)
export async function bLU002018ForBLU002027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-027 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-027}}`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `On hold`;
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  vars.transaction_id027 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber027 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID027 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId027 = `${vars.vaultedShopperId ?? ''}`;
  vars.subsID027 = `${vars.subsID ?? ''}`;
  vars.total027 = `${vars.total ?? ''}`;
  vars.totalRenew027 = `${vars.totalRenew ?? ''}`;
}

// GI: "BLU-002-018 for BLU-002-027" (6633cc7f1aac3ea14f224614)
export async function bLU002018ForBLU002027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002027(page, vars);
}

// GI: "BLU-002-018 for BLU-002-027" (6846f4e7388232057b760682)
export async function bLU002018ForBLU002027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002027(page, vars);
}

// GI: "BLU-002-018 for BLU-002-033" (6846ef70388232057b7502e7)
export async function bLU002018ForBLU002033(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-033 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-033}}`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `On hold`;
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  vars.transaction_id033 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber033 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID033 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId033 = `${vars.vaultedShopperId ?? ''}`;
  vars.subsID033 = `${vars.subsID ?? ''}`;
  vars.total033 = `${vars.total ?? ''}`;
  vars.totalRenew033 = `${vars.totalRenew ?? ''}`;
}

// GI: "BLU-002-018 for BLU-002-033" (6633cc7f1aac3ea14f224615)
export async function bLU002018ForBLU002033(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002033(page, vars);
}

// GI: "BLU-002-018 for BLU-002-033" (6846f4e7388232057b760683)
export async function bLU002018ForBLU002033(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002033(page, vars);
}

// GI: "BLU-002-018 for BLU-002-034" (6846ef70388232057b7502e8)
export async function bLU002018ForBLU002034(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-034 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-034}}`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `On hold`;
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  vars.transaction_id034 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber034 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID034 = `${vars.subscriptionID ?? ''}`;
  vars.vaultedShopperId034 = `${vars.vaultedShopperId ?? ''}`;
  vars.totalRenew034 = `${vars.totalRenew ?? ''}`;
  vars.total034 = `${vars.total ?? ''}`;
  vars.subsID034 = `${vars.subsID ?? ''}`;
}

// GI: "BLU-002-018 for BLU-002-034" (6633cc7f1aac3ea14f224616)
export async function bLU002018ForBLU002034(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002034(page, vars);
}

// GI: "BLU-002-018 for BLU-002-034" (6846f4e7388232057b760684)
export async function bLU002018ForBLU002034(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002018ForBLU002034(page, vars);
}

// GI: "BLU-002-019" (6846ef70388232057b7502e9)
export async function bLU002019(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-019 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-019}}`;
  vars.user = `new`;
  vars.test = `subscription`;
  vars.trans = `declined`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberD ?? ''}`;
  vars.routingNumber = `${vars.routingNumberD ?? ''}`;
  vars.status = `On hold`;
  vars.subStatus = `Pending`;
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillACHInfo(page, vars);
  await placeOrder(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await subscriptionMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getWooOrderDetails(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTUREACHSubscription(page, vars);
  vars.transaction_id019 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber019 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID019 = `${vars.subscriptionID ?? ''}`;
}

// GI: "BLU-002-019" (6633cc7f1aac3ea14f224617)
export async function bLU002019(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002019(page, vars);
}

// GI: "BLU-002-019" (6846f4e7388232057b760685)
export async function bLU002019(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002019(page, vars);
}

// GI: "BLU-002-019 - Admin side" (6846ef70388232057b7502ea)
export async function bLU002019AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).or(page.locator(`a[href="admin.php?page=wc-orders--shop_subscription"]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`tr.iedit.level-1.type-shop_subscription.hentry:nth-of-type(1) > td.status.column-status > mark.subscription-status.order-status.tips > span`).or(page.locator(`tr.type-shop_subscription:nth-of-type(1) > td.status.column-status > mark.subscription-status.order-status.tips > span`)).first()).toHaveText(`${vars.subStatus ?? ''}`);
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`tr.iedit.level-1.type-shop_subscription.hentry:nth-of-type(1) > td.recurring_total.column-recurring_total > small.meta`).or(page.locator(`tr.type-shop_subscription:nth-of-type(1) > td.recurring_total.column-recurring_total > small.meta`)).first()).toContainText(`Via ${vars.paymentMethodTitle ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionID ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementsByClassName("order-status")
let n = element.length
let text = element[n-1].innerText
return text === "On hold" }, vars)) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pending`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementsByClassName("order-status")
let n = element.length
let text = element[n-1].innerText
return text === "Failed" }, vars)) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pending`);
  }
  await expect(page.locator(`.bluesnap_ach`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-019 - Admin side" (6633cc7f1aac3ea14f224618)
export async function bLU002019AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002019AdminSide(page, vars);
}

// GI: "BLU-002-019 - Admin side" (6846f4e7388232057b760686)
export async function bLU002019AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002019AdminSide(page, vars);
}

// GI: "BLU-002-020" (6846ef70388232057b7502eb)
export async function bLU002020(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `{{email_BLU-002-018}}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId018 ?? ''}`;
  vars.user = `old`;
  vars.payment = `ach`;
  await logIn(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap_ach"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap_ach`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap_ach`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await checkACHCCSavedOnCheckout(page, vars);
  await expect(page.locator(`#wc-bluesnap_ach-payment-token-new`)).toHaveCount(0);
}

// GI: "BLU-002-020" (6633cc7f1aac3ea14f224619)
export async function bLU002020(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002020(page, vars);
}

// GI: "BLU-002-020" (6846f4e7388232057b760687)
export async function bLU002020(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002020(page, vars);
}

// GI: "BLU-002-021" (6846ef70388232057b7502ec)
export async function bLU002021(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `{{email_BLU-002-018}}`;
  vars.payment = `ach`;
  vars.test = `002-021`;
  await logIn(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await page.locator(`a[href*="/my-account/add-payment-method/"]`).or(page.locator(`xpath=//a[contains(text(), "Add payment method")]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#payment_method_bluesnap_ach`)).toHaveCount(0);
}

// GI: "BLU-002-021" (6633cc7f1aac3ea14f22461a)
export async function bLU002021(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002021(page, vars);
}

// GI: "BLU-002-021" (6846f4e7388232057b760688)
export async function bLU002021(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002021(page, vars);
}

// GI: "BLU-002-022" (6846ef70388232057b7502ed)
export async function bLU002022(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `002-022`;
  vars.user = `new`;
  vars.email_BLU-002-022 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-022}}`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.email_BLU-002-022 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email_BLU-002-022}}`;
  await register(page, vars);
  await fillBillingDetails(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toHaveText(`Payment methods`);
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await fillACHInfo(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toHaveText(`Payment method successfully added.`);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toHaveText(`Payment methods`);
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await fillACHInfo(page, vars);
  await page.waitForTimeout(60000);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toHaveText(`Payment method successfully added.`);
  await addVariableSubscriptionProductToCart(page, vars);
  await expect(page.locator(`.woocommerce > .woocommerce-info`).or(page.locator(`.woocommerce > .wc-block-components-notice-banner.is-info`)).or(page.locator(`.woocommerce > div > div.woocommerce-info`)).or(page.locator(`div.wc-block-components-notices > div > div.wc-block-components-notice-banner__content > div`)).first()).toHaveText(`ACH/ECP Transactions is not currently available for subscription products when there are multiple saved accounts.`);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('.checkout.woocommerce-checkout') }, vars)) {
    await expect(page.locator(`#payment_method_bluesnap_ach`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('.wp-block-woocommerce-checkout') }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap_ach`)).toHaveCount(0);
  }
}

// GI: "BLU-002-022" (6633cc7f1aac3ea14f22461b)
export async function bLU002022(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002022(page, vars);
}

// GI: "BLU-002-022" (6846f4e7388232057b760689)
export async function bLU002022(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002022(page, vars);
}

// GI: "BLU-002-023" (6846ef70388232057b7502ee)
export async function bLU002023(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email = `{{email_BLU-002-023}}`;
  vars.username = `{{email_BLU-002-023}}`;
  vars.product = `subscription`;
  vars.checklogs = ``;
  vars.test = `subscription`;
  vars.user = `old`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.status = `On hold`;
  vars.subStatus = `Active`;
  await logIn(page, vars);
  vars.transaction_id = `${vars.transaction_id023 ?? ''}`;
  vars.orderNumber = `${vars.orderNumber023 ?? ''}`;
  vars.subscriptionID = `${vars.subscriptionID023 ?? ''}`;
  await getAltTransactionDetailsFromBluesnap(page, vars);
  vars.totalOld = `${vars.total023 ?? ''}`;
  vars.totalRenewOld = `${vars.totalRenew023 ?? ''}`;
  await subscriptionMenu(page, vars);
  vars.checklogs = `upgrade`;
  await upgradeSubscription(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
if (!element) {
    return false
} else {
    return true
} }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')

if (!element) {
    return false
} else {
    return true
} }, vars)) {
    await page.locator(`label:nth-of-type(1) > input[name='radio-control-wc-payment-method-saved-tokens']`).filter({ visible: true }).first().click({ force: true });
  }
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  vars.transaction_id023u = `${vars.transaction_id ?? ''}`;
  vars.total023u = `${vars.total ?? ''}`;
  vars.orderNumber023u = `${vars.orderNumber ?? ''}`;
  vars.totalRenew023u = `${vars.totalRenew ?? ''}`;
  vars.subscriptionID023 = `${vars.subscriptionID ?? ''}`;
  vars.subsID023 = `${vars.subsID ?? ''}`;
  vars.vaultedShopperId023 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-002-023" (6633cc7f1aac3ea14f22461c)
export async function bLU002023(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002023(page, vars);
}

// GI: "BLU-002-023" (6846f4e7388232057b76068a)
export async function bLU002023(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002023(page, vars);
}

// GI: "BLU-002-024" (6846ef70388232057b7502ef)
export async function bLU002024(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email = `{{email_BLU-002-024}}`;
  vars.username = `{{email_BLU-002-024}}`;
  vars.product = `subscription`;
  vars.checklogs = ``;
  vars.test = `subscription`;
  vars.upgradeTo = `cc`;
  vars.user = `old`;
  vars.trans = `accepted`;
  vars.status = `Processing`;
  vars.subStatus = `Active`;
  await logIn(page, vars);
  vars.transaction_id = `${vars.transaction_id024 ?? ''}`;
  vars.orderNumber = `${vars.orderNumber024 ?? ''}`;
  vars.subscriptionID = `${vars.subscriptionID024 ?? ''}`;
  await getAltTransactionDetailsFromBluesnap(page, vars);
  vars.totalOld = `${vars.total024 ?? ''}`;
  vars.totalRenewOld = `${vars.totalRenew024 ?? ''}`;
  await subscriptionMenu(page, vars);
  vars.checklogs = `upgrade`;
  vars.payment = `cc`;
  await upgradeSubscription(page, vars);
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await blockUI(page, vars);
  await extractPftoken(page, vars);
  await fillCCInfo26X(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await subscriptionMenu(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseUpgrade(page, vars);
  await verifyLogsTRAUTHCAPTUREUpgrade26X(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  vars.transaction_id024 = `${vars.transaction_id ?? ''}`;
  vars.total024 = `${vars.total ?? ''}`;
  vars.orderNumber024 = `${vars.orderNumber ?? ''}`;
  vars.totalRenew024 = `${vars.totalRenew ?? ''}`;
  vars.subsID024 = `${vars.subsID ?? ''}`;
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-024" (6633cc7f1aac3ea14f22461d)
export async function bLU002024(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002024(page, vars);
}

// GI: "BLU-002-024" (6846f4e7388232057b76068b)
export async function bLU002024(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002024(page, vars);
}

// GI: "BLU-002-025" (6846ef70388232057b7502f0)
export async function bLU002025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email = `{{email_BLU-002-025}}`;
  vars.username = `{{email_BLU-002-025}}`;
  vars.product = `subscription`;
  vars.test = `subscription`;
  vars.paymentMethodTitle = `Via Credit/Debit Card`;
  vars.user = `old`;
  vars.trans = `accepted`;
  vars.payment = `cc`;
  vars.status = `On hold`;
  vars.subStatus = `Active`;
  await logIn(page, vars);
  vars.transaction_id = `${vars.transaction_id025 ?? ''}`;
  vars.orderNumber = `${vars.orderNumber025 ?? ''}`;
  vars.subscriptionID = `${vars.subscriptionID025 ?? ''}`;
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  vars.total = `${vars.total025 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew025 ?? ''}`;
  await subscriptionMenu(page, vars);
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Change payment")]`).or(page.locator(`a[href*="/checkout/order-pay/${vars.subscriptionID ?? ''}/?pay_for_order=true&key=wc_order_"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#payment_method_bluesnap_ach`)).toHaveCount(0);
  await fillCCInfo26X(page, vars);
  await extractDate(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  vars.totalOld = `${vars.total ?? ''}`;
  await blockUI(page, vars);
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method updated.`);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseUpgrade(page, vars);
  await verifyLogsTRAUTHCAPTUREChangePM26X(page, vars);
  vars.subsID025 = `${vars.subsID ?? ''}`;
  vars.vaultedShopperId025 = `${vars.vaultedShopperId ?? ''}`;
}

// GI: "BLU-002-025" (6633cc7f1aac3ea14f22461e)
export async function bLU002025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002025(page, vars);
}

// GI: "BLU-002-025" (6846f4e7388232057b76068c)
export async function bLU002025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002025(page, vars);
}

// GI: "BLU-002-026" (6846ef70388232057b7502f1)
export async function bLU002026(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Completed`;
  vars.checklogs = ``;
  vars.email = `{{email_BLU-002-026}}`;
  vars.subscriptionID = `${vars.subscriptionID026 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id026 ?? ''}`;
  vars.total = `${vars.total026 ?? ''}`;
  vars.myOrder = `${vars.myOrder026 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew026 ?? ''}`;
  vars.orderNumber = `${vars.orderNumber026 ?? ''}`;
  vars.product = `subscription`;
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  vars.subStatus = `Active`;
  vars.subStatusACH = `On hold`;
  vars.payment = `ach`;
  await verifyEmailOnlyCustomer(page, vars);
  await loginAdmin(page, vars);
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
  vars.renewID026 = `${vars.renewID ?? ''}`;
  vars.transaction_id026r = `${vars.transaction_id ?? ''}`;
  vars.subsID026 = `${vars.subsID ?? ''}`;
  vars.myOrder026r = `${vars.myOrder ?? ''}`;
}

// GI: "BLU-002-026" (6633cc7f1aac3ea14f22461f)
export async function bLU002026(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002026(page, vars);
}

// GI: "BLU-002-026" (6846f4e7388232057b76068d)
export async function bLU002026(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002026(page, vars);
}

// GI: "BLU-002-027" (6846ef70388232057b7502f2)
export async function bLU002027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.subStatus = `Active`;
  vars.email = `{{email_BLU-002-027}}`;
  vars.subscriptionID = `${vars.subscriptionID027 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew027 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id027 ?? ''}`;
  vars.orderNumber = `${vars.orderNumber027 ?? ''}`;
  vars.payment = `cc`;
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`{{email_BLU-002-027}}`); } catch { await page.locator(`#username`).first().selectOption(`{{email_BLU-002-027}}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await subscriptionMenu(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Renew now")]`).or(page.locator(`a[href*="/my-account/?subscription_renewal_early=${vars.subscriptionID ?? ''}&subscription_renewal=true"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await expect(page.locator(`.wc_payment_method.payment_method_bluesnap_ach`).or(page.locator(`div > label[for='radio-control-wc-payment-method-options-bluesnap_ach']`))).not.toHaveCount(0);
  await fillCCInfo26X(page, vars);
  await placeOrderButtonEnabled(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Renew subscription")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  vars.renewOrder = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).first()).toContainText(`#${vars.subscriptionID ?? ''}`);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`).or(page.locator(`td > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`)).or(page.locator(`th > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toHaveText(`${vars.status ?? ''}`);
  vars.orderNumber = `${vars.renewOrder ?? ''}`;
  await getWooOrderDetails(page, vars);
  await subscriptionMenu(page, vars);
  await checkCartIsEmpty(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.renewID027 = `${vars.renewID ?? ''}`;
  vars.subsID027 = `${vars.subsID ?? ''}`;
  vars.transaction_id027 = `${vars.transaction_id ?? ''}`;
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-027" (6633cc7f1aac3ea14f224620)
export async function bLU002027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002027(page, vars);
}

// GI: "BLU-002-027" (6846f4e7388232057b76068e)
export async function bLU002027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002027(page, vars);
}

// GI: "BLU-002-028" (6846ef70388232057b7502f3)
export async function bLU002028(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  vars.status = `On hold`;
  vars.subStatus = `Active`;
  vars.email = `{{email_BLU-002-018}}`;
  vars.subscriptionID = `${vars.subscriptionID018 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew018 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id018 ?? ''}`;
  vars.orderNumber = `${vars.orderNumber018 ?? ''}`;
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`{{email_BLU-002-018}}`); } catch { await page.locator(`#username`).first().selectOption(`{{email_BLU-002-018}}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await subscriptionMenu(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Renew now")]`).or(page.locator(`a[href*="/my-account/?subscription_renewal_early=${vars.subscriptionID ?? ''}&subscription_renewal=true"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
if (!element) {
    return false
} else {
    return true
} }, vars)) {
    await expect(page.locator(`.wc_payment_method.payment_method_bluesnap_ach`)).not.toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
if (!element) {
    return false
} else {
    return true
} }, vars)) {
    await page.locator(`.wc_payment_method.payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')

if (!element) {
    return false
} else {
    return true
} }, vars)) {
    await expect(page.locator(`label:nth-of-type(1) > input[name='radio-control-wc-payment-method-saved-tokens']`)).not.toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')

if (!element) {
    return false
} else {
    return true
} }, vars)) {
    await page.locator(`label:nth-of-type(1) > input[name='radio-control-wc-payment-method-saved-tokens']`).filter({ visible: true }).first().click({ force: true });
  }
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
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number >`).or(page.locator(`th > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`)).or(page.locator(`td > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toHaveText(`${vars.status ?? ''}`);
  vars.orderNumber = `${vars.renewOrder ?? ''}`;
  await getWooOrderDetails(page, vars);
  vars.subStatus = `Active`;
  vars.manualRenew = `Yes`;
  await subscriptionMenu(page, vars);
  await checkCartIsEmpty(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.orderNumber018r = `${vars.orderNumber ?? ''}`;
  vars.transaction_id018r = `${vars.transaction_id ?? ''}`;
  vars.myOrder018r = `${vars.myOrder ?? ''}`;
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-028" (6633cc7f1aac3ea14f224621)
export async function bLU002028(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002028(page, vars);
}

// GI: "BLU-002-028" (6846f4e7388232057b76068f)
export async function bLU002028(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002028(page, vars);
}

// GI: "BLU-002-029" (6846ef70388232057b7502f4)
export async function bLU002029(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscriptionID = `${vars.subscriptionID025 ?? ''}`;
  vars.email = `{{email_BLU-002-025}}`;
  vars.testID = `BLU-002-029`;
  await getWooSubscriptionDetails(page, vars);
  vars.total = `${vars.total025 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew025 ?? ''}`;
  vars.subsID = `${vars.subsID025 ?? ''}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId025 ?? ''}`;
  vars.payment = `cc`;
  vars.subStatus = `Active`;
  vars.subStatusACH = `On hold`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-029" (6633cc7f1aac3ea14f224622)
export async function bLU002029(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002029(page, vars);
}

// GI: "BLU-002-029" (6846f4e7388232057b760690)
export async function bLU002029(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002029(page, vars);
}

// GI: "BLU-002-030" (6846ef70388232057b7502f5)
export async function bLU002030(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.checklogs = `upgrade`;
  vars.paymentMethodTitle = `ACH/ECP Transactions`;
  vars.subscriptionID = `${vars.subscriptionID023 ?? ''}`;
  vars.email = `{{email_BLU-002-023}}`;
  vars.orderNumber = `${vars.orderNumber023u ?? ''}`;
  vars.total = `${vars.total023u ?? ''}`;
  vars.transaction_id = `${vars.transaction_id023u ?? ''}`;
  vars.subsID = `${vars.subsID023 ?? ''}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId023 ?? ''}`;
  vars.subStatus = `Active`;
  vars.subStatusACH = `On hold`;
  vars.payment = `ach`;
  await page.waitForTimeout(180000);
  await runSpecificForRenewOrders(page, vars);
  await page.waitForTimeout(120000);
  await verifyEmailAdminAndCustomer(page, vars);
  vars.checklogs = ``;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await getWooSubscriptionDetails(page, vars);
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
let totalRenew = vars.totalRenew
return total === totalRenew }, vars)).toBeTruthy();
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.subsID030 = `${vars.subsID ?? ''}`;
  vars.orderNumber030 = `${vars.orderNumber ?? ''}`;
  vars.transaction_id030 = `${vars.transaction_id ?? ''}`;
  vars.myOrder030 = `${vars.myOrder ?? ''}`;
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-030" (6633cc7f1aac3ea14f224623)
export async function bLU002030(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002030(page, vars);
}

// GI: "BLU-002-030" (6846f4e7388232057b760691)
export async function bLU002030(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002030(page, vars);
}

// GI: "BLU-002-031" (6846ef70388232057b7502f6)
export async function bLU002031(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscriptionID = `${vars.subscriptionID024 ?? ''}`;
  vars.checklogs = ``;
  vars.email = `{{email_BLU-002-024}}`;
  vars.totalRenew = `${vars.totalRenew024 ?? ''}`;
  vars.testID = `BLU-002-031`;
  vars.subsID = `${vars.subsID024 ?? ''}`;
  vars.payment = `cc`;
  vars.transaction_id = `${vars.transaction_id024 ?? ''}`;
  await getTransactionDetailsFromBluesnap(page, vars);
  vars.subStatus = `Active`;
  vars.paymentMethodTitle = `Credit/Debit Card`;
  vars.subStatusACH = `On hold`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
let totalRenew = vars.totalRenew

return total === totalRenew }, vars)).toBeTruthy();
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-031" (6633cc7f1aac3ea14f224624)
export async function bLU002031(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002031(page, vars);
}

// GI: "BLU-002-031" (6846f4e7388232057b760692)
export async function bLU002031(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002031(page, vars);
}

// GI: "BLU-002-032" (6846ef70388232057b7502f7)
export async function bLU002032(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await addVariableSubscriptionProductToCartDaily(page, vars);
  await expect(page.locator(`.woocommerce > .woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).or(page.locator(`.woocommerce .woocommerce-info`)).or(page.locator(`div.wc-block-components-notices > div > div.wc-block-components-notice-banner__content > div`)).first()).toContainText(`You can`);
  await expect(page.locator(`.woocommerce > .woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).or(page.locator(`.woocommerce .woocommerce-info`)).or(page.locator(`div.wc-block-components-notices > div > div.wc-block-components-notice-banner__content > div`)).first()).toContainText(`t purchase a subscription with a renewal period smaller than 1 week using ACH/ECP Transactions.`);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('.checkout.woocommerce-checkout') }, vars)) {
    await expect(page.locator(`#payment_method_bluesnap_ach`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('.wp-block-woocommerce-checkout') }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap_ach`)).toHaveCount(0);
  }
}

// GI: "BLU-002-032" (6633cc7f1aac3ea14f224625)
export async function bLU002032(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002032(page, vars);
}

// GI: "BLU-002-032" (6846f4e7388232057b760693)
export async function bLU002032(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002032(page, vars);
}

// GI: "BLU-002-033" (6846ef70388232057b7502f8)
export async function bLU002033(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.subscriptionID = `${vars.subscriptionID033 ?? ''}`;
  vars.email = `{{email_BLU-002-033}}`;
  vars.transaction_id = `${vars.transaction_id033 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew033 ?? ''}`;
  await getAltTransactionDetailsFromBluesnap(page, vars);
  vars.subsID033 = `${vars.subsID ?? ''}`;
  vars.order = `fail`;
  vars.payment = `cc`;
  vars.subStatus = `Active`;
  await useMASTER(page, vars);
  vars.username = `{{email_BLU-002-033}}`;
  vars.email = `{{email_BLU-002-033}}`;
  await logIn(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await forceRenewOrderToFail(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key=wc_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await fillCCInfo26X(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//*[contains(text(), "Renew subscription")]`).or(page.locator(`#place_order`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`.woocommerce-notice`).first()).toHaveText(`Thank you. Your order has been received.`);
  await getWooOrderDetails(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let order = vars.myOrder
return order.status === "processing" }, vars)).toBeTruthy();
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-033" (6633cc7f1aac3ea14f224626)
export async function bLU002033(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002033(page, vars);
}

// GI: "BLU-002-033" (6846f4e7388232057b760694)
export async function bLU002033(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002033(page, vars);
}

// GI: "BLU-002-034" (6846ef70388232057b7502f9)
export async function bLU002034(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.checklogs = ``;
  vars.subscriptionID = `${vars.subscriptionID034 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew034 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id034 ?? ''}`;
  await getAltTransactionDetailsFromBluesnap(page, vars);
  vars.order = `fail`;
  vars.payment = `ach`;
  vars.subStatus = `Active`;
  vars.username = `{{email_BLU-002-034}}`;
  vars.email = `{{email_BLU-002-034}}`;
  await logIn(page, vars);
  await forceRenewOrderToFail(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key=wc_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
if (!element) {
    return false
} else {
    return true
} }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')

if (!element) {
    return false
} else {
    return true
} }, vars)) {
    await page.locator(`label:nth-of-type(1) > input[name='radio-control-wc-payment-method-saved-tokens']`).filter({ visible: true }).first().click({ force: true });
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//*[contains(text(), "Renew subscription")]`).or(page.locator(`#place_order`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`.woocommerce-notice`).first()).toHaveText(`Thank you. Your order has been received.`);
  await getWooOrderDetails(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let order = vars.myOrder
return order.status === "on-hold" }, vars)).toBeTruthy();
  await getAltTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-034" (6633cc7f1aac3ea14f224627)
export async function bLU002034(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002034(page, vars);
}

// GI: "BLU-002-034" (6846f4e7388232057b760695)
export async function bLU002034(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002034(page, vars);
}

// GI: "BLU-002-045" (6846ef70388232057b7502fa)
export async function bLU002045(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `full`;
  vars.paymentMethodTitle = `ACH/ECP Transactions`;
  vars.orderNumber = `${vars.orderNumber033 ?? ''}`;
  vars.email = `{{email_BLU-002-033}}`;
  vars.total = `${vars.total033 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id033 ?? ''}`;
  vars.subscriptionID = `${vars.subscriptionID033 ?? ''}`;
  vars.testID = `BLU-002-045`;
  await getWooOrderDetails(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  try { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().fill(`${vars.shippingTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingTotal ?? ''}`); }
  try { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTaxTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTaxTotal ?? ''}`); }
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
}

// GI: "BLU-002-045" (6633cc7f1aac3ea14f224628)
export async function bLU002045(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002045(page, vars);
}

// GI: "BLU-002-045" (6846f4e7388232057b760696)
export async function bLU002045(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002045(page, vars);
}

// GI: "BLU-002-046" (6846ef70388232057b7502fb)
export async function bLU002046(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `partial`;
  vars.email = `{{email_BLU-002-034}}`;
  vars.transaction_id = `${vars.transaction_id034 ?? ''}`;
  vars.orderNumber = `${vars.orderNumber034 ?? ''}`;
  vars.total = `${vars.total034 ?? ''}`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Math.round((total/4) * 100) / 100;
return total }, vars);
  vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
total = total.toFixed(2)
return total }, vars);
  vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
total = total.toFixed(2)
return total }, vars);
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefundItem + vars.partialRefundTax
total = total.toFixed(2)
return total }, vars);
  try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  vars.testID = `BLU-002-046`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
}

// GI: "BLU-002-046" (6633cc7f1aac3ea14f224629)
export async function bLU002046(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002046(page, vars);
}

// GI: "BLU-002-046" (6846f4e7388232057b760697)
export async function bLU002046(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002046(page, vars);
}

// GI: "BLU-002-047" (6846ef70388232057b7502fc)
export async function bLU002047(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `full`;
  vars.email = `{{email_BLU-002-026}}`;
  vars.total = `${vars.totalRenew026 ?? ''}`;
  vars.orderNumber = `${vars.renewID026 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id026r ?? ''}`;
  vars.subsID = `${vars.subsID026 ?? ''}`;
  await runSpecificForRenewOrders(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  vars.testID = `BLU-002-047`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
}

// GI: "BLU-002-047" (6633cc7f1aac3ea14f22462a)
export async function bLU002047(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002047(page, vars);
}

// GI: "BLU-002-047" (6846f4e7388232057b760698)
export async function bLU002047(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002047(page, vars);
}

// GI: "BLU-002-048" (6846ef70388232057b7502fd)
export async function bLU002048(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `partial`;
  vars.email = `{{email_BLU-002-018}}`;
  vars.total = `${vars.totalRenew018 ?? ''}`;
  vars.orderNumber = `${vars.orderNumber018r ?? ''}`;
  vars.transaction_id = `${vars.transaction_id018r ?? ''}`;
  await getAltTransactionDetailsFromBluesnap(page, vars);
  vars.subsID018 = `${vars.subsID ?? ''}`;
  await runSpecificForRenewOrders(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = total/4
total = Math.round(total * 100) / 100
total = total.toFixed(2)
return total }, vars);
  vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
total = total.toFixed(2)
return total }, vars);
  vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
total = total.toFixed(2)
return total }, vars);
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefundItem + vars.partialRefundTax
total = total.toFixed(2)
return total }, vars);
  try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  vars.testID = `BLU-002-048`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
}

// GI: "BLU-002-048" (6633cc7f1aac3ea14f22462b)
export async function bLU002048(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002048(page, vars);
}

// GI: "BLU-002-048" (6846f4e7388232057b760699)
export async function bLU002048(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002048(page, vars);
}

// GI: "BLU-002-049" (6846ef70388232057b7502fe)
export async function bLU002049(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `partial`;
  vars.email = `{{email_BLU-002-034}}`;
  vars.orderNumber = `${vars.orderNumber034 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id034 ?? ''}`;
  vars.total = `${vars.total034 ?? ''}`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Math.round((total/4)*100) /100
return total }, vars);
  vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
total = total.toFixed(2)
return total }, vars);
  vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
total = total.toFixed(2)
return total }, vars);
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefundItem + vars.partialRefundTax
total = total.toFixed(2)
return total }, vars);
  try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  vars.testID = `BLU-002-049`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(1).refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  vars.partialRefund2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*2
return total }, vars);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund2 ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
}

// GI: "BLU-002-049" (6633cc7f1aac3ea14f22462c)
export async function bLU002049(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002049(page, vars);
}

// GI: "BLU-002-049" (6846f4e7388232057b76069a)
export async function bLU002049(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002049(page, vars);
}

// GI: "BLU-002-052 (Downloadable)" (6846ef70388232057b7502ff)
export async function bLU002052Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethodTitle = `ACH/ECP Transactions`;
  vars.test = `ipn`;
  vars.email = `{{email_BLU-002-026}}`;
  vars.prod = `downloadable`;
  vars.orderNumber = `${vars.orderNumber026 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id026 ?? ''}`;
  vars.subscription = `${vars.product ?? ''}`;
  vars.ach = `${vars.payment ?? ''}`;
  vars.status = `Completed`;
  vars.myOrder = `${vars.myOrder026 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.transactionType === "CHARGE";
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.transactionType === "CHARGE");

 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.referenceNumber === `${vars.transaction_id}`;
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.referenceNumber === `${vars.transaction_id}`);

 }, vars)).toBeTruthy();
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-052 (Downloadable)" (6633cc7f1aac3ea14f22462d)
export async function bLU002052Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002052Downloadable(page, vars);
}

// GI: "BLU-002-052 (Downloadable)" (6846f4e7388232057b76069b)
export async function bLU002052Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002052Downloadable(page, vars);
}

// GI: "BLU-002-052 (Physical)" (6846ef70388232057b750300)
export async function bLU002052Physical(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber023 ?? ''}`;
  vars.prod = ``;
  vars.transaction_id = `${vars.transaction_id023 ?? ''}`;
  vars.subscription = `${vars.product ?? ''}`;
  vars.ach = `${vars.payment ?? ''}`;
  vars.status = `Processing`;
  vars.myOrder = `${vars.myOrder023 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.transactionType === "CHARGE";
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.transactionType === "CHARGE");
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.referenceNumber === `${vars.transaction_id}`;
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.referenceNumber === `${vars.transaction_id}`);

 }, vars)).toBeTruthy();
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-052 (Physical)" (6633cc7f1aac3ea14f22462e)
export async function bLU002052Physical(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002052Physical(page, vars);
}

// GI: "BLU-002-052 (Physical)" (6846f4e7388232057b76069c)
export async function bLU002052Physical(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002052Physical(page, vars);
}

// GI: "BLU-002-052 (Virtual)" (6846ef70388232057b750301)
export async function bLU002052Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber018 ?? ''}`;
  vars.email = `{{email_BLU-002-018}}`;
  vars.transaction_id = `${vars.transaction_id018 ?? ''}`;
  vars.subscription = `${vars.product ?? ''}`;
  vars.ach = `${vars.payment ?? ''}`;
  vars.status = `Processing`;
  vars.myOrder = `${vars.myOrder018 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.transactionType === "CHARGE";
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.transactionType === "CHARGE");

 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.referenceNumber === `${vars.transaction_id}`;
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.referenceNumber === `${vars.transaction_id}`);

 }, vars)).toBeTruthy();
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-052 (Virtual)" (6633cc7f1aac3ea14f22462f)
export async function bLU002052Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002052Virtual(page, vars);
}

// GI: "BLU-002-052 (Virtual)" (6846f4e7388232057b76069d)
export async function bLU002052Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002052Virtual(page, vars);
}

// GI: "BLU-002-053" (6846ef70388232057b750302)
export async function bLU002053(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `${vars.orderNumber019 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id019 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.transactionType === "DECLINE";
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.transactionType === "DECLINE"); }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.referenceNumber === `${vars.transaction_id}`;
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.referenceNumber === `${vars.transaction_id}`);

 }, vars)).toBeTruthy();
  await verifyEmailOnlyAdmin(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Failed`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`BlueSnap ACH Declined ${vars.labeIPN ?? ''} request received. A chargeback has been created for this transaction. Reason: null – null. Order status changed from On hold to Failed.`);
  await page.waitForTimeout(180000);
}

// GI: "BLU-002-053" (6633cc7f1aac3ea14f224630)
export async function bLU002053(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002053(page, vars);
}

// GI: "BLU-002-053" (6846f4e7388232057b76069e)
export async function bLU002053(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002053(page, vars);
}

// GI: "BLU-002-054 (Downloadable)" (6846ef70388232057b750303)
export async function bLU002054Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Completed`;
  vars.prod = `downloadable`;
  vars.paymentMethodTitle = `ACH/ECP Transactions`;
  vars.email = `{{email_BLU-002-026}}`;
  vars.subsID = `${vars.subsID026 ?? ''}`;
  await runSpecificForRenewOrders(page, vars);
  vars.orderNumber = `${vars.renewID026 ?? ''}`;
  vars.transaction_id = `${vars.transaction_id026r ?? ''}`;
  vars.myOrder = `${vars.myOrder026r ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.transactionType === "RECURRING";
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.transactionType === "RECURRING"); }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.referenceNumber === `${vars.transaction_id}`;
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.referenceNumber === `${vars.transaction_id}`);

 }, vars)).toBeTruthy();
  await verifyEmailOnlyCustomer(page, vars);
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-054 (Downloadable)" (6633cc7f1aac3ea14f224631)
export async function bLU002054Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002054Downloadable(page, vars);
}

// GI: "BLU-002-054 (Downloadable)" (6846f4e7388232057b76069f)
export async function bLU002054Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002054Downloadable(page, vars);
}

// GI: "BLU-002-054 (Physical)" (6846ef70388232057b750304)
export async function bLU002054Physical(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.prod = ``;
  await page.waitForTimeout(180000);
  vars.subsID = `${vars.subsID030 ?? ''}`;
  await runSpecificForRenewOrders(page, vars);
  vars.orderNumber = `${vars.orderNumber030 ?? ''}`;
  vars.email = `{{email_BLU-002-023}}`;
  vars.transaction_id = `${vars.transaction_id030 ?? ''}`;
  vars.myOrder = `${vars.myOrder030 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.transactionType === "RECURRING";
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.transactionType === "RECURRING");

 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.referenceNumber === `${vars.transaction_id}`;
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.referenceNumber === `${vars.transaction_id}`);

 }, vars)).toBeTruthy();
  await verifyEmailOnlyCustomer(page, vars);
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-054 (Physical)" (6633cc7f1aac3ea14f224632)
export async function bLU002054Physical(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002054Physical(page, vars);
}

// GI: "BLU-002-054 (Physical)" (6846f4e7388232057b7606a0)
export async function bLU002054Physical(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002054Physical(page, vars);
}

// GI: "BLU-002-054 (Virtual)" (6846ef70388232057b750305)
export async function bLU002054Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.subsID = `${vars.subsID018 ?? ''}`;
  await runSpecificForRenewOrders(page, vars);
  vars.orderNumber = `${vars.orderNumber018r ?? ''}`;
  vars.email = `{{email_BLU-002-018}}`;
  vars.myOrder = `${vars.myOrder018r ?? ''}`;
  vars.transaction_id = `${vars.transaction_id018r ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.transactionType === "RECURRING";
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.transactionType === "RECURRING");

 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs

// Handle empty or invalid input
if (!logs || logs.length === 0) {
return false;
}

// If logs is not an array (i.e., a single object)
if (!Array.isArray(logs)) {
return logs.content.referenceNumber === `${vars.transaction_id}`;
}

// If logs is an array, check for any record with CHARGE
return logs.some(log => log.content.referenceNumber === `${vars.transaction_id}`);

 }, vars)).toBeTruthy();
  await verifyEmailOnlyCustomer(page, vars);
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-054 (Virtual)" (6633cc7f1aac3ea14f224633)
export async function bLU002054Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002054Virtual(page, vars);
}

// GI: "BLU-002-054 (Virtual)" (6846f4e7388232057b7606a1)
export async function bLU002054Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002054Virtual(page, vars);
}

// GI: "BLU-002-061" (6846ef70388232057b750306)
export async function bLU002061(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscriptionID = `${vars.subscriptionID027 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew027 ?? ''}`;
  vars.testID = `BLU-002-061`;
  vars.subsID = `${vars.subsID027 ?? ''}`;
  vars.payment = `cc`;
  vars.transaction_id = `${vars.transaction_id027 ?? ''}`;
  await getTransactionDetailsFromBluesnap(page, vars);
  vars.subStatus = `Active`;
  vars.paymentMethodTitle = `Credit/Debit Card`;
  vars.subStatusACH = `On hold`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
let totalRenew = vars.totalRenew

return total === totalRenew }, vars)).toBeTruthy();
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-002-061" (6633cc7f1aac3ea14f224634)
export async function bLU002061(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002061(page, vars);
}

// GI: "BLU-002-061" (6846f4e7388232057b7606a2)
export async function bLU002061(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002061(page, vars);
}

// GI: "BLU-002-062" (6846ef70388232057b750307)
export async function bLU002062(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscriptionID = `${vars.subscriptionID033 ?? ''}`;
  vars.totalRenew = `${vars.totalRenew033 ?? ''}`;
  vars.testID = `BLU-002-062`;
  vars.subsID = `${vars.subsID033 ?? ''}`;
  vars.payment = `cc`;
  vars.transaction_id = `${vars.transaction_id033 ?? ''}`;
  vars.vaultedShopperId = `${vars.vaultedShopperId033 ?? ''}`;
  vars.subStatus = `Active`;
  vars.paymentMethodTitle = `Credit/Debit Card`;
  vars.subStatusACH = `On hold`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
let totalRenew = vars.totalRenew

return total === totalRenew }, vars)).toBeTruthy();
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-002-062" (6633cc7f1aac3ea14f224635)
export async function bLU002062(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002062(page, vars);
}

// GI: "BLU-002-062" (6846f4e7388232057b7606a3)
export async function bLU002062(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002062(page, vars);
}
