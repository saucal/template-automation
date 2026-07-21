// All expect() for the No Pong suite lives here — specs stay assertion-free
// (rule 6, the only exception being toHaveScreenshot in the visual spec). Every
// expect carries a message (rule 19). Copy-text matches use intent regexes, not
// verbatim strings (rule 26), so a content tweak doesn't break the gate.
//
// Parity model: values captured by flows.ts are the source of truth. Each surface
// (checkout, thank-you, my-account, admin, email) must match them — we assert
// equality against the capture, never hardcoded literals, so the suite survives
// price drift between maintenance cycles.
//
// Grows per phase: quantity limits (Task 9) → order parity (Task 11) →
// subscription / wholesale asserts (Tasks 13-15).
import { expect, type Locator, type Page } from '@playwright/test';
import type { BillingDetails, OrderConfig, OrderResult, Region, SubscriptionResult } from '../types/test-config';
import type { FlowCapture } from './flows';
import { goToCart, isBlocksCart, ORDER_DETAILS_TABLE, PAYMENT_LABEL, readFirstCartQty, readTotals, regionFor, toAmount, waitForCheckoutReady, type Totals } from './nopong';
import { expectOrderNoteMatches } from './order-notes';
import { findEmail, mailpitViewUrl } from './playgrounds-email';
import { ctxFor, resilientClick, resilientText } from './resilient';

/** Default "over the limit" notice — No Pong: "WHOOPS-A-DAISY! ... TOO MANY ITEMS ...". */
const OVER_LIMIT_NOTICE = /too many items|whoops/i;

/**
 * The admin payment-method meta line ("Payment via …") and the gateway order
 * note differ per gateway and from the customer-facing PAYMENT_LABEL.
 *   - stripe meta: "Payment via Credit Card"; note: "Stripe charge complete (Charge ID: ch_…)".
 *   - paypal meta: "Payment via PayPal";       note: a PayPal capture/complete line.
 */
const BACKEND_PAYMENT: Record<OrderConfig['payment'], { metaPattern: RegExp; notePattern: RegExp }> = {
  stripe: { metaPattern: /payment via credit.*card/i, notePattern: /Stripe charge complete \(Charge ID: ch_[a-zA-Z0-9]+\)/ },
  paypal: { metaPattern: /payment via paypal/i, notePattern: /paypal/i },
};

/**
 * Assert an order address block shows the expected billing identity. Checks the
 * stable, unambiguous parts (name + street + city + postcode) rather than the
 * whole formatted string, which varies by surface (state long/short, country line).
 */
function assertAddressShown(addressText: string, billing: BillingDetails, where: string): void {
  for (const part of [billing.firstName, billing.lastName, billing.street, billing.city, billing.zip]) {
    expect(addressText, `${where} should display the order address part "${part}"`).toContain(part);
  }
}

/**
 * Normalize a product name for cross-surface comparison. Surfaces disagree on
 * typographic punctuation — en/em-dash vs hyphen, curly vs straight quotes — and on
 * case/whitespace, because `wptexturize` runs on some templates and not others (the
 * PDP shows "No Pong – …Shackin’…" while the thank-you/email shows "No Pong - …Shackin'…").
 * Map all those variants to one canonical form before matching. GI normalizes the same
 * way (en-dash→hyphen, quotes, whitespace, lowercase) before asserting product names.
 */
function normalizeProductName(s: string): string {
  return s
    .toLowerCase()
    .replace(/[–—]/g, '-')   // en/em-dash → hyphen
    .replace(/[‘’]/g, "'")   // curly single quotes → straight
    .replace(/[“”]/g, '"')   // curly double quotes → straight
    .replace(/\s+/g, ' ')
    .trim();
}

/** Case-insensitive substring assert — the payment-method label is rendered in
 *  different cases per surface (e.g. view-order uppercases it via CSS/markup). */
function expectContainsCI(haystack: string, needle: string, msg: string): void {
  expect(haystack.toLowerCase(), `${msg} — got "${haystack}"`).toContain(needle.toLowerCase());
}

/** Assert a full totals set (subtotal/shipping/tax/total) matches the expected
 *  capture. Used for every storefront surface, where tax representation is uniform
 *  (AU inclusive). NOT for admin, which stores tax exclusively (only Order Total is
 *  cross-comparable there). */
function expectTotals(actual: Totals, expected: Totals, where: string): void {
  expectMoney(actual.subtotal, expected.subtotal, `${where} subtotal should match`);
  expectMoney(actual.shipping, expected.shipping, `${where} shipping should match`);
  expectMoney(actual.tax, expected.tax, `${where} tax should match`);
  expectMoney(actual.total, expected.total, `${where} total should match`);
}

/**
 * Assert a totals set is internally consistent, computing nothing from other
 * surfaces: total = subtotal + shipping, PLUS tax only when the region taxes
 * EXCLUSIVELY. For a tax-INCLUSIVE region (AU GST) the tax is already inside the
 * subtotal — `readTotals` still surfaces the "Includes $X GST" amount for
 * cross-surface parity, but adding it here would double-count it. Tax mode is typed
 * config (rule 11), never a DOM guess.
 */
function assertTotalConsistency(t: Totals, region: Region, where: string): void {
  const ship = Number.isNaN(toAmount(t.shipping)) ? 0 : toAmount(t.shipping);
  const tax = regionFor(region).taxInclusive || Number.isNaN(toAmount(t.tax)) ? 0 : toAmount(t.tax);
  expectMoney(t.total, (toAmount(t.subtotal) + tax + ship).toFixed(2), where);
}

/** Assert two rendered money strings are numerically equal. */
function expectMoney(actual: string, expected: string, msg: string): void {
  // Both empty means the row is absent on both surfaces (e.g. AU tax-inclusive has no
  // separate Tax row, free shipping has no Shipping row). Skip rather than NaN === NaN.
  if (!actual && !expected) return;
  expect(toAmount(actual), `${msg} — got "${actual}", expected "${expected}"`).toBeCloseTo(toAmount(expected), 2);
}

/**
 * Assert a quantity cap was enforced: the cart shows an over-limit error notice
 * and the line-item quantity was clamped to `clampedQty`. Covers both the
 * single-product tin cap (qty entered above the cap) and the cross-product 85g
 * weight cap (adding another product trips the cap and clamps the first item).
 */
