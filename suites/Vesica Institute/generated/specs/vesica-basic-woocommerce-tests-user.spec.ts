// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Vesica - Basic WooCommerce Tests - User"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, checkOrderOnEmail, checkTheTotal, extractUserFromEmail, forgotPasswordFlow, login, payPalTemplate, placeOrderElement, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';

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

test.describe('Vesica - Basic WooCommerce Tests - User', () => {

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
    "company": "Testing Inc.",
    "street": "1000 Nw 42nd Ave",
    "street2": "Ap. 4",
    "countryComplete": "United States (US)",
    "city": "Miami",
    "state": "Florida",
    "zipCode": "33126-3645",
    "Symbol": "$",
    "phone": "4089211861",
    "shortState": "FL",
    "project": "vesica",
    "password": process.env.PASSWORD ?? '',
    "includeTax": "false",
    "qty": "1",
    "password2": process.env.PASSWORD2 ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - New User - CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.new = `yes`;
    await uRLOfCurrentPage(page, vars);
    // ↓ 11 - Checkout page
    // ↓ 10 - Cart page
    // ↓ 09 - Product page
    // ↓ 06 - Shop page
    try {
      await page.locator(`.cky-notice-btn-wrapper > button[aria-label="Reject All"].cky-btn.cky-btn-reject`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.elementor-nav-menu--main > .elementor-nav-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(5) > a[href*="/vesica-shop/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 06 - Shop page
    await page.locator(`a[href*="/product-category/vesica-shop/online-courses/"] > img`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.product.instock > a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.elementor-widget-container > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    // ↑ end 09 - Product page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`“${vars.prod_desc ?? ''}” has been added to your cart.`);
    await expect(page.locator(`.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    // ↑ end 10 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''}  × 1`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    // ↑ end 11 - Checkout page
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP Code is a required field.
Billing Phone is a required field.
Billing Email address is a required field.
Please read and accept the terms and conditions to proceed with your order.`);
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
    try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
    try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
    try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="select2-billing_state-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-billing_state-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.state ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.state ?? ''}`); }
    await page.locator(`xpath=//li[contains(text(), "Florida")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    try {
      {
        const _lbl = page.locator(`label[for="customer_newsletter_opt_in"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#customer_newsletter_opt_in`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    try {
      await page.locator(`button.wc_avatax_validate_address.button`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await blockUI(page, vars);
    try {
      await expect(page.locator(`div.wc-avatax-address-validation-result.wc-avatax-address-validation-success`).first()).toHaveText(`Address validated.`);
    } catch { /* optional step: assertText */ }
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.method > strong`).first()).toHaveText(`Credit Card`);
    await expect(page.locator(`a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`Credit Card`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    try {
      await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    await page.locator(`#menu-1-d4ee1e5 > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(6) > a[href="/my-account/courses/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.sub-menu.elementor-nav-menu--dropdown.sm-nowrap > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(2) > a[href*="/my-account/orders/"].elementor-sub-item`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
    await expect(page.locator(`.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`Credit Card`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`mark.order-number`).first()).toHaveText(`${vars.orderNumber ?? ''}`);
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Completed`);
    try {
      await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    } catch { /* optional step: assertText */ }
    await page.locator(`a[href*="/my-membership-content"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`nav[aria-label="Breadcrumb"]`).first()).toHaveText(`Home / My Account / My Membership`);
    await page.locator(`td.membership-plan > a`).filter({ visible: true }).first().click({ force: true });
  });

  test('01 - Place order - New User - CC - backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.subtotalPrice = `${vars.unitPrice ?? ''}`;
    vars.total = `${vars.unitPrice ?? ''}`;
    vars.taxPrice = `$0.00`;
    await checkOrderOnEmail(page, vars);
    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h2.woocommerce-order-data__heading`).first()).toContainText(`Order #${vars.orderNumber ?? ''} details`);
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`.address > p:nth-of-type(3)`).first()).toHaveText(`Phone:
${vars.phone ?? ''}`);
    await expect(page.locator(`tr > td.name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.quantity > .view`).first()).toHaveText(`× ${vars.qty ?? ''}`);
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('02 - Place order - Logged User - PayPal', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.new = `no`;
    vars.admin = `no`;
    vars.username = `${vars.email ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "account has been created!")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Click here to set your new password.")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
    await page.waitForLoadState('load');
    await expect(page.locator(`tr.membership`).first()).toBeVisible();
    await page.goto(`${vars.site ?? ''}product-category/vesica-shop/biogeometry/biogeometry-tools-for-the-public/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    await page.locator(`li.product.instock.product-type-simple > a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod_desc = `${vars.prod_desc}`
prod_desc = prod_desc.replace(/\“/g,'"').replace(/\”/g,'"')
return prod_desc }, vars);
    vars.unitPrice = ((await page.locator(`.elementor-widget-container > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-')

return prod_desc }, vars);
    await expect(page.locator(`.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    try {
      {
        const _lbl = page.locator(`label[for="customer_newsletter_opt_in"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#customer_newsletter_opt_in`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    try {
      await page.locator(`button.wc_avatax_validate_address.button`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await blockUI(page, vars);
    try {
      await expect(page.locator(`div.wc-avatax-address-validation-result.wc-avatax-address-validation-success`).first()).toHaveText(`Address validated.`);
    } catch { /* optional step: assertText */ }
    {
      const _lbl = page.locator(`label[for="payment_method_ppcp-gateway"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_ppcp-gateway`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.shippingPrice = ((await page.locator(`#shipping_method > li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotalPrice = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await payPalTemplate(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    try {
      await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email ?? ''}`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.method > strong`).first()).toHaveText(`PayPal`);
    await expect(page.locator(`a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`PayPal`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > section > div.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.payPalUser ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > section > div.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
    await page.locator(`#menu-1-d4ee1e5 > li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(6) > a[href="/my-account/courses/"].elementor-item.has-submenu`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.sub-menu.elementor-nav-menu--dropdown.sm-nowrap > li.menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(2) > a[href*="/my-account/orders/"].elementor-sub-item`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`tr:nth-of-type(1) > .woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`PayPal`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`mark.order-number`).first()).toHaveText(`${vars.orderNumber ?? ''}`);
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`.woocommerce-customer-details > section > div.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.payPalUser ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > section > div.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
  });

  test('02 - Place order - Logged User - PayPal - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.payPalUser ?? ''}`;
    vars.email = `${vars.payPalUser ?? ''}`;
    await checkOrderOnEmail(page, vars);
    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.goto(`${vars.site ?? ''}wp-admin/edit.php?post_type=shop_order`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h2.woocommerce-order-data__heading`).first()).toContainText(`Order #${vars.orderNumber ?? ''} details`);
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via PayPal`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street2 ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`.address > p:nth-of-type(3)`).first()).toHaveText(`Phone:
${vars.phone ?? ''}`);
    await expect(page.locator(`tr > td.name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.quantity > .view`).first()).toHaveText(`× ${vars.qty ?? ''}`);
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.shipping > td.line_cost > div > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:last-of-type > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('02 - Place order - Logged User - PayPal - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.waitForLoadState('load');
    await page.goto(`${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
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
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount')

return shipping !== null  }, vars)) {
      vars.shippingPriceWithoutTax = ((await page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount')

return shipping !== null  }, vars)) {
      try { await page.locator(`tr.shipping > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().fill(`${vars.shippingPriceWithoutTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingPriceWithoutTax ?? ''}`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(6) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      vars.shippingTax = ((await page.locator(`tr.shipping > td.line_tax:nth-of-type(6) > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(6) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax:nth-of-type(6) > .refund > input.refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax:nth-of-type(6) > .refund > input.refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTax ?? ''}`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(7) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      vars.shippingTax2 = ((await page.locator(`tr.shipping > td.line_tax:nth-of-type(7) > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax:nth-of-type(7) > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax:nth-of-type(7) > .refund > input.refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTax2 ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax:nth-of-type(7) > .refund > input.refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTax2 ?? ''}`); }
    }
    try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('02 - Place order - Logged User - PayPal - Refund Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForTimeout(10000);
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    if (vars.project === 'nopong') {
      await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    if (vars.project === 'cashForeClub') {
      await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    await expect(page.locator(`tfoot > tr > td.td > del`).or(page.locator(`tr.order-totals.order-totals-total.order-totals-last > td > del`)).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).or(page.locator(`tr.order-totals.order-totals-total.order-totals-last > td > ins > span`)).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  });

  test('03 - Register user', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `no`;
    await page.locator(`.elementor-column.elementor-top-column.elementor-element.elementor-element-0b5e80c > .elementor-widget-wrap.elementor-element-populated > .elementor-element.elementor-widget__width-auto.elementor-widget.elementor-widget-account_links > .elementor-widget-container > .account-links > a[href="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#reg_email`).first().fill(`${vars.emailReg ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.emailReg ?? ''}`); }
    await page.locator(`button.woocommerce-form-register__submit`).filter({ visible: true }).first().click({ force: true });
    vars.username = `${vars.emailReg ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "account has been created!")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Click here to set your new password.")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.{{pass}} = `${vars.password ?? ''}`;
    await login(page, vars);
  });

  test('04 - Forgot password flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await forgotPasswordFlow(page, vars);
    vars.{{pass}} = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

});
