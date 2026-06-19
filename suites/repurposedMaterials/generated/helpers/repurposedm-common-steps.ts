// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "repurposedM - Common steps"
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

// GI: "Admin Login" (6982205bf70f37399af1b369)
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

// GI: "Check Order Details - Thank you page and My Account" (6982205b76f083a5652e9260)
export async function checkOrderDetailsThankYouPageAndMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.product === 'variable') {
    await checkVariations(page, vars);
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
  vars.feeIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
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
      if (thText.includes('Fee')) {
        taxIndex = index;
      }
    }
  });
}
  return taxIndex + 1 }, vars);
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.feeIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.fee ?? ''}`);
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
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.paymentIndex ?? ''}) > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
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
const feeIndex = vars.feeIndex;
const taxIndices = [vars.taxIndex]; 
const paymentIndex = vars.paymentIndex;
const totalIndex = vars.totalIndex;
const noteIndex = vars.noteIndex;


const orderGroups = [
    [discountIndex].filter(index => index !== null && index !== -1), // Discount:, Points Redeemed: (optional, any order)
    [shippingIndex],// Shipping:
    [feeIndex],//Fee
    taxIndices, // Tax fields (optional, any order)
    [paymentIndex], // Payment method:
    [totalIndex], // Total:
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
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`section.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}

Tax ID:`);
  if (false) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
}

// GI: "Check order Details in backend" (6982205bf70f37399af1b39f)
export async function checkOrderDetailsInBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:qa+gi_"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
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
  await expect(page.locator(`#order_line_items td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`#order_fee_line_items td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.fee ?? ''}`);
  if (vars.shippingPrice.includes('Pick-Up at Retail Location')) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  }
  if (!vars.shippingPrice.includes('Pick-Up at Retail Location')) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.fee ?? ''}`);
  if (vars.shippingPrice.includes('Pick-Up at Retail Location')) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
  if (!vars.shippingPrice.includes('Pick-Up at Retail Location')) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(5) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /accept\.blue Gateway v2 Payment Completed with Transaction Id of '[0-9]+'/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`accept\\.blue Gateway v2 capture approved\\. Captured: ${total} | Auth: OK\[0-9\]\+ | Visa •••• 1118 | Status: Approved \\(A\\)\\.`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
}

// GI: "Check Total" (6981fdcef70f37399ae928da)
export async function checkTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let unitPrice = `${vars.unitPrice}`
let shippingPrice = `${vars.shippingPrice}`
let subtotal = `${vars.subtotal}`;
let discount = `${vars.discount}`
if (shippingPrice === "" || shippingPrice === "Free" || shippingPrice.includes('Pick-Up at Retail Location')){
    shippingPrice = "0.00";
};
if (discount === ""){
    discount = "0.00";
};

let fee = `${vars.fee}`;
if (fee === ""){
    fee = "0.00";
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
fee = Number(fee.replace(`${vars.Symbol}`,"").replace(",","").trim());
tax = Number(tax.replace(`${vars.Symbol}`,"").replace(",","").trim());
total = Number(total.replace(`${vars.Symbol}`,"").replace(",","").trim());


let total2 = Number((subtotal-discount+tax+shippingPrice+fee).toFixed(2));

return total === total2 && subtotal === unitPrice }, vars)).toBeTruthy();
}

// GI: "Check variations" (6982043cf70f37399aea80e3)
export async function checkVariations(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const productTitle = document.querySelector<HTMLAnchorElement>('td.product-name > a, td.product-name, tr.order_item > td.td:nth-of-type(1)').textContent
const variations = vars.variations



function checkVariation(variation) {
    return productTitle.includes(variation)
}

// Check if any note matches the pattern
return variations.every(variation => checkVariation(variation.displayText));
 }, vars)).toBeTruthy();
}

// GI: "close popup" (6981e67476f083a56521e0ab)
export async function closePopup(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await expect(page.locator(`>>> button[aria-label="Close"].animation-finished`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`>>> button[aria-label="Close"].animation-finished`).first()).toBeVisible();
  } catch { /* optional step: assertElementVisible */ }
  try {
    await page.locator(`>>> button[aria-label="Close"].animation-finished`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "Extract user from email" (6982205b76f083a5652e92b4)
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

// GI: "Fill CC" (69821a27f70f37399af0ab3a)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Card Payment (3.25% Technology Fee applies)`;
  {
    const _lbl = page.locator(`label[for="payment_method_acceptbluev2"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_acceptbluev2`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`.input-text.acceptbluev2-card-name`).first().fill(`${vars.firstName ?? ''} ${vars.lastName ?? ''}`); } catch { await page.locator(`.input-text.acceptbluev2-card-name`).first().selectOption(`${vars.firstName ?? ''} ${vars.lastName ?? ''}`); }
  try { await page.locator(`#acceptbluev2-card-number`).first().fill(`4761530001111118`); } catch { await page.locator(`#acceptbluev2-card-number`).first().selectOption(`4761530001111118`); }
  // TODO: unknown keypress value="49"
  await page.locator(`#acceptbluev2-card-expiry`).first().press('49');
  // TODO: unknown keypress value="50"
  await page.locator(`#acceptbluev2-card-expiry`).first().press('50');
  // TODO: unknown keypress value="51"
  await page.locator(`#acceptbluev2-card-expiry`).first().press('51');
  // TODO: unknown keypress value="49"
  await page.locator(`#acceptbluev2-card-expiry`).first().press('49');
  try { await page.locator(`#acceptbluev2-card-cvc`).first().fill(`123`); } catch { await page.locator(`#acceptbluev2-card-cvc`).first().selectOption(`123`); }
}

