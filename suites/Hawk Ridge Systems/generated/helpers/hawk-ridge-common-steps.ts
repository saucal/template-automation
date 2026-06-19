// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Hawk Ridge - Common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI } from './common-steps-for-all-projects';

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

// GI: "Accept Cookies" (68caf9b07f80fc466df327ea)
export async function acceptCookies(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    {
      const _lbl = page.locator(`label[for="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Allow all")]`).or(page.locator(`#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll`)).or(page.locator(`xpath=//*[contains(text(), "Continue")]`)).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
}

// GI: "Admin login" (68cbff59189a381f8e39d47c)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).or(page.locator(`#username`)).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`#username`)).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
return element != null && element != undefined  }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await expect(page.locator(`#adminmenumain`)).not.toHaveCount(0);
}

// GI: "Check Order and Subscriptions on My Account" (68cbf8ff576a0f46b5393cb9)
export async function checkOrderAndSubscriptionsOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await checkOrderDetails(page, vars);
  await page.locator(`a[href="/my-account"] > svg.e-far-user`).filter({ visible: true }).first().click({ force: true });
  if ('stripe' === vars.payment) {
    await verifySavedPaymentMethod(page, vars);
  }
  await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}"][aria-label="View order number ${vars.orderNumber ?? ''}"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
  if ('purchase' === vars.payment) {
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`On hold`);
  }
  if ('stripe' === vars.payment && vars.shippingPrice !== '') {
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  }
  if ('stripe' === vars.payment && vars.shippingPrice === '') {
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
  }
  await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}"][aria-label="View order ${vars.orderNumber ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await checkOrderDetails(page, vars);
}

// GI: "Check Order Details" (68cbfac7576a0f46b539af05)
export async function checkOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
  } catch { /* optional step: assertTextPresent */ }
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.product === "bundle") {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.bundled_table_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name > .bundled-product-name.bundled_table_item_indent`).first()).toContainText(`${vars.prodTitle1 ?? ''}`);
  }
  if (vars.product === "bundle") {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.bundled_table_item:nth-of-type(2) > td.woocommerce-table__product-total.product-total > .bundled_table_item_subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.prodPrice1 ?? ''}`);
  }
  if (vars.product === "bundle") {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.bundled_table_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .bundled-product-name.bundled_table_item_indent`).first()).toContainText(`${vars.prodTitle2 ?? ''}`);
  }
  if (vars.product === "bundle") {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.bundled_table_item:nth-of-type(3) > td.woocommerce-table__product-total.product-total > .bundled_table_item_subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.prodPrice2 ?? ''}`);
  }
  if (vars.product === "bundle") {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.bundled_table_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name > .bundled-product-name.bundled_table_item_indent`).first()).toContainText(`${vars.prodTitle3 ?? ''}`);
  }
  if (vars.product === "bundle") {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.bundled_table_item:nth-of-type(4) > td.woocommerce-table__product-total.product-total > .bundled_table_item_subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.prodPrice3 ?? ''}`);
  }
  if (vars.product === "bundle") {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.bundled_table_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .bundled-product-name.bundled_table_item_indent`).first()).toContainText(`${vars.prodTitle4 ?? ''}`);
  }
  if (vars.product === "bundle") {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.bundled_table_item:nth-of-type(5) > td.woocommerce-table__product-total.product-total > .bundled_table_item_subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.prodPrice4 ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  vars.tfootIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.woocommerce-table--order-details tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let tfootIndex = -1;
Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    tfootIndex = index + 1;
  }
});

return tfootIndex }, vars);
  vars.shippingIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.woocommerce-table--order-details tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let targetTfoot = null;

Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    targetTfoot = tfoot;
  }
});

// Process the target <tfoot>
let result;
let shippingIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText === 'Shipping:') {
        shippingIndex = index;
      }
    }
  });
}
  return shippingIndex + 1 }, vars);
  if ((() => { const shippingIndex = vars.shippingIndex

return shippingIndex >= 2 })()) {
    await expect(page.locator(`tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.shippingIndex ?? ''}) > td > .woocommerce-Price-amount`).or(page.locator(`tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.shippingIndex ?? ''}) > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  vars.taxIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.woocommerce-table--order-details tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let targetTfoot = null;

Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    targetTfoot = tfoot;
  }
});

// Process the target <tfoot>
let result;
let taxIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));

  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText === 'Tax:') {
        taxIndex = index;
      }
    }
  });
}
  return taxIndex + 1 }, vars);
  await expect(page.locator(`tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.taxIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  vars.paymentIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.woocommerce-table--order-details tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let targetTfoot = null;

Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    targetTfoot = tfoot;
  }
});

// Process the target <tfoot>
let result;
let paymentIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText.includes('Payment')) {
        paymentIndex = index;
      }
    }
  });
}
  return paymentIndex + 1 }, vars);
  await expect(page.locator(`tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.paymentIndex ?? ''}) > td`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
  vars.totalIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.woocommerce-table--order-details tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let targetTfoot = null;

Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    targetTfoot = tfoot;
  }
});

// Process the target <tfoot>
let result;
let totalIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText.includes('Total:')) {
        totalIndex = index;
      }
    }
  });
}
  return totalIndex + 1 }, vars);
  await expect(page.locator(`tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.totalIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  vars.noteIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
const tfootSections = Array.from<any>(document.querySelectorAll<HTMLTableElement>('table.woocommerce-table--order-details tfoot'));

// Find the correct <tfoot> (one without "Actions:" row)
let targetTfoot = null;

