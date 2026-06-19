// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "No Pong - Common steps for Project"
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

// GI: "02 - CA - Home Slider Autoplay verification" (647636f35bf68ad286bd499f)
export async function _02CAHomeSliderAutoplayVerification(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.entry-content > h2.has-text-align-center.has-text-color.wp-block-heading`).first()).toContainText(`you are our Heroes`);
  await page.screenshot({ fullPage: true });
  vars.elId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const el = Array.from<any>(document.querySelectorAll("div#tns2-mw div.tns-item.tns-slide-active"));
let elId= [el[0].id,el[1].id,el[2].id];

return elId
 }, vars);
  await page.waitForTimeout(12000);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const el2 = Array.from<any>(document.querySelectorAll("div#tns2-mw div.tns-item.tns-slide-active"));
let elId2 = [el2[0].id,el2[1].id,el2[2].id]

const elId = vars.elId
return(elId != elId2)
 }, vars)).toBeTruthy();
  await page.screenshot({ fullPage: true });
}

// GI: "03 - CA - Home Slider Manual verification" (643dac1500e2acd59fe89f96)
export async function _03CAHomeSliderManualVerification(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//button[contains(text(), "prev")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(1)`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//button[contains(text(), "prev")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(1)`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`div.tns-item.tns-slide-cloned:nth-of-type(3) > img.tns-lazy-img.loaded.tns-complete`)).not.toHaveCount(0);
}

// GI: "04 - AU - Site Country verification" (643d76ce00e2acd59fd96b00)
export async function _04AUSiteCountryVerification(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.label`).first()).toContainText(`${vars.country ?? ''}`);
}

// GI: "04 - CA - Site Country verification" (643d7613d19bd3b458c66fd6)
export async function _04CASiteCountryVerification(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.primary-navigation li.menu-item a[href*="/ca/products/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.label`).first()).toContainText(`${vars.country ?? ''}`);
}

// GI: "20 - AU - Menu Toggle" (64821fd26f9af549f859d882)
export async function _20AUMenuToggle(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.label`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.popup-content`).first()).toBeVisible();
  await page.screenshot({ fullPage: true });
  await expect(page.locator(`ul.sites > li.current > a > span.country`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
}

// GI: "Add Subscription to Cart" (688762032c245b961da6b5c4)
export async function addSubscriptionToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`li.menu-item a[href*="/monthly-club/"]`).or(page.locator(`xpath=//*[@id='menu-main-menu']/li[contains(@class, 'menu-item') and contains(@class, 'menu-item-type-post_type') and contains(@class, 'menu-item-object-page')]/a[contains(text(),'Subscriptions')]`)).or(page.locator(`xpath=//a[contains(text(),'Monthly Club')]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('#main ul.wc-block-grid__products > li a[href*="?add-to-cart="]'))
const length = elements.length;
const randomNumber = Math.floor(Math.random() * length) + 1;

return randomNumber }, vars);
  vars.prod_desc = ((await page.locator(`#main ul > li:nth-child(${vars.n ?? ''}) > a > div.wc-block-grid__product-title`).textContent()) ?? '').trim();
  vars.unitPrice = ((await page.locator(`ul > li:nth-child(${vars.n ?? ''}) > div.wc-block-grid__product-price.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  vars.signUpFee = ((await page.locator(`ul > li:nth-child(${vars.n ?? ''}) > div.wc-block-grid__product-price.price > span.subscription-details > span`).textContent()) ?? '').trim();
  await page.locator(`ul.wc-block-grid__products > li:nth-of-type(${vars.n ?? ''}) a[href*="?add-to-cart="]`).filter({ visible: true }).first().click({ force: true });
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
    await page.locator(`#masthead > div > div > ul > li > a`).or(page.locator(`#masthead > div > ul > li > a`)).filter({ visible: true }).first().click({ force: true });
  }
  await calculateShipping(page, vars);
  vars.qty = `2`;
  try { await page.locator(`td.product-quantity input[aria-label="Product quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`td.product-quantity input[aria-label="Product quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
  await page.locator(`.subscription-price > .subscription-details`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await getPriceInCart(page, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subProdPrice = parseFloat(`${vars.subProdPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const signUpFee = parseFloat(`${vars.signUpFee}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const totalSignUpFee = parseFloat(`${vars.totalSignUpFee}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const recurringSubtotal = parseFloat(`${vars.recurringSubtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const recurringTotal = parseFloat(`${vars.recurringTotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let taxPrice
let recurringTax
if (`${vars.country}` !== 'AU') {
    taxPrice = parseFloat(`${vars.taxPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
    recurringTax = parseFloat(`${vars.recurringTax}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
} else {
    taxPrice = 0
    recurringTax = 0
}
let shippingPrice
if (`${vars.shippingPrice}`.includes('Lettermail (untracked)') || `${vars.shippingPrice}`.includes('Regular')) {
    shippingPrice = 0
} else {
    shippingPrice = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

}
let recurringShipping
if (`${vars.recurringShipping}`.includes('Free')) {
    recurringShipping = 0
} else {
    recurringShipping  = parseFloat(`${vars.recurringShipping}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
}

const qty = vars.qty;
const subProdPrice2 = price * qty;
const totalSignUpFee2 = signUpFee * qty;
const subtotal2 = subProdPrice2 + totalSignUpFee2;
const total2 = parseFloat((subtotal2 + taxPrice + shippingPrice).toFixed(2))
const recurringTotal2 = parseFloat((recurringSubtotal + recurringTax + recurringShipping).toFixed(2))

return subProdPrice === subProdPrice2 
        && subtotal2 === subtotal 
        && total2 === total
        && subProdPrice2 === recurringSubtotal
        && recurringTotal2 === recurringTotal
        
        
        
         }, vars)).toBeTruthy();
  await checkEarningPointsCartCheckout(page, vars);
  await page.goto(`${vars.startUrl ?? ''}check-out/?saucal-skip-captcha=1`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Checkout`);
}

// GI: "Admin Login - Skip 2FA" (64766b920bf912e0780e2f58)
export async function adminLoginSkip2FA(page: Page, vars: Record<string, string> = {}): Promise<void> {
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
  try {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  } catch { /* optional step: click */ }
}

// GI: "AU - Log In" (648776b2e71b46cb751a9b2e)
export async function aULogIn(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(4) > a[href*="/my-account/"] > em`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await page.keyboard.press('Escape');
  await expect(page.locator(`h1.entry-title`)).not.toHaveCount(0);
}

// GI: "Calculate balance points" (6883993e2c245b961d025eef)
export async function calculateBalancePoints(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.redeeming === 'true' && vars.refund !== 'true') {
    vars.balance = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const redeemedPoints = vars.redeemedPoints
let balance = vars.balance - redeemedPoints;

return balance
 }, vars);
  }
  if (vars.redeeming === 'true' && vars.refund !== 'true') {
    vars.oldBalance = `${vars.balance ?? ''}`;
  }
  if (vars.refund !== 'true') {
    vars.balance = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const earnPoints = vars.earnPoints
let balance;
if (`${vars.balance}` === '') {
    balance = earnPoints
} else {
    balance = vars.balance + earnPoints
}

return balance

 }, vars);
  }
  if (vars.redeeming !== 'true' && vars.refund === 'true') {
    vars.balance = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const earnPoints = vars.earnPoints
let balance = vars.balance - earnPoints

return balance }, vars);
  }
  if (vars.redeeming === 'true' && vars.refund === 'true') {
    vars.balance = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const earnPoints = vars.earnPoints
const redeemedPoints = vars.redeemedPoints
const balance = vars.balance - earnPoints + redeemedPoints

return balance }, vars);
  }
}

// GI: "Calculate balance Total" (688b5c8f9e92b1323620e35c)
export async function calculateBalanceTotal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.balanceTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const redeem = vars.redeem
const balance = vars.balance
const balanceTotal = `${vars.Symbol}` + (balance / redeem).toFixed(2)

return balanceTotal }, vars);
}

