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
    expectShipping: true,
  },
  // Filled by the CA/US replication plan (Phase: post-AU). Not exercised by AU specs.
  ca: undefined as unknown as RegionConfig,
  us: undefined as unknown as RegionConfig,
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
  await page.waitForLoadState('domcontentloaded');
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
  await page.goto('my-account/subscriptions/');
  await page.waitForLoadState('load');

  const link = page.locator('a[href*="/my-account/view-subscription/"]').first();
  await link.waitFor({ state: 'visible', timeout: 15_000 });
  const href = (await link.getAttribute('href')) ?? '';
  const subscriptionNumber = (href.match(/view-subscription\/(\d+)/)?.[1] ?? (await link.innerText())).replace(/[^0-9]/g, '');

  await resilientClick(ctx, { primary: link, ai: 'the subscription link in the My Account subscriptions list' });
  await page.waitForLoadState('load');

  const nextPaymentDate = await resilientText(ctx, {
    primary: page.locator('td[data-title="Next payment"], .subscription-next-payment, td.next-payment-date').first(),
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

/** Cancel a subscription as the logged-in customer (confirms the cancel link). */
export async function cancelSubscriptionAsCustomer(page: Page, subscriptionNumber: string): Promise<void> {
  const ctx = ctxFor(page);
  await goToSubscription(page, subscriptionNumber);
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
 * Set the first cart line-item quantity and click "Update cart". The update
 * button stays disabled until the qty field changes, so we blur after filling.
 */
export async function setCartQtyAndUpdate(page: Page, qty: number): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('cart/');
  await waitForCheckoutReady(page);
  const field = page.locator('input.qty, input[title="Qty"]').first();
  await field.waitFor({ state: 'visible', timeout: 10_000 });
  await resilientFill(ctx, { primary: field, ai: 'the cart quantity field' }, String(qty));
  await field.blur().catch(() => {});
  // await resilientClick(ctx, {
  //   primary: page.locator('button[name="update_cart"]'),
  //   alt: page.getByRole('button', { name: /update cart/i }),
  //   ai: 'the Update cart button',
  // });
  await waitForCheckoutReady(page);
}

// ---------------------------------------------------------------------------
// Checkout (classic, single page).
// ---------------------------------------------------------------------------

/**
 * Fill the classic checkout billing form for a NEW or GUEST user, creating an
 * account when config.user === 'new'. For a logged-in user the saved address
 * prefills, so we skip address entry entirely (no `vars.logged` string flag —
 * we branch on the typed user kind).
 */
export async function fillCheckoutAddress(page: Page, config: OrderConfig, checkoutPath = 'checkout/?sc_bypass=1'): Promise<void> {
  await page.goto(checkoutPath);
  await waitForCheckoutReady(page);

  if (config.user === 'logged') return; // saved address prefills

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

type Totals = Pick<CapturedPrices, 'subtotal' | 'shipping' | 'tax' | 'total'>;

/**
 * Read a WooCommerce-style totals table by row label. Scans the last table that
 * mentions "subtotal" so it works for both the checkout review and the
 * order-received details table. Exact label match (lowercased, colon-stripped)
 * so "Total" never collides with "Subtotal".
 */
export async function readTotals(page: Page, tableSelector: string): Promise<Totals> {
  return page.evaluate((sel) => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const tables = [...document.querySelectorAll(sel)].filter((t) => /subtotal/i.test(t.textContent ?? ''));
    const t = tables[tables.length - 1];
    const out = { subtotal: '', shipping: '', tax: '', total: '' };
    if (!t) return out;
    for (const r of Array.from(t.querySelectorAll('tr'))) {
      const head = norm(r.querySelector('th, td')?.textContent).toLowerCase().replace(':', '').trim();
      const amtEl = r.querySelector('td:last-child .woocommerce-Price-amount, td:last-child');
      const amt = norm(amtEl?.textContent);
      if (head === 'subtotal') out.subtotal = amt;
      else if (head.startsWith('shipping')) out.shipping = amt;
      else if (head === 'tax' || head === 'gst') out.tax = amt;
      else if (head === 'total') out.total = amt;
    }
    return out;
  }, tableSelector);
}

const CHECKOUT_TOTALS_TABLE = 'table.shop_table, table.woocommerce-checkout-review-order-table';
const ORDER_DETAILS_TABLE = 'table.woocommerce-table--order-details, table.shop_table.order_details';

/** Capture the order-summary money values from the checkout review. */
export async function captureCheckoutTotals(page: Page): Promise<Totals> {
  await waitForCheckoutReady(page);
  return readTotals(page, CHECKOUT_TOTALS_TABLE);
}

/** Points awarded by the Points/Rewards plugin, read at cart/checkout. Undefined if absent. */
export async function readPointsEarned(page: Page): Promise<number | undefined> {
  const tip = page.locator('.npl-tooltip, .wc-points-rewards-earn-points').first();
  if (!(await tip.count())) return undefined;
  const text = (await tip.innerText().catch(() => '')) ?? '';
  const n = parseInt(text.replace(/[^0-9]/g, ''), 10);
  return Number.isNaN(n) ? undefined : n;
}

// ---------------------------------------------------------------------------
// Payment.
// ---------------------------------------------------------------------------

/** Dispatch to the configured payment method, then place the order. */
export async function pay(page: Page, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(page);
  const terms = page.locator('#terms');
  if ((await terms.count()) > 0 && !(await terms.isChecked().catch(() => false))) {
    await resilientCheck(ctx, { primary: terms, ai: 'the terms and conditions agreement checkbox' });
  }

  if (config.payment === 'stripe') await payStripe(page);
  else await payPaypal(page);
}

/** Stripe: select the CC method, fill the iframe card fields (rule 15), place order. */
async function payStripe(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator('label[for="payment_method_stripe"]'),
    alt: page.locator('#payment_method_stripe'),
    ai: 'the Credit / Debit Card (Stripe) payment method option',
  });

  // Stripe renders its inputs inside an iframe — CSS can't cross frames (rule 15).
  const frame = page.locator('iframe[src*="js.stripe.com"]').first().contentFrame();
  await frame.locator('input[name="number"]').first().fill(STRIPE_CARD.number);
  await frame.locator('input[name="expiry"]').first().fill(STRIPE_CARD.expiry);
  await frame.locator('input[name="cvc"]').first().fill(STRIPE_CARD.cvc);

  await placeOrder(page);
}

