// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Simply7oh - Common steps for Project"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, extractPassFromEmail } from './common-steps-for-all-projects';

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

// GI: "Admin Login" (69a1db738ce9cb3f625db2ef)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`a.jetpack-sso-toggle:nth-child(3)`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try { await page.locator(`#user_login`).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('#correct-admin-email')

return !!elem }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Check Order Details - Thank you page and My Account" (69a1db738ce9cb3f625db2f5)
export async function checkOrderDetailsThankYouPageAndMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { const product = vars.product

return product === 'variable' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc} - ${vars.variable}`.toLowerCase().replace('–','-');
const prod_desc2 = document.querySelector<HTMLAnchorElement>('td.product-name > a')?.innerText.toLowerCase().replace('–','-');
// Normalize spaces, quotes, and ×/x
const normalize = str => str
  .replace(/×|x/gi, '×') // Normalize × or x
  .replace(/[‘’“”]/g, '"') // Normalize curly/straight quotes
  .replace(/\s+/g, ' ') // Collapse multiple spaces to one
  .trim(); // Remove leading/trailing spaces
const full_prod_desc = normalize(prod_desc);
const normalized_prod_desc2 = normalize(prod_desc2);

console.log(`Normalized prod_desc + " × ${vars.qty}":`, full_prod_desc);
console.log('Normalized prod_desc2:', normalized_prod_desc2);
console.log('Are they equal?', full_prod_desc === normalized_prod_desc2);

return full_prod_desc === normalized_prod_desc2
 }, vars)).toBeTruthy();
  }
  if ((() => { const product = vars.product

return product === 'simple' || product === '' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.toLowerCase().replace('–','-');
const prod_desc2 = document.querySelector<HTMLAnchorElement>('td.product-name > a')?.innerText.toLowerCase().replace('–','-');
// Normalize spaces, quotes, and ×/x
const normalize = str => str
  .replace(/×|x/gi, '×') // Normalize × or x
  .replace(/[‘’“”]/g, '"') // Normalize curly/straight quotes
  .replace(/\s+/g, ' ') // Collapse multiple spaces to one
  .trim(); // Remove leading/trailing spaces
const full_prod_desc = normalize(prod_desc);
const normalized_prod_desc2 = normalize(prod_desc2);

console.log(`Normalized prod_desc + " × ${vars.qty}":`, full_prod_desc);
console.log('Normalized prod_desc2:', normalized_prod_desc2);
console.log('Are they equal?', full_prod_desc === normalized_prod_desc2);

return full_prod_desc === normalized_prod_desc2
 }, vars)).toBeTruthy();
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
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''})  > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
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

let redeemedIndex;
if (vars.redeeming) {
    redeemedIndex = Number(`${vars.redeemedIndex}`);
} else {
    redeemedIndex = null
}// null or -1 if not present

const shippingIndex = vars.shippingIndex;

const taxIndices = [vars.taxIndex];// Array of indices for tax fields (e.g., HST, GST, PST)
const paymentIndex = vars.paymentIndex;
const totalIndex = vars.totalIndex;
const noteIndex = vars.noteIndex;


const orderGroups = [
    [discountIndex, redeemedIndex].filter(index => index !== null && index !== -1), // Discount:, Points Redeemed: (optional, any order)
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
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
}

// GI: "Check order Details in backend" (69a1db738ce9cb3f625db2f7)
export async function checkOrderDetailsInBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit/Debit Card`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).or(page.locator(`a[href*="mailto:qa+gi_subs_"]`)).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`.order_note`).first()).toContainText(`Order Note for Testing this field`);
  await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if (!vars.shippingPrice.includes('Free') && !vars.shippingPrice.includes('FREE')) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.shippingPrice.includes('Free') || vars.shippingPrice.includes('FREE')) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const total = `${vars.total}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`Authorize\\.net charge completed for ${total} \\(Charge ID: [0-9]+\\)\\. `)
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));

 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const email = `${vars.email}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(` points earned via points For Purchase \\(${email}\\)`)
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));

 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Payment via Credit\/Debit Card \([0-9]+\)\./;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
}

