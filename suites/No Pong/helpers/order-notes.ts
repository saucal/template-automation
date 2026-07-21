// Template for order-note assertions. Plugins reorder/insert WC notes
// (Sequential Order Numbers, custom plugins). nth-of-type selectors break
// across environments — scan all notes and regex-match instead.
//
// Notes in the HPOS admin editor load via JavaScript after the page skeleton
// renders. allTextContents() with no wait returns [] if called too early.
// expectOrderNoteMatches polls until the pattern appears (or 30s timeout) so
// the Stripe / PayPal gateway note is visible before the assertion runs.
import { expect, type Page } from '@playwright/test';

export async function getOrderNoteTexts(adminPage: Page): Promise<string[]> {
  return adminPage.locator('ul.order_notes > li > div p').allTextContents();
}

export async function expectOrderNoteMatches(
  adminPage: Page,
  pattern: RegExp,
  msg: string
): Promise<void> {
  let notes: string[] = [];
  try {
    await expect
      .poll(
        async () => {
          notes = await getOrderNoteTexts(adminPage);
          return notes.some((n) => pattern.test(n));
        },
        { timeout: 30_000 }
      )
      .toBe(true);
  } catch {
    expect(false, `${msg}\nnotes:\n${notes.join('\n---\n')}`).toBeTruthy();
  }
}
