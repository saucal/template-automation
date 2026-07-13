# Refactor WooCommerce Automation Project

Refactor a WooCommerce Ghost Inspector migration project into a clean, config-driven Playwright test suite following the architecture established in the bluesnap-automation reference project.

**Templates referenced below live under `prompts/templates/`** — copy them into the new project and adapt rather than re-deriving from prose.

## Before you start — read the docs

- **`docs/migration-playbook.md`** — lessons that turn multi-iteration debugging into first-try wins (the one-time GI → Playwright build).
- **`docs/maintenance-cycle.md`** — the steady-state loop AFTER migration: run, triage drift, keep green without masking regressions. Read it before any maintenance-window work; it owns the drift-triage decision tree + `@plugin` coverage tags.
- **`docs/locator-fallback-strategy.md`** — the resilient-wrapper tiered-fallback design (rule 23).

The essentials:

- **GI export is the SOURCE OF TRUTH — dump the test JSON, don't guess.** Read the actual GI step list for selectors/flow (refund qty-fill, `selectFirstAvailableVariation`, set-password flow). The migrated TS is a lossy derivative.
- **Live-explore the real site first** (playwright-cli) — the GI export's selectors have drifted. Pair the JSON dump with live DOM confirmation (it catches no-`bdi` price markup, pickup-label-not-price, reCAPTCHA, real product prices) before writing code.
- **Triage GI tests, don't 1:1 port** — nav/screenshot → one data-driven visual spec; duplicates → skip; genuinely-new → build.
- **Real events, never eval** — `el.value=…; dispatch('change')` won't trigger WC `update_checkout`/variations/composite validity; use Playwright `selectOption`/`fill`/`check`.
- **Cart/checkout AJAX races** — `.blockUI` intercepts clicks (navigate remove-URLs instead); wait for a positive signal (recalc landed), not just "overlay hidden".
- **Money/text DOM is messy** — currency symbol in its own span, thousands commas, double-spaced labels, `<del>list</del><ins>discount</ins>`, discount-as-fee, select2 hidden natives, a "money" field that's actually a shipping-method label, pricing plugins that drop `bdi`, `$0`/"price on request" products → normalize + capture the right node, compare as money only when numeric.
- **Capture-once parity + 3-context fixture + resilient wrapper + Mailpit email + unique per-run data** — see the playbook for each.

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
| `helpers/assertions.ts` | Default home for `expect()` calls, branching on TestConfig + SuiteVars (feature-cohesive asserts may live as named `assert*` in their feature helper — rule 6) | Navigate / perform actions |
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

**Place-order parity matrix (MANDATORY for EVERY place-order test).** Capture the
core facts ONCE during the flow (order-received), then assert the SAME captured
values on every surface that renders them — never hardcode, never assert only one
surface:

| Surface | Totals (subtotal · shipping · tax · total) | Billing address | Payment method | Gateway order note |
|---|---|---|---|---|
| Thank-you (order-received) | ✓ | ✓ | ✓ | — |
| My Account (view-order) | ✓ | ✓ | ✓ | — |
| Order email (Mailpit) | ✓ | ✓ | ✓ | — |
| Admin order editor | ✓ | ✓ | ✓ (`Payment via <Method>` meta) | ✓ (scan-all + regex, rule 16) |

- **Totals** — share one `expectMoney` that SKIPS rows legitimately absent on a
  surface (AU inclusive-tax has no Tax row; free shipping has no amount) instead of
  asserting `$0`/`NaN`. Don't assert a row that doesn't exist on that surface.
- **Address** — assert the stable parts only (name + street + city + postcode); skip
  state/country (long vs short form differs per surface). The thank-you assert is
  sync over the capture, so capture the order-received address block into the Result.
- **Payment method** — the customer-facing label on thank-you / My Account / email;
  the `Payment via <Method>` meta line on admin (plus the gateway note, rules 16, 21).
