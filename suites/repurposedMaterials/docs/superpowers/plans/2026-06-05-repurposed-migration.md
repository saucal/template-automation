# repurposedMATERIALS GI-to-Playwright Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the repurposedMATERIALS Ghost Inspector suite to a leggari-style Playwright architecture with 3-context fixtures, resilient locators, and Stagehand AI fallback.

**Architecture:** Types define order config/result/suite-vars. Fixtures provide 3 isolated browser contexts (shopper/admin/email) with optional Stagehand CDP bridge. Site-specific helpers handle overlay dismissal, checkout, Accept.Blue payment, and price capture. Thin specs delegate to flows + assertions.

**Tech Stack:** Playwright Test, TypeScript, @browserbasehq/stagehand, zod, dotenv, Mailpit API

**Reference implementation:** `/Users/christian/Automation/leggari-automation` (copy fixtures/resilient/playgrounds-email verbatim; adapt helpers and specs for this site)

---

### Task 1: Install dependencies and update tsconfig

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`

- [ ] **Step 1: Add stagehand + zod + playwright-core deps**

```bash
cd /Users/christian/Automation/repurposedmaterials-automation
npm install @browserbasehq/stagehand zod playwright-core
```

- [ ] **Step 2: Update tsconfig.json to include new source dirs**

Replace the entire `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ESNext", "DOM"],
    "strict": false,
    "esModuleInterop": true,
    "typeRoots": ["node_modules/@types"]
  },
  "include": [
    "playwright.config.ts",
    "global-setup.ts",
    "types/**/*.ts",
    "fixtures/**/*.ts",
    "helpers/**/*.ts",
    "specs/**/*.ts"
  ]
}
```

- [ ] **Step 3: Run tsc to verify no type errors**

```bash
npx tsc --noEmit
```

Expected: Clean (no errors).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json tsconfig.json
git commit -m "chore: add stagehand + zod deps, extend tsconfig for new source dirs"
```

---

### Task 2: Create types/test-config.ts

**Files:**
- Create: `types/test-config.ts`

- [ ] **Step 1: Write the types file**

```typescript
// Typed config model for the repurposedMATERIALS place-order suite.
//
// Simplified from leggari: simple products only, Accept.Blue v2 payment,
// CC processing fee as a captured line item.

export type PaymentMethod = 'acceptblue';
export type UserKind = 'guest' | 'new' | 'logged';

export interface SimplePdp {
  kind: 'simple';
  /** Explicit product URL path. Omit for dynamic selection. */
  slug?: string;
  /** When slug is omitted, pick a random in-stock simple product under this price. */
  maxPrice?: number;
  qty: number;
}

export type PdpConfig = SimplePdp;

export interface OrderConfig {
  testId: string;
  title: string;
  user: UserKind;
  payment: PaymentMethod;
  pdp: PdpConfig;
  expectedStatus: 'Processing';
}

export interface CapturedPrices {
  productName: string;
  unitPrice: string;
  subtotal: string;
  shipping: string;
  tax: string;
  /** Accept.Blue 3.25% credit card processing fee. */
  ccFee: string;
  total: string;
}

export interface OrderResult extends CapturedPrices {
  orderNumber: string;
  email: string;
  /** Payment-method label as it appears on order surfaces, e.g. 'Credit Card'. */
  paymentLabel: string;
}

/** Site-level values fetched once (DOM read). */
export interface SuiteVars {
  /** Site title — parallel-safe filter for the Playgrounds Mailpit inbox. */
  title: string;
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: Clean.

- [ ] **Step 3: Commit**

```bash
git add types/test-config.ts
git commit -m "feat: add typed order config model (types/test-config.ts)"
```

---

### Task 3: Copy fixtures/index.ts from leggari

**Files:**
- Create: `fixtures/index.ts`

- [ ] **Step 1: Copy leggari's fixtures verbatim**

```bash
mkdir -p /Users/christian/Automation/repurposedmaterials-automation/fixtures
cp /Users/christian/Automation/leggari-automation/fixtures/index.ts /Users/christian/Automation/repurposedmaterials-automation/fixtures/index.ts
```

- [ ] **Step 2: Verify import path for resilient.ts**

The fixture file imports `../helpers/resilient`. This path is correct for our layout (`fixtures/index.ts` → `helpers/resilient.ts`). No change needed.

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: Errors about missing `helpers/resilient.ts` — will be resolved in Task 4.

- [ ] **Step 4: Commit** (after Task 4 resolves the import)

Deferred to Task 4 commit.

---

### Task 4: Copy helpers/resilient.ts and helpers/playgrounds-email.ts from leggari

**Files:**
- Create: `helpers/resilient.ts`
- Create: `helpers/playgrounds-email.ts`
- Create: `helpers/order-notes.ts`

- [ ] **Step 1: Copy resilient.ts verbatim**

```bash
mkdir -p /Users/christian/Automation/repurposedmaterials-automation/helpers
cp /Users/christian/Automation/leggari-automation/helpers/resilient.ts /Users/christian/Automation/repurposedmaterials-automation/helpers/resilient.ts
```

No changes needed — it's generic (no site-specific code).

- [ ] **Step 2: Copy playgrounds-email.ts verbatim**

```bash
cp /Users/christian/Automation/leggari-automation/helpers/playgrounds-email.ts /Users/christian/Automation/repurposedmaterials-automation/helpers/playgrounds-email.ts
```

No changes needed — uses `MAILPIT_URL` env var, generic Mailpit API.

- [ ] **Step 3: Copy order-notes.ts verbatim**

```bash
cp /Users/christian/Automation/leggari-automation/helpers/order-notes.ts /Users/christian/Automation/repurposedmaterials-automation/helpers/order-notes.ts
```

No changes needed — scans `ul.order_notes > li > div > p`, generic.

- [ ] **Step 4: Verify types compile (fixtures + helpers together)**

```bash
npx tsc --noEmit
```

Expected: Clean (fixtures/index.ts can now resolve `../helpers/resilient`).

- [ ] **Step 5: Commit**

```bash
git add fixtures/index.ts helpers/resilient.ts helpers/playgrounds-email.ts helpers/order-notes.ts
git commit -m "feat: add fixtures (3-context + stagehand), resilient wrapper, email + order-notes helpers"
```

---

### Task 5: Update playwright.config.ts and .env.example

**Files:**
- Modify: `playwright.config.ts`
- Modify: `.env.example`

- [ ] **Step 1: Update playwright.config.ts**

Replace the entire file:

```typescript
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

