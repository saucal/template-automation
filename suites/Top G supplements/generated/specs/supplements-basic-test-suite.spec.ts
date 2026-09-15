// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Supplements basic test suite"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, checkOrderOnEmail, extractResetLinkFromEmail, scrollFullPage } from '../helpers/common-steps-for-all-projects';
import { adminLogin, calculateBulkDiscount, calculateTotal, checkOrderOnBackend, closeModal, extractShippingCost, fillBillingInformation, fillCreditCardInfo, fillShippingInformation, placeOrder, refundByAdmin, refundEmail, thankYouPageValidation, validateOrderInAccount } from '../helpers/top-g-supplements-common-steps';

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

test.describe('Supplements basic test suite', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "firstName": "Testing",
    "lastName": "Maintenance",
    "creditCard": "4111111111111111",
    "expDate": "0127",
    "cvv": "111",
    "admin": "callahan@saucal.com",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "company": "Verification Inc.",
    "billingCountry": "United States (US)",
    "billingCountryShort": "US",
    "billingStreet": "20th Ave at Irving St",
    "billingCity": "Pasco",
    "billingZip": "99301",
    "billingState": "Washington",
    "billingStateShort": "WA",
    "phoneraw": "6107549758",
    "optionalAddress": "Suite 17",
    "phone": "(610) 754-9758",
    "shippingStreet": "3959 W Jordan Rd",
    "shippingCity": "Weidman",
    "shippingState": "Michigan",
    "shippingStateShort": "MI",
    "shippingZip": "48893",
    "userPassword": process.env.USER_PASSWORD ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await scrollFullPage(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let form = document.querySelector<HTMLFormElement>('#slf-form').checkVisibility();
return form; }, vars)) {
      await page.locator(`div.elements > div:nth-child(5) > button.slf-button > p`).filter({ visible: true }).first().click({ force: true });
    }
    await closeModal(page, vars);
    await expect(page.locator(`div.hero-homepage-overlay > div > h1`).first()).toHaveText(`TOP G SUPPLEMENTS`);
  });

  test('02 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`div.hero-homepage-overlay > div> div.kb-buttons-wrap > a`).or(page.locator(`.wp-block-kadence-column.alignfull.hero-homepage > .kt-inside-inner-col > .wp-block-kadence-column > .kt-inside-inner-col > .wp-block-kadence-advancedbtn.kb-buttons-wrap > a[href*="/shop/"].kb-button.kt-button.button.kt-btn-size-large.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn > .kt-btn-inner-text`)).filter({ visible: true }).first().click({ force: true });
    await closeModal(page, vars);
    await expect(page.locator(`div > h1`).first()).toContainText(`ALL SUPPLEMENTS`);
  });

  test('03 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`div > div:nth-child(2) > div > div > div > div > div.wc-block-components-product-image > a > img`).or(page.locator(`a[href*="/product/sheer-indefatigability/"] > img.attachment-woocommerce_single.size-woocommerce_single`)).or(page.locator(`a[href*="/product/sheer-indefatigability/"] > img[data-testid="product-image"].attachment-woocommerce_single.size-woocommerce_single`)).filter({ visible: true }).first().click({ force: true });
    await closeModal(page, vars);
    await expect(page.locator(`h1.product_title`).first()).toContainText(`SHEER Indefatigability`);
    await expect(page.locator(`.kt-adv-heading41_4cb0e7-42`).first()).toContainText(`*The statements on this page have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.`);
  });

  test('04 - Simple product place order & account validation', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.wp-block-kadence-column.alignfull.hero-homepage > .kt-inside-inner-col > .wp-block-kadence-column > .kt-inside-inner-col > .wp-block-kadence-advancedbtn.kb-buttons-wrap > a[href*="/shop/"].kb-button.kt-button.button.kt-btn-size-large.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn`).or(page.locator(`div.kt-inside-inner-col > div.kb-buttons-wrap > a.button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await closeModal(page, vars);
    vars.unitPrice = ((await page.locator(`div > div:nth-child(3) > div > div > div > div > div > div > span > bdi`).textContent()) ?? '').trim();
    vars.productName = ((await page.locator(`div > div:nth-child(3) > div > div > div > div > h2 > a`).textContent()) ?? '').trim();
    await page.locator(`a[href="?add-to-cart=42"] > span`).or(page.locator(`form > button.button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Checkout now")]`).or(page.locator(`.woocommerce-message > a[href*="/checkout/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.cart-summary > h2`).first()).toContainText(`Cart Summary`);
    vars.quantity = ((await page.locator(`input.qty`).textContent()) ?? '').trim();
    vars.subTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`;
unitPrice = unitPrice.slice(1);
unitPrice = parseFloat(unitPrice);
qty = parseInt(`${vars.quantity}`);
let subTotal = unitPrice * qty;
return subTotal; }, vars);
    await fillBillingInformation(page, vars);
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await calculateBulkDiscount(page, vars);
    await fillShippingInformation(page, vars);
    await fillCreditCardInfo(page, vars);
    vars.taxCost = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await extractShippingCost(page, vars);
    await calculateTotal(page, vars);
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#place_order`).first()).toBeVisible();
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
    }
    await thankYouPageValidation(page, vars);
    await page.screenshot({ fullPage: true });
    try {
      await page.locator(`div.header-account-wrap > a.header-account-button`).or(page.locator(`#main-header > div > div > div > div > div > div > div > div.site-header-main-section-right.site-header-section.site-header-section-right > div:nth-child(2) > div > a > svg`)).or(page.locator(`div.header-account-wrap > a.header-account-button > svg > g`)).or(page.locator(`div.header-account-wrap > a.header-account-button > svg > g > path`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.goto(`https://98e7a8e6-59c9-4d96-a84b-f05c2cade91e.cc05.conves.io/account/`);
    await page.waitForLoadState('load');
    await page.locator(`nav > ul > li:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr > th:nth-child(1) > span.nobr`).first()).toContainText(`Order`);
    await page.locator(`tr > td > a.button`).filter({ visible: true }).first().click({ force: true });
    await validateOrderInAccount(page, vars);
  });

  test('05 - Place order 2 products & backend validation', async ({ page }) => {
    await page.goto(`/shop/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/product/sheer-indefatigability/"] > video.wp-block-topg-supplements-product-featured-image-video`).filter({ visible: true }).first().click({ force: true });
    vars.productName = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`input[type="button"].plus`).filter({ visible: true }).first().click({ force: true });
    vars.quantity = ((await page.locator(`input.qty`).textContent()) ?? '').trim();
    vars.subTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`;
unitPrice = unitPrice.slice(1);
unitPrice = parseFloat(unitPrice);
//let qty = document.querySelector<HTMLInputElement>("input.qty").getAttribute("value");
qty = parseInt(`${vars.quantity}`);
let subTotal = unitPrice * qty;
return subTotal; }, vars);
    await page.locator(`xpath=//button[contains(text(), "Purchase now")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Checkout now")]`).or(page.locator(`.woocommerce-message > a[href*="/checkout/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tbody > tr:nth-child(1) > td.product-name > a`).first()).toContainText(`${vars.productName ?? ''}`);
    await expect(page.locator(`input[aria-label="Product quantity"]`).first()).toContainText(`${vars.quantity ?? ''}`);
    await fillShippingInformation(page, vars);
    await fillBillingInformation(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$${vars.subTotal ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    await calculateBulkDiscount(page, vars);
    await expect(page.locator(`tr.cart-discount > th`).first()).toContainText(`Bulk discount`);
    await expect(page.locator(`tr.cart-discount > td > .woocommerce-Price-amount.amount`).first()).toContainText(`$${vars.bulkDiscount ?? ''}`);
    await extractShippingCost(page, vars);
    await expect(page.locator(`tr.topg-checkout-shipping > td`).first()).toContainText(`${vars.shippingCost ?? ''}`);
    await expect(page.locator(`tr.tax-total > th`).first()).toContainText(`Tax`);
    vars.taxCost = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`tr.order-total > th`).first()).toContainText(`Total`);
    await calculateTotal(page, vars);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$${vars.total ?? ''}`);
    await fillCreditCardInfo(page, vars);
    await placeOrder(page, vars);
    await page.waitForLoadState('load');
    await thankYouPageValidation(page, vars);
    await adminLogin(page, vars);
    await checkOrderOnBackend(page, vars);
    await refundByAdmin(page, vars);
    await refundEmail(page, vars);
  });

  test('06 - Simple product place order & email validation', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.project = `Supplements`;
    vars.email = `${vars.emailReg ?? ''}`;
    await page.locator(`.wp-block-kadence-column.alignfull.hero-homepage > .kt-inside-inner-col > .wp-block-kadence-column > .kt-inside-inner-col > .wp-block-kadence-advancedbtn.kb-buttons-wrap > a[href*="/shop/"].kb-button.kt-button.button.kt-btn-size-large.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn`).or(page.locator(`div.kt-inside-inner-col > div.kb-buttons-wrap > a.button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await closeModal(page, vars);
    vars.unitPrice = ((await page.locator(`div > div:nth-child(3) > div > div > div > div > div > div > span > bdi`).textContent()) ?? '').trim();
    vars.productName = ((await page.locator(`div > div:nth-child(3) > div > div > div > div > h2 > a`).textContent()) ?? '').trim();
    await page.locator(`a[href="?add-to-cart=42"] > span`).or(page.locator(`form > button.button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Checkout now")]`).or(page.locator(`.woocommerce-message > a[href*="/checkout/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.cart-summary > h2`).first()).toContainText(`Cart Summary`);
    vars.quantity = ((await page.locator(`input.qty`).textContent()) ?? '').trim();
    vars.subTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`;
unitPrice = unitPrice.slice(1);
unitPrice = parseFloat(unitPrice);
qty = parseInt(`${vars.quantity}`);
let subTotal = unitPrice * qty;
return subTotal; }, vars);
    await fillBillingInformation(page, vars);
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await calculateBulkDiscount(page, vars);
    await fillShippingInformation(page, vars);
    await fillCreditCardInfo(page, vars);
    vars.taxCost = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await extractShippingCost(page, vars);
    await calculateTotal(page, vars);
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#place_order`).first()).toBeVisible();
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
    }
    await thankYouPageValidation(page, vars);
    vars.prod_desc = `${vars.productName ?? ''}`;
    vars.qty = `${vars.quantity ?? ''}`;
    vars.subtotalPrice = `${vars.unitPrice ?? ''}`;
    vars.shippingPrice = `${vars.shippingCost ?? ''}`;
    vars.taxPrice = `${vars.taxCost ?? ''}`;
    await checkOrderOnEmail(page, vars);
  });

  test('07 - Simple product place order & password validation ', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `${vars.emailForgot ?? ''}`;
    await page.locator(`.wp-block-kadence-column.alignfull.hero-homepage > .kt-inside-inner-col > .wp-block-kadence-column > .kt-inside-inner-col > .wp-block-kadence-advancedbtn.kb-buttons-wrap > a[href*="/shop/"].kb-button.kt-button.button.kt-btn-size-large.kt-btn-width-type-auto.kb-btn-global-fill.kt-btn-has-text-true.kt-btn-has-svg-false.wp-block-kadence-singlebtn`).or(page.locator(`div.kt-inside-inner-col > div.kb-buttons-wrap > a.button`)).or(page.locator(`div.wp-block-kadence-column.kadence-column166_f00b44-83.kb-section-has-overlay.alignfull.hero-homepage > div > div > div > div.wp-block-kadence-advancedbtn.kb-buttons-wrap.kb-btns166_2cc2c7-c2 > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await closeModal(page, vars);
    vars.unitPrice = ((await page.locator(`div > div:nth-child(3) > div > div > div > div > div > div > span > bdi`).textContent()) ?? '').trim();
    vars.productName = ((await page.locator(`div > div:nth-child(3) > div > div > div > div > h2 > a`).textContent()) ?? '').trim();
    await page.locator(`a[href="?add-to-cart=42"] > span`).or(page.locator(`form > button.button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Checkout now")]`).or(page.locator(`.woocommerce-message > a[href*="/checkout/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.cart-summary > h2`).first()).toContainText(`Cart Summary`);
    vars.quantity = ((await page.locator(`input.qty`).textContent()) ?? '').trim();
    vars.subTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`;
unitPrice = unitPrice.slice(1);
unitPrice = parseFloat(unitPrice);
qty = parseInt(`${vars.quantity}`);
let subTotal = unitPrice * qty;
return subTotal; }, vars);
    await fillBillingInformation(page, vars);
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await fillShippingInformation(page, vars);
    await fillCreditCardInfo(page, vars);
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#place_order`).first()).toBeVisible();
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await thankYouPageValidation(page, vars);
    try {
      await page.locator(`div.header-account-wrap > a.header-account-button`).or(page.locator(`#main-header > div > div > div > div > div > div > div > div.site-header-main-section-right.site-header-section.site-header-section-right > div:nth-child(2) > div > a > svg`)).or(page.locator(`div.header-account-wrap > a.header-account-button > svg > g`)).or(page.locator(`div.header-account-wrap > a.header-account-button > svg > g > path`)).first().hover();
    } catch { /* optional step: mouseOver */ }
    try {
      await page.locator(`ul.submenu > li:nth-child(6) > a`).or(page.locator(`#account-menu > li > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout.menu-item > a`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.goto(`https://98e7a8e6-59c9-4d96-a84b-f05c2cade91e.cc05.conves.io/account/`);
    await page.waitForLoadState('load');
    await expect(page.locator(`div.woocommerce > h2`).first()).toContainText(`Login`);
    await page.locator(`p.lost_password > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.form-row > button`).first()).toContainText(`Reset password`);
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`.form-row > button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-message`).first()).toContainText(`Password reset email has been sent.	`);
    await extractResetLinkFromEmail(page, vars);
    try { await page.locator(`#password_1`).first().fill(`${vars.userPassword ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.userPassword ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.userPassword ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.userPassword ?? ''}`); }
    await page.locator(`p.form-row > button.button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.	`);
    await page.locator(`ul.submenu > li:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`tr >th > a`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
  });

});
