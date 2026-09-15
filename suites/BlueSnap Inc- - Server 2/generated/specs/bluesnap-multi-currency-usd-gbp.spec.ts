// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - Multi-currency - USD > GBP"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { bLU003001, bLU003002, bLU003003, bLU003004, bLU003005, bLU003006, bLU003007, bLU003008, bLU003009, bLU003010, bLU003011, bLU003012, bLU003012PriceIncludingTax, bLU003013, bLU003013PriceIncludingTax, bLU003015PriceExclTax, bLU003015PriceExclTaxAdminSide, bLU003015PriceInclTax, bLU003015PriceInclTaxAdminSide, bLU00301801IncludeTax, bLU00301801IncludeTaxBackEndRenew, bLU00301802ExcludeTax, bLU0030181, bLU0030182, bLU0030183, bLU0030183Renew, bLU0030184, bLU003019, bLU0030191, bLU003025, bLU003026Step1PayLaterOrder, bLU003026Step2AdminCompletePreorder, bLU003026Step3PayPreorder, bLU003027, bLU003028, bLU003029, bLU003040Step1CreateOrder, bLU003040Step2FullRefund, bLU003041Step1CreateOrder, bLU003041Step2PartialRefund, bLU003042Step1CreateOrder, bLU003042Step2FullRefundSubsParent, bLU003043Step1CreateOrder, bLU003043Step2PartialRefundSubParent, bLU003044, bLU003045Step1, bLU003045Step2FullRefundRenewOrder, bLU003046Step1, bLU003046Step2PartialRefundRenewOrder, bLU003062 } from '../helpers/bluesnap-multi-currency';

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

