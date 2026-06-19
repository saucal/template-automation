// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Leggari Academy - Place Order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { checkCourses, checkOrderDetailsThankYouPageAndMyAccount, fillCC, fillCheckout, goToMyAccountCheckOrderDetails, placeOrderNewUserBackend, placeOrderNewUserEmail, placeOrderNewUserRefund, placeOrderNewUserRefundEmail, subscriptionMenu, thankYouPage } from '../helpers/leggari-academy-common-steps';

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

test.describe('Leggari Academy - Place Order', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "Qa",
    "lastName": "Testing",
    "zipCode": "98512",
    "phone": "3059689789",
    "Symbol": "$",
    "street3": "123 False Shipping",
    "countryComplete": "United States (US)",
    "state": "WA",
    "project": "legarriA",
    "country": "US",
    "subscription": "false",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "currency": "USD",
    "lastName2": "Testing Shipping",
    "street": "5205 Grassland Ave",
    "stateComplete": "Washington",
    "city": "Tumwater",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place Order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.coupon = `false`;
    vars.savedCC = `false`;
    vars.refund = `false`;
    vars.saveCC = `true`;
    // ↓ 07 - Checkout page
    await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(2) > .elementor-element.elementor-align-center.pricing.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#pricing"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`body > div.elementor.elementor-17691 > div.elementor-element.elementor-element-5d2f1f9.e-con-full.elementor-hidden-tablet.elementor-hidden-mobile.e-flex.e-con.e-parent.e-lazyloaded > div.elementor-element.elementor-element-80b20c6.e-con-full.e-flex.e-con.e-child > div.elementor-element.elementor-element-4153ba5.elementor-align-center.elementor-mobile-align-center.pricing.elementor-widget.elementor-widget-button > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`#pricing > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-widget.elementor-widget-text-editor:nth-of-type(5) > .elementor-widget-container`).or(page.locator(`#pricing2 > div > div > div > div.elementor-element.elementor-element-8d74649.elementor-widget.elementor-widget-text-editor > div > p`)).or(page.locator(`#pricing2 > div > div > div > div.elementor-element.elementor-element-ff17608.elementor-widget.elementor-widget-text-editor > div`)).textContent()) ?? '').trim();
    await page.locator(`.elementor-element.elementor-align-center.main-cta-button > .elementor-widget-container > .elementor-button-wrapper > a[href*="/leggari-academy-checkout/?add-to-cart=17043&quantity=1"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`#pricing2 > div > div > div > div.elementor-element.elementor-element-afb4471.elementor-align-center.elementor-widget-mobile__width-inherit.main-cta-button.elementor-widget.elementor-widget-button > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`li.product-item:nth-of-type(1) > .product-item-wrapper`).first()).toHaveText(`One-time payment

($1799)`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`li.product-item:nth-of-type(1) > .product-item-wrapper`).first()).toContainText(`($1799)`);
    try {
      await expect(page.locator(`li.product-item:nth-of-type(2) > .product-item-wrapper`).first()).toHaveText(`$999 + split-pay

(3 x $399)`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`li.product-item:nth-of-type(2) > .product-item-wrapper`).first()).toContainText(`(3 x $399)`);
    try {
      await expect(page.locator(`li.product-item:nth-of-type(3) > .product-item-wrapper`).first()).toHaveText(`Split-pay

(2 x $999)`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`li.product-item:nth-of-type(3) > .product-item-wrapper`).first()).toContainText(`(2 x $999)`);
    try {
      await expect(page.locator(`li.product-item:nth-of-type(4) > .product-item-wrapper`).first()).toHaveText(`$199 + split-pay

(11 x $199)`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`li.product-item:nth-of-type(4) > .product-item-wrapper`).first()).toContainText(`(11 x $199)`);
    await expect(page.locator(`.product-total > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    await expect(page.locator(`.future-payments-detail > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    await expect(page.locator(`.final-payment-details > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    // ↑ end 07 - Checkout page
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
    await subscriptionMenu(page, vars);
    await checkCourses(page, vars);
  });

  test('02 - Place Order - New User - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('03 - Place Order - New User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

  test('04 - Place Order - New User - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefund(page, vars);
  });

  test('05 - Place Order - New User - Refund - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefundEmail(page, vars);
  });

});
