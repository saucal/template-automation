// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Subscription suite to develop and test"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI } from './common-steps-for-all-projects';
import { adminLoginSkip2FA, login } from './no-pong-common-steps-for-project';

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

// GI: "200 - AU - Subscription test (To update)" (64713aaf5bf68ad286220715)
export async function _200AUSubscriptionTestToUpdate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#menu-main-menu  a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
    (document.readyState) || reject("Can't resolve document readystate");
    let listener;
    (/^c/).test(document.readyState) ? resolve(true) : document.addEventListener("load", listener = event => {
      document.removeEventListener("load", listener);
      resolve(true);
    });
}) }, vars);
  vars.email = `qa+gi_subs_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `${vars.email ?? ''}`;
  vars.password = `${vars.password ?? ''}`;
  vars.productPrice = ((await page.locator(`li:nth-child(1) > div.wc-block-grid__product-price.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  vars.fee = ((await page.locator(`li:nth-of-type(1) > .price > span .woocommerce-Price-amount`).textContent()) ?? '').trim();
  await page.locator(`a[href="?add-to-cart=1270"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.site-header-cart a.cart-contents`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title > em`).first()).toHaveText(`Cart`);
  await expect(page.locator(`td.product-name`).first()).toHaveText(`NO PONG ORIGINAL MONTHLY CLUB `);
  vars.prod_desc = ((await page.locator(`div.woocommerce > form > div.nopong-wc-table-wrapper > table > tbody > tr.woocommerce-cart-form__cart-item.cart_item > td.product-name`).textContent()) ?? '').trim();
  await expect(page.locator(`td.product-subtotal > span.subscription-price >span>bdi`).first()).toHaveText(`${vars.productPrice ?? ''}`);
  vars.subtotal = ((await page.locator(`tbody > tr.cart-subtotal:nth-child(1) > td > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.recurrringTotal = ((await page.locator(`table > tbody > tr.order-total.recurring-total > td > strong > span`).textContent()) ?? '').trim();
  await expect(page.locator(`a[href*="/check-out/"].checkout-button`).first()).toHaveText(`PROCEED TO CHECKOUT`);
  await page.locator(`a[href*="/check-out/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`td.product-total > span.subscription-price >span>bdi`).first()).toHaveText(`${vars.productPrice ?? ''}`);
  await expect(page.locator(`td.product-total > span > span > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.fee ?? ''}`);
  await expect(page.locator(`div:nth-child(1) > table > tfoot > tr:nth-child(1) > td > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`div:nth-child(1) > table > tfoot > tr.order-total.recurring-total > td > strong > span`).first()).toHaveText(`${vars.recurrringTotal ?? ''}`);
  vars.shippingPrice = ((await page.locator(`#shipping_method > li:nth-child(1) > label`).textContent()) ?? '').trim();
  await expect(page.locator(`#customer_details > div:nth-of-type(1) > div:nth-of-type(1) > h3`).first()).toHaveText(`Billing details`);
  await expect(page.locator(`td.product-name`).first()).toBeVisible();
  {
    const _lbl = page.locator(`label[for="billing_email"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_email`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#billing_first_name`).first().fill(`Test`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`Test`); }
  {
    const _lbl = page.locator(`label[for="billing_last_name"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_last_name`).filter({ visible: true }).first().click({ force: true }); }
  }
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
  {
    const _lbl = page.locator(`label[for="billing_address_1"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_address_1`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_address_1`).first().fill(`92 Tapleys Hill Road`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`92 Tapleys Hill Road`); }
  {
    const _lbl = page.locator(`label[for="billing_city"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_city`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_city`).first().fill(`Brahma Lodge`); } catch { await page.locator(`#billing_city`).first().selectOption(`Brahma Lodge`); }
  {
    const _lbl = page.locator(`label[for="select2-billing_state-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-billing_state-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="select2-billing_state-result-qgst-SA"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//li[contains(text(), "South Australia")]`).or(page.locator(`#select2-billing_state-result-qgst-SA`)).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="billing_postcode"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_postcode`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_postcode`).first().fill(`5109`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`5109`); }
  {
    const _lbl = page.locator(`label[for="billing_phone"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_phone`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_phone`).first().fill(`084 131 5885`); } catch { await page.locator(`#billing_phone`).first().selectOption(`084 131 5885`); }
  {
    const _lbl = page.locator(`label[for="account_password"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#account_password`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#account_password`).first().fill(`SubscriptionTest1234`); } catch { await page.locator(`#account_password`).first().selectOption(`SubscriptionTest1234`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().selectOption(`4242 4242 4242 4242`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().fill(`01 / 25`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().selectOption(`01 / 25`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
  await expect(page.locator(`td > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
  await expect(page.locator(`#shipping_method > li:nth-of-type(1) > label`).first()).toHaveText(`Regular`);
  await expect(page.locator(`tr.order-total:nth-of-type(7) > th`).first()).toHaveText(`Recurring total`);
  vars.subtotalPrice = ((await page.locator(`div:nth-child(1) > table > tfoot > tr:nth-child(1) > td > span > bdi`).textContent()) ?? '').trim();
  vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = document.querySelector<HTMLTableRowElement>("tr.shipping:nth-child(6) > th:nth-child(1)").innerText
const vect = text.split(" ");
const shipping = vect[2];
return shipping; }, vars);
  vars.total = ((await page.locator(`div:nth-child(1) > table > tfoot > tr.order-total.recurring-total > td > strong > span`).textContent()) ?? '').trim();
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
  await expect(page.locator(`.blockUI > .np-custom-checkout-modal-wrapper.with-background.text-first > .np-custom-checkout-story-wrapper > div.np-custom-checkout-story:nth-of-type(4) > h3`)).not.toHaveCount(0);
  await blockUI(page, vars);
  await expect(page.locator(`.woocommerce-notice`)).not.toHaveCount(0);
  await expect(page.locator(`.woocommerce-thankyou-order-details > .order`)).not.toHaveCount(0);
  await expect(page.locator(`.woocommerce-order-details > h2:nth-of-type(1)`).first()).toContainText(`Order details`);
  await expect(page.locator(`tr:nth-of-type(4) > th`).first()).toContainText(`Total:`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
  await expect(page.locator(`.woocommerce-order-details > h2:nth-of-type(2)`).first()).toContainText(`Related subscriptions`);
  await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/ca/my-account/view-subscription/612462/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`My Account`);
  vars.url = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href;
return url; }, vars);
  vars.subscriptionId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let b = window.location.pathname
//vars.url
let subId = b.split('/').slice(1);
return subId[2];
 }, vars);
  vars.adminUrl = `https://no-pong-au-develop.go-vip.net/wp-admin/post.php?post=${vars.subscriptionId ?? ''}&action=edit`;
  try {
    await expect(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--subscriptions.is-active > a`).first()).toHaveText(`My Subscription`);
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`tbody > tr:nth-of-type(4) > td:nth-of-type(1)`).first()).toHaveText(`Next payment date`);
  await expect(page.locator(`.woocommerce-MyAccount-content > h2:nth-of-type(1)`).first()).toContainText(`Actions`);
  await expect(page.locator(`div.nopong-wc-table-wrapper.subscription-actions > table > tbody > tr > td:nth-child(2) > a.button.cancel`).first()).toHaveText(`Cancel Subscription`);
  await expect(page.locator(`div.nopong-wc-table-wrapper.subscription-actions > table > tbody > tr > td:nth-child(2) > a.button.change_schedule`).first()).toHaveText(`Change Billing Schedule`);
  await expect(page.locator(`a[href="#"].button.add_product`).first()).toHaveText(`Add/Remove Products`);
  await expect(page.locator(`#npSubsAddProduct`).first()).toHaveText(`Add product`);
  // skipped: select-open click on 'select[name="product_id"]' — use selectOption instead
  try { await page.locator(`select[name="product_id"]`).first().fill(`2385515`); } catch { await page.locator(`select[name="product_id"]`).first().selectOption(`2385515`); }
  {
    const _lbl = page.locator(`label[for="btn-ok"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Add")]`).or(page.locator(`#btn-ok`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`table.shop_table.shop_table_responsive > tbody > tr:nth-of-type(2) > td:nth-of-type(2)`).first()).toHaveText(`No Pong - Flower Power Vegan Monthly Club`);
  await expect(page.locator(`button[name="update_temp_subs"]`).first()).toHaveText(`Update totals`);
  vars.prod1 = ((await page.locator(`tr:nth-child(1) > td:nth-child(5) > span.subscription-price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  vars.prod2 = ((await page.locator(`tr:nth-child(2) > td:nth-child(5) > span.subscription-price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  try {
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod1 = `${vars.prod1}`;
let prod2 = `${vars.prod2}`;
let precio1 = prod1.replace('$','');
let precio2 = prod1.replace('$','');
 }, vars);
  } catch { /* optional step: eval */ }
  vars.newTotal = ((await page.locator(`tfoot > tr.cart-subtotal > td > span > bdi`).textContent()) ?? '').trim();
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let sum = vars.precio1+vars.precio2;
return  sum == vars.newTotal; }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  await expect(page.locator(`button[name="save_subs"]`).first()).toHaveText(`Save Subscription`);
  await page.locator(`xpath=//button[contains(text(), "Update totals")]`).or(page.locator(`button[name="update_temp_subs"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//button[contains(text(), "Save Subscription")]`).or(page.locator(`button[name="save_subs"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).first()).toHaveText(`SUBSCRIPTION UPDATED SUCCESSFULLY.`);
  await page.locator(`a.button.cancel`).filter({ visible: true }).first().click({ force: true });
  try {
    await page.locator(`xpath=//a[contains(text(), "Cancel Subscription")]`).or(page.locator(`a[href="/my-account/view-subscription/2385762/?subscription_id=2385762&change_subscription_to=cancelled&_wpnonce=afe7be846d"]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await expect(page.locator(`.woocommerce-message`).first()).toHaveText(`YOUR SUBSCRIPTION HAS BEEN CANCELLED.`);
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toHaveText(`Pending Cancellation`);
  try {
    await expect(page.locator(`a[href*="/my-account/?resubscribe=2385762&_wpnonce=39bc8b4e97"]`).first()).toHaveText(`RESUBSCRIBE`);
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`td:nth-child(2) > a`).first()).toHaveText(`REACTIVATE`);
}

// GI: "201 - AU - 101 - Admin Activate subscription" (64960d7be71b46cb75d44119)
export async function _201AU101AdminActivateSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await adminLoginSkip2FA(page, vars);
  await page.goto(`${vars.adminUrl ?? ''}`);
  await page.waitForLoadState('load');
  try {
    await expect(page.locator(`#order_data > h2`).first()).toContainText(`Subscription #${vars.subscriptionId ?? ''} details`);
  } catch { /* optional step: assertTextPresent */ }
  try {
    await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Pending Cancellation`);
  } catch { /* optional step: assertText */ }
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
    await expect(page.locator(`#message > p`).first()).toHaveText(`Subscription updated.`);
  } catch { /* optional step: assertText */ }
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "202 - AU - Reactivation verification" (649c9946b9a9f4eb2ff424a2)
export async function _202AUReactivationVerification(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(4) > a[href*="/my-account/"] > em`).filter({ visible: true }).first().click({ force: true });
  await login(page, vars);
  await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > h3`).first()).toContainText(`Subscriptions`);
  await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(1) > td.subscription-status.order-status.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-status.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Active`);
}

// GI: "301 - AU - Cancel Subscription" (647a861d6f9af549f8fb444f)
export async function _301AUCancelSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(4) > a[href*="/my-account/"]`).or(page.locator(`#menu-item-2822> a`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`div.u-column1.col-1 > form > p:nth-child(3) > button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "My Subscription")]`).or(page.locator(`a[href*="/my-account/view-subscription/2385762/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > h2:nth-of-type(1)`).first()).toContainText(`Actions`);
  await page.locator(`xpath=//a[contains(text(), "Cancel Subscription")]`).or(page.locator(`a[href="/my-account/view-subscription/2385762/?subscription_id=2385762&change_subscription_to=cancelled&_wpnonce=867c13ecc4"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your subscription has been cancelled.`);
  await expect(page.locator(`a[href="/my-account/view-subscription/2385762/?subscription_id=2385762&change_subscription_to=active&_wpnonce=6c8f169c2f"]`).first()).toContainText(`Reactivate`);
}

// GI: "301 - AU - Cancel Subscription (Copy)" (649d995a82bf299ccbad9148)
export async function _301AUCancelSubscriptionCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(4) > a[href*="/my-account/"]`).or(page.locator(`#menu-item-2822> a`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`div.u-column1.col-1 > form > p:nth-child(3) > button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "My Subscription")]`).or(page.locator(`a[href*="/my-account/view-subscription/2385762/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > h2:nth-of-type(1)`).first()).toContainText(`Actions`);
  await page.locator(`xpath=//a[contains(text(), "Cancel Subscription")]`).or(page.locator(`a[href="/my-account/view-subscription/2385762/?subscription_id=2385762&change_subscription_to=cancelled&_wpnonce=867c13ecc4"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your subscription has been cancelled.`);
  await expect(page.locator(`a[href="/my-account/view-subscription/2385762/?subscription_id=2385762&change_subscription_to=active&_wpnonce=6c8f169c2f"]`).first()).toContainText(`Reactivate`);
}

// GI: "AU - Admin Login - 2FA hardcoded (Copy)" (649d995aca40d9f691b63a19)
export async function aUAdminLogin2FAHardcodedCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a.jetpack-sso-toggle:nth-child(3)`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#user_login`).first().fill(`giAdmin`); } catch { await page.locator(`#user_login`).first().selectOption(`giAdmin`); }
  try { await page.locator(`#user_pass`).first().fill(`fric2171Biot`); } catch { await page.locator(`#user_pass`).first().selectOption(`fric2171Biot`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`label[for="authcode"]`).first()).toHaveText(`Verification Code:`);
  } catch { /* optional step: assertText */ }
  try {
    try { await page.locator(`#authcode`).first().fill(`75979073`); } catch { await page.locator(`#authcode`).first().selectOption(`75979073`); }
  } catch { /* optional step: assign */ }
  try {
    {
      const _lbl = page.locator(`label[for="submit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#submit`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let title = document.querySelector<HTMLFormElement>("#login > form > h1").innerText;
return (title == "Administration email verification");

 }, vars)) {
    await page.locator(`#login > form > div > div.admin-email__actions-secondary > a`).filter({ visible: true }).first().click({ force: true });
  }
  vars.url = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href;
return url; }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return(`${vars.url}` == "https://no-pong-au-develop.go-vip.net/wp-admin/index.php") }, vars)).toBeTruthy();
}

