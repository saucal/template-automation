// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Common Steps for all Projects"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { extractUsername } from './avison-common-steps';
import { extractUsernameCopy } from './top-g-supplements-common-steps';

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

// GI: "“Forgot password?” flow" (646bd906cc654ac75136259e)
export async function forgotPasswordFlow(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
    await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`i.ph-avatar`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
  }
  await page.locator(`a[href*="/my-account/lost-password/"]`).or(page.locator(`a[href*="/my-phlearn/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
    await expect(page.locator(`form.woocommerce-ResetPassword > p:nth-of-type(1)`).first()).toContainText(`Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.`);
  }
  try { await page.locator(`#user_login`).or(page.locator(`input[name="email"]`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`input[name="email"]`)).first().selectOption(`${vars.username ?? ''}`); }
  await page.locator(`button[type="submit"].woocommerce-Button`).or(page.locator(`button[name="recovery_password"]`)).filter({ visible: true }).first().click({ force: true });
  if (vars.project !== "vesica") {
    await expect(page.locator(`.wc-block-components-notice-banner.is-success`).or(page.locator(`div.confirmation-area > h1`)).or(page.locator(`div.woocommerce-message`)).first()).toContainText(`Password reset email has been sent.`);
  }
  if (vars.project === "vesica") {
    await expect(page.locator(`div.woocommerce > p`).first()).toContainText(`A password reset email has been sent to the email address on file for your account, but may take several minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.`);
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`a[href="#"].button`).filter({ visible: true }).first().click({ force: true });
  }
  await extractUserFromEmail(page, vars);
  if ((() => { let project = vars.project
return project == "Phlearn" || project == "icg" || vars.project === "vesica" })()) {
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).filter({ visible: true }).first().click({ force: true });
  }
  await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#password_1`).or(page.locator(`iframe.phlearn-iframe #password_1`)).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).or(page.locator(`iframe.phlearn-iframe #password_1`)).first().selectOption(`${vars.password2 ?? ''}`); }
  try { await page.locator(`#password_2`).or(page.locator(`iframe.phlearn-iframe #password_2`)).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).or(page.locator(`iframe.phlearn-iframe #password_2`)).first().selectOption(`${vars.password2 ?? ''}`); }
  await page.locator(`button[type="submit"].woocommerce-Button`).or(page.locator(`iframe.phlearn-iframe button.woocommerce-Button.button`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await expect(page.locator(`div.modal-body div.h1`).first()).toContainText(`Welcome back!`);
  }
}

// GI: "Block Image sizes" (62974e21a0299821fcec4a32)
export async function blockImageSizes(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); /* fetch all elements
const elems = Array.from<any>(document.querySelectorAll("body *"));
// loop through elements and set static dimensions
elems.forEach((elem) => {
    const style = window.getComputedStyle(elem);
    elem.style.setProperty("height", style.height, "important");
    elem.style.setProperty("max-height", style.height, "important");
    elem.style.setProperty("min-height", "0", "important");
    elem.style.setProperty("padding", style.padding, "important");
    elem.style.setProperty("margin", style.margin, "important");
})*/

// Much faster + safer version
  // 1. Collect only elements that actually have layout impact
  const elems = Array.from<any>(document.querySelectorAll(
    'body *:not(script):not(style):not(template):not([hidden])'
  ));

  // 2. Two-phase approach → avoids layout thrashing
  const snapshots = [];

  // Phase 1: read (layout safe)
  for (const el of elems) {
    const s = window.getComputedStyle(el);
    snapshots.push({
      el,
      height: s.height,
      minHeight: s.minHeight,
      maxHeight: s.maxHeight,
      // padding/margin usually should NOT be forced inline
    });
  }

  // Phase 2: write
  for (const { el, height, minHeight, maxHeight } of snapshots) {
    // Only set if it makes sense (avoid breaking flex/grid children too aggressively)
    if (height !== 'auto' && height !== '0px') {
      el.style.setProperty('height', height, 'important');
    }

    // Be more conservative with min/max
    if (maxHeight !== 'none') {
      el.style.setProperty('max-height', maxHeight, 'important');
    }
    
    // Usually better NOT to force min-height:0 → breaks many layouts
    // el.style.setProperty('min-height', '0', 'important');

    // Almost never good to force padding/margin inline
    // el.style.setProperty('padding', s.padding, 'important');
    // el.style.setProperty('margin', s.margin, 'important');
  }

  console.log(`Froze ${snapshots.length} elements`);


 }, vars);
}

// GI: "BlockUI" (6022b74a262f437a9af8d9a3)
export async function blockUI(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve) => {
  const checkExistence = setInterval(() => {
    let blockElements = [];
    let frame = document.querySelector<HTMLIFrameElement>('iframe.phlearn-iframe.checkout, iframe#wcp-checkout-iframe');

    if (frame !== null) {
      try {
        let iframeDocument = frame.contentWindow?.document || frame.contentDocument;
        blockElements = Array.from<any>(iframeDocument?.querySelectorAll('.blockUI, .wc-blocks-components-button--loading, .wc-block-components-spinner, .wc-block-components-checkout-place-order-button--loading') || []);
      } catch (error) {
        console.warn('Cross-origin iframe detected, skipping iframe check.');
      }
    } else {
      blockElements = Array.from<any>(document.querySelectorAll<HTMLButtonElement>('.blockUI, .wc-blocks-components-button--loading, .wc-block-components-spinner, .wc-block-components-checkout-place-order-button--loading'));
    }

    if (blockElements.length === 0) {
      clearInterval(checkExistence);
      console.log("✅ BlockUi unblocked!");
      resolve(true);
    } else {
      console.log("⏳ Waiting for  blockUI to unblock...");
    }
  }, 2000);
}) }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
}

// GI: "BlockUI - wpvip" (68a65cabeeab2f751a96f1df)
export async function blockUIWpvip(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve) => {
  const checkExistence = setInterval(() => {
    const form = document.querySelector<HTMLFormElement>('form.checkout, form.wc-block-components-checkout-form');

    if (form && !form.classList.contains('processing')) {
      clearInterval(checkExistence);
      console.log("✅ Checkout no longer processing!");
      resolve(true);
    } else {
      console.log("⏳ Waiting for checkout to finish processing...");
    }
  }, 1000);
}) }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
}

// GI: "Calculate Shipping" (646bb540cc654ac7512fdb73)
export async function calculateShipping(page: Page, vars: Record<string, string> = {}): Promise<void> {
}

// GI: "Calculate Subtotal" (6283a386a0299821fc2ad2c3)
export async function calculateSubtotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let currency = vars.currency