// GI: "Calculate earning points" (68812aade5d3587e15fbe865)
export async function calculateEarningPoints(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.earnPoints = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotalPrice = parseFloat(`${vars.subtotalPrice}`.replaceAll(',','').replace('$','').trim())
const earn = vars.earn
const earnPoints = Math.ceil(subtotalPrice * earn)

return earnPoints
 }, vars);
}

// GI: "Calculate shipping" (6887dea4e5d3587e150d8b1a)
export async function calculateShipping(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Calculate shipping")]`).or(page.locator(`xpath=//a[contains(text(), "Change Address")]`)).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="select2-calc_shipping_country-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-calc_shipping_country-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`xpath=//li[contains(text(), "${vars.countryComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`#calc_shipping_state_field .select2-container`).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(150);
  await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#calc_shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#calc_shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#calc_shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#calc_shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  await page.locator(`button[name="calc_shipping"]`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
}

// GI: "Change height to slider" (602c1c1ab5325b33d6590f83)
export async function changeHeightToSlider(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); setInterval(() => {
    const query = ".vc_row-o-full-height, .bx-bg, .bx-wrapper, .bx-viewport, .bxslider, .bxslide"
    const elems = Array.from<any>(document.querySelectorAll(query))
    elems.forEach(elem => elem.style.setProperty("height", "600px", "important"))
    elems.forEach(elem => elem.style.setProperty("min-height", "600px", "important"))
}, 100) }, vars);
}

