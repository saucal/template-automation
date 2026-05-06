# Refactor WooCommerce Automation Project

Refactor a WooCommerce Ghost Inspector migration project into a clean, config-driven Playwright test suite following the architecture established in the bluesnap-automation reference project.

**Templates referenced below live under `prompts/templates/`** — copy them into the new project and adapt rather than re-deriving from prose.

## Input you must provide

1. All generated spec files from `generated/specs/*.spec.ts`
2. All generated helper files from `generated/helpers/*.ts`
3. Project name (e.g. "repurposedmaterials", "no-pong") and BASE_URL.

---

## Reference architecture

```
<project-root>/
├── .env / .env.example / .gitignore
├── package.json                # @playwright/test, @woocommerce/e2e-utils-playwright, dotenv
├── tsconfig.json
├── playwright.config.ts        # → templates/playwright.config.ts
├── global-setup.ts             # → templates/global-setup.ts
├── auth/                       # gitignored: admin.json + chain-*.json
├── types/
│   ├── test-config.ts          # TestConfig + SuiteVars + Result interfaces
│   └── woocommerce__e2e-utils-playwright.d.ts  # → templates/woocommerce__e2e-utils-playwright.d.ts
├── fixtures/
│   └── index.ts                # → templates/fixtures.ts
├── helpers/
│   ├── <site>.ts               # site/integration-specific DOM helpers (named after project: bluesnap.ts, mastercard.ts, nopong.ts, repurposed.ts)
│   ├── flows.ts                # high-level flow orchestrators
│   ├── assertions.ts           # ALL expect() calls
│   └── wc-api.ts               # → templates/wc-api.ts (omit if project doesn't hit WC REST)
└── specs/<feature-area>/       # group by surface area (see table below)
```

| Project type | Spec folders |
|---|---|
| Payment gateway (bluesnap, mastercard) | `cc/`, `ach/`, `multicurrency/`, `subscriptions/` |
| WooCommerce e-commerce site | `basic/`, `orders/` |
| Multi-region (no-pong au/ca/us) | `au/`, `ca/`, `us/` outermost; nest `basic/`, `orders/`, etc. inside |
| Subscriptions / wholesale heavy | add `subscriptions/`, `wholesale/` alongside `basic/` + `orders/` |

The site-helper file is named after the site/integration. Cross-flow utilities like `waitForCheckoutReady` (polls `.blockUI`, `.wc-block-components-spinner`, `.wc-block-components-checkout-place-order-button--loading`) live inside that site helper. Don't create `helpers/common.ts` unless two unrelated integrations share it.

If the project has no WC REST API usage, drop `helpers/wc-api.ts` entirely.

### Layer responsibilities

| Layer | Does | Does NOT |
|---|---|---|
| `types/test-config.ts` | Interfaces for TestConfig / SuiteVars / Result | Contain logic |
| `fixtures/index.ts` | Isolated browser contexts, video record + attach | Test logic / assertions |
| `helpers/<site>.ts` | Site selectors, popup handling, form fillers, classic/blocks branch, card data, billing constants, `waitForCheckoutReady` | Assertions / cross-flow nav |
| `helpers/flows.ts` | Orchestrate multi-step flows, return Result | Call `expect()` |
| `helpers/assertions.ts` | All `expect()` calls, branching on TestConfig + SuiteVars | Navigate / perform actions |
| `helpers/wc-api.ts` | REST clients (with retry), data fetchers, `getSuiteVars()` | Touch the browser |
| `specs/*.spec.ts` | Thin config → fetch SuiteVars in `beforeAll` → flow → assertions | Inline selectors / dup logic |

---

## Key patterns

**1. Config objects replace `vars` bags** — split into TestConfig (what THIS test does), SuiteVars (what the SITE has, fetched once via `getSuiteVars` in `beforeAll`), Result (data returned by a flow):
```typescript
// BAD                           // GOOD
const vars: Record<string,...>;  interface OrderConfig { user: 'guest'|'new'|'old'; product: ...; expectedStatus: 'Processing'|...; }
vars.product = 'variable';       interface OrderResult { orderNumber: string; payDate: string; order: { total: number; ... } }
                                 interface SuiteVars { title: string; blog: string; /* plugin versions, flags */ }
```

