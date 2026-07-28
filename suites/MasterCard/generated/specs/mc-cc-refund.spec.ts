// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "MC - CC - Refund"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { addPhysicalProductToCart, addVirtualProductToCart, checkTranscationIsPresentOnOrderBackend, fillCheckout, getWooOrderDetails, payMasterCard, placeOrder, refundOrder, useMASTERFrictionlessACSYes, verifyEmailOnlyCustomer, verifyTransactionOnLogs } from '../helpers/mc-common-steps-for-tests';

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

test.describe('MC - CC - Refund', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "wp_api_pass": process.env.WP_API_PASS ?? '',
    "adminUser": "demouser",
    "woo_pass": process.env.WOO_PASS ?? '',
    "blog": "testing_site",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "transactionType": "refund",
    "company": "Saucal Inc.",
    "zipCode": "33126",
    "street": "123 Flase Street",
    "city": "Miami",
    "password": process.env.PASSWORD ?? '',
    "hosted": "session",
    "phone": "3050698798",
    "address2": "Apartment 2",
    "CCsaved": "0",
    "3ds": "active",
    "state": "Florida",
    "url": "https://stgamazontest.wpengine.com",
    "country": "United States (US)",
    "shortCountry": "US",
    "shortState": "FL",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('MC-040 - Step 1 - Preparing order for refund', async ({ page }) => {
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
    vars.user = `guest`;
    await useMASTERFrictionlessACSYes(page, vars);
    await addPhysicalProductToCart(page, vars);
    await fillCheckout(page, vars);
    await payMasterCard(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-040 - Step 2 - Full refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.refund = `full`;
    vars.id = `MC-040`;
    await useMASTERFrictionlessACSYes(page, vars);
    await getWooOrderDetails(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
    if (vars.hpos === "off") {
      await page.goto(`${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit`);
      await page.waitForLoadState('load');
    }
    if (vars.hpos === "on") {
      await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}`);
      await page.waitForLoadState('load');
    }
    await refundOrder(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await verifyEmailOnlyCustomer(page, vars);
  });

  test('MC-041 - Step 1 - Preparing order for refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.user = `guest`;
    await useMASTERFrictionlessACSYes(page, vars);
    await addVirtualProductToCart(page, vars);
    await fillCheckout(page, vars);
    await payMasterCard(page, vars);
    await placeOrder(page, vars);
  });

  test('MC-041 - Step 2 - Partial refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.refund = `partial`;
    vars.id = `MC-041`;
    await useMASTERFrictionlessACSYes(page, vars);
    await getWooOrderDetails(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
    if (vars.hpos === "off") {
      await page.goto(`${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit`);
      await page.waitForLoadState('load');
    }
    if (vars.hpos === "on") {
      await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}`);
      await page.waitForLoadState('load');
    }
    await refundOrder(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await verifyEmailOnlyCustomer(page, vars);
  });

  test('MC-042 - Exceed total refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.refund = `exceed`;
    vars.id = `MC-042`;
    await checkTranscationIsPresentOnOrderBackend(page, vars);
    await refundOrder(page, vars);
    await verifyTransactionOnLogs(page, vars);
  });

});
