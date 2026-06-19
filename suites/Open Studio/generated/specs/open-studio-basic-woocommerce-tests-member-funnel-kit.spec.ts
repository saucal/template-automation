// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Open Studio - Basic WooCommerce Tests - Member - Funnel Kit"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { addSingleCourse, adminLogin, checkOrderOnBackend, extractUserFromEmail, fillCC, fillingSurveyInWelcomePage, funnelKitPath, login, nextPaymentDate, nextPaymentDate1 } from '../helpers/open-studio-common-steps';

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

test.describe('Open Studio - Basic WooCommerce Tests - Member - Funnel Kit', () => {

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
    "password": "fric2171Biot",
    "project": "openStudio",
    "password2": process.env.PASSWORD2 ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Join OS Membership - 01 Accept Upsell', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.upsell = `yes`;
    await page.locator(`a[href*="/join"].button.header-button`).filter({ visible: true }).first().click({ force: true });
    vars.trial = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let days1 = document.querySelector<HTMLAnchorElement>('a[href*="/checkout/?add-to-cart=17&quantity=1"]')

let days = document.querySelector('span.kt-svg-icon-list-text')
days = days.innerText
days = days.match(/\d+/g)

return days[0] }, vars);
    await page.locator(`#tab-yearly > a > span`).filter({ visible: true }).first().click({ force: true });
    vars.freq = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let freq = document.querySelector<HTMLAnchorElement>("#tab-yearly > a > span")
return freq.innerText }, vars);
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = Array.from<any>(document.querySelectorAll("article > div > div > div.kb-row-layout-wrap.kb-v-sm-hidden.kt-row-has-bg.wp-block-kadence-rowlayout > div > div > div > div > div > div > div.wp-block-kadence-tab.kt-tab-inner-content.kt-inner-tab-2 > div > div > div > div.wp-block-kadence-column.kb-section-dir-vertical > div > div > div > div.wp-block-kadence-column.kb-section-dir-horizontal > div > h3"))
price = price[1].innerText
price = price.match(/\$\d+/g)

return price[0] }, vars);
    await page.locator(`a[href*="/checkout/?add-to-cart=17&quantity=1"]`).filter({ visible: true }).first().click({ force: true });
    await nextPaymentDate(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = document.querySelector<HTMLTableElement>('#order_review > div.os-checkout-order-review > table > tbody > tr > td.product-total > ins > span > bdi , label.os-variant-switcher__annual > span.os-variant-switcher__details > span.os-variant-switcher__savings-details > span > bdi')
price = price.innerText
price = parseFloat(price.replace('$', ''));

let totalPrice = Math.ceil( price / 12 )

return '$'+totalPrice   === `${vars.unitPrice}` }, vars)).toBeTruthy();
    vars.totalPrice = ((await page.locator(`label.os-variant-switcher__annual > span.os-variant-switcher__details > span.os-variant-switcher__savings-details > span > bdi`).or(page.locator(`#order_review > div.os-checkout-order-review > table > tbody > tr > td.product-total > ins > span > bdi`)).textContent()) ?? '').trim();
    vars.totalPrice = `${vars.totalPrice ?? ''}.00`;
    await expect(page.locator(`#order_summary_field > div > table > tfoot > tr:nth-child(2) > td > span.os-trial-checkout-notice`).or(page.locator(`#order_review > div.os-checkout-order-review > table > tfoot > tr:nth-child(2) > td > span.os-trial-checkout-notice`)).first()).toContainText(`You are starting ${vars.trial ?? ''}-day free trial!`);
    vars.unitPrice = ((await page.locator(`#order_summary_field > div > table > tfoot > tr:nth-child(2) > td > strong > span > bdi`).or(page.locator(`#order_review > div.os-checkout-order-review > table > tfoot > tr:nth-child(2) > td > strong > span > bdi`)).textContent()) ?? '').trim();
    await expect(page.locator(`#order_review > div.os-checkout-order-review > table > tfoot > tr.order-total.recurring-total > td`).or(page.locator(`#order_summary_field > div > table > tfoot > tr.order-total.recurring-total > td`)).first()).toContainText(`${vars.totalPrice ?? ''}`);
    await expect(page.locator(`#order_review > div.os-checkout-order-review > table > tfoot > tr.order-total.recurring-total > td`).or(page.locator(`#order_summary_field > div > table > tfoot > tr.order-total.recurring-total > td`)).first()).toContainText(` / year`);
    await expect(page.locator(`#order_review > div.os-checkout-order-review > table > tfoot > tr.order-total.recurring-total > td`).or(page.locator(`#order_summary_field > div > table > tfoot > tr.order-total.recurring-total > td`)).first()).toContainText(`Next renewal:${vars.nextPayment ?? ''}`);
    await expect(page.locator(`input[checked='checked']#os-sub-variant-17`)).not.toHaveCount(0);
    await expect(page.locator(`input#os-sub-variant-16[checked="checked"]`)).toHaveCount(0);
    await fillCC(page, vars);
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#account_password`).first().fill(`fric`); } catch { await page.locator(`#account_password`).first().selectOption(`fric`); }
    await expect(page.locator(`small.woocommerce-password-hint`)).not.toHaveCount(0);
    try { await page.locator(`#account_password`).first().fill(``); } catch { await page.locator(`#account_password`).first().selectOption(``); }
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
    await expect(page.locator(`small.woocommerce-password-hint`)).toHaveCount(0);
    await expect(page.locator(`#account_password_confirm`)).toHaveCount(0);
    await page.locator(`#account_password_field > span button.show-password-input`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#account_password_field > span button.show-password-input.display-password`)).not.toHaveCount(0);
    await page.locator(`#account_password_field > span button.show-password-input`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#account_password_field > span button.show-password-input.display-password`)).toHaveCount(0);
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.upsellFlow = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function(resolve, reject) {
  var selector = '.bwf-inner-col > h2.bwf-adv-heading.bwf-width-default';
  var timeout = 10000;

  if (document.querySelector(selector)) {
    resolve(true);
    return;
  }

  var timer = setTimeout(function() {
    observer.disconnect();
    resolve(false);
  }, timeout);

  var observer = new MutationObserver(function() {
    if (document.querySelector(selector)) {
      clearTimeout(timer);
      observer.disconnect();
      resolve(true);
    }
  });

  var target = document.body || document.documentElement;
  observer.observe(target, {
    childList: true,
    subtree: true,
    attributes: true
  });
}) }, vars);
    if (vars.upsellFlow) {
      await funnelKitPath(page, vars);
    }
    vars.orderNumber = ((await page.locator(`.order > strong`).or(page.locator(`div > div > div.bwf-align-wrap-full > div > div > div > p:nth-child(1).bwf-adv-heading.bwf-width-default`)).textContent()) ?? '').trim();
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let orderNumber = `${vars.orderNumber}`.match(/\d+/g)

