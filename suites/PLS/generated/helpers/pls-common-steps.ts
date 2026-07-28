// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "PLS - Common Steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { extractUserFromEmail } from './common-steps-for-all-projects';

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

// GI: "“Forgot password?” flow" (6942ea630e1e837d8c79da33)
export async function forgotPasswordFlow(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/my-account/lost-password/"]`).or(page.locator(`a[href*="/my-phlearn/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`form.woocommerce-ResetPassword > p:nth-of-type(1)`).first()).toContainText(`Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.`);
  try { await page.locator(`#user_login`).or(page.locator(`input[name="email"]`)).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`input[name="email"]`)).first().selectOption(`${vars.username ?? ''}`); }
  await page.locator(`button[type="submit"].woocommerce-Button`).or(page.locator(`button[name="recovery_password"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.wc-block-components-notice-banner.is-success`).or(page.locator(`div.confirmation-area > h1`)).or(page.locator(`div.woocommerce-message`)).first()).toContainText(`Password reset email has been sent.`);
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#password_1`).or(page.locator(`iframe.phlearn-iframe #password_1`)).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).or(page.locator(`iframe.phlearn-iframe #password_1`)).first().selectOption(`${vars.password2 ?? ''}`); }
  try { await page.locator(`#password_2`).or(page.locator(`iframe.phlearn-iframe #password_2`)).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).or(page.locator(`iframe.phlearn-iframe #password_2`)).first().selectOption(`${vars.password2 ?? ''}`); }
  await page.locator(`button[type="submit"].woocommerce-Button`).or(page.locator(`iframe.phlearn-iframe button.woocommerce-Button.button`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
}

// GI: "Check Thank you page & My Account" (686f9f5de5d3587e1570c8d5)
export async function checkThankYouPageMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.location === 'Internet') {
    await expect(page.locator(`.woocommerce-order-downloads`)).not.toHaveCount(0);
  }
  vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = `${vars.prodDesc}`.replace('–','-')

return element }, vars);
  if (vars.days === '') {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days === '' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days === '' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps === 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item > td.woocommerce-table__product-name.product-name > div > div.pls-confirmation-summary__participant:nth-child(1)`).first()).toHaveText(`Participant #1
Full Name: ${vars.firstName ?? ''} ${vars.midName ?? ''} ${vars.lastName ?? ''}
Email: ${vars.email ?? ''}
Credentials: ${vars.credentials ?? ''}
Phone: ${vars.phone ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps === 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item > td.woocommerce-table__product-name.product-name > div > div.pls-confirmation-summary__participant:nth-child(2)`).first()).toHaveText(`Participant #2
Full Name: ${vars.firstName2 ?? ''} ${vars.midName2 ?? ''} ${vars.lastName2 ?? ''}
Email: ${vars.email2 ?? ''}
Credentials: ${vars.credentials2 ?? ''}
Phone: ${vars.phone2 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps === 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item > td.woocommerce-table__product-name.product-name > div > div.pls-confirmation-summary__participant:nth-child(3)`).first()).toHaveText(`Participant #3
Full Name: ${vars.firstName3 ?? ''} ${vars.midName3 ?? ''} ${vars.lastName3 ?? ''}
Email: ${vars.email3 ?? ''}
Credentials: ${vars.credentials3 ?? ''}
Phone: ${vars.phone3 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(1) > p`).first()).toHaveText(`${vars.firstName2 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(1) > p`).first()).toContainText(`${vars.firstName3 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(2) > p`).first()).toContainText(`${vars.lastName2 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(2) > p`).first()).toContainText(`${vars.lastName3 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    vars.phone2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.phone2}`.replaceAll('-','') }, vars);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    vars.phone3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.phone3}`.replaceAll('-','') }, vars);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(3) > p`).first()).toContainText(`${vars.phone2 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(3) > p`).first()).toContainText(`${vars.phone3 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(5) > p`).first()).toContainText(`${vars.credentials2 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(5) > p`).first()).toContainText(`${vars.credentials3 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(4) > p > a[href*="mailto:"]`).first()).toContainText(`${vars.email2 ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .wc-item-meta > li:nth-of-type(4) > p > a[href*="mailto:"]`).first()).toContainText(`${vars.email3 ?? ''}`);
  }
  if (vars.days !== '') {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.days ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.days ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > a[href*="/product/"]`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.days ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps == 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(3) td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(5) td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if (vars.discount !== '') {
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  if (vars.discount !== '') {
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td`).first()).toContainText(`Credit / Debit Card`);
  }
  if (vars.discount !== '') {
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.discount !== '') {
    await expect(page.locator(`tfoot > tr:nth-of-type(5) > td`).first()).toContainText(`Testing Notes`);
  }
  if (vars.discount === '') {
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td`).first()).toContainText(`Credit / Debit Card`);
  }
  if (vars.discount === '') {
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.discount === '') {
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toContainText(`Testing Notes`);
  }
  await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(1) > td.subscription-status.order-status.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-status.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Active`);
  await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(1) > td.subscription-total.order-total.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-total.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(2) > td.subscription-status.order-status.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-status.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Active`);
  await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(2) > td.subscription-total.order-total.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-total.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(3) > td.subscription-status.order-status.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-status.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Active`);
  await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(3) > td.subscription-total.order-total.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-total.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
}
