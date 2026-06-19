// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Open Studio - Common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, placeOrderElement } from './common-steps-for-all-projects';

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

// GI: "17 - Space Event Page" (663a460e7e028d9ed99ed06a)
export async function _17SpaceEventPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}events/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await page.locator(`div.os-calendar-event-item.os-calendar-event-item-pro:not(.os-calendar-event-item-past) > div > div > a`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a.os-sessions-title__space`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div.artist-header__wrap`).first()).toBeVisible();
  await expect(page.locator(`div.os-sessions-list`).first()).toBeVisible();
}

// GI: "23 - Purchase Individual Course + Subscription" (688bf002753c267776f592a3)
export async function _23PurchaseIndividualCourseSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.individualCourse = `yes`;
  vars.subscription = `yes`;
  vars.email3 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  await addSingleCourse(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('div.kadence-conversion > div > div.kb-row-layout-wrap.alignnone.kb-v-sm-hidden.kt-row-has-bg.wp-block-kadence-rowlayout > div > div.wp-block-kadence-column.inner-column-1 > div > div > a')

return !element === false }, vars)) {
    vars.trial = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = document.querySelector('div.kadence-conversion > div > div.kb-row-layout-wrap.alignnone.kb-v-sm-hidden.kt-row-has-bg.wp-block-kadence-rowlayout > div > div.wp-block-kadence-column.inner-column-1 > div').innerText;
const numbers = text.match(/\d+/g);

return numbers[0] }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('div.kadence-conversion > div > div.kb-row-layout-wrap.alignnone.kb-v-sm-hidden.kt-row-has-bg.wp-block-kadence-rowlayout > div > div.wp-block-kadence-column.inner-column-1 > div > div > a')

return !element === false }, vars)) {
    await nextPaymentDate(page, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('div.kadence-conversion > div > div.kb-row-layout-wrap.alignnone.kb-v-sm-hidden.kt-row-has-bg.wp-block-kadence-rowlayout > div > div.wp-block-kadence-column.inner-column-1 > div > div > a')

return !element === false }, vars)) {
    await page.locator(`div.kadence-conversion > div > div.kb-row-layout-wrap.alignnone.kb-v-sm-hidden.kt-row-has-bg.wp-block-kadence-rowlayout > div > div.wp-block-kadence-column.inner-column-1 > div > div > a`).or(page.locator(`xpath=//span[contains(text(),'ADD FREE TRIAL')]`)).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('div.kadence-conversion > div > div.kb-row-layout-wrap.alignnone.kb-v-sm-hidden.kt-row-has-bg.wp-block-kadence-rowlayout > div > div.wp-block-kadence-column.inner-column-1 > div > div > a')

return !element }, vars)) {
    await page.goto(`${vars.startUrl ?? ''}checkout/?add-to-cart=16&quantity=1`);
    await page.waitForLoadState('load');
  }
  await page.waitForLoadState('load');
  await expect(page.locator(`ins > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`#order_review > div.os-checkout-order-review > table > tbody > tr > td.product-total > span > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`#order_review > div.os-checkout-order-review > table > tbody > tr > td.product-total > span.subscription-details`).or(page.locator(`#order_review > div.os-checkout-order-review > table > tbody > tr > td.product-total > span > span.subscription-details`)).first()).toContainText(`/ month with a ${vars.trial ?? ''}-day free trial`);
  await expect(page.locator(`tr.cart_item:nth-of-type(2) > td.product-name`).first()).toContainText(`Open Studio - ${vars.freq ?? ''}`);
  await expect(page.locator(`tr.cart_item:nth-of-type(1) > td.product-name`).first()).toContainText(`${vars.description2 ?? ''}`);
  await expect(page.locator(`#order_review > div.os-checkout-order-review > table > tfoot > tr:nth-child(2) > td > strong > span > bdi`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`#order_review > div.os-checkout-order-review > table > tfoot > tr.order-total.recurring-total > td`).first()).toHaveText(`${vars.unitPrice ?? ''}.00
/ month
Next renewal:${vars.nextPayment ?? ''}`);
  await expect(page.locator(`input[checked='checked']#os-sub-variant-16`).or(page.locator(`input[checked='checked']#os-sub-variant-1204482`))).not.toHaveCount(0);
  await expect(page.locator(`input#os-sub-variant-1204483[checked="checked"]`)).toHaveCount(0);
  await expect(page.locator(`input#os-sub-variant-17[checked="checked"]`)).toHaveCount(0);
  try { await page.locator(`#billing_email`).first().fill(`${vars.email3 ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email3 ?? ''}`); }
  try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242424242424242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242424242424242`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`04 / 27`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`04 / 27`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`234`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`234`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().fill(`90210`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().selectOption(`90210`); }
  } catch { /* optional step: assign */ }
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email3 ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`.kt-inside-inner-col`)).not.toHaveCount(0);
  await expect(page.locator(`.os-course`)).not.toHaveCount(0);
  await expect(page.locator(`h3.os-course__title > a[href*="/courses/"]`).first()).toHaveText(`${vars.description2 ?? ''}`);
  await expect(page.locator(`tr.order_item:nth-of-type(1) > td.woocommerce-table__product-name`).first()).toHaveText(`${vars.description2 ?? ''} × 1`);
  await expect(page.locator(`tr.order_item:nth-of-type(2) a[href*="?attribute_frequency="]`).first()).toContainText(`Open Studio - ${vars.freq ?? ''}`);
  await expect(page.locator(`tr.order_item:nth-of-type(1) > td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`tr.order_item:nth-of-type(2) > td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`table.woocommerce-table.woocommerce-table--order-details.shop_table.order_details > tfoot > tr:nth-child(3) > td > span`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  vars.subID = ((await page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/"]`).textContent()) ?? '').trim();
  vars.subID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subID = `${vars.subID}`
