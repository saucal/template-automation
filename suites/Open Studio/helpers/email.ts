// Email inbox abstraction. The GI tests read test mail from Ghost Inspector's
// hosted inbox (https://email.ghostinspector.com/{user}); this implements that
// reader behind a stable interface (forgotPasswordLink / welcomeLink / refundEmail).
//
// BUILD-TIME NOTE: confirm where the live staging site actually delivers mail.
// If it uses the SAU/CAL Playgrounds Email Redirect plugin (Mailpit) instead,
// port `suites/No Pong/helpers/playgrounds-email.ts` and reimplement the three
// exported functions against it — the interface below stays the same, so callers
// (account.ts, assertions.ts) do not change.
import { type Page, expect } from '@playwright/test';

const GI_INBOX = 'https://email.ghostinspector.com/';

/**
 * Username GI derives from the address: strips an optional `qa+` prefix and takes
 * the leading word token (e.g. `qa+os-refund-123@x` → `os`). Matches the GI regex
 * used in open-studio-common-steps.ts (see the match() call below).
 */
export function inboxUser(email: string): string {
  const m = email.match(/^(qa\+)?(\w+)[^@]*/);
  return m ? m[2] : email;
}

/** Open the hosted inbox for `email` and wait for the message list to render. */
export async function openInbox(emailPage: Page, email: string): Promise<void> {
  await emailPage.goto(`${GI_INBOX}${inboxUser(email)}`, { waitUntil: 'networkidle' });
}

/**
 * Find the most recent message whose link/body matches `pattern`, open it, and
 * return the href of the first anchor matching `linkSelector`.
 */
async function openMessageAndGetLink(
  emailPage: Page,
  email: string,
  pattern: RegExp,
  linkSelector: string
): Promise<string> {
  await openInbox(emailPage, email);
  const message = emailPage.locator('a', { hasText: pattern }).first();
  await message.waitFor({ state: 'visible', timeout: 60_000 });
  await message.click();
  await emailPage.waitForLoadState('networkidle');
  const link = emailPage.locator(linkSelector).first();
  await link.waitFor({ state: 'visible' });
  const href = await link.getAttribute('href');
  expect(href, 'email link href present').toBeTruthy();
  return href!;
}

/** Forgot-password: find the reset email and return the reset link href. */
export async function forgotPasswordLink(emailPage: Page, email: string): Promise<string> {
  return openMessageAndGetLink(emailPage, email, /password|reset/i, 'a.link');
}

/** Welcome / set-password link sent after a join. */
export async function welcomeLink(emailPage: Page, email: string): Promise<string> {
  return openMessageAndGetLink(emailPage, email, /welcome|set.*password|open studio/i, 'a.link');
}

/**
 * Refund email: open the "has been refunded" message and return the negative
 * amount string (e.g. '-$19.00') for assertion.
 */
export async function refundEmail(emailPage: Page, email: string): Promise<string> {
  await openInbox(emailPage, email);
  const message = emailPage.locator('a', { hasText: /has been refunded/i }).first();
  await message.waitFor({ state: 'visible', timeout: 60_000 });
  await message.click();
  await emailPage.waitForLoadState('networkidle');
  const amount = emailPage.locator('tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount').first();
  return ((await amount.textContent()) ?? '').trim();
}
