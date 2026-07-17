// Site helper for the No Pong suite — ALL site DOM lives here: selectors, the
// per-region constants map, popup dismissal, cart/checkout fillers, payment
// (Stripe iframe + PayPal sandbox), the order-received reader, the Points/Rewards
// reader, and the maintenance tax/shipping warner.
//
// Does NOT assert (see assertions.ts) or orchestrate flows (see flows.ts).
//
// Design rule (per user feedback): this is No-Pong-only. We do NOT reproduce the
// GI helpers' project/region/`vars`-flag conditional branches. Behaviour that
// differs by region or user type is driven by the TYPED config (regionConfig +
// OrderConfig.user/payment), via small focused functions — never stringly-typed
// `vars.logged` / `vars.country` switches.
//
// Checkout reality: No Pong uses CLASSIC WooCommerce checkout (single page) with
// select2 country fields, Stripe (iframe js.stripe.com) and PayPal gateways.
import { type Page } from '@playwright/test';
import type {
  BillingDetails,
  CapturedPrices,
  OrderConfig,
  PdpConfig,
  Region,
  RegionConfig,
} from '../types/test-config';
import {
  ctxFor,
  resilientCheck,
  resilientClick,
  resilientFill,
  resilientText,
} from './resilient';

/** Stripe test card — classic checkout, iframe js.stripe.com. */
export const STRIPE_CARD = { number: '4242 4242 4242 4242', expiry: '12 / 30', cvc: '123' } as const;

/** Payment-method label as shown on order surfaces (thank-you / admin / email). */
export const PAYMENT_LABEL: Record<OrderConfig['payment'], string> = {
  stripe: 'Credit / Debit Card',
  paypal: 'PayPal',
};

// ---------------------------------------------------------------------------
// Per-region constants (rule 11). AU is filled from the migrated AU suite; CA/US
// are populated by the CA/US replication plan. Region differences live HERE, not
// in branching logic.
// ---------------------------------------------------------------------------

const AU_BILLING: BillingDetails = {
  firstName: 'QA',
  lastName: 'GI NoPong',
  company: 'Saucal Test',
  street: '123 False Street',
  city: 'Sydney',
  state: 'New South Wales',
  shortState: 'NSW',
  zip: '2000',
  country: 'Australia',
  shortCountry: 'AU',
  countryComplete: 'Australia',
  phone: '+61412345678',
};

// CA: Ontario. Checkout uses shortCountry/shortState only (value-based select2);
// long forms are parity-display fields. Adjust if the CA store restricts shipping.
const CA_BILLING: BillingDetails = {
  firstName: 'QA',
  lastName: 'GI NoPong',
  company: 'Saucal Test',
  street: '123 False Street',
  city: 'Toronto',
  state: 'Ontario',
  shortState: 'ON',
  zip: 'M5V 3L9',
  country: 'Canada',
  shortCountry: 'CA',
  countryComplete: 'Canada',
  phone: '+14165550123',
};

// US: Oregon — a no-sales-tax state, matching the store's "US charges no tax" config
// (expectTax:false). Adjust the state if US tax should actually appear.
const US_BILLING: BillingDetails = {
  firstName: 'QA',
  lastName: 'GI NoPong',
  company: 'Saucal Test',
  street: '123 False Street',
  city: 'Portland',
  state: 'Oregon',
  shortState: 'OR',
  zip: '97201',
  country: 'United States (US)',
  shortCountry: 'US',
  countryComplete: 'United States (US)',
  phone: '+15035550123',
};

export const regionConfig: Record<Region, RegionConfig> = {
  au: {
    currency: '$',
    currencyCode: 'AUD',
    billing: AU_BILLING,
    // Empty slug → addToCart picks the first non-bundle product on the shop page
    // (matches the GI flow; avoids a hardcoded slug that drifts). Set a slug to
    // target a specific product.
    products: {
      simple: { slug: '' },
      variable: { slug: '', variation: '' },
      subscription: { slug: '' },
      wholesale: { slug: '' },
    },
    expectTax: true,
    taxInclusive: true, // AU GST is inclusive — baked into subtotal & total.
    expectShipping: true,
  },
  ca: {
    currency: '$',
    currencyCode: 'CAD',
    billing: CA_BILLING,
    products: {
      simple: { slug: '' },
      variable: { slug: '', variation: '' },
      subscription: { slug: '' },
    },
    expectTax: true,
    taxInclusive: false, // CA tax is exclusive — a separate additive row at checkout.
    expectShipping: true,
  },
  us: {
    currency: '$',
    currencyCode: 'USD',
    billing: US_BILLING,
    products: {
      simple: { slug: '' },
      variable: { slug: '', variation: '' },
      subscription: { slug: '' },
    },
    expectTax: false, // US store charges no tax.
    taxInclusive: false,
    expectShipping: true,
  },
};

/** Region constants for a config, with a clear error if a region isn't configured yet. */
export function regionFor(region: Region): RegionConfig {
  const rc = regionConfig[region];
  if (!rc) throw new Error(`regionConfig.${region} is not configured yet (AU is the reference; CA/US pending).`);
  return rc;
}

// ---------------------------------------------------------------------------
// Money utils.
// ---------------------------------------------------------------------------

/** Normalise a rendered money string to a number. "Free" → NaN (not zero). */
export function toAmount(text: string | null | undefined): number {
  return parseFloat((text ?? '').replace(/[^0-9.-]/g, ''));
}

/** True only for a real $0 value. "Free"/empty → false. */
export function isZeroAmount(text: string | null | undefined): boolean {
  const n = toAmount(text);
  return !Number.isNaN(n) && n === 0;
}

// ---------------------------------------------------------------------------
// Popups + readiness.
// ---------------------------------------------------------------------------

/** Dismiss marketing / product popups that cover the storefront. Each is optional. */
export async function dismissPopups(page: Page): Promise<void> {
  const closers = [
    page.locator('.nopong-product-popup-modal button[aria-label*="close" i]'),
    page.locator('.nopong-product-popup-modal .close, .nopong-product-popup-modal button.close'),
    page.getByRole('button', { name: /close|dismiss|no thanks/i }),
    page.locator('#wt-cli-accept-all-btn, .cli-accept-all'), // cookie banner
  ];
  for (const c of closers) {
    try {
      if (await c.first().isVisible({ timeout: 1_000 })) await c.first().click({ timeout: 2_000 });
    } catch {
      /* popup not present */
    }
  }
}

/** Wait for WooCommerce blocking overlays to clear before interacting. */
export async function waitForCheckoutReady(page: Page): Promise<void> {
  await page.waitForLoadState('load');
  for (const sel of [
    '.blockUI.blockOverlay',
    '.wc-block-components-spinner',
    '.wc-block-components-checkout-place-order-button--loading',
  ]) {
    await page.locator(sel).first().waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  }
}

/** Classic vs Blocks checkout — single source of truth for the branch (rules 9, 21). */
export async function isBlockCheckout(page: Page): Promise<boolean> {
  return (await page.locator('.wc-block-checkout, .wp-block-woocommerce-checkout').count()) > 0;
}

/** Blocks vs classic CART — live DOM check (rule: never branch on region/tier). */
export async function isBlocksCart(page: Page): Promise<boolean> {
  await page.waitForLoadState('load').catch(() => {});
  const blocks = await page.locator('.wp-block-woocommerce-cart').count();
  const classic = await page.locator('form.woocommerce-cart-form').count();
  return blocks > 0 && classic === 0;
}

// ---------------------------------------------------------------------------
// PDP / cart — add to cart.
// ---------------------------------------------------------------------------

export interface PdpCapture {
  productName: string;
  unitPrice: string;
}

/**
 * Add the configured product to the cart, capturing product name + unit price.
 * When the region's product slug is empty we pick the first non-bundle product
 * on the shop page (the GI flow). A non-empty slug targets /products/{slug}/.
 * Returns the captured PDP values.
 */
