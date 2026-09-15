// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Harmony - WooCommerce Test - US - OLD SUITE"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, extractPriceFromElement, extractUserFromEmail, login, placeOrderElement, renewByAdmin, subscriptionMenuHarmony, wooCommerceCheckoutTemplate } from './common-steps-for-all-projects';
import { addPrivateOrderNote, currencyChecker, nextPaymentDate } from './harmony-common-steps-for-suites';

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

// GI: "01 - Home page (My account)" (60cc8f9d1da0a93062de054c)
export async function _01HomePageMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForLoadState('load');
}

// GI: "02 - Product Page" (60cc8fe1fd5d095fc92c1161)
export async function _02ProductPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/hours/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
}

// GI: "03 - Cart Page" (60cc90a71da0a93062de108f)
export async function _03CartPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _02ProductPage(page, vars);
  {
    const _lbl = page.locator(`label[for="hours"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#hours`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#hours`).first().fill(`50`); } catch { await page.locator(`#hours`).first().selectOption(`50`); }
  vars.unitPrice = ((await page.locator(`.wcpbc-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary.entry-summary > p.price > span > span > ins > span > bdi`)).textContent()) ?? '').trim();
  await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  vars.prod_desc = ((await page.locator(`.cart_item > .product-name`).textContent()) ?? '').trim();
  await expect(page.locator(`.cart_item > td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
}

// GI: "04 - Checkout Page - Managed Woo - Monthly" (64b1aac849da953edb502958)
export async function _04CheckoutPageManagedWooMonthly(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/managed-woocommerce/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Growth`); } catch { await page.locator(`#plan`).first().selectOption(`Growth`); }
  {
    const _lbl = page.locator(`label[for="recurrence"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#recurrence`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#recurrence`).first().fill(`Monthly`); } catch { await page.locator(`#recurrence`).first().selectOption(`Monthly`); }
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).or(page.locator(`a.checkout-button`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#payment_method_bacs`)).toHaveCount(0);
  await expect(page.locator(`#payment_method_stripe`)).not.toHaveCount(0);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124131` || url === `${vars.startUrl}?post_type=post&p=123469` }, vars)).toBeTruthy();
}

// GI: "04 - Checkout Page - Managed Woo - Yearly" (64b1aac8f6e2b3ffb36c4b86)
export async function _04CheckoutPageManagedWooYearly(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/managed-woocommerce/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Growth`); } catch { await page.locator(`#plan`).first().selectOption(`Growth`); }
  {
    const _lbl = page.locator(`label[for="recurrence"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#recurrence`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#recurrence`).first().fill(`Yearly`); } catch { await page.locator(`#recurrence`).first().selectOption(`Yearly`); }
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#payment_method_bacs`)).not.toHaveCount(0);
  await expect(page.locator(`#payment_method_stripe`)).not.toHaveCount(0);
  {
    const _lbl = page.locator(`label[for="payment_method_bacs"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bacs`).filter({ visible: true }).first().click({ force: true }); }
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector<HTMLAnchorElement>(".payment_box.payment_method_bacs > p > a")
element = element ? element.getAttribute("href") : null;
return element === `${vars.bankAccount}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124131` || url === `${vars.startUrl}?post_type=post&p=123469` }, vars)).toBeTruthy();
}

// GI: "04 - Checkout Page - On Demand hours" (60cc9156fd5d095fc92c189e)
export async function _04CheckoutPageOnDemandHours(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _03CartPage(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#payment_method_bacs`)).not.toHaveCount(0);
  await expect(page.locator(`#payment_method_stripe`)).not.toHaveCount(0);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector<HTMLAnchorElement>(".payment_box.payment_method_bacs > p > a")
element = element ? element.getAttribute("href") : null;
return element === `${vars.bankAccount}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124131` || url === `${vars.startUrl}?post_type=post&p=123469` }, vars)).toBeTruthy();
}