subID = subID.match(/[0-9]+/g)
return subID[0] }, vars);
  await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  await expect(page.locator(`td.subscription-next-payment`).first()).toContainText(`${vars.nextPayment ?? ''}`);
  await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.unitPrice ?? ''}.00 / month`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}

${vars.email3 ?? ''}`);
  await page.locator(`a[href="${vars.startUrl ?? ''}dashboard/"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href

return url === `${vars.startUrl}dashboard/` }, vars)).toBeTruthy();
  vars.email = `${vars.email3 ?? ''}`;
  await checkDashboard(page, vars);
}

// GI: "Add Single Course" (688bee8e753c267776f5842b)
export async function addSingleCourse(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/jazz-piano-jump-start-course/`);
  await page.waitForLoadState('load');
  vars.description2 = ((await page.locator(`h2.os-course-info-page-header__title`).textContent()) ?? '').trim();
  vars.unitPrice2 = ((await page.locator(`.summary.entry-summary .price > ins > .woocommerce-Price-amount > bdi`).or(page.locator(`.summary.entry-summary .price > .woocommerce-Price-amount > bdi`)).textContent()) ?? '').trim();
  await page.locator(`xpath=//button[contains(text(), "Buy Course")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Admin Login" (68caa4ef576a0f46b5fc53f8)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).or(page.locator(`#username`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`#username`)).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().selectOption(`${vars.pass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
return element != null && element != undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await page.locator(`li#wp-admin-bar-site-name > a`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#adminmenumain`)).not.toHaveCount(0);
}

// GI: "Check Dashboard" (688cb4c59e92b13236527f0b)
export async function checkDashboard(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.individualCourse === 'yes') {
    await expect(page.locator(`div#block_cd7bfb6a5a5cb6c1bd0f72a84c5fe8f0 h4.openstudio-courses-list-header-label-text`).first()).toBeVisible();
  }
  if (vars.individualCourse === 'yes') {
    await expect(page.locator(`div#block_cd7bfb6a5a5cb6c1bd0f72a84c5fe8f0 h4.openstudio-courses-list-header-label-text`).first()).toHaveText(`Purchased courses`);
  }
  if (vars.individualCourse === 'yes') {
    await expect(page.locator(`div#block_cd7bfb6a5a5cb6c1bd0f72a84c5fe8f0 li.openstudio-courses-list-row-item`).first()).toBeVisible();
  }
  if (vars.individualCourse === 'yes') {
    await expect(page.locator(`#block_cd7bfb6a5a5cb6c1bd0f72a84c5fe8f0 > div.openstudio-courses-list.cols-4 > div > ul > li > div > div > a > span.openstudio-courses-list-row-item-content-title`).first()).toContainText(`${vars.description2 ?? ''}`);
  }
  await page.locator(`.nav-drop-title-wrap > .kadence-svg-iconset > svg`).first().hover();
  await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(5) > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`.os-my-dashboard__next > span`)).toHaveCount(0);
  }
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`.woocommerce-Price-amount`)).toHaveCount(0);
  }
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`.os-my-dashboard__frequency > span`)).toHaveCount(0);
  }
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`a[href*="/product/open-studio-subscription/?switch-subscription"]`)).toHaveCount(0);
  }
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`a[href*="/my-account/view-subscription/"].button`)).toHaveCount(0);
  }
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`a[href*="/join"].button`)).not.toHaveCount(0);
  }
  if (vars.subscription !== 'yes') {
    await expect(page.locator(`.os-account-membership`).first()).toHaveText(`NO PLAN IS ACTIVE`);
  }
  if (vars.subscription === 'yes') {
    vars.nextPayment1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var today = new Date();

// Add 14 days to today's date
var futureDate = new Date(today);
futureDate.setDate(futureDate.getDate() + vars.trial);

// Define month names array
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Format the date as "Month Day, Year"
var formattedDate = monthNames[futureDate.getMonth()] + " " + futureDate.getDate() + " " + futureDate.getFullYear();


return formattedDate }, vars);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`.os-my-dashboard__next > span`).first()).toContainText(`${vars.nextPayment1 ?? ''}`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`.os-my-dashboard__frequency > span`).first()).toHaveText(`Monthly subscription`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`div.os-my-dashboard__info > div.os-my-dashboard__change > a`).first()).toContainText(`Change subscription`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`a[href*="/my-account/view-subscription/${vars.subID ?? ''}/"].button`).first()).toContainText(`Manage subscription`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`a[href*="/join"].button`)).toHaveCount(0);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`.os-account-membership`).first()).toHaveText(`YOUR CURRENT PLAN
OPEN STUDIO`);
  }
  await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
  await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-number`).first()).toHaveText(`${vars.orderNumber ?? ''}`);
  await expect(page.locator(`mark.order-status`).first()).toContainText(`Completed`);
  await expect(page.locator(`tr:nth-of-type(1) .woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(2) .woocommerce-Price-amount > bdi`).first()).toHaveText(`$0.00`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}

${vars.email ?? ''}`);
  if (vars.subscription === 'yes') {
    await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subID ?? ''}/"]`)).not.toHaveCount(0);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`td.subscription-next-payment`).first()).toHaveText(`${vars.nextPayment ?? ''}`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`td.subscription-status`).first()).toHaveText(`Active`);
  }
  if (vars.subscription === 'yes') {
    await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.unitPrice ?? ''}.00 / month`);
  }
  if (vars.individualCourse === 'yes') {
    await page.locator(`xpath=//a[contains(text(), "Purchased courses")]`).or(page.locator(`a[href*="/my-account/members-area/"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.individualCourse === 'yes') {
    await expect(page.locator(`h3.os-course__title > a[href*="/courses/jazz-piano-jump-start/welcome-lets-jump-start-2/"]`).or(page.locator(`#post-1233989 > h3 > a`)).first()).toContainText(`Jazz Piano Jump-Start`);
  }
  if (vars.individualCourse === 'yes') {
    await page.locator(`h3.os-course__title > a[href*="/courses/jazz-piano-jump-start/welcome-lets-jump-start-2/"]`).or(page.locator(`#post-1233989 > h3 > a`)).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Check order on Backend" (68caa5b4576a0f46b5fc968d)
export async function checkOrderOnBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit/Debit Cards`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}`);
}

