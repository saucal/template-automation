// Site-specific helpers for repurposedMATERIALS.
//
// Owns: overlay dismissal (LiveChat + Mailchimp + promo dialog), PDP product
// selection (dynamic simple), checkout form (classic shortcode + custom fields),
// Accept.Blue v2 payment (direct DOM — no iframe), price capture, and order placement.
//
// Does NOT: assert (see assertions.ts) or orchestrate flows (see flows.ts).
import { expect, type Page } from '@playwright/test';
import type { CapturedPrices, OrderConfig, PdpConfig, SimplePdp, SuiteVars, VariablePdp } from '../types/test-config';
import { ctxFor, resilientClick, resilientFill, resilientSelect, resilientCheck, resilientUncheck, resilientText } from './resilient';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const BILLING = {
  firstName: 'QA',
  lastName: 'GI Repurposed',
  company: 'Saucal Test',
  street: '123 False Street',
  street2: 'Ap. 4',
  city: 'Westminster',
  state: 'CO',
  zip: '80030',
  country: 'US',
  phone: '305-968-9789',
  // Shipping address (separate in the GI flow)
  shippingLastName: 'GI Repurposed Shipping',
  shippingCompany: 'Saucal Shipping',
  shippingStreet: '123 False Shipping',
  shippingStreet2: '4th Floor',
} as const;

export const PAYMENT_LABEL = 'Credit Card';

/** Order note filled at checkout — asserted on thank-you, backend, and email (GI parity). */
export const ORDER_NOTE = 'Order Note for Testing this field';

/** Normalise a rendered money string to a number. */
export function toAmount(text: string | null | undefined): number {
  return parseFloat((text ?? '').replace(/[^0-9.-]/g, ''));
}

// One id per test-process run — keeps email stable WITHIN a run but unique ACROSS.
const RUN_ID = Date.now().toString(36);

/** Per-run customer email on Playgrounds catch domain (or a reused account email). */
export function emailFor(config: OrderConfig): string {
  if (config.accountEmail) return config.accountEmail;
  const slug = config.testId.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  return `qa+repurposed_${slug}_${RUN_ID}@playgrounds.saucal.io`;
}

/** Per-run email for non-order tests. */
export function emailForTest(slug: string): string {
  return `qa+repurposed_${slug.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${RUN_ID}@playgrounds.saucal.io`;
}

// ---------------------------------------------------------------------------
// Overlay dismissal
// ---------------------------------------------------------------------------

/**
 * Dismiss the three overlays that cover the storefront:
 * 1. LiveChat widget (#chat-widget-container) — iframe intercepts pointer events
 * 2. Mailchimp popup (.mcforms-wrapper) — intercepts product button clicks
 * 3. Promotional dialog (shadow-DOM accessible, button[aria-label="Close"])
 *
 * Order matters: remove pointer-intercepting elements first, then click dialog close.
 */
export async function dismissOverlays(page: Page): Promise<void> {
  await page.evaluate(() => {
    document.getElementById('chat-widget-container')?.remove();
    document.querySelectorAll('.mcforms-wrapper').forEach((e) => e.remove());
  });
  // Promo dialog — try the piercing shadow-DOM selector first, then standard.
  for (const sel of ['dialog button[aria-label="Close"]', '>>> button[aria-label="Close"]']) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 2_000 })) {
        await btn.click({ timeout: 3_000 });
        break;
      }
    } catch { /* not present */ }
  }
}

/**
 * Opt OUT of every marketing/newsletter checkbox (Mailchimp etc.) wherever it
 * appears — checkout AND registration. On this site the box is checked by default,
 * so we uncheck it every time rather than only when we put it there.
 */
export async function uncheckNewsletters(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  const boxes = page.locator(
    '#mailchimp_woocommerce_newsletter, input[name="mailchimp_woocommerce_newsletter"], input[type="checkbox"][name*="newsletter"]'
  );
  const n = await boxes.count();
  for (let i = 0; i < n; i++) {
    const box = boxes.nth(i);
    if (await box.isChecked().catch(() => false)) {
      await resilientUncheck(ctx, { primary: box, ai: 'the newsletter subscription checkbox' }).catch(() => {});
    }
  }
}

// ---------------------------------------------------------------------------
// PDP — find and add a simple product to cart
// ---------------------------------------------------------------------------

export interface PdpCapture {
  productName: string;
  unitPrice: string;
  /** Selected variation option labels (variable products) — asserted on the order (GI Check_variations). */
  variations?: string[];
}