return currency === "USD" || currency === "GBP" })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const qty = vars.qty;
let subtotal = price * qty
subtotal = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(subtotal)
return subtotal }, vars);
  }
  if ((() => { let currency = vars.currency
return currency === "EUR" })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = `${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(".","");
price = parseFloat(price.replace(",",".").trim());
const qty = vars.qty;
let subtotal = price * qty
subtotal = `${vars.Symbol}` + Intl.NumberFormat('de-DE',{
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(subtotal);
return subtotal }, vars);
  }
  if ((() => { let currency = vars.currency
let project = vars.project
return (currency === "AUD" && project !== "nopong")  || 
(currency === "CAD" && ( project !== "icg" && project !== "mckeen" && project !== "nopong")) })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const qty = vars.qty;
let subtotal = price * qty
subtotal = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(subtotal)
return subtotal }, vars);
  }
  if ((() => { let currency = vars.currency
let project = vars.project
return (currency === "CAD" || currency === "AUD") && ( project == "icg" || project == "mckeen" || project == "nopong") })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const qty = vars.qty;
let subtotal = price * qty
subtotal = Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD'}).format(subtotal)
return subtotal }, vars);
  }
}

// GI: "Check Order and Subscriptions on My Account" (646e10fecc654ac751c5bb79)
export async function checkOrderAndSubscriptionsOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let project = vars.project
return project !== "talkbox" && project !== "leggari" })()) {
    await expect(page.locator(`.woocommerce-notice`).or(page.locator(`iframe#wcp-checkout-iframe .woocommerce-notice`)).first()).toContainText(`Thank you. Your order has been received.`);
  }
  if ((() => { let project = vars.project
return project === "leggari" })()) {
    await page.waitForTimeout(3500);
  }
  if ((() => { let project = vars.project
return project === "leggari" })()) {
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}, thank you for your order!`);
  }
  vars.orderNumber = ((await page.locator(`.order > strong`).or(page.locator(`.order > span`)).or(page.locator(`iframe#wcp-checkout-iframe .order > strong`)).textContent()) ?? '').trim();
  await expect(page.locator(`.email > strong`).or(page.locator(`.email > span`)).or(page.locator(`iframe#wcp-checkout-iframe .email > strong`)).first()).toContainText(`${vars.email ?? ''}`);
  if ((() => { let project = vars.project
return project !== "icg" })()) {
    await expect(page.locator(`iframe#wcp-checkout-iframe strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`span > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  try {
    if ((() => { let project = vars.project
return project === "icg" })()) {
      await expect(page.locator(`iframe#wcp-checkout-iframe strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`span > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if ((() => { let project = vars.project
return project !== "talkbox" && project !== "icg" && project !== "leggari" })()) {
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if ((() => { let project = vars.project
return project == "leggari" && vars.product === "simple" })()) {
    await expect(page.locator(`a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if ((() => { let project = vars.project
return project == "leggari" && vars.product == "variable" })()) {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prodDesc ?? ''} × ${vars.qty ?? ''}
Base:

${vars.base ?? ''}

Highlight:

${vars.highlight ?? ''}`);
  }
  if ((() => { let project = vars.project
return project == "icg" })()) {
    await expect(page.locator(`iframe#wcp-checkout-iframe td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}
1 x ${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`a[href*="/product/spanish-talkboxes/?attribute_pa_how_many_talkboxes=4-talkboxes&attribute_pa_delivery_pacing=2-month"]`).first()).toContainText(`Spanish - The Snacks & Kitchen Box
Talkbox.Mom Box Name:
The Snacks & Kitchen Box
SKU: s-4-2`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`a[href*="/product/use-spanish-at-home/"]`).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
  }
  if ((() => { let project = vars.project
return project !== "talkbox" && project !== "icg" })()) {
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`iframe#wcp-checkout-iframe td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "icg" })()) {
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`iframe#wcp-checkout-iframe td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "icg" })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe#wcp-checkout-iframe tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project != "icg" })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe#wcp-checkout-iframe tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.subscription != "yes") {
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(2) > td`)).or(page.locator(`iframe#wcp-checkout-iframe tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project !== "talkbox" })()) {
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project === "talkbox" })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  if ((() => { let project = vars.project
return vars.subscription != "yes" && (project !== "icg" && project !== "talkbox") })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project === "talkbox" })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project === "talkbox" })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project !== "talkbox" })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project === "talkbox" })()) {
    await expect(page.locator(`tr:nth-of-type(6) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.subscription != "yes" && vars.project !== "icg") {
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  try {
    if (vars.subscription != "yes" && vars.project === "icg") {
      await expect(page.locator(`iframe#wcp-checkout-iframe tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`table.woocommerce-table.woocommerce-table--order-details.shop_table.order_details.order_details_note > tfoot > tr > td`).first()).toHaveText(`Order Note for Testing this field`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project === "talkbox" })()) {
    vars.subscriptionID = ((await page.locator(`td.subscription-id > a[href*="/account/view-subscription"]`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project === "talkbox" })()) {
    await expect(page.locator(`td.subscription-status`).first()).toHaveText(`Active`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" &&  project === "talkbox" })()) {
    await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if (vars.project !== "hunchie" && vars.project !== "talkbox" 
&& vars.project !== "icg" && vars.project !== "leggari") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if (vars.project === "leggari") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if (vars.project == "icg") {
    await expect(page.locator(`iframe#wcp-checkout-iframe .woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`.woocommerce-customer-details--maincolumn > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`.col-1 .woocommerce-customer-details--phone`).first()).toHaveText(`${vars.phone ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`.woocommerce-customer-details--email`).first()).toHaveText(`${vars.email ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`.woocommerce-column > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if ((() => { let user = vars.user
return (user != "old" && vars.subscription != "yes") 
        && 
        (vars.project !== "hunchie" && vars.project !== "talkbox" &&  vars.project !== "icg" &&  vars.project !== "leggari") })()) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === "leggari") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
  }
  if ((() => { let user = vars.user
return (user != "old" && vars.subscription != "yes") && vars.project == "icg" })()) {
    await expect(page.locator(`iframe#wcp-checkout-iframe .woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if ((() => { let user = vars.user
return (user != "old" && vars.subscription != "yes") && vars.project === "hunchie" })()) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if ((() => { let user = vars.user
return user === "old" && vars.subscription !== "yes" })()) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === "hunchie") {
    await page.locator(`.beta > a[href*="/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project == "icg") {
    await page.locator(`button.ui-dialog-titlebar-close`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "icg") {
    await page.locator(`span.header-account-username`).first().hover();
  }
  if (vars.project !== "icg") {
    await page.locator(`a[href*="/my-account/"]`).or(page.locator(`a[href*="/account/"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`.u-column1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`.u-column2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { let project = vars.project
return vars.subscription != "yes" && project !== "icg" })()) {
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  }
  if ((() => { let project = vars.project
return vars.subscription != "yes" && project === "icg" })()) {
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`On hold`);
  }
  if ((() => { let project = vars.project
return vars.subscription === "yes" && project !== "talkbox" })()) {
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
  }
  try {
    if (vars.project !== "talkbox" && vars.project !== "icg") {
      await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  try {
    if (vars.project == "icg") {
      await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project == "leggari") {
    await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).or(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "leggari") {
    await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).or(page.locator(`a[href*="/account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.variable != "yes" && vars.project !== "talkbox"  && vars.project !== "icg" && vars.project !== "leggari") {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if ((() => { let project = vars.project
return project == "leggari" && vars.product = "simple" })()) {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  try {
    if (vars.variable != "yes" && vars.project === "icg") {
      await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}
1 x ${vars.unitPrice ?? ''}`);
    }
  } catch { /* optional step: assertTextPresent */ }
  if (vars.variable === "yes" && vars.project !== "talkbox") {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.variable1 ?? ''} × ${vars.qty ?? ''}
Size: 

${vars.variable1 ?? ''}`);
  }
  if ((() => { let project = vars.project
return project == "leggari" && vars.product = "variable" })()) {
    await expect(page.locator(`td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} × ${vars.qty ?? ''}
Base: 

${vars.base ?? ''}

Highlight: 

${vars.highlight ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.subscription != "yes" && vars.project !== "talkbox") {
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tfoot > tr:nth-of-type(2) > td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.subscription != "yes" && vars.project !== "talkbox" && vars.project !== "icg") {
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.subscription != "yes" && vars.project !== "talkbox" && vars.project !== "icg") {
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  try {
    if (vars.subscription != "yes" && vars.project == "icg") {
      await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.subscription === "yes" && vars.project !== "talkbox") {
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.subscription === "yes" && vars.project !== "talkbox") {
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.subscription === "yes" && vars.project !== "talkbox") {
    vars.subscriptionID = ((await page.locator(`td.subscription-id > a`).textContent()) ?? '').trim();
  }
  if (vars.subscription === "yes") {
    vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subscriptionID = `${vars.subscriptionID}`
return subscriptionID.replace("#","") }, vars);
  }
  if (vars.subscription === "yes" && vars.project === "talkbox") {
    await expect(page.locator(`td.subscription-id > a`).first()).toContainText(`${vars.subscriptionID ?? ''}`);
  }
  if (vars.subscription === "yes") {
    await expect(page.locator(`td.subscription-total > span`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if (vars.project !== "hunchie" && vars.project !== "talkbox" 
&& vars.project !== "icg" && vars.project !== "leggari") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if (vars.project === "leggari") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`.woocommerce-customer-details > address`)).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if ((() => { let user = vars.user
return (user != "old" && vars.subscription != "yes") 
        && 
        (vars.project !== "hunchie" && vars.project !== "talkbox" &&  vars.project !== "icg" &&  vars.project !== "leggari") })()) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === "leggari") {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
  }
  if ((() => { let user = vars.user
return (user != "old"  && vars.subscription != "yes") && (vars.project === "hunchie") })()) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if ((() => { let user = vars.user
return user === "old"  && vars.subscription != "yes" && (vars.project !== "talkbox" && vars.project !== "icg") })()) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if ((() => { let user = vars.user
return (user != "old"  && vars.subscription != "yes") && vars.project == "icg" })()) {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.subscription === "yes") {
    await subscriptionMenu(page, vars);
  }
}

// GI: "Check order on Backend" (646cafa833135384bb434d82)
export async function checkOrderOnBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.project === "icg") {
    await page.locator(`a[href*='/wp-admin']`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "redApple") {
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "redApple") {
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "redApple") {
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "icg" 
        && 
        vars.project !== "openStudio" 
        && 
        vars.project !== "redApple"
        &&
        vars.affirm !== "yes") {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
  }
  if (vars.affirm == "yes") {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Affirm Pay over time`);
  }
  if (vars.project === "openStudio") {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit/Debit Cards`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Interac e-transfer`);
  }
  if (returnvars.project === "redApple") {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
  }
  if (vars.project !== "icg" 
        && 
        vars.project !== "openStudio"
        && 
        vars.project !== "mckeen") {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  }
  if (vars.project === "openStudio") {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  }
  if (vars.project === "mckeen") {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Received`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`On hold`);
  }
  if (vars.project !== "hunchie" && vars.project !== "icg" && vars.project !== "openStudio" &&vars.project !== "redApple"
&& vars.project !== "mckeen" && vars.project !== "acknowledge" && vars.project !== 'leggari') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === 'leggari') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project == "acknowledge") {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.billingStreet ?? ''}
{{address-2}}
${vars.billingCity ?? ''}, ${vars.billingStateShort ?? ''} ${vars.billingPostCode ?? ''}`);
  }
  if (vars.project === "mckeen") {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === "redApple") {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.streetBilling ?? ''}
${vars.billingAddress2 ?? ''}
${vars.cityBilling ?? ''}, ${vars.stateBillingShort ?? ''} ${vars.postCodeBilling ?? ''}`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project !== "hunchie" && vars.project !== "icg" && vars.project !== "openStudio" && vars.project !== "redApple"
&& vars.project !== "mckeen" && vars.project !== "acknowledge" && vars.project !== 'leggari') {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}Customer provided note:
Order Note for Testing this field`);
  }
  if (vars.project === 'leggari') {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}Phone:
${vars.phone ?? ''}Customer provided note:
Test order notes`);
  }
  if (vars.project == "acknowledge") {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.shippingStreet ?? ''}
${vars.shippingCity ?? ''}, ${vars.shippingStateShort ?? ''} ${vars.shippingPostCode ?? ''}`);
  }
  if (vars.project === "mckeen") {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toHaveText(`${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (returnvars.project === "icg") {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

Customer provided note:
Order Note for Testing this field`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}Customer provided note:
Order Note for Testing this field`);
  }
  if (vars.project === "redApple") {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-child(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.streetShipping ?? ''}
${vars.shippingAddress2 ?? ''}
${vars.cityShipping ?? ''}, ${vars.stateShippingShort ?? ''} ${vars.postCodeShipping ?? ''}`);
  }
  await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
  if (vars.project !== "openStudio" && vars.project !== "redApple") {
    await expect(page.locator(`a[href*="tel:"]`).first()).toContainText(`${vars.phone ?? ''}`);
  }
  if ((vars.project !== "icg" &&vars.project !== "openStudio"
&& vars.project !== "leggari")) {
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.project == "openStudio") {
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`td.item_cost > .view > strong`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.project !== "leggari" 
        || 
        (
            vars.project === "leggari" 
            && 
            (
                vars.product === 'simple'
                ||
                vars.product === 'variable'
            )
        )) {
    await expect(page.locator(`td.quantity > .view`).first()).toHaveText(`× ${vars.qty ?? ''}`);
  }
  if (vars.project === "leggari"
        && 
            (
                vars.product !== 'simple'
                &&
                vars.product !== 'variable'
            )) {
    vars.subtotalPrice = `${vars.unitPrice ?? ''}`;
  }
  if (vars.project !== "icg" && vars.project !== "openStudio" &&vars.project !== "redApple" 
&& vars.project !== "acknowledge" 
&&  (
        vars.project === 'leggari'
        &&
        (
            vars.product === 'simple'
            ||
            vars.product === 'variable'
            )
    )) {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project === 'leggari'
        &&
        (
            vars.product !== 'simple'
            ||
            vars.product !== 'variable'
            )) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prices = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>('td.line_cost > .view > .woocommerce-Price-amount.amount > bdi'))

let total = Array.from<any>(prices).reduce((sum, price) => {
    let value = parseFloat(price.textContent.replace(/[^0-9.,-]/g, '').replace(',', ''));
    return sum + (isNaN(value) ? 0 : value);
}, 0);

let subtotal = `${vars.subtotalPrice}`
subtotal = parseFloat(subtotal.replace(/[^0-9.,-]/g, '').replace(',', ''))

return total === subtotal
 }, vars)).toBeTruthy();
  }
  if (vars.project === "openStudio") {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`tr.item > td.line_cost > .view > strong`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project === "redApple" && vars.project == "acknowledge") {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "openStudio") {
    vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingPrice}`
if (shippingPrice.includes("Free")){
    shippingPrice = `${vars.Symbol}`+"0.00";
};
return shippingPrice }, vars);
  }
  if (vars.project === "icg") {
    vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingPrice}`
if (shippingPrice.includes("Free")){
    shippingPrice = `${vars.Symbol}`+"0.00";
};
shippingPrice = shippingPrice.replace(`${vars.Symbol}`,"")
return shippingPrice }, vars);
  }
  if (vars.project !== "icg" && vars.project !== "openStudio" && vars.project !== "redApple" && vars.project !== "acknowledge") {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project === "redApple") {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.flatRatePrice ?? ''}`);
  }
  if (vars.project == "acknowledge") {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > strong`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "openStudio" && vars.project !== "acknowledge") {
    await expect(page.locator(`div.wc-order-data-row:not(.wc-order-refund-items) > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project == "acknowledge") {
    await expect(page.locator(`div.wc-order-data-row:not(.wc-order-refund-items) > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.project == "openStudio") {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > strong`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "openStudio" && vars.project !== "redApple") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project == "redApple") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.flatRatePrice ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > strong`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project !== "hunchie" && vars.project !== "icg" && vars.project !== "openStudio" 
&& vars.project !== "redApple") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project !== "hunchie" && vars.project !== "icg" 
&& vars.project !== "openStudio" &&vars.project !== "redApple") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project == "redApple") {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.cartTotal ?? ''}`);
  }
  if (vars.project == "openStudio") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
  try {
    if (vars.project == "icg") {
      await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > strong`).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project !== "icg" && vars.project !== "openStudio" && vars.project !== "redApple"
