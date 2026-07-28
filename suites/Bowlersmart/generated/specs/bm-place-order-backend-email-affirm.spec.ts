// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BM - Place order Backend + Email - Affirm"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { checkOrderOnMyAccount, exitTestProdSite, extractUserFromEmail, fillCheckout, loginAdmin, selectPayWithAffirm } from '../helpers/bm-common-steps';
import { blockUI } from '../helpers/common-steps-for-all-projects';

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

test.describe('BM - Place order Backend + Email - Affirm', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "site": "https://sheepdog-united-randomly.ngrok-free.app",
    "project": "bowlers",
    "street4": "5th Floor",
    "password": process.env.PASSWORD ?? '',
    "Symbol": "$",
    "password2": process.env.PASSWORD2 ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Test Inc.",
    "street": "30 Leicester Square",
    "street2": "Ap. 4",
    "city": "Miami",
    "stateComplete": "Florida",
    "state": "FL",
    "country": "US",
    "zipCode": "33126",
    "countryComplete": "United States (US)",
    "phone": "+12016299320",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Shipping Inc.",
    "street3": "30 Leicester Square",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('02 - Place order - Affirm - 01 - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTestProdSite(page, vars);
    // ↓ 08 - Checkout page
    vars.qty = `1`;
    // ↓ 04 - Variable Product Page
    // ↓ 02 - Balls by Brand Page
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/shop/bowling-gear/bowling-balls/"][title="Bowling Balls"].nav-top-link`).first().hover();
    await page.locator(`li#tab-by-brand > a`).first().hover();
    await page.locator(`xpath=//span[@class = 'ux-menu-link__text' and contains(text(), 'SWAG')]`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Balls by Brand Page
    await page.locator(`div.product-type-variable.instock a > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.weight = ((await page.locator(`#pa_ball-weight option[selected="selected"]`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-drilling-protection .form-row > select.addon-select`)).first().fill(`yes-covers-cracking-during-ball-drilling-1`); } catch { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-drilling-protection .form-row > select.addon-select`)).first().selectOption(`yes-covers-cracking-during-ball-drilling-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.cracking = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector<HTMLOptionElement>("option[value='yes-covers-cracking-during-ball-drilling-1']").textContent
let crackingMatch = text.match(/\$\d*\.?\d+/);
let cracking = crackingMatch ? crackingMatch[0] : "";
return cracking }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon:nth-of-type(2) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-extra-365-warranty-coverage .form-row > select.addon-select`)).first().fill(`yes-add-365-warranty-coverage-1`); } catch { await page.locator(`div.wc-pao-addon:nth-of-type(2) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-extra-365-warranty-coverage .form-row > select.addon-select`)).first().selectOption(`yes-add-365-warranty-coverage-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.warranty = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector<HTMLOptionElement>("option[value='yes-add-365-warranty-coverage-1']").textContent
let warrantyMatch = text.match(/\$\d*\.?\d+/);
let warranty = warrantyMatch ? warrantyMatch[0] : "";
return warranty }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`input[type="text"].input-text.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-specific-requests input[type="text"].input-text`)).first().fill(`Testing request`); } catch { await page.locator(`input[type="text"].input-text.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-specific-requests input[type="text"].input-text`)).first().selectOption(`Testing request`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) > input[type="checkbox"].wc-pao-addon-checkbox`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(1) input[type="checkbox"]`)).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.cleaner = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) .wc-pao-addon-price .woocommerce-Price-amount`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(1) .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) > input[type="checkbox"].wc-pao-addon-checkbox`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(2) input[type="checkbox"]`)).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.shammy  = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) .wc-pao-addon-price .woocommerce-Price-amount`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(2) .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > ins > span > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > span > bdi`)).textContent()) ?? '').trim();
    vars.subtotalProduct = ((await page.locator(`div#product-addons-total dd:nth-of-type(2) span.amount`).or(page.locator(`.product-addon-totals .wc-pao-subtotal-line .price .amount`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').trim())
let cracking = parseFloat(`${vars.cracking}`.replace('$','').trim()) || 0;
let warranty = parseFloat(`${vars.warranty}`.replace('$','').trim()) || 0;
let cleaner = parseFloat(`${vars.cleaner}`.replace('$','').trim()) || 0;
let shammy = parseFloat(`${vars.shammy}`.replace('$','').trim()) || 0;
let subtotalProduct = parseFloat(`${vars.subtotalProduct}`.replace('$','').trim())
let subtotal2 = unitPrice + cracking + warranty + cleaner + shammy
subtotal2 = Number(subtotal2.toFixed(2))

