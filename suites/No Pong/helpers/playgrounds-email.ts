// Playgrounds email lookup via the Mailpit REST API (public, no auth).
//
// The site routes mail for `@playgrounds.saucal.io` recipients into a shared
// Mailpit inbox at MAILPIT_URL. We search by recipient (unique per test) and
// fetch the message HTML/text. Uses an independent APIRequestContext (not the
// browser) so there are no CORS limits and no dependency on `window.ajax_object`.
//
// Override the inbox host with MAILPIT_URL if the environment differs.
import { request, type APIRequestContext } from '@playwright/test';

const MAILPIT_URL = process.env.MAILPIT_URL ?? 'https://mail.playgrounds.saucal.io';

export interface MailpitMessage {
  ID: string;
  Subject: string;
  To: Array<{ Name: string; Address: string }>;
  HTML: string;
  Text: string;
}

/** Mailpit web-UI URL for a message (handy for video evidence). */
export function mailpitViewUrl(id: string): string {
  return `${MAILPIT_URL}/view/${id}.html`;
}

/**
 * Poll Mailpit for the most recent message to `email` (optionally also matching
 * a subject substring). Returns the full message (HTML + Text) or null after
 * `attempts` tries.
 *
 * No Pong sends transactional mail through a SendGrid ESP (the reset-password
 * link is a `url7488.nopong.com.au/ls/click` tracker), not straight into Mailpit.
 * That relay adds tens of seconds of latency AND reorders messages — a reset
 * email can land ~30-40s after it was requested and out of order vs the
 * account-created mail. So we poll up to ~120s by default (the old 60s window,
 * tuned for leggari's direct Mailpit, timed out on the slower relayed mail).
 */
export async function findEmail(
  email: string,
  opts: { subjectFilter?: string; attempts?: number; intervalMs?: number } = {}
): Promise<MailpitMessage | null> {
  const { subjectFilter, attempts = 40, intervalMs = 3_000 } = opts;
  // Quote the address: Mailpit's query parser treats unquoted '+' as a term
  // separator, breaking lookup for '+'-tagged addresses like qa+test@...
  const query = `to:"${email}"` + (subjectFilter ? ` subject:"${subjectFilter}"` : '');
  const api: APIRequestContext = await request.newContext({ ignoreHTTPSErrors: true });
  try {
    for (let i = 0; i < attempts; i++) {
      const res = await api.get(`${MAILPIT_URL}/api/v1/search?query=${encodeURIComponent(query)}&limit=5`);
      if (res.ok()) {
        const data = (await res.json()) as { messages?: Array<{ ID: string }> };
        if (data.messages && data.messages.length > 0) {
          const detail = await api.get(`${MAILPIT_URL}/api/v1/message/${data.messages[0].ID}`);
          if (detail.ok()) return (await detail.json()) as MailpitMessage;
        }
      }
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, intervalMs));
    }
    return null;
  } finally {
    await api.dispose();
  }
}

/** Delete all messages to `email` (cleanup / pre-test reset). */
export async function deleteEmails(email: string): Promise<void> {
  const api = await request.newContext({ ignoreHTTPSErrors: true });
  try {
    await api.delete(`${MAILPIT_URL}/api/v1/search?query=${encodeURIComponent(`to:"${email}"`)}`);
  } catch {
    /* best effort */
  } finally {
    await api.dispose();
  }
}