&& vars.project !== "mckeen") {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project === "openStudio") {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
}

// GI: "Check order on Email" (646caecbcc654ac75164d6ee)
export async function checkOrderOnEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractUserFromEmail(page, vars);
  if (vars.project !== "vesica") {
    await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "vesica" && vars.new === "yes") {
    await page.locator(`xpath=//a[contains(text(), "order is now complete")]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).or(page.locator(`xpath=//a[contains(text(), "order is now complete")]`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "icg" && vars.project !== "leggari") {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if ((vars.product == "variable" && {project} == "leggari")) {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toHaveText(`${vars.prod_desc ?? ''}
Base: ${vars.base ?? ''}
Highlight: ${vars.highlight ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(2)`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari") {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(2)`).first()).toContainText(`${vars.qty ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`#order_items > tbody > tr > td:nth-child(2)`).first()).toContainText(`${vars.qty ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.qty ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari" && vars.project !== "Avison" && vars.project != "Supplements") {
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project === "Supplements") {
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.project == "Avison") {
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  try {
    if (vars.project == "leggari") {
      await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project === "icg") {
    await expect(page.locator(`td.td:nth-of-type(4) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project !== "leggari") {
    await expect(page.locator(`table:nth-of-type(2) tbody > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  }
  try {
    if (vars.project == "leggari") {
      await expect(page.locator(`tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    }
  } catch { /* optional step: assertTextPresent */ }
  try {
    if (vars.project == "leggari") {
      await expect(page.locator(`tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project !== "leggari" && vars.project !== "vesica") {
    await expect(page.locator(`tr:nth-of-type(2) > td.td`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`tr:nth-of-type(2) > td.td > span`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`#footer_sub_totals > span:nth-child(3)`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari"
&& vars.project !== "vesica") {
    await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`tr:nth-of-type(3) > td.td > span`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project == "vesica" && vars.new === "yes") {
    await expect(page.locator(`tr:nth-of-type(2) > td.td`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`#footer_sub_totals > span:nth-child(5)`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`#footer_sub_totals > span:nth-child(7)`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari" && vars.project !== "vesica") {
    await expect(page.locator(`tr:nth-of-type(4) > td.td`).first()).toContainText(`Credit Card`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`tr:nth-of-type(4) > td.td`).first()).toContainText(`PayPal`);
  }
  if (vars.project == "leggari" && vars.affirm !== "yes") {
    await expect(page.locator(`#footer_payment_method`).first()).toContainText(`Credit Card`);
  }
  if (vars.project == "leggari" && vars.affirm === "yes") {
    await expect(page.locator(`#footer_payment_method`).first()).toContainText(`Affirm Pay over time`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari" && vars.project !== "vesica") {
    await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "yes") {
    await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`Interac e-transfer`);
  }
  try {
    if (vars.project === "icg") {
      await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project !== "hunchie" && vars.project !== "icg" && vars.project !== "leggari"
&& vars.project !== "vesica" && vars.project !== "purCrystal" && vars.project !== "mckeen" && vars.project !== "Supplements") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project == "Supplements") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.billingStreet ?? ''}
${vars.billingCity ?? ''}, ${vars.billingStateShort ?? ''} ${vars.billingZip ?? ''}
${vars.phoneraw ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project == "mckeen") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project == "purCrystal") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project === "vesica") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  }
  if (vars.project === "purCrystal") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project !== "hunchie" && vars.project !== "icg" && vars.project !== "leggari"
&& vars.project !== "vesica" && vars.project !== "purCrystal" && vars.project !== "mckeen" && vars.project !== "Supplements") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project == "Supplement") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.shippingStreet ?? ''}
${vars.shippingCity ?? ''}, ${vars.shippingStateShort ?? ''} ${vars.shippingZip ?? ''}`);
  }
  if (vars.project == "mckeen") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
}

// GI: "Check order on Email (Copy)" (6759e808e11b42a63dbc3369)
export async function checkOrderOnEmailCopy(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractUserFromEmail(page, vars);
  try {
    if (vars.project !== "vesica") {
      await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  if (vars.project === "vesica" && vars.new === "yes") {
    await page.locator(`xpath=//a[contains(text(), "order is now complete")]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "icg" && vars.project !== "leggari") {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if ((vars.product == "variable" && {project} == "leggari")) {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toHaveText(`${vars.prod_desc ?? ''}
Base: ${vars.base ?? ''}
Highlight: ${vars.highlight ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(2)`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari") {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(2)`).first()).toContainText(`${vars.qty ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`#order_items > tbody > tr > td:nth-child(2)`).first()).toContainText(`${vars.qty ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.qty ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari" && vars.project !== "Avison") {
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project == "Aviso") {
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  try {
    if (vars.project == "leggari") {
      await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project === "icg") {
    await expect(page.locator(`td.td:nth-of-type(4) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project !== "leggari") {
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  try {
    if (vars.project == "leggari") {
      await expect(page.locator(`tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  try {
    if (vars.project == "leggari") {
      await expect(page.locator(`tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project !== "leggari" && vars.project !== "vesica") {
    await expect(page.locator(`tr:nth-of-type(2) > td.td`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`tr:nth-of-type(2) > td.td > span`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`#footer_sub_totals > span:nth-child(3)`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari"
&& vars.project !== "vesica") {
    await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`tr:nth-of-type(3) > td.td > span`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project == "vesica" && vars.new === "yes") {
    await expect(page.locator(`tr:nth-of-type(2) > td.td`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`#footer_sub_totals > span:nth-child(5)`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari" && vars.project !== "vesica") {
    await expect(page.locator(`tr:nth-of-type(4) > td.td`).first()).toContainText(`Credit Card`);
  }
  if (vars.project === "vesica" && vars.new === "yes") {
    await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`Credit Card`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`tr:nth-of-type(4) > td.td`).first()).toContainText(`PayPal`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`#footer_payment_method`).first()).toContainText(`Credit Card`);
  }
  if (vars.project !== "icg" && vars.project !== "leggari" && vars.project !== "vesica") {
    await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "yes") {
    await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`Interac e-transfer`);
  }
  try {
    if (vars.project === "icg") {
      await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project !== "hunchie" && vars.project !== "icg" && vars.project !== "leggari"
&& vars.project !== "vesica" && vars.project !== "purCrystal" && vars.project !== "mckeen") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project == "mckeen") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project == "purCrystal") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project === "vesica") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project === "vesica" && vars.new === "no") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.shortState ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === "purCrystal") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  try {
    if (vars.project == "leggari") {
      await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  if (vars.project === "hunchie") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project !== "hunchie" && vars.project !== "icg" && vars.project !== "leggari"
&& vars.project !== "vesica" && vars.project !== "purCrystal" && vars.project !== "mckeen") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project == "mckeen") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project == "leggari") {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.project === "icg") {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
}

// GI: "Check the total" (6283bd24a0299821fc353a72)
export async function checkTheTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotalPrice}`;
let shipping = `${vars.shippingPrice}`;
let tax = `${vars.taxPrice}`;
let total = `${vars.total}`;

if (shipping.includes("Lettermail (untracked)") || shipping === ''){
    shipping = "0.00";
};

unit = unit.replace(",","");
shipping = shipping.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
if (!vars.includeTax) {
    tax = Number(tax.replace(`${vars.Symbol}`,""));
} else {
    tax = 0
}
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit+shipping+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
}

// GI: "currency to number" (6447d1953a008cd31cc3361e)
export async function currencyToNumber(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.price = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var currency = `${vars.unitPrice}`;
return currency.replace(/[vars.Symbol,]+/g,""); }, vars);
}

// GI: "Extract pass from email" (63a447baa67dec3a1218d7df)
export async function extractPassFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+\w+[^@]/g;
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Extract price from element" (606b66a652a2f06aae995f0f)
export async function extractPriceFromElement(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /(\$[0-9,]+(\.[0-9]{2})?)/g;
const str = `${vars.price}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
}

// GI: "Extract reset link from email" (654155494ee1df25e0ddb2a4)
export async function extractResetLinkFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const email = `${vars.username}`;
let extracted = email.slice(0,29);
return extracted; }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}/latest`);
  await page.waitForLoadState('load');
  vars.resetLink = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = document.querySelector<HTMLAnchorElement>('p > a').getAttribute('href');
return url; }, vars);
  await page.goto(`${vars.resetLink ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Extract user from email" (603d1f20494ea848981cef9b)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(30000);
  if ((() => { let project = vars.project
return project != "redApple" && project != "acknowledge" && project != "Supplements" })()) {
    vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /^(qa\+)?(\w+)[^@]+/g
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  }
  if ((() => { let project = vars.project;
return project === "redApple" || project === "acknowledge"; })()) {
    vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+\w+\+\w+[^@]/g
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  }
  if ((() => { let project = vars.project;
return project === "Avison" })()) {
    await extractUsername(page, vars);
  }
  if ((() => { let project = vars.project;
return project === "Supplements"; })()) {
    await extractUsernameCopy(page, vars);
  }
  if ((() => { let project = vars.project
let vendor = vars.vendor
return project != "talkbox" && project != "scout" && project != "Deans" 
&& vendor != "yes" && project != "mckeen"
&& project != "topg-merch" && project != "botany" 
&& project != "mood" && project != "harmony"
&& project != "vesica" && project != "template" 
&& project != "hunchie" && project != "purCrystal" && project != "acknowledge"
&& project != "cashForeClub" && project != 'flyingTech' && project != 'leggari'
&& project != 'pls' && project != 'nopong' && project != 'elka' 
&& project != 'icg' && project != 'melon' && project != 'Phlearn' })()) {
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}/latest`);
    await page.waitForLoadState('load');
  }
  if ((() => { let project = vars.project
let vendor = vars.vendor
return project === "talkbox" || project === "scout" 
|| project === "Deans" || (project === "mavenfair" && vendor === "yes") 
|| project === "topg-merch" || project === "botany" || project === "mood"
|| project === "harmony" || project === "template" || project === "hunchie"
|| project === "vesica" || project === "purCrystal" || project === "mckeen" || project === "acknowledge"
|| project === "cashForeClub" || project === 'flyingTech' || project === 'leggari'
|| project === 'pls' || project === 'nopong' || project === 'elka' 
|| project === 'icg' || project === 'melon' || project === 'Phlearn' })()) {
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
  }
}

// GI: "Fill stripe form" (67b86c262abcf638e9659a21)
export async function fillStripeForm(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-numberInput`)).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`)).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-numberInput`)).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`)).first().selectOption(`4242 4242 4242 4242`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-expiryInput`)).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`)).first().fill(`01 / 30`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-expiryInput`)).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-expiryInput`)).first().selectOption(`01 / 30`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-cvcInput`)).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`)).first().fill(`111`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#Field-cvcInput`)).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-cvcInput`)).first().selectOption(`111`); }
}

// GI: "Get Woo order details" (62d56edb760cc3cd6bc79927)
export async function getWooOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const order = vars.orderNumber;
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.url}/wp-json/wc/v3/orders/`+order;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers,
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.transaction_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.transaction_id }, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return Number(jsonOrder.total) }, vars);
  vars.paymentMethodTitle = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.payment_method_title }, vars);
  vars.payDateRenew = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.date_modified }, vars);
  vars.shippingTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_total }, vars);
  vars.shippingTaxTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_tax }, vars);
}

