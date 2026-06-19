// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Leggari New - Common Steps for suites"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, extractUserFromEmail, placeOrderElement } from './common-steps-for-all-projects';

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

// GI: "03 - Place order " (67d817cd060ca21922609dcd)
export async function _03PlaceOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.emailReg ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await login(page, vars);
  // TODO: unresolved GI test ID 63d966e20b7aefb972470224 — inline steps manually
  try {
    await page.locator(`.wc_payment_method.payment_method_authorize_net_cim_credit_card > label`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await placeOrderElement(page, vars);
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}, thank you for your order!`);
  await expect(page.locator(`td.woocommerce-table__product-name.product-name > a`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
  await expect(page.locator(`li:nth-of-type(1) > p`).first()).toContainText(`${vars.square ?? ''}`);
  await expect(page.locator(`tr:nth-child(2) > td.woocommerce-table__product-name.product-name > strong:first-child`).first()).toContainText(`${vars.coat ?? ''}`);
  await expect(page.locator(`tr:nth-child(4) > td.woocommerce-table__product-name.product-name > strong:first-child`).first()).toContainText(`${vars.vapor ?? ''}`);
  await expect(page.locator(`tr:nth-child(3) > td.woocommerce-table__product-name.product-name > strong:first-child`).first()).toContainText(`${vars.additive ?? ''}`);
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
  await page.locator(`xpath=//a[contains(text(), "My Account")]`).or(page.locator(`a[href="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
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
}

// GI: "Admin Login" (68a720adeeab2f751ab7e538)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (!page.url().includes('wp-admin')) {
    await page.goto(`${vars.startUrl ?? ''}wp-admin`);
    await page.waitForLoadState('load');
  }
  try { await page.locator(`#user_login`).or(page.locator(`#username`)).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`#username`)).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