export async function assertQuantityLimit(
  page: Page,
  opts: { clampedQty: string; noticePattern?: RegExp }
): Promise<void> {

  const notice = page
    .locator('.woocommerce-error, .wc-block-components-notice-banner.is-error .wc-block-components-notice-banner__content')
    .first();
  await expect(notice, 'an over-limit error notice should appear when the quantity cap is exceeded')
    .toContainText(opts.noticePattern ?? OVER_LIMIT_NOTICE, { timeout: 15_000 });
  if (!page.url().includes('/cart')) {
    await goToCart(page);
  }
  const qty = await readFirstCartQty(page);
  expect(qty, `cart quantity should be clamped to the cap (${opts.clampedQty})`).toBe(opts.clampedQty);
}

/**
 * GI 12 (FAQ Accordion) — the FAQ page's behaviour, not just its screenshot: it titles
 * correctly, its accordion items toggle (a header expands its answer; clicking again
 * collapses it), and at least one answer embeds a YouTube video (a lazy facade button
 * or a mounted iframe). GI pinned item #7 and a specific video id — we assert an embed
 * EXISTS without pinning either (both drift).
 * Call after navigating to the FAQ page. NB: selectors are GI's (`.header.has-icon-
 * align-left`, answer = header's next sibling); confirm on a live run if the FAQ block
 * markup changes.
 */
export async function assertFaqAccordion(page: Page): Promise<void> {
  // Classic themes render the page title as h1.entry-title; block pages (CA/US) use
  // h2.wp-block-heading — accept either.
  const title = (await page.locator('h1.entry-title, h2.wp-block-heading').first().innerText().catch(() => '')).toLowerCase();
  expect(title, 'FAQ page should title "Frequently Asked Questions"').toContain('frequently asked questions');

  const headers = page.locator('.header.has-icon-align-left').filter({ visible: true });
  const first = headers.first();
  await expect(first, 'FAQ should render at least one accordion header').toBeVisible({ timeout: 15_000 });

  // The answer pane is the header's following sibling within the item (GI: div > .header
  // then div:nth-of-type(2)). Toggle it: expand shows the answer, re-click hides it.
  const firstAnswer = first.locator('xpath=following-sibling::*[1]');
  await first.click();
  await expect(firstAnswer, 'clicking an FAQ header should expand its answer').toBeVisible();
  await first.click();
  await expect(firstAnswer, 'clicking an expanded FAQ header should collapse its answer').toBeHidden();

  // A FAQ answer embeds a video (GI 12 seq 8). The block pages render a LAZY YouTube
  // facade — a thumbnail + a "play Youtube video" button — and only mount the real
  // <iframe> after the button is clicked, so accept EITHER the facade button OR a
  // mounted embed. Expand items one at a time and stop as soon as one appears — robust
  // to single-open vs multi-open accordions and to lazy-mounted embeds, and doesn't
  // depend on which item holds the video.
  const videoEmbed = page
    .locator('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]')
    .or(page.getByRole('button', { name: /youtube video/i }));
  const n = await headers.count();
  let videoFound = false;
  for (let i = 0; i < n && !videoFound; i++) {
    await headers.nth(i).click().catch(() => {});
    videoFound = (await videoEmbed.count()) > 0;
  }
  expect(videoFound, 'a FAQ answer should embed a YouTube video').toBe(true);
}

/**
 * GI 14 (WP Store Locator) — the stockists page SEARCHES: an out-of-range query shows a
 * "No results found" message; an in-range locality returns a non-empty store list with
 * the map visible. We assert the search BEHAVIOUR, never specific store names (they
 * drift). Uses the WPSL ids from GI. Call after navigating to the stockists page.
 * NB: the in-range search geocodes via Google Places autocomplete (`.pac-item`) — an
 * external, occasionally-slow dependency, so selecting the suggestion is best-effort.
 */
export async function assertStoreLocatorSearch(
  page: Page,
  opts: { noResultsQuery: string; inRangeQuery: string; titlePattern?: RegExp }
): Promise<void> {
  // The page title is region-specific (AU "Stockists", CA "Retailers"); block pages
  // use h2.wp-block-heading rather than h1.entry-title.
  const titlePattern = opts.titlePattern ?? /stockists/i;
  const title = (await page.locator('h1.entry-title, h2.wp-block-heading').first().innerText().catch(() => ''));
  expect(title, `store-locator page title should match ${titlePattern}`).toMatch(titlePattern);

  const input = page.locator('#wpsl-search-input');
  const searchBtn = page.locator('#wpsl-search-btn');
  const results = page.locator('.wpsl-stores li, ul.wpsl-stores > li, .wpsl-store-location').filter({ visible: true });

  // Out-of-range locality → "No results found".
  await input.fill(opts.noResultsQuery);
  await searchBtn.click();
  await expect(page.locator('.wpsl-no-results-msg'),
    `an out-of-range search ("${opts.noResultsQuery}") should show a no-results message`)
    .toContainText(/no results found/i, { timeout: 15_000 });

  // In-range locality → non-empty results + visible map. Pick the Google autocomplete
  // suggestion if it appears (WPSL geocodes via Places), else search the typed text.
  await input.fill(opts.inRangeQuery);
  const suggestion = page.locator('.pac-container .pac-item').first();
  if (await suggestion.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await suggestion.click().catch(() => {});
  }
  await searchBtn.click();
  await expect(results.first(),
    `an in-range search ("${opts.inRangeQuery}") should return at least one stockist`).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('#wpsl-map, div[aria-label="Map"]').first(),
    'the store-locator map should be visible after a search').toBeVisible();
}

/**
 * GI 10 (+ the qty-discount behaviour in GI 21): raising a subscription product's
 * cart quantity to >=2 triggers No Pong's quantity discount, which surfaces as a
 * SALE price on the line item — the per-unit price drops into <ins>
 * (e.g. <del>$10.95</del> <ins>$8.46</ins>) and the recurring total = that
 * effective unit price × qty (the discount is baked into the per-unit price, NOT a
 * separate recurring discount row). We assert the discount engaged (an <ins> sale
 * price appears) and that the recurring total equals effective unit × qty.
 * Recurring totals exclude the one-off sign-up fee, so they're the clean surface.
 */
