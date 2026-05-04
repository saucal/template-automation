# Refactor WooCommerce Automation Project

Refactor a WooCommerce Ghost Inspector migration project into a clean, config-driven Playwright test suite following the architecture established in the bluesnap-automation reference project.

## Input you must provide

Paste the full contents of these files from the project you want to refactor:

1. **All generated spec files** from `generated/specs/*.spec.ts`
2. **All generated helper files** from `generated/helpers/*.ts`

Tell the AI which project this is for (e.g., "repurposedmaterials", "no-pong") and the site's BASE_URL.

---

## Reference architecture (from bluesnap-automation/tests/)

The refactored output MUST follow this layered architecture. Each layer has single responsibility. Project root = the Playwright project itself (own `package.json`, own `node_modules`). For an existing automation repo where this lives nested under `tests/` (bluesnap shape), run all commands from that nested dir; for a flat repo (no-pong, repurposed shape) the Playwright project IS the repo root.

```
<project-root>/
├── .env                          # Site credentials (never committed)
├── .env.example                  # Template showing required env vars
├── .gitignore                    # auth/, node_modules/, reports/, test-results/
├── package.json                  # @playwright/test, @woocommerce/e2e-utils-playwright, dotenv
├── tsconfig.json                 # ESNext, strict, bundler resolution
├── playwright.config.ts          # baseURL from .env, globalSetup, video/trace/screenshot on, slowMo
├── global-setup.ts               # Browser login → save admin storageState to auth/admin.json
├── auth/                         # Generated at runtime (gitignored): admin.json + chain-*.json
├── types/
│   └── test-config.ts            # Typed interfaces for test configs + result objects
├── fixtures/
│   └── index.ts                  # Extended Playwright test with shopperPage, adminPage, emailPage
├── helpers/
│   ├── <site-or-integration>.ts  # Site/gateway-specific DOM helpers — name after the project (bluesnap.ts, mastercard.ts, nopong.ts, repurposed.ts)
│   ├── flows.ts                  # High-level flow orchestrators (checkout, refund, subscription mgmt, page verification)
│   ├── assertions.ts             # Config-driven expect() helpers — ALL assertions live here
│   └── wc-api.ts                 # WooCommerce/WordPress REST API clients + data fetchers + getSuiteVars()  (omit if project doesn't hit WC REST API)
└── specs/
    └── <feature-area>/           # Group specs by feature; pick folders to match the project's actual surface area
```

**Spec folder layout depends on the project's surface area** — pick the dimension that matches the test set. Examples:

| Project type | Likely spec folders |
|--------------|---------------------|
| Payment gateway (bluesnap, mastercard) | `cc/`, `ach/`, `multicurrency/`, `subscriptions/` — by payment method / integration capability |
| WooCommerce e-commerce site (repurposedmaterials) | `basic/`, `orders/` — page-level checks vs full order flows |
| Multi-region site (no-pong: au/ca/us) | `au/`, `ca/`, `us/` at the top level; inside each region, group by area (`au/basic/`, `au/orders/`, `au/subscriptions/`, `au/wholesale/`) — region-major because per-region site config and product catalog differ |
| Subscriptions-heavy / wholesale | Add `subscriptions/`, `wholesale/` alongside `basic/` + `orders/` |

The site-helper file is named after the site or integration — `bluesnap.ts`, `mastercard.ts`, `nopong.ts`, `repurposed.ts` — never a generic `site.ts`. Cross-flow utilities like a checkout-readiness wait (`waitForCheckoutReady` — polling `.blockUI`, `.wc-block-components-spinner`, `.wc-block-components-checkout-place-order-button--loading`, etc.) live inside that site helper. Do **not** create a separate `helpers/common.ts` unless the same utility is genuinely shared across two unrelated integrations in the same repo.

If the project has no WC REST API usage (no order data fetch, no plugin-version reads), drop `helpers/wc-api.ts` entirely — don't generate empty stubs.

### Layer responsibilities

