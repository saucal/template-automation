// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Leggari New - Place Order Composite Product"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, checkOrderOnEmail, login, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { _09PlaceOrder02Backend } from '../helpers/template-woocommerce-tests';

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

test.describe('Leggari New - Place Order Composite Product', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": "GI Leggari",
    "zipCode": "98512",
    "state": "WA",
    "phone": "3098698799",
    "shippingStreet": "525 N. Third Avenue",
    "shippingStreet2": "Suite 101",
    "billingStreet": "1300 N. Oregon Ave.",
    "billingStreet2": "First Floor",
    "street3": "street shipping",
    "street4": "Ap. 4",
    "password2": process.env.PASSWORD2 ?? '',
    "country": "US",
    "password": process.env.PASSWORD ?? '',
    "stateComplete": "Washington",
    "Symbol": "$",
    "countryComplete": "United States (US)",
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "leggari",
    "phoneCode": "+1",
    "addressType": "true",
    "company2": "Testing Inc.",
    "street": "1401 W 1st Ave",
    "street2": "Apartment 2",
    "city": "Tumwater",
    "role": "customer",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Checkout page - Step 3
    // ↓ 05 - Checkout page - Step 2
    if (vars.role !== 'contractor') {
      vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    }
    if (vars.role === 'contractor') {
      vars.email = `${vars.emailReg ?? ''}`;
    }
    vars.step = `2`;
    // ↓ 05 - Checkout page - Step 1
    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    // ↓ 02 - Floor kits
    // ↓ 01 - Home page
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//button[contains(text(), "close notification")]`).or(page.locator(`button.wp-block-leggari-blocks-notification__btn`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await page.locator(`div > div > div.wp-block-leggari-blocks-badge-block > div > div:nth-child(2) > figure > img`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector('#menu-item-47989') === false }, vars)) {
      await page.locator(`#menu-item-47989`).first().hover();
    }
    await page.locator(`#menu-item-47990 > a`).or(page.locator(`xpath=//a[contains(text(),'Floor Kits')]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Floor kits
    await page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > div:nth-of-type(1) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`).or(page.locator(`a[href*="/product/"]:not(a[href*="custom"]) > img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    {
      const _lbl = page.locator(`label[for="leggari-start-composite"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-start-composite`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="leggari-sqf-for-kit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-sqf-for-kit`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#leggari-sqf-for-kit`).first().fill(`125`); } catch { await page.locator(`#leggari-sqf-for-kit`).first().selectOption(`125`); }
    await page.keyboard.press('Tab');
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71533`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71533`); }
    try { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71535`); } catch { await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71535`); }
    try { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().fill(`71536`); } catch { await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select`).first().selectOption(`71536`); }
    {
      const _lbl = page.locator(`label[for="wccp_component_checkbox_1684742865_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wccp_component_checkbox_1684742865_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    vars.square = ((await page.locator(`#leggari-sqf-for-kit`).textContent()) ?? '').trim();
    vars.coat = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.first > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71533"]`).textContent()) ?? '').trim();
    vars.additive = ((await page.locator(`.composite_component.component.single.options-style-dropdowns.next > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71535"]`).textContent()) ?? '').trim();
    vars.vapor = ((await page.locator(`div.composite_component.component.single.options-style-dropdowns:nth-of-type(4) > .component_inner > div:nth-of-type(2) > .component_options > .component_options_inner.cp_clearfix > div > select > option[value="71536"]`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.composite_price > .price > .woocommerce-Price-amount.amount`).or(page.locator(`.composite_price > .price > ins > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    if (vars.role === 'contractor') {
      vars.wholePrice = ((await page.locator(`.composite_price > .price > del > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (vars.role === 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`
let unitPrice = `${vars.unitPrice}`

wholePrice = parseFloat(wholePrice.replace('$','').trim())
unitPrice = parseFloat(unitPrice.replace('$','').trim())

let unitPrice2 = wholePrice * 0.89

return Number(unitPrice.toFixed(2)) === unitPrice }, vars)).toBeTruthy();
    }
    if (vars.role === 'contractor') {
      vars.prodDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let wholePrice = `${vars.wholePrice}`

wholePrice = parseFloat(wholePrice.replace(`${vars.Symbol}`,'').trim())

let discount = wholePrice * 0.11

return `${vars.Symbol}`+discount.toFixed(2)
 }, vars);
    }
    await expect(page.locator(`button[type="submit"].single_add_to_cart_button`).first()).toBeVisible();
    await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.component_value > p`).first()).toContainText(`${vars.square ?? ''} ft²`);
    await expect(page.locator(`dd.variation-UrethaneTopCoat`).first()).toContainText(`${vars.coat ?? ''} × 1`);
    await expect(page.locator(`dd.variation-GritAdditive`).first()).toContainText(`${vars.additive ?? ''} × 1`);
    await expect(page.locator(`dd.variation-VaporBarrier`).first()).toContainText(`${vars.vapor ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total:not(.fees) > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`p.woocommerce-mini-cart__total.total.fees > span > bdi`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    await page.locator(`xpath=//a[contains(text(), "Continue to Cart")]`).or(page.locator(`a[href*="/cart/"].cart-popup__product-button`)).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.product-info-list__item > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-subtotal > ins > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.role === 'contractor') {
      await expect(page.locator(`.product-subtotal > del > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.wholePrice ?? ''}`);
    }
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(1) > dd.component_value > p`).first()).toContainText(`${vars.square ?? ''}`);
    await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(2) > dd.component_value:nth-of-type(1) > p`).first()).toContainText(`${vars.coat ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(3) > p`).first()).toContainText(`${vars.vapor ?? ''}`);
    await expect(page.locator(`dd.component_value:nth-of-type(2) > p`).first()).toContainText(`${vars.additive ?? ''}`);
    if (vars.role !== 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      vars.subtotalPrice = `${vars.wholePrice ?? ''}`;
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role !== 'contractor') {
      await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.role === 'contractor') {
      await expect(page.locator(`tr.fee.fee-product-discount.custom-cart-totals-style-table > td > span`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
    }
    // ↑ end 04 - Cart Page
    await page.locator(`xpath=//a[contains(text(), "Continue to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(1500);
    await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toContainText(`${vars.desc_prod ?? ''}`);
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    try {
      await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 05 - Checkout page - Step 1
    if (vars.role !== 'contractor') {
      await page.locator(`xpath=//button[contains(text(), "CONTINUE TO SHIPPING →")]`).or(page.locator(`.wfacp-left-panel.wfacp_page.pre_built.single_step > .wfacp-two-step-erap.wfacp-next-btn-wrap.center > button[type="button"].button.button-primary.wfacp_next_page_button`)).filter({ visible: true }).first().click({ force: true });
    }
    try {
      if (vars.role !== 'contractor') {
        await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Email is a required field.
First name is a required field.
Last name is a required field.
Street address is a required field.
Town / City is a required field.
Postcode / ZIP is a required field.
Country is a required field.
State / County is a required field.
Address Type is a required field.
Phone is a required field.`);
      }
    } catch { /* optional step: assertText */ }
    if (vars.role !== 'contractor') {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let invalid = Array.from<any>(document.querySelectorAll('.woocommerce-invalid-required-field'))

return invalid.length === 10 }, vars)).toBeTruthy();
    }
    try {
      await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await wooCommerceCheckoutTemplate(page, vars);
    // ↑ end 05 - Checkout page - Step 2
    vars.step = `3`;
    await wooCommerceCheckoutTemplate(page, vars);
    // ↑ end 05 - Checkout page - Step 3
    vars.product = `composite`;
    try {
      await page.locator(`.wc_payment_method.payment_method_authorize_net_cim_credit_card > label`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await placeOrderElement(page, vars);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}, thank you for your order!`);
    await expect(page.locator(`td.woocommerce-table__product-name.product-name > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`li:nth-of-type(1) > p`).first()).toContainText(`${vars.square ?? ''}`);
    await expect(page.locator(`tr:nth-child(2) > td.woocommerce-table__product-name.product-name strong:first-child`).first()).toContainText(`${vars.coat ?? ''}`);
    await expect(page.locator(`tr:nth-child(4) > td.woocommerce-table__product-name.product-name strong:first-child`).first()).toContainText(`${vars.vapor ?? ''}`);
    await expect(page.locator(`tr:nth-child(3) > td.woocommerce-table__product-name.product-name strong:first-child`).first()).toContainText(`${vars.additive ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if ((() => { let shipping = vars.shippingPrice
return shipping != "Free" })()) {
      await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    }
    if ((() => { let shipping = vars.shippingPrice
return shipping === "Free" })()) {
      await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toHaveText(`${vars.shippingDesc ?? ''}`);
    }
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "My Account")]`).or(page.locator(`a[href*="my-account"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="my-account/orders"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-table__product-name.product-name > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
  });

  test('02 - Place order - New User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _09PlaceOrder02Backend(page, vars);
  });

  test('03 - Place order - New User - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.site = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let site = window.location.href
return site }, vars);
    vars.username = `${vars.email ?? ''}`;
    await checkOrderOnEmail(page, vars);
  });

  test('04 - Place order - Refund by Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
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
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      vars.shippingTax = ((await page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTax ?? ''}`); }
    }
    try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Cancelled`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Authorize.Net Credit Card Void in the amount of ${vars.total ?? ''} approved. (Transaction ID`);
  });

  test('05 - Place order - Refund - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > del`).or(page.locator(`tr.order-totals.order-totals-total.order-totals-last > td > del`)).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).or(page.locator(`tr.order-totals.order-totals-total > td > ins`)).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  });

});
