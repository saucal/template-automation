// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Merch - common test steps"
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

// GI: "Next Payment date" (698b9a405fe00b498f41602e)
export async function nextPaymentDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function extractAllMonthDayYearDates(text) {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ].join("|");

  // \b = word boundary → avoids matching inside other words
  const regex = new RegExp(`\\b(${monthNames})\\s+(\\d{1,2}),\\s+(\\d{4})\\b`, "gi");

  const dates = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    dates.push({
      full: match[0],     // "March 10, 2026"
      month: match[1],
      day:   match[2],
      year:  match[3]
    });
  }

  return dates;
}
let nextPay = extractAllMonthDayYearDates(`${vars.nextPay}`);

nextPay = Date.parse(nextPay[0].full);
nextPay = new Date(nextPay);

const now = new Date();
const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use false for 24-hour format
});

const date = new Date(formatter.format(now));

return date.getDate() === nextPay.getDate() &&
       (date.getMonth() + 1) === nextPay.getMonth() &&
       date.getFullYear() === nextPay.getFullYear(); }, vars)).toBeTruthy();
}
