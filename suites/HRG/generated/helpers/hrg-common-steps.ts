// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "HRG - Common steps"
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

// GI: "Admin Login" (6920626228d2a810e8ddfb27)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#user_login`).or(page.locator(`#user`)).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`#user`)).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).or(page.locator(`div > div > div.pp-field-group.pp-field-type-submit > button.pp-login-form--button.pp-submit-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#correct-admin-email')

return !!element }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Check Order Details - Thank you page and My Account" (6920605f638b72979291d653)
export async function checkOrderDetailsThankYouPageAndMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.product === 'variable') {
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.variable1 ?? ''}`);
  }
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
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''})  > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if (vars.coupon === 'true') {
    vars.discountIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
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
let discountIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText === 'Discount:') {
        discountIndex = index;
      }
    }
  });
} 
  return discountIndex + 1 }, vars);
  }
  if (vars.coupon === 'true') {
    await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.discountIndex ?? ''}) > td .woocommerce-Price-amount`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
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
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.shippingIndex ?? ''}) > td > .woocommerce-Price-amount`).or(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.shippingIndex ?? ''}) > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
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
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.taxIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
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
      if (thText === 'Payment method:') {
        paymentIndex = index;
      }
    }
  });
}
  return paymentIndex + 1 }, vars);
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.paymentIndex ?? ''}) > td`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
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
      if (thText === 'Total:') {
        totalIndex = index;
      }
    }
  });
}
  return totalIndex + 1 }, vars);
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.totalIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
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
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.noteIndex ?? ''}) > td`).first()).toHaveText(`Order Note for Testing this field`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let discountIndex;
if (vars.coupon) {
    discountIndex = Number(`${vars.discountIndex}`);
} else {
    discountIndex = null
}// null or -1 if not present
const shippingIndex = vars.shippingIndex;

const taxIndices = [vars.taxIndex]; 
const paymentIndex = vars.paymentIndex;
const totalIndex = vars.totalIndex;
const noteIndex = vars.noteIndex;


const orderGroups = [
    [discountIndex].filter(index => index !== null && index !== -1), // Discount:, Points Redeemed: (optional, any order)
    [shippingIndex], // Shipping:
    taxIndices, // Tax fields (optional, any order)
    [totalIndex], // Total:
    [paymentIndex], // Payment method:
    [noteIndex] // Note: must be last
  ].filter(group => group.length > 0); 

  // Check order by ensuring each group's indices are greater than the previous group's
  let maxIndex = -1;
  let result = true;
  for (let i = 0; i < orderGroups.length; i++) {
    const group = orderGroups[i];
    const minGroupIndex = Math.min(...group);
    if (minGroupIndex <= maxIndex) {
      console.log(`Out of order: Group ${i + 1} (indices: ${group}) appears before or at position of previous group (max index: ${maxIndex})`);
      result = false;
    }
    maxIndex = Math.max(...group);
  }

return result
 }, vars)).toBeTruthy();
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
}

// GI: "Check order Details in backend" (6920625e638b729792922a36)
export async function checkOrderDetailsInBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:qa+gi_"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`.order_data_column:nth-child(2) a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`.order_note`).first()).toContainText(`Order Note for Testing this field`);
  await expect(page.locator(`td.name a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.product === 'variable') {
    await expect(page.locator(`td.name a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.variable1 ?? ''}`);
  }
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.shippingPrice.includes('Ground')) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  }
  if (!vars.shippingPrice.includes('Ground')) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if (vars.shippingPrice.includes('Ground')) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
  if (!vars.shippingPrice.includes('Ground')) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  if (vars.paymentMethod === 'Credit Card') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Payment Status: Succeeded, Source: Payment is Completed via Visa/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  }
  if (vars.paymentMethod === 'Klarna') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Payment Status: Succeeded, Source: Payment is Completed via Klarna/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  }
  if (vars.paymentMethod === 'Affirm Pay over time') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const total = `${vars.total}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`Captured charge of ${total} \\(charge ID [0-9A-Z]+-[0-9A-Z]+ / event ID [0-9A-Z]+\\)`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  }
  if (vars.paymentMethod === 'PayPal') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /PayPal transaction ID: [0-9A-Z]+/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  }
  if (vars.paymentMethod === 'Afterpay') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Payment approved\. Afterpay Order ID: [0-9]+\./;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  }
}

