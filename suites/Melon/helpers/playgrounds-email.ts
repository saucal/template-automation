// Email capture via the Playgrounds MAILPIT instance (mail.playgrounds.saucal.io).
// Melon sends through a real ESP (SendGrid-style) which rewrites links as tracker
// URLs (url….melonoptics.com/ls/click?upn=…) that 302 to the real page — so we
// follow the link by NAVIGATING to it, not by parsing the destination (rule 14).
//
// Mailpit exposes a public HTTP API (no auth, no WP plugin), so we hit it directly
// via Playwright's request context — the template's `fetch_mail`/`ajax_object` WP
// approach does NOT exist on this site.
import { type Page } from '@playwright/test';

const MAILPIT = 'https://mail.playgrounds.saucal.io';

/**
 * Poll Mailpit for the newest message to `email` whose subject contains `subjectFilter`,
 * then return the (tracker) link whose anchor text mentions "password" — the set/reset
 * CTA. Throws if no matching email or link arrives within the window. The returned URL
 * is an ESP tracker that 302s to the real melonoptics set-password page; navigate to it.
 */
export async function fetchPasswordLinkFromEmail(page: Page, email: string, subjectFilter: string): Promise<string> {
  let html = '';
  for (let i = 0; i < 20 && !html; i++) {
    const res = await page.request.get(`${MAILPIT}/api/v1/search`, { params: { query: email, limit: 50 } });
    if (res.ok()) {
      const data = await res.json();
      const msg = (data.messages ?? []).find(
        (m: any) =>
          (m.Subject ?? '').includes(subjectFilter) &&
          (m.To ?? []).some((t: any) => (t.Address ?? '').toLowerCase() === email.toLowerCase())
      );
      if (msg) {
        const full = await page.request.get(`${MAILPIT}/api/v1/message/${msg.ID}`);
        if (full.ok()) {
          const body = await full.json();
          html = body.HTML || body.Text || '';
        }
      }
    }
    if (!html) await page.waitForTimeout(3000);
  }
  if (!html) throw new Error(`no "${subjectFilter}" email in Mailpit for ${email} within timeout`);

  // Pick the link whose anchor text mentions password (the set/reset CTA), not the
  // logo / "My account" links which share the same tracker host.
  for (const m of html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (/password/i.test(text)) return m[1];
  }
  throw new Error(`no password link found in the "${subjectFilter}" email`);
}