| Layer | Does | Does NOT |
|-------|------|----------|
| `types/test-config.ts` | Define interfaces for test config objects, suite-level vars, and result data | Contain any logic |
| `fixtures/index.ts` | Create isolated browser contexts (shopper, admin, email), record video, attach video to testInfo after ctx.close() | Contain test logic or assertions |
| `helpers/<site>.ts` | Site/integration-specific selectors, popup handling, product helpers, form fillers, dual classic/blocks-checkout branching, card data, billing constants, checkout-readiness waits | Make assertions or navigate between flows |
| `helpers/flows.ts` | Orchestrate multi-step flows (add to cart → checkout → place order → collect API data → return Result) | Call `expect()` directly (delegate to assertions.ts) |
| `helpers/assertions.ts` | All `expect()` calls, config-driven branching on TestConfig + SuiteVars | Navigate pages or perform actions |
| `helpers/wc-api.ts` | REST API clients (with retry on `ECONNRESET`/socket hang up), order data fetchers, site config fetchers, `getSuiteVars()` | Touch the browser |
| `specs/*.spec.ts` | Declare a thin config object → fetch SuiteVars in `beforeAll` → call flow → call assertions | Contain inline selectors, navigation, or duplicated logic |

### Key patterns to follow

**1. Config objects replace `vars` bags. Split into TestConfig + SuiteVars + Result:**

- **TestConfig** — what THIS test is doing (user type, product, payment, expected status).
- **SuiteVars** — what the SITE has (plugin versions, feature flags like 3DS, admin email). Fetched once per spec via `getSuiteVars()` in `beforeAll`.
- **Result** — data returned by a flow (orderNumber, billingEmail, order totals, API logs, tokens). Fed into assertions.

```typescript
// BAD (generated code pattern):
const vars: Record<string, string> = {};
vars.product = 'variable';
vars.username = email;

// GOOD (refactored pattern — types/test-config.ts):
export interface OrderConfig {
  testId: string;
  user: 'guest' | 'new' | 'old';   // 'old' = returning logged-in user
  product: { slug: string; type: 'simple' | 'variable' };
  payment: 'cc' | 'echeck';
  expectedStatus: 'Processing' | 'Completed' | 'On hold';
}

export interface OrderResult {
  orderNumber: string;
  billingEmail: string;
  payDate: string;
  order: { total: number; shippingTotal: string; shippingTax: string };
  // Add API-log fields only if the project hits backend logs
}

// helpers/wc-api.ts:
export interface SuiteVars { title: string; blog: string; /* plugin versions, feature flags */ }
export async function getSuiteVars(): Promise<SuiteVars> { /* one REST call */ }
```

**2. Thin spec files — config → flow → assertions, with `getSuiteVars()` in `beforeAll`:**
```typescript
import { test } from '../../fixtures';
import type { OrderConfig } from '../../types/test-config';
import { runOrderFlow } from '../../helpers/flows';
import { getSuiteVars, type SuiteVars } from '../../helpers/wc-api';
import { assertOrderDetails, assertEmails } from '../../helpers/assertions';

const config: OrderConfig = { /* ... */ };

let suiteVars: SuiteVars;
test.beforeAll(async () => { suiteVars = await getSuiteVars(); });

test('RM-PO-001 – place order as new user', async ({ shopperPage, adminPage, emailPage }) => {
  const result = await runOrderFlow({ shopperPage, adminPage, emailPage }, config, suiteVars);
  assertOrderDetails(result, config, suiteVars);
  assertEmails(emailPage, result, suiteVars);
});
```
For projects without WC REST API usage, drop the `suiteVars` plumbing — the spec collapses to `config → flow → assertions`.