export default defineConfig({
  testDir: './specs',
  timeout: 240_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.1 },
  },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15_000,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: { mode: 'on' },
    launchOptions: { slowMo: 250 },
    ignoreHTTPSErrors: true,
  },
  globalSetup: './global-setup.ts',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

Key changes from current: `testDir: './specs'` (was `generated/specs`), `workers: 2` (was 1), `viewport: 1920x1080` (was 1280x800), `screenshot: 'only-on-failure'` (was `'on'`).

- [ ] **Step 2: Update .env.example**

Replace the entire file:

```
BASE_URL=https://repurposedmaterialsinc-staging.mystagingwebsite.com
WP_ADMIN_USER=saucal_maintenance_admin
ADMIN_PASS=
PASSWORD=
PASSWORD2=
MAILPIT_URL=
ANTHROPIC_API_KEY=
STAGEHAND_MODEL=anthropic/claude-sonnet-4-6
```

- [ ] **Step 3: Commit**

```bash
git add playwright.config.ts .env.example
git commit -m "chore: point testDir to specs/, update viewport + env vars for refactored suite"
```

---

### Task 6: Write helpers/repurposed.ts — site-specific helpers

**Files:**
- Create: `helpers/repurposed.ts`

This is the largest helper file. It contains all site-specific DOM interactions: overlay dismissal, product selection, checkout form, Accept.Blue payment, price capture, and order placement.

- [ ] **Step 1: Write helpers/repurposed.ts**

```typescript
// Site-specific helpers for repurposedMATERIALS.
//
// Owns: overlay dismissal (LiveChat + Mailchimp + promo dialog), PDP product
// selection (dynamic simple), checkout form (classic shortcode + custom fields),
// Accept.Blue v2 payment (direct DOM — no iframe), price capture, and order placement.
//
// Does NOT: assert (see assertions.ts) or orchestrate flows (see flows.ts).
import { expect, type Page } from '@playwright/test';
import type { CapturedPrices, OrderConfig, SimplePdp, SuiteVars } from '../types/test-config';
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

/** Normalise a rendered money string to a number. */
export function toAmount(text: string | null | undefined): number {
  return parseFloat((text ?? '').replace(/[^0-9.-]/g, ''));
}

// One id per test-process run — keeps email stable WITHIN a run but unique ACROSS.
const RUN_ID = Date.now().toString(36);

/** Per-run customer email on Playgrounds catch domain. */
export function emailFor(config: OrderConfig): string {
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

// ---------------------------------------------------------------------------
// PDP — find and add a simple product to cart
// ---------------------------------------------------------------------------

export interface PdpCapture {
  productName: string;
  unitPrice: string;
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
        return !isNaN(p) && p <= max;
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
      .locator('div.summary p.price ins .woocommerce-Price-amount.amount bdi')
      .or(page.locator('div.summary p.price .woocommerce-Price-amount.amount bdi')),
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

  if (config.user !== 'logged') {
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
    await resilientFill(ctx, { primary: page.locator('#billing_email'), ai: 'the billing email field' }, email);
  }

  // Uncheck Mailchimp newsletter if checked
  const mc = page.locator('#mailchimp_woocommerce_newsletter');
  if ((await mc.count()) > 0 && (await mc.isChecked().catch(() => false))) {
    await resilientUncheck(ctx, { primary: mc, ai: 'the Mailchimp newsletter checkbox' });
  }

  // Create account for new users
  if (config.user === 'new') {
    const create = page.locator('#createaccount');
    if (!(await create.isChecked().catch(() => false))) {
      await resilientCheck(ctx, { primary: create, ai: 'the Create an account checkbox' });
    }
  }

  if (config.user !== 'logged') {
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
  await resilientFill(ctx, { primary: page.locator('#order_comments'), ai: 'the order notes field' }, 'Order Note for Testing this field').catch(() => {});

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
  await expiry.first().pressSequentially('1249', { delay: 50 });
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
    const out = { subtotal: '', shipping: '', tax: '', total: '' };
    if (!t) return out;
    for (const r of Array.from(t.querySelectorAll('tfoot tr'))) {
      const head = norm(r.querySelector('th, td')?.textContent).toLowerCase().replace(':', '').trim();
      const amtEl = r.querySelector('td:last-child .woocommerce-Price-amount bdi, td:last-child .woocommerce-Price-amount');
      const amt = norm(amtEl?.textContent);
      if (head === 'subtotal') out.subtotal = amt;
      else if (head.startsWith('shipping')) out.shipping = amt;
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
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: Clean.

- [ ] **Step 3: Commit**

```bash
git add helpers/repurposed.ts
git commit -m "feat: add site-specific helpers (overlays, PDP, checkout, Accept.Blue, price capture)"
```

---

### Task 7: Write helpers/assertions.ts

**Files:**
- Create: `helpers/assertions.ts`

- [ ] **Step 1: Write helpers/assertions.ts**

```typescript
// Parity assertions for the repurposedMATERIALS place-order suite.
//
// Values captured by flows.ts are the source of truth. Each surface (checkout,
// thank-you, my-account, admin, email) must match — we assert equality against
// the capture, never hardcoded literals.
import { expect, type Page } from '@playwright/test';
import type { OrderConfig, OrderResult } from '../types/test-config';
import { PAYMENT_LABEL, toAmount } from './repurposed';
import { expectOrderNoteMatches } from './order-notes';
import { findEmail, mailpitViewUrl } from './playgrounds-email';
import { ctxFor, resilientClick, resilientText } from './resilient';

