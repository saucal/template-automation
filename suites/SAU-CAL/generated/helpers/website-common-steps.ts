// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Website - Common steps"
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

// GI: "Verify header" (675c93a47a599a5bc8bbb1f6)
export async function verifyHeader(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`header.container > div > h1`).or(page.locator(`div > h1`)).first()).toContainText(`${vars.title ?? ''}`);
  try {
    await expect(page.locator(`header.container > div > p`).first()).toContainText(`${vars.subTitle ?? ''}`);
  } catch { /* optional step: assertTextPresent */ }
}
