// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - Multi-currency"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { activatePayPal, activatePreOrder, addCoupon, addPreOrderProductUpfrontToCart, addPreOrderProductUponReleaseToCart, addSimpleProductToCart, addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken, addVariableSubscriptionProductToCart, addVariableSubscriptionProductToCartWithFreeTrial, blueSnapSandboxEndRefund, calculateTotalUSD, changeCurrencyFormat, checkCartIsEmpty, checkTranscationIsPresentOnOrderBackend, completePreOrderWithAdmin, customerPayPendingOrder, deactivatePayPal, defaultCurrencyOnSite, extractFourDigitsOfCC, extractPftoken, fillCCInfo26X, fillCheckoutDataCreateAccount, fillCheckoutDataSubscription, fillCheckoutDataSubscriptionLoggedUser, forceRenewOrderToFail, getBlueSnapVersion, getDefaultCurrencyPrice, getDefaultCurrencyPriceFromCheckoutPageBeforePaying, getDefaultCurrencyPriceOnCart, getGroupLogRequestResponse, getGroupLogRequestResponseTransactions, getLogRequestResponseCurrencyRate, getLogRequestResponseNoRecurringOndemand, getLogRequestResponseNoTransactions, getLogRequestResponseRecurringOndemand, getLogRequestResponseRecurringOndemandSubsID, getLogRequestResponseRefunds, getLogRequestResponseUpgrade, getLogRequestResponseVaultedShopper, getMiniCartCurrencyPrices, getPreOrderVersion, getSiteTitle, getTransactionDetailsFromBluesnap, getVariablesForSubscriptions, getWooOrderDetails, getWooSubscriptionDetails, goToMyAccount, goToOrderWithAdmin, logIn, loginAdmin, payOrderPendingPayment, paymentMethodMenuACHCCAvailable, placeOrder, placePreOrder, preOrderMenu, register, renewByAdmin, saveCC, selectCurrencyOnFrontEnd, settingsActivateCaptureAnd3DS, settingsActivateMultiCurrency, settingsChangeDefaultCurrency, settingsExcludeTax, settingsIncludeTax, subscriptionMenu, upgradeSubscription, useAMEX, verifyCurrencyOnBackendOrder, verifyCurrencyOnBackendRenew, verifyCurrencyOnMiniCart, verifyCurrencyOnTheAfterPlaceOrder, verifyCurrencyOnThePage, verifyCurrencyPriceFromCheckoutPageBeforePaying, verifyEmailAdminAndCustomer, verifyEmailOnlyCustomer, verifyLogsTRAUTHCAPTUREPreORderUponReleaseComplete, verifyLogsTRAUTHCAPTURERefund, verifyLogsTRAUTHCAPTURERenewal, verifyLogsTRAUTHCAPTUREUpgrade26X, verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X, verifyLogsTransactions26X, verifyNoVaultedShopperRequest, verifyTaxAndTotalsOnCartAndCheckout, verifyVaultedShopper } from './bluesnap-common-steps-for-suites';
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

