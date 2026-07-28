// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "MC - CC - Hosted Checkout - Embedded - Capture"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { addDownloadProductToCart, addPhysicalProductToCart, addVirtualProductToCart, checkTransaction, checkTranscationIsPresentOnOrderBackend, createOrderForUserByAPI, extractDate, fillCheckout, getUsers, getWooOrderDetails, login, placeOrder, register, useMASTERFrictionlessACSNo, useMASTERFrictionlessACSYes, verifyTransactionOnLogs } from '../helpers/mc-common-steps-for-tests';

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

test.describe('MC - CC - Hosted Checkout - Embedded - Capture', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "wp_api_pass": process.env.WP_API_PASS ?? '',
    "woo_pass": process.env.WOO_PASS ?? '',
    "adminUser": "demouser",
    "blog": "testing_site",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "transactionType": "capture",
    "company": "Saucal Inc.",
    "zipCode": "33126",
    "street": "123 Flase Street",
    "password": process.env.PASSWORD ?? '',
    "city": "Miami",
    "hosted": "checkoutR",
    "phone": "3050698798",
    "address2": "Apartment 2",
    "3ds": "active",
    "state": "Florida",
    "url": "https://stgamazontest.wpengine.com",
    "country": "United States (US)",
    "shortCountry": "US",
    "CCsaved": "0",
    "shortState": "FL",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('MC-004 - Guest checkout not Saving Account ', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const key = `${vars.key}`;
  const newValue = `${vars.newValue}`
  const data = JSON.stringify({
            option_name: 'woocommerce_mastercard_merchant_cloud_settings',// Replace with your option name
            updates: {
                "transaction_mode": 'PURCHASE',
                "checkout_mode": 'hosted_checkout',
                "hosted_checkout_mode": "embedded"
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
    vars.user = `guest`;
    await addPhysicalProductToCart(page, vars);
    await useMASTERFrictionlessACSYes(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-004 - Guest checkout not Saving Account - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await useMASTERFrictionlessACSYes(page, vars);
    await getWooOrderDetails(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('MC-005 - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.user = `new`;
    vars.savingCC = `no`;
    await addVirtualProductToCart(page, vars);
    await useMASTERFrictionlessACSYes(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-005 - New User - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await checkTransaction(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('MC-008 - Logged user', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.savingCC = `no`;
    vars.savedCC = `no`;
    vars.user = `old`;
    await useMASTERFrictionlessACSNo(page, vars);
    await login(page, vars);
    await addDownloadProductToCart(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-008 - Logged user - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await checkTransaction(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('MC-011 - Pay for order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.payForOrder = `yes`;
    vars.savingCC = `no`;
    vars.savedCC = `no`;
    vars.user = `old`;
    vars.email = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.username = `${vars.email ?? ''}`;
    await useMASTERFrictionlessACSYes(page, vars);
    await register(page, vars);
    vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
    await getUsers(page, vars);
    await createOrderForUserByAPI(page, vars);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key"]`).filter({ visible: true }).first().click({ force: true });
    await extractDate(page, vars);
    vars.sessionDate = `${vars.payDate ?? ''}`;
    await page.waitForLoadState('load');
    await placeOrder(page, vars);
  });

  test('MC-011 - Pay for order - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await checkTransaction(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

});
