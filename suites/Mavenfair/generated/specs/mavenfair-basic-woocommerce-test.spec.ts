// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Mavenfair - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail } from '../helpers/common-steps-for-all-projects';
import { login, registration } from '../helpers/mavenfair-common-steps-for-project';

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

test.describe('Mavenfair - Basic WooCommerce Test', () => {

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
    "countryComplete": "Canada",
    "stateComplete": "British Columbia",
    "user": `SaucalMaintenance_1_${Math.random().toString(36).substring(2, 10)}`,
    "firstName": "Saucal",
    "lastName": `Maint_${Math.random().toString(36).substring(2, 10)}`,
    "country": "CA",
    "street": "123 false street",
    "city": "Vancouver",
    "zipCode": "V5T 1R8",
    "phone": "6134767685",
    "state": "BC",
    "street3": "123 false shipping",
    "zipCode2": "V5V 3P9",
    "lastName2": "Shipping Test",
    "user2": `SaucalMaintenance_2_${Math.random().toString(36).substring(2, 10)}`,
    "project": "mavenfair",
    "Symbol": "$",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('"Forgot password?" flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.userReg = `${vars.user ?? ''}`;
    await registration(page, vars);
    await page.locator(`img.avatar.avatar-100.photo`).first().hover();
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a.boss-logout`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try {
      await page.locator(`a[href*="/wp-login.php"].header-button`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/wp-login.php?action=lostpassword"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`input#wp-submit`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).or(page.locator(`.notice.notice-info.message`)).first()).toContainText(`Check your email for the confirmation link`);
    await page.waitForTimeout(10000);
    await extractUserFromEmail(page, vars);
    await page.locator(`a`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input#pass1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`input#pass1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try {
      try { await page.locator(`input#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`input#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    } catch { /* optional step: assign */ }
    await page.locator(`button.woocommerce-Button.button`).or(page.locator(`input#wp-submit`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).or(page.locator(`.notice-info.message`)).first()).toContainText(`Your password has been reset`);
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

  test('Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`ul > li.product-type-simple > div > div > a`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let variations = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.variations'))
return variations !== null
 }, vars)) {
      vars.variations = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let variations = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.variations > tbody > tr'))
return variations.length }, vars);
    }
    if (vars.variations >= 1) {
      await page.locator(`tr:nth-child(1) > td > select`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 1) {
      await page.locator(`tr:nth-child(1) > td > select > option:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 2) {
      await page.locator(`tr:nth-child(2) > td > select`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 2) {
      await page.locator(`tr:nth-child(2) > td > select > option:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 3) {
      await page.locator(`tr:nth-child(3) > td > select > option:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 3) {
      await page.locator(`tr:nth-child(3) > td > select`).filter({ visible: true }).first().click({ force: true });
    }
    vars.prod_desc = ((await page.locator(`h1.product_title.entry-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`p.price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`p.price > ins .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`button.single_add_to_cart_button.button.alt`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.wc-block-components-notice-banner>.wc-block-components-notice-banner__content .wc-forward`).or(page.locator(`.woocommerce-message .wc-forward`)).filter({ visible: true }).first().click({ force: true });
  });

  test('Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Cart Page
    await page.locator(`ul > li.product-type-simple > div > div > a`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let variations = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.variations'))
return variations !== null
 }, vars)) {
      vars.variations = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let variations = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.variations > tbody > tr'))
return variations.length }, vars);
    }
    if (vars.variations >= 1) {
      await page.locator(`tr:nth-child(1) > td > select`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 1) {
      await page.locator(`tr:nth-child(1) > td > select > option:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 2) {
      await page.locator(`tr:nth-child(2) > td > select`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 2) {
      await page.locator(`tr:nth-child(2) > td > select > option:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 3) {
      await page.locator(`tr:nth-child(3) > td > select > option:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.variations >= 3) {
      await page.locator(`tr:nth-child(3) > td > select`).filter({ visible: true }).first().click({ force: true });
    }
    vars.prod_desc = ((await page.locator(`h1.product_title.entry-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`p.price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`p.price > ins .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`button.single_add_to_cart_button.button.alt`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.wc-block-components-notice-banner>.wc-block-components-notice-banner__content .wc-forward`).or(page.locator(`.woocommerce-message .wc-forward`)).filter({ visible: true }).first().click({ force: true });
    // ↑ end Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

  });

  test('Mobile Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#mobile-header #main-nav`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#mobile-right-panel`).first()).toBeVisible();
  });

  test('Mobile Shop Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`nav.subheader #sub-trigger`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`nav.subheader ul.menu`).first()).toBeVisible();
    await page.screenshot({ fullPage: true });
    await page.locator(`nav.subheader ul.menu > .bm_widget_product_categories > .widgettitle`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`nav.subheader ul.menu > .bm_widget_product_categories > .widgettitle + .sub-menu`).first()).toBeVisible();
    await page.screenshot({ fullPage: true });
  });

  test('Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Shop Page
    await page.locator(`#marketplace_product_categories-2`).first().hover();
    await page.locator(`.cat > a[href*="/jewellery/"]`).filter({ visible: true }).first().click({ force: true });
    // ↑ end Shop Page
    await page.locator(`.product.type-product a.woocommerce-loop-product__link`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`div.summary.entry-summary > p.price > span > bdi`).or(page.locator(`.product-main-area > div.summary.entry-summary > p.price > ins > span.woocommerce-Price-amount`)).textContent()) ?? '').trim();
    vars.prod_desc = ((await page.locator(`h1.product_title.entry-title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod_desc = `${vars.prod_desc}`
prod_desc = prod_desc.replace("–","-")
return prod_desc }, vars);
  });

  test('Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.userReg = `${vars.user2 ?? ''}`;
    await page.waitForLoadState('load');
    await registration(page, vars);
    await page.locator(`xpath=//a[contains(text(), "View Your Membership Account →")]`).or(page.locator(`.pmpro_actions_nav > a[href*="/membership-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.page > header.entry-header > h1.entry-title`).first()).toContainText(`Membership Account`);
    await page.locator(`a[href*="/members/"].user-link > img.avatar.photo`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#nav-bar-filter`)).not.toHaveCount(0);
    {
      const _lbl = page.locator(`label[for="user-activity"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//a[contains(text(), "MavenSpace")]`).or(page.locator(`#user-activity`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.activity-greeting`).first()).toContainText(`What's new, ${vars.user2 ?? ''}?`);
    {
      const _lbl = page.locator(`label[for="user-friends"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#user-friends`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#message > p`).first()).toContainText(`Sorry, no members were found.`);
    {
      const _lbl = page.locator(`label[for="user-products"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#user-products`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#message > p`).first()).toContainText(`Sorry, no favourite products were found.`);
    {
      const _lbl = page.locator(`label[for="user-bm-orders"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//a[contains(text(), "Purchases")]`).or(page.locator(`#user-bm-orders`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`))).not.toHaveCount(0);
    await page.locator(`#nav-bar-filter > .menu-item.menu-item-type-custom.menu-item-object-custom > a[href*="/maker-dashboard/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.pmpro_content_message > .pmpro_card_content`)).not.toHaveCount(0);
    await page.locator(`a[href*="/members/"].user-link > img.avatar.photo`).first().hover();
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/wp-login.php?action=logout"].boss-logout`)).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
  });

  test('Shop Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#marketplace_product_categories-2`).first().hover();
    await page.locator(`.cat > a[href*="/jewellery/"]`).filter({ visible: true }).first().click({ force: true });
  });

});