**3. Serial test chains use `describe.serial` + file-based state persistence + skip-guard so mid-chain tests can run standalone:**
```typescript
// For tests that share state in sequence (place order as new user → reuse account →
// new card → refund). Persist shared state to auth/chain-<id>.json so tests after
// the first can run in isolation against a site where the first has already run.
const CHAIN_FILE = path.join(__dirname, '../../auth/chain-RM-PO.json');

interface ChainState { sharedEmail: string; sharedVaultedShopperId: string; }

function saveChainState(state: ChainState): void {
  fs.mkdirSync(path.dirname(CHAIN_FILE), { recursive: true });
  fs.writeFileSync(CHAIN_FILE, JSON.stringify(state, null, 2));
}
function loadChainState(): ChainState | null {
  if (!fs.existsSync(CHAIN_FILE)) return null;
  try { return JSON.parse(fs.readFileSync(CHAIN_FILE, 'utf-8')) as ChainState; } catch { return null; }
}

let sharedEmail: string;
let sharedVaultedShopperId: string;

test.describe.serial('RM-PO-008–011 — vaulted shopper chain', () => {
  test.beforeAll(async () => {
    const saved = loadChainState();
    if (saved) { sharedEmail = saved.sharedEmail; sharedVaultedShopperId = saved.sharedVaultedShopperId; }
    else { sharedEmail = generateRegisteredEmail(); }
  });

  // Skip-guard: tests after the seed test require chain state from a prior seed run
  test.beforeEach(async ({}, testInfo) => {
    if (!testInfo.title.startsWith('RM-PO-008')) {
      test.skip(!sharedVaultedShopperId, 'Requires RM-PO-008 to have run first — produces auth/chain-RM-PO.json');
    }
  });

  test('RM-PO-008 — seed: new user creates account, saves card', async ({ /* ... */ }) => {
    sharedEmail = generateRegisteredEmail();  // always fresh on seed
    // ... run flow, populate sharedVaultedShopperId, then:
    saveChainState({ sharedEmail, sharedVaultedShopperId });
  });

  test('RM-PO-009 — returning user uses saved card', async ({ /* ... */ }) => { /* ... */ });
});
```

**4. Replace `page.evaluate()` blocks with Playwright-native actions where possible:**
```typescript
// BAD (generated pattern — inline evaluate for simple checks):
const exists = await page.evaluate(() => !!document.querySelector('#popup'));

// GOOD:
const exists = await page.locator('#popup').count() > 0;
```

