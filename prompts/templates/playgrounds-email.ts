// Template for Playgrounds email helpers — runs the AJAX call inside the
// browser via page.evaluate() so WPEngine WAF doesn't block non-browser POSTs.
//
// Setup checklist (failures are silent):
//  - SAU/CAL Email Redirect plugin active on each subsite (network-active OR per-subsite).
//  - Admin user added to each subsite (cookie alone won't grant capabilities).
//  - emailPage navigated to subsite root (`./`) BEFORE evaluate — plugin
//    enqueues `window.ajax_object` only on subsite front-end pages.
//  - After viewing mail.playgrounds.saucal.io/view/<id>.html, navigate back
//    to subsite root before next call (different host strips ajax_object).
import type { Page } from '@playwright/test';

export async function fetchPlaygroundsEmail(
  emailPage: Page,
  email: string,
  subjectFilter: string,
  nth = 0
): Promise<string | null> {
  await emailPage.goto('./');
  await emailPage.waitForLoadState('load');

  return emailPage.evaluate(
    async ({ email, subjectFilter, nth }) => {
      const data = new URLSearchParams();
      data.append('action', 'fetch_mail');
      data.append('email', email);
      data.append('extraFilter', subjectFilter);
      data.append('limit', '1000');

      for (let i = 0; i < 10; i++) {
        try {
          const r = await fetch((window as any).ajax_object.ajax_url, {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });
          const result = await r.json();
          if (result.success && result.data) {
            const msgs = JSON.parse(result.data);
            if (msgs.messages.length > nth) {
              return `https://mail.playgrounds.saucal.io/view/${msgs.messages[nth].ID}.html`;
            }
          }
        } catch {}
        await new Promise((res) => setTimeout(res, 3000));
      }
      return null;
    },
    { email, subjectFilter, nth }
  );
}

export async function deletePlaygroundsEmail(
  emailPage: Page,
  email: string,
  subjectFilter: string
): Promise<void> {
  await emailPage.goto('./');
  await emailPage.waitForLoadState('load');
  await emailPage.evaluate(
    async ({ email, subjectFilter }) => {
      const data = new URLSearchParams();
      data.append('action', 'delete_mail');
      data.append('email', email);
      data.append('extraFilter', subjectFilter);
      const r = await fetch((window as any).ajax_object.ajax_url, {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const result = await r.json();
      if (!result.success) console.warn('Failed to delete mail:', result);
    },
    { email, subjectFilter }
  );
}

// Filter parallel-safety: when 4 multisite projects place orders concurrently,
// filter on **site title** instead of order number — `subject: ${suiteVars.title}`.
// Customer emails are unique per test; the title filter protects the shared
// admin inbox from cross-project bleed.