**2. Thin spec files** — config → flow → assertions, with `getSuiteVars()` in `beforeAll`:
```typescript
const config: OrderConfig = { /* ... */ };
let suiteVars: SuiteVars;
test.beforeAll(async () => { suiteVars = await getSuiteVars(); });
test('RM-PO-001 – place order', async ({ shopperPage, adminPage, emailPage }) => {
  const result = await runOrderFlow({ shopperPage, adminPage, emailPage }, config, suiteVars);
  await assertOrderDetails(result, config, suiteVars);
});
```
Without WC REST → drop `suiteVars` plumbing; spec becomes config → flow → assertions.

**3. Serial test chains** — `describe.serial` + `auth/chain-<project>-<id>.json` persistence + skip-guard so mid-chain tests run standalone. → **`templates/chain-state.ts`**.

**4. Replace `page.evaluate()` with locators** wherever a Playwright API works:
```typescript
// BAD: page.evaluate(() => !!document.querySelector('#popup'))
// GOOD: (await page.locator('#popup').count()) > 0
```
Keep `evaluate()` only when locators genuinely can't express it (complex DOM traversal, browser-only state).

**5. `playwright.config.ts`** — sequential by default (`fullyParallel: false`, `workers: 2`), generous timeouts (240s test, 15s expect), `trace`/`screenshot`/`video` always on, `slowMo: 250` for review. → **`templates/playwright.config.ts`**.

**6. `global-setup.ts`** — log in once, save `auth/admin.json`. Multisite logs in on parent host (cookie covers subsites under same host). → **`templates/global-setup.ts`**.

**7. Fixtures** — three pages (shopper / admin / email), `recordVideo` options bridged from `use.video`, video attached AFTER `ctx.close()` so `video.path()` resolves. → **`templates/fixtures.ts`** (includes the lazy-page Proxy; see rule 13).

**8. WC e2e-utils + REST clients** — use the library instead of hand-rolling. → **`templates/wc-api.ts`** (lazy `createClient`, retry Proxy, `WC_API_PATH`/`WP_API_PATH` constants), **`templates/woocommerce__e2e-utils-playwright.d.ts`** (ambient declaration — required, package ships JS only).

Migration gotchas when swapping a hand-rolled `fetch` client to `createClient`:
- **Lazy construction.** `createClient` throws at construction if creds are empty — wrap in `function wpClient() { if (!_c) _c = createClient(...); return _c; }` so import-time typecheck works.
- **No `/wp-json/`** in your paths — library appends it. Use `WC_API_PATH` (`wc/v3`), `WP_API_PATH` (`wp/v2`), or unprefixed strings (`'custom/v1/get-log'`).
- **Axios-shaped responses** — read via `.data`, not as the body directly.
- **Query params as object** — `client.get(path, { status: 'failed' })`. Don't manually build query strings.
- **No `patch`** on the returned client. Retry Proxy whitelists `['get', 'post', 'put', 'delete']` only.

**9. Classic vs blocks branch** — single `isBlockCheckout(page)` helper picks the path. Blocks uses `fillBillingCheckoutBlocks` / `fillShippingCheckoutBlocks` from e2e-utils; classic keeps hand-rolled selectors.