// GI: "Check Total" (69206b8428d2a810e8df3a25)
export async function checkTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let unitPrice = `${vars.unitPrice}`
let shippingPrice = `${vars.shippingPrice}`
let subtotal = `${vars.subtotal}`;
let discount = `${vars.discount}`
if (shippingPrice === "" || shippingPrice === "UPS - UPS® Ground" || shippingPrice === "UPS – UPS® Ground"){
    shippingPrice = "0.00";
};
if (discount === ""){
    discount = "0.00";
};

let tax = `${vars.taxPrice}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.total}`;

unitPrice = Number(unitPrice.replace(`${vars.Symbol}`,"").replace(",","").trim());
shippingPrice = Number(shippingPrice.replace(`${vars.Symbol}`,"").replace(",","").trim());
discount = Number(discount.replace(`${vars.Symbol}`,"").replace(",","").trim());
subtotal = Number(subtotal.replace(`${vars.Symbol}`,"").replace(",","").trim());
tax = Number(tax.replace(`${vars.Symbol}`,"").replace(",","").trim());
total = Number(total.replace(`${vars.Symbol}`,"").replace(",","").trim());


let total2 = Number((subtotal-discount+tax+shippingPrice).toFixed(2));

return total === total2 && subtotal === unitPrice }, vars)).toBeTruthy();
}

