// Klarna Payments (test mode) checkout — reusable migration template.
//
// Copy into helpers/klarna.ts and adapt. See klarna-adaptive +
// gateway-drift-recon in the migration prompt first.
//
// Klarna moved to its ADAPTIVE PAYMENT FLOW after most GI suites were recorded.
// A flat port of GI's steps (#onContinue__text → [data-testid="kaf-field"] =
// 123456 → #buy_button__text) does not fail — it SITS on /checkout/ forever with
// no error, because the in-page js.playground.klarna.com iframes GI targeted
// still exist but stay inert. What actually happens now: Place order posts the
// order (POST /?wc-ajax=checkout) and Klarna opens a POPUP at
// login.playground.klarna.com asking for a phone number, then an OTP.
//
// Drift the GI export will not tell you about:
//  - [data-testid="kaf-field"] is now the PHONE field, not the OTP field. Both
//    screens reuse it, so pick by the screen's copy, not by the selector.
//  - data-testid=confirm-and-pay is on THREE different buttons across the
//    screens — never select on it alone.
//  - The OFFERS DIALOG swallows clicks: clicking the generic "Continue" opens
//    it, and its own #offers-selector-continue-button then sits on top. A loop
//    that keeps clicking "Continue" clicks the same button 20+ times and never
//    pays. Hence the priority list below, dialog button FIRST.
//  - Klarna's inputs are React-controlled: pressSequentially, not fill().
//  - The popup sometimes never opens within 60s and Klarna renders an on-page
//    recovery dialog whose only handle is its accessible name.
//
// The popup's screens vary by session, so this is a STATE MACHINE driven off the
// popup's own copy, not a step list — same shape as the PayPal template.
//
// The caller captures the popup around the Place order click, because it appears
// before this function is reached:
//
//   const popupPromise = shopperPage.waitForEvent('popup', { timeout: 30_000 }).catch(() => null);
//   await resilientClick(shopperPage, { primary: '#place_order', ai: 'the Place order button' });
//   await payWithKlarna(shopperPage, { popup: await popupPromise });
//
// Cross-origin note: the Klarna popup is not your app — plain Playwright
// locators there, never the resilient/Stagehand wrapper.
import type { Page } from '@playwright/test';

const TEST_PHONE = '+447412345678';
const TEST_OTP = '123456';

/** Value field Klarna reuses for BOTH the phone and the OTP screens. */
const VALUE_FIELD =
  '[data-testid="kaf-field"], #otp_field, input[type="tel"], input[autocomplete="one-time-code"]';

/**
 * Tried in order on every tick. #offers-selector-continue-button must come
 * first: once the offers dialog is open it sits on top and swallows clicks meant
 * for the confirm screen underneath. Generic "Continue" is LAST on purpose — it
 * also matches the button that OPENS that dialog, so it is a last resort.
 */
const BUTTON_PRIORITY = [
  '#offers-selector-continue-button',
  '#buy_button__text',
  'button:has-text("Confirm and pay")',
  '#onContinue',
  'button:has-text("Continue")',
];

/** Waits for the popup to navigate away from about:blank. */
async function popupReady(popup: Page, timeoutMs = 45_000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (!popup.url().startsWith('about:')) return true;
    if (popup.isClosed()) return false;
    await popup.waitForTimeout(500);
  }
  return false;
}

/**
 * Klarna's own "Don't see the Klarna window?" recovery CTA, rendered on the
 * MERCHANT page when the popup never attached. Its only handle is the accessible
 * name — there is no id or test id.
 *
 * Written from an observed intermittent failure rather than a reproduced one:
 * confirm the wording on the first live hit and pin the name if it differs.
 */
async function recoverPopup(page: Page): Promise<Page | null> {
  const cta = page
    .getByRole('button', { name: /klarna window|open klarna|don.t see/i })
    .or(page.getByRole('link', { name: /klarna window|open klarna|don.t see/i }))
    .first();
  if (!(await cta.isVisible({ timeout: 2_000 }).catch(() => false))) return null;
  const popupPromise = page.waitForEvent('popup', { timeout: 30_000 }).catch(() => null);
  await cta.click({ timeout: 5_000 }).catch(() => {});
  return popupPromise;
}