// GI: "BLU-003-001" (67f3cddb74d7454094c05113)
export async function bLU003001(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getSiteTitle(page, vars);
  await getBlueSnapVersion(page, vars);
  await settingsActivateCaptureAnd3DS(page, vars);
  vars.currency = `${vars.defaultCurr ?? ''}`;
  await defaultCurrencyOnSite(page, vars);
  vars.defaultParts = `${vars.parts ?? ''}`;
  vars.decimalsDefault = `${vars.decimals ?? ''}`;
  vars.defaultLocale = `${vars.locale ?? ''}`;
  await settingsChangeDefaultCurrency(page, vars);
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
  await settingsActivateMultiCurrency(page, vars);
  await page.reload();
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await selectCurrencyOnFrontEnd(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.startUrl ?? ''}`);
  await page.waitForLoadState('load');
  vars.selectedCurr = ((await page.locator(`select[name="bluesnap_currency_selector"]`).textContent()) ?? '').trim();
  if ((() => { let selectedCurr = vars.selectedCurr
return selectedCurr !== vars.curr })()) {
    await selectCurrencyOnFrontEnd(page, vars);
  }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-002" (67f3cddb74d7454094c05114)
export async function bLU003002(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}shop/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.url ?? ''}/shop/`);
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-003" (67f3cddb74d7454094c05115)
export async function bLU003003(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/hoodie-with-zipper/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.url ?? ''}/product/hoodie-with-zipper/`);
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-004" (67f3cddb74d7454094c05116)
export async function bLU003004(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/hoodie/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.url ?? ''}/product/hoodie/`);
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-005" (67f3cddb74d7454094c05117)
export async function bLU003005(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/polo/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  try { await page.locator(`#size`).first().fill(`S`); } catch { await page.locator(`#size`).first().selectOption(`S`); }
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  try { await page.locator(`#size`).first().fill(`S`); } catch { await page.locator(`#size`).first().selectOption(`S`); }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.startUrl ?? ''}/product/polo/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#size`).first().fill(`S`); } catch { await page.locator(`#size`).first().selectOption(`S`); }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-006" (67f3cddb74d7454094c05118)
export async function bLU003006(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/polo/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  try { await page.locator(`#size`).first().fill(`M`); } catch { await page.locator(`#size`).first().selectOption(`M`); }
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  try { await page.locator(`#size`).first().fill(`M`); } catch { await page.locator(`#size`).first().selectOption(`M`); }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.startUrl ?? ''}/product/polo/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#size`).first().fill(`M`); } catch { await page.locator(`#size`).first().selectOption(`M`); }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-007" (67f3cddb74d7454094c05119)
export async function bLU003007(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/subscription-test-downloadable/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  await page.screenshot({ fullPage: true });
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.url ?? ''}/product/subscription-test-downloadable/`);
  await page.waitForLoadState('load');
  await page.screenshot({ fullPage: true });
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-008" (67f3cddb74d7454094c0511a)
export async function bLU003008(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/subscription-test-downloadable-2/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.url ?? ''}/product/subscription-test-downloadable-2/`);
  await page.waitForLoadState('load');
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-009" (67f3cddb74d7454094c0511b)
export async function bLU003009(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/subscription-test-variable/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  try { await page.locator(`#type`).first().fill(`Gold`); } catch { await page.locator(`#type`).first().selectOption(`Gold`); }
  try { await page.locator(`#period`).first().fill(`Day`); } catch { await page.locator(`#period`).first().selectOption(`Day`); }
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  try { await page.locator(`#type`).first().fill(`Gold`); } catch { await page.locator(`#type`).first().selectOption(`Gold`); }
  try { await page.locator(`#period`).first().fill(`Day`); } catch { await page.locator(`#period`).first().selectOption(`Day`); }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.startUrl ?? ''}/product/subscription-test-variable/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#type`).first().fill(`Gold`); } catch { await page.locator(`#type`).first().selectOption(`Gold`); }
  try { await page.locator(`#period`).first().fill(`Day`); } catch { await page.locator(`#period`).first().selectOption(`Day`); }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-010" (67f3cddb74d7454094c0511c)
export async function bLU003010(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/subscription-test-variable/`);
  await page.waitForLoadState('load');
  vars.currency = ``;
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="type"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#type`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#type`).first().fill(`Silver`); } catch { await page.locator(`#type`).first().selectOption(`Silver`); }
  {
    const _lbl = page.locator(`label[for="period"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#period`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#period`).first().fill(`Week`); } catch { await page.locator(`#period`).first().selectOption(`Week`); }
  await getDefaultCurrencyPrice(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  try { await page.locator(`#type`).first().fill(`Silver`); } catch { await page.locator(`#type`).first().selectOption(`Silver`); }
  try { await page.locator(`#period`).first().fill(`Week`); } catch { await page.locator(`#period`).first().selectOption(`Week`); }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  await addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page, vars);
  await page.goto(`${vars.startUrl ?? ''}/product/subscription-test-variable/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#type`).first().fill(`Silver`); } catch { await page.locator(`#type`).first().selectOption(`Silver`); }
  try { await page.locator(`#period`).first().fill(`Week`); } catch { await page.locator(`#period`).first().selectOption(`Week`); }
  await getDefaultCurrencyPrice(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
}

// GI: "BLU-003-011" (67f3cddb74d7454094c0511d)
export async function bLU003011(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.currency = ``;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=7574`);
  await page.waitForLoadState('load');
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=73`);
  await page.waitForLoadState('load');
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=26`);
  await page.waitForLoadState('load');
  await getMiniCartCurrencyPrices(page, vars);
  await page.goto(`${vars.startUrl ?? ''}`);
  await page.waitForLoadState('load');
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await getMiniCartCurrencyPrices(page, vars);
  await verifyCurrencyOnMiniCart(page, vars);
  await page.locator(`.cart-contents`).first().hover();
}

// GI: "BLU-003-012" (67f3cddb74d7454094c0511e)
export async function bLU003012(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.currency = `${vars.defaultCurr ?? ''}`;
  vars.includeTax = `no`;
  vars.includeShipping = `yes`;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=73`);
  await page.waitForLoadState('load');
  await page.locator(`a[href*="/cart"]`).filter({ visible: true }).first().click({ force: true });
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !element }, vars)) {
    await page.locator(`xpath=//a[contains(text(), "Calculate shipping")]`).or(page.locator(`.wc-block-components-shipping-address .wc-block-components-panel__button`)).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !element }, vars)) {
    try { await page.locator(`#calc_shipping_city`).or(page.locator(`.wc-block-components-address-form__city > input`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#calc_shipping_city`).or(page.locator(`.wc-block-components-address-form__city > input`)).first().selectOption(`${vars.city ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !element }, vars)) {
    try { await page.locator(`#calc_shipping_postcode`).or(page.locator(`.wc-block-components-address-form__postcode > input`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#calc_shipping_postcode`).or(page.locator(`.wc-block-components-address-form__postcode > input`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !element }, vars)) {
    await page.locator(`button[name="calc_shipping"]`).or(page.locator(`button.wc-block-components-shipping-calculator-address__button`)).filter({ visible: true }).first().click({ force: true });
  }
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !!element  }, vars)) {
    await page.locator(`.wc-block-components-totals-coupon > .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#coupon_code`).or(page.locator(`#wc-block-components-totals-coupon__input-coupon`)).first().fill(`test2`); } catch { await page.locator(`#coupon_code`).or(page.locator(`#wc-block-components-totals-coupon__input-coupon`)).first().selectOption(`test2`); }
  await page.locator(`button[name="apply_coupon"]`).or(page.locator(`button.wc-block-components-totals-coupon__button`)).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !!element }, vars)) {
    await page.locator(`div.wcs-recurring-totals-panel__details .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  await getDefaultCurrencyPriceOnCart(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !!element }, vars)) {
    await page.locator(`div.wcs-recurring-totals-panel__details .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  await getDefaultCurrencyPriceOnCart(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !!element }, vars)) {
    vars.includeShipping = `no`;
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await verifyTaxAndTotalsOnCartAndCheckout(page, vars);
  }
}