test.describe('BlueSnap - Multi-currency - USD > GBP', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "MASTER_a_ccard": "5425233430109903",
    "woo_user": process.env.WOO_USER ?? '',
    "scenario": "multi-currency",
    "MASTER_year": "23",
    "AMEX_d_ccard": "378282246310005",
    "woo_pass": process.env.WOO_PASS ?? '',
    "firstName": "QA",
    "password_bluesnap": process.env.PASSWORD_BLUESNAP ?? '',
    "blue_pass": process.env.BLUE_PASS ?? '',
    "MASTER_CCName": "MasterCard",
    "AMEX_cvv": "1234",
    "AMEX_CCName": "American Express",
    "company": "Saucal Inc.",
    "user_bluesnap": "saucal_sandbox",
    "city": "Miami",
    "curr": "GBP",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "phone": "3050698798",
    "AMEX_year": "23",
    "password": process.env.PASSWORD ?? '',
    "AMEX_a_ccard": "374245455400126",
    "address2": "Apartment 2",
    "AMEX_month": "05",
    "wp_api_pass": process.env.WP_API_PASS ?? '',
    "MASTER_month": "04",
    "defaultCurr": "USD",
    "AMEX_ShortName": "AMEX",
    "MASTER_cvv": "123",
    "blog": "mitchell_callahan_blog",
    "street": "123 Flase Street",
    "blue_user": process.env.BLUE_USER ?? '',
    "zipCode": "33126",
    "MASTER_ShortName": "MASTERCARD",
    "decimalsDefault": "2",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('BLU-003-001', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003001(page, vars);
  });

  test('BLU-003-001', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003001(page, vars);
  });

  test('BLU-003-002', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003002(page, vars);
  });

  test('BLU-003-002', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003002(page, vars);
  });

  test('BLU-003-003', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003003(page, vars);
  });

  test('BLU-003-003', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003003(page, vars);
  });

  test('BLU-003-004', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003004(page, vars);
  });

  test('BLU-003-004', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003004(page, vars);
  });

  test('BLU-003-005', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003005(page, vars);
  });

  test('BLU-003-005', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003005(page, vars);
  });

  test('BLU-003-006', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003006(page, vars);
  });

  test('BLU-003-006', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003006(page, vars);
  });

  test('BLU-003-007', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003007(page, vars);
  });

  test('BLU-003-007', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003007(page, vars);
  });

  test('BLU-003-008', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003008(page, vars);
  });

  test('BLU-003-008', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003008(page, vars);
  });

  test('BLU-003-009', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003009(page, vars);
  });

  test('BLU-003-009', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003009(page, vars);
  });

  test('BLU-003-010', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003010(page, vars);
  });

  test('BLU-003-010', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003010(page, vars);
  });

  test('BLU-003-011', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003011(page, vars);
  });

  test('BLU-003-011', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003011(page, vars);
  });

  test('BLU-003-012', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003012(page, vars);
  });

  test('BLU-003-012', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003012(page, vars);
  });

  test('BLU-003-012 Price Including Tax', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003012PriceIncludingTax(page, vars);
  });

  test('BLU-003-012 Price Including Tax', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003012PriceIncludingTax(page, vars);
  });

  test('BLU-003-013', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003013(page, vars);
  });

  test('BLU-003-013', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003013(page, vars);
  });

  test('BLU-003-013 Price Including tax', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003013PriceIncludingTax(page, vars);
  });

  test('BLU-003-013 Price Including tax', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003013PriceIncludingTax(page, vars);
  });

  test('BLU-003-015 (Price Excl. Tax)', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003015PriceExclTax(page, vars);
  });

  test('BLU-003-015 (Price Excl. Tax)', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003015PriceExclTax(page, vars);
  });

  test('BLU-003-015 (Price Excl. Tax) Admin side', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003015PriceExclTaxAdminSide(page, vars);
  });

  test('BLU-003-015 (Price Excl. Tax) Admin side', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003015PriceExclTaxAdminSide(page, vars);
  });

  test('BLU-003-015 (Price Incl. Tax)', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003015PriceInclTax(page, vars);
  });

  test('BLU-003-015 (Price Incl. Tax)', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003015PriceInclTax(page, vars);
  });

  test('BLU-003-015 (Price Incl. Tax) Admin side', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003015PriceInclTaxAdminSide(page, vars);
  });

  test('BLU-003-015 (Price Incl. Tax) Admin side', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003015PriceInclTaxAdminSide(page, vars);
  });

  test('BLU-003-018 - 01 - Include tax', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU00301801IncludeTax(page, vars);
  });

  test('BLU-003-018 - 01 - Include tax', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU00301801IncludeTax(page, vars);
  });

  test('BLU-003-018 - 01 - Include tax - (BackEnd & renew)', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU00301801IncludeTaxBackEndRenew(page, vars);
  });

  test('BLU-003-018 - 01 - Include tax - (BackEnd & renew)', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU00301801IncludeTaxBackEndRenew(page, vars);
  });

  test('BLU-003-018 - 02 - Exclude tax', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU00301802ExcludeTax(page, vars);
  });

  test('BLU-003-018 - 02 - Exclude tax', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU00301802ExcludeTax(page, vars);
  });

  test('BLU-003-018-1', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030181(page, vars);
  });

  test('BLU-003-018-1', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030181(page, vars);
  });

  test('BLU-003-018-2', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030182(page, vars);
  });

  test('BLU-003-018-2', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030182(page, vars);
  });

  test('BLU-003-018-3', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030183(page, vars);
  });

  test('BLU-003-018-3', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030183(page, vars);
  });

  test('BLU-003-018-3 - Renew', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030183Renew(page, vars);
  });

  test('BLU-003-018-3 - Renew', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030183Renew(page, vars);
  });

  test('BLU-003-018-4', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030184(page, vars);
  });

  test('BLU-003-018-4', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030184(page, vars);
  });

  test('BLU-003-019', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003019(page, vars);
  });

  test('BLU-003-019', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003019(page, vars);
  });

  test('BLU-003-019-1', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030191(page, vars);
  });

  test('BLU-003-019-1', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU0030191(page, vars);
  });

  test('BLU-003-025', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003025(page, vars);
  });

  test('BLU-003-025', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003025(page, vars);
  });

  test('BLU-003-026 - Step 1 - Pay Later order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003026Step1PayLaterOrder(page, vars);
  });

  test('BLU-003-026 - Step 1 - Pay Later order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003026Step1PayLaterOrder(page, vars);
  });

  test('BLU-003-026 - Step 2 - Admin Complete preorder', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003026Step2AdminCompletePreorder(page, vars);
  });

  test('BLU-003-026 - Step 2 - Admin Complete preorder', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003026Step2AdminCompletePreorder(page, vars);
  });

  test('BLU-003-026 - Step 3 - Pay Preorder', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003026Step3PayPreorder(page, vars);
  });

  test('BLU-003-026 - Step 3 - Pay Preorder', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003026Step3PayPreorder(page, vars);
  });

  test('BLU-003-027', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003027(page, vars);
  });

  test('BLU-003-027', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003027(page, vars);
  });

  test('BLU-003-028', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003028(page, vars);
  });

  test('BLU-003-028', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003028(page, vars);
  });

  test('BLU-003-029', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003029(page, vars);
  });

  test('BLU-003-029', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003029(page, vars);
  });

  test('BLU-003-040 - Step 1 - Create order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003040Step1CreateOrder(page, vars);
  });

  test('BLU-003-040 - Step 1 - Create order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003040Step1CreateOrder(page, vars);
  });

  test('BLU-003-040 - Step 2 - Full refund', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003040Step2FullRefund(page, vars);
  });

  test('BLU-003-040 - Step 2 - Full refund', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003040Step2FullRefund(page, vars);
  });

  test('BLU-003-041 - Step 1 - Create order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003041Step1CreateOrder(page, vars);
  });

  test('BLU-003-041 - Step 1 - Create order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003041Step1CreateOrder(page, vars);
  });

  test('BLU-003-041 - Step 2 - Partial refund', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003041Step2PartialRefund(page, vars);
  });

  test('BLU-003-041 - Step 2 - Partial refund', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003041Step2PartialRefund(page, vars);
  });

  test('BLU-003-042 - Step 1 - Create order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003042Step1CreateOrder(page, vars);
  });

  test('BLU-003-042 - Step 1 - Create order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003042Step1CreateOrder(page, vars);
  });

  test('BLU-003-042 - Step 2 - Full refund Subs Parent', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003042Step2FullRefundSubsParent(page, vars);
  });

  test('BLU-003-042 - Step 2 - Full refund Subs Parent', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003042Step2FullRefundSubsParent(page, vars);
  });

  test('BLU-003-043 - Step 1 - Create order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003043Step1CreateOrder(page, vars);
  });

  test('BLU-003-043 - Step 1 - Create order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003043Step1CreateOrder(page, vars);
  });

  test('BLU-003-043 - Step 2 - Partial refund Sub parent', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003043Step2PartialRefundSubParent(page, vars);
  });

  test('BLU-003-043 - Step 2 - Partial refund Sub parent', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003043Step2PartialRefundSubParent(page, vars);
  });

  test('BLU-003-044', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003044(page, vars);
  });

  test('BLU-003-044', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003044(page, vars);
  });

  test('BLU-003-045 - Step 1', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003045Step1(page, vars);
  });

  test('BLU-003-045 - Step 1', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003045Step1(page, vars);
  });

  test('BLU-003-045 - Step 2 - Full refund renew order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003045Step2FullRefundRenewOrder(page, vars);
  });

  test('BLU-003-045 - Step 2 - Full refund renew order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003045Step2FullRefundRenewOrder(page, vars);
  });

  test('BLU-003-046 - Step 1', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003046Step1(page, vars);
  });

  test('BLU-003-046 - Step 1', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003046Step1(page, vars);
  });

  test('BLU-003-046 - Step 2 - Partial refund renew order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003046Step2PartialRefundRenewOrder(page, vars);
  });

  test('BLU-003-046 - Step 2 - Partial refund renew order', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003046Step2PartialRefundRenewOrder(page, vars);
  });

  test('BLU-003-062', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003062(page, vars);
  });

  test('BLU-003-062', async ({ page }) => {
    await page.goto(`/classic/`);
    await page.waitForLoadState('load');

    await bLU003062(page, vars);
  });

});
