// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - ACH - Fields, Transaction, Vaulted Shopper"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { addSimpleProductToCart, addSimpleProductToCartDownloadable, addSimpleProductToCartVirtual, blueSnapSandboxEndRefund, checkACHCCSavedOnCheckout, checkCartIsEmpty, checkTranscationIsPresentOnOrderBackend, cleanEmails, deactivatePayPal, deactivatePreOrder, extractDate, fillACHInfo, fillBillingDetails, fillCheckoutDataCreateAccount, fillCheckoutDataNotCreatingAccount, getAltTransactionDetailsFromBluesnap, getBlueSnapVersion, getGroupLogRequestResponse, getLogRequestResponseAltTransactions, getLogRequestResponseIPN, getLogRequestResponseRefunds, getLogRequestResponseVaultedShopper, getLogRequestResponseVaultedShopperAddPaymentMethod, getSiteTitle, getWooOrderDetails, goToOrderWithAdmin, logIn, loginAdmin, paymentMethodMenuACHCCAvailable, placeOrder, placeOrderButtonEnabled, placeOrderGuestUser, register, verifyEmailAdminAndCustomer, verifyEmailOnlyAdmin, verifyEmailOnlyCustomer, verifyLogsTRAUTHCAPTURERefund, verifyLogsTRGuestShopperACH, verifyNoVaultedShopperRequest, verifyVaultedShopper, verifyVaultedShopperACHDeletePaymentMethodOnMyAccount } from './bluesnap-common-steps-for-suites';
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

// GI: "BLU-002-001" (6841997ec637c9246eb7ed78)
export async function bLU002001(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await getSiteTitle(page, vars);
  await deactivatePreOrder(page, vars);
  await deactivatePayPal(page, vars);
  await getBlueSnapVersion(page, vars);
  vars.email_BLU-002-001 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.product = `simple`;
  vars.email = `{{email_BLU-002-001}}`;
  vars.test = `002-001`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  await addSimpleProductToCartVirtual(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await fillACHInfo(page, vars);
  await placeOrderGuestUser(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  vars.transaction_id001 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber002-001 = `${vars.orderNumber ?? ''}`;
  vars.total002-001 = `${vars.total ?? ''}`;
  await getLogRequestResponseAltTransactions(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  await verifyEmailAdminAndCustomer(page, vars);
}

// GI: "BLU-002-001" (6633cc7789e87fd839f5c586)
export async function bLU002001(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002001(page, vars);
}

// GI: "BLU-002-001" (68419dcdc637c9246eb970b3)
export async function bLU002001(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002001(page, vars);
}

// GI: "BLU-002-001 - Admin side" (6841997ec637c9246eb7ed79)
export async function bLU002001AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-002-001 - Admin side" (6633cc7789e87fd839f5c587)
export async function bLU002001AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002001AdminSide(page, vars);
}

// GI: "BLU-002-001 - Admin side" (68419dcdc637c9246eb970b4)
export async function bLU002001AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002001AdminSide(page, vars);
}

// GI: "BLU-002-002" (6841997ec637c9246eb7ed7a)
export async function bLU002002(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  vars.company = ``;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap_ach"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap_ach`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap_ach`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 4) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const options = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('select#bluesnap_ach-account-type option[value*="consumer"], select#bluesnap_ach-account-type option[value*="corporate"]'))


const expectedTexts = [
  "Consumer Checking",
  "Consumer Savings", 
  "Corporate Checking",
  "Corporate Savings"
];

// Check that EVERY option has exactly one of the expected texts
const allTextsAreCorrect = options.every(opt => 
  expectedTexts.includes(opt.textContent.trim())
);

// Check that we have ALL four expected options (no missing ones)
const allExpectedTextsPresent = expectedTexts.every(text => 
  options.some(opt => opt.textContent.trim() === text)
);

const isFullyValid = allTextsAreCorrect && allExpectedTextsPresent;

console.log("All texts correct and complete?", isFullyValid);

return isFullyValid
 }, vars)).toBeTruthy();
  }
  if ((() => { let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) < 4) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const options = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('select#bluesnap_ach-account-type option[value*="consumer"], select#bluesnap_ach-account-type option[value*="corporate"]'))


const expectedTexts = [
  "Consumer checking",
  "Consumer savings", 
  "Corporate checking",
  "Corporate savings"
];