// GI: "Check earning points Cart/Checkout" (688150c72c245b961d5728ab)
export async function checkEarningPointsCartCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await calculateEarningPoints(page, vars);
  await expect(page.locator(`tr.order-total > td > span`).first()).toContainText(`You'll earn ${vars.earnPoints ?? ''} points`);
  await page.locator(`.npl-tooltip`).first().hover();
  await expect(page.locator(`li > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`li > strong`).first()).toContainText(`${vars.earnPoints ?? ''} points`);
}

// GI: "Check Order Details - Thank you page and My Account" (688246a92c245b961d9e6401)
export async function checkOrderDetailsThankYouPageAndMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (false) {
    await expect(page.locator(`td.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''} × ${vars.qty ?? ''}`);
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.toLowerCase().replace('–','-');
const prod_desc2 = document.querySelector<HTMLTableCellElement>('td.product-name')?.innerText.toLowerCase().replace('–','-');
// Normalize spaces, quotes, and ×/x
const normalize = str => str
  .replace(/×|x/gi, '×') // Normalize × or x
  .replace(/[‘’“”]/g, '"') // Normalize curly/straight quotes
  .replace(/\s+/g, ' ') // Collapse multiple spaces to one
  .trim(); // Remove leading/trailing spaces
const full_prod_desc = normalize(prod_desc + ` × ${vars.qty}`);
const normalized_prod_desc2 = normalize(prod_desc2);

console.log(`Normalized prod_desc + " × ${vars.qty}":`, full_prod_desc);
console.log('Normalized prod_desc2:', normalized_prod_desc2);
console.log('Are they equal?', full_prod_desc === normalized_prod_desc2);

return full_prod_desc === normalized_prod_desc2
 }, vars)).toBeTruthy();
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
  if (vars.redeeming === 'true') {
    vars.redeemedIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
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
let redeemedIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText === 'Points Redeemed:') {
        redeemedIndex = index;
      }
    }
  });
}
  
  return redeemedIndex + 1 }, vars);
  }
  if (vars.redeeming === 'true') {
    await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.redeemedIndex ?? ''}) > td .woocommerce-Price-amount`).first()).toHaveText(`${vars.redeemedTotal ?? ''}`);
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
  if (vars.includeTax === 'false') {
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
      if (thText === 'HST (13%):') {
        taxIndex = index;
      }
    }
  });
}
  return taxIndex + 1 }, vars);
  }
  if (vars.includeTax === 'false') {
    await expect(page.locator(`table.woocommerce-table > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.taxIndex ?? ''}) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.includeTax === 'true') {
    await expect(page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
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
  vars.earnIndex = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <tfoot> elements
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
let earnIndex;
if (targetTfoot) {
  const tfootElements = Array.from<any>(targetTfoot.querySelectorAll('tr'));
  
  Array.from<any>(tfootElements).forEach((tr, index) => {
    const th = tr.querySelector('th');
    if (th) {
      const thText = th.textContent.trim();
      if (thText === 'Points:') {
        earnIndex = index;
      }
    }
  });
}  
  return earnIndex + 1 }, vars);
  await expect(page.locator(`table.woocommerce-table--order-details > tfoot:nth-of-type(${vars.tfootIndex ?? ''}) > tr:nth-of-type(${vars.earnIndex ?? ''}) > td`).first()).toHaveText(`You've earned ${vars.earnPoints ?? ''} points`);
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

let taxIndices
if (!vars.includeTax) {
    taxIndices = [vars.taxIndex]; 
} else {
    taxIndices = []
}// Array of indices for tax fields (e.g., HST, GST, PST)
const paymentIndex = vars.paymentIndex;
const totalIndex = vars.totalIndex;
const earnIndex = vars.earnIndex;
const noteIndex = vars.noteIndex;


const orderGroups = [
    [discountIndex, redeemedIndex].filter(index => index !== null && index !== -1), // Discount:, Points Redeemed: (optional, any order)
    [shippingIndex], // Shipping:
    taxIndices, // Tax fields (optional, any order)
    [paymentIndex], // Payment method:
    [totalIndex], // Total:
    [earnIndex], // Points:
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
  if (vars.country === '') {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if (vars.subscription === 'true') {
    await nextPaymentDate(page, vars);
  }
}

// GI: "Check order Details in backend" (688aa88b9e92b13236018779)
export async function checkOrderDetailsInBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  if (vars.country === 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}`);
  }
  await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).or(page.locator(`a[href*="mailto:qa+gi_subs_"]`)).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
  if (vars.country === 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}`);
  }
  await expect(page.locator(`.order_note`).first()).toContainText(`Order Note for Testing this field`);
  if (vars.subscription === 'true') {
    await firstLetterCapitalized(page, vars);
  }
  await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.country === 'AU') {
    vars.subtotalWithOutTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotalPrice}`.replaceAll(',','').replace(`${vars.Symbol}`,'').trim())
const subtotalWithOutTax = (subtotal / 1.1).toFixed(2)

return `${vars.Symbol}`+subtotalWithOutTax }, vars);
  }
  if (vars.country === 'AU') {
    vars.shippingWithOutTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingPrice}`;
let shippingWithOutTax;
if (shippingPrice.includes('Regular') || shippingPrice.includes('$0.00')) {
    shippingWithOutTax = '0.00'
} else {
    shippingPrice = parseFloat(shippingPrice.replaceAll(',','').replace(`${vars.Symbol}`,'').trim())
    shippingWithOutTax = (shippingPrice / 1.1).toFixed(2)
}

return `${vars.Symbol}`+shippingWithOutTax }, vars);
  }
  if (vars.country === 'CA') {
    vars.shippingWithOutTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingPrice}`;

if (shippingPrice.includes('Lettermail (untracked)') || shippingPrice.includes('$0.00')) {
    shippingPrice = '0.00'
} else {
    shippingPrice = parseFloat(shippingPrice.replaceAll(',','').replace(`${vars.Symbol}`,'').trim()).toFixed(2)
}

return `${vars.Symbol}`+shippingPrice }, vars);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalWithOutTax ?? ''}`);
  }
  if ((vars.coupon === 'true' || vars.redeeming === 'true') && vars.country === 'CA') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingWithOutTax ?? ''}`);
  }
  if ((vars.coupon === 'true' || vars.redeeming === 'true') && vars.country === 'AU') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingWithOutTax ?? ''}`);
  }
  if ((vars.coupon === 'false' && vars.redeeming === 'false') && vars.country === 'CA') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingWithOutTax ?? ''}`);
  }
  if ((vars.coupon === 'false' && vars.redeeming === 'false') && vars.country === 'AU') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingWithOutTax ?? ''}`);
  }
  if (vars.coupon === 'true' || vars.redeeming === 'true') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.coupon === 'false' && vars.redeeming === 'false') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.coupon === 'true' || vars.redeeming === 'true') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(5) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.coupon === 'false' && vars.redeeming === 'false') {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`a[href*="${vars.startUrl ?? ''}wcpdf/invoice/${vars.orderNumber ?? ''}/wc_order_"]`)).not.toHaveCount(0);
  await expect(page.locator(`div[data-order_id="${vars.orderNumber ?? ''}"].wcpdf-data-fields`)).not.toHaveCount(0);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Stripe charge complete \(Charge ID: ch_[a-zA-Z0-9]+\)/;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Customer has earned vars.earnPoints points. New balance is vars.balance points./;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  if (vars.redeeming === 'true') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkAdminNote(note) {
    const pattern = /Customer has redeemed vars.redeemedPoints points\. New balance is vars.oldBalance points\./;
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkAdminNote(note.textContent));
 }, vars)).toBeTruthy();
  }
}

