// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Mavenfair - Vendor Suite"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail, payPalTemplate, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';
import { login, mediaButtonEnabled, registration } from '../helpers/mavenfair-common-steps-for-project';

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

test.describe('Mavenfair - Vendor Suite', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "countryComplete": "Canada",
    "stateComplete": "British Columbia",
    "user": `SaucalMaintenance_1_${Math.random().toString(36).substring(2, 10)}`,
    "firstName": "Saucal",
    "lastName": `Maint_${Math.random().toString(36).substring(2, 10)}`,
    "country": "CA",
    "street": "123 false street",
    "city": "Vancouver",
    "zipCode": "V5T 1R8",
    "phone": "6134767685",
    "state": "BC",
    "street3": "123 false shipping",
    "zipCode2": "V5V 3P9",
    "lastName2": "Shipping Test",
    "user2": `SaucalMaintenance_2_${Math.random().toString(36).substring(2, 10)}`,
    "project": "mavenfair",
    "Symbol": "$",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Vendor SignUp Process', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await uRLOfCurrentPage(page, vars);
    vars.vendor = `yes`;
    vars.pass = `${vars.password ?? ''}`;
    vars.userReg = `Saucal_1_${vars.alphanumeric ?? ''}`;
    vars.username = `qa+gi_${vars.alphanumeric ?? ''}@saucal.com`;
    await registration(page, vars);
    await payPalTemplate(page, vars);
    try {
      await expect(page.locator(`#pmpro_form > p:nth-of-type(1)`).first()).toHaveText(`Almost done. Review the membership information and pricing below then click the "Complete Payment" button to finish your order.`);
    } catch { /* optional step: assertText */ }
    try {
      await page.locator(`#pmpro_submit_span > input.pmpro_btn.pmpro_btn-submit-checkout`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await expect(page.locator(`.pmpro_section > p:nth-of-type(2)`).first()).toHaveText(`You have successfully completed registration for your Standard MavenFair Maker Shop!`);
    await expect(page.locator(`.pmpro_confirmation_wrap > ul > li:nth-of-type(1)`).or(page.locator(`.pmpro_invoice_wrap > ul > li:nth-of-type(1)`)).or(page.locator(`#pmpro_order_single-meta-bill_to`)).first()).toContainText(`${vars.userReg ?? ''}`);
    vars.recurringPrice = ((await page.locator(`[data-title="Subtotal"]`).textContent()) ?? '').trim();
    vars.recurringTax = ((await page.locator(`[data-title="Tax"]`).textContent()) ?? '').trim();
    vars.recurringTotal = ((await page.locator(`[data-title="Total"]`).textContent()) ?? '').trim();
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your membership confirmation for MavenFair")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`p > strong > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`a.user-link`).first().hover();
    await page.locator(`xpath=//a[contains(text(), "My Dashboard")]`).or(page.locator(`a[href*="/maker-dashboard/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`- General Notice to MavenFair Makers -  Please ensure your Street Address is complete in your Store Settings. The shipping module will not work if incomplete and a buyer will not be able to complete a purchase of your items. This information is not public. Only your City and Province will be displayed in your MavenFair Shop.  Thank you.`);
  });

  test('02 - Vendor Store Settings', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.locator(`a[href*="/members/"].user-link > img.avatar.photo`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#nav-bar-filter > .menu-item.menu-item-type-custom.menu-item-object-custom > a[href*="/maker-dashboard/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#dashboard-menu-item-settings > a[href*="/maker-dashboard/settings"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="_wcv_store_address1"]`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`input[name="_wcv_store_address1"]`).first().selectOption(`${vars.street ?? ''}`); }
    try { await page.locator(`input[name="_wcv_store_address2"]`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`input[name="_wcv_store_address2"]`).first().selectOption(`${vars.street2 ?? ''}`); }
    try { await page.locator(`input[name="_wcv_store_city"]`).first().fill(`Ottawa`); } catch { await page.locator(`input[name="_wcv_store_city"]`).first().selectOption(`Ottawa`); }
    try { await page.locator(`input[name="_wcv_store_state"]`).first().fill(`Ontario`); } catch { await page.locator(`input[name="_wcv_store_state"]`).first().selectOption(`Ontario`); }
    try { await page.locator(`input[name="_wcv_store_postcode"]`).first().fill(`K1S 3V6`); } catch { await page.locator(`input[name="_wcv_store_postcode"]`).first().selectOption(`K1S 3V6`); }
    {
      const _lbl = page.locator(`label[for="store_save_button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#store_save_button`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForLoadState('load');
    await expect(page.locator(`.woocommerce-info`)).toHaveCount(0);
    await expect(page.locator(`.wcvendors-dashboard-wrapper > div.woocommerce-message:nth-of-type(2)`).first()).toHaveText(`Store Settings Saved`);
  });

  test('02 - Vendor Store Settings - Branding', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.goto(`${vars.startUrl ?? ''}maker-dashboard/settings/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Branding")]`).or(page.locator(`a[href="#branding"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#branding`).first()).toBeVisible();
    await page.locator(`xpath=//a[contains(text(), "Remove Store Banner")]`).or(page.locator(`a[href="#"].wcv-file-uploader-delete_wcv_store_banner_id`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Add Store Banner")]`).or(page.locator(`a[href="#"].wcv-file-uploader-add_wcv_store_banner_id`)).filter({ visible: true }).first().click({ force: true });
    // TODO: file upload — replace URL with a local file path or fetch buffer
    await page.locator(`input[type="file"]`).first().setInputFiles(`https://ghostinspector-prod.s3.amazonaws.com/uploads/8cfc5665-15bd-4bce-bf9e-f0bc7a33bb4b.png`);
    await mediaButtonEnabled(page, vars);
    await page.locator(`xpath=//button[contains(text(), "Add Store Banner")]`).or(page.locator(`button[type="button"].button.media-button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Add Store Icon")]`).or(page.locator(`a[href="#"].wcv-file-uploader-add_wcv_store_icon_id`)).filter({ visible: true }).first().click({ force: true });
    // TODO: file upload — replace URL with a local file path or fetch buffer
    await page.locator(`div.supports-drag-drop:not([style*='display: none;']) input[type="file"]`).first().setInputFiles(`https://ghostinspector-prod.s3.amazonaws.com/uploads/128a5d42-9758-4d49-944f-e08764967546.png`);
    await mediaButtonEnabled(page, vars);
    await page.locator(`xpath=//button[contains(text(), "Add Store Icon")]`).or(page.locator(`div.supports-drag-drop:not([style*='display: none;']) > .media-modal.wp-core-ui > .media-modal-content > .media-frame.wp-core-ui > .media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button[type="button"].button.media-button.button-primary.button-large`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="store_save_button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#store_save_button`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.wcvendors-dashboard-wrapper > div.woocommerce-message:nth-of-type(2)`).first()).toContainText(`Store Settings Saved`);
    await page.locator(`xpath=//a[contains(text(), "Branding")]`).or(page.locator(`a[href="#branding"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('02 - Vendor Store Settings - Payment', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.goto(`${vars.site ?? ''}maker-dashboard/settings/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Payment")]`).or(page.locator(`a[href="#payment"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#wcv_paypal_masspay_email_address_wrapper > .control-group`).first()).toBeVisible();
  });

  test('02 - Vendor Store Settings - Policies', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.goto(`${vars.site ?? ''}maker-dashboard/settings/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Policies")]`).or(page.locator(`a[href="#policies"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#policies > div.control-group:nth-of-type(1)`).first()).toBeVisible();
  });

  test('02 - Vendor Store Settings - SEO', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.goto(`${vars.site ?? ''}maker-dashboard/settings/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "SEO")]`).or(page.locator(`a[href="#seo"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#seo > div.control-group:nth-of-type(1)`).first()).toBeVisible();
  });

  test('02 - Vendor Store Settings - Social', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.goto(`${vars.site ?? ''}maker-dashboard/settings/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Social")]`).or(page.locator(`a[href="#social"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#social > div.control-group:nth-of-type(1)`).first()).toBeVisible();
  });

  test('03 - Vendor Dashboard - Add Simple product', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.locator(`a[href*="/members/"].user-link > img.avatar.photo`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#nav-bar-filter > .menu-item.menu-item-type-custom.menu-item-object-custom > a[href*="/maker-dashboard/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#dashboard-menu-item-product > a[href*="/maker-dashboard/product"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/maker-dashboard/settings/#featured_products"]`).first()).toBeVisible();
    await page.locator(`xpath=//a[contains(text(), "Add Product")]`).or(page.locator(`a[href*="/maker-dashboard/product/edit"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`#post_title`).first().fill(`Simple product test ${vars.alphanumeric ?? ''}`); } catch { await page.locator(`#post_title`).first().selectOption(`Simple product test ${vars.alphanumeric ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="post_excerpt-html"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#post_excerpt-html`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#post_excerpt`).first().fill(`Short Descritpion`); } catch { await page.locator(`#post_excerpt`).first().selectOption(`Short Descritpion`); }
    {
      const _lbl = page.locator(`label[for="post_content-html"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#post_content-html`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#post_content`).first().fill(`Description of the product`); } catch { await page.locator(`#post_content`).first().selectOption(`Description of the product`); }
    await page.locator(`xpath=//a[contains(text(), "Set featured image")]`).or(page.locator(`a[href="#"].wcv-media-uploader-featured-add`)).filter({ visible: true }).first().click({ force: true });
    // TODO: file upload — replace URL with a local file path or fetch buffer
    await page.locator(`div:not([style*="display: none;"]) > div > div > div > div > input[type="file"]`).first().setInputFiles(`https://ghostinspector-prod.s3.amazonaws.com/uploads/3c62db6d-7cb5-4a7b-9c64-4a21c69dcdad.png`);
    await mediaButtonEnabled(page, vars);
    await page.locator(`xpath=//button[contains(text(), "Set Product Feature Image")]`).or(page.locator(`button[type="button"].button.media-button`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="_shipping_fee_international"]`).first().fill(`10`); } catch { await page.locator(`input[name="_shipping_fee_international"]`).first().selectOption(`10`); }
    await page.locator(`input[name="_shipping_fee_national_free"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button[type="button"].wcv-button.wcv-ac-buttons`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-ac_temp_category_id-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "SELECT")]`).or(page.locator(`#select2-ac_temp_category_id-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Art & Crafts")]`).or(page.locator(`#select2-ac_temp_category_id-results > li:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-ac_temp_category_id-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "SELECT")]`).or(page.locator(`#select2-ac_temp_category_id-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Art Dolls & Miniatures")]`).or(page.locator(`#select2-ac_temp_category_id-results > li:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-ac_temp_category_id-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "SELECT")]`).or(page.locator(`#select2-ac_temp_category_id-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Art Dolls")]`).or(page.locator(`#select2-ac_temp_category_id-results > li:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button[type="button"].wcv-button.wcv-ac-add-category-done`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[placeholder="Search or add a tag…"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="Search or add a tag…"]`).first().fill(`test`); } catch { await page.locator(`input[placeholder="Search or add a tag…"]`).first().selectOption(`test`); }
    await expect(page.locator(`#select2-product_tags-results > li:nth-of-type(2)`).first()).toBeVisible();
    await page.locator(`#select2-product_tags-results > li:nth-of-type(2)`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="_regular_price"]`).first().fill(`45`); } catch { await page.locator(`input[name="_regular_price"]`).first().selectOption(`45`); }
    {
      const _lbl = page.locator(`label[for="product_save_button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#product_save_button`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#product_save_button`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await expect(page.locator(`.wcvendors-table.wcvendors-table-product.wcv-table`).first()).toBeVisible();
    await expect(page.locator(`.wcvendors-dashboard-wrapper > div.woocommerce-message:nth-of-type(2)`)).not.toHaveCount(0);
  });

  test('03 - Vendor Dashboard - Add Simple product Downloadable', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.locator(`a[href*="/members/"].user-link > img.avatar.photo`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#nav-bar-filter > .menu-item.menu-item-type-custom.menu-item-object-custom > a[href*="/maker-dashboard/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#dashboard-menu-item-product > a[href*="/maker-dashboard/product"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/maker-dashboard/settings/#featured_products"]`).first()).toBeVisible();
    await page.locator(`xpath=//a[contains(text(), "Add Product")]`).or(page.locator(`a[href*="/maker-dashboard/product/edit"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`#post_title`).first().fill(`Downloadable product test ${vars.alphanumeric ?? ''}`); } catch { await page.locator(`#post_title`).first().selectOption(`Downloadable product test ${vars.alphanumeric ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="post_excerpt-html"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#post_excerpt-html`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#post_excerpt`).first().fill(`Short Descritpion Downloadable`); } catch { await page.locator(`#post_excerpt`).first().selectOption(`Short Descritpion Downloadable`); }
    {
      const _lbl = page.locator(`label[for="post_content-html"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#post_content-html`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#post_content`).first().fill(`Description of the product Downloadable`); } catch { await page.locator(`#post_content`).first().selectOption(`Description of the product Downloadable`); }
    await page.locator(`xpath=//a[contains(text(), "Set featured image")]`).or(page.locator(`a[href="#"].wcv-media-uploader-featured-add`)).filter({ visible: true }).first().click({ force: true });
    // TODO: file upload — replace URL with a local file path or fetch buffer
    await page.locator(`div:not([style*="display: none;"]) > div > div > div > div > input[type="file"]`).first().setInputFiles(`https://ghostinspector-prod.s3.amazonaws.com/uploads/3c62db6d-7cb5-4a7b-9c64-4a21c69dcdad.png`);
    await mediaButtonEnabled(page, vars);
    await page.locator(`xpath=//button[contains(text(), "Set Product Feature Image")]`).or(page.locator(`button[type="button"].button.media-button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="_virtual"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//label[contains(text(), "Downloadable")]`).or(page.locator(`li:nth-of-type(2) > label`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.shipping-container`).first()).not.toBeVisible();
    await page.locator(`button[type="button"].wcv-button.wcv-ac-buttons`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-ac_temp_category_id-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "SELECT")]`).or(page.locator(`#select2-ac_temp_category_id-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Art & Crafts")]`).or(page.locator(`#select2-ac_temp_category_id-results > li:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-ac_temp_category_id-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "SELECT")]`).or(page.locator(`#select2-ac_temp_category_id-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Art Dolls & Miniatures")]`).or(page.locator(`#select2-ac_temp_category_id-results > li:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-ac_temp_category_id-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "SELECT")]`).or(page.locator(`#select2-ac_temp_category_id-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Art Dolls")]`).or(page.locator(`#select2-ac_temp_category_id-results > li:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button[type="button"].wcv-button.wcv-ac-add-category-done`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[placeholder="Search or add a tag…"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="Search or add a tag…"]`).first().fill(`test`); } catch { await page.locator(`input[placeholder="Search or add a tag…"]`).first().selectOption(`test`); }
    await expect(page.locator(`#select2-product_tags-results > li:nth-of-type(2)`).first()).toBeVisible();
    await page.locator(`#select2-product_tags-results > li:nth-of-type(2)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.button.insert`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="_wc_file_names[]"]`).first().fill(`File test`); } catch { await page.locator(`input[name="_wc_file_names[]"]`).first().selectOption(`File test`); }
    await page.locator(`xpath=//a[contains(text(), "Choose file")]`).or(page.locator(`a[href="#"].button.upload_file_button`)).filter({ visible: true }).first().click({ force: true });
    // TODO: file upload — replace URL with a local file path or fetch buffer
    await page.locator(`div:not([style*="display: none;"]) > div > div > div > div > input[type="file"]`).first().setInputFiles(`https://ghostinspector-prod.s3.amazonaws.com/uploads/3c62db6d-7cb5-4a7b-9c64-4a21c69dcdad.png`);
    await page.locator(`xpath=//button[contains(text(), "Insert file URL")]`).or(page.locator(`div:not([style*="display: none;"]) > div > div > div > div > div > div > button[type="button"].button.media-button`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="_regular_price"]`).first().fill(`41`); } catch { await page.locator(`input[name="_regular_price"]`).first().selectOption(`41`); }
    {
      const _lbl = page.locator(`label[for="product_save_button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#product_save_button`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#product_save_button`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await expect(page.locator(`.wcvendors-table.wcvendors-table-product.wcv-table`).first()).toBeVisible();
    await expect(page.locator(`.wcvendors-dashboard-wrapper > div.woocommerce-message:nth-of-type(2)`)).not.toHaveCount(0);
  });

  test('03 - Vendor Dashboard - Add Variable product', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.locator(`a[href*="/members/"].user-link > img.avatar.photo`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#nav-bar-filter > .menu-item.menu-item-type-custom.menu-item-object-custom > a[href*="/maker-dashboard/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#dashboard-menu-item-product > a[href*="/maker-dashboard/product"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Add Product")]`).or(page.locator(`a[href*="/maker-dashboard/product/edit"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`#post_title`).first().fill(`Variable product test ${vars.alphanumeric ?? ''}`); } catch { await page.locator(`#post_title`).first().selectOption(`Variable product test ${vars.alphanumeric ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="post_excerpt-html"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#post_excerpt-html`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#post_excerpt`).first().fill(`Short Descritpion Variable Parent`); } catch { await page.locator(`#post_excerpt`).first().selectOption(`Short Descritpion Variable Parent`); }
    {
      const _lbl = page.locator(`label[for="post_content-html"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#post_content-html`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#post_content`).first().fill(`Description of the product variable parent`); } catch { await page.locator(`#post_content`).first().selectOption(`Description of the product variable parent`); }
    await page.locator(`xpath=//a[contains(text(), "Set featured image")]`).or(page.locator(`a[href="#"].wcv-media-uploader-featured-add`)).filter({ visible: true }).first().click({ force: true });
    // TODO: file upload — replace URL with a local file path or fetch buffer
    await page.locator(`input[type="file"]`).first().setInputFiles(`https://ghostinspector-prod.s3.amazonaws.com/uploads/8cbd1b0f-d42b-48fd-9de7-4769840a448d.png`);
    await mediaButtonEnabled(page, vars);
    await page.locator(`xpath=//button[contains(text(), "Set Product Feature Image")]`).or(page.locator(`button[type="button"].button.media-button`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="_shipping_fee_international"]`).first().fill(`15`); } catch { await page.locator(`input[name="_shipping_fee_international"]`).first().selectOption(`15`); }
    try { await page.locator(`input[name="_shipping_fee_national"]`).first().fill(`5`); } catch { await page.locator(`input[name="_shipping_fee_national"]`).first().selectOption(`5`); }
    await page.locator(`button[type="button"].wcv-button.wcv-ac-buttons`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-ac_temp_category_id-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "SELECT")]`).or(page.locator(`#select2-ac_temp_category_id-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Artisan Foods")]`).or(page.locator(`#select2-ac_temp_category_id-results > li:nth-of-type(3)`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-ac_temp_category_id-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "SELECT")]`).or(page.locator(`#select2-ac_temp_category_id-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Baked Goods")]`).or(page.locator(`#select2-ac_temp_category_id-results > li:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button[type="button"].wcv-button.wcv-ac-add-category-done`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[placeholder="Search or add a tag…"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="Search or add a tag…"]`).first().fill(`test`); } catch { await page.locator(`input[placeholder="Search or add a tag…"]`).first().selectOption(`test`); }
    await expect(page.locator(`#select2-product_tags-results > li:nth-of-type(2)`).first()).toBeVisible();
    await page.locator(`#select2-product_tags-results > li:nth-of-type(2)`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-product-type-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "Simple product")]`).or(page.locator(`#select2-product-type-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Variable product")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Attributes")]`).or(page.locator(`a[href="#attributes"]`)).filter({ visible: true }).first().click({ force: true });
    // skipped: select-open click on 'select[name="attribute_taxonomy"]' — use selectOption instead
    try { await page.locator(`select[name="attribute_taxonomy"]`).first().fill(`pa_beard-length`); } catch { await page.locator(`select[name="attribute_taxonomy"]`).first().selectOption(`pa_beard-length`); }
    await page.locator(`button[type="button"].button.add_attribute`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="attribute_variation_0"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#attribute_variation_0`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`div.woocommerce_attribute.wcv-metabox.closed.taxonomy.pa_beard-length:nth-of-type(1) > .wcv_attribute_data.wcv-metabox-content > .wcv-column-group.wcv-horizontal-gutters > .all-70 > .control-group > .control > span > span:nth-of-type(1) > span > ul > li > input[placeholder="Select terms"][type="search"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//li[contains(text(), "11 to 14 inches")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.woocommerce_attribute.wcv-metabox.closed.taxonomy.pa_beard-length:nth-of-type(1) > .wcv_attribute_data.wcv-metabox-content > .wcv-column-group.wcv-horizontal-gutters > .all-70 > .control-group > .control > span > span:nth-of-type(1) > span > ul`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//li[contains(text(), "15 to 18 inches")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Variations")]`).or(page.locator(`a[href="#variations"]`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="select2-variable_manage_variations-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-variable_manage_variations-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Create variations from all attributes")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.wcv_variation.wcv-metabox.closed:nth-of-type(1) > .wcv-cols-group.wcv_variation_inner > div > h5.variation_title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="variable_regular_price[0]"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="variable_regular_price[0]"]`).first().fill(`35`); } catch { await page.locator(`input[name="variable_regular_price[0]"]`).first().selectOption(`35`); }
    await page.locator(`input[name="variable_sale_price[0]"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="variable_sale_price[0]"]`).first().fill(`25`); } catch { await page.locator(`input[name="variable_sale_price[0]"]`).first().selectOption(`25`); }
    await page.locator(`textarea[name="variable_description[0]"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`textarea[name="variable_description[0]"]`).first().fill(`Variation Description 1`); } catch { await page.locator(`textarea[name="variable_description[0]"]`).first().selectOption(`Variation Description 1`); }
    await page.locator(`div.wcv_variation.wcv-metabox.closed:nth-of-type(2) > .wcv-cols-group.wcv_variation_inner > div > h5.variation_title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="variable_regular_price[1]"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="variable_regular_price[1]"]`).first().fill(`40`); } catch { await page.locator(`input[name="variable_regular_price[1]"]`).first().selectOption(`40`); }
    await page.locator(`textarea[name="variable_description[1]"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`textarea[name="variable_description[1]"]`).first().fill(`Variation Description 2`); } catch { await page.locator(`textarea[name="variable_description[1]"]`).first().selectOption(`Variation Description 2`); }
    {
      const _lbl = page.locator(`label[for="product_save_button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#product_save_button`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#product_save_button`)).toHaveCount(0);
    await page.waitForLoadState('load');
    await expect(page.locator(`.wcvendors-table.wcvendors-table-product.wcv-table`).first()).toBeVisible();
    await expect(page.locator(`.wcvendors-dashboard-wrapper > div.woocommerce-message:nth-of-type(2)`)).not.toHaveCount(0);
  });

  test('04 - Vendor Dashboard - Coupons', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    await page.goto(`${vars.site ?? ''}maker-dashboard/`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/maker-dashboard/shop_coupon"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.wcvendors-dashboard-wrapper > h3`).first()).toHaveText(`No coupons found.`);
    await expect(page.locator(`.wcv-shop_coupon-table-buttons-before`).first()).toBeVisible();
    await expect(page.locator(`.wcv-shop_coupon-table-actions-after`).first()).toBeVisible();
  });

  test('04 - Vendor Dashboard - Logout', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    await page.goto(`${vars.site ?? ''}maker-dashboard/`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/wp-login.php?action=logout&redirect_to=https%3A%2F%2Fstagingsite.mavenfair.ca%2Fmy-account%2F&_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
  });

  test('04 - Vendor Dashboard - Orders', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    await page.goto(`${vars.site ?? ''}maker-dashboard/`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/maker-dashboard/order"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wcv_dashboard_table_header`)).not.toHaveCount(0);
    await expect(page.locator(`.wcvendors-dashboard-wrapper > h3`).first()).toContainText(`No orders found.`);
  });

  test('04 - Vendor Dashboard - Ratings', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    await page.goto(`${vars.site ?? ''}maker-dashboard/`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/maker-dashboard/rating"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wcvendors-dashboard-wrapper > h3`).first()).toContainText(`No ratings found.`);
  });

  test('04 - Vendor Dashboard - Store URL', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    await page.goto(`${vars.site ?? ''}maker-dashboard/`);
    await page.waitForLoadState('load');
    vars.storeUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const linkElement = document.querySelector<HTMLAnchorElement>('#dashboard-menu-item-view-store > a'); // Adjust selector as needed

// Extract the href attribute
const href = linkElement ? linkElement.href : null;

return href }, vars);
    await page.locator(`#dashboard-menu-item-view-store > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.shop-main-area > ul.products.columns-4:nth-of-type(1)`)).toHaveCount(0);
    await expect(page.locator(`.shop-main-area > h3`)).toHaveCount(0);
  });

  test('05 - Vendor Store Settings - Featured Products', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.goto(`${vars.site ?? ''}maker-dashboard/settings/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "Featured Products")]`).or(page.locator(`a[href="#featured_products"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.wcv_featured_products`).first()).toBeVisible();
    await page.locator(`#item-list > li:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#item-list > li:nth-of-type(2)`).filter({ visible: true }).first().click({ force: true });
    // TODO: command="dragAndDrop" target="#sortable-list > li:nth-of-type(2)" value="#sortable-list > li:nth-of-type(1)"
    {
      const _lbl = page.locator(`label[for="store_save_button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#store_save_button`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.wcvendors-dashboard-wrapper > div.woocommerce-message:nth-of-type(2)`).first()).toContainText(`Store Settings Saved`);
  });

  test('06 - Vendor Dashboard - Store URL', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.waitForLoadState('load');
    await page.goto(`${vars.site ?? ''}maker-dashboard/`);
    await page.waitForLoadState('load');
    vars.storeUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const linkElement = document.querySelector<HTMLAnchorElement>('#dashboard-menu-item-view-store > a'); // Adjust selector as needed

// Extract the href attribute
const href = linkElement ? linkElement.href : null;

return href }, vars);
    await page.goto(`${vars.storeUrl ?? ''}`);
    await page.waitForLoadState('load');
    await expect(page.locator(`.shop-main-area > h3`).first()).toContainText(`Featured Items`);
    await expect(page.locator(`.shop-main-area > ul.products.columns-4:nth-of-type(1)`)).not.toHaveCount(0);
  });

});
