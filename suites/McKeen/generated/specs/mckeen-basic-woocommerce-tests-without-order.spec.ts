// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "McKeen - Basic WooCommerce Tests - Without Order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail } from '../helpers/common-steps-for-all-projects';
import { login, registration } from '../helpers/mckeen-common-steps-for-project';

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

test.describe('McKeen - Basic WooCommerce Tests - Without Order', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "zipCode": "K1S 3V6",
    "url": "https://staging-metroglebe.kinsta.cloud/",
    "stateComplete": "Ontario",
    "country": "CA",
    "countryComplete": "Canada",
    "lastName2": "Shipping Last Name",
    "street3": "123 Shipping False",
    "street4": "Of. 67",
    "company2": "Shipping company",
    "phone": "5675676545",
    "password": process.env.PASSWORD ?? '',
    "company": "Testing SA",
    "project": "mckeen",
    "currency": "CAD",
    "Symbol": "$",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "street": "123 False Street",
    "street2": "Ap. 2",
    "city": "Ottawa",
    "state": "ON",
    "admin_user": "guest+maintenanceAdmin@saucal.com",
    "admin_pass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('"Forgot password?" flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    await registration(page, vars);
    await page.locator(`a[href*="/customer-logout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.header-social > .container > .header-social__holder > a[href="/my-account"].my-account`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/wp-login.php?action=lostpassword"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`button.woocommerce-Button.button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(10000);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).filter({ visible: true }).first().click({ force: true });
    vars.emailContent = ((await page.locator(`#body_content`).textContent()) ?? '').trim();
    try {
      vars.resetEmailUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /(https:)+[^\s]+[\w]*?/g;
const str = `${vars.emailContent}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
    } catch { /* optional step: extractEval */ }
    vars.resetEmailUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const resetEmailUrl = document.querySelector<HTMLAnchorElement>('a.link').getAttribute('href');
return resetEmailUrl; }, vars);
    await page.goto(`${vars.resetEmailUrl ?? ''}`);
    await page.waitForLoadState('load');
    try { await page.locator(`#password_1`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password_1`).first().selectOption(`fric2172Biot`); }
    try { await page.locator(`#password_2`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password_2`).first().selectOption(`fric2172Biot`); }
    try {
      {
        const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    await page.locator(`button.woocommerce-Button.button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`Your password has been reset successfully.`);
    await page.goto(`${vars.url ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`.header-social > .container > .header-social__holder > a[href="/my-account"].my-account`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`#password`).first().fill(`fric2172Biot`); } catch { await page.locator(`#password`).first().selectOption(`fric2172Biot`); }
    await page.locator(`button[name="login"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-navigation`)).not.toHaveCount(0);
  });

  test('Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Product Page
    // ↓ Shop Page
    await page.locator(`a[href="/shop"].shop`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[placeholder="enter your postal code"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="enter your postal code"]`).first().fill(`K1S 3V6`); } catch { await page.locator(`input[placeholder="enter your postal code"]`).first().selectOption(`K1S 3V6`); }
    await page.locator(`xpath=//button[contains(text(), "OK")]`).or(page.locator(`button.confirm`)).filter({ visible: true }).first().click({ force: true });
    // ↑ end Shop Page
    await page.goto(`https://staging-metroglebe.kinsta.cloud/product-category/local/`);
    await page.waitForLoadState('load');
    await page.locator(`a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
    // ↑ end Product Page
    {
      const _lbl = page.locator(`label[for="pa_selection"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#pa_selection`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#pa_selection > option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.header-social > .container > .header-social__holder > .social-svg_holder.cart--holder > [id="site-header-cart"].site-header-cart.menu > li:nth-of-type(2) > .widget.woocommerce.widget_shopping_cart > .widget_shopping_cart_content > .woocommerce-mini-cart__buttons.buttons > a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
  });

  test('Checkout Page', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}`);
    await page.waitForLoadState('load');

    // ↓ Cart Page
    // ↓ Product Page
    // ↓ Shop Page
    await page.locator(`a[href="/shop"].shop`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[placeholder="enter your postal code"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="enter your postal code"]`).first().fill(`K1S 3V6`); } catch { await page.locator(`input[placeholder="enter your postal code"]`).first().selectOption(`K1S 3V6`); }
    await page.locator(`xpath=//button[contains(text(), "OK")]`).or(page.locator(`button.confirm`)).filter({ visible: true }).first().click({ force: true });
    // ↑ end Shop Page
    await page.goto(`https://staging-metroglebe.kinsta.cloud/product-category/local/`);
    await page.waitForLoadState('load');
    await page.locator(`a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
    // ↑ end Product Page
    {
      const _lbl = page.locator(`label[for="pa_selection"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#pa_selection`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#pa_selection > option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.header-social > .container > .header-social__holder > .social-svg_holder.cart--holder > [id="site-header-cart"].site-header-cart.menu > li:nth-of-type(2) > .widget.woocommerce.widget_shopping_cart > .widget_shopping_cart_content > .woocommerce-mini-cart__buttons.buttons > a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    // ↑ end Cart Page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
  });

  test('Contact form', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/#contact-information"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#input_1_5`).first().fill(`QA Test`); } catch { await page.locator(`#input_1_5`).first().selectOption(`QA Test`); }
    try { await page.locator(`#input_1_4`).first().fill(`qa+gi_${vars.alphanumeric ?? ''}@saucal.com`); } catch { await page.locator(`#input_1_4`).first().selectOption(`qa+gi_${vars.alphanumeric ?? ''}@saucal.com`); }
    try { await page.locator(`#input_1_3`).first().fill(`Testing message for the form`); } catch { await page.locator(`#input_1_3`).first().selectOption(`Testing message for the form`); }
    {
      const _lbl = page.locator(`label[for="gform_submit_button_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#gform_confirmation_message_1`).first()).toContainText(`Thanks for contacting us! We will get in touch with you shortly.`);
  });

  test('FAQ page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "FAQ")]`).or(page.locator(`a[href*="/faq/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.accordion-item.js-accordion:nth-of-type(1) > .accordion__header > h4.header`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.accordion > div.accordion-item.js-accordion:nth-of-type(1) > div.accordion__body`).first()).toBeVisible();
    await page.locator(`div.accordion-item.js-accordion:nth-of-type(1) > .accordion__header > h4.header`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.accordion > div.accordion-item.js-accordion:nth-of-type(1) > div.accordion__body`).first()).not.toBeVisible();
    await page.locator(`div.accordion-item.js-accordion:nth-of-type(1) > .accordion__header > h4.header`).filter({ visible: true }).first().click({ force: true });
  });

  test('Home page', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}`);
    await page.waitForLoadState('load');

  });

  test('Mobile Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.site-header .toggle-nav`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.site-header .toggle-nav + nav`).first()).toBeVisible();
  });

  test('Mobile Shop Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Shop Page
    await page.locator(`a[href="/shop"].shop`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[placeholder="enter your postal code"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="enter your postal code"]`).first().fill(`K1S 3V6`); } catch { await page.locator(`input[placeholder="enter your postal code"]`).first().selectOption(`K1S 3V6`); }
    await page.locator(`xpath=//button[contains(text(), "OK")]`).or(page.locator(`button.confirm`)).filter({ visible: true }).first().click({ force: true });
    // ↑ end Shop Page
    await page.locator(`.shop-wrapper .open-nav`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.shop-wrapper .shop-nav`).first()).toBeVisible();
    await page.screenshot({ fullPage: true });
    await page.locator(`.shop-wrapper .shop-nav .category-name-menu-list-items.has-children`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.shop-wrapper .shop-nav .category-name-menu-list-items.has-children > ul`).first()).toBeVisible();
  });

  test('Product Page', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}`);
    await page.waitForLoadState('load');

    // ↓ Shop Page
    await page.locator(`a[href="/shop"].shop`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[placeholder="enter your postal code"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="enter your postal code"]`).first().fill(`K1S 3V6`); } catch { await page.locator(`input[placeholder="enter your postal code"]`).first().selectOption(`K1S 3V6`); }
    await page.locator(`xpath=//button[contains(text(), "OK")]`).or(page.locator(`button.confirm`)).filter({ visible: true }).first().click({ force: true });
    // ↑ end Shop Page
    await page.goto(`https://staging-metroglebe.kinsta.cloud/product-category/local/`);
    await page.waitForLoadState('load');
    await page.locator(`a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
  });

  test('Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.admin = `no`;
    await registration(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No order has been made yet.`);
    await page.locator(`a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.u-columns.woocommerce-Addresses.col2-set.addresses`)).not.toHaveCount(0);
    await page.locator(`a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.edit-account`)).not.toHaveCount(0);
    await page.locator(`a[href*="/customer-logout/"]`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
  });

  test('Shop Page', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/shop"].shop`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[placeholder="enter your postal code"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="enter your postal code"]`).first().fill(`K1S 3V6`); } catch { await page.locator(`input[placeholder="enter your postal code"]`).first().selectOption(`K1S 3V6`); }
    await page.locator(`xpath=//button[contains(text(), "OK")]`).or(page.locator(`button.confirm`)).filter({ visible: true }).first().click({ force: true });
  });

});