/**
 * PayPal: select the PayPal gateway, place the order, then drive the PayPal
 * sandbox login (email → password → log in → pay). Sandbox screens vary, so the
 * login steps are best-effort. Faithful to the GI `payPalTemplate` selectors.
 */
async function payPaypal(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator('label[for*="payment_method_ppcp"], label[for*="payment_method_paypal"]'),
    alt: page.locator('input[id*="ppcp"], input[id*="paypal"]').first(),
    ai: 'the PayPal payment method option',
  });
  await placeOrder(page);

  // PayPal Smart Button can render in an iframe; the popup/redirect opens the
  // sandbox login. Best-effort drive of the sandbox screens.
  const user = process.env.PAY_PAL_USER ?? '';
  const pass = process.env.PAY_PAL_PASS ?? '';
  const tryFill = async (loc: ReturnType<Page['locator']>, value: string) =>
    loc.first().fill(value, { timeout: 15_000 }).catch(() => {});
  const tryClick = async (loc: ReturnType<Page['locator']>) =>
    loc.first().click({ timeout: 20_000 }).catch(() => {});

  await tryFill(page.locator("#email, #login_email, *[id*='email'][type='email']"), user);
  await tryClick(page.locator('#btnNext'));
  await tryFill(page.locator("#password, input[name='login_password']"), pass);
  await tryClick(page.locator('#btnLogin, button[type="submit"]'));

  await page.waitForURL('**/order-received/**', { timeout: 60_000 }).catch(() => {});
}

/** Wait for #place_order to be enabled, then click it (GI `placeOrderElement`). */
async function placeOrder(page: Page): Promise<void> {
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

// ---------------------------------------------------------------------------
// Order received (thank-you).
// ---------------------------------------------------------------------------

export interface OrderReceived {
  orderNumber: string;
  paymentLabel: string;
  productName: string;
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

  const productName = await resilientText(ctx, {
    primary: page.locator('td.woocommerce-table__product-name.product-name a, td.product-name'),
    ai: 'the product name in the order confirmation table',
  });

  const totals = await readTotals(page, ORDER_DETAILS_TABLE);
  return { orderNumber, paymentLabel, productName, ...totals };
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
  const tax = page.locator('tr.tax-rate, tr.fee.tax, .wc-block-components-totals-taxes');
  const shipping = page.locator('tr.shipping, .wc-block-components-totals-shipping');

  const taxMissing = (await tax.count()) === 0;
  const shipMissing = (await shipping.count()) === 0;
  const taxZero = !taxMissing && isZeroAmount(await tax.first().innerText());
  const shipZero = !shipMissing && isZeroAmount(await shipping.first().innerText());

  if (taxMissing) console.warn(`[${ctx.testId}] no Tax row at checkout — verify tax classes / region for this site`);
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
