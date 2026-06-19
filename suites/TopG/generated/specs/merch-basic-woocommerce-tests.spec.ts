// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Merch - Basic WooCommerce tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, extractUserFromEmail, login, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';
import { nextPaymentDate } from '../helpers/merch-common-test-steps';

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

test.describe('Merch - Basic WooCommerce tests', () => {

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
    "password2": process.env.PASSWORD2 ?? '',
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Ship`,
    "street": "101 S Franklin St",
    "phone": "3453453456",
    "qty": "3",
    "street2": "Ap. 4",
    "street3": "123 False Shipping",
    "street4": "Ap. Shipp",
    "city": "Greensburg",
    "zipCode": "47240",
    "country": "US",
    "state": "IN",
    "stateComplete": "Indiana",
    "countryComplete": "United States (US)",
    "company": "Testing",
    "company2": "Testing Shipping",
    "Symbol": "$",
    "currency": "USD",
    "project": "topg-merch",
    "password": process.env.PASSWORD ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
  });

  test('02 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/what-is-top-g-exclusive/"]`).or(page.locator(`div #main-header > div > div > div > div > div > div > div > div > div > div > button > span.widget-toggle-icon > span > svg > path`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div > p > a.kb-button.kt-button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - Refund page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Refund policy")]`).or(page.locator(`a[href*="/refund-policy/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('04 - Privacy page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Privacy Policy")]`).or(page.locator(`a[href*="/privacy-policy/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('05 - T&C page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Terms & Conditions")]`).or(page.locator(`#menu-item-83 > a[href*="/terms-and-conditions/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('06 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 12 - Fireblood page
    await page.locator(`.menu-item > a[href*="/choose-your-path/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.fireblood-content`)).not.toHaveCount(0);
    await expect(page.locator(`.qty-options`)).not.toHaveCount(0);
    await expect(page.locator(`.plan-columns`)).not.toHaveCount(0);
    vars.prod_desc = ((await page.locator(`.hero-header > h1`).textContent()) ?? '').trim();
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = document.querySelector<HTMLButtonElement>('button.add-to-cart').innerText;

const price = text.match(/\$\d+\.\d{2}/);

return price[0] }, vars);
    // ↑ end 12 - Fireblood page
    try {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let title = `${vars.prod_desc}`
title = title.toUpperCase();
return title
 }, vars);
    } catch { /* optional step: extractEval */ }
    await page.locator(`button.add-to-cart`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`

return prod_desc.charAt(0).toUpperCase() + prod_desc.slice(1).toLowerCase(); }, vars);
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
    await expect(page.locator(`ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.cart-subtotal:nth-of-type(1) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total.adp-discount > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$10.00`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total:nth-of-type(4) > td > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.cart-subtotal:nth-of-type(6) > td > .topg_recurring_cart_totals > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total:nth-of-type(7) > td > .topg_recurring_cart_totals > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.subscription-details`).first()).toContainText(`/ month`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.cart-subtotal:nth-of-type(6) > td > .topg_recurring_cart_totals`).first()).toContainText(`/ month`);
    await expect(page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total:nth-of-type(7) > td > .topg_recurring_cart_totals`).first()).toContainText(`/ month`);
    vars.nextPay = ((await page.locator(`.topg-exclusive-cart-content > .cart_totals.topg_cart_totals > table.shop_table.shop_table_responsive > tbody > tr.order-total:nth-of-type(7) > td > .first-payment-date > small`).textContent()) ?? '').trim();
    await nextPaymentDate(page, vars);
  });

  test('08 - My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `no`;
    vars.username = `${vars.email ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your Top G Exclusive account has been created!")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/my-account/lost-password"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.pass ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.pass ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await uRLOfCurrentPage(page, vars);
    await login(page, vars);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.woocommerce-orders-table__row`)).not.toHaveCount(0);
    try {
      await page.locator(`a[href*="/my-account/downloads/"]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await expect(page.locator(`div.woocommerce-Message.woocommerce-Message--info.woocommerce-info`).first()).toContainText(`No downloads available yet.`);
    } catch { /* optional step: assertTextPresent */ }
    await page.locator(`a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-column1 > header.woocommerce-Address-title.title > h3`).or(page.locator(`.u-column1 > header.woocommerce-Address-title.title > h2`)).first()).toContainText(`Billing address`);
    await expect(page.locator(`.u-column2 > header.woocommerce-Address-title.title > h3`).or(page.locator(`.u-column2 > header.woocommerce-Address-title.title > h2`)).first()).toContainText(`Shipping address`);
    await page.locator(`a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`p.woocommerce-Message.woocommerce-Message--info.woocommerce-info`).or(page.locator(`div.woocommerce-info`)).first()).toHaveText(`No saved methods found.`);
    await page.locator(`a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`).first()).toBeVisible();
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
  });

  test('09 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.url = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href
return url }, vars);
    await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/my-account/lost-password/"]`).or(page.locator(`p.woocommerce-LostPassword.lost_password > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`p.message`).or(page.locator(`form > p:nth-child(1)`)).first()).toContainText(`Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.`);
    {
      const _lbl = page.locator(`label[for="user_login"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#user_login`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`input#wp-submit`).or(page.locator(`p > button`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`p#login-message`).first()).toContainText(`Check your email for the confirmation link, then visit the login page.`);
    } catch { /* optional step: assertTextPresent */ }
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "[Top G Exclusive] Password Reset")]`).or(page.locator(`#inbox > tbody > tr > td.subject > a`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`body > div > pre >  a`).or(page.locator(`div > p >  a.link`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#pass1`).or(page.locator(`#password_1`)).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#pass1`).or(page.locator(`#password_1`)).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#pass1`).or(page.locator(`#password_2`)).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#pass1`).or(page.locator(`#password_2`)).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`input#wp-submit`).or(page.locator(`p > button.woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`p.message.reset-pass`).or(page.locator(`div > div.woocommerce-message`)).first()).toContainText(`Your password has been reset successfully.`);
    await expect(page.locator(`header > h1`).first()).toContainText(`My account`);
    await expect(page.locator(`div > a.order-num`).first()).toContainText(`# ${vars.orderNumber ?? ''}`);
  });

  test('11 - Cart modal', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.site-header-upper-inner-wrap.kadence-sticky-header.item-is-fixed > .site-main-header-wrap > div > .site-container > .site-main-header-inner-wrap.site-header-row > .site-header-main-section-left.site-header-section.site-header-section-left > .site-header-item > div > button[id="widget-toggle"].drawer-toggle.widget-toggle-style-default`).or(page.locator(`div#main-header > div > div > div > div > div > div.site-container > div > div > div > div > button#widget-toggle`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "ALL ITEMS")]`).or(page.locator(`h4.widget-link-h.wp-block-kadence-advancedheading.has-theme-palette-3-color.has-text-color:nth-of-type(3) > a[href*="/product-category/all-items/"]`)).or(page.locator(`section > div > div > h4:nth-child(6) > a`)).or(page.locator(`section > div > div > h4:nth-child(2) > a`)).filter({ visible: true }).first().click({ force: true });
    vars.productName = ((await page.locator(`ul > li:nth-child(3) > div > h2 > a`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`ul > li:nth-child(3) > div > span > span > bdi`).textContent()) ?? '').trim();
    await page.locator(`a[href*="/product/together-we-fight/"] > .wp-block-topg-nft-product-slider-product__add-to-cart.product-simple.added > div:nth-of-type(2) > .wp-block-topg-nft-product-slider-product__add-to-cart-wrap > .add-to-cart`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h2.side-cart-header`).first()).toContainText(`Review Cart`);
    await expect(page.locator(`a[href*="/product/together-we-fight/"].woocommerce-mini-cart-item-description-title`).first()).toContainText(`${vars.productName ?? ''}`);
    await expect(page.locator(`.quantity-display__text`).first()).toContainText(`1`);
    vars.parsedPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = `${vars.unitPrice}`;
price = price.slice(1);
price = parseFloat(price);
return price }, vars);
    await expect(page.locator(`.sc_price__unitprice`).first()).toContainText(`${vars.parsedPrice ?? ''}`);
    await expect(page.locator(`.topg-mini-cart-subtotal > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    await expect(page.locator(`#mini_cart_coupon_code`)).not.toHaveCount(0);
    await expect(page.locator(`button[aria-label="Remove this item"]`)).not.toHaveCount(0);
    await expect(page.locator(`a[href*="/checkout/"].button`).first()).toContainText(`Checkout Securely`);
  });

  test('12 - Fireblood page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.menu-item > a[href*="/choose-your-path/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.fireblood-content`)).not.toHaveCount(0);
    await expect(page.locator(`.qty-options`)).not.toHaveCount(0);
    await expect(page.locator(`.plan-columns`)).not.toHaveCount(0);
    vars.prod_desc = ((await page.locator(`.hero-header > h1`).textContent()) ?? '').trim();
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = document.querySelector<HTMLButtonElement>('button.add-to-cart').innerText;

const price = text.match(/\$\d+\.\d{2}/);

return price[0] }, vars);
  });

});