// GI: "05 - Step 1 - Affiliate Registration" (644bb8d7af1e488d253931f8)
export async function _05Step1AffiliateRegistration(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.affiliateEmail = `qa+gi_affiliate_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `${vars.affiliateEmail ?? ''}`;
  vars.user = `qa${vars.alphanumeric ?? ''}`;
  await page.goto(`${vars.url ?? ''}affiliate-area/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#affwp-user-name`).first().fill(`QA Affiliate`); } catch { await page.locator(`#affwp-user-name`).first().selectOption(`QA Affiliate`); }
  try { await page.locator(`#affwp-user-login`).first().fill(`${vars.user ?? ''}`); } catch { await page.locator(`#affwp-user-login`).first().selectOption(`${vars.user ?? ''}`); }
  try { await page.locator(`#affwp-user-email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#affwp-user-email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#affwp-payment-email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#affwp-payment-email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#affwp-user-url`).first().fill(`https://saucal.com/affiliate-test`); } catch { await page.locator(`#affwp-user-url`).first().selectOption(`https://saucal.com/affiliate-test`); }
  try { await page.locator(`#affwp-promotion-method`).first().fill(`This is a Testing promote tex for this field`); } catch { await page.locator(`#affwp-promotion-method`).first().selectOption(`This is a Testing promote tex for this field`); }
  {
    const _lbl = page.locator(`label[for="affwp-tos"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#affwp-tos`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`p:nth-of-type(8) > input[type="submit"].button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.affwp-notice`).first()).toHaveText(`Your affiliate account is pending approval`);
}

// GI: "05 - Step 2 - Affiliate approval" (644bb8d70b7aefb972135838)
export async function _05Step2AffiliateApproval(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href="admin.php?page=affiliate-wp"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="admin.php?page=affiliate-wp-affiliates"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`table.affiliates > tbody > tr:nth-of-type(1) > td`).first().hover();
  await page.locator(`table.affiliates > tbody > tr:nth-of-type(1) > td a[href*="action=accept"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(1) > td.status.column-status`).first()).toContainText(`Active`);
}

// GI: "05 - Step 3 - Affiliate Dashboard" (644bb8d7af1e488d25393208)
export async function _05Step3AffiliateDashboard(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.affiliateEmail ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Affiliate Application Accepted")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td > table > tbody > tr > td > div > p:nth-of-type(1)`).first()).toContainText(`Congratulations`);
  await page.goBack();
  await page.locator(`xpath=//a[contains(text(), "Your Affiliate Application Is Being Reviewed")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="wp-login.php?action=rp&key="]`).or(page.locator(`tbody p > a`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#pass1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#pass1`).first().selectOption(`${vars.password ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`a[href*="/wp-login.php"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.password ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.goto(`${vars.url ?? ''}affiliate-area/`);
  await page.waitForLoadState('load');
  await expect(page.locator(`#affwp-affiliate-dashboard-url-generator h3`)).not.toHaveCount(0);
  await page.locator(`html`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#affwp-url`).first().fill(`${vars.startUrl ?? ''}`); } catch { await page.locator(`#affwp-url`).first().selectOption(`${vars.startUrl ?? ''}`); }
  await page.locator(`input[type="submit"]`).filter({ visible: true }).first().click({ force: true });
  vars.affiliateSite = ((await page.locator(`div.affwp-custom-link-row > span.affwp-custom-link`).textContent()) ?? '').trim();
}

// GI: "06 - Place order - 01 - New User" (60cc9865c907790a42a1c9a0)
export async function _06PlaceOrder01NewUser(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.affiliateSite ?? ''}`);
  await page.waitForLoadState('load');
  await _04CheckoutPageOnDemandHours(page, vars);
  await placeOrderElement(page, vars);
  await expect(page.locator(`.woocommerce_error > li`).or(page.locator(`.woocommerce-error > li`)).first()).toContainText(`Your card number is incomplete.`);
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`${vars.cc ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`${vars.cc ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`${vars.month ?? ''} / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`${vars.month ?? ''} / ${vars.year ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`${vars.cvv ?? ''}`); }
  try {
    await page.locator(`xpath=//label[contains(text(), "Save payment information to my account for future purchases.")]`).or(page.locator(`label[for="wc-stripe-new-payment-method"]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  try {
    await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toContainText(`Please confirm you read and accepted the terms.
Billing Email address is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP Code is a required field.
Billing Phone is a required field.
Create account password is a required field.`);
  } catch { /* optional step: assertTextPresent */ }
  await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toContainText(`Please confirm you read and accepted the terms.`);
  await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toContainText(`Billing Email address is a required field.`);
  await wooCommerceCheckoutTemplate(page, vars);
  try {
    await page.locator(`xpath=//label[contains(text(), "on your own behalf")]`).or(page.locator(`label[for="billing_behalf_company_own"].radio`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  vars.refOrder1 = `${vars.orderNumber ?? ''}`;
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await currencyChecker(page, vars);
  await page.locator(`xpath=//a[contains(text(), "SAU/CAL")]`).or(page.locator(`.beta > a[href*="/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
  await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
  await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`a[href*="/product/hours-development/?attribute_hours=50"]`).or(page.locator(`tbody > tr > td.product-name`)).first()).toContainText(`On-Demand Hours - Development - 50`);
  await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await currencyChecker(page, vars);
}

// GI: "06 - Place order - 02 - One-time order backend" (644fd5c20b7aefb972641e64)
export async function _06PlaceOrder02OneTimeOrderBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toContainText(`No shipping address set.`);
  await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toContainText(`${vars.phone ?? ''}`);
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p`).first()).toHaveText(`Purchasing in behalf: own`);
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`)).toHaveCount(0);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await currencyChecker(page, vars);
  vars.referral1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotal = `${vars.unitPrice}`;
subtotal = subtotal.replace(",","");
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
let comission = (subtotal*5)/100;
comission = comission.toFixed(2)
return comission }, vars);
  vars.noteReferral = ((await page.locator(`#woocommerce-order-notes > div.inside > ul > li:nth-child(4) > div > p`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let note = `${vars.noteReferral}`;
let array = note.match(/([0-9]+\.[0-9]+)/g);
let referral = Number(`${vars.referral1}`)

return Number(array[0]) === referral
 }, vars)).toBeTruthy();
  vars.referral1USD = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let string = `${vars.noteReferral}`;
let array = string.match(/([0-9]+\.[0-9]+)/g);

return array[0]
 }, vars);
  await addPrivateOrderNote(page, vars);
}

