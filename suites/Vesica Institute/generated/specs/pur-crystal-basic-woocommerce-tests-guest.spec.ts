// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Pur Crystal - Basic WooCommerce Tests - Guest"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';

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

test.describe('Pur Crystal - Basic WooCommerce Tests - Guest', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "qty": "2",
    "Symbol": "$",
    "currency": "USD",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
  });

  test('02 - Crystals Minerals page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.locator(`a[href="/crystals-minerals/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).first().hover();
    await page.locator(`a[href="/crystals-minerals/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Category page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.locator(`div[aria-label="Shop"] > a[href*="/crystals-minerals/"].jet-mega-menu-item__link.jet-mega-menu-item__link--top-level > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).first().hover();
    await page.locator(`xpath=//a[contains(text(), "Form")]`).or(page.locator(`p > a[href="/crystals-minerals/find-my-stone/shop-by-form/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - Mineral page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.locator(`a[href="/crystals-minerals/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).first().hover();
    await page.locator(`xpath=//a[contains(text(), "Meteorite")]`).or(page.locator(`a[href="/crystals-minerals/meteorite/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - Articles page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/blog/category/articles/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('06 - Article page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Articles page
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/blog/category/articles/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 05 - Articles page
    await page.locator(`a[href*="/blog/articles/"] > .elementor-button-content-wrapper > .elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('07 - Contact page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/contact/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('08 - Submited Contact page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 07 - Contact page
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/contact/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 07 - Contact page
    try { await page.locator(`#form-field-name`).first().fill(`QA`); } catch { await page.locator(`#form-field-name`).first().selectOption(`QA`); }
    try { await page.locator(`#form-field-email`).first().fill(`qa+gi_form${vars.alphanumeric ?? ''}@saucal.com`); } catch { await page.locator(`#form-field-email`).first().selectOption(`qa+gi_form${vars.alphanumeric ?? ''}@saucal.com`); }
    try { await page.locator(`#form-field-message`).first().fill(`Testing message`); } catch { await page.locator(`#form-field-message`).first().selectOption(`Testing message`); }
    {
      const _lbl = page.locator(`label[for="send"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#send`).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await page.waitForTimeout(9000);
    await expect(page.locator(`.elementor-column.elementor-top-column.elementor-element.elementor-element-e47efd9 > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
  });

  test('09 - Simple Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.goto(`${vars.site ?? ''}crystals-minerals/meteorite/`);
    await page.waitForLoadState('load');
    await page.locator(`li.instock.product-type-simple > a[href*='/shop/crystals-minerals/meteorite']`).or(page.locator(`li.instock.product-type-simple > a.woocommerce-loop-product__link`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('10 - Variable Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.goto(`${vars.site ?? ''}crystals-minerals/meteorite/`);
    await page.waitForLoadState('load');
    await page.locator(`li.instock.product-type-variable > a[href*='/shop/crystals-minerals/meteorite']`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('11 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.goto(`${vars.site ?? ''}crystals-minerals/meteorite/`);
    await page.waitForLoadState('load');
    await page.locator(`li.instock.product-type-simple > a[href*='/shop/crystals-minerals/meteorite']`).or(page.locator(`li.instock.product-type-simple > a.woocommerce-loop-product__link`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.elementor-widget-container > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`input[name="quantity"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/cart/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`table.shop_table > tbody > tr.woocommerce-cart-form__cart-item.cart_item > .product-name > a[href*="/shop/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  });

  test('12 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 11 - Cart page
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.goto(`${vars.site ?? ''}crystals-minerals/meteorite/`);
    await page.waitForLoadState('load');
    await page.locator(`li.instock.product-type-simple > a[href*='/shop/crystals-minerals/meteorite']`).or(page.locator(`li.instock.product-type-simple > a.woocommerce-loop-product__link`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.elementor-widget-container > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`input[name="quantity"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/cart/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`table.shop_table > tbody > tr.woocommerce-cart-form__cart-item.cart_item > .product-name > a[href*="/shop/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    // ↑ end 11 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table > tbody > tr > td.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''}  × ${vars.qty ?? ''}`);
  });

  test('13 - Featured in Minerals & Crystals for Times of Stress Course page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Crystals Minerals page
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    // ↑ end 01 - Home Page
    await page.locator(`a[href="/crystals-minerals/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).first().hover();
    await page.locator(`a[href="/crystals-minerals/"] > .jet-mega-menu-item__title > .jet-mega-menu-item__label`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Crystals Minerals page
    await page.locator(`a[href*="/crystals-minerals/featured-in-minerals-crystals-for-times-of-stress-course/"] > img.entered.lazyloaded`).filter({ visible: true }).first().click({ force: true });
  });

});