// Check that EVERY option has exactly one of the expected texts
const allTextsAreCorrect = options.every(opt => 
  expectedTexts.includes(opt.textContent.trim())
);

// Check that we have ALL four expected options (no missing ones)
const allExpectedTextsPresent = expectedTexts.every(text => 
  options.some(opt => opt.textContent.trim() === text)
);

const isFullyValid = allTextsAreCorrect && allExpectedTextsPresent;

console.log("All texts correct and complete?", isFullyValid);

return isFullyValid
 }, vars)).toBeTruthy();
  }
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//*[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//*[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Missing account number.
Missing routing number.
Please select an account type.
Account number must be 4-17 digits long.
Routing number must be a 9 digit number.
You need to Authorize this transaction.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
console.log(element)
return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner__content > div`).first()).toHaveText(`Missing account number.`);
  }
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`22`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`22`); }
  await placeOrderButtonEnabled(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner__content > div`).first()).toHaveText(`Missing routing number.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Missing routing number.
Please select an account type.
Account number must be 4-17 digits long.
Routing number must be a 9 digit number.
You need to Authorize this transaction.`);
  }
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`99`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`99`); }
  await placeOrderButtonEnabled(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner__content > div`).first()).toHaveText(`Please select an account type.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Please select an account type.
Account number must be 4-17 digits long.
Routing number must be a 9 digit number.
You need to Authorize this transaction.`);
  }
  try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`consumer-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`consumer-checking`); }
  await placeOrderButtonEnabled(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner__content > div`).first()).toHaveText(`Account number must be 4-17 digits long.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Account number must be 4-17 digits long.
Routing number must be a 9 digit number.
You need to Authorize this transaction.`);
  }
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`223344556`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`223344556`); }
  await placeOrderButtonEnabled(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner__content > div`).first()).toHaveText(`Routing number must be a 9 digit number.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Routing number must be a 9 digit number.
You need to Authorize this transaction.`);
  }
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`998877665`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`998877665`); }
  await placeOrderButtonEnabled(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner__content > div`).first()).toHaveText(`You need to Authorize this transaction.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`You need to Authorize this transaction.`);
  }
  {
    const _lbl = page.locator(`label[for="bluesnap_ach-user-consent"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#bluesnap_ach-user-consent`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`corporate-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`corporate-checking`); }
  await placeOrderButtonEnabled(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner__content > div`).first()).toHaveText(`Using a corporate account requires a non empty company field.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Using a corporate account requires a non empty company field.`);
  }
  vars.company = `Saucal Inc.`;
}

// GI: "BLU-002-002" (6633cc7789e87fd839f5c588)
export async function bLU002002(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002002(page, vars);
}

// GI: "BLU-002-002" (68419dcdc637c9246eb970b5)
export async function bLU002002(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002002(page, vars);
}

// GI: "BLU-002-003" (6841997ec637c9246eb7ed7b)
export async function bLU002003(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`${vars.routingNumberA ?? ''}`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`${vars.routingNumberA ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`consumer-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`consumer-checking`); }
  {
    const _lbl = page.locator(`label[for="bluesnap_ach-user-consent"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#bluesnap_ach-user-consent`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(1)`)).first()).toContainText(`Missing account number.`);
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(2)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(2)`)).first()).toContainText(`Account number must be 4-17 digits long.`);
}

// GI: "BLU-002-004" (6841997ec637c9246eb7ed7c)
export async function bLU002004(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`${vars.accountNumberA ?? ''}`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`${vars.accountNumberA ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`consumer-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`consumer-checking`); }
  {
    const _lbl = page.locator(`label[for="bluesnap_ach-user-consent"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#bluesnap_ach-user-consent`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(1)`)).first()).toContainText(`Missing routing number.`);
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(2)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(2)`)).first()).toContainText(`Routing number must be a 9 digit number.`);
}