// GI: "06 - Place order - 03 - Existent User (Subscription)" (62cd6ba4760cc3cd6b705d4b)
export async function _06PlaceOrder03ExistentUserSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = ``;
  vars.email1 = `${vars.email ?? ''}`;
  vars.username = `${vars.email ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await login(page, vars);
  await page.goto(`${vars.url ?? ''}product/managed-woocommerce/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Growth`); } catch { await page.locator(`#plan`).first().selectOption(`Growth`); }
  {
    const _lbl = page.locator(`label[for="recurrence"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#recurrence`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#recurrence`).first().fill(`Monthly`); } catch { await page.locator(`#recurrence`).first().selectOption(`Monthly`); }
  vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > span > bdi`).textContent()) ?? '').trim();
  vars.signUpFee = ((await page.locator(`.woocommerce-variation-price > .price > span > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  await currencyChecker(page, vars);
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  vars.prod_desc = ((await page.locator(`.cart_item > .product-name`).textContent()) ?? '').trim();
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
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let subtotal = `${vars.subtotalPrice}`;
let total = `${vars.total}`;

subtotal = subtotal.replace(",","");
total = total.replace(",","");

subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));


return total === subtotal }, vars)).toBeTruthy();
  await expect(page.locator(`tr.cart-subtotal:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.totalRenew = ((await page.locator(`tr.order-total:nth-of-type(5) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let totalRenew = `${vars.totalRenew}`;

unit = unit.replace(",","");
totalRenew = totalRenew.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
totalRenew = Number(totalRenew.replace(`${vars.Symbol}`,""));


return totalRenew === unit }, vars)).toBeTruthy();
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.subscription-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.signUpFee ?? ''}`);
  await expect(page.locator(`td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.order-total:nth-of-type(5) > td > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`${vars.cc ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`${vars.cc ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`${vars.month ?? ''} / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`${vars.month ?? ''} / ${vars.year ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`${vars.cvv ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="terms_acceptance"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms_acceptance`).filter({ visible: true }).first().click({ force: true }); }
  }
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  vars.refOrder2 = `${vars.orderNumber ?? ''}`;
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`.woocommerce-table > tfoot:nth-child(3) > tr:nth-child(3) > td:nth-child(2) > span:nth-child(1)`).or(page.locator(`section.woocommerce-order-details > table.woocommerce-table.woocommerce-table--order-details.shop_table.order_details > tfoot:nth-child(4) > tr:nth-child(3) > td > span`)).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  vars.subscriptionID = ((await page.locator(`td.subscription-id > a[href*="/view-subscription/"]`).textContent()) ?? '').trim();
  vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ID = `${vars.subscriptionID}`
