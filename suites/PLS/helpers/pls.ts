// PLS site helper — every selector and DOM interaction for the PLS staging site
// lives here. Consumed by flows.ts (orchestration) and assertions.ts (parity);
// specs never touch selectors. No expect() here beyond none — assertions live in
// assertions.ts (rule 6).
//
// Site shape (docs/site-exploration.md, live-confirmed 2026-07-08):
//   - Kadence theme (the GI export's Elementor selectors are dead).
//   - Courses are WooCommerce subscription / variable-subscription products;
//     variable ones carry a pa_choose-subscription_period attribute ("7 Days").
//   - Add-to-cart opens a side cart DRAWER (#cart-drawer) whose overlay blocks
//     page clicks — navigation to the cart goes through the drawer's View cart.
//   - Checkout is WC Blocks wrapped in the custom pls-core 4-step wizard
//     (Billing → Participants → Payment → Confirmation).
//   - Stripe Payment Element (single js.stripe.com iframe with labeled fields).
//   - Sequential order numbers: displayed number 'O-08924' ≠ WP post id.
import type { Frame, Page } from '@playwright/test';
import type { BillingDetails, CourseCapture, OrderConfig, Participant, Totals } from '../types/test-config';
import { ctxFor, resilientCheck, resilientClick, resilientFill, resilientSelect, resilientText } from './resilient';

export const PAYMENT_LABEL = 'Credit / Debit Card';
export const STRIPE_CARD = { number: '4242 4242 4242 4242', expiry: '01 / 30', cvc: '111' } as const;
export const ORDER_NOTE = 'Testing Notes';
export const REFUND_REASON = 'Testing Refund';

/** The full credentials dropdown contents (GI asserted all 14 on every select). */
export const CREDENTIAL_OPTIONS = [
  'Admin', 'CDA', 'CRDH', 'DA', 'DDS', 'DH', 'DMD',
  'FTD', 'O.Mgr', 'RDA', 'RDH', 'Recptn', 'RN', 'Other',
] as const;

/** Billing identity for every order (single US region). */
export const BILLING: BillingDetails = {
  firstName: 'QA',
  middleName: 'Mid',
  lastName: 'Testing',
  company: 'Testing Inc.',
  street: '123 False',
  street2: 'Ap. 4',
  city: 'Miami',
  state: 'FL',
  zip: '33126',
  country: 'US',
  phone: '1231231234',
};

// One id per test-process run — stable WITHIN a run (capture + checkout agree),
// unique ACROSS runs so account creation doesn't collide with an existing email.
const RUN_ID = Date.now().toString(36);

/** Per-run unique Playgrounds email (lands in Mailpit, searchable by recipient). */
export function emailForTest(slug: string): string {
  return `qa+pls_${slug.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${RUN_ID}@playgrounds.saucal.io`;
}

/** Purchaser email for an order (reused account email when configured — rule 28). */
export function emailFor(config: OrderConfig): string {
  return config.accountEmail ?? emailForTest(config.testId);
}

/**
 * The participant list for an order — one per seat (config.qty). Participant 1
 * is the purchaser (the wizard's "Use billing name as participant 1" checkbox
 * copies billing name/email/phone); the rest get their own Playgrounds inboxes
 * so their account/course emails are assertable.
 */
export function participantsFor(config: OrderConfig): Participant[] {
  const creds = ['CRDH', 'RDA', 'FTD', 'RDH', 'DDS'];
  return Array.from({ length: config.qty }, (_, i) => {
    if (i === 0) {
      return {
        firstName: BILLING.firstName,
        middleName: BILLING.middleName,
        lastName: BILLING.lastName,
        email: emailFor(config),
        phone: BILLING.phone,
        credentials: creds[0],
      };
    }
    return {
      firstName: `QA${i + 1}`,
      middleName: 'Mid',
      lastName: `${BILLING.lastName}-${i + 1}`,
      email: emailForTest(`${config.testId}_p${i + 1}`),
      phone: `123-765-000${i + 1}`,
      credentials: creds[i % creds.length],
    };
  });
}

// ---------------------------------------------------------------------------
// Money / text utils.
// ---------------------------------------------------------------------------

/** Normalise a rendered money string to a number. ''/'Free' → NaN (not zero). */
export function toAmount(text: string | null | undefined): number {
  return parseFloat((text ?? '').replace(/[^0-9.-]/g, ''));
}

