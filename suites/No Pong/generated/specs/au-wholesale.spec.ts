// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "AU - Wholesale"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI } from '../helpers/common-steps-for-all-projects';
import { emptyCart, wholesaleLogin } from '../helpers/no-pong-common-steps-for-project';

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

test.describe('AU - Wholesale', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "phone": "3059689789",
    "street3": "123 False Shipping",
    "countryComplete": "Australia",
    "Symbol": "$",
    "project": "nopong",
    "country": "AU",
    "state": "NSW",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "currency": "AUD",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipping`,
    "company": "Saucal Test",
    "company2": "Saucal Shipping",
    "street": "123 False Street",
    "city": "Sydney",
    "stateComplete": "New South Wales",
    "zipCode": "2000",
    "adminUser": "giAdmin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('17 - AU - Wholesale', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}wholesale-products/`);
    await page.waitForLoadState('load');
    vars.role = `wholesale`;
    await expect(page.locator(`h1.entry-title`)).not.toHaveCount(0);
    try { await page.locator(`#username`).first().fill(`qa+gi_wholesale@saucal.com`); } catch { await page.locator(`#username`).first().selectOption(`qa+gi_wholesale@saucal.com`); }
    try { await page.locator(`#password`).first().fill(`%AS2sS%DH$jO&fUgPrA2RGOW`); } catch { await page.locator(`#password`).first().selectOption(`%AS2sS%DH$jO&fUgPrA2RGOW`); }
    await page.locator(`#customer_login > div.u-column1.col-1 > form > p:nth-child(3) button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`WHOLESALE PRODUCTS`);
    await expect(page.locator(`div > div.nopong-products-grid-wrapper  > div > div.nopong-products-grid-products`).first()).toBeVisible();
    await expect(page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(1)`).first()).toBeVisible();
    await expect(page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(2)`).first()).toBeVisible();
    await expect(page.locator(`li:nth-of-type(3) > .description`).first()).toBeVisible();
    await expect(page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(4)`).first()).toBeVisible();
    await expect(page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(5)`).first()).toBeVisible();
    await expect(page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(6)`).first()).toBeVisible();
    await expect(page.locator(`.wp-block-handpicked-products > ul > li:nth-of-type(7)`)).not.toHaveCount(0);
    await expect(page.locator(`li:nth-of-type(8) > .price`).first()).toBeVisible();
    await expect(page.locator(`ul > li:nth-of-type(9)`).first()).toBeVisible();
    await expect(page.locator(`a[href*="?add-to-cart=95853"]`).first()).toContainText(`Add to cart`);
    await expect(page.locator(`ul > li:nth-of-type(10)`).first()).toBeVisible();
    await expect(page.locator(`h4.alignfull`).first()).toContainText(`CHECK OUT IMAGES, LOGOS, posters to print, FACT SHEETS AND SO MUCH MORE BELOW!`);
    await expect(page.locator(`a[href*="https://drive.google.com/drive/folders/"]`).first()).toHaveText(`WHOLESALE RESOURCE CENTRE`);
    await expect(page.locator(`.wp-block-group__inner-container > p.has-text-align-center:nth-of-type(1)`).first()).toBeVisible();
    await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--wholesale > a[href*="/wholesale-products/"]`).first()).toHaveText(`WHOLESALE PRODUCTS`);
    await page.locator(`xpath=//a[contains(text(), "Wholesale products")]`).or(page.locator(`a[href*="/wholesale-products/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`WHOLESALE PRODUCTS`);
  });

  test('18 - AU - Wholesale Place Order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}wholesale-products/`);
    await page.waitForLoadState('load');
    await wholesaleLogin(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let notEmpty = document.getElementsByClassName('count');
notEmpty = notEmpty[1].innerText;
notEmpty = Number(notEmpty);
return notEmpty > 0; }, vars)) {
      await emptyCart(page, vars);
    }
    vars.prodDesc = ((await page.locator(`li:nth-of-type(1) div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let str = `${vars.prodDesc}`;
let upperStr = str.toUpperCase();
upperStr = upperStr.replace('–','-')
return upperStr }, vars);
    await page.locator(`li:nth-of-type(1) a[href*='add-to-cart=']`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`xpath=//a[contains(text(), "Calculate shipping")]`).or(page.locator(`a[href="#"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button[name="calc_shipping"]`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`td > p`).first()).toHaveText(`Shipping to STEPNEY South Australia 5069.`);
    await page.locator(`xpath=//a[contains(text(), "← Continue shopping")]`).or(page.locator(`a[href*="/wholesale-products/"]`)).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc2 = ((await page.locator(`li:nth-of-type(4) div.wc-block-grid__product-title`).textContent()) ?? '').trim();
    vars.prodDesc2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let str = `${vars.prodDesc2}`;
let upperStr = str.toUpperCase();
upperStr = upperStr.replace('–','-')
return upperStr }, vars);
    await page.locator(`li:nth-of-type(4) a[href*='add-to-cart=']`).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const siteTitle = document.title;
if (siteTitle != "Cart • No Pong"){
    return true;
} }, vars)) {
      await page.locator(`#masthead > div ul > li > a`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name`).first()).toContainText(`${vars.prodDesc2 ?? ''}`);
    try { await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-quantity > .quantity > input[title="Qty"][type="number"].input-text.qty.text`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).first().fill(`13`); } catch { await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-quantity > .quantity > input[title="Qty"][type="number"].input-text.qty.text`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).first().selectOption(`13`); }
    await page.locator(`div .nopong-wc-table-wrapper`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    try { await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-quantity > .quantity > input[title="Qty"][type="number"].input-text.qty.text`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[2]`)).first().fill(`17`); } catch { await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-quantity > .quantity > input[title="Qty"][type="number"].input-text.qty.text`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[2]`)).first().selectOption(`17`); }
    await page.locator(`div .nopong-wc-table-wrapper`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`tr.shipping > td`)).not.toHaveCount(0);
    try { await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-quantity > .quantity > input[title="Qty"][type="number"].input-text.qty.text`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[2]`)).first().fill(`5`); } catch { await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-quantity > .quantity > input[title="Qty"][type="number"].input-text.qty.text`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[2]`)).first().selectOption(`5`); }
    await page.locator(`div .nopong-wc-table-wrapper`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    try { await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-quantity > .quantity > input[title="Qty"][type="number"].input-text.qty.text`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).first().fill(`9`); } catch { await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-quantity > .quantity > input[title="Qty"][type="number"].input-text.qty.text`).or(page.locator(`xpath=(//input[@class='input-text qty text'])[1]`)).first().selectOption(`9`); }
    await page.locator(`h1.entry-title`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`tr.npl-credits-granted`)).toHaveCount(0);
    await expect(page.locator(`.npl-tooltip`)).toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.entry-title`).first()).toHaveText(`CHECKOUT`);
    await blockUI(page, vars);
    await expect(page.locator(`tr.npl-credits-granted`)).toHaveCount(0);
    await expect(page.locator(`.npl-tooltip`)).toHaveCount(0);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / 28`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / 28`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-notice`).first()).toBeVisible();
    await expect(page.locator(`a[href*="href="/product/new-shelf-ready-tray-no-pong-cool-lavender-vegan/"]`).or(page.locator(`section.woocommerce-order-details > div > table > tbody > tr:nth-child(1) > td.woocommerce-table__product-name.product-name > a`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toHaveText(`× 9`);
    await expect(page.locator(`a[href*="/product/no-pong-bicarb-free-54-unit-carton/"]`).or(page.locator(`tr:nth-child(2) > td > a`)).first()).toHaveText(`${vars.prodDesc2 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toHaveText(`× 1`);
    await expect(page.locator(`xpath=//tr/th[contains(text(),'Points:')]`)).toHaveCount(0);
    await page.locator(`a[href*="/my-account/"].label`).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    if (false) {
      await expect(page.locator(`div.woocommerce-account-dashboard > div > div:nth-child(2) p:nth-child(1)`).or(page.locator(`div.woocommerce-account-dashboard > div > div:nth-child(2) > p`)).first()).toContainText(`You currently have no points. Earn some by making purchases to unlock future rewards.`);
    }
    await expect(page.locator(`div.woocommerce-account-dashboard > div > div:nth-child(2) p:nth-child(1)`).or(page.locator(`div.woocommerce-account-dashboard > div > div:nth-child(2) > p`)).first()).toContainText(`You have 0 points, which are now worth $0.00.`);
    await page.locator(`xpath=//a[contains(text(), "Loyalty Program")]`).or(page.locator(`a[href*="/my-account/loyalty/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.nopong-loyalty-credits .nopong-loyalty-value`).or(page.locator(`#post-8 > div > div > div > div:nth-child(3) > p > strong:nth-child(1)`)).first()).toContainText(`0`);
    await expect(page.locator(`.nopong-loyalty-credits-currency-value .woocommerce-Price-amount`).or(page.locator(`div > div > div > div:nth-child(3) > p > strong:nth-child(2) > span`)).first()).toHaveText(`$0.00`);
    await expect(page.locator(`.nopong-loyalty-referrals > p`).or(page.locator(`div > div > div > div:nth-child(4) > p`)).first()).toContainText(`Referrals are currently disabled for your account.`);
  });

});
