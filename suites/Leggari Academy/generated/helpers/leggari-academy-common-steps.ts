// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Leggari Academy - Common Steps"
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

// GI: "Admin Login" (69c28044c37b235f988fb858)
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

// GI: "Check Courses" (69c29b5e832da09b97cec22e)
export async function checkCourses(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`nav[aria-label="Menu"] > .elementor-nav-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/all-courses/"].elementor-item.menu-link`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/courses/"] > img.attachment-medium.size-medium.wp-post-image`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/courses/"].ld-lesson-item-preview-heading > [aria-label="Not started"].ld-status-icon.ld-status-incomplete`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/courses/"].ld-table-list-item-preview.ld-topic-row.learndash-incomplete`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`input[type="submit"]`).filter({ visible: true }).first().click({ force: true });
  // TODO: command="assertNotText" target=".ld-progress-percentage" value="0% Complete"
  await page.locator(`.widget_course_return > a[href*="/courses/"]`).filter({ visible: true }).first().click({ force: true });
  // TODO: command="assertNotText" target=".ld-progress-percentage" value="0% Complete"
  await page.locator(`nav[aria-label="Menu"] > .elementor-nav-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/all-courses/"].elementor-item.menu-link`).filter({ visible: true }).first().click({ force: true });
  // TODO: command="assertNotText" target="div:nth-of-type(1) > .thumbnail.course.sfwd-courses.type-sfwd-courses.status-publish.has-post-thumbnail.hentry.category-uncategorized.ld_course_category-public.membership-content.access-granted.ast-article-single > .caption > .learndash-wrapper.learndash-widget > .ld-progress.ld-progress-inline > .ld-progress-heading > .ld-progress-stats > .ld-progress-percentage.ld-secondary-color" value="0% Complete"
}

// GI: "Check Order Details - Thank you page and My Account" (69c192cac37b235f9871a584)
export async function checkOrderDetailsThankYouPageAndMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`Leggari Academy Membership`);
  await expect(page.locator(`li > p`).first()).toContainText(`Spanish`);
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
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
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''})  > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
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
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.taxIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
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
  await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.totalIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let discountIndex;
if (vars.coupon) {
    discountIndex = Number(`${vars.discountIndex}`);
} else {
    discountIndex = null
}// null or -1 if not present


const taxIndices = [vars.taxIndex];// Array of indices for tax fields (e.g., HST, GST, PST)
const paymentIndex = vars.paymentIndex;
const totalIndex = vars.totalIndex;


const orderGroups = [
    [discountIndex].filter(index => index !== null && index !== -1), // Discount:, Points Redeemed: (optional, any order)
    taxIndices,
    [paymentIndex],
    [totalIndex] // Total:
 // Payment method:
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
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  vars.subscriptionNumber = ((await page.locator(`a[href*="/membership-account/view-subscription/"][aria-label*="View subscription number"]`).textContent()) ?? '').trim();
  await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  await expect(page.locator(`td.subscription-next-payment`).first()).toContainText(`${vars.nextPayment ?? ''}`);
  await expect(page.locator(`td.subscription-total`).first()).toHaveText(`${vars.renewPrice ?? ''}.00 / month`);
}

// GI: "Check order Details in backend" (69c28080c37b235f988fc259)
export async function checkOrderDetailsInBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).or(page.locator(`a[href*="mailto:qa+gi_subs_"]`)).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]:nth-of-type(1)`).first()).toHaveText(`${vars.phone ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-child(3) > div.address > p`).first()).toHaveText(`${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).or(page.locator(`#order_line_items > tr > td.name > a`)).first()).toContainText(`Leggari Academy Membership`);
  await expect(page.locator(`#order_line_items > tr > td.name > div.view > table > tbody > tr > td > p`).first()).toContainText(`Spanish`);
  await expect(page.locator(`#order_line_items > tr > td.line_cost > div.view > span > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const total = `${vars.total}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`Stripe charge complete \\(Charge ID: ch_[0-9a-zA-Z]+\\)`)
    
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));

 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const email = `${vars.email}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`Payment via Credit / Debit Card \\(ch_[0-9a-zA-Z]+\\)\\.`)
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));

 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Stripe payment intent created \(Payment Intent ID: pi_[0-9a-zA-z]+\)/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
}

// GI: "Check Subscription in backend" (69c28a334ec32f1b87f1255d)
export async function checkSubscriptionInBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`mark.order-status > span`).first()).toContainText(`Active`);
  await expect(page.locator(`td:nth-of-type(5) > .amount`).first()).toHaveText(`${vars.renewPrice ?? ''}.00 / month`);
  await page.locator(`xpath=//a[contains(text(), "#${vars.subscriptionNumber ?? ''}")]`).or(page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionNumber ?? ''}&action=edit"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`Address:
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`Address:
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  await expect(page.locator(`a[href*="mailto:"]`).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`.address > p:nth-of-type(3)`).first()).toContainText(`${vars.phone ?? ''}`);
  await expect(page.locator(`td.name`).first()).toContainText(`Leggari Academy Membership`);
  await expect(page.locator(`td > p`).first()).toContainText(`Spanish`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.renewPrice ?? ''}.00`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.renewPrice ?? ''}.00`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.renewPrice ?? ''}.00`);
}