/** True only for a real $0 value. ''/'Free' → false. */
export function isZeroAmount(text: string | null | undefined): boolean {
  const n = toAmount(text);
  return !Number.isNaN(n) && n === 0;
}

/**
 * Normalize a product name for cross-surface comparison — surfaces disagree on
 * en-dash vs hyphen (wptexturize runs on some templates), curly quotes, case
 * and whitespace. GI normalized the same way before asserting.
 */
export function normalizeProductName(s: string): string {
  return s
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------------------
// Popups + readiness.
// ---------------------------------------------------------------------------

/** Dismiss cookie/marketing popups that may cover the storefront. Each optional. */
export async function dismissPopups(page: Page): Promise<void> {
  const closers = [
    page.locator('#wt-cli-accept-all-btn, .cli-accept-all'),
    page.getByRole('button', { name: /accept|close|dismiss|no thanks/i }),
  ];
  for (const c of closers) {
    try {
      if (await c.first().isVisible({ timeout: 1_000 })) await c.first().click({ timeout: 2_000 });
    } catch {
      /* popup not present */
    }
  }
}

/** Wait for WooCommerce / Blocks blocking overlays to clear before interacting. */
export async function waitForBlocksReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  for (const sel of [
    '.blockUI.blockOverlay',
    '.wc-block-components-spinner',
    '.wc-block-components-checkout-place-order-button--loading',
  ]) {
    await page.locator(sel).first().waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Menu navigation (rule 30 — customers click, they don't type URLs).
// ---------------------------------------------------------------------------

/**
 * Open a "Courses" submenu entry from the primary nav (hover to reveal).
 * Current submenu: "All CE Courses", "Dental Hygiene Clinical Skills Refresher",
 * "CE Requirements by State".
 */
export async function goToCoursesSubmenuItem(page: Page, itemName: string | RegExp): Promise<void> {
  const ctx = ctxFor(page);
  const coursesTop = page
    .getByRole('navigation', { name: /primary/i })
    .locator('li', { hasText: /^Courses/ })
    .first();
  await coursesTop.hover().catch(() => {});
  await resilientClick(ctx, {
    primary: page.getByRole('link', { name: itemName }).filter({ visible: true }).first(),
    alt: coursesTop.locator('ul a').filter({ hasText: itemName }).first(),
    ai: `the "${itemName}" entry in the Courses menu`,
  });
  await page.waitForLoadState('load');
}

export async function goToAllCourses(page: Page): Promise<void> {
  await goToCoursesSubmenuItem(page, 'All CE Courses');
}

// ---------------------------------------------------------------------------
// Course grid → PDP → cart.
// ---------------------------------------------------------------------------

/**
 * Pick a purchasable course from the /all-courses/ grid: the first in-stock
 * variable-subscription course with a real (>0) price (rule 35 — behavioural
 * pick, not GI's pinned index [2] which breaks as the catalogue changes).
 * Variable-subscription keeps the GI flow's subscription-period branch alive.
 * Captures the listing price text for PDP parity, then opens the PDP.
 */
export async function pickCourseFromGrid(page: Page): Promise<{ name: string; listingPrice: string }> {
  const ctx = ctxFor(page);
  const card = page
    .locator('ul.products > li.product-type-variable-subscription.instock')
    .filter({ has: page.locator('.price .woocommerce-Price-amount') })
    .first();

  const name = await resilientText(ctx, {
    primary: card.locator('h2, .woocommerce-loop-product__title').first(),
    ai: 'the title of the first in-stock subscription course in the course grid',
  });
  // "From: $30.00" on variable subscriptions — keep the raw text; parity uses toAmount.
  const listingPrice = await resilientText(ctx, {
    primary: card.locator('.price .woocommerce-Price-amount.amount').first(),
    ai: 'the price of the first in-stock subscription course in the course grid',
  });
  await resilientClick(ctx, {
    primary: card.getByRole('link', { name }).first(),
    alt: card.locator('a').first(),
    ai: `the course card link for "${name}"`,
  });
  await page.waitForLoadState('load');
  return { name, listingPrice };
}

/**
 * On a course PDP: select the subscription-period variation (when present),
 * set the seat quantity, and add to cart ("Sign up now"). Captures the product
 * title, the per-seat variation price, and the selected period label.
 *
 * Side effect: the add opens the cart DRAWER — call goToCartFromDrawer next.
 */
export async function addCourseToCart(page: Page, qty: number): Promise<CourseCapture> {
  const ctx = ctxFor(page);

  const productName = await resilientText(ctx, {
    primary: page.locator('h1.product_title'),
    ai: 'the course title heading on the product page',
  });

  let periodLabel = '';
  const period = page.locator('#pa_choose-subscription_period');
  if (await period.count()) {
    // Prefer the GI-canonical 7days option; fall back to the first real option
    // so a catalogue change (no 7-day plan) picks something instead of failing.
    const values = await period.locator('option').evaluateAll((opts) =>
      opts.map((o) => (o as HTMLOptionElement).value).filter(Boolean)
    );
    const value = values.includes('7days') ? '7days' : values[0];
    await resilientSelect(
      ctx,
      { primary: period, ai: 'the Subscription Period dropdown on the course page' },
      value
    );
    periodLabel = (
      await period.locator(`option[value="${value}"]`).textContent().catch(() => '')
    )?.trim() ?? '';
    // Variation price renders after selection — wait for it (the add button also
    // only arms once the variation resolves).
    await page.locator('.woocommerce-variation-price .woocommerce-Price-amount.amount')
      .first().waitFor({ state: 'visible', timeout: 15_000 });
  }

  const unitPrice = await resilientText(ctx, {
    primary: page.locator('.woocommerce-variation-price .woocommerce-Price-amount.amount').first(),
    alt: page.locator('.summary .price .woocommerce-Price-amount.amount').first(),
    ai: 'the course price shown on the product page',
  });

  await resilientFill(
    ctx,
    {
      primary: page.locator('form.cart input.qty'),
      alt: page.getByRole('spinbutton', { name: /quantity/i }).first(),
      ai: 'the quantity field on the course page',
    },
    String(qty)
  );

  await resilientClick(ctx, {
    primary: page.getByRole('button', { name: /sign up now/i }).first(),
    alt: page.locator('form.cart .single_add_to_cart_button'),
    ai: 'the Sign up now (add to cart) button',
  });

  // The side cart drawer opens on add — its View cart link is the click path.
  await page.locator('#cart-drawer').waitFor({ state: 'visible', timeout: 15_000 });
  return { productName, unitPrice, periodLabel };
}

/** From the open cart drawer, click View cart (the drawer overlay blocks page links). */
export async function goToCartFromDrawer(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator('#cart-drawer').getByRole('link', { name: /view cart/i }).first(),
    alt: page.locator('#cart-drawer a[href*="/cart"]').first(),
    ai: 'the View cart link inside the cart drawer',
  });
  await page.waitForURL('**/cart/**', { timeout: 15_000 });
  await page.waitForLoadState('load');
}

/** Cart → checkout via the Proceed to checkout button (rule 30). */
export async function proceedToCheckout(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.getByRole('link', { name: /proceed to checkout/i }).first(),
    alt: page.locator('a.checkout-button'),
    ai: 'the Proceed to checkout button on the cart page',
  });
  await page.waitForURL('**/checkout/**', { timeout: 20_000 });
  // The blocks checkout + wizard mount client-side after the page load.
  await page.locator('.pls-checkout-steps').waitFor({ state: 'visible', timeout: 30_000 });
  await waitForBlocksReady(page);
}