// GI: "AU Subscription" (6435aec3d19bd3b4589bab5e)
export async function aUSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(5) > a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
    (document.readyState) || reject("Can't resolve document readystate");
    let listener;
    (/^c/).test(document.readyState) ? resolve(true) : document.addEventListener("load", listener = event => {
      document.removeEventListener("load", listener);
      resolve(true);
    });
}) }, vars);
  await page.locator(`a[href="?add-to-cart=1270"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title > em`).first()).toContainText(`Cart`);
  await expect(page.locator(`td.product-name`).first()).toContainText(`No Pong Original Monthly Club`);
  await expect(page.locator(`a[href*="/check-out/"].checkout-button`).first()).toContainText(`Proceed to checkout`);
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Checkout`);
  await expect(page.locator(`#customer_details > div:nth-of-type(1) > div:nth-of-type(1) > h3`).first()).toContainText(`Billing details`);
  await expect(page.locator(`td.product-name`)).not.toHaveCount(0);
  {
    const _lbl = page.locator(`label[for="billing_email"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_email`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_email`).first().fill(`${vars.emailReg ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.emailReg ?? ''}`); }
  try { await page.locator(`#billing_first_name`).first().fill(`Test`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`Test`); }
  {
    const _lbl = page.locator(`label[for="billing_last_name"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_last_name`).filter({ visible: true }).first().click({ force: true }); }
  }
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
  {
    const _lbl = page.locator(`label[for="billing_address_1"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_address_1`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_address_1`).first().fill(`92 Tapleys Hill Road`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`92 Tapleys Hill Road`); }
  {
    const _lbl = page.locator(`label[for="billing_city"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_city`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_city`).first().fill(`Brahma Lodge`); } catch { await page.locator(`#billing_city`).first().selectOption(`Brahma Lodge`); }
  {
    const _lbl = page.locator(`label[for="select2-billing_state-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-billing_state-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="select2-billing_state-result-qgst-SA"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//li[contains(text(), "South Australia")]`).or(page.locator(`#select2-billing_state-result-qgst-SA`)).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="billing_postcode"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_postcode`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_postcode`).first().fill(`5109`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`5109`); }
  {
    const _lbl = page.locator(`label[for="billing_phone"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#billing_phone`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_phone`).first().fill(`084 131 5885`); } catch { await page.locator(`#billing_phone`).first().selectOption(`084 131 5885`); }
  {
    const _lbl = page.locator(`label[for="account_password"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#account_password`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`#account_password`).first().fill(`SubscriptionTest1234`); } catch { await page.locator(`#account_password`).first().selectOption(`SubscriptionTest1234`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().selectOption(`4242 4242 4242 4242`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().fill(`01 / 25`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().selectOption(`01 / 25`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
  await expect(page.locator(`td > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
  await expect(page.locator(`#shipping_method > li:nth-of-type(1) > label`).first()).toContainText(`Regular`);
  await expect(page.locator(`tr.order-total:nth-of-type(7) > th`).first()).toContainText(`Recurring total`);
  await expect(page.locator(`tr.order-total:nth-of-type(7) > td > strong > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
  await expect(page.locator(`#place_order`).first()).toContainText(`Join the Club`);
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
  await expect(page.locator(`.blockUI > .np-custom-checkout-modal-wrapper.with-background.text-first > .np-custom-checkout-story-wrapper > div.np-custom-checkout-story:nth-of-type(4) > h3`)).not.toHaveCount(0);
  await expect(page.locator(`.woocommerce-notice`)).not.toHaveCount(0);
  await expect(page.locator(`.woocommerce-thankyou-order-details > .order`)).not.toHaveCount(0);
  await expect(page.locator(`.woocommerce-order-details > h2:nth-of-type(1)`).first()).toContainText(`Order details`);
  await expect(page.locator(`tr:nth-of-type(4) > th`).first()).toContainText(`Total:`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
  await expect(page.locator(`.woocommerce-order-details > h2:nth-of-type(2)`).first()).toContainText(`Related subscriptions`);
}