return orderNumber[0] }, vars);
    await expect(page.locator(`.email > strong`).or(page.locator(`div > div > div.bwf-align-wrap-full > div > div > div > p.bwf-adv-heading.bwf-width-default > strong`)).first()).toHaveText(`${vars.email ?? ''}`);
    await fillingSurveyInWelcomePage(page, vars);
    if (!!vars.trial && vars.upselllow) {
      await expect(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div > div > div.wfty_p_name > a > span`).first()).toContainText(`Open Studio Pro with ${vars.trial ?? ''} Day Trial - Annually`);
    }
    if (!vars.trial && vars.upsellFlow) {
      await expect(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div > div > div.wfty_p_name > a > span`).first()).toContainText(`Open Studio Pro - Annually`);
    }
    if (!vars.upsellFlow) {
      await expect(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div > div > div.wfty_p_name > a > span`).first()).toContainText(`Open Studio - Annually`);
    }
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div > div.wfty_rightDiv > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > table > tfoot > tr:nth-child(1) > td > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > table > tfoot > tr:nth-child(3) > td > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subID = ((await page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/"]`).textContent()) ?? '').trim();
    vars.subID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subID = `${vars.subID}`
subID = subID.match(/[0-9]+/g)
return subID[0] }, vars);
    await expect(page.locator(`td.subscription-status`).or(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/"] > small`)).or(page.locator(`tbody > tr > td.subscription-id.order-number > small`)).first()).toContainText(`Active`);
    await nextPaymentDate(page, vars);
    await expect(page.locator(`td.subscription-next-payment`).first()).toContainText(`${vars.nextPayment ?? ''}`);
    await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.totalPrice ?? ''} / year`);
    await page.locator(`input[type="submit"].button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === `${vars.startUrl}welcome-to-open-studio/` }, vars)).toBeTruthy();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let courses = Array.from<any>(document.querySelectorAll('div.os-course'))
let i = 0
let i2 = 0

for (let course of courses) {
    let levels = Array.from<any>(course.querySelectorAll('div.os-course__meta > div > a.os-term-skill.os-term__all-levels, div.os-course__meta > div > a.os-term-skill'));
    for (let level of levels) {
        if (level.innerText ===  "All levels" || level.innerText === `${vars.level}`) {
            i++
        } 
    }
}
    

for (let course of courses) {
    let instruments = Array.from<any>(course.querySelectorAll('div.os-course__meta > div > a.os-term-instrument'));
    for (let instrument of instruments) {
        if (instrument.innerText === `${vars.instrument}`) {
            i2++
        } 
    }
}