/** The single cart line as rendered (name incl. " - 7 Days", price, sub price, qty). */
export interface CartLine {
  name: string;
  price: string;
  subscriptionPrice: string;
  qty: string;
}

export async function readCartLine(page: Page): Promise<CartLine> {
  const row = page.locator('tr.woocommerce-cart-form__cart-item').first();
  const ctx = ctxFor(page);
  const name = await resilientText(ctx, {
    primary: row.locator('td.product-name a[href*="/product/"]').first(),
    alt: row.locator('td.product-name').first(),
    ai: 'the product name of the first cart line',
  });
  const price = await resilientText(ctx, {
    primary: row.locator('td.product-price .woocommerce-Price-amount.amount').first(),
    ai: 'the unit price of the first cart line',
  });
  // WCS renders the line subtotal with its billing interval ("$54.00 every week")
  // in a .subscription-price wrapper.
  const subscriptionPrice = await resilientText(ctx, {
    primary: row.locator('.subscription-price .woocommerce-Price-amount.amount').first(),
    alt: row.locator('td.product-subtotal .woocommerce-Price-amount.amount').first(),
    ai: 'the line subtotal of the first cart line',
  });
  const qty = await row.locator('td.product-quantity input.qty').first().inputValue().catch(() => '');
  return { name, price, subscriptionPrice, qty };
}

// ---------------------------------------------------------------------------
// Totals readers.
// ---------------------------------------------------------------------------

