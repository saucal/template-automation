// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - CC - Subscriptions + Pre Orders + Others"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { bLU001019, bLU001020, bLU001021, bLU001022, bLU001023, bLU001024, bLU001025, bLU001026, bLU001027, bLU001028, bLU001029Step1PayLaterOrder, bLU001029Step2AdminCompletePreorder, bLU001029Step3PayPreorder, bLU001030, bLU001031, bLU001032Step1PayLaterOrder, bLU001032Step2AdminCompletePreorder, bLU001032Step3PayPreorder, bLU001033, bLU001034, bLU001035, bLU001069, bLU001070, bLU001071, bLU001072, bLU001073, bLU001074, bLU001075, bLU001076, bLU001077, bLU001077AdminSide, bLU001077AdminSideFailedOrderHook, bLU001079BAdminSideOrderNote, bLU001079FailedUpgrade, bLU001080, bLU001081, bLU001082ASCART1056, bLU001082BSCART1056AdminSide, bLU001083AScart992CreateSubscription, bLU001083BScart992CancelSubscriptionFromBSControlPanel, bLU001083CScart992RenewSubscriptionAsUser, bLU001083DScart992VerifyFailedOrderAsAdmin, bLU001084PayRenewalAfterFailedPaymentScart997, bLU003061 } from '../helpers/bluesnap-cc-subscriptions-pre-orders-others';

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

test.describe('BlueSnap - CC - Subscriptions + Pre Orders + Others', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "firstName": "QA",
    "citySw": "Mellingen",
    "password": process.env.PASSWORD ?? '',
    "blog": "mitchell_callahan_blog_2",
    "cantonSw": "Aargau",
    "defaultCurr": "USD",
    "blue_user": process.env.BLUE_USER ?? '',
    "password_bluesnap": process.env.PASSWORD_BLUESNAP ?? '',
    "zipCodeEs": "28040",
    "user_bluesnap": "saucal_sandbox",
    "streetEs": "Av. Séneca, 2",
    "company": "Saucal Inc.",
    "street": "123 Flase Street",
    "currencySw": "CHF",
    "cityEs": "Madrid",
    "city": "Miami",
    "blue_pass": process.env.BLUE_PASS ?? '',
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "currencyEu": "EUR",
    "zipCodeSw": "5507",
    "woo_pass": process.env.WOO_PASS ?? '',
    "zipCode": "33126",
    "address2": "Apartment 2",
    "phone": "3050698798",
    "wp_api_pass": process.env.WP_API_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('BLU-001-019', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001019(page, vars);
  });

  test('BLU-001-020', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001020(page, vars);
  });

  test('BLU-001-021', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001021(page, vars);
  });

  test('BLU-001-022', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001022(page, vars);
  });

  test('BLU-001-023', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001023(page, vars);
  });

  test('BLU-001-024', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001024(page, vars);
  });

  test('BLU-001-025', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001025(page, vars);
  });

  test('BLU-001-026', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001026(page, vars);
  });

  test('BLU-001-027', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001027(page, vars);
  });

  test('BLU-001-028', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001028(page, vars);
  });

  test('BLU-001-029 - Step 1 - Pay Later order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001029Step1PayLaterOrder(page, vars);
  });

  test('BLU-001-029 - Step 2 - Admin Complete preorder', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001029Step2AdminCompletePreorder(page, vars);
  });

  test('BLU-001-029 - Step 3 - Pay Preorder', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001029Step3PayPreorder(page, vars);
  });

  test('BLU-001-030', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001030(page, vars);
  });

  test('BLU-001-031', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001031(page, vars);
  });

  test('BLU-001-032 - Step 1 - Pay Later order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001032Step1PayLaterOrder(page, vars);
  });

  test('BLU-001-032 - Step 2 - Admin Complete preorder', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001032Step2AdminCompletePreorder(page, vars);
  });

  test('BLU-001-032 - Step 3 - Pay Preorder', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001032Step3PayPreorder(page, vars);
  });

  test('BLU-001-033', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001033(page, vars);
  });

  test('BLU-001-034', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001034(page, vars);
  });

  test('BLU-001-035', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001035(page, vars);
  });

  test('BLU-001-069', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001069(page, vars);
  });

  test('BLU-001-070', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001070(page, vars);
  });

  test('BLU-001-071', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001071(page, vars);
  });

  test('BLU-001-072', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001072(page, vars);
  });

  test('BLU-001-073', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001073(page, vars);
  });

  test('BLU-001-074', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001074(page, vars);
  });

  test('BLU-001-075', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001075(page, vars);
  });

  test('BLU-001-076', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001076(page, vars);
  });

  test('BLU-001-077', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001077(page, vars);
  });

  test('BLU-001-077 - Admin side', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001077AdminSide(page, vars);
  });

  test('BLU-001-077 - Admin side failed order hook', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001077AdminSideFailedOrderHook(page, vars);
  });

  test('BLU-001-079 - Failed Upgrade', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001079FailedUpgrade(page, vars);
  });

  test('BLU-001-079B- Admin side Order Note', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001079BAdminSideOrderNote(page, vars);
  });

  test('BLU-001-080', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001080(page, vars);
  });

  test('BLU-001-081 ', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001081(page, vars);
  });

  test('BLU-001-082 A - SCART-1056', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001082ASCART1056(page, vars);
  });

  test('BLU-001-082 B - SCART-1056 Admin side', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001082BSCART1056AdminSide(page, vars);
  });

  test('BLU-001-083 A scart-992 - Create subscription', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001083AScart992CreateSubscription(page, vars);
  });

  test('BLU-001-083 B scart-992 - Cancel subscription from BS control panel', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001083BScart992CancelSubscriptionFromBSControlPanel(page, vars);
  });

  test('BLU-001-083 C scart-992 - Renew subscription as user', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001083CScart992RenewSubscriptionAsUser(page, vars);
  });

  test('BLU-001-083 D scart-992 - Verify failed order as admin', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001083DScart992VerifyFailedOrderAsAdmin(page, vars);
  });

  test('BLU-001-084-pay renewal after failed payment - scart-997', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU001084PayRenewalAfterFailedPaymentScart997(page, vars);
  });

  test('BLU-003-061', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003061(page, vars);
  });

});