// GI: "BLU-003-012 Price Including Tax" (67f3cddb74d7454094c0511f)
export async function bLU003012PriceIncludingTax(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsIncludeTax(page, vars);
  vars.includeTax = `yes`;
  vars.currency = ``;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=73`);
  await page.waitForLoadState('load');
  await page.locator(`a[href*="/cart"]`).filter({ visible: true }).first().click({ force: true });
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !element }, vars)) {
    await page.locator(`xpath=//a[contains(text(), "Calculate shipping")]`).or(page.locator(`a[href="#"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !element }, vars)) {
    try { await page.locator(`#calc_shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#calc_shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !element }, vars)) {
    try { await page.locator(`#calc_shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#calc_shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !element }, vars)) {
    await page.locator(`button[name="calc_shipping"]`).filter({ visible: true }).first().click({ force: true });
  }
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !!element  }, vars)) {
    await page.locator(`.wc-block-components-totals-coupon > .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#coupon_code`).or(page.locator(`#wc-block-components-totals-coupon__input-coupon`)).first().fill(`test2`); } catch { await page.locator(`#coupon_code`).or(page.locator(`#wc-block-components-totals-coupon__input-coupon`)).first().selectOption(`test2`); }
  await page.locator(`button[name="apply_coupon"]`).or(page.locator(`button.wc-block-components-totals-coupon__button`)).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await getDefaultCurrencyPriceOnCart(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !!element }, vars)) {
    await page.locator(`div.wcs-recurring-totals-panel__details .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  await getDefaultCurrencyPriceOnCart(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-cart')

return !!element }, vars)) {
    vars.includeShipping = `no`;
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await verifyTaxAndTotalsOnCartAndCheckout(page, vars);
  }
  await settingsExcludeTax(page, vars);
}

// GI: "BLU-003-013" (67f3cddb74d7454094c05120)
export async function bLU003013(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsExcludeTax(page, vars);
  vars.includeTax = `no`;
  vars.currency = ``;
  vars.test = `subscription`;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=73`);
  await page.waitForLoadState('load');
  await page.locator(`a[href*="/checkout"]`).filter({ visible: true }).first().click({ force: true });
  await fillCheckoutDataSubscription(page, vars);
  await blockUI(page, vars);
  await addCoupon(page, vars);
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return !!element }, vars)) {
    await page.locator(`.wcs-recurring-totals-panel__details > .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  await getDefaultCurrencyPriceOnCart(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return !!element }, vars)) {
    await page.locator(`.wcs-recurring-totals-panel__details > .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  await getDefaultCurrencyPriceOnCart(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await verifyTaxAndTotalsOnCartAndCheckout(page, vars);
  }
}

// GI: "BLU-003-013 Price Including tax" (67f3cddb74d7454094c05121)
export async function bLU003013PriceIncludingTax(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsIncludeTax(page, vars);
  vars.includeTax = `yes`;
  vars.currency = ``;
  await page.goto(`${vars.startUrl ?? ''}?add-to-cart=73`);
  await page.waitForLoadState('load');
  await page.locator(`a[href*="/checkout"]`).filter({ visible: true }).first().click({ force: true });
  await fillCheckoutDataSubscription(page, vars);
  await blockUI(page, vars);
  await addCoupon(page, vars);
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return !!element }, vars)) {
    await page.locator(`.wcs-recurring-totals-panel__details > .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  await getDefaultCurrencyPriceOnCart(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return !!element }, vars)) {
    await page.locator(`.wcs-recurring-totals-panel__details > .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  await getDefaultCurrencyPriceOnCart(page, vars);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await verifyCurrencyOnThePage(page, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await verifyTaxAndTotalsOnCartAndCheckout(page, vars);
  }
}

// GI: "BLU-003-015 (Price Excl. Tax)" (67f3cddb74d7454094c05122)
export async function bLU003015PriceExclTax(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsExcludeTax(page, vars);
  vars.includeTax = `no`;
  vars.test = ``;
  vars.currency = `${vars.curr ?? ''}`;
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.payment = `cc`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-003-015 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-003-015}}`;
  await addSimpleProductToCart(page, vars);
  await addCoupon(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total)
return total }, vars);
  await verifyVaultedShopper(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-015 (Price Excl. Tax) Admin side" (67f3cddb74d7454094c05123)
export async function bLU003015PriceExclTaxAdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await verifyCurrencyOnBackendOrder(page, vars);
}

// GI: "BLU-003-015 (Price Incl. Tax)" (67f3cddb74d7454094c05124)
export async function bLU003015PriceInclTax(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsIncludeTax(page, vars);
  vars.includeTax = `yes`;
  vars.currency = `${vars.curr ?? ''}`;
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-003-015_2 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-003-015_2}}`;
  await addSimpleProductToCart(page, vars);
  await addCoupon(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total)