let admin = `${vars.admin}`
return element != null && element != undefined && admin === "yes" }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Cart Validation" (66cf7791947ad7526f95aaf2)
export async function cartValidation(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForLoadState('load');
  await expect(page.locator(`.product-info-list__item > a[href*="/product/"]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
  await expect(page.locator(`.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(1) > dd.component_value > p`).first()).toContainText(`${vars.square ?? ''}`);
  await expect(page.locator(`dl.variation.composite_configuration:nth-of-type(2) > dd.component_value:nth-of-type(1) > p`).first()).toContainText(`${vars.coat ?? ''}`);
  await expect(page.locator(`dd.component_value:nth-of-type(3) > p`).first()).toContainText(`${vars.vapor ?? ''}`);
  await expect(page.locator(`dd.component_value:nth-of-type(2) > p`).first()).toContainText(`${vars.additive ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
}

// GI: "Check Order on My Account" (67ee87dcd2b75725e87d847b)
export async function checkOrderOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}, thank you for your order!`);
  vars.orderNumber = ((await page.locator(`.order > strong`).or(page.locator(`.order > span`)).or(page.locator(`iframe#wcp-checkout-iframe .order > strong`)).textContent()) ?? '').trim();
  await expect(page.locator(`.email > strong`).or(page.locator(`.email > span`)).or(page.locator(`iframe#wcp-checkout-iframe .email > strong`)).first()).toContainText(`${vars.username ?? ''}`);
  await expect(page.locator(`iframe#wcp-checkout-iframe strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`span > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.total ?? ''}`);
  if (vars.product === "simple") {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if (vars.product == "variable") {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} × ${vars.qty ?? ''}
Base: 

${vars.base ?? ''}

Highlight: 

${vars.highlight ?? ''}`);
  }
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`iframe#wcp-checkout-iframe td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe#wcp-checkout-iframe tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(2) > td`)).or(page.locator(`iframe#wcp-checkout-iframe tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.shipDiscount ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(7) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.username ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
  await page.locator(`a[href*="/my-account/"]`).or(page.locator(`a[href*="/account/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).or(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  if (vars.product !== "variable") {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if (vars.product === "variable") {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} × ${vars.qty ?? ''}
Base: 

${vars.base ?? ''}

Highlight: 

${vars.highlight ?? ''}`);
  }
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(2) > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.shipDiscount ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(7) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.username ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
}

// GI: "Checkout section 2" (654a9a904ee1df25e03d3f56)
export async function checkoutSection2(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  await expect(page.locator(`ul#shipping_method > li:nth-child(1) label`).first()).toContainText(`FedEx`);
  await expect(page.locator(`ul#shipping_method > li:nth-child(2) label`).first()).toHaveText(`Local pickup in Pasco, WA (Call to schedule a pickup 844-534-4274)`);
  vars.shippingPrice = ((await page.locator(`#shipping_method > li:nth-child(1) div > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  if (vars.role === 'contractor') {
    vars.shipDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingPrice}`

shippingPrice = parseFloat(shippingPrice.replace(`${vars.Symbol}`,'').trim())

let discount = shippingPrice * 0.1

return `${vars.Symbol}`+discount.toFixed(2)
 }, vars);
  }
  if (vars.product === "composite") {
    await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toHaveText(`${vars.prod_desc ?? ''}

${vars.square ?? ''} ft²

 `);
  }
  if (vars.product === "simple") {
    await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toHaveText(`${vars.prod_desc ?? ''} `);
  }
  try {
    if (vars.product === "variable") {
      await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toHaveText(`${vars.prod_desc ?? ''} 
${vars.base ?? ''} ${vars.highlight ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.product === "variable") {
    await expect(page.locator(`.wfacp_mini_cart_item_title`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if (vars.role === 'contractor') {
    await expect(page.locator(`tr.fee:nth-of-type(2) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`-${vars.prodDiscount ?? ''}`);
  }
  await expect(page.locator(`span > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  if (vars.role === 'contractor') {
    await expect(page.locator(`tr.fee:nth-of-type(4) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`-${vars.shipDiscount ?? ''}`);
  }
  vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotalPrice}`;
let prodDiscount = `${vars.prodDiscount}`
let shipping = `${vars.shippingPrice}`;
let shipDiscount = `${vars.shipDiscount}`;
if (shipping.includes("Free")){
    shipping = "0.00";
};
if (prodDiscount === ""){
    prodDiscount = "0.00";
};
if (shipDiscount === ""){
    shipDiscount = "0.00";
};
let tax = `${vars.taxPrice}`;
let total = `${vars.total}`;


unit = unit.replace(",","");
shipping = shipping.replace(",","");
prodDiscount = prodDiscount.replace(",","");
shipDiscount = shipDiscount.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
prodDiscount = Number(prodDiscount.replace(`${vars.Symbol}`,""));
shipDiscount = Number(shipDiscount.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit-prodDiscount+shipping-shipDiscount+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
  await page.locator(`#wfacp_checkout_form > div.wfacp-left-panel.wfacp_page.pre_built.single_step > div.wfacp-two-step-erap.wfacp-next-btn-wrap > button`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Checkout section 3" (654aabdd4ee1df25e0401864)
export async function checkoutSection3(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#wfacp_checkout_form > div.wfacp-left-panel.wfacp_page.pre_built.two_step > div.wfacp-two-step-erap.wfacp-next-btn-wrap.center.\\31 00\\% > button`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#order_comments`).first().fill(`Test order notes`); } catch { await page.locator(`#order_comments`).first().selectOption(`Test order notes`); }
  {
    const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { const affirm = vars.affirm

return affirm !== 'yes' })()) {
    await placeOrderElement(page, vars);
  }
  if ((() => { const affirm = vars.affirm

return affirm === 'yes' })()) {
    await selectPayWithAffirm(page, vars);
  }
}

// GI: "Customer registration" (66ce2e7d9f315599010160fc)
export async function customerRegistration(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="reg_role"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#reg_role`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#reg_role`).first().fill(`customer`); } catch { await page.locator(`#reg_role`).first().selectOption(`customer`); }
  await page.locator(`input[placeholder="Enter First Name"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="Enter First Name"]`).first().fill(`test`); } catch { await page.locator(`input[placeholder="Enter First Name"]`).first().selectOption(`test`); }
  await page.locator(`input[placeholder="Enter Last Name"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[placeholder="Enter Last Name"]`).first().fill(`customer`); } catch { await page.locator(`input[placeholder="Enter Last Name"]`).first().selectOption(`customer`); }
  {
    const _lbl = page.locator(`label[for="reg_email"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#reg_email`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#reg_email`).first().fill(`diegob+leggari01@saucal.com`); } catch { await page.locator(`#reg_email`).first().selectOption(`diegob+leggari01@saucal.com`); }
  {
    const _lbl = page.locator(`label[for="kl_newsletter_checkbox"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#kl_newsletter_checkbox`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`My Account`);
  await expect(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/my-account/"]`).first()).toContainText(`Dashboard`);
}

// GI: "Fill Address Step 1" (61effe223e617932e957b5be)
export async function fillAddressStep1(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.role !== 'contractor') {
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  }
  if (vars.role !== 'contractor') {
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  {
    const _lbl = page.locator(`label[for="kl_newsletter_checkbox"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#kl_newsletter_checkbox`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
  try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
  try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
  try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  try {
    await page.locator(`button.needsclick`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await page.locator(`#select2-shipping_country-container > span`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//li[contains(text(), "United States")]`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="select2-shipping_state-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-shipping_state-container > span`).or(page.locator(`#select2-shipping_state-container`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.state ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.state ?? ''}`); }
  await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  if (vars.role !== 'contractor') {
    await page.locator(`xpath=//*[@id="address_type"]/option[2]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.role === 'contractor') {
    await page.locator(`xpath=//*[@id="address_type"]/option[3]`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  await expect(page.locator(`#billing_same_as_shipping`).first()).toBeVisible();
  await expect(page.locator(`#wfacp_checkout_form > div.wfacp-left-panel.wfacp_page.pre_built.single_step > div.wfacp-two-step-erap.wfacp-next-btn-wrap > button`).first()).toBeVisible();
  await page.locator(`#wfacp_checkout_form > div.wfacp-left-panel.wfacp_page.pre_built.single_step > div.wfacp-two-step-erap.wfacp-next-btn-wrap > button`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Login" (61effe223e617932e957b5bf)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForLoadState('load');
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`#customer_login > div.u-column1.col-1 > form > p:nth-child(3) > button`).filter({ visible: true }).first().click({ force: true });
  if ((() => { const role = vars.role

return role !== 'contractor' })()) {
    await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(2)`)).not.toHaveCount(0);
  }
}

// GI: "Register" (61effe223e617932e957b5c0)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#secondary-header-menu > li.secondary-header-menu__login > a`).or(page.locator(`#main-header > div > div > div > div > div > div > div > div.site-header-section.site-header-section-right > div:nth-child(3) > div > a`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="reg_role"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#reg_role`).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { const role = vars.role

return role !== 'contractor' })()) {
    try { await page.locator(`#reg_role`).first().fill(`customer`); } catch { await page.locator(`#reg_role`).first().selectOption(`customer`); }
  }
  if ((() => { const role = vars.role

return role === 'contractor' })()) {
    try { await page.locator(`#reg_role`).first().fill(`contractor`); } catch { await page.locator(`#reg_role`).first().selectOption(`contractor`); }
  }
  try { await page.locator(`input[placeholder="Enter First Name"]`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`input[placeholder="Enter First Name"]`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`input[placeholder="Enter Last Name"]`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`input[placeholder="Enter Last Name"]`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  if ((() => { const role = vars.role

return role === 'contractor' })()) {
    try { await page.locator(`#leggari_phone_number`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#leggari_phone_number`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if ((() => { const role = vars.role

return role === 'contractor' })()) {
    try { await page.locator(`#afreg_additional_4201`).first().fill(`${vars.EIN ?? ''}`); } catch { await page.locator(`#afreg_additional_4201`).first().selectOption(`${vars.EIN ?? ''}`); }
  }
  if ((() => { const role = vars.role

return role === 'contractor' })()) {
    try { await page.locator(`#afreg_additional_4199`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#afreg_additional_4199`).first().selectOption(`${vars.company ?? ''}`); }
  }
  if ((() => { const role = vars.role

return role === 'contractor' })()) {
    try { await page.locator(`input#leggari_business_license[type='file']`).first().fill(`https://ghostinspector-prod.s3.amazonaws.com/uploads/c743c1ac-41a0-4216-acf3-eeb212b5f9e0.jpg`); } catch { await page.locator(`input#leggari_business_license[type='file']`).first().selectOption(`https://ghostinspector-prod.s3.amazonaws.com/uploads/c743c1ac-41a0-4216-acf3-eeb212b5f9e0.jpg`); }
  }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { const role = vars.role

return role === 'contractor' })()) {
    await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Thank you for creating an account with Leggari! Your password has been sent to the email you provided. If you registered as a Contractor, please note that it may take 24-48 hours before your account is approved. We look forward to serving your needs.`);
  }
  if ((() => { const role = vars.role

return role === 'contractor' })()) {
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your account was created successfully and a password has been sent to your email address.`);
  }
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Your Leggari Products account has been created!")]`).filter({ visible: true }).first().click({ force: true });
  vars.link = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let link = document.querySelector<HTMLAnchorElement>('#body_content_inner > p:nth-child(3) > a').getAttribute('href');
return link }, vars);
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); window.location.href = document.querySelector<HTMLAnchorElement>('#body_content_inner > p:nth-child(3) > a').getAttribute('href'); }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
    (document.readyState) || reject("Can't resolve document readystate");
    let listener;
    (/^c/).test(document.readyState) ? resolve(true) : document.addEventListener("load", listener = event => {
      document.removeEventListener("load", listener);
      resolve(true);
    });
}) }, vars)).toBeTruthy();
  try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
  try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { const role = vars.role

return role !== 'contractor' })()) {
    await page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { const role = vars.role

return role === 'contractor' })()) {
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
  }
}