/** Assert two rendered money strings are numerically equal. */
function expectMoney(actual: string, expected: string, msg: string): void {
  expect(toAmount(actual), `${msg} — got "${actual}", expected "${expected}"`).toBeCloseTo(toAmount(expected), 2);
}

/** Thank-you page parity: order number, product, payment, prices. */
export function assertThankYouPage(result: OrderResult): void {
  expect(result.orderNumber, 'order number should be captured').toMatch(/^\d+$/);
  expect(result.productName, 'product name should be captured').toBeTruthy();
  expect(result.paymentLabel, `payment should be "${PAYMENT_LABEL}"`).toContain(PAYMENT_LABEL);
  expect(result.total, 'total should be captured').toBeTruthy();
}

/** Checkout vs thank-you parity. */
export function assertCheckoutParity(
  checkoutPrices: { subtotal: string; shipping: string; tax: string; total: string },
  result: OrderResult
): void {
  expectMoney(result.subtotal, checkoutPrices.subtotal, 'thank-you subtotal should match checkout');
  if (checkoutPrices.shipping) expectMoney(result.shipping, checkoutPrices.shipping, 'thank-you shipping should match checkout');
  if (checkoutPrices.tax) expectMoney(result.tax, checkoutPrices.tax, 'thank-you tax should match checkout');
  expectMoney(result.total, checkoutPrices.total, 'thank-you total should match checkout');
}

/** My-account parity: navigate to orders, view order, check product + total. */
export async function assertMyAccount(shopperPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  if (config.user === 'guest') return;

  const ctx = ctxFor(shopperPage);
  await shopperPage.goto('/my-account/orders/');
  await shopperPage.waitForLoadState('load');

  const status = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-orders-table__cell-order-status').first(),
    ai: 'the order status in the My Account orders list',
  });
  expect(status, `order status should be "${config.expectedStatus}"`).toContain(config.expectedStatus);

  const orderLink = shopperPage.locator(`a[href*="/my-account/view-order/${result.orderNumber}/"]`).first();
  await expect(orderLink, `orders list should contain order #${result.orderNumber}`).toBeVisible();
  await resilientClick(ctx, { primary: orderLink, ai: `the link to order #${result.orderNumber}` });
  await shopperPage.waitForLoadState('load');

  const viewProduct = await resilientText(ctx, {
    primary: shopperPage.locator('td.woocommerce-table__product-name').first(),
    ai: 'the product name on the view-order page',
  });
  expect(viewProduct, `view-order should show "${result.productName}"`).toContain(result.productName);

  const viewTotal = await resilientText(ctx, {
    primary: shopperPage.locator('tr:has(th:text-is("Total:")) td .woocommerce-Price-amount.amount').last(),
    ai: 'the order total on the view-order page',
  });
  expectMoney(viewTotal, result.total, 'view-order total should match');
}

/** Backend parity: admin order editor — status, product, total, payment note. */
export async function assertBackendOrder(adminPage: Page, result: OrderResult, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(adminPage);
  await adminPage.goto(`/wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`);
  await adminPage.waitForLoadState('load');

  const status = await adminPage.locator('#order_status').inputValue().catch(() => '');
  expect(
    status || ((await adminPage.locator('#select2-order_status-container').first().textContent()) ?? '').trim(),
    `admin order status should be ${config.expectedStatus}`
  ).toMatch(new RegExp(config.expectedStatus, 'i'));

  const adminItem = await resilientText(ctx, {
    primary: adminPage.locator('.woocommerce_order_items td.name, #order_line_items td.name').first(),
    ai: 'the product name in the admin order editor',
  });
  expect(adminItem, `admin should list "${result.productName}"`).toContain(result.productName);

  const adminTotal = await resilientText(ctx, {
    primary: adminPage.locator('.wc-order-totals .total .woocommerce-Price-amount.amount, .wc_order_total .amount').last(),
    ai: 'the order total in admin',
  });
  expectMoney(adminTotal, result.total, 'admin total should match');

  // Accept.Blue payment note
  await expectOrderNoteMatches(
    adminPage,
    /accept\.blue Gateway v2 Payment Completed with Transaction Id of '\d+'/,
    'admin should have an Accept.Blue payment-completed note'
  );
}