// GI: "Credits variables" (688b5a869e92b13236208df8)
export async function creditsVariables(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.country === 'AU') {
    vars.earn = `5`;
  }
  if (vars.country === 'CA') {
    vars.earn = `10`;
  }
  vars.redeem = `100`;
  vars.maxPercentage = `75`;
  vars.minBalance = `100`;
}

// GI: "Empty cart" (663bcce31aac3ea14f05653a)
export async function emptyCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a.cart-contents`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`td.product-remove`).filter({ visible: true }).first().click({ force: true });
  await page.goto(`https://no-pong-au-develop.go-vip.net/wholesale-products/`);
  await page.waitForLoadState('load');
}

// GI: "Fill CC" (6882412de5d3587e153a8ba2)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit / Debit Card`;
  {
    const _lbl = page.locator(`label[for="payment_method_stripe"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_stripe`).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
  }
  if ((() => { let savedCC = vars.savedCC

return savedCC !== 'true' })()) {
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / 30`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / 30`); }
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

// GI: "Fill Checkout" (68822fea2c245b961d95ec89)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  }
  {
    const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
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
  if ((() => { const subscription = vars.subscription

return subscription !== 'true' && vars.logged !== 'yes' })()) {
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
  }
  if (vars.logged !== 'yes') {
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  }
  try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
  try {
    try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
  } catch { /* optional step: assign */ }
  if ((() => { let country = vars.country
return (country === "CA" || country === "US") && vars.logged !== 'yes' })()) {
    await expect(page.locator(`#shipping_country_field > span`).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
  if ((() => { let country = vars.country
return country === "AU" &&  vars.logged !== 'yes' })()) {
    await expect(page.locator(`#select2-shipping_country-container`).or(page.locator(`iframe#wcp-checkout-iframe #select2-shipping_country-container`)).first()).toHaveText(`${vars.countryComplete ?? ''}`);
  }
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
  if (vars.country === 'AU' || (vars.country === 'CA' && vars.subscription === 'true')) {
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
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.subscription !== 'true') {
    await expect(page.locator(`td.product-total > span.woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subProdPrice ?? ''}`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`.subscription-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalSignUpFee ?? ''}`);
  }
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tr.shipping ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.shipping ul#shipping_method > li:nth-child(1) > label > .woocommerce-Price-amount.amount`)).or(page.locator(`tr.shipping ul#shipping_method > li:nth-child(1) > label`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  if ((() => { let country = vars.country
return country === "AU" })()) {
    await expect(page.locator(`tr.order-total:not(.recurring-total) > td > small > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { const country = vars.country

return country === "CA" })()) {
    await expect(page.locator(`tr.tax-rate:not(.recurring-total) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  if (vars.subscription === 'true') {
    await expect(page.locator(`tr.cart-subtotal.recurring-total > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringSubtotal ?? ''}`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`tr.shipping.recurring-total > td`).first()).toContainText(`${vars.recurringShipping ?? ''}`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if (vars.subscription === 'true' && vars.country === 'AU') {
    await expect(page.locator(`tr.order-total.recurring-total > td > small.includes_tax > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  if (vars.subscription === 'true' && vars.country === 'CA') {
    await expect(page.locator(`tr.tax-rate.recurring-total > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  {
    const _lbl = page.locator(`label[for="terms"]`).or(page.locator(`label[for="terms_acceptance"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms`).or(page.locator(`#terms_acceptance`)).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "First letter Capitalized" (688a0aeae5d3587e158f0193)
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

// GI: "Get price in Cart" (6887df882c245b961dce64cf)
export async function getPriceInCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod_desc = `${vars.prod_desc}`.replaceAll('–','-').toUpperCase()


return prod_desc }, vars);
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  vars.unitPrice = ((await page.locator(`td.product-price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  vars.subProdPrice = ((await page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.totalSignUpFee = ((await page.locator(`td.product-subtotal .subscription-details > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.subtotalPrice = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.shippingPrice = ((await page.locator(`#shipping_method > li:nth-child(1) > label > span > bdi`).or(page.locator(`#shipping_method > li:nth-child(1) > label`)).textContent()) ?? '').trim();
  vars.total = ((await page.locator(`tr.order-total:not(.recurring-total) > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  if (vars.country === 'AU') {
    vars.taxPrice = ((await page.locator(`tr.order-total:not(.recurring-total) > td > small.includes_tax > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (vars.country === 'CA') {
    vars.taxPrice = ((await page.locator(`table > tbody > tr.tax-rate:not(.recurring-total) > td > span`).textContent()) ?? '').trim();
  }
  vars.recurringSubtotal = ((await page.locator(`tr.cart-subtotal.recurring-total > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  vars.recurringTotal = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  if (vars.country === 'AU') {
    vars.recurringTax = ((await page.locator(`tr.order-total.recurring-total > td > small.includes_tax > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (vars.country === 'CA') {
    vars.recurringTax = ((await page.locator(`table > tbody > tr.tax-rate.recurring-total > td > span`).textContent()) ?? '').trim();
  }
  vars.recurringShipping = ((await page.locator(`tr.shipping.recurring-total > td > span`).or(page.locator(`tr.shipping.recurring-total > td`)).textContent()) ?? '').trim();
}

// GI: "Go to My Account & Check Order Details" (68824ab82c245b961d9fa9ef)
export async function goToMyAccountCheckOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await calculateBalanceTotal(page, vars);
  await page.locator(`xpath=//*[contains(text(),'My Account')]`).or(page.locator(`xpath=//a[contains(text(),'Account')]`)).filter({ visible: true }).first().click({ force: true });
  if (vars.country !== 'AU') {
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
  if (false) {
    await expect(page.locator(`.dashboard-box-content > ul > li`).or(page.locator(`div > div.dashboard-box.last-order > ul > li`)).first()).toContainText(`${vars.prod_desc ?? ''} × ${vars.qty ?? ''}`);
  }
  await expect(page.locator(`.dashboard-box-content > div:nth-of-type(1) > span`).or(page.locator(`div > div.dashboard-box.last-order > div:nth-child(2) > span`)).first()).toContainText(`#${vars.orderNumber ?? ''}`);
  await expect(page.locator(`div:nth-of-type(1) > strong`).first()).toContainText(`Processing`);
  await expect(page.locator(`.total > strong > .woocommerce-Price-amount.amount`).or(page.locator(`div.dashboard-box.last-order > div.dashboard-box-content > div.total > span:nth-child(2) > span`)).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.dashboard-box > a[href*="/my-account/orders/"]`).or(page.locator(`.dashboard-box-actions > a[href*="/my-account/orders/"]`)).first()).toContainText(`view all orders`);
  await expect(page.locator(`div.dashboard-box:nth-of-type(2) > p`).or(page.locator(`div.dashboard-box:nth-of-type(2) > .dashboard-box-content > p:nth-child(1)`)).first()).toContainText(`You have ${vars.balance ?? ''} points, which are now worth ${vars.balanceTotal ?? ''}.`);
  if (vars.subscription !== 'true') {
    await expect(page.locator(`.dashboard-box.subscriptions > p`).or(page.locator(`.dashboard-box.subscriptions > .dashboard-box-content > p`)).first()).toContainText(`You have no active subscriptions.`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`img.attachment-thumbnail`)).not.toHaveCount(0);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`figure > figcaption`).first()).toContainText(`${vars.qty ?? ''}`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`p:nth-of-type(1) > .woocommerce-Price-amount.amount`).or(page.locator(`div.dashboard-box.subscriptions > div.dashboard-box-content > div.total > span:nth-child(2) > span.woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`p:nth-of-type(2) > small`).or(page.locator(`div.dashboard-box.subscriptions > div.dashboard-box-content > div.order-subheader > span:nth-child(2)`)).first()).toContainText(`${vars.nextPay ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`.dashboard-box.addresses > p:nth-of-type(1)`).or(page.locator(`.dashboard-box.addresses > .dashboard-box-content > p:nth-of-type(1)`)).first()).toHaveText(`Edit
Shipping:
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`.dashboard-box.addresses > p:nth-of-type(1)`).or(page.locator(`.dashboard-box.addresses > .dashboard-box-content > p:nth-of-type(1)`)).first()).toHaveText(`Edit
Shipping:
${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`.dashboard-box.addresses > p:nth-of-type(2)`).or(page.locator(`.dashboard-box.addresses > .dashboard-box-content > p:nth-of-type(2)`)).first()).toHaveText(`Edit
Billing:
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`.dashboard-box.addresses > p:nth-of-type(2)`).or(page.locator(`.dashboard-box.addresses > .dashboard-box-content > p:nth-of-type(2)`)).first()).toHaveText(`Edit
Billing:
${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:first-child td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
  await expect(page.locator(`tr:first-child > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > span`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toContainText(`Processing`);
  if (false) {
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.toUpperCase();

return prod_desc }, vars);
  }
  await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
}

// GI: "Login" (6022b3fed2fb38677e5d7a9e)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`li > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`form.woocommerce-form.woocommerce-form-login.login`)).not.toHaveCount(0);
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`button[name="login"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-navigation`)).not.toHaveCount(0);
}

// GI: "Next Payment date" (688924a62c245b961d2c8de6)
export async function nextPaymentDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); /*let nextPay = `${vars.nextPay}`
nextPay = Date.parse(nextPay)
nextPay = new Date(nextPay)
let date = new Date()

let monthAssess = ( date.getMonth()+1 ) % 12 === nextPay.getMonth()
let yearAssess = 11 === date.getMonth() ? date.getYear() + 1 === nextPay.getYear() : date.getYear() === nextPay.getYear()

return monthAssess && date.getDate() === nextPay.getDate() && yearAssess*/

let nextPay = `${vars.nextPay}`;
const country = `${vars.country}`;

nextPay = Date.parse(nextPay);
nextPay = new Date(nextPay);

// Set time zone and locale based on country
let timeZone;
if (country === 'AU') {
  timeZone = 'Australia/Sydney';
} else if (country === 'CA') {
  timeZone = 'America/Toronto';
} else {
  timeZone = 'America/New_York';
}

const now = new Date();
const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use false for 24-hour format
});

const date = new Date(formatter.format(now));

return date.getDate() === nextPay.getDate() &&
       (date.getMonth() + 1) === nextPay.getMonth() &&
       date.getFullYear() === nextPay.getFullYear(); }, vars)).toBeTruthy();
}

// GI: "Place Order - New User - Backend" (6883d2d2e5d3587e159523ae)
export async function placeOrderNewUserBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.subscription === 'true') {
    vars.subscriptionNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.subscriptionNumber}`;
const number = str.match(/\d+/)[0];
return number }, vars);
  }
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  await adminLoginSkip2FA(page, vars);
  await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders`);
  await page.waitForLoadState('load');
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`))).not.toHaveCount(0);
  await expect(page.locator(`tr#order-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).or(page.locator(`tr#post-${vars.orderNumber ?? ''} > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await checkOrderDetailsInBackend(page, vars);
  if (vars.subscription === 'true') {
    await subscriptionBackend(page, vars);
  }
}

// GI: "Place Order - New User - Email" (68c17c205081f036c98a5ef4)
export async function placeOrderNewUserEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  await extractPassFromEmail(page, vars);
  if (vars.country === 'CA') {
    await page.locator(`xpath=//a[contains(text(), "Your No Pong Canada Order Confirmation")]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.country === 'AU') {
    await page.locator(`xpath=//a[contains(text(), "Your No Pong Order Confirmation - #${vars.orderNumber ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  }
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
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if (vars.discount === 'true') {
    await page.locator(`tfoot > tr:nth-of-type(${vars.discountIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.redeeming === 'true') {
    await page.locator(`tfoot > tr:nth-of-type(${vars.redeemedIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  }
  await expect(page.locator(`tr:nth-of-type(${vars.shippingIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tr:nth-of-type(${vars.shippingIndex ?? ''}) > td.td`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  if (vars.includeTax === 'false') {
    await expect(page.locator(`tr:nth-of-type(${vars.taxIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.includeTax === 'true') {
    await expect(page.locator(`td > small > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  await expect(page.locator(`tr:nth-of-type(${vars.paymentIndex ?? ''}) > td.td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(${vars.earnIndex ?? ''}) > td.td`).first()).toHaveText(`You've earned ${vars.earnPoints ?? ''} points`);
  await expect(page.locator(`tr:nth-of-type(${vars.noteIndex ?? ''}) > td.td`).first()).toHaveText(`Order Note for Testing this field`);
  if (vars.country === 'CA') {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  }
  await expect(page.locator(`td.filename`).first()).toContainText(`${vars.orderNumber ?? ''}.pdf`);
  if (vars.subscription === 'true') {
    await expect(page.locator(`table > tbody > tr > td > div > div:nth-child(6) > table > tbody > tr > td:nth-child(4) > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
}

// GI: "Place Order - New User - Refund" (6883d69d2c245b961d122deb)
export async function placeOrderNewUserRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  vars.refund = `true`;
  await adminLoginSkip2FA(page, vars);
  await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders`);
  await page.waitForLoadState('load');
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`))).not.toHaveCount(0);
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
  await calculateBalancePoints(page, vars);
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
  if (vars.country === 'CA') {
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
  await expect(page.locator(`div.wcpdf-data-fields:nth-of-type(2) > .wcpdf-data-fields-section.number-date > .read-only`).first()).toContainText(`Credit Note Number:`);
  await expect(page.locator(`div.wcpdf-data-fields:nth-of-type(2) > .wcpdf-data-fields-section.number-date > .read-only`).first()).toContainText(`Credit Note Date: ${vars.date ?? ''}`);
  await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = new RegExp(`Refunded ${total} – Refund ID: re_[a-zA-Z0-9]+ – Reason: Testing Refund`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
  if (vars.redeeming !== 'true') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = new RegExp(`Customer has been deducted ${vars.earnPoints} points. New balance is ${vars.balance} points.`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
  }
  if (vars.redeeming === 'true') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = new RegExp(`Customer has been deducted ${vars.earnPoints} points. New balance is ${vars.balance} points.`);
    return pattern.test(note);
}

// Select all <p> elements within ul.order_notes > li > div > p
const notes = Array.from<any>(document.querySelectorAll('ul.order_notes > li > div > p'));

// Check if any note matches the pattern
return Array.from<any>(notes).some(note => checkRefundNote(note.textContent)); }, vars)).toBeTruthy();
  }
}

// GI: "Place Order - New User - Refund Email" (6883d830e5d3587e159605f9)
export async function placeOrderNewUserRefundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(10000);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(${vars.totalIndex ?? ''}) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
}

// GI: "Place Order - Subscription" (68894eabe5d3587e155f11ab)
export async function placeOrderSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.email = `qa+gi_subs_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `${vars.email ?? ''}`;
  vars.redeeming = `false`;
  vars.coupon = `false`;
  vars.refund = `false`;
  await creditsVariables(page, vars);
  await addSubscriptionToCart(page, vars);
  await fillCheckout(page, vars);
  await fillCC(page, vars);
  await checkEarningPointsCartCheckout(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Join the Club")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await thankYouPage(page, vars);
  await checkOrderDetailsThankYouPageAndMyAccount(page, vars);
  await goToMyAccountCheckOrderDetails(page, vars);
}

// GI: "Registration" (6022b3fed2fb38677e5d7aa1)
export async function registration(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`li > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  vars.password = `fric2171Biot`;
  try { await page.locator(`input#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`input#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`input#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`input#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`button.woocommerce-Button.woocommerce-button.button.woocommerce-form-register__submit`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
}

// GI: "Stories Assertion" (6807971cfa62801db438a98b)
export async function storiesAssertion(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`#np-custom-checkout-modal > div > div > div.np-custom-checkout-story.active > h3`).first()).toBeVisible();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stories = Array.from<any>(document.querySelectorAll('#np-custom-checkout-modal > div > div > div.np-custom-checkout-story h3'));
let stories2 = [
  "We're  processing your order...  Don't press back!",
  "Freshness incoming!  Won't be long now...",
  "Have a victory dance?  Now’s the time to bust it out!",
  "You can tick this off the list!  Sit tight while we finalise your order"
];
let isMatch = true;

if (stories.length === 0) {
  console.error("No h3 elements found with the given selector!");
  isMatch = false;
} else if (stories.length !== stories2.length) {
  console.error("Mismatch in number of stories!");
  isMatch = false;
} else {
  for (let [index, story] of Array.from<any>(stories).entries()) {
    console.log(`Story ${index + 1}: ${story.textContent.trim()}`);
    if (story.textContent.trim() !== stories2[index]) {
      isMatch = false;
      break;
    }
  }
}

return isMatch
 }, vars)).toBeTruthy();
  await expect(page.locator(`#np-custom-checkout-modal > div > div > div.np-custom-checkout-story.active > h3`)).toHaveCount(0);
}

// GI: "Subscription - Backend" (688a17702c245b961d7542b7)
export async function subscriptionBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionNumber ?? ''}"]`)).not.toHaveCount(0);
  await expect(page.locator(`mark.order-status > span`).first()).toContainText(`Active`);
  await expect(page.locator(`#subscription_renewal_orders > div.inside > div > table > tbody > tr:nth-child(1) > td:nth-child(5) > span > span`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  await page.locator(`xpath=//a[contains(text(), "#${vars.subscriptionNumber ?? ''}")]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionNumber ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  if (vars.country === 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.stateComplete ?? ''} ${vars.zipCode ?? ''}`);
  }
  await expect(page.locator(`a[href*="mailto:qa+gi_subs_"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(3)`).first()).toContainText(`${vars.phone ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(3)`).first()).toHaveText(`Customer Provided Note:
Order Note for Testing this field`);
  await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if (vars.country === 'AU') {
    vars.recurringSubtotalWithOutTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.recurringSubtotal}`.replaceAll(',','').replace(`${vars.Symbol}`,'').trim())
const subtotalWithOutTax = (subtotal / 1.1).toFixed(2)

return `${vars.Symbol}`+subtotalWithOutTax }, vars);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringSubtotal ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringSubtotalWithOutTax ?? ''}`);
  }
  if (!vars.shippingPrice.includes('Lettermail (untracked)') && !vars.shippingPrice.includes('Regular') 
    && !vars.shippingPrice.includes('Free')) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.shippingPrice.includes('Lettermail (untracked)') || vars.shippingPrice.includes('Regular') 
    || vars.shippingPrice.includes('Free')) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringSubtotal ?? ''}`);
  }
  if (vars.country === 'AU') {
    await expect(page.locator(`tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringSubtotalWithOutTax ?? ''}`);
  }
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
}

// GI: "Subscription test - Renew" (688ab7dee5d3587e15b1b14d)
export async function subscriptionTestRenew(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  await adminLoginSkip2FA(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
  await page.locator(`a[href="admin.php?page=wc-orders--shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionNumber ?? ''}"] > strong`).filter({ visible: true }).first().click({ force: true });
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_debug_toggle_renewals`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_debug_toggle_renewals`); }
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`.stripe`)).not.toHaveCount(0);
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  vars.renewNumber = ((await page.locator(`#subscription_renewal_orders > div.inside > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a`).textContent()) ?? '').trim();
  vars.renewNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.renewNumber}`;
const number = str.match(/\d+/)[0];
return number }, vars);
  await expect(page.locator(`.woocommerce_subscriptions_related_orders > table > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Renewal Order`);
  await expect(page.locator(`tr:nth-of-type(1) > td:nth-of-type(5) > .amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  await page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.renewNumber ?? ''}"][aria-label="Edit order number ${vars.renewNumber ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  vars.total = `${vars.recurringTotal ?? ''}`;
  vars.taxPrice = `${vars.recurringTax ?? ''}`;
  vars.subtotalPrice = `${vars.recurringSubtotal ?? ''}`;
  vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); if (`${vars.recurringShipping}` === 'Free') {
    return '$0.00'
} else {
    return `${vars.recurringShipping}`
} }, vars);
  vars.orderNumber = `${vars.renewNumber ?? ''}`;
  await calculateEarningPoints(page, vars);
  await calculateBalancePoints(page, vars);
  await checkOrderDetailsInBackend(page, vars);
}

