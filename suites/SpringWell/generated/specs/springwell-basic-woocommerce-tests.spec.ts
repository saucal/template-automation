// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "SpringWell - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { scrollFullPage } from '../helpers/common-steps-for-all-projects';
import { closePopup, closePrivacyPopup, exitTest, extractUserFromEmail, fillCC, logout, register } from '../helpers/springwell-common-steps';

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

test.describe('SpringWell - Basic WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "springwell",
    "password": process.env.PASSWORD ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "phone": "(324) 432-6546",
    "password2": process.env.PASSWORD2 ?? '',
    "prodUrl": "https://www.springwellwater.com/",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await scrollFullPage(page, vars);
    await closePrivacyPopup(page, vars);
    await closePopup(page, vars);
  });

  test('01-A - Header', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await scrollFullPage(page, vars);
    await closePrivacyPopup(page, vars);
    await closePopup(page, vars);
  });

  test('01-B - Footer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await scrollFullPage(page, vars);
    await closePrivacyPopup(page, vars);
    await closePopup(page, vars);
    await expect(page.locator(`#custom_html-8 > h3`).first()).toHaveText(`Follow Us`);
    await expect(page.locator(`.sw-social-icons`)).not.toHaveCount(0);
  });

  test('02 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(4) > a[href*="/shop"]`).or(page.locator(`xpath=//a[contains(text(),'All Products')]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce.columns-3`)).not.toHaveCount(0);
    await page.locator(`a[href*="/shop/page/3/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce.columns-3`)).not.toHaveCount(0);
    await expect(page.locator(`.page-numbers.current`).first()).toContainText(`3`);
    await expect(page.locator(`.woof_container.woof_container_checkbox.woof_container_pa_water-type.woof_container_2`)).not.toHaveCount(0);
    await expect(page.locator(`.woof_container.woof_container_checkbox.woof_container_product_cat.woof_container_3 > .woof_container_inner.woof_container_inner_producttype > .woof_block_html_items > .woof_list.woof_list_checkbox > .woof_term_19`)).not.toHaveCount(0);
    await expect(page.locator(`.woof_container.woof_container_checkbox.woof_container_product_cat.woof_container_3 > .woof_container_inner.woof_container_inner_producttype`)).not.toHaveCount(0);
    await expect(page.locator(`div.widget.widget-woof > div.woof.woof_sid.woof_sid_widget`).or(page.locator(`body > div.elementor.product > section:nth-of-type(2).elementor-section.elementor-top-section.elementor-element > div > div:nth-of-type(1) > div > div > div > div > div`))).not.toHaveCount(0);
  });

  test('03 - Category page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*='/product-category/']`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#menu-product-categories`)).not.toHaveCount(0);
    await expect(page.locator(`.textwidget > .woof > .woof_redraw_zone > .woof_container.woof_container_checkbox.woof_container_pa_water-type.woof_container_2.woof_container_watertype`)).not.toHaveCount(0);
    await expect(page.locator(`.textwidget > .woof > .woof_redraw_zone > .woof_container.woof_container_checkbox.woof_container_pa_contaminants.woof_container_4.woof_container_contaminantsreduced`)).not.toHaveCount(0);
  });

  test('04 - About page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children:nth-of-type(5) > a[href*="/about/"][title="About Us"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`iframe[src*="www.youtube.com"]`).first().contentFrame().locator(`#movie_player`)).not.toHaveCount(0);
  });

  test('05 - Customer reviews page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children:nth-of-type(5) > a[href*="/about/"][title="About Us"]`).or(page.locator(`xpath=//ul[@id='menu-mainmenu']/li[@id="menu-item-399"]/a[contains(text(),'About')]`)).first().hover();
    await page.locator(`div.container.main-menu > ul#menu-mainmenu > li > ul.sub-menu > li > a[href*="/reviews/"]`).or(page.locator(`xpath=//a[contains(text(),'Customer Reviews')]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.yotpo-bottomline`)).not.toHaveCount(0);
    await expect(page.locator(`#yotpo-testimonials-product-reviews > div.yotpo-review.yotpo-regular-box`).first()).toBeVisible();
  });

  test('06-A - Contact page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children:nth-of-type(7) > a[href*="/contact"][title="Contact Us"]`).filter({ visible: true }).first().click({ force: true });
  });

  test('06-B - Submit Contact', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children:nth-of-type(7) > a[href*="/contact"][title="Contact Us"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#input_4_7`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#input_4_7`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#input_4_8`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#input_4_8`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#input_4_2`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#input_4_2`).first().selectOption(`${vars.email ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="input_4_3"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_4_3`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_4_3`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#input_4_3`).first().selectOption(`${vars.phone ?? ''}`); }
    try { await page.locator(`#input_4_4`).first().fill(`Testing request contact`); } catch { await page.locator(`#input_4_4`).first().selectOption(`Testing request contact`); }
    {
      const _lbl = page.locator(`label[for="choice_4_5_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#choice_4_5_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="input_4_10"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_4_10`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_4_10`).first().fill(`blue`); } catch { await page.locator(`#input_4_10`).first().selectOption(`blue`); }
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    {
      const _lbl = page.locator(`label[for="gform_submit_button_4"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_4`).filter({ visible: true }).first().click({ force: true }); }
    }
    try {
      await expect(page.locator(`#gform_ajax_spinner_4`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`#gform_ajax_spinner_4`)).toHaveCount(0);
    } catch { /* optional step: assertElementNotPresent */ }
    await expect(page.locator(`h4 > span`).first()).toContainText(`Thank you so much for contacting us.`);
  });

  test('07 - Simple Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > .menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.menu-item-has-children > a[href*="/product-category/replacements/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//label[contains(text(),'RO Replacement Filters')]`).or(page.locator(`div.widget_text.springwell-chw-widget input[id*='woof_38_']`)).filter({ visible: true }).first().click({ force: true });
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href.includes('/product-category/replacements/ro-replacement-filters/') }, vars)).toBeTruthy();
    await page.locator(`li.product-type-simple.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-').trim()

return prod_desc }, vars);
    vars.unitPrice = ((await page.locator(`.product-details__content > .list-unstyled.price-box > li:nth-of-type(2) > strong.color-green`).textContent()) ?? '').trim();
    await expect(page.locator(`.wcsatt-options-wrapper`)).not.toHaveCount(0);
  });

  test('08 - Variable Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > .menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.menu-item-has-children > a[href*="/product-category/replacements/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.instock.product-type-variable`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    if (false) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-').trim()

return prod_desc }, vars);
    }
    vars.unitPrice = ((await page.locator(`form > div.single_variation_wrap > div > div.woocommerce-variation-price > span > .list-unstyled.price-box > li:nth-of-type(2) > strong.color-green`).textContent()) ?? '').trim();
    await expect(page.locator(`.wcsatt-options-wrapper`)).not.toHaveCount(0);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pack-size')