/**
 * Read a WooCommerce-style totals table by row label (cart totals, order-received
 * details tfoot). Exact label match (lowercased, colon-stripped) so "Total" never
 * collides with "Subtotal". Rows legitimately absent stay '' (expectMoney skips).
 */
export async function readTotals(page: Page, tableSelector: string): Promise<Totals> {
  return page.evaluate((sel) => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const out = { subtotal: '', discount: '', shipping: '', tax: '', total: '' };
    const tables = [...document.querySelectorAll(sel)].filter((t) => /subtotal/i.test(t.textContent ?? ''));
    for (const t of tables) {
      for (const r of Array.from(t.querySelectorAll('tr'))) {
        const head = norm(r.querySelector('th, td')?.textContent).toLowerCase().replace(':', '').trim();
        const amt = norm(r.querySelector('td:last-child .woocommerce-Price-amount')?.textContent);
        if (head === 'subtotal') out.subtotal = amt;
        else if (/discount|coupon/.test(head)) out.discount = amt;
        else if (head.startsWith('shipping')) out.shipping = amt;
        else if (/\b(?:tax|vat|gst)\b/.test(head)) out.tax = amt;
        else if (head === 'total') out.total = amt;
      }
    }
    return out;
  }, tableSelector);
}

export const CART_TOTALS_TABLE = '.cart_totals table.shop_table, table.shop_table';
export const ORDER_DETAILS_TABLE = 'table.woocommerce-table--order-details, table.shop_table.order_details';

/** Cart-page totals (Subtotal / Discount / Total). */
export async function readCartTotals(page: Page): Promise<Totals> {
  return readTotals(page, CART_TOTALS_TABLE);
}

/**
 * Rule-22 warner. On PLS every course is a virtual, untaxed subscription, so the
 * missing tax/shipping rows are EXPECTED and this logs one informational warn per
 * order — kept (rather than dropped) so a future taxed/shipped product surfaces
 * through the same signal QA already reviews.
 */
export async function warnIfNoTaxOrShipping(page: Page, ctx: { testId: string }): Promise<void> {
  const tax = page.locator('tr.tax-rate, tr.fee.tax, .wc-block-components-totals-taxes');
  const shipping = page.locator('tr.shipping, .wc-block-components-totals-shipping');
  if ((await tax.count()) === 0) {
    console.warn(`[${ctx.testId}] no Tax row at checkout — expected for PLS virtual courses; verify if the catalogue changed`);
  } else if (isZeroAmount(await tax.first().innerText())) {
    console.warn(`[${ctx.testId}] Tax row is $0 — verify tax configuration`);
  }
  if ((await shipping.count()) === 0) {
    console.warn(`[${ctx.testId}] no Shipping row at checkout — expected for PLS virtual courses; verify if the catalogue changed`);
  } else if (isZeroAmount(await shipping.first().innerText())) {
    console.warn(`[${ctx.testId}] Shipping row is $0 — verify shipping configuration`);
  }
}

// ---------------------------------------------------------------------------
// Checkout wizard (pls-core, 4 steps over WC Blocks).
// ---------------------------------------------------------------------------

const STEP_ACTIVE = '.pls-checkout-steps__step--active';
const NEXT_BTN = '.pls-checkout-steps__nav-btn--next';

/** The active wizard step label ('Billing' | 'Participants' | 'Payment' | 'Confirmation'). */
export async function activeStep(page: Page): Promise<string> {
  const txt = (await page.locator(STEP_ACTIVE).first().textContent().catch(() => '')) ?? '';
  return txt.replace(/^\d+/, '').trim();
}

/**
 * Click Next and wait for the wizard to land on `expected`. The wizard validates
 * the current step on Next and SILENTLY stays put when a required field is empty
 * (live-confirmed: a country change wipes ZIP+phone and Next just no-ops), so a
 * bare click-and-continue would cascade confusing failures downstream — fail
 * here with the current field state instead.
 */
export async function nextStep(page: Page, expected: string): Promise<void> {
  const ctx = ctxFor(page);
  await waitForBlocksReady(page);
  await resilientClick(ctx, {
    primary: page.locator(NEXT_BTN).filter({ visible: true }).first(),
    alt: page.getByRole('button', { name: /^next$/i }).first(),
    ai: 'the Next button of the checkout wizard',
  });
  try {
    await page
      .locator(`${STEP_ACTIVE}:has-text("${expected}")`)
      .waitFor({ state: 'visible', timeout: 15_000 });
  } catch {
    const current = await activeStep(page);
    const invalid = await page
      .locator('[aria-invalid="true"]')
      .evaluateAll((els) => els.map((e) => e.id || (e as HTMLInputElement).name || e.className));
    throw new Error(
      `checkout wizard did not advance to "${expected}" (still on "${current}"). ` +
        `The wizard validates silently — check for empty required fields. aria-invalid: [${invalid.join(', ')}]`
    );
  }
  await waitForBlocksReady(page);
}