// GI: "Check Total" (69a5c9b53dc7ceb27ca1d43e)
export async function checkTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let unitPrice = `${vars.unitPrice}`
let shippingPrice = `${vars.shippingPrice}`
let subtotal = `${vars.subtotalPrice}`;
let discount = `${vars.discount}`
if (shippingPrice === "" || shippingPrice.includes("Free") || shippingPrice.includes("FREE")){
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

// GI: "Extract user from email" (69a5b6c33dc7ceb27c9db37d)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(30000);
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /^(qa\+)?(\w+)[^@]+/g
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Fill CC" (69a1db738ce9cb3f625db2fa)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit/Debit Card`;
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    try { await page.locator(`#authnet-card-number`).first().fill(`4111111111111111`); } catch { await page.locator(`#authnet-card-number`).first().selectOption(`4111111111111111`); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    // TODO: unknown keypress value="49"
    await page.locator(`#authnet-card-expiry`).first().press('49');
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    // TODO: unknown keypress value="50"
    await page.locator(`#authnet-card-expiry`).first().press('50');
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    // TODO: unknown keypress value="51"
    await page.locator(`#authnet-card-expiry`).first().press('51');
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    // TODO: unknown keypress value="48"
    await page.locator(`#authnet-card-expiry`).first().press('48');
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    try { await page.locator(`#authnet-card-cvc`).first().fill(`123`); } catch { await page.locator(`#authnet-card-cvc`).first().selectOption(`123`); }
  }
  if ((() => { const saveCC = vars.saveCC

return saveCC === 'true' })()) {
    {
      const _lbl = page.locator(`label[for="wc-authnet-new-payment-method"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wc-authnet-new-payment-method`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Fill Checkout" (69a1db738ce9cb3f625db2fb)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    await expect(page.locator(`#select2-billing_country-container`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
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
  if (vars.logged !== 'yes') {
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  }
  await page.locator(`xpath=//button[contains(text(),'Continue To Shipping')]`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
  try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
  try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
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
  await blockUI(page, vars);
  try { await page.locator(`#order_comments`).first().fill(`Order Note for Testing this field`); } catch { await page.locator(`#order_comments`).first().selectOption(`Order Note for Testing this field`); }
  vars.subtotalPrice = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector<HTMLInputElement>('input.shipping_method[checked="checked"]')

const shipping = elem.closest('li').querySelector('label, label > .woocommerce-Price-amount.amount > bdi').innerText

return shipping
 }, vars);
  await blockUI(page, vars);
  vars.taxPrice = ((await page.locator(`tr.tax-total:not(.recurring-total) > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  // TODO: command="assertNotText" target="tr.tax-total:not(.recurring-total) > td > .woocommerce-Price-amount.amount > bdi" value="$0.00"
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const taxPrice = parseFloat(String(`${vars.taxPrice}`).replace(/[^\d.-]/g, ''))

return taxPrice !== 0 }, vars)).toBeTruthy();
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  await page.locator(`xpath=//button[contains(text(),'Continue To Payment')]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.simply7-scroll-chevron > svg`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="disclaimer_acceptance"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#disclaimer_acceptance`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="terms"]`).or(page.locator(`label[for="terms_acceptance"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms`).or(page.locator(`#terms_acceptance`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await checkTotal(page, vars);
}

// GI: "First letter Capitalized" (69a1db738ce9cb3f625db2fc)
export async function firstLetterCapitalized(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const phrase = `${vars.prod_desc}`;
const result = phrase
  .toLowerCase() // Convert entire string to lowercase
  .split(/(\s+|-|,|")/) // Split by spaces, hyphens, or commas, keeping delimiters
  .map(word => 
    word.match(/^[a-zA-Z]/) ? // Check if word starts with a letter
      word.charAt(0).toUpperCase() + word.slice(1) : // Capitalize first letter
      word // Keep non-letter words (like '35G', '-', ',') unchanged
  )
  .join(''); // Join back together

 return result }, vars);
}

// GI: "Go to My Account & Check Order Details" (69a1db738ce9cb3f625db2fe)
export async function goToMyAccountCheckOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//*[contains(text(),'My Account')]`).or(page.locator(`xpath=//a[contains(text(),'Account')]`)).or(page.locator(`a[href*='/account/']`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:first-child td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  await expect(page.locator(`tr:first-child > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > span`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
  await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
}

// GI: "Login" (69a1db738ce9cb3f625db2ff)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="account/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`form.woocommerce-form.woocommerce-form-login.login`)).not.toHaveCount(0);
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`button[name="login"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-navigation`)).not.toHaveCount(0);
}

// GI: "Place Order - New User - Backend" (69a1db738ce9cb3f625db301)
export async function placeOrderNewUserBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.subscription === 'true') {
    vars.subscriptionNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.subscriptionNumber}`;
const number = str.match(/\d+/)[0];
return number }, vars);
  }
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

// GI: "Place Order - New User - Email" (69a1db738ce9cb3f625db302)
export async function placeOrderNewUserEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  await extractPassFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
  vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const phrase = `${vars.prod_desc}`;
const result = phrase
  .toLowerCase() // Convert entire string to lowercase
  .split(/(\s+|-|,|")/) // Split by spaces, hyphens, or commas, keeping delimiters
  .map(word => 
    word.match(/^[a-zA-Z]/) ? // Check if word starts with a letter
      word.charAt(0).toUpperCase() + word.slice(1) : // Capitalize first letter
      word // Keep non-letter words (like '35G', '-', ',') unchanged
  )
  .join('');
  
  return result }, vars);
  await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-subtotal > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if (vars.discount === 'true') {
    await page.locator(`tfoot > tr:nth-of-type(${vars.discountIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  }
  await expect(page.locator(`tbody > tr.order-totals.order-totals-shipping > td > .woocommerce-Price-amount.amount`).or(page.locator(`tbody > tr.order-totals.order-totals-shipping > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-tax > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-payment_method > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr.order-customer-note > td.td`).first()).toHaveText(`Order Note for Testing this field`);
  await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
}

// GI: "Place Order - New User - Refund" (69a1db738ce9cb3f625db303)
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
  if (vars.country === 'AU') {
    vars.formattedDate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const options = { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    timeZone: 'Australia/Sydney'
};

const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', options);
return formattedDate }, vars);
  }
  if (vars.country === 'CA) {
    vars.formattedDate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const options = { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    timeZone: 'America/Toronto'
};

const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', options);
return formattedDate }, vars);
  }
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = new RegExp(`Authorize\\.net charge refunded \\(Charge ID: [0-9]+\\)\\.`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
}

