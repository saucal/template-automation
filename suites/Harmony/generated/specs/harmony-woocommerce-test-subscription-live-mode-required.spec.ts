// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Harmony - WooCommerce Test - Subscription Live Mode required"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, login, placeOrderElement, uRLOfCurrentPage, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { currencyChecker } from '../helpers/harmony-common-steps-for-suites';

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

test.describe('Harmony - WooCommerce Test - Subscription Live Mode required', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "adminPass": process.env.ADMIN_PASS ?? '',
    "month": "12",
    "country": "CA",
    "cc": "4242424242424242",
    "adminUser": "christian@saucal.com",
    "firstName": "QA_CA",
    "year": "25",
    "street": "123 False Street",
    "cvv": "123",
    "state": "ON",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "city": "Ottawa",
    "company": `Testing ${Math.random().toString(36).substring(2, 10)}`,
    "CCEmail": "qa+ccemail@saucal.com",
    "zipCode": "K1S 3V6",
    "stateComplete": "Ontario",
    "phone": "3254564567",
    "project": "harmony",
    "Symbol": "C$",
    "site": "https://staging-harmonyk.kinsta.cloud/",
    "countryComplete": "Canada",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('05 - Place order - 05 - New User - Managed Woo Yearly', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await uRLOfCurrentPage(page, vars);
    vars.url = `${vars.site ?? ''}`;
    vars.subscription = `yes`;
    vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    await page.goto(`${vars.url ?? ''}product/managed-woocommerce/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#plan`).first().fill(`Launch`); } catch { await page.locator(`#plan`).first().selectOption(`Launch`); }
    {
      const _lbl = page.locator(`label[for="recurrence"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#recurrence`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#recurrence`).first().fill(`Yearly`); } catch { await page.locator(`#recurrence`).first().selectOption(`Yearly`); }
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > span > bdi`).textContent()) ?? '').trim();
    vars.signUpFee = ((await page.locator(`.woocommerce-variation-price > .price > span > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await currencyChecker(page, vars);
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
    vars.{{prod_desc}} = ((await page.locator(`.cart_item .product-name`).textContent()) ?? '').trim();
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-price > .subscription-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.signUpFee ?? ''}`);
    await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.subscription-price > .subscription-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.signUpFee ?? ''}`);
    vars.subtotalPrice = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let signup = `${vars.signUpFee}`;
let subtotal = `${vars.subtotalPrice}`;

unit = unit.replace(",","");
signup = signup.replace(",","");
subtotal = subtotal.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
signup = Number(signup.replace(`${vars.Symbol}`,""));
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));

let subtotal2 = unit+signup;
subtotal2 = Number(subtotal2.toFixed(2));

