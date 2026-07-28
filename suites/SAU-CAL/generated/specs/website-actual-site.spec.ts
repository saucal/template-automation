// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Website - (actual site)"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { scrollFullPage } from '../helpers/common-steps-for-all-projects';
import { verifyHeader } from '../helpers/website-common-steps';

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

test.describe('Website - (actual site)', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('Affiliate program', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}affiliate-program/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
  });

  test('Blog Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`#menu-item-11044 > a`)).or(page.locator(`ul.nav-menu > li:nth-child(4) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`header > h1`).first()).toHaveText(`WooCommerce done right`);
    await expect(page.locator(`div.posts-results-wrapper > div:nth-child(1) > div > h4`).first()).toHaveText(` Latest articles`);
  });

  test('BlueSnap Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`ul.nav-menu > li:nth-child(3) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.responsive-none > header > h1`).first()).toHaveText(`We get results`);
    await expect(page.locator(`.case-study-archive-wrapper.container > div.posts-results-wrapper > div.responsive-none > header > div`).first()).toHaveText(`why all the best companies choose Saucal`);
    await expect(page.locator(`div > header.page-header > h1`).or(page.locator(`div.responsive-none > header.page-header > h1`)).first()).toContainText(`We get results`);
    // ↑ end Case Studies Page
    await scrollFullPage(page, vars);
    await page.locator(`a[href*="/case-study/bluesnap/"]`).or(page.locator(`#post-6124 >div > div > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div > h1`).first()).toHaveText(`BlueSnap`);
    await expect(page.locator(`div > p.case-study__sub-title`).first()).toContainText(`It HAD to be Right -- Right Away!`);
  });

  test('Case Studies Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`ul.nav-menu > li:nth-child(3) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.responsive-none > header > h1`).first()).toHaveText(`We get results`);
    await expect(page.locator(`.case-study-archive-wrapper.container > div.posts-results-wrapper > div.responsive-none > header > div`).first()).toHaveText(`why all the best companies choose Saucal`);
    await expect(page.locator(`div > header.page-header > h1`).or(page.locator(`div.responsive-none > header.page-header > h1`)).first()).toContainText(`We get results`);
  });

  test('Company - About SauCal', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-11042`).or(page.locator(`#primary_menu > li:nth-child(2)`)).first().hover();
    await page.locator(`#menu-item-11042 > div > div > div > div:nth-child(1) > p > a`).or(page.locator(`#primary_menu > li:nth-child(2) >div > div > div > div:nth-child(1) > p > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > h1`).first()).toHaveText(`WooCommerce & WordPress nerds, at your service`);
  });

  test('Company - Openings Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-11042`).or(page.locator(`#primary_menu > li:nth-child(2)`)).first().hover();
    await page.locator(`#menu-item-11042 > div > div > div > div.wp-block-group.header-hover.header-menu-last-child.is-layout-constrained.wp-block-group-is-layout-constrained > p > a`).or(page.locator(`#primary_menu > li:nth-child(2) > div > div > div > div.wp-block-group.header-hover.header-menu-last-child.is-layout-constrained.wp-block-group-is-layout-constrained > p > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href="https://secure.collage.co/jobs/saucal"]`).first()).toContainText(`See all openings`);
  });

  test('Company - Team Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`#footer-primary-menu > #menu-item-23008 > a`)).or(page.locator(`#footer-primary-menu > li:nth-child(4) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > h1`).first()).toContainText(`We are the Saucal Squad – the wizards behind your WooCommerce success.`);
  });

  test('Contact Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Contact")]`).or(page.locator(`.menu-item > a[href*="/contact/"]`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`div > h1`).first()).toHaveText(`That sweet online store isn’t gonna build itself`);
    } catch { /* optional step: assertText */ }
  });

  test('E-commerce Hosting', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}ecommerce-hosting/`);
    await page.waitForLoadState('load');
    await expect(page.locator(`header > h1`).first()).toContainText(`17 Tips to Optimize Your Ecommerce Hosting for Maximum Performance`);
  });

  test('Hello Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`ul.nav-menu > li:nth-child(3) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.responsive-none > header > h1`).first()).toHaveText(`We get results`);
    await expect(page.locator(`.case-study-archive-wrapper.container > div.posts-results-wrapper > div.responsive-none > header > div`).first()).toHaveText(`why all the best companies choose Saucal`);
    await expect(page.locator(`div > header.page-header > h1`).or(page.locator(`div.responsive-none > header.page-header > h1`)).first()).toContainText(`We get results`);
    // ↑ end Case Studies Page
    await page.locator(`xpath=//h2[contains(text(), "Hello Subscription")]`).or(page.locator(`a[href*="/case-study/hello-subscription/"] > header.entry-header > h2`)).or(page.locator(`#post-86 > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`header > div > h1`).first()).toContainText(`Hello Subscription`);
  });

  test('Home page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`div > h1`).first()).toContainText(`The last WooCommerce website you’ll ever need`);
  });

  test('Initial Exploration', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}initial-exploration/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
  });

  test('Language switcher', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`button.saucal-translation__dropdown__btn`).or(page.locator(`.saucal-translation__dropdown > button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Español")]`).or(page.locator(`a[href*="/marketing/es/"] > span`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#h-the-last-woocommerce-website-you-ll-ever-need-0`).or(page.locator(`div > h1`)).first()).toContainText(`El último sitio web WooCommerce que necesitarás`);
    await expect(page.locator(`article > div > div > div > div > div > div > div > div > div > div:nth-child(1) > a`).first()).toContainText(`Comenzar`);
  });

  test('McKeen Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    vars.title = `McKeen Metro Glebe`;
    vars.subTitle = `Thriving in a world turned upside down.`;
    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`ul.nav-menu > li:nth-child(3) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.responsive-none > header > h1`).first()).toHaveText(`We get results`);
    await expect(page.locator(`.case-study-archive-wrapper.container > div.posts-results-wrapper > div.responsive-none > header > div`).first()).toHaveText(`why all the best companies choose Saucal`);
    await expect(page.locator(`div > header.page-header > h1`).or(page.locator(`div.responsive-none > header.page-header > h1`)).first()).toContainText(`We get results`);
    // ↑ end Case Studies Page
    await scrollFullPage(page, vars);
    await page.locator(`xpath=//h2[contains(text(), "McKeen Metro Glebe")]`).or(page.locator(`a[href*="/case-study/mckeen-metro-glebe/"] > header.entry-header > h2`)).or(page.locator(`#post-6094 > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    await verifyHeader(page, vars);
  });

  test('Mobile Menu', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`#site-navigation > button > img`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#main-navigation`).or(page.locator(`#primary_menu`)).first()).toBeVisible();
    await page.locator(`ul.primary-menu > li:nth-child(1) > span`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(5000);
    await expect(page.locator(`ul.primary-menu > li:nth-child(1) > div > div > div > div:nth-child(1) > p`).first()).toBeVisible();
  });

  test('No Pong Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    vars.title = `No Pong`;
    vars.subTitle = `Ending 18 Months of Technical Hell`;
    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`ul.nav-menu > li:nth-child(3) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.responsive-none > header > h1`).first()).toHaveText(`We get results`);
    await expect(page.locator(`.case-study-archive-wrapper.container > div.posts-results-wrapper > div.responsive-none > header > div`).first()).toHaveText(`why all the best companies choose Saucal`);
    await expect(page.locator(`div > header.page-header > h1`).or(page.locator(`div.responsive-none > header.page-header > h1`)).first()).toContainText(`We get results`);
    // ↑ end Case Studies Page
    await scrollFullPage(page, vars);
    await page.locator(`xpath=//h2[contains(text(), "No Pong")]`).or(page.locator(`a[href*="/case-study/no-pong/"] > header.entry-header > h2`)).or(page.locator(`#post-6149 > div > div > a`)).or(page.locator(`div.posts-wrapper > article:nth-child(10) > div >div > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await verifyHeader(page, vars);
  });

  test('Output Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    vars.title = `Output`;
    vars.subTitle = `Reducing costs and increasing online sales.`;
    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`ul.nav-menu > li:nth-child(3) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.responsive-none > header > h1`).first()).toHaveText(`We get results`);
    await expect(page.locator(`.case-study-archive-wrapper.container > div.posts-results-wrapper > div.responsive-none > header > div`).first()).toHaveText(`why all the best companies choose Saucal`);
    await expect(page.locator(`div > header.page-header > h1`).or(page.locator(`div.responsive-none > header.page-header > h1`)).first()).toContainText(`We get results`);
    // ↑ end Case Studies Page
    await page.locator(`xpath=//h2[contains(text(), "Output")]`).or(page.locator(`a[href*="/case-study/output/"] > header.entry-header > h2`)).or(page.locator(`#post-85 > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    await verifyHeader(page, vars);
  });

  test('Phlearn Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    vars.title = `Phlearn`;
    vars.subTitle = `A new sales platform for a new business model.`;
    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`ul.nav-menu > li:nth-child(3) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.responsive-none > header > h1`).first()).toHaveText(`We get results`);
    await expect(page.locator(`.case-study-archive-wrapper.container > div.posts-results-wrapper > div.responsive-none > header > div`).first()).toHaveText(`why all the best companies choose Saucal`);
    await expect(page.locator(`div > header.page-header > h1`).or(page.locator(`div.responsive-none > header.page-header > h1`)).first()).toContainText(`We get results`);
    // ↑ end Case Studies Page
    await page.locator(`xpath=//h2[contains(text(), "Phlearn")]`).or(page.locator(`a[href*="/case-study/phlearn/"] > header.entry-header > h2`)).or(page.locator(`#post-520 > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    await verifyHeader(page, vars);
  });

  test('Post Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Blog Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).or(page.locator(`#menu-item-11044 > a`)).or(page.locator(`ul.nav-menu > li:nth-child(4) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`header > h1`).first()).toHaveText(`WooCommerce done right`);
    await expect(page.locator(`div.posts-results-wrapper > div:nth-child(1) > div > h4`).first()).toHaveText(` Latest articles`);
    // ↑ end Blog Page
    await page.locator(`h5.entry-title > a`).filter({ visible: true }).first().click({ force: true });
  });

  test('Services - Managed WooCommerce Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`#managed-woocommerce > div > div > div > p > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > h1`).first()).toHaveText(`Managed WooCommerce hosting that gets it.`);
  });

  test('Services - RADAR Page ', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-11041`).or(page.locator(`#primary_menu > li:nth-child(1)`)).first().hover();
    await page.locator(`#menu-item-11041 > div > div > div > div:nth-child(7) > p:nth-child(1) > a`).or(page.locator(`#primary_menu > li:nth-child(1)  > div > div > div > div:nth-child(5) > p:nth-child(1) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > h1`).first()).toHaveText(`RADAR`);
    await expect(page.locator(`div.kt-inside-inner-col > div > div.kt-inside-inner-col > p`).first()).toContainText(`Revolutionizing WooCommerce optimization, powered by automation and expertise`);
  });

  test('Services - What we do Page - WooCommerce Development', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-11041`).or(page.locator(`#primary_menu > li:nth-child(1)`)).first().hover();
    await page.locator(`#menu-item-11041 > div > div > div > div:nth-child(1) > p:nth-child(1) > a`).or(page.locator(`#primary_menu > li:nth-child(1) > div > div > div > div:nth-child(1) > p:nth-child(1) > a`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > h1`).first()).toHaveText(`We’re your WooCommerce development gurus.`);
  });

  test('Services - WooCommerce Experts Page ', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-11041`).or(page.locator(`#primary_menu > li:nth-child(2)`)).first().hover();
    await page.locator(`#primary_menu > li:nth-child(2) > div > div > div > div:nth-child(3) > p:nth-child(1) > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > h1`).first()).toHaveText(`You want a WooCommerce store that looks sexy, works perfectly, and makes money. `);
  });

  test('Shopify Form', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    vars.title = `Shopify Solutions, WooCommerce Excellence`;
    await page.locator(`a[href*="/shipstation/"] > .wp-block-image > figure > img`).or(page.locator(`.home-logo-section > div > figure:nth-child(4) > a`)).filter({ visible: true }).first().click({ force: true });
    await verifyHeader(page, vars);
  });

  test('Submit Contact', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Contact Page
    await page.locator(`xpath=//a[contains(text(), "Contact")]`).or(page.locator(`.menu-item > a[href*="/contact/"]`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`div > h1`).first()).toHaveText(`That sweet online store isn’t gonna build itself`);
    } catch { /* optional step: assertText */ }
    // ↑ end Contact Page
    try { await page.locator(`#input_45_5`).first().fill(`QA`); } catch { await page.locator(`#input_45_5`).first().selectOption(`QA`); }
    try { await page.locator(`#input_45_3`).first().fill(`Test`); } catch { await page.locator(`#input_45_3`).first().selectOption(`Test`); }
    try { await page.locator(`#input_45_6`).first().fill(`qa+test@saucal.com`); } catch { await page.locator(`#input_45_6`).first().selectOption(`qa+test@saucal.com`); }
    try { await page.locator(`#input_45_7`).first().fill(`This is a Testing Message to verify form functionality`); } catch { await page.locator(`#input_45_7`).first().selectOption(`This is a Testing Message to verify form functionality`); }
    try { await page.locator(`#input_45_15`).first().fill(`under_1m`); } catch { await page.locator(`#input_45_15`).first().selectOption(`under_1m`); }
    {
      const _lbl = page.locator(`label[for="gform_submit_button_45"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_45`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.gform-loader`)).toHaveCount(0);
    await expect(page.locator(`.paragraph-1`).or(page.locator(`div > div > div > div > div > div.kt-inside-inner-col > p`)).first()).toContainText(`You’ll find a confirmation email in your inbox pronto. Hang tight, a real-life human from our team will hit you up within 24 hours to get the conversation rolling. We’re looking forward to it!`);
  });

  test('Testimonials Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}testimonials/`);
    await page.waitForLoadState('load');
    try {
      await page.locator(`#menu-item-28 > a[href*="/testimonials/"]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.waitForLoadState('load');
  });

  test('Vip Form', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    vars.title = `From overwhelmed to overdrive: we got your back`;
    await page.goto(`${vars.startUrl ?? ''}vip/`);
    await page.waitForLoadState('load');
    await verifyHeader(page, vars);
  });

  test('WooCommerce Form', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    vars.title = `You want a WooCommerce store that looks sexy, works perfectly, and makes money. `;
    await page.locator(`a[href*="/woocommerce/"] > .wp-block-image > figure > img`).or(page.locator(`.home-logo-section > div > figure:nth-child(1) > a`)).filter({ visible: true }).first().click({ force: true });
    await verifyHeader(page, vars);
  });

});
