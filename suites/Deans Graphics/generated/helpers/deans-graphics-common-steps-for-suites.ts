// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Deans Graphics - Common steps for suites"
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

// GI: "Loading Icon" (642f24710b7aefb972412348)
export async function loadingIcon(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await expect(page.locator(`.loading-ico`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let block = document.getElementsByClassName("loading-ico")
return block.length > 0 }, vars)) {
      await expect(page.locator(`.loading-ico`)).toHaveCount(0);
    }
  } catch { /* optional step: assertElementNotPresent */ }
}
