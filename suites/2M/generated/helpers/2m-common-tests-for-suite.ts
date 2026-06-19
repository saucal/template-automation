// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "2M - Common tests for suite"
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

// GI: "Login" (68a33bf5753c2677767eb934)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    vars.emailUser = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+?\w+[^@]/g;
const str = `${vars.username}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  } catch { /* optional step: extractEval */ }
  if ((() => { let admin = vars.admin
return admin === "yes" })()) {
    await page.goto(`${vars.startUrl ?? ''}wp-admin`);
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
  try {
    if ((() => { let admin = vars.admin
return admin === "yes" })()) {
      await expect(page.locator(`#adminmenumain`)).not.toHaveCount(0);
    }
  } catch { /* optional step: assertElementPresent */ }
  if ((() => { let admin = vars.admin
return admin != "yes" })()) {
    try { await page.locator(`#username`).or(page.locator(`input[name="username"]`)).or(page.locator(`div.lwa-username > input`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).or(page.locator(`input[name="username"]`)).or(page.locator(`div.lwa-username > input`)).first().selectOption(`${vars.username ?? ''}`); }
  }
  if ((() => { let admin = vars.admin
return admin != "yes" })()) {
    try { await page.locator(`#password`).or(page.locator(`input[name="password"]`)).or(page.locator(`div.lwa-password > input`)).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).or(page.locator(`input[name="password"]`)).or(page.locator(`div.lwa-password > input`)).first().selectOption(`${vars.password ?? ''}`); }
  }
  if ((() => { let admin = vars.admin
return admin != "yes" })()) {
    await page.locator(`button[name="login"]`).or(page.locator(`input.button-primary[value="Log In"]`)).filter({ visible: true }).first().click({ force: true });
  }
}