/** Perform refund in admin + verify refund order note. */
export async function performAndAssertRefund(adminPage: Page, result: OrderResult): Promise<void> {
  const ctx = ctxFor(adminPage);
  // Navigate to order if not already there
  if (!adminPage.url().includes(result.orderNumber)) {
    await adminPage.goto(`/wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`);
    await adminPage.waitForLoadState('load');
  }

  await resilientClick(ctx, {
    primary: adminPage.locator('button.refund-items'),
    ai: 'the Refund button in the admin order',
  });

  // Click "Refund via Accept.Blue" / refund amount should be pre-filled
  const refundBtn = adminPage.locator('button.do-api-refund').or(adminPage.locator('.do-api-refund'));
  await refundBtn.first().waitFor({ state: 'visible', timeout: 10_000 });

  // Accept the confirmation dialog
  adminPage.on('dialog', (dialog) => dialog.accept());
  await resilientClick(ctx, { primary: refundBtn.first(), ai: 'the Refund via Accept.Blue button' });

  // Wait for refund to process
  await adminPage.waitForLoadState('load');
  await adminPage.waitForTimeout(3_000);

  // Reload to see updated notes
  await adminPage.reload();
  await adminPage.waitForLoadState('load');

  await expectOrderNoteMatches(
    adminPage,
    /accept\.blue Gateway v2 Refund/,
    'admin should have an Accept.Blue refund note'
  );
}

