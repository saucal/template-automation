// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "US - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { calculateSubtotal, checkTheTotal, extractUserFromEmail, register } from '../helpers/common-steps-for-all-projects';
import { changeHeightToSlider, login, registration } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('US - Basic WooCommerce Test', () => {

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
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "city": "Miami",
    "stateComplete": "Florida",
    "zipCode": "33126",
    "phone": "3059689789",
    "street3": "123 False Shipping",
    "Symbol": "$",
    "state": "FL",
    "country": "US",
    "countryComplete": "United States (US)",
    "project": "nopong",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "currency": "USD",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('"Forgot password?" flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-form.woocommerce-form-login.login`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/wp-login.php?action=lostpassword"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`.woocommerce-Button.button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`)).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`PASSWORD RESET EMAIL HAS BEEN SENT.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).or(page.locator(`p > a`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password_1`).first().selectOption(`fric2172Biot`); }
    try { await page.locator(`#password_2`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password_2`).first().selectOption(`fric2172Biot`); }
    await page.locator(`button.woocommerce-Button.button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`YOUR PASSWORD HAS BEEN RESET SUCCESSFULLY.`);
    try {
      await page.locator(`.woocommerce-MyAccount-navigation-link--customer-logout a`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`#password`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password`).first().selectOption(`fric2172Biot`); }
    await page.locator(`button[name="login"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-navigation`)).not.toHaveCount(0);
  });

  test('Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Shop Page
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Shop Page
    vars.prod_desc = ((await page.locator(`#main > div > div > div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns.has-multiple-rows.alignfull > ul > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) a[href*="?add-to-cart="]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
  });

  test('Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Shop Page
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Shop Page
    vars.prod_desc = ((await page.locator(`#main > div > div > div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns.has-multiple-rows.alignfull > ul > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > div > a`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
  });

  test('Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Cart Page
    // ↓ Shop Page
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Shop Page
    vars.prod_desc = ((await page.locator(`#main > div > div > div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns.has-multiple-rows.alignfull > ul > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) a[href*="?add-to-cart="]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    // ↑ end Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.blockUI`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`.blockUI`)).toHaveCount(0);
    } catch { /* optional step: assertElementNotPresent */ }
  });

  test('Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Cart Page
    // ↓ Shop Page
    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Shop Page
    vars.prod_desc = ((await page.locator(`#main > div > div > div.wc-block-grid.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns.has-multiple-rows.alignfull > ul > li:nth-child(1) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")

return desc }, vars);
    vars.unitPrice = ((await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > .price > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    await page.locator(`.wp-block-handpicked-products.wc-block-handpicked-products.has-5-columns > ul > li:nth-of-type(1) > div > a`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div > div > ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input[title="Qty"]`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    // ↑ end Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.blockUI`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`.blockUI`)).toHaveCount(0);
    } catch { /* optional step: assertElementNotPresent */ }
  });

  test('Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await changeHeightToSlider(page, vars);
  });

  test('Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await changeHeightToSlider(page, vars);
  });

  test('Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await registration(page, vars);
    vars.name = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let email = `${vars.username}`
email = email.replace('+','').replace('@saucal.com','').toLowerCase()
return email }, vars);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-message.woocommerce-message--info.woocommerce-Message.woocommerce-Message--info.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner__content`)).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No order has been made yet.`);
    await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce_account_subscriptions > p`).or(page.locator(`.woocommerce-info`)).first()).toContainText(`You have no active subscriptions.`);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.u-columns.woocommerce-Addresses.col2-set.addresses`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > div > div > a.button`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#post-8 > div > div > div > form`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`)).filter({ visible: true }).first().click({ force: true });
  });

  test('Shop Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Shop Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/products/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('US - Accordion Ingredients', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/us/ingredients-directions/"]`).or(page.locator(`#menu-item-133846 > div > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title > em`).first()).toContainText(`Ingredients & Directions`);
    await expect(page.locator(`div:nth-of-type(3) > .header.has-icon-align-left.has-background.has-medium-grey-background-color.has-text-color.has-white-color > div`).first()).toContainText(`NO PONG SPICY CHAI ORIGINAL`);
    await page.locator(`div:nth-of-type(3) > .header.has-icon-align-left.has-background.has-medium-grey-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.has-icon-align-left > div:nth-of-type(3) > div:nth-of-type(2)`)).not.toHaveCount(0);
    await expect(page.locator(`xpath=//*[@id="post-1322"]/div/div[6]/div[3]/div[2]`).first()).toHaveText(`INGREDIENTS

Cocos Nucifera (Coconut Oil), Sodium Bicarbonate (Baking Soda), Corn Starch, Beeswax, and a proprietary blend of 100% pure, certified organic essential oils consisting of Orange Sweet, Mandarin, Clove Bud, Cardamom, and Nutmeg.

*No Pong is Palm Oil Free`);
    await page.locator(`div:nth-of-type(3) > .header.has-icon-align-left.has-background.has-medium-grey-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`xpath=//*[contains(text(),'Mandarin')]`).first()).not.toBeVisible();
  });

  test('US - Accordion Ingredients', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/us/ingredients-directions/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title > em`).first()).toContainText(`Ingredients & Directions`);
    await expect(page.locator(`div:nth-of-type(3) > .header.has-icon-align-left.has-background.has-medium-grey-background-color.has-text-color.has-white-color > div`).first()).toContainText(`NO PONG SPICY CHAI ORIGINAL`);
    await page.locator(`div:nth-of-type(3) > .header.has-icon-align-left.has-background.has-medium-grey-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.has-icon-align-left > div:nth-of-type(3) > div:nth-of-type(2)`)).not.toHaveCount(0);
    await expect(page.locator(`xpath=//*[@id="post-1322"]/div/div[6]/div[3]/div[2]`).first()).toHaveText(`INGREDIENTS

Cocos Nucifera (Coconut Oil), Sodium Bicarbonate (Baking Soda), Corn Starch, Beeswax, and a proprietary blend of 100% pure, certified organic essential oils consisting of Orange Sweet, Mandarin, Clove Bud, Cardamom, and Nutmeg.

*No Pong is Palm Oil Free`);
    await page.locator(`div:nth-of-type(3) > .header.has-icon-align-left.has-background.has-medium-grey-background-color.has-text-color.has-white-color > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`xpath=//*[contains(text(),'Mandarin')]`).first()).not.toBeVisible();
  });

  test('US - Home Slider Autoplay verification', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.entry-content > h2.has-text-align-center.has-text-color.wp-block-heading`).first()).toContainText(`you are our Heroes`);
    await page.screenshot({ fullPage: true });
    await expect(page.locator(`xpath=//*[@id="tns2-item1"]`)).not.toHaveCount(0);
    await page.waitForTimeout(12000);
    await expect(page.locator(`xpath=//*[@id="tns2-item5"]`)).not.toHaveCount(0);
    await page.screenshot({ fullPage: true });
  });

  test('US - Home Slider Manual verification', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "next")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "next")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#tns1-item3 > img.tns-lazy-img.loaded.tns-complete`).or(page.locator(`#tns1-item2 > img.tns-lazy-img.loaded.tns-complete`))).not.toHaveCount(0);
  });

  test('US - Site Country validation', async ({ page }) => {
    await page.goto(`/us/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`.label`).first()).toContainText(`US`);
  });

});