export async function addToCart(page: Page, region: Region, pdp: PdpConfig): Promise<PdpCapture> {
  const ctx = ctxFor(page);
  const slug = slugFor(region, pdp);

  if (slug) {
    await page.goto(`products/${slug}/`);
    await page.waitForLoadState('load');
    await dismissPopups(page);
    const productName = await resilientText(ctx, {
      primary: page.locator('.product-main .product_title, h1.product_title'),
      ai: 'the product title heading',
    });
    const unitPrice = await resilientText(ctx, {
      primary: page
        .locator('.product-main p.price ins .woocommerce-Price-amount.amount')
        .or(page.locator('.product-main .woocommerce-Price-amount.amount')),
      ai: 'the product price',
    });
    await setQuantity(page, pdp.qty);
    await resilientClick(ctx, {
      primary: page.locator('form.cart .single_add_to_cart_button'),
      alt: page.getByRole('button', { name: /add to cart/i }),
      ai: 'the Add to cart button',
    });
    return { productName, unitPrice };
  }

  // Shop-first (GI 06): no PDP — customers can't access product pages.
  // Extract title + price from the shop grid, then click the direct add-to-cart link.
  await page.goto('products/');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  const card = page.locator("ul.wc-block-grid__products > li:not([data-slug*='bundle'])").first();
  const productName = await resilientText(ctx, {
    primary: card.locator('.wc-block-grid__product-title'),
    ai: 'the first non-bundle product title in the shop grid',
  });
  const unitPrice = await resilientText(ctx, {
    primary: card.locator('.wc-block-grid__product-price ins .woocommerce-Price-amount.amount')
      .or(card.locator('.wc-block-grid__product-price .woocommerce-Price-amount.amount')),
    ai: 'the first non-bundle product price in the shop grid',
  });
  await resilientClick(ctx, {
    primary: card.locator("a[href*='?add-to-cart=']"),
    ai: 'the direct add-to-cart link on the first non-bundle product',
  });
  await page.waitForLoadState('load');
  return { productName, unitPrice };
}

/**
 * Add a subscription product to the cart. No Pong sells subscriptions from the
 * Monthly Club page (a block-grid of products), not via a /products/ slug, so
 * this has its own path. Picks the first subscription product, capturing its
 * name + price. Quantity defaults to 1 (GI used 2; the flow can override later).
 */
export async function addSubscriptionToCart(page: Page, _region: Region): Promise<PdpCapture> {
  const ctx = ctxFor(page);
  await page.goto('monthly-club/');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  const card = page.locator('#main ul.wc-block-grid__products > li').first();
  const productName = await resilientText(ctx, {
    primary: card.locator('.wc-block-grid__product-title'),
    ai: 'the first subscription product title on the Monthly Club page',
  });
  const unitPrice = await resilientText(ctx, {
    primary: card.locator('.wc-block-grid__product-price .woocommerce-Price-amount.amount').first(),
    ai: 'the first subscription product price',
  });
  await resilientClick(ctx, {
    primary: card.locator('a[href*="?add-to-cart="]'),
    alt: page.getByRole('link', { name: /join the club|add to cart|subscribe/i }).first(),
    ai: 'the subscribe / add-to-cart link on the first subscription product',
  });
  await page.waitForLoadState('load');
  return { productName, unitPrice };
}

/**
 * Read the subscription number + next-payment date from My Account after a
 * subscription order. The subscriptions list links each subscription as
 * `/my-account/view-subscription/{n}/`; the detail page shows the next payment.
 */
export async function readSubscriptionDetails(page: Page): Promise<{ subscriptionNumber: string; nextPaymentDate: string }> {
  const ctx = ctxFor(page);
  // Scope to `main`: the same view-subscription URL also appears as a collapsed item in
  // the SITE HEADER's "My Account" dropdown, which is in the DOM but positioned
  // off-screen — an unscoped `.first()` grabbed it and .click() looped forever
  // ("element is outside of the viewport"). The in-flow account-nav / table link lives
  // in the content area.
  const link = page.locator('main td.subscription-id > a[href*="/my-account/view-subscription/"]').first();
  await link.waitFor({ state: 'visible', timeout: 15_000 });
  const href = (await link.getAttribute('href')) ?? '';
  const subscriptionNumber = (href.match(/view-subscription\/(\d+)/)?.[1] ?? (await link.innerText())).replace(/[^0-9]/g, '');

  const nextPaymentDate = await resilientText(ctx, {
    primary: page.locator('td[data-title="Next payment"], td.subscription-next-payment, td.next-payment-date').first(),
    ai: 'the next payment date on the subscription detail page',
  }).catch(() => '');

  return { subscriptionNumber, nextPaymentDate };
}

// ---------------------------------------------------------------------------
// Wholesale (login on the gated wholesale-products page + add from its grid).
// ---------------------------------------------------------------------------

/**
 * Log in as a wholesale customer. The wholesale-products page shows the login
 * form to anonymous visitors; after login it renders the wholesale catalogue.
 */
export async function wholesaleLogin(page: Page, email: string, password: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('wholesale-products/');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  await resilientFill(ctx, { primary: page.locator('#username'), ai: 'the wholesale login username field' }, email);
  await resilientFill(ctx, { primary: page.locator('#password'), ai: 'the wholesale login password field' }, password);
  await resilientClick(ctx, {
    primary: page.locator('#customer_login form button[name="login"]').or(page.locator('#customer_login button')),
    alt: page.getByRole('button', { name: /^log in$/i }),
    ai: 'the wholesale Log in button',
  });
  await page.waitForLoadState('load');
}

/** Add the first wholesale product from the wholesale-products grid, capturing name + price. */
export async function addWholesaleProductToCart(page: Page): Promise<PdpCapture> {
  const ctx = ctxFor(page);
  await page.goto('wholesale-products/');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  const card = page.locator('.wc-block-grid__products > li, .wp-block-handpicked-products > ul > li').first();
  const productName = await resilientText(ctx, {
    primary: card.locator('.wc-block-grid__product-title, .wc-block-components-product-name').first(),
    ai: 'the first wholesale product title',
  });
  const unitPrice = await resilientText(ctx, {
    primary: card.locator('.woocommerce-Price-amount.amount').first(),
    ai: 'the first wholesale product price',
  });
  await resilientClick(ctx, {
    primary: card.locator("a[href*='add-to-cart=']"),
    alt: page.getByRole('link', { name: /add to cart/i }).first(),
    ai: 'the add-to-cart link on the first wholesale product',
  });
  await page.waitForLoadState('load');
  return { productName, unitPrice };
}

// ---------------------------------------------------------------------------
// Subscription management (customer + admin actions). Assertions live in
// assertions.ts; these only drive the UI.
// ---------------------------------------------------------------------------

/** Open the customer-facing view-subscription page. */
export async function goToSubscription(page: Page, subscriptionNumber: string): Promise<void> {
  await page.goto(`my-account/view-subscription/${subscriptionNumber}/`);
  await page.waitForLoadState('load');
  await dismissPopups(page);
}

/**
 * Cancel a subscription as the logged-in customer. No Pong gates the cancel link
 * behind a confirmation modal (GI 21 steps 102-103): clicking `a.button.cancel`
 * opens the modal, then the modal's "Cancel Subscription" confirm link (href
 * carries `change_subscription_to=cancelled`) actually performs the cancel.
 */
export async function cancelSubscriptionAsCustomer(page: Page, subscriptionNumber: string): Promise<void> {
  const ctx = ctxFor(page);
  await goToSubscription(page, subscriptionNumber);
  // The cancel link triggers a native confirm() ("Are you sure…"). Playwright
  // auto-DISMISSES dialogs by default (= clicking Cancel), which aborts the
  // cancellation — so accept it explicitly before clicking (cf. the refund flow).
  page.once('dialog', (d) => d.accept().catch(() => {}));
  await resilientClick(ctx, {
    primary: page.locator('a.button.cancel'),
    alt: page.getByRole('link', { name: /cancel subscription/i }),
    ai: 'the Cancel Subscription button',
  });
  await page.waitForLoadState('load');
}

