// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Elka - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { login } from '../helpers/elka-common-steps-for-suite';

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

test.describe('Elka - Basic WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "password2": process.env.PASSWORD2 ?? '',
    "phone": "3453456655",
    "project": "elka",
    "stateComplete": "Florida",
    "country": "US",
    "email": "qa+gi_staging_user@saucal.com",
    "countryComplete": "United States (US)",
    "Symbol": "$",
    "company": "Testing Inc.",
    "street": "6700 NW 12TH ST",
    "city": "MIAMI",
    "state": "FL",
    "zipCode": "33126",
    "password": process.env.PASSWORD ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`.menu-item.wpml-ls-item > a.wpml-ls-link  .wpml-ls-native[lang="en"]`).first()).toBeVisible();
    await expect(page.locator(`.menu-item.wpml-ls-item > a.wpml-ls-link  .wpml-ls-native[lang="fr"]`)).not.toHaveCount(0);
    await expect(page.locator(`#menu-elka-main-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.fusion-dropdown-menu:nth-of-type(1) > a[href="#"] > .menu-text`).first()).toHaveText(`Products`);
    await expect(page.locator(`#menu-elka-main-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.fusion-dropdown-menu:nth-of-type(2) > a[href="#"] > .menu-text`).first()).toHaveText(`Support`);
    await expect(page.locator(`#menu-elka-main-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.fusion-dropdown-menu:nth-of-type(3) > a[href="#"] > .menu-text`).first()).toHaveText(`Dealers`);
    await expect(page.locator(`#menu-elka-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(4) > a[href*="/news"] > .menu-text`).first()).toHaveText(`News`);
    await expect(page.locator(`#menu-elka-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(5) > a[href*="/shop"] > .menu-text`).first()).toHaveText(`Shop`);
    await expect(page.locator(`#menu-elka-main-menu > .fusion-custom-menu-item.fusion-menu-cart.fusion-main-menu-cart.fusion-widget-cart-counter > a[href*="/shop/cart/"].fusion-main-menu-icon`).first()).toBeVisible();
    try {
      await page.locator(`.menu-item.wpml-ls-item > a[href*="/fr/"][title*="Français"].wpml-ls-link > span > .wpml-ls-native`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`#menu-item-wpml-ls-42792-fr > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.menu-item.wpml-ls-item > a.wpml-ls-link  .wpml-ls-native[lang="fr"]`).first()).toHaveText(`Français`);
    await expect(page.locator(`.menu-item.wpml-ls-item > a.wpml-ls-link  .wpml-ls-native[lang="en"]`).first()).toHaveText(`English`);
    await expect(page.locator(`#menu-menu-principal-elka > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.fusion-dropdown-menu:nth-of-type(1) > a[href="#"] > .menu-text`).first()).toHaveText(`Produits`);
    await expect(page.locator(`#menu-menu-principal-elka > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.fusion-dropdown-menu:nth-of-type(2) > a[href="#"] > .menu-text`).first()).toHaveText(`Support`);
    await expect(page.locator(`#menu-menu-principal-elka > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.fusion-dropdown-menu:nth-of-type(3) > a[href="#"] > .menu-text`).first()).toHaveText(`Revendeurs`);
    await expect(page.locator(`#menu-menu-principal-elka > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(4) > a[href*="/fr/nouvelles/"] > .menu-text`).first()).toHaveText(`Nouvelles`);
    await expect(page.locator(`#menu-menu-principal-elka > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(5) > a[href*="/fr/boutique/"] > .menu-text`).first()).toHaveText(`Boutique`);
    await page.locator(`.menu-item.wpml-ls-item > a[title*="English"].wpml-ls-link`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.menu-item.wpml-ls-item > a.wpml-ls-link  .wpml-ls-native[lang="en"]`).first()).toHaveText(`English`);
  });

  test('02 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#menu-item-344367 > a > span.menu-text`).first().hover();
    await page.locator(`#menu-item-344370 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Shop page
    await page.waitForLoadState('load');
    await page.locator(`#menu-item-344367 > a > span.menu-text`).first().hover();
    await page.locator(`#menu-item-344370 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`a[href*="/utv/stage-3/"] > .fusion-column-inner-bg-image`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.fusion-button-text.fusion-button-text-right`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(1).product.type-product > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 03 - Product page
    // ↓ 02 - Shop page
    await page.waitForLoadState('load');
    await page.locator(`#menu-item-344367 > a > span.menu-text`).first().hover();
    await page.locator(`#menu-item-344370 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`a[href*="/utv/stage-3/"] > .fusion-column-inner-bg-image`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.fusion-button-text.fusion-button-text-right`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(1).product.type-product > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    vars.prod_year = `2018`;
    try { await page.locator(`#input_11_15`).first().fill(`${vars.prod_year ?? ''}`); } catch { await page.locator(`#input_11_15`).first().selectOption(`${vars.prod_year ?? ''}`); }
    vars.weight = `43kg`;
    try { await page.locator(`#input_11_4`).first().fill(`${vars.weight ?? ''}`); } catch { await page.locator(`#input_11_4`).first().selectOption(`${vars.weight ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="choice_11_13_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#choice_11_13_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.weight2 = `12kg`;
    vars.prod_desc = ((await page.locator(`.fusion-title > h2.fusion-responsive-typography-calculated`).textContent()) ?? '').trim();
    try { await page.locator(`#input_11_11`).first().fill(`${vars.weight2 ?? ''}`); } catch { await page.locator(`#input_11_11`).first().selectOption(`${vars.weight2 ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="input_11_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_1`).first().fill(`Stock Geometry`); } catch { await page.locator(`#input_11_1`).first().selectOption(`Stock Geometry`); }
    // TODO: command="dragAndDrop" target="#input_11_1" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_5"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_5`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_5`).first().fill(`MX Racing`); } catch { await page.locator(`#input_11_5`).first().selectOption(`MX Racing`); }
    // TODO: command="dragAndDrop" target="#input_11_5" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_9"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_9`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_9`).first().fill(`Stock Tires`); } catch { await page.locator(`#input_11_9`).first().selectOption(`Stock Tires`); }
    // TODO: command="dragAndDrop" target="#input_11_9" value=".fusion-header > .fusion-row"
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    vars.option1 = ((await page.locator(`#label_11_12_0`).textContent()) ?? '').trim();
    vars.option2 = ((await page.locator(`#label_11_13_1`).textContent()) ?? '').trim();
    vars.option3 = ((await page.locator(`#input_11_1`).textContent()) ?? '').trim();
    vars.option4 = ((await page.locator(`#input_11_5`).textContent()) ?? '').trim();
    vars.option5 = ((await page.locator(`#input_11_9`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="gform_submit_button_11"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_11`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/shop/cart/?c=72e1ba2726d6"].button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"].product-title`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.variation-Model-yearofyourUTV > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`dd.variation-RiderWeight > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`dd.variation-Howmanypassengers > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`dd.variation-Doyoucarryadditionalpayload > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`dd.variation-Weightofyouradditionalpayload > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`dd.variation-Geometry > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`dd.variation-Primarytypeofriding > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`dd.variation-Tires > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
  });

  test('05 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    // ↓ 04 - Cart page
    // ↓ 03 - Product page
    // ↓ 02 - Shop page
    await page.waitForLoadState('load');
    await page.locator(`#menu-item-344367 > a > span.menu-text`).first().hover();
    await page.locator(`#menu-item-344370 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`a[href*="/utv/stage-3/"] > .fusion-column-inner-bg-image`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.fusion-button-text.fusion-button-text-right`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(1).product.type-product > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    vars.prod_year = `2018`;
    try { await page.locator(`#input_11_15`).first().fill(`${vars.prod_year ?? ''}`); } catch { await page.locator(`#input_11_15`).first().selectOption(`${vars.prod_year ?? ''}`); }
    vars.weight = `43kg`;
    try { await page.locator(`#input_11_4`).first().fill(`${vars.weight ?? ''}`); } catch { await page.locator(`#input_11_4`).first().selectOption(`${vars.weight ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="choice_11_13_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#choice_11_13_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.weight2 = `12kg`;
    vars.prod_desc = ((await page.locator(`.fusion-title > h2.fusion-responsive-typography-calculated`).textContent()) ?? '').trim();
    try { await page.locator(`#input_11_11`).first().fill(`${vars.weight2 ?? ''}`); } catch { await page.locator(`#input_11_11`).first().selectOption(`${vars.weight2 ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="input_11_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_1`).first().fill(`Stock Geometry`); } catch { await page.locator(`#input_11_1`).first().selectOption(`Stock Geometry`); }
    // TODO: command="dragAndDrop" target="#input_11_1" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_5"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_5`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_5`).first().fill(`MX Racing`); } catch { await page.locator(`#input_11_5`).first().selectOption(`MX Racing`); }
    // TODO: command="dragAndDrop" target="#input_11_5" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_9"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_9`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_9`).first().fill(`Stock Tires`); } catch { await page.locator(`#input_11_9`).first().selectOption(`Stock Tires`); }
    // TODO: command="dragAndDrop" target="#input_11_9" value=".fusion-header > .fusion-row"
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    vars.option1 = ((await page.locator(`#label_11_12_0`).textContent()) ?? '').trim();
    vars.option2 = ((await page.locator(`#label_11_13_1`).textContent()) ?? '').trim();
    vars.option3 = ((await page.locator(`#input_11_1`).textContent()) ?? '').trim();
    vars.option4 = ((await page.locator(`#input_11_5`).textContent()) ?? '').trim();
    vars.option5 = ((await page.locator(`#input_11_9`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="gform_submit_button_11"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_11`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/shop/cart/?c=72e1ba2726d6"].button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"].product-title`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.variation-Model-yearofyourUTV > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`dd.variation-RiderWeight > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`dd.variation-Howmanypassengers > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`dd.variation-Doyoucarryadditionalpayload > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`dd.variation-Weightofyouradditionalpayload > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`dd.variation-Geometry > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`dd.variation-Primarytypeofriding > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`dd.variation-Tires > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    // ↑ end 04 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/shop/checkout/"].fusion-button`)).filter({ visible: true }).first().click({ force: true });
    await wooCommerceCheckoutTemplate(page, vars);
    await expect(page.locator(`dd.variation-Model-yearofyourUTV > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`dd.variation-RiderWeight > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`dd.variation-Howmanypassengers > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`dd.variation-Doyoucarryadditionalpayload > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`dd.variation-Weightofyouradditionalpayload > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`dd.variation-Geometry > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`dd.variation-Primarytypeofriding > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`dd.variation-Tires > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    try {
      await expect(page.locator(`div .ppc-button-wrapper`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      await expect(page.locator(`iframe[src*="www.sandbox.paypal.com"]`).first().contentFrame().locator(`.paypal-powered-by`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
  });

  test('07 - My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `qa+gi_staging_user@saucal.com`;
    await login(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector('.woocommerce-MyAccount-content > p:nth-of-type(2)')

return element === null }, vars)) {
      vars.{{password}} = `${vars.password2 ?? ''}`;
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector('.woocommerce-MyAccount-content > p:nth-of-type(2)')

return element === null }, vars)) {
      await login(page, vars);
    }
    await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(2)`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h2.avada-woocommerce-myaccount-heading`).first()).toContainText(`Orders`);
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/my-account/downloads/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h2.avada-woocommerce-myaccount-heading`).first()).toContainText(`Downloads`);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h2.fusion-responsive-typography-calculated`).first()).toContainText(`Billing address`);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h2.avada-woocommerce-myaccount-heading`).first()).toContainText(`Account details`);
    await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('08 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "My account")]`).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/my-account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Password reset email has been sent.`);
    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).or(page.locator(`xpath=//a[contains(text(), "Reset your password")]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toContainText(`Your password has been reset successfully.`);
    try {
      await page.locator(`nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#password`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h2.avada-woocommerce-myaccount-heading`).first()).toContainText(`Dashboard`);
  });

  test('10- Product page CAD', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Shop page
    await page.waitForLoadState('load');
    await page.locator(`#menu-item-344367 > a > span.menu-text`).first().hover();
    await page.locator(`#menu-item-344370 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`a[href*="/utv/stage-3/"] > .fusion-column-inner-bg-image`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.fusion-button-text.fusion-button-text-right`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(1).product.type-product > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "United States (US) dollar ($) - USD")]`).or(page.locator(`a.js-wcml-dropdown-click-toggle`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Canadian dollar ($) - CAD")]`).or(page.locator(`.wcml-cs-submenu > li > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a.js-wcml-dropdown-click-toggle`).first()).toHaveText(`Canadian dollar ($) - CAD`);
    await page.waitForLoadState('load');
  });

  test('11- Cart page CAD', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 10- Product page CAD
    // ↓ 02 - Shop page
    await page.waitForLoadState('load');
    await page.locator(`#menu-item-344367 > a > span.menu-text`).first().hover();
    await page.locator(`#menu-item-344370 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`a[href*="/utv/stage-3/"] > .fusion-column-inner-bg-image`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.fusion-button-text.fusion-button-text-right`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(1).product.type-product > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "United States (US) dollar ($) - USD")]`).or(page.locator(`a.js-wcml-dropdown-click-toggle`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Canadian dollar ($) - CAD")]`).or(page.locator(`.wcml-cs-submenu > li > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a.js-wcml-dropdown-click-toggle`).first()).toHaveText(`Canadian dollar ($) - CAD`);
    await page.waitForLoadState('load');
    // ↑ end 10- Product page CAD
    vars.prod_year = `2018`;
    try { await page.locator(`#input_11_15`).first().fill(`${vars.prod_year ?? ''}`); } catch { await page.locator(`#input_11_15`).first().selectOption(`${vars.prod_year ?? ''}`); }
    vars.weight = `43kg`;
    try { await page.locator(`#input_11_4`).first().fill(`${vars.weight ?? ''}`); } catch { await page.locator(`#input_11_4`).first().selectOption(`${vars.weight ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="choice_11_13_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#choice_11_13_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.weight2 = `12kg`;
    vars.prod_desc = ((await page.locator(`.fusion-title > h2.fusion-responsive-typography-calculated`).textContent()) ?? '').trim();
    try { await page.locator(`#input_11_11`).first().fill(`${vars.weight2 ?? ''}`); } catch { await page.locator(`#input_11_11`).first().selectOption(`${vars.weight2 ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="input_11_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_1`).first().fill(`Stock Geometry`); } catch { await page.locator(`#input_11_1`).first().selectOption(`Stock Geometry`); }
    // TODO: command="dragAndDrop" target="#input_11_1" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_5"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_5`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_5`).first().fill(`MX Racing`); } catch { await page.locator(`#input_11_5`).first().selectOption(`MX Racing`); }
    // TODO: command="dragAndDrop" target="#input_11_5" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_9"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_9`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_9`).first().fill(`Stock Tires`); } catch { await page.locator(`#input_11_9`).first().selectOption(`Stock Tires`); }
    // TODO: command="dragAndDrop" target="#input_11_9" value=".fusion-header > .fusion-row"
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    vars.option1 = ((await page.locator(`#label_11_12_0`).textContent()) ?? '').trim();
    vars.option2 = ((await page.locator(`#label_11_13_1`).textContent()) ?? '').trim();
    vars.option3 = ((await page.locator(`#input_11_1`).textContent()) ?? '').trim();
    vars.option4 = ((await page.locator(`#input_11_5`).textContent()) ?? '').trim();
    vars.option5 = ((await page.locator(`#input_11_9`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="gform_submit_button_11"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_11`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/shop/cart/?c=72e1ba2726d6"].button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"].product-title`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.variation-Model-yearofyourUTV > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`dd.variation-RiderWeight > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`dd.variation-Howmanypassengers > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`dd.variation-Doyoucarryadditionalpayload > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`dd.variation-Weightofyouradditionalpayload > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`dd.variation-Geometry > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`dd.variation-Primarytypeofriding > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`dd.variation-Tires > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
  });

  test('12 - Checkout page CAD', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    // ↓ 11- Cart page CAD
    // ↓ 10- Product page CAD
    // ↓ 02 - Shop page
    await page.waitForLoadState('load');
    await page.locator(`#menu-item-344367 > a > span.menu-text`).first().hover();
    await page.locator(`#menu-item-344370 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`a[href*="/utv/stage-3/"] > .fusion-column-inner-bg-image`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.fusion-button-text.fusion-button-text-right`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(1).product.type-product > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "United States (US) dollar ($) - USD")]`).or(page.locator(`a.js-wcml-dropdown-click-toggle`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Canadian dollar ($) - CAD")]`).or(page.locator(`.wcml-cs-submenu > li > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a.js-wcml-dropdown-click-toggle`).first()).toHaveText(`Canadian dollar ($) - CAD`);
    await page.waitForLoadState('load');
    // ↑ end 10- Product page CAD
    vars.prod_year = `2018`;
    try { await page.locator(`#input_11_15`).first().fill(`${vars.prod_year ?? ''}`); } catch { await page.locator(`#input_11_15`).first().selectOption(`${vars.prod_year ?? ''}`); }
    vars.weight = `43kg`;
    try { await page.locator(`#input_11_4`).first().fill(`${vars.weight ?? ''}`); } catch { await page.locator(`#input_11_4`).first().selectOption(`${vars.weight ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="choice_11_13_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#choice_11_13_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.weight2 = `12kg`;
    vars.prod_desc = ((await page.locator(`.fusion-title > h2.fusion-responsive-typography-calculated`).textContent()) ?? '').trim();
    try { await page.locator(`#input_11_11`).first().fill(`${vars.weight2 ?? ''}`); } catch { await page.locator(`#input_11_11`).first().selectOption(`${vars.weight2 ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="input_11_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_1`).first().fill(`Stock Geometry`); } catch { await page.locator(`#input_11_1`).first().selectOption(`Stock Geometry`); }
    // TODO: command="dragAndDrop" target="#input_11_1" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_5"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_5`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_5`).first().fill(`MX Racing`); } catch { await page.locator(`#input_11_5`).first().selectOption(`MX Racing`); }
    // TODO: command="dragAndDrop" target="#input_11_5" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_9"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_9`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_9`).first().fill(`Stock Tires`); } catch { await page.locator(`#input_11_9`).first().selectOption(`Stock Tires`); }
    // TODO: command="dragAndDrop" target="#input_11_9" value=".fusion-header > .fusion-row"
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    vars.option1 = ((await page.locator(`#label_11_12_0`).textContent()) ?? '').trim();
    vars.option2 = ((await page.locator(`#label_11_13_1`).textContent()) ?? '').trim();
    vars.option3 = ((await page.locator(`#input_11_1`).textContent()) ?? '').trim();
    vars.option4 = ((await page.locator(`#input_11_5`).textContent()) ?? '').trim();
    vars.option5 = ((await page.locator(`#input_11_9`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="gform_submit_button_11"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_11`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/shop/cart/?c=72e1ba2726d6"].button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"].product-title`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.variation-Model-yearofyourUTV > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`dd.variation-RiderWeight > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`dd.variation-Howmanypassengers > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`dd.variation-Doyoucarryadditionalpayload > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`dd.variation-Weightofyouradditionalpayload > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`dd.variation-Geometry > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`dd.variation-Primarytypeofriding > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`dd.variation-Tires > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    // ↑ end 11- Cart page CAD
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/shop/checkout/"].fusion-button`)).filter({ visible: true }).first().click({ force: true });
    await wooCommerceCheckoutTemplate(page, vars);
    await expect(page.locator(`dd.variation-Model-yearofyourUTV > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`dd.variation-RiderWeight > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`dd.variation-Howmanypassengers > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`dd.variation-Doyoucarryadditionalpayload > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`dd.variation-Weightofyouradditionalpayload > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`dd.variation-Geometry > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`dd.variation-Primarytypeofriding > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`dd.variation-Tires > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    try {
      await expect(page.locator(`div .ppc-button-wrapper`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      await expect(page.locator(`iframe[src*="www.sandbox.paypal.com"]`).first().contentFrame().locator(`.paypal-powered-by`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
  });

  test('14 - Switch to French', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`div > div.fusion-fullwidth.fullwidth-box.fusion-builder-row-1.nonhundred-percent-fullwidth.non-hundred-percent-height-scrolling > div > div > div > div.fusion-column-content-centered > div > div > h1`).first()).toHaveText(`Explore our products`);
    await expect(page.locator(`div > div.fusion-fullwidth.fullwidth-box.fusion-builder-row-4.fusion-parallax-up.nonhundred-percent-fullwidth.non-hundred-percent-height-scrolling.bg-parallax-parent.lazyloaded > div.fusion-builder-row.fusion-row > div > div > div.fusion-title.title.fusion-sep-none.fusion-title-center.fusion-title-text.fusion-title-size-one > h1`).first()).toHaveText(`Find Shock Options and Pricing For Your Vehicle`);
    await expect(page.locator(`div > div.fusion-fullwidth.fullwidth-box.fusion-builder-row-8.fusion-flex-container.nonhundred-percent-fullwidth.non-hundred-percent-height-scrolling > div > div > div > div.fusion-title.title.fusion-sep-none.fusion-title-center.fusion-title-text.fusion-title-size-two > h2`).first()).toHaveText(`Follow us on Social Media`);
    await expect(page.locator(`h2.fusion-responsive-typography-calculated > span`).first()).toHaveText(`IMPORTANT NOTES:`);
    await expect(page.locator(`div:nth-of-type(2) > div > div:nth-of-type(1) > p:nth-of-type(1) > span`).first()).toHaveText(`All photos are for illustration purpose only and actual product may vary depending on your vehicle model and specific setup for your needs (colours, configuration and more).`);
    await page.locator(`.menu-item.wpml-ls-item > a[href*="/fr/"][title*="Français"].wpml-ls-link > span > .wpml-ls-native`).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`.menu-item.wpml-ls-item > a[title*="English"].wpml-ls-link`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`.menu-item.wpml-ls-item > a[href*="/fr/"][title*="Français"].wpml-ls-link`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.waitForLoadState('load');
    await expect(page.locator(`xpath=//h1[contains(text(),'Gammes de produits')]`)).not.toHaveCount(0);
    await expect(page.locator(`xpath=//h1[contains(text(),'Trouvez les amortisseurs pour votre véhicule')]`)).not.toHaveCount(0);
    await expect(page.locator(`xpath=//h1[contains(text(),'Restons en contact!')]`)).not.toHaveCount(0);
    await expect(page.locator(`xpath=//h2/span[contains(text(),'NOTES IMPORTANTES:')]`)).not.toHaveCount(0);
    await expect(page.locator(`xpath=//div[2]/div/div[1]/p[1]/span[contains(text(),'Toutes les photos sont à titre indicatif seulement et le produit livré peut varier (couleurs, configuration et plus) en fonction du modèle de votre véhicule et la configuration requise pour vos besoins')]`)).not.toHaveCount(0);
    await expect(page.locator(`#menu-menu-principal-elka > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(5) > a[href*="/fr/boutique/"] > .menu-text`).first()).toHaveText(`Boutique`);
    await expect(page.locator(`#menu-top-navigation-header-french > .menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.fusion-dropdown-menu > a[href="#"] > .menu-text`).first()).toHaveText(`Votre Compte`);
    await page.locator(`.menu-item > a[href*="/fr/entreprise/profil-entreprise/"] > span`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Mobile Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 800 }, vars)) {
      await page.locator(`.fusion-header .fusion-mobile-selector`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 800 }, vars)) {
      await page.locator(`.fusion-header .fusion-mobile-selector + .fusion-mobile-menu`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 800 }, vars)) {
      await expect(page.locator(`.fusion-header .fusion-mobile-selector + .fusion-mobile-menu`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 800 }, vars)) {
      await expect(page.locator(`.fusion-header .fusion-mobile-selector + .fusion-mobile-menu`).first()).not.toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 800 }, vars)) {
      await page.screenshot({ fullPage: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 800 }, vars)) {
      await page.locator(`.fusion-header .fusion-mobile-selector + .fusion-mobile-menu > .menu-item-has-children > a`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 800 }, vars)) {
      await expect(page.locator(`.fusion-header .fusion-mobile-selector + .fusion-mobile-menu > .menu-item-has-children > .sub-menu`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 800 }, vars)) {
      await expect(page.locator(`.fusion-header .fusion-mobile-selector + .fusion-mobile-menu > .menu-item-has-children > .sub-menu`).first()).not.toBeVisible();
    }
  });

});