return total }, vars);
  await verifyVaultedShopper(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-015 (Price Incl. Tax) Admin side" (67f3cddb74d7454094c05125)
export async function bLU003015PriceInclTaxAdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await verifyCurrencyOnBackendOrder(page, vars);
}

// GI: "BLU-003-018 - 01 - Include tax" (67f3cddb74d7454094c05126)
export async function bLU00301801IncludeTax(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsIncludeTax(page, vars);
  vars.includeTax = `yes`;
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-003-018 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-003-018}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await addCoupon(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total)
return total }, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-018 - 01 - Include tax - (BackEnd & renew)" (67f3cddb74d7454094c05127)
export async function bLU00301801IncludeTaxBackEndRenew(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.renew = `yes`;
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
  await verifyCurrencyOnBackendOrder(page, vars);
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyCurrencyOnBackendRenew(page, vars);
  await changeCurrencyFormat(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-018 - 02 - Exclude tax" (67f3cddb74d7454094c05128)
export async function bLU00301802ExcludeTax(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await settingsExcludeTax(page, vars);
  vars.includeTax = `no`;
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  vars.status = `Processing`;
  vars.renew = `no`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-003-018 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-003-018}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await addCoupon(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total)
return total }, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-018-1" (67f3cddb74d7454094c05129)
export async function bLU0030181(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.renew = `yes`;
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
  await verifyCurrencyOnBackendOrder(page, vars);
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyCurrencyOnBackendRenew(page, vars);
  await changeCurrencyFormat(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-018-2" (67f3cddb74d7454094c0512a)
export async function bLU0030182(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.manualRenew = `Yes`;
  await changeCurrencyFormat(page, vars);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`{{email-BLU-003-018}}`); } catch { await page.locator(`#username`).first().selectOption(`{{email-BLU-003-018}}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await subscriptionMenu(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Renew now")]`).or(page.locator(`a[href*="/my-account/?subscription_renewal_early=${vars.subscriptionID ?? ''}&subscription_renewal=true"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await expect(page.locator(`.wc_payment_method.payment_method_bluesnap_ach`)).toHaveCount(0);
  await verifyCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  vars.renewOrder = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVsn = blueSnapVs.split("")
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2 })()) {
    await expect(page.locator(`li > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await verifyCurrencyOnTheAfterPlaceOrder(page, vars);
  }
  await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).first()).toContainText(`#${vars.subscriptionID ?? ''}`);
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`).or(page.locator(`td > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`)).or(page.locator(`th > a[href*="/my-account/view-order/${vars.renewOrder ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toHaveText(`${vars.status ?? ''}`);
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await verifyCurrencyOnTheAfterPlaceOrder(page, vars);
  }
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
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[11])
return total }, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-018-3" (67f3cddb74d7454094c0512b)
export async function bLU0030183(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.manualRenew = ``;
  vars.renew = ``;
  await getLogRequestResponseCurrencyRate(page, vars);
  vars.status = `Processing`;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001_018-3 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-001_018-3}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await addCoupon(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  vars.checklogs = `upgrade`;
  vars.useSavedCC = `yes`;
  await getVariablesForSubscriptions(page, vars);
  await goToMyAccount(page, vars);
  vars.totalOld = `${vars.total ?? ''}`;
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total)
return total }, vars);
  await subscriptionMenu(page, vars);
  await upgradeSubscription(page, vars);
  await addCoupon(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  vars.totalRenewOld = `${vars.totalRenew ?? ''}`;
  await getWooSubscriptionDetails(page, vars);
  await getLogRequestResponseUpgrade(page, vars);
  await verifyLogsTRAUTHCAPTUREUpgrade26X(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[4])
return total }, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-018-3 - Renew" (67f3cddb74d7454094c0512c)
export async function bLU0030183Renew(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.renew = `yes`;
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
  await verifyCurrencyOnBackendOrder(page, vars);
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyCurrencyOnBackendRenew(page, vars);
  await changeCurrencyFormat(page, vars);
  vars.checklogs = ``;
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-018-4" (67f3cddb74d7454094c0512d)
export async function bLU0030184(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.checklogs = ``;
  vars.useSavedCC = ``;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-001-018-4 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email-BLU-001-018-4}}`;
  vars.email = `{{email-BLU-001-018-4}}`;
  await extractFourDigitsOfCC(page, vars);
  await register(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await addCoupon(page, vars);
  await fillCheckoutDataSubscriptionLoggedUser(page, vars);
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getVariablesForSubscriptions(page, vars);
  await forceRenewOrderToFail(page, vars);
  vars.order = `fail`;
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await changeCurrencyFormat(page, vars);
  await expect(page.locator(`tr:nth-of-type(1) > .woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key=wc_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await verifyCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Renew subscription")]`).or(page.locator(`#place_order`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await verifyCurrencyOnTheAfterPlaceOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let total = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR'}).format(result[11])
