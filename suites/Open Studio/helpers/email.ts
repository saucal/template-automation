// Email inbox abstraction over Playgrounds Mailpit (same mechanism as No Pong) —
// the site routes transactional mail into a shared Mailpit inbox, read via its
// REST API in playgrounds-email.ts. These helpers find the relevant message and
// extract what callers need (reset/welcome link, refund body text). `emailPage`
// is navigated to the Mailpit web view purely for video/screenshot evidence.
//
// Override the inbox host with MAILPIT_URL if the environment differs.
import { type Page, expect } from '@playwright/test';
import { findEmail, mailpitViewUrl } from './playgrounds-email';

/** First href whose anchor text matches one of the patterns; &amp; un-escaped. */
function hrefMatching(html: string, ...patterns: RegExp[]): string | undefined {
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1].replace(/&amp;/g, '&');
  }
  return undefined;
}

/** Forgot-password: find the reset email and return the reset link href. */
export async function forgotPasswordLink(emailPage: Page, email: string): Promise<string> {
  const msg = await findEmail(email, { subjectFilter: 'Password' });
  expect(msg, `a password-reset email for ${email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});
  const html = msg!.HTML ?? '';
  const link = hrefMatching(
    html,
    /<a[^>]+href="([^"]+)"[^>]*>[^<]*reset[^<]*password/i,
    /<a[^>]+href="([^"]+)"[^>]*>[^<]*(?:set|create)[^<]*password/i,
    /<a[^>]+href="([^"]+)"[^>]*>[^<]*click here/i,
  );
  expect(link, `reset email should contain a reset-password link\nsubject: ${msg!.Subject}`).toBeTruthy();
  return link!;
}

/** Welcome / set-password link sent after a join. */
export async function welcomeLink(emailPage: Page, email: string): Promise<string> {
  const msg = await findEmail(email, { subjectFilter: 'Welcome' });
  expect(msg, `a welcome email for ${email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});
  const html = msg!.HTML ?? '';
  const link = hrefMatching(
    html,
    /<a[^>]+href="([^"]+)"[^>]*>[^<]*(?:set|create)[^<]*password/i,
    /<a[^>]+href="([^"]+)"[^>]*>[^<]*click here/i,
    /<a[^>]+href="([^"]+)"[^>]*>[^<]*get started/i,
  );
  expect(link, `welcome email should contain a set-password / get-started link\nsubject: ${msg!.Subject}`).toBeTruthy();
  return link!;
}

/** Stripped text of the refund email body — for refund/order/amount assertions. */
export async function refundEmailText(emailPage: Page, email: string): Promise<string> {
  const msg = await findEmail(email, { subjectFilter: 'refund' });
  expect(msg, `a refund email for ${email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});
  return `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
}