// GI: "Thank you page" (68824297e5d3587e153af240)
export async function thankYouPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`THANK YOU!
 
YOUR ORDER HAS BEEN RECEIVED.`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.username ?? ''}`);
  vars.orderNumber = ((await page.locator(`li.woocommerce-order-overview__order.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.total > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`li.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
  if (vars.subscription === 'true') {
    vars.subscriptionNumber = ((await page.locator(`a[href*="/my-account/view-subscription/"][aria-label*="View subscription number"]`).textContent()) ?? '').trim();
  }
  if (vars.subscription === 'true') {
    await expect(page.locator(`.woocommerce-order > p:nth-of-type(2)`).first()).toHaveText(`View the status of your subscription in your account.`);
  }
  if (vars.subscription === 'true') {
    vars.nextPay = ((await page.locator(`td.subscription-next-payment`).textContent()) ?? '').trim();
  }
  await calculateBalancePoints(page, vars);
  if (vars.subscription !== 'true') {
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.toUpperCase();

return prod_desc }, vars);
  }
}

// GI: "Uncheck shipping address checkbox" (663b8fe189e87fd839d54282)
export async function uncheckShippingAddressCheckbox(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementById("ship-to-different-address-checkbox").checked; }, vars)) {
    {
      const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "US - Home Slider Autoplay verification" (643ee40daf1e488d25bfb713)
export async function uSHomeSliderAutoplayVerification(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.entry-content > h2.has-text-align-center.has-text-color.wp-block-heading`).first()).toContainText(`you are our Heroes`);
  await page.screenshot({ fullPage: true });
  await expect(page.locator(`xpath=//*[@id="tns2-item1"]`)).not.toHaveCount(0);
  await page.waitForTimeout(12000);
  await expect(page.locator(`xpath=//*[@id="tns2-item5"]`)).not.toHaveCount(0);
  await page.screenshot({ fullPage: true });
}