return courses.length === i && courses.length === i2
     }, vars)).toBeTruthy();
    await page.locator(`a[href*="/dashboard/"].button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === `${vars.startUrl}dashboard/` }, vars)).toBeTruthy();
    if (false) {
      await page.locator(`.nav-drop-title-wrap > .kadence-svg-iconset > svg`).first().hover();
    }
    await page.locator(`.header-navigation .header-menu-container ul ul li.menu-item:nth-of-type(5) > a[href*="/my-account/"]`).or(page.locator(`a[href*="/my-account/"] > .kadence-svg-iconset > svg`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await nextPaymentDate1(page, vars);
    await expect(page.locator(`.os-my-dashboard__next > span`).first()).toContainText(`${vars.nextPayment1 ?? ''}`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`${vars.totalPrice ?? ''}`);
    await expect(page.locator(`.os-my-dashboard__frequency > span`).first()).toContainText(`Yearly subscription`);
    await expect(page.locator(`a[href*="switch-subscription="]`).first()).toContainText(`Change subscription`);
    await expect(page.locator(`a[href*="/my-account/view-subscription/${vars.subID ?? ''}/"].button`).first()).toContainText(`Manage subscription`);
    if (vars.upsellFlow) {
      await expect(page.locator(`.os-account-membership`).first()).toHaveText(`YOUR CURRENT PLAN
OPEN STUDIO PRO`);
    }
    if (!vars.upsellFlow) {
      await expect(page.locator(`.os-account-membership`).first()).toHaveText(`YOUR CURRENT PLAN
OPEN STUDIO`);
    }
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
    await expect(page.locator(`div.woocommerce-MyAccount-content > table > tbody > tr:nth-child(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > span.woocommerce-Price-amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-number`).first()).toHaveText(`${vars.orderNumber ?? ''}`);
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Completed`);
    if (!!vars.trial && vars.upsellFlow) {
      await expect(page.locator(`tr > td.woocommerce-table__product-name.product-name > a`).first()).toContainText(`Open Studio Pro with 14 Day Trial - Annually`);
    }
    if (!vars.trial && vars.upsellFlow) {
      await expect(page.locator(`tr > td.woocommerce-table__product-name.product-name > a`).first()).toContainText(`Open Studio Pro - Annually`);
    }
    if (!vars.upsellFlow) {
      await expect(page.locator(`tr > td.woocommerce-table__product-name.product-name > a`).first()).toContainText(`Open Studio - Annually`);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('li > p') }, vars)) {
      await expect(page.locator(`li > p`).first()).toContainText(`Annually`);
    }
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subID ?? ''}/"]`).first()).toContainText(`#${vars.subID ?? ''}`);
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
    await expect(page.locator(`td.subscription-next-payment`).first()).toContainText(`${vars.nextPayment ?? ''}`);
    await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.totalPrice ?? ''} / year`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}

${vars.email ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "My Subscription")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/view-subscription/${vars.subID ?? ''}/"]`)).or(page.locator(`xpath=//a[contains(text(), "Subscriptions")]`)).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/${vars.subID ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/${vars.subID ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
    await expect(page.locator(`tr:nth-of-type(4) > td:nth-of-type(2)`).first()).toHaveText(`${vars.nextPayment ?? ''}`);
    if (!!vars.trial && vars.upsellFlow) {
      await expect(page.locator(`a[href*="/product/open-studio"]`).first()).toContainText(`Open Studio Pro with 14 Day Trial - Annually`);
    }
    if (!vars.trial && vars.upsellFlow) {
      await expect(page.locator(`a[href*="/product/open-studio"]`).first()).toContainText(`Open Studio Pro - Annually`);
    }
    if (!) {
      await expect(page.locator(`a[href*="/product/open-studio"]`).first()).toContainText(`Open Studio - Annually`);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('li > p') }, vars)) {
      await expect(page.locator(`li > p`).first()).toContainText(`Annually`);
    }
    await expect(page.locator(`td.product-total`).first()).toHaveText(`${vars.totalPrice ?? ''} / year`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.totalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toHaveText(`${vars.totalPrice ?? ''} / year`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}

${vars.email ?? ''}`);
  });

  test('01 - Join OS Membership - 02 Backend & renew', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.qty = `1`;
    vars.prod_desc = `${vars.description ?? ''}`;
    vars.subtotalPrice = `${vars.unitPrice ?? ''}`;
    vars.total = `${vars.unitPrice ?? ''}`;
    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    vars.subscriptionID = `${vars.subID ?? ''}`;
    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await adminLogin(page, vars);
    await checkOrderOnBackend(page, vars);
  });

  test('02 - Join OS Membership - Ignoring Upsell', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.upsell = `no`;
    vars.email1 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    await page.locator(`a[href*="/join"].button.header-button`).filter({ visible: true }).first().click({ force: true });
    vars.trial = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let days = document.querySelector('span.kt-svg-icon-list-text')
days = days.innerText
days = days.match(/\d+/g)

return days[0] }, vars);
    await page.locator(`#tab-monthly > a`).filter({ visible: true }).first().click({ force: true });
    vars.freq = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let freq = document.querySelector<HTMLAnchorElement>("#tab-monthly > a > span")
return freq.innerText }, vars);
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let priceold = document.querySelector('.wp-block-kadence-advancedheading.has-theme-palette-3-color > em')
let price = document.querySelector("#post-869418 > div > div > div.kb-row-layout-wrap.kb-row-layout-id869418_af3918-fb.alignfull.kb-v-sm-hidden.kt-row-has-bg.wp-block-kadence-rowlayout > div > div > div > div > div > div > div.wp-block-kadence-tab.kt-tab-inner-content.kt-inner-tab-1.kt-inner-tabbcdbad-58 > div > div > div > div.wp-block-kadence-column.kadence-column869418_b2aafb-e4 > div > div > div > div.wp-block-kadence-column.kadence-column869418_bf8826-ef.kb-section-dir-horizontal > div > h3")
price = price.innerText
price = price.match(/\$\d+/g)

