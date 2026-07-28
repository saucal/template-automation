// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "AU - Subscription Test - Cancel/Reactivate/Change Schedule"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI } from '../helpers/common-steps-for-all-projects';
import { adminLoginSkip2FA, login, uncheckShippingAddressCheckbox } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('AU - Subscription Test - Cancel/Reactivate/Change Schedule', () => {

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
    "password": process.env.PASSWORD ?? '',
    "currency": "AUD",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "city": "Sydney",
    "stateComplete": "New South Wales",
    "zipCode": "2000",
    "phone": "+61412345678",
    "street3": "123 False Shipping",
    "countryComplete": "Australia",
    "Symbol": "$",
    "project": "nopong",
    "country": "AU",
    "state": "NSW",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('21 - AU - Subscription test', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`ul > li.menu-item.menu-item-type-post_type.menu-item-object-page > a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
    (document.readyState) || reject("Can't resolve document readystate");
    let listener;
    (/^c/).test(document.readyState) ? resolve(true) : document.addEventListener("load", listener = event => {
      document.removeEventListener("load", listener);
      resolve(true);
    });
}) }, vars);
    vars.email = `qa+gi_subs_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.qty = `2`;
    vars.username = `${vars.email ?? ''}`;
    vars.password = `fric2171Biot`;
    vars.productPrice = ((await page.locator(`li:nth-child(1) > div.wc-block-grid__product-price.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.fee = ((await page.locator(`li:nth-of-type(1) > .price > span .woocommerce-Price-amount`).textContent()) ?? '').trim();
    await page.locator(`a[href*="?add-to-cart=1270"]`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`h1.entry-title > em`).first()).toHaveText(`Cart`);
    try { await page.locator(`input[aria-label="Product quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[aria-label="Product quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`td.product-name`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`div.woocommerce > form > div.nopong-wc-table-wrapper > table > tbody > tr.woocommerce-cart-form__cart-item.cart_item > td.product-name`).textContent()) ?? '').trim();
    vars.discount = ((await page.locator(`tr:nth-of-type(2) > td > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subProdPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.productPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const discount = parseFloat(`${vars.discount}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

const qty = vars.qty;
let subProdPrice = (price * qty)-discount


return `${vars.Symbol}`+subProdPrice.toFixed(2)
  }, vars);
    vars.fee = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let fee = parseFloat(`${vars.fee}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

const qty = vars.qty;
fee = fee * qty


return `${vars.Symbol}`+fee.toFixed(2) }, vars);
    await expect(page.locator(`td.product-subtotal > span.subscription-price >span>bdi`).first()).toHaveText(`${vars.subProdPrice ?? ''}`);
    try {
      await expect(page.locator(`td.product-subtotal span.subscription-details > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.fee ?? ''}`);
    } catch { /* optional step: assertText */ }
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = `${vars.subProdPrice}`
let fee = `${vars.fee}`
price = parseFloat(price.replace("$",""))
fee = parseFloat(fee.replace("$",""))
let subtotal = price+fee

return "$"+subtotal }, vars);
    await expect(page.locator(`tbody > tr.cart-subtotal:nth-child(1) > td > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tbody > tr.order-total > td > strong > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`table > tbody > tr.order-total.recurring-total > td > strong > span`).first()).toHaveText(`${vars.subProdPrice ?? ''}`);
    await expect(page.locator(`a[href*="/check-out/"].checkout-button`).first()).toHaveText(`PROCEED TO CHECKOUT`);
    await page.locator(`a[href*="/check-out/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div:nth-child(1) > table > tfoot > tr.order-total.recurring-total > td > strong > span`).first()).toHaveText(`${vars.subProdPrice ?? ''}`);
    await expect(page.locator(`#customer_details > div:nth-of-type(1) > div:nth-of-type(1) > h3`).first()).toHaveText(`Billing details`);
    await expect(page.locator(`td.product-name`).first()).toBeVisible();
    await uncheckShippingAddressCheckbox(page, vars);
    try { await page.locator(`#billing_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`#billing_first_name`).first().fill(`Test`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`Test`); }
    try { await page.locator(`#billing_last_name`).first().fill(`Subscription`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`Subscription`); }
    {
      const _lbl = page.locator(`label[for="select2-billing_country-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-billing_country-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="select2-billing_country-result-uct4-AU"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//li[contains(text(), "Australia")]`).or(page.locator(`#select2-billing_country-result-uct4-AU`)).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#billing_address_1`).first().fill(`92 Tapleys Hill Road`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`92 Tapleys Hill Road`); }
    try { await page.locator(`#billing_city`).first().fill(`Brahma Lodge`); } catch { await page.locator(`#billing_city`).first().selectOption(`Brahma Lodge`); }
    {
      const _lbl = page.locator(`label[for="select2-billing_state-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-billing_state-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="suggestion_0"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//li[contains(text(), "South Australia")]`).or(page.locator(`#suggestion_0`)).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#billing_postcode`).first().fill(`5109`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`5109`); }
    try { await page.locator(`#billing_phone`).first().fill(`+61412345678`); } catch { await page.locator(`#billing_phone`).first().selectOption(`+61412345678`); }
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`01 / 27`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`01 / 27`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    await blockUI(page, vars);
    await expect(page.locator(`td.product-total > span.subscription-price >span>bdi`).first()).toHaveText(`${vars.subProdPrice ?? ''}`);
    try {
      await expect(page.locator(`td.product-total > span > span > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.fee ?? ''}`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`div:nth-child(1) > table > tfoot > tr:nth-child(1) > td > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    vars.shippingPrice = ((await page.locator(`#shipping_method > li:nth-of-type(1) > label`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.order-total:not(.recurring-total) small.includes_tax > span`).textContent()) ?? '').trim();
    vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = `${vars.shippingPrice}`
if (text.includes("Regular")) {
    return text
} else {
    const regex = /\$([0-9]+\.[0-9]{2})/;
    const match = text.match(regex);
    return match[0];
} }, vars);
    vars.total = ((await page.locator(`div:nth-child(1) > table > tfoot > tr.order-total:not(.recurring-total) > td > strong > span`).textContent()) ?? '').trim();
    vars.recurringTotal = ((await page.locator(`div:nth-child(1) > table > tfoot > tr.order-total.recurring-total > td > strong > span`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotal}`;
let shipping = `${vars.shippingPrice}`;
let total = `${vars.total}`;

if (shipping.includes("Regular")){
    shipping = "0.00";
};

unit = unit.replace(",","");
shipping = shipping.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit+shipping;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subProdPrice}`;
let shipping = `${vars.shippingPrice}`;
let total = `${vars.recurringTotal}`;

if (shipping.includes("Regular")){
    shipping = "0.00";
};

unit = unit.replace(",","");
shipping = shipping.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit+shipping;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
    await expect(page.locator(`#place_order`).first()).toHaveText(`Join the Club`);
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Join the Club")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-notice`)).not.toHaveCount(0);
    await expect(page.locator(`.woocommerce-thankyou-order-details > .order`)).not.toHaveCount(0);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`a[href*="/product/"]`).or(page.locator(`td.woocommerce-table__product-name`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr:nth-of-type(2) > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
    await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
    await expect(page.locator(`.woocommerce-order-details > h2:nth-of-type(2)`).first()).toContainText(`Related subscriptions`);
    vars.subscriptionId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let order = vars.orderNumber
let subscription = order+1
return subscription }, vars);
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/ca/my-account/view-subscription/${vars.subscriptionId ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`My Account`);
    vars.url = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href;
return url; }, vars);
    vars.subscriptionId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let b = window.location.pathname
//vars.url
let subId = b.split('/').slice(1);
return subId[2];
 }, vars);
    vars.adminUrl = `${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.subscriptionId ?? ''}&action=edit`;
    try {
      await expect(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--subscriptions.is-active > a`).first()).toHaveText(`My Subscription`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`tbody > tr:nth-of-type(4) > td:nth-of-type(1)`).first()).toHaveText(`Next payment date`);
    await expect(page.locator(`.woocommerce-MyAccount-content > h2:nth-of-type(1)`).first()).toContainText(`Actions`);
    await expect(page.locator(`div.nopong-wc-table-wrapper.subscription-actions > table > tbody > tr > td:nth-child(2) > a.button.cancel`).first()).toHaveText(`Cancel Subscription`);
    await expect(page.locator(`div.nopong-wc-table-wrapper.subscription-actions > table > tbody > tr > td:nth-child(2) > a.button.change_schedule`).first()).toHaveText(`Change Billing Schedule`);
    await page.locator(`a[href="#"].button.add_product`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#npSubsAddProduct`).first()).toHaveText(`Add product`);
    // skipped: select-open click on 'select[name="product_id"]' — use selectOption instead
    try { await page.locator(`select[name="product_id"]`).first().fill(`95825`); } catch { await page.locator(`select[name="product_id"]`).first().selectOption(`95825`); }
    {
      const _lbl = page.locator(`label[for="btn-ok"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Add")]`).or(page.locator(`#btn-ok`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`table.shop_table.shop_table_responsive > tbody > tr:nth-of-type(2) > td:nth-of-type(2)`).first()).toHaveText(`No Pong Bicarb Free Monthly Club`);
    await expect(page.locator(`button[name="update_temp_subs"]`).first()).toHaveText(`Update totals`);
    vars.prod1 = ((await page.locator(`tr:nth-child(1) > td:nth-child(5) > span.subscription-price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.prod2 = ((await page.locator(`tr:nth-child(2) > td:nth-child(5) > span.subscription-price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    await expect(page.locator(`button[name="save_subs"]`).first()).toHaveText(`Save Subscription`);
    await page.locator(`xpath=//button[contains(text(), "Update totals")]`).or(page.locator(`button[name="update_temp_subs"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "Save Subscription")]`).or(page.locator(`button[name="save_subs"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner.is-success`).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`SUBSCRIPTION UPDATED SUCCESSFULLY.`);
    vars.newSubtotal = ((await page.locator(`table.shop_table.order_details tfoot > tr:nth-of-type(1) > td > span`).textContent()) ?? '').trim();
    await expect(page.locator(`table.shop_table.order_details tfoot > tr:nth-of-type(2) > td > span`).or(page.locator(`table.shop_table.order_details tfoot > tr:nth-of-type(2) > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    vars.newTotal = ((await page.locator(`table.shop_table.order_details tfoot > tr:nth-of-type(3) > td > span`).textContent()) ?? '').trim();
    try {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price1 = `${vars.prod1}`
let price2 = `${vars.prod2}`
let subtotal = `${vars.newSubtotal}`
let shipping = `${vars.shippingPrice}`

if (shipping === 'Regular') {
    shipping = "0.00"
}
let total = `${vars.newTotal}`

price1 = parseFloat(price1.replace("$",""))
price2 = parseFloat(price2.replace("$",""))
subtotal = parseFloat(subtotal.replace("$",""))
shipping = parseFloat(shipping.replace("$",""))
total = parseFloat(total.replace("$",""))

let subtotal2 = (price1+price2).toFixed(2)
let total2 = (price1+price2+shipping).toFixed(2)


return (total == total2) && (subtotal == subtotal2)
 }, vars)).toBeTruthy();
    } catch { /* optional step: assertEval */ }
    await page.locator(`a.button.cancel`).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`xpath=//a[contains(text(), "Cancel Subscription")]`).or(page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionId ?? ''}/?subscription_id=2385762&change_subscription_to=cancelled"]`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await expect(page.locator(`.wc-block-components-notice-banner.is-success`).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`YOUR SUBSCRIPTION HAS BEEN CANCELLED.`);
    await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toHaveText(`Pending Cancellation`);
    try {
      await expect(page.locator(`a[href*="/my-account/?resubscribe="]`).first()).toHaveText(`RESUBSCRIBE`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`td:nth-child(2) > a`).first()).toHaveText(`REACTIVATE`);
  });

  test('22 - AU - Admin Activate subscription', async ({ page }) => {
    await page.goto(`/wp-admin/index.php`);
    await page.waitForLoadState('load');

    await adminLoginSkip2FA(page, vars);
    await page.goto(`${vars.adminUrl ?? ''}/post.php?post=${vars.subscriptionId ?? ''}&action=edit`);
    await page.waitForLoadState('load');
    try {
      await expect(page.locator(`#order_data > h2`).first()).toContainText(`Subscription #${vars.subscriptionId ?? ''} details`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Pending Cancellation`);
    {
      const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "On hold")]`).or(page.locator(`#select2-order_status-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="select2-order_status-result-uaol-wc-active"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//li[contains(text(), "Active")]`).or(page.locator(`#select2-order_status-result-uaol-wc-active`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`#message.updated.notice.notice-success.is-dismissible > p`).first()).toHaveText(`Subscription updated.`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Active`);
  });

  test('23 - AU - Reactivation verification', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    vars.pass = `fric2171Biot`;
    await login(page, vars);
    try {
      await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`a[href*="/my-account/view-subscription/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > h3`).first()).toHaveText(`Subscription #${vars.subscriptionId ?? ''}`);
    await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
  });

  test('24 - AU - Change Subscription Schedule', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    try {
      await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`xpath=//a[contains(text(), "My Subscription")]`).or(page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionId ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Change Billing Schedule")]`).or(page.locator(`a[href="#"].button.change_schedule`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#npSubsSchedule`).first()).toHaveText(`CHANGE BILLING SCHEDULE`);
    await expect(page.locator(`#btn-sched-ok`).first()).toHaveText(`CHANGE SCHEDULE`);
    // skipped: select-open click on 'select[name="billing_interval"]' — use selectOption instead
    try { await page.locator(`select[name="billing_interval"]`).first().fill(`3`); } catch { await page.locator(`select[name="billing_interval"]`).first().selectOption(`3`); }
    // skipped: select-open click on 'select[name="subscription_period"]' — use selectOption instead
    try { await page.locator(`select[name="subscription_period"]`).first().fill(`week`); } catch { await page.locator(`select[name="subscription_period"]`).first().selectOption(`week`); }
    {
      const _lbl = page.locator(`label[for="btn-sched-ok"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Change Schedule")]`).or(page.locator(`#btn-sched-ok`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.wc-block-components-notice-banner.is-success`).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`BILLING PERIOD CHANGED SUCCESSFULLY ON CURRENT SUBSCRIPTION.`);
    await expect(page.locator(`table.shop_table.order_details > tfoot > tr:nth-of-type(3) > td`).first()).toHaveText(`${vars.newTotal ?? ''} EVERY 3 WEEKS`);
  });

});