// GI: "BLU-002-005" (6841997ec637c9246eb7ed7d)
export async function bLU002005(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`${vars.accountNumberA ?? ''}`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`${vars.accountNumberA ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`${vars.routingNumberA ?? ''}`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`${vars.routingNumberA ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="bluesnap_ach-user-consent"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#bluesnap_ach-user-consent`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toContainText(`Please select an account type.`);
}

// GI: "BLU-002-006" (6841997ec637c9246eb7ed7e)
export async function bLU002006(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`${vars.accountNumberA ?? ''}`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`${vars.accountNumberA ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`${vars.routingNumberA ?? ''}`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`${vars.routingNumberA ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`consumer-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`consumer-checking`); }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toContainText(`You need to Authorize this transaction.`);
}

// GI: "BLU-002-007" (6841997ec637c9246eb7ed7f)
export async function bLU002007(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await blockUI(page, vars);
  try { await page.locator(`#billing_company`).first().fill(``); } catch { await page.locator(`#billing_company`).first().selectOption(``); }
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`${vars.accountNumberA ?? ''}`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`${vars.accountNumberA ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`${vars.routingNumberA ?? ''}`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`${vars.routingNumberA ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`corporate-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`corporate-checking`); }
  {
    const _lbl = page.locator(`label[for="bluesnap_ach-user-consent"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#bluesnap_ach-user-consent`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toContainText(`Using a corporate account requires a non empty company field.`);
}

// GI: "BLU-002-008" (6841997ec637c9246eb7ed80)
export async function bLU002008(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email_BLU-002-008 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.product = `simple`;
  vars.email = `{{email_BLU-002-008}}`;
  vars.test = `002-008`;
  vars.trans = `declined`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberD ?? ''}`;
  vars.routingNumber = `${vars.routingNumberD ?? ''}`;
  await addSimpleProductToCart(page, vars);
  await fillCheckoutDataNotCreatingAccount(page, vars);
  await fillACHInfo(page, vars);
  await placeOrderGuestUser(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getLogRequestResponseAltTransactions(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.transaction_id008 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber002-008 = `${vars.orderNumber ?? ''}`;
}

// GI: "BLU-002-008" (6633cc7789e87fd839f5c58e)
export async function bLU002008(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002008(page, vars);
}

// GI: "BLU-002-008" (68419dcdc637c9246eb970bb)
export async function bLU002008(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002008(page, vars);
}

// GI: "BLU-002-008 - Admin side" (6841997ec637c9246eb7ed81)
export async function bLU002008AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-002-008 - Admin side" (6633cc7789e87fd839f5c58f)
export async function bLU002008AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002008AdminSide(page, vars);
}

// GI: "BLU-002-008 - Admin side" (68419dcdc637c9246eb970bc)
export async function bLU002008AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002008AdminSide(page, vars);
}

// GI: "BLU-002-009" (6841997ec637c9246eb7ed82)
export async function bLU002009(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `002-009`;
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    vars.product = `simple`;
  }
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    vars.email_BLU-002-009 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  }
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    vars.email = `{{email_BLU-002-009}}`;
  }
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    await addSimpleProductToCartVirtual(page, vars);
  }
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    await fillCheckoutDataCreateAccount(page, vars);
  }
  await fillACHInfo(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')

return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`div.payment_box.payment_method_bluesnap_ach > p.form-row.woocommerce-SavedPaymentMethods-saveNew`).first()).toHaveText(`This payment method will be saved to your account.`);
  }
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getLogRequestResponseAltTransactions(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    vars.transaction_id009 = `${vars.transaction_id ?? ''}`;
  }
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    vars.orderNumber002-009 = `${vars.orderNumber ?? ''}`;
  }
  if ((() => { let testId =vars.testId
return testId !== "BLU-002-063" })()) {
    vars.total002-009 = `${vars.total ?? ''}`;
  }
}

// GI: "BLU-002-009" (6633cc7789e87fd839f5c590)
export async function bLU002009(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002009(page, vars);
}

// GI: "BLU-002-009" (68419dcdc637c9246eb970bd)
export async function bLU002009(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002009(page, vars);
}

// GI: "BLU-002-009 - Admin side" (6841997ec637c9246eb7ed83)
export async function bLU002009AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-002-009 - Admin side" (6633cc7789e87fd839f5c591)
export async function bLU002009AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002009AdminSide(page, vars);
}

// GI: "BLU-002-009 - Admin side" (68419dcdc637c9246eb970be)
export async function bLU002009AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002009AdminSide(page, vars);
}

// GI: "BLU-002-010" (6841997ec637c9246eb7ed84)
export async function bLU002010(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.trans = `accepted`;
  vars.prod = `downloadable`;
  vars.test = `002-010`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.username = `{{email_BLU-002-009}}`;
  await logIn(page, vars);
  await addSimpleProductToCartDownloadable(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
 
return element !== null && element !== undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await checkACHCCSavedOnCheckout(page, vars);
  await placeOrder(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getLogRequestResponseAltTransactions(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.transaction_id010 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber002-010 = `${vars.orderNumber ?? ''}`;
  vars.total002-010 = `${vars.total ?? ''}`;
}

// GI: "BLU-002-010" (6633cc7789e87fd839f5c592)
export async function bLU002010(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002010(page, vars);
}

// GI: "BLU-002-010" (68419dcdc637c9246eb970bf)
export async function bLU002010(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002010(page, vars);
}

// GI: "BLU-002-010 - Admin side" (6841997ec637c9246eb7ed85)
export async function bLU002010AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Completed`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-002-010 - Admin side" (6633cc7789e87fd839f5c593)
export async function bLU002010AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002010AdminSide(page, vars);
}

// GI: "BLU-002-010 - Admin side" (68419dcdc637c9246eb970c0)
export async function bLU002010AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002010AdminSide(page, vars);
}

// GI: "BLU-002-011" (6841997ec637c9246eb7ed86)
export async function bLU002011(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.trans = `accepted`;
  vars.prod = ``;
  vars.test = `002-011`;
  vars.payment = `ach`;
  vars.accountNumber = `2${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.username = `{{email_BLU-002-009}}`;
  await logIn(page, vars);
  await addSimpleProductToCart(page, vars);
  await checkACHCCSavedOnCheckout(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
 
return element !== null && element !== undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="wc-bluesnap_ach-payment-token-new"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wc-bluesnap_ach-payment-token-new`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await fillACHInfo(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
 
return element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`div.payment_box.payment_method_bluesnap_ach > p.form-row.woocommerce-SavedPaymentMethods-saveNew`).first()).toHaveText(`This payment method will be saved to your account.`);
  }
  await placeOrder(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getLogRequestResponseAltTransactions(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopper(page, vars);
  vars.transaction_id011 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber002-011 = `${vars.orderNumber ?? ''}`;
}

// GI: "BLU-002-011" (6633cc7789e87fd839f5c594)
export async function bLU002011(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002011(page, vars);
}

// GI: "BLU-002-011" (68419dcdc637c9246eb970c1)
export async function bLU002011(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002011(page, vars);
}

// GI: "BLU-002-011 - Admin side" (6841997ec637c9246eb7ed87)
export async function bLU002011AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-002-011 - Admin side" (6633cc7789e87fd839f5c595)
export async function bLU002011AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002011AdminSide(page, vars);
}

// GI: "BLU-002-011 - Admin side" (68419dcdc637c9246eb970c2)
export async function bLU002011AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002011AdminSide(page, vars);
}

