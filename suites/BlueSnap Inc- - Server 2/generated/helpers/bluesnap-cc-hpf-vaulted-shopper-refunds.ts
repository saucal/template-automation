// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - CC - HPF, Vaulted Shopper & Refunds"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { addSimpleProductToCart, addSimpleProductToCartDownloadable, addSimpleProductToCartVirtual, addSimpleSubscriptionProductToCartDownloadable, addVariableSubscriptionProductToCart, blueSnapSandboxEndRefund, checkACHCCNotOnCheckout, checkACHCCSavedOnCheckout, checkCartIsEmpty, checkTranscationIsPresentOnOrderBackend, clearCache, deleteCCFromMenu, extractDate, extractFourDigitsOfCC, extractPftoken, fillCCInfo26X, fillCCInfoAddNewOneAlreadyPresentOtherCC26X, fillCheckoutDataCreateAccount, fillCheckoutDataNotCreatingAccount, fillCheckoutDataSubscription, getBlueSnapVersion, getGroupLogRequestResponse, getGroupLogRequestResponseTransactions, getLogRequestResponsePaymentFieldsTokens, getLogRequestResponseRefunds, getLogRequestResponseVaultedShopper, getPreOrderVersion, getSiteTitle, getTransactionDetailsFromBluesnap, getWooOrderDetails, getWooOrderFailed, getWooSubscriptionDetails, goToOrderWithAdmin, logIn, loginAdmin, paymentMethodMenuACHCCAvailable, paymentMethodMenuACHCCNotPresent, paymentMethodMenuNoCC, placeOrder, placeOrderButtonEnabled, placeOrderGuestUser, placeOrderGuestUserErrorMessage, register, renewByAdmin, saveCC, selectCCAsPaymentMethod, settingsActivateAppelPayMultiCurrencyAndGooglePay, settingsActivateAppelPayNotMultiCurrencyNorGooglePay, settingsActivateGooglePayNotMultiCurrencyNorApplePay, settingsActivateMultiCurrency, settingsDeactivateMultiCurrencyAppelPayAndGooglePay, useAMEX, useCENCOSUDDecline, useMASTER, useVisaDecline, verifyEmailAdminAndCustomer, verifyEmailOnlyAdmin, verifyEmailOnlyCustomer, verifyLogsTRAUTHCAPTURERefund, verifyLogsTransactions26X, verifyNoVaultedShopperRequest, verifyVaultedShopper, verifyVaultedShopperAddPaymentMethodOnMyAccount, verifyVaultedShopperDeletePaymentMethodOnMyAccount } from './bluesnap-common-steps-for-suites';
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

// GI: "BLU-001-000 - CC Number place holder" (69049f5a1a085ce44e1ff621)
export async function bLU001000CCNumberPlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getSiteTitle(page, vars);
  await getBlueSnapVersion(page, vars);
  await getPreOrderVersion(page, vars);
  await addSimpleSubscriptionProductToCartDownloadable(page, vars);
  await selectCCAsPaymentMethod(page, vars);
}

// GI: "BLU-001-000 - CC Number place holder" (6633cc841aac3ea14f224e89)
export async function bLU001000CCNumberPlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001000CCNumberPlaceHolder(page, vars);
}

// GI: "BLU-001-000 - CC Number place holder" (6904aa8f34ec47aacc5e1257)
export async function bLU001000CCNumberPlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001000CCNumberPlaceHolder(page, vars);
}

// GI: "BLU-001-000 - CVC place holder" (69049f5a1a085ce44e1ff622)
export async function bLU001000CVCPlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await addSimpleSubscriptionProductToCartDownloadable(page, vars);
  await selectCCAsPaymentMethod(page, vars);
}

// GI: "BLU-001-000 - CVC place holder" (6633cc841aac3ea14f224e8a)
export async function bLU001000CVCPlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001000CVCPlaceHolder(page, vars);
}

// GI: "BLU-001-000 - CVC place holder" (6904aa8f34ec47aacc5e1258)
export async function bLU001000CVCPlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001000CVCPlaceHolder(page, vars);
}

// GI: "BLU-001-000 - Exp date place holder" (69049f5a1a085ce44e1ff623)
export async function bLU001000ExpDatePlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await addSimpleSubscriptionProductToCartDownloadable(page, vars);
  await selectCCAsPaymentMethod(page, vars);
}

// GI: "BLU-001-000 - Exp date place holder" (6633cc841aac3ea14f224e8b)
export async function bLU001000ExpDatePlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001000ExpDatePlaceHolder(page, vars);
}

// GI: "BLU-001-000 - Exp date place holder" (6904aa8f34ec47aacc5e1259)
export async function bLU001000ExpDatePlaceHolder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001000ExpDatePlaceHolder(page, vars);
}