async function assertSubscriptionCartTotalClassic(
  page: Page,
  opts: { qty: number; region: Region }
): Promise<void> {
  const ctx = ctxFor(page);
  // Effective unit price: the <ins> sale price when discounted, else the plain
  // price. NOT an .or() of both — <del> (struck regular) precedes <ins> in the DOM,
  // so .or().first() (DOM order) would wrongly pick the regular price.
  const onSale = (await page.locator('td.product-price ins').count()) > 0;
  expect(onSale, `qty ${opts.qty} should trigger the subscription quantity discount (a sale price on the line item)`).toBe(true);
  const unitPrice = await resilientText(ctx, {
    primary: page.locator('td.product-price ins .woocommerce-Price-amount.amount').first(),
    ai: 'the subscription line-item discounted (sale) unit price on the cart page',
  });
  const signUpFee = await resilientText(ctx, {
    primary: page.locator('td.product-subtotal > span > span.subscription-details .woocommerce-Price-amount.amount').first(),
    ai: 'the subscription line-item sign-up fee on the cart page',
  });
  const subtotal = await resilientText(ctx, {
    primary: page.locator('tbody > tr.cart-subtotal:not(.recurring-total) > td > .woocommerce-Price-amount.amount').first(),
    ai: 'the subscription line-item subtotal on the cart page',
  });

  // Shipping and tax rows are OPTIONAL: free shipping renders a "Free"/method label
  // with no price amount, and a region may omit the tax row entirely (AU GST inclusive,
  // US untaxed). Read best-effort → '' when there's no price element, which the sum
  // treats as $0. resilientText is wrong here — it retries + escalates to Stagehand and
  // throws on a legitimately-absent row (that's what broke AU's free shipping).
  const readMoneyOrEmpty = async (locator: Locator): Promise<string> => {
    const el = locator.first();
    if (!(await el.count())) return '';
    return ((await el.textContent().catch(() => '')) ?? '').replace(/\s+/g, ' ').trim();
  };

  const shipping = await readMoneyOrEmpty(
    page.locator('tbody > tr.shipping:not(.recurring-total) > td li:nth-child(1) .woocommerce-Price-amount.amount')
  );
  const tax = await readMoneyOrEmpty(
    page.locator('tbody > tr.tax-rate:not(.recurring-total) > td > .woocommerce-Price-amount.amount')
  );

  const total = await resilientText(ctx, {
    primary: page.locator('tbody > tr.order-total:not(.recurring-total) > td > strong > .woocommerce-Price-amount.amount').first(),
    ai: 'the subscription line-item total on the cart page',
  });
  const recurringSubtotal = await resilientText(ctx, {
    primary: page.locator('tr.cart-subtotal.recurring-total td strong .woocommerce-Price-amount.amount').first()
      .or(page.locator('tr.cart-subtotal.recurring-total td .woocommerce-Price-amount.amount').first()),
    ai: 'the "Recurring subtotal" amount in the cart',
  });
  const recurringShipping = await readMoneyOrEmpty(
    page.locator('tr.shipping.recurring-total td strong .woocommerce-Price-amount.amount')
      .or(page.locator('tr.shipping.recurring-total td .woocommerce-Price-amount.amount'))
  );
  const recurringTax = await readMoneyOrEmpty(
    page.locator('tr.tax-rate.recurring-total td strong .woocommerce-Price-amount.amount')
      .or(page.locator('tr.tax-rate.recurring-total td .woocommerce-Price-amount.amount'))
  );
  const recurringTotal = await resilientText(ctx, {
    primary: page.locator('tr.order-total.recurring-total td strong .woocommerce-Price-amount.amount').first()
      .or(page.locator('tr.order-total.recurring-total td .woocommerce-Price-amount.amount').first()),
    ai: 'the "Recurring total" amount in the cart',
  });
  // A blank money cell (free shipping, or a tax row a region doesn't render) counts
  // as $0 in the sum. Tax mode is typed config (rule 11), never a DOM guess: AU GST is
  // INCLUSIVE (already inside the subtotal, no separate row) so it's not re-added; CA
  // renders an exclusive tax row that IS added; US charges no tax.
  const money = (s: string) => (Number.isNaN(toAmount(s)) ? 0 : toAmount(s));
  const addTax = (t: string) => (regionFor(opts.region).taxInclusive ? 0 : money(t));

  // Initial payment: subtotal = discounted unit × qty + the one-off sign-up fee (the
  // per-line fee now correctly reflects qty), and Total layers shipping + tax on top.
  const expectedSubtotal = (toAmount(unitPrice) * opts.qty) + money(signUpFee);
  expectMoney(subtotal, expectedSubtotal.toFixed(2),
    `subtotal should equal discounted unit price × ${opts.qty} + sign-up fee`);
  expectMoney(total, (expectedSubtotal + money(shipping) + addTax(tax)).toFixed(2),
    'cart total should equal subtotal + shipping + tax');

  // Recurring payment: excludes the one-off sign-up fee, so subtotal = unit × qty; the
  // recurring Total then layers recurring shipping + recurring tax the same way.
  expectMoney(recurringSubtotal, (toAmount(unitPrice) * opts.qty).toFixed(2),
    `recurring subtotal should equal discounted unit price × ${opts.qty}`);
  expectMoney(recurringTotal, ((toAmount(unitPrice) * opts.qty) + money(recurringShipping) + addTax(recurringTax)).toFixed(2),
    'recurring total should equal recurring subtotal + recurring shipping + recurring tax');
}

/**
 * Blocks-cart variant of the subscription cart-total assertion.
 *
 * The Blocks cart lazy-loads every total via the Store API, showing
 * `.wc-block-components-skeleton__element` ("Loading price…") placeholders until they
 * resolve — reading before that yields empty strings (the original failure). So we
 * FIRST wait for the footer total to show a real amount, THEN read via stable
 * structural selectors confirmed from the live trace DOM (not label-text guesses):
 *   - unit price      .wc-block-cart-item__prices (discounted value; struck = "previous")
 *   - sign-up fee      .wc-block-components-product-details row named "Sign up fee"
 *   - subtotal         .wp-block-woocommerce-cart-order-summary-subtotal-block …__value
 *   - shipping         .wc-block-components-totals-shipping …__value ("Free" → 0)
 *   - footer total     .wc-block-components-totals-footer-item …__value
 *   - recurring total  .wcs-recurring-totals-panel__title …__value (WCS Blocks panel)
 *
 * Model (region tax via config, rule 11 — AU inclusive/US none/CA exclusive row): the
 * first-payment subtotal = discounted unit × qty + one-off sign-up fee; total =
 * subtotal + shipping + tax; the monthly recurring total = the first-payment total
 * minus the one-off sign-up fee (same recurring shipping/tax), which ties the recurring
 * charge to the qty-driven total.
 * TODO(live-verify): recurring = total − fee assumes recurring shipping/tax equal the
 * first payment — refine if a live run shows they differ.
 */
