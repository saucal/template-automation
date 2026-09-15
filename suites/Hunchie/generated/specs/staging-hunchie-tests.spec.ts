// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "STAGING - Hunchie - Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, blockUI, checkOrderAndSubscriptionsOnMyAccount, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { _01HomePage, _02ShopPage, _03SimpleProductPage, _07CartPage, _08CheckoutPage, _09PlaceOrder02Backend, _10RegistrationMyAccountLinksAndLogin, _11ForgotPasswordFlow } from '../helpers/template-woocommerce-tests';

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

test.describe('STAGING - Hunchie - Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "street": "123 False Street",
    "street3": "123 False Shipping",
    "city": "Calgary",
    "zipCode": "T2T 0A4",
    "phone": "6135465467",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Ship`,
    "project": "hunchie",
    "countryComplete": "Canada",
    "state": "AB",
    "stateComplete": "Alberta",
    "Symbol": "C$",
    "admin_user": "saucal",
    "admin_pass": process.env.ADMIN_PASS ?? '',
    "country": "CA",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _01HomePage(page, vars);
    await blockImageSizes(page, vars);
  });

  test('02 - Shop Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _02ShopPage(page, vars);
  });

  test('03 - Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03SimpleProductPage(page, vars);
  });

  test('04 - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _07CartPage(page, vars);
  });

  test('05 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _08CheckoutPage(page, vars);
  });

  test('06 - Place order - 01 - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Place order - New User
    if (vars.project !== "icg") {
      vars.qty = `2`;
    }
    if (vars.project !== "icg") {
      await _03SimpleProductPage(page, vars);
    }
    if (vars.project == "icg") {
      vars.qty = `1`;
    }
    if (vars.project == "icg") {
      // ↓ 07 - Checkout page
      await _08CheckoutPage(page, vars);
      // ↑ end 07 - Checkout page
    }
    if (vars.project !== "icg") {
      vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`
unitPrice = unitPrice.replace(`${vars.Symbol}`,"").trim();
let qty = vars.qty
let subtotal = unitPrice * qty
return `${vars.Symbol}`+(Math.round(subtotal*100)/100).toFixed(2) }, vars);
    }
    if (vars.project !== "icg") {
      try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    }
    if (vars.project !== "icg") {
      await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.project !== "hunchie" && vars.project !== "icg") {
      await page.locator(`a[href*="/cart/"].cart-popup__product-button`).or(page.locator(`a[href*="/cart/"]`)).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.project !== "icg") {
      await page.locator(`a[href*="/checkout/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.project !== "leggari" && vars.project !== "icg") {
      await placeOrderElement(page, vars);
    }
    if (vars.project !== "leggari" && vars.project !== "icg") {
      await expect(page.locator(`.woocommerce_error > li`).first()).toContainText(`The card number is incomplete.`);
    }
    if (vars.project !== "leggari" && vars.project !== "icg") {
      try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().selectOption(`4242 4242 4242 4242`); }
    }
    if (vars.project !== "leggari" && vars.project !== "icg") {
      try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().fill(`12 / 24`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().selectOption(`12 / 24`); }
    }
    if (vars.project !== "leggari" && vars.project !== "icg") {
      try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    }
    if (vars.project !== "leggari") {
      await placeOrderElement(page, vars);
    }
    if (vars.project !== "hunchie"  && vars.project !== "icg" 
&& vars.project !== "leggari") {
      await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`iframe#wcp-checkout-iframe .wc-block-components-notice-banner.is-error`)).or(page.locator(`.woocommerce-error`)).or(page.locator(`iframe#wcp-checkout-iframe .woocommerce-error`)).first()).toContainText(`Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing ZIP Code is a required field.
Billing Phone is a required field.
Billing Email address is a required field.`);
    }
    if (vars.project === "icg") {
      await expect(page.locator(`iframe#wcp-checkout-iframe .wc-block-components-notice-banner.is-error`).or(page.locator(`iframe#wcp-checkout-iframe .woocommerce-error`)).first()).toContainText(`Billing Email address is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing Postal code is a required field.
Billing Phone is a required field.`);
    }
    if (vars.project === "hunchie") {
      await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toContainText(`Billing Email address is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing Postal code is a required field.
Billing Phone is a required field.`);
    }
    if (vars.project !== "leggari") {
      await wooCommerceCheckoutTemplate(page, vars);
    }
    if (vars.project != "icg" && vars.project !== "leggari") {
      {
        const _lbl = page.locator(`label[for="wc-stripe-new-payment-method"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#wc-stripe-new-payment-method`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await checkOrderAndSubscriptionsOnMyAccount(page, vars);
    // ↑ end 01 - Place order - New User
  });

  test('06 - Place order - 02 - Backend Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _09PlaceOrder02Backend(page, vars);
  });

  test('07 - My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _10RegistrationMyAccountLinksAndLogin(page, vars);
  });

  test('08 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _11ForgotPasswordFlow(page, vars);
  });

});
