// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "KYBB - Basic Woocomerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { placeOrderElement, resetEmailWPEngineSites, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { login, register } from '../helpers/kybb-common-steps-for-suites';

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

test.describe('KYBB - Basic Woocomerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "CCard": "4030000010001234",
    "month": "05",
    "year": "23",
    "cvv": "123",
    "street": "123 False Street",
    "city": "Ottawa",
    "state": "ON",
    "country": "CA",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Testing Inc.",
    "phone": "6134564567",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "zipCode": "K1S 3V6",
    "street3": "123 false Shipping Street",
    "project": "kybb",
    "stateComplete": "Ontario",
    "countryComplete": "Canada",
    "Symbol": "$",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('“Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`p > a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/my-account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await expect(page.locator(`.woocommerce > p`).first()).toContainText(`A password reset email has been sent to the email address on file for your account, but may take several minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.`);
    await resetEmailWPEngineSites(page, vars);
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`#post-8 > div > div:nth-child(1) > div > div > div > div > form > p:nth-child(7) > button`).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

  test('Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Product Page
    await page.locator(`#mega-menu-item-6714 > a`).first().hover();
    await page.locator(`.menu-item.menu-item-type-custom > a[href*="/product-category/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail.lazyloaded`).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`td.value > select`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end Product Page
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.entry-summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label[for="shipping_method_0_betrs_shipping41-1"] > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.productDesc = ((await page.locator(`td.product-name > a`).textContent()) ?? '').trim();
  });

  test('Categories page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://bodybeststg.wpengine.com/shop-by-category/`);
    await page.waitForLoadState('load');
  });

  test('Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Cart Page
    // ↓ Product Page
    await page.locator(`#mega-menu-item-6714 > a`).first().hover();
    await page.locator(`.menu-item.menu-item-type-custom > a[href*="/product-category/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail.lazyloaded`).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`td.value > select`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end Product Page
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.entry-summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label[for="shipping_method_0_betrs_shipping41-1"] > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.productDesc = ((await page.locator(`td.product-name > a`).textContent()) ?? '').trim();
    // ↑ end Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/"] > img.lazyloaded`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > h1`).first()).toContainText(`KNOW YOUR BODY BEST`);
    await expect(page.locator(`a[href="/"] > img.lazyloaded`)).not.toHaveCount(0);
  });

  test('Mobile Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    try {
      {
        const _lbl = page.locator(`label[for="hs-eu-confirmation-button"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#hs-eu-confirmation-button`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await page.locator(`#mobileMenu .btn.mOpen`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#mobileMenu #menu-mobile-menu`).first()).toBeVisible();
    await page.screenshot({ fullPage: true });
    await page.locator(`#mobileMenu #menu-mobile-menu > .menu-item-has-children > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#mobileMenu #menu-mobile-menu > .menu-item-has-children > .sub-menu`).first()).toBeVisible();
  });

  test('Place order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Checkout page
    // ↓ Cart Page
    // ↓ Product Page
    await page.locator(`#mega-menu-item-6714 > a`).first().hover();
    await page.locator(`.menu-item.menu-item-type-custom > a[href*="/product-category/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail.lazyloaded`).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`td.value > select`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end Product Page
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.entry-summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label[for="shipping_method_0_betrs_shipping41-1"] > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.productDesc = ((await page.locator(`td.product-name > a`).textContent()) ?? '').trim();
    // ↑ end Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    // ↑ end Checkout page
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Your card information is invalid or incomplete.`);
    try { await page.locator(`iframe[name="bambora-card-number-iframe"]`).first().contentFrame().locator(`#bambora-card-number`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe[name="bambora-card-number-iframe"]`).first().contentFrame().locator(`#bambora-card-number`).first().selectOption(`${vars.CCard ?? ''}`); }
    try { await page.locator(`iframe[name="bambora-expiry-iframe"]`).first().contentFrame().locator(`#bambora-expiry`).first().fill(`${vars.month ?? ''}${vars.year ?? ''}`); } catch { await page.locator(`iframe[name="bambora-expiry-iframe"]`).first().contentFrame().locator(`#bambora-expiry`).first().selectOption(`${vars.month ?? ''}${vars.year ?? ''}`); }
    try { await page.locator(`iframe[name="bambora-cvv-iframe"]`).first().contentFrame().locator(`#bambora-cvv`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[name="bambora-cvv-iframe"]`).first().contentFrame().locator(`#bambora-cvv`).first().selectOption(`${vars.cvv ?? ''}`); }
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).first()).toContainText(`Billing First name is a required field.`);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(2)`).first()).toContainText(`Billing Last name is a required field.`);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(3)`).first()).toContainText(`Billing Street address is a required field.`);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(4)`).first()).toContainText(`Billing Town / City is a required field.`);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(5)`).first()).toContainText(`Billing Postal code is a required field.`);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(6)`).first()).toContainText(`Billing Phone is a required field.`);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(7)`).first()).toContainText(`Billing Email address is a required field.`);
    try {
      await expect(page.locator(`.woocommerce-error > li:nth-of-type(8)`).first()).toContainText(`Google reCAPTCHA verification failed, please try again later`);
    } catch { /* optional step: assertTextPresent */ }
    try { await page.locator(`iframe[name="bambora-card-number-iframe"]`).first().contentFrame().locator(`#bambora-card-number`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe[name="bambora-card-number-iframe"]`).first().contentFrame().locator(`#bambora-card-number`).first().selectOption(`${vars.CCard ?? ''}`); }
    try { await page.locator(`iframe[name="bambora-expiry-iframe"]`).first().contentFrame().locator(`#bambora-expiry`).first().fill(`${vars.month ?? ''}${vars.year ?? ''}`); } catch { await page.locator(`iframe[name="bambora-expiry-iframe"]`).first().contentFrame().locator(`#bambora-expiry`).first().selectOption(`${vars.month ?? ''}${vars.year ?? ''}`); }
    try { await page.locator(`iframe[name="bambora-cvv-iframe"]`).first().contentFrame().locator(`#bambora-cvv`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[name="bambora-cvv-iframe"]`).first().contentFrame().locator(`#bambora-cvv`).first().selectOption(`${vars.cvv ?? ''}`); }
    await wooCommerceCheckoutTemplate(page, vars);
    try {
      {
        const _lbl = page.locator(`label[for="wc_constant_contact_subscribe"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#wc_constant_contact_subscribe`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-notice > span`).first()).toContainText(`Your order has been received.`);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.firstName ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.lastName ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.company ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.street ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.city ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`ON`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.zipCode ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.firstName ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.lastNameShipping ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.shippingStreet ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.city ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`ON`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.zipCode ?? ''}`);
    await page.locator(`.logInWrap > a[href="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "MY ORDERS")]`).or(page.locator(`a[href*="/my-account/orders/"] > span`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toContainText(`${vars.totalPrice ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.firstName ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.lastName ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.company ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.street ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.city ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`ON`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.zipCode ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.firstName ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.lastName2 ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.street3 ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.city ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`ON`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.zipCode ?? ''}`);
  });

  test('Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#mega-menu-item-6714 > a`).first().hover();
    await page.locator(`.menu-item.menu-item-type-custom > a[href*="/product-category/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail.lazyloaded`).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`td.value > select`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
  });

  test('Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.locator(`xpath=//span[contains(text(), "MY PROFILE/PASSWORD")]`).or(page.locator(`a[href*="/my-account/edit-account/"] > span`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm > div.clear:nth-of-type(1)`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > p`).first()).toContainText(`The following addresses will be used on the checkout page by default.`);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Message`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Wishlists")]`).or(page.locator(`a[href*="/my-account/account-wishlists/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#wl-wrapper > h2`).first()).toContainText(`Wishlists`);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce=e83b3a0978"]`)).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
  });

  test('Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://bodybeststg.wpengine.com/product-category/clinic-essentials/`);
    await page.waitForLoadState('load');
  });

});