// GI: "BLU-001-001" (69049f5a1a085ce44e1ff624)
export async function bLU001001(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.user = `new`;
  vars.payment = `cc`;
  vars.saveCC = `no`;
  vars.useSavedCC = `no`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.status = `Processing`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await fillCCInfo26X(page, vars);
  if ((() => { let PreOrderVs = vars.PreOrderVs
PreOrderVs = PreOrderVs.split();
let BlueSnapVs = vars.BlueSnapVs
BlueSnapVs = BlueSnapVs.split();

return PreOrderVs[0] >= 2 && BlueSnapVs >= 3 })()) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`).first()).not.toBeVisible();
  }
  await placeOrderGuestUser(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-001" (6633cc841aac3ea14f224e8c)
export async function bLU001001(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001001(page, vars);
}

// GI: "BLU-001-001" (6904aa8f34ec47aacc5e125a)
export async function bLU001001(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001001(page, vars);
}

// GI: "BLU-001-001 - Admin side" (69049f5a1a085ce44e1ff625)
export async function bLU001001AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-001 - Admin side" (6633cc841aac3ea14f224e8d)
export async function bLU001001AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001001AdminSide(page, vars);
}

// GI: "BLU-001-001 - Admin side" (6904aa8f34ec47aacc5e125b)
export async function bLU001001AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001001AdminSide(page, vars);
}

// GI: "BLU-001-002" (69049f5a1a085ce44e1ff626)
export async function bLU001002(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await addSimpleProductToCart(page, vars);
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//*[contains(text(), "Place order")]`).or(page.locator(`xpath=//*[contains(text(), "Place Order")]`)).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`form[action*="/checkout/"] > .woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout > .woocommerce-error`).or(page.locator(`div.wc-block-store-notice.wc-block-components-notice-banner.is-error.is-dismissible > div > ul`)).first()).toContainText(`Please enter a valid credit card number`);
  await expect(page.locator(`form[action*="/checkout/"] > .woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout > .woocommerce-error`).or(page.locator(`div.wc-block-store-notice.wc-block-components-notice-banner.is-error.is-dismissible > div > ul`)).first()).toContainText(`Please enter your credit card's expiration date`);
  await expect(page.locator(`form[action*="/checkout/"] > .woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout > .woocommerce-error`).or(page.locator(`div.wc-block-store-notice.wc-block-components-notice-banner.is-error.is-dismissible > div > ul`)).first()).toContainText(`Please enter the CVV/CVC of your card`);
  await expect(page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn.invalid`)).not.toHaveCount(0);
  await expect(page.locator(`iframe#bluesnap-hosted-iframe-exp #exp.invalid`)).not.toHaveCount(0);
  await expect(page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv.invalid`)).not.toHaveCount(0);
  await expect(page.locator(`div#bluesnap-card-number.bluesnap-input-div.input-div-error`).or(page.locator(`div#bluesnap-card-number.input-div-error`))).not.toHaveCount(0);
  await expect(page.locator(`div#bluesnap-card-expiry.bluesnap-input-div.input-div-error`).or(page.locator(`div#bluesnap-card-expiry.input-div-error`))).not.toHaveCount(0);
  await expect(page.locator(`div#bluesnap-card-cvc.bluesnap-input-div.input-div-error`).or(page.locator(`div#bluesnap-card-cvc.input-div-error`))).not.toHaveCount(0);
}

// GI: "BLU-001-002" (6633cc841aac3ea14f224e8e)
export async function bLU001002(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001002(page, vars);
}

// GI: "BLU-001-002" (6904aa8f34ec47aacc5e125c)
export async function bLU001002(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001002(page, vars);
}

// GI: "BLU-001-003" (69049f5a1a085ce44e1ff627)
export async function bLU001003(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await addSimpleProductToCart(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  try { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().fill(`6011 0009 9130 0009`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().selectOption(`6011 0009 9130 0009`); }
  try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().fill(`1226`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().selectOption(`1226`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.wp-block-woocommerce-checkout') }, vars)) {
    {
      const _lbl = page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap__content"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//*[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//*[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error`).or(page.locator(`div.wc-block-store-notice.wc-block-components-notice-banner.is-error.is-dismissible > div > div`)).first()).toContainText(`Please enter the CVV/CVC of your card`);
  await expect(page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv.invalid`)).not.toHaveCount(0);
  await expect(page.locator(`div#bluesnap-card-cvc.bluesnap-input-div.input-div-error`).or(page.locator(`div#bluesnap-card-cvc.input-div-error`))).not.toHaveCount(0);
}

// GI: "BLU-001-003" (6633cc841aac3ea14f224e8f)
export async function bLU001003(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001003(page, vars);
}

// GI: "BLU-001-003" (6904aa8f34ec47aacc5e125d)
export async function bLU001003(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001003(page, vars);
}

// GI: "BLU-001-004" (69049f5a1a085ce44e1ff628)
export async function bLU001004(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await addSimpleProductToCart(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  try { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().fill(`6011 0009 9130 0009`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().selectOption(`6011 0009 9130 0009`); }
  await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).first().fill(`111`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).first().selectOption(`111`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.wp-block-woocommerce-checkout') }, vars)) {
    {
      const _lbl = page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap__content"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await placeOrderButtonEnabled(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//*[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//*[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error`).or(page.locator(`div.wc-block-store-notice.wc-block-components-notice-banner.is-error.is-dismissible > div > div`)).first()).toContainText(`Please enter your credit card's expiration date`);
  await expect(page.locator(`div#bluesnap-card-expiry.bluesnap-input-div.input-div-error`).or(page.locator(`div#bluesnap-card-expiry.input-div-error`))).not.toHaveCount(0);
  await expect(page.locator(`iframe#bluesnap-hosted-iframe-exp #exp.invalid`)).not.toHaveCount(0);
}

// GI: "BLU-001-004" (6633cc841aac3ea14f224e90)
export async function bLU001004(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001004(page, vars);
}

// GI: "BLU-001-004" (6904aa8f34ec47aacc5e125e)
export async function bLU001004(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001004(page, vars);
}

// GI: "BLU-001-005" (69049f5a1a085ce44e1ff629)
export async function bLU001005(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await addSimpleProductToCart(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().fill(`0530`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().selectOption(`0530`); }
  try { await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).first().fill(`111`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).first().selectOption(`111`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.wp-block-woocommerce-checkout') }, vars)) {
    {
      const _lbl = page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap__content"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//*[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//*[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error`).or(page.locator(`div.wc-block-store-notice.wc-block-components-notice-banner.is-error.is-dismissible > div > div`)).first()).toContainText(`Please enter a valid credit card number`);
  await expect(page.locator(`div#bluesnap-card-number.bluesnap-input-div.input-div-error`).or(page.locator(`div#bluesnap-card-number.input-div-error`))).not.toHaveCount(0);
  await expect(page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn.invalid`)).not.toHaveCount(0);
}

// GI: "BLU-001-005" (6633cc841aac3ea14f224e91)
export async function bLU001005(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001005(page, vars);
}

// GI: "BLU-001-005" (6904aa8f34ec47aacc5e125f)
export async function bLU001005(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001005(page, vars);
}

// GI: "BLU-001-006" (69049f5a1a085ce44e1ff62a)
export async function bLU001006(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await useCENCOSUDDecline(page, vars);
  vars.error_message = `Transaction failed because there are no available processors.`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`).or(page.locator(`.wc-block-components-payment-methods__save-card-info`)).first()).toBeVisible();
  await placeOrderGuestUserErrorMessage(page, vars);
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    await getWooOrderFailed(page, vars);
  }
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    await verifyEmailOnlyAdmin(page, vars);
  }
}

// GI: "BLU-001-006" (6633cc841aac3ea14f224e92)
export async function bLU001006(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001006(page, vars);
}

// GI: "BLU-001-006" (6904aa8f34ec47aacc5e1260)
export async function bLU001006(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001006(page, vars);
}

// GI: "BLU-001-007" (69049f5a1a085ce44e1ff62b)
export async function bLU001007(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await useVisaDecline(page, vars);
  vars.error_message = `This is the new error message for 14002|INCORRECT_INFORMATION`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await fillCCInfo26X(page, vars);
  if ((() => { let PreOrderVs = vars.PreOrderVs
PreOrderVs = PreOrderVs.split();
let BlueSnapVs = vars.BlueSnapVs
BlueSnapVs = BlueSnapVs.split();

return PreOrderVs[0] >= 2 && BlueSnapVs >= 3 })()) {
    await expect(page.locator(`#wc-bluesnap-new-payment-method`).first()).not.toBeVisible();
  }
  await placeOrderGuestUserErrorMessage(page, vars);
  await getWooOrderFailed(page, vars);
  await verifyEmailOnlyAdmin(page, vars);
}

// GI: "BLU-001-007" (6633cc841aac3ea14f224e93)
export async function bLU001007(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001007(page, vars);
}

// GI: "BLU-001-007" (6904aa8f34ec47aacc5e1261)
export async function bLU001007(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001007(page, vars);
}

// GI: "BLU-001-008" (69049f5a1a085ce44e1ff62c)
export async function bLU001008(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-008 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-008}}`;
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
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-008" (6633cc841aac3ea14f224e94)
export async function bLU001008(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001008(page, vars);
}

// GI: "BLU-001-008" (6904aa8f34ec47aacc5e1262)
export async function bLU001008(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001008(page, vars);
}

// GI: "BLU-001-008 - Admin side" (69049f5a1a085ce44e1ff62d)
export async function bLU001008AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-008 - Admin side" (6633cc841aac3ea14f224e95)
export async function bLU001008AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001008AdminSide(page, vars);
}

// GI: "BLU-001-008 - Admin side" (6904aa8f34ec47aacc5e1263)
export async function bLU001008AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001008AdminSide(page, vars);
}

// GI: "BLU-001-009" (69049f5a1a085ce44e1ff62e)
export async function bLU001009(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Completed`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.username = `{{email_BLU-001-008}}`;
  await logIn(page, vars);
  await addSimpleProductToCartDownloadable(page, vars);
  await checkACHCCSavedOnCheckout(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
if (!element) {
    return false
} else {
    return true
} }, vars)) {
    await selectCCAsPaymentMethod(page, vars);
  }
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-009" (6633cc841aac3ea14f224e96)
export async function bLU001009(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001009(page, vars);
}

// GI: "BLU-001-009" (6904aa8f34ec47aacc5e1264)
export async function bLU001009(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001009(page, vars);
}

// GI: "BLU-001-009 - Admin side" (69049f5a1a085ce44e1ff62f)
export async function bLU001009AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-009 - Admin side" (6633cc841aac3ea14f224e97)
export async function bLU001009AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001009AdminSide(page, vars);
}

// GI: "BLU-001-009 - Admin side" (6904aa8f34ec47aacc5e1265)
export async function bLU001009AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001009AdminSide(page, vars);
}

// GI: "BLU-001-010" (69049f5a1a085ce44e1ff630)
export async function bLU001010(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.user = `old`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.status = `Processing`;
  vars.username = `{{email_BLU-001-008}}`;
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await logIn(page, vars);
  await addSimpleProductToCart(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  await fillCCInfoAddNewOneAlreadyPresentOtherCC26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-010" (6633cc841aac3ea14f224e98)
export async function bLU001010(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001010(page, vars);
}

// GI: "BLU-001-010" (6904aa8f34ec47aacc5e1266)
export async function bLU001010(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001010(page, vars);
}

// GI: "BLU-001-010 - Admin side" (69049f5a1a085ce44e1ff631)
export async function bLU001010AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-010 - Admin side" (6633cc841aac3ea14f224e99)
export async function bLU001010AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001010AdminSide(page, vars);
}

// GI: "BLU-001-010 - Admin side" (6904aa8f34ec47aacc5e1267)
export async function bLU001010AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001010AdminSide(page, vars);
}

// GI: "BLU-001-011" (69049f5a1a085ce44e1ff632)
export async function bLU001011(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `no`;
  vars.status = `Processing`;
  vars.CCard = `4263982640269299`;
  vars.month = `04`;
  vars.year = `29`;
  vars.cvv = `738`;
  vars.ShortName = `VISA`;
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-008}}`;
  vars.username = `${vars.email ?? ''}`;
  await logIn(page, vars);
  await addSimpleProductToCart(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  await fillCCInfoAddNewOneAlreadyPresentOtherCC26X(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-011" (6633cc841aac3ea14f224e9a)
export async function bLU001011(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001011(page, vars);
}

// GI: "BLU-001-011" (6904aa8f34ec47aacc5e1268)
export async function bLU001011(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001011(page, vars);
}

// GI: "BLU-001-011 - Admin side" (69049f5a1a085ce44e1ff633)
export async function bLU001011AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-011 - Admin side" (6633cc841aac3ea14f224e9b)
export async function bLU001011AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001011AdminSide(page, vars);
}

// GI: "BLU-001-011 - Admin side" (6904aa8f34ec47aacc5e1269)
export async function bLU001011AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001011AdminSide(page, vars);
}

// GI: "BLU-001-012" (69049f5a1a085ce44e1ff634)
export async function bLU001012(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `no`;
  vars.useSavedCC = `no`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-012 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-012}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await placeOrder(page, vars);
  await paymentMethodMenuNoCC(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
}

// GI: "BLU-001-012" (6633cc841aac3ea14f224e9c)
export async function bLU001012(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001012(page, vars);
}

// GI: "BLU-001-012" (6904aa8f34ec47aacc5e126a)
export async function bLU001012(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001012(page, vars);
}

// GI: "BLU-001-013" (69049f5a1a085ce44e1ff635)
export async function bLU001013(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `BLU-001-013`;
  vars.user = `new`;
  vars.email_BLU-001-013 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email_BLU-001-013}}`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email = `{{email_BLU-001-013}}`;
  await register(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await extractPftoken(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
  await fillCCInfo26X(page, vars);
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
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  vars.vaultedShopperId = ``;
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method successfully added.`);
  await getGroupLogRequestResponse(page, vars);
  await verifyVaultedShopperAddPaymentMethodOnMyAccount(page, vars);
}

// GI: "BLU-001-013" (6633cc841aac3ea14f224e9d)
export async function bLU001013(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001013(page, vars);
}

// GI: "BLU-001-013" (6904aa8f34ec47aacc5e126b)
export async function bLU001013(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001013(page, vars);
}

// GI: "BLU-001-013-B" (69049f5a1a085ce44e1ff636)
export async function bLU001013B(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `BLU-001-013-B`;
  vars.user = `old`;
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await logIn(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await extractPftoken(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
  await fillCCInfo26X(page, vars);
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
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await extractDate(page, vars);
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method successfully added.`);
  await getGroupLogRequestResponse(page, vars);
  await verifyVaultedShopperAddPaymentMethodOnMyAccount(page, vars);
}

// GI: "BLU-001-013-B" (6633cc841aac3ea14f224e9e)
export async function bLU001013B(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001013B(page, vars);
}

// GI: "BLU-001-013-B" (6904aa8f34ec47aacc5e126c)
export async function bLU001013B(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001013B(page, vars);
}

// GI: "BLU-001-014" (69049f5a1a085ce44e1ff637)
export async function bLU001014(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `old`;
  vars.saveCC = `no`;
  vars.useSavedCC = `yes`;
  vars.username = `{{email_BLU-001-013}}`;
  vars.email = `{{email_BLU-001-013}}`;
  await logIn(page, vars);
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('.wp-block-woocommerce-checkout') }, vars)) {
    await selectCCAsPaymentMethod(page, vars);
  }
  await checkACHCCSavedOnCheckout(page, vars);
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await checkACHCCSavedOnCheckout(page, vars);
  await placeOrder(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-001-014" (6633cc841aac3ea14f224e9f)
export async function bLU001014(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001014(page, vars);
}

// GI: "BLU-001-014" (6904aa8f34ec47aacc5e126d)
export async function bLU001014(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001014(page, vars);
}

// GI: "BLU-001-014 - Admin side" (69049f5a1a085ce44e1ff638)
export async function bLU001014AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-001-014 - Admin side" (6633cc841aac3ea14f224ea0)
export async function bLU001014AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001014AdminSide(page, vars);
}

// GI: "BLU-001-014 - Admin side" (6904aa8f34ec47aacc5e126e)
export async function bLU001014AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001014AdminSide(page, vars);
}

// GI: "BLU-001-015" (69049f5a1a085ce44e1ff639)
export async function bLU001015(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await logIn(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await selectCCAsPaymentMethod(page, vars);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[name="bluesnap-hosted-iframe-ccn"]`).first().contentFrame().locator(`#ccn`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[name="bluesnap-hosted-iframe-ccn"]`).first().contentFrame().locator(`#ccn`).or(page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`)).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe[name="bluesnap-hosted-iframe-ccn"]`).first().contentFrame().locator(`#ccn`).or(page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`)).first().selectOption(`${vars.CCard ?? ''}`); }
  try { await page.locator(`iframe[name="bluesnap-hosted-iframe-cvv"]`).first().contentFrame().locator(`#cvv`).or(page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`)).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[name="bluesnap-hosted-iframe-cvv"]`).first().contentFrame().locator(`#cvv`).or(page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`)).first().selectOption(`${vars.cvv ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Please enter your credit card's expiration date`);
}

// GI: "BLU-001-015" (6633cc841aac3ea14f224ea1)
export async function bLU001015(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001015(page, vars);
}

// GI: "BLU-001-015" (6904aa8f34ec47aacc5e126f)
export async function bLU001015(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001015(page, vars);
}

// GI: "BLU-001-016" (69049f5a1a085ce44e1ff63a)
export async function bLU001016(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await logIn(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await selectCCAsPaymentMethod(page, vars);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[name="bluesnap-hosted-iframe-ccn"]`).first().contentFrame().locator(`#ccn`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[name="bluesnap-hosted-iframe-ccn"]`).first().contentFrame().locator(`#ccn`).or(page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`)).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe[name="bluesnap-hosted-iframe-ccn"]`).first().contentFrame().locator(`#ccn`).or(page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`)).first().selectOption(`${vars.CCard ?? ''}`); }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[name="bluesnap-hosted-iframe-exp"]`).first().contentFrame().locator(`#month`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  try {
    try { await page.locator(`iframe[name="bluesnap-hosted-iframe-exp"]`).first().contentFrame().locator(`#month`).first().fill(`${vars.month ?? ''}`); } catch { await page.locator(`iframe[name="bluesnap-hosted-iframe-exp"]`).first().contentFrame().locator(`#month`).first().selectOption(`${vars.month ?? ''}`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`iframe[name="bluesnap-hosted-iframe-exp"]`).first().contentFrame().locator(`#year`).first().fill(`${vars.year ?? ''}`); } catch { await page.locator(`iframe[name="bluesnap-hosted-iframe-exp"]`).first().contentFrame().locator(`#year`).first().selectOption(`${vars.year ?? ''}`); }
  } catch { /* optional step: assign */ }
  try {
    await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try {
    try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().fill(`${vars.month ?? ''}${vars.year ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().selectOption(`${vars.month ?? ''}${vars.year ?? ''}`); }
  } catch { /* optional step: assign */ }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Please enter the CVV/CVC of your card`);
}

// GI: "BLU-001-016" (6633cc841aac3ea14f224ea2)
export async function bLU001016(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001016(page, vars);
}

// GI: "BLU-001-016" (6904aa8f34ec47aacc5e1270)
export async function bLU001016(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001016(page, vars);
}

// GI: "BLU-001-017" (69049f5a1a085ce44e1ff63b)
export async function bLU001017(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await logIn(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await placeOrderButtonEnabled(page, vars);
  await selectCCAsPaymentMethod(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`div.woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout:nth-of-type(1) > .woocommerce-error`).first()).toContainText(`Please enter the CVV/CVC of your card`);
  await expect(page.locator(`div.woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout:nth-of-type(2) > .woocommerce-error`).first()).toContainText(`Please enter your credit card's expiration date`);
  await expect(page.locator(`div.woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout:nth-of-type(3) > .woocommerce-error`).first()).toContainText(`Please enter a valid credit card number`);
}

// GI: "BLU-001-017" (6633cc841aac3ea14f224ea3)
export async function bLU001017(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001017(page, vars);
}

// GI: "BLU-001-017" (6904aa8f34ec47aacc5e1271)
export async function bLU001017(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001017(page, vars);
}

// GI: "BLU-001-018" (69049f5a1a085ce44e1ff63c)
export async function bLU001018(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `{{email_BLU-001-013}}`;
  vars.email = `{{email_BLU-001-013}}`;
  vars.test = `BLU-001-018`;
  await logIn(page, vars);
  await deleteCCFromMenu(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  vars.logs1 = `${vars.logs ?? ''}`;
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await paymentMethodMenuACHCCNotPresent(page, vars);
  await addSimpleProductToCart(page, vars);
  await useMASTER(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await checkACHCCSavedOnCheckout(page, vars);
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await checkACHCCNotOnCheckout(page, vars);
  vars.logs = `${vars.logs1 ?? ''}`;
  await verifyVaultedShopperDeletePaymentMethodOnMyAccount(page, vars);
}

// GI: "BLU-001-018" (6633cc841aac3ea14f224ea4)
export async function bLU001018(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001018(page, vars);
}

// GI: "BLU-001-018" (6904aa8f34ec47aacc5e1272)
export async function bLU001018(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001018(page, vars);
}

// GI: "BLU-001-036 - Step 1 - Create order" (69049f5a1a085ce44e1ff63d)
export async function bLU001036Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.useSavedCC = ``;
  vars.user = `new`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-036 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-036}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
}

// GI: "BLU-001-036 - Step 1 - Create order" (6633cc841aac3ea14f224ea5)
export async function bLU001036Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001036Step1CreateOrder(page, vars);
}

// GI: "BLU-001-036 - Step 1 - Create order" (6904aa8f34ec47aacc5e1273)
export async function bLU001036Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001036Step1CreateOrder(page, vars);
}

// GI: "BLU-001-036 - Step 2 - Full refund" (69049f5a1a085ce44e1ff63e)
export async function bLU001036Step2FullRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `full`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  try { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().fill(`${vars.shippingTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingTotal ?? ''}`); }
  try { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTaxTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTaxTotal ?? ''}`); }
  vars.testID = `BLU-001-036`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-001-036 - Step 2 - Full refund" (6633cc841aac3ea14f224ea6)
export async function bLU001036Step2FullRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001036Step2FullRefund(page, vars);
}

// GI: "BLU-001-036 - Step 2 - Full refund" (6904aa8f34ec47aacc5e1274)
export async function bLU001036Step2FullRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001036Step2FullRefund(page, vars);
}

// GI: "BLU-001-037 - Step 1 - Create order" (69049f5a1a085ce44e1ff63f)
export async function bLU001037Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-001-037 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-001-037}}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
}

// GI: "BLU-001-037 - Step 1 - Create order" (6633cc841aac3ea14f224ea7)
export async function bLU001037Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001037Step1CreateOrder(page, vars);
}

// GI: "BLU-001-037 - Step 1 - Create order" (6904aa8f34ec47aacc5e1275)
export async function bLU001037Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001037Step1CreateOrder(page, vars);
}

// GI: "BLU-001-037 - Step 2 - Partial refund" (69049f5a1a085ce44e1ff640)
export async function bLU001037Step2PartialRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `partial`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = total/4
return total.toFixed(2) }, vars);
  vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
return total.toFixed(2) }, vars);
  vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
return total.toFixed(2) }, vars);
  try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  vars.testID = `BLU-001-037`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
return total.toFixed(2) }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-001-037 - Step 2 - Partial refund" (6633cc841aac3ea14f224ea8)
export async function bLU001037Step2PartialRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001037Step2PartialRefund(page, vars);
}

// GI: "BLU-001-037 - Step 2 - Partial refund" (6904aa8f34ec47aacc5e1276)
export async function bLU001037Step2PartialRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001037Step2PartialRefund(page, vars);
}

// GI: "BLU-001-038 - Step 1 - Create order" (69049f5a1a085ce44e1ff641)
export async function bLU001038Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  await useAMEX(page, vars);
  vars.email-BLU-001_038 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_038}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getWooSubscriptionDetails(page, vars);
  vars.subscriptionID_038 = `${vars.subscriptionID ?? ''}`;
}

// GI: "BLU-001-038 - Step 1 - Create order" (6633cc841aac3ea14f224ea9)
export async function bLU001038Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001038Step1CreateOrder(page, vars);
}

// GI: "BLU-001-038 - Step 1 - Create order" (6904aa8f34ec47aacc5e1277)
export async function bLU001038Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001038Step1CreateOrder(page, vars);
}

// GI: "BLU-001-038 - Step 2 - Full refund Subs Parent" (69049f5a1a085ce44e1ff642)
export async function bLU001038Step2FullRefundSubsParent(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `full`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  try { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().fill(`${vars.shippingTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingTotal ?? ''}`); }
  try { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTaxTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTaxTotal ?? ''}`); }
  vars.testID = `BLU-001-038`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-001-038 - Step 2 - Full refund Subs Parent" (6633cc841aac3ea14f224eaa)
export async function bLU001038Step2FullRefundSubsParent(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001038Step2FullRefundSubsParent(page, vars);
}

// GI: "BLU-001-038 - Step 2 - Full refund Subs Parent" (6904aa8f34ec47aacc5e1278)
export async function bLU001038Step2FullRefundSubsParent(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001038Step2FullRefundSubsParent(page, vars);
}

// GI: "BLU-001-039 - Step 1 - Create order" (69049f5a1a085ce44e1ff643)
export async function bLU001039Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  await useAMEX(page, vars);
  vars.email-BLU-001_039 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_039}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getWooSubscriptionDetails(page, vars);
  vars.subscriptionID_039 = `${vars.subscriptionID ?? ''}`;
}

// GI: "BLU-001-039 - Step 1 - Create order" (6633cc841aac3ea14f224eab)
export async function bLU001039Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001039Step1CreateOrder(page, vars);
}

