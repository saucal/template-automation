// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Deans Graphics - Place Order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail, login, placeOrderElement, register, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { loadingIcon } from '../helpers/deans-graphics-common-steps-for-suites';

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

test.describe('Deans Graphics - Place Order', () => {

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
    "project": "Deans",
    "stateComplete": "Illinois",
    "company": "Saucal Maintenance",
    "countryComplete": "United States (US)",
    "Symbol": "$",
    "phone": "3453453456",
    "pass1": process.env.PASS1 ?? '',
    "pass2": process.env.PASS2 ?? '',
    "admin_user": "guest@saucal.com",
    "admin_pass": process.env.ADMIN_PASS ?? '',
    "city": "Champaign",
    "street": "123 False Street",
    "street2": "4th floor",
    "state": "IL",
    "zipCode": "61822",
    "mobile": "3098987876",
    "lastName2": "Shipping",
    "company2": "Saucal Shipping",
    "street3": "123 false Shipping",
    "street4": "Shipping",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('00 - Registration', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.pass1 ?? ''}`;
    await register(page, vars);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Welcome to Deans Graphics custom webstores!")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#body_content_inner > p:nth-child(3)`).first()).toContainText(`  Your account is pending approval from the Dean’s Graphics team before you can start shopping your company’s custom webstore.  Once your account is approved which is typically within 24hrs. you will receive an email notification update so you can start shopping.  If you need further assistance please contact the Dean’s Graphics team at sales@deans-graphics.com and we would be glad to assist.  Thank you!`);
    await page.goto(`https://staging-deansgraphics.kinsta.cloud/hello/my-account/?fromsite=3&loop=1`);
    await page.waitForLoadState('load');
    await login(page, vars);
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-error`)).first()).toHaveText(`Your account is pending admin approval from Dean's Graphics, Inc. If you have any questions or feel you have reached this message in error please contact us at sales@deans-graphics.com`);
  });

  test('000 - Admin registration approval', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.admin_user ?? ''}`;
    vars.pass = `${vars.admin_pass ?? ''}`;
    await login(page, vars);
    await page.goto(`https://staging-deansgraphics.kinsta.cloud/hello/wp-admin/users.php`);
    await page.waitForLoadState('load');
    try { await page.locator(`#user-search-input`).first().fill(`${vars.emailReg ?? ''}`); } catch { await page.locator(`#user-search-input`).first().selectOption(`${vars.emailReg ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="search-submit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#search-submit`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`tbody#the-list > tr`).first().hover();
    await page.locator(`xpath=//a[contains(text(), "Approve")]`).or(page.locator(`a[href*="&action=approved&afreg_approve_new_user_filter-top&paged=1&action2=-1&new_role2&afreg_approve_new_user_filter-bottom&user="]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.user_status`).first()).toContainText(`Approved`);
    await page.locator(`tbody#the-list > tr`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`tbody#the-list > tr > td:first-of-type > div > span.edit > a`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="user-site"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#user-site`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#user-site`).first().fill(`5`); } catch { await page.locator(`#user-site`).first().selectOption(`5`); }
    {
      const _lbl = page.locator(`label[for="submit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#submit`).filter({ visible: true }).first().click({ force: true }); }
    }
  });

  test('01 - Place order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.admin = ``;
    vars.pass = `${vars.pass1 ?? ''}`;
    // ↓ 07 - Cart page
    // ↓ 06 - Product Page
    // ↓ 05 - Shop page
    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.pass1 ?? ''}`;
    await page.locator(`#menu-item-9247 > a`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === 'https://staging-deansgraphics.kinsta.cloud/growmark-display-program/?loop=2' }, vars)).toBeTruthy();
    // ↑ end 05 - Shop page
    await page.locator(`.wp-block-product-new > ul > li:nth-of-type(3) > a > div:nth-of-type(1) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 06 - Product Page
    await page.locator(`xpath=//li[contains(text(), "❯")]`).or(page.locator(`.ph-next`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`#ph-calendar-overlay`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      await expect(page.locator(`#ph-calendar-overlay`).first()).not.toBeVisible();
    } catch { /* optional step: assertElementNotVisible */ }
    await page.locator(`#ph-calendar-days > li.ph-calendar-date:nth-of-type(16)`).filter({ visible: true }).first().click({ force: true });
    await loadingIcon(page, vars);
    vars.from = ((await page.locator(`li.ph-calendar-date:nth-of-type(16) > .ph_calendar_day`).textContent()) ?? '').trim();
    await page.locator(`#ph-calendar-days > li.ph-calendar-date:nth-of-type(20)`).filter({ visible: true }).first().click({ force: true });
    await loadingIcon(page, vars);
    vars.to = ((await page.locator(`li.ph-calendar-date:nth-of-type(20) > .ph_calendar_day`).textContent()) ?? '').trim();
    vars.month = ((await page.locator(`div.month-year-wraper > span.span-month`).textContent()) ?? '').trim();
    vars.year = ((await page.locator(`div.month-year-wraper > span.span-year`).textContent()) ?? '').trim();
    await expect(page.locator(`#booking_info_text`).first()).toHaveText(`Booking: ${vars.month ?? ''} ${vars.from ?? ''}, ${vars.year ?? ''} to ${vars.month ?? ''} ${vars.to ?? ''}, ${vars.year ?? ''}`);
    vars.unitPrice = ((await page.locator(`#booking_price_text > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.prod_desc = ((await page.locator(`h1.product_title.entry-title`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Book Now")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.wc-block-components-notice-banner__content > a[href*="/growmark-display-program/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message > a[href*="/growmark-display-program/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
    // ↑ end 07 - Cart page
    await page.locator(`a[href*="/growmark-display-program/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`dd.variation-BookedFrom p`).first()).toHaveText(`${vars.month ?? ''} ${vars.from ?? ''}, ${vars.year ?? ''}`);
    await expect(page.locator(`dd.variation-BookedTo p`).first()).toHaveText(`${vars.month ?? ''} ${vars.to ?? ''}, ${vars.year ?? ''}`);
    await wooCommerceCheckoutTemplate(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
    vars.orderNumber = ((await page.locator(`li.woocommerce-order-overview__order.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`a[href*="/growmark-display-program/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`li:nth-of-type(2) > p`).first()).toContainText(`${vars.month ?? ''} ${vars.from ?? ''}, ${vars.year ?? ''}`);
    await expect(page.locator(`li:nth-of-type(3) > p`).first()).toContainText(`${vars.month ?? ''} ${vars.to ?? ''}, ${vars.year ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td`).first()).toHaveText(`Free shipping`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''}
${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.zipCode ?? ''}
Mobile Phone: ${vars.mobile ?? ''}

${vars.phone ?? ''}

${vars.emailReg ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''}
${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.zipCode ?? ''}
${vars.phone ?? ''}
Mobile Phone: ${vars.mobile ?? ''}
email:

${vars.phone ?? ''}`);
    await page.locator(`#menu-primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children:nth-of-type(3) > a[href*="/growmark-display-program/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/growmark-display-program/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/growmark-display-program/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/growmark-display-program/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`li:nth-of-type(2) > p`).first()).toContainText(`${vars.month ?? ''} ${vars.from ?? ''}, ${vars.year ?? ''}`);
    await expect(page.locator(`li:nth-of-type(3) > p`).first()).toContainText(`${vars.month ?? ''} ${vars.to ?? ''}, ${vars.year ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td`).first()).toHaveText(`Free shipping`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''}
${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.zipCode ?? ''}
Mobile Phone: ${vars.mobile ?? ''}

${vars.phone ?? ''}

${vars.emailReg ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''}
${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.zipCode ?? ''}
${vars.phone ?? ''}
Mobile Phone: ${vars.mobile ?? ''}
email:

${vars.phone ?? ''}`);
  });

  test('03 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.td`).first()).toHaveText(`Free shipping`);
    await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`tr:nth-of-type(4) > td.td`).first()).toContainText(`Invoice - NET 30`);
    await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(6) > td.td`).first()).toContainText(`Order Note for Testing this field`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''}
${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.zipCode ?? ''}
Mobile Phone: ${vars.mobile ?? ''}
${vars.phone ?? ''}
${vars.emailReg ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toContainText(`${vars.firstName ?? ''}
${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.zipCode ?? ''}
${vars.phone ?? ''}
Mobile Phone: ${vars.mobile ?? ''}`);
  });

});