/**
 * Change the billing schedule as the customer (GI 24): open the change-schedule
 * modal and set interval + period, then confirm.
 */
export async function changeSubscriptionSchedule(
  page: Page,
  subscriptionNumber: string,
  schedule: { interval: string; period: 'day' | 'week' | 'month' | 'year' }
): Promise<void> {
  const ctx = ctxFor(page);
  await goToSubscription(page, subscriptionNumber);
  await resilientClick(ctx, {
    primary: page.locator('a.button.change_schedule'),
    alt: page.getByRole('link', { name: /change billing schedule/i }),
    ai: 'the Change Billing Schedule button',
  });
  await page.locator('#npSubsSchedule, select[name="billing_interval"]').first().waitFor({ state: 'visible', timeout: 15_000 });
  await page.locator('select[name="billing_interval"]').selectOption(schedule.interval);
  await page.locator('select[name="subscription_period"]').selectOption(schedule.period);
  await resilientClick(ctx, {
    primary: page.locator('#btn-sched-ok'),
    alt: page.getByRole('button', { name: /change schedule/i }),
    ai: 'the Change Schedule confirm button',
  });
  await page.waitForLoadState('load');
}

/** Set a subscription's status in the admin editor and click Update. */
export async function setSubscriptionStatusAsAdmin(
  adminPage: Page,
  subscriptionNumber: string,
  status: 'wc-active' | 'wc-on-hold' | 'wc-cancelled' | 'wc-pending-cancel'
): Promise<void> {
  await adminPage.goto(`wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${subscriptionNumber}`);
  await adminPage.waitForLoadState('load');
  if ((await adminPage.locator('#order_status').count()) === 0) {
    await adminPage.goto(`wp-admin/post.php?post=${subscriptionNumber}&action=edit`);
    await adminPage.waitForLoadState('load');
  }
  await adminPage.locator('#order_status').selectOption(status);
  await resilientClick(ctxFor(adminPage), {
    primary: adminPage.locator('button.save_order'),
    alt: adminPage.getByRole('button', { name: /^update$/i }),
    ai: 'the subscription Update button',
  });
  await adminPage.waitForLoadState('load');
}

function slugFor(region: Region, pdp: PdpConfig): string {
  const products = regionFor(region).products;
  switch (pdp.kind) {
    case 'simple':
      return pdp.slug || products.simple.slug;
    case 'variable':
      return pdp.slug || products.variable.slug;
    case 'subscription':
      return pdp.slug || products.subscription.slug;
  }
}

/** Set the quantity field if the product has one (some add-to-cart links skip it). */
async function setQuantity(page: Page, qty: number): Promise<void> {
  if (qty <= 1) return;
  const qtyField = page.locator('input[name="quantity"]').first();
  if (await qtyField.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await resilientFill(
      ctxFor(page),
      { primary: qtyField, alt: page.getByRole('spinbutton', { name: /quantity/i }), ai: 'the product quantity field' },
      String(qty)
    );
  }
}

// ---------------------------------------------------------------------------
// Cart navigation — customer click path (NO page.goto to cart or checkout).
// ---------------------------------------------------------------------------

/**
 * Navigate to the cart page via the header cart control.
 * Develop has a side-cart flyout (Shopping Cart button → mini-cart → View cart).
 * Preprod has no side cart — falls back to the plain header "Cart" link.
 */
export async function goToCart(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  const hasMiniCart = await page.getByRole('button', { name: /shopping cart/i })
    .isVisible({ timeout: 2_000 }).catch(() => false);
  if (hasMiniCart) {
    await resilientClick(ctx, {
      primary: page.getByRole('button', { name: /shopping cart/i }),
      ai: 'the Shopping Cart header button',
    });
    await page.locator('.mini-cart-container, .woocommerce-mini-cart__buttons').first()
      .waitFor({ state: 'visible', timeout: 10_000 });
    await resilientClick(ctx, {
      primary: page.locator('.mini-cart-container a.button.wc-forward:not(.checkout)'),
      alt: page.getByRole('link', { name: /view cart/i }),
      ai: 'the View cart link in the mini-cart flyout',
    });
  } else {
    // No side cart (preprod): use the header "Cart" link or a "View cart" notice link.
    await resilientClick(ctx, {
      primary: page.getByRole('link', { name: /^cart$/i }),
      alt: page.getByRole('link', { name: /view cart/i }),
      ai: 'the header Cart link',
    });
  }
  await page.waitForLoadState('load');
  await waitForCheckoutReady(page);
}

/**
 * Navigate to checkout from the cart page by clicking "Proceed to checkout".
 * Never use page.goto('check-out/') — customers navigate by clicking.
 */
export async function proceedToCheckout(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator('a.checkout-button, .wc-proceed-to-checkout a').first(),
    alt: page.getByRole('link', { name: /proceed to checkout/i }),
    ai: 'the Proceed to checkout button on the cart page',
  });
  await page.waitForLoadState('load');
  await waitForCheckoutReady(page);
}

// ---------------------------------------------------------------------------
// Cart — direct add-by-id + classic qty editing (quantity-limit specs).
// ---------------------------------------------------------------------------

/** Add a product to the cart by its WooCommerce id via the add-to-cart query. */
export async function addToCartById(page: Page, productId: number | string): Promise<void> {
  await page.goto(`?add-to-cart=${productId}`);
  await page.waitForLoadState('load');
  await dismissPopups(page);
}

/** Read the first classic-cart line-item quantity field value. */
export async function readFirstCartQty(page: Page): Promise<string> {
  const qty = page.locator('input.qty, input[title="Qty"]').first();
  await qty.waitFor({ state: 'visible', timeout: 10_000 });
  return (await qty.inputValue()).trim();
}

/**
 * Set the first cart line-item quantity and commit the recalculation. Two cart
 * variants exist: the classic cart with an "Update cart" button reacts to Enter,
 * while No Pong's current AJAX cart (a React spinbutton `[aria-label="Product
 * quantity"]`, NO Update button) only persists on the field's change/blur event —
 * Enter alone leaves the typed value uncommitted and it reverts. So we fill, press
 * Enter (classic), AND blur (AJAX cart) to cover both.
 *
 * `opts.verify` (default false): reload and confirm the field reads back exactly
 * `qty` before returning, retrying up to 3x — No Pong's cart session is stored via
 * an object cache shared across multiple app servers (WP VIP), which can lag: the
 * update_cart POST commits on the server that handled it, but a follow-up request
 * can land on a different app server that hasn't seen the write yet and serves the
 * pre-update qty, silently dropping the discount that qty>=1 unlocks. Confirmed
 * live (both preprod and develop) via trace inspection — not a caching/CDN issue
 * (responses are `cache-control: no-store`), and not a selector/timing bug here.
 * Only opt in when the caller expects the requested qty to persist exactly —
 * callers that deliberately request an over-limit qty (limits.spec.ts) expect the
 * SITE to clamp it down, so verifying against the requested value would always
 * fail there.
 */