async function assertSubscriptionCartTotalBlocks(
  page: Page,
  opts: { qty: number; region: Region }
): Promise<void> {
  // Wait for the async totals to load (skeleton placeholder → real amount).
  await page.locator('.wc-block-components-totals-footer-item .wc-block-components-totals-item__value')
    .filter({ hasText: /\d/ }).first().waitFor({ state: 'visible', timeout: 20_000 });
  await page.locator('.wcs-recurring-totals-panel__title .wc-block-components-totals-item__value')
    .filter({ hasText: /\d/ }).first().waitFor({ state: 'visible', timeout: 20_000 }).catch(() => {});

  const read = await page.evaluate(() => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const val = (sel: string) => norm(document.querySelector(sel)?.textContent);
    // Discounted (payable) unit price: the price value in the line item's price cell
    // that is NOT the struck "previous" (regular) price and not inside a <del>.
    const prices = document.querySelector('.wc-block-cart-item__prices');
    const struck = prices?.querySelector('.wc-block-components-product-price__regular') ?? null;
    let unit = '';
    if (prices) {
      const values = Array.from(prices.querySelectorAll('.wc-block-components-product-price__value'));
      const current = values.find((v) => !v.classList.contains('wc-block-components-product-price__regular') && !v.closest('del'));
      unit = norm((current ?? values[0])?.textContent);
    }
    // Sign-up fee: the product-details row whose name is "Sign up fee".
    let fee = '';
    for (const li of Array.from(document.querySelectorAll('.wc-block-components-product-details > *, .wc-block-components-product-details li'))) {
      const name = norm(li.querySelector('.wc-block-components-product-details__name')?.textContent).toLowerCase();
      if (name.includes('sign up fee') || name.includes('sign-up fee')) {
        fee = norm(li.querySelector('.wc-block-components-product-details__value')?.textContent);
        break;
      }
    }
    // Tax row (CA exclusive renders one; AU inclusive shows only a footer note, US none).
    let tax = '';
    for (const r of Array.from(document.querySelectorAll('.wc-block-components-totals-item'))) {
      const label = norm(r.querySelector('.wc-block-components-totals-item__label')?.textContent).toLowerCase();
      if (/\b(gst|hst|pst|qst|vat|tax)\b/.test(label)) {
        tax = norm(r.querySelector('.wc-block-components-totals-item__value')?.textContent);
        break;
      }
    }
    return {
      hasStruck: !!struck,
      unit,
      fee,
      tax,
      subtotal: val('.wp-block-woocommerce-cart-order-summary-subtotal-block .wc-block-components-totals-item__value'),
      shipping: val('.wc-block-components-totals-shipping .wc-block-components-totals-item__value'),
      total: val('.wc-block-components-totals-footer-item .wc-block-components-totals-item__value'),
      recurringTotal: val('.wcs-recurring-totals-panel__title .wc-block-components-totals-item__value'),
    };
  });

  const money = (s: string) => (Number.isNaN(toAmount(s)) ? 0 : toAmount(s));
  const addTax = (t: string) => (regionFor(opts.region).taxInclusive ? 0 : money(t));

  expect(read.hasStruck, `qty ${opts.qty} should trigger the subscription quantity discount (a struck "previous" price on the line item)`).toBe(true);

  const expectedSubtotal = (toAmount(read.unit) * opts.qty) + money(read.fee);
  expectMoney(read.subtotal, expectedSubtotal.toFixed(2),
    `Blocks subtotal should equal discounted unit × ${opts.qty} + sign-up fee`);
  expectMoney(read.total, (expectedSubtotal + money(read.shipping) + addTax(read.tax)).toFixed(2),
    'Blocks cart total should equal subtotal + shipping + tax');

  // Recurring = first-payment total minus the one-off sign-up fee (same recurring
  // shipping/tax), tying the recurring charge to the qty-driven total. Asserted only
  // when the WCS recurring panel rendered a value.
  if (read.recurringTotal) {
    expectMoney(read.recurringTotal, (money(read.total) - money(read.fee)).toFixed(2),
      'Blocks monthly recurring total should equal the first-payment total minus the one-off sign-up fee');
  }
}

/** Assert the subscription cart total — classic table or Blocks totals block. */
export async function assertSubscriptionCartTotal(
  page: Page,
  opts: { qty: number; region: Region }
): Promise<void> {
  if (await isBlocksCart(page)) return assertSubscriptionCartTotalBlocks(page, opts);
  return assertSubscriptionCartTotalClassic(page, opts);
}

/**
 * Frontend parity across the surfaces captured during the flow: the checkout
 * review totals equal the thank-you totals, the line-item product name matches
 * the PDP title, and the payment label matches the config.
 */
export function assertFrontendParity(cap: FlowCapture, config: OrderConfig): void {
  const { pdp, checkout, order } = cap;

  // First-payment totals: thank-you must equal checkout (full breakdown).
  expectTotals(order, checkout, 'thank-you vs checkout');

  // Internal consistency on the ORDER surface, computing nothing from other surfaces.
  // Every figure is read from the same page, so they share one tax basis; the helper
  // adds tax only for tax-EXCLUSIVE regions (AU GST is inclusive, so it's already in
  // the subtotal). We deliberately do NOT reconcile against pdp.unitPrice: the PDP is
  // geolocated separately and can disagree on tax basis (false-fail for a non-bug).
  assertTotalConsistency(order, config.region,
    'order total should equal subtotal + shipping (+ tax only when region taxes exclusively; AU GST is inclusive)');

  // Subscription recurring parity: the order page shows the recurring amount as a
  // single `td.subscription-total` ("$9.95 / month") — only the TOTAL, no
  // subtotal/shipping/tax breakdown — so we compare just that against the checkout
  // recurring total (this is the exact figure the GI thank-you step asserts). Guard on
  // captured totals so a non-subscription order simply skips.
  if (cap.recurringCheckout?.total && cap.recurringOrder?.total) {
    expectMoney(cap.recurringOrder.total, cap.recurringCheckout.total,
      'thank-you recurring total should match checkout recurring total');
  }

  assertAddressShown(order.address, regionFor(config.region).billing, 'thank-you page');

  expect(normalizeProductName(order.productName), `thank-you product name should contain "${pdp.productName}" (got "${order.productName}")`).toContain(normalizeProductName(pdp.productName));
  expectContainsCI(order.paymentLabel, PAYMENT_LABEL[config.payment], `thank-you payment method should be "${PAYMENT_LABEL[config.payment]}"`);
  expect(order.orderNumber, 'order number should have been captured from the order-received page').toMatch(/^\d+$/);
}

/**
 * The custom No Pong checkout "stories" modal (#np-custom-checkout-modal) that
 * replaces the blockUI during processing must have shown its rotating story cards.
 * GI's "Stories Assertion" matched all four verbatim; we match on intent (rule 26)
 * so a copy tweak doesn't break the gate. Captured during the flow (stories are
 * only on-screen between Place Order and the redirect).
 */