// GI: "Extract user from email" (68caa32e576a0f46b5fbb84c)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /^(qa\+)?(\w+)[^@]+/g
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "fill CC" (693057d7638b729792060e14)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242424242424242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242424242424242`); }
  } catch { /* optional step: assign */ }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`04 / 27`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`04 / 27`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`234`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`234`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().fill(`90210`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().selectOption(`90210`); }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#checkbox-linkOptIn[checked]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
}

// GI: "Filling survey in Welcome page" (663cb98d1aac3ea14f22a85d)
export async function fillingSurveyInWelcomePage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.kt-inside-inner-col`)).not.toHaveCount(0);
  await expect(page.locator(`input[type="submit"].button`).first()).toBeVisible();
  await expect(page.locator(`a[href*="/dashboard/?skip-survey=1"]`).first()).toBeVisible();
  await expect(page.locator(`div:nth-of-type(1) > .os-survey__tooltip`).first()).toBeVisible();
  await expect(page.locator(`div:nth-of-type(2) > .os-survey__tooltip`).first()).toBeVisible();
  await expect(page.locator(`div:nth-of-type(3) > .os-survey__tooltip`).first()).toBeVisible();
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector('div:nth-of-type(4) > .os-survey__tooltip') }, vars)) {
    await expect(page.locator(`div:nth-of-type(4) > .os-survey__tooltip`).first()).toBeVisible();
  }
  vars.instrument = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let instruments = Array.from<any>(document.querySelectorAll<HTMLInputElement>('div#primary input[name="os-survey-instrument'));

