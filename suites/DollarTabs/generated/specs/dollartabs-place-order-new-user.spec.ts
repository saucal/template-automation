// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "DollarTabs - Place Order - New User"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { checkOrderDetailsThankYouPageAndMyAccount, fillCC, fillCheckout, goToMyAccountCheckOrderDetails, login, placeOrderNewUserBackend, placeOrderNewUserEmail, placeOrderNewUserRefund, placeOrderNewUserRefundEmail, thankYouPage } from '../helpers/dollartabs-common-steps-for-project';
import { under18Age } from '../helpers/simply7oh-common-steps-for-project';

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

test.describe('DollarTabs - Place Order - New User', () => {

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
    "password": process.env.PASSWORD ?? '',
    "currency": "USD",
    "company2": "Saucal Shipping",
    "lastName2": "Testing Shipping",
    "company": "Saucal Test",
    "street": "5205 Grassland Ave",
    "stateComplete": "California",
    "city": "Fontana",
    "zipCode": "92336",
    "phone": "3059689789",
    "Symbol": "$",
    "street3": "123 False Shipping",
    "countryComplete": "United States (US)",
    "state": "CA",
    "project": "simply70h",
    "country": "US",
    "subscription": "false",
    "street2": "Ap. 4",
    "password2": process.env.PASSWORD2 ?? '',
    "street4": "4th Floor",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place Order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.coupon = `false`;
    vars.savedCC = `false`;
    vars.refund = `false`;
    vars.redeeming = `false`;
    vars.saveCC = `true`;
    // ↓ 08 - Checkout page
    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 05 - Simple product page
      await under18Age(page, vars);
      await page.locator(`.wp-block-kadence-navigation.is-horizontal > nav.navigation > .menu-container > .kb-navigation.menu > li.menu-item.wp-block-kadence-navigation-link:nth-of-type(1) > .kb-link-wrap > a[href*="/shop"].kb-nav-link-content`).filter({ visible: true }).first().click({ force: true });
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const button = Array.from<any>(document.querySelectorAll('.add-to-cart:not(.variable)'))[0];
// or: const button = this;   // ← inside event listener

const titleLink = button.closest('.s7oh-product-card').querySelector('.s7oh-product-card__title > a')

titleLink.click()
 }, vars);
      await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
      vars.prod_desc = ((await page.locator(`h2.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 05 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 06 - Variable product page
      await under18Age(page, vars);
      await page.locator(`.wp-block-kadence-navigation.is-horizontal > nav.navigation > .menu-container > .kb-navigation.menu > li.menu-item.wp-block-kadence-navigation-link:nth-of-type(1) > .kb-link-wrap > a[href*="/shop"].kb-nav-link-content`).filter({ visible: true }).first().click({ force: true });
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const button = Array.from<any>(document.querySelectorAll('.add-to-cart.variable'))[0];
// or: const button = this;   // ← inside event listener

const titleLink = button.closest('.s7oh-product-card').querySelector('.s7oh-product-card__title > a')

titleLink.click()
 }, vars);
      await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
      await page.locator(`table.variations select`).filter({ visible: true }).first().click({ force: true });
      await page.locator(`option:last-child.enabled`).filter({ visible: true }).first().click({ force: true });
      vars.variable = ((await page.locator(`table.variations select`).textContent()) ?? '').trim();
      vars.prod_desc = ((await page.locator(`h2.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 06 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.woocommerce-message')

return !!element }, vars)) {
      await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    await expect(page.locator(`.wp-block-woocommerce-mini-cart-contents`)).not.toHaveCount(0);
    await expect(page.locator(`a[href*="/product/"].wc-block-components-product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.wc-block-cart-item__total-price-and-sale-badge-wrapper > .price.wc-block-components-product-price > .wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-product-price__value`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-item__value`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#s7-mini-cart-free-shipping > div`)).not.toHaveCount(0);
    await page.locator(`a[href*="/checkout/"] > .wc-block-components-button__text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woolentor-product-price > span.woolentor-product-price-value.woolentor-price-hide-regular-price > span`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`div.elementor-widget-s7oh_checkout_discount_form > div > div > div.coupon-form`)).not.toHaveCount(0);
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-')