// GI: "Select Pay with Affirm" (6821e342e75bee6181bfa069)
export async function selectPayWithAffirm(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`div.leggari-payment-gateway:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="submit-button"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`button[type="submit"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="phone-pin-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[placeholder="000000"]`)).first().fill(`123456`); } catch { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="phone-pin-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[placeholder="000000"]`)).first().selectOption(`123456`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="submit-button"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`//button[contains(text(), "Continue to plans")]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`button[type="submit"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`label .indicator-type-radio`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="skip-payment-button"]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="continue-with-selected-term-button"]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`//button[contains(text(), "Choose this plan")]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`button[aria-label="Choose this plan"]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  try {
    try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="last-four-ssn-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[placeholder="Last 4 of Social Security Number *"]`)).first().fill(`5678`); } catch { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="last-four-ssn-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[placeholder="Last 4 of Social Security Number *"]`)).first().selectOption(`5678`); }
  } catch { /* optional step: assign */ }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="submit-button"]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`button[type="submit"]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  try {
    try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="full-name-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[name="full-name"]`)).first().fill(`QA Test`); } catch { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="full-name-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[name="full-name"]`)).first().selectOption(`QA Test`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="routing-number-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[name="routing-number"]`)).first().fill(`021000322`); } catch { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="routing-number-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[name="routing-number"]`)).first().selectOption(`021000322`); }
  } catch { /* optional step: assign */ }
  try {
    try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="ach-account-number-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[name="ach-account-number"]`)).first().fill(`998877665`); } catch { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="ach-account-number-field"]`).or(page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`input[name="ach-account-number"]`)).first().selectOption(`998877665`); }
  } catch { /* optional step: assign */ }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="disclosure-checkbox-indicator"]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="submit-button"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`//button[contains(text(), "Confirm")]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`button[type="submit"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
}