return price[0] }, vars);
    await page.locator(`a[href*="/checkout/?add-to-cart=16&quantity=1"]`).filter({ visible: true }).first().click({ force: true });
    await nextPaymentDate(page, vars);
    await expect(page.locator(`div.os-variant-switcher__options > label.os-variant-switcher__monthly > span.os-variant-switcher__price > strong > span`).or(page.locator(`#order_review > div.os-checkout-order-review > table > tbody > tr > td.product-total > span > span.woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    vars.totalPrice = ((await page.locator(`#order_summary_field > div > table > tbody > tr > td.product-total > div > span > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`#order_summary_field > div > table > tbody > tr > td.product-total .subscription-details`).first()).toContainText(`/ month with a ${vars.trial ?? ''}-day free trial`);
    await expect(page.locator(`.product-name > span`).first()).toContainText(`Open Studio - ${vars.freq ?? ''}`);
    await expect(page.locator(`#order_summary_field > div > table > tfoot > tr:nth-child(2) > td > strong > span > bdi`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`#order_summary_field > div > table > tfoot > tr.order-total.recurring-total > td`).first()).toContainText(`${vars.totalPrice ?? ''}`);
    await expect(page.locator(`#order_summary_field > div > table > tfoot > tr.order-total.recurring-total > td`).first()).toContainText(`/ month`);
    await expect(page.locator(`#order_summary_field > div > table > tfoot > tr.order-total.recurring-total > td`).first()).toContainText(`Next renewal:${vars.nextPayment ?? ''}`);
    await expect(page.locator(`input[checked='checked']#os-sub-variant-16`)).not.toHaveCount(0);
    await expect(page.locator(`input#os-sub-variant-17[checked="checked"]`)).toHaveCount(0);
    try { await page.locator(`#billing_email`).first().fill(`${vars.email1 ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email1 ?? ''}`); }
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.upsellFlow = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function(resolve, reject) {
  var selector = '.bwf-inner-col > h2.bwf-adv-heading.bwf-width-default';
  var timeout = 30000;

  if (document.querySelector(selector)) {
    resolve(true);
    return;
  }

  var timer = setTimeout(function() {
    observer.disconnect();
    resolve(false);
  }, timeout);

  var observer = new MutationObserver(function() {
    if (document.querySelector(selector)) {
      clearTimeout(timer);
      observer.disconnect();
      resolve(true);
    }
  });

  var target = document.body || document.documentElement;
  observer.observe(target, {
    childList: true,
    subtree: true,
    attributes: true
  });
}) }, vars);
    if (vars.upsellFlow) {
      await funnelKitPath(page, vars);
    }
    vars.orderNumber = ((await page.locator(`.order > strong`).or(page.locator(`div > div > div.bwf-align-wrap-full > div > div > div > p:nth-child(1).bwf-adv-heading.bwf-width-default`)).textContent()) ?? '').trim();
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let orderNumber = `${vars.orderNumber}`.match(/\d+/g)