// GI: "Fill Checkout" (698227c8f70f37399af3005d)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#ship-to-different-address-checkbox').checked

return !element && `${vars.logged}` !== 'yes' }, vars)) {
    {
      const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
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
  await blockUI(page, vars);
  try { await page.locator(`#order_comments`).first().fill(`Order Note for Testing this field`); } catch { await page.locator(`#order_comments`).first().selectOption(`Order Note for Testing this field`); }
  try { await page.locator(`#purchase_repurposing`).first().fill(`Test using`); } catch { await page.locator(`#purchase_repurposing`).first().selectOption(`Test using`); }
  {
    const _lbl = page.locator(`label[for="select2-how_did_you_hear_about_us-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-how_did_you_hear_about_us-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`xpath=//li[contains(text(), "Google")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.product === 'variable') {
    await checkVariations(page, vars);
  }
  await expect(page.locator(`td.product-total > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
  {
    const _lbl = page.locator(`label[for="shipping_method_0_local_pickup14"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#shipping_method_0_local_pickup14`).filter({ visible: true }).first().click({ force: true }); }
  }
  vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const label = document.querySelector('#shipping_method > li:last-child > label');
const div = label.querySelector('div');
div.remove();
const text = label.textContent.trim();

return text }, vars);
  vars.fee = ((await page.locator(`tr.fee > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
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

// GI: "Fill eCheck" (69822ea7f70f37399af42748)
export async function fillECheck(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit Card`;
  {
    const _lbl = page.locator(`label[for="payment_method_authorize_net_cim_echeck"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_authorize_net_cim_echeck`).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Go to My Account & Check Order Details" (6982205bf70f37399af1b3c5)
export async function goToMyAccountCheckOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//*[contains(text(),'My Account')]`).or(page.locator(`a[href*='/my-account']`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:first-child td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  await expect(page.locator(`tr:first-child > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > span`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
  await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
}

// GI: "Login" (69821e4cf70f37399af168ef)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (!page.url().includes('my-account')) {
    await page.locator(`.login > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce > .woocommerce-MyAccount-navigation`)).not.toHaveCount(0);
}

// GI: "Place Order - New User - Backend" (6982205b76f083a5652e9276)
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

// GI: "Place Order - New User - Email" (6982205bf70f37399af1b38d)
export async function placeOrderNewUserEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).or(page.locator(`xpath=//a[contains(text(), "is being processed")]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.product === 'variable') {
    await checkVariations(page, vars);
  }
  await expect(page.locator(`tr.order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-subtotal > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if (vars.discount === 'true') {
    await page.locator(`tbody > tr.order-totals.order-totals-discount > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(${vars.discountIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).filter({ visible: true }).first().click({ force: true });
  }
  await expect(page.locator(`tbody > tr.order-totals.order-totals-shipping > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tbody > tr.order-totals.order-totals-shipping > td.td`)).or(page.locator(`tr:nth-of-type(${vars.shippingIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).or(page.locator(`tr:nth-of-type(${vars.shippingIndex ?? ''}) > td.td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.fee > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tr:nth-of-type(${vars.feeIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.fee ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-tax > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tr:nth-of-type(${vars.taxIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-payment_method > td.td`).or(page.locator(`tr:nth-of-type(${vars.paymentIndex ?? ''}) > td.td`)).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td.td`).or(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr.order-customer-note > td.td`).or(page.locator(`tr:nth-of-type(${vars.noteIndex ?? ''}) > td.td`)).first()).toHaveText(`Order Note for Testing this field`);
  await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  if (false) {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
}

// GI: "Place Order - New User - Refund" (6982205b76f083a5652e9297)
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
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const fee = document.querySelector<HTMLTableRowElement>('tr.fee > td.line_cost > .view > .woocommerce-Price-amount.amount')

return !!fee }, vars)) {
    vars.feePriceWithoutTax = ((await page.locator(`tr.fee > td.line_cost > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const fee = document.querySelector<HTMLTableRowElement>('tr.fee > td.line_cost > .view > .woocommerce-Price-amount.amount')

return !!fee }, vars)) {
    try { await page.locator(`tr.fee > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().fill(`${vars.feePriceWithoutTax ?? ''}`); } catch { await page.locator(`tr.fee > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().selectOption(`${vars.feePriceWithoutTax ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const fee = document.querySelector<HTMLTableRowElement>('tr.fee > td.line_tax > .view > .woocommerce-Price-amount.amount')

return !!fee }, vars)) {
    vars.feeTax = ((await page.locator(`tr.fee > td.line_tax > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const fee = document.querySelector<HTMLTableRowElement>('tr.fee > td.line_tax > .view > .woocommerce-Price-amount.amount')

return !!fee }, vars)) {
    try { await page.locator(`tr.fee > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().fill(`${vars.feeTax ?? ''}`); } catch { await page.locator(`tr.fee > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().selectOption(`${vars.feeTax ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount')

return !!shipping }, vars)) {
    vars.shippingPriceWithoutTax = ((await page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount')

return !!shipping }, vars)) {
    try { await page.locator(`tr.shipping > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().fill(`${vars.shippingPriceWithoutTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingPriceWithoutTax ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return !!shipping  }, vars)) {
    vars.shippingTax = ((await page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return !!shipping  }, vars)) {
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
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`accept\\.blue Gateway v2 Refund with amount of ${total}`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`accept\\.blue Gateway v2 Refund Approved with type of Void`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
}

// GI: "Place Order - New User - Refund Email" (6982205bf70f37399af1b3cf)
export async function placeOrderNewUserRefundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td.td > del`).or(page.locator(`tfoot > tr > td.td > del`)).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td.td > ins > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
}

// GI: "Register" (69821ed876f083a5652e4d8a)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (!page.url().includes('my-account')) {
    await page.locator(`.login > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector("#mailchimp_woocommerce_newsletter")

return (elem as HTMLInputElement).checked }, vars)) {
    {
      const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#mailchimp_woocommerce_newsletter`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Thank you page" (6982205b76f083a5652e9288)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  vars.orderNumber = ((await page.locator(`li.woocommerce-order-overview__order.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.total > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`li.woocommerce-order-overview__payment-method.method > strong`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
}