ID = ID.replace("#","")
return ID }, vars);
  vars.subscriptionID1 = `${vars.subscriptionID ?? ''}`;
  await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  vars.nextPay = ((await page.locator(`td.subscription-next-payment`).textContent()) ?? '').trim();
  await nextPaymentDate(page, vars);
  await currencyChecker(page, vars);
  await page.locator(`xpath=//a[contains(text(), "SAU/CAL")]`).or(page.locator(`.beta > a[href*="/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
  await expect(page.locator(`tr:first-of-type > td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`.woocommerce-table > tfoot:nth-child(3) > tr:nth-child(3) > td:nth-child(2) > span:nth-child(1)`).or(page.locator(`section.woocommerce-order-details > table.woocommerce-table.woocommerce-table--order-details.shop_table.order_details > tfoot:nth-child(4) > tr:nth-child(3) > td > span`)).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await currencyChecker(page, vars);
  await subscriptionMenuHarmony(page, vars);
  await currencyChecker(page, vars);
}

// GI: "06 - Place order - 04 - Renew order" (644fd9d7af1e488d259109b3)
export async function _06PlaceOrder04RenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via`);
  await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Stripe charge complete`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toContainText(`No shipping address set.`);
  await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toContainText(`${vars.phone ?? ''}`);
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p`).first()).toContainText(`Purchasing in behalf: own`);
  } catch { /* optional step: assertTextPresent */ }
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`)).toHaveCount(0);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  vars.referral2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotal = `${vars.subtotalPrice}`;
subtotal = subtotal.replace(",","");
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
let comission = (subtotal*5)/100;
comission = comission.toFixed(2)
return comission }, vars);
  vars.noteReferral = ((await page.locator(`#woocommerce-order-notes > div.inside > ul > li:nth-child(4) > div > p`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let string = `${vars.noteReferral}`;
let array = string.match(/([0-9]+\.[0-9]+)/g);
let referral = Number(`${vars.referral2}`)


return Number(array[0]) === referral }, vars)).toBeTruthy();
  vars.referral2USD = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let note = `${vars.noteReferral}`;
let array = note.match(/([0-9]+\.[0-9]+)/g);

