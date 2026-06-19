// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "STAGING - ICG Bullion - Place order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, checkOrderAndSubscriptionsOnMyAccount, extractUserFromEmail, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { _03SimpleProductPage, _08CheckoutPage, _09PlaceOrder02Backend } from '../helpers/template-woocommerce-tests';

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

test.describe('STAGING - ICG Bullion - Place order', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "state": "AB",
    "stateComplete": "Alberta",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "Symbol": "$",
    "adminUser": "guest@saucal.com",
    "currency": "CAD",
    "country": "CA",
    "street": "123 False Street",
    "company": "Testing Inc.",
    "street3": "123 False Shipping",
    "password": process.env.PASSWORD ?? '',
    "city": "Calgary",
    "zipCode": "T2T 0A4",
    "phone": "6135465467",
    "password2": process.env.PASSWORD2 ?? '',
    "street2": "Ap. 4",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Ship`,
    "qty": "2",
    "street4": "Ap. Ship",
    "project": "icg",
    "countryComplete": "Canada",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('08 - Place order - 01 - New User', async ({ page }) => {
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

  test('08 - Place order - 02 - Backend Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _09PlaceOrder02Backend(page, vars);
  });

  test('08 - Place order - 03 - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`1`);
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(2)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`Interac e-transfer`);
    try {
      await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`tr:nth-of-type(5) > td.td`).first()).toContainText(`Order Note for Testing this field`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  });

});