// GI: "US - Home Slider Manual verification" (643dab7fd19bd3b458d4fdc7)
export async function uSHomeSliderManualVerification(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//button[contains(text(), "next")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//button[contains(text(), "next")]`).or(page.locator(`div[aria-label="Carousel Navigation"] > button[type="button"]:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#tns1-item3 > img.tns-lazy-img.loaded.tns-complete`)).not.toHaveCount(0);
}

// GI: "US - Site Country validation" (643d7587d19bd3b458c64003)
export async function uSSiteCountryValidation(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.label`).first()).toContainText(`US`);
}

// GI: "Wholesale login" (6462a57caf1e488d251eb81a)
export async function wholesaleLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.role === 'wholesale') {
    try { await page.locator(`#username`).first().fill(`qa+gi_wholesale@saucal.com`); } catch { await page.locator(`#username`).first().selectOption(`qa+gi_wholesale@saucal.com`); }
  }
  if (vars.role === 'bulk') {
    try { await page.locator(`#username`).first().fill(`qa+gi_wholesale@saucal.com`); } catch { await page.locator(`#username`).first().selectOption(`qa+gi_wholesale@saucal.com`); }
  }
  if (vars.role === 'wholesale') {
    try { await page.locator(`#password`).first().fill(`%AS2sS%DH$jO&fUgPrA2RGOW`); } catch { await page.locator(`#password`).first().selectOption(`%AS2sS%DH$jO&fUgPrA2RGOW`); }
  }
  if (vars.role === 'bulk') {
    try { await page.locator(`#password`).first().fill(`oxL2wi8f@lwQBlZnRdq8WIkj`); } catch { await page.locator(`#password`).first().selectOption(`oxL2wi8f@lwQBlZnRdq8WIkj`); }
  }
  await page.locator(`#customer_login > div.u-column1.col-1 > form > p:nth-child(3) button`).filter({ visible: true }).first().click({ force: true });
}
