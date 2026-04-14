# Refactor WooCommerce Automation Project

Refactor a WooCommerce Ghost Inspector migration project into a clean, config-driven Playwright test suite following the architecture established in the bluesnap-automation reference project.

## Input you must provide

Paste the full contents of these files from the project you want to refactor:

1. **All generated spec files** from `generated/specs/*.spec.ts`
2. **All generated helper files** from `generated/helpers/*.ts`

Tell the AI which project this is for (e.g., "repurposedmaterials", "no-pong") and the site's BASE_URL.

---

## Reference architecture (from bluesnap-automation/tests/)

The refactored output MUST follow this layered architecture. Each layer has a single responsibility:

```
tests/
├── .env                          # Site credentials (never committed)
├── .env.example                  # Template showing required env vars
├── package.json                  # @playwright/test, @woocommerce/e2e-utils-playwright, dotenv
├── tsconfig.json                 # ESNext, strict, bundler resolution
├── playwright.config.ts          # baseURL from .env, globalSetup, video/trace on
├── global-setup.ts               # Browser login → save admin storageState to auth/admin.json
├── auth/                         # Generated at runtime (gitignored)
├── types/
│   └── test-config.ts            # Typed interfaces for test configs + result objects
├── fixtures/
│   └── index.ts                  # Extended Playwright test with shopperPage, adminPage, emailPage
├── helpers/
│   ├── site.ts                   # Site-specific DOM helpers (selectors, popup dismiss, product navigation)
│   ├── flows.ts                  # High-level flow orchestrators (checkout, refund, verification)
│   ├── assertions.ts             # Config-driven expect() helpers — ALL assertions live here
│   └── wc-api.ts                 # WooCommerce/WordPress REST API clients + data fetchers
└── specs/
    ├── basic/                    # Page-level verification tests
    │   └── PROJ-basic-wc.spec.ts
    └── orders/                   # Order flow tests (checkout → verify → refund)
        └── PROJ-place-order.spec.ts
```

### Layer responsibilities

| Layer | Does | Does NOT |
|-------|------|----------|
| `types/test-config.ts` | Define interfaces for test config objects and result data | Contain any logic |
| `fixtures/index.ts` | Create isolated browser contexts (shopper, admin, email) with video | Contain test logic or assertions |
| `helpers/site.ts` | Site-specific selectors, popup handling, product helpers, form fillers | Make assertions or navigate between flows |
| `helpers/flows.ts` | Orchestrate multi-step flows (add to cart → checkout → collect data) | Call `expect()` directly (delegate to assertions.ts) |
| `helpers/assertions.ts` | All `expect()` calls, config-driven branching on test config | Navigate pages or perform actions |
| `helpers/wc-api.ts` | REST API clients, order data fetchers, site config fetchers | Touch the browser |
| `specs/*.spec.ts` | Declare a thin config object → call flow → call assertions | Contain inline selectors, navigation, or duplicated logic |

### Key patterns to follow

**1. Config objects replace `vars` bags:**
```typescript
// BAD (generated code pattern):
const vars: Record<string, string> = {};
vars.product = 'variable';
vars.username = email;

// GOOD (refactored pattern):
interface OrderConfig {
  testId: string;
  user: 'guest' | 'new' | 'logged';
  product: { slug: string; type: 'simple' | 'variable' };
  payment: 'cc' | 'echeck';
}
const config: OrderConfig = {
  testId: 'RM-PO-001',
  user: 'new',
  product: { slug: 'product-name', type: 'variable' },
  payment: 'cc',
};
```

**2. Thin spec files — config → flow → assertions:**
```typescript
import { test } from '../../fixtures';
import type { OrderConfig } from '../../types/test-config';
import { runOrderFlow } from '../../helpers/flows';
import { assertOrderDetails, assertEmails } from '../../helpers/assertions';

const config: OrderConfig = { /* ... */ };

test('RM-PO-001 – place order as new user', async ({ shopperPage, adminPage, emailPage }) => {
  const result = await runOrderFlow({ shopperPage, adminPage, emailPage }, config);
  assertOrderDetails(result, config);
  assertEmails(emailPage, result);
});
```

