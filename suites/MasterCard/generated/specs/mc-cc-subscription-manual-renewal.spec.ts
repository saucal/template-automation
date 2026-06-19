// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "MC - CC - Subscription + Manual renewal"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { addPhysicalSubscriptionProductToCart, checkTranscationIsPresentOnOrderBackend, fillCheckout, getWooOrderDetails, getWooSubscriptionDetails, login, loginAdmin, placeOrder, renewalOrder, subscriptionUpgradeManualRenewCancelChangePaymentMEthod, useMASTERFrictionlessACSNo, useVISAChallenge, verifyTransactionOnLogs } from '../helpers/mc-common-steps-for-tests';

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

test.describe('MC - CC - Subscription + Manual renewal', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "city": "Miami",
    "hosted": "session",
    "password": process.env.PASSWORD ?? '',
    "phone": "3050698798",
    "address2": "Apartment 2",
    "3ds": "active",
    "state": "Florida",
    "country": "United States (US)",
    "shortCountry": "US",
    "shortState": "FL",
    "adminUser": "demouser",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "wp_api_pass": process.env.WP_API_PASS ?? '',
    "CCsaved": "0",
    "blog": "testing_site",
    "woo_pass": process.env.WOO_PASS ?? '',
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "transactionType": "capture",
    "company": "Saucal Inc.",
    "zipCode": "33126",
    "street": "123 Flase Street",
    "subscription": "yes",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('MC-060 - Subscription order - with Challenge', async ({ page }) => {
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
    await useVISAChallenge(page, vars);
    await addPhysicalSubscriptionProductToCart(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-065 - Manual renewal -  Subscription', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.manualRenew = `yes`;
    vars.renewal = ``;
    await getWooOrderDetails(page, vars);
    await getWooSubscriptionDetails(page, vars);
    await login(page, vars);
    await subscriptionUpgradeManualRenewCancelChangePaymentMEthod(page, vars);
    await useMASTERFrictionlessACSNo(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-065 - Manual renewal -  Subscription - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('MC-065 - Manual renewal -  Subscription - Renewal after manual renew', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.renewal = `yes`;
    await loginAdmin(page, vars);
    await renewalOrder(page, vars);
    await getWooOrderDetails(page, vars);
    vars.total = `${vars.totalRenew ?? ''}`;
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

});
