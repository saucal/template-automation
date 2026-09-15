// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Live - Talkbox Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';
import { _03SimpleProductPage } from '../helpers/template-woocommerce-tests';

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

test.describe('Live - Talkbox Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "street": "123 False Street",
    "city": "Miami",
    "state": "FL",
    "country": "US",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Testing Inc.",
    "phone": "6134564567",
    "zipCode": "33126",
    "street3": "123 false Shipping Street",
    "project": "talkbox",
    "stateComplete": "Florida",
    "countryComplete": "United States (US)",
    "Symbol": "$",
    "url": "https://talkbox.mom",
    "street2": "Of. 2",
    "street4": "Ap. 4",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.url}/` }, vars)).toBeTruthy();
    await expect(page.locator(`a[href="#BuyTalkBox"]`)).not.toHaveCount(0);
    await expect(page.locator(`a[href="/#understandgoals"]`)).not.toHaveCount(0);
    await expect(page.locator(`div#BuyTalkBox`)).not.toHaveCount(0);
    await expect(page.locator(`div#understandgoals`)).not.toHaveCount(0);
  });

  test('02 - Academy Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href*="/academy/"] > strong`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "German")]`).or(page.locator(`a[href*="/academygerman/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.site}` === `${vars.url}/academygerman/` }, vars)).toBeTruthy();
  });

  test('03 - Blog Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href*="/blog/"] > strong`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.site}` === `${vars.url}/blog/` }, vars)).toBeTruthy();
  });

  test('04 - Post page', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}/blog/foreign-language-first-day-of-school-2022-printable/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('05 - Landing Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="#BuyTalkBox"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div > a[href*="/p_landing/spanish/"`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('06 - Landing Page - Step 2', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}/p_landing/spanish/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="#BuyTalkBox"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.pc-landing-box > div.pc-landing-box__list > article:nth-of-type(2) > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.frequency = ((await page.locator(`article:nth-of-type(2) .pc-landing-box__title.pc-landing-box__title--colored`).textContent()) ?? '').trim();
  });

  test('07 - Landing Page - Step 3', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}/p_landing/spanish/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="#BuyTalkBox"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.pc-landing-box > div.pc-landing-box__list > article:nth-of-type(2) > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.pc-landing-box__list > article:nth-of-type(2) button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('08 - Checkout Page', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}/p_landing/spanish/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="#BuyTalkBox"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.pc-landing-box > div.pc-landing-box__list > article:nth-of-type(2) > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`div.pc-landing-box__list > article:nth-of-type(2) button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('13 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03SimpleProductPage(page, vars);
  });

});
