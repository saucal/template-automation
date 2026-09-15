// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Biogeta - Common steps"
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

// GI: "Check Order on My Account" (6823b7c2ab4ff4354d29ca7b)
export async function checkOrderOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.elementor-column.elementor-inner-column.elementor-element.elementor-element-4bc17b98 > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-widget.elementor-widget-text-editor:nth-of-type(1) > .elementor-widget-container > p`).first()).toContainText(`Deine Bestellung ist bei uns eingegangen.`);
  vars.orderNumber = ((await page.locator(`div.elementor-column.elementor-inner-column.elementor-element:nth-of-type(2) > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-widget.elementor-widget-text-editor:nth-of-type(1) > .elementor-widget-container > p`).textContent()) ?? '').trim();
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let orderNumber = `${vars.orderNumber}`.match(/\d+/)[0];

return orderNumber }, vars);
  await expect(page.locator(`.wfty_2_col_left > .wfty_view`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`.wfty_2_col_right > .wfty_view`).first()).toContainText(`${vars.phone ?? ''}`);
  await expect(page.locator(`.wfty_2_col_left > .wfty_text > .wfty_view`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.zipCode ?? ''} ${vars.city ?? ''}`);
  await expect(page.locator(`.wfty_2_col_right > .wfty_text > .wfty_view`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.zipCode ?? ''} ${vars.city ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list.wfty_clearfix:nth-of-type(1) > .wfty_rightDiv > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalProd ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list:nth-of-type(1) a > .wfty_t`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list:nth-of-type(2) > .wfty_leftDiv.wfty_clearfix > .wfty_p_name`).first()).toContainText(`${vars.prod_desc ?? ''} → HOME Harmonizer - M`);
  await expect(page.locator(`div.wfty_pro_list.wfty_clearfix:nth-of-type(2) > .wfty_rightDiv > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list:nth-of-type(3) > .wfty_leftDiv.wfty_clearfix > .wfty_p_name`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc2 ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list.wfty_clearfix:nth-of-type(3) > .wfty_rightDiv > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list:nth-of-type(4) > .wfty_leftDiv.wfty_clearfix > .wfty_p_name`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc3 ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list.wfty_clearfix:nth-of-type(4) > .wfty_rightDiv > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice3 ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list:nth-of-type(5) > .wfty_leftDiv.wfty_clearfix > .wfty_p_name`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc4 ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list.wfty_clearfix:nth-of-type(5) > .wfty_rightDiv > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice4 ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list.wfty_clearfix:nth-of-type(6) > .wfty_leftDiv.wfty_clearfix > .wfty_p_name`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc5 ?? ''}`);
  await expect(page.locator(`div.wfty_pro_list.wfty_clearfix:nth-of-type(6) > .wfty_rightDiv > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice5 ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(2) > td`).first()).toContainText(`Free shipping`);
  await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`xpath=//span[contains(text(), "» Weiter Einkaufen")]`).or(page.locator(`a[href="/"] > .elementor-button-content-wrapper > .elementor-button-text`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.elementor-column.elementor-top-column.elementor-element.elementor-element-eb73e4e > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-icon-list--layout-inline.elementor-align-left.elementor-list-item-link-full_width.elementor-widget.elementor-widget-icon-list:nth-of-type(1) > .elementor-widget-container > .elementor-icon-list-items.elementor-inline-items > li.elementor-icon-list-item.elementor-inline-item:nth-of-type(4) > a[href="/mein-konto"] > .elementor-icon-list-text`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/de/mein-konto/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`In Bearbeitung`);
  await expect(page.locator(`tr:nth-of-type(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > p > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > p > a[href*="view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-parent > td.woocommerce-table__product-name.product-name > a[href*="/de/produkt/home-harmonizer/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-parent > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalProd ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(2) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} → HOME Harmonizer – M × 1`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(2) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(3) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc2 ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(3) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(4) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc3 ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(4) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice3 ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(5) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc4 ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(5) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice4 ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(6) > td.woocommerce-table__product-name.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} → ELEKTROSMOG minimieren – Video-Kurs + E-Book`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(6) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice5 ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toContainText(`Free shipping`);
  await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.zipCode ?? ''} ${vars.city ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.zipCode ?? ''} ${vars.city ?? ''}

${vars.phone ?? ''}`);
  await expect(page.locator(`.woocommerce-order-downloads`)).not.toHaveCount(0);
}

// GI: "Close Language change" (68e8efcfb370d43a1d89c737)
export async function closeLanguageChange(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="trp_ald_x_button_textarea"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//span[contains(text(), "Close and do not switch language")]`).or(page.locator(`#trp_ald_x_button_textarea`)).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Exit Test" (68c030f1eeab2f751a658f28)
export async function exitTest(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (page.url().includes(vars.prodUrl)) {
    // TODO: command="exit" target="" value="passing"
  }
}

// GI: "login" (6823ac52ab4ff4354d27c11b)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.elementor-column.elementor-top-column.elementor-element.elementor-element-eb73e4e > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-icon-list--layout-inline.elementor-align-left.elementor-list-item-link-full_width.elementor-widget.elementor-widget-icon-list:nth-of-type(1) > .elementor-widget-container > .elementor-icon-list-items.elementor-inline-items > li.elementor-icon-list-item.elementor-inline-item:nth-of-type(4) > a[href="/mein-konto"] > .elementor-icon-list-text`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`button[name="login"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
  await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
}