const CHECKOUT_STORY_PATTERNS = [/processing your order/i, /freshness incoming/i, /victory dance/i, /finalise your order/i];
export function assertCheckoutStories(stories: string[]): void {
  expect(stories.length, 'the custom checkout stories modal should have shown story cards during processing').toBeGreaterThan(0);
  const blob = stories.join(' | ');
  for (const re of CHECKOUT_STORY_PATTERNS) {
    expect(blob, `checkout stories should include one matching ${re} (got: ${blob})`).toMatch(re);
  }
}

/**
 * Points/Rewards parity: an order earns points, captured at checkout. AU always
 * awards points, so a missing/zero value is a config regression.
 */
export function assertPointsEarned(result: OrderResult, config: OrderConfig): void {
  const points = result.pointsEarned;
  expect(
    points,
    `order ${config.testId} should earn Points/Rewards points at checkout (got ${points ?? 'none'})`
  ).toBeGreaterThan(0);
}

/**
 * My-account parity (the shopper context is still authenticated after creating
 * the account at checkout). The orders list shows the order with the expected
 * status; the view-order page repeats the product + total.
 */
export async function assertMyAccount(shopperPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  if (config.user === 'guest') return; // guests have no My Account

  const ctx = ctxFor(shopperPage);
  await shopperPage.goto('my-account/orders/');
  await shopperPage.waitForLoadState('load');

  const status = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-orders-table__cell-order-status').first(),
    ai: 'the order status in the My Account orders list',
  });
  expect(status, `My Account order status should be "${config.expectedStatus}"`).toContain(config.expectedStatus);

  const orderLink = shopperPage.locator(`a[href*="/my-account/view-order/${result.orderNumber}/"]`).first();
  await expect(orderLink, `My Account orders list should contain order #${result.orderNumber}`).toBeVisible();
  await resilientClick(ctx, { primary: orderLink, ai: `the link to order #${result.orderNumber} in the orders list` });
  await shopperPage.waitForLoadState('load');

  const viewProduct = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-table__product-name.product-name, td.product-name').first(),
    ai: 'the product name on the view-order page',
  });
  expect(normalizeProductName(viewProduct), `view-order should show product "${result.productName}" (got "${viewProduct}")`).toContain(normalizeProductName(result.productName));

  // Money parity (same model as assertFrontendParity): the view-order details
  // table totals must match the captured order totals (full breakdown).
  const view = await readTotals(shopperPage, ORDER_DETAILS_TABLE);
  expectTotals(view, result, 'view-order');

  // Subscription: the view-order page also renders a recurring section — reconcile it
  // against the captured recurring totals. Warn (don't fail) if the page omits it, so
  // a template that hides recurring on view-order doesn't mask the rest.
  if ('recurring' in result) {
    const viewRecurring = await readTotals(shopperPage, ORDER_DETAILS_TABLE, { recurring: true });
    if (viewRecurring.total) {
      expectTotals(viewRecurring, (result as SubscriptionResult).recurring, 'view-order recurring');
    } else {
      console.warn(`[${config.testId}] view-order page showed no recurring totals section to reconcile`);
    }
  }

  const viewAddress = await resilientText(ctx, {
    primary: shopperPage.locator('.woocommerce-customer-details address').first()
      .or(shopperPage.locator('.woocommerce-customer-details').first()),
    ai: 'the billing address block on the view-order page',
  });
  assertAddressShown(viewAddress, regionFor(config.region).billing, 'My Account view-order');

  const viewPayment = await resilientText(ctx, {
    // View-order has NO order-overview list (that's order-received only) — the
    // payment method is a "Payment method:" row in the order-details table tfoot.
    primary: shopperPage.locator('table.woocommerce-table--order-details tr, table.shop_table.order_details tr')
      .filter({ hasText: /payment method/i }).locator('td').first()
      .or(shopperPage.locator('li.woocommerce-order-overview__payment-method.method > strong').first()),
    ai: 'the payment method shown on the view-order page',
  });
  expectContainsCI(viewPayment, PAYMENT_LABEL[config.payment], `view-order payment method should be "${PAYMENT_LABEL[config.payment]}"`);
}

/**
 * Backend parity (admin context). The order editor shows the expected status,
 * the matching payment-method meta line, the product line item, the order total,
 * and the gateway payment note. HPOS (`wc-orders`) and legacy (`post.php`) URLs
 * both reach the editor — try HPOS first, fall back.
 */
export async function assertBackend(adminPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(adminPage);
  await adminPage.goto(`wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`);
  await adminPage.waitForLoadState('load');
  if ((await adminPage.locator('.woocommerce-order-data__meta, #order_status').count()) === 0) {
    await adminPage.goto(`wp-admin/post.php?post=${result.orderNumber}&action=edit`);
    await adminPage.waitForLoadState('load');
  }

  const statusText =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() ||
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    '';
  expect(statusText, `admin order status should be ${config.expectedStatus}`).toMatch(
    new RegExp(config.expectedStatus, 'i')
  );

  await expect(
    adminPage.locator('.woocommerce-order-data__meta').first(),
    `admin order should show the ${PAYMENT_LABEL[config.payment]} payment-method meta`
  ).toContainText(BACKEND_PAYMENT[config.payment].metaPattern);

  const adminItem = await resilientText(ctx, {
    primary: adminPage.locator('.woocommerce_order_items td.name, #order_line_items td.name').first(),
    ai: 'the order line-item product name in the admin order editor',
  });
  expect(normalizeProductName(adminItem), `admin order items should list "${result.productName}" (got "${adminItem}")`).toContain(normalizeProductName(result.productName));

  const adminTotal = await resilientText(ctx, {
    // The admin order editor renders multiple table.wc-order-totals (Stripe adds a
    // "Stripe Payout" table after the main one). The first such table carries the
    // canonical Order Total row as its last <tr>.
    primary: adminPage
      .locator('table.wc-order-totals tr:last-child td.total .woocommerce-Price-amount.amount')
      .first(),
    ai: 'the order total in the admin order editor',
  });
  expectMoney(adminTotal, result.total, 'admin order total should match the order total');

  // Billing + shipping. No Pong checkout is ship-to-same, so the order's shipping
  // address must equal the billing identity. The editor renders the billing block
  // then the shipping block as `.order_data_column .address` (nth 0 / nth 1); assert
  // both carry the expected parts — that proves shipping == billing on the order.
  const billing = regionFor(config.region).billing;
  const adminBilling = await resilientText(ctx, {
    primary: adminPage.locator('.order_data_column .address').nth(0)
      .or(adminPage.locator('.order_data_column address').nth(0)),
    ai: 'the billing address in the admin order editor',
  });
  assertAddressShown(adminBilling, billing, 'admin order editor billing');
  const adminShipping = await resilientText(ctx, {
    primary: adminPage.locator('.order_data_column .address').nth(1)
      .or(adminPage.locator('.order_data_column address').nth(1)),
    ai: 'the shipping address in the admin order editor',
  });
  assertAddressShown(adminShipping, billing, 'admin order editor shipping (must match billing — ship-to-same)');

  await expectOrderNoteMatches(
    adminPage,
    BACKEND_PAYMENT[config.payment].notePattern,
    `admin order should have a ${PAYMENT_LABEL[config.payment]} gateway payment note`
  );
}