return element !== null && element !== undefined }, vars)) {
      vars.variable1 = ((await page.locator(`#pack-size`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#filter-lid-color')

return element !== null && element !== undefined }, vars)) {
      vars.variable2 = ((await page.locator(`#filter-lid-color`).textContent()) ?? '').trim();
    }
  });

  test('08 - Variable Product page - 2', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "SHOP WATER FILTRATION")]`).or(page.locator(`.offer-one__single > a[href="/product/water-filters/whole-house-water-filters/"]`)).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    if (false) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-').trim()

return prod_desc }, vars);
    }
    vars.unitPrice = ((await page.locator(`form > div.single_variation_wrap > div > div.woocommerce-variation-price > span > .list-unstyled.price-box > li:nth-of-type(2) > strong.color-green`).textContent()) ?? '').trim();
    try {
      await expect(page.locator(`.wcsatt-options-wrapper`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pack-size')

return element !== null && element !== undefined }, vars)) {
      vars.variable1 = ((await page.locator(`#pack-size`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#filter-lid-color')

return element !== null && element !== undefined }, vars)) {
      vars.variable2 = ((await page.locator(`#filter-lid-color`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#number-of-bathrooms')

return element !== null && element !== undefined }, vars)) {
      vars.variable3 = ((await page.locator(`#number-of-bathrooms`).textContent()) ?? '').trim();
    }
    await expect(page.locator(`.more_product_options`)).not.toHaveCount(0);
    await page.screenshot({ fullPage: true });
    await expect(page.locator(`.slick-list.draggable`)).not.toHaveCount(0);
    await page.screenshot({ fullPage: true });
    await closePopup(page, vars);
  });

  test('09 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 07 - Simple Product page
    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > .menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.menu-item-has-children > a[href*="/product-category/replacements/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//label[contains(text(),'RO Replacement Filters')]`).or(page.locator(`div.widget_text.springwell-chw-widget input[id*='woof_38_']`)).filter({ visible: true }).first().click({ force: true });
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href.includes('/product-category/replacements/ro-replacement-filters/') }, vars)).toBeTruthy();
    await page.locator(`li.product-type-simple.instock`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-').trim()

return prod_desc }, vars);
    vars.unitPrice = ((await page.locator(`.product-details__content > .list-unstyled.price-box > li:nth-of-type(2) > strong.color-green`).textContent()) ?? '').trim();
    await expect(page.locator(`.wcsatt-options-wrapper`)).not.toHaveCount(0);
    // ↑ end 07 - Simple Product page
    await page.locator(`xpath=//button[contains(text(), "Buy Now")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name > a[href*="/product/replacements/ro-replacement-filter-carbon-block/?convert_to_sub_952=0"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  });

  test('10 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 08 - Variable Product page
    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > .menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.menu-item-has-children > a[href*="/product-category/replacements/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.instock.product-type-variable`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    if (false) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-').trim()

return prod_desc }, vars);
    }
    vars.unitPrice = ((await page.locator(`form > div.single_variation_wrap > div > div.woocommerce-variation-price > span > .list-unstyled.price-box > li:nth-of-type(2) > strong.color-green`).textContent()) ?? '').trim();
    await expect(page.locator(`.wcsatt-options-wrapper`)).not.toHaveCount(0);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pack-size')