// GI: "Login Admin" (682624e855e584ea714fbd64)
export async function loginAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
return !!element }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await expect(page.locator(`#wpadminbar`)).not.toHaveCount(0);
}

// GI: "logout" (6823aebe31ace5dc60c9d90a)
export async function logout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/de/mein-konto/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "register" (6823acade75bee6181879df0)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.elementor-column.elementor-top-column.elementor-element.elementor-element-eb73e4e > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-icon-list--layout-inline.elementor-align-left.elementor-list-item-link-full_width.elementor-widget.elementor-widget-icon-list:nth-of-type(1) > .elementor-widget-container > .elementor-icon-list-items.elementor-inline-items > li.elementor-icon-list-item.elementor-inline-item:nth-of-type(4) > a[href="/mein-konto"] > .elementor-icon-list-text`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#reg_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.email ?? ''}`); }
  await page.locator(`button[name="register"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-info`).first()).toContainText(`Dein Konto mit BIOGETA® verwendet ein temporäres Passwort. Wir haben dir per E-Mail einen Link geschickt, über den du dein Passwort ändern kannst.`);
}

// GI: "Select PayPal" (6823b6e8ab4ff4354d29ae12)
export async function selectPayPal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `PayPal`;
  {
    const _lbl = page.locator(`label[for="payment_method_ppcp-gateway"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_ppcp-gateway`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[title="PayPal"]`).first().contentFrame().locator(`img.paypal-logo.paypal-logo-paypal`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`#email`).first().fill(`${vars.payPalUser ?? ''}`); } catch { await page.locator(`#email`).first().selectOption(`${vars.payPalUser ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="btnNext"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#btnNext`).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.lockIcon`)).not.toHaveCount(0);
  await expect(page.locator(`.lockIcon`)).toHaveCount(0);
  try { await page.locator(`div#login_passworddiv > div > input#password`).first().fill(`${vars.payPalPass ?? ''}`); } catch { await page.locator(`div#login_passworddiv > div > input#password`).first().selectOption(`${vars.payPalPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="btnLogin"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Log In")]`).or(page.locator(`#btnLogin`)).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="payment-submit-btn"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`[data-testid="submit-button-initial"]`).or(page.locator(`xpath=//button[contains(text(), "Complete Purchase")]`)).or(page.locator(`#payment-submit-btn`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.Spinner_spinner_2t_Ob`)).not.toHaveCount(0);
  await expect(page.locator(`.Spinner_spinner_2t_Ob`)).toHaveCount(0);
}

// GI: "user email link" (6823ad78b3e7bdebe932ce52)
export async function userEmailLink(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+\w+[^@]/g;
const str = `${vars.email}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}