return total }, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-019" (67f3cddb74d7454094c0512e)
export async function bLU003019(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getLogRequestResponseCurrencyRate(page, vars);
  vars.status = `Processing`;
  vars.freeTrial = `yes`;
  vars.order = ``;
  vars.renew = ``;
  vars.checklogs = ``;
  vars.test = `subscription`;
  vars.user = `new`;
  vars.subStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-003-019 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-003-019}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCartWithFreeTrial(page, vars);
  await addCoupon(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await subscriptionMenu(page, vars);
  await getWooOrderDetails(page, vars);
  await getWooSubscriptionDetails(page, vars);
  await checkCartIsEmpty(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total)
return total }, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-019-1" (67f3cddb74d7454094c0512f)
export async function bLU0030191(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.renew = `yes`;
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
  await verifyCurrencyOnBackendOrder(page, vars);
  await renewByAdmin(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await verifyCurrencyOnBackendRenew(page, vars);
  await changeCurrencyFormat(page, vars);
  vars.freeTrial = ``;
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-003-025" (67f3cddb74d7454094c05130)
export async function bLU003025(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getPreOrderVersion(page, vars);
  vars.currency = `${vars.curr ?? ''}`;
  vars.renew = ``;
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) >= 2 })()) {
    vars.status = `Pre-ordered`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 && Number(PreOrderVs[0]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  vars.freeTrial = ``;
  vars.checklogs = ``;
  vars.test = `preorder`;
  vars.user = `new`;
  vars.pay = `now`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-003-025 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-003-025}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUponReleaseToCart(page, vars);
  await addCoupon(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillCCInfo26X(page, vars);
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placePreOrder(page, vars);
  await getLogRequestResponseRecurringOndemand(page, vars);
  await getWooOrderDetails(page, vars);
  await verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total)
return total }, vars);
  await verifyEmailAdminAndCustomer(page, vars);
  vars.orderNumber003-025 = `${vars.orderNumber ?? ''}`;
  vars.subsID003-025 = `${vars.subsID ?? ''}`;
  vars.total003-025 = `${vars.total ?? ''}`;
  vars.lastName003-025 = `${vars.lastName ?? ''}`;
  vars.vaultedShopperId003-025 = `${vars.vaultedShopperId ?? ''}`;
  vars.listPrices003-025 = `${vars.listPrices ?? ''}`;
}