return array[0] }, vars);
  await renewByAdmin(page, vars);
  await currencyChecker(page, vars);
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  vars.refOrder3 = `${vars.renewID ?? ''}`;
  await currencyChecker(page, vars);
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pending payment`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    vars.referral3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotal = `${vars.unitPrice}`;
subtotal = subtotal.replace(",","");
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
let comission = (subtotal*5)/100;
comission = comission.toFixed(2)
return comission }, vars);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    vars.referral3USD = `${vars.referral3 ?? ''}`;
  }
}

// GI: "06 - Place order - 05 - New User - Managed Woo Yearly - Bank Transfer" (64b5574549da953edb39f9c1)
export async function _06PlaceOrder05NewUserManagedWooYearlyBankTransfer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscription = `yes`;
  vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `${vars.email ?? ''}`;
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
  vars.prod_desc = ((await page.locator(`.cart_item > .product-name`).textContent()) ?? '').trim();
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
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let subtotal = `${vars.subtotalPrice}`;
let total = `${vars.total}`;

subtotal = subtotal.replace(",","");
total = total.replace(",","");

subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));


return total === subtotal }, vars)).toBeTruthy();
  await expect(page.locator(`tr.cart-subtotal:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.totalRenew = ((await page.locator(`tr.order-total:nth-of-type(5) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let totalRenew = `${vars.totalRenew}`;

unit = unit.replace(",","");
totalRenew = totalRenew.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
totalRenew = Number(totalRenew.replace(`${vars.Symbol}`,""));


return totalRenew === unit }, vars)).toBeTruthy();
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await wooCommerceCheckoutTemplate(page, vars);
  try {
    await page.locator(`xpath=//label[contains(text(), "on behalf of a company")]`).or(page.locator(`label[for="billing_behalf_company_company"]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try {
    try { await page.locator(`#billing_legal_name`).first().fill(`Legal Inc.`); } catch { await page.locator(`#billing_legal_name`).first().selectOption(`Legal Inc.`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`#billing_registered_address`).first().fill(`123 False, Miami FL 33126 US`); } catch { await page.locator(`#billing_registered_address`).first().selectOption(`123 False, Miami FL 33126 US`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`#billing_company_number`).first().fill(`1231231234`); } catch { await page.locator(`#billing_company_number`).first().selectOption(`1231231234`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`#billing_incorporation_place`).first().fill(`test`); } catch { await page.locator(`#billing_incorporation_place`).first().selectOption(`test`); }
  } catch { /* optional step: assign */ }
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.subscription-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.signUpFee ?? ''}`);
  await expect(page.locator(`td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.order-total:nth-of-type(5) > td > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  {
    const _lbl = page.locator(`label[for="payment_method_bacs"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bacs`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.waitForTimeout(2000);
  {
    const _lbl = page.locator(`label[for="terms_acceptance"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms_acceptance`).filter({ visible: true }).first().click({ force: true }); }
  }
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.order-total td .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`.woocommerce-table > tfoot:nth-child(3) > tr:nth-child(3) > td:nth-child(2) > span:nth-child(1)`).or(page.locator(`tfoot > tr:nth-of-type(2) > td .woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  vars.orderNumber05 = `${vars.orderNumber ?? ''}`;
  vars.subscriptionID = ((await page.locator(`td.subscription-id > a[href*="/view-subscription/"]`).textContent()) ?? '').trim();
  vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ID = `${vars.subscriptionID}`
ID = ID.replace("#","")
return ID }, vars);
  vars.subscriptionID05 = `${vars.subscriptionID ?? ''}`;
  await expect(page.locator(`td.subscription-status`).first()).toContainText(`Pending`);
  await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector<HTMLAnchorElement>("div > p:nth-of-type(2) > a")
element = element.getAttribute("href")
return element === `${vars.bankAccount}` }, vars)).toBeTruthy();
}

// GI: "06 - Place order - 06 - Backend" (6751c78f7a599a5bc82b2fc7)
export async function _06PlaceOrder06Backend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber05 ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Direct Bank Transfer.`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`On hold`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toContainText(`No shipping address set.`);
  await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toContainText(`${vars.phone ?? ''}`);
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`)).toHaveCount(0);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(2) > td.total > span`)).first()).toContainText(`${vars.total ?? ''}`);
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p:nth-of-type(1)`).first()).toHaveText(`Purchasing in behalf: company`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p:nth-of-type(2)`).first()).toHaveText(`Full legal name: Legal Inc.`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p:nth-of-type(3)`).first()).toHaveText(`Registered address: 123 False, Miami FL 33126 US`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p:nth-of-type(4)`).first()).toHaveText(`Company number: 1231231234`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`.order_data_column > p:nth-of-type(5)`).first()).toHaveText(`Place of incorporation: test`);
  } catch { /* optional step: assertText */ }
}

