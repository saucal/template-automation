// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Website - old site"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';

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

test.describe('Website - old site', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('Blog Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-21 > a[href*="/blog/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('BlueSnap Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-89 > a[href*="/case-studies/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Case Studies Page
    await page.locator(`a[href*="/case-study/bluesnap/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Case Studies Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-89 > a[href*="/case-studies/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Contact Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-23 > a[href*="/contact/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Desktop Menu', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
  });

  test('Hello Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-89 > a[href*="/case-studies/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Case Studies Page
    await page.locator(`xpath=//h2[contains(text(), "Hello Subscription")]`).or(page.locator(`a[href*="/case-study/hello-subscription/"] > header.entry-header > h2`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Home page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    // TODO: command="assertAccessibility" target="" value="3"
  });

  test('McKeen Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-89 > a[href*="/case-studies/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Case Studies Page
    await page.locator(`xpath=//h2[contains(text(), "McKeen Metro Glebe")]`).or(page.locator(`a[href*="/case-study/mckeen-metro-glebe/"] > header.entry-header > h2`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('No Pong Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-89 > a[href*="/case-studies/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Case Studies Page
    await page.locator(`xpath=//h2[contains(text(), "No Pong")]`).or(page.locator(`a[href*="/case-study/no-pong/"] > header.entry-header > h2`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Openings Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-25 > a[href*="/openings/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href="https://secure.collage.co/jobs/saucal"]`).first()).toContainText(`View all openings`);
    await page.waitForLoadState('load');
  });

  test('Output Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-89 > a[href*="/case-studies/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Case Studies Page
    await page.locator(`xpath=//h2[contains(text(), "Output")]`).or(page.locator(`a[href*="/case-study/output/"] > header.entry-header > h2`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Phlearn Case Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Case Studies Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-89 > a[href*="/case-studies/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Case Studies Page
    await page.locator(`xpath=//h2[contains(text(), "Phlearn")]`).or(page.locator(`a[href*="/case-study/phlearn/"] > header.entry-header > h2`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Post Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Blog Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-21 > a[href*="/blog/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Blog Page
    await page.locator(`h2.entry-title > a:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('ShipStation Form', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/shipstation/"] > .wp-block-image > figure > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Submit Contact', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    // ↓ Contact Page
    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-23 > a[href*="/contact/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end Contact Page
    {
      const _lbl = page.locator(`label[for="input_1_1_3"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_1_1_3`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_1_1_3`).first().fill(`QA`); } catch { await page.locator(`#input_1_1_3`).first().selectOption(`QA`); }
    try { await page.locator(`#input_1_1_6`).first().fill(`Test`); } catch { await page.locator(`#input_1_1_6`).first().selectOption(`Test`); }
    try { await page.locator(`#input_1_2`).first().fill(`qa+test@saucal.com`); } catch { await page.locator(`#input_1_2`).first().selectOption(`qa+test@saucal.com`); }
    {
      const _lbl = page.locator(`label[for="input_1_2"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_1_2`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="input_1_3"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_1_3`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_1_3`).first().fill(`3059689789`); } catch { await page.locator(`#input_1_3`).first().selectOption(`3059689789`); }
    {
      const _lbl = page.locator(`label[for="input_1_4"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_1_4`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_1_4`).first().fill(`Testing Message`); } catch { await page.locator(`#input_1_4`).first().selectOption(`Testing Message`); }
    {
      const _lbl = page.locator(`label[for="label_1_6_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//label[contains(text(), "Just a few more questions will help us choose the right solutions for you")]`).or(page.locator(`#label_1_6_1`)).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="label_1_7_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//label[contains(text(), "Troubleshooting (bugs or slowness on your site)")]`).or(page.locator(`#label_1_7_1`)).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.question1 = ((await page.locator(`#label_1_7_1`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="label_1_10_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//label[contains(text(), "This Month")]`).or(page.locator(`#label_1_10_1`)).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.question2 = ((await page.locator(`#label_1_10_1`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="label_1_9_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//label[contains(text(), "Marketer")]`).or(page.locator(`#label_1_9_1`)).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.question3 = ((await page.locator(`#label_1_9_1`).textContent()) ?? '').trim();
    vars.question4 = `$0.12`;
    try { await page.locator(`#input_1_8`).first().fill(`${vars.question4 ?? ''}`); } catch { await page.locator(`#input_1_8`).first().selectOption(`${vars.question4 ?? ''}`); }
    vars.question5 = `$0.01`;
    try { await page.locator(`#input_1_11`).first().fill(`${vars.question5 ?? ''}`); } catch { await page.locator(`#input_1_11`).first().selectOption(`${vars.question5 ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="gform_submit_button_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.paragraph-1`).first()).toContainText(`We’ll contact you shortly. We’re looking forward to it. Pro-tip: Be sure to check your inbox and spam folders for our email!`);
    // TODO: command="assertAccessibility" target="" value="2"
  });

  test('Team Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-27 > a[href*="/team/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Testimonials Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-28 > a[href*="/testimonials/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Vip Form', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/vip/"] > .wp-block-image > figure > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('What we do Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`.side-item > button[type="button"].menu-toggle:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#menu-item-29 > a[href*="/what-we-do/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('WooCommerce Form', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/woocommerce/"] > .wp-block-image > figure > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('WooCommerce Website Development Page', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/what-we-do/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/woocommerce-website-development/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('WP Engine Form', async ({ page }) => {
    await page.goto(`/marketing/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/wp-engine/"] > .wp-block-image > figure > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

});
