// PayPal PPCP (Smart Buttons) checkout — reusable migration template.
//
// Copy into helpers/paypal.ts and adapt. This is the PROVEN flow: No Pong →
// Vesica → Cash Fore Clubs, unchanged at every hop. CFC hand-wrote its own
// variant first, spent days on it, and the fix was to port this one verbatim —
// so port it verbatim. See paypal-ppcp + gateway-drift-recon in the migration
// prompt before touching it, and treat PayPal as OPTIONAL per region/brand
// (keep it on ONE reference site, drop it from low-value ones).
//
// Why it looks the way it does — every line here is a failure someone paid for:
//  - The "Pay with PayPal" Smart Button renders inside PayPal's cross-origin SDK
//    iframe with a GENERATED name/src, mounted asynchronously → poll, and sweep
//    every frame UNFILTERED. CFC's version skipped frames whose `frame.name()`
//    wasn't `paypal_buttons` — a generated name it had no business trusting, and
//    the reason its button "clicked" without ever invoking createOrder.
//  - An unscoped `iframe[name*="paypal"]` matches PPCP's `__zoid__paypal_message__`
//    frame (the "3 payments of £x" copy) FIRST. Harmless here: it holds no pay
//    link, so the unfiltered sweep below then finds the real one.
//  - Clicking opens a sandbox POPUP that starts at about:blank and only navigates
//    to sandbox.paypal.com seconds later → WAIT for it to leave about:blank, or
//    every field check runs against a blank page and silently skips.
//  - Sandbox screens vary run-to-run (email→Next→password→Log In, or combined;
//    transient spinners where buttons vanish) → drive a RESILIENT LOOP, not a
//    linear sequence. The sandbox Next / Log In buttons have NO stable ids; only
//    getByRole('button', {name}) gets past them (three probe attempts filled the
//    form correctly and never submitted it, one sitting on a single screen for 34
//    consecutive ticks).
//  - Approve is tried LAST. Next and Log In belong to earlier screens; trying
//    approve first fires it at a screen that isn't the review.
//  - The review SUBMIT is the "Pay" button (#one-time-cta) — NOT the "Pay in
//    full" tile (#id-pay-in-full-action, a role=checkbox that only SELECTS the
//    funding source; clicking it forever never pays).
//  - Sometimes PPCP redirects in place instead of opening a popup → flow = popup ?? page.
//
// Fastlane: on recent PPCP builds `ppcp-axo-gateway` (Fastlane) is the DEFAULT
// gateway and hides `#place_order` behind "Enter your email address above to
// continue". Selecting PayPal REMOVES `#place_order` entirely and replaces it
// with the Smart Button — a checkout helper that waits for `#place_order` after
// choosing PayPal waits forever.
//
// Cross-origin note: the PayPal sandbox pages are NOT your app, so the resilient/
// Stagehand wrapper does NOT apply inside the popup — plain Playwright locators
// there. DO route the on-site gateway SELECT through your resilient wrapper.
//
// The caller selects the PPCP gateway and accepts the terms first (chooseGateway
// / fillCheckoutForm); this starts at the button find. The whole drive is ONE
// function on purpose: the popup exists only between the click and the first
// sandbox screen, so splitting the click from the loop means passing a live popup
// handle across a module boundary for no gain.
//
// Env: PAYPAL_USERNAME + PAYPAL_PASSWORD (sandbox buyer).
import type { Locator, Page } from '@playwright/test';

/**
 * Finds PayPal's "Pay with PayPal" Smart Button: probe the first paypal-named
 * iframe, then sweep EVERY frame with no name filter. Exported because other
 * flows (empty-cart place order) submit through the same button.
 */
export async function findPayPalSmartButton(page: Page): Promise<Locator | null> {
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
}

/**
 * Completes the PayPal PPCP sandbox payment: finds the Smart Button, clicks it
 * once with the popup listener armed, then drives the sandbox screens until the
 * checkout lands on order-received.
 */