// GI: "BLU-001-039 - Step 1 - Create order" (6904aa8f34ec47aacc5e1279)
export async function bLU001039Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001039Step1CreateOrder(page, vars);
}

// GI: "BLU-001-039 - Step 2 - Partial refund Sub parent" (69049f5a1a085ce44e1ff644)
export async function bLU001039Step2PartialRefundSubParent(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `partial`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = total/4
return total.toFixed(2) }, vars);
  vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
return total.toFixed(2) }, vars);
  vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
return total.toFixed(2) }, vars);
  try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  vars.testID = `BLU-001-039`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-001-039 - Step 2 - Partial refund Sub parent" (6633cc841aac3ea14f224eac)
export async function bLU001039Step2PartialRefundSubParent(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001039Step2PartialRefundSubParent(page, vars);
}

// GI: "BLU-001-039 - Step 2 - Partial refund Sub parent" (6904aa8f34ec47aacc5e127a)
export async function bLU001039Step2PartialRefundSubParent(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001039Step2PartialRefundSubParent(page, vars);
}

// GI: "BLU-001-040" (69049f5a1a085ce44e1ff645)
export async function bLU001040(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `partial`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = total/4
return total.toFixed(2) }, vars);
  vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
return total.toFixed(2) }, vars);
  vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
return total.toFixed(2) }, vars);
  try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  vars.testID = `BLU-001-040`;
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

