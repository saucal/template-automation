// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - ACH - Pre-Orders"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { bLU002009 } from './bluesnap-ach-fields-transaction-vaulted-shopper';
import { bLU001006 } from './bluesnap-cc-hpf-vaulted-shopper-refunds';
import { activatePreOrder, addPreOrderProductUponReleaseToCart, completePreOrderWithAdmin, customerPayPendingOrder, deactivatePayPal, fillACHInfo, fillCheckoutDataCreateAccount, getBlueSnapVersion, getLogRequestResponseAltTransactions, getLogRequestResponseVaultedShopper, getPreOrderVersion, getSiteTitle, getWooOrderDetails, logIn, loginAdmin, payOrderPendingPayment, placePreOrder, preOrderMenu, verifyEmailAdminAndCustomer, verifyLogsTRGuestShopperACH, verifyVaultedShopper } from './bluesnap-common-steps-for-suites';

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

// GI: "BLU-002-036 - Step 1 - Pay Later order" (6841a1416fbaa32660faae90)
export async function bLU002036Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getSiteTitle(page, vars);
  await getBlueSnapVersion(page, vars);
  await deactivatePayPal(page, vars);
  await activatePreOrder(page, vars);
  await getPreOrderVersion(page, vars);
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) <= 7 && Number(PreOrderVs[2]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 2 })()) {
    vars.status = `Pre-ordered`;
  }
  vars.payment = `ach`;
  vars.trans = `accepted`;
  vars.test = `preorder`;
  vars.pay = `later`;
  vars.preOrderStatus = `Active`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.email-BLU-002-036 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-002-036}}`;
  vars.username = `{{email-BLU-002-036}}`;
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_pre_orders_pay_later"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_pre_orders_pay_later`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return element !== null && element !== undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="radio-control-wc-payment-method-options-pre_orders_pay_later"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#radio-control-wc-payment-method-options-pre_orders_pay_later`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`)).toHaveCount(0);
  }
  await placePreOrder(page, vars);
  await preOrderMenu(page, vars);
  await getWooOrderDetails(page, vars);
}

// GI: "BLU-002-036 - Step 1 - Pay Later order" (6633cc7b1aac3ea14f22447c)
export async function bLU002036Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002036Step1PayLaterOrder(page, vars);
}

// GI: "BLU-002-036 - Step 1 - Pay Later order" (6841a2446fbaa32660fb0720)
export async function bLU002036Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002036Step1PayLaterOrder(page, vars);
}

// GI: "BLU-002-036 - Step 2 - Admin Complete preorder" (6841a1416fbaa32660faae91)
export async function bLU002036Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  vars.status = `Pending payment`;
  await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} mark.order-status > span`).or(page.locator(`tr#order-${vars.orderNumber ?? ''} mark.order-status > span`)).first()).toContainText(`${vars.status ?? ''}`);
}

// GI: "BLU-002-036 - Step 2 - Admin Complete preorder" (6633cc7b1aac3ea14f22447d)
export async function bLU002036Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002036Step2AdminCompletePreorder(page, vars);
}

// GI: "BLU-002-036 - Step 2 - Admin Complete preorder" (6841a2446fbaa32660fb0721)
export async function bLU002036Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002036Step2AdminCompletePreorder(page, vars);
}

// GI: "BLU-002-036 - Step 3 - Pay Preorder" (6841a1416fbaa32660faae92)
export async function bLU002036Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `On hold`;
  vars.payForOrder = `yes`;
  await logIn(page, vars);
  await payOrderPendingPayment(page, vars);
  await fillACHInfo(page, vars);
  await customerPayPendingOrder(page, vars);
  await getLogRequestResponseAltTransactions(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
  vars.transaction_id036 = `${vars.transaction_id ?? ''}`;
  vars.vaultedShopperId036 = `${vars.vaultedShopperId ?? ''}`;
  vars.orderNumber036 = `${vars.orderNumber ?? ''}`;
  vars.total036 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-036 - Step 3 - Pay Preorder" (6633cc7b1aac3ea14f22447e)
export async function bLU002036Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002036Step3PayPreorder(page, vars);
}