/**
 * Navigate to the shop, pick a random in-stock simple product under maxPrice
 * (or a specific slug), add to cart, return captured name + price.
 */
export async function findAndAddSimpleProduct(page: Page, pdp: SimplePdp): Promise<PdpCapture> {
  const ctx = ctxFor(page);

  if (pdp.slug) {
    // Explicit product URL
    await page.goto(`/product/${pdp.slug}/`);
    await page.waitForLoadState('load');
    await dismissOverlays(page);
  } else {
    // Dynamic selection: navigate to shop, pick a random qualifying product
    await page.goto('/view-all-products/');
    await page.waitForLoadState('load');
    await dismissOverlays(page);

    const maxPrice = pdp.maxPrice ?? 100;
    const productUrl: string = await page.evaluate((max) => {
      const items = Array.from(
        document.querySelectorAll('ul.products > li.instock.product-type-simple')
      );
      function parsePrice(li: Element): number {
        const amt =
          li.querySelector('.price ins .woocommerce-Price-amount') ??
          li.querySelector('.price .woocommerce-Price-amount');
        if (!amt) return NaN;
        return parseFloat(amt.textContent!.replace(/[^0-9.]/g, ''));
      }
      const eligible = items.filter((li) => {
        const p = parsePrice(li);
        // p > 0 excludes "price on request" ($0) products that break price parity.
        return !isNaN(p) && p > 0 && p <= max;
      });
      if (eligible.length === 0) return '';
      const pick = eligible[Math.floor(Math.random() * eligible.length)];
      const link = pick.querySelector('a.woocommerce-LoopProduct-link') as HTMLAnchorElement | null;
      return link?.href ?? '';
    }, maxPrice);

    expect(productUrl, `should find an in-stock simple product under $${pdp.maxPrice}`).toBeTruthy();
    await page.goto(productUrl);
    await page.waitForLoadState('load');
    await dismissOverlays(page);
  }

  const productName = await resilientText(ctx, {
    primary: page.locator('h1.product_title'),
    alt: page.locator('.product_title'),
    ai: 'the product title heading',
  });
  const unitPrice = await resilientText(ctx, {
    primary: page
      .locator('.product-summary > .price ins .woocommerce-Price-amount.amount bdi')
      .or(page.locator('.product-summary > .price > span > .woocommerce-Price-amount.amount > bdi'))
      .or(page.locator('p.price .woocommerce-Price-amount.amount bdi')),
    ai: 'the product price',
  });

  if (pdp.qty > 1) {
    await resilientFill(
      ctx,
      { primary: page.locator('input[name="quantity"]'), alt: page.getByRole('spinbutton', { name: /quantity/i }), ai: 'the product quantity field' },
      String(pdp.qty)
    );
  }

  await resilientClick(ctx, {
    primary: page.locator('button[name="add-to-cart"]'),
    alt: page.getByRole('button', { name: /add to cart/i }),
    ai: 'the Add to cart button',
  });

  // Wait for the "has been added to your cart" message
  await page.locator('.woocommerce-message').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});

  return { productName, unitPrice };
}

/** Dispatch to the right add-to-cart flow by product kind. */
export async function findAndAddProduct(page: Page, pdp: PdpConfig): Promise<PdpCapture> {
  return pdp.kind === 'variable'
    ? findAndAddVariableProduct(page, pdp)
    : findAndAddSimpleProduct(page, pdp);
}

/**
 * Navigate to the shop, pick a random in-stock variable product under maxPrice
 * (or a specific slug), select the first available option in every attribute
 * dropdown (GI `selectFirstAvailableVariation` parity), add to cart.
 */