async function setCartQtyAndUpdateClassic(page: Page, qty: number, opts: { verify?: boolean }): Promise<void> {
  const ctx = ctxFor(page);
  const fieldSelector = 'input[aria-label="Product quantity"], input.qty, input[title="Qty"]';
  const attempts = opts.verify ? 3 : 1;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    await goToCart(page);
    const field = page.locator(fieldSelector).first();
    await field.waitFor({ state: 'visible', timeout: 10_000 });
    await resilientFill(ctx, { primary: field, ai: 'the cart quantity field' }, String(qty));
    await field.press('Enter');
    await field.evaluate((el: HTMLInputElement) => el.blur()); // fires change → AJAX recalculation
    await page.locator('.blockUI.blockOverlay, .wc-block-components-spinner').first()
      .waitFor({ state: 'visible', timeout: 3_000 }).catch(() => {});
    await waitForCheckoutReady(page);

    if (!opts.verify) return;

    // `load` not `networkidle` — the site fires continuous ad-tracking beacons
    // that never let the network go idle.
    await page.reload({ waitUntil: 'load' });
    await waitForCheckoutReady(page);
    const persisted = await page.locator(fieldSelector).first().inputValue().catch(() => '');
    if (persisted === String(qty)) return;
  }
  throw new Error(`cart quantity did not persist as ${qty} after ${attempts} attempts (session-propagation lag on the site)`);
}

/**
 * Blocks cart: the line-item quantity is a spinbutton (aria-label "Quantity of
 * {product} in your cart.") with +/- steppers; there is NO "Update cart" button —
 * the Blocks store recalculates on change. `{ verify }` reloads and re-reads the
 * spinbutton to confirm the qty stuck (same session-propagation lag as classic).
 */
async function setCartQtyAndUpdateBlocks(page: Page, qty: number, opts: { verify?: boolean }): Promise<void> {
  const ctx = ctxFor(page);
  const sel = () => page.getByRole('spinbutton', { name: /quantity of/i }).first();
  const attempts = opts.verify ? 3 : 1;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    await goToCart(page);
    const spin = sel();
    await spin.waitFor({ state: 'visible', timeout: 10_000 });
    await resilientFill(ctx, { primary: spin, ai: 'the Blocks cart quantity spinbutton' }, String(qty));
    await spin.press('Tab'); // commit → Blocks store recalculates
    await page.locator('.wc-block-components-spinner').first()
      .waitFor({ state: 'visible', timeout: 3_000 }).catch(() => {});
    await waitForCheckoutReady(page);
    if (!opts.verify) return;
    await page.reload({ waitUntil: 'load' });
    await waitForCheckoutReady(page);
    const persisted = await sel().inputValue().catch(() => '');
    if (persisted === String(qty)) return;
  }
  throw new Error(`Blocks cart quantity did not persist as ${qty} after ${attempts} attempts (session-propagation lag on the site)`);
}

/** Set the cart line-item quantity — classic qty input or Blocks spinbutton. */
export async function setCartQtyAndUpdate(page: Page, qty: number, opts: { verify?: boolean } = {}): Promise<void> {
  if (await isBlocksCart(page)) return setCartQtyAndUpdateBlocks(page, qty, opts);
  return setCartQtyAndUpdateClassic(page, qty, opts);
}

/** Pick an option in a WooCommerce select2 dropdown (the cart shipping calculator uses these). */
async function pickSelect2(page: Page, fieldId: string, label: string): Promise<void> {
  await page.locator(`#select2-${fieldId}-container`).click({ timeout: 10_000 });
  const search = page.locator('input.select2-search__field');
  if (await search.isVisible({ timeout: 2_000 }).catch(() => false)) await search.fill(label);
  await page.locator('li.select2-results__option', { hasText: label }).first().click({ timeout: 10_000 });
}

/**
 * Set the cart "Calculate shipping" destination (GI 10 seq 12-19). Country/state
 * are select2 widgets; the state field appears only after a country with states
 * is chosen. The destination is driven by the region's typed billing (rule 11) —
 * any valid in-region address makes the cart compute full totals; it needn't match
 * the checkout address.
 */
async function setCartShippingDestinationClassic(page: Page, region: Region): Promise<void> {
  const { billing } = regionFor(region);
  const dest = {
    country: billing.countryComplete,
    state: billing.shortState,
    city: billing.city,
    postcode: billing.zip,
  };
  const ctx = ctxFor(page);
  // The calculator is collapsed behind a toggle on some themes; expand if present.
  const toggle = page.locator('a.shipping-calculator-button')
    .or(page.getByRole('link', { name: /calculate shipping/i }));
  if (await toggle.first().isVisible({ timeout: 3_000 }).catch(() => false)) {
    await toggle.first().click().catch(() => {});
  }
  const country = page.locator('#select2-calc_shipping_country-container');
  if (!(await country.first().isVisible({ timeout: 8_000 }).catch(() => false))) {
    throw new Error('setCartShippingDestinationClassic: #calc_shipping_country select2 never appeared.');
  }
  await pickSelect2(page, 'calc_shipping_country', dest.country);
  await waitForCheckoutReady(page);
  if (dest.state) {
    await page.locator(`#calc_shipping_state`).selectOption(dest.state).catch(() => {});
    await waitForCheckoutReady(page);
  }
  // Fill suburb + postcode AFTER the country/state re-render settles, and re-fill
  // if a late re-render wiped them (the reason the suburb wasn't sticking).
  const fillStable = async (sel: string, val: string) => {
    const field = page.locator(sel);
    await field.waitFor({ state: 'visible', timeout: 10_000 });
    await field.fill(val);
    if ((await field.inputValue()) !== val) await field.fill(val);
  };
  await fillStable('#calc_shipping_city', dest.city);
  await fillStable('#calc_shipping_postcode', dest.postcode);
  await resilientClick(ctx, {
    primary: page.locator('button[name="calc_shipping"]'),
    alt: page.getByRole('button', { name: /update|calculate shipping/i }),
    ai: 'the Update / Calculate shipping button',
  });
  await waitForCheckoutReady(page);
}

/**
 * Blocks cart: the shipping destination is set through the inline address editor in
 * the "Cart totals" block ("Change address" once resolved, "Calculate shipping"
 * before). The mini-form has a Country/Region combobox, a state combobox (label
 * varies by region — "Province" CA, "State/County" AU — so matched by exclusion),
 * and a Postcode/ZIP textbox (NO City field), committed with "Update".
 * TODO(live-verify): the expanded mini-form was not in the 2026-07-16 snapshots
 * (captured while the cart was still loading) — confirm the combobox/textbox names.
 */
async function setCartShippingDestinationBlocks(page: Page, region: Region): Promise<void> {
  const { billing } = regionFor(region);
  const ctx = ctxFor(page);
  const opener = page.getByRole('button', { name: /change address|calculate shipping/i }).first();
  if (await opener.isVisible({ timeout: 8_000 }).catch(() => false)) {
    await opener.click().catch(() => {});
  }
  const country = page.getByRole('combobox', { name: /country/i }).first();
  await country.waitFor({ state: 'visible', timeout: 10_000 });
  await country.selectOption(billing.shortCountry).catch(async () => {
    await country.selectOption({ label: billing.countryComplete });
  });
  await waitForCheckoutReady(page);
  if (billing.shortState) {
    // The state combobox is the one that is NOT the country combobox.
    const combos = page.getByRole('combobox');
    const n = await combos.count();
    for (let i = 0; i < n; i++) {
      const cb = combos.nth(i);
      if (/country/i.test((await cb.getAttribute('aria-label')) ?? '')) continue;
      await cb.selectOption(billing.shortState).catch(() => {});
      break;
    }
    await waitForCheckoutReady(page);
  }
  const postcode = page.getByRole('textbox', { name: /postcode|postal|zip/i }).first();
  if (await postcode.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await postcode.fill(billing.zip);
  }
  await resilientClick(ctx, {
    primary: page.getByRole('button', { name: /^update$/i }),
    alt: page.getByRole('button', { name: /update/i }),
    ai: 'the Update button in the Blocks cart shipping-address editor',
  });
  await waitForCheckoutReady(page);
}

/** Set the cart shipping destination — classic calculator or Blocks address editor. */
export async function setCartShippingDestination(page: Page, region: Region): Promise<void> {
  if (await isBlocksCart(page)) return setCartShippingDestinationBlocks(page, region);
  return setCartShippingDestinationClassic(page, region);
}