// GI: "BLU-002-012" (6841997ec637c9246eb7ed88)
export async function bLU002012(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  vars.trans = `accepted`;
  vars.test = `002-012`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.email_BLU-002-012 = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `{{email_BLU-002-012}}`;
  vars.email = `{{email_BLU-002-012}}`;
  await register(page, vars);
  await fillBillingDetails(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(5000);
  await fillACHInfo(page, vars);
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;


return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 1) && 
        _3dsSetting !== "deactivated" &&
        payment !== "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector('#place_order');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method successfully added.`);
  await paymentMethodMenuACHCCAvailable(page, vars);
  await getLogRequestResponseVaultedShopperAddPaymentMethod(page, vars);
  await verifyVaultedShopper(page, vars);
}

// GI: "BLU-002-012" (6633cc7789e87fd839f5c596)
export async function bLU002012(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002012(page, vars);
}

// GI: "BLU-002-012" (68419dcdc637c9246eb970c3)
export async function bLU002012(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002012(page, vars);
}

// GI: "BLU-002-012-B" (6841997ec637c9246eb7ed89)
export async function bLU002012B(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payment = `ach`;
  vars.trans = `accepted`;
  vars.test = `002-012-B`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}2`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.username = `{{email_BLU-002-012}}`;
  vars.email = `{{email_BLU-002-012}}`;
  await logIn(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(5000);
  await fillACHInfo(page, vars);
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;


return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 1) && 
        _3dsSetting !== "deactivated" &&
        payment !== "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector('#place_order');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method successfully added.`);
  await getLogRequestResponseVaultedShopperAddPaymentMethod(page, vars);
  await verifyVaultedShopper(page, vars);
  await paymentMethodMenuACHCCAvailable(page, vars);
}