/** Logs every visible button across every frame — KLARNA_DEBUG only. */
async function dumpButtons(popup: Page, tick: number): Promise<void> {
  const labels: string[] = [];
  for (const frame of popup.frames()) {
    const buttons = await frame.locator('button, [role="button"], a.button').all().catch(() => []);
    for (const button of buttons.slice(0, 12)) {
      if (!(await button.isVisible().catch(() => false))) continue;
      const text = (await button.innerText().catch(() => '')).replace(/\s+/g, ' ').trim().slice(0, 26);
      const id = (await button.getAttribute('id').catch(() => '')) ?? '';
      const aria = (await button.getAttribute('aria-label').catch(() => '')) ?? '';
      const testid = (await button.getAttribute('data-testid').catch(() => '')) ?? '';
      labels.push(`[text="${text}" id=${id} aria="${aria}" testid=${testid}]`);
    }
  }
  console.log(`[klarna ${tick}] visible buttons: ${labels.join(' | ') || 'none'}`);
}

/**
 * Completes the Klarna test-mode payment.
 *
 * KLARNA_DEBUG=1 dumps each tick (url, field value, screen copy, every visible
 * button). KLARNA_DEBUG=2 additionally REFUSES to click on the confirm screen —
 * that is the observe-only run: it drives login, then stops and shows you the
 * confirm screen without spending a test order.
 */
export async function payWithKlarna(
  page: Page,
  opts: { popup?: Page | null; phone?: string; otp?: string } = {}
): Promise<void> {
  const phone = opts.phone ?? TEST_PHONE;
  const otp = opts.otp ?? TEST_OTP;
  const done = () => /\/order-received\//.test(page.url());

  let popup = opts.popup ?? null;
  let ready = popup ? await popupReady(popup) : false;
  if (!ready) {
    const recovered = await recoverPopup(page);
    if (recovered) {
      popup = recovered;
      ready = await popupReady(recovered);
    }
  }

  if (popup && ready) {
    // React to whatever is on screen instead of assuming an order. Bounded so a
    // stalled popup fails loudly. NO one-shot flags: a fill that silently didn't
    // take (React-controlled input) must be retried, so every tick re-reads the
    // field's actual value.
    for (let tick = 0; tick < 60 && !popup.isClosed() && !done(); tick += 1) {
      const copy = (await popup.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' ');
      const field = popup.locator(VALUE_FIELD).filter({ visible: true }).first();
      const hasField = (await field.count()) > 0;
      const fieldValue = hasField ? await field.inputValue().catch(() => '') : '';

      if (process.env.KLARNA_DEBUG) {
        console.log(
          `[klarna ${tick}] url=${popup.url().slice(0, 70)} field=${hasField} value="${fieldValue}" ` +
            `copy="${copy.slice(0, 130)}"`
        );
        await dumpButtons(popup, tick);
      }

      if (hasField && !fieldValue) {
        const isOtpScreen = /code|otp|sent you/i.test(copy);
        await field.pressSequentially(isOtpScreen ? otp : phone, { delay: 50 }).catch(() => {});
      }

      let button = null;
      for (const selector of BUTTON_PRIORITY) {
        const candidate = popup.locator(selector).filter({ visible: true }).first();
        if ((await candidate.count()) > 0) {
          button = candidate;
          break;
        }
      }

      const onConfirmScreen = popup.url().includes('payments.playground.klarna.com');
      if (process.env.KLARNA_DEBUG === '2' && onConfirmScreen) {
        // Observe-only: click through login, then stop and read the confirm screen.
      } else if (button) {
        const label = (await button.innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 30);
        if (process.env.KLARNA_DEBUG) console.log(`[klarna ${tick}] clicking "${label}"`);
        await button.click({ timeout: 5_000 }).catch(() => {});
      }

      await popup.waitForTimeout(2_000).catch(() => {});
    }
  }

  // Landing on order-received is the real signal — GI watched a loader appear
  // and vanish, but a loader also vanishes when a gateway errors, whereas the
  // thank-you page only renders for a created order.
  if (!done()) {
    await page.waitForURL(/\/order-received\//, { timeout: 120_000 }).catch(() => {});
  }
  if (!done()) {
    const notices = await page
      .locator('.woocommerce-error, .woocommerce-notice--error')
      .allInnerTexts()
      .catch(() => [] as string[]);
    throw new Error(
      'Klarna did not complete the payment.\n' +
        `  main page url: ${page.url()}\n` +
        `  popup: ${popup ? (popup.isClosed() ? 'closed' : popup.url().slice(0, 110)) : 'never opened'}\n` +
        (notices.length ? `  checkout notices: ${notices.join(' | ').slice(0, 300)}\n` : '') +
        '  Re-run with KLARNA_DEBUG=1 to dump each tick before changing selectors.'
    );
  }
}