return prod_desc }, vars);
    await expect(page.locator(`td.product-name > a[href*="/product/"]`).or(page.locator(`div.woolentor-product-content > div.woolentor-product-content-top > a > h5`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).or(page.locator(`div.woolentor-product-content > div.woolentor-product-content-top > a > h5`)).first()).toContainText(`${vars.variable ?? ''}`);
    }
    // ↑ end 08 - Checkout page
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
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

  test('06 - Place Order - Logged User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.product = `variable`;
    vars.logged = `yes`;
    vars.savedCC = `true`;
    vars.saveCC = `false`;
    vars.coupon = `false`;
    vars.refund = `false`;
    vars.redeeming = `false`;
    if (vars.logged === 'yes') {
      await login(page, vars);
    }
    // ↓ 08 - Checkout page
    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 05 - Simple product page
      await under18Age(page, vars);
      await page.locator(`.wp-block-kadence-navigation.is-horizontal > nav.navigation > .menu-container > .kb-navigation.menu > li.menu-item.wp-block-kadence-navigation-link:nth-of-type(1) > .kb-link-wrap > a[href*="/shop"].kb-nav-link-content`).filter({ visible: true }).first().click({ force: true });
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const button = Array.from<any>(document.querySelectorAll('.add-to-cart:not(.variable)'))[0];
// or: const button = this;   // ← inside event listener

const titleLink = button.closest('.s7oh-product-card').querySelector('.s7oh-product-card__title > a')

titleLink.click()
 }, vars);
      await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
      vars.prod_desc = ((await page.locator(`h2.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 05 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 06 - Variable product page
      await under18Age(page, vars);
      await page.locator(`.wp-block-kadence-navigation.is-horizontal > nav.navigation > .menu-container > .kb-navigation.menu > li.menu-item.wp-block-kadence-navigation-link:nth-of-type(1) > .kb-link-wrap > a[href*="/shop"].kb-nav-link-content`).filter({ visible: true }).first().click({ force: true });
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const button = Array.from<any>(document.querySelectorAll('.add-to-cart.variable'))[0];
// or: const button = this;   // ← inside event listener

const titleLink = button.closest('.s7oh-product-card').querySelector('.s7oh-product-card__title > a')

titleLink.click()
 }, vars);
      await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
      await page.locator(`table.variations select`).filter({ visible: true }).first().click({ force: true });
      await page.locator(`option:last-child.enabled`).filter({ visible: true }).first().click({ force: true });
      vars.variable = ((await page.locator(`table.variations select`).textContent()) ?? '').trim();
      vars.prod_desc = ((await page.locator(`h2.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 06 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.woocommerce-message')

return !!element }, vars)) {
      await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    await expect(page.locator(`.wp-block-woocommerce-mini-cart-contents`)).not.toHaveCount(0);
    await expect(page.locator(`a[href*="/product/"].wc-block-components-product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.wc-block-cart-item__total-price-and-sale-badge-wrapper > .price.wc-block-components-product-price > .wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-product-price__value`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-item__value`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#s7-mini-cart-free-shipping > div`)).not.toHaveCount(0);
    await page.locator(`a[href*="/checkout/"] > .wc-block-components-button__text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woolentor-product-price > span.woolentor-product-price-value.woolentor-price-hide-regular-price > span`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`div.elementor-widget-s7oh_checkout_discount_form > div > div > div.coupon-form`)).not.toHaveCount(0);
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-')

return prod_desc }, vars);
    await expect(page.locator(`td.product-name > a[href*="/product/"]`).or(page.locator(`div.woolentor-product-content > div.woolentor-product-content-top > a > h5`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).or(page.locator(`div.woolentor-product-content > div.woolentor-product-content-top > a > h5`)).first()).toContainText(`${vars.variable ?? ''}`);
    }
    // ↑ end 08 - Checkout page
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
  });

  test('07 - Place Order - Logged User - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('08 - Place Order - Logged User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

});