// GI: "07 - Test Scenario 1 - USD - Step 1 - Admin order creation" (62191290e38dd75b10ccfe59)
export async function _07TestScenario1USDStep1AdminOrderCreation(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.adminUser ?? ''}`;
  vars.admin = `yes`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post-new.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  vars.orderNumber = ((await page.locator(`h2.woocommerce-order-data__heading`).textContent()) ?? '').trim();
  vars.order = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /([0-9])\w+/g;
const str = `${vars.orderNumber}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  {
    const _lbl = page.locator(`label[for="select2-customer_user-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-customer_user-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.email ?? ''}`); }
  await expect(page.locator(`#select2-customer_user-results > li.select2-results__option.select2-results__option--highlighted`)).not.toHaveCount(0);
  await expect(page.locator(`#select2-customer_user-results > li:nth-of-type(1)`)).not.toHaveCount(0);
  await page.locator(`#select2-customer_user-results > li:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(5000);
  await page.locator(`xpath=//button[contains(text(), "Add item(s)")]`).or(page.locator(`button[type="button"].button.add-line-item`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//button[contains(text(), "Add product(s)")]`).or(page.locator(`button[type="button"].button.add-order-item`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//span[contains(text(), "Search for a product…")]`).or(page.locator(`#select2-item_id-tf-container > span`)).filter({ visible: true }).first().click({ force: true });
  vars.product = `On-Demand - Development`;
  try { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().fill(`Hidden`); } catch { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().selectOption(`Hidden`); }
  await page.locator(`xpath=//li[contains(text(), "Hidden")]`).or(page.locator(`#select2-item_id-tf-results > li`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`tr:nth-of-type(1) > td:nth-of-type(2) > input[name="item_qty"][placeholder="1"][type="number"].quantity`).first().fill(`11`); } catch { await page.locator(`tr:nth-of-type(1) > td:nth-of-type(2) > input[name="item_qty"][placeholder="1"][type="number"].quantity`).first().selectOption(`11`); }
  {
    const _lbl = page.locator(`label[for="btn-ok"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#btn-ok`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  vars.price = ((await page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  await extractPriceFromElement(page, vars);
  vars.priceUSD = `${vars.unitPrice ?? ''}`;
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let address = document.getElementsByClassName("none_set")
return address[0].innerText.includes("No billing address set.") }, vars)) {
    await expect(page.locator(`.load_customer_billing`)).not.toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let address = document.getElementsByClassName("none_set")
return address[0].innerText.includes("No billing address set.") }, vars)) {
    await page.waitForTimeout(5000);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let address = document.getElementsByClassName("none_set")
return address[1].innerText.includes("No shipping address set.") }, vars)) {
    await expect(page.locator(`.billing-same-as-shipping`)).not.toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let address = document.getElementsByClassName("none_set")
return address[1].innerText.includes("No shipping address set.") }, vars)) {
    await page.waitForTimeout(10000);
  }
  {
    const _lbl = page.locator(`label[for="wcpbc-load-pricing-action"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wcpbc-load-pricing-action`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  vars.price = ((await page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  await extractPriceFromElement(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let priceUSD = `${vars.priceUSD}`
let unitPrice = `${vars.unitPrice}`
return priceUSD === unitPrice }, vars)).toBeTruthy();
  await expect(page.locator(`tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.price ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let symbol = document.getElementsByClassName('woocommerce-Price-currencySymbol')
let boolean = false
let n = 0
let length = symbol.length

while (n < length) {
        if (symbol[n].textContent === "$") {
        boolean = true
        } else {
            boolean = false
            break;
        }
        n++;
    }

return boolean }, vars)).toBeTruthy();
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`send_order_details`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`send_order_details`); }
  // TODO: command="dragAndDrop" target="select[name=\"wc_order_action\"]" value="#wp-admin-bar-wp-logo > a[href*=\"/wp-admin/about.php\"].ab-item"
  await page.locator(`xpath=//button[contains(text(), "Create")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await expect(page.locator(`li.note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Order details manually sent to customer.`);
  vars.username = ((await page.locator(`#order_data > div.order_data_column_container > div:nth-child(2) > div.address > p:nth-child(2) > a`).textContent()) ?? '').trim();
  vars.address = ((await page.locator(`#order_data > div.order_data_column_container > div:nth-child(2) > div.address > p:nth-child(1)`).textContent()) ?? '').trim();
  vars.phone = ((await page.locator(`#order_data > div.order_data_column_container > div:nth-child(2) > div.address > p:nth-child(3) > a`).textContent()) ?? '').trim();
}

// GI: "07 - Test Scenario 1 - USD - Step 2 - Customer Pay Order" (62695c2f11885f8f1aa61c67)
export async function _07TestScenario1USDStep2CustomerPayOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `no`;
  vars.username = `${vars.email ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Your latest SAU/CAL invoice")]`).or(page.locator(`xpath=//a[contains(text(), "You have a new order")]`)).or(page.locator(`xpath=//a[contains(text(), "Your Saucal order has been received!")]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#header_wrapper > h1`).or(page.locator(`#body_content_inner > h2`)).first()).toContainText(`${vars.order ?? ''}`);
  await expect(page.locator(`tr.order_item > td.td.text-align-left:nth-of-type(1)`).first()).toHaveText(`On-Demand - Development`);
  // TODO: command="assertNotText" target="tr.order_item > td.td.text-align-left:nth-of-type(2)" value="11"
  await expect(page.locator(`td.td.text-align-left:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.price ?? ''}`);
  await expect(page.locator(`tr.order-totals.order-totals-subtotal > td.td.text-align-left > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.price ?? ''}`);
  await expect(page.locator(`address.address`)).not.toHaveCount(0);
  await page.locator(`#body_content_inner > p:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
  await login(page, vars);
  await expect(page.locator(`a[href*="/cart/"][title="View your shopping cart"] > .count`).first()).toHaveText(`0 items`);
  await expect(page.locator(`td.product-name`).first()).toContainText(`On-Demand - Development`);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#order_review > table > tfoot > tr:nth-child(1) > td > span > bdi`)).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`tr.order-total > td > strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#order_review > table > tfoot > tr:nth-child(2) > td > span > bdi`)).first()).toContainText(`${vars.price ?? ''}`);
  {
    const _lbl = page.locator(`label[for="payment_method_bacs"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bacs`).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    {
      const _lbl = page.locator(`label[for="terms_acceptance"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms_acceptance`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Pay for order")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.order > strong`).first()).toContainText(`${vars.order ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`On-Demand - Development`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.address ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.username ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.phone ?? ''}`);
}

// GI: "08 - 01 - Affiliate Dashboard - Check referral" (644fda950b7aefb9726537f0)
export async function _0801AffiliateDashboardCheckReferral(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `no`;
  vars.username = `${vars.affiliateEmail ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await login(page, vars);
  await page.goto(`${vars.url ?? ''}affiliate-area/`);
  await page.waitForLoadState('load');
  await page.locator(`li:nth-of-type(3) > a[href*="stats"]`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    await expect(page.locator(`td[data-th="Unpaid Referrals"]`).first()).toHaveText(`2`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`td[data-th="Unpaid Referrals"]`).first()).toHaveText(`3`);
  }
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    vars.totalReferral = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let referral1 = vars.referral1USD;
let referral2 = vars.referral2USD;
let totalReferral = Math.round((referral1 + referral2)*100)/100
return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(totalReferral)
 }, vars);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    vars.totalReferral = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let referral1 = vars.referral1USD;
let referral2 = vars.referral2USD;
let referral3 = vars.referral3USD;
let totalReferral = Math.round((referral1 + referral2 + referral3)*100)/100
return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(totalReferral)
 }, vars);
  }
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    await expect(page.locator(`td[data-th="Unpaid Earnings"]`).first()).toHaveText(`${vars.totalReferral ?? ''}`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`td[data-th="Unpaid Earnings"]`).first()).toHaveText(`${vars.totalReferral ?? ''}`);
  }
}

// GI: "08 - 02 - Affiliate referral backend" (644fda95af1e488d25912629)
export async function _0802AffiliateReferralBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href="admin.php?page=affiliate-wp"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="admin.php?page=affiliate-wp-referrals"]`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ref1 = document.querySelector(`a[href*='${vars.refOrder1}']`)
let ref2 = document.querySelector(`a[href*='${vars.refOrder2}']`)

ref1 = ref1.parentElement
ref1 = ref1.previousElementSibling
ref1 = ref1.previousElementSibling

ref2 = ref2.parentElement
ref2 = ref2.previousElementSibling
ref2 = ref2.previousElementSibling

return ref1.innerText === "$"+`${vars.referral1USD}` && 
ref2.innerText === "$"+`${vars.referral2USD}`
 }, vars)).toBeTruthy();
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ref1 = document.querySelector(`a[href*='${vars.refOrder1}']`)
let ref2 = document.querySelector(`a[href*='${vars.refOrder2}']`)
let ref3 = document.querySelector(`a[href*='${vars.refOrder3}']`)