// ---------------------------------------------------------------------------
// Checkout (classic, single page).
// ---------------------------------------------------------------------------

/**
 * Navigate to checkout via customer clicks then fill the billing form.
 * Flow: Shopping Cart button → View cart → Proceed to checkout → fill form.
 * No page.goto — customers navigate by clicking, not URL changes.
 * Logged-in users skip address entry (saved address prefills).
 */
export async function fillCheckoutAddress(page: Page, config: OrderConfig): Promise<void> {
  await goToCart(page);
  await proceedToCheckout(page);
  if (config.user === 'logged') return; // saved address prefills (both flows)
  if (await isBlockCheckout(page)) return fillCheckoutAddressBlocks(page, config);
  return fillCheckoutAddressClassic(page, config);
}

/** Classic checkout: fill the #billing_* fields. */
async function fillCheckoutAddressClassic(page: Page, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(page);
  const billing = regionFor(config.region).billing;
  const email = emailFor(config);

  await resilientFill(ctx, { primary: page.locator('#billing_first_name'), ai: 'the billing first name field' }, billing.firstName);
  await resilientFill(ctx, { primary: page.locator('#billing_last_name'), ai: 'the billing last name field' }, billing.lastName);
  if (billing.company) {
    await resilientFill(ctx, { primary: page.locator('#billing_company'), ai: 'the billing company field' }, billing.company);
  }
  await setSelectValue(page, '#billing_country', billing.shortCountry);
  await resilientFill(ctx, { primary: page.locator('#billing_address_1'), ai: 'the billing street address field' }, billing.street);
  await resilientFill(ctx, { primary: page.locator('#billing_city'), ai: 'the billing town / city field' }, billing.city);
  await setSelectValue(page, '#billing_state', billing.shortState);
  await resilientFill(ctx, { primary: page.locator('#billing_postcode'), ai: 'the billing postcode field' }, billing.zip);
  await resilientFill(ctx, { primary: page.locator('#billing_phone'), ai: 'the billing phone field' }, billing.phone);
  await resilientFill(ctx, { primary: page.locator('#billing_email'), ai: 'the billing email field' }, email);

  if (config.user === 'new') {
    const create = page.locator('#createaccount');
    if ((await create.count()) > 0 && !(await create.isChecked().catch(() => false))) {
      await resilientCheck(ctx, { primary: create, ai: 'the "Create an account?" checkbox' });
    }
    const pass = page.locator('#account_password');
    if (await pass.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await resilientFill(ctx, { primary: pass, ai: 'the account password field' }, process.env.PASSWORD ?? '');
    }
  }

  await waitForCheckoutReady(page);
}

/**
 * Blocks checkout: accessible-name fields inside the `form "Checkout"` shipping
 * group. "Use same address for billing" is checked by default, so billing mirrors
 * shipping — no separate billing fill. State combobox label varies by region
 * ("Province" CA, "State/County" AU) so it's matched by exclusion of the country
 * combobox. Confirmed against au-checkout-blocks.yml / ca-checkout-blocks.yml.
 */
async function fillCheckoutAddressBlocks(page: Page, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(page);
  const billing = regionFor(config.region).billing;
  const email = emailFor(config);

  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /email address/i }), ai: 'the checkout email field' }, email);
  await page.getByRole('combobox', { name: /country/i }).first().selectOption(billing.shortCountry);
  await waitForCheckoutReady(page);
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /^first name$/i }), ai: 'the first name field' }, billing.firstName);
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /^last name$/i }), ai: 'the last name field' }, billing.lastName);
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /^address$/i }), ai: 'the street address field' }, billing.street);
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /^city$/i }), ai: 'the city field' }, billing.city);
  if (billing.shortState) {
    const combos = page.getByRole('combobox');
    const n = await combos.count();
    for (let i = 0; i < n; i++) {
      const cb = combos.nth(i);
      if (/country/i.test((await cb.getAttribute('aria-label')) ?? '')) continue;
      await cb.selectOption(billing.shortState).catch(() => {});
      break;
    }
  }
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /postal code|postcode|zip/i }), ai: 'the postcode field' }, billing.zip);
  const phone = page.getByRole('textbox', { name: /phone/i });
  if (await phone.count()) {
    await resilientFill(ctx, { primary: phone.first(), ai: 'the phone field' }, billing.phone);
  }

  if (config.user === 'new') {
    const create = page.getByRole('checkbox', { name: /create an account/i });
    if ((await create.count()) > 0 && !(await create.isChecked().catch(() => false))) {
      await resilientCheck(ctx, { primary: create, ai: 'the "Create an account" checkbox' });
    }
    const pass = page.getByRole('textbox', { name: /password/i })
      .or(page.locator('input[type="password"]')).first();
    if (await pass.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await resilientFill(ctx, { primary: pass, ai: 'the account password field' }, process.env.PASSWORD ?? '');
    }
  }

  await waitForCheckoutReady(page);
}

export type Totals = Pick<CapturedPrices, 'subtotal' | 'shipping' | 'tax' | 'total'>;

/**
 * Read a WooCommerce-style totals table by row label. Works for the checkout
 * review and the order-received details table. Exact label match (lowercased,
 * colon-stripped) so "Total" never collides with "Subtotal".
 *
 * Subscription pages render TWO totals sections in the same table — the first
 * payment AND a "Recurring totals" section whose rows carry the `recurring-total`
 * class. `opts.recurring` selects which: default reads the FIRST-PAYMENT rows
 * (skipping `.recurring-total`); `recurring: true` reads ONLY the recurring rows.
 * Without this, the recurring "Subtotal" row would overwrite the first-payment one.
 */
export async function readTotals(
  page: Page,
  tableSelector: string,
  opts: { recurring?: boolean } = {}
): Promise<Totals> {
  return page.evaluate(({ sel, recurring }) => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const tables = [...document.querySelectorAll(sel)].filter((t) => /subtotal/i.test(t.textContent ?? ''));
    const out = { subtotal: '', shipping: '', tax: '', total: '' };
    if (!tables.length) return out;
    // Iterate every matching table (recurring totals may be a separate table) and
    // bucket rows by the `recurring-total` class so the two sections never mix.
    for (const t of tables) {
      for (const r of Array.from(t.querySelectorAll('tr'))) {
        if (recurring !== r.classList.contains('recurring-total')) continue;
        const head = norm(r.querySelector('th, td')?.textContent).toLowerCase().replace(':', '').trim();
        // Take the row's main price amount, EXCLUDING the inclusive-tax note
        // (<small class="includes_tax">Includes $X GST</small>) AU renders inside
        // the Total cell — else out.total becomes "$6.82 Includes $0.62 GST".
        const priceEl = Array.from(r.querySelectorAll('td:last-child .woocommerce-Price-amount')).find(
          (el) => !el.closest('.includes_tax')
        );
        const amtEl = priceEl ?? r.querySelector('td:last-child');
        const amt = norm(amtEl?.textContent);
        if (head === 'subtotal') out.subtotal = amt;
        // Match the shipping row by its stable `shipping` class, not the header text:
        // WooCommerce Subscriptions relabels the checkout first-payment row "Initial
        // Shipment" (vs the thank-you page's "Shipping"), which no text prefix catches.
        else if (r.classList.contains('shipping') || head.startsWith('shipping') || head.startsWith('shipment')) {
          // Read the SELECTED method's price amount when methods are radios, else the
          // row's. FREE shipping renders as a method LABEL ("Regular") with no price
          // amount — capture '' (no cost), never the label: the label differs per
          // surface (thank-you shows "Regular", checkout may omit it), which would
          // make two non-numeric strings fail parity. '' matches the "no shipping
          // cost" convention and reads as 0 in the total-consistency check.
          const checked = r.querySelector<HTMLInputElement>('input[type="radio"]:checked');
          const scope = checked ? (checked.closest('li') ?? r) : r;
          const shipEl = Array.from(scope.querySelectorAll('.woocommerce-Price-amount')).find(
            (el) => !el.closest('.includes_tax')
          );
          out.shipping = shipEl ? norm(shipEl.textContent) : '';
        }
        // Tax row header varies by region: AU "GST", CA "HST (13%)" / "GST (5%)" /
        // "PST" / "QST", generic "Tax" / "VAT". Match any of them, not an exact string.
        else if (/\b(?:gst|hst|pst|qst|vat|tax)\b/.test(head)) out.tax = amt;
        // Initial total row is "Total"; the recurring total row is "Recurring total".
        else if (head === 'total' || head === 'recurring total') out.total = amt;
      }
    }
    // AU tax-inclusive: no separate Tax row, but the Total cell has
    // <small class="includes_tax">. Capture it from the matching section's rows.
    if (!out.tax) {
      for (const t of tables) {
        const inclEl = Array.from(t.querySelectorAll('small.includes_tax .woocommerce-Price-amount.amount')).find(
          (el) => recurring === !!el.closest('tr')?.classList.contains('recurring-total')
        );
        if (inclEl) { out.tax = norm(inclEl.textContent); break; }
      }
    }
    return out;
  }, { sel: tableSelector, recurring: !!opts.recurring });
}

