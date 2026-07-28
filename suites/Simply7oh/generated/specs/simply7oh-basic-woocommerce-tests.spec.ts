// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Simply7oh - Basic WooCommerce tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail, login, registration, under18Age } from '../helpers/simply7oh-common-steps-for-project';

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

test.describe('Simply7oh - Basic WooCommerce tests', () => {

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
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under18Age(page, vars);
    await expect(page.locator(`.elementor-element > .elementor-element.e-con-boxed.e-con.e-child > .e-con-inner`)).not.toHaveCount(0);
    await expect(page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(6) > .elementor-element.elementor-widget > .elementor-widget-container > .woocommerce > .splide > .splide__track > .splide__list`)).not.toHaveCount(0);
    await expect(page.locator(`.elementor-element.elementor-element-2bb1efa > .elementor-widget-container > .woocommerce > .splide > .splide__track > .splide__list`)).not.toHaveCount(0);
    await expect(page.locator(`div.elementor-element.elementor-widget:nth-of-type(14) > .elementor-widget-container > .woocommerce > .splide > .splide__track > .splide__list`)).not.toHaveCount(0);
    await expect(page.locator(`div.elementor-element.elementor-widget:nth-of-type(18) > .elementor-widget-container > .woocommerce > .splide > .splide__track > .splide__list`)).not.toHaveCount(0);
    await expect(page.locator(`.elementor-element.sc-home__section-faq > .e-con-inner`)).not.toHaveCount(0);
    await expect(page.locator(`div.elementor-element.elementor-widget:nth-of-type(2) > .elementor-widget-container > .woocommerce > .splide > .splide__track > .splide__list`)).not.toHaveCount(0);
    await expect(page.locator(`.site-middle-footer-wrap > div > .site-container`)).not.toHaveCount(0);
  });

  test('02 - Header', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under18Age(page, vars);
    await expect(page.locator(`.wp-block-kadence-navigation.is-horizontal > nav.navigation > .menu-container > .kb-navigation.menu > li.menu-item.wp-block-kadence-navigation-link:nth-of-type(1) > .kb-link-wrap > a[href*="/shop"].kb-nav-link-content`).first()).toContainText(`Shop`);
    await expect(page.locator(`.wp-block-kadence-navigation.is-horizontal > nav.navigation > .menu-container > .kb-navigation.menu > li.menu-item.wp-block-kadence-navigation-link:nth-of-type(2) > .kb-link-wrap > a[href="#"].kb-nav-link-content`).first()).toContainText(`Rewards`);
    await expect(page.locator(`.wp-block-kadence-navigation.is-horizontal > nav.navigation > .menu-container > .kb-navigation.menu > li.menu-item.wp-block-kadence-navigation-link:nth-of-type(3) > .kb-link-wrap > a[href*="/faq/"].kb-nav-link-content`).first()).toContainText(`Support`);
    await expect(page.locator(`#dgwt-wcas-search-input-1`)).not.toHaveCount(0);
    await expect(page.locator(`.wc-block-mini-cart__quantity-badge`)).not.toHaveCount(0);
    await expect(page.locator(`a[href*="/account/"]`)).not.toHaveCount(0);
    await expect(page.locator(`.kb-button`)).not.toHaveCount(0);
  });

  test('03 - Footer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under18Age(page, vars);
    await expect(page.locator(`.footer-widget-area.widget-area.footer-widget1 > .footer-widget-area-inner.site-info-inner`)).not.toHaveCount(0);
    await expect(page.locator(`form[action="/"]`)).not.toHaveCount(0);
  });

  test('04 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under18Age(page, vars);
    await page.locator(`.wp-block-kadence-navigation.is-horizontal > nav.navigation > .menu-container > .kb-navigation.menu > li.menu-item.wp-block-kadence-navigation-link:nth-of-type(1) > .kb-link-wrap > a[href*="/shop"].kb-nav-link-content`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.elementor-element-7cf4f1f > .elementor-widget-container > h2.elementor-size-default`).first()).toContainText(`Best sellers`);
    await expect(page.locator(`.s7oh-products-filters__pill`)).not.toHaveCount(0);
    await expect(page.locator(`.s7oh-products-filters__pill.is-active`)).toHaveCount(0);
    await page.locator(`.s7oh-products-filters__pill`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.s7oh-products-filters__pill.is-active`)).not.toHaveCount(0);
    await page.locator(`button:last-child.s7oh-products-filters__pill`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.s7oh-products-filters__pill.is-active`)).not.toHaveCount(0);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = Array.from<any>(document.querySelectorAll('.s7oh-products-filters__pill.is-active')).length

return elem === 1 }, vars)).toBeTruthy();
  });

  test('05 - Simple product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('06 - Variable product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('07 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
    await expect(page.locator(`a[href*="/product/roller-girl-bundle-25-tablets-and-3g-powder/"].wc-block-components-product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.wc-block-cart-item__total-price-and-sale-badge-wrapper > .price.wc-block-components-product-price > .wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-product-price__value`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-item__value`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#s7-mini-cart-free-shipping > div`)).not.toHaveCount(0);
    await page.locator(`a[href*="/cart/"] > .wc-block-components-button__text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.coupon-form`)).not.toHaveCount(0);
    await expect(page.locator(`form[action*="/cart/"].woocommerce-cart-form > div:nth-of-type(1)`)).not.toHaveCount(0);
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replace('–','-')

return prod_desc }, vars);
    await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    if (vars.product === 'variable') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toContainText(`variable`);
    }
  });

  test('08 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('09 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await under18Age(page, vars);
    await registration(page, vars);
    await page.locator(`a[href*="/account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#customer_login`)).not.toHaveCount(0);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/account/downloads/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-columns`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Gift Card Balance")]`).or(page.locator(`a[href*="/balance/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#pwgc-balance-title`).first()).toContainText(`Check Gift Card Balance`);
    await page.locator(`a[href*="/account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Quotes")]`).or(page.locator(`a[href*="/account/quotes/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "My Coupons")]`).or(page.locator(`a[href*="/account/wt-smart-coupon/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wt_sc_myaccount_no_available_coupons`).first()).toContainText(`Sorry, you don't have any available coupons`);
    await page.locator(`xpath=//a[contains(text(), "My Store Credits")]`).or(page.locator(`a[href*="/account/wt-store-credit/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wt_Store_credit > div.wt_store_credit_main:nth-of-type(1)`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/account/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('10 - Forgot password flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await under18Age(page, vars);
    await registration(page, vars);
    await page.locator(`a[href*="/account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#customer_login`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(),'Reset your password']`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(2000);
    await page.locator(`xpath=//a[contains(),'Reset your password']`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="password_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
  });

});
