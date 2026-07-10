// Template for order-note assertions. Plugins reorder/insert WC notes
// (Sequential Order Numbers, custom plugins). nth-of-type selectors break
// across environments — scan all notes and regex-match instead.
import { expect, type Page } from '@playwright/test';

export async function getOrderNoteTexts(adminPage: Page): Promise<string[]> {
  return adminPage.locator('ul.order_notes > li > div p').allTextContents();
}

export async function expectOrderNoteMatches(
  adminPage: Page,
  pattern: RegExp,
  msg: string
): Promise<void> {
  // Notes load/refresh async (the notes meta box renders after DOMContentLoaded and
  // gateway notes like the Accept.Blue capture can lag a few seconds) — poll.
  await expect
    .poll(
      async () => (await getOrderNoteTexts(adminPage)).some((n) => pattern.test(n)),
      { timeout: 30_000, intervals: [1_000, 2_000, 3_000, 5_000], message: msg }
    )
    .toBeTruthy();
}
