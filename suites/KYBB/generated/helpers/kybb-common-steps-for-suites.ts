// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "KYBB - Common Steps for suites"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';

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

// GI: "Add product to cart" (607f63a87f3aeb2f02537f3c)
export async function addProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/shop-by-therapy/"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[@href="https://bodybeststg.wpengine.com/therapy/aroma-therapies/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="?add-to-cart=954611"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.woocommerce-products-header__title`).first()).toContainText(`Cart`);
  await expect(page.locator(`.cart_totals > h2`).first()).toContainText(`Cart totals`);
}

// GI: "Login" (60d488169e906a6e81365ba2)
export async function login(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.logInWrap > a[href="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`button.woocommerce-button.button.woocommerce-form-login__submit`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.woocommerce-products-header__title`).first()).toContainText(`My Account`);
  await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
}

// GI: "Register" (60949235fa60eb2e92b86a25)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.logInWrap > a[href="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.pass ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.pass ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.woocommerce-products-header__title`).first()).toContainText(`My Account`);
  await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
}
