// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Pumpkins Pool Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { backToTop } from '../helpers/common-steps';
import { blockImageSizes, scrollFullPage } from '../helpers/common-steps-for-all-projects';

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

test.describe('Pumpkins Pool Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('Brand Resource page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Brand Resources")]`).or(page.locator(`a[href*="/brand-resources/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href="https://fonts.google.com/specimen/Inter"]`).first()).toContainText(`Get it here`);
    await expect(page.locator(`a[href="https://fonts.google.com/specimen/Fira+Code"]`).first()).toContainText(`Get it here`);
    await expect(page.locator(`div.wp-block-kadence-column:nth-of-type(1) > .kt-inside-inner-col > .wp-block-kadence-column > .kt-inside-inner-col > p`).first()).toContainText(`Pumpkin Orange  #FF7518`);
    await expect(page.locator(`div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > .wp-block-kadence-column > .kt-inside-inner-col > p`).first()).toContainText(`Silver 
#B2B9BE`);
    await expect(page.locator(`div.wp-block-kadence-column:nth-of-type(3) > .kt-inside-inner-col > .wp-block-kadence-column > .kt-inside-inner-col > p`).first()).toContainText(`Black 
#060609`);
    await expect(page.locator(`div.wp-block-kadence-column:nth-of-type(4) > .kt-inside-inner-col > .wp-block-kadence-column > .kt-inside-inner-col > p`).first()).toContainText(`White
#FFFFFF`);
    await expect(page.locator(`.alignnone.sc-brand-page-logo-downloads-items.sc-item-top > .kt-has-2-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(1) > .kt-inside-inner-col > .sc-brand-page-logo-downloads-item`)).not.toHaveCount(0);
    await expect(page.locator(`div.alignnone.sc-brand-page-logo-downloads-items.wp-block-kadence-rowlayout:nth-of-type(3) > .kt-has-2-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(1) > .kt-inside-inner-col > .sc-brand-page-logo-downloads-item`)).not.toHaveCount(0);
    await expect(page.locator(`.alignnone.sc-brand-page-logo-downloads-items.sc-item-bottom > .kt-has-2-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(1) > .kt-inside-inner-col > .sc-brand-page-logo-downloads-item`)).not.toHaveCount(0);
    await expect(page.locator(`.alignnone.sc-brand-page-logo-downloads-items.sc-item-top > .kt-has-2-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > figure.wp-block-image.size-full img[src*="Color-logo-no-background-1.png"]`)).not.toHaveCount(0);
    await expect(page.locator(`div.alignnone.sc-brand-page-logo-downloads-items.wp-block-kadence-rowlayout:nth-of-type(3) > .kt-has-2-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > figure.wp-block-image.size-full img[src*="White-logo-no-background-1.png"]`)).not.toHaveCount(0);
    await expect(page.locator(`.alignnone.sc-brand-page-logo-downloads-items.sc-item-bottom > .kt-has-2-columns.kt-tab-layout-inherit > div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > figure.wp-block-image.size-full img[src*="Group-42.png"]`)).not.toHaveCount(0);
    await page.waitForLoadState('load');
    await scrollFullPage(page, vars);
    await blockImageSizes(page, vars);
  });

  test('DAO page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 1024 }, vars)) {
      await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(3) > a[href="#"] > .nav-drop-title-wrap`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 1024 }, vars)) {
      await page.locator(`.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle > .sub-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/dao-community/"]`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`svg.kadence-svg-icon.kadence-menu-svg`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`xpath=//*[@id="mobile-menu"]/li[3]/div/button`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`.sub-menu.pop-animated > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/dao-community/"]`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`div > .pumpkin-dao-body-proposals-item-header > .pumpkin-dao-body-proposals-item-header-wrap`)).not.toHaveCount(0);
  });

  test('Donation Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/donation/"]`).filter({ visible: true }).first().click({ force: true });
    await backToTop(page, vars);
    await page.waitForLoadState('load');
    await scrollFullPage(page, vars);
    await blockImageSizes(page, vars);
    // TODO: command="assertNotText" target="#splide03-slide01 > div.sc-animated-stats__number > span.sc-animated-stats__number__value" value="0"
    // TODO: command="assertNotText" target="#splide03-slide02 > div.sc-animated-stats__number > span.sc-animated-stats__number__value" value="0"
    // TODO: command="assertNotText" target="#splide03-slide03 > div.sc-animated-stats__number > span.sc-animated-stats__number__value" value="0"
    // TODO: command="assertNotText" target="#splide03-slide04 > div.sc-animated-stats__number > span.sc-animated-stats__number__value" value="0"
  });

  test('Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="kt-scroll-up"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#kt-scroll-up`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#kt-scroll-up.scroll-visible`)).toHaveCount(0);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); window.scrollTo(0, 1000) }, vars);
    await expect(page.locator(`#kt-scroll-up.scroll-visible`)).not.toHaveCount(0);
    await page.locator(`#kt-scroll-up.scroll-visible`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#kt-scroll-up.scroll-visible`)).toHaveCount(0);
    // TODO: command="assertNotText" target=".alignnone > .kt-has-3-columns.kt-tab-layout-inherit > .wp-block-kadence-column.inner-column-1.aos-init.aos-animate > .kt-inside-inner-col > .aligncenter > .pumpkin-vaildator-stats.sc_stat_uptime.loaded > h4" value="0"
    // TODO: command="assertNotText" target=".alignnone > .kt-has-3-columns.kt-tab-layout-inherit > .wp-block-kadence-column.inner-column-2.aos-init.aos-animate > .kt-inside-inner-col > .align > .pumpkin-vaildator-stats.sc_stat_total_stacked.loaded > h4" value="0"
    // TODO: command="assertNotText" target=".alignnone > .kt-has-3-columns.kt-tab-layout-inherit > .wp-block-kadence-column.inner-column-3.aos-init.aos-animate > .kt-inside-inner-col > .align > .pumpkin-vaildator-stats.sc_stat_apy.loaded > h4" value="0%"
    // TODO: command="assertNotText" target="#splide02-slide01 > .sc-animated-stats__number > .sc-animated-stats__number__value" value="0"
    // TODO: command="assertNotText" target="#splide02-slide02 > .sc-animated-stats__number > .sc-animated-stats__number__value" value="0"
    // TODO: command="assertNotText" target="#splide02-slide03 > .sc-animated-stats__number > .sc-animated-stats__number__value" value="0"
    // TODO: command="assertNotText" target="#splide02-slide04 > .sc-animated-stats__number > .sc-animated-stats__number__value" value="0"
    await expect(page.locator(`.wp-block-pumpkin-pool-core-latest-x`)).not.toHaveCount(0);
    await page.waitForLoadState('load');
    await scrollFullPage(page, vars);
    await blockImageSizes(page, vars);
  });

  test('Open Individual DAO page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 1024 }, vars)) {
      await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(3) > a[href="#"] > .nav-drop-title-wrap`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 1024 }, vars)) {
      await page.locator(`.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle > .sub-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/dao-community/"]`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`svg.kadence-svg-icon.kadence-menu-svg`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`xpath=//*[@id="mobile-menu"]/li[3]/div/button`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`.sub-menu.pop-animated > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/dao-community/"]`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`div > .pumpkin-dao-body-proposals-item-header > .pumpkin-dao-body-proposals-item-header-wrap`)).not.toHaveCount(0);
    await page.locator(`div > .pumpkin-dao-body-proposals-item-header > .pumpkin-dao-body-proposals-item-header-wrap`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.pumpkin-dao-body-proposals-item`)).not.toHaveCount(0);
  });

  test('Single Donation page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/donation/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`h4.ppc-latest-donation__org`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await scrollFullPage(page, vars);
    await blockImageSizes(page, vars);
  });

  test('Stake page (Not Connected)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 1024 }, vars)) {
      await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(3) > a[href="#"] > .nav-drop-title-wrap`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 1024 }, vars)) {
      await page.locator(`.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle > .sub-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(1) > a[href*="/stake/"]`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`svg.kadence-svg-icon.kadence-menu-svg`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`#mobile-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom > div > button`).or(page.locator(`xpath=//*[@id="mobile-menu"]/li[3]/div/button`)).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`.sub-menu.pop-animated > .menu-item.menu-item-type-post_type.menu-item-object-page> a[href*="/stake/"]`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`.pumpkin-stake-form`)).not.toHaveCount(0);
    await page.waitForLoadState('load');
    await scrollFullPage(page, vars);
    await blockImageSizes(page, vars);
  });

  test('Swap page (Not Connected)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 1024 }, vars)) {
      await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(3) > a[href="#"] > .nav-drop-title-wrap`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 1024 }, vars)) {
      await page.locator(`.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle > .sub-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/swap/"]`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`svg.kadence-svg-icon.kadence-menu-svg`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`#mobile-menu > li.menu-item.menu-item-type-custom.menu-item-object-custom.current-menu-ancestor.current-menu-parent.menu-item-has-children.menu-item-1415 > div > button`).or(page.locator(`xpath=//*[@id="mobile-menu"]/li[3]/div/button`)).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 1024 }, vars)) {
      await page.locator(`.sub-menu.pop-animated > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/swap/"]`).filter({ visible: true }).first().click({ force: true });
    }
    await expect(page.locator(`.pumpkin-token-swap-form`)).not.toHaveCount(0);
    await page.waitForLoadState('load');
    await scrollFullPage(page, vars);
    await blockImageSizes(page, vars);
  });

});
