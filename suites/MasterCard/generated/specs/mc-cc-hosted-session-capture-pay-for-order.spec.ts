// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "MC - CC - Hosted Session - Capture - Pay for Order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { checkTransaction, checkTranscationIsPresentOnOrderBackend, getWooOrderDetails, login, payForOrderCreateOrder, placeOrder, register, useMASTERFrictionlessACSYes, useVISAChallenge, verifyTransactionOnLogs } from '../helpers/mc-common-steps-for-tests';

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

test.describe('MC - CC - Hosted Session - Capture - Pay for Order', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "adminUser": "demouser",
    "blog": "testing_site",
    "woo_pass": process.env.WOO_PASS ?? '',
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "transactionType": "capture",
    "CCsaved": "0",
    "company": "Saucal Inc.",
    "zipCode": "33126",
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
    "shortState": "FL",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "wp_api_pass": process.env.WP_API_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('MC-011 - Pay for order - not Saving CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
    vars.payForOrder = `yes`;
    vars.savingCC = `no`;
    vars.savedCC = `no`;
    vars.user = `old`;
    vars.email = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.username = `${vars.email ?? ''}`;
    await useMASTERFrictionlessACSYes(page, vars);
    await register(page, vars);
    vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
    await payForOrderCreateOrder(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-011 - Pay for order - not Saving CC - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await checkTransaction(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('MC-012 - Pay for order - Saving CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.payForOrder = `yes`;
    vars.savingCC = `yes`;
    vars.savedCC = `no`;
    vars.user = `old`;
    await useVISAChallenge(page, vars);
    await login(page, vars);
    vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
    await payForOrderCreateOrder(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-012 - Pay for order - Saving CC - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await checkTransaction(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('MC-013 - Pay for order - Saved CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.payForOrder = `yes`;
    vars.CCsaved = `1`;
    vars.savingCC = `no`;
    vars.savedCC = `yes`;
    vars.user = `old`;
    vars.username = `${vars.email ?? ''}`;
    await login(page, vars);
    vars.username = ((await page.locator(`div.woocommerce-MyAccount-content > p:first-of-type > strong:first-of-type`).textContent()) ?? '').trim();
    await payForOrderCreateOrder(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-013 - Pay for order - Saved CC - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await checkTransaction(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

});
