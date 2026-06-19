// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "MC - CC - Hosted Session - Session classic"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI } from '../helpers/common-steps-for-all-projects';
import { addPhysicalProductToCart } from '../helpers/mc-common-steps-for-tests';

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

test.describe('MC - CC - Hosted Session - Session classic', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "woo_pass": process.env.WOO_PASS ?? '',
    "company": "Saucal Inc.",
    "zipCode": "33126",
    "street": "123 Flase Street",
    "city": "Miami",
    "hosted": "session",
    "phone": "3050698798",
    "address2": "Apartment 2",
    "password": process.env.PASSWORD ?? '',
    "3ds": "active",
    "state": "Florida",
    "country": "United States (US)",
    "shortCountry": "US",
    "shortState": "FL",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "wp_api_pass": process.env.WP_API_PASS ?? '',
    "adminUser": "demouser",
    "blog": "testing_site",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "transactionType": "capture",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('MC-001 - Session loading', async ({ page }) => {
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
    await addPhysicalProductToCart(page, vars);
    try {
      {
        const _lbl = page.locator(`label[for="payment_method_acme"]`).or(page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`)).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#payment_method_acme`).or(page.locator(`#payment_method_mastercard_merchant_cloud`)).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await blockUI(page, vars);
    await expect(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`)).not.toHaveCount(0);
    await expect(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`)).not.toHaveCount(0);
    await expect(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`)).not.toHaveCount(0);
    await expect(page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`)).not.toHaveCount(0);
  });

  test('MC-002 - Not filling CC info (CC - Exp - CVC)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPhysicalProductToCart(page, vars);
    try {
      {
        const _lbl = page.locator(`label[for="payment_method_acme"]`).or(page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`)).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#payment_method_acme`).or(page.locator(`#payment_method_mastercard_merchant_cloud`)).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Card number invalid or missingExpiry month invalid or missingExpiry year invalid or missing`);
  });

  test('MC-003 - Invalid missing CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPhysicalProductToCart(page, vars);
    try {
      {
        const _lbl = page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`).or(page.locator(`label[for="payment_method_acme"]`)).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#payment_method_mastercard_merchant_cloud`).or(page.locator(`#payment_method_acme`)).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`01`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`01`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`39`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`39`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`100`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`100`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Card number invalid or missing`);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`7554298042803978`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`7554298042803978`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Card number invalid or missing`);
  });

  test('MC-003 - Invalid missing CVC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPhysicalProductToCart(page, vars);
    try {
      {
        const _lbl = page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`).or(page.locator(`label[for="payment_method_acme"]`)).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#payment_method_mastercard_merchant_cloud`).or(page.locator(`#payment_method_acme`)).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`5123450000000008`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`5123450000000008`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`01`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`01`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`39`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`39`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    try {
      await expect(page.locator(`.woocommerce-error`).first()).toContainText(`CVV invalid or missing`);
    } catch { /* optional step: assertTextPresent */ }
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`10`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`10`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    try {
      await expect(page.locator(`.woocommerce-error`).first()).toContainText(`CVV invalid or missing`);
    } catch { /* optional step: assertTextPresent */ }
  });

  test('MC-003 - Invalid missing Exp Month', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPhysicalProductToCart(page, vars);
    {
      const _lbl = page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`).or(page.locator(`label[for="payment_method_acme"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_mastercard_merchant_cloud`).or(page.locator(`#payment_method_acme`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`5123450000000008`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`5123450000000008`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`39`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`39`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`100`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`100`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Expiry month invalid or missing`);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`23`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`23`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Expiry month invalid or missing`);
  });

  test('MC-003 - Invalid missing Exp Year', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await addPhysicalProductToCart(page, vars);
    {
      const _lbl = page.locator(`label[for="payment_method_mastercard_merchant_cloud"]`).or(page.locator(`label[for="payment_method_acme"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_mastercard_merchant_cloud`).or(page.locator(`#payment_method_acme`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().fill(`5123450000000008`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#number`).first().selectOption(`5123450000000008`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().fill(`01`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryMonth`).first().selectOption(`01`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().fill(`100`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#securityCode`).first().selectOption(`100`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Expiry year invalid or missing`);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().fill(`1`); } catch { await page.locator(`iframe[src*="test-gateway.mastercard.com"]`).first().contentFrame().locator(`#expiryYear`).first().selectOption(`1`); }
    await page.keyboard.press('Tab');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).or(page.locator(`xpath=//div[contains(text(), "Place Order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Expiry year invalid or missing`);
  });

});