// GI: "BLU-002-036 - Step 3 - Pay Preorder" (6841a2446fbaa32660fb0722)
export async function bLU002036Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002036Step3PayPreorder(page, vars);
}

// GI: "BLU-002-040 - Step 1 - Pay Later order" (6841a1416fbaa32660faae93)
export async function bLU002040Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
  vars.trans = `declined`;
  vars.payment = `ach`;
  vars.test = `preorder`;
  vars.pay = `later`;
  vars.preOrderStatus = `Active`;
  vars.accountNumber = `${vars.accountNumberD ?? ''}`;
  vars.routingNumber = `${vars.routingNumberD ?? ''}`;
  vars.email-BLU-002-036 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-002-036}}`;
  vars.username = `{{email-BLU-002-036}}`;
  await addPreOrderProductUponReleaseToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_pre_orders_pay_later"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_pre_orders_pay_later`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return element !== null && element !== undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="radio-control-wc-payment-method-options-pre_orders_pay_later"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#radio-control-wc-payment-method-options-pre_orders_pay_later`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`)).toHaveCount(0);
  }
  await placePreOrder(page, vars);
  await preOrderMenu(page, vars);
  await getWooOrderDetails(page, vars);
}

// GI: "BLU-002-040 - Step 1 - Pay Later order" (6633cc7b1aac3ea14f224481)
export async function bLU002040Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002040Step1PayLaterOrder(page, vars);
}

// GI: "BLU-002-040 - Step 1 - Pay Later order" (6841a2446fbaa32660fb0723)
export async function bLU002040Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002040Step1PayLaterOrder(page, vars);
}

// GI: "BLU-002-040 - Step 2 - Admin Complete preorder" (6841a1416fbaa32660faae94)
export async function bLU002040Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  vars.status = `Pending payment`;
  await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`).or(page.locator(`tr#order-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`)).first()).toContainText(`${vars.status ?? ''}`);
}

// GI: "BLU-002-040 - Step 2 - Admin Complete preorder" (6633cc7b1aac3ea14f224482)
export async function bLU002040Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002040Step2AdminCompletePreorder(page, vars);
}

// GI: "BLU-002-040 - Step 2 - Admin Complete preorder" (6841a2446fbaa32660fb0724)
export async function bLU002040Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002040Step2AdminCompletePreorder(page, vars);
}

// GI: "BLU-002-040 - Step 3 - Pay Preorder" (6841a1416fbaa32660faae95)
export async function bLU002040Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `On hold`;
  vars.payForOrder = `yes`;
  await logIn(page, vars);
  await payOrderPendingPayment(page, vars);
  await fillACHInfo(page, vars);
  await customerPayPendingOrder(page, vars);
  await getLogRequestResponseAltTransactions(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
  vars.transaction_id040 = `${vars.transaction_id ?? ''}`;
  vars.vaultedShopperId040 = `${vars.vaultedShopperId ?? ''}`;
  vars.orderNumber040 = `${vars.orderNumber ?? ''}`;
  vars.total040 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-040 - Step 3 - Pay Preorder" (6633cc7b1aac3ea14f224483)
export async function bLU002040Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002040Step3PayPreorder(page, vars);
}

// GI: "BLU-002-040 - Step 3 - Pay Preorder" (6841a2446fbaa32660fb0725)
export async function bLU002040Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002040Step3PayPreorder(page, vars);
}

// GI: "BLU-002-063" (6841a1416fbaa32660faae96)
export async function bLU002063(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.testId = `BLU-002-063`;
  vars.email_BLU-002-063 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-002-063}}`;
  await bLU001006(page, vars);
  await bLU002009(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-063" (6633cc7b1aac3ea14f224486)
export async function bLU002063(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002063(page, vars);
}

// GI: "BLU-002-063" (6841a2446fbaa32660fb0726)
export async function bLU002063(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002063(page, vars);
}
