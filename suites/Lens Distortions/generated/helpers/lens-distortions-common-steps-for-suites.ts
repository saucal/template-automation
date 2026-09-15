// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Lens Distortions - Common Steps for suites"
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

// GI: "Add product to cart" (627d2fa297a3bd06e09eaa95)
export async function addProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  // ↓ 06 - Product Page
  await page.waitForLoadState('load');
  await page.locator(`a[href="/pricing/"].button`).filter({ visible: true }).first().click({ force: true });
  // ↑ end 06 - Product Page
}

// GI: "Login" (627d2fa297a3bd06e09eaa96)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.not-logged-only > a[href="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`button.woocommerce-button.button.woocommerce-form-login__submit`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
}

// GI: "Register" (627d2fa297a3bd06e09eaa97)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.not-logged-only > a[href="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.create-new-account`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`input[name="register"][type="submit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toHaveText(`Error: Please provide a valid email address.`);
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  await page.locator(`input[name="register"][type="submit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toHaveText(`Error: Please enter an account password.`);
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`input[name="register"][type="submit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toHaveText(`Error: Please agree to terms before registering.`);
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="ld_registration_agreement"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#ld_registration_agreement`).filter({ visible: true }).first().click({ force: true }); }
  }
  try {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[title="reCAPTCHA"]`).first().contentFrame().locator(`div.recaptcha-checkbox-checkmark`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  } catch { /* optional step: click */ }
  await page.locator(`input[name="register"][type="submit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toContainText(`Thanks for signing up! Check your email for a verification link to activate your account.`);
  await extractUserFromEmail(page, vars);
  await page.locator(`a[href*="https://lensdistortions.flywheelstaging.com/my-account/?alg_wc_ev_verify_email"]`).filter({ visible: true }).first().click({ force: true });
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth > 540 }, vars)) {
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toHaveText(`Success: Your account is now active.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth <= 540 }, vars)) {
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner__content`)).first()).toHaveText(`Success:
Your account is now active.`);
  }
}
