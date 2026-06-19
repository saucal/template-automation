// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "AU - Place Order - New User"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, checkTheTotal, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { calculateShipping, checkEarningPointsCartCheckout, checkOrderDetailsThankYouPageAndMyAccount, creditsVariables, fillCC, fillCheckout, goToMyAccountCheckOrderDetails, login, placeOrderNewUserBackend, placeOrderNewUserEmail, placeOrderNewUserRefund, placeOrderNewUserRefundEmail, storiesAssertion, thankYouPage } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('AU - Place Order - New User', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "stateComplete": "New South Wales",
    "city": "Sydney",
    "includeTax": "true",
    "zipCode": "2000",
    "phone": "+61412345678",
    "street3": "123 False Shipping",
    "countryComplete": "Australia",
    "Symbol": "$",
    "state": "NSW",
    "project": "nopong",
    "country": "AU",
    "subscription": "false",
    "street2": "Ap. 4",
    "password2": process.env.PASSWORD2 ?? '',
    "street4": "4th Floor",
    "password": process.env.PASSWORD ?? '',
    "currency": "AUD",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - AU - Place Order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.coupon = `false`;
    vars.refund = `false`;
    vars.redeeming = `false`;
    // ↓ 07 - AU - Checkout Page
    // ↓ 06 - AU - Cart Page
    // ↓ 05 - AU - Simple Product Shop Page
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`li:nth-of-type(1) > a > div.wc-block-grid__product-image`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).not.toBeVisible();
    }
    // ↑ end 05 - AU - Simple Product Shop Page
    await creditsVariables(page, vars);
    vars.prod_desc = ((await page.locator(`.product-main .product_title`).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/a/div[contains(@class, 'wc-block-grid__product-title')]`)).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")
desc = desc.replaceAll('“','"')
desc = desc.replaceAll('”','"')

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.product-main .woocommerce-Price-amount`).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/*[contains(@class, 'price')]/ins/*[contains(@class, 'woocommerce-Price-amount')]`)).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/*[contains(@class, 'price')]/*[contains(@class, 'woocommerce-Price-amount')]`)).textContent()) ?? '').trim();
    await page.locator(`li:not([data-slug*='bundle']) a[href*="?add-to-cart="]`).or(page.locator(`form.cart .single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).or(page.locator(`#masthead div > ul > li > a.cart-contents`)).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = `2`;
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (vars.logged !== 'yes') {
      await calculateShipping(page, vars);
    }
    try {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    vars.taxPrice = ((await page.locator(`tr.order-total > td > small > span`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 06 - AU - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 07 - AU - Checkout Page
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await storiesAssertion(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
  });

  test('02 - AU - Place Order - New User - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('03 - AU - Place Order - New User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

  test('04 - AU - Place Order - New User - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefund(page, vars);
  });

  test('05 - AU - Place Order - New User - Refund - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserRefundEmail(page, vars);
  });

  test('06 - AU - Place Order - Logged User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.logged = `yes`;
    vars.savedCC = `true`;
    vars.saveCC = `false`;
    vars.coupon = `false`;
    vars.refund = `false`;
    vars.redeeming = `false`;
    if (vars.logged === 'yes') {
      await login(page, vars);
    }
    // ↓ 07 - AU - Checkout Page
    // ↓ 06 - AU - Cart Page
    // ↓ 05 - AU - Simple Product Shop Page
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`li:nth-of-type(1) > a > div.wc-block-grid__product-image`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).toBeVisible();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width > 767 }, vars)) {
      await expect(page.locator(`.nopong-product-popup-modal`).first()).not.toBeVisible();
    }
    // ↑ end 05 - AU - Simple Product Shop Page
    await creditsVariables(page, vars);
    vars.prod_desc = ((await page.locator(`.product-main .product_title`).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/a/div[contains(@class, 'wc-block-grid__product-title')]`)).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")
desc = desc.replaceAll('“','"')
desc = desc.replaceAll('”','"')

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.product-main .woocommerce-Price-amount`).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/*[contains(@class, 'price')]/ins/*[contains(@class, 'woocommerce-Price-amount')]`)).or(page.locator(`xpath=(//ul[contains(@class, 'wc-block-grid__products')]/li[not(contains(@data-slug, 'bundle'))])[1]/*[contains(@class, 'price')]/*[contains(@class, 'woocommerce-Price-amount')]`)).textContent()) ?? '').trim();
    await page.locator(`li:not([data-slug*='bundle']) a[href*="?add-to-cart="]`).or(page.locator(`form.cart .single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).or(page.locator(`#masthead div > ul > li > a.cart-contents`)).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = `2`;
    try { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[title="Qty"]`).or(page.locator(`input.input-text.qty.text`)).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (vars.logged !== 'yes') {
      await calculateShipping(page, vars);
    }
    try {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    vars.taxPrice = ((await page.locator(`tr.order-total > td > small > span`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 06 - AU - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await checkEarningPointsCartCheckout(page, vars);
    // ↑ end 07 - AU - Checkout Page
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await storiesAssertion(page, vars);
    await blockUI(page, vars);
    await thankYouPage(page, vars);
    await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
    await goToMyAccountCheckOrderDetails(page, vars);
  });

  test('07 - AU - Place Order - Logged User - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserEmail(page, vars);
  });

  test('08 - AU - Place Order - Logged User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await placeOrderNewUserBackend(page, vars);
  });

  test('09 - AU - Not Wholesale', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}wholesale-products/`);
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`)).not.toHaveCount(0);
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`WHOLESALE PRODUCTS`);
    {
      const _lbl = page.locator(`label[for="username"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#username`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="password"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`p > strong`).or(page.locator(`#post-790271 > div > p`)).first()).toHaveText(`WHOLESALE PRODUCTS (Approved Wholesale Customers only)`);
    await expect(page.locator(`ol > li:nth-of-type(1)`).first()).toHaveText(`You need to satisfy our eligibility requirements, and be a legitimate Australian business with an ABN, in a relevant field.`);
    await expect(page.locator(`xpath=//*[@id="post-790271"]/div[1]/ol/li[2]`).first()).toHaveText(`Please get in touch with us as customerlove@nopong.com.au to chat more!`);
  });

});