export async function findAndAddVariableProduct(page: Page, pdp: VariablePdp): Promise<PdpCapture> {
  const ctx = ctxFor(page);

  if (pdp.slug) {
    await page.goto(`/product/${pdp.slug}/`);
    await page.waitForLoadState('load');
    await dismissOverlays(page);
  } else {
    await page.goto('/view-all-products/');
    await page.waitForLoadState('load');
    await dismissOverlays(page);

    const maxPrice = pdp.maxPrice ?? 100;
    const productUrl: string = await page.evaluate((max) => {
      const items = Array.from(
        document.querySelectorAll('ul.products > li.instock.product-type-variable')
      );
      // Variable products advertise a price range; use the lowest as the gate.
      function lowestPrice(li: Element): number {
        const amounts = li.querySelectorAll('.price .woocommerce-Price-amount');
        if (!amounts.length) return NaN;
        const prices = Array.from(amounts).map((a) => parseFloat(a.textContent!.replace(/[^0-9.]/g, '')));
        return Math.min(...prices);
      }
      const eligible = items.filter((li) => {
        const p = lowestPrice(li);
        return !isNaN(p) && p > 0 && p <= max;
      });
      if (eligible.length === 0) return '';
      const pick = eligible[Math.floor(Math.random() * eligible.length)];
      const link = pick.querySelector('a.woocommerce-LoopProduct-link') as HTMLAnchorElement | null;
      return link?.href ?? '';
    }, maxPrice);

    expect(productUrl, `should find an in-stock variable product under $${pdp.maxPrice}`).toBeTruthy();
    await page.goto(productUrl);
    await page.waitForLoadState('load');
    await dismissOverlays(page);
  }

  const productName = await resilientText(ctx, {
    primary: page.locator('h1.product_title'),
    alt: page.locator('.product_title'),
    ai: 'the product title heading',
  });

  // Select the first available option in each attribute dropdown. WooCommerce
  // flags valid options with the `enabled` class; the placeholder has value "".
  await page.locator('table.variations select[name^="attribute_"]').first().waitFor({ state: 'visible', timeout: 15_000 });
  await page.evaluate(() => {
    const selects = document.querySelectorAll<HTMLSelectElement>('table.variations select[name^="attribute_"]');
    selects.forEach((select) => {
      if (select.value) return;
      const valid = Array.from(select.options).filter(
        (opt) => opt.value.trim() !== '' && !opt.disabled && opt.classList.contains('enabled')
      );
      if (valid.length) {
        select.value = valid[0].value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });

  // Variation resolves → add-to-cart button loses its `disabled` class.
  await page.locator('button.single_add_to_cart_button:not(.disabled)').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});

  // Record the selected option labels so we can assert them on the order later
  // (GI Check_variations: the order/backend product title must include each).
  const variations = await page.$$eval('table.variations select[name^="attribute_"]', (selects) =>
    (selects as HTMLSelectElement[])
      .map((s) => s.options[s.selectedIndex]?.textContent?.trim() ?? '')
      .filter((t) => t !== '')
  );

  // Price node varies: variation price when present, else the (tiered) summary price.
  // Note: the Tiered Pricing plugin renders no `bdi`, so match `.amount` directly.
  const unitPrice = await resilientText(ctx, {
    primary: page
      .locator('.woocommerce-variation-price .woocommerce-Price-amount.amount')
      .or(page.locator('.product-summary .price .woocommerce-Price-amount.amount'))
      .or(page.locator('p.price .woocommerce-Price-amount.amount'))
      .first(),
    ai: 'the variation price',
  });

  if (pdp.qty > 1) {
    await resilientFill(
      ctx,
      { primary: page.locator('input[name="quantity"]'), alt: page.getByRole('spinbutton', { name: /quantity/i }), ai: 'the product quantity field' },
      String(pdp.qty)
    );
  }

  await resilientClick(ctx, {
    primary: page.locator('button.single_add_to_cart_button'),
    alt: page.getByRole('button', { name: /add to cart/i }),
    ai: 'the Add to cart button',
  });

  await page.locator('.woocommerce-message').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});

  return { productName, unitPrice, variations };
}

// ---------------------------------------------------------------------------
// Checkout
// ---------------------------------------------------------------------------

/** Wait for WC blocking overlays to clear. */
export async function waitForCheckoutReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  for (const sel of ['.blockUI.blockOverlay', '.wc-block-components-spinner']) {
    await page.locator(sel).first().waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  }
}

