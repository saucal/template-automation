// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Vesica - Basic WooCommerce Tests - Guest"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';

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

test.describe('Vesica - Basic WooCommerce Tests - Guest', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
  });

  test('02 - About Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/about-us/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Courses Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > .menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children > a[href*="/calendar-of-courses-and-events/"].elementor-item.has-submenu > span`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(3) > ul.sub-menu.elementor-nav-menu--dropdown.sm-nowrap > li:nth-of-type(1) > a.elementor-sub-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - BG Courses Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > .menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children > a[href*="/calendar-of-courses-and-events/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(3) > ul.sub-menu.elementor-nav-menu--dropdown.sm-nowrap > li:nth-of-type(2) > a.elementor-sub-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - C&M Courses Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > .menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children > a[href*="/calendar-of-courses-and-events/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(3) > ul.sub-menu.elementor-nav-menu--dropdown.sm-nowrap > li:nth-of-type(3) > a.elementor-sub-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - SS Courses Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > .menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children > a[href*="/calendar-of-courses-and-events/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(3) > ul.sub-menu.elementor-nav-menu--dropdown.sm-nowrap > li:nth-of-type(5) > a.elementor-sub-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - VS Courses Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > .menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children > a[href*="/calendar-of-courses-and-events/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(3) > ul.sub-menu.elementor-nav-menu--dropdown.sm-nowrap > li:nth-of-type(4) > a.elementor-sub-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - Articles page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(4) > a[href*="/article-topics/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('06 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    try {
      await page.locator(`.cky-notice-btn-wrapper > button[aria-label="Reject All"].cky-btn.cky-btn-reject`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('07 - Members page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(6) > a[href="/my-account/courses/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('08 - Contact page', async ({ page }) => {
    await page.goto(`/article-topics/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(7) > a[href*="/contact-us/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`#form-field-name`).first().fill(`QA Test`); } catch { await page.locator(`#form-field-name`).first().selectOption(`QA Test`); }
    try { await page.locator(`#form-field-email`).first().fill(`qa+gi_form${vars.alphanumeric ?? ''}@saucal.com`); } catch { await page.locator(`#form-field-email`).first().selectOption(`qa+gi_form${vars.alphanumeric ?? ''}@saucal.com`); }
    try { await page.locator(`#form-field-message`).first().fill(`test message`); } catch { await page.locator(`#form-field-message`).first().selectOption(`test message`); }
    await page.locator(`xpath=//span[contains(text(), "Send")]`).or(page.locator(`button[type="submit"] > span > .elementor-button-text`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(60000);
    await expect(page.locator(`div.page .elementor-widget-container`).first()).toHaveText(`Your Message Was Sent
We’ll get back to you as quickly as possible`);
  });

  test('09 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 06 - Shop page
    try {
      await page.locator(`.cky-notice-btn-wrapper > button[aria-label="Reject All"].cky-btn.cky-btn-reject`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 06 - Shop page
    await page.locator(`a[href*="/product-category/vesica-shop/online-courses/"] > img`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.product.instock > a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.elementor-widget-container > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  });

  test('10 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 09 - Product page
    // ↓ 06 - Shop page
    try {
      await page.locator(`.cky-notice-btn-wrapper > button[aria-label="Reject All"].cky-btn.cky-btn-reject`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 06 - Shop page
    await page.locator(`a[href*="/product-category/vesica-shop/online-courses/"] > img`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.product.instock > a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.elementor-widget-container > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    // ↑ end 09 - Product page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`“${vars.prod_desc ?? ''}” has been added to your cart.`);
    await expect(page.locator(`.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  });

  test('11 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 10 - Cart page
    // ↓ 09 - Product page
    // ↓ 06 - Shop page
    try {
      await page.locator(`.cky-notice-btn-wrapper > button[aria-label="Reject All"].cky-btn.cky-btn-reject`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 06 - Shop page
    await page.locator(`a[href*="/product-category/vesica-shop/online-courses/"] > img`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.product.instock > a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.elementor-widget-container > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    // ↑ end 09 - Product page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`“${vars.prod_desc ?? ''}” has been added to your cart.`);
    await expect(page.locator(`.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    // ↑ end 10 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''}  × 1`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  });

});