const CHECKOUT_TOTALS_TABLE = 'table.shop_table, table.woocommerce-checkout-review-order-table';
export const ORDER_DETAILS_TABLE = 'table.woocommerce-table--order-details, table.shop_table.order_details';

/** Capture the order-summary money values from the checkout review. */
export async function captureCheckoutTotals(page: Page): Promise<Totals> {
  await waitForCheckoutReady(page);
  return readTotals(page, CHECKOUT_TOTALS_TABLE);
}

/**
 * Capture the "Recurring totals" section from the checkout review (after the address
 * is filled, BEFORE payment). The review table renders two sections — the first
 * payment and a `recurring-total`-classed section — so `recurring: true` reads only
 * the recurring rows: subtotal, shipping, and total, plus AU's inclusive GST note
 * (readTotals buckets `small.includes_tax` by the same recurring class).
 */
export async function captureCheckoutRecurringTotals(page: Page): Promise<Totals> {
  await waitForCheckoutReady(page);
  return readTotals(page, CHECKOUT_TOTALS_TABLE, { recurring: true });
}

/**
 * Capture the recurring total from the order-received / view-order page — read for
 * PARITY against the checkout-captured recurring total. Unlike the cart/checkout
 * (which split into a `.recurring-total`-classed section with a full breakdown), No
 * Pong's order page renders the recurring amount as a single WCS subscription row,
 * `td.subscription-total` ("$9.95 / month") — only the TOTAL, no subtotal/shipping/tax
 * repeat (matches the GI Thank-you assertion on `td.subscription-total`). So this
 * returns just `total`; the other fields stay empty and the parity check compares only
 * the total. Empty when the page has no subscription row (non-subscription order).
 */
export async function captureOrderRecurringTotals(page: Page): Promise<Totals> {
  const total = await page.evaluate(() => {
    const cell = document.querySelector('td.subscription-total');
    if (!cell) return '';
    // The recurring price, excluding any inclusive-tax note (AU "Includes $X GST").
    const el = Array.from(cell.querySelectorAll('.woocommerce-Price-amount.amount')).find(
      (e) => !e.closest('.includes_tax')
    ) ?? cell.querySelector('.woocommerce-Price-amount.amount');
    return (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
  });
  return { subtotal: '', shipping: '', tax: '', total };
}

/**
 * Capture the custom No Pong checkout "stories" — the `#np-custom-checkout-modal`
 * that REPLACES the blockUI during order processing, rotating story cards (one
 * `.active` at a time; all are in the DOM). Best-effort: read in the brief window
 * between Place Order and the order-received redirect (Stripe processing keeps the
 * modal up a few seconds). Returns every story heading; [] if the modal didn't show.
 */
export async function readCheckoutStories(page: Page): Promise<string[]> {
  const sel = '#np-custom-checkout-modal .np-custom-checkout-story h3';
  await page.locator(sel).first().waitFor({ state: 'attached', timeout: 10_000 }).catch(() => {});
  const texts = await page.locator(sel).allTextContents().catch(() => []);
  return texts.map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

/** Points awarded by the Points/Rewards plugin, read at cart/checkout. Undefined if absent. */
export async function readPointsEarned(page: Page): Promise<number | undefined> {
  // No Pong: tr.npl-credits-granted in the order-review table.
  // Fallback: legacy plugin classes used by other sites.
  const tip = page.locator('tr.npl-credits-granted td, .npl-tooltip, .wc-points-rewards-earn-points').first();
  if (!(await tip.count())) return undefined;
  const text = (await tip.innerText().catch(() => '')) ?? '';
  // Text format: "$1.82 = 10 pointsYou'll earn 10 points" — extract first "N points".
  const m = text.match(/(\d+)\s*points/i);
  const n = m ? parseInt(m[1], 10) : NaN;
  return Number.isNaN(n) ? undefined : n;
}

// ---------------------------------------------------------------------------
// Payment.
// ---------------------------------------------------------------------------

/** Dispatch to the configured payment method for the active checkout flow. */
export async function pay(page: Page, config: OrderConfig): Promise<void> {
  await waitForCheckoutReady(page);
  const blocks = await isBlockCheckout(page);
  await acceptTerms(page, blocks);
  if (config.payment === 'stripe') {
    await (blocks ? payStripeBlocks(page, config) : payStripeClassic(page, config));
  } else {
    await (blocks ? payPaypalBlocks(page) : payPaypalClassic(page));
  }
}

/**
 * Tick the "terms and conditions" consent. Classic renders a visually-hidden native
 * #terms behind a styled label (a plain .check() finds it but can't action it, so we
 * force it); Blocks renders `checkbox "You must accept our Terms…"`.
 */
async function acceptTerms(page: Page, blocks: boolean): Promise<void> {
  const terms = blocks
    ? page.getByRole('checkbox', { name: /accept our terms/i }).first()
    : page.locator('#terms').or(page.getByRole('checkbox', { name: 'I have read and agree to the' })).first();
  if ((await terms.count()) > 0 && !(await terms.isChecked().catch(() => false))) {
    await terms.check().catch(async () => { await terms.check({ force: true }); });
  }
}

/**
 * Stripe: select the CC method, then either pay with a SAVED card token
 * (`config.useSavedCard`) or enter a new card in the iframe (rule 15) — optionally
 * ticking "Save payment information…" (`config.savePaymentMethod`) so the token is
 * stored on the account for a later saved-card order. Then place the order.
 */
async function payStripeClassic(page: Page, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator('label[for="payment_method_stripe"]'),
    alt: page.locator('#payment_method_stripe'),
    ai: 'the Credit / Debit Card (Stripe) payment method option',
  });

  if (config.useSavedCard) {
    // A saved card from a prior order — select its token radio (anything but the
    // "new card" option). No iframe entry needed. Fails loudly if no card was saved.
    const savedToken = page.locator('input[name="wc-stripe-payment-token"]:not([value="new"])').first();
    await savedToken.waitFor({ state: 'visible', timeout: 10_000 });
    await savedToken.check();
  } else {
    // New card — Stripe renders its inputs inside an iframe (CSS can't cross frames).
    const frame = page.locator('iframe[src*="js.stripe.com"]').first().contentFrame();
    await frame.locator('input[name="number"]').first().fill(STRIPE_CARD.number);
    await frame.locator('input[name="expiry"]').first().fill(STRIPE_CARD.expiry);
    await frame.locator('input[name="cvc"]').first().fill(STRIPE_CARD.cvc);
    if (config.savePaymentMethod) {
      const saveCard = page.locator('#wc-stripe-new-payment-method');
      if (await saveCard.count()) await saveCard.check().catch(() => {});
    }
  }

  await placeOrderClassic(page);
}

