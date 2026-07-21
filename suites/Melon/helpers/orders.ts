// Order-placement flow (GI "Upsell Accepted/Rejected - Place Order" + "Place order").
// Reuses the proven cart/checkout reach from melon.ts; adds WFACP checkout fill,
// Stripe card entry, place-order, and the post-purchase wfocu upsell (accept/reject).
// DOM + orchestration only (rule 6) — order assertions live in assertions.ts.
//
// IMPORTANT (country trap): `?mocs=GB` sets the Melon blog + currency but NOT
// WooCommerce's checkout country — that geolocates by the runner IP (AR here). So
// fillCheckout MUST select GB explicitly, or shipping/tax/addresses come out wrong.
import { type Page } from '@playwright/test';
import type { Address, Customer, CompositeSelection, UpsellChoice, UpsellResult, UpsellItem } from '../types/test-config';
import { SELECTORS, money, closePopup, waitForCheckoutReady } from './melon';
import { ctxFor, resilientClick, resilientFill } from './resilient';

// WFACP classic checkout + Stripe + wfocu selectors (field IDs confirmed live 2026-07-16).
const S = {
  billing: {
    email: '#billing_email',
    firstName: '#billing_first_name',
    lastName: '#billing_last_name',
    address1: '#billing_address_1',
    address2: '#billing_address_2',
    city: '#billing_city',
    postcode: '#billing_postcode',
    country: '#billing_country',
    phone: '#billing_phone',
  },
  shipping: {
    firstName: '#shipping_first_name',
    lastName: '#shipping_last_name',
    address1: '#shipping_address_1',
    address2: '#shipping_address_2',
    city: '#shipping_city',
    postcode: '#shipping_postcode',
    country: '#shipping_country',
  },
  shipToDifferent: '#ship-to-different-address-checkbox',
  orderBump: '#wfob_wrap[data-time]',
  blockOverlay: '.blockUI.blockOverlay',
  // Post-pay processing layer on the wfocu upsell offers: a full-viewport SweetAlert
  // dialog (z 9999999) injected during each accept/skip AJAX and removed when done.
  // It intercepts the next click, so wait it out between offer actions (confirmed live
  // 2026-07-20, .playwright-cli/explore-post-pay-overlay.md).
  wfocuSwal: '.wfocuswal-container',
  placeOrder: '#place_order',
  stripeFrame: 'iframe[src*="js.stripe.com"]',
  stripe: { number: 'input[name="number"]', expiry: 'input[name="expiry"]', cvc: 'input[name="cvc"]' },
  mainComponent: 'li.main-component',
  upsellAccept: 'a.wfocu-accept-button, .wfocu-accept-button a, .bwf-btn-wrap.wfocu-accept-button a',
  upsellSkip: 'div.wfocu-skip-offer-wrap > a, .wfocu-reject a, .bwf-btn-wrap.wfocu-reject a',
  upsellPrice: '.wfocu-sale-price .woocommerce-Price-amount.amount',
  upsellTitle: 'h1.wfocu-product-title, h2.wfocu-product-title',
} as const;

/** Next-year 2-digit expiry for the Stripe test card (avoids a hard-coded year going stale). */
function nextYear2(): string {
  // Date.now is unavailable in some sandboxes but fine in a running test; guard anyway.
  const y = new Date().getFullYear() + 1;
  return String(y).slice(-2);
}

/** Per-region checkout address defaults. The runner IP geolocates elsewhere (AR on the
 * UK blog, AT on the EU blog), so fillCheckout forces this countryName explicitly. */
const REGION_ADDRESS: Record<'uk' | 'eu', Address> = {
  uk: {
    firstName: 'QA', lastName: 'Tester', address1: '123 False Street', address2: 'Ap. 4',
    city: 'Cardiff', postcode: 'CF10 1DY', countryCode: 'GB', countryName: 'United Kingdom (UK)',
    phone: '3453453454',
  },
  eu: {
    firstName: 'QA', lastName: 'Tester', address1: 'Musterstraße 1', address2: '',
    city: 'Berlin', postcode: '10115', countryCode: 'DE', countryName: 'Germany',
    phone: '030123456',
  },
};

