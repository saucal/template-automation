// PayPal PPCP (Smart Buttons) checkout — reusable migration template.
//
// Copy into helpers/<site>.ts and adapt. This is the proven flow from the No Pong
// + Vesica migrations. PayPal PPCP is the single most fragile + expensive gateway to
// automate — read rule 15 in the migration prompt before touching it, and treat it as
// OPTIONAL per region/brand (keep it on ONE reference site, drop from low-value ones).
//
// Why it looks the way it does:
//  - The "Pay with PayPal" Smart Button renders inside PayPal's cross-origin SDK iframe
//    with a GENERATED name/src — there is no stable iframe selector, so scan every
//    frame for the button (role=link "Pay with PayPal" or [data-funding-source=paypal]).
//    The SDK mounts it asynchronously AFTER PayPal is selected → poll until it shows.
//  - Clicking it opens a sandbox POPUP that starts at about:blank and only navigates to
//    sandbox.paypal.com a few seconds later → WAIT for it to leave about:blank before
//    driving login, or every field check runs against the blank page and silently skips.
//  - Sandbox screens + timing vary run-to-run (email→Next→password→Log In, or combined;
//    transient spinner states where buttons vanish) → drive it as a RESILIENT LOOP, not
//    a linear sequence: each tick fill whatever email/password field is visible+empty and
//    click the first available advance button (Next → Log In → the review Pay CTA).
//  - The review SUBMIT is the "Pay" button (#one-time-cta) — NOT the "Pay in full" tile
//    (id-pay-in-full-action, a role=checkbox that only SELECTS the funding source).
//  - Sometimes PPCP redirects in-place instead of opening a popup → fall back to driving
//    the main page (flow = popup ?? page).
//
// Cross-origin note: the PayPal sandbox pages are NOT your app, so the resilient/
// Stagehand wrapper (rule 23) does NOT apply inside the popup — use plain Playwright
// locators there. DO route the on-site gateway SELECT (label[for*=payment_method_ppcp])
// through your resilient wrapper.
//
// Env: PAY_PAL_USER + PAY_PAL_PASS (sandbox buyer). Selects the gateway, pays, and waits
// for the merchant page to reach /order-received/.
import { type Page } from '@playwright/test';

export async function payWithPayPal(
  page: Page,
  creds: { user?: string; pass?: string } = {}
): Promise<void> {
  const user = creds.user ?? process.env.PAY_PAL_USER ?? '';
  const pass = creds.pass ?? process.env.PAY_PAL_PASS ?? '';

  // 1. Select the PPCP gateway (route THIS through your resilient wrapper in real code).
  await page
    .locator('label[for*="payment_method_ppcp"], label[for*="payment_method_paypal"]')
    .or(page.locator('input[id*="ppcp"], input[id*="paypal"]').first())
    .first()
    .click({ force: true });

  // 2. Find the Smart Button in whichever cross-origin frame renders it (poll — async).
  const findPayButton = async () => {
    const framed = page.locator('iframe[name*="paypal" i]').first();
    if (await framed.count().catch(() => 0)) {
      const link = framed.contentFrame().getByRole('link', { name: /pay with paypal/i });
      if (await link.count().catch(() => 0)) return link.first();
    }
    for (const frame of page.frames()) {
      const byRole = frame.getByRole('link', { name: /pay with paypal/i });
      if (await byRole.count().catch(() => 0)) return byRole.first();
      const byData = frame.locator('[data-funding-source="paypal"]');
      if (await byData.count().catch(() => 0)) return byData.first();
    }
    return null;
  };
  let payButton = await findPayButton();
  for (let i = 0; i < 20 && !payButton; i++) {
    await page.waitForTimeout(1_000);
    payButton = await findPayButton();
  }
  if (!payButton) throw new Error('PayPal Smart Button never rendered after selecting PayPal');
  await payButton.waitFor({ state: 'visible', timeout: 20_000 });

  // 3. Click → sandbox popup (about:blank first). Fall back to the main page if no popup.
  const popupPromise = page.waitForEvent('popup', { timeout: 30_000 }).catch(() => null);
  await payButton.click({ timeout: 20_000 });
  const popup = await popupPromise;
  const flow = popup ?? page;
  if (popup) {
    await popup.waitForURL((u) => !u.toString().includes('about:blank'), { timeout: 30_000 }).catch(() => {});
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
  }

  // 4. Resilient login+approve loop (match by accessible name; ids drift). Best-effort per
  //    tick because the account may already be signed in and screens transition.
  const emailField = flow.getByRole('textbox', { name: /email or mobile/i })
    .or(flow.locator('#email, input[name="login_email"], input[type="email"]')).first();
  const passField = flow.getByRole('textbox', { name: /^password$/i })
    .or(flow.locator('#password, input[name="login_password"], input[type="password"]')).first();
  const nextBtn = flow.getByRole('button', { name: /^next$/i }).first();
  const loginBtn = flow.getByRole('button', { name: /log\s?in|^login$/i }).first();
  const approveBtn = flow.getByRole('button', { name: 'Pay', exact: true })
    .or(flow.locator('#one-time-cta, button:has-text("Pay Now"), button:has-text("Complete Purchase"), [data-testid="submit-button-initial"]')).first();

  const fillIfEmpty = async (loc: ReturnType<Page['locator']>, value: string) => {
    if (!value) return;
    if (!(await loc.isVisible({ timeout: 500 }).catch(() => false))) return;
    if (await loc.inputValue().catch(() => '')) return;
    await loc.fill(value, { timeout: 5_000 }).catch(() => {});
  };
  const clickIfVisible = async (loc: ReturnType<Page['locator']>) => {
    if (await loc.isVisible({ timeout: 500 }).catch(() => false)) {
      await loc.click({ timeout: 5_000 }).catch(() => {});
      return true;
    }
    return false;
  };

  for (let i = 0; i < 15; i++) {
    if (page.url().includes('/order-received/')) break;
    if (popup && popup.isClosed()) break;
    await fillIfEmpty(emailField, user);
    await fillIfEmpty(passField, pass);
    if (!(await clickIfVisible(nextBtn))) {
      if (!(await clickIfVisible(loginBtn))) await clickIfVisible(approveBtn);
    }
    await page.waitForTimeout(2_000);
  }

  // 5. The popup closes and the merchant page redirects to order-received.
  await page.waitForURL('**/order-received/**', { timeout: 60_000 });
}