return subtotalProduct === subtotal2;
 }, vars)).toBeTruthy();
    // ↑ end 04 - Variable Product Page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#cart-popup a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''} - ${vars.weight ?? ''}`);
    await expect(page.locator(`dl.variation`).first()).toHaveText(`Drilling Protection:

Yes - Covers Cracking During Ball Drilling

Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Specific Requests:

Testing request

Money Saving Options:

Add Max Tack Ball Cleaner 8oz.

Money Saving Options:

Add BowlersMart Blue Shammy`);
    await expect(page.locator(`#cart-popup .quantity > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await expect(page.locator(`#cart-popup .woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await page.locator(`a[href*="/checkout/"].button.checkout`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.weight ?? ''}  × 1`);
    await expect(page.locator(`dl.variation`).first()).toHaveText(`Drilling Protection:

Yes - Covers Cracking During Ball Drilling

Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Specific Requests:

Testing request

Money Saving Options:

Add Max Tack Ball Cleaner 8oz.

Money Saving Options:

Add BowlersMart Blue Shammy`);
    await page.locator(`.create-account > label > input[type="checkbox"].input-checkbox`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await page.locator(`.create-account > label > input[type="checkbox"].input-checkbox`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await expect(page.locator(`label[for="shipping_method_0_free_shipping1"]`).first()).toContainText(`FREE Standard Shipping`);
    vars.shippingProtection = ((await page.locator(`tr.fee > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#order_review > div.optional_fee_container > table > tbody > tr > td > p > span`)).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotalProduct = parseFloat(`${vars.subtotalProduct}`.replace('$','').trim())
let shippingProtection

if (`${vars.shippingProtection}` === '') {
    shippingProtection = 0
} else {
    shippingProtection  = parseFloat(`${vars.shippingProtection}`.replace('$','').trim())
}

let tax = parseFloat(`${vars.taxPrice}`.replace('$','').trim())
let total = parseFloat(`${vars.total}`.replace('$','').trim())

let total2 = subtotalProduct + shippingProtection + tax
total2 = Number(total2.toFixed(2))

return total === total2 }, vars)).toBeTruthy();
    // ↑ end 08 - Checkout page
    await fillCheckout(page, vars);
    await selectPayWithAffirm(page, vars);
    await page.waitForLoadState('load');
    await checkOrderOnMyAccount(page, vars);
  });

  test('02 - Place order - Affirm - 02 - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTestProdSite(page, vars);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your BowlersMart Order #${vars.orderNumber ?? ''} is Confirmed")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="${vars.startUrl ?? ''}product/"]`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.weight ?? ''}`);
    await expect(page.locator(`td:nth-of-type(3) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    if (false) {
      await expect(page.locator(`li:nth-of-type(1) > p`).first()).toContainText(`${vars.weight ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`li:nth-of-type(2) > strong.wc-item-meta-label`).first()).toContainText(`Drilling Protection (${vars.cracking ?? ''}):`);
    }
    if (false) {
      await expect(page.locator(`li:nth-of-type(3) > strong.wc-item-meta-label`).first()).toContainText(`Extra 365 Warranty Coverage (${vars.warranty ?? ''}):`);
    }
    if (false) {
      await expect(page.locator(`li:nth-of-type(4) > p`).first()).toContainText(`Testing request`);
    }
    if (false) {
      await expect(page.locator(`li:nth-of-type(5) > strong.wc-item-meta-label`).first()).toContainText(`Money Saving Options (${vars.cleaner ?? ''}):`);
    }
    if (false) {
      await expect(page.locator(`li:nth-of-type(6) > strong.wc-item-meta-label`).first()).toContainText(`Money Saving Options (${vars.shammy ?? ''}):`);
    }
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toContainText(`FREE`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingProtection ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(6) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(7) > td`).first()).toContainText(`Note: Test order note`);
    await expect(page.locator(`table:nth-of-type(2) > tbody > tr > td:nth-of-type(1) > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
    await expect(page.locator(`table:nth-of-type(2) > tbody > tr > td:nth-of-type(1) > p:nth-of-type(2)`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`table:nth-of-type(2) > tbody > tr > td:nth-of-type(1) > p:nth-of-type(3)`).first()).toContainText(`${vars.email ?? ''}`);
    if (false) {
      await expect(page.locator(`table:nth-of-type(2) > tbody > tr > td:nth-of-type(2) > p`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
    }
    await expect(page.locator(`table:nth-of-type(2) > tbody > tr > td:nth-of-type(2) > p`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  });

  test('02 - Place order - Affirm - 03 - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTestProdSite(page, vars);
    await loginAdmin(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a/strong[contains(text(), '${vars.orderNumber ?? ''}')]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
    if (false) {
      await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    }
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`.order_note`).first()).toHaveText(`Customer provided note:
Test order note`);
    await expect(page.locator(`td > a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.weight ?? ''}`);
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    if (false) {
      await expect(page.locator(`tr.item > td.name > .view > table.display_meta > tbody`).first()).toHaveText(`Ball Weight:	

${vars.weight ?? ''}


Drilling Protection (${vars.cracking ?? ''}):	

Yes - Covers Cracking During Ball Drilling


Extra 365 Warranty Coverage (${vars.warranty ?? ''}):	

Yes - Add 365 Warranty Coverage


Specific Requests:	

Testing request


Money Saving Options (${vars.cleaner ?? ''}):	

Add Max Tack Ball Cleaner 8oz.


Money Saving Options (${vars.shammy ?? ''}):	

Add BowlersMart Blue Shammy`);
    }
    await expect(page.locator(`tr.fee > td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingProtection ?? ''}`);
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingProtection ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''} USD`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''} USD`);
  });

});