// GI: "Place Order - New User - Refund Email" (69a1db738ce9cb3f625db304)
export async function placeOrderNewUserRefundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
}

// GI: "Registration" (69a1db738ce9cb3f625db306)
export async function registration(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="account/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-form.woocommerce-form-register.register`)).not.toHaveCount(0);
  try { await page.locator(`input#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`input#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`input#reg_password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`input#reg_password`).first().selectOption(`${vars.pass ?? ''}`); }
  try { await page.locator(`input[name='reg_firstname']`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`input[name='reg_firstname']`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`input[name='reg_lastname']`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`input[name='reg_lastname']`).first().selectOption(`${vars.lastName ?? ''}`); }
  await page.locator(`button.woocommerce-Button.woocommerce-button.button.woocommerce-form-register__submit`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.elementor-shortcode > .woocommerce`)).not.toHaveCount(0);
  await page.locator(`xpath=//a[contains(text(), "Points & Rewards")]`).or(page.locator(`a[href*="/account/loyalty_reward/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#wlr-available-point-value`).first()).toContainText(`250`);
}

// GI: "Thank you page" (69a1db738ce9cb3f625db30a)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received, check out our YouTube channel while you wait!`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.username ?? ''}`);
  vars.orderNumber = ((await page.locator(`li.woocommerce-order-overview__order.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.total > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`li.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
}

// GI: "Under 18 Age" (69a1df3d3dc7ceb27c5f9b49)
export async function under18Age(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.avwp-av`)).not.toHaveCount(0);
  await expect(page.locator(`.avwp-av > h2`).first()).toContainText(`Age Verification`);
  await expect(page.locator(`.avwp-av > p:nth-of-type(1)`)).not.toHaveCount(0);
  await page.locator(`xpath=//button[contains(text(), "YES")]`).or(page.locator(`button.yes`)).filter({ visible: true }).first().click({ force: true });
}