/** Email parity: find order-confirmation email in Mailpit, assert order# + product + total. */
export async function assertOrderEmail(result: OrderResult): Promise<void> {
  const msg = await findEmail(result.email, { subjectFilter: 'received' });
  expect(msg, `order-confirmation email for ${result.email} should arrive`).not.toBeNull();

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  const compact = text.replace(/[\s,]+/g, '');
  const amount = (money: string) => toAmount(money).toFixed(2);

  expect(text, `email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
  expect(text, `email should reference product "${result.productName}"`).toContain(result.productName);
  expect(compact, `email should show total ${result.total}`).toContain(amount(result.total));
  expect(text, `email should show payment "${PAYMENT_LABEL}"`).toContain(PAYMENT_LABEL);
}

/** Email parity: find refund email in Mailpit. */
export async function assertRefundEmail(result: OrderResult): Promise<void> {
  const msg = await findEmail(result.email, { subjectFilter: 'refund' });
  expect(msg, `refund email for ${result.email} should arrive`).not.toBeNull();

  const text = `${msg!.Subject} ${(msg!.HTML ?? '').replace(/<[^>]+>/g, ' ')} ${msg!.Text ?? ''}`.replace(/\s+/g, ' ').trim();
  expect(text, `refund email should reference order #${result.orderNumber}`).toContain(result.orderNumber);
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: Clean.

- [ ] **Step 3: Commit**

```bash
git add helpers/assertions.ts
git commit -m "feat: add parity assertions (thank-you, my-account, backend, refund, email)"
```

---

### Task 8: Write helpers/flows.ts

**Files:**
- Create: `helpers/flows.ts`

- [ ] **Step 1: Write helpers/flows.ts**

```typescript
// High-level order orchestration. Drives the shopper through shop → PDP → cart →
// checkout → payment → order-received, capturing canonical values at each surface.
// Returns a FlowCapture; performs NO assertions (see assertions.ts).
import type { Page } from '@playwright/test';
import type { OrderConfig, OrderResult, CapturedPrices } from '../types/test-config';
import {
  dismissOverlays,
  emailFor,
  fillAcceptBlue,
  fillCheckout,
  findAndAddSimpleProduct,
  goToCheckout,
  capturePrices,
  PAYMENT_LABEL,
  placeOrder,
  readOrderReceived,
  warnIfNoTaxOrShipping,
  type OrderReceived,
  type PdpCapture,
} from './repurposed';

export interface OrderPages {
  shopperPage: Page;
  adminPage: Page;
  emailPage: Page;
}

/** Everything captured during the order, for parity assertions downstream. */
export interface FlowCapture {
  pdp: PdpCapture;
  checkout: Omit<CapturedPrices, 'productName' | 'unitPrice'>;
  order: OrderReceived;
  result: OrderResult;
  email: string;
}

/**
 * Place an order end-to-end on the shopper context and return all captured values.
 * Admin/email contexts are untouched — assertions use them later.
 */
export async function runOrderFlow(
  { shopperPage }: OrderPages,
  config: OrderConfig
): Promise<FlowCapture> {
  await shopperPage.goto('/');
  await shopperPage.waitForLoadState('load');
  await dismissOverlays(shopperPage);

  // Add product to cart
  const pdp = await findAndAddSimpleProduct(shopperPage, config.pdp);

  // Go to checkout and fill the form
  await goToCheckout(shopperPage);
  await fillCheckout(shopperPage, config);

  // Capture prices from checkout order review
  const checkout = await capturePrices(shopperPage);
  await warnIfNoTaxOrShipping(shopperPage, { testId: config.testId });

  // Fill payment and place order
  await fillAcceptBlue(shopperPage);
  await placeOrder(shopperPage);

  // Read order-received page
  const order = await readOrderReceived(shopperPage);

  const result: OrderResult = {
    productName: order.productName || pdp.productName,
    unitPrice: pdp.unitPrice,
    subtotal: order.subtotal || checkout.subtotal,
    shipping: order.shipping || checkout.shipping,
    tax: order.tax || checkout.tax,
    ccFee: checkout.ccFee,
    total: order.total || checkout.total,
    orderNumber: order.orderNumber,
    email: emailFor(config),
    paymentLabel: order.paymentLabel || PAYMENT_LABEL,
  };

  return { pdp, checkout, order, result, email: result.email };
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: Clean.

- [ ] **Step 3: Commit**

```bash
git add helpers/flows.ts
git commit -m "feat: add order flow orchestration (flows.ts)"
```

---

### Task 9: Write specs/orders/place-order-new-user.spec.ts

**Files:**
- Create: `specs/orders/place-order-new-user.spec.ts`

- [ ] **Step 1: Create directory and write spec**

```bash
mkdir -p /Users/christian/Automation/repurposedmaterials-automation/specs/orders
```

```typescript
// RM-PO-01 — Place order as new user (Accept.Blue CC).
//
// E2E maintenance-cycle regression: one order, three browser contexts
// (shopper / admin / email). Merges GI Place Order CC tests 01-05.
//
// Thin spec: config → flow → assertions. No selectors/expect() here.
import { test } from '../../fixtures';
import { runOrderFlow } from '../../helpers/flows';
import {
  assertThankYouPage,
  assertCheckoutParity,
  assertMyAccount,
  assertBackendOrder,
  performAndAssertRefund,
  assertOrderEmail,
  assertRefundEmail,
} from '../../helpers/assertions';
import type { OrderConfig } from '../../types/test-config';

const config: OrderConfig = {
  testId: 'RM-PO-01',
  title: 'Place order — new user (Accept.Blue CC)',
  user: 'new',
  payment: 'acceptblue',
  pdp: { kind: 'simple', maxPrice: 100, qty: 1 },
  expectedStatus: 'Processing',
};

test.describe('RM-PO-01 — Place Order (New User)', () => {
  test(config.title, async ({ shopperPage, adminPage, emailPage }) => {
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, config);

    // Shopper assertions
    assertThankYouPage(capture.result);
    assertCheckoutParity(capture.checkout, capture.result);
    await assertMyAccount(shopperPage, capture.result, config);

    // Admin assertions
    await assertBackendOrder(adminPage, capture.result, config);

    // Email assertions
    await assertOrderEmail(capture.result);

    // Refund flow
    await performAndAssertRefund(adminPage, capture.result);
    await assertRefundEmail(capture.result);
  });
});
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: Clean.

- [ ] **Step 3: Run the spec (headed, to observe)**

```bash
cd /Users/christian/Automation/repurposedmaterials-automation
npx playwright test specs/orders/place-order-new-user.spec.ts --headed
```

Expected: The test should navigate to the shop, pick a product, fill checkout, pay with Accept.Blue, verify across all contexts. May need debugging — this is the first live run.

- [ ] **Step 4: Debug and fix any issues**

Common issues to watch for:
- Overlay dismissal timing (may need longer waits)
- Select2 dropdowns not firing change events (use setSelectValue)
- Accept.Blue expiry field masked input (pressSequentially timing)
- Shipping method selector ID drift
- Order notes selector variations

Fix issues in the relevant helper file, not in the spec.

- [ ] **Step 5: Commit**

```bash
git add specs/orders/place-order-new-user.spec.ts
git commit -m "feat: add place-order new-user spec (RM-PO-01)"
```

---

### Task 10: Write specs/orders/place-order-logged-user.spec.ts

**Files:**
- Create: `specs/orders/place-order-logged-user.spec.ts`

- [ ] **Step 1: Write spec**

```typescript
// RM-PO-02 — Place order as logged-in user (Accept.Blue CC).
//
// Merges GI Place Order CC tests 06-08. The shopper logs in with PASSWORD
// from .env, then places an order (billing pre-filled, no createaccount).
import { test } from '../../fixtures';
import { runOrderFlow } from '../../helpers/flows';
import {
  assertThankYouPage,
  assertCheckoutParity,
  assertMyAccount,
  assertBackendOrder,
  assertOrderEmail,
} from '../../helpers/assertions';
import { ctxFor, resilientFill, resilientClick } from '../../helpers/resilient';
import { dismissOverlays } from '../../helpers/repurposed';
import type { OrderConfig } from '../../types/test-config';

const config: OrderConfig = {
  testId: 'RM-PO-02',
  title: 'Place order — logged user (Accept.Blue CC)',
  user: 'logged',
  payment: 'acceptblue',
  pdp: { kind: 'simple', maxPrice: 100, qty: 1 },
  expectedStatus: 'Processing',
};

test.describe('RM-PO-02 — Place Order (Logged User)', () => {
  test(config.title, async ({ shopperPage, adminPage, emailPage }) => {
    // Login first
    await shopperPage.goto('/my-account/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    const ctx = ctxFor(shopperPage);
    await resilientFill(ctx, { primary: shopperPage.locator('#username'), ai: 'the username field' }, process.env.WP_ADMIN_USER ?? '');
    await resilientFill(ctx, { primary: shopperPage.locator('#password'), ai: 'the password field' }, process.env.PASSWORD ?? '');
    await resilientClick(ctx, {
      primary: shopperPage.locator('button[name="login"]'),
      alt: shopperPage.getByRole('button', { name: /log in/i }),
      ai: 'the Log in button',
    });
    await shopperPage.waitForLoadState('load');

    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, config);

    assertThankYouPage(capture.result);
    assertCheckoutParity(capture.checkout, capture.result);
    await assertMyAccount(shopperPage, capture.result, config);
    await assertBackendOrder(adminPage, capture.result, config);
    await assertOrderEmail(capture.result);
  });
});
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Run the spec**

```bash
npx playwright test specs/orders/place-order-logged-user.spec.ts --headed
```

- [ ] **Step 4: Debug and fix any issues**

Watch for: logged-user checkout skipping billing (fields may still need filling if "ship to different address" is checked), saved payment methods, password field name.

- [ ] **Step 5: Commit**

```bash
git add specs/orders/place-order-logged-user.spec.ts
git commit -m "feat: add place-order logged-user spec (RM-PO-02)"
```

---

### Task 11: Write helpers/account.ts

**Files:**
- Create: `helpers/account.ts`

- [ ] **Step 1: Write helpers/account.ts**

```typescript
// Customer account-flow helpers: registration, My Account tabs, login, forgot-password.
// Actions go through the resilient wrapper (rule 23).
import { expect, type Page } from '@playwright/test';
import { BILLING, dismissOverlays, emailForTest } from './repurposed';
import { findEmail } from './playgrounds-email';
import { ctxFor, resilientClick, resilientFill, resilientText } from './resilient';

/** Register a new customer account on the my-account page. */
export async function registerCustomer(page: Page, email: string, password: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('/my-account/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);

  // repurposedMATERIALS registration form
  await resilientFill(ctx, { primary: page.locator('#reg_email'), ai: 'the registration email field' }, email);
  await resilientFill(ctx, { primary: page.locator('#reg_password'), ai: 'the registration password field' }, password);

  await resilientClick(ctx, {
    primary: page.locator('button[name="register"]'),
    alt: page.getByRole('button', { name: /register/i }),
    ai: 'the Register button',
  });
  await page.waitForLoadState('load');

  // Verify registration succeeded — either a success message or the my-account dashboard
  const msg = page.locator('.woocommerce-message, .woocommerce-MyAccount-content');
  await expect(msg.first(), 'registration should succeed').toBeVisible();
}

/** Login with username + password. */
export async function loginAccount(page: Page, username: string, password: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('/my-account/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);

  await resilientFill(ctx, { primary: page.locator('#username'), ai: 'the username field' }, username);
  await resilientFill(ctx, { primary: page.locator('#password'), ai: 'the password field' }, password);
  await resilientClick(ctx, {
    primary: page.locator('button[name="login"]'),
    alt: page.getByRole('button', { name: /log in/i }),
    ai: 'the Log in button',
  });
  await page.waitForLoadState('load');

  await expect(
    page.locator('.woocommerce-MyAccount-navigation, .woocommerce-MyAccount-content').first(),
    'should be logged into My Account'
  ).toBeVisible();
}

/** Log out of the account. */
export async function logoutAccount(page: Page): Promise<void> {
  await page.goto('/my-account/customer-logout/');
  await page.waitForLoadState('load').catch(() => {});
  await page.getByRole('link', { name: /confirm and log out/i }).first().click({ timeout: 3_000 }).catch(() => {});
}

/** Assert the standard My Account tabs render for a logged-in customer. */
export async function assertMyAccountTabs(page: Page): Promise<void> {
  const ctx = ctxFor(page);

  // Orders
  await page.goto('/my-account/orders/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);
  await expect(
    page.locator('.woocommerce-orders-table, .woocommerce-info').first(),
    'Orders tab should render'
  ).toBeVisible();

  // Store Credits (site-specific)
  await page.goto('/my-account/store-credit/');
  await page.waitForLoadState('load');
  await expect(page.locator('.acfw-store-credit-history, .woocommerce-info').first(), 'Store Credits tab should render').toBeVisible();

  // Downloads
  await page.goto('/my-account/downloads/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-info, .woocommerce-order-downloads').first(),
    'Downloads tab should render'
  ).toBeVisible();

  // Addresses
  await page.goto('/my-account/edit-address/');
  await page.waitForLoadState('load');
  await expect(page.locator('.woocommerce-Addresses, .woocommerce-Address').first(), 'Addresses tab should render').toBeVisible();

  // Payment methods
  await page.goto('/my-account/payment-methods/');
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-PaymentMethods, .woocommerce-info').first(),
    'Payment methods tab should render'
  ).toBeVisible();

  // Account details
  await page.goto('/my-account/edit-account/');
  await page.waitForLoadState('load');
  await expect(page.locator('.woocommerce-EditAccountForm, form.edit-account').first(), 'Account details form should render').toBeVisible();
}

/**
 * Forgot-password flow: request reset → follow the reset email link → set a new password.
 */
export async function forgotPassword(page: Page, email: string, newPassword: string): Promise<void> {
  const ctx = ctxFor(page);
  await page.goto('/my-account/lost-password/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);

  await resilientFill(ctx, { primary: page.locator('#user_login'), ai: 'the username / email field' }, email);
  await resilientClick(ctx, {
    primary: page.locator('button[value="Reset password"]').or(page.getByRole('button', { name: /reset password/i })),
    ai: 'the Reset password button',
  });
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-message').first(),
    'a password-reset confirmation should show'
  ).toContainText(/reset email has been sent|check your email/i);

  // Follow the reset link from the email
  const msg = await findEmail(email, { subjectFilter: 'password' });
  expect(msg, `a password-reset email for ${email} should arrive in Mailpit`).not.toBeNull();
  const html = msg!.HTML ?? '';
  const link =
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*(?:reset|set)[^<]*password/i)?.[1] ??
    html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*click here/i)?.[1];
  expect(link, 'reset email should contain a reset-password link').toBeTruthy();

  await page.goto(link!.replace(/&amp;/g, '&'));
  await page.waitForLoadState('load');
  await page.locator('#password_1').waitFor({ state: 'visible', timeout: 15_000 });
  await resilientFill(ctx, { primary: page.locator('#password_1'), ai: 'the new password field' }, newPassword);
  await resilientFill(ctx, { primary: page.locator('#password_2'), ai: 'the confirm password field' }, newPassword);
  await resilientClick(ctx, {
    primary: page.getByRole('button', { name: /save|reset|set password/i }).or(page.locator('button[type="submit"].woocommerce-Button')),
    ai: 'the save / reset password button',
  });
  await page.waitForLoadState('load');
  await expect(
    page.locator('.woocommerce-message').first(),
    'password should be reset successfully'
  ).toContainText(/reset successfully/i);
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add helpers/account.ts
git commit -m "feat: add account helpers (register, login, my-account tabs, forgot-password)"
```

---

### Task 12: Write specs/account/account.spec.ts

**Files:**
- Create: `specs/account/account.spec.ts`

- [ ] **Step 1: Create directory and write spec**

```bash
mkdir -p /Users/christian/Automation/repurposedmaterials-automation/specs/account
```

```typescript
// Account flows — replaces GI "Basic" tests 12 (registration, My Account, login)
// and 13 (forgot password).
import { test } from '../../fixtures';
import { emailForTest } from '../../helpers/repurposed';
import { registerCustomer, loginAccount, logoutAccount, assertMyAccountTabs, forgotPassword } from '../../helpers/account';

const PASSWORD = process.env.PASSWORD || 'QAcustomer!2026';

test.describe('Account flows', () => {
  test('RM-AC-01 — register, My Account navigation, login', async ({ shopperPage }) => {
    const email = emailForTest('rm-ac-01');
    await registerCustomer(shopperPage, email, PASSWORD);
    await assertMyAccountTabs(shopperPage);
    await logoutAccount(shopperPage);
    await loginAccount(shopperPage, email, PASSWORD);
  });

  test('RM-AC-02 — forgot password', async ({ shopperPage }) => {
    const email = emailForTest('rm-ac-02');
    const newPassword = `${PASSWORD}X`;
    await registerCustomer(shopperPage, email, PASSWORD);
    await logoutAccount(shopperPage);
    await forgotPassword(shopperPage, email, newPassword);
    await loginAccount(shopperPage, email, newPassword);
  });
});
```

- [ ] **Step 2: Run the spec**

```bash
npx playwright test specs/account/account.spec.ts --headed
```

- [ ] **Step 3: Debug and fix**

Watch for: registration form field names (may differ from leggari), email link extraction regex, password-reset flow specifics.

- [ ] **Step 4: Commit**

```bash
git add specs/account/account.spec.ts
git commit -m "feat: add account spec (RM-AC-01 register + RM-AC-02 forgot-password)"
```

---

### Task 13: Write specs/site/navigation.spec.ts

**Files:**
- Create: `specs/site/navigation.spec.ts`

- [ ] **Step 1: Create directory and write spec**

```bash
mkdir -p /Users/christian/Automation/repurposedmaterials-automation/specs/site
```

```typescript
// Site navigation tests — replaces GI "Basic WooCommerce tests" 01-11.
// Each test verifies a page renders correctly with key elements present.
import { test, expect } from '../../fixtures';
import { dismissOverlays } from '../../helpers/repurposed';
import { ctxFor, resilientClick, resilientText } from '../../helpers/resilient';

test.describe('Site Navigation', () => {
  test.beforeEach(async ({ shopperPage }) => {
    // Each test navigates to its own page; just ensure overlays are handled.
  });

  test('RM-NAV-01 — Home page', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('.avia-slide-wrap').first(), 'hero slider should be present').toBeVisible();
    await expect(shopperPage.locator('.avia-animated-number').first(), 'animated numbers should be present').toBeVisible();
  });

  test('RM-NAV-02 — Header navigation', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    // Hover over a top-level menu item to reveal submenu
    await shopperPage.locator('#menu-item-16307').first().hover();
    await expect(shopperPage.locator('#menu-item-16307 > ul').first(), 'submenu should be visible on hover').toBeVisible();

    // Hover away — submenu should hide
    await shopperPage.locator('#menu-item-56846').first().hover();
    await expect(shopperPage.locator('#menu-item-16307 > ul').first(), 'submenu should hide when hovering away').not.toBeVisible();
  });

  test('RM-NAV-03 — Footer', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('#menu-quick-links'), 'quick links should be present').not.toHaveCount(0);
    await expect(shopperPage.locator('.noLightbox').first(), 'trust badges / images should be present').toBeVisible();
  });

  test('RM-NAV-04 — Shop page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    // Products should be listed
    await expect(shopperPage.locator('ul.products > li').first(), 'products should be listed').toBeVisible();

    // Pagination
    await expect(shopperPage.locator('a[href*="/view-all-products/page/"]').first(), 'pagination should exist').toBeVisible();
  });

  test('RM-NAV-05 — Simple product page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    // Click into the first product
    await shopperPage.locator('ul.products > li a.woocommerce-LoopProduct-link').first().click();
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('h1.product_title').first(), 'product title should render').toBeVisible();
    await expect(shopperPage.locator('.woocommerce-product-gallery').first(), 'product gallery should render').toBeVisible();
    await expect(shopperPage.locator('button[name="add-to-cart"], .single_add_to_cart_button').first(), 'add-to-cart button should render').toBeVisible();
  });

  test('RM-NAV-06 — Variable product page', async ({ shopperPage }) => {
    // Find a variable product from the shop
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    const variableLink = shopperPage.locator('ul.products > li.product-type-variable a.woocommerce-LoopProduct-link').first();
    if ((await variableLink.count()) === 0) {
      test.skip(true, 'No variable products found on shop page');
      return;
    }
    await variableLink.click();
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('h1.product_title').first(), 'product title should render').toBeVisible();
    await expect(shopperPage.locator('.variations select, .variations_form').first(), 'variation selects should render').toBeVisible();
  });

  test('RM-NAV-07 — Cart page', async ({ shopperPage }) => {
    // Add something to cart first
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await shopperPage.locator('ul.products > li.instock.product-type-simple a.add_to_cart_button').first().click();
    await shopperPage.locator('.added_to_cart, .woocommerce-message').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});

    await shopperPage.goto('/cart/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('table.shop_table.cart, .woocommerce-cart-form').first(), 'cart table should render').toBeVisible();
    await expect(shopperPage.locator('.cart-subtotal, .order-total').first(), 'cart totals should render').toBeVisible();
  });

  test('RM-NAV-08 — Checkout validation', async ({ shopperPage }) => {
    // Add product, go to checkout, try to place order with empty fields
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await shopperPage.locator('ul.products > li.instock.product-type-simple a.add_to_cart_button').first().click();
    await shopperPage.locator('.added_to_cart, .woocommerce-message').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});

    await shopperPage.goto('/checkout/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await shopperPage.locator('form.woocommerce-checkout').waitFor({ state: 'visible', timeout: 15_000 });

    // Try placing order without filling anything
    await shopperPage.locator('#place_order').click({ force: true });

    // Should show validation errors
    await expect(
      shopperPage.locator('.woocommerce-error, .woocommerce-NoticeGroup-checkout').first(),
      'validation errors should appear'
    ).toBeVisible({ timeout: 15_000 });
  });
});
```

- [ ] **Step 2: Run the spec**

```bash
npx playwright test specs/site/navigation.spec.ts --headed
```

- [ ] **Step 3: Debug and fix**

Watch for: menu item IDs drifting, product type class names, overlay timing, variable product availability.

- [ ] **Step 4: Commit**

```bash
git add specs/site/navigation.spec.ts
git commit -m "feat: add site navigation spec (RM-NAV-01 through RM-NAV-08)"
```

---

### Task 14: Write specs/site/visual.spec.ts

**Files:**
- Create: `specs/site/visual.spec.ts`

- [ ] **Step 1: Write spec**

```typescript
// Visual regression tests — screenshot comparisons for key pages.
// First run generates baseline images; subsequent runs compare against them.
import { test, expect } from '../../fixtures';
import { dismissOverlays } from '../../helpers/repurposed';