return subtotal === subtotal2 }, vars)).toBeTruthy();
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await currencyChecker(page, vars);
    await wooCommerceCheckoutTemplate(page, vars);
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.subscription-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.signUpFee ?? ''}`);
    await expect(page.locator(`td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.taxPrice = ((await page.locator(`tr.tax-rate.tax-rate-ca-on-hst-13-1:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let subtotal = `${vars.subtotalPrice}`;
let tax = `${vars.taxPrice}`;
let total = `${vars.total}`;

subtotal = subtotal.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = subtotal+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.taxRenew = ((await page.locator(`tr.tax-rate.tax-rate-ca-on-hst-13-1:nth-of-type(6) > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.totalRenew = ((await page.locator(`tr.order-total:nth-of-type(7) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let taxRenew = `${vars.taxRenew}`;
let totalRenew = `${vars.totalRenew}`;

unit = unit.replace(",","");
taxRenew = taxRenew.replace(",","");
totalRenew = totalRenew.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
taxRenew = Number(taxRenew.replace(`${vars.Symbol}`,""));
totalRenew = Number(totalRenew.replace(`${vars.Symbol}`,""));

let totalRenew2 = unit+taxRenew;
totalRenew2 = Number(totalRenew2.toFixed(2));

return totalRenew === totalRenew2 }, vars)).toBeTruthy();
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`${vars.cc ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`${vars.cc ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`${vars.month ?? ''} / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`${vars.month ?? ''} / ${vars.year ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`${vars.cvv ?? ''}`); }
    try {
      await page.locator(`xpath=//label[contains(text(), "on your own behalf")]`).or(page.locator(`label[for="billing_behalf_company_own"].radio`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    {
      const _lbl = page.locator(`label[for="terms_acceptance"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms_acceptance`).filter({ visible: true }).first().click({ force: true }); }
    }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.woocommerce-table > tfoot:nth-child(3) > tr:nth-child(2) > td:nth-child(2) > span:nth-child(1)`).or(page.locator(`section.woocommerce-order-details > table.woocommerce-table.woocommerce-table--order-details.shop_table.order_details > tfoot:nth-child(4) > tr:nth-child(2) > td > span`)).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`.woocommerce-table > tfoot:nth-child(3) > tr:nth-child(4) > td:nth-child(2) > span:nth-child(1)`).or(page.locator(`section.woocommerce-order-details > table.woocommerce-table.woocommerce-table--order-details.shop_table.order_details > tfoot:nth-child(4) > tr:nth-child(4) > td > span`)).first()).toContainText(`${vars.total ?? ''}`);
    await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    vars.subscriptionID = ((await page.locator(`td.subscription-id > a[href*="/view-subscription/"]`).textContent()) ?? '').trim();
    vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ID = `${vars.subscriptionID}`
ID = ID.replace("#","")
return ID }, vars);
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
    await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  });

  test('11 - Failed renew notification - Step 1', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.admin = ``;
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.locator(`a[href*="/view-subscription/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
    await page.locator(`xpath=//a[contains(text(), "Change payment")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//label[contains(text(), "Use a new payment method")]`).or(page.locator(`label[for="wc-stripe-payment-token-new"]`)).filter({ visible: true }).first().click({ force: true });
    await page.reload();
    await page.waitForLoadState('load');
    await page.locator(`xpath=//label[contains(text(), "Use a new payment method")]`).or(page.locator(`label[for="wc-stripe-payment-token-new"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4000 0000 0000 0341`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4000 0000 0000 0341`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`05 / 26`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`05 / 26`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().selectOption(`${vars.zipCode ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner`)).first()).toContainText(`Payment method updated.`);
    await expect(page.locator(`.subscription-payment-method`).first()).toContainText(`Via Visa card ending in 0341`);
  });

  test('11 - Failed renew notification - Step 2', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.goto(`${vars.site ?? ''}wp-admin/tools.php?page=action-scheduler&status=pending`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    try { await page.locator(`#plugin-search-input`).first().fill(`${vars.subscriptionID ?? ''}`); } catch { await page.locator(`#plugin-search-input`).first().selectOption(`${vars.subscriptionID ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="search-submit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#search-submit`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForLoadState('load');
    await page.locator(`.hook.column-hook.has-row-actions.column-primary`).first().hover();
    await page.locator(`a[href*="row_action=run"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.renewID = ((await page.locator(`div.woocommerce_subscriptions_related_orders tr:first-child > td:first-child`).textContent()) ?? '').trim();
    vars.renewID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let renew = `${vars.renewID}`;
renew = renew.replace("#","");
return renew }, vars);
    await page.goto(`${vars.site ?? ''}wp-admin/tools.php?page=action-scheduler&status=pending&s=${vars.renewID ?? ''}`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    await page.locator(`.hook.column-hook.has-row-actions.column-primary`).first().hover();
    await page.locator(`a[href*="row_action=run"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div#message.updated`).first()).toHaveText(`Successfully executed action: woocommerce_scheduled_subscription_payment_retry`);
    await page.locator(`tr:last-child .hook.column-hook.has-row-actions.column-primary`).first().hover();
    await page.locator(`tr:last-child a[href*="row_action=run"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div#message.updated`).first()).toHaveText(`Successfully executed action: woocommerce_scheduled_subscription_payment_retry`);
    await page.locator(`tr:last-child .hook.column-hook.has-row-actions.column-primary`).first().hover();
    await page.locator(`tr:last-child a[href*="row_action=run"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div#message.updated`).first()).toHaveText(`Successfully executed action: woocommerce_scheduled_subscription_payment_retry`);
    await page.locator(`tr:last-child .hook.column-hook.has-row-actions.column-primary`).first().hover();
    await page.locator(`tr:last-child a[href*="row_action=run"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div#message.updated`).first()).toHaveText(`Successfully executed action: woocommerce_scheduled_subscription_payment_retry`);
    await page.goto(`${vars.site ?? ''}wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit`);
    await page.waitForLoadState('load');
    await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Pending payment`);
    await page.goto(`${vars.site ?? ''}wp-admin/tools.php?page=action-scheduler&status=pending&s=${vars.renewID ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`tr:last-child .hook.column-hook.has-row-actions.column-primary`).first().hover();
    await page.locator(`tr:last-child a[href*="row_action=run"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div#message.updated`).first()).toHaveText(`Successfully executed action: woocommerce_scheduled_subscription_payment_retry`);
    await page.goto(`${vars.site ?? ''}wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit`);
    await page.waitForLoadState('load');
    await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Failed`);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let count = Array.from<any>(document.querySelectorAll<HTMLTableElement>('div#renewal_payment_retries table > tbody > tr')).length
return count === 5 }, vars)).toBeTruthy();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let notes = Array.from<any>(document.querySelectorAll('li > div.note_content > p'))
let count = notes.length
let i = 0;
let boolean = true
while (i < count && boolean === true) {
    boolean = notes[i].textContent.includes( 'Order status changed from Pending payment to Failed.' )
    if (boolean === true) {
        i = i + 3
    }
}

i = 1

while (i < count && boolean === true) {
    boolean = notes[i].textContent.includes('The card was declined.')
    if (boolean === true) {
        i = i + 3
    }
}

i = 2

while (i < count && boolean === true) {
    boolean = notes[i].textContent === 'Retry rule applied: Order status changed from Failed to Pending payment.'
    if (boolean === true) {
        i = i + 3
    }
}

return boolean

 }, vars)).toBeTruthy();
  });

});
