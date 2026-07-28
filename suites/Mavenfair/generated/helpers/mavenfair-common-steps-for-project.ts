// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Mavenfair - Common steps for project"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';

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

// GI: "Login" (6001e87ac5e34d38d8d5edd8)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`a[href*="/wp-login.php"].header-button`).or(page.locator(`a[href="/wp-login.php"]`)).or(page.locator(`#login-message > p > a`)).or(page.locator(`xpath=//a[contains(text(), "Log in")]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await expect(page.locator(`#loginform`)).not.toHaveCount(0);
  try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.pass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`img.avatar.avatar-100.photo`)).not.toHaveCount(0);
}

// GI: "Media button enabled" (680fcbe027a20ea152510391)
export async function mediaButtonEnabled(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve) => {
    let targetElement = document.querySelector<HTMLButtonElement>('div.supports-drag-drop:not([style*="display: none;"]) button.button.media-button');
    
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
}

// GI: "Registration" (6001e87ac5e34d38d8d5eddb)
export async function registration(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let vendor = vars.vendor
return vendor != "yes" })()) {
    await page.locator(`xpath=//a[contains(text(), "JOIN")]`).or(page.locator(`a[href*="/membership-checkout/?level=11"].header-button`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let vendor = vars.vendor
return vendor === "yes" })()) {
    await page.locator(`a[href*="/sell-handmade/"].header-button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let vendor = vars.vendor
return vendor === "yes" })()) {
    await page.locator(`a[href*="/membership-checkout/?level=7"] > button[type="button"].ubtn.ult-adjust-bottom-margin.ult-responsive.ubtn-large.ubtn-bottom-bg.none.ubtn-center > .ubtn-data.ubtn-text`).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#username`).first().fill(`${vars.userReg ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.userReg ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  try { await page.locator(`#password2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password2`).first().selectOption(`${vars.password ?? ''}`); }
  try { await page.locator(`#bemail`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#bemail`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#bconfirmemail`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#bconfirmemail`).first().selectOption(`${vars.username ?? ''}`); }
  await expect(page.locator(`#select2-country-container`).first()).toContainText(`${vars.countryComplete ?? ''}`);
  await page.locator(`xpath=//span[contains(text(), "Choose a province")]`).or(page.locator(`#select2-province-container > span`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[type="search"]`).first().fill(`Ontario`); } catch { await page.locator(`input[type="search"]`).first().selectOption(`Ontario`); }
  await page.locator(`input[type="search"]`).first().press('Enter');
  await page.locator(`input[name="tos"]`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="pmpro_btn-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#pmpro_btn-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.waitForLoadState('load');
  if ((() => { let vendor = vars.vendor
return vendor != "yes" })()) {
    await expect(page.locator(`.pmpro_section > p:nth-of-type(2)`).first()).toContainText(`You have successfully completed registration as a MavenFair Member`);
  }
}