// GI: "BLU-002-012-B" (6633cc7789e87fd839f5c597)
export async function bLU002012B(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002012B(page, vars);
}

// GI: "BLU-002-012-B" (68419dcdc637c9246eb970c4)
export async function bLU002012B(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002012B(page, vars);
}

// GI: "BLU-002-013" (6841997ec637c9246eb7ed8a)
export async function bLU002013(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `002-013`;
  vars.trans = `accepted`;
  vars.payment = `ach`;
  vars.accountNumber = `${vars.accountNumberA ?? ''}`;
  vars.routingNumber = `${vars.routingNumberA ?? ''}`;
  vars.status = `On hold`;
  vars.username = `{{email_BLU-002-012}}`;
  await logIn(page, vars);
  await addSimpleProductToCart(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
 
return  element !== null && element !== undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await checkACHCCSavedOnCheckout(page, vars);
  await placeOrder(page, vars);
  await checkCartIsEmpty(page, vars);
  await getWooOrderDetails(page, vars);
  await getAltTransactionDetailsFromBluesnap(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.status === "on-hold" }, vars)).toBeTruthy();
  await getLogRequestResponseAltTransactions(page, vars);
  await verifyLogsTRGuestShopperACH(page, vars);
  vars.payDate = `${vars.payDateRenew ?? ''}`;
  await getGroupLogRequestResponse(page, vars);
  await verifyNoVaultedShopperRequest(page, vars);
  vars.transaction_id013 = `${vars.transaction_id ?? ''}`;
  vars.orderNumber013 = `${vars.orderNumber ?? ''}`;
}

// GI: "BLU-002-013" (6633cc7789e87fd839f5c598)
export async function bLU002013(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002013(page, vars);
}

// GI: "BLU-002-013" (68419dcdc637c9246eb970c5)
export async function bLU002013(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002013(page, vars);
}

// GI: "BLU-002-013 - Admin side" (6841997ec637c9246eb7ed8b)
export async function bLU002013AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await loginAdmin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await checkTranscationIsPresentOnOrderBackend(page, vars);
}

// GI: "BLU-002-013 - Admin side" (6633cc7789e87fd839f5c599)
export async function bLU002013AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002013AdminSide(page, vars);
}

// GI: "BLU-002-013 - Admin side" (68419dcdc637c9246eb970c6)
export async function bLU002013AdminSide(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002013AdminSide(page, vars);
}

// GI: "BLU-002-014" (6841997ec637c9246eb7ed8c)
export async function bLU002014(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await logIn(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(5000);
  await page.locator(`xpath=//label[contains(text(), "ACH/ECP Transactions")]`).or(page.locator(`label[for="payment_method_bluesnap_ach"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`${vars.routingNumber ?? ''}`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`${vars.routingNumber ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`corporate-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`corporate-checking`); }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(1)`)).first()).toHaveText(`Missing account number.`);
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(2)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(2)`)).first()).toHaveText(`Account number must be 4-17 digits long.`);
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(3)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(3)`)).first()).toHaveText(`Using a corporate account requires a non empty company field.`);
}

// GI: "BLU-002-014" (6633cc7789e87fd839f5c59a)
export async function bLU002014(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002014(page, vars);
}

// GI: "BLU-002-014" (68419dcdc637c9246eb970c7)
export async function bLU002014(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002014(page, vars);
}

