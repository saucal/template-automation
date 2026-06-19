// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "2M - Basic WooCommerce Tests - Order and switch"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { login } from '../helpers/2m-common-tests-for-suite';
import { blockUI, login, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';

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

test.describe('2M - Basic WooCommerce Tests - Order and switch', () => {

  const vars = new Proxy<Record<string, string>>({
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "street": "123 False Street",
    "Symbol": "$",
    "aim": "6ca64cf55317426785ba330a8e6b71b456655",
    "country": "US",
    "qty2": "1",
    "qty1": "2",
    "newQty1": "1",
    "qty5": "1",
    "newQty2": "2",
    "qty3": "1",
    "qty4": "1",
    "zipCode": "33126",
    "phone": "3050698796",
    "emailCC": "qa+gi_ccemail@saucal.com",
    "PONumber": "000-647657",
    "project": "2m",
    "countryComplete": "United States (US)",
    "password": process.env.PASSWORD ?? '',
    "email": "qa+gi_staging_user@saucal.com",
    "city": "Miami",
    "state": "FL",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('Place order - 01', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    await login(page, vars);
    await expect(page.locator(`select.wcpbc-currency-switcher`)).not.toHaveCount(0);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let select = document.querySelector<HTMLSelectElement>('select.wcpbc-currency-switcher');
let usdOption = Array.from<any>(select.options).find(option => option.getAttribute('data-currency') === 'USD' || option.text.trim() === 'USD');
if (usdOption) {
    select.value = usdOption.value;
    select.dispatchEvent(new Event('change'));
} }, vars);
    await expect(page.locator(`select.wcpbc-currency-switcher > option[data-currency='USD'][selected='selected']`)).not.toHaveCount(0);
    try { await page.locator(`form[action*="/product/user-license-premium/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().fill(`${vars.qty1 ?? ''}`); } catch { await page.locator(`form[action*="/product/user-license-premium/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().selectOption(`${vars.qty1 ?? ''}`); }
    try { await page.locator(`form[action*="/product/user-license-standard/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().fill(`${vars.qty2 ?? ''}`); } catch { await page.locator(`form[action*="/product/user-license-standard/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().selectOption(`${vars.qty2 ?? ''}`); }
    try { await page.locator(`form[action*="/product/white-label-mobile-app-ios/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().fill(`${vars.qty3 ?? ''}`); } catch { await page.locator(`form[action*="/product/white-label-mobile-app-ios/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().selectOption(`${vars.qty3 ?? ''}`); }
    try { await page.locator(`form[action*="/product/sql-sync/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().fill(`${vars.qty4 ?? ''}`); } catch { await page.locator(`form[action*="/product/sql-sync/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().selectOption(`${vars.qty4 ?? ''}`); }
    await page.locator(`li.mandatory-product:nth-of-type(1) > .product-custom-price > .totals-per-line`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    vars.priceItem1 = ((await page.locator(`li.mandatory-product:nth-of-type(1) > .product-custom-price > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.priceItem2 = ((await page.locator(`li.mandatory-product:nth-of-type(2) > .product-custom-price > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.priceItem3 = ((await page.locator(`li.optional-product:nth-of-type(4) > .product-custom-price > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.signUpItem3 = ((await page.locator(`li.optional-product:nth-of-type(4) > .subs-details > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.priceItem4 = ((await page.locator(`li.optional-product:nth-of-type(6) > .product-custom-price > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.recurringTotal = ((await page.locator(`.subtotal-prices > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.signUpFee = ((await page.locator(`.sign-up-fee-prices > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`.total-prices > .totals-per-line > .changes`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.priceItem1}`;
let unit2 = `${vars.priceItem2}`;
let unit3 = `${vars.priceItem3}`;
let signUpItem3 = `${vars.signUpItem3}`;
let unit4 = `${vars.priceItem4}`;
let subtotal = `${vars.recurringTotal}`;
let totalsignUp = `${vars.signUpFee}`
let total = `${vars.total}`;

unit = unit.replace(",","").trim();
unit2 = unit2.replace(",","").trim();
unit3 = unit3.replace(",","").trim();
signUpItem3 = signUpItem3.replace(",","").trim();
unit4 = unit4.replace(",","").trim();
subtotal = subtotal.replace(",","").trim();
totalsignUp = totalsignUp.replace(",","").trim();
total = total.replace(",","").trim();

unit = Number(unit.replace("$",""));
unit2 = Number(unit2.replace("$",""));
unit3 = Number(unit3.replace("$",""));
signUpItem3 = Number(signUpItem3.replace("$",""));
unit4 = Number(unit4.replace("$",""));
subtotal = Number(subtotal.replace("$",""));
totalsignUp = Number(totalsignUp.replace("$",""));
total = Number(total.replace("$",""));

let total2 = unit+unit2+unit3+unit4+signUpItem3;
total2 = Number(total2.toFixed(2));

let subtotal2 = unit+unit2+unit3+unit4;
subtotal2 = Number(subtotal2.toFixed(2));


return total === total2 && subtotal === subtotal2 && signUpItem3 === totalsignUp }, vars)).toBeTruthy();
    vars.prod_desc1 = ((await page.locator(`div.entry-content > div:nth-child(2) > div > div.custom-subscription-page > ul > li:nth-child(1) > div.component_title_wrapper.col-sm-7 > h4 > span.step_title`).textContent()) ?? '').trim();
    vars.prod_desc2 = ((await page.locator(`li.mandatory-product:nth-of-type(2) > .component_title_wrapper > h4.step_title_wrapper.component_title > .step_title`).textContent()) ?? '').trim();
    vars.prod_desc3 = ((await page.locator(`li.optional-product:nth-of-type(4) > .component_title_wrapper > h4.step_title_wrapper.component_title > .step_title`).textContent()) ?? '').trim();
    vars.prod_desc4 = ((await page.locator(`li.optional-product:nth-of-type(6) > .component_title_wrapper > h4.step_title_wrapper.component_title > .step_title`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="submit-all-products"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Confirm & Pay")]`).or(page.locator(`#submit-all-products`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await wooCommerceCheckoutTemplate(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const input = document.querySelector<HTMLInputElement>('input#aim');

return !input.value || input.value.trim() === '' }, vars)) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const input = document.querySelector<HTMLInputElement>('input#aim');
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
nativeInputValueSetter.call(input, '6ca64cf55317426785ba330a8e6b71b456655');
input.dispatchEvent(new Event('input', { bubbles: true })); }, vars);
    }
    await expect(page.locator(`tr.cart_item:nth-of-type(1) > td.product-name`).first()).toHaveText(`${vars.prod_desc1 ?? ''} - Monthly  × ${vars.qty1 ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(2) > td.product-name`).first()).toHaveText(`${vars.prod_desc2 ?? ''} - Monthly  × ${vars.qty2 ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(3) > td.product-name`).first()).toHaveText(`${vars.prod_desc3 ?? ''} - Monthly  × ${vars.qty3 ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(4) > td.product-name`).first()).toHaveText(`${vars.prod_desc4 ?? ''} - Monthly  × ${vars.qty4 ?? ''}`);
    vars.total1 = ((await page.locator(`tr.cart_item:nth-of-type(1) > td.product-total`).textContent()) ?? '').trim();
    vars.total2 = ((await page.locator(`tr.cart_item:nth-of-type(2) > td.product-total`).textContent()) ?? '').trim();
    vars.total3 = ((await page.locator(`tr.cart_item:nth-of-type(3) > td.product-total`).textContent()) ?? '').trim();
    vars.total4 = ((await page.locator(`tr.cart_item:nth-of-type(4) > td.product-total`).textContent()) ?? '').trim();
    vars.subtotalOrder = ((await page.locator(`td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.totalOrder = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function calculateExtraToPay(price, qty) {
    // Example cart item
    const productPrice = price / qty; // Price of the product
    const cartQuantity = qty;
 // Subscription interval (e.g., monthly = 1, quarterly = 3)

    // Get the number of days in the current month
    const daysInCycle = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    // Calculate the days until the next payment, assuming renewal is always on the 25th
    const daysUntilNextPayment = getDaysUntilNextPayment();

    // Calculate the prorated extra amount to pay
    const extraToPay = (Math.round((productPrice / daysInCycle) * daysUntilNextPayment *100)/100) * cartQuantity
    console.log(extraToPay)
    return extraToPay;
}

// Function to calculate the remaining days until the next 25th
function getDaysUntilNextPayment() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Set the next payment date to the 25th of the current or next month
    const nextPaymentDate = new Date(currentYear, currentMonth, 25);
    
    // If today is after the 25th, set the next payment date to the 25th of the next month
    if (today.getDate() > 25) {
        nextPaymentDate.setMonth(currentMonth + 1);
    }

    // Calculate the difference in days
    const differenceInTime = nextPaymentDate - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
    
    return differenceInDays;
}

let item1 = [vars.priceItem1, vars.qty1, `${vars.total1}`]
let item2 = [vars.priceItem2, vars.qty2, `${vars.total2}`]
let item3 = [vars.priceItem3, vars.qty3, `${vars.total3}`]
let item4 = [vars.priceItem4, vars.qty4, `${vars.total4}`]

let extra1 = calculateExtraToPay(item1[0], item1[1]);
let extra2 = calculateExtraToPay(item2[0], item2[1]);
let extra3 = (calculateExtraToPay(item3[0], item3[1]) + vars.signUpItem3);
let extra4 = calculateExtraToPay(item4[0], item4[1]);
let totalPay = Math.round( ( extra1 + extra2 + extra3 + extra4 ) * 100) / 100

console.log('totalpay: ', totalPay)

return '$'+totalPay.toFixed(2) === `${vars.subtotalOrder}` &&
    '$'+totalPay.toFixed(2) === `${vars.totalOrder}` &&
    (`\$${vars.priceItem1}  on the 25th of each month, $`+extra1.toFixed(2)+' for the current billing cycle').replaceAll(/\s/g, '').trim() === item1[2].replaceAll(/\s/g, '').trim() &&
    (`\$${vars.priceItem2}  on the 25th of each month, $`+extra2.toFixed(2)+' for the current billing cycle').replaceAll(/\s/g, '').trim() ===item2[2].replaceAll(/\s/g, '').trim() &&
    (`\$${vars.priceItem3}  on the 25th of each month and a \$${vars.signUpItem3} sign-up fee, $`+extra3.toFixed(2)+' for the current billing cycle').replaceAll(/\s/g, '').trim() === item3[2].replaceAll(/\s/g, '').trim() &&
    (`\$${vars.priceItem4}  on the 25th of each month, $`+extra4.toFixed(2)+' for the current billing cycle').replaceAll(/\s/g, '').trim() === item4[2].replaceAll(/\s/g, '').trim()
    
    
     }, vars)).toBeTruthy();
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.recurringTotal ?? ''}`);
    await expect(page.locator(`tr.order-total:nth-of-type(5) > td > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.recurringTotal ?? ''}`);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`1229`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`1229`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.totalOrder ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc1 ?? ''} - Monthly × ${vars.qty1 ?? ''}`);
    vars.item1Pay = ((await page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc2 ?? ''} - Monthly × ${vars.qty2 ?? ''}`);
    vars.item2Pay = ((await page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc3 ?? ''} - Monthly × ${vars.qty3 ?? ''}`);
    vars.item3Pay = ((await page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc4 ?? ''} - Monthly × ${vars.qty4 ?? ''}`);
    vars.item4Pay = ((await page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(4) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function calculateExtraToPay(price, qty) {
    // Example cart item
    const productPrice = price / qty; // Price of the product
    const cartQuantity = qty;
 // Subscription interval (e.g., monthly = 1, quarterly = 3)

    // Get the number of days in the current month
    const daysInCycle = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    // Calculate the days until the next payment, assuming renewal is always on the 25th
    const daysUntilNextPayment = getDaysUntilNextPayment();

    // Calculate the prorated extra amount to pay
    const extraToPay = (Math.round((productPrice / daysInCycle) * daysUntilNextPayment *100)/100) * cartQuantity

    return extraToPay;
}

// Function to calculate the remaining days until the next 25th
function getDaysUntilNextPayment() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Set the next payment date to the 25th of the current or next month
    const nextPaymentDate = new Date(currentYear, currentMonth, 25);
    
    // If today is after the 25th, set the next payment date to the 25th of the next month
    if (today.getDate() > 25) {
        nextPaymentDate.setMonth(currentMonth + 1);
    }

    // Calculate the difference in days
    const differenceInTime = nextPaymentDate - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
    
    return differenceInDays;
}

let item1 = [vars.priceItem1, vars.qty1]
let item2 = [vars.priceItem2, vars.qty2]
let item3 = [vars.priceItem3, vars.qty3]
let item4 = [vars.priceItem4, vars.qty4]
let extra1 = calculateExtraToPay(item1[0], item1[1]);
let extra2 = calculateExtraToPay(item2[0], item2[1]);
let extra3 = calculateExtraToPay(item3[0], item3[1]) + vars.signUpItem3;
let extra4 = calculateExtraToPay(item4[0], item4[1]);


    


return '$'+extra1.toFixed(2) === `${vars.item1Pay}` &&
        '$'+extra2.toFixed(2) === `${vars.item2Pay}` && 
        '$'+extra3.toFixed(2) === `${vars.item3Pay}` &&
        '$'+extra4.toFixed(2) === `${vars.item4Pay}`
    
     }, vars)).toBeTruthy();
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalOrder ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalOrder ?? ''}`);
    await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.recurringTotal ?? ''}`);
    await expect(page.locator(`td.subscription-status`).first()).toContainText(`Active`);
    await expect(page.locator(`div > div > div > section.woocommerce-order-details > p:nth-child(3)`).first()).toHaveText(`License Key:
${vars.aim ?? ''}`);
    await expect(page.locator(`div > div > div > section.woocommerce-order-details > p:nth-child(4)`).first()).toHaveText(`PO Number:
${vars.PONumber ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.username ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-subscription/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
    await expect(page.locator(`tr.order_item:nth-of-type(1) > td.product-name`).first()).toContainText(`${vars.prod_desc1 ?? ''} - Monthly × ${vars.qty1 ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-of-type(1) > td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.priceItem1 ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-of-type(2) > td.product-name`).first()).toContainText(`${vars.prod_desc2 ?? ''} - Monthly × ${vars.qty2 ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-of-type(2) > td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.priceItem2 ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-of-type(3) > td.product-name`).first()).toContainText(`${vars.prod_desc3 ?? ''} - Monthly × ${vars.qty3 ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-of-type(3) > td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.priceItem3 ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-of-type(4) > td.product-name`).first()).toContainText(`${vars.prod_desc4 ?? ''} - Monthly × ${vars.qty4 ?? ''}`);
    await expect(page.locator(`tr.order_item:nth-of-type(4) > td.product-total > .woocommerce-Price-amount.amount`).first()).toContainText(`$${vars.priceItem4 ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.recurringTotal ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.recurringTotal ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.username ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "History")]`).or(page.locator(`a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toContainText(`${vars.totalOrder ?? ''}`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Completed`);
    await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc1 ?? ''} - Monthly × ${vars.qty1 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.item1Pay ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc2 ?? ''} - Monthly × ${vars.qty2 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.item2Pay ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc3 ?? ''} - Monthly × ${vars.qty3 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.item3Pay ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc4 ?? ''} - Monthly × ${vars.qty4 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(4) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.item4Pay ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalOrder ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalOrder ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.username ?? ''}`);
  });

  test('Place order - 01 - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.goto(`${vars.startUrl ?? ''}wp-admin`);
    await page.waitForLoadState('load');
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.iedit.author-other.level-0.type-shop_order.hentry:nth-of-type(1) > td.order_total.column-order_total .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalOrder ?? ''}`);
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit / Debit Card`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
    await expect(page.locator(`div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(2) > td.total > span > bdi`)).first()).toHaveText(`${vars.totalOrder ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalOrder ?? ''}`);
  });

  test('Place order - 02 - Switching', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `no`;
    vars.username = `${vars.email ?? ''}`;
    await login(page, vars);
    await expect(page.locator(`div > div.custom-subscription-page > div.plan-settings > div.currency-selector > span`)).not.toHaveCount(0);
    try { await page.locator(`form[action*="/product/user-license-premium/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().fill(`${vars.newQty1 ?? ''}`); } catch { await page.locator(`form[action*="/product/user-license-premium/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().selectOption(`${vars.newQty1 ?? ''}`); }
    try { await page.locator(`form[action*="/product/user-license-standard/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().fill(`${vars.newQty2 ?? ''}`); } catch { await page.locator(`form[action*="/product/user-license-standard/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().selectOption(`${vars.newQty2 ?? ''}`); }
    try { await page.locator(`form[action*="/product/white-label-mobile-app-android/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().fill(`${vars.qty5 ?? ''}`); } catch { await page.locator(`form[action*="/product/white-label-mobile-app-android/"] > .single_variation_wrap > .woocommerce-variation-add-to-cart.variations_button > .quantity > input[name="quantity"][aria-label="Product quantity"][type="number"].input-text.qty.text`).first().selectOption(`${vars.qty5 ?? ''}`); }
    await page.locator(`li.mandatory-product:nth-of-type(1) > .product-custom-price > .totals-per-line`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    vars.newPriceItem1 = ((await page.locator(`li.mandatory-product:nth-of-type(1) > .product-custom-price > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.newPriceItem2 = ((await page.locator(`li.mandatory-product:nth-of-type(2) > .product-custom-price > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.priceItem5 = ((await page.locator(`li.optional-product:nth-of-type(3) > .product-custom-price > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.signUpItem5 = ((await page.locator(`li.optional-product:nth-of-type(3) > .subs-details > .totals-per-line > .changes`).textContent()) ?? '').trim();
    await expect(page.locator(`li.optional-product:nth-of-type(4) > .product-custom-price > .totals-per-line > .changes`).first()).toHaveText(`${vars.priceItem3 ?? ''}`);
    await expect(page.locator(`li.optional-product:nth-of-type(4) > .subs-details > .totals-per-line > .changes`).first()).not.toBeVisible();
    await expect(page.locator(`li.optional-product:nth-of-type(6) > .product-custom-price > .totals-per-line > .changes`).first()).toHaveText(`${vars.priceItem4 ?? ''}`);
    vars.newRecurringTotal = ((await page.locator(`.subtotal-prices > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.newSignUpFee = ((await page.locator(`.sign-up-fee-prices > .totals-per-line > .changes`).textContent()) ?? '').trim();
    vars.newTotal = ((await page.locator(`.total-prices > .totals-per-line > .changes`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = Number(`${vars.newPriceItem1}`.replace(",","").replace("$","").trim());
let unit2 = Number(`${vars.newPriceItem2}`.replace(",","").replace("$","").trim());
let unit3 = Number(`${vars.priceItem3}`.replace(",","").replace("$","").trim());
let unit4 = Number(`${vars.priceItem4}`.replace(",","").replace("$","").trim());
let subtotal = Number(`${vars.newRecurringTotal}`.replace(",","").replace("$","").trim());
let totalsignUp = Number(`${vars.newSignUpFee}`.replace(",","").replace("$","").trim());
let total = Number(`${vars.newTotal}`.replace(",","").replace("$","").trim());
let unit5 = Number(`${vars.priceItem5}`.replace(",","").replace("$","").trim());
let signUpItem5 = Number(`${vars.signUpItem5}`.replace(",","").replace("$","").trim());

let total2 = unit+unit2+unit3+unit4+unit5+signUpItem5;
total2 = Number(total2.toFixed(2));

let subtotal2 = unit+unit2+unit3+unit4+unit5;
subtotal2 = Number(subtotal2.toFixed(2));


return total === total2 && subtotal === subtotal2 && signUpItem5 === totalsignUp }, vars)).toBeTruthy();
    vars.prod_desc5 = ((await page.locator(`li.optional-product:nth-of-type(3) > .component_title_wrapper > h4.step_title_wrapper.component_title > .step_title`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="submit-all-products"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Confirm & Pay")]`).or(page.locator(`#submit-all-products`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await expect(page.locator(`tr.cart_item:nth-of-type(1) > td.product-name`).first()).toHaveText(`${vars.prod_desc1 ?? ''} - Monthly  × ${vars.newQty1 ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(2) > td.product-name`).first()).toHaveText(`${vars.prod_desc2 ?? ''} - Monthly  × ${vars.newQty2 ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(3) > td.product-name`).first()).toHaveText(`${vars.prod_desc5 ?? ''} - Monthly  × ${vars.qty5 ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(4) > td.product-name`).first()).toHaveText(`${vars.prod_desc3 ?? ''} - Monthly  × ${vars.qty3 ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(5) > td.product-name`).first()).toHaveText(`${vars.prod_desc4 ?? ''} - Monthly  × ${vars.qty4 ?? ''}`);
    vars.total1 = ((await page.locator(`tr.cart_item:nth-of-type(1) > td.product-total`).textContent()) ?? '').trim();
    vars.total2 = ((await page.locator(`tr.cart_item:nth-of-type(2) > td.product-total`).textContent()) ?? '').trim();
    vars.total5 = ((await page.locator(`tr.cart_item:nth-of-type(3) > td.product-total`).textContent()) ?? '').trim();
    vars.total3 = ((await page.locator(`tr.cart_item:nth-of-type(4) > td.product-total`).textContent()) ?? '').trim();
    vars.total4 = ((await page.locator(`tr.cart_item:nth-of-type(5) > td.product-total`).textContent()) ?? '').trim();
    vars.subtotalOrder = ((await page.locator(`td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.totalOrder = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function calculateExtraToPay(price, qty) {
    // Example cart item
    const productPrice = price / qty; // Price of the product
    const cartQuantity = qty;
 // Subscription interval (e.g., monthly = 1, quarterly = 3)

    // Get the number of days in the current month
    const daysInCycle = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    // Calculate the days until the next payment, assuming renewal is always on the 25th
    const daysUntilNextPayment = getDaysUntilNextPayment();

    // Calculate the prorated extra amount to pay
    const extraToPay = (Math.round((productPrice / daysInCycle) * daysUntilNextPayment *100)/100) * cartQuantity
    console.log(extraToPay)
    return extraToPay;
}

// Function to calculate the remaining days until the next 25th
function getDaysUntilNextPayment() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Set the next payment date to the 25th of the current or next month
    const nextPaymentDate = new Date(currentYear, currentMonth, 25);
    
    // If today is after the 25th, set the next payment date to the 25th of the next month
    if (today.getDate() > 25) {
        nextPaymentDate.setMonth(currentMonth + 1);
    }

    // Calculate the difference in days
    const differenceInTime = nextPaymentDate - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
    
    return differenceInDays;
}

let item1 = [vars.newPriceItem1, vars.newQty1, `${vars.total1}`]
let item2 = [vars.newPriceItem2, vars.newQty2, `${vars.total2}`]
let item3 = [vars.priceItem3, vars.qty3, `${vars.total3}`]
let item4 = [vars.priceItem4, vars.qty4, `${vars.total4}`]
let item5 = [vars.priceItem5, vars.qty5, `${vars.total5}`]

let extra2 = (calculateExtraToPay(item2[0], item2[1]) / vars.newQty2) * Math.abs(vars.qty2-vars.newQty2);
let extra5 = (calculateExtraToPay(item5[0], item5[1]) + vars.signUpItem5);
let totalPay = Math.round( ( extra2 + extra5 ) * 100) / 100

console.log('totalpay: ', totalPay)

return '$'+totalPay.toFixed(2) === `${vars.subtotalOrder}` &&
    '$'+totalPay.toFixed(2) === `${vars.totalOrder}` &&
    (`\$${vars.newPriceItem1}  on the 25th of each month (Downgrade)`).replaceAll(/\s/g, '').trim() === item1[2].replaceAll(/\s/g, '').trim() &&
    (`\$${vars.newPriceItem2}  on the 25th of each month, $`+extra2.toFixed(2)+' for the current billing cycle (Upgrade)').replaceAll(/\s/g, '').trim() ===item2[2].replaceAll(/\s/g, '').trim() &&
    (`\$${vars.priceItem3}  on the 25th of each month (Crossgrade)`).replaceAll(/\s/g, '').trim() === item3[2].replaceAll(/\s/g, '').trim() &&
    (`\$${vars.priceItem4}  on the 25th of each month (Crossgrade)`).replaceAll(/\s/g, '').trim() === item4[2].replaceAll(/\s/g, '').trim() &&
    (`\$${vars.priceItem5}  on the 25th of each month and a \$${vars.signUpItem5} sign-up fee, $`+extra5.toFixed(2)+' for the current billing cycle').replaceAll(/\s/g, '').trim() === item5[2].replaceAll(/\s/g, '').trim()
    
    
     }, vars)).toBeTruthy();
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(4) > td > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(5) > td > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
    await expect(page.locator(`tr.order-total:nth-of-type(6) > td > strong > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
    await expect(page.locator(`tr.order-total:nth-of-type(7) > td > strong > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const input = document.querySelector<HTMLInputElement>('input#aim');

return !input.value || input.value.trim() === '' }, vars)) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const input = document.querySelector<HTMLInputElement>('input#aim');
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
nativeInputValueSetter.call(input, '6ca64cf55317426785ba330a8e6b71b456655');
input.dispatchEvent(new Event('input', { bubbles: true })); }, vars);
    }
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    await placeOrderElement(page, vars);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  });

  test('Place order - 03 - Refund by Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.goto(`${vars.startUrl ?? ''}wp-admin`);
    await page.waitForLoadState('load');
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
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.totalOrder ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.totalOrder ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalOrder ?? ''}`);
    try {
      await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Refunded ${vars.totalOrder ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
  });

});
