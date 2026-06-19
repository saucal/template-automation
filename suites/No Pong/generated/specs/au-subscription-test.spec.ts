// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "AU - Subscription test"
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

test.describe('AU - Subscription test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "Test",
    "lastName": "Subscription",
    "company2": "Saucal Shipping",
    "street": "92 Tapleys Hill Road",
    "city": "Sydney",
    "includeTax": "true",
    "stateComplete": "New South Wales",
    "zipCode": "1001",
    "phone": "+61412345678",
    "street3": "92 Tapleys Hill Road",
    "countryComplete": "Australia",
    "Symbol": "$",
    "country": "AU",
    "project": "nopong",
    "street2": "Suite 1000",
    "street4": "3rd Floor",
    "subscription": "true",
    "password": process.env.PASSWORD ?? '',
    "state": "NSW",
    "password2": process.env.PASSWORD2 ?? '',
    "currency": "AUD",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - AU - Subscription test', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderSubscription(page, vars);
  });

  test('02 - AU - Subscription test - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

  test('03 - AU - Subscription test - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('04 - AU - Subscription test - Renew', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await subscriptionTestRenew(page, vars);
  });

});