/**
 * Email parity (email context). Fetch the order-confirmation email from
 * Playgrounds (filtered by subject so a "new account" email for the same
 * recipient can't be returned instead) and assert it carries the order number,
 * product, and totals.
 */
export async function assertEmail(emailPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  const { result } = cap;
  const msg = await findEmail(result.email, { subjectFilter: 'order' });
  expect(msg, `an order-confirmation email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();

  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});

  // WooCommerce wraps the currency symbol in its own span, so money never appears
  // as a contiguous "$87.97" string — match the numeric amount against a
  // whitespace/comma-stripped variant of the body.
  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  const compact = text.replace(/[\s,]+/g, '');
  const amount = (money: string) => toAmount(money).toFixed(2);

  expect(text, `email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  expect(normalizeProductName(text), `email should reference product "${result.productName}"`).toContain(normalizeProductName(result.productName));
  // Totals: assert each amount that's actually rendered as a number — skip rows
  // with no amount on this surface ("Free" shipping, AU's inclusive tax) like expectMoney.
  for (const [label, val] of ([['subtotal', result.subtotal], ['shipping', result.shipping], ['tax', result.tax], ['total', result.total]] as const)) {
    if (Number.isNaN(toAmount(val))) continue;
    expect(compact, `email should show the order ${label} ${val}`).toContain(amount(val));
  }
  expectContainsCI(text, PAYMENT_LABEL[config.payment], `email should show payment method "${PAYMENT_LABEL[config.payment]}"`);

  // Billing + shipping. Ship-to-same → the email's shipping block must show the
  // same identity as billing. WC renders a "Billing address" heading then a
  // "Shipping address" heading (email-addresses.php); slice the two sections apart
  // and assert each carries the expected parts, so shipping == billing is verified
  // rather than a single blob match that a missing shipping block would still pass.
  const billing = regionFor(config.region).billing;
  const lower = text.toLowerCase();
  const bIdx = lower.indexOf('billing address');
  const sIdx = lower.indexOf('shipping address');
  expect(sIdx, 'order email should render a Shipping address section').toBeGreaterThan(-1);
  const billingSection = bIdx >= 0 ? text.slice(bIdx, sIdx > bIdx ? sIdx : undefined) : text;
  const shippingSection = text.slice(sIdx);
  assertAddressShown(billingSection, billing, 'order email billing');
  assertAddressShown(shippingSection, billing, 'order email shipping (must match billing — ship-to-same)');
}

/**
 * Perform a FULL refund in the admin order editor and assert the gateway note +
 * post-refund status (GI Place Order 04). Stripe issues a real refund → status
 * Refunded, with a note "Refunded {total} – Refund ID: re_… – Reason: Testing
 * Refund".
 *
 * Clicking do-api-refund with a $0 amount silently no-ops, so we fill the refund
 * form (line-item quantities + shipping) before submitting, mirroring GI.
 */
export async function performAndAssertRefund(adminPage: Page, cap: FlowCapture, config: OrderConfig): Promise<void> {
  const { result } = cap;
  const ctx = ctxFor(adminPage);
  // adminPage may be an uninitialised lazy proxy here (the refund test is the
  // first to touch it — earlier tests use a separate, torn-down context). On a
  // lazy proxy `.url()` returns a Promise, not a string, so flatten with
  // Promise.resolve before calling .includes; this also forces init.
  const currentUrl = await Promise.resolve(adminPage.url());
  if (!currentUrl.includes(String(result.orderNumber))) {
    await adminPage.goto(`wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`);
    await adminPage.waitForLoadState('load');
  }

  await resilientClick(ctx, { primary: adminPage.locator('button.refund-items'), ai: 'the Refund button in the admin order' });
  await adminPage.locator('input.refund_order_item_qty').first().waitFor({ state: 'visible', timeout: 10_000 });

  // Full refund: copy ordered qty → refund qty and the shipping amount into the
  // shipping refund input so WC computes a non-zero refund total.
  await adminPage.evaluate(() => {
    const num = (s: string | null | undefined) => parseFloat((s ?? '').replace(/[^0-9.]/g, '')) || 0;

    const qtyViews = document.querySelectorAll('tbody#order_line_items > tr > td.quantity > div.view');
    const qtys = Array.from(qtyViews).map((el) => {
      const m = (el.textContent ?? '').trim().match(/\d+/);
      return m ? parseInt(m[0], 10) : 1;
    });
    document.querySelectorAll<HTMLInputElement>('input.refund_order_item_qty').forEach((input, i) => {
      input.value = String(qtys[i] ?? 1);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const copy = (viewSel: string, inputSel: string) => {
      const inputs = document.querySelectorAll<HTMLInputElement>(inputSel);
      document.querySelectorAll(viewSel).forEach((view, i) => {
        const input = inputs[i];
        if (!input) return;
        input.value = String(num(view.textContent));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    };
    copy('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount', 'tr.shipping > td.line_cost > .refund > input.refund_line_total');
    copy('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount', 'tr.shipping > td.line_tax > .refund > input.refund_line_tax');

    const reason = document.querySelector<HTMLInputElement>('#refund_reason');
    if (reason) reason.value = 'Testing Refund';
  });

  // The gateway button only acts when the computed amount is > 0.
  const refundBtn = adminPage.locator('button.do-api-refund');
  await refundBtn.first().waitFor({ state: 'visible', timeout: 10_000 });
  await expect
    .poll(
      async () =>
        toAmount(
          await adminPage
            .locator('.do-api-refund .wc-order-refund-amount .woocommerce-Price-amount.amount')
            .first()
            .textContent()
            .catch(() => '')
        ),
      { timeout: 10_000, message: 'refund amount should be > 0 before submitting' }
    )
    .toBeGreaterThan(0);

  adminPage.on('dialog', (dialog) => dialog.accept());
  await resilientClick(ctx, { primary: refundBtn.first(), ai: 'the Refund via Stripe button' });

  await adminPage.waitForLoadState('load');
  await waitForCheckoutReady(adminPage);
  await adminPage.waitForTimeout(3_000);
  await adminPage.waitForLoadState('load');

  // Gateway refund note: "Refunded {total} – Refund ID: re_… – Reason: Testing Refund".
  const escTotal = result.total.replace(/[.$]/g, (c) => `\\${c}`);
  const notePattern =
    config.refundNotePattern ?? new RegExp(`Refunded ${escTotal} – Refund ID: re_[a-zA-Z0-9]+ – Reason: Testing Refund`);
  await expectOrderNoteMatches(adminPage, notePattern, 'admin order should have a Stripe gateway refund note');

  const statusText =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() ||
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    '';
  const expectedRefundStatus = config.refundedStatus ?? 'Refunded';
  expect(statusText, `order status after refund should be ${expectedRefundStatus}`).toMatch(
    new RegExp(expectedRefundStatus, 'i')
  );
}

/**
 * Not-wholesale gate (GI 09): a normal (non-wholesale) customer visiting the
 * wholesale-products page is blocked — the restriction notice ("Approved
 * Wholesale Customers only" / eligibility requirements) shows instead of prices.
 */
export async function assertNotWholesale(page: Page): Promise<void> {
  await page.goto('wholesale-products/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.entry-content, #content, main').first(),
    'a non-wholesale customer should see the wholesale-restriction notice, not wholesale pricing'
  ).toContainText(/approved wholesale customers only|eligibility requirements/i, { timeout: 15_000 });
}

/** Refund-email parity (GI Place Order 05): subject "has been refunded". */
export async function assertRefundEmail(emailPage: Page, cap: FlowCapture): Promise<void> {
  const { result } = cap;
  const msg = await findEmail(result.email, { subjectFilter: 'refund' });
  expect(msg, `a refund email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  const compact = text.replace(/[\s,]+/g, '');
  expect(text, `refund email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  expect(compact, `refund email should show the refunded total ${result.total}`).toContain(toAmount(result.total).toFixed(2));
}

// ---------------------------------------------------------------------------
// Wholesale (Task 15).
// ---------------------------------------------------------------------------

/**
 * After a wholesale login, the gated wholesale catalogue is reachable: the page
 * heading reads "WHOLESALE PRODUCTS" and the wholesale-only My Account nav link
 * is present — the inverse of the non-wholesale restriction (assertNotWholesale).
 */
export async function assertWholesaleAccess(page: Page): Promise<void> {
  await page.goto('wholesale-products/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('h1.entry-title, h2.wp-block-heading').first(),
    'a wholesale customer should see the WHOLESALE PRODUCTS catalogue heading'
  ).toContainText(/wholesale products/i, { timeout: 15_000 });
  await expect(
    page.locator('.wc-block-grid__products > li, .wp-block-handpicked-products > ul > li').first(),
    'the wholesale catalogue should render purchasable products, not the restriction notice'
  ).toBeVisible({ timeout: 15_000 });
}

/** A wholesale order captured a wholesale-priced line and a positive total. */
export function assertWholesalePricing(result: OrderResult): void {
  expect(result.orderNumber, 'wholesale order should have an order number from the thank-you page').toMatch(/^\d+$/);
  expect(toAmount(result.unitPrice), `wholesale product should have a captured unit price (got "${result.unitPrice}")`).toBeGreaterThan(0);
  expect(toAmount(result.total), `wholesale order total should be positive (got "${result.total}")`).toBeGreaterThan(0);
}

// ---------------------------------------------------------------------------
// Subscriptions (Tasks 13-14).
// ---------------------------------------------------------------------------

/**
 * A placed subscription captured an order number, a subscription number, and both
 * the first-payment total and the recurring total. Also checks the recurring
 * section is internally consistent (recurring total = recurring subtotal +
 * recurring shipping — AU is tax-inclusive, so tax is already in those).
 */
export function assertSubscriptionPlaced(result: SubscriptionResult, region: Region): void {
  expect(result.orderNumber, 'subscription order should have an order number from the thank-you page').toMatch(/^\d+$/);
  expect(result.subscriptionNumber, 'a subscription number should be captured from My Account').toMatch(/^\d+$/);
  expect(toAmount(result.total), `first-payment total should be a positive amount (got "${result.total}")`).toBeGreaterThan(0);
  expect(toAmount(result.recurring.total), `recurring total should be a positive amount (got "${result.recurring.total}")`).toBeGreaterThan(0);

  // Both sections are internally consistent via the same region-aware check: tax is
  // added only when the region taxes exclusively (AU GST is inclusive in the
  // subtotal). The first-payment subtotal carries the one-off sign-up fee.
  assertTotalConsistency(result.recurring, region,
    'recurring total should equal recurring subtotal + recurring shipping (+ tax only when exclusive)');
  assertTotalConsistency(result, region,
    'first-payment total should equal subtotal + shipping (+ tax only when exclusive; AU GST is inclusive)');
}

/** Admin subscription editor URL (HPOS shop_subscription). */
function subscriptionEditUrl(subscriptionNumber: string): string {
  return `wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${subscriptionNumber}`;
}

/**
 * Backend parity for a placed subscription (GI Subscription Backend): the
 * subscription editor shows status Active and the recurring total matches the
 * captured order total.
 */
export async function assertSubscriptionBackend(adminPage: Page, result: SubscriptionResult): Promise<void> {
  await adminPage.goto(subscriptionEditUrl(result.subscriptionNumber));
  await adminPage.waitForLoadState('load');

  const status =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() ||
    (await adminPage.locator('#order_status').inputValue().catch(() => '')) ||
    '';
  expect(status, `subscription #${result.subscriptionNumber} should be Active in the admin editor`).toMatch(/active/i);

  // The subscription editor totals are labeled rows ("Items Subtotal:", "Shipping:",
  // "GST:", "Order Total:") — the recurring amount is the "Order Total:" row. Match
  // by label, NOT position: the editor renders a second (empty) totals table, so
  // :last-of-type / tr:last-child grabbed the wrong one.
  const recurringTotal = await resilientText(ctxFor(adminPage), {
    primary: adminPage.locator('table.wc-order-totals tr').filter({ hasText: /order total/i })
      .locator('.woocommerce-Price-amount').last()
      .or(adminPage.getByRole('row', { name: /order total/i }).locator('.woocommerce-Price-amount').last()),
    ai: 'the Order Total (recurring) amount in the subscription editor',
  });
  // Compare against the RECURRING total captured from the thank-you page (NOT
  // result.total — that's the first payment, which includes the one-off sign-up fee).
  expectMoney(recurringTotal, result.recurring.total, 'admin subscription recurring total should match the recurring total');
}

/** Subscription confirmation email parity. */
export async function assertSubscriptionEmail(emailPage: Page, result: SubscriptionResult): Promise<void> {
  const msg = await findEmail(result.email, { subjectFilter: 'order' });
  expect(msg, `a subscription order email for ${result.email} should arrive in Playgrounds Mailpit`).not.toBeNull();
  await emailPage.goto(mailpitViewUrl(msg!.ID)).catch(() => {});

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  const compact = text.replace(/[\s,]+/g, '');
  expect(text, `subscription email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  expect(normalizeProductName(text), `subscription email should reference product "${result.productName}"`).toContain(normalizeProductName(result.productName));
  // The subscription email shows the first-payment total AND the recurring total.
  expect(compact, `subscription email should show the first-payment total ${result.total}`).toContain(toAmount(result.total).toFixed(2));
  expect(compact, `subscription email should show the recurring total ${result.recurring.total}`).toContain(toAmount(result.recurring.total).toFixed(2));
}

/**
 * Assert a subscription's status on whatever surface is current — the customer
 * view-subscription page (`td.subscription-status` / details table) or the admin
 * editor (`#select2-order_status-container`). Matches on intent (rule 26).
 */
export async function assertSubscriptionStatus(page: Page, expected: string): Promise<void> {
  const surface = page
    .locator('td.subscription-status, table.shop_table.subscription_details td:nth-of-type(2), #select2-order_status-container')
    .first();
  await expect(surface, `subscription status should be "${expected}"`).toContainText(new RegExp(expected, 'i'), {
    timeout: 15_000,
  });
}

/**
 * Assert the billing schedule changed (GI 24): the success notice shows and the
 * order-details recurring line reflects the new "EVERY {interval} {PERIOD}S".
 */
export async function assertScheduleChanged(
  page: Page,
  schedule: { interval: string; period: string }
): Promise<void> {
  await expect(
    page.locator('.wc-block-components-notice-banner.is-success, .woocommerce-message').first(),
    'changing the billing schedule should show a success notice'
  ).toContainText(/billing period changed successfully/i, { timeout: 15_000 });

  // The recurring "{total} EVERY 3 WEEKS" line lives in the order-details tfoot
  // (GI 24 step 13), NOT subscription_details (which only lists Status/dates).
  const everyPattern = new RegExp(`every\\s+${schedule.interval}\\s+${schedule.period}s?`, 'i');
  await expect(
    page.locator('table.shop_table.order_details tfoot'),
    `the subscription recurring line should reflect "every ${schedule.interval} ${schedule.period}(s)"`
  ).toContainText(everyPattern, { timeout: 15_000 });
}

/**
 * Drive an admin renewal (GI Subscription Renew): on the subscription editor,
 * toggle renewals on, process a renewal, and assert the subscription stays
 * Active with a new Renewal Order in the related-orders table.
 */
export async function performAndAssertRenewal(adminPage: Page, result: SubscriptionResult): Promise<void> {
  const ctx = ctxFor(adminPage);
  // The "process renewal" order action fires a native confirm() ("Are you sure
  // you want to process a renewal? This will charge the customer…"). Playwright
  // auto-DISMISSES dialogs (= Cancel), so the renewal never runs and no renewal
  // order is created. Accept every dialog raised during this flow.
  await adminPage.goto(subscriptionEditUrl(result.subscriptionNumber));
  await adminPage.waitForLoadState('load');
  // Register the dialog handler AFTER goto: adminPage is a lazy proxy, and calling
  // .on() before the first goto double-inits the context (the handler would bind
  // to a different page instance than the one navigating). The "process renewal"
  // action fires a native confirm() ("…This will charge the customer…"); Playwright
  // auto-DISMISSES dialogs (= Cancel), so without accepting it the renewal never
  // runs and no renewal order is created.
  adminPage.on('dialog', (d) => d.accept().catch(() => {}));
  // Confirm the subscription editor actually rendered (the order-action select +
  // Update button). The HPOS editor can take >8s under slowMo, so wait here
  // rather than let the 8s resilient tier time out mid-flow.
  await adminPage.locator('select[name="wc_order_action"]').waitFor({ state: 'visible', timeout: 30_000 });

  // Each order-action Save is a full form POST → redirect → editor reload. GI
  // runs a settle sub-test after every save; we wait for the editor to come back
  // (the wc_order_action select re-attaches) so the action persists before the
  // next one — otherwise "process renewal" can run before renewals are enabled
  // and no renewal order is created.
  const saveOrderAction = async (action: string, label: string) => {
    await adminPage.locator('select[name="wc_order_action"]').selectOption(action).catch(() => {});
    const saveBtn = adminPage.locator('button[name="save"]');
    await saveBtn.waitFor({ state: 'visible', timeout: 30_000 });
    // process-renewal fires confirm() → POST → redirect; give the click room for
    // that nav chain to settle under slowMo so it doesn't false-timeout at 8s.
    await resilientClick(ctx, { primary: saveBtn, ai: label }, { timeout: 30_000 });
    await adminPage.waitForLoadState('load');
    await adminPage.locator('select[name="wc_order_action"]').waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});
  };

  // Enable renewals (debug toggle) so the gateway is allowed to charge, then
  // process a renewal payment.
  await saveOrderAction('wcs_debug_toggle_renewals', 'the subscription Save (toggle renewals) button');
  await saveOrderAction('wcs_process_renewal', 'the subscription Save (process renewal) button');

  const status =
    (await adminPage.locator('#select2-order_status-container').first().textContent().catch(() => ''))?.trim() || '';
  expect(status, `subscription #${result.subscriptionNumber} should remain Active after renewal`).toMatch(/active/i);

  // The renewal order can be created asynchronously (Action Scheduler) and the
  // related-orders metabox only reflects it after a reload. Poll the WHOLE tbody
  // (any row, not just the first — the parent order also lists here) for a
  // "Renewal Order" row, reloading each attempt.
  await expect
    .poll(
      async () => {
        await adminPage.reload();
        await adminPage.waitForLoadState('load');
        return (
          (await adminPage
            .locator('.woocommerce_subscriptions_related_orders table tbody, #subscription_renewal_orders table tbody')
            .first()
            .textContent()
            .catch(() => '')) || ''
        );
      },
      {
        timeout: 45_000,
        intervals: [2_000, 4_000, 6_000, 8_000, 10_000],
        message: 'a renewal order should be created in the subscription related-orders table',
      }
    )
    .toMatch(/renewal order/i);
}