// GI: "BLU-002-015" (6841997ec637c9246eb7ed8d)
export async function bLU002015(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await logIn(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//label[contains(text(), "ACH/ECP Transactions")]`).or(page.locator(`label[for="payment_method_bluesnap_ach"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`${vars.accountNumber ?? ''}`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`${vars.accountNumber ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`consumer-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`consumer-checking`); }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(1)`)).first()).toContainText(`Missing routing number.`);
  await expect(page.locator(`.woocommerce-error > li:nth-of-type(2)`).or(page.locator(`.wc-block-components-notice-banner.is-error li:nth-of-type(2)`)).first()).toContainText(`Routing number must be a 9 digit number.`);
}

// GI: "BLU-002-015" (6633cc7789e87fd839f5c59b)
export async function bLU002015(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002015(page, vars);
}

// GI: "BLU-002-015" (68419dcdc637c9246eb970c8)
export async function bLU002015(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002015(page, vars);
}

// GI: "BLU-002-016" (6841997ec637c9246eb7ed8e)
export async function bLU002016(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await logIn(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//label[contains(text(), "ACH/ECP Transactions")]`).or(page.locator(`label[for="payment_method_bluesnap_ach"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`${vars.accountNumber ?? ''}`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`${vars.accountNumber ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`${vars.routingNumber ?? ''}`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`${vars.routingNumber ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toContainText(`Please select an account type.`);
}

// GI: "BLU-002-016" (6633cc7789e87fd839f5c59c)
export async function bLU002016(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002016(page, vars);
}

// GI: "BLU-002-016" (68419dcdc637c9246eb970c9)
export async function bLU002016(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002016(page, vars);
}

// GI: "BLU-002-017" (6841997ec637c9246eb7ed8f)
export async function bLU002017(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.test = `002-017`;
  vars.email = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `${vars.email ?? ''}`;
  await register(page, vars);
  await fillBillingDetails(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
  await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await fillACHInfo(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toHaveText(`Payment method successfully added.`);
  await getLogRequestResponseVaultedShopperAddPaymentMethod(page, vars);
  await verifyVaultedShopper(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Delete")]`).or(page.locator(`a[href*="/my-account/delete-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method deleted.`);
  await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).first()).toContainText(`No saved methods found.`);
  await addSimpleProductToCart(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
 
return  element !== null && element !== undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_bluesnap_ach`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
 
return  element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`#wc-bluesnap_ach-payment-token-new`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return  element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`span[id*='radio-control-wc-payment-method-saved-tokens']`)).toHaveCount(0);
  }
  await getLogRequestResponseVaultedShopper(page, vars);
  await verifyVaultedShopperACHDeletePaymentMethodOnMyAccount(page, vars);
}

// GI: "BLU-002-017" (6633cc7789e87fd839f5c59d)
export async function bLU002017(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002017(page, vars);
}

// GI: "BLU-002-017" (68419dcdc637c9246eb970ca)
export async function bLU002017(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002017(page, vars);
}

// GI: "BLU-002-043" (6841997ec637c9246eb7ed90)
export async function bLU002043(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `{{orderNumber002-001}}`;
  vars.email = `{{email_BLU-002-001}}`;
  vars.test = `ipn`;
  await verifyEmailOnlyCustomer(page, vars);
  vars.test = `full`;
  await loginAdmin(page, vars);
  await getWooOrderDetails(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().fill(`1`); } catch { await page.locator(`input[placeholder="0"][type="number"].refund_order_item_qty`).first().selectOption(`1`); }
  vars.testID = `BLU-002-043`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await page.waitForTimeout(15000);
  await verifyEmailOnlyCustomer(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
}

// GI: "BLU-002-043" (6633cc7789e87fd839f5c59e)
export async function bLU002043(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002043(page, vars);
}

// GI: "BLU-002-043" (68419dcdc637c9246eb970cb)
export async function bLU002043(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002043(page, vars);
}

// GI: "BLU-002-044" (6841997ec637c9246eb7ed91)
export async function bLU002044(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(180000);
  vars.email = `{{email_BLU-002-009}}`;
  vars.status = `Processing`;
  vars.total = `{{total002-009}}`;
  vars.orderNumber = `{{orderNumber002-009}}`;
  vars.transaction_id = `${vars.transaction_id009 ?? ''}`;
  vars.test = `ipn`;
  await verifyEmailOnlyCustomer(page, vars);
  vars.test = `partial`;
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = total/2
return total }, vars);
  vars.partialRefundTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.1
return total.toFixed(2) }, vars);
  vars.partialRefundItem = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
total = total*0.9
return total.toFixed(2) }, vars);
  try { await page.locator(`.refund_line_total.wc_input_price`).first().fill(`${vars.partialRefundItem ?? ''}`); } catch { await page.locator(`.refund_line_total.wc_input_price`).first().selectOption(`${vars.partialRefundItem ?? ''}`); }
  try { await page.locator(`.refund_line_tax.wc_input_price`).first().fill(`${vars.partialRefundTax ?? ''}`); } catch { await page.locator(`.refund_line_tax.wc_input_price`).first().selectOption(`${vars.partialRefundTax ?? ''}`); }
  vars.testID = `BLU-002-044`;
  try { await page.locator(`#refund_reason`).first().fill(`${vars.testID ?? ''}`); } catch { await page.locator(`#refund_reason`).first().selectOption(`${vars.testID ?? ''}`); }
  await page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(1) > td.total`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.partialRefund ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.status ?? ''}`);
  vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund
return total.toFixed(2) }, vars);
  await getLogRequestResponseRefunds(page, vars);
  await verifyLogsTRAUTHCAPTURERefund(page, vars);
  await verifyEmailOnlyCustomer(page, vars);
  await blueSnapSandboxEndRefund(page, vars);
}

// GI: "BLU-002-044" (6633cc7789e87fd839f5c59f)
export async function bLU002044(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002044(page, vars);
}

// GI: "BLU-002-044" (68419dcdc637c9246eb970cc)
export async function bLU002044(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002044(page, vars);
}

// GI: "BLU-002-050" (6841997ec637c9246eb7ed92)
export async function bLU002050(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.status = `Processing`;
  vars.test = `ipn`;
  vars.orderNumber = `{{orderNumber002-001}}`;
  vars.transaction_id = `${vars.transaction_id001 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  if ((() => { const logs = vars.logs
return logs.length === 2 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs
return logs.length === 2 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs
return logs.length === 3 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs
return logs.length === 3 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-050" (6633cc7789e87fd839f5c5a0)
export async function bLU002050(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002050(page, vars);
}

// GI: "BLU-002-050" (68419dcdc637c9246eb970cd)
export async function bLU002050(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002050(page, vars);
}

// GI: "BLU-002-050 (Downloadable)" (6841997ec637c9246eb7ed93)
export async function bLU002050Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `{{orderNumber002-010}}`;
  vars.email = `{{email_BLU-002-009}}`;
  vars.prod = `downloadable`;
  vars.transaction_id = `${vars.transaction_id010 ?? ''}`;
  vars.status = `Completed`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  if ((() => { const logs = vars.logs

return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === 2 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === 2 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  await verifyEmailOnlyCustomer(page, vars);
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-050 (Downloadable)" (6633cc7789e87fd839f5c5a1)
export async function bLU002050Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002050Downloadable(page, vars);
}

// GI: "BLU-002-050 (Downloadable)" (68419dcdc637c9246eb970ce)
export async function bLU002050Downloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002050Downloadable(page, vars);
}

// GI: "BLU-002-050 (Virtual)" (6841997ec637c9246eb7ed94)
export async function bLU002050Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `{{orderNumber002-009}}`;
  vars.prod = ``;
  vars.transaction_id = `${vars.transaction_id009 ?? ''}`;
  vars.status = `Processing`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  if ((() => { const logs = vars.logs

return logs.length === 2 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === 2 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[0].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === 3 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.transactionType === "CHARGE" }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === 3 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  await checkTranscationIsPresentOnOrderBackend(page, vars);
  await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "BLU-002-050 (Virtual)" (6633cc7789e87fd839f5c5a2)
export async function bLU002050Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002050Virtual(page, vars);
}

// GI: "BLU-002-050 (Virtual)" (68419dcdc637c9246eb970cf)
export async function bLU002050Virtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002050Virtual(page, vars);
}

// GI: "BLU-002-051" (6841997ec637c9246eb7ed95)
export async function bLU002051(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = `{{orderNumber002-008}}`;
  vars.transaction_id = `${vars.transaction_id008 ?? ''}`;
  await extractDate(page, vars);
  vars.date = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
return date.substring(0,10) }, vars);
  await getLogRequestResponseIPN(page, vars);
  if ((() => { const logs = vars.logs

return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.transactionType === "DECLINE" }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === undefined })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === 2 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.transactionType === "DECLINE" }, vars)).toBeTruthy();
  }
  if ((() => { const logs = vars.logs

return logs.length === 2 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs[1].content.referenceNumber === `${vars.transaction_id}` }, vars)).toBeTruthy();
  }
  await verifyEmailOnlyAdmin(page, vars);
  await loginAdmin(page, vars);
  await goToOrderWithAdmin(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Failed`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`BlueSnap ACH Declined ${vars.labeIPN ?? ''} request received. A chargeback has been created for this transaction. Reason: null – null. Order status changed from On hold to Failed.`);
  await cleanEmails(page, vars);
}

// GI: "BLU-002-051" (6633cc7789e87fd839f5c5a3)
export async function bLU002051(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002051(page, vars);
}

// GI: "BLU-002-051" (68419dcdc637c9246eb970d0)
export async function bLU002051(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await bLU002051(page, vars);
}