// GI: "BLU-001-040" (6633cc841aac3ea14f224ead)
export async function bLU001040(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001040(page, vars);
}

// GI: "BLU-001-040" (6904aa8f34ec47aacc5e127b)
export async function bLU001040(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001040(page, vars);
}

// GI: "BLU-001-041 - Step 1" (69049f5a1a085ce44e1ff646)
export async function bLU001041Step1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscriptionID = `${vars.subscriptionID_038 ?? ''}`;
  vars.email = `{{email-BLU-001_038}}`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await renewByAdmin(page, vars);
}

// GI: "BLU-001-041 - Step 1" (6633cc841aac3ea14f224eae)
export async function bLU001041Step1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001041Step1(page, vars);
}

// GI: "BLU-001-041 - Step 1" (6904aa8f34ec47aacc5e127c)
export async function bLU001041Step1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001041Step1(page, vars);
}

// GI: "BLU-001-041 - Step 2 - Full refund renew order" (69049f5a1a085ce44e1ff647)
export async function bLU001041Step2FullRefundRenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `full`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  try { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().fill(`${vars.shippingTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingTotal ?? ''}`); }
  try { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTaxTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTaxTotal ?? ''}`); }
  vars.testID = `BLU-001-041`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-001-041 - Step 2 - Full refund renew order" (6633cc841aac3ea14f224eaf)
export async function bLU001041Step2FullRefundRenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001041Step2FullRefundRenewOrder(page, vars);
}

// GI: "BLU-001-041 - Step 2 - Full refund renew order" (6904aa8f34ec47aacc5e127d)
export async function bLU001041Step2FullRefundRenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001041Step2FullRefundRenewOrder(page, vars);
}

// GI: "BLU-001-042 - Step 1" (69049f5a1a085ce44e1ff648)
export async function bLU001042Step1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}/wp-admin/`);
  await page.waitForLoadState('load');
  vars.subscriptionID = `${vars.subscriptionID_039 ?? ''}`;
  vars.email = `{{email-BLU-001_039}}`;
  try { await page.locator(`#user_login`).first().fill(`demouser`); } catch { await page.locator(`#user_login`).first().selectOption(`demouser`); }
  try { await page.locator(`#user_pass`).first().fill(`demopass`); } catch { await page.locator(`#user_pass`).first().selectOption(`demopass`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await renewByAdmin(page, vars);
}

// GI: "BLU-001-042 - Step 1" (6633cc841aac3ea14f224eb0)
export async function bLU001042Step1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001042Step1(page, vars);
}