Keep `page.evaluate()` only when genuinely needed (e.g., complex DOM traversal that Playwright locators can't express).

**5. `playwright.config.ts` reflects WC reality — sequential-leaning, generous timeouts, video/trace/screenshot on, slowMo for visual debugging:**
```typescript
export default defineConfig({
  testDir: './specs',
  timeout: 240_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,        // WC tests share DB state — keep sequential by default
  workers: 2,                   // raise only if specs are confirmed isolated; drop to 1 for chains
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { outputFolder: 'reports', open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL,
    actionTimeout: 15_000,
    trace: 'on',
    screenshot: 'on',
    video: {
      mode: 'on',
      size: { width: 1280, height: 720 },
      show: {
        actions: { duration: 500, position: 'top-right', fontSize: 14 },
        test: { level: 'step', position: 'bottom', fontSize: 12 },
      },
    },
    launchOptions: { slowMo: 250 },
    ignoreHTTPSErrors: true,
  },
  globalSetup: './global-setup.ts',
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
```

**6. Global setup for admin auth (not repeated in every test):**
```typescript
// global-setup.ts
import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '.env') });

export default async function globalSetup() {
  const authDir = path.join(__dirname, 'auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  await page.goto(`${process.env.BASE_URL}/wp-admin`);
  await page.locator('#user_login').fill(process.env.WP_ADMIN_USER!);
  await page.locator('#user_pass').fill(process.env.WP_ADMIN_PASS!);
  await page.locator('#wp-submit').click();
  await page.waitForURL('**/wp-admin/**');
  await ctx.storageState({ path: path.join(authDir, 'admin.json') });
  await browser.close();
}
```

**7. Fixtures provide isolated contexts. Bridge `video.show.*` config to `recordVideo` API and attach video to testInfo only AFTER `ctx.close()` (path resolves only once recording finalises):**
```typescript
import { test as base, Page, Video } from '@playwright/test';
import path from 'path';

type Fixtures = { shopperPage: Page; adminPage: Page; emailPage: Page };

async function attachVideo(video: Video, name: string, testInfo: import('@playwright/test').TestInfo) {
  const videoPath = await video.path().catch(() => null);
  if (videoPath) await testInfo.attach(name, { path: videoPath, contentType: 'video/webm' });
}

// playwright.config uses video.{mode,size,show.{actions,test}}; newContext uses recordVideo.{dir,size,showActions,showTest}
function getRecordVideoOptions(testInfo: import('@playwright/test').TestInfo, dir: string) {
  const cfg = testInfo.project.use.video as any;
  const size = cfg?.size ?? { width: 1280, height: 720 };
  const showActions = cfg?.show?.actions ?? cfg?.showActions;
  const showTest = cfg?.show?.test ?? cfg?.showTest;
  return { dir, size, ...(showActions ? { showActions } : {}), ...(showTest ? { showTest } : {}) };
}

export const test = base.extend<Fixtures>({
  shopperPage: async ({ browser }, use, testInfo) => {
    const ctx = await browser.newContext({
      ...testInfo.project.use,
      recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
    });
    const page = await ctx.newPage();
    await use(page);
    const video = page.video();
    await ctx.close();
    if (video) await attachVideo(video, 'shopperPage', testInfo);
  },
  adminPage: async ({ browser }, use, testInfo) => {
    const ctx = await browser.newContext({
      ...testInfo.project.use,
      storageState: path.join(__dirname, '../auth/admin.json'),
      recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
    });
    const page = await ctx.newPage();
    await use(page);
    const video = page.video();
    await ctx.close();
    if (video) await attachVideo(video, 'adminPage', testInfo);
  },
  emailPage: async ({ browser }, use, testInfo) => {
    const ctx = await browser.newContext({
      ...testInfo.project.use,
      storageState: path.join(__dirname, '../auth/admin.json'),  // admin auth so wp-admin AJAX is available
      recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
    });
    const page = await ctx.newPage();
    await use(page);
    const video = page.video();
    await ctx.close();
    if (video) await attachVideo(video, 'emailPage', testInfo);
  },
});
export { expect } from '@playwright/test';
```

**8. WC e2e-utils + REST API client patterns. Use `@woocommerce/e2e-utils-playwright` primitives instead of hand-rolling. Wrap REST clients in a retry Proxy for transient `ECONNRESET` / socket-hang-up errors:**
```typescript
import { addOneOrMoreProductToCart, fillBillingCheckoutBlocks, fillShippingCheckoutBlocks,
         createClient, WC_API_PATH, WP_API_PATH } from '@woocommerce/e2e-utils-playwright';

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try { return await fn(); } catch (err: any) {
      const transient = err?.code === 'ECONNRESET' || err?.message?.includes('socket hang up');
      if (transient && attempt < retries) { await new Promise(r => setTimeout(r, delayMs * attempt)); continue; }
      throw err;
    }
  }
  throw new Error('unreachable');
}
// Wrap client.{get,post,put,delete,patch} via Proxy so every call gets retry semantics.
```

**9. Branch on classic vs blocks checkout via a single helper (`isBlockCheckout(page)`); use `fillBillingCheckoutBlocks`/`fillShippingCheckoutBlocks` from e2e-utils for blocks, classic selectors for classic. Don't duplicate the whole flow per checkout style.**

---

## Refactoring rules

1. **Read ALL generated files first** before writing any code. Map out which generated helper functions are called by which spec tests.

2. **Identify duplicated logic** in the generated specs (e.g., cart/product/variation code appearing in multiple tests) and extract into `helpers/site.ts` or `helpers/flows.ts`.

3. **Identify the test suites' structure:**
   - Independent page-level tests (home, header, footer, shop, product pages) → `specs/basic/`
   - Serial order flows (place order → email → backend → refund) → `specs/orders/` with chain state

4. **Site-specific helpers go in `helpers/site.ts`**, not in generic names. Examples:
   - `closePopup()` — dismiss site-specific popups
   - `selectFirstAvailableVariation()` — product variation selection
   - `fillCheckoutForm()` — site-specific checkout field filling
   - `fillCreditCard()` — payment method filling

5. **Do NOT over-abstract.** If a helper is called once, inline it. Only extract when used 2+ times.

6. **Preserve the test intent** from the generated code. Every `expect()` in the generated output should appear in the refactored version (in `assertions.ts`), just organized cleanly.

7. **Environment variables** for credentials. Never hardcode passwords or API keys. Use `.env` with `dotenv`.

8. **Cross-flow utilities like `pageFullLoaded()`, `blockUI()`, `placeOrderElement()`, `waitForCheckoutReady()`** belong inside `helpers/<site>.ts` (the site/integration helper). Do NOT split into a separate `helpers/common.ts` — that file only earns its keep when two unrelated integrations in the same repo share it.

9. **The generated `vars: Record<string, string>` bags must be eliminated.** Every variable should be a properly typed field on a config or result object.

10. **Match the package.json structure. Add a `test:<area>` script per top-level spec folder you actually create — bluesnap has cc/ach/mc; an e-commerce site project has basic/orders; multi-region has au/ca/us. Don't ship scripts pointing at folders that don't exist:**
```json
{
  "name": "PROJECT-playwright",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "playwright test",
    "test:<area1>": "playwright test specs/<area1>",
    "test:<area2>": "playwright test specs/<area2>",
    "setup:browsers": "playwright install chromium"
  },
  "dependencies": {
    "@woocommerce/e2e-utils-playwright": "^0.4.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.59.1",
    "@types/node": "^25.5.0",
    "typescript": "^6.0.2"
  }
}
```

11. **Multi-region projects (no-pong au/ca/us pattern):** make region the outermost spec dimension (`specs/au/...`, `specs/ca/...`, `specs/us/...`). Per-region SuiteVars come from per-region API calls (different baseURLs or different site-config endpoints). If regions share helpers, put per-region constants in a typed map inside the site helper (e.g. `regionConfig: Record<'au'|'ca'|'us', { currency, taxRate, ... }>`).

---

## Output format

Generate each file with its full path and complete contents. Do NOT use placeholders, `// ...existing code...`, or partial files. Every file must be copy-paste ready.

Generate in this order:
1. `package.json`
2. `tsconfig.json`
3. `.env.example`
4. `.gitignore`
5. `playwright.config.ts`
6. `global-setup.ts`
7. `types/test-config.ts` (TestConfig + SuiteVars + Result interfaces)
8. `fixtures/index.ts` (with `getRecordVideoOptions` bridge + `attachVideo`)
9. `helpers/<site-or-integration>.ts` (named after the project: bluesnap.ts, mastercard.ts, nopong.ts, repurposed.ts — site-specific selectors, card data, billing constants, classic/blocks branch, checkout-readiness wait)
10. `helpers/wc-api.ts` (if the project uses WC/WP REST API — clients with retry, `getSuiteVars()`, order/log fetchers; OMIT entirely if not used)
11. `helpers/flows.ts` (high-level flow orchestrators returning Result objects)
12. `helpers/assertions.ts` (all expect() calls, branching on TestConfig + SuiteVars)
13. All spec files under `specs/<feature-area>/` (organize by integration / page-area / region per the table above)

---

## What NOT to do

- Do NOT invent test cases that don't exist in the generated code
- Do NOT remove assertions — every expect() must be preserved
- Do NOT add error handling for scenarios that can't happen
- Do NOT create unnecessary abstractions for one-time operations
- Do NOT hardcode any credentials or URLs
- Do NOT use `page.evaluate()` when a Playwright locator works
- Do NOT leave `Record<string, string>` vars bags — use typed interfaces
