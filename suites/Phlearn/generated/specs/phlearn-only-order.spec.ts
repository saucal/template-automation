// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Phlearn - Only order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { _05PlacerOrderNewUserBackendCopy, _05PlacerOrderNewUserCopy } from '../helpers/phlearn-common-steps-for-project';

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

test.describe('Phlearn - Only order', () => {

  const vars = new Proxy<Record<string, string>>({
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "firstName": "Saucal Test",
    "zipCode": "33126",
    "project": "Phlearn",
    "Symbol": "$",
    "url": "https://phamily-develop.go-vip.net/",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('05 - Placer order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlacerOrderNewUserCopy(page, vars);
  });

  test('05 - Placer order - New User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlacerOrderNewUserBackendCopy(page, vars);
  });

});
