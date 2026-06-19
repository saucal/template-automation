// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Common Steps"
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

// GI: "Back to Top" (690c934a28d2a810e84f5c65)
export async function backToTop(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`#kt-scroll-up`)).not.toHaveCount(0);
  await expect(page.locator(`#kt-scroll-up.scroll-visible`)).toHaveCount(0);
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); window.scrollTo(0, 1000) }, vars);
  await expect(page.locator(`#kt-scroll-up.scroll-visible`)).not.toHaveCount(0);
  await page.locator(`#kt-scroll-up.scroll-visible`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#kt-scroll-up.scroll-visible`)).toHaveCount(0);
}