// GI: "BLU-003-026 - Step 1 - Pay Later order" (67f3cddb74d7454094c05131)
export async function bLU003026Step1PayLaterOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `preorder`;
  vars.pay = `later`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-003-026 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-003-026}}`;
  vars.username = `{{email-BLU-003-026}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUponReleaseToCart(page, vars);
  await addCoupon(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_pre_orders_pay_later"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-pre_orders_pay_later"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_pre_orders_pay_later`).or(page.locator(`#radio-control-wc-payment-method-options-pre_orders_pay_later`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placePreOrder(page, vars);
  await preOrderMenu(page, vars);
  await getWooOrderDetails(page, vars);
}

// GI: "BLU-003-026 - Step 2 - Admin Complete preorder" (67f3cddb74d7454094c05132)
export async function bLU003026Step2AdminCompletePreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  vars.status = `Pending payment`;
  await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`).or(page.locator(`tr#order-${vars.orderNumber ?? ''} mark.order-status.status-pending > span`)).first()).toContainText(`${vars.status ?? ''}`);
  await page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`).or(page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await verifyCurrencyOnBackendOrder(page, vars);
}

// GI: "BLU-003-026 - Step 3 - Pay Preorder" (67f3cddb74d7454094c05133)
export async function bLU003026Step3PayPreorder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.user = `new`;
  vars.saveCC = `no`;
  vars.useSavedCC = `no`;
  await logIn(page, vars);
  await payOrderPendingPayment(page, vars);
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await extractPftoken(page, vars);
  await fillCCInfo26X(page, vars);
  vars.payForOrder = `yes`;
  await customerPayPendingOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return Number(jsonOrder.total) }, vars);
  await verifyLogsTransactions26X(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total)
return total }, vars);
  if (!vars.blog.includes('blocks')) {
    await verifyEmailAdminAndCustomer(page, vars);
  }
}

// GI: "BLU-003-027" (67f3cddb74d7454094c05134)
export async function bLU003027(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `preorder`;
  vars.payForOrder = ``;
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) >= 2 })()) {
    vars.status = `Pre-ordered`;
  }
  if ((() => { let PreOrderVs = vars.PreOrderVs;
PreOrderVs = PreOrderVs.split('.');
return Number(PreOrderVs[0]) === 1 && Number(PreOrderVs[1]) === 7 && Number(PreOrderVs[0]) <= 2 })()) {
    vars.status = `Pre ordered`;
  }
  vars.user = `new`;
  vars.saveCC = `yes`;
  vars.useSavedCC = `no`;
  vars.pay = `upfront`;
  vars.preOrderStatus = `Active`;
  await useAMEX(page, vars);
  vars.email-BLU-003-027 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-003-027}}`;
  vars.username = `{{email-BLU-003-027}}`;
  await extractFourDigitsOfCC(page, vars);
  await addPreOrderProductUpfrontToCart(page, vars);
  await addCoupon(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placePreOrder(page, vars);
  await getGroupLogRequestResponseTransactions(page, vars);
  await getWooOrderDetails(page, vars);
  await calculateTotalUSD(page, vars);
  await verifyLogsTransactions26X(page, vars);
  await preOrderMenu(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.orderNumber003-027 = `${vars.orderNumber ?? ''}`;
  vars.subsID003-027 = `${vars.subsID ?? ''}`;
  vars.total003-027 = `${vars.total ?? ''}`;
  vars.lastName003-027 = `${vars.lastName ?? ''}`;
  vars.vaultedShopperId003-027 = `${vars.vaultedShopperId ?? ''}`;
  vars.listPrices003-027 = `${vars.listPrices ?? ''}`;
}

// GI: "BLU-003-028" (67f3cddb74d7454094c05135)
export async function bLU003028(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.email = `{{email-BLU-003-025}}`;
  vars.test = `preorder`;
  vars.pay = `now`;
  vars.orderNumber = `{{orderNumber003-025}}`;
  vars.subsID = `{{subsID003-025}}`;
  vars.total = `{{total003-025}}`;
  vars.lastName = `{{lastName003-025}}`;
  vars.vaultedShopperId = `{{vaultedShopperId003-025}}`;
  vars.listPrices = `{{listPrices003-025}}`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Order ${vars.orderNumber ?? ''}")]`).or(page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"]`)).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await verifyCurrencyOnBackendOrder(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseRecurringOndemandSubsID(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Number(result[5].toFixed(2))
 }, vars);
  await verifyLogsTRAUTHCAPTURERenewal(page, vars);
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  await getLogRequestResponseUpgrade(page, vars);
  await verifyLogsTRAUTHCAPTUREPreORderUponReleaseComplete(page, vars);
  await changeCurrencyFormat(page, vars);
  vars.complete = `yes`;
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-003-029" (67f3cddb74d7454094c05136)
export async function bLU003029(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.email = `{{email-BLU-003-027}}`;
  vars.pay = `upfront`;
  vars.test = `preorder`;
  vars.orderNumber = `{{orderNumber003-027}}`;
  vars.subsID = `{{subsID003-027}}`;
  vars.total = `{{total003-027}}`;
  vars.lastName = `{{lastName003-027}}`;
  vars.vaultedShopperId = `{{vaultedShopperId003-027}}`;
  vars.listPrices = `{{listPrices003-027}}`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  await completePreOrderWithAdmin(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Order ${vars.orderNumber ?? ''}")]`).or(page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"]`)).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await verifyCurrencyOnBackendOrder(page, vars);
  await getLogRequestResponseNoRecurringOndemand(page, vars);
  await getLogRequestResponseNoTransactions(page, vars);
  await changeCurrencyFormat(page, vars);
  vars.complete = `yes`;
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-003-040 - Step 1 - Create order" (67f3cddb74d7454094c05137)
export async function bLU003040Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.currency = `${vars.curr ?? ''}`;
  vars.complete = ``;
  vars.status = `Processing`;
  vars.user = `new`;
  vars.lastName = `${vars.alphanumeric ?? ''}`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-003-040 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-003-040}}`;
  await addSimpleProductToCart(page, vars);
  await addCoupon(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await calculateTotalUSD(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
}

// GI: "BLU-003-040 - Step 2 - Full refund" (67f3cddb74d7454094c05138)
export async function bLU003040Step2FullRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `full`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  try { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().fill(`${vars.shippingTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingTotal ?? ''}`); }
  try { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTaxTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTaxTotal ?? ''}`); }
  vars.testID = `BLU-003-040`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await verifyCurrencyOnBackendOrder(page, vars);
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  }
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`
let defaultParts = vars.defaultParts
let decimal = defaultParts.find(part => part.type === 'decimal').value

const numericString = total.replace(/[^0-9.,]/g, '');
let numericValue;
// Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
if (decimal === ',') {
  numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
} else {
  numericValue = parseFloat(numericString.replace(',',''));
}

return numericValue }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(vars.total)
return total }, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-003-041 - Step 1 - Create order" (67f3cddb74d7454094c05139)
export async function bLU003041Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.currency = `${vars.curr ?? ''}`;
  vars.status = `Processing`;
  vars.user = `new`;
  await useAMEX(page, vars);
  await extractFourDigitsOfCC(page, vars);
  vars.email_BLU-003-041 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email_BLU-003-041}}`;
  await addSimpleProductToCart(page, vars);
  await addCoupon(page, vars);
  await getLogRequestResponseCurrencyRate(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataCreateAccount(page, vars);
  await fillCCInfo26X(page, vars);
  await saveCC(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await calculateTotalUSD(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
}

// GI: "BLU-003-041 - Step 2 - Partial refund" (67f3cddb74d7454094c0513a)
export async function bLU003041Step2PartialRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
  vars.testID = `BLU-003-041`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await verifyCurrencyOnBackendOrder(page, vars);
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.partialRefund}`
let defaultParts = vars.defaultParts
let decimal = defaultParts.find(part => part.type === 'decimal').value

const numericString = total.replace(/[^0-9.,]/g, '');
let numericValue;
// Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
if (decimal === ',') {
  numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
} else {
  numericValue = parseFloat(numericString.replace(',',''));
}

return numericValue }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-003-042 - Step 1 - Create order" (67f3cddb74d7454094c0513b)
export async function bLU003042Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  vars.status = `Processing`;
  vars.test = `subscription`;
  await useAMEX(page, vars);
  vars.email-BLU-003_042 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-003_042}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await addCoupon(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getWooSubscriptionDetails(page, vars);
  vars.subscriptionID_042 = `${vars.subscriptionID ?? ''}`;
}

// GI: "BLU-003-042 - Step 2 - Full refund Subs Parent" (67f3cddb74d7454094c0513c)
export async function bLU003042Step2FullRefundSubsParent(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `full`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  try { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().fill(`${vars.shippingTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingTotal ?? ''}`); }
  try { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTaxTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTaxTotal ?? ''}`); }
  vars.testID = `BLU-003-042`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await verifyCurrencyOnBackendOrder(page, vars);
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (currency !== "JPY" && currency !== "GBP") 
        || 
        (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5))
        ||
        (currency === "GBP" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) })()) {
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (currency !== "JPY" && currency !== "GBP") 
        || 
        (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5))
        ||
        (currency === "GBP" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (currency !== "JPY" && currency !== "GBP") 
        || 
        (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5))
        ||
        (currency === "GBP" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  }
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`
let defaultParts = vars.defaultParts
let decimal = defaultParts.find(part => part.type === 'decimal').value

const numericString = total.replace(/[^0-9.,]/g, '');
let numericValue;
// Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
if (decimal === ',') {
  numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
} else {
  numericValue = parseFloat(numericString.replace(',',''));
}

return numericValue }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-003-043 - Step 1 - Create order" (67f3cddb74d7454094c0513d)
export async function bLU003043Step1CreateOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.currency = `${vars.curr ?? ''}`;
  await getLogRequestResponseCurrencyRate(page, vars);
  vars.status = `Processing`;
  vars.test = `subscription`;
  await useAMEX(page, vars);
  vars.email-BLU-003_043 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.email = `{{email-BLU-003_043}}`;
  await extractFourDigitsOfCC(page, vars);
  await addVariableSubscriptionProductToCart(page, vars);
  await addCoupon(page, vars);
  await selectCurrencyOnFrontEnd(page, vars);
  await fillCheckoutDataSubscription(page, vars);
  await fillCCInfo26X(page, vars);
  await getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page, vars);
  await placeOrder(page, vars);
  await getWooOrderDetails(page, vars);
  await getTransactionDetailsFromBluesnap(page, vars);
  await getWooSubscriptionDetails(page, vars);
  vars.subscriptionID_043 = `${vars.subscriptionID ?? ''}`;
}

// GI: "BLU-003-043 - Step 2 - Partial refund Sub parent" (67f3cddb74d7454094c0513e)
export async function bLU003043Step2PartialRefundSubParent(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
  vars.testID = `BLU-003-043`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await verifyCurrencyOnBackendOrder(page, vars);
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.partialRefund}`
let defaultParts = vars.defaultParts
let decimal = defaultParts.find(part => part.type === 'decimal').value