// GI: "BLU-001-042 - Step 1" (6904aa8f34ec47aacc5e127e)
export async function bLU001042Step1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001042Step1(page, vars);
}

// GI: "BLU-001-042 - Step 2 - Partial refund renew order" (69049f5a1a085ce44e1ff649)
export async function bLU001042Step2PartialRefundRenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `partial`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = total/4
total = Math.round(total * 100) / 100
return total }, vars);
  vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
return total }, vars);
  vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
return total }, vars);
  try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  vars.testID = `BLU-001-039`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-001-042 - Step 2 - Partial refund renew order" (6633cc841aac3ea14f224eb1)
export async function bLU001042Step2PartialRefundRenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001042Step2PartialRefundRenewOrder(page, vars);
}

// GI: "BLU-001-042 - Step 2 - Partial refund renew order" (6904aa8f34ec47aacc5e127f)
export async function bLU001042Step2PartialRefundRenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU001042Step2PartialRefundRenewOrder(page, vars);
}

// GI: "BLU-001-078 - 1" (69049f5a1a085ce44e1ff64a)
export async function bLU0010781(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsDeactivateMultiCurrencyAppelPayAndGooglePay(page, vars);
  await page.goto(`${vars.startUrl ?? ''}?r=1`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 === null && element3 === null && element4 === null
 }, vars)).toBeTruthy();
  await page.locator(`a[href*="/shop"]`).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}shop/?r=1`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 === null && element3 === null && element4 === null
 }, vars)).toBeTruthy();
  await page.locator(`a[href*="?add-to-cart="]`).or(page.locator(`xpath=//a[contains(text(),'Add to cart')]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart"]`).or(page.locator(`xpath=//a[contains(text(),'View cart')]`)).or(page.locator(`xpath=//a[contains(text(),'Cart')]`)).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}cart/?r=1`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 === null && element3 === null && element4 === null
 }, vars)).toBeTruthy();
  await page.locator(`a[href*="/checkout"]`).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}checkout/?r=1`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 === null && element3 !== null && element4 !== null
 }, vars)).toBeTruthy();
}

// GI: "BLU-001-078 - 1" (6633cc841aac3ea14f224eb2)
export async function bLU0010781(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU0010781(page, vars);
}

// GI: "BLU-001-078 - 1" (6904aa8f34ec47aacc5e1280)
export async function bLU0010781(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU0010781(page, vars);
}

// GI: "BLU-001-078 - 2" (69049f5a1a085ce44e1ff64b)
export async function bLU0010782(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsActivateMultiCurrency(page, vars);
  await page.goto(`${vars.startUrl ?? ''}?r=2`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
|| 
(Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 !== null && element2 === null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="/shop"]`).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}shop/?r=2`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
|| 
(Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 !== null && element2 === null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="?add-to-cart="]`).or(page.locator(`xpath=//a[contains(text(),'Add to cart')]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart"]`).or(page.locator(`xpath=//a[contains(text(),'View cart')]`)).or(page.locator(`xpath=//a[contains(text(),'Cart')]`)).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}cart/?r=2`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
|| 
(Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 !== null && element2 === null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="/checkout"]`).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}checkout/?r=2`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
|| 
(Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 !== null && element2 === null && element3 !== null && element4 !== null
 }, vars)).toBeTruthy();
  }
}

// GI: "BLU-001-078 - 2" (6633cc841aac3ea14f224eb3)
export async function bLU0010782(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU0010782(page, vars);
}

// GI: "BLU-001-078 - 2" (6904aa8f34ec47aacc5e1281)
export async function bLU0010782(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU0010782(page, vars);
}

// GI: "BLU-001-078 - 3" (69049f5a1a085ce44e1ff64c)
export async function bLU0010783(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsActivateAppelPayNotMultiCurrencyNorGooglePay(page, vars);
  await page.goto(`${vars.startUrl ?? ''}?r=3`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="/shop"]`).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}shop/?r=3`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="?add-to-cart="]`).or(page.locator(`xpath=//a[contains(text(),'Add to cart')]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart"]`).or(page.locator(`xpath=//a[contains(text(),'View cart')]`)).or(page.locator(`xpath=//a[contains(text(),'Cart')]`)).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}cart/?r=3`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const element = document.querySelector('.wc-block-cart')
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0
        && !element }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const element = document.querySelector('.wc-block-cart')
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0
        && !!element }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 !== null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="/checkout"]`).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}checkout/?r=3`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const element = document.querySelector('.wc-block-checkout')
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0
        && !element }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 !== null && element4 !== null
 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const element = document.querySelector('.wc-block-checkout')
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0
        && !!element }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 !== null && element4 !== null
 }, vars)).toBeTruthy();
  }
}

// GI: "BLU-001-078 - 3" (6633cc841aac3ea14f224eb4)
export async function bLU0010783(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU0010783(page, vars);
}

// GI: "BLU-001-078 - 3" (6904aa8f34ec47aacc5e1282)
export async function bLU0010783(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU0010783(page, vars);
}

// GI: "BLU-001-078 - 4" (69049f5a1a085ce44e1ff64d)
export async function bLU0010784(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsActivateGooglePayNotMultiCurrencyNorApplePay(page, vars);
  await page.goto(`${vars.startUrl ?? ''}?r=4`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="/shop"]`).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}shop/?r=4`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="?add-to-cart="]`).or(page.locator(`xpath=//a[contains(text(),'Add to cart')]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart"]`).or(page.locator(`xpath=//a[contains(text(),'View cart')]`)).or(page.locator(`xpath=//a[contains(text(),'Cart')]`)).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}cart/?r=4`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const element = document.querySelector('.wc-block-cart')
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0
        && !element }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 === null && element4 !== null
 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const element = document.querySelector('.wc-block-cart')
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0
        && !!element }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 !== null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await page.locator(`a[href*="/checkout"]`).filter({ visible: true }).first().click({ force: true });
  await clearCache(page, vars);
  await page.goto(`${vars.startUrl ?? ''}checkout/?r=4`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const element = document.querySelector('.wc-block-checkout')
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0
        !element }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 !== null && element4 !== null
 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const element = document.querySelector('.wc-block-checkout')
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 0
        && !!element }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element1 = document.querySelector("#woocommerce-bluesnap-multicurrency-js")
let element2 = document.querySelector("#woocommerce-bluesnap-payment-request-js")
let element3 = document.querySelector("#woocommerce-bluesnap-gateway-general-js")
let element4 = document.querySelector("#woocommerce-bluesnap-gateway-general-css")


return element1 === null && element2 !== null && element3 !== null && element4 !== null
 }, vars)).toBeTruthy();
  }
  await settingsActivateAppelPayMultiCurrencyAndGooglePay(page, vars);
}

// GI: "BLU-001-078 - 4" (6633cc841aac3ea14f224eb5)
export async function bLU0010784(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU0010784(page, vars);
}

// GI: "BLU-001-078 - 4" (6904aa8f34ec47aacc5e1283)
export async function bLU0010784(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU0010784(page, vars);
}
