// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BM - Place order Backend + Email - CC"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { checkOrderOnMyAccount, exitTestProdSite, extractUserFromEmail, fillCC, fillCheckout, loginAdmin } from '../helpers/bm-common-steps';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';

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

test.describe('BM - Place order Backend + Email - CC', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "site": "https://bowlersmart-com-preprod.go-vip.net/",
    "project": "bowlers",
    "stateComplete": "Florida",
    "country": "US",
    "zipCode": "33126",
    "countryComplete": "United States (US)",
    "phone": "+12016299320",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Shipping Inc.",
    "street3": "30 Leicester Square",
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
    "state": "FL",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('02 - Place order - CC - 01 - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTestProdSite(page, vars);
    // ↓ 04 - Variable Product Page - 2
    await page.goto(`${vars.startUrl ?? ''}product/epic-lil-dennys-carbon-blue-silver-rental-style-youth-bowling-shoes/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    vars.size = ((await page.locator(`#pa_unisex-shoe-sizing option[selected="selected"]`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).first().fill(`yes-add-365-warranty-coverage-1`); } catch { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).first().selectOption(`yes-add-365-warranty-coverage-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      vars.warranty = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector<HTMLOptionElement>("option[value='yes-add-365-warranty-coverage-1']").textContent
let warrantyMatch = text.match(/\$\d*\.?\d+/);
let warranty = warrantyMatch ? warrantyMatch[0] : "";
return warranty }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) > input[type="checkbox"].wc-pao-addon-checkbox`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      vars.conditioner = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) .wc-pao-addon-price .woocommerce-Price-amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) > input[type="checkbox"].wc-pao-addon-checkbox`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      vars.fresheners  = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) .wc-pao-addon-price .woocommerce-Price-amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLSelectElement>('div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field')

return element != null }, vars)) {
      await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLSelectElement>('div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field`).first().fill(`small-1`); } catch { await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field`).first().selectOption(`small-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLSelectElement>('div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field')

return element != null }, vars)) {
      vars.shirt = `Small`;
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-info.summary > div > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.product-info.summary > div > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > ins > span > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > span > bdi`)).textContent()) ?? '').trim();
    vars.subtotalProduct = ((await page.locator(`div#product-addons-total dd:nth-of-type(2) span.amount`).or(page.locator(`.product-addon-totals .wc-pao-subtotal-line .price .amount`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').trim())
let warranty = parseFloat(`${vars.warranty}`.replace('$','').trim()) || 0;
let conditioner = parseFloat(`${vars.conditioner}`.replace('$','').trim()) || 0;
let fresheners = parseFloat(`${vars.fresheners}`.replace('$','').trim()) || 0;
let subtotalProduct = parseFloat(`${vars.subtotalProduct}`.replace('$','').trim())
let subtotal2 = unitPrice + warranty + conditioner + fresheners
subtotal2 = Number(subtotal2.toFixed(2))

return subtotalProduct === subtotal2;
 }, vars)).toBeTruthy();
    // ↑ end 04 - Variable Product Page - 2
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/checkout/"].button.checkout`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll("’","'")

return prod_desc }, vars);
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.size ?? ''}  × 1
Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Money Saving Options:

Add KR Strikeforce Pure Slide Conditioner

Money Saving Options:

Add 3G Shoe Fresheners

FREE Gift with Purchase!:

${vars.shirt ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); (function ($) {
  'use strict';

  let submitCount = 0;

  // When the form submits
  $('form.checkout').on('submit', function (e) {
    submitCount++;
    console.log('checkout_form_submitted #' + submitCount);

    // Create or update a debug div
    let debugDiv = $('#debug-info');
    if (!debugDiv.length) {
      $('body').prepend('<div id="debug-info" style="position:fixed;top:0;left:0;background:red;color:white;z-index:9999;padding:10px;"></div>');
      debugDiv = $('#debug-info');
    }
    debugDiv.append(
      `Submit #${submitCount} at ${new Date().toISOString()}<br>Stack: ${new Error().stack}<br><br>`
    );

    // Disable the button after first submit
    const btn = $('#place_order');
    if (submitCount === 1 && btn.length) {
      btn.prop('disabled', true).addClass('disabled');
      console.log('place_order disabled after first submit');
    }
  });

  // Log clicks
  $('#place_order').on('click', function () {
    console.log('place_order_clicked');
  });

  // If checkout fails, Woo fires `checkout_error` → re-enable the button
  $(document.body).on('checkout_error', function () {
    $('#place_order').prop('disabled', false).removeClass('disabled');
    console.log('place_order re-enabled after checkout_error');
  });

})(jQuery);
 }, vars);
    await fillCheckout(page, vars);
    vars.shippingProtection = ((await page.locator(`tr.fee > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
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
    await fillCC(page, vars);
    await blockUI(page, vars);
    await placeOrderElement(page, vars);
    await page.waitForTimeout(60000);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await checkOrderOnMyAccount(page, vars);
  });

  test('02 - Place order - CC - 02 - Email', async ({ page }) => {
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

  test('02 - Place order - CC - 03 - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTestProdSite(page, vars);
    await loginAdmin(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a/strong[contains(text(), '${vars.orderNumber ?? ''}')]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Card`);
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