return orderNumber[0] }, vars);
    await expect(page.locator(`.email > strong`).or(page.locator(`div > div > div.bwf-align-wrap-full > div > div > div > p.bwf-adv-heading.bwf-width-default > strong`)).first()).toHaveText(`${vars.email1 ?? ''}`);
    await expect(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div > div > div.wfty_p_name > a > span`).first()).toContainText(`Open Studio - ${vars.freq ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > div > div.wfty_rightDiv > span`)).first()).toHaveText(`$0.00`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > table > tfoot > tr:nth-child(1) > td > span`)).first()).toHaveText(`$0.00`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`div.wfty_box.wfty_order_details > div.wfty_pro_list_cont.wfty_show_images > table > tfoot > tr:nth-child(3) > td > span`)).first()).toHaveText(`$0.00`);
    vars.subID = ((await page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/"]`).textContent()) ?? '').trim();
    vars.subID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subID = `${vars.subID}`
subID = subID.match(/[0-9]+/g)
return subID[0] }, vars);
    await expect(page.locator(`td.subscription-status`).or(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/"] > small`)).or(page.locator(`tbody > tr > td.subscription-id.order-number > small`)).first()).toContainText(`Active`);
    await expect(page.locator(`td.subscription-next-payment`).first()).toContainText(`${vars.nextPayment ?? ''}`);
    await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.unitPrice ?? ''}.00 / month`);
    await page.locator(`a[href="${vars.startUrl ?? ''}dashboard/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href

return url === `${vars.startUrl}dashboard/` }, vars)).toBeTruthy();
  });

  test('03 - Login & My Account', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email1 ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    vars.admin = ``;
    await login(page, vars);
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === `${vars.startUrl}welcome-to-open-studio/` }, vars)).toBeTruthy();
    await fillingSurveyInWelcomePage(page, vars);
    await page.locator(`input[type="submit"].button`).filter({ visible: true }).first().click({ force: true });
    if (false) {
      await page.locator(`.nav-drop-title-wrap > .kadence-svg-iconset > svg`).first().hover();
    }
    await page.locator(`.header-navigation .header-menu-container ul ul li.menu-item:nth-of-type(5) > a[href*="/my-account/"]`).or(page.locator(`a[href*="/my-account/"] > .kadence-svg-iconset > svg`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
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
    await expect(page.locator(`.os-my-dashboard__next > span`).first()).toContainText(`${vars.nextPayment1 ?? ''}`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
    await expect(page.locator(`.os-my-dashboard__frequency > span`).first()).toContainText(`${vars.freq ?? ''} subscription`);
    try {
      await expect(page.locator(`a[href*="/product/open-studio-subscription/?switch-subscription=${vars.subID ?? ''}&item="]`).first()).toContainText(`Change subscription`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`a[href*="/my-account/view-subscription/${vars.subID ?? ''}/"].button`).first()).toContainText(`Manage subscription`);
    await expect(page.locator(`.os-account-membership`).first()).toHaveText(`YOUR CURRENT PLAN
OPEN STUDIO`);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`$0.00`);
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-number`).first()).toHaveText(`${vars.orderNumber ?? ''}`);
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Completed`);
    await expect(page.locator(`a[href*="/product/open-studio/?attribute_frequency=${vars.freq ?? ''}"]`).first()).toContainText(`Open Studio - ${vars.freq ?? ''}`);
    try {
      await expect(page.locator(`li > p`).first()).toContainText(`${vars.freq ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subID ?? ''}/"]`).first()).toContainText(`#${vars.subID ?? ''}`);
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
    await expect(page.locator(`td.subscription-next-payment`).first()).toContainText(`${vars.nextPayment ?? ''}`);
    await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.unitPrice ?? ''}.00 / month`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}

${vars.email1 ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "My Subscription")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/view-subscription/${vars.subID ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
    await expect(page.locator(`tr:nth-of-type(4) > td:nth-of-type(2)`).first()).toHaveText(`${vars.nextPayment ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td:nth-of-type(2)`).first()).toHaveText(`${vars.nextPayment ?? ''}`);
    await expect(page.locator(`a[href*="/product/open-studio/"]`).first()).toContainText(`Open Studio - ${vars.freq ?? ''}`);
    try {
      await expect(page.locator(`li > p`).first()).toContainText(`${vars.freq ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`td.product-total`).first()).toHaveText(`${vars.unitPrice ?? ''}.00 / month`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toHaveText(`${vars.unitPrice ?? ''}.00 / month`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}

${vars.email1 ?? ''}`);
    await page.locator(`a[href*="/my-account/my-profile/"]`).filter({ visible: true }).first().click({ force: true });
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); /*let options = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('select#os-survey-instrument > option[selected]'));
let instrument;
options.forEach(option => {
    if (!option.disabled) {
        instrument = option.innerText
    }
});*/

const option = document.querySelector<HTMLInputElement>('input[name="os-survey-instrument"][checked]').getAttribute('id');

const instrument = document.querySelector('label[for="'+option+'"]').innerText

return instrument === `${vars.instrument}` }, vars)).toBeTruthy();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); /*let options = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('select#os-survey-skill-level > option[selected]'));
let level;
options.forEach(option => {
    if (!option.disabled) {
        level = option.innerText
    }
});*/

const option = document.querySelector<HTMLInputElement>('input[name="os-survey-skill-level"][checked]').getAttribute('id');

const level = document.querySelector('label[for="'+option+'"]').innerText

return level === `${vars.level}` }, vars)).toBeTruthy();
    vars.instrument = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const instruments = Array.from<any>(document.querySelectorAll<HTMLInputElement>('input[name="os-survey-instrument"]'));
const instrument = Math.floor(Math.random() * instruments.length)
const instrumentText = document.querySelector('label[for="'+instruments[instrument].getAttribute('id')+'"]').innerText

return instrumentText }, vars);
    await page.locator(`xpath=//label[contains(text(),'${vars.instrument ?? ''}')]`).filter({ visible: true }).first().click({ force: true });
    vars.level = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const levels = Array.from<any>(document.querySelectorAll<HTMLInputElement>('input[name="os-survey-skill-level"]'));
const level = Math.floor(Math.random() * levels.length)
const levelText = document.querySelector('label[for="'+levels[level].getAttribute('id')+'"]').innerText

return levelText }, vars);
    await page.locator(`xpath=//label[contains(text(),'${vars.level ?? ''}')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[type="submit"].button[value="Update"]`).filter({ visible: true }).first().click({ force: true });
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); /*let options = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('select#os-survey-instrument > option[selected]'));
let instrument;
options.forEach(option => {
    if (!option.disabled) {
        instrument = option.innerText
    }
});*/

const option = document.querySelector<HTMLInputElement>('input[name="os-survey-instrument"][checked]').getAttribute('id');

const instrument = document.querySelector('label[for="'+option+'"]').innerText

return instrument === `${vars.instrument}` }, vars)).toBeTruthy();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); /*let options = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('select#os-survey-skill-level > option[selected]'));
let level;
options.forEach(option => {
    if (!option.disabled) {
        level = option.innerText
    }
});*/

const option = document.querySelector<HTMLInputElement>('input[name="os-survey-skill-level"][checked]').getAttribute('id');

const level = document.querySelector('label[for="'+option+'"]').innerText

