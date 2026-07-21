// Email capture via the Playgrounds MAILPIT instance (mail.playgrounds.saucal.io).
// Melon sends through a real ESP (SendGrid-style) which rewrites links as tracker
// URLs (url….melonoptics.com/ls/click?upn=…) that 302 to the real page — so we
// follow the link by NAVIGATING to it, not by parsing the destination (rule 14).
//
// Mailpit exposes a public HTTP API (no auth, no WP plugin). We poll it for the
// message ID, then NAVIGATE emailPage to the rendered message (/view/<id>.html)
// and read the password-CTA link off the page — a real page interaction on the
// dedicated email context (so the resilient/AI tier applies).
import { type Page } from '@playwright/test';

const MAILPIT = 'https://mail.playgrounds.saucal.io';

/**
 * Poll Mailpit for the newest message to `email` whose subject contains
 * `subjectFilter`, open its rendered view on emailPage, and return the (tracker)
 * link whose anchor text mentions "password" — the set/reset CTA. Throws if no
 * matching email or link arrives within the window. The returned URL is an ESP
 * tracker that 302s to the real melonoptics set-password page; navigate to it.
 */
/**
 * Poll Mailpit for the newest message to `email` whose subject contains `subjectFilter`
 * and OPEN its rendered view on emailPage (leaving the page there so callers can assert
 * on the email body). Throws if no matching email arrives within the window.
 */
export async function openEmailBySubject(emailPage: Page, email: string, subjectFilter: string): Promise<void> {
  await emailPage.goto(`${MAILPIT}/`);
  let id = '';
  for (let i = 0; i < 20 && !id; i++) {
    const res = await emailPage.request.get(`${MAILPIT}/api/v1/search`, { params: { query: email, limit: 50 } });
    if (res.ok()) {
      const data = await res.json();
      const msg = (data.messages ?? []).find(
        (m: any) =>
          (m.Subject ?? '').includes(subjectFilter) &&
          (m.To ?? []).some((t: any) => (t.Address ?? '').toLowerCase() === email.toLowerCase())
      );
      if (msg) id = msg.ID;
    }
    if (!id) await emailPage.waitForTimeout(3000);
  }
  if (!id) throw new Error(`no "${subjectFilter}" email in Mailpit for ${email} within timeout`);
  await emailPage.goto(`${MAILPIT}/view/${id}.html`);
  await emailPage.waitForLoadState('load');
}

export async function fetchPasswordLinkFromEmail(emailPage: Page, email: string, subjectFilter: string): Promise<string> {
  // emailPage is a lazy fixture Proxy — it only creates its context on a method
  // call, and `.request` is a property, so navigate once first to materialise the
  // real page/request context (this also lands us on the Mailpit host).
  await emailPage.goto(`${MAILPIT}/`);

  // 1. Poll the REST API for the matching message ID.
  let id = '';
  for (let i = 0; i < 20 && !id; i++) {
    const res = await emailPage.request.get(`${MAILPIT}/api/v1/search`, { params: { query: email, limit: 50 } });
    if (res.ok()) {
      const data = await res.json();
      const msg = (data.messages ?? []).find(
        (m: any) =>
          (m.Subject ?? '').includes(subjectFilter) &&
          (m.To ?? []).some((t: any) => (t.Address ?? '').toLowerCase() === email.toLowerCase())
      );
      if (msg) id = msg.ID;
    }
    if (!id) await emailPage.waitForTimeout(3000);
  }
  if (!id) throw new Error(`no "${subjectFilter}" email in Mailpit for ${email} within timeout`);

  // 2. Open the rendered message and read the password-CTA link (anchor text
  //    mentions "password", not the logo / "My account" links on the same host).
  await emailPage.goto(`${MAILPIT}/view/${id}.html`);
  await emailPage.waitForLoadState('load');
  const cta = emailPage.getByRole('link', { name: /password/i }).first();
  await cta.waitFor({ state: 'attached', timeout: 15_000 });
  const href = await cta.getAttribute('href');
  if (!href) throw new Error(`no password link found in the "${subjectFilter}" email`);
  return href;
}