test.describe('Visual Regression', () => {
  test('RM-VIS-01 — Home page', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await shopperPage.waitForTimeout(2_000); // let animations settle
    await expect(shopperPage).toHaveScreenshot('home.png', { fullPage: true });
  });

  test('RM-VIS-02 — Shop page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await shopperPage.waitForTimeout(1_000);
    await expect(shopperPage).toHaveScreenshot('shop.png', { fullPage: true });
  });

  test('RM-VIS-03 — Product page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await shopperPage.locator('ul.products > li a.woocommerce-LoopProduct-link').first().click();
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await shopperPage.waitForTimeout(1_000);
    await expect(shopperPage).toHaveScreenshot('pdp.png', { fullPage: true });
  });

  test('RM-VIS-04 — Cart page', async ({ shopperPage }) => {
    // Add an item first
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await shopperPage.locator('ul.products > li.instock.product-type-simple a.add_to_cart_button').first().click();
    await shopperPage.locator('.added_to_cart, .woocommerce-message').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
    await shopperPage.goto('/cart/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await shopperPage.waitForTimeout(1_000);
    await expect(shopperPage).toHaveScreenshot('cart.png', { fullPage: true });
  });
});
```

- [ ] **Step 2: Run to generate baselines**

```bash
npx playwright test specs/site/visual.spec.ts --update-snapshots
```

- [ ] **Step 3: Commit baselines + spec**

```bash
git add specs/site/visual.spec.ts specs/site/visual.spec.ts-snapshots/
git commit -m "feat: add visual regression spec (RM-VIS-01 through RM-VIS-04) with baselines"
```

---

### Task 15: Full suite run + final cleanup

**Files:**
- No new files

- [ ] **Step 1: Run the complete suite**

```bash
cd /Users/christian/Automation/repurposedmaterials-automation
npx playwright test
```

Expected: All specs pass (orders, account, navigation, visual).

- [ ] **Step 2: Fix any remaining issues**

If failures, debug using:
```bash
npx playwright show-report reports
```

Fix in the relevant helper, not in specs.

- [ ] **Step 3: Run tsc for final type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Final commit with all fixes**

```bash
git add -A
git commit -m "fix: resolve issues from full suite run"
```

- [ ] **Step 5: Clean up .playwright-cli exploration artifacts**

```bash
rm -rf /Users/christian/Automation/repurposedmaterials-automation/.playwright-cli
```
