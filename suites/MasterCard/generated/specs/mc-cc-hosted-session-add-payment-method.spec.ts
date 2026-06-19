// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "MC - CC - Hosted Session - Add Payment Method"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI } from '../helpers/common-steps-for-all-projects';
import { _3DSChallenge, addPaymentMethod, addPhysicalProductToCart, checkTranscationIsPresentOnOrderBackend, extractDate, extractFourDigitsOfCC, extractSessionGET, extractSessionPOST, extractTokenPOST, fillCC, fillCheckout, getWooOrderDetails, login, placeOrder, register, useVISAChallenge, useVISAFrictionless, verifySavedTokenLog, verifySession, verifyTransactionOnLogs } from '../helpers/mc-common-steps-for-tests';

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

test.describe('MC - CC - Hosted Session - Add Payment Method', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "street": "123 Flase Street",
    "city": "Miami",
    "password": process.env.PASSWORD ?? '',
    "hosted": "session",
    "phone": "3050698798",
    "address2": "Apartment 2",
    "3ds": "active",
    "state": "Florida",
    "country": "United States (US)",
    "shortCountry": "US",
    "adminUser": "demouser",
    "shortState": "FL",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "wp_api_pass": process.env.WP_API_PASS ?? '',
    "addPaymentMethod": "yes",
    "blog": "testing_site",
    "woo_pass": process.env.WOO_PASS ?? '',
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "transactionType": "capture",
    "CCsaved": "0",
    "company": "Saucal Inc.",
    "zipCode": "33126",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('MC-050 - Add Payment Method', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/to_checkout_classic`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const key = `${vars.key}`;
  const newValue = `${vars.newValue}`
  const data = JSON.stringify({
            option_name: 'woocommerce_mastercard_merchant_cloud_settings',// Replace with your option name
            updates: {
                "_3d_secure": 'yes', 
                "saved_cards": 'yes',
                "transaction_mode": 'PURCHASE',
                "checkout_mode": 'hosted_session'
            }
        })
  const username = `${vars.adminUser}`; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/custom/v1/update-option`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      body: data,
      headers: headers
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
    vars.user = `new`;
    vars.email = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.username = `${vars.email ?? ''}`;
    await useVISAChallenge(page, vars);
    await extractFourDigitsOfCC(page, vars);
    await register(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
    await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#payment_method_acme , #payment_method_mastercard_merchant_cloud')

return !!element }, vars)) {
      {
        const _lbl = page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`).or(page.locator(`label[for="payment_method_acme"]`)).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#payment_method_mastercard_merchant_cloud`).or(page.locator(`#payment_method_acme`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    await extractDate(page, vars);
    vars.sessionDate = `${vars.payDate ?? ''}`;
    vars.session = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const session = document.querySelector('#acme_session_id , #mastercard_merchant_cloud_session_id').getAttribute('value')

return session }, vars);
    await fillCC(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await extractDate(page, vars);
    await blockUI(page, vars);
    await _3DSChallenge(page, vars);
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method successfully added.`);
    await expect(page.locator(`td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''}`);
    await expect(page.locator(`td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--expires`).first()).toContainText(`${vars.month ?? ''}/${vars.year ?? ''}`);
    await extractSessionPOST(page, vars);
    await extractSessionGET(page, vars);
    await extractTokenPOST(page, vars);
    await verifySession(page, vars);
    await verifySavedTokenLog(page, vars);
  });

  test('MC-051 - Logged user Pay with saved CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.savingCC = `no`;
    vars.session = ``;
    vars.savedCC = `yes`;
    vars.CCsaved = `1`;
    vars.user = `old`;
    await useVISAChallenge(page, vars);
    await login(page, vars);
    await addPhysicalProductToCart(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-051 - Logged user Pay with saved CC - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('MC-052 - Add Payment Method - second CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.user = `old`;
    vars.savedCC = `no`;
    await useVISAFrictionless(page, vars);
    await extractFourDigitsOfCC(page, vars);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
    await page.locator(`xpath=//a[contains(text(), "Add payment method")]`).or(page.locator(`a[href*="/my-account/add-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#payment_method_acme , #payment_method_mastercard_merchant_cloud')

return !!element }, vars)) {
      {
        const _lbl = page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`).or(page.locator(`label[for="payment_method_acme"]`)).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#payment_method_mastercard_merchant_cloud`).or(page.locator(`#payment_method_acme`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    await extractDate(page, vars);
    vars.sessionDate = `${vars.payDate ?? ''}`;
    vars.session = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const session = document.querySelector('#acme_session_id , #mastercard_merchant_cloud_session_id').getAttribute('value')

return session }, vars);
    await fillCC(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await extractDate(page, vars);
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method successfully added.`);
    await expect(page.locator(`tr:nth-of-type(2) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--expires`).first()).toContainText(`${vars.month ?? ''}/${vars.year ?? ''}`);
    await extractSessionPOST(page, vars);
    await extractSessionGET(page, vars);
    await extractTokenPOST(page, vars);
    await verifySession(page, vars);
    await verifySavedTokenLog(page, vars);
  });

  test('MC-053 - Session loading', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPaymentMethod(page, vars);
    await expect(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`)).not.toHaveCount(0);
    await expect(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`)).not.toHaveCount(0);
    await expect(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`)).not.toHaveCount(0);
    await expect(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`)).not.toHaveCount(0);
  });

  test('MC-054 - Not filling CC info (CC - Exp - CVC)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPaymentMethod(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Card number invalid or missingExpiry month invalid or missingExpiry year invalid or missing`);
  });

  test('MC-055 - Invalid missing CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPaymentMethod(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`01`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`01`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`39`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`39`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`100`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`100`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Card number invalid or missing`);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`7554298042803978`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`7554298042803978`); }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Card number invalid or missing`);
  });

  test('MC-056 - Invalid missing CVC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPaymentMethod(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`5123450000000008`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`5123450000000008`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`01`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`01`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`39`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`39`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    try {
      await expect(page.locator(`.woocommerce-error`).first()).toContainText(`CVV invalid or missing`);
    } catch { /* optional step: assertTextPresent */ }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`10`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`10`); }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    try {
      await expect(page.locator(`.woocommerce-error`).first()).toContainText(`CVV invalid or missing`);
    } catch { /* optional step: assertTextPresent */ }
  });

  test('MC-057 - Invalid missing Exp Month', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPaymentMethod(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`5123450000000008`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`5123450000000008`); }
    await page.keyboard.press('Tab');
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`39`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`39`); }
    await page.keyboard.press('Tab');
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`100`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`100`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Expiry month invalid or missing`);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`23`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`23`); }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Expiry month invalid or missing`);
  });

  test('MC-058 - Invalid missing Exp Year', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPaymentMethod(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`5123450000000008`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`5123450000000008`); }
    await page.keyboard.press('Tab');
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`01`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`01`); }
    await page.keyboard.press('Tab');
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await blockUI(page, vars);
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`100`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`100`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Expiry year invalid or missing`);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`1`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`1`); }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add payment method")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Expiry year invalid or missing`);
  });

  test('MC-059 - Delete Payment Method', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.user = `old`;
    vars.savedCC = `no`;
    await useVISAFrictionless(page, vars);
    await extractFourDigitsOfCC(page, vars);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Payment methods`);
    await page.locator(`xpath=//a[contains(text(), "Delete")]`).or(page.locator(`a[href*="/my-account/delete-payment-method/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Payment method deleted.`);
    await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--expires`).first()).toContainText(`${vars.month ?? ''}/${vars.year ?? ''}`);
    await addPhysicalProductToCart(page, vars);
    await expect(page.locator(`.woocommerce-SavedPaymentMethods-token > label`).first()).toHaveText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''} (expires ${vars.month ?? ''}/${vars.year ?? ''})`);
  });

});