Blocks library quirks the helpers don't cover:
- **Email is OUTSIDE the address group** — fill it separately before calling the library.
- **Pick shipping vs billing group.** Physical → "Shipping address" group; virtual/downloadable → "Billing address" only. `await page.getByRole('group', { name: 'Shipping address' }).waitFor({ state: 'visible', timeout: 5_000 }).then(()=>true).catch(()=>false)` decides.
- **Short codes for state/country** — library passes value to a `<select>`, so `state: 'FL'`, `country: 'US'`. Keep both forms on `BillingDetails` (`shortState`/`shortCountry` for blocks, `state`/`country` for classic select2).
- **`address_2` is hidden behind `.wc-block-components-address-form__address_2-toggle`** — reveal then fill `#billing-address_2` / `#shipping-address_2` if needed.
- **Field map** — library accepts `{ firstName, lastName, address, city, state, zip, country, phone }`. Map your `BillingDetails` (don't pass `street`, `zipCode`, `shortState`, etc.).

**Cart helpers — pick the right one (or none).** `addAProductToCart(page, id)` goes via `/shop/?add-to-cart=ID`; `addOneOrMoreProductToCart(page, slug)` goes via `/product/{slug}`. If your existing flow uses `/checkout/?add-to-cart=ID` (lands directly on checkout), keep the hand-rolled helper — switching costs an extra `goto('checkout/')` and depends on a published shop page or accurate slug map.

---

## Refactoring rules

1. **Read ALL generated files first.** Map which generated helpers each spec calls before writing any code.
2. **Identify duplicated logic** in generated specs (cart/product/variation code repeated across tests) → extract into `helpers/<site>.ts` or `helpers/flows.ts`.
3. **Suite structure:**
   - Independent page-level tests → `specs/basic/`
   - Serial order flows (place → email → backend → refund) → `specs/orders/` with chain state.
4. **Site helpers go in `helpers/<site>.ts`** (named after project), not generic names. Examples: `closePopup`, `selectFirstAvailableVariation`, `fillCheckoutForm`, `fillCreditCard`.
5. **Don't over-abstract.** Helper called once → inline. Extract only at 2+ uses.
6. **Preserve test intent.** Every `expect()` in generated code lives on in `assertions.ts` — reorganised, not removed.
7. **Credentials in `.env` via `dotenv`** — never hardcoded.
8. **Cross-flow utilities** (`pageFullLoaded`, `blockUI`, `waitForCheckoutReady`) → inside `helpers/<site>.ts`. `helpers/common.ts` only when two unrelated integrations share it.
9. **Eliminate `Record<string, string>` vars bags** — typed fields on config / result objects.
10. **`package.json` `test:<area>` script per top-level spec folder you actually create.** Don't ship scripts pointing at folders that don't exist.
```json
{
  "scripts": {
    "test": "playwright test",
    "test:<area1>": "playwright test specs/<area1>",
    "setup:browsers": "playwright install chromium",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": { "@woocommerce/e2e-utils-playwright": "^0.4.0", "dotenv": "^16.0.0" },
  "devDependencies": { "@playwright/test": "^1.59.1", "@types/node": "^20.0.0", "typescript": "^5.0.0" }
}
```
11. **Multi-region (au/ca/us)** — region as outermost dimension. Per-region SuiteVars from per-region API. Per-region constants in a typed map (`regionConfig: Record<'au'|'ca'|'us', { currency, taxRate, ... }>`) inside the site helper.
12. **WP multisite — subsite-per-project (payoneer pattern):** each subsite is a Playwright project; `baseURL` ends with subsite path + trailing slash. **Never use leading `/`** in `page.goto` — strips subsite path. Always relative (`'cart/'`, `'wp-admin/'`, `'./'`). Refund/destructive specs run on a single project (`REFUND_PROJECT` env) — replicating across all 4 wastes time. Admin user must exist on EACH subsite (network-add or per-subsite User → Add Existing) — admin AJAX rejects users not registered to subsite.
```typescript
projects: [
  { name: 'embedded-classic', use: { ...devices['Desktop Chrome'], baseURL: `${MULTI_HOST}/embedded-classic/` },
    testMatch: ['cc/embedded.spec.ts', ...(REFUND_PROJECT === 'embedded-classic' ? ['refund/refund.spec.ts'] : [])] },
  { name: 'embedded-block', use: { ...devices['Desktop Chrome'], baseURL: `${MULTI_HOST}/embedded-block/` }, testMatch: ['cc/embedded.spec.ts'] },
  // ...
]
```
13. **Lazy-init fixtures** — `adminPage` / `emailPage` aren't used by every test. Wrap in a Proxy that initialises on first async call; after init, sync methods (`locator`, `getByRole`) MUST `.bind(page)` or `.first()` errors with "is not a function". `shopperPage` stays eager. → **`templates/fixtures.ts`** has the pattern.
14. **Email assertions via SAU/CAL Email Redirect To Playgrounds plugin** — runs through `page.evaluate()` (WPEngine WAF blocks non-browser POSTs to `admin-ajax.php`). Plugin must be active per-subsite, admin user added to each subsite. Filter by site title for parallel safety. → **`templates/playgrounds-email.ts`**. After viewing `mail.playgrounds.saucal.io/...` navigate back to subsite root before next call (different host strips `ajax_object`).
15. **Iframe chain selectors** — CSS doesn't cross iframes. Chain `frameLocator()` per nesting level:
```typescript
await page
  .frameLocator('iframe[name^="__privateStripeFrame"]')
  .frameLocator('#challengeFrame')
  .locator('button[type="submit"]')
  .click();
```
16. **Order-note assertions — scan all + regex match.** Plugins reorder/insert notes; `nth-of-type` selectors break across environments. → **`templates/order-notes.ts`**.
17. **`force: true` audit.** Default to no `force`. Justified for: non-interactive elements with JS click handlers (`td`, `tr.shipping > td.line_cost`), fallback radios hidden behind labels (click input not label), WC Blocks place-order button briefly covered by `.blockUI`. Remove `force` from any click on a real button/link/input.
18. **Guest users have no My Account — guard early.** WC `my-account/view-order/` redirects guests to login. Guard at top: `if (config.user === 'guest') return;` Don't rely on a generic page-text check that silently passes on the login page.
19. **Every `expect(...)` carries a message.** Use the second-arg form for both value and locator forms; embed dynamic data:
```typescript
expect(order.total, 'REST order total should match captured total').toBe(stripCurrency(result.total));
await expect(adminPage.locator('#select2-order_status-container').first(),
  `admin order status should show "${config.expectedStatus}"`).toContainText(config.expectedStatus);
expect(notes.some((n) => pattern.test(n)),
  `expected note matching ${pattern}\nnotes:\n${notes.join('\n---\n')}`).toBeTruthy();
```
- Phrase as expected behaviour ("status should be Refunded after a full refund"), not "expect status".
- Embed dynamic data — orderNumber, expectedStatus, row index, what the locator targets.
- Lint check: `grep -nE "expect\([^,]+\)\." helpers/assertions.ts` should return zero — every single-arg `expect(arg).x(...)` has at least one comma in args.

20. **Comment for dev/QA clarity, not narration.**
- **File header** on every `helpers/*.ts`, `fixtures/index.ts`, spec file: what this file is for, who consumes it, the non-obvious design rule (e.g. "orchestration only — DOM in `<site>.ts`, REST in `wc-api.ts`, every `expect()` in `assertions.ts`").
- **Per-public-function JSDoc**: one-sentence summary + non-self-evident inputs/outputs (`returns undefined if X — callers treat as 'no value available'`) + side effects (`lands on /checkout/`) + numbered steps for orchestrators.
- **Inline comments only for non-obvious WHY**: why a wait is needed, why `force: true` is justified, why a particular DOM shape is targeted, why a value is converted (`blocks state field expects ISO short code`). Cross-reference plugin/library when behaviour leaks (`see @woocommerce/e2e-utils-playwright/src/checkout.js`).
- **Don't comment** restating well-named code, bare TODOs without owner/expiry, decorative banners with no info.

---

## Output format

Each file with full path and complete contents — no placeholders or `// ...existing code...`. Generate in this order:

1. `package.json`
2. `tsconfig.json`
3. `.env.example` / `.gitignore`
4. `playwright.config.ts` (← `templates/playwright.config.ts`)
5. `global-setup.ts` (← `templates/global-setup.ts`)
6. `types/test-config.ts` + `types/woocommerce__e2e-utils-playwright.d.ts` (← template)
7. `fixtures/index.ts` (← `templates/fixtures.ts`)
8. `helpers/<site>.ts` — site-specific selectors, card data, billing constants, classic/blocks branch, `waitForCheckoutReady`
9. `helpers/wc-api.ts` (← `templates/wc-api.ts`; OMIT if no REST usage)
10. `helpers/flows.ts` — high-level orchestrators returning Result objects
11. `helpers/assertions.ts` — all `expect()`, branching on TestConfig + SuiteVars
12. Spec files under `specs/<feature-area>/`

---

## What NOT to do

- Don't invent test cases not in generated code.
- Don't remove assertions — every `expect()` is preserved.
- Don't add error handling for impossible scenarios.
- Don't abstract one-time operations.
- Don't hardcode credentials or URLs.
- Don't use `page.evaluate()` when a locator works.
- Don't leave `Record<string, string>` vars bags.