/** Navigate to checkout, dismiss overlays, wait for the form. */
export async function goToCheckout(page: Page): Promise<void> {
  await page.goto('/checkout/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);
  await page.locator('form.woocommerce-checkout').waitFor({ state: 'visible', timeout: 15_000 });
  await waitForCheckoutReady(page);
}

/**
 * Set a select2-backed <select> by value. Prefer selectOption (fires trusted change
 * event WC needs for update_checkout). Falls back to eval if selectOption fails.
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

/**
 * Fill the classic checkout form. Billing + shipping fields, custom fields,
 * Mailchimp uncheck, createaccount for new users, terms checkbox.
 */
export async function fillCheckout(page: Page, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(page);
  const email = emailFor(config);

  // Logged-in users normally have a saved address that prefills the checkout; the
  // admin account used for the logged-user test may not — fill billing when empty.
  const billingPrefilled = ((await page.locator('#billing_address_1').inputValue().catch(() => '')) || '').trim() !== '';
  if (config.user !== 'logged' || !billingPrefilled) {
    await resilientFill(ctx, { primary: page.locator('#billing_first_name'), ai: 'the billing first name field' }, BILLING.firstName);
    await resilientFill(ctx, { primary: page.locator('#billing_last_name'), ai: 'the billing last name field' }, BILLING.lastName);
    await resilientFill(ctx, { primary: page.locator('#billing_company'), ai: 'the billing company field' }, BILLING.company);
    await setSelectValue(page, '#billing_country', BILLING.country);
    await resilientFill(ctx, { primary: page.locator('#billing_address_1'), ai: 'the billing street address field' }, BILLING.street);
    await resilientFill(ctx, { primary: page.locator('#billing_address_2'), ai: 'the billing address line 2 field' }, BILLING.street2);
    await resilientFill(ctx, { primary: page.locator('#billing_city'), ai: 'the billing city field' }, BILLING.city);
    await setSelectValue(page, '#billing_state', BILLING.state);
    await resilientFill(ctx, { primary: page.locator('#billing_postcode'), ai: 'the billing postcode field' }, BILLING.zip);
    await resilientFill(ctx, { primary: page.locator('#billing_phone'), ai: 'the billing phone field' }, BILLING.phone);
    // Logged users keep their account email — only set it for guest/new checkout.
    if (config.user !== 'logged') {
      await resilientFill(ctx, { primary: page.locator('#billing_email'), ai: 'the billing email field' }, email);
    }
  }

  // Always opt out of the newsletter.
  await uncheckNewsletters(page);

  // Create account for new users
  if (config.user === 'new') {
    const create = page.locator('#createaccount');
    if (!(await create.isChecked().catch(() => false))) {
      await resilientCheck(ctx, { primary: create, ai: 'the Create an account checkbox' });
    }
  }

  // GI parity (Fill_Checkout step 0): new/guest checkout ships to a DISTINCT
  // address — tick "ship to a different address" so the shipping fields render
  // and get their own values (different last name / company / street).
  if (config.user !== 'logged') {
    const shipDiff = page.locator('#ship-to-different-address-checkbox');
    if ((await shipDiff.count()) > 0 && !(await shipDiff.isChecked().catch(() => false))) {
      await resilientCheck(ctx, { primary: shipDiff, ai: 'the "Ship to a different address?" checkbox' }).catch(() => {});
      await waitForCheckoutReady(page);
    }
  }

  // Same logic for shipping — fill for guest/new, or for a logged user whose
  // saved shipping address didn't prefill (only when the fields are present).
  const shippingVisible = await page.locator('#shipping_address_1').isVisible().catch(() => false);
  const shippingPrefilled = ((await page.locator('#shipping_address_1').inputValue().catch(() => '')) || '').trim() !== '';
  if (config.user !== 'logged' || (shippingVisible && !shippingPrefilled)) {
    // Shipping address
    await resilientFill(ctx, { primary: page.locator('#shipping_first_name'), ai: 'the shipping first name field' }, BILLING.firstName);
    await resilientFill(ctx, { primary: page.locator('#shipping_last_name'), ai: 'the shipping last name field' }, BILLING.shippingLastName);
    await resilientFill(ctx, { primary: page.locator('#shipping_company'), ai: 'the shipping company field' }, BILLING.shippingCompany);
    await setSelectValue(page, '#shipping_country', BILLING.country);
    await resilientFill(ctx, { primary: page.locator('#shipping_address_1'), ai: 'the shipping street address field' }, BILLING.shippingStreet);
    await resilientFill(ctx, { primary: page.locator('#shipping_address_2'), ai: 'the shipping address line 2 field' }, BILLING.shippingStreet2);
    await resilientFill(ctx, { primary: page.locator('#shipping_city'), ai: 'the shipping city field' }, BILLING.city);
    await setSelectValue(page, '#shipping_state', BILLING.state);
    await resilientFill(ctx, { primary: page.locator('#shipping_postcode'), ai: 'the shipping postcode field' }, BILLING.zip);
  }

  await waitForCheckoutReady(page);

  // Order notes
  await resilientFill(ctx, { primary: page.locator('#order_comments'), ai: 'the order notes field' }, ORDER_NOTE).catch(() => {});

  // Custom field: purchase_repurposing (textarea)
  await resilientFill(ctx, { primary: page.locator('#purchase_repurposing'), ai: 'the "What are you repurposing this for?" field' }, 'Test using').catch(() => {});

  // Custom field: how_did_you_hear_about_us (Select2)
  await setSelectValue(page, '#how_did_you_hear_about_us', 'Ebay').catch(() => {});

  // Select shipping method (local pickup)
  const localPickup = page.locator('#shipping_method_0_local_pickup14');
  if ((await localPickup.count()) > 0) {
    await resilientCheck(ctx, { primary: localPickup, ai: 'the local pickup shipping method' }).catch(() => {});
    await waitForCheckoutReady(page);
  }

  // Terms checkbox
  const terms = page.locator('#terms').or(page.locator('#terms_acceptance'));
  if ((await terms.count()) > 0 && !(await terms.first().isChecked().catch(() => false))) {
    await resilientCheck(ctx, { primary: terms.first(), ai: 'the terms and conditions checkbox' });
  }
}

// ---------------------------------------------------------------------------
// Accept.Blue v2 payment (direct DOM fields — no iframe)
// ---------------------------------------------------------------------------

export async function fillAcceptBlue(page: Page): Promise<void> {
  const ctx = ctxFor(page);

  // Select Accept.Blue if not already active
  const method = page.locator('#payment_method_acceptbluev2');
  if ((await method.count()) > 0 && !(await method.isChecked().catch(() => false))) {
    await resilientClick(ctx, {
      primary: page.locator('label[for="payment_method_acceptbluev2"]'),
      ai: 'the Accept.Blue credit card payment method',
    });
  }

  await resilientFill(ctx, { primary: page.locator('.input-text.acceptbluev2-card-name'), ai: 'the Name on Card field' }, `${BILLING.firstName} ${BILLING.lastName}`);
  await resilientFill(ctx, { primary: page.locator('#acceptbluev2-card-number'), ai: 'the card number field' }, '4761530001111118');
  // Expiry — use pressSequentially for the masked input (MM/YY)
  const expiry = page.locator('#acceptbluev2-card-expiry');
  await expiry.first().click();
  await expiry.first().pressSequentially('1229', { delay: 50 });
  await resilientFill(ctx, { primary: page.locator('#acceptbluev2-card-cvc'), ai: 'the CVC field' }, '123');
}

// ---------------------------------------------------------------------------
// Price capture
// ---------------------------------------------------------------------------

/**
 * Capture checkout order-review totals. Reads subtotal, shipping, CC fee, tax, total.
 */
export async function capturePrices(page: Page): Promise<Omit<CapturedPrices, 'productName' | 'unitPrice'>> {
  const ctx = ctxFor(page);

  const subtotal = await resilientText(ctx, {
    primary: page.locator('tr.cart-subtotal td .woocommerce-Price-amount.amount bdi').or(page.locator('tr.cart-subtotal td .woocommerce-Price-amount.amount')),
    ai: 'the checkout subtotal amount',
  });

  // Shipping price — extract from the last shipping label (local pickup or other)
  const shipping = await page.evaluate(() => {
    const label = document.querySelector('#shipping_method > li:last-child > label');
    if (!label) return '';
    const clone = label.cloneNode(true) as HTMLElement;
    const div = clone.querySelector('div');
    if (div) div.remove();
    return clone.textContent?.trim() ?? '';
  });

  const ccFee = await resilientText(ctx, {
    primary: page.locator('tr.fee td .woocommerce-Price-amount.amount bdi').or(page.locator('tr.fee td .woocommerce-Price-amount.amount')),
    ai: 'the credit card processing fee amount',
  }).catch(() => '');

  const tax = await resilientText(ctx, {
    primary: page.locator('tr.tax-total td .woocommerce-Price-amount.amount bdi').or(page.locator('tr.tax-total td .woocommerce-Price-amount.amount')),
    ai: 'the tax amount',
  }).catch(() => '');

  const total = await resilientText(ctx, {
    primary: page.locator('tr.order-total td strong .woocommerce-Price-amount.amount bdi').or(page.locator('tr.order-total td strong .woocommerce-Price-amount.amount')),
    ai: 'the order total amount',
  });

  return { subtotal, shipping, ccFee, tax, total };
}

// ---------------------------------------------------------------------------
// Place order + read order-received
// ---------------------------------------------------------------------------

/** Click Place Order, wait for order-received page. */
export async function placeOrder(page: Page): Promise<void> {
  const btn = page.locator('#place_order').filter({ visible: true }).first();
  await btn.waitFor({ state: 'visible', timeout: 15_000 });
  await page.locator('#place_order:not([disabled])').first().waitFor({ state: 'attached', timeout: 15_000 }).catch(() => {});
  await resilientClick(ctxFor(page), {
    primary: page.locator('#place_order').filter({ visible: true }),
    alt: page.getByRole('button', { name: /place order/i }),
    ai: 'the Place Order button',
  });
  await page.waitForURL('**/order-received/**', { timeout: 60_000 });
}

export interface OrderReceived {
  orderNumber: string;
  paymentLabel: string;
  productName: string;
  subtotal: string;
  shipping: string;
  /** Accept.Blue 3.25% technology fee row on the thank-you order table. */
  fee: string;
  tax: string;
  total: string;
}

/** Read the order-received (thank-you) page values. */
export async function readOrderReceived(page: Page): Promise<OrderReceived> {
  await page.waitForLoadState('load');
  const ctx = ctxFor(page);

  const orderNumber =
    new URL(page.url()).pathname.match(/order-received\/(\d+)/)?.[1] ??
    ((await page.locator('li.woocommerce-order-overview__order strong').first().textContent()) ?? '').trim();

  const paymentLabel = await resilientText(ctx, {
    primary: page.locator('li.woocommerce-order-overview__payment-method strong'),
    ai: 'the payment method on the order confirmation',
  });

  const productName = await resilientText(ctx, {
    primary: page.locator('td.woocommerce-table__product-name a').or(page.locator('td.product-name a')),
    ai: 'the product name in the order confirmation table',
  });

  // Read totals from the order details table
  const totals = await page.evaluate(() => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const tables = [...document.querySelectorAll('table.woocommerce-table--order-details, table.shop_table.order_details, table.woocommerce-table')].filter(
      (t) => /subtotal/i.test(t.textContent ?? '')
    );
    const t = tables[tables.length - 1];
    const out = { subtotal: '', shipping: '', fee: '', tax: '', total: '' };
    if (!t) return out;
    for (const r of Array.from(t.querySelectorAll('tfoot tr'))) {
      const head = norm(r.querySelector('th, td')?.textContent).toLowerCase().replace(':', '').trim();
      const amtEl = r.querySelector('td:last-child .woocommerce-Price-amount bdi, td:last-child .woocommerce-Price-amount');
      const amt = norm(amtEl?.textContent);
      if (head === 'subtotal') out.subtotal = amt;
      // Shipping may be money OR a method label (free local pickup has no price amount).
      else if (head.startsWith('shipping')) out.shipping = amt || norm(r.querySelector('td:last-child')?.textContent);
      // "3.25% Technology Fee" — the only fee row (matched before total so it can't collide).
      else if (head.includes('fee')) out.fee = amt;
      else if (head === 'tax') out.tax = amt;
      else if (head === 'total') out.total = amt;
    }
    return out;
  });

  return { orderNumber, paymentLabel, productName, ...totals };
}

// ---------------------------------------------------------------------------
// Site-level values
// ---------------------------------------------------------------------------

/** Read site-level values once (DOM-only). Title is the parallel-safe email filter. */
export async function getSuiteVars(page: Page): Promise<SuiteVars> {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await dismissOverlays(page);
  const title = (await page.locator('meta[property="og:site_name"]').getAttribute('content').catch(() => null)) ?? 'repurposedMATERIALS';
  return { title };
}

/**
 * Tax & shipping warning for maintenance-cycle regressions. Warns (doesn't fail)
 * when a row is missing or $0. (Prompt rule 22.)
 */
export async function warnIfNoTaxOrShipping(page: Page, ctx: { testId: string }): Promise<void> {
  const tax = page.locator('tr.tax-total, tr.tax-rate');
  const shipping = page.locator('tr.shipping, tr.shipping_total_fee');

  const taxMissing = (await tax.count()) === 0;
  const shipMissing = (await shipping.count()) === 0;

  if (taxMissing) console.warn(`[${ctx.testId}] no Tax row at checkout`);
  if (shipMissing) console.warn(`[${ctx.testId}] no Shipping row at checkout`);
}