return level === `${vars.level}` }, vars)).toBeTruthy();
  });

  test('04 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === `${vars.startUrl}dashboard/` }, vars)).toBeTruthy();
    await page.goto(`${vars.startUrl ?? ''}`);
    await page.waitForLoadState('load');
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === `${vars.startUrl}dashboard/` }, vars)).toBeTruthy();
  });

  test('05 - Menu Mobile', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`svg.kadence-svg-icon.kadence-menu-svg`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
    await page.waitForTimeout(2000);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === `${vars.startUrl}dashboard/` }, vars)).toBeTruthy();
    await page.locator(`svg.kadence-svg-icon.kadence-menu-svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#mobile-menu > .menu-item.menu-item-type-post_type_archive.menu-item-object-artist > a[href*="/instructors/"]`).first()).toContainText(`Instructors`);
    await expect(page.locator(`#mobile-menu > .menu-item.menu-item-type-post_type_archive.menu-item-object-sfwd-courses > a[href*="/courses/"]`).first()).toContainText(`Courses`);
    await expect(page.locator(`#mobile-menu > .menu-item.menu-item-type-post_type.menu-item-object-page > a[href*="/events/"]`).first()).toContainText(`Live Sessions`);
    await expect(page.locator(`div.site-header-item:nth-of-type(2) > .vs-logged-in-false > div > a[href*="/join"].button.button-size-medium.button-style-filled`)).toHaveCount(0);
    await expect(page.locator(`div.site-header-item:nth-of-type(3) > .header-account-control-wrap.header-account-action-modal.header-account-style-label > button.drawer-toggle.header-account-button > .header-account-label`)).toHaveCount(0);
    await expect(page.locator(`.menu-item > a[href*="/dashboard/"]`).first()).toContainText(`Dashboard`);
    await expect(page.locator(`#mobile-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(2) > a[href*="/my-account/"]`).first()).toContainText(`Account`);
    await expect(page.locator(`li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(7) > a[href*="/mybookmarks/"]`).first()).toContainText(`My Bookmarks`);
    await expect(page.locator(`li#menu-item-1123040 > a[href*="/mentor-sessions/"]`).first()).toContainText(`Mentor Sessions`);
    await expect(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(9) > a`).first()).toContainText(`Log out`);
  });

  test('06 - Menu desktop', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="os-open-menu"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#os-open-menu`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#primary-menu > .menu-item.menu-item-type-post_type_archive.menu-item-object-artist > a[href*="/instructors/"]`).first()).toContainText(`Instructors`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(2) > a[href*="/courses/"]`).first()).toContainText(`Courses & Lessons`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/events/"]`).first()).toContainText(`Live Schedule`);
    await expect(page.locator(`li#menu-item-1123032 > a[href*="/mentor-sessions/"]`).first()).toContainText(`Mentor Sessions`);
    await expect(page.locator(`li#menu-item-1123034 > a[href*="/gps/"]`).first()).toContainText(`Guided Practice Sessions`);
    await expect(page.locator(`div.site-header-item:nth-of-type(2) > .site-branding.site-brand-logo-only > a[href*="/dashboard/"].brand.has-logo-image > img.custom-logo`)).not.toHaveCount(0);
    await expect(page.locator(`.header-loggedin-menu > li:nth-of-type(1) > a[href*="/courses/"]`)).not.toHaveCount(0);
    await expect(page.locator(`li:nth-of-type(2) > a[href*="/events/"]`)).not.toHaveCount(0);
    await expect(page.locator(`.header-loggedin-menu > li:nth-of-type(3) > a[href*="/community/"]`)).not.toHaveCount(0);
    await expect(page.locator(`div.site-header-item:nth-of-type(2) > div > button[aria-label="View Search Form"].drawer-toggle.search-toggle-style-default > .search-toggle-icon > svg.kadence-svg-icon.kadence-search-svg > path`)).not.toHaveCount(0);
    await expect(page.locator(`.social-icon-custom-svg > svg > path`)).not.toHaveCount(0);
    await expect(page.locator(`a[href*="/my-account/"] > .kadence-svg-iconset > svg > path:nth-of-type(2)`)).not.toHaveCount(0);
  });

  test('17 - Course Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="os-open-menu"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#os-open-menu`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.goto(`${vars.startUrl ?? ''}courses`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/piano/"].os-instruments-grid__instrument`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/courses/jazz-piano-jump-start/"] > img.attachment-woocommerce_single.size-woocommerce_single`).or(page.locator(`#post-1233989 > h3 > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/join/"]`)).toHaveCount(0);
  });

  test('19 - Session page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="os-open-menu"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#os-open-menu`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/events/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(10000);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.os-calendar-event-item:not(.os-calendar-event-item-past):not(.os-calendar-event-item-pro) > div > div > a'));
return elements.length === 0 }, vars)) {
      await page.locator(`a:nth-of-type(2).os-event-navigation-link`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.os-calendar-event-item:not(.os-calendar-event-item-past):not(.os-calendar-event-item-pro) > div > div > a'));
return elements.length === 0 }, vars)) {
      await page.waitForTimeout(10000);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.os-calendar-event-item:not(.os-calendar-event-item-past):not(.os-calendar-event-item-pro) > div > div > a'));
return elements.length === 0 }, vars)) {
      await page.locator(`a:nth-of-type(2).os-event-navigation-link`).filter({ visible: true }).first().click({ force: true });
    }
    await page.waitForTimeout(10000);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.os-calendar-event-item:not(.os-calendar-event-item-past):not(.os-calendar-event-item-pro) > div > div > a'));