let instrument = Math.floor(Math.random() * instruments.length) + 1

return instrument
 }, vars);
  await page.locator(`form.os-survey > div > div:first-child > label:nth-of-type(${vars.instrument ?? ''})`).filter({ visible: true }).first().click({ force: true });
  vars.instrument = ((await page.locator(`div#primary label:nth-of-type(${vars.instrument ?? ''})`).or(page.locator(`form.os-survey > div > div:first-child > label:nth-of-type(${vars.instrument ?? ''})`)).textContent()) ?? '').trim();
  vars.level = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let levels = Array.from<any>(document.querySelectorAll<HTMLInputElement>('div#primary input[name="os-survey-skill-level"]'));
let level = Math.floor(Math.random() * levels.length) + 1

return level
 }, vars);
  await page.locator(`form.os-survey > div > div:last-child > div:nth-of-type(${vars.level ?? ''}) > label`).filter({ visible: true }).first().click({ force: true });
  vars.level = ((await page.locator(`div#primary div:last-child > div:nth-of-type(${vars.level ?? ''}) > label`).or(page.locator(`form.os-survey > div > div:last-child > div:nth-of-type(${vars.level ?? ''}) > label`)).textContent()) ?? '').trim();
}

// GI: "FunnelKit path" (69e767f4fde844e9f2facd66)
export async function funnelKitPath(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.bwf-inner-col > h2.bwf-adv-heading.bwf-width-default:nth-of-type(2)`).first()).toBeVisible();
  if (vars.upsell === 'yes') {
    await page.locator(`.bwf-7b44ef41 > .wfocu-product-attr-wrapper > form > div > table.variations > tbody > tr > td.value > select[id="frequency"][name="attribute_frequency"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.upsell === 'yes') {
    try { await page.locator(`.bwf-7b44ef41 > .wfocu-product-attr-wrapper > form > div > table.variations > tbody > tr > td.value > select[id="frequency"][name="attribute_frequency"]`).first().fill(`Annually`); } catch { await page.locator(`.bwf-7b44ef41 > .wfocu-product-attr-wrapper > form > div > table.variations > tbody > tr > td.value > select[id="frequency"][name="attribute_frequency"]`).first().selectOption(`Annually`); }
  }
  if (vars.upsell === 'yes') {
    vars.unitPrice = ((await page.locator(`.wfocu_variable_price_sale > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`span.wfocu-sale-price > span > span.woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.bwf-upsell-offer-wrap.wfocu-price-wrapper > div > div > div > span > span.wfocu-sale-price > span`)).textContent()) ?? '').trim();
  }
  if (vars.upsell === 'yes') {
    vars.totalPrice = ((await page.locator(`.recurring_details_wrap > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.recurring_details_wrap > span.woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.recurring_details_wrap > span.rec_price`)).textContent()) ?? '').trim();
  }
  if (vars.upsell === 'yes') {
    await expect(page.locator(`.subscription-details`)).not.toHaveCount(0);
  }
  if (vars.upsell === 'yes') {
    vars.trial = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let days = document.querySelector('.subscription-details')
days = days.innerText
days = days.match(/\d+/g)

if (!days) {
    days = ['']
}

return days[0] }, vars);
  }
  if (vars.upsell === 'yes') {
    await page.locator(`a.bwf-btn.solid.wfocu_upsell > .bwf-btn-inner-text`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.upsell === 'no' || vars.upsell === '') {
    await page.locator(`a.bwf-btn.solid.wfocu_skip_offer > .bwf-btn-inner-text`).filter({ visible: true }).first().click({ force: true });
  }
  try {
    await expect(page.locator(`#wfocuswal-content > img`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`#wfocuswal-content > img`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
}

// GI: "Login" (68caa38a189a381f8efcb5b3)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`button.header-account-button > span.header-account-label`).or(page.locator(`a[href*="/account/"]`)).or(page.locator(`#menu-item-9247 > a`)).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).or(page.locator(`input[name="username"]`)).or(page.locator(`div.lwa-username > input`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).or(page.locator(`input[name="username"]`)).or(page.locator(`div.lwa-username > input`)).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).or(page.locator(`input[name="password"]`)).or(page.locator(`div.lwa-password > input`)).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).or(page.locator(`input[name="password"]`)).or(page.locator(`div.lwa-password > input`)).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`button[name="login"]`).or(page.locator(`input.button-primary[value="Log In"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.lwa-loading`)).not.toHaveCount(0);
  await expect(page.locator(`.lwa-loading`)).toHaveCount(0);
}

// GI: "Next Payment Date" (68f0dfa8bb0792d9334217f3)
export async function nextPaymentDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.nextPayment = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var today = new Date();
var options = { timeZone: "America/Chicago" };

// Convert the current date to 'America/Chicago' timezone
var todayInChicago = new Date(
  new Intl.DateTimeFormat('en-US', options).format(today)
);
var futureDate = new Date(todayInChicago);
if (!!`${vars.trial}`) {// Add 14 days to today's date
    futureDate.setDate(futureDate.getDate() + Number(`${vars.trial}`));
} else if ('Yearly' === 'Yearly') {
    futureDate.setFullYear(futureDate.getFullYear() + 1);
} else {
    futureDate.setMonth(futureDate.getMonth() + 1);
}

// Define month names array
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Format the date as "Month Day, Year"
var formattedDate = monthNames[futureDate.getMonth()] + " " + futureDate.getDate() + ", " + futureDate.getFullYear();


return formattedDate }, vars);
}

