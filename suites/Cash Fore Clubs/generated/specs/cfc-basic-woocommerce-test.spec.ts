// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "CFC - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail, scrollFullPage, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';

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

test.describe('CFC - Basic WooCommerce Test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "site": "https://cashforeclubs-staging.mystagingwebsite.com/",
    "project": "cashForeClub",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "£",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
  });

  test('02 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.full-width > a.cg-menu-link.main-menu-link`).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All clubs")]`).or(page.locator(`a[href="/shop/"].cg-menu-link > span`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - My Quotes', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`xpath=//span[contains(text(), "Selling")]`).or(page.locator(`.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.visible > a.cg-menu-link.main-menu-link > span`)).first().hover();
    await page.locator(`a[href*="/quotes/"] > span`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('04 - Clothing page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Clothing")]`).first().hover();
    await page.locator(`a[href*="/clothing/"] > span`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - Shoes page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Shoes")]`).or(page.locator(`a[href*="/shoes/"] > span`)).filter({ visible: true }).first().click({ force: true });
  });

  test('06 - Build Your Bag', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Build Your Bag")]`).or(page.locator(`a[href*="/build-your-bag/"] > span`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`blockquote.tiktok-embed`).first()).toBeVisible();
    await scrollFullPage(page, vars);
  });

  test('07 - How it Works', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}how-it-works/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('08 - Condition Guide', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}condition-guide/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('09 - Blogs', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}blogs/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('10 - Learn to play golf', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}learn-to-play-golf/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('11 - Disclaimers & T&Cs', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}disclaimers-tcs/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('12 - Our Store', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}our-store/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('13 - Trade in days', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}trade-in-days/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('14 - Corporate', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}corporate/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('15 - Contact - Submit form', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}contact/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    try { await page.locator(`#input_7_4`).first().fill(`QA Test`); } catch { await page.locator(`#input_7_4`).first().selectOption(`QA Test`); }
    vars.username = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
    try { await page.locator(`#input_7_2`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#input_7_2`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`#input_7_5`).first().fill(`2342342345`); } catch { await page.locator(`#input_7_5`).first().selectOption(`2342342345`); }
    {
      const _lbl = page.locator(`label[for="input_7_6"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_7_6`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_7_6`).first().fill(`Build your bag`); } catch { await page.locator(`#input_7_6`).first().selectOption(`Build your bag`); }
    try { await page.locator(`#input_7_3`).first().fill(`Testing message`); } catch { await page.locator(`#input_7_3`).first().selectOption(`Testing message`); }
    {
      const _lbl = page.locator(`label[for="gform_submit_button_7"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_7`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`h1.elementor-size-default`).first()).toContainText(`Thank you!`);
    await expect(page.locator(`.elementor-element.elementor-element-20b6db6 > .elementor-widget-container > p:nth-of-type(1)`).first()).toContainText(`Thank you for getting in touch. We have received your inquiry and will get back to you asap.`);
    await expect(page.locator(`.elementor-widget-container > p:nth-of-type(2)`).first()).toContainText(`in the meantime, why not see if you can find your perfect club?`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Thanks for reaching out")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#content`).first()).toHaveText(`Hi QA Test,

Thank you for getting in touch. We have received your inquiry and will get back to you asap.

Thanks,

CashFore Clubs`);
    await page.goBack();
    await page.goBack();
  });

  test('15 - Contact page', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}contact/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('16 - Sale', async ({ page }) => {
    await page.goto(`${vars.site ?? ''}sale/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('17 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Shop page
    await page.locator(`.full-width > a.cg-menu-link.main-menu-link`).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All clubs")]`).or(page.locator(`a[href="/shop/"].cg-menu-link > span`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`ul.products > li.product-type-simple.instock`).filter({ visible: true }).first().click({ force: true });
  });

  test('18 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await uRLOfCurrentPage(page, vars);
    // ↓ 17 - Product page
    // ↓ 02 - Shop page
    await page.locator(`.full-width > a.cg-menu-link.main-menu-link`).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All clubs")]`).or(page.locator(`a[href="/shop/"].cg-menu-link > span`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`ul.products > li.product-type-simple.instock`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 17 - Product page
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.shoptimizer-primary-navigation > nav[aria-label="Cart contents"].site-header-cart.menu > .shoptimizer-cart > a[href="#"][title="View your shopping cart"].cart-contents > .amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`li.woocommerce-mini-cart-item.mini_cart_item > a:nth-child(2)`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    await page.locator(`.woocommerce-mini-cart__buttons > a[href*="/basket/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Calculate shipping")]`).or(page.locator(`form[action*="/basket/"] > a[href="#"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#calc_shipping_postcode`).first().fill(`E1 6AN`); } catch { await page.locator(`#calc_shipping_postcode`).first().selectOption(`E1 6AN`); }
    try { await page.locator(`#calc_shipping_city`).first().fill(`London`); } catch { await page.locator(`#calc_shipping_city`).first().selectOption(`London`); }
    {
      const _lbl = page.locator(`label[for="select2-calc_shipping_state-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-calc_shipping_state-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().fill(`Greater London`); } catch { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().selectOption(`Greater London`); }
    await page.locator(`xpath=//li[contains(text(), "Greater London")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button[name="calc_shipping"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.cart_item .product-name > a`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) .woocommerce-Price-amount.amount`).or(page.locator(`ul#shipping_method > li:nth-child(1) > label`)).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const shippingPrice = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

let total2 = subtotal + shippingPrice

total2 = Number(total2.toFixed(2));
const expectedTotal = Number(total.toFixed(2));

return price === subtotal 
        && total2 === expectedTotal }, vars)).toBeTruthy();
  });

  test('19 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await uRLOfCurrentPage(page, vars);
    // ↓ 17 - Product page
    // ↓ 02 - Shop page
    await page.locator(`.full-width > a.cg-menu-link.main-menu-link`).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All clubs")]`).or(page.locator(`a[href="/shop/"].cg-menu-link > span`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`ul.products > li.product-type-simple.instock`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 17 - Product page
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.summary > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(500);
    await page.locator(`.woocommerce-mini-cart__buttons > a[href*="/basket/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.checkout-button.button.alt.wc-forward`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`.cg-checkout-table-product-name`).first()).toHaveText(`${vars.prodDesc ?? ''}  × 1`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForTimeout(1000);
    await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing Postcode is a required field.
Billing Phone is a required field.
Billing Email address is a required field.
Please read and accept the terms and conditions to proceed with your order.
No shipping method has been selected. Please double check your address, or contact us if you need any help.`);
    await page.reload();
    await page.waitForLoadState('load');
    await blockUI(page, vars);
  });

  test('20 - Login and My Account links', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/my-account/"] > .icon-wrapper > svg.w-6.h-6`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#username`).first().fill(`qa+gi_staging_user@saucal.com`); } catch { await page.locator(`#username`).first().selectOption(`qa+gi_staging_user@saucal.com`); }
    try { await page.locator(`#password`).first().fill(`xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS`); } catch { await page.locator(`#password`).first().selectOption(`xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS`); }
    await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`p:nth-of-type(1) > strong:nth-of-type(1)`).first()).toContainText(`Maintenance Customer`);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-info`).first()).toContainText(`No order has been made yet.`);
    await page.locator(`xpath=//a[contains(text(), "Gift Card Balance")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--pw-gift-card-balance > a[href*="/my-account/"]`)).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--store-credit > a[href*="/my-account/store-credit/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Account Funds")]`).or(page.locator(`a[href*="/my-account/account-funds/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-account-funds > p`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-column1`)).not.toHaveCount(0);
    await expect(page.locator(`.u-column2`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`ul > li.woocommerce-MyAccount-navigation-link:nth-child(1) > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`p:nth-of-type(1) > a[href*="/my-account/customer-logout/?_wpnonce="]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`)).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`xpath=//a[contains(text(), "log out")]`).or(page.locator(`a[href*="/wp-login.php?action=logout"]`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try { await page.locator(`#username`).first().fill(`qa+gi_staging_user@saucal.com`); } catch { await page.locator(`#username`).first().selectOption(`qa+gi_staging_user@saucal.com`); }
    try { await page.locator(`#password`).first().fill(`xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS`); } catch { await page.locator(`#password`).first().selectOption(`xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS`); }
    await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`p:nth-of-type(1) > strong:nth-of-type(1)`).first()).toContainText(`Maintenance Customer`);
  });

  test('21 - Searching page + pagination', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    {
      const _lbl = page.locator(`label[for="woocommerce-product-search-field-0"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#woocommerce-product-search-field-0`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#woocommerce-product-search-field-0`).first().fill(`callaway`); } catch { await page.locator(`#woocommerce-product-search-field-0`).first().selectOption(`callaway`); }
    await page.locator(`xpath=//a[contains(text(), "View all results (255)")]`).or(page.locator(`a[href*="/?s=callaway"]`)).or(page.locator(`a[href*="/?cgkit_search_word=callaway"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce.columns-3`)).not.toHaveCount(0);
    await page.locator(`.woocommerce > .shoptimizer-sorting > nav[aria-label="Product Pagination"].woocommerce-pagination > .page-numbers > li:nth-of-type(2) > a[href*="?paged=2&s=callaway"][aria-label="Page 2"].page-numbers`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce.columns-3`)).not.toHaveCount(0);
  });

});
