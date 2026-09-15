// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "CA - Subscription test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { placeOrderNewUserBackend, placeOrderNewUserEmail, placeOrderSubscription, subscriptionTestRenew } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('CA - Subscription test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
    "phone": "+16139689789",
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "city": "Ottawa",
    "stateComplete": "Ontario",
    "zipCode": "K1S 3V6",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "street3": "123 False Shipping",
    "project": "nopong",
    "adminUser": "qa+giadmin@saucal.com",
    "Symbol": "$",
    "state": "ON",
    "country": "CA",
    "countryComplete": "Canada",
    "password": process.env.PASSWORD ?? '',
    "currency": "CAD",
    "password2": process.env.PASSWORD2 ?? '',
    "street2": "Suite 100",
    "street4": "2nd Floor",
    "subscription": "true",
    "includeTax": "false",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - CA - Subscription test ', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderSubscription(page, vars);
  });

  test('02 - CA - Subscription test - Backend', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

  test('03 - CA - Subscription test - Email', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('04 - CA - Subscription test - Renew', async ({ page }) => {
    await page.goto(`/ca/`);
    await page.waitForLoadState('load');

    await subscriptionTestRenew(page, vars);
  });

});