ref1 = ref1.parentElement
ref1 = ref1.previousElementSibling
ref1 = ref1.previousElementSibling

ref2 = ref2.parentElement
ref2 = ref2.previousElementSibling
ref2 = ref2.previousElementSibling

ref3 = ref3.parentElement
ref3 = ref3.previousElementSibling
ref3 = ref3.previousElementSibling


return ref1.innerText === "$"+`${vars.referral1USD}` && 
ref2.innerText === "$"+`${vars.referral2USD}` && 
ref3.innerText === "$"+`${vars.referral3USD}`
 }, vars)).toBeTruthy();
  }
}

// GI: "11 - Cancel Subscription by Customer" (64b5875ae62b31988dbef1c9)
export async function _11CancelSubscriptionByCustomer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email1 ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href*="/view-subscription/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="change_subscription_to=cancelled"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Your subscription has been cancelled.`);
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Pending Cancellation`);
}

// GI: "12 - Renew without Next payment day" (64f9c24be0dfa97aa9a9b2e8)
export async function _12RenewWithoutNextPaymentDay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  vars.orderNumber = `${vars.orderNumber05 ?? ''}`;
  vars.subscriptionID = `${vars.subscriptionID05 ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-order_status-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`xpath=//li[contains(text(), "Completed")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  try { await page.locator(`#next_payment`).first().fill(``); } catch { await page.locator(`#next_payment`).first().selectOption(``); }
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`[id="message"].updated > p`).first()).toContainText(`Subscription updated.`);
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`[id="message"].updated > p`).first()).toContainText(`Subscription updated.`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var element = document.querySelector('#next_payment_timestamp_utc');
return element.getAttribute('value') === '0' }, vars)).toBeTruthy();
}