**3. Serial test chains use file-based state persistence:**
```typescript
// For tests that must run in sequence (place order → check email → check backend → refund):
const CHAIN_FILE = path.join(__dirname, '../../auth/chain-RM-PO.json');

function saveChainState(state: ChainState): void {
  fs.mkdirSync(path.dirname(CHAIN_FILE), { recursive: true });
  fs.writeFileSync(CHAIN_FILE, JSON.stringify(state, null, 2));
}

function loadChainState(): ChainState | null {
  if (!fs.existsSync(CHAIN_FILE)) return null;
  return JSON.parse(fs.readFileSync(CHAIN_FILE, 'utf-8'));
}
```

**4. Replace `page.evaluate()` blocks with Playwright-native actions where possible:**
```typescript
// BAD (generated pattern — inline evaluate for simple checks):
const exists = await page.evaluate(() => !!document.querySelector('#popup'));

// GOOD:
const exists = await page.locator('#popup').count() > 0;
```

Keep `page.evaluate()` only when genuinely needed (e.g., complex DOM traversal that Playwright locators can't express).

**5. Global setup for admin auth (not repeated in every test):**
```typescript
// global-setup.ts
export default async function globalSetup() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  await page.goto(`${process.env.BASE_URL}/wp-admin`);
  await page.locator('#user_login').fill(process.env.WP_ADMIN_USER!);
  await page.locator('#user_pass').fill(process.env.WP_ADMIN_PASS!);
  await page.locator('#wp-submit').click();
  await page.waitForURL('**/wp-admin/**');
  await ctx.storageState({ path: path.join(__dirname, 'auth/admin.json') });
  await browser.close();
}
```

**6. Fixtures provide isolated contexts:**
```typescript
export const test = base.extend<Fixtures>({
  shopperPage: async ({ browser }, use, testInfo) => {
    const ctx = await browser.newContext({
      ...testInfo.project.use,
      recordVideo: { dir: testInfo.outputDir },
    });
    const page = await ctx.newPage();
    await use(page);
    await ctx.close();
  },
  adminPage: async ({ browser }, use, testInfo) => {
    const ctx = await browser.newContext({
      ...testInfo.project.use,
      storageState: path.join(__dirname, '../auth/admin.json'),
      recordVideo: { dir: testInfo.outputDir },
    });
    const page = await ctx.newPage();
    await use(page);
    await ctx.close();
  },
  emailPage: async ({ browser }, use, testInfo) => {
    const ctx = await browser.newContext({
      ...testInfo.project.use,
      storageState: path.join(__dirname, '../auth/admin.json'),
      recordVideo: { dir: testInfo.outputDir },
    });
    const page = await ctx.newPage();
    await use(page);
    await ctx.close();
  },
});
export { expect } from '@playwright/test';
```

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

8. **Keep `pageFullLoaded()`, `blockUI()`, and `placeOrderElement()`** as shared utilities if they appear in the generated code — these are cross-project common steps. Put them in `helpers/common.ts`.

9. **The generated `vars: Record<string, string>` bags must be eliminated.** Every variable should be a properly typed field on a config or result object.

10. **Match the package.json structure:**
```json
{
  "name": "PROJECT-playwright",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "playwright test",
    "test:basic": "playwright test specs/basic",
    "test:orders": "playwright test specs/orders",
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
7. `types/test-config.ts`
8. `fixtures/index.ts`
9. `helpers/common.ts` (cross-project utilities: blockUI, pageFullLoaded, placeOrderElement)
10. `helpers/site.ts` (site-specific selectors and DOM helpers)
11. `helpers/wc-api.ts` (if the project uses WC REST API)
12. `helpers/flows.ts` (high-level flow orchestrators)
13. `helpers/assertions.ts` (all expect() calls)
14. All spec files under `specs/`

---

## What NOT to do

- Do NOT invent test cases that don't exist in the generated code
- Do NOT remove assertions — every expect() must be preserved
- Do NOT add error handling for scenarios that can't happen
- Do NOT create unnecessary abstractions for one-time operations
- Do NOT hardcode any credentials or URLs
- Do NOT use `page.evaluate()` when a Playwright locator works
- Do NOT leave `Record<string, string>` vars bags — use typed interfaces