/** A checkout customer with a per-run Playgrounds email (so the receipt lands in Mailpit).
 * `region` picks the address defaults + checkout country (uk = GB, eu = DE). */
export function makeCustomer(tag: string, region: 'uk' | 'eu' = 'uk'): Customer {
  const addr = REGION_ADDRESS[region];
  // Single address for now — billing == shipping (the WFACP "different billing" toggle
  // is a follow-up). GI's separate billing/shipping parity is deferred.
  return {
    email: `qa+melon_${tag}_${Date.now()}@playgrounds.saucal.io`,
    billing: { ...addr },
    shipping: { ...addr },
  };
}

/** Read the composite goggle facts from the current product page (title, unit price, 4 components). */
export async function captureCompositeSelection(page: Page): Promise<CompositeSelection> {
  const prodDesc = (await page.locator(SELECTORS.productTitle).first().textContent() ?? '')
    .trim().replace(/–/g, '-'); // normalize en-dash → hyphen (GI parity)
  const unitPrice = money(await page.locator(SELECTORS.productPrice).filter({ visible: true }).first().textContent());
  const components = (await page.locator(S.mainComponent).allTextContents())
    .map((t) => t.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return { prodDesc, unitPrice, components };
}

/** Open the preset composite goggle, capture its facts, and add it to the cart (one load). */
export async function addGoggleAndCapture(page: Page, region: { path: string; mocs: string }): Promise<CompositeSelection> {
  // Load WITH the preset combo + ?mocs= (see addCompositeToCart in melon.ts for why).
  // Wait for full `load` (viable with the 45s navigationTimeout) — the composite
  // configurator enables the add-to-cart button only after its scripts finish; DCL
  // races that and makes the add flaky.
  await page.goto(
    `${region.path}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon&mocs=${region.mocs}`
  );
  await page.waitForLoadState('load');
  await closePopup(page);
  const selection = await captureCompositeSelection(page);
  // The composite add is a full-page POST; the sticky header intercepts a normal click,
  // so dispatch it on the element (suite pattern for View cart / Proceed) rather than a
  // coordinate click.
  const addBtn = page.locator(SELECTORS.compositeAddToCart).first();
  await addBtn.waitFor({ state: 'visible', timeout: 15_000 });
  await addBtn.dispatchEvent('click');
  // The woo "added to cart" notice + View cart link is the done signal.
  await page.locator(SELECTORS.viewCartLink).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 30_000 });
  return selection;
}

/** Wait for the WFACP block overlay (AJAX recalc) to clear. */
async function settleWfacp(page: Page): Promise<void> {
  await page.locator(S.blockOverlay).first().waitFor({ state: 'hidden', timeout: 20_000 }).catch(() => {});
}

/**
 * Let the WFACP order bump + payment section finish their update_checkout re-render
 * BEFORE the card is entered. The order bump loads via AJAX and its fragment refresh
 * re-mounts the Stripe iframe — if that fires after fillStripeCard it wipes the card and
 * the submit is blocked. Wait for the bump to attach, then for the overlay to clear.
 */
export async function settlePaymentSection(page: Page): Promise<void> {
  await page.locator(S.orderBump).first().waitFor({ state: 'attached', timeout: 30_000 }).catch(() => {});
  await settleWfacp(page);
}

/**
 * Select a country on a WFACP country field via its select2 UI. The runner IP geolocates
 * to AR, so this forces the order to GB. It MUST go through the select2 dropdown, not a
 * value-set: evaluate-setting the hidden native <select> gets reset by the update_checkout
 * AJAX re-render, whereas the select2 pick persists server-side and re-renders cleanly.
 */
async function selectCountry(page: Page, countryName: string): Promise<void> {
  // Target by ARIA role, not a guessed select2 container id — the visible country field
  // may be billing_ or shipping_ depending on the WFACP layout. "County" won't match /country/.
  const combo = page.getByRole('combobox', { name: /country/i }).filter({ visible: true }).first();
  await combo.click();
  const search = page.locator('input.select2-search__field').first();
  await search.waitFor({ state: 'visible', timeout: 10_000 });
  // Search by the country name minus any parenthetical suffix ("United Kingdom (UK)" →
  // "United Kingdom", "Germany" → "Germany"), then pick the exact-labelled option.
  await search.fill(countryName.replace(/\s*\(.*\)\s*/, '').trim());
  await page.locator('li.select2-results__option', { hasText: countryName }).first().click();
}

