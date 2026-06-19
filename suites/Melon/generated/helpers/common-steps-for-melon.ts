// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Common steps for Melon"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { extractUserFromEmail } from './common-steps-for-all-projects';

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

// GI: "Check country and currency" (6324d91773b124ed89a041ce)
export async function checkCountryAndCurrency(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`#.header-html2 > .header-html-inner > select[id="mo-country-dropdown"]`).or(page.locator(`select[id="mo-country-dropdown"]:nth-of-type(1)`)).first()).toContainText(`${vars.country ?? ''}`);
  try {
    await expect(page.locator(`div.site-container .header-html-inner > form[id="currency_converter"] > div > select[id="currency_switcher"].currency_switcher`).first()).toHaveText(`${vars.currency ?? ''}`);
  } catch { /* optional step: assertText */ }
}

// GI: "Close Popup" (6a107e890f1aedc97d9bdc92)
export async function closePopup(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`button.klaviyo-close-form`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "Login" (638e4473a67dec3a12adb1f7)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForLoadState('load');
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`#customer_login > div.u-column1.col-1 > form > p:nth-child(3) > button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(2)`)).not.toHaveCount(0);
}

// GI: "Register" (638e1e639034282736d973e5)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="reg_email"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#reg_email`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.waitForTimeout(500);
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  await page.locator(`button[name="register"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`.woocommerce-MyAccount-content > p:nth-of-type(2)`)).not.toHaveCount(0);
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Your account on Melon Optics")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`#body_content_inner > p:nth-child(3) > a`).or(page.locator(`#body_content_inner > div > p:nth-child(5) > a`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#password_1`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.pass ?? ''}`); }
  try { await page.locator(`#password_2`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`div.account-navigation-wrap > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout.menu-item > a`).filter({ visible: true }).first().click({ force: true });
}

// GI: "UpSell flow" (63ebbbad1b9923d1cb951071)
export async function upSellFlow(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.accept === "yes") {
    vars.price2 = ((await page.locator(`.wfocu-sale-price .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if (vars.accept === "yes") {
    vars.prod_desc2 = ((await page.locator(`h1.wfocu-product-title`).or(page.locator(`h2.wfocu-product-title`)).textContent()) ?? '').trim();
  }
  if (vars.accept === "yes") {
    vars.prod_desc2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc2}`
if(desc === "Diablo Clear Lens Pack (3 Lenses)") {
    desc = "Diablo Lens (mtb) - Clear"
}

return desc }, vars);
  }
  if (vars.accept === "yes") {
    vars.prod_desc2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc2}`
desc = desc.replaceAll("–","-")
return desc }, vars);
  }
  if (vars.accept === "yes") {
    await page.locator(`.wfocu-product-info-col > .wfocu-buy-block.wfocu-buy-block-style1 > .wfocu-buy-block-inner > .wfocu-product-bottom-sec.wfocu-text-center > div:nth-of-type(1) > a.wfocu_upsell.wfocu-button.wfocu-accept-button.wfocu-btn-full.no-effect > .wfocu-clearfix > .wfocu-text`).or(page.locator(`div > div > div > div.bwf-inner-col > div.bwf-btn-wrap.wfocu-accept-button.wp-block-wrap > a > span`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.accept === "yes") {
    {
      const _lbl = page.locator(`label[for="wfocuswal-content"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wfocuswal-content`).or(page.locator(`.woofunnels-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (vars.accept === "yes") {
    await expect(page.locator(`.wfocuswal-title`).or(page.locator(`.woofunnels-container`))).not.toHaveCount(0);
  }
  if (vars.accept === "yes") {
    await expect(page.locator(`.wfocuswal-title`).or(page.locator(`.woofunnels-container`))).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll('.wfocu-sale-price  .woocommerce-Price-amount.amount > bdi'))
return element.length !== 0 && `${vars.accept}` === "yes" }, vars)) {
    vars.price3 = ((await page.locator(`.wfocu-sale-price .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll('.wfocu-sale-price  .woocommerce-Price-amount.amount > bdi'))
return element.length !== 0 && `${vars.accept}` === "yes" }, vars)) {
    vars.prod_desc3 = ((await page.locator(`h1.wfocu-product-title`).or(page.locator(`h2.wfocu-product-title`)).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll('.wfocu-sale-price  .woocommerce-Price-amount.amount > bdi'))
return element.length !== 0 && `${vars.accept}` === "yes" }, vars)) {
    vars.prod_desc3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc3}`
desc = desc.replaceAll("–","-")
return desc }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll('.wfocu-sale-price  .woocommerce-Price-amount.amount > bdi'))
return element.length !== 0 && `${vars.accept}` === "yes" }, vars)) {
    await page.locator(`.wfocu-product-info-col > .wfocu-buy-block.wfocu-buy-block-style1 > .wfocu-buy-block-inner > .wfocu-product-bottom-sec.wfocu-text-center > div:nth-of-type(1) > a.wfocu_upsell.wfocu-button.wfocu-accept-button.wfocu-btn-full.no-effect > .wfocu-clearfix > .wfocu-text`).or(page.locator(`div > div > div > div.bwf-inner-col > div.bwf-btn-wrap.wfocu-accept-button.wp-block-wrap > a > span`)).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.wfocu-skip-offer-wrap > a, div > div > div > div.bwf-inner-col > div.bwf-btn-wrap.wfocu-link.wfocu-reject.wp-block-wrap > a > span'))
return `${vars.accept}` === "no" && element.length !== 0 }, vars)) {
    await page.locator(`div.wfocu-skip-offer-wrap > a`).or(page.locator(`div > div > div > div.bwf-inner-col > div.bwf-btn-wrap.wfocu-link.wfocu-reject.wp-block-wrap > a > span`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.accept === "no") {
    await page.waitForTimeout(3000);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.wfocu-skip-offer-wrap > a, div > div > div > div.bwf-inner-col > div.bwf-btn-wrap.wfocu-link.wfocu-reject.wp-block-wrap > a > span'))
return `${vars.accept}` === "no" && element.length !== 0 }, vars)) {
    await page.locator(`div.wfocu-skip-offer-wrap > a`).or(page.locator(`div > div > div > div.bwf-inner-col > div.bwf-btn-wrap.wfocu-link.wfocu-reject.wp-block-wrap > a > span`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.accept === "no") {
    await page.waitForTimeout(3000);
  }
  try {
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.wfocu-skip-offer-wrap > a, div > div > div > div.bwf-inner-col > div.bwf-btn-wrap.wfocu-link.wfocu-reject.wp-block-wrap > a > span'))
return element.length !== 0 }, vars)) {
      await page.locator(`div.wfocu-skip-offer-wrap > a`).or(page.locator(`div > div > div > div.bwf-inner-col > div.bwf-btn-wrap.wfocu-link.wfocu-reject.wp-block-wrap > a > span`)).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  try {
    await expect(page.locator(`#wfocuswal-content`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
}