// GI: "Close popup - Contact" (69c170ddc37b235f986a4702)
export async function closePopupContact(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await expect(page.locator(`svg.e-eicon-close > use`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await page.locator(`svg.e-eicon-close`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "End Date" (69c199c6de491b5fc5fbbe24)
export async function endDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.endDate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var today = new Date();
var options = { timeZone: "America/Los_Angeles" };

// Convert the current date to 'America/Los_Angeles' timezone
var todayInLosAngeles = new Date(
  new Intl.DateTimeFormat('en-US', options).format(today)
);

// Add 14 days to today's date
var futureDate = new Date(todayInLosAngeles);
futureDate.setMonth(futureDate.getMonth() + 4);

// Define month names array
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Format the date as "Month Day, Year"
var formattedDate = monthNames[futureDate.getMonth()] + " " + futureDate.getDate() + ", " + futureDate.getFullYear();


return formattedDate }, vars);
}

// GI: "Extract user from email" (69c18015de491b5fc5f5bdad)
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

// GI: "Fill CC" (69c1765dc37b235f986bd0d3)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit / Debit Card`;
  await page.locator(`#payment-gateways-selector > div.leggari-payment-gateway:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`).first().selectOption(`4242 4242 4242 4242`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`).first().fill(`12 / 32`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`).first().selectOption(`12 / 32`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`).first().selectOption(`123`); }
}

// GI: "Fill Checkout" (69c18ba2de491b5fc5f86f17)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    {
      const _lbl = page.locator(`label[for="billing_language"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#billing_language`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_language`).first().fill(`spanish`); } catch { await page.locator(`#billing_language`).first().selectOption(`spanish`); }
  }
  if (vars.logged !== 'yes') {
    {
      const _lbl = page.locator(`label[for="leggari-btn-continue"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#leggari-btn-continue`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
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
  if (vars.logged !== 'yes') {
    await expect(page.locator(`#select2-shipping_country-container`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  {
    const _lbl = page.locator(`label[for="bill-to-different-address-checkbox"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#bill-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (vars.logged !== 'yes') {
    await expect(page.locator(`#select2-billing_country-container`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
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
  await blockUI(page, vars);
  await page.locator(`input[name="add_to_cart"][value="17041"]`).filter({ visible: true }).first().click({ force: true });
  vars.unitPrice = `$999`;
  vars.renewPrice = `$399`;
  await expect(page.locator(`li.product-item:nth-of-type(2) > .product-item-wrapper > .product-item-title`).first()).toContainText(`${vars.unitPrice ?? ''} + split-pay`);
  await expect(page.locator(`li.product-item:nth-of-type(2) > .product-item-wrapper > .price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`(3 x ${vars.renewPrice ?? ''})`);
  await blockUI(page, vars);
  await page.waitForTimeout(8000);
  await expect(page.locator(`.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.future-payments-detail > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.renewPrice ?? ''}`);
  await expect(page.locator(`.future-text`).first()).toContainText(`Three monthly																				 payments`);
  await expect(page.locator(`.final-payment-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  {
    const _lbl = page.locator(`label[for="terms"]`).or(page.locator(`label[for="terms_acceptance"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms`).or(page.locator(`#terms_acceptance`)).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Go to My Account & Check Order Details" (69c192c8c37b235f9871a523)
export async function goToMyAccountCheckOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*='${vars.startUrl ?? ''}membership-account/']`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "recent orders")]`).or(page.locator(`a[href*="/membership-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:first-child td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  await expect(page.locator(`tr:first-child > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > span`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await page.locator(`a[href*="account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
  await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
}

// GI: "Login" (69c17c79c37b235f986cf5d5)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (!page.url().includes('/login')) {
    await page.locator(`xpath=//span[contains(text(), "Members Login")]`).or(page.locator(`a[href*="/login/"] > .elementor-icon-list-text`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Next Payment Date" (69c19911c37b235f98726da0)
export async function nextPaymentDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.nextPayment = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var today = new Date();
var options = { timeZone: "America/Los_Angeles" };

// Convert the current date to 'America/Los_Angeles' timezone
var todayInLosAngeles = new Date(
  new Intl.DateTimeFormat('en-US', options).format(today)
);

// Add 14 days to today's date
var futureDate = new Date(todayInLosAngeles);
futureDate.setMonth(futureDate.getMonth() + 1);

// Define month names array
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Format the date as "Month Day, Year"
var formattedDate = monthNames[futureDate.getMonth()] + " " + futureDate.getDate() + ", " + futureDate.getFullYear();


return formattedDate }, vars);
}

// GI: "Place Order - New User - Backend" (69c2801ede491b5fc51b360c)
export async function placeOrderNewUserBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscriptionNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.subscriptionNumber}`;
const number = str.match(/\d+/)[0];
return number }, vars);
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_total.column-order_total .woocommerce-Price-amount.amount`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await checkOrderDetailsInBackend(page, vars);
  await checkSubscriptionInBackend(page, vars);
}

// GI: "Place Order - New User - Email" (69c27e52c37b235f988f7655)
export async function placeOrderNewUserEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`Leggari Academy Membership
Preferred language:

Spanish`);
  await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-subtotal > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-child(1) > td > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  if (vars.discount === 'true') {
    await page.locator(`tfoot > tr:nth-of-type(${vars.discountIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  }
  await expect(page.locator(`tbody > tr.order-totals.order-totals-tax > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-child(2) > td > span`)).first()).toHaveText(`$0.00`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-payment_method > td`).or(page.locator(`tfoot > tr:nth-child(3) > td`)).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-child(4) > td > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`td:nth-of-type(1) > address.address`).or(page.locator(`#addresses > tbody > tr > td > address > table > tbody > tr > td`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}


${vars.email ?? ''}`);
}

// GI: "Place Order - New User - Refund" (69c2947fc37b235f989455b2)
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
  await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.unitPrice ?? ''}.00`);
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
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.unitPrice}.00`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`Refunded ${total} \\– Refund ID: re_[0-9a-zA-Z]+ \\– Reason: Testing Refund`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
}

// GI: "Place Order - New User - Refund Email" (69c2954bc37b235f98948bc5)
export async function placeOrderNewUserRefundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
}

// GI: "Subscription Menu" (69c198094ec32f1b879cad78)
export async function subscriptionMenu(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await nextPaymentDate(page, vars);
  await endDate(page, vars);
  await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  await expect(page.locator(`td.subscription-next-payment`).first()).toContainText(`${vars.nextPayment ?? ''}`);
  await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.renewPrice ?? ''}.00`);
  await page.locator(`a[href*="/membership-account/view-subscription/"][aria-label*="View subscription number "]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
  await expect(page.locator(`tr:nth-of-type(4) > td:nth-of-type(2)`).first()).toContainText(`${vars.nextPayment ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(5) > td:nth-of-type(2)`).first()).toContainText(`${vars.endDate ?? ''}`);
  await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`Leggari Academy Membership`);
  await expect(page.locator(`li > p`).first()).toContainText(`Spanish`);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.renewPrice ?? ''}.00`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.renewPrice ?? ''}.00`);
  await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.renewPrice ?? ''}.00`);
  await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
}

// GI: "Thank you page" (69c19235c37b235f9871879f)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  vars.orderNumber = ((await page.locator(`li.woocommerce-order-overview__order.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.total > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}.00`);
  await expect(page.locator(`li.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
}