// GI: "close popup" (69207cc6638b72979295f274)
export async function closePopup(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(5000);
  try {
    await expect(page.locator(`>>>button#el_6YAa3Y22h`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await page.locator(`>>>button#el_6YAa3Y22h`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "Extract user from email" (692061d2638b7297929210b3)
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

// GI: "Fill Affirm" (693c40b60e1e837d8cc232f7)
export async function fillAffirm(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Affirm Pay over time`;
  {
    const _lbl = page.locator(`label[for="payment_method_affirm"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_affirm`).filter({ visible: true }).first().click({ force: true }); }
  }
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
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="disclosure-checkbox-indicator"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`[data-testid="submit-button"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`//button[contains(text(), "Confirm")]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src*="sandbox.affirm.com"]`).first().contentFrame().locator(`button[type="submit"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
}

// GI: "Fill AfterPay" (693c3caf0e1e837d8cc1bc43)
export async function fillAfterPay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Afterpay`;
  {
    const _lbl = page.locator(`label[for="payment_method_afterpay"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_afterpay`).filter({ visible: true }).first().click({ force: true }); }
  }
  await placeOrderElement(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLInputElement>('[data-testid="login-identity-input"], input[aria-label="E​m​ail or mobile number"]')

return !!element }, vars)) {
    try { await page.locator(`[data-testid="login-identity-input"]`).or(page.locator(`input[aria-label="E​m​ail or mobile number"]`)).first().fill(`qa@saucal.com`); } catch { await page.locator(`[data-testid="login-identity-input"]`).or(page.locator(`input[aria-label="E​m​ail or mobile number"]`)).first().selectOption(`qa@saucal.com`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLButtonElement>('[data-testid="login-identity-button"]')

return !!element
 }, vars)) {
    await page.locator(`[data-testid="login-identity-button"]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
  }
  await expect(page.locator(`[data-testid="login-password-input"]`).or(page.locator(`input[name="password"]`))).not.toHaveCount(0);
  await expect(page.locator(`[data-testid="login-password-input"]`).or(page.locator(`input[name="password"]`)).first()).toBeVisible();
  try { await page.locator(`[data-testid="login-password-input"]`).or(page.locator(`input[name="password"]`)).first().fill(`fric2171Biot`); } catch { await page.locator(`[data-testid="login-password-input"]`).or(page.locator(`input[name="password"]`)).first().selectOption(`fric2171Biot`); }
  await page.locator(`xpath=//span[contains(text(), "Continue")]`).or(page.locator(`[data-testid="login-password-button"] > .a_p > .a_x`)).or(page.locator(`button[type="submit"] > .a_p > .a_x`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//span[contains(text(), "Confirm")]`).or(page.locator(`[data-testid="summary-button"] > .a_p > .a_x`)).or(page.locator(`button[type="button"].a_l.a_i > .a_p > .a_x`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`[data-testid="loading-icon-svg"] > svg`).or(page.locator(`.sw_kq > svg`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`[data-testid="loading-icon-svg"] > svg`).or(page.locator(`.sw_kq > svg`))).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
}

// GI: "Fill CC" (6920605a638b72979291d50d)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit Card`;
  {
    const _lbl = page.locator(`label[for="payment_method_cpsw_stripe"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_cpsw_stripe`).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`)).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`)).first().selectOption(`4242 4242 4242 4242`); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`)).first().fill(`12 / 30`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`)).first().selectOption(`12 / 30`); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
  }
  if ((() => { let saveCC = vars.saveCC

return saveCC === 'true' })()) {
    {
      const _lbl = page.locator(`label[for="wc-stripe-new-payment-method"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wc-stripe-new-payment-method`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Fill Checkout" (6920605828d2a810e8ddaa6a)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
  }
  // skipped: select-open click on '#billing_country' (Select2 pattern)
  if (vars.logged !== 'yes') {
    await page.locator(`#billing_country`).first().selectOption(`${vars.country ?? ''}`);
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
  }
  // skipped: select-open click on '#billing_state' (Select2 pattern)
  if (vars.logged !== 'yes') {
    await page.locator(`#billing_state`).first().selectOption(`${vars.state ?? ''}`);
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#mailchimp_woocommerce_newsletter')

return (element as HTMLInputElement).checked }, vars)) {
    {
      const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#mailchimp_woocommerce_newsletter`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (vars.logged !== 'yes') {
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#account_username`).first().fill(`qa${vars.alphanumeric ?? ''}`); } catch { await page.locator(`#account_username`).first().selectOption(`qa${vars.alphanumeric ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
  }
  // skipped: select-open click on '#shipping_country' (Select2 pattern)
  if (vars.logged !== 'yes') {
    await page.locator(`#shipping_country`).first().selectOption(`${vars.country ?? ''}`);
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  }
  // skipped: select-open click on '#shipping_state' (Select2 pattern)
  if (vars.logged !== 'yes') {
    await page.locator(`#shipping_state`).first().selectOption(`${vars.state ?? ''}`);
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#shipping_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  await blockUI(page, vars);
  try { await page.locator(`#order_comments`).first().fill(`Order Note for Testing this field`); } catch { await page.locator(`#order_comments`).first().selectOption(`Order Note for Testing this field`); }
  if (vars.product === 'simple') {
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if (vars.product === 'variable') {
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.color ?? ''}`);
  }
  await expect(page.locator(`td.product-total > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
  vars.shippingPrice = ((await page.locator(`tr.shipping ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.shipping ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount`)).or(page.locator(`tr.shipping ul#shipping_method > li:nth-child(1) > label`)).textContent()) ?? '').trim();
  vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  await checkTotal(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#terms')

return !(element as HTMLInputElement).checked }, vars)) {
    {
      const _lbl = page.locator(`label[for="terms"]`).or(page.locator(`label[for="terms_acceptance"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).or(page.locator(`#terms_acceptance`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Fill Klarna" (693c69870e1e837d8cc570f7)
export async function fillKlarna(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Klarna`;
  {
    const _lbl = page.locator(`label[for="payment_method_cpsw_klarna"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_cpsw_klarna`).filter({ visible: true }).first().click({ force: true }); }
  }
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="onContinue__text"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//span[contains(text(), "Continue")]`).or(page.locator(`#onContinue__text`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`[data-testid="kaf-field"]`).or(page.locator(`#otp_field`))).not.toHaveCount(0);
  await expect(page.locator(`[data-testid="kaf-field"]`).or(page.locator(`#otp_field`)).first()).toBeVisible();
  try { await page.locator(`[data-testid="kaf-field"]`).or(page.locator(`#otp_field`)).first().fill(`123456`); } catch { await page.locator(`[data-testid="kaf-field"]`).or(page.locator(`#otp_field`)).first().selectOption(`123456`); }
  {
    const _lbl = page.locator(`label[for="onContinue__text"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//span[contains(text(), "Continue")]`).or(page.locator(`#onContinue__text`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLInputElement>('input[name="offers__group"]')

return !!element }, vars)) {
    await page.locator(`input[name="offers__group"]`).filter({ visible: true }).first().click({ force: true });
  }
  await expect(page.locator(`#offers-selector-continue-button__text`).or(page.locator(`#offers-selector-continue-button`))).not.toHaveCount(0);
  await expect(page.locator(`#offers-selector-continue-button__text`).or(page.locator(`#offers-selector-continue-button`)).first()).toBeVisible();
  {
    const _lbl = page.locator(`label[for="offers-selector-continue-button__text"]`).or(page.locator(`label[for="offers-selector-continue-button"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#offers-selector-continue-button__text`).or(page.locator(`#offers-selector-continue-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`xpath=//span[contains(text(), "Pay with")]`).or(page.locator(`#buy_button__text`))).not.toHaveCount(0);
  await expect(page.locator(`xpath=//span[contains(text(), "Pay with")]`).or(page.locator(`#buy_button__text`)).first()).toBeVisible();
  {
    const _lbl = page.locator(`label[for="buy_button__text"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//span[contains(text(), "Pay with")]`).or(page.locator(`#buy_button__text`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`#loader > circle-loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve) => {
  const checkExistence = setInterval(() => {
    let block = Array.from<any>(document.querySelectorAll('#loader > circle-loader'));

    if (block.length === 0) { // Explicitly check if NodeList is empty
      clearInterval(checkExistence);
      resolve(true);
    }
  }, 100);
}) }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  try {
    await expect(page.locator(`#loader > circle-loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
}

// GI: "Fill PayPal" (693c6ebf2ab7b3e70ac5f903)
export async function fillPayPal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `PayPal`;
  {
    const _lbl = page.locator(`label[for="payment_method_ppcp-gateway"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_ppcp-gateway`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[title="PayPal"]`).first().contentFrame().locator(`.paypal-button.paypal-button-number-0`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try {
    await expect(page.locator(`.loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try { await page.locator(`#email`).or(page.locator(`#login_email`)).or(page.locator(`*[id*='email'][type='email']`)).first().fill(`${vars.payPalUser ?? ''}`); } catch { await page.locator(`#email`).or(page.locator(`#login_email`)).or(page.locator(`*[id*='email'][type='email']`)).first().selectOption(`${vars.payPalUser ?? ''}`); }
  await expect(page.locator(`#btnNext`).or(page.locator(`xpath=//button[contains(text(),'Next')]`))).not.toHaveCount(0);
  {
    const _lbl = page.locator(`label[for="btnNext"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#btnNext`).or(page.locator(`#publicCredentialSubmitForm > button`)).or(page.locator(`xpath=//button[contains(text(),'Next')]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`div > span.sr-only`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`div > span.sr-only`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await page.locator(`#identity_auth_provider > main > div:nth-child(1) > div.flex.flex-col.items-center.px-3.py-0 > form.mt-4.w-full > button`).or(page.locator(`xpath=//a[contains(text(),'Log in with a password instead')]`)).or(page.locator(`xpath=//button[contains(text(),'Use Password Instead')]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try { await page.locator(`div > input#password[name='login_password']`).or(page.locator(`div > div > input#password`)).or(page.locator(`#password`)).first().fill(`${vars.payPalPass ?? ''}`); } catch { await page.locator(`div > input#password[name='login_password']`).or(page.locator(`div > div > input#password`)).or(page.locator(`#password`)).first().selectOption(`${vars.payPalPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="btnLogin"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#identity_auth_provider > main > div:nth-child(1) > div.flex.flex-col.items-center.px-3.py-0 > form.mt-4.grid.w-full > button`).or(page.locator(`xpath=//button[contains(text(),'Log In')]`)).or(page.locator(`#btnLogin`)).or(page.locator(`button[type='submit']`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`xpath=//span[contains(text(),'Logging in...')]`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`xpath=//span[contains(text(),'Logging in...')]`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForTimeout(5000);
  await expect(page.locator(`button[data-id='payment-submit-btn']`).or(page.locator(`xpath=//*[@id="one-time-cta"]/div/div/div[contains(text(),'Pay')]`)).or(page.locator(`button[type='submit'] > div > div > div:nth-of-type(1)`))).not.toHaveCount(0);
  await page.locator(`button[data-id='payment-submit-btn']`).or(page.locator(`xpath=//*[@id="one-time-cta"]/div/div/div[contains(text(),'Pay')]`)).or(page.locator(`button[type='submit'] > div > div > div:nth-of-type(1)`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`.loader`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`)).or(page.locator(`xpath=//h1[contains(text(),'Completing purchase')]`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`xpath=//h1[contains(text(),'Completing purchase')]`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`))).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForTimeout(10000);
  await page.waitForLoadState('load');
  await blockUI(page, vars);
}

// GI: "Go to My Account & Check Order Details" (69206062638b72979291d6c3)
export async function goToMyAccountCheckOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//*[contains(text(),'My Account')]`).or(page.locator(`a[href*='/my-account']`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:first-child td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  await expect(page.locator(`tr:first-child > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > span`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
  await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
}

// GI: "Login" (6920792b638b7297929554fb)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (!page.url().includes('/my-account') && !page.url().includes('/login')) {
    await page.locator(`xpath=//span[contains(text(), "Sign In")]`).or(page.locator(`a[href="/my-account"] > .elementor-icon-list-text`)).or(page.locator(`xpath=//a[contains(text(), "My account")]`)).filter({ visible: true }).first().click({ force: true });
  }
  {
    const _lbl = page.locator(`label[for="username"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#username`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="password"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#password`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
}

// GI: "Place Order - New User - Backend" (6920623928d2a810e8ddf4e1)
export async function placeOrderNewUserBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await checkOrderDetailsInBackend(page, vars);
}

// GI: "Place Order - New User - Email" (692061af638b729792920988)
export async function placeOrderNewUserEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.product === 'variable') {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.variable1 ?? ''}`);
  }
  await expect(page.locator(`tr.order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-subtotal > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if (vars.discount === 'true') {
    await page.locator(`tbody > tr.order-totals.order-totals-discount > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(${vars.discountIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).filter({ visible: true }).first().click({ force: true });
  }
  await expect(page.locator(`tbody > tr.order-totals.order-totals-shipping > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tbody > tr.order-totals.order-totals-shipping > td.td`)).or(page.locator(`tr:nth-of-type(${vars.shippingIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).or(page.locator(`tr:nth-of-type(${vars.shippingIndex ?? ''}) > td.td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-tax > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tr:nth-of-type(${vars.taxIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-payment_method > td.td`).or(page.locator(`tr:nth-of-type(${vars.paymentIndex ?? ''}) > td.td`)).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td.td`).or(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr.order-customer-note > td.td`).or(page.locator(`tr:nth-of-type(${vars.noteIndex ?? ''}) > td.td`)).first()).toHaveText(`Customer note
Order Note for Testing this field`);
  await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}`);
  await expect(page.locator(`td.filename`).first()).toBeVisible();
}

// GI: "Place Order - New User - Refund" (692062ff28d2a810e8de1436)
export async function placeOrderNewUserRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  vars.refund = `true`;
  await adminLogin(page, vars);
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
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  if (vars.paymentMethod === 'Credit Card') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = /Transaction ID : re_[a-zA-Z0-9]+/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
  }
  if (vars.paymentMethod === 'Afterpay') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`Refund of ${total} sent to Afterpay. Reason: Testing Refund`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
  }
  if (vars.paymentMethod === 'PayPal') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = /PayPal refund ID: [A-Z0-9]+/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
  }
}

// GI: "Place Order - New User - Refund Email" (6920633c28d2a810e8de1b97)
export async function placeOrderNewUserRefundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td.td > del`).or(page.locator(`tfoot > tr > td.td > del`)).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td.td > ins > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  await expect(page.locator(`td.filename`).first()).toBeVisible();
}

// GI: "Register" (6920a1ab638b7297929bb035)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (!page.url().includes('/my-account') && !page.url().includes('/login')) {
    await page.locator(`a[href*="/my-account"]`).filter({ visible: true }).first().click({ force: true });
  }
  await page.locator(`xpath=//span[contains(text(), "Register")]`).or(page.locator(`a[href="/customer-registration/"] > .elementor-button-content-wrapper > .elementor-button-text`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#user_login`).first().fill(`${vars.firstName ?? ''}${vars.alphanumeric ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.firstName ?? ''}${vars.alphanumeric ?? ''}`); }
  try { await page.locator(`#user_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_email`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.password ?? ''}`); }
  try { await page.locator(`#user_confirm_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#user_confirm_password`).first().selectOption(`${vars.password ?? ''}`); }
  try { await page.locator(`input[placeholder="Enter your company name"]`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`input[placeholder="Enter your company name"]`).first().selectOption(`${vars.company ?? ''}`); }
  await closePopup(page, vars);
  await page.locator(`input[placeholder="Enter your phone number"]`).filter({ visible: true }).first().click({ force: true });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.locator(`button[type="submit"].btn`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Thank you page" (6920605d638b72979291d554)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  vars.orderNumber = ((await page.locator(`li.woocommerce-order-overview__order.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.total > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`li.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
}