const numericString = total.replace(/[^0-9.,]/g, '');
let numericValue;
// Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
if (decimal === ',') {
  numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
} else {
  numericValue = parseFloat(numericString.replace(',',''));
}

return numericValue }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-003-044" (67f3cddb74d7454094c0513f)
export async function bLU003044(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `partial`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let listPrices = vars.listPrices
total = listPrices[5]
return total }, vars);
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
  vars.testID = `BLU-003-044`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`tr:nth-of-type(1).refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  vars.partialRefund2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*2
return total }, vars);
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund2 ?? ''}`);
  }
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.partialRefund}`
total = total.replace(`${vars.symbol}`,"").trim();
return total }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
}

// GI: "BLU-003-045 - Step 1" (67f3cddb74d7454094c05140)
export async function bLU003045Step1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.subscriptionID = `${vars.subscriptionID_042 ?? ''}`;
  vars.email = `{{email-BLU-003_042}}`;
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await renewByAdmin(page, vars);
}

// GI: "BLU-003-045 - Step 2 - Full refund renew order" (67f3cddb74d7454094c05141)
export async function bLU003045Step2FullRefundRenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `full`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  try { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().fill(`${vars.shippingTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input[placeholder="0"][type="text"].refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingTotal ?? ''}`); }
  try { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTaxTotal ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTaxTotal ?? ''}`); }
  vars.testID = `BLU-003-045`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await verifyCurrencyOnBackendRenew(page, vars);
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  }
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`
let defaultParts = vars.defaultParts
let decimal = defaultParts.find(part => part.type === 'decimal').value

const numericString = total.replace(/[^0-9.,]/g, '');
let numericValue;
// Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
if (decimal === ',') {
  numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
} else {
  numericValue = parseFloat(numericString.replace(',',''));
}

return numericValue }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-003-046 - Step 1" (67f3cddb74d7454094c05142)
export async function bLU003046Step1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  vars.subscriptionID = `${vars.subscriptionID_043 ?? ''}`;
  vars.email = `{{email-BLU-003_043}}`;
  vars.username = `{{email-BLU-001_043}}`;
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await renewByAdmin(page, vars);
}

// GI: "BLU-003-046 - Step 2 - Partial refund renew order" (67f3cddb74d7454094c05143)
export async function bLU003046Step2PartialRefundRenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
  vars.testID = `BLU-003-046`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await verifyCurrencyOnBackendRenew(page, vars);
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  }
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.partialRefund}`
let defaultParts = vars.defaultParts
let decimal = defaultParts.find(part => part.type === 'decimal').value

const numericString = total.replace(/[^0-9.,]/g, '');
let numericValue;
// Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
if (decimal === ',') {
  numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
} else {
  numericValue = parseFloat(numericString.replace(',',''));
}

return numericValue }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
}

// GI: "BLU-003-062" (67f3cddb74d7454094c05144)
export async function bLU003062(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.nav-menu > .page_item.page-item-7 > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  vars.email = `{{email-BLU-003-018}}`;
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#page > div.header-widget-region > div > form#bluesnap-multicurrency > select`).or(page.locator(`div > form.bluesnap-multicurrency > select`)).first()).toHaveText(`${vars.currency ?? ''}`);
}