// GI: "Login" (63cfc556af1e488d25d11a75)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    vars.emailUser = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+?\w+[^@]/g;
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  } catch { /* optional step: extractEval */ }
  if ((() => { let url = page.url()
let admin = vars.admin
let project = vars.project
let boolean
if (url.includes("/my-account/") || project === "harmony" || project === "2m" || project === "Phlearn") {
    boolean = false
} else {
    boolean = true
}
return boolean === 'true' && admin != "yes" })()) {
    await page.locator(`button.header-account-button > span.header-account-label`).or(page.locator(`a[href*="/account/"]`)).or(page.locator(`#menu-item-9247 > a`)).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
  }
  try {
    await page.locator(`.woocommerce-MyAccount-navigation-link--customer-logout a`).or(page.locator(`.elementor-widget-pp-woo-my-account > div > div > div > div > div > p:nth-child(2) > a`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  if ((() => { let project = vars.project
let admin = vars.admin
return project === "Phlearn" && admin != "yes" })()) {
    await page.locator(`i.ph-avatar`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
let admin = vars.admin
return project === "Phlearn" && admin != "yes" })()) {
    await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let admin = vars.admin
return admin === "yes" && vars.project != 'flyingTech' })()) {
    await page.goto(`${vars.site ?? ''}wp-admin`);
    await page.waitForLoadState('load');
  }
  if ((() => { let admin = vars.admin
return  admin === "yes" 
        && 
        (
            vars.project === 'leggari'
            ||
            vars.project === 'pls'
            ||
            vars.project === 'nopong'
            ||
            vars.project === 'Phlearn'
            ||
            vars.project === 'harmony'
            ) })()) {
    await page.goto(`${vars.startUrl ?? ''}wp-admin`);
    await page.waitForLoadState('load');
  }
  if ((() => { let admin = vars.admin
return admin === "yes" &&vars.project === 'flyingTech' })()) {
    await page.goto(`${vars.startUrl ?? ''}lazybird`);
    await page.waitForLoadState('load');
  }
  if ((() => { let admin = vars.admin
return admin === "yes" })()) {
    try { await page.locator(`#user_login`).or(page.locator(`#username`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`#username`)).first().selectOption(`${vars.username ?? ''}`); }
  }
  if ((() => { let admin = vars.admin
return admin === "yes" })()) {
    try { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().selectOption(`${vars.pass ?? ''}`); }
  }
  if ((() => { let admin = vars.admin
return admin === "yes" })()) {
    {
      const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wp-submit`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true }); }
    }
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
  if ((() => { let admin = vars.admin
return admin === "yes" && vars.project === "openStudio" })()) {
    await page.locator(`li#wp-admin-bar-site-name > a`).filter({ visible: true }).first().click({ force: true });
  }
  try {
    if ((() => { let admin = vars.admin
return admin === "yes" && vars.project !== "icg" })()) {
      await expect(page.locator(`#adminmenumain`)).not.toHaveCount(0);
    }
  } catch { /* optional step: assertElementPresent */ }
  if ((() => { let project = vars.project;
let isAdmin = vars.admin;
return project === "topg-merch" && isAdmin != "yes"; })()) {
    vars.myAccountUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href
return url+"my-account/" }, vars);
  }
  if ((() => { let project = vars.project;
let isAdmin = vars.admin;
return project === "topg-merch" && isAdmin != "yes"; })()) {
    await page.goto(`${vars.myAccountUrl ?? ''}`);
    await page.waitForLoadState('load');
  }
  if ((() => { let admin = vars.admin
return admin != "yes" })()) {
    try { await page.locator(`#username`).or(page.locator(`input[name="username"]`)).or(page.locator(`div.lwa-username > input`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).or(page.locator(`input[name="username"]`)).or(page.locator(`div.lwa-username > input`)).first().selectOption(`${vars.username ?? ''}`); }
  }
  if ((() => { let admin = vars.admin
return admin != "yes" })()) {
    try { await page.locator(`#password`).or(page.locator(`input[name="password"]`)).or(page.locator(`div.lwa-password > input`)).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).or(page.locator(`input[name="password"]`)).or(page.locator(`div.lwa-password > input`)).first().selectOption(`${vars.pass ?? ''}`); }
  }
  if ((() => { let admin = vars.admin
return admin != "yes" })()) {
    await page.locator(`button[name="login"]`).or(page.locator(`input.button-primary[value="Log In"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let admin = vars.admin
let project = vars.project
return admin != "yes" && project === "leggari" })()) {
    await page.waitForTimeout(3500);
  }
  if ((() => { let admin = vars.admin
let project = vars.project
return admin != "yes" && project === "leggari" })()) {
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); window.open(`https://email.ghostinspector.com/${vars.emailUser}/latest`);
//let loginLink = document.querySelector<HTMLAnchorElement>("#content > a");
//loginLink = loginLink.href;
//return loginLink; }, vars);
  }
  try {
    if ((() => { let admin = vars.admin
let project = vars.project
return admin != "yes" && project === "leggari" })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let loginLink = document.querySelector<HTMLAnchorElement>("#body_content_inner > p:nth-child(5) > a");
loginLink = loginLink.href;
return loginLink; }, vars);
    }
  } catch { /* optional step: eval */ }
  if ((() => { let admin = vars.admin
let project = vars.project
return admin != "yes" && project === "leggari" })()) {
    await page.goto(`${vars.loginLink ?? ''}`);
    await page.waitForLoadState('load');
  }
  if ((() => { let admin = vars.admin
let project = vars.project
return admin != "yes" && project === "leggari" })()) {
    await expect(page.locator(`div.woocommerce-MyAccount-content`).or(page.locator(`form#order_review`))).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
let admin = vars.admin
return admin != "yes" && project === "talkbox" })()) {
    await expect(page.locator(`div.woocommerce-MyAccount-content`).or(page.locator(`#learndash-content > div.talkbox-archive-content__wrap`))).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
let admin = vars.admin
return admin != "yes" && project === "Phlearn" })()) {
    await page.locator(`img.lazy.avatar.avatar-45`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
let admin = vars.admin
return admin != "yes" && project === "Phlearn" })()) {
    await page.locator(`.avatar-menu-item > ul > .menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href*="/my-phlearn/favorites/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
let admin = vars.admin
return admin != "yes" && project === "Phlearn" })()) {
    await expect(page.locator(`.dashboard-header`)).not.toHaveCount(0);
  }
}

// GI: "logout" (646bd9eacc654ac751364c16)
export async function logout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.project !== "Phlearn") {
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "Phlearn" && vars.project !== "icg") {
    await expect(page.locator(`header > h1`).first()).toContainText(`My account`);
  }
  if (vars.project == "icg") {
    await expect(page.locator(`section > h2`).first()).toHaveText(`Login`);
  }
  if (vars.project === "Phlearn") {
    await page.locator(`img.lazy.avatar.avatar-45`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "Phlearn") {
    await page.locator(`.avatar-menu-item > ul > .menu-item.menu-item-type-custom.menu-item-object-custom > a[href*="/my-phlearn/customer-logout/?customer-logout=true"]`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "My Account links" (6446bcfbe36f7ecf09a5871a)
export async function myAccountLinks(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No order has been made yet.`);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`.container > p`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`.item.item-back > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/store-credit/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`.woocommerce-Message`).first()).toContainText(`No store credit coupons found.`);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/backinstock/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href="/refer-a-friend/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`#personalized-code`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`.loginBtn > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/wc-smart-coupons/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`.woocommerce-MyAccount-content > h2`).first()).toContainText(`Available Coupons & Store Credits`);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`.u-column1`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/my-points/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`.ywpar-wrapper`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "My Account links and logout" (646bd7d7cc654ac75135f424)
export async function myAccountLinksAndLogout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.project === "Phlearn") {
    await expect(page.locator(`div.woocommerce > div.woocommerce-MyAccount-content`)).not.toHaveCount(0);
  }
  if (vars.project === "Phlearn") {
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-phlearn/continue-watching"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "Phlearn") {
    await expect(page.locator(`div.woocommerce > div.woocommerce-MyAccount-content`)).not.toHaveCount(0);
  }
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-phlearn/orders/"]`)).filter({ visible: true }).first().click({ force: true });
  if (vars.project === "hunchie") {
    await expect(page.locator(`.woocommerce-MyAccount-content > table.woocommerce-orders-table.woocommerce-MyAccount-orders.shop_table.shop_table_responsive.my_account_orders.account-orders-table`)).not.toHaveCount(0);
  }
  if (vars.project === "Phlearn") {
    await expect(page.locator(`.tutorial-list-error`).first()).toHaveText(`You haven't made any purchases yet.`);
  }
  if (vars.project !== "hunchie" && vars.project !== "Phlearn") {
    await expect(page.locator(`.woocommerce-MyAccount-content > .wc-block-components-notice-banner.is-info`).or(page.locator(`div.woocommerce-info`)).first()).toContainText(`No order has been made yet.`);
  }
  if (vars.project === "Phlearn") {
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-phlearn/referrals/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "Phlearn") {
    await expect(page.locator(`.hp-head > p`).first()).toHaveText(`Share the joy of learning, and earn a month of PHLEARN PRO.
No Subscription required, no limit on free months.`);
  }
  if (vars.project !== "Phlearn") {
    await page.locator(`a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "Phlearn") {
    await expect(page.locator(`.u-column1 > header.woocommerce-Address-title.title > h3`).or(page.locator(`.u-column1 > header.woocommerce-Address-title.title > h2`)).first()).toContainText(`Billing address`);
  }
  if (vars.project !== "Phlearn") {
    await expect(page.locator(`.u-column2 > header.woocommerce-Address-title.title > h3`).or(page.locator(`.u-column2 > header.woocommerce-Address-title.title > h2`)).first()).toContainText(`Shipping address`);
  }
  if (vars.project === "Phlearn") {
    await page.locator(`a[href*="/my-phlearn/phlearn-change-password/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "Phlearn") {
    await expect(page.locator(`legend`).first()).toHaveText(`Password change`);
  }
  if (vars.project !== "icg") {
    await page.locator(`a[href*="/my-account/payment-methods/"]`).or(page.locator(`a[href*="/my-phlearn/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { return vars.project !== "Phlearn" && return vars.project !== "icg" })()) {
    await expect(page.locator(`.woocommerce-MyAccount-content > table.woocommerce-MyAccount-paymentMethods.shop_table.shop_table_responsive.account-payment-methods-table`)).not.toHaveCount(0);
  }
  if ((() => { return vars.project !== "hunchie" && return vars.project !== "icg" })()) {
    await expect(page.locator(`.woocommerce-MyAccount-content > .wc-block-components-notice-banner.is-info`).first()).toHaveText(`No saved methods found.`);
  }
  if (vars.project === "hunchie") {
    await expect(page.locator(`td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toHaveText(`Visa ending in 4242`);
  }
  if (vars.project !== "Phlearn") {
    await page.locator(`a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "Phlearn") {
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
  }
  if (vars.project === "Phlearn") {
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-phlearn/account"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project === "Phlearn") {
    await expect(page.locator(`#profile`)).not.toHaveCount(0);
  }
  if (vars.project !== "hunchie") {
    await logout(page, vars);
  }
}

// GI: "Page full loaded" (6022b6b2d2fb38677e5d8a9a)
export async function pageFullLoaded(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
    (document.readyState) || reject("Can't resolve document readystate");
    let listener;
    (/^c/).test(document.readyState) ? resolve(true) : document.addEventListener("load", listener = event => {
      document.removeEventListener("load", listener);
      resolve(true);
    });
}) }, vars)).toBeTruthy();
}

