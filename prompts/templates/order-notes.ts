// Template for order-note assertions. Plugins reorder/insert WC notes
// (Sequential Order Numbers, custom plugins). nth-of-type selectors break
// across environments — scan all notes and regex-match instead.
import { expect, type Page } from '@playwright/test';

export async function getOrderNoteTexts(adminPage: Page): Promise<string[]> {
  return adminPage.locator('ul.order_notes > li > div > p').allTextContents();
}

export async function expectOrderNoteMatches(
  adminPage: Page,
  pattern: RegExp,
  msg: string
): Promise<void> {
  const notes = await getOrderNoteTexts(adminPage);
  expect(
    notes.some((n) => pattern.test(n)),
    `${msg}\nnotes:\n${notes.join('\n---\n')}`
  ).toBeTruthy();
}