return element !== null && element !== undefined }, vars)) {
      vars.variable1 = ((await page.locator(`#pack-size`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#filter-lid-color')

return element !== null && element !== undefined }, vars)) {
      vars.variable2 = ((await page.locator(`#filter-lid-color`).textContent()) ?? '').trim();
    }
    // ↑ end 08 - Variable Product page
    await page.locator(`xpath=//button[contains(text(), "Buy Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}  × 1
Pack Size:

${vars.variable1 ?? ''}

Filter Lid Color:

${vars.variable2 ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  });

  test('10 - Checkout page - required fields', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 08 - Variable Product page
    await page.locator(`.container > [id="menu-mainmenu"].main-navigation__list.main-menu__list > .menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.menu-item-has-children > a[href*="/product-category/replacements/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.instock.product-type-variable`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    if (false) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-').trim()

return prod_desc }, vars);
    }
    vars.unitPrice = ((await page.locator(`form > div.single_variation_wrap > div > div.woocommerce-variation-price > span > .list-unstyled.price-box > li:nth-of-type(2) > strong.color-green`).textContent()) ?? '').trim();
    await expect(page.locator(`.wcsatt-options-wrapper`)).not.toHaveCount(0);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pack-size')

return element !== null && element !== undefined }, vars)) {
      vars.variable1 = ((await page.locator(`#pack-size`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#filter-lid-color')

return element !== null && element !== undefined }, vars)) {
      vars.variable2 = ((await page.locator(`#filter-lid-color`).textContent()) ?? '').trim();
    }
    // ↑ end 08 - Variable Product page
    await page.locator(`xpath=//button[contains(text(), "Buy Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await fillCC(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Please read and accept the terms and conditions to proceed with your order.`);
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Billing First name is a required field.
Billing Last name is a required field.
Billing Country / Region is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP Code is a required field.
Billing Phone is a required field.
Billing Email address is a required field.`);
  });

  test('11 - Register, Login and My Account links', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    await register(page, vars);
    await page.locator(`xpath=//span[contains(text(), "My Orders")]`).or(page.locator(`a[href*="/account/orders/"] > .item-label`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//span[contains(text(), "My Subscription")]`).or(page.locator(`a[href*="/account/my-subscriptions/"] > .item-label`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.no_subscriptions`)).not.toHaveCount(0);
    await page.locator(`xpath=//span[contains(text(), "Edit Address")]`).or(page.locator(`a[href*="/account/edit-address/"] > .item-label`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-column1`)).not.toHaveCount(0);
    await expect(page.locator(`.u-column2`)).not.toHaveCount(0);
    await page.locator(`xpath=//span[contains(text(), "Edit Account")]`).or(page.locator(`a[href*="/account/edit-account/"] > .item-label`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`xpath=//span[contains(text(), "Payment Methods")]`).or(page.locator(`a[href*="/account/payment-methods/"] > .item-label`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//span[contains(text(), "Customer Support")]`).or(page.locator(`a[href*="/account/support/"] > .item-label`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(1)`)).not.toHaveCount(0);
    await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(4)`).first()).toContainText(`Note: Support available Mon-Fri 9AM-6PM EST`);
    await logout(page, vars);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Your SpringWell Water Filtration Systems account has been created!')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Click here to set your new password.')]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
  });

  test('12 - Forgot Password flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    vars.email = `${vars.emailReg ?? ''}`;
    await register(page, vars);
    await logout(page, vars);
    await page.locator(`.account-dropdown > a[href*="/account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Password Reset Request')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Click here to reset your password')]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    vars.password = `${vars.password2 ?? ''}`;
  });

  test('13 - Replace Made easy page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}filters-made-easy/`);
    await page.waitForLoadState('load');
    await closePopup(page, vars);
    await closePrivacyPopup(page, vars);
    await expect(page.locator(`.elementor-filter-tabs`)).not.toHaveCount(0);
    await expect(page.locator(`.elementor-filter-tabs-wrapper > div.elementor-filter-tab-title:nth-of-type(1)`)).not.toHaveCount(0);
    await expect(page.locator(`.elementor-filter-tabs-content-wrapper`)).not.toHaveCount(0);
    await expect(page.locator(`div.elementor-filter-tab-content:nth-of-type(1) > .filter-tabs-wc-block.woocommerce > .products.columns-3 > li.product.type-product.sw-custom-product:nth-of-type(1)`)).not.toHaveCount(0);
  });

  test('14 - Request a Call page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}schedule-a-call/`);
    await page.waitForLoadState('load');
    await expect(page.locator(`#gform_fields_11`)).not.toHaveCount(0);
    await expect(page.locator(`#gform_submit_button_11`).first()).toContainText(`Submit`);
  });

  test('15 - Compare products page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}whole-house-carbon-filter-vs-cartridge-filter-compared/`);
    await page.waitForLoadState('load');
    await closePopup(page, vars);
    await closePrivacyPopup(page, vars);
  });

});