/**
 * Fill the WFACP checkout. The visible address form uses the #billing_* fields (labeled
 * "Shipping Address" by the theme) and serves as both billing + shipping. Country goes
 * FIRST — it triggers an update_checkout re-render that would wipe already-filled fields,
 * and it must be GB (the runner IP geolocates to AR). Different billing vs shipping is
 * deferred (see the "Use a different billing address" toggle) — single address for now.
 */
export async function fillCheckout(page: Page, customer: Customer): Promise<void> {
  const ctx = ctxFor(page);
  const a = customer.billing;
  // Target the VISIBLE labeled fields by role — the WFACP form mixes billing_/shipping_
  // ids (billing address fields are hidden behind the "different billing" toggle), so
  // ids are unreliable; the accessible labels are stable.
  const tb = (re: RegExp) => page.getByRole('textbox', { name: re }).filter({ visible: true }).first();

  await resilientFill(ctx, { primary: tb(/email/i), ai: 'the checkout email field' }, customer.email);
  // Country first (it re-renders the form); then fill the rest so nothing gets wiped.
  await selectCountry(page, a.countryName);
  await settleWfacp(page);
  await resilientFill(ctx, { primary: tb(/first name/i), ai: 'the first name field' }, a.firstName);
  await resilientFill(ctx, { primary: tb(/last name/i), ai: 'the last name field' }, a.lastName);
  await resilientFill(ctx, { primary: tb(/street address/i), ai: 'the street address field' }, a.address1);
  // (No apartment / address-line-2 field on this WFACP form — skipped.)
  await resilientFill(ctx, { primary: tb(/town|city/i), ai: 'the town / city field' }, a.city);
  await resilientFill(ctx, { primary: tb(/postcode|zip/i), ai: 'the postcode field' }, a.postcode);
  if (a.phone) await resilientFill(ctx, { primary: tb(/phone/i), ai: 'the phone field' }, a.phone);
  // Create the account at checkout so the order is reachable in My Account (the guest
  // path leaves /my-account/view-order/ behind a login wall). WFACP auto-logs-in the new
  // account after placing the order. Some setups reveal a password field on check.
  const createAccount = page.locator('#createaccount').first();
  if (await createAccount.count()) {
    if (!(await createAccount.isChecked())) await createAccount.check();
    const pwd = page.locator('#account_password').filter({ visible: true }).first();
    if (await pwd.count()) await pwd.fill('QaMelon!2026');
  }
  await settleWfacp(page);
}

/**
 * Fill the Stripe card fields (test card 4242 / 12-next-year / 123). Stripe injects
 * several js.stripe.com iframes (a hidden controller + the field frame(s)), so target
 * by ACCESSIBLE field name across all stripe frames — a fixed `.first()` frame +
 * `input[name=number]` filled a hidden frame and left the visible fields empty.
 */
export async function fillStripeCard(page: Page): Promise<void> {
  // The card fields live in an iframe[name^="__privateStripeFrame"] under the
  // StripeElement, all three in ONE frame. contentFrame() is re-resolved on each
  // attempt because a late update_checkout re-mounts the iframe (stale frame handle
  // otherwise). Call settlePaymentSection BEFORE this so the re-mount is unlikely — the
  // verify/re-fill loop below is the guard for any stray late re-render that still wipes
  // the entered card (observed: fields go empty, "card number incomplete", submit blocked).
  const STRIPE_FIELD_FRAME = '#fkwcs-stripe-elements-form > div.StripeElement > div > iframe';
  const numberField = () => page.locator(STRIPE_FIELD_FRAME).contentFrame().locator(S.stripe.number).first();
  const fillOnce = async () => {
    const frame = page.locator(STRIPE_FIELD_FRAME).contentFrame();
    await frame.locator(S.stripe.number).first().fill('4242 4242 4242 4242');
    await frame.locator(S.stripe.expiry).first().fill(`12 / ${nextYear2()}`);
    await frame.locator(S.stripe.cvc).first().fill('123');
  };

  for (let attempt = 0; attempt < 3; attempt++) {
    await fillOnce();
    // Re-mount happens shortly after a fragment refresh; give it a beat, then verify the
    // number field kept the value. Stripe returns the typed digits in test mode.
    await settleWfacp(page);
    const digits = (await numberField().inputValue().catch(() => '')).replace(/\D/g, '');
    if (digits.length >= 16) return;
  }
}

