// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "STAGING - Lens - Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail, placeOrderElement, renewByAdmin, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { login, register } from '../helpers/lens-distortions-common-steps-for-suites';

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

test.describe('STAGING - Lens - Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "CCard": "4242424242424242",
    "month": "05",
    "year": "27",
    "cvv": "123",
    "street": "123 False Street",
    "city": "Ottawa",
    "state": "ON",
    "country": "CA",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Testing Inc.",
    "phone": "6134564567",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "zipCode": "K1S 3V6",
    "street3": "123 false Shipping Street",
    "project": "lens",
    "stateComplete": "Ontario",
    "countryComplete": "Canada",
    "Symbol": "$",
    "url": "https://lensdistortions.flywheelstaging.com",
    "street2": "Of. 2",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`.kt-blocks-accordion-header.kt-acccordion-button-label-show[aria-expanded="true"]`)).toHaveCount(0);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href="${vars.url ?? ''}/music/"]`).first()).toContainText(`MUSIC`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(2) > a[href="${vars.url ?? ''}/sfx/"]`).first()).toContainText(`SFX`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(3) > a[href="${vars.url ?? ''}/color/"]`).first()).toContainText(`COLOR`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(4) > a[href="${vars.url ?? ''}/vfx/"]`).first()).toContainText(`VFX`);
    await expect(page.locator(`.not-logged-only > a[href="/my-account/"]`).first()).toContainText(`Log in`);
    await expect(page.locator(`a[href="/pricing/"].button`).first()).toContainText(`Start Free`);
  });

  test('02 - Color Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#primary-menu > li > a[href*="/color/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Music Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#primary-menu > li > a[href*="/music/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - SFX Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#primary-menu > li > a[href*="/sfx/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - VFX Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#primary-menu > li > a[href*="/vfx/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('06 - Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="/pricing/"].button`).filter({ visible: true }).first().click({ force: true });
  });

  test('07 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 06 - Product Page
    await page.waitForLoadState('load');
    await page.locator(`a[href="/pricing/"].button`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 06 - Product Page
    vars.prod = ((await page.locator(`div[data-plan-id="241416"] > div.ld-product-column--plan-name`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod = `${vars.prod}`

if (prod === "All-Access") {
    return "ALL-ACCESS, ANNUAL"
} }, vars);
    await page.locator(`a[href="/?add-to-cart=241416"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="ld_registration_agreement"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ld_registration_agreement`).filter({ visible: true }).first().click({ force: true }); }
    }
    try {
      {
        const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#mailchimp_woocommerce_newsletter`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await page.locator(`input[name="register"][type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.ld-product-title`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
  });

  test('08 - Place order - New User - 01', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    // ↓ 07 - Checkout page
    // ↓ 06 - Product Page
    await page.waitForLoadState('load');
    await page.locator(`a[href="/pricing/"].button`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 06 - Product Page
    vars.prod = ((await page.locator(`div[data-plan-id="241416"] > div.ld-product-column--plan-name`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod = `${vars.prod}`

if (prod === "All-Access") {
    return "ALL-ACCESS, ANNUAL"
} }, vars);
    await page.locator(`a[href="/?add-to-cart=241416"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="ld_registration_agreement"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ld_registration_agreement`).filter({ visible: true }).first().click({ force: true }); }
    }
    try {
      {
        const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#mailchimp_woocommerce_newsletter`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await page.locator(`input[name="register"][type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.ld-product-title`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    // ↑ end 07 - Checkout page
    await blockUI(page, vars);
    vars.username = `${vars.email ?? ''}`;
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await expect(page.locator(`#wc-stripe-cc-form > div.stripe-source-errors > ul > li`).first()).toContainText(`The card number is incomplete.`);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().selectOption(`${vars.CCard ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().fill(`${vars.month ?? ''} / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().selectOption(`${vars.month ?? ''} / ${vars.year ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`${vars.cvv ?? ''}`); }
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toContainText(`Billing Billing zip code (Required) is a required field.`);
    await wooCommerceCheckoutTemplate(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await expect(page.locator(`p.woocommerce-notice.woocommerce-notice--success.woocommerce-thankyou-order-received`).first()).toContainText(`Thank you. Your order has been received.`);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    vars.subscriptionID = ((await page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/"]`).textContent()) ?? '').trim();
    vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subsID = `${vars.subscriptionID}`
subsID = subsID.substr(1)
return subsID }, vars);
    await expect(page.locator(`td.subscription-status`).first()).toHaveText(`Active`);
    await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.total ?? ''} / year`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.email ?? ''}`);
    await page.locator(`a > span.nav-drop-title-wrap`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toHaveText(`Completed`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-status`).first()).toHaveText(`Completed`);
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
    await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.total ?? ''} / year`);
    await page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toHaveText(`Active`);
    await expect(page.locator(`a[href*="/switch-plan/?switch-subscription=${vars.subscriptionID ?? ''}&"]`).first()).toHaveText(`Switch Plan`);
    await expect(page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/?subscription_id=${vars.subscriptionID ?? ''}&change_subscription_to=cancelled&_wpnonce="]`).first()).toHaveText(`Cancel`);
    await expect(page.locator(`a[href*="change_payment_method=${vars.subscriptionID ?? ''}&_wpnonce="]`).first()).toHaveText(`Change payment`);
    await expect(page.locator(`a[href*="/my-account/?subscription_renewal_early=${vars.subscriptionID ?? ''}&subscription_renewal=true"]`).first()).toContainText(`Renew now`);
    await expect(page.locator(`td.product-total`).first()).toHaveText(`${vars.total ?? ''} / year`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toHaveText(`${vars.total ?? ''} / year`);
  });

  test('08 - Place order - New User - 02 - Renew + BackEnd', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}/wp-admin/`);
    await page.waitForLoadState('load');

    vars.username = `guest@saucal.com`;
    vars.pass = `84j&i2kHzUTb4npIc05)pvpT`;
    await login(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
return element != null && element != undefined }, vars)) {
      {
        const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    await page.goto(`${vars.url ?? ''}/wp-admin/`);
    await page.waitForLoadState('load');
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td:nth-of-type(5) > .amount`).first()).toHaveText(`${vars.total ?? ''} / year`);
    await renewByAdmin(page, vars);
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
    if ((() => { let staging = "Subscriptionsstaging"
return false === staging.includes("staging") })()) {
      await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
    }
    if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
      await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
    }
    if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
      await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pending payment`);
    }
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('09 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await page.waitForLoadState('load');
    await register(page, vars);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toContainText(`No order has been made yet.`);
    await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.no_subscriptions`)).not.toHaveCount(0);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/music-licenses/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.ldmp-no-licenses`)).not.toHaveCount(0);
    await page.locator(`a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > p`).first()).toContainText(`The following addresses will be used on the checkout page by default.`);
    await page.locator(`a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toContainText(`No saved methods found.`);
    await page.locator(`a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
  });

  test('10 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.locator(`li > a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/my-account/lost-password/"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`button[type="submit"].woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toHaveText(`Password reset email has been sent`);
    await extractUserFromEmail(page, vars);
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

});
