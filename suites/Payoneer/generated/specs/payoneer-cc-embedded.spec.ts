// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Payoneer - CC - Embedded "
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { addPhysicalProductToCart, addVirtualProductToCart, checkTranscationIsPresentOnOrderBackend, fillCheckout, getSiteTitle, getWooOrderDetails, placeOrder, useVISAChallenge, useVISAFrictionless, useVISAFrictionlessDeclined, verifyTransactionOnLogs } from '../helpers/payoneer-common-steps-for-tests';

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

test.describe('Payoneer - CC - Embedded ', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "paymentFlow": "embedded",
    "password": process.env.PASSWORD ?? '',
    "phone": "3050698798",
    "address2": "Apartment 2",
    "state": "Florida",
    "country": "United States (US)",
    "shortCountry": "US",
    "shortState": "FL",
    "adminUser": "demouser",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "wp_api_pass": process.env.WP_API_PASS ?? '',
    "blog": "testing_site",
    "woo_pass": process.env.WOO_PASS ?? '',
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Saucal Inc.",
    "city": "Miami",
    "zipCode": "33126",
    "street": "123 Flase Street",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('001 - 3DS VISA with Challenge', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getSiteTitle(page, vars);
    vars.user = `guest`;
    await useVISAChallenge(page, vars);
    await addPhysicalProductToCart(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('001 - 3DS VISA with Challenge - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('002 - 3DS Visa Frictionless', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.user = `new`;
    vars.savingCC = `no`;
    await useVISAFrictionless(page, vars);
    await addVirtualProductToCart(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('002 - 3DS Visa Frictionless - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('003 - 3DS VISA with Challenge fails', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.user = `guest`;
    vars.transaction = `declined`;
    await useVISAChallenge(page, vars);
    vars.challenge = `fail`;
    await addPhysicalProductToCart(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('003 - 3DS VISA with Challenge fails - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

  test('004 - VISA frictionless declined', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.user = `guest`;
    vars.transaction = `declined`;
    await useVISAFrictionlessDeclined(page, vars);
    await addPhysicalProductToCart(page, vars);
    await fillCheckout(page, vars);
    await placeOrder(page, vars);
  });

  test('004 - VISA frictionless declined - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await getWooOrderDetails(page, vars);
    await verifyTransactionOnLogs(page, vars);
    await checkTranscationIsPresentOnOrderBackend(page, vars);
  });

});