- A surface that genuinely doesn't render a fact (some themes omit payment method on
  view-order) is the ONLY reason to drop that cell — record it in the ledger, don't
  silently skip. Never weaken or × a value to paper over a real bug (see "Don't
  weaken assertions"); a cross-surface mismatch is a finding, not a test defect.

**Subscriptions — RECURRING totals too (MANDATORY).** A subscription order has TWO
totals: the FIRST payment (often includes a one-off sign-up fee) AND the per-renewal
RECURRING total. Assert BOTH — the recurring total is the whole point of a
subscription, so reviewing only the order total misses regressions in renewal pricing.
- **Capture the recurring total separately** from the first-payment total. WooCommerce
  renders them in distinct ways and a generic "read the totals table" will silently
  grab the wrong one: the CART marks recurring rows with the `recurring-total` class
  (a separate section), while the subscription ORDER-RECEIVED page often renders a
  single "Subscription totals" table whose Total IS the recurring `$X / period`, with
  the first payment only in the related-orders row. Branch your totals reader on the
  `recurring-total` class and fall back to the subscription-totals table.
- **Assert recurring on every surface that shows it** — thank-you / My Account
  view-subscription / email / the admin **subscription** editor (its recurring total,
  unconditionally — don't `if (found)`-skip). Compare the admin recurring total against
  the captured *recurring* total, NOT the first-payment total.
- **Region tax model still applies** — recurring consistency is `recurring total =
  recurring subtotal + recurring shipping` for tax-INCLUSIVE regions (AU); add
  `+ recurring tax` for tax-EXCLUSIVE regions (CA/US).

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
- **Silence the bogus "Basic Auth over HTTP" warning.** Library checks `baseURL.startsWith('http')` to decide whether to warn — that prefix matches `https://...` too, so the warning fires on every non-localhost URL even when traffic is encrypted. Filter just that substring at module init: `console.warn = (...a) => { if (typeof a[0] === 'string' && a[0].includes('Basic Auth over HTTP')) return; orig(...a); }`.

**9. Classic vs blocks branch** — single `isBlockCheckout(page)` helper picks the path. Blocks uses `fillBillingCheckoutBlocks` / `fillShippingCheckoutBlocks` from e2e-utils; classic keeps hand-rolled selectors.

Blocks library quirks the helpers don't cover:
- **Email is OUTSIDE the address group** — fill it separately before calling the library.
- **Pick shipping vs billing group.** Physical → "Shipping address" group; virtual/downloadable → "Billing address" only. `await page.getByRole('group', { name: 'Shipping address' }).waitFor({ state: 'visible', timeout: 5_000 }).then(()=>true).catch(()=>false)` decides.
- **Short codes for state/country** — library passes value to a `<select>`, so `state: 'FL'`, `country: 'US'`. Keep both forms on `BillingDetails` (`shortState`/`shortCountry` for blocks, `state`/`country` for classic select2).
- **`address_2` is hidden behind `.wc-block-components-address-form__address_2-toggle`** — reveal then fill `#billing-address_2` / `#shipping-address_2` if needed.
- **Field map** — library accepts `{ firstName, lastName, address, city, state, zip, country, phone }`. Map your `BillingDetails` (don't pass `street`, `zipCode`, `shortState`, etc.).
- **Create-account password input is lazy.** Clicking the "Create an account?" checkbox reveals the password field — selector returns 0 elements before the click, so the next `.fill()` times out without a `waitFor`. Prefer a label-based selector (`page.getByLabel('Password', { exact: true })`) with a class fallback (`div.wc-block-components-address-form__password > input`), then `await password.first().waitFor({ state: 'visible', timeout: 15_000 })` before filling. Apply the same pattern (label-or-class) to the create-account checkbox itself — theme/plugin overrides change the wrapper class.

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
6. **Preserve test intent — `expect()` lives in `assertions.ts` OR a named `assert*` helper, NEVER inline in a spec.** Every `expect()` from generated code lives on (reorganised, not removed). Default home is `helpers/assertions.ts`. A **feature-cohesive** check may instead live in a named `assert*` function co-located with its feature flow (`assertMyAccountTabs` in `account.ts`; klaviyo / contractor checks) — this is the ONLY allowed exception and matches the reference suites (bluesnap keeps the bulk in `assertions.ts` but a handful sit in `bluesnap.ts`). Specs stay assertion-free: they call flows + `assert*` helpers, never raw `expect()`. The single spec-level exception is `toHaveScreenshot` in a visual spec. Lint: `grep -rnE "expect\(" specs` should return only `toHaveScreenshot` lines.
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
  "devDependencies": {
    "@babel/runtime": "^7.29.2",
    "@playwright/test": "^1.59.1",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```
**`@babel/runtime` is required.** `@woocommerce/e2e-utils-playwright` is built with Babel and emits `require('@babel/runtime/helpers/...')` calls (e.g. `interopRequireDefault`). The package declares it as a runtime dep but the version pin is loose; if it isn't resolvable in the consumer project the first call into the library throws `Cannot find module '@babel/runtime/helpers/...'` at test time. Pin it explicitly in `devDependencies`.
11. **Multi-region (au/ca/us)** — region as outermost dimension. Per-region SuiteVars from per-region API. Per-region constants in a typed map (`regionConfig: Record<'au'|'ca'|'us', { currency, taxRate, ... }>`) inside the site helper. **Entity IDs drift per subsite** — product/term/page IDs are NOT shared across regional subsites (no-pong: the 85g product was `1684403` on AU but `750731` on CA). Confirm every hardcoded ID live on each region; a copied ID silently adds the wrong product or 404s. Keep IDs in the per-region `regionConfig` map, never a single shared constant.
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
14. **Email assertions via SAU/CAL Email Redirect To Playgrounds plugin** — runs through `page.evaluate()` (WPEngine WAF blocks non-browser POSTs to `admin-ajax.php`). Plugin must be active per-subsite, admin user added to each subsite. Filter by site title for parallel safety. → **`templates/playgrounds-email.ts`**. After viewing `mail.playgrounds.saucal.io/...` navigate back to subsite root before next call (different host strips `ajax_object`). **ESP relays lag AND reorder.** When a site sends through a real ESP (SendGrid etc. — tracker-link rewriting, e.g. `url….com/ls/click`) instead of a local trap, delivery is delayed and out-of-order: widen the email poll window (no-pong needed 60s→120s) and never assume `messages[0]` is the one you just triggered — resolve by subject + recency (see rule 30, Mailpit newest-first).
15. **Iframe chain selectors** — CSS doesn't cross iframes. Chain `frameLocator()` per nesting level:
```typescript
await page
  .frameLocator('iframe[name^="__privateStripeFrame"]')
  .frameLocator('#challengeFrame')
  .locator('button[type="submit"]')
  .click();
```
**PayPal PPCP is a popup, not just an iframe — and it's expensive to maintain.** The Smart Button lives in a cross-origin SDK iframe (scan `page.frames()` for `getByRole('link',{name:/pay with paypal/i})` / `[data-funding-source="paypal"]`); clicking it opens a sandbox POPUP that starts at `about:blank` then navigates to `sandbox.paypal.com` — WAIT for it to leave `about:blank` before driving it. Login/approve varies screen-to-screen, so drive it with a resilient LOOP (each tick: fill visible email/pass, click first of Next → Log In → the review Pay CTA). The review SUBMIT is `#one-time-cta` (text "Pay"), NOT the "Pay in full" funding tile (`id-pay-in-full-action`, a checkbox that only selects funding). Because it's this fragile, treat PayPal as **optional per region**: keep it on ONE reference region and DROP it from low-value regions (no-pong keeps PayPal on AU, dropped it from US) — pruning a high-maintenance flow is a valid migration decision, not a coverage gap. → **`templates/paypal-ppcp.ts`** is the copy-paste-ready `payWithPayPal(page, {user, pass})` implementing this exact flow (frame scan → popup about:blank wait → resilient login loop → `#one-time-cta`). Env `PAY_PAL_USER`/`PAY_PAL_PASS`.
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

21. **Classic vs block checkout — copy and DOM diverge; branch the assertion.** Applies to every project that touches WC checkout — payment-gateway suites (bluesnap, mastercard, payoneer) AND full-site maintenance projects (repurposedmaterials, no-pong). The same plugin / theme / page can render different output per checkout style. Two families to handle:

- **Multi-line notice / banner text.** Classic templates render `<ul>` lists where each line is its own `<li>` — `textContent` puts a real `\n` between them. Blocks renders a single container that concatenates the lines with no separator. `toHaveText('Line A\nLine B')` only passes against classic. Use `toContainText` per line:
```typescript
const notice = page.locator('.woocommerce-error')
  .or(page.locator('div.wc-block-store-notice.is-error > div > div')).first();
await expect(notice, 'should display the headline').toContainText('Headline');
await expect(notice, 'should display the body line').toContainText('Detailed instruction');
```

- **Order-note / system-message copy differs.** Same plugin / theme can emit different note text on classic vs blocks (gateway example: classic emits `Payment via <Method> (<txid>).`, blocks emits `Payment complete.`; coupon / shipping / email plugins show similar splits). When the structured info is also exposed elsewhere (admin meta box, WC REST, email body), assert that for parity and branch the note-text assertion on `suiteVars.blog.includes('block')` (or however the project labels its block subsite).

**Don't weaken assertions to paper over real bugs.** If a value goes missing because of an async race (webhook hasn't fired yet, transient meta, plugin hook ordering), keep the strict assertion — let the test surface the bug. Add a wait / polling helper, raise the issue with the plugin maintainer, or split the assertion into "fast path" (synchronous DOM) + "eventual" (REST polled with timeout). Loosening a substring match to hide an empty `${chargeId}` (or any other empty plugin output) costs you the next regression.

The unifying rule: prefer **per-line `toContainText`** over `toHaveText` for any text with more than one logical line, and **branch assertions on classic vs block** whenever a plugin / theme's user-facing copy isn't identical between the two.

22. **Maintenance projects — warn (don't fail) when Tax or Shipping is missing OR $0.** On full-site maintenance suites (repurposedmaterials, no-pong, etc.) it is sometimes legitimate to ship a checkout with no tax line (digital-only catalog, tax-exempt region) or no shipping line (virtual products only, free-shipping zone covering the test address). On other sites the absence — or a present-but-`$0` value — is a real config regression: a tax class got unassigned, a shipping zone was deleted, a rate got zeroed, a product type got switched. Treat tax and shipping as **expected-by-default**: warn on both the missing-row case and the `$0` case.

Don't hard-fail. Detect and emit a `console.warn` so the test still runs, the report flags the situation, and QA reviews whether it is expected for that site. **`Free` shipping is an acceptable configured value — do NOT warn on it; only warn when shipping is missing or literally `$0.00`.**

```typescript
// helpers/<site>.ts (or assertions.ts) — call after the cart/checkout totals settle
// Strip currency/whitespace → number. "Free" → NaN (acceptable, not zero). Empty/missing handled by caller.
function isZeroAmount(text: string): boolean {
  const n = parseFloat((text || '').replace(/[^0-9.-]/g, ''));
  return !Number.isNaN(n) && n === 0; // "Free" → NaN → false (don't treat as zero)
}

export async function warnIfNoTaxOrShipping(page: Page, ctx: { testId: string }): Promise<void> {
  const tax = page.locator('tr.tax-rate, tr.fee.tax, .wc-block-components-totals-taxes');
  const shipping = page.locator('tr.shipping, .wc-block-components-totals-shipping');

  const taxMissing = (await tax.count()) === 0;
  const shipMissing = (await shipping.count()) === 0;
  const taxZero = !taxMissing && isZeroAmount(await tax.first().innerText());
  // "Free" reads as NaN → not zero → no warning (a configured free-shipping method is valid)
  const shipZero = !shipMissing && isZeroAmount(await shipping.first().innerText());

  if (taxMissing) {
    console.warn(`[${ctx.testId}] no Tax row found at checkout — verify tax classes / region for this site`);
  } else if (taxZero) {
    console.warn(`[${ctx.testId}] Tax row is $0 — verify tax is configured for this site`);
  }
  if (shipMissing) {
    console.warn(`[${ctx.testId}] no Shipping row found at checkout — verify shipping zones / product types for this site`);
  } else if (shipZero) {
    console.warn(`[${ctx.testId}] Shipping row is $0 — verify shipping is configured (a "Free" method is fine; literal $0.00 is suspect)`);
  }
}
```

When the suite expects tax/shipping for a specific test (e.g. `runRefundFlow` reading `seed.shippingTotal` / `seed.shippingTax` to reverse the shipping line), promote the missing-row case to a hard `expect(...)` with a message so the failure points at the config, not the refund code:

```typescript
expect(
  Number(seed.shippingTotal),
  `[${config.testId}] expected a non-zero shipping_total on the order — site has no shipping configured`
).toBeGreaterThan(0);
```

Tax-rate-dependent calculations (partial refund splits, line-tax assertions) must derive the rate from the order itself (`order.shipping_tax / order.shipping_total`, or `line.total_tax / line.total`) rather than hard-coding a percentage — sites under maintenance can have any rate from 0% upwards, including changes between runs.

23. **Resilient locators — tiered fallback per action AND assertion (pure Playwright first, Stagehand last).** Maintenance-cycle suites must survive selector drift. Wrap every action and assertion in a tiered fallback. Stagehand AI is the **last resort only** — the primary path stays pure Playwright (fast, free, deterministic; if the suite already passes on Playwright, Stagehand is drift insurance, not the driver).

**General elements** (Playwright official locator priority, most→least resilient):
1. **Primary — ARIA/role:** `getByRole(role, { name })`, `getByLabel(...)`.
2. **Fallback 1 — text/CSS:** a *different* Playwright strategy: `getByText`/`getByPlaceholder` or a stable CSS/`.or()` locator.
3. **Fallback 2 — Stagehand AI:** `stagehand.act("<NL instruction>", { page })` for actions; `stagehand.extract(instruction, zodSchema, { page })` for reads/assertions.

**Stable selectors** (stable IDs/names — checkout `#billing_*`/`#shipping_*`, `#place_order`, `#terms`, product variation selects): **skip Fallback 1**, use primary ID → **Stagehand-only** fallback. No value in a second CSS guess when the ID is stable.

**Stagehand setup** (per-project, shared util): `new Stagehand({ env: 'LOCAL', model: { modelName: 'anthropic/claude-sonnet-4-6', apiKey: process.env.ANTHROPIC_API_KEY }, selfHeal: true })` → `chromium.connectOverCDP({ wsEndpoint: stagehand.connectURL() })`, bridging `testInfo.project.use` into context options. (v3: use `model`, NOT top-level `modelName`/`modelClientOptions` — those are ignored and Stagehand silently defaults to OpenAI. No `enableCaching` option.) Prefer `observe()`→`act(action)` for reused steps (no LLM on the act); raw `act("NL")` is fine for the rare fallback path. Deps: `@browserbasehq/stagehand`, `playwright-core`, `zod`; env `ANTHROPIC_API_KEY`.

Build a shared wrapper so specs/helpers call `resilientClick/Fill/Select/Check/Text({ primary, alt?, ai })` (omit `alt` for stable-selector → Stagehand-only). Each tier in try/catch; on final failure throw the original error with all tiers logged. Keep return/capture shapes identical so flow/assertion logic is unchanged. → reference design **`docs/locator-fallback-strategy.md`**.

**MANDATORY when refactoring: route EVERY action and assertion through the resilient wrapper.** In `helpers/*` and specs, do not call raw `page.locator(...).click()/.fill()/.selectOption()/.check()` or `expect(locator)` for content — use `resilientClick/Fill/Select/Check` for actions and `resilientText` (then assert on the returned string) for reads/assertions. `ai` is a NOUN phrase naming the element ("the Add to cart button", "the order total"); the wrapper composes the verb. The ONLY allowed raw calls: navigation/waits (`goto`, `waitForLoadState`, `waitFor`), `setInputFiles` (no wrapper for uploads), and genuinely custom JS interactions (e.g. clicking a plugin-injected `<a>` via `page.evaluate`). Build the helper at `helpers/resilient.ts` + wire it into fixtures via a worker-global `setActiveStagehand`/`ctxFor(page)` so helpers keep their `(page)` signatures. → reference implementation **`helpers/resilient.ts`** + **`fixtures/index.ts`**.

24. **Visual-regression — trigger lazy-load before every `toHaveScreenshot`.** `fullPage: true` resizes the viewport to content height but does NOT fire the scroll/intersection events lazy-loaded images (`loading="lazy"`, IntersectionObserver galleries) wait on — below-fold images capture blank or inconsistent, so baselines flake. Before each shot: step-scroll to the bottom (≈viewport-height increments, brief pause each step), await decode of every `<img>` (`document.images` where `!img.complete`), then scroll back to top. **BOUND every wait or the test hangs forever:** race each image's `load`/`error` against a `setTimeout(done, 3000)` — a lazy placeholder with empty/unassigned src stays `!complete` and fires neither event, so an unbounded `Promise.all` never resolves. Likewise give `waitForLoadState('networkidle', { timeout })` an explicit timeout + `.catch` — chat/analytics sockets mean idle may never arrive. Keep masking dynamic content (prices/dates) so baselines track LAYOUT, not value drift.

25. **Failure screenshots — disable the built-in (`screenshot: 'off'`); the fixture owns the named per-context shot.** The test runner instruments the shared `chromium` browserType, so Playwright's built-in screenshot-on-failure DOES fire on manually-created contexts (the same reason a fixture `ctx.tracing.start` can throw "already started") — it attaches a generic `screenshot.png` that duplicates the fixture's named `shopperPage.png`/`adminPage.png`. Set `screenshot: 'off'` in `playwright.config.ts` and make the fixture's `finishContext` capture a full-page shot gated on failure DIRECTLY (`testInfo.status !== testInfo.expectedStatus`), not on the config `screenshot` key. One named screenshot per context, no duplicate. (`screenshot: 'on'` in config may still force a shot every test if desired.)

26. **Validation / error-message assertions — match field token + intent, not exact label copy.** WooCommerce/checkout plugins (wfacp etc.) reword field labels without changing meaning ("Country" → "Country / Region", "Town / City" → "City", "State / County" → "State / Province"). Asserting the literal string `'Country is a required field.'` breaks on every copy tweak — a false failure, not a real bug. Match on the distinctive field token + the intent keyword via regex (`/Country\b.*required/i`, `/(State|County|Region|Province)\b.*required/i`), keeping a human-readable `label` for the failure message. Same principle for any plugin-rendered notice whose wording is not contractually stable.

27. **Refund / void flow — fill the refund form before submitting; note + post-status are gateway-specific, make them config-driven.** The admin gateway refund button is a silent no-op at $0 — WC computes the refund amount from the form, which starts empty. Before clicking the gateway refund button: copy each line item's ordered qty → `input.refund_order_item_qty` (WC auto-fills line totals on the `change` event), and copy fee/shipping `.view` amounts → `tr.fee` / `tr.shipping … input.refund_line_total` / `refund_line_tax`. **Poll the computed refund amount `> 0` before submitting** — a silent $0 refund leaves no gateway note and the assertion then fails on a *missing* note (misleading). Refund parity differs per gateway for the SAME GI step: a refund-capable gateway emits `<Gateway> Refund …` and the order goes **Refunded**; a gateway that voids the same-day auth emits `<Gateway> … Void … approved` and the order goes **Cancelled**. Drive the note regex + post-refund status off config (`OrderConfig.refundNotePattern`, `OrderConfig.refundedStatus`), never hardcode — see `specs/orders/place-order-composite.spec.ts`. Reverse line splits from the order itself (rule 22), not a hardcoded rate.

28. **Account-creation flows — passwordless verify-email + "logged user" = the SAME account, not admin.** Registration and checkout create-account can be **passwordless**: the form is email-only ("a link to set a new password will be sent"). Flow: register → fetch the "account has been created" email → follow the "set your new password" link → set `#password_1`/`#password_2` (this verifies the email AND logs the user in). It's the same set-password page as forgot-password — share one helper. Watch for **reCAPTCHA** on the standalone register form (a raw submit may be blocked). When a GI test reuses "the logged-in user" across orders, that means the **same account from the prior order**, not admin — its saved address prefills checkout. Playwright equivalent without the email round-trip: in a `describe.serial` block, save the new user's cookies (`context().storageState().cookies`) after order 1 and `addCookies` them in the logged-user test; drive identity off the reused account email (`OrderConfig.accountEmail`), not a per-test address. Contractor/role registration with a file upload (EIN/company/license) keeps a committed placeholder fixture under `tests/fixtures/` — see `helpers/contractor.ts`; don't delete it.

30. **STRICT: Navigate via customer clicks — never `page.goto()` to cart or checkout.** Customers change URLs by clicking, not typing. Every navigation from add-to-cart → cart → checkout MUST follow the real click path:
    - **To cart:** click the header cart icon/button → wait for mini-cart to expand → click "View cart" (or equivalent). Never `page.goto('cart/')`.
    - **To checkout:** click "Proceed to checkout" on the cart page. Never `page.goto('checkout/')` or any `check-out/?...` URL.
    - Implement `goToCart(page)` and `proceedToCheckout(page)` helpers (or site-equivalent names) in `helpers/<site>.ts`. `fillCheckoutAddress` must call them instead of `goto`.
    - `page.goto()` is only allowed for: initial home/priming visit, direct product add-to-cart links (`?add-to-cart=ID`), admin/backend pages, and email/Mailpit. Nowhere else in the customer flow.
    - Why: click navigation exercises the mini-cart, cart totals, and redirect logic that URL-only navigation silently skips — these are real regression surfaces.

29. **Every `test.describe` declares `@plugin` coverage tags.** Native Playwright tags name which WP plugins the spec exercises: `test.describe('…', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-composite-products'] }, () => { … })`. Slugs MUST be the WP plugin-folder slugs (anchored to a leading alphanumeric) so the maintenance `coverage-check` step can map an updated plugin → its tests. `npm run lint:plugin-tags` fails CI on any untagged spec; `npm run coverage:manifest` regenerates `coverage-manifest.json`; `npm run coverage:gaps` writes the gap list. A maintenance run filters to changed plugins via `--grep "@plugin:woocommerce|@plugin:kadence"`.

30. **Silent-failure checklist — check these FIRST when a test fails for no obvious reason.**
- **Wrong credential env key.** Login using `PASSWORD` when global-setup reads `ADMIN_PASS` (or vice-versa) fails silently at auth. Confirm the exact key global-setup reads.
- **UI-mode title edit orphans the test.** Editing a spec title in Playwright **UI mode** mid-run leaves a 0.0ms spinner that never resolves — run from the CLI to triage.
- **Mailpit search is newest-first.** When two same-subject emails land in one inbox (order 1 + order 2 on a reused account), `messages[0]` is the LATEST — order your assertions so each resolves the right message.
- **`$0` / "price on request" products** pass a naive `<= max` price picker and break price parity — require `p > 0` in the picker.

31. **Facade, not widget — assert the lazy-embed placeholder, don't force-load it.** Lazy media/embed blocks (YouTube/Vimeo, maps, chat, "consent-gated" video) render a THUMBNAIL + a play/activate `<button>` and only mount the real cross-origin `<iframe>` after a click. Asserting the mounted iframe (`iframe[src*="youtube.com/embed"]`) fails because it never exists until interaction. Assert the FACADE's presence instead — it proves the embed is configured — and accept either form: `page.locator('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]').or(page.getByRole('button', { name: /youtube video/i }))`. Don't click through to load the heavy, flaky cross-origin frame just to satisfy an "embed exists" check (no-pong FAQ, GI 12). This is distinct from rule 24 (lazy *images* in visual specs).

32. **Auth strategy scales with host count — single host uses `global-setup`, multi-host/region uses lazy per-site auth.** Rule 6's `global-setup.ts` (log in once → `auth/admin.json`) is correct for one host (incl. a multisite whose subsites share the parent cookie). But when regions live on SEPARATE hosts (no-pong AU = `no-pong-au…`, US = `no-pong-america…`), a single global-setup either logs into all N hosts every run or covers only one. Drop global-setup and authenticate LAZILY per host: an `ensureAdminState(project, baseURL)` called on first `adminPage`/`emailPage` use logs into THIS project's host only if `auth/admin-<project>.json` is missing (cross-worker `.lock`), so you only authenticate the site you actually run. Do NOT use a setup-project dependency for this — it surfaces a fake "authenticate" entry as a test in the runner.

33. **Reuse the polling login helper; know which forms arm on blur.** Never hand-roll a login with a blind `waitForTimeout` — reuse one `loginAccount`-style helper that POLLS for a success signal (`expect(.woocommerce-MyAccount-navigation).toBeVisible`). Gotcha that costs a silent no-op: some REGISTER forms arm their submit button on the password field's `blur` event, so a submit-without-blur first click does nothing (no-pong `#reg_password`). The LOGIN form usually doesn't need the blur because the helper polls. Add to the rule-30 silent-failure checklist: a login/register that "does nothing on click" is probably missing a blur, not broken selectors.

34. **Tier (preprod/develop/staging) is a Playwright PROJECT dimension, not an env var.** When a site has multiple deploy tiers, don't gate on a `TARGET_ENV` env var — that only ever surfaces ONE tier per run and hides the others from the runner. Make each region×tier its own project generated from a typed map (`REGIONS × TIERS → baseUrlFor(region, tier)`), e.g. `au-preprod`, `au-develop`, `ca-preprod`. You get two selectable lists in the VS Code Explorer and `--project=au-develop` on the CLI. **Consequence: visual baselines are per-project** — filenames carry the project (`home-au-develop-darwin.png`); regenerate per tier with `--update-snapshots`.

35. **Assert BEHAVIOUR and existence, not pinned indices / ids / names.** Broadens rule 26 beyond label copy to any data the GI export pinned to a specific value that drifts: GI pinned FAQ item #7, a specific YouTube video id, specific store-locator result names. Assert the behaviour or existence — "an accordion item expands its answer", "at least one answer embeds a video", "an in-range search returns a non-empty result list" — never the specific item, id, or name. Pinned data is a guaranteed future flake as content changes; the behaviour is the actual regression surface.

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

Do NOT generate the `README.md` here — it is a post-approval step (see Handoff).

---

## Handoff — after the user approves the suite

`template-automation` is the BUILD home, not the final home. Once the user has
APPROVED the working suite (specs reviewed / passing live), do these — each gated
on explicit user approval, in order:

1. **Write the suite `README.md`** (in the suite root) — only now, not during
   initial generation, so it documents the settled shape. Cover: the
   environments/projects and how to select them, setup (`npm install`,
   `setup:browsers`, the `.env` keys incl. the per-environment base URLs), run
   commands (per environment, per feature area, single spec, `--ui`, `show-report`,
   `typecheck`), the `specs/`/`helpers/` layout, and the site's load-bearing gotchas.
   Keep it practical and runnable.

2. **Move the executable suite into the project's OWN repo** (the site's codebase,
   e.g. `saucal/<project>`). **Ask the user for — or confirm — the project's main
   repo and local clone path** first. Then:
   - Create a dedicated branch off the repo's mainline — **`main` or `production`
     (confirm which)** — e.g. `playwright` / `migration/playwright`.
   - Copy ONLY the runnable Playwright project into a **`tests/`** folder (or the
     repo's existing test dir): `specs/`, `helpers/`, `fixtures/`, `types/`,
     `playwright.config.ts`, `tsconfig.json`, `package.json` (+ lockfile),
     `README.md`, `.env.example`, `admin-login.ts`, `docs/`.
   - **EXCLUDE** everything not needed to run: `node_modules/`, `generated/`, the
     raw GI JSON export folders, `auth/` / `reports/` / `test-results/`, the real
     `.env` (ship **`.env.example` only** — never secrets), and visual `*-snapshots/`.
   - It stays a self-contained nested project (own `package.json`/`node_modules`);
     Playwright runs from `tests/`. Push the branch — the suite now lives with the
     code under test. (Copy, don't delete from `template-automation`, unless the
     user asks; the migration branch is the build record.)

---

## What NOT to do

- Don't invent test cases not in generated code.
- Don't remove assertions — every `expect()` is preserved.
- Don't add error handling for impossible scenarios.
- Don't abstract one-time operations.
- Don't hardcode credentials or URLs.
- Don't use `page.evaluate()` when a locator works.
- Don't leave `Record<string, string>` vars bags.
