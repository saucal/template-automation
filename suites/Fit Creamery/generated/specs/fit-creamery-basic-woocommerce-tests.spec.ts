// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Fit Creamery - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { fillCC } from '../helpers/fit-creamery-common-steps';

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

test.describe('Fit Creamery - Basic WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`a[href*="/pick-your-flavor/"].elementor-element > .e-con-inner > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > span`).first()).toContainText(`PICK YOUR FLAVOR`);
    await page.locator(`.elementor-element.e-con-boxed.e-con.e-parent.elementor-sticky.elementor-section--handles-inside > .e-con-inner > .elementor-element.elementor-element-ee0d55e.e-con-full.e-con.e-child > .elementor-element.elementor-align-right.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#menu-slide-in"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > span.elementor-button-text`).or(page.locator(`xpath=//span[contains(text(),'MENU')]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-custom.menu-item-object-custom.current-menu-item.current_page_item.menu-item-home:nth-of-type(8) > a[href*="#faq"].elementor-item.elementor-item-anchor`).first()).toContainText(`FAQs`);
    await expect(page.locator(`#faq`)).not.toHaveCount(0);
    await expect(page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-custom.menu-item-object-custom.current-menu-item.current_page_item.menu-item-home:nth-of-type(7) > a[href*="#bonuses"].elementor-item.elementor-item-anchor`).first()).toContainText(`Bonuses`);
    await expect(page.locator(`#bonuses`)).not.toHaveCount(0);
    await expect(page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-custom.menu-item-object-custom.current-menu-item.current_page_item.menu-item-home:nth-of-type(6) > a[href*="#nutrition"].elementor-item.elementor-item-anchor`).first()).toContainText(`Nutrition Facts`);
    await expect(page.locator(`#nutrition`)).not.toHaveCount(0);
    await expect(page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-custom.menu-item-object-custom.current-menu-item.current_page_item.menu-item-home:nth-of-type(4) > a[href*="#compare"].elementor-item.elementor-item-anchor`).first()).toContainText(`Us vs. Them`);
    await expect(page.locator(`#compare`)).not.toHaveCount(0);
    await expect(page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-custom.menu-item-object-custom.current-menu-item.current_page_item.menu-item-home:nth-of-type(3) > a[href*="#benefits"].elementor-item.elementor-item-anchor`).first()).toContainText(`Benefits`);
    await expect(page.locator(`#benefits`)).not.toHaveCount(0);
    try {
      await page.locator(`#elementor-popup-modal-1571 > div > a > svg`).or(page.locator(`#elementor-popup-modal-2135 > div > a > svg`)).or(page.locator(`.elementor-popup-modal > div > a > svg`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`svg.e-eicon-close.eicon-close`).or(page.locator(`#elementor-popup-modal-1973 > div > a > svg`)).filter({ visible: true }).first().click({ force: true });
  });

  test('02 - Shop now page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.elementor-element.e-con-boxed.e-con.e-parent.elementor-sticky.elementor-section--handles-inside > .e-con-inner > .elementor-element.elementor-element-ee0d55e.e-con-full.e-con.e-child > .elementor-element.elementor-align-right.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#menu-slide-in"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > span.elementor-button-text`).or(page.locator(`xpath=//span[contains(text(),'MENU')]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href*="/pick-your-flavor/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    await expect(page.locator(`#pick-flavor > .e-con-inner > .elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > p > span`).first()).toContainText(`STEP 1:`);
    await expect(page.locator(`#choose-package > .e-con-inner > .elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > p > span`).first()).toContainText(`STEP 2:`);
  });

  test('03 - My Story page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.elementor-element.e-con-boxed.e-con.e-parent.elementor-sticky.elementor-section--handles-inside > .e-con-inner > .elementor-element.elementor-element-ee0d55e.e-con-full.e-con.e-child > .elementor-element.elementor-align-right.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#menu-slide-in"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > span.elementor-button-text`).or(page.locator(`xpath=//span[contains(text(),'MENU')]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/story/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`video.elementor-video`)).not.toHaveCount(0);
  });

  test('04 - How to make page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.elementor-element.e-con-boxed.e-con.e-parent.elementor-sticky.elementor-section--handles-inside > .e-con-inner > .elementor-element.elementor-element-ee0d55e.e-con-full.e-con.e-child > .elementor-element.elementor-align-right.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#menu-slide-in"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > span.elementor-button-text`).or(page.locator(`xpath=//span[contains(text(),'MENU')]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(5) > a[href*="/start/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`iframe[src*="player.vimeo.com"]`).first().contentFrame().locator(`#player`)).not.toHaveCount(0);
    await page.locator(`.elementor-popup-modal > div > a > svg`).filter({ visible: true }).first().click({ force: true });
  });

  test('05 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Shop now page
    await page.locator(`.elementor-element.e-con-boxed.e-con.e-parent.elementor-sticky.elementor-section--handles-inside > .e-con-inner > .elementor-element.elementor-element-ee0d55e.e-con-full.e-con.e-child > .elementor-element.elementor-align-right.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#menu-slide-in"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > span.elementor-button-text`).or(page.locator(`xpath=//span[contains(text(),'MENU')]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href*="/pick-your-flavor/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    await expect(page.locator(`#pick-flavor > .e-con-inner > .elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > p > span`).first()).toContainText(`STEP 1:`);
    await expect(page.locator(`#choose-package > .e-con-inner > .elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > p > span`).first()).toContainText(`STEP 2:`);
    // ↑ end 02 - Shop now page
    await page.locator(`.elementor-element.elementor-element-35c5ef0f > .elementor-widget-container > p`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/step/checkout?wcf-add-to-cart=1656&wcf-qty=1"] > .label > span:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    try {
      {
        const _lbl = page.locator(`label[for="fc-no-thanks-btn"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#fc-no-thanks-btn`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await expect(page.locator(`label[for="shipping_method_0_flexible_shipping_single37"] > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    await expect(page.locator(`.wcf-bump-order-wrap.wcf-bump-order-c5d`)).not.toHaveCount(0);
    await page.locator(`.wcf-bump-order-wrap.wcf-bump-order-c5d > .wcf-bump-order-content.wcf-bump-order-image-left > .wcf-bump-order-field-wrap > .wcf-bump-order-action > .wcf-bump-order-cb-button.wcf-bump-add-to-cart`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Add")]`).or(page.locator(`.wcf-bump-order-cb-button.wcf-bump-add-to-cart`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`label[for="shipping_method_0_free_shipping36"]`).first()).toContainText(`Free shipping (3-8 days)`);
    try {
      await page.locator(`svg.e-eicon-close > use`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
  });

  test('06 - Checkout page - required fields', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Shop now page
    await page.locator(`.elementor-element.e-con-boxed.e-con.e-parent.elementor-sticky.elementor-section--handles-inside > .e-con-inner > .elementor-element.elementor-element-ee0d55e.e-con-full.e-con.e-child > .elementor-element.elementor-align-right.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#menu-slide-in"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > span.elementor-button-text`).or(page.locator(`xpath=//span[contains(text(),'MENU')]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu.sm-vertical > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href*="/pick-your-flavor/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
    await expect(page.locator(`#pick-flavor > .e-con-inner > .elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > p > span`).first()).toContainText(`STEP 1:`);
    await expect(page.locator(`#choose-package > .e-con-inner > .elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container > p > span`).first()).toContainText(`STEP 2:`);
    // ↑ end 02 - Shop now page
    await page.locator(`.elementor-element.elementor-element-35c5ef0f > .elementor-widget-container > p`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/step/checkout?wcf-add-to-cart=1656&wcf-qty=1"] > .label > span:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    try {
      {
        const _lbl = page.locator(`label[for="fc-no-thanks-btn"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#fc-no-thanks-btn`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Billing Email address is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Billing Phone is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP Code is a required field.`);
  });

});
