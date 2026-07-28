// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Elka - Common steps for suite"
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

// GI: "Fill CC Paypal" (6a2b424c2b101e5b0ee170d7)
export async function fillCCPaypal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="payment_method_ppcp-card-button-gateway"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_ppcp-card-button-gateway`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`.paypal-button.paypal-button-number-0`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  await blockUI(page, vars);
  await expect(page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`iframe[title="paypal_card_form"]`).first().contentFrame().locator(`#credit-card-number`)).not.toHaveCount(0);
  try { await page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`iframe[title="paypal_card_form"]`).first().contentFrame().locator(`#credit-card-number`).first().fill(`4462603040971339`); } catch { await page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`iframe[title="paypal_card_form"]`).first().contentFrame().locator(`#credit-card-number`).first().selectOption(`4462603040971339`); }
  try { await page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`iframe[title="paypal_card_form"]`).first().contentFrame().locator(`#expiry-date`).first().fill(`11/28`); } catch { await page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`iframe[title="paypal_card_form"]`).first().contentFrame().locator(`#expiry-date`).first().selectOption(`11/28`); }
  try { await page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`iframe[title="paypal_card_form"]`).first().contentFrame().locator(`#credit-card-security`).first().fill(`139`); } catch { await page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`iframe[title="paypal_card_form"]`).first().contentFrame().locator(`#credit-card-security`).first().selectOption(`139`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[title='PayPal-card']`).first().contentFrame().locator(`iframe[title="paypal_card_form"]`).first().contentFrame().locator(`#submit-button`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try {
    await expect(page.locator(`.paypal-checkout-sandbox`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`iframe.paypal-checkout-sandbox-iframe iframe.component-frame .loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`iframe.paypal-checkout-sandbox-iframe iframe.component-frame .loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  await blockUI(page, vars);
}

// GI: "Login" (608822ed4658f2361a7ee31b)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "My account")]`).or(page.locator(`a[href*="/my-account/?c=72e1ba2726d6"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`#menu-top-navigation-header > .menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.fusion-dropdown-menu > a[href="#"] > .menu-text`).first().hover();
  await page.locator(`.menu-item > a[href*="/orders/"] > span`).filter({ visible: true }).first().click({ force: true });
}

// GI: "PayPal elka" (6a2b2a3e0f1aedc97d40f705)
export async function payPalElka(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[title="PayPal"]`).first().contentFrame().locator(`.paypal-button.paypal-button-number-0`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[title*="PayPal"]`).first().contentFrame().locator(`.paypal-button.paypal-button-number-0`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try {
    await expect(page.locator(`.loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await page.locator(`xpath=//a[contains(text(), "Click to Continue")]`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#backToInputEmailLink') }, vars)) {
    {
      const _lbl = page.locator(`label[for="backToInputEmailLink"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#backToInputEmailLink`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector<HTMLAnchorElement>('a.btn') }, vars)) {
    await page.locator(`xpath=//a[contains(text(), "Iniciar sesión")]`).or(page.locator(`a.btn`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`input#email`).or(page.locator(`input[name='login_email']`)).or(page.locator(`input#login_email`)).first().fill(``); } catch { await page.locator(`input#email`).or(page.locator(`input[name='login_email']`)).or(page.locator(`input#login_email`)).first().selectOption(``); }
  try { await page.locator(`input#email`).or(page.locator(`input[name='login_email']`)).or(page.locator(`input#login_email`)).first().fill(`${vars.payPalUser ?? ''}`); } catch { await page.locator(`input#email`).or(page.locator(`input[name='login_email']`)).or(page.locator(`input#login_email`)).first().selectOption(`${vars.payPalUser ?? ''}`); }
  await page.locator(`button#btnNext`).or(page.locator(`button[name='btnNext']`)).or(page.locator(`xpath=//button[contains(text(),'Next')]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`div.lockIcon`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`div.lockIcon`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await page.locator(`xpath=//a[contains(text(),'Log in with a password instead')]`).or(page.locator(`xpath=//button[contains(text(),'Use Password Instead')]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try { await page.locator(`div > input#password`).or(page.locator(`input[name='login_password']`)).first().fill(`${vars.payPalPass ?? ''}`); } catch { await page.locator(`div > input#password`).or(page.locator(`input[name='login_password']`)).first().selectOption(`${vars.payPalPass ?? ''}`); }
  await page.locator(`button[data-atomic-wait-intent='Submit_Password']`).or(page.locator(`button#btnLogin`)).or(page.locator(`button[name='btnLogin']`)).or(page.locator(`xpath=//button[contains(text(), "Log In")][1]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`div.lockIcon`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`div.lockIcon`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  {
    const _lbl = page.locator(`label[for="payment-submit-btn"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`[data-testid="submit-button-initial"]`).or(page.locator(`xpath=//button[contains(text(), "Complete Purchase")]`)).or(page.locator(`#payment-submit-btn`)).or(page.locator(`#one-time-cta > div > div > div.pe-2`)).or(page.locator(`xpath=//button[@id='one-time-cta']/div/div/div[contains(text(), "Pay")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.waitForTimeout(2000);
  try {
    await expect(page.locator(`.Spinner_spinner_2t_Ob`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`)).or(page.locator(`div.lockIcon`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.Spinner_spinner_2t_Ob`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`)).or(page.locator(`div.lockIcon`))).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForLoadState('load');
  await blockUI(page, vars);
}