/**
 * Step 1 — Billing. Order matters: the COUNTRY select goes first — changing it
 * re-renders the state select and WIPES postcode + phone (live-confirmed), so
 * filling it later would silently discard earlier values.
 */
export async function fillBillingStep(page: Page, billing: BillingDetails, email: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.locator('#email').waitFor({ state: 'visible', timeout: 30_000 });

  await resilientSelect(ctx, { primary: page.locator('#billing-country'), ai: 'the billing country dropdown' }, billing.country);
  // The state <select> re-renders after the country change — give the blocks
  // store a beat, then interact with the fresh node.
  await waitForBlocksReady(page);

  await resilientFill(ctx, { primary: page.locator('#email'), ai: 'the checkout email field' }, email);
  await resilientFill(ctx, { primary: page.locator('#billing-first_name'), ai: 'the billing first name field' }, billing.firstName);
  await resilientFill(ctx, { primary: page.locator('#billing-pls-core-middle_name'), ai: 'the billing middle name field' }, billing.middleName);
  await resilientFill(ctx, { primary: page.locator('#billing-last_name'), ai: 'the billing last name field' }, billing.lastName);
  await resilientFill(ctx, { primary: page.locator('#billing-company'), ai: 'the billing company field' }, billing.company);
  await resilientFill(ctx, { primary: page.locator('#billing-address_1'), ai: 'the billing street address field' }, billing.street);
  // address_2 is present (no reveal toggle on this theme) but keep it optional.
  const addr2 = page.locator('#billing-address_2');
  if (await addr2.isVisible({ timeout: 1_000 }).catch(() => false)) {
    await resilientFill(ctx, { primary: addr2, ai: 'the billing apartment / suite field' }, billing.street2);
  }
  await resilientFill(ctx, { primary: page.locator('#billing-city'), ai: 'the billing city field' }, billing.city);
  await resilientSelect(ctx, { primary: page.locator('#billing-state'), ai: 'the billing state dropdown' }, billing.state);
  await resilientFill(ctx, { primary: page.locator('#billing-postcode'), ai: 'the billing ZIP code field' }, billing.zip);
  await resilientFill(ctx, { primary: page.locator('#billing-phone'), ai: 'the billing phone field' }, billing.phone);
}

/**
 * Step 2 — Participants. One field grid per seat. Participant 1 is the purchaser:
 * the "Use billing name as participant 1" checkbox copies billing name/email/phone,
 * leaving only the credentials select. Later participants are filled in full.
 */
export async function fillParticipantsStep(page: Page, participants: Participant[]): Promise<void> {
  const ctx = ctxFor(page);
  const grids = page.locator('.pls-participant-fields-grid');
  await grids.first().waitFor({ state: 'visible', timeout: 15_000 });

  for (let i = 0; i < participants.length; i++) {
    const p = participants[i];
    const grid = grids.nth(i);

    if (i === 0) {
      await resilientCheck(ctx, {
        primary: page.getByRole('checkbox', { name: /use billing name as participant 1/i }),
        ai: 'the "Use billing name as participant 1" checkbox',
      });
    } else {
      await resilientFill(ctx, { primary: grid.locator('.pls-field-first_name input'), ai: `participant ${i + 1} first name` }, p.firstName);
      await resilientFill(ctx, { primary: grid.locator('.pls-field-middle_name input'), ai: `participant ${i + 1} middle name` }, p.middleName);
      await resilientFill(ctx, { primary: grid.locator('.pls-field-last_name input'), ai: `participant ${i + 1} last name` }, p.lastName);
      await resilientFill(ctx, { primary: grid.locator('.pls-field-email input'), ai: `participant ${i + 1} email` }, p.email);
      await resilientFill(ctx, { primary: grid.locator('.pls-field-phone input'), ai: `participant ${i + 1} phone` }, p.phone);
    }
    await resilientSelect(
      ctx,
      { primary: grid.locator('.pls-field-credentials select'), ai: `participant ${i + 1} credentials dropdown` },
      p.credentials
    );
  }
}