Array.from<any>(tfootSections).forEach((tfoot, index) => {
  const hasActions = Array.from<any>(tfoot.querySelectorAll('tr > th')).some(th => 
    th.textContent.trim() === 'Actions:'
  );
  if (!hasActions) {
    targetTfoot = tfoot;
  }
});

// Process the target <tfoot>
let result;
let noteIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText === 'Note:') {
        noteIndex = index;
      }
    }
  });
} 
  return noteIndex + 1 }, vars);
  await expect(page.locator(`tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.noteIndex ?? ''}) > td`).first()).toHaveText(`${vars.orderNote ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''}
${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  if (vars.paymentMethod === 'Purchase Order') {
    await expect(page.locator(`.purchase-order > strong`).first()).toContainText(`${vars.poNumber ?? ''}`);
  }
  if (vars.paymentMethod === 'Purchase Order') {
    await expect(page.locator(`.inspire_checkout_fields_additional_information > p`).first()).toContainText(`Upload Purchase Order: ${vars.startUrl ?? ''}flexible-checkout-fields/`);
  }
}

// GI: "Extract user from email" (68caff45576a0f46b511fba2)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(30000);
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /^(qa\+)?(\w+)[^@]+/g
const str = `${vars.email}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Fill CC" (69270a96074724f8470d5d17)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit / Debit Card`;
  {
    const _lbl = page.locator(`label[for="payment_method_stripe"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_stripe`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-numberInput`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`)).first().fill(`4242424242424242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-numberInput`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`)).first().selectOption(`4242424242424242`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-expiryInput`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`)).first().fill(`12/30`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-expiryInput`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`)).first().selectOption(`12/30`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-cvcInput`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`)).first().fill(`321`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-cvcInput`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`)).first().selectOption(`321`); }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[checked]#payment-linkOptInInput`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  try {
    {
      const _lbl = page.locator(`label[for="wc-stripe-new-payment-method"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wc-stripe-new-payment-method`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
}

// GI: "Fill checkout" (68cbf43cb6e829f430725775)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_state`).first().fill(`${vars.state ?? ''}`); } catch { await page.locator(`#billing_state`).first().selectOption(`${vars.state ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if ((() => { const logged = vars.logged

return logged !== 'yes' })()) {
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  }
  try { await page.locator(`#order_comments`).first().fill(`${vars.orderNote ?? ''}`); } catch { await page.locator(`#order_comments`).first().selectOption(`${vars.orderNote ?? ''}`); }
  if ('{vars.payment === 'stripe') {
    {
      const _lbl = page.locator(`label[for="payment_method_stripe"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_stripe`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ('{vars.payment === 'purchase') {
    {
      const _lbl = page.locator(`label[for="payment_method_woocommerce_gateway_purchase_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_woocommerce_gateway_purchase_order`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await blockUI(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLButtonElement>('button.wc_avatax_validate_address[data-address-type="billing"]')

return element  }, vars)) {
    await page.locator(`button.wc_avatax_validate_address[data-address-type="billing"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLButtonElement>('button.wc_avatax_validate_address[data-address-type="billing"]')

return element  }, vars)) {
    await blockUI(page, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLButtonElement>('button.wc_avatax_validate_address[data-address-type="billing"]')

return element  }, vars)) {
    await expect(page.locator(`#wc-avatax-address-validation`).first()).toContainText(`Address validated.`);
  }
}

// GI: "Fill Purchase order" (68cbf50e7f80fc466d5d0100)
export async function fillPurchaseOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Purchase Order`;
  {
    const _lbl = page.locator(`label[for="payment_method_woocommerce_gateway_purchase_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_woocommerce_gateway_purchase_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#po_number_field`).first().fill(`${vars.poNumber ?? ''}`); } catch { await page.locator(`#po_number_field`).first().selectOption(`${vars.poNumber ?? ''}`); }
  // TODO: file upload — replace URL with a local file path or fetch buffer
  await page.locator(`input[type="file"]`).first().setInputFiles(`https://ghostinspector-prod.s3.amazonaws.com/uploads/a6d2d215-ecb0-4bde-b804-2f8a0bbd03a6.pdf`);
  await expect(page.locator(`input[type="file"]`).first()).toContainText(`C:\\fakepath\\Purchase order - dummy.pdf`);
}

// GI: "Login" (68cb0151b6e829f43001c460)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (!page.url().includes('/my-account')) {
    await page.locator(`svg.fa-fw.e-far-user > path`).filter({ visible: true }).first().click({ force: true });
  }
  if (!page.url().includes('/my-account')) {
    await page.locator(`a[href="/my-account"] > .ep-content`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content-wrapper`)).not.toHaveCount(0);
}

// GI: "Logout" (68cafe3fb6e829f4300137b9)
export async function logout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/my-account/customer-logout?_wpnonce=f80c9744c6"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Register" (68cafc8e7f80fc466df39b01)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (!page.url().includes('/my-account')) {
    await page.locator(`svg.fa-fw.e-far-user`).filter({ visible: true }).first().click({ force: true });
  }
  if (!page.url().includes('/my-account')) {
    await page.locator(`xpath=//span[contains(text(), "Web Store Login")]`).or(page.locator(`a[href="/my-account"] > .ep-content > .ep-title`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Thank you page" (68cbf890b6e829f4307375fa)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.method > strong`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
}

// GI: "Verify Saved Payment Method" (6927432a46538043d23eaa0e)
export async function verifySavedPaymentMethod(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`Visa ending in 4242`);
}
