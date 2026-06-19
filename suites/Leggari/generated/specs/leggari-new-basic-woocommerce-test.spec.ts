// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Leggari New - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { cartValidation, login, register } from '../helpers/leggari-new-common-steps-for-suites';

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

test.describe('Leggari New - Basic WooCommerce Test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": "GI Leggari",
    "phone": "3098698799",
    "street3": "street shipping",
    "street4": "Ap. 4",
    "password2": process.env.PASSWORD2 ?? '',
    "password": process.env.PASSWORD ?? '',
    "stateComplete": "Washington",
    "Symbol": "$",
    "countryComplete": "United States (US)",
    "country": "US",
    "project": "leggari",
    "phoneCode": "+1",
    "addressType": "true",
    "company2": "Testing Inc.",
    "street": "1401 W 1st Ave",
    "street2": "Apartment 2",
    "city": "Tumwater",
    "zipCode": "98512",
    "state": "WA",
    "shippingStreet": "525 N. Third Avenue",
    "shippingStreet2": "Suite 101",
    "billingStreet": "1300 N. Oregon Ave.",
    "billingStreet2": "First Floor",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
  });

  test('02 - Counter kits', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47995 > a`).or(page.locator(`xpath=//a[contains(text(),'Countertop Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('02 - Floor kits', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47990 > a`).or(page.locator(`xpath=//a[contains(text(),'Floor Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('02 - Single items and accesories', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-48004 > a`).or(page.locator(`xpath=//a[contains(text(),'Single Items & Accessories')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('02 - Wall kits', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47999 > a`).or(page.locator(`xpath=//a[contains(text(),'Shower & Wall Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Floor kits
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47990 > a`).or(page.locator(`xpath=//a[contains(text(),'Floor Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Floor kits
    await page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > div:nth-of-type(1) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`).or(page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 03 - Product page
    // ↓ 02 - Floor kits
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47990 > a`).or(page.locator(`xpath=//a[contains(text(),'Floor Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Floor kits
    await page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > div:nth-of-type(1) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`).or(page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    {
      const _lbl = page.locator(`label[for="leggari-start-composite"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-start-composite`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="leggari-sqf-for-kit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-sqf-for-kit`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#leggari-sqf-for-kit`).first().fill(`125`); } catch { await page.locator(`#leggari-sqf-for-kit`).first().selectOption(`125`); }
    await page.keyboard.press('Tab');
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71533`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71533`); }
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71535`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71535`); }
    try { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71536`); } catch { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71536`); }
    {
      const _lbl = page.locator(`label[for="wccp_component_checkbox_1684742865_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wccp_component_checkbox_1684742865_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    vars.square = ((await page.locator(`#leggari-sqf-for-kit`).textContent()) ?? '').trim();
    vars.coat = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71533"]`).textContent()) ?? '').trim();
    vars.additive = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71535"]`).textContent()) ?? '').trim();
    vars.vapor = ((await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71536"]`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.composite_price > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.composite_price > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    if (vars.role === 'contractor') {
      vars.wholePrice = ((await page.locator(`.composite_price > .price > del > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (vars.role === 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`
let unitPrice = `${vars.unitPrice}`

wholePrice = parseFloat(wholePrice.replace('$','').trim())
unitPrice = parseFloat(unitPrice.replace('$','').trim())

let unitPrice2 = wholePrice * 0.89

return Number(unitPrice.toFixed(2)) === unitPrice }, vars)).toBeTruthy();
    }
    if (vars.role === 'contractor') {
      vars.prodDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`

wholePrice = parseFloat(wholePrice.replace(`${vars.Symbol}`,'').trim())

let discount = wholePrice * 0.11

return `${vars.Symbol}`+discount.toFixed(2)
 }, vars);
    }
    await expect(page.locator(`button[type="submit"].single_add_to_cart_button`).first()).toBeVisible();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.component_value > p`).first()).toContainText(`${vars.square ?? ''} ft²`);
    await expect(page.locator(`dd.variation-UrethaneTopCoat`).first()).toContainText(`${vars.coat ?? ''} × 1`);
    await expect(page.locator(`dd.variation-GritAdditive`).first()).toContainText(`${vars.additive ?? ''} × 1`);
    await expect(page.locator(`dd.variation-VaporBarrier`).first()).toContainText(`${vars.vapor ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total:not(.fees) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total.fees > span > bdi`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    await page.locator(`xpath=//a[contains(text(), "Continue to Cart")]`).or(page.locator(`a[href*="/cart/"].cart-popup__product-button`)).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.product-info-list__item > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-subtotal > ins > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.role === 'contractor') {
      await expect(page.locator(`.product-subtotal > del > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(1) > dd.component_value > p`).first()).toContainText(`${vars.square ?? ''}`);
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(2) > dd.component_value:nth-of-type(1) > p`).first()).toContainText(`${vars.coat ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(3) > p`).first()).toContainText(`${vars.vapor ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(2) > p`).first()).toContainText(`${vars.additive ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      vars.subtotalPrice = `${vars.wholePrice ?? ''}`;
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role !== 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.fee.fee-product-discount.custom-cart-totals-style-table > td > span`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
  });

  test('05 - Checkout page - Step 1', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    // ↓ 02 - Floor kits
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47990 > a`).or(page.locator(`xpath=//a[contains(text(),'Floor Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Floor kits
    await page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > div:nth-of-type(1) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`).or(page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    {
      const _lbl = page.locator(`label[for="leggari-start-composite"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-start-composite`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="leggari-sqf-for-kit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-sqf-for-kit`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#leggari-sqf-for-kit`).first().fill(`125`); } catch { await page.locator(`#leggari-sqf-for-kit`).first().selectOption(`125`); }
    await page.keyboard.press('Tab');
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71533`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71533`); }
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71535`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71535`); }
    try { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71536`); } catch { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71536`); }
    {
      const _lbl = page.locator(`label[for="wccp_component_checkbox_1684742865_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wccp_component_checkbox_1684742865_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    vars.square = ((await page.locator(`#leggari-sqf-for-kit`).textContent()) ?? '').trim();
    vars.coat = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71533"]`).textContent()) ?? '').trim();
    vars.additive = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71535"]`).textContent()) ?? '').trim();
    vars.vapor = ((await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71536"]`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.composite_price > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.composite_price > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    if (vars.role === 'contractor') {
      vars.wholePrice = ((await page.locator(`.composite_price > .price > del > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (vars.role === 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`
let unitPrice = `${vars.unitPrice}`

wholePrice = parseFloat(wholePrice.replace('$','').trim())
unitPrice = parseFloat(unitPrice.replace('$','').trim())

let unitPrice2 = wholePrice * 0.89

return Number(unitPrice.toFixed(2)) === unitPrice }, vars)).toBeTruthy();
    }
    if (vars.role === 'contractor') {
      vars.prodDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`

wholePrice = parseFloat(wholePrice.replace(`${vars.Symbol}`,'').trim())

let discount = wholePrice * 0.11

return `${vars.Symbol}`+discount.toFixed(2)
 }, vars);
    }
    await expect(page.locator(`button[type="submit"].single_add_to_cart_button`).first()).toBeVisible();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.component_value > p`).first()).toContainText(`${vars.square ?? ''} ft²`);
    await expect(page.locator(`dd.variation-UrethaneTopCoat`).first()).toContainText(`${vars.coat ?? ''} × 1`);
    await expect(page.locator(`dd.variation-GritAdditive`).first()).toContainText(`${vars.additive ?? ''} × 1`);
    await expect(page.locator(`dd.variation-VaporBarrier`).first()).toContainText(`${vars.vapor ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total:not(.fees) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total.fees > span > bdi`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    await page.locator(`xpath=//a[contains(text(), "Continue to Cart")]`).or(page.locator(`a[href*="/cart/"].cart-popup__product-button`)).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.product-info-list__item > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-subtotal > ins > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.role === 'contractor') {
      await expect(page.locator(`.product-subtotal > del > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(1) > dd.component_value > p`).first()).toContainText(`${vars.square ?? ''}`);
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(2) > dd.component_value:nth-of-type(1) > p`).first()).toContainText(`${vars.coat ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(3) > p`).first()).toContainText(`${vars.vapor ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(2) > p`).first()).toContainText(`${vars.additive ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      vars.subtotalPrice = `${vars.wholePrice ?? ''}`;
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role !== 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.fee.fee-product-discount.custom-cart-totals-style-table > td > span`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    // ↑ end 04 - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Continue to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(1500);
    await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toContainText(`${vars.desc_prod ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    try {
      await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
  });

  test('05 - Checkout page - Step 2', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.role !== 'contractor') {
      vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    }
    if (vars.role === 'contractor') {
      vars.email = `${vars.emailReg ?? ''}`;
    }
    vars.step = `2`;
    // ↓ 05 - Checkout page - Step 1
    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    // ↓ 02 - Floor kits
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47990 > a`).or(page.locator(`xpath=//a[contains(text(),'Floor Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Floor kits
    await page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > div:nth-of-type(1) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`).or(page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    {
      const _lbl = page.locator(`label[for="leggari-start-composite"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-start-composite`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="leggari-sqf-for-kit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-sqf-for-kit`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#leggari-sqf-for-kit`).first().fill(`125`); } catch { await page.locator(`#leggari-sqf-for-kit`).first().selectOption(`125`); }
    await page.keyboard.press('Tab');
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71533`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71533`); }
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71535`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71535`); }
    try { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71536`); } catch { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71536`); }
    {
      const _lbl = page.locator(`label[for="wccp_component_checkbox_1684742865_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wccp_component_checkbox_1684742865_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    vars.square = ((await page.locator(`#leggari-sqf-for-kit`).textContent()) ?? '').trim();
    vars.coat = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71533"]`).textContent()) ?? '').trim();
    vars.additive = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71535"]`).textContent()) ?? '').trim();
    vars.vapor = ((await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71536"]`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.composite_price > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.composite_price > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    if (vars.role === 'contractor') {
      vars.wholePrice = ((await page.locator(`.composite_price > .price > del > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (vars.role === 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`
let unitPrice = `${vars.unitPrice}`

wholePrice = parseFloat(wholePrice.replace('$','').trim())
unitPrice = parseFloat(unitPrice.replace('$','').trim())

let unitPrice2 = wholePrice * 0.89

return Number(unitPrice.toFixed(2)) === unitPrice }, vars)).toBeTruthy();
    }
    if (vars.role === 'contractor') {
      vars.prodDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`

wholePrice = parseFloat(wholePrice.replace(`${vars.Symbol}`,'').trim())

let discount = wholePrice * 0.11

return `${vars.Symbol}`+discount.toFixed(2)
 }, vars);
    }
    await expect(page.locator(`button[type="submit"].single_add_to_cart_button`).first()).toBeVisible();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.component_value > p`).first()).toContainText(`${vars.square ?? ''} ft²`);
    await expect(page.locator(`dd.variation-UrethaneTopCoat`).first()).toContainText(`${vars.coat ?? ''} × 1`);
    await expect(page.locator(`dd.variation-GritAdditive`).first()).toContainText(`${vars.additive ?? ''} × 1`);
    await expect(page.locator(`dd.variation-VaporBarrier`).first()).toContainText(`${vars.vapor ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total:not(.fees) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total.fees > span > bdi`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    await page.locator(`xpath=//a[contains(text(), "Continue to Cart")]`).or(page.locator(`a[href*="/cart/"].cart-popup__product-button`)).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.product-info-list__item > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-subtotal > ins > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.role === 'contractor') {
      await expect(page.locator(`.product-subtotal > del > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(1) > dd.component_value > p`).first()).toContainText(`${vars.square ?? ''}`);
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(2) > dd.component_value:nth-of-type(1) > p`).first()).toContainText(`${vars.coat ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(3) > p`).first()).toContainText(`${vars.vapor ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(2) > p`).first()).toContainText(`${vars.additive ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      vars.subtotalPrice = `${vars.wholePrice ?? ''}`;
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role !== 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.fee.fee-product-discount.custom-cart-totals-style-table > td > span`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    // ↑ end 04 - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Continue to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(1500);
    await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toContainText(`${vars.desc_prod ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    try {
      await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 05 - Checkout page - Step 1
    if (vars.role !== 'contractor') {
      await page.locator(`xpath=//button[contains(text(), "CONTINUE TO SHIPPING →")]`).or(page.locator(`.wfacp-left-panel.wfacp_page.pre_built.single_step > .wfacp-two-step-erap.wfacp-next-btn-wrap.center > button[type="button"].button.button-primary.wfacp_next_page_button`)).filter({ visible: true }).first().click({ force: true });
    }
    try {
      if (vars.role !== 'contractor') {
        await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Email is a required field.
First name is a required field.
Last name is a required field.
Street address is a required field.
Town / City is a required field.
Postcode / ZIP is a required field.
Country is a required field.
State / County is a required field.
Address Type is a required field.
Phone is a required field.`);
      }
    } catch { /* optional step: assertText */ }
    if (vars.role !== 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let invalid = Array.from<any>(document.querySelectorAll('.woocommerce-invalid-required-field'))

return invalid.length === 10 }, vars)).toBeTruthy();
    }
    try {
      await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await wooCommerceCheckoutTemplate(page, vars);
  });

  test('05 - Checkout page - Step 3', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Checkout page - Step 2
    if (vars.role !== 'contractor') {
      vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    }
    if (vars.role === 'contractor') {
      vars.email = `${vars.emailReg ?? ''}`;
    }
    vars.step = `2`;
    // ↓ 05 - Checkout page - Step 1
    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    // ↓ 02 - Floor kits
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47990 > a`).or(page.locator(`xpath=//a[contains(text(),'Floor Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Floor kits
    await page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > div:nth-of-type(1) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`).or(page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    {
      const _lbl = page.locator(`label[for="leggari-start-composite"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-start-composite`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="leggari-sqf-for-kit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-sqf-for-kit`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#leggari-sqf-for-kit`).first().fill(`125`); } catch { await page.locator(`#leggari-sqf-for-kit`).first().selectOption(`125`); }
    await page.keyboard.press('Tab');
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71533`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71533`); }
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71535`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71535`); }
    try { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71536`); } catch { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71536`); }
    {
      const _lbl = page.locator(`label[for="wccp_component_checkbox_1684742865_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wccp_component_checkbox_1684742865_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    vars.square = ((await page.locator(`#leggari-sqf-for-kit`).textContent()) ?? '').trim();
    vars.coat = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71533"]`).textContent()) ?? '').trim();
    vars.additive = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71535"]`).textContent()) ?? '').trim();
    vars.vapor = ((await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71536"]`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.composite_price > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.composite_price > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    if (vars.role === 'contractor') {
      vars.wholePrice = ((await page.locator(`.composite_price > .price > del > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (vars.role === 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`
let unitPrice = `${vars.unitPrice}`

wholePrice = parseFloat(wholePrice.replace('$','').trim())
unitPrice = parseFloat(unitPrice.replace('$','').trim())

let unitPrice2 = wholePrice * 0.89

return Number(unitPrice.toFixed(2)) === unitPrice }, vars)).toBeTruthy();
    }
    if (vars.role === 'contractor') {
      vars.prodDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`

wholePrice = parseFloat(wholePrice.replace(`${vars.Symbol}`,'').trim())

let discount = wholePrice * 0.11

return `${vars.Symbol}`+discount.toFixed(2)
 }, vars);
    }
    await expect(page.locator(`button[type="submit"].single_add_to_cart_button`).first()).toBeVisible();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.component_value > p`).first()).toContainText(`${vars.square ?? ''} ft²`);
    await expect(page.locator(`dd.variation-UrethaneTopCoat`).first()).toContainText(`${vars.coat ?? ''} × 1`);
    await expect(page.locator(`dd.variation-GritAdditive`).first()).toContainText(`${vars.additive ?? ''} × 1`);
    await expect(page.locator(`dd.variation-VaporBarrier`).first()).toContainText(`${vars.vapor ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total:not(.fees) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total.fees > span > bdi`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    await page.locator(`xpath=//a[contains(text(), "Continue to Cart")]`).or(page.locator(`a[href*="/cart/"].cart-popup__product-button`)).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.product-info-list__item > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-subtotal > ins > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.role === 'contractor') {
      await expect(page.locator(`.product-subtotal > del > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(1) > dd.component_value > p`).first()).toContainText(`${vars.square ?? ''}`);
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(2) > dd.component_value:nth-of-type(1) > p`).first()).toContainText(`${vars.coat ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(3) > p`).first()).toContainText(`${vars.vapor ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(2) > p`).first()).toContainText(`${vars.additive ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      vars.subtotalPrice = `${vars.wholePrice ?? ''}`;
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role !== 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.fee.fee-product-discount.custom-cart-totals-style-table > td > span`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    // ↑ end 04 - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Continue to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(1500);
    await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toContainText(`${vars.desc_prod ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    try {
      await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 05 - Checkout page - Step 1
    if (vars.role !== 'contractor') {
      await page.locator(`xpath=//button[contains(text(), "CONTINUE TO SHIPPING →")]`).or(page.locator(`.wfacp-left-panel.wfacp_page.pre_built.single_step > .wfacp-two-step-erap.wfacp-next-btn-wrap.center > button[type="button"].button.button-primary.wfacp_next_page_button`)).filter({ visible: true }).first().click({ force: true });
    }
    try {
      if (vars.role !== 'contractor') {
        await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Email is a required field.
First name is a required field.
Last name is a required field.
Street address is a required field.
Town / City is a required field.
Postcode / ZIP is a required field.
Country is a required field.
State / County is a required field.
Address Type is a required field.
Phone is a required field.`);
      }
    } catch { /* optional step: assertText */ }
    if (vars.role !== 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let invalid = Array.from<any>(document.querySelectorAll('.woocommerce-invalid-required-field'))

return invalid.length === 10 }, vars)).toBeTruthy();
    }
    try {
      await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await wooCommerceCheckoutTemplate(page, vars);
    // ↑ end 05 - Checkout page - Step 2
    vars.step = `3`;
    await wooCommerceCheckoutTemplate(page, vars);
  });

  test('07 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    await register(page, vars);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).first()).toContainText(`No order has been made yet.`);
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/my-account/downloads/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).first()).toContainText(`No downloads available yet.`);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Addresses`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-EditAccountForm.edit-account`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
  });

  test('08 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    await register(page, vars);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    if (!page.url().includes('/my-account')) {
      await page.locator(`#secondary-header-menu > li.secondary-header-menu__login > a`).or(page.locator(`#main-header > div > div > div > div > div > div > div > div.site-header-main-section-right.site-header-section.site-header-section-right > div:nth-child(3) > div > a`)).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/my-account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(),'Reset password')]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request for Leggari Products")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    vars.pass = `${vars.password2 ?? ''}`;
    try {
      await page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await login(page, vars);
  });

  test('Klaviyo tracking - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    // ↓ 02 - Floor kits
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47990 > a`).or(page.locator(`xpath=//a[contains(text(),'Floor Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Floor kits
    await page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > div:nth-of-type(1) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`).or(page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    {
      const _lbl = page.locator(`label[for="leggari-start-composite"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-start-composite`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="leggari-sqf-for-kit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-sqf-for-kit`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#leggari-sqf-for-kit`).first().fill(`125`); } catch { await page.locator(`#leggari-sqf-for-kit`).first().selectOption(`125`); }
    await page.keyboard.press('Tab');
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71533`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71533`); }
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71535`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71535`); }
    try { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71536`); } catch { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71536`); }
    {
      const _lbl = page.locator(`label[for="wccp_component_checkbox_1684742865_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wccp_component_checkbox_1684742865_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    vars.square = ((await page.locator(`#leggari-sqf-for-kit`).textContent()) ?? '').trim();
    vars.coat = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71533"]`).textContent()) ?? '').trim();
    vars.additive = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71535"]`).textContent()) ?? '').trim();
    vars.vapor = ((await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71536"]`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.composite_price > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.composite_price > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    if (vars.role === 'contractor') {
      vars.wholePrice = ((await page.locator(`.composite_price > .price > del > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (vars.role === 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`
let unitPrice = `${vars.unitPrice}`

wholePrice = parseFloat(wholePrice.replace('$','').trim())
unitPrice = parseFloat(unitPrice.replace('$','').trim())

let unitPrice2 = wholePrice * 0.89

return Number(unitPrice.toFixed(2)) === unitPrice }, vars)).toBeTruthy();
    }
    if (vars.role === 'contractor') {
      vars.prodDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`

wholePrice = parseFloat(wholePrice.replace(`${vars.Symbol}`,'').trim())

let discount = wholePrice * 0.11

return `${vars.Symbol}`+discount.toFixed(2)
 }, vars);
    }
    await expect(page.locator(`button[type="submit"].single_add_to_cart_button`).first()).toBeVisible();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.component_value > p`).first()).toContainText(`${vars.square ?? ''} ft²`);
    await expect(page.locator(`dd.variation-UrethaneTopCoat`).first()).toContainText(`${vars.coat ?? ''} × 1`);
    await expect(page.locator(`dd.variation-GritAdditive`).first()).toContainText(`${vars.additive ?? ''} × 1`);
    await expect(page.locator(`dd.variation-VaporBarrier`).first()).toContainText(`${vars.vapor ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total:not(.fees) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total.fees > span > bdi`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    await page.locator(`xpath=//a[contains(text(), "Continue to Cart")]`).or(page.locator(`a[href*="/cart/"].cart-popup__product-button`)).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.product-info-list__item > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-subtotal > ins > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.role === 'contractor') {
      await expect(page.locator(`.product-subtotal > del > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(1) > dd.component_value > p`).first()).toContainText(`${vars.square ?? ''}`);
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(2) > dd.component_value:nth-of-type(1) > p`).first()).toContainText(`${vars.coat ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(3) > p`).first()).toContainText(`${vars.vapor ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(2) > p`).first()).toContainText(`${vars.additive ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      vars.subtotalPrice = `${vars.wholePrice ?? ''}`;
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role !== 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.fee.fee-product-discount.custom-cart-totals-style-table > td > span`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    // ↑ end 04 - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Continue to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(1500);
    await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toContainText(`${vars.desc_prod ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    try {
      await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let klaviyo = document.querySelector('#wck_started_checkout-js-extra');
console.log(klaviyo.textContent=kl_checkout.event_data.$extra.CartRebuildKey); }, vars);
    vars.cartRebuildKey = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.kl_checkout.event_data.$extra.CartRebuildKey }, vars);
    await page.goto(`{{result.startUrl}}/cart/`);
    await page.waitForLoadState('load');
    await page.screenshot({ fullPage: true });
    await page.locator(`.remove-link`).filter({ visible: true }).first().click({ force: true });
    await page.reload();
    await page.waitForLoadState('load');
    await page.screenshot({ fullPage: true });
    await page.goto(`{{result.startUrl}}/cart?wck_rebuild_cart=${vars.cartRebuildKey ?? ''}`);
    await page.waitForLoadState('load');
    await page.screenshot({ fullPage: true });
    await cartValidation(page, vars);
  });

  test('Mobile Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    {
      const _lbl = page.locator(`label[for="mobile-toggle"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#site-navigation > button`).or(page.locator(`#mobile-toggle`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#menu-new-main-menu-dropdown-1`).or(page.locator(`.mobile-drawer-content`)).first()).toBeVisible();
  });

});
