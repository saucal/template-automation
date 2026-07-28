// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "CFC - Quote flow - Reject quote"
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

test.describe('CFC - Quote flow - Reject quote', () => {

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
    await page.locator(`a[href*="/my-quotes/"] > span`).filter({ visible: true }).first().click({ force: true });
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

  test('02 - 01 - Sell your clubs', async ({ page }) => {
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
    try { await page.locator(`#input_5_5`).first().fill(`Test Reject`); } catch { await page.locator(`#input_5_5`).first().selectOption(`Test Reject`); }
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
    await page.locator(`.elementor-element.e-con-full.e-con.e-parent.e-lazyloaded > .elementor-element.elementor-element-45f40b8.e-con-full.e-con.e-child > .elementor-element.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href*="/clubs/afinity"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Discussion")]`).or(page.locator(`button.e-n-tab-title:nth-of-type(2) > .e-n-tab-title-text`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#comment`).first().fill(`Testing Comment`); } catch { await page.locator(`#comment`).first().selectOption(`Testing Comment`); }
    {
      const _lbl = page.locator(`label[for="submit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#submit`).filter({ visible: true }).first().click({ force: true }); }
    }
  });

  test('02 - 02 - Comment - Email customer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "CashForeClubs: COMMENT RECEIVED 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`New Comment by QA Seller ...`);
    await expect(page.locator(`p > em`).first()).toContainText(`" Testing Comment "`);
  });

  test('02 - 03 - Comment - Email admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/qa+cash_fore_clubs`);
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//a[contains(text(), "CashForeClubs: COMMENT RECEIVED 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`New Comment by QA Seller ...`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`p > em`).first()).toContainText(`" Testing Comment "`);
    } catch { /* optional step: assertTextPresent */ }
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
    await page.locator(`a[href*='reject'] > span > span.elementor-button-text`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Discussion")]`).or(page.locator(`button.e-n-tab-title:nth-of-type(2) > .e-n-tab-title-text`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.comment.byuser > .comment-body > .comment-content > .comment-text > p`).first()).toContainText(`Testing Comment`);
    try { await page.locator(`#comment`).first().fill(`Testing reply`); } catch { await page.locator(`#comment`).first().selectOption(`Testing reply`); }
    {
      const _lbl = page.locator(`label[for="submit"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#submit`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//span[contains(text(), "Quotes")]`).or(page.locator(`button.e-n-tab-title:nth-of-type(1) > .e-n-tab-title-text`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#kwfbidval`).first().fill(`99`); } catch { await page.locator(`#kwfbidval`).first().selectOption(`99`); }
    {
      const _lbl = page.locator(`label[for="kwfbidbtn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#kwfbidbtn`).filter({ visible: true }).first().click({ force: true }); }
    }
  });

  test('03 - 02 - Comment - Email customer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.customerLogin ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "CashForeClubs: COMMENT RECEIVED 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`New Comment by Maintenance Administrator ...`);
    await expect(page.locator(`p > em`).first()).toContainText(`" Testing reply "`);
  });

  test('03 - 03 - Comment - Email admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/qa+cash_fore_clubs`);
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//a[contains(text(), "CashForeClubs: COMMENT RECEIVED 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`New Comment by saucal_maintenance_admin ...`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`p > em`).first()).toContainText(`" Testing reply "`);
    } catch { /* optional step: assertTextPresent */ }
  });

  test('04 - 01 - Reject quote', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = ``;
    vars.username = `${vars.customerLogin ?? ''}`;
    await page.locator(`xpath=//span[contains(text(), "Selling")]`).first().hover();
    await page.locator(`a[href*="/my-quotes/"] > span`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`input[name="log"]`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`input[name="log"]`).first().selectOption(`${vars.username ?? ''}`); }
    try { await page.locator(`input[name="pwd"]`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`input[name="pwd"]`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`button[name="wp-submit"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.elementor-element.e-con-full.e-con.e-parent.e-lazyloaded > .e-con-full.e-con.e-child > .elementor-element.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a.elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`xpath=//span[contains(text(), "View club")]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Discussion")]`).or(page.locator(`button.e-n-tab-title:nth-of-type(2) > .e-n-tab-title-text`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.comment.byuser.comment-author-saucal_maintenance_admin > .comment-body > .comment-content > .comment-text > p`).or(page.locator(`.comment-content > div.comment-text > p`)).first()).toContainText(`Testing reply`);
    await page.locator(`xpath=//span[contains(text(), "Quotes")]`).or(page.locator(`button.e-n-tab-title:nth-of-type(1) > .e-n-tab-title-text`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="kwfdeclinebtn"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#kwfdeclinebtn`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.kwfbidder > h2`).first()).toContainText(`Club Sale Declined`);
    await expect(page.locator(`.kwfbidder > p`).first()).toContainText(`Sorry we could not agree a price on this occasion.`);
    await expect(page.locator(`.elementor-element.elementor-widget__width-initial.elementor-widget.elementor-widget-text-editor > .elementor-widget-container`).first()).toContainText(`REJECTS`);
  });

  test('04 - 02 - Sale declined - Email customer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "CashForeClubs: CLUB SALE DECLINED! 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`Sorry we could not agree a price on this occasion!`);
  });

  test('04 - 03 - Sale declined - Admin email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/qa+cash_fore_clubs`);
    await page.waitForLoadState('load');
    try {
      await page.locator(`xpath=//a[contains(text(), "CashForeClubs: CLUB SALE DECLINED! 🏌🏼‍♂️")]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      await expect(page.locator(`td.t11 > table > tbody > tr:nth-of-type(3) > td > table > tbody > tr > td > p`).first()).toContainText(`Sorry we could not agree a price on this occasion!`);
    } catch { /* optional step: assertTextPresent */ }
  });

});
