// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Payoneer - Refund"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { addPhysicalProductToCart, checkTranscationIsPresentOnOrderBackend, fillCheckout, getSiteTitle, getWooOrderDetails, placeOrder, refundOrder, useVISAFrictionless, verifyEmailOnlyCustomer, verifyTransactionOnLogs } from '../helpers/payoneer-common-steps-for-tests';

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

test.describe('Payoneer - Refund', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Saucal Inc.",
    "city": "Miami",
    "zipCode": "33126",
    "street": "123 Flase Street",
    "password": process.env.PASSWORD ?? '',
    "phone": "3050698798",
    "address2": "Apartment 2",
    "state": "Florida",
    "country": "United States (US)",
    "shortCountry": "US",
    "shortState": "FL",
    "adminUser": "demouser",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "wp_api_pass": "qGCP rlUf qFJc skzF RlSF cQ4l",
    "woo_pass": process.env.WOO_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('R001 - Step 1 - Preparing order for refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getSiteTitle(page, vars);
    vars.paymentFlow = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let paymentFlow;

if (`${vars.blog}`.includes('hosted')) {
    paymentFlow = 'hosted'
} else {
    paymentFlow = 'embedded'
}

return paymentFlow }, vars);
    vars.user = `guest`;
    await useVISAFrictionless(page, vars);
    await addPhysicalProductToCart(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('R001 - Step 2 - Full refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.refund = `full`;
    vars.id = `R001`;
    await useVISAFrictionless(page, vars);
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

  test('R002 - Step 1 - Preparing order for refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.user = `guest`;
    await useVISAFrictionless(page, vars);
    await addPhysicalProductToCart(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('R002 - Step 2 - Partial refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.refund = `partial`;
    vars.id = `R001`;
    await useVISAFrictionless(page, vars);
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

});
