# No Pong AU Reference Suite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the GI-migrated No Pong project into a clean, config-driven Playwright suite — scaffold + a fully green **AU** region suite (basic, orders, subscriptions, wholesale) mirroring the leggari architecture. CA/US replication is a separate follow-up plan.

**Architecture:** Region is the outermost dimension (one Playwright project per region). Three isolated browser contexts (shopper/admin/email) via a ported fixture; Stagehand AI as the last-resort locator tier (rule 23). Specs are thin (config → flow → assertions); all DOM lives in `helpers/nopong.ts`, all `expect()` in `helpers/assertions.ts`. DOM-first (no WC REST yet). Payment = Stripe (classic, iframe) or PayPal (sandbox redirect).

**Tech Stack:** `@playwright/test`, `@woocommerce/e2e-utils-playwright`, `@browserbasehq/stagehand` + `playwright-core` + `zod`, `dotenv`, `dayjs`, `@babel/runtime`. TypeScript.

**Working directory:** `/Users/christian/Automation/template-automation/suites/No Pong` (referred to below as `$ROOT`). Branch: `feat/nopong-playwright-refactor`.

**Reference (port/adapt, don't re-derive):** `/Users/christian/projects/leggari/tests` (referred to as `$REF`).

**Source of truth (read before each spec task):** raw GI JSON under `$ROOT/<suite>/<test>.json`; the generated derivative under `$ROOT/generated/{specs,helpers}`. The GI JSON wins on selectors/flow; live-explore with playwright-cli to confirm drift (prompt §"Before you start").

---

## Conventions for every task

- **Relative `goto` only** — never a leading `/` (rule 12). `'cart/'`, `'my-account/'`, `'wp-admin/'`, `'./'`.
- **No raw `expect()` in specs** except `toHaveScreenshot` (rule 6). Every `expect` carries a message (rule 19).
- **Route DOM actions/reads through `helpers/resilient.ts`** (rule 23); exceptions: navigation/waits, `setInputFiles`, custom JS.
- **TDD-for-E2E:** the "failing test" is the spec run against the live site; "passing" is green + `tsc --noEmit` clean. After each spec, run it (`--project=au`) and confirm before commit.
- **Commit after every task** with a `feat(nopong):` / `chore(nopong):` message.

---

## File structure (locked)

```
$ROOT/
  package.json  tsconfig.json  .env.example  .gitignore
  playwright.config.ts          # 3 region projects
  global-setup.ts               # per-host admin login → auth/admin.json
  types/test-config.ts          # all interfaces
  fixtures/index.ts             # PORT $REF/fixtures/index.ts verbatim
  helpers/
    resilient.ts                # PORT $REF/helpers/resilient.ts verbatim
    playgrounds-email.ts        # PORT $REF/helpers/playgrounds-email.ts (adapt site filter)
    order-notes.ts              # PORT $REF/helpers/order-notes.ts verbatim
    nopong.ts                   # NEW — site DOM, regionConfig, pay(), addToCart, popups, points
    account.ts                  # NEW — register + set-password + assertMyAccount*
    flows.ts                    # NEW — runOrderFlow / runSubscriptionFlow / runWholesaleFlow
    assertions.ts               # NEW — all expect(), classic/blocks + region branching
  specs/au/
    basic/{visual,account,limits}.spec.ts
    orders/place-order.spec.ts
    subscriptions/{subscription,manage}.spec.ts
    wholesale/wholesale.spec.ts
```

---

## Phase 1 — Scaffold

### Task 1: package.json + tsconfig + .gitignore + .env.example

**Files:**
- Modify: `$ROOT/package.json`
- Modify: `$ROOT/tsconfig.json`
- Create: `$ROOT/.gitignore`
- Modify: `$ROOT/.env.example`

- [ ] **Step 1: Rewrite `package.json`**

```json
{
  "name": "no-pong-playwright",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "playwright test",
    "test:au": "playwright test --project=au",
    "test:ca": "playwright test --project=ca",
    "test:us": "playwright test --project=us",
    "test:basic": "playwright test specs/*/basic",
    "test:orders": "playwright test specs/*/orders",
    "test:subscriptions": "playwright test specs/*/subscriptions",
    "test:wholesale": "playwright test specs/au/wholesale",
    "setup:browsers": "playwright install chromium",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@woocommerce/e2e-utils-playwright": "^0.4.0",
    "dayjs": "^1.11.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@babel/runtime": "^7.29.2",
    "@browserbasehq/stagehand": "^3.0.0",
    "@playwright/test": "^1.59.1",
    "@types/node": "^20.0.0",
    "playwright-core": "^1.59.1",
    "typescript": "^5.0.0",
    "zod": "^3.23.0"
  }
}
```
> `@babel/runtime` is required by e2e-utils (prompt rule 10). Pin exact stagehand/zod versions to whatever `$REF/package.json` uses — copy them to avoid drift.

- [ ] **Step 2: Align `tsconfig.json` with `$REF/tsconfig.json`**

Read `$REF/tsconfig.json` and copy its `compilerOptions` (module/target/moduleResolution/esModuleInterop/strict). Ensure `include` covers `specs`, `helpers`, `fixtures`, `types`, `global-setup.ts`, `playwright.config.ts`. Exclude `generated`, `node_modules`.

- [ ] **Step 3: Create `.gitignore`**

```
node_modules/
auth/
.env
reports/
test-results/
**/*-snapshots/   # keep? no — DO commit snapshots; remove this line after deciding
```
> Decision: visual baselines (`*-snapshots/`) are committed so maintenance diffs work. Do NOT gitignore them. Gitignore `auth/`, `.env`, `node_modules/`, `reports/`, `test-results/`.

- [ ] **Step 4: Extend `.env.example`**

```
# Region base URLs (trailing slash REQUIRED for subsite path resolution)
BASE_URL_AU=https://nopong.example/
BASE_URL_CA=https://nopong.example/ca/
BASE_URL_US=https://nopong.example/us/

# Admin login (global-setup, per host)
WP_ADMIN_USER=saucal_maintenance_admin
ADMIN_PASS=

# Stripe test card is hardcoded (4242…). PayPal sandbox:
PAY_PAL_USER=
PAY_PAL_PASS=

# Stagehand AI fallback (rule 23) — leave unset to run Playwright-only tiers
ANTHROPIC_API_KEY=
STAGEHAND_MODEL=anthropic/claude-sonnet-4-6

# Gate refund/destructive specs to ONE region (rule 12)
REFUND_PROJECT=au
```

- [ ] **Step 5: Install + verify**

Run: `cd "$ROOT" && npm install && npx tsc --noEmit`
Expected: install succeeds; `tsc` errors only about not-yet-created files (ok at this stage) or clean.

- [ ] **Step 6: Commit**

```bash
git add "suites/No Pong/package.json" "suites/No Pong/tsconfig.json" "suites/No Pong/.gitignore" "suites/No Pong/.env.example"
git commit -m "chore(nopong): scaffold deps, scripts, env, gitignore"
```

---

### Task 2: Port resilient.ts, fixtures, playgrounds-email, order-notes

**Files:**
- Create: `$ROOT/helpers/resilient.ts` (from `$REF/helpers/resilient.ts`)
- Create: `$ROOT/fixtures/index.ts` (from `$REF/fixtures/index.ts`)
- Create: `$ROOT/helpers/playgrounds-email.ts` (from `$REF/helpers/playgrounds-email.ts`)
- Create: `$ROOT/helpers/order-notes.ts` (from `$REF/helpers/order-notes.ts`)

- [ ] **Step 1: Copy `resilient.ts` verbatim**

`cp "$REF/helpers/resilient.ts" "$ROOT/helpers/resilient.ts"`. No changes needed (project-agnostic).

- [ ] **Step 2: Copy `fixtures/index.ts` verbatim**

`cp "$REF/fixtures/index.ts" "$ROOT/fixtures/index.ts"`. It reads `auth/admin.json`, bridges video/trace/screenshot from config, owns named failure screenshots (rule 25), Stagehand-over-CDP. No project-specific content.

- [ ] **Step 3: Copy `order-notes.ts` verbatim**

`cp "$REF/helpers/order-notes.ts" "$ROOT/helpers/order-notes.ts"`.

- [ ] **Step 4: Copy + adapt `playgrounds-email.ts`**

`cp "$REF/helpers/playgrounds-email.ts" "$ROOT/helpers/playgrounds-email.ts"`. Read it; the only adaptation is the **site-title filter** used for parallel-safe inbox filtering (rule 14) — confirm it takes the title as a param (no hardcoded "leggari"). If a constant is hardcoded, parameterize it (callers pass `suiteVars.title`).

- [ ] **Step 5: Verify imports resolve**

Run: `cd "$ROOT" && npx tsc --noEmit`
Expected: errors only about `helpers/{nopong,account,flows,assertions}` and `types/test-config` not existing yet. `resilient.ts`, `fixtures/index.ts`, `order-notes.ts`, `playgrounds-email.ts` themselves compile.

- [ ] **Step 6: Commit**

```bash
git add "suites/No Pong/helpers/resilient.ts" "suites/No Pong/fixtures/index.ts" "suites/No Pong/helpers/order-notes.ts" "suites/No Pong/helpers/playgrounds-email.ts"
git commit -m "feat(nopong): port resilient wrapper, 3-context fixture, email + order-notes helpers"
```

---

### Task 3: types/test-config.ts

**Files:**
- Create: `$ROOT/types/test-config.ts`

- [ ] **Step 1: Write the interfaces**

```typescript
// Typed config model — replaces the GI Record<string,string> vars bag (rule 9).
// Three roles per leggari (OrderConfig/Result/SuiteVars) + region & domain configs.
// DOM-first: SuiteVars is DOM-read, not REST.

export type Region = 'au' | 'ca' | 'us';
export type ProductKind = 'simple' | 'variable' | 'subscription' | 'wholesale';
export type PaymentMethod = 'stripe' | 'paypal';
export type UserKind = 'guest' | 'new' | 'logged' | 'wholesale';

/** Billing identity for one region. Keep both long + short forms (classic select2 vs blocks select). */
export interface BillingDetails {
  firstName: string; lastName: string; company?: string;
  street: string; city: string;
  state: string; shortState: string;
  zip: string;
  country: string; shortCountry: string;
  countryComplete: string; // select2 container text, e.g. "Australia"
  phone: string; email?: string;
}

export interface SimplePdp { kind: 'simple'; slug: string; qty: number; }
export interface VariablePdp { kind: 'variable'; slug: string; variation: string; qty: number; }
export interface SubscriptionPdp { kind: 'subscription'; slug: string; qty: number; }
export type PdpConfig = SimplePdp | VariablePdp | SubscriptionPdp;

export interface OrderConfig {
  testId: string;
  title: string;
  region: Region;
  product: ProductKind;
  user: UserKind;
  payment: PaymentMethod;
  pdp: PdpConfig;
  expectedStatus: 'Processing' | 'On hold' | 'Completed';
  /** Status after refund/void. Stripe refund → 'Refunded'. */
  refundedStatus?: 'Refunded' | 'Cancelled';
  /** Regex the gateway refund note must match (rule 27). */
  refundNotePattern?: RegExp;
  /** Email to reuse for a logged-in order (rule 28) — same account as a prior order. */
  accountEmail?: string;
}

/** Money/label values captured at PDP/cart — the parity source of truth. */
export interface CapturedPrices {
  productName: string;
  unitPrice: string;
  subtotal: string;
  shipping: string; // rendered ('$12.00' | 'Free')
  tax: string;
  total: string;
}

export interface OrderResult extends CapturedPrices {
  orderNumber: string;
  email: string;
  paymentLabel: string;       // 'Credit / Debit Card' | 'PayPal'
  pointsEarned?: number;      // Points/Rewards plugin
}

export interface SubscriptionConfig {
  testId: string;
  title: string;
  region: Region;
  payment: PaymentMethod;
  pdp: SubscriptionPdp;
  /** Expected post-action status for the manage spec. */
  expectedSubStatus?: 'Active' | 'Cancelled' | 'On hold' | 'Pending Cancellation';
}

export interface SubscriptionResult extends OrderResult {
  subscriptionNumber: string;
  nextPaymentDate: string;
}

export interface WholesaleConfig {
  testId: string;
  title: string;
  region: Region;
  /** Wholesale account login — set in .env or registered in-flow. */
  email: string;
  pdp: PdpConfig;
  payment: PaymentMethod;
}

/** Per-region constants. Lives in helpers/nopong.ts as `regionConfig`. */
export interface RegionConfig {
  currency: string;            // '$'
  currencyCode: string;        // 'AUD' | 'CAD' | 'USD'
  billing: BillingDetails;
  products: {
    simple: { slug: string };
    variable: { slug: string; variation: string };
    subscription: { slug: string };
    wholesale?: { slug: string };
  };
  expectTax: boolean;
  expectShipping: boolean;
}

/** Site-level values, DOM-read once in beforeAll. */
export interface SuiteVars {
  title: string;   // site title — parallel-safe email filter
  blog?: string;   // classic/blocks marker if needed (rule 21)
}
```

- [ ] **Step 2: Verify**

Run: `cd "$ROOT" && npx tsc --noEmit`
Expected: no errors from `types/test-config.ts` itself.

- [ ] **Step 3: Commit**

```bash
git add "suites/No Pong/types/test-config.ts"
git commit -m "feat(nopong): typed config model (Order/Subscription/Wholesale/Region/SuiteVars)"
```

---

### Task 4: playwright.config.ts (3 region projects)

**Files:**
- Modify: `$ROOT/playwright.config.ts`

- [ ] **Step 1: Rewrite config**

```typescript
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

const REFUND_PROJECT = process.env.REFUND_PROJECT ?? 'au';

// Refund/destructive specs run on ONE region only (rule 12).
const refundMatch = (region: string) =>
  REFUND_PROJECT === region ? ['**/orders/place-order.spec.ts'] : [];

export default defineConfig({
  testDir: './specs',
  timeout: 240_000,
  expect: { timeout: 15_000, toHaveScreenshot: { maxDiffPixelRatio: 0.15 } },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { outputFolder: 'reports', open: 'never' }], ['list']],
  use: {
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15_000,
    trace: 'retain-on-failure',
    screenshot: 'off',                 // fixture owns named failure shots (rule 25)
    video: { mode: 'retain-on-failure' },
    launchOptions: { slowMo: 250 },
    ignoreHTTPSErrors: true,
  },
  globalSetup: './global-setup.ts',
  projects: [
    { name: 'au', use: { ...devices['Desktop Chrome'], baseURL: process.env.BASE_URL_AU },
      testMatch: ['au/**'] },
    { name: 'ca', use: { ...devices['Desktop Chrome'], baseURL: process.env.BASE_URL_CA },
      testMatch: ['ca/**'] },
    { name: 'us', use: { ...devices['Desktop Chrome'], baseURL: process.env.BASE_URL_US },
      testMatch: ['us/**'] },
  ],
});
```
> Note: place-order lives under each region's `orders/`; `testMatch: ['au/**']` already scopes it to the region. The `REFUND_PROJECT` gate is enforced inside the spec via a `test.skip` guard (Task 9), since per-region `testMatch` can't easily subtract one file. Keep `refundMatch` helper unused-removed OR wire the skip-guard in the spec — pick the spec-guard (simpler). Delete `refundMatch` before commit.

- [ ] **Step 2: Verify**

Run: `cd "$ROOT" && npx tsc --noEmit`
Expected: config compiles (specs still missing — that's fine).

- [ ] **Step 3: Commit**

```bash
git add "suites/No Pong/playwright.config.ts"
git commit -m "feat(nopong): playwright.config with au/ca/us region projects"
```

---

### Task 5: global-setup.ts (per-host admin login)

**Files:**
- Modify: `$ROOT/global-setup.ts`

- [ ] **Step 1: Read the reference**

Read `$REF/global-setup.ts`. It logs into wp-admin once and saves `auth/admin.json`.

- [ ] **Step 2: Adapt for No Pong**

Multisite: the CA/US subsites share the parent host cookie, so one login on the parent host covers them; AU is a separate host. Log in on **AU host** and on the **CA/US parent host**, persisting a single `auth/admin.json` whose cookies cover all (Playwright `storageState` holds cookies for multiple domains). Implementation: open a context, log into `BASE_URL_AU` `wp-admin/`, then navigate to the CA/US parent `wp-login.php` and log in there too, then `context.storageState({ path: 'auth/admin.json' })`. Reuse the GI helper `adminLoginSkip2FA` flow if 2FA is present (the GI export references it — read `generated/helpers/no-pong-common-steps-for-project.ts` `adminLoginSkip2FA`). Credentials from `WP_ADMIN_USER` / `ADMIN_PASS` (rule 30 — confirm the exact env key the fixture/global-setup reads).

- [ ] **Step 3: Verify (needs real creds + .env)**

Run: `cd "$ROOT" && npx playwright test --project=au --list`
Expected: lists tests without error (globalSetup compiles). Full login verified when the first spec runs.

- [ ] **Step 4: Commit**

```bash
git add "suites/No Pong/global-setup.ts"
git commit -m "feat(nopong): multi-host admin global-setup (AU host + CA/US parent)"
```

---

### Task 6: helpers/nopong.ts skeleton (regionConfig + DOM primitives)

**Files:**
- Create: `$ROOT/helpers/nopong.ts`

Read first: `generated/helpers/no-pong-common-steps-for-project.ts` (`fillCC`, `fillCheckout`, `calculateShipping`, `checkEarningPointsCartCheckout`, `creditsVariables`, `emptyCart`, `getPriceInCart`) and `generated/helpers/common-steps-for-all-projects.ts` (`fillStripeForm`, `payPalTemplate`, `pageFullLoaded`, `blockUI`, `currencyToNumber`, `placeOrderElement`, `wooCommerceCheckoutTemplate`). Plus the AU GI JSON for live selectors.

- [ ] **Step 1: File header + imports + regionConfig**

```typescript
// No Pong site helper — ALL site DOM lives here (selectors, card data, billing
// constants, classic/blocks branch, popups, waitForCheckoutReady, points readers).
// No assertions (see assertions.ts), no cross-flow orchestration (see flows.ts).
// Every action/read goes through helpers/resilient.ts (rule 23).
import { expect, type Page } from '@playwright/test';
import { ctxFor, resilientClick, resilientFill, resilientText } from './resilient';
import type {
  BillingDetails, OrderConfig, Region, RegionConfig, CapturedPrices,
} from '../types/test-config';

// Stripe test card (classic checkout, iframe js.stripe.com).
export const STRIPE_CARD = { number: '4242 4242 4242 4242', expiry: '12 / 30', cvc: '123' } as const;

// Per-region constants (rule 11). Slugs/addresses confirmed via live exploration + GI JSON.
export const regionConfig: Record<Region, RegionConfig> = {
  au: {
    currency: '$', currencyCode: 'AUD',
    billing: { /* AU billing — fill from GI 'Fill Checkout' step values */ } as BillingDetails,
    products: { simple: { slug: '' }, variable: { slug: '', variation: '' }, subscription: { slug: '' }, wholesale: { slug: '' } },
    expectTax: true, expectShipping: true,
  },
  ca: { /* fill in CA replication plan */ } as RegionConfig,
  us: { /* fill in US replication plan */ } as RegionConfig,
};
```
> The AU `billing` + `products.*.slug` values come from the AU GI JSON (`AU - Place Order - New User/01 …json` "Fill Checkout" + add-to-cart steps) and live exploration. CA/US left as stubs — filled by the replication plan.

- [ ] **Step 2: Port the DOM primitives (adapt from generated helpers)**

Implement, each routed through resilient where it touches DOM:
- `dismissPopups(page)` — subscription popup + cookie banner (GI `19 - Subscription popup` + cart popups).
- `waitForCheckoutReady(page)` — poll `.blockUI`, `.wc-block-components-spinner`, place-order loading (prompt §61). Port logic from `blockUI`/`pageFullLoaded`.
- `addToCart(page, pdp)` — branch simple/variable/subscription; from `getPriceInCart`/`addSubscriptionToCart`. Return `{ productName, unitPrice }`.
- `fillCheckoutAddress(page, config)` — classic billing (select2 country), `isBlockCheckout` branch (rule 9); from `fillCheckout`.
- `pay(page, config)` — `config.payment === 'stripe'` → fill Stripe iframe (`iframe[src*="js.stripe.com"]`, rule 15) from `fillCC`/`fillStripeForm`; `=== 'paypal'` → PayPal sandbox redirect from `payPalTemplate` (creds `PAY_PAL_USER`/`PAY_PAL_PASS`).
- `captureCheckoutTotals(page)` → `Pick<CapturedPrices,'subtotal'|'shipping'|'tax'|'total'>` via `resilientText` + money normalize (`currencyToNumber`).
- `readOrderReceived(page)` — thank-you page order number + totals + payment label.
- `readPointsEarned(page)` — Points/Rewards earned at cart/checkout (`checkEarningPointsCartCheckout`/`calculateEarningPoints`).
- `warnIfNoTaxOrShipping(page, {testId})` — paste rule 22's helper verbatim.
- `isBlockCheckout(page)`, `isZeroAmount(text)`, `stripCurrency(text)` utilities.

- [ ] **Step 3: Verify**

Run: `cd "$ROOT" && npx tsc --noEmit`
Expected: clean (or only spec-not-found errors).

- [ ] **Step 4: Commit**

```bash
git add "suites/No Pong/helpers/nopong.ts"
git commit -m "feat(nopong): site helper — regionConfig, pay (stripe/paypal), cart/checkout/points DOM"
```

---

## Phase 2 — AU basic (cheap validation of fixtures + resilient + email)

### Task 7: specs/au/basic/visual.spec.ts

**Files:**
- Create: `$ROOT/specs/au/basic/visual.spec.ts`

Read first: `$REF/specs/visual/pages.spec.ts` (port the `triggerLazyLoad`/`shot`/mask pattern verbatim — rule 24) + AU Basic GI tests 01/05/12/13/14/19 for the page URLs.

- [ ] **Step 1: Write the spec**

Port `$REF/specs/visual/pages.spec.ts`. Replace `PAGES` with AU pages derived from GI: home `'./'`, shop `'shop/'` (GI 05), FAQ page (GI 12), in-the-news (GI 13), store-locator (GI 14). Add cart + checkout visual via `addToCart` then `goto('cart/')`/`'checkout/'`. Tag `{ tag: ['@plugin:woocommerce', '@plugin:<store-locator-slug>', '@plugin:<faq-slug>'] }` (confirm slugs). Slider-autoplay (GI 02) + sub-popup (GI 19) get a small functional `test` using `_02CAHomeSliderAutoplayVerification`-equivalent logic adapted for AU. Only allowed raw `expect` = `toHaveScreenshot`.

- [ ] **Step 2: Generate baselines**

Run: `cd "$ROOT" && npx playwright test specs/au/basic/visual.spec.ts --project=au --update-snapshots`
Expected: baselines written; run reports PASS.

- [ ] **Step 3: Re-run to confirm stable**

Run: `cd "$ROOT" && npx playwright test specs/au/basic/visual.spec.ts --project=au`
Expected: PASS (no diff).

- [ ] **Step 4: Commit (include snapshots)**

```bash
git add "suites/No Pong/specs/au/basic/visual.spec.ts" "suites/No Pong/specs/au/basic/visual.spec.ts-snapshots"
git commit -m "feat(nopong): AU visual-regression spec + baselines"
```

---

### Task 8: specs/au/basic/account.spec.ts + helpers/account.ts

**Files:**
- Create: `$ROOT/helpers/account.ts`
- Create: `$ROOT/specs/au/basic/account.spec.ts`

Read first: `$REF/helpers/account.ts` + `$REF/specs/account/account.spec.ts`; GI `09 - Registration…` + `11 - Forgot password` + generated `registration`, `forgotPasswordFlow`, `extractResetLinkFromEmail`, `extractPassFromEmail`, `myAccountLinks`.

- [ ] **Step 1: Write `helpers/account.ts`**

Port `$REF/helpers/account.ts` shape: `registerNewUser(shopperPage, emailPage, email)` (passwordless → fetch "set password" email via `playgrounds-email` → set `#password_1/#password_2`, rule 28; watch reCAPTCHA), `forgotPassword(shopperPage, emailPage, email)`, and `assertMyAccountLinks(page)` (the feature-cohesive `assert*` exception, rule 6). Email reads via `playgrounds-email.ts` filtered by `suiteVars.title`.

