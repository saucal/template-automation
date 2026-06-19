// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Harmony - WooCommerce Test - Canada"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { _01ProductPage, _02CartPage, _03CheckoutPageManagedHosting, _03CheckoutPageManagedHostingMaintenance, _03CheckoutPageManagedWooYearly, _03CheckoutPageOnDemandHours, _03CheckoutPageWoocommerceMaintenance, _04Step1AffiliateRegistration, _04Step2AffiliateApproval, _04Step3AffiliateDashboard, _05PlaceOrder01NewUserRegularProduct, _05PlaceOrder02OneTimeOrderBackend, _05PlaceOrder03ExistentUserSubscription, _05PlaceOrder04RenewOrder, _05PlaceOrder05NewUserSubscription, _05PlaceOrder06Backend, _06TestScenario1Step1AdminOrderCreation, _06TestScenario1Step2CustomerPayOrder, _0701AffiliateDashboardCheckReferral, _0702AffiliateReferralBackend, _08CancelSubscriptionByCustomer, _09RenewWithoutNextPaymentDay, _10PlaceOrderNewUserDiscovery, _10PlaceOrderNewUserDiscoveryRefund, _10PlaceOrderNewUserDiscoveryRefundEmail, _12ManagedHostingPage } from '../helpers/harmony-woocommerce-tests-templates';

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

test.describe('Harmony - WooCommerce Test - Canada', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "CCEmail": "qa+ccemail@saucal.com",
    "zipCode": "K1S 3V6",
    "project": "harmony",
    "phone": "3254564567",
    "month": "12",
    "Symbol": "C$",
    "countryComplete": "Canada",
    "country": "CA",
    "street": "123 False Street",
    "state": "ON",
    "cc": "4242424242424242",
    "firstName": "QA_CA",
    "year": "28",
    "cvv": "123",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "stateComplete": "Ontario",
    "city": "Ottawa",
    "company": `Testing ${Math.random().toString(36).substring(2, 10)}`,
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _01ProductPage(page, vars);
  });

  test('02 - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _02CartPage(page, vars);
  });

  test('03 - Checkout Page - Managed Hosting', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03CheckoutPageManagedHosting(page, vars);
  });

  test('03 - Checkout Page - Managed Hosting & Maintenance', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03CheckoutPageManagedHostingMaintenance(page, vars);
  });

  test('03 - Checkout Page - Managed Woo - Yearly', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03CheckoutPageManagedWooYearly(page, vars);
  });

  test('03 - Checkout Page - On Demand hours', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03CheckoutPageOnDemandHours(page, vars);
  });

  test('03 - Checkout Page - Woocommerce Maintenance', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03CheckoutPageWoocommerceMaintenance(page, vars);
  });

  test('04 - Step 1 - Affiliate Registration', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _04Step1AffiliateRegistration(page, vars);
  });

  test('04 - Step 2 - Affiliate approval', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _04Step2AffiliateApproval(page, vars);
  });

  test('04 - Step 3 - Affiliate Dashboard', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _04Step3AffiliateDashboard(page, vars);
  });

  test('05 - Place order - 01 - New User - Regular product', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlaceOrder01NewUserRegularProduct(page, vars);
  });

  test('05 - Place order - 02 - One-time order backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlaceOrder02OneTimeOrderBackend(page, vars);
  });

  test('05 - Place order - 03 - Existent User (Subscription)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlaceOrder03ExistentUserSubscription(page, vars);
  });

  test('05 - Place order - 04 - Renew order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlaceOrder04RenewOrder(page, vars);
  });

  test('05 - Place order - 05 - New User - Managed Woo Yearly - Bank Transfer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlaceOrder05NewUserSubscription(page, vars);
  });

  test('05 - Place order - 06 - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlaceOrder06Backend(page, vars);
  });

  test('06 - Test Scenario 1 - CAD - Step 1 - Admin order creation', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _06TestScenario1Step1AdminOrderCreation(page, vars);
  });

  test('06 - Test Scenario 1 - CAD - Step 2 - Customer Pay Order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _06TestScenario1Step2CustomerPayOrder(page, vars);
  });

  test('07 - 01 - Affiliate Dashboard - Check referral', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _0701AffiliateDashboardCheckReferral(page, vars);
  });

  test('07 - 02 - Affiliate referral backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _0702AffiliateReferralBackend(page, vars);
  });

  test('08 - Cancel Subscription by Customer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _08CancelSubscriptionByCustomer(page, vars);
  });

  test('09 - Renew without Next payment day', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _09RenewWithoutNextPaymentDay(page, vars);
  });

  test('10 - Place order - New User - Discovery', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _10PlaceOrderNewUserDiscovery(page, vars);
  });

  test('10 - Place order - New User - Discovery - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _10PlaceOrderNewUserDiscoveryRefund(page, vars);
  });

  test('10 - Place order - New User - Discovery - Refund Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _10PlaceOrderNewUserDiscoveryRefundEmail(page, vars);
  });

  test('12 - Managed Hosting page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _12ManagedHostingPage(page, vars);
  });

});