// GI: "13 - Place order - New User - Discovery" (65f2e5ba452496039e3d4fe4)
export async function _13PlaceOrderNewUserDiscovery(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscription = ``;
  vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `${vars.email ?? ''}`;
  await page.goto(`${vars.startUrl ?? ''}product/discovery-consultation/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  vars.unitPrice = ((await page.locator(`ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  await currencyChecker(page, vars);
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  vars.prod_desc = ((await page.locator(`.cart_item > .product-name`).textContent()) ?? '').trim();
  await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.subtotalPrice = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let subtotal = `${vars.subtotalPrice}`;
let total = `${vars.total}`;

subtotal = subtotal.replace(",","");
total = total.replace(",","");

subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));


return total === subtotal }, vars)).toBeTruthy();
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await wooCommerceCheckoutTemplate(page, vars);
  await page.locator(`input#billing_behalf_company_own`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_stripe"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_stripe`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`${vars.cc ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`${vars.cc ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`${vars.month ?? ''} / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`${vars.month ?? ''} / ${vars.year ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`${vars.cvv ?? ''}`); }
  await blockUI(page, vars);
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`.woocommerce-table > tfoot:nth-child(3) > tr:nth-child(3) > td:nth-child(2) > span:nth-child(1)`).or(page.locator(`section.woocommerce-order-details > table.woocommerce-table.woocommerce-table--order-details.shop_table.order_details > tfoot:nth-child(4) > tr:nth-child(3) > td > span`)).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
}

// GI: "15 - Managed Hosting page" (663b80801aac3ea14ff69795)
export async function _15ManagedHostingPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/managed-hosting/`);
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Up to 500 orders per month`); } catch { await page.locator(`#plan`).first().selectOption(`Up to 500 orders per month`); }
  await currencyChecker(page, vars);
}

// GI: "16 - “Forgot password?” flow" (60cca1e2fd5d095fc92c96c6)
export async function _16ForgotPasswordFlow(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/wp-login.php?action=lostpassword"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
  await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Password reset email has been sent.`);
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Password Reset")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`#body_content_inner > p > a.link`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
  try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
  await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Your password has been reset successfully.`);
  vars.pass = `${vars.password2 ?? ''}`;
  await page.goto(`${vars.url ?? ''}`);
  await page.waitForLoadState('load');
  await login(page, vars);
}

// GI: "16 - My Account Links and Login" (60cc92d2c907790a42a19d07)
export async function _16MyAccountLinksAndLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `no`;
  vars.pass = `${vars.password ?? ''}`;
  await login(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(2)`)).not.toHaveCount(0);
  await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No order has been made yet.`);
  } catch { /* optional step: assertTextPresent */ }
  await page.locator(`xpath=//a[contains(text(), "Subscriptions")]`).or(page.locator(`a[href*="/subscriptions/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.no_subscriptions`)).not.toHaveCount(0);
  await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.u-column1 > header.woocommerce-Address-title.title > h2`).first()).toContainText(`Billing address`);
  await expect(page.locator(`.u-column2 > header.woocommerce-Address-title.title > h2`).first()).toContainText(`Shipping address`);
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-Message`).or(page.locator(`.wc-block-components-notice-banner`)).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No saved methods found.`);
  await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`form.woocommerce-EditAccountForm > div.clear:nth-of-type(1)`)).not.toHaveCount(0);
  await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`#customer_login`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  await login(page, vars);
}