- [ ] **Step 2: Write the spec**

Thin: `test('NP-AU-ACC-01 registration + login')` → `registerNewUser` → `assertMyAccountLinks`. `test('NP-AU-ACC-02 forgot password')` → `forgotPassword` → assert reset success. Tag `{ tag: ['@plugin:woocommerce'] }`.

- [ ] **Step 3: Run**

Run: `cd "$ROOT" && npx playwright test specs/au/basic/account.spec.ts --project=au`
Expected: PASS (validates email round-trip + fixtures end-to-end).

- [ ] **Step 4: Commit**

```bash
git add "suites/No Pong/helpers/account.ts" "suites/No Pong/specs/au/basic/account.spec.ts"
git commit -m "feat(nopong): AU account spec — registration, set-password, forgot-password"
```

---

### Task 9: specs/au/basic/limits.spec.ts

**Files:**
- Create: `$ROOT/specs/au/basic/limits.spec.ts`

Read first: GI `15 - Tin Limit` (9 steps) + `16 - 85g Limit` (14 steps) + `06 - Cart Page`.

- [ ] **Step 1: Write the spec**

Two functional tests asserting quantity-cap enforcement (add product beyond the tin / 85g limit → expect cap notice / qty clamp). Actions via resilient; the assertions go in `assertions.ts` as `assertQuantityLimit(page, {limit, noticePattern})` (match field token + intent, rule 26 — don't hardcode exact copy). Spec stays assertion-free. Tag `{ tag: ['@plugin:woocommerce'] }`.

- [ ] **Step 2: Add `assertQuantityLimit` to `assertions.ts`**

(First content of `assertions.ts` — see Task 11 for the file header; create it here with the header + this one assertion, expand later.)

- [ ] **Step 3: Run**

Run: `cd "$ROOT" && npx playwright test specs/au/basic/limits.spec.ts --project=au`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add "suites/No Pong/specs/au/basic/limits.spec.ts" "suites/No Pong/helpers/assertions.ts"
git commit -m "feat(nopong): AU product quantity-limit spec (tin / 85g)"
```

---

## Phase 3 — AU orders (the hard one)

### Task 10: helpers/flows.ts — runOrderFlow

**Files:**
- Create: `$ROOT/helpers/flows.ts`

Read first: `$REF/helpers/flows.ts` (the FlowCapture/runOrderFlow shape) + GI `01 - Place Order - New User` (13 steps) + generated `checkOrderDetailsThankYouPageAndMyAccount`.

- [ ] **Step 1: Write `runOrderFlow`**

Port `$REF/helpers/flows.ts`. `runOrderFlow({shopperPage}, config)` → `FlowCapture`: `goto('./')` → `dismissPopups` → `addToCart` → read cart drawer/page → `fillCheckoutAddress` → `selectShipping`/`captureCheckoutTotals` → `warnIfNoTaxOrShipping` → `readPointsEarned` → `pay` → `readOrderReceived`. Returns typed `OrderResult` (incl. `pointsEarned`, `paymentLabel`). No `expect()`. Add `runSubscriptionFlow` + `runWholesaleFlow` stubs (filled in Tasks 12-14).

- [ ] **Step 2: Verify**

Run: `cd "$ROOT" && npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add "suites/No Pong/helpers/flows.ts"
git commit -m "feat(nopong): order flow orchestrator (capture chain → OrderResult)"
```

---

### Task 11: helpers/assertions.ts — order parity asserts

**Files:**
- Modify: `$ROOT/helpers/assertions.ts`

Read first: `$REF/helpers/assertions.ts` (assertFrontendParity / assertMyAccount / assertBackend / assertEmail) + generated `checkOrderDetailsInBackend`, `checkOrderOnEmail`, `storiesAssertion`.

- [ ] **Step 1: Write the four parity assertions**

Port `$REF/helpers/assertions.ts`. `assertFrontendParity(capture, config)`, `assertMyAccount(shopperPage, capture, config)`, `assertBackend(adminPage, capture, config)` (admin order status `#select2-order_status-container`; payment note via `order-notes.ts` scan-all+regex, rule 16; classic/blocks note copy branch, rule 21), `assertEmail(emailPage, capture, config, suiteVars)` (Playgrounds inbox, newest-first caveat rule 30). Add `assertPointsEarned(capture, config)` for the Points/Rewards parity. Every `expect` carries a message (rule 19); tax/shipping warn-not-fail (rule 22). Lint: `grep -nE "expect\([^,]+\)\." helpers/assertions.ts` returns zero.

- [ ] **Step 2: Verify lint + tsc**

Run: `cd "$ROOT" && npx tsc --noEmit && grep -nE "expect\([^,]+\)\." helpers/assertions.ts || echo "OK no unmessaged expects"`
Expected: tsc clean; grep returns nothing.

- [ ] **Step 3: Commit**

```bash
git add "suites/No Pong/helpers/assertions.ts"
git commit -m "feat(nopong): order parity assertions (frontend/my-account/backend/email/points)"
```

---

### Task 12: specs/au/orders/place-order.spec.ts (serial chain + refund)

**Files:**
- Create: `$ROOT/specs/au/orders/place-order.spec.ts`

Read first: `$REF/specs/orders/place-order-simple.spec.ts`; GI New-User 01-05, Logged-User 06-08, `09 Not Wholesale`; generated `placeOrderNewUserRefund`, `placeOrderNewUserRefundEmail`; `$REF` chain-state usage; prompt rule 27 (refund form), rule 3 (chain state), rule 28 (account reuse).

- [ ] **Step 1: Write the serial spec**

```typescript
test.describe.serial('NP-AU-PO — Place order', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-gateway-stripe', '@plugin:<points-slug>'] }, () => { … });
```
- `test 1` new-user (Stripe): `runOrderFlow` → `assertFrontendParity` + `assertMyAccount` + `assertBackend` + `assertEmail` + `assertPointsEarned`. Persist order number + new-user cookies to `auth/chain-nopong-au.json` (rule 3 — use `$REF`/template `chain-state.ts` pattern).
- `test 2` refund: **guarded** `test.skip(process.env.REFUND_PROJECT !== 'au', 'refund gated to one region')`. Read order number from chain state (skip-guard so it runs standalone). Fill refund form (rule 27: copy qty → `refund_order_item_qty`, poll computed amount `> 0` before submit), submit Stripe refund, assert refund note (`config.refundNotePattern`) + `config.refundedStatus = 'Refunded'` + refund email.
- `test 3` logged-user (rule 28): add chain cookies, drive identity off `config.accountEmail`, place a second order, assert reuse (saved address prefilled).
- `test 4` Not Wholesale (GI 09): normal user sees no wholesale pricing/menu — assert absence.

Config objects at top; one PayPal variant config (`payment: 'paypal'`) added as a 5th test or a `PAY_OVERRIDE` env switch on test 1.

- [ ] **Step 2: Run (AU is REFUND_PROJECT)**

Run: `cd "$ROOT" && npx playwright test specs/au/orders/place-order.spec.ts --project=au`
Expected: all tests PASS. Triage with `--ui` is forbidden mid-edit (rule 30) — use CLI.

- [ ] **Step 3: Commit**

```bash
git add "suites/No Pong/specs/au/orders/place-order.spec.ts" "suites/No Pong/helpers/flows.ts"
git commit -m "feat(nopong): AU place-order serial chain — new/logged user, refund, not-wholesale"
```

---

## Phase 4 — AU subscriptions + wholesale

### Task 13: specs/au/subscriptions/subscription.spec.ts

**Files:**
- Create: `$ROOT/specs/au/subscriptions/subscription.spec.ts`
- Modify: `$ROOT/helpers/flows.ts` (fill `runSubscriptionFlow`)
- Modify: `$ROOT/helpers/assertions.ts` (subscription asserts)

Read first: GI `AU - Subscription test` 01-04; generated `placeOrderSubscription`, `addSubscriptionToCart`, `subscriptionBackend`, `subscriptionTestRenew`, `renewByAdmin`, `nextPaymentDate`.

- [ ] **Step 1: Implement `runSubscriptionFlow`** → place subscription order, capture `subscriptionNumber` + `nextPaymentDate` → `SubscriptionResult`.

- [ ] **Step 2: Add `assertSubscriptionBackend` / `assertSubscriptionEmail` / `assertRenewal`** to `assertions.ts` (admin renew via `renewByAdmin`, assert renewal order created).

- [ ] **Step 3: Write the spec** — serial: place → backend → email → renew. Tag `@plugin:woocommerce-subscriptions`.

- [ ] **Step 4: Run**

Run: `cd "$ROOT" && npx playwright test specs/au/subscriptions/subscription.spec.ts --project=au`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "suites/No Pong/specs/au/subscriptions/subscription.spec.ts" "suites/No Pong/helpers/flows.ts" "suites/No Pong/helpers/assertions.ts"
git commit -m "feat(nopong): AU subscription spec — place, backend, email, renew"
```

---

### Task 14: specs/au/subscriptions/manage.spec.ts

**Files:**
- Create: `$ROOT/specs/au/subscriptions/manage.spec.ts`

Read first: GI `21 - Subscription test` (107 steps) + `22 Admin Activate` + `23 Reactivation` + `24 Change Schedule`; generated `subscriptionMenu`/`subscriptionMenuHarmony`.

- [ ] **Step 1: Write the spec** — serial on one subscription: place → admin cancel → admin activate → reactivation verification → change schedule. Assertions (`assertSubscriptionStatus`, `assertScheduleChanged`) in `assertions.ts`, driven by `SubscriptionConfig.expectedSubStatus`. Tag `@plugin:woocommerce-subscriptions`.

- [ ] **Step 2: Run**

Run: `cd "$ROOT" && npx playwright test specs/au/subscriptions/manage.spec.ts --project=au`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add "suites/No Pong/specs/au/subscriptions/manage.spec.ts" "suites/No Pong/helpers/assertions.ts"
git commit -m "feat(nopong): AU subscription management — cancel/activate/reactivate/change-schedule"
```

---

### Task 15: specs/au/wholesale/wholesale.spec.ts

**Files:**
- Create: `$ROOT/specs/au/wholesale/wholesale.spec.ts`
- Modify: `$ROOT/helpers/flows.ts` (fill `runWholesaleFlow`)

Read first: GI `17 - Wholesale` (27 steps) + `18 - Wholesale Place Order` (57 steps); generated `wholesaleLogin`, `emptyCart`.

- [ ] **Step 1: Implement `runWholesaleFlow`** — wholesale login → add wholesale product → assert wholesale pricing → place order → `OrderResult`.

- [ ] **Step 2: Write the spec** — serial: wholesale register/login → wholesale-priced order. `assertWholesalePricing` in `assertions.ts`. Tag `@plugin:woocommerce`, `@plugin:<wholesale-slug>`.

- [ ] **Step 3: Run**

Run: `cd "$ROOT" && npx playwright test specs/au/wholesale/wholesale.spec.ts --project=au`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add "suites/No Pong/specs/au/wholesale/wholesale.spec.ts" "suites/No Pong/helpers/flows.ts" "suites/No Pong/helpers/assertions.ts"
git commit -m "feat(nopong): AU wholesale spec — login + wholesale-priced order"
```

---

## Phase 5 — Lock & verify AU reference

### Task 16: Full AU run + lint gates

- [ ] **Step 1: Typecheck**

Run: `cd "$ROOT" && npx tsc --noEmit`
Expected: clean.

- [ ] **Step 2: Assertion-placement lint (rule 6)**

Run: `cd "$ROOT" && grep -rnE "expect\(" specs | grep -v toHaveScreenshot || echo "OK — specs assertion-free"`
Expected: only `toHaveScreenshot` lines (or "OK").

- [ ] **Step 3: Message lint (rule 19)**

Run: `cd "$ROOT" && grep -nE "expect\([^,]+\)\." helpers/assertions.ts || echo "OK — all expects messaged"`
Expected: nothing / "OK".

- [ ] **Step 4: Full AU suite**

Run: `cd "$ROOT" && npx playwright test --project=au`
Expected: all AU specs PASS.

- [ ] **Step 5: Commit any fixes + tag the reference**

```bash
git add -A "suites/No Pong"
git commit -m "chore(nopong): AU reference suite green — typecheck + assertion lints pass"
```

---

## Follow-up (separate plan, after AU locks)

- **CA/US replication:** fill `regionConfig.ca` / `.us` (billing, slugs, currency codes, tax/shipping expectations from GI CA/US suites); copy `au/basic`+`au/orders`+`au/subscriptions` to `ca/` `us/`, swapping only `region` in configs. No wholesale / no manage for CA/US (not in GI set). Verify admin user exists on each subsite (rule 12); confirm relative-goto correctness on subsite paths.
- **REST upgrade (optional):** add `helpers/wc-api.ts` + `getSuiteVars` if consumer creds appear; promote DOM parity to REST parity.

---

## Self-review notes

- **Spec coverage:** topology→config (T4), region projects (T4), DOM-first/no-wc-api (no wc-api task ✓), payment union stripe+paypal (T6 `pay`, T12 PayPal variant), classic/blocks branch (T6 `isBlockCheckout`, T11 note branch), resilient+Stagehand (T2 port), email (T2 port + T8 use), AU triage table all 7 specs (T7-T9, T12, T13-T15), data model (T3), layer responsibilities (T6/T10/T11), build sequence (phases), plugin tags (each spec task). All spec sections map to a task.
- **Placeholders:** `regionConfig.ca/.us` are intentional stubs deferred to the replication plan (called out in §Out-of-scope + Follow-up), not silent TODOs. AU `billing`/`slug` values are derived per-task from named GI JSON files — the task says which file.
- **Type consistency:** `OrderResult`/`CapturedPrices`/`SuiteVars`/`RegionConfig` names match across T3 → T6/T10/T11. `runOrderFlow`/`runSubscriptionFlow`/`runWholesaleFlow` consistent T10/T13/T15. `assert*` names consistent T11/T13/T14/T15.
