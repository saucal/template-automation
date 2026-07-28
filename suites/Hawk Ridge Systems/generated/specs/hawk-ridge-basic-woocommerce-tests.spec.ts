// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Hawk Ridge - Basic WooCommerce tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { acceptCookies, extractUserFromEmail, fillCC, login, logout, register } from '../helpers/hawk-ridge-common-steps';

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

test.describe('Hawk Ridge - Basic WooCommerce tests', () => {

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
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
  });

  test('02 - Software Solutions page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    // ↑ end 01 - Home page
    await page.locator(`li.e-n-menu-item:nth-of-type(1) > .e-n-menu-title > .e-n-menu-title-container > .e-n-menu-title-text`).or(page.locator(`#menu-item-579 > a`)).first().hover();
    await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(1) > .elementor-element.elementor-widget.elementor-widget-heading > .elementor-widget-container > h2.elementor-size-default > a[href*="/software-solutions"]`).or(page.locator(`#menu-item-579 > a[href*="/software-solutions"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.bdt-element-link.elementor-element.elementor-element-43afe25e > .elementor-widget-container > .bdt-ep-advanced-icon-box > .bdt-ep-advanced-icon-box-icon`)).not.toHaveCount(0);
    await expect(page.locator(`.bdt-element-link.elementor-element.elementor-element-43afe25e > .elementor-widget-container > .bdt-ep-advanced-icon-box > .bdt-ep-advanced-icon-box-content`)).not.toHaveCount(0);
    await acceptCookies(page, vars);
  });

  test('03 - Markforged 3D Printer page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    // ↑ end 01 - Home page
    await page.locator(`li.e-n-menu-item:nth-of-type(1) > .e-n-menu-title > .e-n-menu-title-container > .e-n-menu-title-text`).or(page.locator(`#menu-item-613 > a`)).first().hover();
    await page.locator(`div:nth-of-type(1) > p > span > a[href*="/markforged"]`).or(page.locator(`#menu-item-613 a[href*="/markforged"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.bdt-element-link.elementor-element > .elementor-widget-container > .bdt-ep-advanced-icon-box > .bdt-ep-advanced-icon-box-icon > .bdt-ep-advanced-icon-box-icon-wrap > img.attachment-full.size-full`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element > .elementor-widget-container`)).not.toHaveCount(0);
    await page.locator(`div.bdt-ep-accordion-item:nth-of-type(1) > .bdt-ep-accordion-title.bdt-accordion-title > .bdt-ep-accordion-icon > .bdt-ep-accordion-icon-closed > svg.fa-fw.e-fas-caret-down`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.bdt-ep-accordion-item:nth-of-type(2) > .bdt-ep-accordion-title.bdt-accordion-title > .bdt-ep-accordion-icon > .bdt-ep-accordion-icon-closed > svg.fa-fw.e-fas-caret-down`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#bdt-accordion-2`).first()).toContainText(`No, the FX10 is not designed to be a high-temperature printer like the FX20, which is designed to handle applications like aircraft parts. The FX10’s heated chamber is more suitable for factory floor materials.`);
    await acceptCookies(page, vars);
  });

  test('04 - Industries page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    // ↑ end 01 - Home page
    await page.locator(`a[href*="/industries"] > .e-n-menu-title-text`).or(page.locator(`a[href*="/industries"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.elementor-element-08fed4b > .e-con-inner`)).not.toHaveCount(0);
    await expect(page.locator(`div.elementor-element.e-con-boxed.e-con.e-parent:nth-of-type(8) > .e-con-inner`)).not.toHaveCount(0);
    await expect(page.locator(`.e-con-inner > .elementor-element.elementor-widget.elementor-widget-bdt-advanced-heading > .elementor-widget-container`)).not.toHaveCount(0);
    await acceptCookies(page, vars);
  });

  test('05 - About Us page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/about-us"] > .e-n-menu-title-text`).or(page.locator(`a[href="/about-us"]`)).filter({ visible: true }).first().click({ force: true });
    await acceptCookies(page, vars);
  });

  test('06 - Contact Us page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/contact-us"] > .elementor-icon-list-text`).filter({ visible: true }).first().click({ force: true });
    await acceptCookies(page, vars);
  });

  test('07 - Deal page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    // ↑ end 01 - Home page
    await page.locator(`xpath=//span[contains(text(), "Deals")]`).or(page.locator(`a[href="/promotions"] > .e-n-menu-title-text`)).or(page.locator(`#menu-item-51233 > a[href="/promotions"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.elementor-element-4adffd3`)).not.toHaveCount(0);
  });

  test('08 - Store page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.menu-item > a[href="/product-category/software"].ep-menu-nav-link`)).not.toHaveCount(0);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(1) > a[href="/product-category/software/solidworks"]`).first()).toContainText(`SOLIDWORKS`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(2) > a[href*="/product-category/software/3dexperience-platform"]`).first()).toContainText(`3DEXPERIENCE`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(3) > a[href="/product-category/software/draftsight"]`).first()).toContainText(`DraftSight`);
    await expect(page.locator(`.menu-item > a[href="/product-category/3d-printers"].ep-menu-nav-link`)).not.toHaveCount(0);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(1) > a[href="/product-category/3d-printers/markforged-3d-printers"]`).first()).toContainText(`Markforged`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(2) > a[href*="/product-category/3d-printers/formlabs-3d-printers"]`).first()).toContainText(`Formlabs`);
    await expect(page.locator(`.menu-item > a[href="/product-category/3d-printer-materials"].ep-menu-nav-link`)).not.toHaveCount(0);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(1) > a[href="/product-category/3d-printer-materials/markforged-materials"]`).first()).toContainText(`Markforged`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(2) > a[href*="/product-category/3d-printer-materials/formlabs-materials"]`).first()).toContainText(`Formlabs`);
    await expect(page.locator(`.menu-item > a[href="/product-category/3d-printer-parts"].ep-menu-nav-link`)).not.toHaveCount(0);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(1) > a[href="/product-category/3d-printer-parts/markforged-spare-parts"]`).first()).toContainText(`Markforged`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(2) > a[href*="/product-category/3d-printer-parts/formlabs-spare-parts"]`).first()).toContainText(`Formlabs`);
    await expect(page.locator(`.menu-item > a[href="/product-category/training"].ep-menu-nav-link`)).not.toHaveCount(0);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(1) > a[href="/product-category/training/solidworks-training"]`).first()).toContainText(`SOLIDWORKS`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(2) > a[href="/product-category/training/camworks-training"]`).first()).toContainText(`CAMWorks`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(3) > a[href="/product-category/training/driveworks-training"]`).first()).toContainText(`DriveWorks`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(4) > a[href="/product-category/training/markforged-training"]`).first()).toContainText(`Markforged`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(5) > a[href*="/product-category/training-passes"]`).first()).toContainText(`Passes`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(6) > a[href="/product-category/training/on-demand-training"]`).first()).toContainText(`On-Demand`);
    await expect(page.locator(`.ep-megamenu-panel > li.menu-item.menu-item-type-custom.menu-item-object-custom.nav-item:nth-of-type(7) > a[href*="/product-category/training-credits"]`).first()).toContainText(`Credits`);
    await acceptCookies(page, vars);
  });

  test('09 - Product Category page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    // ↑ end 01 - Home page
    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="/product-category/software"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div.elementor-element.e-con-boxed.e-con.e-parent.e-lazyloaded:nth-of-type(2) > .e-con-inner > div.elementor-element.e-con-full.e-con.e-child:nth-of-type(1) > div.elementor-element.elementor-widget:nth-of-type(2) > .elementor-widget-container`)).not.toHaveCount(0);
    await expect(page.locator(`div.elementor-element.e-con-boxed.e-con.e-parent.e-lazyloaded:nth-of-type(2) > .e-con-inner > div.elementor-element.e-con-full.e-con.e-child:nth-of-type(2)`)).not.toHaveCount(0);
  });

  test('10 - Variable product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`div[data-ep-wrapper-link*="store"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    await page.locator(`a[href="/product-category/software"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.swiper-carousel`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-variable.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`.variations select:nth-of-type(1) > option[selected]`).or(page.locator(`h1.product_title`)).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="license-type"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#license-type`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#license-type > option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-Price-amount > bdi`)).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#license-type') }, vars)) {
      vars.licenseType = ((await page.locator(`#license-type`).textContent()) ?? '').trim();
    }
  });

  test('11 - Bundle product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.product = `bundle`;
    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    await page.locator(`a[href="/product-category/software"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.swiper-carousel`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-bundle.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
  });

  test('12 - Simple product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    await page.locator(`a[href="/product-category/3d-printers"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.swiper-carousel`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-simple.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
  });

  test('13 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 12 - Simple product page
    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    await page.locator(`a[href="/product-category/3d-printers"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.swiper-carousel`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-simple.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    // ↑ end 12 - Simple product page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`“${vars.prodDesc ?? ''}” has been added to your cart.`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation')

return !element }, vars)) {
      await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(3) > .elementor-element.elementor-align-center.wc-cart-icon--yes.wc-cart-icon--cart-medium.wc-cart-badge--yes.elementor-widget.elementor-widget-global.elementor-widget-bdt-wc-mini-cart > .elementor-widget-container > .bdt-mini-cart-wrapper > a[href="#"].bdt-offcanvas-button.bdt-mini-cart-button > .bdt-mini-cart-inner > .bdt-mini-cart-button-icon > .bdt-cart-icon > i.ep-icon-cart`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > .bdt-mini-cart-products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents > .bdt-mini-cart-product-item.cart_item > div:nth-of-type(2) > .bdt-mini-cart-product-name > a[href*="/product/formlabs-form-3-complete-package"]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > .bdt-mini-cart-products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents > .bdt-mini-cart-product-item.cart_item > div:nth-of-type(2) > .bdt-mini-cart-product-price > .quantity > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-subtotal > div:nth-of-type(2) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-footer-buttons > a[href*="/cart"].bdt-button.bdt-button-view-cart > .bdt-button-text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.tax-total > td`))).not.toHaveCount(0);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  });

  test('14 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 10 - Variable product page
    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`div[data-ep-wrapper-link*="store"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    await page.locator(`a[href="/product-category/software"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.swiper-carousel`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-variable.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`.variations select:nth-of-type(1) > option[selected]`).or(page.locator(`h1.product_title`)).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="license-type"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#license-type`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#license-type > option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-Price-amount > bdi`)).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#license-type') }, vars)) {
      vars.licenseType = ((await page.locator(`#license-type`).textContent()) ?? '').trim();
    }
    // ↑ end 10 - Variable product page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`)).not.toHaveCount(0);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation')

return !element }, vars)) {
      await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(3) > .elementor-element.elementor-align-center.wc-cart-icon--yes.wc-cart-icon--cart-medium.wc-cart-badge--yes.elementor-widget.elementor-widget-global.elementor-widget-bdt-wc-mini-cart > .elementor-widget-container > .bdt-mini-cart-wrapper > a[href="#"].bdt-offcanvas-button.bdt-mini-cart-button > .bdt-mini-cart-inner > .bdt-mini-cart-button-icon > .bdt-cart-icon > i.ep-icon-cart`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > .bdt-mini-cart-products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents > .bdt-mini-cart-product-item.cart_item.bundle_table_item > div:nth-of-type(2) > .bdt-mini-cart-product-name > a[href*="/product/3dexperience-solidworks-standard?attribute_license-type=Term+1-Year%3A+3DX+SOLIDWORKS+Standard"]`).first()).toContainText(`${vars.licenseType ?? ''}`);
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > .bdt-mini-cart-products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents > .bdt-mini-cart-product-item.cart_item.bundle_table_item > div:nth-of-type(2) > .bdt-mini-cart-product-price > .quantity > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-subtotal > div:nth-of-type(2) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-footer-buttons > a[href*="/checkout"].bdt-button.bdt-button-checkout`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.licenseType ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.tax-total > td`))).not.toHaveCount(0);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  });

  test('15 - Checkout page - required fields', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 10 - Variable product page
    await page.locator(`a[href="/store"] > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`div[data-ep-wrapper-link*="store"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await acceptCookies(page, vars);
    await page.locator(`a[href="/product-category/software"].ep-menu-nav-link`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.swiper-carousel`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await page.locator(`li.product-type-variable.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`.variations select:nth-of-type(1) > option[selected]`).or(page.locator(`h1.product_title`)).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="license-type"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#license-type`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#license-type > option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-Price-amount > bdi`)).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#license-type') }, vars)) {
      vars.licenseType = ((await page.locator(`#license-type`).textContent()) ?? '').trim();
    }
    // ↑ end 10 - Variable product page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation')

return !element }, vars)) {
      await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(3) > .elementor-element.elementor-align-center.wc-cart-icon--yes.wc-cart-icon--cart-medium.wc-cart-badge--yes.elementor-widget.elementor-widget-global.elementor-widget-bdt-wc-mini-cart > .elementor-widget-container > .bdt-mini-cart-wrapper > a[href="#"].bdt-offcanvas-button.bdt-mini-cart-button > .bdt-mini-cart-inner > .bdt-mini-cart-button-icon > .bdt-cart-icon > i.ep-icon-cart`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.bdt-offcanvas-bar.bdt-text-left.bdt-offcanvas-bar-animation > .widget_shopping_cart_content > div:nth-of-type(2) > .bdt-mini-cart-footer-buttons > a[href*="/checkout"].bdt-button.bdt-button-checkout`).filter({ visible: true }).first().click({ force: true });
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Billing First name is a required field.
Billing Last name is a required field.
Billing Company name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing Postcode / ZIP is a required field.
Billing Phone is a required field.
Billing Email address is a required field.`);
  });

  test('16 - Register, and My Account Links', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`Your account with Hawk Ridge Systems is using a temporary password. We emailed you a link to change your password.`);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/my-account/downloads"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-column1 > address`).first()).toContainText(`You have not set up this type of address yet.`);
    await expect(page.locator(`.u-column2 > address`).first()).toContainText(`You have not set up this type of address yet.`);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Account Details")]`).or(page.locator(`a[href*="/my-account/edit-account"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content-wrapper`)).not.toHaveCount(0);
    await expect(page.locator(`form.woocommerce-EditAccountForm > p:nth-of-type(5)`)).not.toHaveCount(0);
    await logout(page, vars);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Your Hawk Ridge Systems account has been created')]`).or(page.locator(`a`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Click here to set your new password.')]`).or(page.locator(`div > p:nth-of-type(2) > span > a`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    await logout(page, vars);
    await login(page, vars);
  });

});