// GI: "PayPal template" (62baece35a1bf494e9fc6b76)
export async function payPalTemplate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let project = vars.project
let vendor = vars.vendor
return (project === "mavenfair" && vendor != "yes") || project != "mavenfair" })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[title*="PayPal"]`).first().contentFrame().locator(`.paypal-button.paypal-button-number-0`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  try {
    if ((() => { let project = vars.project
let vendor = vars.vendor
return (project === "mavenfair" && vendor != "yes") || project != "mavenfair" })()) {
      await expect(page.locator(`.loader`)).not.toHaveCount(0);
    }
  } catch { /* optional step: assertElementPresent */ }
  try {
    if ((() => { let project = vars.project
let vendor = vars.vendor
return (project === "mavenfair" && vendor != "yes") || project != "mavenfair" })()) {
      await expect(page.locator(`.loader`)).toHaveCount(0);
    }
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    if ((() => { let project = vars.project
let vendor = vars.vendor
return (project === "mavenfair" && vendor != "yes") || project != "mavenfair" })()) {
      await page.locator(`xpath=//a[contains(text(), "Click to Continue")]`).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  try {
    if ((() => { let project = vars.project
let vendor = vars.vendor
return (project === "mavenfair" && vendor != "yes") || project != "mavenfair" })()) {
      {
        const _lbl = page.locator(`label[for="backToInputEmailLink"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#backToInputEmailLink`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
  } catch { /* optional step: click */ }
  if ((() => { let project = vars.project
let vendor = vars.vendor
return project === "mavenfair" && vendor === "yes" })()) {
    await page.locator(`xpath=//a[contains(text(), "Iniciar sesión")]`).or(page.locator(`button.css-ltr-1d5lazx-button-Button`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#email`).or(page.locator(`#login_email`)).or(page.locator(`*[id*='email'][type='email']`)).first().fill(`${vars.payPalUser ?? ''}`); } catch { await page.locator(`#email`).or(page.locator(`#login_email`)).or(page.locator(`*[id*='email'][type='email']`)).first().selectOption(`${vars.payPalUser ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="btnNext"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#btnNext`).or(page.locator(`xpath=//button[contains(text(),'Next')]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`div > span.sr-only`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`div > span.sr-only`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await page.locator(`xpath=//button[contains(text(),'Use Password Instead')]`).or(page.locator(`xpath=//a[contains(text(),'Log in with a password instead')]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try { await page.locator(`div > input#password[name='login_password']`).or(page.locator(`div > div > input#password`)).first().fill(`${vars.payPalPass ?? ''}`); } catch { await page.locator(`div > input#password[name='login_password']`).or(page.locator(`div > div > input#password`)).first().selectOption(`${vars.payPalPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="btnLogin"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(),'Log In')]`).or(page.locator(`#btnLogin`)).or(page.locator(`button[type='submit']`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    await expect(page.locator(`xpath=//span[contains(text(),'Logging in...')]`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`xpath=//span[contains(text(),'Logging in...')]`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForTimeout(5000);
  if ((() => { let project = vars.project
let vendor = vars.vendor
return (project === "mavenfair" && vendor != "yes") || project != "mavenfair" })()) {
    await expect(page.locator(`button[data-id='payment-submit-btn']`).or(page.locator(`xpath=//*[@id="one-time-cta"]/div/div/div[contains(text(),'Pay')]`)).or(page.locator(`button[type='submit'] > div > div > div:nth-of-type(1)`))).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
let vendor = vars.vendor
return (project === "mavenfair" && vendor != "yes") || project != "mavenfair" })()) {
    await page.locator(`button[data-id='payment-submit-btn']`).or(page.locator(`xpath=//*[@id="one-time-cta"]/div/div/div[contains(text(),'Pay')]`)).or(page.locator(`button[type='submit'] > div > div > div:nth-of-type(1)`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
let vendor = vars.vendor
return project === "mavenfair" && vendor === "yes" })()) {
    {
      const _lbl = page.locator(`label[for="payment-submit-btn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`button.btn.full.confirmButton.continueButton`).or(page.locator(`#payment-submit-btn`)).or(page.locator(`button[data-id='payment-submit-btn']`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try {
    await expect(page.locator(`.loader`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`)).or(page.locator(`xpath=//h1[contains(text(),'Completing purchase')]`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`xpath=//h1[contains(text(),'Completing purchase')]`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`))).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    if ((() => { let project = vars.project
let vendor = vars.vendor
return project === "mavenfair" && vendor === "yes" })()) {
      {
        const _lbl = page.locator(`label[for="confirmButtonTop"]`).or(page.locator(`label[for="payment-submit-btn"]`)).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#confirmButtonTop`).or(page.locator(`#payment-submit-btn`)).or(page.locator(`button[data-id='payment-submit-btn']`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
  } catch { /* optional step: click */ }
  await page.waitForTimeout(20000);
  await page.waitForLoadState('load');
  await blockUI(page, vars);
}

// GI: "Place Order Element" (62753765c5f501e7105625b8)
export async function placeOrderElement(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve) => {
    let frame = document.querySelector(`iframe[src="${vars.startUrl}checkout/?iframe_checkout=1"], iframe#wcp-checkout-iframe`);
    let targetElement
    
    if (frame !== null) {
      try {
        let iframeDocument = frame.contentWindow?.document || frame.contentDocument;
        targetElement = iframeDocument?.querySelector('#place_order') || null;
      } catch (error) {
        console.warn('Cross-origin iframe detected, skipping iframe check.');
      }
    } else {
      targetElement = document.querySelector('#place_order');
    }
    
    if (!targetElement.disabled) {
      // If the attribute is already false, resolve the promise immediately
      resolve(true);
      return;
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'disabled' &&
          !targetElement.disabled
        ) {
          observer.disconnect();
          resolve(true);
          break;
        }
      }
    });

    observer.observe(targetElement, { attributes: true });
  }) }, vars)).toBeTruthy();
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`#place_order`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#place_order`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe#wcp-checkout-iframe #place_order`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
}