export async function payWithPayPal(page: Page): Promise<void> {
  const user = process.env.PAYPAL_USERNAME ?? '';
  const pass = process.env.PAYPAL_PASSWORD ?? '';
  // Throw, don't proceed: with empty creds every fill is a no-op and the run
  // burns the full tick budget before failing as a generic timeout.
  if (!user || !pass) {
    throw new Error('PAYPAL_USERNAME and PAYPAL_PASSWORD must be set in .env to pay with PayPal');
  }

  let payButton = await findPayPalSmartButton(page);
  for (let i = 0; i < 20 && !payButton; i += 1) {
    await page.waitForTimeout(1_000);
    payButton = await findPayPalSmartButton(page);
  }
  if (!payButton) throw new Error('PayPal Smart Button never rendered after selecting PayPal');
  await payButton.waitFor({ state: 'visible', timeout: 20_000 });

  const popupPromise = page.waitForEvent('popup', { timeout: 30_000 }).catch(() => null);
  await payButton.click({ timeout: 20_000 });
  const popup = await popupPromise;
  const flow = popup ?? page;
  if (popup) {
    await popup.waitForURL((u) => !u.toString().includes('about:blank'), { timeout: 30_000 }).catch(() => {});
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
  }

  const emailField = flow
    .getByRole('textbox', { name: /email or mobile/i })
    .or(flow.locator('#email, input[name="login_email"], input[type="email"]'))
    .first();
  const passField = flow
    .getByRole('textbox', { name: /^password$/i })
    .or(flow.locator('#password, input[name="login_password"], input[type="password"]'))
    .first();
  const nextBtn = flow.getByRole('button', { name: /^next$/i }).first();
  const loginBtn = flow.getByRole('button', { name: /log\s?in|^login$/i }).first();
  const approveBtn = flow
    .getByRole('button', { name: 'Pay', exact: true })
    .or(
      flow.locator(
        '#one-time-cta, button:has-text("Pay Now"), button:has-text("Complete Purchase"), [data-testid="submit-button-initial"]'
      )
    )
    .first();

  // Re-reads the field's real value every tick on purpose — a one-shot "already
  // filled" flag latches on a fill that silently didn't take and the run then
  // spins on one screen for the whole budget.
  const fillIfEmpty = async (loc: Locator, value: string) => {
    if (!(await loc.isVisible({ timeout: 500 }).catch(() => false))) return;
    if (await loc.inputValue().catch(() => '')) return;
    await loc.fill(value, { timeout: 5_000 }).catch(() => {});
  };
  const clickIfVisible = async (loc: Locator) => {
    if (await loc.isVisible({ timeout: 500 }).catch(() => false)) {
      await loc.click({ timeout: 5_000 }).catch(() => {});
      return true;
    }
    return false;
  };

  for (let i = 0; i < 15; i += 1) {
    if (page.url().includes('/order-received/')) break;
    if (popup && popup.isClosed()) break;

    // PAYPAL_DEBUG=1 prints what the loop sees. The sandbox changes without
    // notice and this is the only view into it — one observe-only run beats
    // several guess-and-check runs, each of which costs a real sandbox order.
    // The password is never printed, only whether the field holds anything.
    if (process.env.PAYPAL_DEBUG) {
      const copy = (await flow.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' ');
      console.log(
        `[paypal ${i}] url=${flow.url().slice(0, 80)} ` +
          `email="${await emailField.inputValue().catch(() => '')}" ` +
          `passFilled=${Boolean(await passField.inputValue().catch(() => ''))} ` +
          `copy="${copy.slice(0, 120)}"`
      );
    }

    await fillIfEmpty(emailField, user);
    await fillIfEmpty(passField, pass);
    if (!(await clickIfVisible(nextBtn))) {
      if (!(await clickIfVisible(loginBtn))) await clickIfVisible(approveBtn);
    }
    await page.waitForTimeout(2_000);
  }

  // Landing on order-received is the ONLY real signal: a popup closes on error
  // too, while the thank-you page renders only for a created order. The
  // diagnostic body is what identifies sandbox drift on the next failure.
  if (!page.url().includes('/order-received/')) {
    await page.waitForURL('**/order-received/**', { timeout: 60_000 }).catch(() => {});
  }
  if (!page.url().includes('/order-received/')) {
    const notices = await page
      .locator('.woocommerce-error, .woocommerce-notice--error')
      .allInnerTexts()
      .catch(() => [] as string[]);
    throw new Error(
      'PayPal did not complete the payment.\n' +
        `  main page url: ${page.url()}\n` +
        `  popup: ${popup ? (popup.isClosed() ? 'closed' : popup.url().slice(0, 110)) : 'never opened'}\n` +
        (notices.length ? `  checkout notices: ${notices.join(' | ').slice(0, 300)}\n` : '') +
        '  Re-run with PAYPAL_DEBUG=1 to dump each tick before changing selectors.'
    );
  }
}
