// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Common step"
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

// GI: "register" (673f40f6aac72eeccc3420ae)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#reg_billing_first_name`).first().fill(`QA`); } catch { await page.locator(`#reg_billing_first_name`).first().selectOption(`QA`); }
  try { await page.locator(`#reg_billing_last_name`).first().fill(`${vars.alphanumeric ?? ''}`); } catch { await page.locator(`#reg_billing_last_name`).first().selectOption(`${vars.alphanumeric ?? ''}`); }
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
}