// GI: "Register" (63d7d8a71b9923d1cbccd1b3)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let url = page.url()
let boolean
if (url.includes("/my-account/")) {
    boolean = false
} else {
    boolean = true
}
return boolean && vars.project !== "Phlearn" })()) {
    await page.locator(`a[href*="/my-account/"]`).or(page.locator(`#menu-item-9247 > a`)).or(page.locator(`span.header-account-label`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`i.ph-avatar`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`a[href="#signup"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "icg" })()) {
    await page.locator(`a[href*="?register"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.location.href === 'https://staging-deansgraphics.kinsta.cloud/hello/my-account/?fromsite=3&loop=1' }, vars)).toBeTruthy();
  }
  try {
    if ((() => { let project = vars.project
let country = vars.country
return (project === "nopong" ) || project === "Deans" })()) {
      try { await page.locator(`#reg_first_name`).or(page.locator(`input#first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#reg_first_name`).or(page.locator(`input#first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
    }
  } catch { /* optional step: assign */ }
  try {
    if ((() => { let project = vars.project
let country = vars.country
return (project === "nopong" ) || project === "Deans" })()) {
      try { await page.locator(`#reg_last_name`).or(page.locator(`input#last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#reg_last_name`).or(page.locator(`input#last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
    }
  } catch { /* optional step: assign */ }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    try { await page.locator(`input#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`input#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    try { await page.locator(`input#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`input#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "nopong" || project === "mood" || project === "template"
|| project === "Deans" || project === "Phlearn" || project === "icg" })()) {
    try { await page.locator(`#reg_email`).or(page.locator(`input[name="username"]`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).or(page.locator(`input[name="username"]`)).first().selectOption(`${vars.username ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "nopong" || project === "mood" || project === "template"
|| project === "Deans" || project === "Phlearn" || project === "icg" })()) {
    try { await page.locator(`#reg_password`).or(page.locator(`input[name="password"]`)).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#reg_password`).or(page.locator(`input[name="password"]`)).first().selectOption(`${vars.pass ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "nopong" || project === "mood" || project === "template"
|| project === "Deans" || project === "Phlearn" || project === "icg" })()) {
    await page.locator(`button[name="register"]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project !== "Deans" &&  project !== "Phlearn" })()) {
    await expect(page.locator(`div.woocommerce-MyAccount-content`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`img.lazy.avatar.avatar-45`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`.avatar-menu-item > ul > .menu-item.menu-item-type-custom.menu-item-object-custom:nth-of-type(1) > a[href*="/my-phlearn/favorites/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await expect(page.locator(`div.woocommerce > div.dashboard-header`)).not.toHaveCount(0);
  }
}

// GI: "Renew by Admin" (62d56fa0760cc3cd6bc7c8ee)
export async function renewByAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subsID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  // TODO: command="dragAndDrop" target="select[name=\"wc_order_action\"]" value="#wp-admin-bar-wp-logo > a[href*=\"/wp-admin/about.php\"].ab-item"
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#message > p`).first()).toContainText(`Subscription updated.`);
  vars.renewID = ((await page.locator(`#subscription_renewal_orders > div.inside > div > table > tbody > tr:first-of-type > td:nth-child(1) > a`).or(page.locator(`#woocommerce-order-notes > div.inside > ul > li:nth-child(3) > div > p > a`)).textContent()) ?? '').trim();
  vars.renewID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let renew = `${vars.renewID}`;
renew = renew.replace("#","");
return renew
 }, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  vars.orderNumber = `${vars.renewID ?? ''}`;
}

// GI: "Reset email - WP Engine sites" (60eee4b869b49f0d67b226cb)
export async function resetEmailWPEngineSites(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.urlNew = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href
url = url+"&ghostinspector=true"

return url }, vars);
  await page.goto(`${vars.urlNew ?? ''}`);
  await page.waitForLoadState('load');
  vars.resetPassUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let emailObject = document.getElementById("ghostinspector");
let resetUrl = emailObject.getAttribute("href");

return resetUrl }, vars);
  await page.goto(`${vars.resetPassUrl ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Scroll Full page" (6022b62a262f437a9af8d3f1)
export async function scrollFullPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var body = document.documentElement || document.body;
body.scrollTop = 0;
window.scroller = setInterval(function(){
  body.scrollTop += 500;
}, 500); }, vars);
  await page.waitForTimeout(10000);
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); clearInterval(window.scroller);
var body = document.documentElement || document.body;
body.scrollTop = 0; }, vars);
}

// GI: "Shipping on Cart" (646bb679e71b46cb75356ad2)
export async function shippingOnCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "Calculate shipping")]`).filter({ visible: true }).first().click({ force: true });
  // skipped: select-open click on '#calc_shipping_country' (Select2 pattern)
  await page.locator(`#calc_shipping_country`).first().selectOption(`${vars.country ?? ''}`);
  // skipped: select-open click on '#calc_shipping_state' (Select2 pattern)
  await page.locator(`#calc_shipping_state`).first().selectOption(`${vars.state ?? ''}`);
  try { await page.locator(`#calc_shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#calc_shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#calc_shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#calc_shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  await page.locator(`button[name="calc_shipping"]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Subscription Menu" (646e184c33135384bba2be3d)
export async function subscriptionMenu(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).or(page.locator(`a[href*="/account/view-subscription/${vars.subscriptionID ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  if (vars.project !== "talkbox") {
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Subscription #${vars.subscriptionID ?? ''}`);
  }
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
  if (vars.project !== "talkbox") {
    await expect(page.locator(`.subscription-payment-method`).first()).toContainText(`Via visa card ending in 4242`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.project === "talkbox") {
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if (vars.project === "talkbox") {
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subPrice ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  if (vars.project === "talkbox") {
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if (vars.project === "talkbox") {
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`tr:nth-of-type(1) > td.order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
}

// GI: "Subscription Menu - Harmony" (62cd5fb0fc2b9d5cf152f2fc)
export async function subscriptionMenuHarmony(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await page.locator(`a[href*="/my-account/subsriptions/"]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--subscriptions > a`)).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).first()).toContainText(`#${vars.subscriptionID ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(1) > td.subscription-status.order-status.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-status.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Active`);
  }
  await page.locator(`a[href*="/view-subscription/${vars.subscriptionID ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Subscription #${vars.subscriptionID ?? ''}`);
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
  await expect(page.locator(`tr:nth-of-type(4) > td:nth-of-type(2)`).first()).toContainText(`${vars.nextPay ?? ''}`);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
return element.length }, vars);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if ((() => { let length = vars.n
return length === 3 })()) {
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxRenew ?? ''}`);
  }
  if ((() => { let length = vars.n
return length === 3 })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  }
  if ((() => { let length = vars.n
return length === 2 })()) {
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  }
  await expect(page.locator(`tbody > tr > td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`td.order-number > a[href*="/view-order/${vars.orderNumber ?? ''}/"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
  if ((() => { let country = vars.country
return country === "CA" })()) {
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if ((() => { let country = vars.country
return country === "US" })()) {
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
}

// GI: "URL of current page" (6290d1fa4b7dbf9dc951f456)
export async function uRLOfCurrentPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.site = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href
return url }, vars);
}

// GI: "WooCommerce Checkout template" (6275149f7cba5684cb53e55c)
export async function wooCommerceCheckoutTemplate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { // 2023-11-26 from Ghost Inspector Customer Support
let project = vars.project
return project === "mood"; })()) {
    {
      const _lbl = page.locator(`label[for="shipping_dif_from_billing_radio"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#shipping_dif_from_billing_radio`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "harmony" 
|| project === "Phlearn" || project === "hunchie" 
|| project === "inspire" || project === "kybb" 
|| (project === "leggari" && step === "2") || project === "lens" 
|| project === "mckeen" || project === "mavenfair" 
|| project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout"
|| project === "topg-merch" || project === "mood"
|| project === "template" || project === "icg" })()) {
    try { await page.locator(`#billing_first_name`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_first_name`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_first_name`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#billing_first_name`).first()).toHaveText(`${vars.firstName ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.firstName = ((await page.locator(`#billing_first_name`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "inspire" 
|| project === "kybb" || (project === "leggari" && step === "2")
|| project === "lens" || project === "mckeen" 
|| project === "mavenfair" || project ==="weedpleez"
|| project === "nopong"|| project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || project === "template"
 || project === "icg" })()) {
    try { await page.locator(`#billing_last_name`).or(page.locator(`iframe#wcp-checkout-iframe #billing_last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).or(page.locator(`iframe#wcp-checkout-iframe #billing_last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#billing_last_name`).first()).toHaveText(`${vars.lastName ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.lastName = ((await page.locator(`#billing_last_name`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project

let step = vars.step
return project === "hunchie" || project === "kybb" 
|| project === "mckeen" 
|| project === "nopong"|| project === "melon"
|| project === "botany"
 || project === "topg-merch" || (project === "template" && vars.subscription != "yes") })()) {
    {
      const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project
let step = vars.step
const role = vars.role
return project === "leggari" && step === "2" && role === 'contractor' })()) {
    {
      const _lbl = page.locator(`label[for="billing_same_as_shipping"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#billing_same_as_shipping`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project
let step = vars.step
const role = vars.role
return project === "leggari" && step === "2" && role === 'contractor' })()) {
    await expect(page.locator(`div > p#billing_same_as_shipping_call_field > span`).first()).toHaveText(`If you want to ship your order to a different project location, please give us a call at 1-844-LEGGARI (534-4274).`);
  }
  try {
    if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "harmony" 
|| project === "kybb" || project === "lens"
|| project === "mckeen" || project === "mavenfair" 
|| project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "botany"
|| project === "scout" || project === "template" })()) {
      try { await page.locator(`#billing_company`).or(page.locator(`iframe#wcp-checkout-iframe #billing_company`)).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).or(page.locator(`iframe#wcp-checkout-iframe #billing_company`)).first().selectOption(`${vars.company ?? ''}`); }
    }
  } catch { /* optional step: assign */ }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "2" })()) {
    try { await page.locator(`#shipping_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#billing_company`).first()).toHaveText(`${vars.company ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.company = ((await page.locator(`#billing_company`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    vars.licKey = ((await page.locator(`#aim`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return  project === "2m" })()) {
    try { await page.locator(`#billing_invoice_cc_email_addresses`).first().fill(`${vars.emailCC ?? ''}`); } catch { await page.locator(`#billing_invoice_cc_email_addresses`).first().selectOption(`${vars.emailCC ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    try { await page.locator(`#po_number`).first().fill(`${vars.PONumber ?? ''}`); } catch { await page.locator(`#po_number`).first().selectOption(`${vars.PONumber ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" || project === "mckeen" 
|| project ==="weedpleez" || project === "botany" })()) {
    await expect(page.locator(`#billing_country_field > span`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`#billing_country_field > span option:nth-of-type(2)`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  try {
    if ((() => { let project = vars.project
let step = vars.step
return project === "harmony" || project === "hunchie" 
|| project === "kybb"
|| project === "mavenfair" || project === "nopong" || project === "scout"
|| project === "icg" })()) {
      await expect(page.locator(`#select2-billing_country-container`).or(page.locator(`iframe#wcp-checkout-iframe #select2-billing_country-container`)).first()).toHaveText(`${vars.countryComplete ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  // skipped: select-open click on '#billing_country' (Select2 pattern)
  if ((() => { let project = vars.project
let step = vars.step
const role =vars.role
return project === "2m" || project === "elka" 
|| (project === "leggari" && step === "2" && role === 'contractor') || project === "lens"
|| project === "talkbox" || project === "topg-merch"
|| project === "template" })()) {
    await page.locator(`#billing_country`).first().selectOption(`${vars.country ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
const role = vars.role
return project === "Deans" || project === "2m" 
|| project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "inspire" 
|| project === "kybb"|| (project === "leggari" && step === "2" && role === 'contractor') 
|| project === "lens" || project === "mckeen" 
|| project === "mavenfair" || project ==="weedpleez"
|| project === "nopong" || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
 || project === "mood" || project === "template"
 || project === "icg" })()) {
    try { await page.locator(`#billing_address_1`).or(page.locator(`iframe#wcp-checkout-iframe #billing_address_1`)).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).or(page.locator(`iframe#wcp-checkout-iframe #billing_address_1`)).first().selectOption(`${vars.street ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
let role =vars.role
return project === "Deans" || project === "2m" 
|| project === "elka" || project === "harmony"  
|| project === "hunchie" || project === "inspire" 
|| project === "kybb"|| (project === "leggari" && step === "2" && role === 'contractor')
|| project === "lens" || project === "mavenfair" 
|| project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout"
|| project === "topg-merch" || project === "mood"
|| project === "template" || project === "icg" })()) {
    try { await page.locator(`#billing_city`).or(page.locator(`iframe#wcp-checkout-iframe #billing_city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).or(page.locator(`iframe#wcp-checkout-iframe #billing_city`)).first().selectOption(`${vars.city ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
const role = vars.role
return project === "Deans" || project === "elka"
|| (project === "leggari" && step === "2" && role === 'contractor') 
|| project === "lens" || project === "mckeen" 
|| project === "mavenfair" || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || project === "template"
|| project === "icg" })()) {
    try { await page.locator(`#billing_address_2`).or(page.locator(`iframe#wcp-checkout-iframe #billing_address_2`)).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`iframe#wcp-checkout-iframe #billing_address_2`)).first().selectOption(`${vars.street2 ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "mckeen" })()) {
    await expect(page.locator(`#billing_city_field > span`).first()).toHaveText(`${vars.city ?? ''}`);
  }
  // skipped: select-open click on '#billing_state' (Select2 pattern)
  if ((() => { let project = vars.project
let step = vars.step
let country = vars.country
const role = vars.role
return project === "Deans" || project === "2m" 
|| project === "elka" || project === "harmony"
|| project === "inspire" || (project === "leggari" && step === "2" && role === 'contractor')
|| project === "lens" || project ==="weedpleez"
|| project === "nopong" || (project === "melon" && country === "IT")
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || project === "template"
|| project === "icg" })()) {
    await page.locator(`#billing_state`).first().selectOption(`${vars.state ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "kybb" 
|| project === "mavenfair" })()) {
    await expect(page.locator(`#select2-billing_state-container`).first()).toHaveText(`${vars.stateComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "mckeen" })()) {
    await expect(page.locator(`#billing_state_field > span`).or(page.locator(`iframe#wcp-checkout-iframe #billing_state_field > span`)).first()).toHaveText(`${vars.stateComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
const role = vars.role
return project === "Deans" || project === "Phlearn" 
|| project === "2m" || project === "elka" 
|| project === "harmony" || project === "hunchie" 
|| project === "inspire" || project === "kybb" 
|| (project === "leggari" && step === "2" && role === 'contractor') 
|| project === "lens" 
|| project === "mavenfair" || project ==="weedpleez"
|| project === "nopong"|| project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || project === "template"
|| project === "icg" })()) {
    try { await page.locator(`#billing_postcode`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_postcode`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing_postcode`)).or(page.locator(`iframe#wcp-checkout-iframe #billing_postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "mckeen" })()) {
    await expect(page.locator(`#billing_postcode`).first()).toHaveText(`${vars.zipCode ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "2" })()) {
    {
      const _lbl = page.locator(`label[for="select2-address_type-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-address_type-container`).or(page.locator(`#address_type_field .select2-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "2" })()) {
    await page.waitForTimeout(250);
  }
  try {
    if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "2" })()) {
      await page.locator(`ul#select2-address_type-results li:nth-of-type(2)`).or(page.locator(`#select2-address_type-results li:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  try {
    if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "2" })()) {
      try { await page.locator(`#address_type`).first().fill(`Residential`); } catch { await page.locator(`#address_type`).first().selectOption(`Residential`); }
    }
  } catch { /* optional step: assign */ }
  if ((() => { let project = vars.project
let step = vars.step
return project === "2m" || project === "elka" 
|| project === "harmony" || project === "hunchie" 
|| project === "inspire" || project === "kybb" 
|| (project === "leggari" && step === "2") || project === "mckeen" 
|| project === "mavenfair" || project ==="weedpleez"
|| project === "nopong" || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || project === "template"
|| project === "icg" })()) {
    try { await page.locator(`#billing_phone`).or(page.locator(`iframe#wcp-checkout-iframe #billing_phone`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).or(page.locator(`iframe#wcp-checkout-iframe #billing_phone`)).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return (project === "leggari" && step === "2") })()) {
    vars.phoneCode = ((await page.locator(`#billing_phone_field .iti__selected-dial-code`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#billing_phone`).first()).toHaveText(`${vars.phone ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    try { await page.locator(`#billing_mobile_phone`).first().fill(`${vars.mobile ?? ''}`); } catch { await page.locator(`#billing_mobile_phone`).first().selectOption(`${vars.mobile ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "inspire" 
|| project === "kybb" || project === "mckeen" 
|| project === "mavenfair" || project === "nopong"
|| (project === "leggari" && step === "2") || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || project === "template"
|| project === "icg" })()) {
    try { await page.locator(`#billing_email`).or(page.locator(`iframe#wcp-checkout-iframe #billing_email`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).or(page.locator(`iframe#wcp-checkout-iframe #billing_email`)).first().selectOption(`${vars.email ?? ''}`); }
  }
  try {
    if ((() => { let project = vars.project
return project === 'elka' })()) {
      await page.locator(`button.wc_avatax_validate_address.button`).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  if ((() => { let project = vars.project
return project === 'elka' })()) {
    await blockUI(page, vars);
  }
  if ((() => { let project = vars.project
return project === 'elka' })()) {
    await page.waitForLoadState('load');
  }
  try {
    if ((() => { let project = vars.project
return project === "topg-merch" })()) {
      try { await page.locator(`#billing_email_confirm`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email_confirm`).first().selectOption(`${vars.email ?? ''}`); }
    }
  } catch { /* optional step: assign */ }
  if ((() => { let project = vars.project
return project === "2m" })()) {
    try { await page.locator(`#billing_invoice_cc_email_addresses`).first().fill(`${vars.emailCC ?? ''}`); } catch { await page.locator(`#billing_invoice_cc_email_addresses`).first().selectOption(`${vars.emailCC ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" || project === "lens" })()) {
    await expect(page.locator(`#billing_email`).first()).toHaveText(`${vars.username ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "lens" })()) {
    await expect(page.locator(`#billing_custom_tax_id`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "hunchie" || (project === "leggari" && step === "2")
|| project === "mckeen" })()) {
    {
      const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).or(page.locator(`label[for="kl_newsletter_checkbox"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#mailchimp_woocommerce_newsletter`).or(page.locator(`#kl_newsletter_checkbox`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try {
    if ((() => { let project = vars.project
return project === "lens" })()) {
      {
        const _lbl = page.locator(`label[for="mailchimp_woocommerce_newsletter"]`).or(page.locator(`label[for="kl_newsletter_checkbox"]`)).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#mailchimp_woocommerce_newsletter`).or(page.locator(`#kl_newsletter_checkbox`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
  } catch { /* optional step: click */ }
  if ((() => { let project = vars.project+vars.type
let step = vars.step
return project === "elka" || project === "hunchie" 
|| project === "inspire" || project === "kybb" 
|| (project === "leggari" && step === "2") || project === "mckeen" 
|| project === "mavenfair" || project === "nopong"
|| project === "melon" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || (project === "template" && vars.subscription != "yes")
|| project === "icg" })()) {
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).or(page.locator(`iframe#wcp-checkout-iframe #createaccount`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project+vars.type
return project === "inspireSub" })()) {
    await expect(page.locator(`#createaccount`)).toHaveCount(0);
  }
  if ((() => { let project = vars.project
return project === "elka" || project === "harmony" 
|| project === "hunchie" || project === "inspire" 
|| project === "mckeen" || project === "mavenfair"
 || project === "nopong" || project === "scout"
 || project === "mood" || project === "template"
 || project === "icg" })()) {
    try { await page.locator(`#account_password`).or(page.locator(`iframe#wcp-checkout-iframe #account_password`)).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).or(page.locator(`iframe#wcp-checkout-iframe #account_password`)).first().selectOption(`${vars.password ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "scout" })()) {
    try { await page.locator(`#account_username`).first().fill(`${vars.firstName ?? ''}${vars.lastName ?? ''}`); } catch { await page.locator(`#account_username`).first().selectOption(`${vars.firstName ?? ''}${vars.lastName ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "icg" })()) {
    {
      const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ship-to-different-address-checkbox`).or(page.locator(`iframe#wcp-checkout-iframe #ship-to-different-address-checkbox`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    await expect(page.locator(`#ship-to-different-address-checkbox`).or(page.locator(`iframe#wcp-checkout-iframe #ship-to-different-address-checkbox`)).first()).toBeVisible();
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "Deans" 
|| project === "kybb" || project === "mckeen" 
|| project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout"
|| project === "topg-merch" || project === "mood"
|| (project === "template" && vars.subscription != "yes")
 || project === "icg" })()) {
    try { await page.locator(`#shipping_first_name`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "Deans" 
|| project === "kybb" || project === "mckeen" 
|| project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout"
|| project === "topg-merch" || project === "mood"
|| (project === "template" && vars.subscription != "yes")
 || project === "icg" })()) {
    try { await page.locator(`#shipping_last_name`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_last_name`)).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_last_name`)).first().selectOption(`${vars.lastName2 ?? ''}`); }
  }
  try {
    if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || (project === "leggari" && step === "2") 
|| project === "mckeen" 
 || project === "nopong"
 || project === "botany" || project === "scout"
 || project === "mood" || (project === "template" && vars.subscription != "yes")
 || project === "icg" })()) {
      try { await page.locator(`#shipping_company`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_company`)).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_company`)).first().selectOption(`${vars.company2 ?? ''}`); }
    }
  } catch { /* optional step: assign */ }
  // skipped: select-open click on '#shipping_country' (Select2 pattern)
  if ((() => { let project = vars.project
let step = vars.step
return (project === "leggari" && step === "2") || project === "talkbox"
|| project === "topg-merch" || (project === "template" && vars.subscription != "yes") })()) {
    await page.locator(`#shipping_country`).first().selectOption(`${vars.country ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "Deans" || project === "mckeen" 
|| (project === "nopong" && (country === "CA" || country === "US"))
|| project === "botany" })()) {
    await expect(page.locator(`#shipping_country_field > span`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "mood" })()) {
    await expect(page.locator(`#shipping_country_field > span option:nth-of-type(2)`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "hunchie" || project === "kybb" 
|| (project === "nopong" && country === "AU")
|| project === "melon" || project === "scout"  || project === "icg" })()) {
    await expect(page.locator(`#select2-shipping_country-container`).or(page.locator(`iframe#wcp-checkout-iframe #select2-shipping_country-container`)).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "hunchie" 
|| project === "kybb" || (project === "leggari" && step === "2")
|| project === "mckeen" 
|| project === "nopong" || project === "melon"
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || (project === "template" && vars.subscription != "yes")
|| project === "icg" })()) {
    try { await page.locator(`#shipping_address_1`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_address_1`)).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_address_1`)).first().selectOption(`${vars.street3 ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || (project === "leggari" && step === "2")  
|| project === "mckeen" 
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout"
|| project === "topg-merch" || project === "mood"
|| (project === "template" && vars.subscription != "yes")
 || project === "icg" })()) {
    try { await page.locator(`#shipping_address_2`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_address_2`)).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_address_2`)).first().selectOption(`${vars.street4 ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "hunchie" 
|| project === "kybb" || (project === "leggari" && step === "2") 
|| project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout"
|| project === "topg-merch" || project === "mood"
|| (project === "template" && vars.subscription != "yes")
 || project === "icg" })()) {
    try { await page.locator(`#shipping_city`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_city`)).first().selectOption(`${vars.city ?? ''}`); }
  }
  // skipped: select-open click on '#shipping_state' (Select2 pattern)
  if ((() => { let project = vars.project
let step = vars.step
let country = vars.country
return project === "Deans" || (project === "leggari" && step === "2")
|| project === "nopong" || (project === "melon" && country === "IT")
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| project === "mood" || (project === "template" && vars.subscription != "yes")
|| project === "icg" })()) {
    await page.locator(`#shipping_state`).first().selectOption(`${vars.state ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "kybb" })()) {
    await expect(page.locator(`#select2-shipping_state-container`).first()).toHaveText(`${vars.stateComplete ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "hunchie" 
|| project === "kybb" || (project === "leggari" && step === "2") 
|| project === "nopong"
|| project === "melon" || project === "talkbox"
|| project === "botany" || project === "scout"
|| project === "topg-merch" || project === "mood"
|| (project === "template" && vars.subscription != "yes")
 || project === "icg" })()) {
    try { await page.locator(`#shipping_postcode`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).or(page.locator(`iframe#wcp-checkout-iframe #shipping_postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  }
  await blockUI(page, vars);
  if ((() => { let project = vars.project
return project === "Deans" || project === "talkbox"
|| project === "mood" })()) {
    try { await page.locator(`#shipping_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#shipping_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "Deans" })()) {
    try { await page.locator(`#shipping_mobile_phone`).first().fill(`${vars.mobile ?? ''}`); } catch { await page.locator(`#shipping_mobile_phone`).first().selectOption(`${vars.mobile ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "elka" })()) {
    await page.locator(`div:nth-of-type(1) > a[href="#"].fusion-button.button-default.fusion-button-default-size.button.continue-checkout`).filter({ visible: true }).first().click({ force: true });
  }
  try {
    if ((() => { let project = vars.project
return project === "x" || project === "Deans" 
|| project === "elka" || project === "hunchie" 
|| project === "kybb" || project === "melon" 
|| project === "talkbox" || project === "botany"
|| project === "scout" || project === "topg-merch"
|| (project === "template" && vars.subscription != "yes")
|| project === "icg" })()) {
      try { await page.locator(`#order_comments`).or(page.locator(`iframe#wcp-checkout-iframe #order_comments`)).first().fill(`Order Note for Testing this field`); } catch { await page.locator(`#order_comments`).or(page.locator(`iframe#wcp-checkout-iframe #order_comments`)).first().selectOption(`Order Note for Testing this field`); }
    }
  } catch { /* optional step: assign */ }
  if (vars.project === "leggari" && vars.step === '3') {
    try { await page.locator(`#order_comments`).first().fill(`Test order notes`); } catch { await page.locator(`#order_comments`).first().selectOption(`Test order notes`); }
  }
  if ((() => { let project = vars.project
return project === "elka" })()) {
    await page.locator(`div:nth-of-type(2) > a[href="#"].fusion-button.button-default.fusion-button-default-size.continue-checkout.button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "2" })()) {
    await page.locator(`.wfacp-left-panel.wfacp_page.pre_built.single_step > .wfacp-two-step-erap.wfacp-next-btn-wrap.center > button[type="button"].button.button-primary.wfacp_next_page_button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await expect(page.locator(`iframe[src="${vars.url ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#billing-description > .billing_subtitle > .subscription-price > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.subPrice = ((await page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" 
|| project === "elka"  
|| project === "hunchie" || project === "kybb" 
|| (project === "leggari" && step === "3") || project === "mckeen" 
|| project === "mavenfair" || project ==="weedpleez"
 || project === "nopong" || project === "botany"
 || project === "topg-merchXX" || project === "mood"
 || project === "template" })()) {
    await expect(page.locator(`td.product-name`).or(page.locator(`div.product-info`)).or(page.locator(`.wfacp_mini_cart_item_title`)).or(page.locator(`h3.ld-product-title`)).or(page.locator(`div.cfw-cart-item-title`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "harmony" })()) {
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.prod_desc = ((await page.locator(`tr:nth-of-type(1).cart_item > td.product-name > div > div > div.check-name`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.prod_desc2 = ((await page.locator(`tr:nth-of-type(2).cart_item > td.product-name > div > div > div.check-name`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "Deans" 
|| (project === "harmony" && vars.subscription !== "yes")
|| project === "kybb" || project === "mavenfair"
|| (project === "leggari" && step === "3") })()) {
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.unitPrice = ((await page.locator(`tr:nth-of-type(2).cart_item > td.product-total > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subPrice = `${vars.subPrice}`
let unitPrice = `${vars.unitPrice}`

subPrice = subPrice.replace(",","");
unitPrice = unitPrice.replace(",","");

subPrice = Number(subPrice.replace(`${vars.Symbol}`,""));
unitPrice = Number(unitPrice.replace(`${vars.Symbol}`,""));

let subtotal = subPrice+unitPrice;
subtotal = `${vars.Symbol}`+subtotal.toFixed(2);

return subtotal }, vars);
  }
  if ((() => { let project = vars.project
return project === "talkbox" || project === "hunchie" })()) {
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "elka" || project === "Deans" 
|| (project === "harmony" && vars.subscription !== "yes") 
|| project === "kybb" || project === "mavenfair"
|| (project === "leggari" && step === "3") })()) {
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "mckeen" || project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "scout"  || project === "botany"
|| project === "topg-merchxx" || project === "mood" || project === "template"
|| project === "hunchie" })()) {
    await expect(page.locator(`.wfacp-mini-cart-block tr:nth-of-type(1) td.product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr:nth-of-type(1) td.product-total > span.woocommerce-Price-amount.amount`)).or(page.locator(`td.cfw-cart-item-subtotal > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`tr > td.product-subtotal > span.woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "mckeen" || project ==="weedpleez" || project === "nopong"
|| project === "melon" || project === "scout"  || project === "botany"
|| project === "topg-merchxx" || project === "mood" || project === "template"
|| project === "hunchie" })()) {
    await expect(page.locator(`.wfacp-mini-cart-block tbody > tr.cart-subtotal > td > span`).or(page.locator(`.topg-exclusive-cart-content > div > table.shop_table > tbody > tr.cart-subtotal > td > span.amount > bdi`)).or(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "topg-merch" })()) {
    await expect(page.locator(`div.topg-exclusive-cart-content > div.cart_totals > table > tbody > tr.cart-subtotal > td > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "lens" })()) {
    vars.unitPrice = ((await page.locator(`.ld-product-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "lens" })()) {
    await expect(page.locator(`.amount > strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.discount = ((await page.locator(`tr.cart-discount > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "elka" || project === "melon" || project === "weedpleez"
|| project === "mavenfair" })()) {
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`ul#shipping_method > li:nth-child(1) > label`)).or(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.shipping_total_fee > td:nth-child(2) > span > span`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "scout" })()) {
    await page.locator(`ul#shipping_method > li:nth-child(2) > label > .woocommerce-Price-amount.amount > bdi`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "scout" })()) {
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(2) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "talkbox" || project === "scout" })()) {
    await blockUI(page, vars);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "3" })()) {
    vars.shippingPrice = ((await page.locator(`li:nth-of-type(1).wfacp_single_shipping_method > div > .wfacp_shipping_price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`li:nth-of-type(1).wfacp_single_shipping_method > div > .wfacp_shipping_price`)).or(page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "3" })()) {
    vars.shippingDesc = ((await page.locator(`li:nth-of-type(1).wfacp_single_shipping_method > div > .wfacp_shipping_radio > label`).or(page.locator(`ul#shipping_method > li:nth-child(1) > label`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "hunchie" || project === "Deans" })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(1) > label`).first()).toHaveText(`Free shipping`);
  }
  if ((() => { let project = vars.project
return project === "talkbox"  || project === "botany"
|| project === "mood"
|| project === "hunchie" })()) {
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label`).or(page.locator(`ul#shipping_method > li:nth-child(1) > div > label`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "topg-merch" })()) {
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > span > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let country =vars.country
return project === "nopong" && country === "CA" })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(1) > label .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "nopong" && (country === "AU" || country === "US") })()) {
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "kybb" || project === "mckeen"
|| (project === "nopong" && (country === "AU" || country === "US")) || (project === "template" && vars.subscription != "yes") })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "3" })()) {
    await expect(page.locator(`tr.shipping_total_fee > td:nth-of-type(2) > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.shipping_total_fee > td:nth-of-type(2)`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return (project === "harmony" && vars.subscription !== "yes" && country === "CA") || project === "mood" })()) {
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let project = `${vars.project}`
let elements = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.tax-rate > td > span"))

return project === "mavenfair" && elements.length >= 1 }, vars)) {
    vars.taxPrice1 = ((await page.locator(`tr:nth-of-type(3).tax-rate > td > span`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let project = `${vars.project}`
let elements = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.tax-rate > td > span"))
return project === "mavenfair" && elements.length >= 2 }, vars)) {
    vars.taxPrice2 = ((await page.locator(`tr:nth-of-type(4).tax-rate > td > span`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "nopong" && country === "AU" })()) {
    vars.taxPriceSmall = ((await page.locator(`tr.order-total > td > small > span`).or(page.locator(`small.includes_tax > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "melon" })()) {
    vars.taxPriceSmall = ((await page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.order-total > td > small > span`).or(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total > td > small > span`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let country = vars.country
return project === "nopong" && country === "AU" })()) {
    await expect(page.locator(`tr.order-total > td > small > span`).or(page.locator(`small.includes_tax > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
  }
  if ((() => { let project = vars.project
let country = vars.country
return  project === "kybb" || project === "mckeen"
|| (project === "template" && vars.subscription != "yes") })()) {
    await expect(page.locator(`tr.tax-rate:not(.recurring-total) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { let country = vars.country
let project = vars.project
return (project === "nopong" && country === "CA")
|| (project === "template" && vars.subscription === "yes") })()) {
    vars.taxPrice = ((await page.locator(`tr.tax-rate:not(.recurring-total) > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" || project === "elka" 
|| (project === "leggari" && step === "3") || project === "talkbox"
|| project === "botany" || project === "hunchie" })()) {
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let subscription = vars.subscription
return project === "template" && subscription === "yes" })()) {
    await expect(page.locator(`tr.cart-subtotal.recurring-total > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let subscription = vars.subscription
return project === "template" && subscription === "yes" })()) {
    vars.recurringTax = ((await page.locator(`tr.tax-rate.recurring-total > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    vars.recurringTax = ((await page.locator(`tr.tax-total.recurring-total > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
let subscription = vars.subscription
return project === "talkbox" || (project === "template" && subscription === "yes") })()) {
    vars.recurringTotal = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "hunchie" })()) {
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" 
|| project === "elka" || project === "melon" || (project === "harmony" && vars.subscription !== "yes")
|| project ==="weedpleez" || project === "nopong" 
|| (project === "leggari" && step === "3") || project === "talkbox"
|| project === "botany" || project === "scout"
|| project === "mood"
|| project === "template" || project === "mavenfair"
|| project === "hunchie" })()) {
    vars.total = ((await page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total > td > strong > span`).or(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "topg-merch" })()) {
    vars.total = ((await page.locator(`div.topg-exclusive-cart-content > div.cart_totals > table.shop_table > tbody > tr.order-total > td > strong > span.woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "lens" })()) {
    vars.total = ((await page.locator(`tr.order-total:nth-of-type(5) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "kybb" 
|| project === "mckeen" })()) {
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.order-total > td > strong > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let project = vars.project
return project === "mavenfair" })()) {
    vars.taxPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let tax1 = `${vars.taxPrice1}`;
let tax2 = `${vars.taxPrice2}`;
if (tax1 === "") {
    tax1 = 0.00
} else {
    tax1 = tax1.replace(",","");
    tax1 = Number(tax1.replace(`${vars.Symbol}`,""));
}
if (tax2 === "") {
    tax2 = 0.00
} else {
    tax2 = tax2.replace(",","");
    tax2 = Number(tax2.replace(`${vars.Symbol}`,""));
}

let tax = tax1+tax2;
return tax; }, vars);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "Deans" 
|| project === "elka" || (project === "harmony" && vars.subscription !== "yes")
|| project === "kybb" 
|| (project === "leggari" && step === "3") || project === "mavenfair" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let shipping = `${vars.shippingPrice}`;
if (shipping.includes("Free")){
    shipping = "0.00";
};
let tax = `${vars.taxPrice}`;
let total = `${vars.total}`;


unit = unit.replace(",","");
shipping = shipping.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit+shipping+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
  }
  if ((() => { let project = vars.project
let step = vars.step
return  (project === "leggari" && step === "2") })()) {
    await page.waitForTimeout(1500);
  }
  if ((() => { let project = vars.project
let step = vars.step
return  (project === "leggari" && step === "2") })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(1) label`)).not.toHaveCount(0);
  }
  if ((() => { let project = vars.project
let step = vars.step
return  (project === "leggari" && step === "2") })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(1) label`).first()).toContainText(`FedEx`);
  }
  try {
    if ((() => { let project = vars.project
let step = vars.step
return  (project === "leggari" && step === "2") })()) {
      await expect(page.locator(`ul#shipping_method > li:nth-child(2) label`)).not.toHaveCount(0);
    }
  } catch { /* optional step: assertElementPresent */ }
  if ((() => { let project = vars.project
let step = vars.step
return  (project === "leggari" && step === "2") })()) {
    await expect(page.locator(`ul#shipping_method > li:nth-child(2) label`).first()).toHaveText(`Local pickup in Pasco, WA (Call to schedule a pickup 844-534-4274)`);
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "leggari" && step === "3" })()) {
    await page.locator(`.wfacp-left-panel.wfacp_page.two_step > .wfacp-two-step-erap.wfacp-next-btn-wrap.center > button[type="button"].button.button-primary.wfacp_next_page_button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "mckeen" || project ==="weedpleez"
|| project === "nopong" || project === "melon" || project === "talkbox"
|| project === "scout" || project === "botany" || project === "mood" || project === "template" || project === "hunchie"
|| project === "icg" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotalPrice}`;
let shipping = `${vars.shippingPrice}`;
let discount = `${vars.discount}`
if (discount === ""){
    discount = "0.00";
};
if (shipping.includes("Free") || shipping.includes("Lettermail (untracked)")){
    shipping = "0.00";
};
let tax = `${vars.taxPrice}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.total}`;

unit = unit.replace(",","").trim();
discount = discount.replace(",","").trim();
shipping = shipping.replace(",","").trim();
tax = tax.replace(",","").trim();
total = total.replace(",","").trim();

unit = Number(unit.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit-discount+shipping+tax;

total2 = Number(total2.toFixed(2));


return total === total2 }, vars)).toBeTruthy();
  }
  if ((() => { let project = vars.project
return project === "topg-merch" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let shipping = `${vars.shippingPrice}`;
let discount = `${vars.discount}`
if (discount === ""){
    discount = "0.00";
};
if (shipping.includes("Free") || shipping == null){
    shipping = 0.00;
};
let tax = `${vars.taxPrice}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.total}`;
total = total.slice(1);
let quantity = `${vars.qty}`;

unit = unit.slice(1);
discount = discount.slice(1);
shipping = shipping.slice(1);
tax = tax.slice(1);


unit = parseFloat(unit);
quantity = parseInt(quantity);
discount = parseFloat(discount);
shipping = parseFloat(shipping);
//tax = parseFloat(tax);
total = parseFloat(total).toFixed(2);

let total2 = unit*quantity-discount+shipping; ////+tax;
total2 = parseFloat(total2).toFixed(2);

return total === total2 }, vars)).toBeTruthy();
  }
  if ((() => { let project = vars.project
return project === "kybb" })()) {
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  }
  if ((() => { let project = vars.project
let step = vars.step
return project === "2m" || (project === "harmony" && vars.subscription !== "yes")
|| project === "mckeen" || project === "mavenfair" 
|| project ==="weedpleez"|| project === "nopong"
|| (project === "leggari" && step === "3")
|| project === "botany" || project === "talkbox" })()) {
    {
      const _lbl = page.locator(`label[for="terms"]`).or(page.locator(`label[for="terms_acceptance"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).or(page.locator(`#terms_acceptance`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}
