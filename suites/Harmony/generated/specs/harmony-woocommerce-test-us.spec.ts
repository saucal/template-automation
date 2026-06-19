// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Harmony - WooCommerce Test - US"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail, login } from '../helpers/common-steps-for-all-projects';
import { login } from '../helpers/harmony-common-steps-for-suites';
import { _01ProductPage, _02CartPage, _03CheckoutPageManagedHosting, _03CheckoutPageManagedHostingMaintenance, _03CheckoutPageManagedWooYearly, _03CheckoutPageOnDemandHours, _03CheckoutPageWoocommerceMaintenance, _04Step1AffiliateRegistration, _04Step2AffiliateApproval, _04Step3AffiliateDashboard, _05PlaceOrder01NewUserRegularProduct, _05PlaceOrder02OneTimeOrderBackend, _05PlaceOrder03ExistentUserSubscription, _05PlaceOrder04RenewOrder, _05PlaceOrder05NewUserSubscription, _05PlaceOrder06Backend, _06TestScenario1Step1AdminOrderCreation, _06TestScenario1Step2CustomerPayOrder, _0701AffiliateDashboardCheckReferral, _0702AffiliateReferralBackend, _08CancelSubscriptionByCustomer, _09RenewWithoutNextPaymentDay, _12ManagedHostingPage } from '../helpers/harmony-woocommerce-tests-templates';

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

test.describe('Harmony - WooCommerce Test - US', () => {

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
    "countryComplete": "United States (US)",
    "month": "12",
    "cc": "4242424242424242",
    "firstName": "QA_US",
    "year": "28",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "cvv": "123",
    "street": "123 False Street",
    "city": "Dallas",
    "company": `Testing ${Math.random().toString(36).substring(2, 10)}`,
    "phone": "3254564567",
    "state": "TX",
    "emailCC": "qa+ccemail@saucal.com",
    "zipCode": "75234",
    "stateComplete": "Texas",
    "project": "harmony",
    "Symbol": "$",
    "country": "US",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page (My account)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

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

  test('05 - Place order - 05 - New User - Subscription', async ({ page }) => {
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

  test('12 - Managed Hosting page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _12ManagedHostingPage(page, vars);
  });

  test('16 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/wp-login.php?action=lostpassword"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#body_content_inner > p > a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Your password has been reset successfully.`);
    vars.pass = `${vars.password2 ?? ''}`;
    await page.goto(`${vars.url ?? ''}`);
    await page.waitForLoadState('load');
    await login(page, vars);
  });

  test('16 - My Account Links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `no`;
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(2)`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No order has been made yet.`);
    } catch { /* optional step: assertTextPresent */ }
    await page.locator(`xpath=//a[contains(text(), "Subscriptions")]`).or(page.locator(`a[href*="/subscriptions/"]`)).or(page.locator(`a[href*="/view-subscription/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.no_subscriptions`).or(page.locator(`.shop_table.subscription_details`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-column1 > header.woocommerce-Address-title.title > h2`).first()).toContainText(`Billing address`);
    await expect(page.locator(`.u-column2 > header.woocommerce-Address-title.title > h2`).first()).toContainText(`Shipping address`);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Message`).or(page.locator(`.wc-block-components-notice-banner`)).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm > div.clear:nth-of-type(1)`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`#customer_login`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    await login(page, vars);
  });

});