/**
 * Blocks Stripe: the "Credit / Debit Card" method is selected by default. The Stripe
 * Payment Element renders textboxes (accessible names "Card number", "Expiration date
 * MM / YY", "Security code") inside its iframe — a different shape than the classic
 * 3-input iframe. Confirmed against {au,ca}-checkout-blocks.yml.
 */
async function payStripeBlocks(page: Page, config: OrderConfig): Promise<void> {
  const cc = page.getByRole('radio', { name: /credit \/ debit card/i }).first();
  if ((await cc.count()) > 0 && !(await cc.isChecked().catch(() => false))) {
    await cc.check().catch(() => {});
  }
  if (config.useSavedCard) {
    // TODO(live-verify): saved-token radio markup on Blocks not snapshotted.
    const savedToken = page.locator('input[name*="saved-token" i]:not([value="new"]), input[name*="wc-stripe-payment-token" i]:not([value="new"])').first();
    await savedToken.waitFor({ state: 'visible', timeout: 10_000 });
    await savedToken.check();
  } else {
    const frame = page.locator('iframe[src*="js.stripe.com"], iframe[title*="payment" i], iframe[name*="stripe" i]').first().contentFrame();
    await frame.getByRole('textbox', { name: /card number/i }).fill(STRIPE_CARD.number);
    await frame.getByRole('textbox', { name: /expiration date/i }).fill(STRIPE_CARD.expiry);
    await frame.getByRole('textbox', { name: /security code/i }).fill(STRIPE_CARD.cvc);
    if (config.savePaymentMethod) {
      const save = page.getByRole('checkbox', { name: /save (payment information|.*card)/i }).first();
      if (await save.count()) await save.check().catch(() => {});
    }
  }
  await placeOrderBlocks(page);
}

/**
 * PayPal (PPCP Smart Buttons): select the PayPal gateway, then — instead of the
 * classic #place_order button (PPCP hides it) — click the "Pay with PayPal"
 * button rendered inside PayPal's cross-origin SDK iframe. That opens the PayPal
 * sandbox in a popup window; we drive the sandbox login (email → password) and
 * the approve/pay button. The popup then closes and the main page redirects to
 * order-received. Sandbox screens vary (and the account may already be signed
 * in), so the login steps are best-effort. Falls back to driving the main page
 * if PPCP redirects in-place rather than opening a popup.
 */
async function payPaypalClassic(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator('label[for*="payment_method_ppcp"], label[for*="payment_method_paypal"]'),
    alt: page.locator('input[id*="ppcp"], input[id*="paypal"]').first(),
    ai: 'the PayPal payment method option',
  });
  await waitForCheckoutReady(page);
  await drivePaypalSmartButton(page);
}

/**
 * Blocks PayPal: select the "PayPal" payment radio, then drive the same PPCP Smart
 * Button + sandbox popup as classic (the SDK button + popup are gateway-agnostic).
 * TODO(live-verify): the loaded PayPal-radio state was not in the 2026-07-16
 * snapshots — confirm the radio name and that the Smart Button renders after
 * selecting it (vs the top "Express Checkout" PayPal iframe) on the live run.
 */
async function payPaypalBlocks(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  const radio = page.getByRole('radio', { name: /^paypal$/i }).first();
  if ((await radio.count()) > 0 && !(await radio.isChecked().catch(() => false))) {
    await resilientClick(ctx, { primary: radio, ai: 'the PayPal payment method radio (Blocks)' });
  }
  await waitForCheckoutReady(page);
  await drivePaypalSmartButton(page);
}

/**
 * Shared PayPal PPCP driver: find the "Pay with PayPal" Smart Button in whichever
 * (cross-origin) frame the SDK rendered it, click it, and drive the sandbox popup
 * login + approve. Called by both the classic and Blocks PayPal paths after each has
 * selected its own PayPal gateway option.
 */