return elements.length >= 1 }, vars)) {
      await page.locator(`div.os-calendar-event-item:not(.os-calendar-event-item-past):not(.os-calendar-event-item-pro) > div > div > a`).filter({ visible: true }).first().click({ force: true });
    }
    if (page.url().includes(vars.startUrlos-sessions/')) {
      await expect(page.locator(`.os-single-event__join`).or(page.locator(`.os-event-join-event`))).toHaveCount(0);
    }
    if (page.url().includes(vars.startUrlos-sessions/')) {
      await expect(page.locator(`a[href*="/pro-old/"].button`)).toHaveCount(0);
    }
    if (page.url().includes(vars.startUrlos-sessions/')) {
      await expect(page.locator(`a[href*="/pro-old/"].button`)).toHaveCount(0);
    }
    if (false) {
      await expect(page.locator(`span.os-event-timer`).first()).toBeVisible();
    }
    if (page.url().includes(vars.startUrlos-sessions/')) {
      await expect(page.locator(`a.os-event-join-event`).first()).toBeVisible();
    }
    if (page.url().includes(vars.startUrlos-sessions/')) {
      await page.locator(`div.os-sessions-back-link > a`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`div.os-calendar-event-item.os-calendar-event-item-pro:not(.os-calendar-event-item-past) > div > div > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.os-single-event__joindesc`).first()).toContainText(`You need to be an Open Studio Pro member to attend this session.
Join now`);
    await expect(page.locator(`a[href*="pro"].button`)).not.toHaveCount(0);
    await expect(page.locator(`a[href*="pro"].button`).first()).toHaveText(`Join now`);
  });

  test('20 - Community page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.locator(`.header-loggedin-menu > li:nth-of-type(3) > a[href*="/community/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === `${vars.startUrl}community/` }, vars)).toBeTruthy();
  });

  test('21 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email1 ?? ''}`;
    await page.locator(`button.header-account-button > span.header-account-label`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/lost-password"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.email1 ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email1 ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "reset your password")]`).or(page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(5000);
    try {
      await page.locator(`#body_content_inner > p > a.link`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await expect(page.locator(`#password_1`).first()).toBeVisible();
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Your password has been reset successfully.`);
    vars.pass = `${vars.password2 ?? ''}`;
  });

  test('22 - Purchase Single Course', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.email2 = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    await addSingleCourse(page, vars);
    await expect(page.locator(`td.product-name`).or(page.locator(`table > tbody > tr > td.product-name-area > div.product-name.wfacp_summary_img_true > span`)).first()).toContainText(`${vars.description2 ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`td.product-total > ins > .woocommerce-Price-amount > bdi`)).first()).toContainText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`tr.order-total > td .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice2 ?? ''}`);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242424242424242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242424242424242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`04 / 27`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`04 / 27`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`234`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`234`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().fill(`90210`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().selectOption(`90210`); }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Billing Email is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Password is a required field.
Please use a password with at least 8 characters.`);
    try { await page.locator(`#billing_email`).first().fill(`${vars.email2 ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email2 ?? ''}`); }
    try { await page.locator(`#account_password`).first().fill(`fric`); } catch { await page.locator(`#account_password`).first().selectOption(`fric`); }
    await expect(page.locator(`small.woocommerce-password-hint`)).not.toHaveCount(0);
    try { await page.locator(`#account_password`).first().fill(``); } catch { await page.locator(`#account_password`).first().selectOption(``); }
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
    await expect(page.locator(`small.woocommerce-password-hint`)).toHaveCount(0);
    await expect(page.locator(`#account_password_confirm`)).toHaveCount(0);
    await page.locator(`#account_password_field > span > button.show-password-input`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#account_password_field > span > button.show-password-input.display-password`)).not.toHaveCount(0);
    await page.locator(`#account_password_field > span > button.show-password-input`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#account_password_field > span > button.show-password-input.display-password`)).toHaveCount(0);
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242424242424242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242424242424242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`04 / 27`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`04 / 27`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`234`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`234`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().fill(`90210`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="postalCode"]`).first().selectOption(`90210`); }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await blockUI(page, vars);
    await funnelKitPath(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = ((await page.locator(`.order > strong`).or(page.locator(`div > div > div.bwf-align-wrap-full > div > div > div > p:nth-child(1).bwf-adv-heading.bwf-width-default`)).textContent()) ?? '').trim();
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let orderNumber = `${vars.orderNumber}`.match(/\d+/g)

return orderNumber[0] }, vars);
    await expect(page.locator(`.email > strong`).or(page.locator(`div > div > div.bwf-align-wrap-full > div > div > div > p.bwf-adv-heading.bwf-width-default > strong`)).first()).toHaveText(`${vars.email2 ?? ''}`);
    await expect(page.locator(`.os-chintzy-show-link__card`)).not.toHaveCount(0);
    await expect(page.locator(`h3.os-course__title > a[href*="/courses/"]`).or(page.locator(`div > div > div > div > div > div > div > div > div.os-chintzy-show-link > div > h4`)).first()).toContainText(`${vars.description2 ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-name`).or(page.locator(`div > div > div > div > div > div > div > div.wfty_pro_list_cont.wfty_show_images > div > div.wfty_leftDiv.wfty_clearfix > div.wfty_p_name`)).first()).toContainText(`${vars.description2 ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div > div > div > div > div > div > div > div.wfty_pro_list_cont.wfty_show_images > div > div.wfty_rightDiv > span`)).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await page.locator(`.site-header-main-section-center > .site-header-item > .site-branding.site-brand-logo-only > a[href*="/dashboard/"].brand.has-logo-image > img.custom-logo`).or(page.locator(`div.site-header-item:nth-of-type(2) > .site-branding.site-brand-logo-only > a[href*="/dashboard/"].brand.has-logo-image > img.custom-logo`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === `${vars.startUrl}dashboard/` }, vars)).toBeTruthy();
    await expect(page.locator(`div#block_cd7bfb6a5a5cb6c1bd0f72a84c5fe8f0 h4.openstudio-courses-list-header-label-text`).first()).toBeVisible();
    await expect(page.locator(`div#block_cd7bfb6a5a5cb6c1bd0f72a84c5fe8f0 h4.openstudio-courses-list-header-label-text`).first()).toHaveText(`Purchased courses`);
    await expect(page.locator(`div#block_cd7bfb6a5a5cb6c1bd0f72a84c5fe8f0 li.openstudio-courses-list-row-item`).first()).toBeVisible();
    await expect(page.locator(`#block_cd7bfb6a5a5cb6c1bd0f72a84c5fe8f0 > div.openstudio-courses-list.cols-4 > div > ul > li > div > div > a > span.openstudio-courses-list-row-item-content-title`).first()).toContainText(`${vars.description2 ?? ''}`);
    await page.locator(`a[href*="/my-account/"] > .kadence-svg-iconset > svg`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.os-my-dashboard__next > span`)).toHaveCount(0);
    await expect(page.locator(`.woocommerce-Price-amount`)).toHaveCount(0);
    await expect(page.locator(`.os-my-dashboard__frequency > span`)).toHaveCount(0);
    await expect(page.locator(`a[href*="/product/open-studio-subscription/?switch-subscription"]`)).toHaveCount(0);
    await expect(page.locator(`a[href*="/my-account/view-subscription/"].button`)).toHaveCount(0);
    await expect(page.locator(`a[href*="/join"].button`)).not.toHaveCount(0);
    await expect(page.locator(`.os-account-membership`).first()).toHaveText(`NO PLAN IS ACTIVE`);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-number`).first()).toHaveText(`${vars.orderNumber ?? ''}`);
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Completed`);
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}

${vars.email2 ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "Purchased courses")]`).or(page.locator(`a[href*="/my-account/members-area/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h3.os-course__title > a[href*="/courses/jazz-piano-jump-start/welcome-lets-jump-start-2/"]`).or(page.locator(`#post-1233989 > h3 > a`)).first()).toContainText(`Jazz Piano Jump-Start`);
    await page.locator(`h3.os-course__title > a[href*="/courses/jazz-piano-jump-start/welcome-lets-jump-start-2/"]`).or(page.locator(`#post-1233989 > h3 > a`)).filter({ visible: true }).first().click({ force: true });
  });

  test('24 - Bookmark usage', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    await expect(page.locator(`a[href*="/mybookmarks/"] > .social-icon-custom-svg > svg > path`)).not.toHaveCount(0);
    await page.locator(`li:nth-of-type(2) > .cbxwpbkmarkwrap.cbxwpbkmarkwrap_loggedin.cbxwpbkmarkwrap_user_cat.cbxwpbkmarkwrap-sfwd-courses.os-courses-archive-bookmark > a[href="#"][title="Bookmark This"].cbxwpbkmarktrig.cbxwpbkmarktrig-button-addto`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.cbxwpbkmark_cat_book_list > .cbxlbjs.cbxwpbkmark-lbjs > .cbxwpbookmark-list-generic.cbxlbjs-list.cbxwpbkmarklist > li.cbxlbjs-item:nth-of-type(1) > [title="My Favorite Courses"].cbxlbjs-item-name`).first()).toContainText(`My Favorite Courses`);
    await expect(page.locator(`.cbxwpbkmark_cat_book_list > .cbxlbjs.cbxwpbkmark-lbjs > .cbxwpbookmark-list-generic.cbxlbjs-list.cbxwpbkmarklist > li.cbxlbjs-item:nth-of-type(2) > [title="My Favorite Lessons"].cbxlbjs-item-name`).first()).toContainText(`My Favorite Lessons`);
    await page.locator(`.cbxwpbkmark_cat_book_list > .cbxlbjs.cbxwpbkmark-lbjs > .cbxwpbookmark-list-generic.cbxlbjs-list.cbxwpbkmarklist > li.cbxlbjs-item:nth-of-type(1) > [title="My Favorite Courses"].cbxlbjs-item-name`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.cbxwpbkmark_cat_book_list > div > ul > li[data-incat="1"]`)).not.toHaveCount(0);
    await page.locator(`li:nth-of-type(2) > .cbxwpbkmarkwrap.cbxwpbkmarkwrap_loggedin.cbxwpbkmarkwrap_user_cat.cbxwpbkmarkwrap-sfwd-courses.os-courses-archive-bookmark > .cbxwpbkmarklistwrap > .addto-head > [title="Click to close bookmark panel/modal"].cbxwpbkmarktrig_close > i.cbx-icon > svg`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/mybookmarks/"] > .social-icon-custom-svg > svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.os-bookmark-item`)).not.toHaveCount(0);
    await expect(page.locator(`button.os-bookmark-item__remove`).first()).toContainText(`Remove`);
    await page.locator(`button.os-bookmark-item__remove`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.awn-popup-body > .os-bookmark-popup__actions > button.os-folder-submit`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.awn-popup-body`)).not.toHaveCount(0);
    await expect(page.locator(`#awn-popup-wrapper`)).toHaveCount(0);
    await expect(page.locator(`.os-bookmarks__count > strong`).first()).toContainText(`0`);
  });

});