/** Wait for the place button to enable, then place the order. */
export async function placeOrder(page: Page): Promise<void> {
  const place = page.locator(S.placeOrder).first();
  await place.waitFor({ state: 'visible', timeout: 15_000 });
  // #place_order is disabled until the gateway is ready; wait it out then click.
  await page.waitForFunction((sel) => {
    const el = document.querySelector(sel) as HTMLButtonElement | null;
    return !!el && !el.disabled;
  }, S.placeOrder, { timeout: 30_000 }).catch(() => {});
  await resilientClick(ctxFor(page), { primary: place, ai: 'the Place order button' });
  // Payment processing engages the WFACP block overlay, then the FunnelKit funnel
  // JS-redirects off /checkout/ to the first offer (or straight to order-received).
  // That round-trip can take well over the old 20s upsell wait, so wait for the
  // navigation signal explicitly (generous) rather than a fixed pause — a stuck
  // /checkout/ then means a real payment failure, not a too-short timeout.
  await page.waitForURL(/order-received|thank-you|\/offer\//i, { timeout: 60_000 }).catch(() => {});
  await waitForCheckoutReady(page);
}

/** True once we've reached the final order-received / thank-you page (upsell funnel done). */
async function onThankYou(page: Page): Promise<boolean> {
  return /order-received|thank-you/i.test(page.url());
}

/**
 * Handle the post-purchase wfocu upsell funnel (0–2 offers). On 'accept' each offer is
 * captured + accepted; on 'reject' each offer is skipped. Returns the accepted items.
 */
export async function handleUpsell(page: Page, choice: UpsellChoice): Promise<UpsellResult> {
  const items: UpsellItem[] = [];
  // Give the funnel a moment to route to the first offer (or straight to thank-you).
  await page.waitForLoadState('domcontentloaded');
  for (let i = 0; i < 3; i++) {
    if (await onThankYou(page)) break;
    const accept = page.locator(S.upsellAccept).filter({ visible: true }).first();
    const skip = page.locator(S.upsellSkip).filter({ visible: true }).first();
    await accept.or(skip).waitFor({ state: 'visible', timeout: 20_000 }).catch(() => {});
    if (!(await accept.count()) && !(await skip.count())) break;

    if (choice === 'accept' && (await accept.count())) {
      const desc = (await page.locator(S.upsellTitle).first().textContent() ?? '').trim().replace(/–/g, '-');
      const price = money(await page.locator(S.upsellPrice).first().textContent().catch(() => ''));
      items.push({ desc, price });
      await resilientClick(ctxFor(page), { primary: accept, ai: 'the accept upsell offer button' });
    } else {
      await resilientClick(ctxFor(page), { primary: skip, ai: 'the skip / no-thanks upsell link' });
    }
    // The accept/skip click injects a full-viewport wfocu SweetAlert overlay while it
    // charges + routes; wait it out (it detaches when done) so it can't swallow the
    // next offer's click, then let the next page settle.
    await page.locator(S.wfocuSwal).first().waitFor({ state: 'hidden', timeout: 20_000 }).catch(() => {});
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500); // funnel routes to next offer or thank-you
  }
  return { accepted: choice === 'accept' && items.length > 0, items };
}

/** Read the order number from the order-received URL (order_id param or /order-received/<id>/). */
export async function readOrderNumber(page: Page): Promise<string> {
  const url = page.url();
  const byParam = new URL(url).searchParams.get('order_id') ?? new URL(url).searchParams.get('order');
  if (byParam) return byParam;
  const m = url.match(/order-received\/(\d+)/);
  return m ? m[1] : '';
}

export { S as ORDER_SELECTORS };