// GI: "Next Payment Date 1" (69f13cbfb1161572d18ddcaa)
export async function nextPaymentDate1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.nextPayment1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var today = new Date();
var options = { timeZone: "America/Chicago" };

// Convert the current date to 'America/Chicago' timezone
var todayInChicago = new Date(
  new Intl.DateTimeFormat('en-US', options).format(today)
);
var futureDate = new Date(todayInChicago);
if (!!`${vars.trial}`) {// Add 14 days to today's date
    futureDate.setDate(futureDate.getDate() + Number(`${vars.trial}`));
} else if ('Yearly' === 'Yearly') {
    futureDate.setFullYear(futureDate.getFullYear() + 1);
} else {
    futureDate.setMonth(futureDate.getMonth() + 1);
}

// Define month names array
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Format the date as "Month Day, Year"
var formattedDate = monthNames[futureDate.getMonth()] + " " + futureDate.getDate() + " " + futureDate.getFullYear();


return formattedDate }, vars);
}

// GI: "Refund by Admin" (67c84794c4f6da836cc2dc31)
export async function refundByAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const quantityElements = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>('tbody#order_line_items > tr > td.quantity > div.view'));
console.log('Found quantity elements:', quantityElements.length);

const quantities = [];

quantityElements.forEach((element, index) => {
    // Log raw content
    const text = element.textContent.trim();
    console.log(`Element ${index + 1} raw text: '${text}'`);
    
    // Try multiple extraction methods
    let qty;
    
    // Method 1: Original regex
    const match1 = text.match(/x\s*(\d+)/);
    if (match1 && match1[1]) {
        qty = parseInt(match1[1], 10);
        console.log(`Element ${index + 1} - Matched with regex 1: ${qty}`);
    } else {
        // Method 2: Simpler digit extraction
        const match2 = text.match(/\d+/);
        if (match2) {
            qty = parseInt(match2[0], 10);
            console.log(`Element ${index + 1} - Matched with regex 2: ${qty}`);
        }
    }
    
    if (qty !== undefined) {
        quantities.push(qty);
    } else {
        console.log(`Element ${index + 1} - No quantity extracted`);
    }
});

console.log('Extracted quantities:', quantities);

// Assign to refund inputs
const refundInputs = Array.from<any>(document.querySelectorAll<HTMLInputElement>('input[type="number"].refund_order_item_qty'));
console.log('Found refund inputs:', refundInputs.length);

refundInputs.forEach((input, index) => {
    if (index < quantities.length) {
        input.value = quantities[index];
        console.log(`Assigned ${quantities[index]} to refund input #${index + 1}`);
        
        // Trigger WooCommerce recalculation
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    }
}); }, vars);
  try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
  await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
}

// GI: "Refund Email" (67c84794c4c19f03efa51a58)
export async function refundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
}