async function drivePaypalSmartButton(page: Page): Promise<void> {
  // The Smart Button renders inside PayPal's SDK iframe (cross-origin, generated
  // name/src — no stable iframe selector). Scan every frame for the button
  // ("Pay with PayPal" role=link, or [data-funding-source="paypal"]); the SDK
  // renders it asynchronously after PayPal is selected, so poll until it shows.
  const findPayButton = async () => {
    // Preferred: the SDK iframe is named with "paypal" — address it directly and read
    // the "Pay with PayPal" link inside its content frame.
    const framed = page.locator('iframe[name*="paypal" i]').first();
    if (await framed.count().catch(() => 0)) {
      const link = framed.contentFrame().getByRole('link', { name: /pay with paypal/i });
      if (await link.count().catch(() => 0)) return link.first();
    }
    // Fallback: scan every frame (iframe name/src can be generated/opaque).
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
  if (!payButton) throw new Error('PayPal Smart Button never rendered in any frame after selecting PayPal');
  await payButton.waitFor({ state: 'visible', timeout: 20_000 });

  // Clicking the button opens the sandbox popup. Race the popup event with the
  // click so we don't miss it; if no popup fires (in-place redirect), drive the
  // main page instead.
  const popupPromise = page.waitForEvent('popup', { timeout: 30_000 }).catch(() => null);
  await payButton.click({ timeout: 20_000 });
  const popup = await popupPromise;
  const flow = popup ?? page;
  // The popup opens as about:blank and only navigates to sandbox.paypal.com a
  // few seconds later — wait for the real URL before driving login, or every
  // field check runs against the blank page and silently skips.
  if (popup) {
    await popup.waitForURL((u) => !u.toString().includes('about:blank'), { timeout: 30_000 }).catch(() => {});
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
  }

  // Drive the sandbox login + approve. The sandbox buttons have NO ids (only
  // visible text), so match by role/text, not selectors. Flow: enter email →
  // Next → password appears → Log In → review → Pay/Continue. Account state
  // varies (already-signed-in skips login), so each step is best-effort.
  const user = process.env.PAY_PAL_USER ?? '';
  const pass = process.env.PAY_PAL_PASS ?? '';
  // PayPal's sandbox login is matched by accessible name first (its markup ids drift),
  // with the legacy id/type selectors as a fallback for older sandbox variants.
  const emailField = flow.getByRole('textbox', { name: /email or mobile/i })
    .or(flow.locator('#email, input[name="login_email"], input[type="email"]')).first();
  const passField = flow.getByRole('textbox', { name: /^password$/i })
    .or(flow.locator('#password, input[name="login_password"], input[type="password"]')).first();

  // PayPal sandbox screens + timing vary run-to-run (email→Next→password→Log In,
  // or combined; transitions show transient spinner states where buttons briefly
  // vanish). A linear sequence races those transitions, so drive it as a resilient
  // loop: each tick, fill whatever email/password field is visible+empty and click
  // the first available advance button (Next → Log In → Pay/Continue). Stop when
  // the merchant page reaches order-received or the popup closes.
  const nextBtn = flow.getByRole('button', { name: /^next$/i }).first();
  const loginBtn = flow.getByRole('button', { name: /log\s?in|^login$/i }).first();
  // Review-screen SUBMIT button is #one-time-cta (text "Pay"). NOT the
  // "Pay in full" tile (id-pay-in-full-action, role=checkbox) which only selects
  // the funding source. Target the CTA first; keep text fallbacks for variants.
  // Review-screen SUBMIT: the "Pay" button (role=button, exact — NOT the "Pay in full"
  // tile, which is a role=checkbox that only selects funding). #one-time-cta is its id;
  // keep it plus text variants as fallback.
  const approveBtn = flow.getByRole('button', { name: 'Pay', exact: true })
    .or(flow.locator('#one-time-cta, button:has-text("Pay Now"), button:has-text("Complete Purchase"), [data-testid="submit-button-initial"]'))
    .first();
  const fillIfEmpty = async (loc: ReturnType<Page['locator']>, value: string) => {
    if (!value) return;
    if (!(await loc.isVisible({ timeout: 500 }).catch(() => false))) return;
    if (await loc.inputValue().catch(() => '')) return; // already filled
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
    // Advance: Next (email step) → Log In (password step) → Pay CTA (review).
    if (!(await clickIfVisible(nextBtn))) {
      if (!(await clickIfVisible(loginBtn))) {
        await clickIfVisible(approveBtn);
      }
    }
    await page.waitForTimeout(2_000);
  }

  await page.waitForURL('**/order-received/**', { timeout: 60_000 }).catch(() => {});
}

/** Wait for #place_order to be enabled, then click it (GI `placeOrderElement`). */
async function placeOrderClassic(page: Page): Promise<void> {
  await waitForCheckoutReady(page);
  const btn = page.locator('#place_order').filter({ visible: true }).first();
  await btn.waitFor({ state: 'visible', timeout: 15_000 });
  await page.locator('#place_order:not([disabled])').first().waitFor({ state: 'attached', timeout: 15_000 }).catch(() => {});
  await resilientClick(ctxFor(page), {
    primary: page.locator('#place_order').filter({ visible: true }),
    alt: page.getByRole('button', { name: /place order|join the club/i }),
    ai: 'the Place Order / Join the Club button',
  });
}

/**
 * Blocks place-order button. Located by class, not text — the label varies
 * ("Place Order" simple, "Join the Club" subscription). Confirmed
 * `.wc-block-components-checkout-place-order-button` in {au,ca}-checkout-blocks.yml.
 */
async function placeOrderBlocks(page: Page): Promise<void> {
  await waitForCheckoutReady(page);
  const btn = page.locator('.wc-block-components-checkout-place-order-button').filter({ visible: true }).first();
  await btn.waitFor({ state: 'visible', timeout: 15_000 });
  await resilientClick(ctxFor(page), {
    primary: btn,
    alt: page.getByRole('button', { name: /place order|join the club/i }),
    ai: 'the Blocks Place Order / Join the Club button',
  });
}

// ---------------------------------------------------------------------------
// Order received (thank-you).
// ---------------------------------------------------------------------------

export interface OrderReceived {
  orderNumber: string;
  paymentLabel: string;
  productName: string;
  /** The customer-details (billing) address block text — asserted for parity. */
  address: string;
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
}

/** Read the order-received page after placing the order. */
export async function readOrderReceived(page: Page): Promise<OrderReceived> {
  await page.waitForURL('**/order-received/**', { timeout: 30_000 });
  await page.waitForLoadState('load');

  const ctx = ctxFor(page);
  const orderNumber = (
    await resilientText(ctx, {
      primary: page.locator('li.woocommerce-order-overview__order.order > strong'),
      ai: 'the order number on the order confirmation',
    })
  ).replace(/[^0-9]/g, '');

  const paymentLabel = await resilientText(ctx, {
    primary: page.locator('li.woocommerce-order-overview__payment-method.method > strong'),
    ai: 'the payment method on the order confirmation',
  });

  const productName = (
    await resilientText(ctx, {
      primary: page.locator('td.woocommerce-table__product-name.product-name a, td.product-name a, td.product-name'),
      ai: 'the product name in the order confirmation table',
    })
  ).replace(/\s*[×x]\s*\d+.*$/i, '').trim();

  const address = await resilientText(ctx, {
    primary: page.locator('.woocommerce-customer-details address').first()
      .or(page.locator('.woocommerce-customer-details').first()),
    ai: 'the billing address block on the order confirmation',
  });

  const totals = await readTotals(page, ORDER_DETAILS_TABLE);
  return { orderNumber, paymentLabel, productName, address, ...totals };
}

// ---------------------------------------------------------------------------
// Maintenance warner (rule 22).
// ---------------------------------------------------------------------------

/**
 * Tax & shipping are expected-by-default. Warn (don't fail) when a row is MISSING
 * or literally $0 — a maintenance-cycle config-regression signal. A "Free"
 * shipping method is acceptable and does NOT warn.
 */
export async function warnIfNoTaxOrShipping(page: Page, ctx: { testId: string }): Promise<void> {
  // AU uses inclusive tax: no tr.tax-rate, but small.includes_tax inside Total row.
  const taxExclusive = page.locator('tr.tax-rate, tr.fee.tax, .wc-block-components-totals-taxes');
  const taxInclusive = page.locator('small.includes_tax .woocommerce-Price-amount.amount');
  const shipping = page.locator('tr.shipping, tr.shipment, .wc-block-components-totals-shipping');

  const taxMissing = (await taxExclusive.count()) === 0 && (await taxInclusive.count()) === 0;
  const shipMissing = (await shipping.count()) === 0;
  const taxZero = !taxMissing && (await taxExclusive.count()) > 0 && isZeroAmount(await taxExclusive.first().innerText());
  const shipZero = !shipMissing && isZeroAmount(await shipping.first().innerText());

  if (taxMissing) console.warn(`[${ctx.testId}] no Tax row or inclusive-tax indicator at checkout — verify tax classes / region for this site`);
  else if (taxZero) console.warn(`[${ctx.testId}] Tax row is $0 — verify tax is configured for this site`);
  if (shipMissing) console.warn(`[${ctx.testId}] no Shipping row at checkout — verify shipping zones / product types for this site`);
  else if (shipZero) console.warn(`[${ctx.testId}] Shipping row is $0 — verify shipping is configured (a "Free" method is fine; literal $0.00 is suspect)`);
}

// ---------------------------------------------------------------------------
// Internals.
// ---------------------------------------------------------------------------

/** Read site-level values once (DOM-only). Title is the parallel-safe email filter. */
export async function getSuiteVars(page: Page): Promise<import('../types/test-config').SuiteVars> {
  await page.goto('./');
  await page.waitForLoadState('domcontentloaded');
  const title =
    (await page.locator('meta[property="og:site_name"]').getAttribute('content').catch(() => null)) ??
    (await page.title().catch(() => '')).replace(/\s*[•|–-].*$/, '').trim() ??
    'No Pong';
  return { title };
}

// One id per test-process run — stable WITHIN a run (capture + checkout agree),
// unique ACROSS runs so account creation doesn't collide with an existing email.
const RUN_ID = Date.now().toString(36);

/** Per-run customer email on the Playgrounds catch domain (lands in Mailpit, searchable). */
export function emailFor(config: OrderConfig): string {
  if (config.accountEmail) return config.accountEmail; // reused logged-in account (rule 28)
  const slug = config.testId.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  return `qa+nopong_${slug}_${RUN_ID}@playgrounds.saucal.io`;
}

/** Per-run unique Playgrounds email for non-order tests (account flows etc). */
export function emailForTest(slug: string): string {
  return `qa+nopong_${slug.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${RUN_ID}@playgrounds.saucal.io`;
}

/**
 * Set a (select2-backed) <select> by value. Prefer Playwright `selectOption` — it
 * fires the trusted change event WooCommerce needs to run `update_checkout`
 * (recalc shipping). Falls back to an eval value+change only if selectOption
 * can't act (element isn't a real <select>).
 */
async function setSelectValue(page: Page, selector: string, value: string): Promise<void> {
  const sel = page.locator(selector);
  await sel.waitFor({ state: 'attached', timeout: 10_000 });
  try {
    await sel.selectOption(value, { timeout: 8_000 });
  } catch {
    await page.evaluate(
      ({ selector, value }) => {
        const el = document.querySelector<HTMLSelectElement>(selector);
        if (!el) return;
        el.value = value;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      },
      { selector, value }
    );
  }
}