/** The option labels of every participant credentials select (for the GI options check). */
export async function readCredentialOptions(page: Page): Promise<string[][]> {
  return page.locator('.pls-field-credentials select').evaluateAll((selects) =>
    selects.map((sel) =>
      Array.from((sel as HTMLSelectElement).options)
        .filter((o) => !o.disabled)
        .map((o) => (o.textContent ?? '').trim())
        .filter(Boolean)
    )
  );
}

/**
 * Step 3 — Payment. The Stripe Payment Element renders several js.stripe.com
 * iframes (controller, loader, hcaptcha…); the card fields live in exactly one.
 * Scan the frames for the one containing the "Card number" textbox (it mounts
 * asynchronously — poll), then fill card / expiry / CVC inside it.
 */
export async function fillStripeStep(page: Page): Promise<void> {
  let cardFrame: Frame | undefined;
  for (let i = 0; i < 30 && !cardFrame; i++) {
    for (const frame of page.frames()) {
      if (!/js\.stripe\.com/.test(frame.url())) continue;
      if (await frame.getByRole('textbox', { name: /card number/i }).count().catch(() => 0)) {
        cardFrame = frame;
        break;
      }
    }
    if (!cardFrame) await page.waitForTimeout(1_000);
  }
  if (!cardFrame) throw new Error('Stripe Payment Element card frame never rendered on the Payment step');

  await cardFrame.getByRole('textbox', { name: /card number/i }).fill(STRIPE_CARD.number);
  await cardFrame.getByRole('textbox', { name: /expiration date/i }).fill(STRIPE_CARD.expiry);
  await cardFrame.getByRole('textbox', { name: /security code/i }).fill(STRIPE_CARD.cvc);
}

/** The blocks order-summary money values (Confirmation step / any wizard step). */
export async function readBlocksSummary(page: Page): Promise<Totals & { itemName: string; itemTotal: string }> {
  await waitForBlocksReady(page);
  return page.evaluate(() => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const pick = (sel: string) => norm(document.querySelector(sel)?.textContent);
    return {
      itemName: pick('.wc-block-components-order-summary-item__description .wc-block-components-product-name'),
      itemTotal: pick('.wc-block-components-order-summary-item__total-price'),
      subtotal: pick('.wp-block-woocommerce-checkout-order-summary-subtotal-block .wc-block-components-totals-item__value'),
      discount: pick('.wp-block-woocommerce-checkout-order-summary-discount-block .wc-block-components-totals-item__value'),
      shipping: pick('.wp-block-woocommerce-checkout-order-summary-shipping-block .wc-block-components-totals-item__value'),
      tax: pick('.wp-block-woocommerce-checkout-order-summary-taxes-block .wc-block-components-totals-item__value'),
      total: pick('.wc-block-components-totals-footer-item .wc-block-components-totals-item__value'),
    };
  });
}

/**
 * Step 4 — Confirmation: tick "Add a note to your order", write the note, and
 * Place Order. The participants review + summary asserts happen in assertions.ts
 * before this is called.
 */
export async function placeOrderWithNote(page: Page, note: string): Promise<void> {
  const ctx = ctxFor(page);
  await resilientCheck(ctx, {
    primary: page.getByRole('checkbox', { name: /add a note to your order/i }),
    alt: page.locator('.wc-block-checkout__add-note input[type="checkbox"]'),
    ai: 'the "Add a note to your order" checkbox',
  });
  await resilientFill(
    ctx,
    {
      primary: page.getByRole('textbox', { name: /notes about your order/i }),
      alt: page.locator('.wc-block-components-textarea'),
      ai: 'the order notes textarea',
    },
    note
  );
  await resilientClick(ctx, {
    primary: page.getByRole('button', { name: /place order/i }).first(),
    ai: 'the Place Order button',
  });
}

// ---------------------------------------------------------------------------
// Order-received reader.
// ---------------------------------------------------------------------------

export interface OrderReceived extends Totals {
  /** Sequential display number, e.g. 'O-08924'. */
  orderNumber: string;
  /** WP post id parsed from the /order-received/{id}/ URL (admin editor key). */
  postId: string;
  email: string;
  paymentLabel: string;
  productName: string;
  address: string;
  /** Raw text of each Participant #N review block. */
  participantBlocks: string[];
  /** Customer note echoed in the details tfoot ('' when absent). */
  note: string;
  /** Related subscriptions table rows. */
  subscriptions: Array<{ number: string; status: string; total: string }>;
}

