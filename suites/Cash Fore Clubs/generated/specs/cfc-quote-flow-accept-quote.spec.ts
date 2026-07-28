// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "CFC - Quote flow - Accept quote"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail, login, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';

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

test.describe('CFC - Quote flow - Accept quote', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "site": "https://cashforeclubs-staging.mystagingwebsite.com/",
    "project": "cashForeClub",
    "street": "123 False Street",
    "street2": "Ap. 4",
    "city": "London",
    "county": "Greater London",
    "zipCode": "E1 6AN",
    "phone": "1231231233",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Shipping Inc.",
    "street3": "234 False Shipping",
    "street4": "5th Floor",
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "£",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Test Inc.",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Create Seller account', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await uRLOfCurrentPage(page, vars);
    await page.locator(`xpath=//span[contains(text(), "Selling")]`).first().hover();
    await page.locator(`a[href*="quotes/"] > span`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`#input_6_1_3`).first().fill(`QA`); } catch { await page.locator(`#input_6_1_3`).first().selectOption(`QA`); }
    try { await page.locator(`#input_6_1_6`).first().fill(`Seller`); } catch { await page.locator(`#input_6_1_6`).first().selectOption(`Seller`); }
    vars.username = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
    vars.customerLogin = `${vars.username ?? ''}`;
    try { await page.locator(`#input_6_2`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#input_6_2`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`#input_6_2_2`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#input_6_2_2`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`#input_6_6_1`).first().fill(`123 False Street`); } catch { await page.locator(`#input_6_6_1`).first().selectOption(`123 False Street`); }
    try { await page.locator(`#input_6_6_2`).first().fill(`Ap. 4`); } catch { await page.locator(`#input_6_6_2`).first().selectOption(`Ap. 4`); }
    try { await page.locator(`#input_6_6_3`).first().fill(`London`); } catch { await page.locator(`#input_6_6_3`).first().selectOption(`London`); }
    try { await page.locator(`#input_6_6_5`).first().fill(`E1 6AN`); } catch { await page.locator(`#input_6_6_5`).first().selectOption(`E1 6AN`); }
    try { await page.locator(`#input_6_6_6`).first().fill(`United Kingdom`); } catch { await page.locator(`#input_6_6_6`).first().selectOption(`United Kingdom`); }
    vars.seller = `Seller${vars.alphanumeric ?? ''}`;
    try { await page.locator(`#input_6_3`).first().fill(`${vars.seller ?? ''}`); } catch { await page.locator(`#input_6_3`).first().selectOption(`${vars.seller ?? ''}`); }
    try { await page.locator(`#input_6_4`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#input_6_4`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#input_6_4_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#input_6_4_2`).first().selectOption(`${vars.password ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="gform_submit_button_6"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_6`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#gform_confirmation_message_6`).first()).toContainText(`Thank you for registering! You should receive an email from us shortly containing your account information.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "${vars.seller ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="${vars.site ?? ''}?gfur_activation="]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#content > h2`).first()).toContainText(`Your account is now active!`);
    await page.locator(`a[href*="/my-account/"] > .icon-wrapper > svg.w-6.h-6`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Selling")]`).or(page.locator(`.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.visible > a.cg-menu-link.main-menu-link > span`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/sell-your-clubs/"] > span`).filter({ visible: true }).first().click({ force: true });
  });

  test('02 - Sell your clubs', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Selling")]`).first().hover();
    await page.locator(`a[href*="/sell-your-clubs/"] > span`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`input[name="log"]`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`input[name="log"]`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`input[name="pwd"]`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`input[name="pwd"]`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`button[name="wp-submit"]`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="input_5_3"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_3`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_3`).first().fill(`Irons`); } catch { await page.locator(`#input_5_3`).first().selectOption(`Irons`); }
    {
      const _lbl = page.locator(`label[for="input_5_6"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_6`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_6`).first().fill(`Afinity`); } catch { await page.locator(`#input_5_6`).first().selectOption(`Afinity`); }
    {
      const _lbl = page.locator(`label[for="input_5_5"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_5`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_5`).first().fill(`Test Accept`); } catch { await page.locator(`#input_5_5`).first().selectOption(`Test Accept`); }
    {
      const _lbl = page.locator(`label[for="gform_next_button_5_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_next_button_5_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="input_5_4"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_4`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_4`).first().fill(`Flighted`); } catch { await page.locator(`#input_5_4`).first().selectOption(`Flighted`); }
    {
      const _lbl = page.locator(`label[for="input_5_7"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_7`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_7`).first().fill(`Right`); } catch { await page.locator(`#input_5_7`).first().selectOption(`Right`); }
    {
      const _lbl = page.locator(`label[for="input_5_8"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_8`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_8`).first().fill(`Steel`); } catch { await page.locator(`#input_5_8`).first().selectOption(`Steel`); }
    {
      const _lbl = page.locator(`label[for="input_5_9"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_9`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_9`).first().fill(`Mens`); } catch { await page.locator(`#input_5_9`).first().selectOption(`Mens`); }
    {
      const _lbl = page.locator(`label[for="gform_next_button_5_10"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_next_button_5_10`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="input_5_15"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_15`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_15`).first().fill(`4`); } catch { await page.locator(`#input_5_15`).first().selectOption(`4`); }
    {
      const _lbl = page.locator(`label[for="input_5_14"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_14`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_14`).first().fill(`3`); } catch { await page.locator(`#input_5_14`).first().selectOption(`3`); }
    {
      const _lbl = page.locator(`label[for="input_5_16"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_16`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_16`).first().fill(`4`); } catch { await page.locator(`#input_5_16`).first().selectOption(`4`); }
    {
      const _lbl = page.locator(`label[for="gform_next_button_5_17"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_next_button_5_17`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="input_5_18"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_18`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_18`).first().fill(`Yes`); } catch { await page.locator(`#input_5_18`).first().selectOption(`Yes`); }
    {
      const _lbl = page.locator(`label[for="input_5_19"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_19`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_19`).first().fill(`N/A`); } catch { await page.locator(`#input_5_19`).first().selectOption(`N/A`); }
    {
      const _lbl = page.locator(`label[for="input_5_20"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_20`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_20`).first().fill(`Additioanl Info Test`); } catch { await page.locator(`#input_5_20`).first().selectOption(`Additioanl Info Test`); }
    {
      const _lbl = page.locator(`label[for="gform_next_button_5_21"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_next_button_5_21`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#gform_multifile_upload_5_22 > div > input`).first().fill(`https://ghostinspector-prod.s3.amazonaws.com/uploads/ad1e0c9d-3810-4ade-a87c-ed13beebeee8.jpg`); } catch { await page.locator(`#gform_multifile_upload_5_22 > div > input`).first().selectOption(`https://ghostinspector-prod.s3.amazonaws.com/uploads/ad1e0c9d-3810-4ade-a87c-ed13beebeee8.jpg`); }
    {
      const _lbl = page.locator(`label[for="gform_next_button_5_23"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_next_button_5_23`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="input_5_24"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_5_24`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_5_24`).first().fill(`Drop off in-store`); } catch { await page.locator(`#input_5_24`).first().selectOption(`Drop off in-store`); }
    {
      const _lbl = page.locator(`label[for="gform_submit_button_5"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_5`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`h1.elementor-size-default`).first()).toContainText(`Seller Dashboard`);
    await expect(page.locator(`.elementor-element.elementor-element-f90dfba > .elementor-widget-container > .jet-listing > div > div`)).not.toHaveCount(0);
    await expect(page.locator(`.elementor-element.e-con-full.e-con.e-parent.e-lazyloaded > .elementor-element.elementor-element-45f40b8.e-con-full.e-con.e-child > .elementor-element.elementor-element-1f85aced.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toHaveText(`*NEW QUOTES*`);
  });

  test('03 - 01 - Admin Dashboard', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.goto(`${vars.site ?? ''}admin-dashboard/`);
    await page.waitForLoadState('load');
    await expect(page.locator(`div:nth-of-type(1) > .elementor > .elementor-element.e-con-full.e-con.e-parent.e-lazyloaded > .elementor-element.elementor-element-45f40b8.e-con-full.e-con.e-child > .elementor-element.elementor-element-1f85aced.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`*NEW QUOTES*`);
    await page.locator(`a[href*='/clubs/afinity-test-accept'] > span > span.elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`*NEW QUOTES*`);
    await expect(page.locator(`.elementor-element.elementor-element-6e07fda > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`Irons`);
    await expect(page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(2) > div.elementor-element.e-con-full.e-con.e-child:nth-of-type(2) > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`Afinity`);
    await expect(page.locator(`.elementor-element.elementor-element-61ffd40 > div.elementor-element.e-con-full.e-con.e-child:nth-of-type(2) > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`Test Accept`);
    await expect(page.locator(`.elementor-element.elementor-element-03ab7a2 > .elementor-widget-container`).first()).toContainText(`Flighted`);
    await expect(page.locator(`.elementor-element.elementor-element-c7f9df1 > div.elementor-element.e-con-full.e-con.e-child:nth-of-type(2) > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`Steel`);
    await expect(page.locator(`.elementor-element.elementor-element-c11db8b > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`Right`);
    await expect(page.locator(`.elementor-element.elementor-element-5a58e8c > .elementor-widget-container`).first()).toContainText(`Mens`);
    await expect(page.locator(`.elementor-element.elementor-element-04f1a36 > .elementor-widget-container`).first()).toContainText(`4`);
    await expect(page.locator(`.elementor-element.elementor-element-ad5d5f0 > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`3`);
    await expect(page.locator(`.elementor-element.elementor-element-b8c6a5d > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`4`);
    await expect(page.locator(`.elementor-element.elementor-element-9af11d2 > .elementor-element.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`NA`);
    await expect(page.locator(`.elementor-element.elementor-element-12c8deb > .elementor-widget-container`).first()).toContainText(`N/A`);
    await expect(page.locator(`.elementor-element.elementor-widget__width-inherit > .elementor-widget-container`).first()).toContainText(`Additioanl Info Test`);
    try { await page.locator(`#kwfbidval`).first().fill(`99`); } catch { await page.locator(`#kwfbidval`).first().selectOption(`99`); }
    {
      const _lbl = page.locator(`label[for="kwfbidbtn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#kwfbidbtn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.kwfbidsmade > li.me:nth-of-type(1)`).first()).toContainText(`£ 99`);
    vars.expirationDay = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const today = new Date();
const expirationDate = new Date(today);
expirationDate.setDate(today.getDate() + 10);

const formattedDate = expirationDate.toISOString().split('T')[0];

return formattedDate }, vars);
    await expect(page.locator(`.me > em`).first()).toContainText(`Expires: ${vars.expirationDay ?? ''}`);
    await page.locator(`xpath=//span[contains(text(), "Back to dashboard")]`).or(page.locator(`a[href*="/admin-dashboard/"] > .elementor-icon-list-text`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Under Offer")]`).or(page.locator(`button.e-n-tab-title:nth-of-type(2) > .e-n-tab-title-text`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.elementor-element-60c4e4c9 > .elementor-element.e-con-full.e-con.e-child > div.elementor-element.elementor-widget:nth-of-type(1) > .elementor-widget-container > .jet-listing > div > div:nth-of-type(1) > .elementor > .elementor-element.e-con-full.e-con.e-parent.e-lazyloaded > .elementor-element.elementor-element-45f40b8.e-con-full.e-con.e-child > .elementor-element.elementor-widget.elementor-widget-heading > .elementor-widget-container > h3.elementor-size-default`).first()).toContainText(`Afinity Test Accept`);
    await page.locator(`a[href*='/clubs/afinity-test-accept'] > span > span.elementor-button-text`).filter({ visible: true }).first().click({ force: true });
  });

  test('03 - 02 - Quote received - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.customerLogin ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "CashForeClubs: QUOTE RECEIVED! 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`A quote has been received for the sale of your club, which will expire: ${vars.expirationDay ?? ''}`);
    await expect(page.locator(`a[href="https://cashforeclubs-staging.mystagingwebsite.com/my-quotes/"]`).first()).toContainText(`View Club Quotes`);
  });

  test('04 - 01 - Accept quote', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = ``;
    vars.username = `${vars.customerLogin ?? ''}`;
    await page.locator(`xpath=//span[contains(text(), "Selling")]`).first().hover();
    await page.locator(`a[href*="quotes/"] > span`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`input[name="log"]`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`input[name="log"]`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`input[name="pwd"]`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`input[name="pwd"]`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`button[name="wp-submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.e-con-full.e-con.e-parent.e-lazyloaded > .elementor-element.elementor-element-45f40b8.e-con-full.e-con.e-child > .elementor-element.elementor-element-1f85aced.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`Under offer`);
    await page.locator(`.elementor-element.e-con-full.e-con.e-parent.e-lazyloaded > .e-con-full.e-con.e-child > .elementor-element.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a.elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`xpath=//span[contains(text(), "View club")]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`Under offer`);
    await expect(page.locator(`div.controlrow:nth-of-type(2) > .cashncred > label`).first()).toContainText(`£108.90`);
    {
      const _lbl = page.locator(`label[for="kwfcred"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#kwfcred`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.kwfbidder > h2`).first()).toContainText(`Club Sale Agreed @ £108.90`);
    await expect(page.locator(`.elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`ACCEPTED QUOTES`);
  });

  test('04 - 02 - Sale agreed - Email customer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "CashForeClubs: CLUB SALE AGREED! 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`If you selected Collection, we will arrange for your clubs to be collected ASAP from the address you provided, and will confirm details shortly.`);
    await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(4) > td > table > tbody > tr > td > p`).first()).toContainText(`If you selected to Drop off in store, please visit:`);
    await expect(page.locator(`tr:nth-of-type(5) > td > table > tbody > tr > td > p`).first()).toContainText(`6B Bumpers Way, Bumpers Estate, Chippenham, SN14 6LH`);
    await expect(page.locator(`a[href*="quotes/"]`).first()).toContainText(`View Club Quotes`);
  });

  test('04 - 03 - Sale agreed - Admin customer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/qa+cash_fore_clubs`);
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//a[contains(text(), "CashForeClubs: CLUB SALE AGREED! 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`If you selected Collection, we will arrange for your clubs to be collected ASAP from the address you provided, and will confirm details shortly.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(4) > td > table > tbody > tr > td > p`).first()).toContainText(`If you selected to Drop off in store, please visit:`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`tr:nth-of-type(5) > td > table > tbody > tr > td > p`).first()).toContainText(`Unit 3, Fowlswick Business Park, Chippenham, Wiltshire, England, SN146QE`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`a[href="https://cashforeclubs.mystagingwebsite.com/my-quotes/"]`).first()).toContainText(`View Club Quotes`);
    } catch { /* optional step: assertTextPresent */ }
  });

  test('05 - 01 - Admin Dashboard - Add club to store', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.goto(`${vars.site ?? ''}admin-dashboard/`);
    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="e-n-tab-title-21167394143"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#e-n-tab-title-21167394143`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#e-n-tab-content-21167394143 a[href*='/clubs/afinity-test-accept'] > span > span.elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`ACCEPTED QUOTES`);
    {
      const _lbl = page.locator(`label[for="kwfconvert2prodbtn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#kwfconvert2prodbtn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForTimeout(5000);
    await page.waitForLoadState('load');
    await expect(page.locator(`tr:nth-of-type(1) > td.column-wc-attributes`).first()).toContainText(`Club: Irons
Golfer: Mens
Grip Condition: 3
Dexterity: Right
Head Condition: 4
Make: Afinity
Shaft Condition: 4
Shaft Construction: Steel
Shaft Flex: Flighted`);
    await expect(page.locator(`tr:nth-of-type(1) > td > strong > a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`Afinity Test Accept`);
    await page.locator(`tr:nth-of-type(1) > td > div > span > a[href*="/wp-admin/post.php?post="][aria-label="Edit “Afinity Test Accept”"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Inventory")]`).or(page.locator(`a[href="#inventory_product_data"] > span`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "Generate EAN")]`).or(page.locator(`button[type="button"].button.alg_wc_ean_generate_ajax`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="_sku"]`).first().fill(`test-sku`); } catch { await page.locator(`input[name="_sku"]`).first().selectOption(`test-sku`); }
    try { await page.locator(`#price-for-customer`).first().fill(`109`); } catch { await page.locator(`#price-for-customer`).first().selectOption(`109`); }
    {
      const _lbl = page.locator(`label[for="publish"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#publish`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.urlProduct = ((await page.locator(`#sample-permalink`).textContent()) ?? '').trim();
  });

  test('06 - Product page Club Accepted', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.urlProduct ?? ''}`);
    await page.waitForLoadState('load');
  });

});