/** Read the order-received page after placing the order. */
export async function readOrderReceived(page: Page): Promise<OrderReceived> {
  await page.waitForURL('**/order-received/**', { timeout: 60_000 });
  await page.waitForLoadState('load');
  const ctx = ctxFor(page);

  const postId = page.url().match(/order-received\/(\d+)\//)?.[1] ?? '';

  const orderNumber = (
    await resilientText(ctx, {
      primary: page.locator('li.woocommerce-order-overview__order.order > strong'),
      ai: 'the order number on the order confirmation',
    })
  ).trim();

  const email = await resilientText(ctx, {
    primary: page.locator('li.woocommerce-order-overview__email.email > strong'),
    ai: 'the email on the order confirmation',
  });

  const paymentLabel = await resilientText(ctx, {
    primary: page.locator('li.woocommerce-order-overview__payment-method.method > strong'),
    ai: 'the payment method on the order confirmation',
  });

  const productName = (
    await resilientText(ctx, {
      primary: page.locator('td.woocommerce-table__product-name a[href*="/product/"]').first(),
      alt: page.locator('td.product-name').first(),
      ai: 'the product name in the order confirmation table',
    })
  ).replace(/\s*[×x]\s*\d+.*$/i, '').trim();

  const participantBlocks = (
    await page.locator('.pls-confirmation-summary__participant').allInnerTexts().catch(() => [])
  ).map((t) => t.replace(/\s+/g, ' ').trim());

  const address = await resilientText(ctx, {
    primary: page.locator('.woocommerce-customer-details address').first(),
    alt: page.locator('.woocommerce-customer-details').first(),
    ai: 'the billing address block on the order confirmation',
  });

  const totals = await readTotals(page, ORDER_DETAILS_TABLE);

  // "Note: Testing Notes" tfoot row (label-based readTotals skips it).
  const note = (
    await page
      .locator(`${ORDER_DETAILS_TABLE} tfoot tr`)
      .filter({ hasText: /note/i })
      .locator('td')
      .first()
      .textContent()
      .catch(() => '')
  )?.trim() ?? '';

  // Related subscriptions: one row per seat (#26774 Active - $18.00 View).
  const subscriptions = await page
    .locator('.woocommerce-orders-table--subscriptions tbody tr, table.subscription_details tbody tr')
    .evaluateAll((rows) =>
      rows.map((r) => {
        const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
        return {
          number: norm(r.querySelector('.subscription-id, td:first-child')?.textContent).replace(/\s*View.*$/, ''),
          status: norm(r.querySelector('.subscription-status, td:nth-child(2)')?.textContent),
          total: norm(r.querySelector('.subscription-total .woocommerce-Price-amount, td .woocommerce-Price-amount')?.textContent),
        };
      })
    )
    .catch(() => []);

  return { orderNumber, postId, email, paymentLabel, productName, participantBlocks, address, note, subscriptions, ...totals };
}

// ---------------------------------------------------------------------------
// Customer account (login / logout / lost password).
// ---------------------------------------------------------------------------

/** Log in on /my-account/ (standard WC form). Polls for the account nav (rule 33). */
export async function loginAccount(page: Page, email: string, password: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('my-account/');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  await resilientFill(ctx, { primary: page.locator('#username'), ai: 'the login username / email field' }, email);
  await resilientFill(ctx, { primary: page.locator('#password'), ai: 'the login password field' }, password);
  await resilientClick(ctx, {
    primary: page.locator('button[name="login"]'),
    alt: page.getByRole('button', { name: /^log in$/i }),
    ai: 'the Log in button',
  });
  await page.waitForLoadState('load');
}

/** True when the My Account nav is visible (logged-in signal). */
export async function isLoggedIn(page: Page): Promise<boolean> {
  return page
    .locator('.woocommerce-MyAccount-navigation')
    .first()
    .isVisible({ timeout: 10_000 })
    .catch(() => false);
}

/** Log out via the WC endpoint (theme may interpose a confirm link). */
export async function logoutAccount(page: Page): Promise<void> {
  await page.goto('my-account/customer-logout/');
  await page.waitForLoadState('load').catch(() => {});
  await page.getByRole('link', { name: /log out/i }).first().click({ timeout: 3_000 }).catch(() => {});
}

/**
 * Lost-password request: submit the form for `email` and return once the
 * confirmation notice shows. The email link follow-up lives in the caller
 * (assertions/flows) so the Mailpit lookup stays in one place.
 */
export async function requestPasswordReset(page: Page): Promise<void> {
  await page.goto('my-account/lost-password/');
  await page.waitForLoadState('load');
  await dismissPopups(page);
  await page.locator('form.woocommerce-ResetPassword #user_login').waitFor({ state: 'visible', timeout: 15_000 });
}

/** Fill + submit the lost-password form (page must already be on lost-password). */
export async function submitPasswordReset(page: Page, email: string): Promise<void> {
  const ctx = ctxFor(page);
  await resilientFill(ctx, { primary: page.locator('#user_login'), ai: 'the lost-password username / email field' }, email);
  await resilientClick(ctx, {
    primary: page.locator('form.woocommerce-ResetPassword button[type="submit"]'),
    alt: page.getByRole('button', { name: /reset password/i }),
    ai: 'the Reset password button',
  });
  await page.waitForLoadState('load');
}

/** On the set-new-password page (from the email link), set the password. */
export async function setNewPassword(page: Page, newPassword: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.locator('#password_1').waitFor({ state: 'visible', timeout: 15_000 });
  await resilientFill(ctx, { primary: page.locator('#password_1'), ai: 'the new password field' }, newPassword);
  await resilientFill(ctx, { primary: page.locator('#password_2'), ai: 'the confirm password field' }, newPassword);
  await resilientClick(ctx, {
    primary: page.locator('button.woocommerce-Button').filter({ visible: true }).first(),
    alt: page.getByRole('button', { name: /save|reset/i }),
    ai: 'the save / reset password button',
  });
  await page.waitForLoadState('load');
}

// ---------------------------------------------------------------------------
// Admin order editor.
// ---------------------------------------------------------------------------

/**
 * Open the admin order editor for a WP post id. The site currently runs legacy
 * (post.php) order storage; try HPOS first so an HPOS migration doesn't break us.
 */
export async function openAdminOrder(adminPage: Page, postId: string): Promise<void> {
  await adminPage.goto(`wp-admin/admin.php?page=wc-orders&action=edit&id=${postId}`);
  await adminPage.waitForLoadState('load');
  if ((await adminPage.locator('.woocommerce-order-data__meta, #order_status').count()) === 0) {
    await adminPage.goto(`wp-admin/post.php?post=${postId}&action=edit`);
    await adminPage.waitForLoadState('load');
  }
}

/**
 * Open the admin orders LIST (HPOS first, legacy post-list fallback) — the row
 * carries the sequential order number and the order total (GI Place Order 03
 * asserts the list total before opening the order).
 */
export async function openAdminOrdersList(adminPage: Page): Promise<void> {
  await adminPage.goto('wp-admin/admin.php?page=wc-orders');
  await adminPage.waitForLoadState('load');
  if ((await adminPage.locator('table.wp-list-table tbody tr').count()) === 0) {
    await adminPage.goto('wp-admin/edit.php?post_type=shop_order');
    await adminPage.waitForLoadState('load');
  }
}

/**
 * Fill the admin refund form for a FULL refund: copy each line's ordered qty into
 * the refund qty input and set the reason. Playwright's fill alone did NOT make
 * WC recompute the amount on this site (live-confirmed) — the handler needs a
 * bubbling change event, dispatched here after the values are set. The caller
 * polls the computed amount > 0 before submitting (a $0 gateway refund silently
 * no-ops — rule 27).
 */
export async function fillRefundForm(adminPage: Page, reason: string): Promise<void> {
  const ctx = ctxFor(adminPage);
  await resilientClick(ctx, {
    primary: adminPage.locator('button.refund-items'),
    alt: adminPage.getByRole('button', { name: /^refund$/i }),
    ai: 'the Refund button in the admin order editor',
  });
  await adminPage.locator('input.refund_order_item_qty').first().waitFor({ state: 'visible', timeout: 10_000 });

  await adminPage.evaluate((refundReason) => {
    const qtyViews = document.querySelectorAll('#order_line_items > tr > td.quantity > div.view');
    const qtys = Array.from(qtyViews).map((el) => {
      const m = (el.textContent ?? '').trim().match(/\d+/);
      return m ? parseInt(m[0], 10) : 1;
    });
    document.querySelectorAll<HTMLInputElement>('input.refund_order_item_qty').forEach((input, i) => {
      input.value = String(qtys[i] ?? 1);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    const reasonInput = document.querySelector<HTMLInputElement>('#refund_reason');
    if (reasonInput) reasonInput.value = refundReason;
  }, reason);
}
