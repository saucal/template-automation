# Refactor WooCommerce Automation Project

Refactor a WooCommerce Ghost Inspector migration project into a clean, config-driven Playwright test suite following the architecture established in the bluesnap-automation reference project.

**Templates referenced below live under `prompts/templates/`** — copy them into the new project and adapt rather than re-deriving from prose. Every `→ templates/X.ts` pointer is a copy-paste-ready starting point.

## How to read this doc

Guidance is grouped by **phase / surface area**, not numbered — headings are stable slug anchors so cross-references survive edits. Each guideline is tagged with a severity:

| Tag | Meaning |
|---|---|
| **[MUST]** | Non-negotiable. A migration that violates it is wrong. |
| **[STRICT]** | Hard rule with a narrow, enumerated set of exceptions. |
| **[SHOULD]** | Strong default; deviate only with a stated reason. |
| **[WARN]** | Detect and `console.warn` — never hard-fail — so QA can review. |

Sections:
1. [Before you start](#before-you-start) · 2. [Inputs](#inputs) · 3. [Reference architecture](#reference-architecture) · 4. [Recon first](#recon-first) · 5. [Architecture & typing](#architecture--typing) · 6. [Fixtures & config](#fixtures--config) · 7. [Checkout mechanics](#checkout-mechanics) · 8. [Assertions & parity](#assertions--parity) · 9. [Resilience](#resilience) · 10. [Integrations](#integrations) · 11. [Multi-region / multi-env / multisite](#multi-region--multi-env--multisite) · 12. [Maintenance-suite specifics](#maintenance-suite-specifics) · 13. [Silent-failure checklist](#silent-failure-checklist) · 14. [Coverage self-audit](#coverage-self-audit) · 15. [Definition of done](#definition-of-done) · 16. [Output format](#output-format) · 17. [Handoff](#handoff) · 18. [What NOT to do](#what-not-to-do)

---

## Before you start

Read the docs first:

- **`docs/migration-playbook.md`** — lessons that turn multi-iteration debugging into first-try wins (the one-time GI → Playwright build).
- **`docs/maintenance-cycle.md`** — the steady-state loop AFTER migration: run, triage drift, keep green without masking regressions. Read it before any maintenance-window work; it owns the drift-triage decision tree + `@plugin` coverage tags.
- **`docs/locator-fallback-strategy.md`** — the resilient-wrapper tiered-fallback design (see [resilient-locators](#resilient-locators)).

The essentials (each expanded in a later section):

- **GI export is the SOURCE OF TRUTH — dump the test JSON, don't guess.** Read the actual GI step list for selectors/flow (refund qty-fill, `selectFirstAvailableVariation`, set-password flow). The migrated TS is a lossy derivative.
- **Live-explore the real site first** (playwright-cli) — the GI export's selectors have drifted. Pair the JSON dump with live DOM confirmation (it catches no-`bdi` price markup, pickup-label-not-price, reCAPTCHA, real product prices) before writing code.
- **Triage GI tests, don't 1:1 port** — nav/screenshot → one data-driven visual spec; duplicates → skip; genuinely-new → build.
- **Real events, never eval** — see [real-events](#real-events).
- **Cart/checkout AJAX races** — see [ajax-races](#ajax-races).
- **Money/text DOM is messy** — see [money-dom](#money-dom).
- **Capture-once parity + 3-context fixture + resilient wrapper + Mailpit email + unique per-run data** — see the playbook for each.

## Inputs

You must provide:

1. All generated spec files from `generated/specs/*.spec.ts`
2. All generated helper files from `generated/helpers/*.ts`
3. Project name (e.g. "repurposedmaterials", "no-pong") and BASE_URL.

---

## Reference architecture

```
<project-root>/
├── .env / .env.example / .gitignore   # .gitignore excludes specs/**/*-snapshots/ when CI records baselines
├── .github/workflows/playwright.yml   # → templates/playwright.yml (record on sync / compare on deploy)
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
│   ├── paypal.ts               # → templates/paypal-ppcp.ts (only if the suite pays with PPCP)
│   ├── klarna.ts               # → templates/klarna.ts      (only if the suite pays with Klarna)
│   ├── resilient.ts            # tiered-fallback action/assertion wrapper → templates/resilient-locators.ts
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
| `helpers/assertions.ts` | Default home for `expect()` calls, branching on TestConfig + SuiteVars (feature-cohesive asserts may live as named `assert*` in their feature helper — see [expect-home](#expect-home)) | Navigate / perform actions |
| `helpers/wc-api.ts` | REST clients (with retry), data fetchers, `getSuiteVars()` | Touch the browser |
| `specs/*.spec.ts` | Thin config → fetch SuiteVars in `beforeAll` → flow → assertions | Inline selectors / dup logic |

---

## Recon first

<a id="read-all-generated"></a>
**[MUST] read-all-generated — read ALL generated files first.** Map which generated helpers each spec calls before writing any code.

<a id="extract-duplicates"></a>
**[SHOULD] extract-duplicates — identify duplicated logic** in generated specs (cart/product/variation code repeated across tests) → extract into `helpers/<site>.ts` or `helpers/flows.ts`. Don't over-abstract: helper called once → inline; extract only at 2+ uses.

<a id="triage-tests"></a>
**[MUST] triage-tests — don't 1:1 port.** Independent page-level tests → `specs/basic/`. Serial order flows (place → email → backend → refund) → `specs/orders/` with chain state. Nav/screenshot GI tests → one data-driven visual spec; duplicate GI tests → skip; genuinely-new → build. Don't invent test cases not in generated code.

<a id="gateway-drift-recon"></a>
**[MUST] gateway-drift-recon — assume the GI recording of any hosted gateway is STALE, and prove the flow with one observe-only run before writing a selector.** The GI export records what the gateway looked like the day it was recorded; hosted gateways ship UI changes without notice, and this was the single largest source of work in the Cash Fore Clubs migration — both of its gateways had moved on (Klarna to a popup flow, PayPal to Fastlane + a new review CTA). A flat port of the recorded steps usually does NOT fail loudly: it sits on `/checkout/` against dead-but-still-present iframes until the test times out. Rules:
- **One observe-only run that dumps everything beats several guess-and-check runs.** A full chain run costs ~4 minutes and one real sandbox order; a guess costs the same. Ship the debug switch for it ([gateway-debug-env](#gateway-debug-env)) and use it FIRST.
- **Never port a gateway drive by reading the GI JSON alone** — pair it with the live dump, the same way [Before you start](#before-you-start) pairs the export with live DOM confirmation.
- **When a proven implementation of that gateway exists in a sibling suite, port it VERBATIM.** CFC hand-wrote its own PPCP drive, lost days to a wrong CDP/zoid theory, and the fix was to copy vesica's `payPayPal` unchanged. Templates exist for the two expensive ones: [paypal-ppcp](#paypal-ppcp), [klarna-adaptive](#klarna-adaptive).

---

## Architecture & typing

<a id="config-objects"></a>
**[MUST] config-objects — typed configs replace `vars` bags.** Split into TestConfig (what THIS test does), SuiteVars (what the SITE has, fetched once via `getSuiteVars` in `beforeAll`), Result (data returned by a flow). Eliminate every `Record<string, string>` vars bag.
```typescript
// BAD                           // GOOD
const vars: Record<string,...>;  interface OrderConfig { user: 'guest'|'new'|'old'; product: ...; expectedStatus: 'Processing'|...; }
vars.product = 'variable';       interface OrderResult { orderNumber: string; payDate: string; order: { total: number; ... } }
                                 interface SuiteVars { title: string; blog: string; /* plugin versions, flags */ }
```

<a id="thin-specs"></a>
**[MUST] thin-specs — config → flow → assertions**, with `getSuiteVars()` in `beforeAll`:
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

<a id="one-order-one-test"></a>
**[MUST] one-order-one-test — ONE order = ONE test, driving shopper + admin + email in the same body.** Don't split a single order across sibling tests ("place order" / "check backend" / "check email") — merge the admin and email assertions into the SAME test that placed the order, using all three fixtures (`shopperPage`, `adminPage`, `emailPage`) together. GI exported them separately because GI had no multi-context fixtures; keeping the split costs real money: the order number must be persisted through chain state ([serial-chains](#serial-chains)), a failure in test 1 leaves tests 2-3 asserting a stale order (or skipping silently), the same admin page loads three times, and the four surfaces of [parity-matrix](#parity-matrix) can no longer be compared against ONE captured value set. One test per order, all four surfaces inside it, one captured `OrderResult` shared by every assertion.

Split into a `describe.serial` chain ONLY when a later step genuinely MUTATES the order — refund / void / renewal / status change. That is new state worth its own test, and it reuses the chain-state order number instead of placing a second order.

<a id="serial-chains"></a>
**[SHOULD] serial-chains** — `describe.serial` + `auth/chain-<project>-<id>.json` persistence + skip-guard so mid-chain tests run standalone. → **`templates/chain-state.ts`**.

<a id="locators-over-evaluate"></a>
**[MUST] locators-over-evaluate — replace `page.evaluate()` with locators** wherever a Playwright API works:
```typescript
// BAD: page.evaluate(() => !!document.querySelector('#popup'))
// GOOD: (await page.locator('#popup').count()) > 0
```
Keep `evaluate()` only when locators genuinely can't express it (complex DOM traversal, browser-only state).

<a id="site-helper-naming"></a>
**[SHOULD] site-helper-naming** — site helpers go in `helpers/<site>.ts` (named after project), not generic names. Examples: `closePopup`, `selectFirstAvailableVariation`, `fillCheckoutForm`, `fillCreditCard`. Cross-flow utilities (`pageFullLoaded`, `blockUI`, `waitForCheckoutReady`) go inside `helpers/<site>.ts`; `helpers/common.ts` only when two unrelated integrations share it.

<a id="dont-over-abstract"></a>
**[SHOULD] dont-over-abstract** — helper called once → inline. Extract only at 2+ uses. Don't abstract one-time operations.

<a id="credentials-env"></a>
**[MUST] credentials-env** — credentials in `.env` via `dotenv`, never hardcoded. Never hardcode URLs either.

<a id="comments"></a>
**[SHOULD] comments — for dev/QA clarity, not narration.**
- **File header** on every `helpers/*.ts`, `fixtures/index.ts`, spec file: what this file is for, who consumes it, the non-obvious design rule (e.g. "orchestration only — DOM in `<site>.ts`, REST in `wc-api.ts`, every `expect()` in `assertions.ts`").
- **Per-public-function JSDoc**: one-sentence summary + non-self-evident inputs/outputs (`returns undefined if X — callers treat as 'no value available'`) + side effects (`lands on /checkout/`) + numbered steps for orchestrators.
- **Inline comments only for non-obvious WHY**: why a wait is needed, why `force: true` is justified, why a particular DOM shape is targeted, why a value is converted (`blocks state field expects ISO short code`). Cross-reference plugin/library when behaviour leaks (`see @woocommerce/e2e-utils-playwright/src/checkout.js`).
- **Don't comment** restating well-named code, bare TODOs without owner/expiry, decorative banners with no info.

<a id="step-logging"></a>
**[MUST] step-logging — `console.log` every step as it COMPLETES, carrying the data captured there.** A four-minute order flow that prints nothing is unreviewable: when it fails at minute three the report shows one long opaque step and nobody can tell how far the customer journey actually got. Log at step boundaries, past tense, with the values:
```typescript
console.log(`[${config.testId}] product page: "${name}" @ ${price} (variation: ${variation ?? 'n/a'})`);
console.log(`[${config.testId}] cart: added "${name}" × ${qty} — cart total ${cartTotal}`);
console.log(`[${config.testId}] checkout totals: subtotal ${subtotal} · discount ${discount} · shipping ${shipping} · tax ${tax} · total ${total}`);
console.log(`[${config.testId}] order ${orderNumber} placed (postId ${postId}) — asserting thank-you page`);
console.log(`[${config.testId}] email "${subject}" opened in emailPage — asserting product + totals`);
console.log(`[${config.testId}] admin order editor loaded — status "${status}", asserting parity`);
```
- **Prefix every line with the test id** (region/project too on multi-region suites) so interleaved workers stay readable.
- **Include what you captured** — product name + price, every total row, order number + postId, email subject, admin status. The log doubles as the evidence trail when a later assertion disagrees, and it makes a missing tax/shipping row ([warn-tax-shipping](#warn-tax-shipping)) visible in context.
- **Also wrap flow phases in `test.step()`** — that groups the trace and HTML report; `console.log` is what survives into CI stdout. Do both, not either.
- Keep it to step boundaries: no logging inside loops, per locator call, or before an action (a line printed before a step that then hangs reads as a false success).

<a id="package-json"></a>
**[MUST] package-json — one `test:<area>` script per top-level spec folder you actually create.** Don't ship scripts pointing at folders that don't exist.
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

---

## Fixtures & config

<a id="playwright-config"></a>
**[SHOULD] playwright-config** — sequential by default (`fullyParallel: false`, `workers: 2`), generous timeouts (240s test, 15s expect), `trace`/`video` always on, `launchOptions: { slowMo: 250 }` for review (the fixture moves it onto `connectOverCDP` on the Stagehand path — [stagehand-viewport](#stagehand-viewport)), and `viewport` declared inside the project entry ([viewport-single-source](#viewport-single-source)). `screenshot: 'off'` (the fixture owns the named per-context shot — see [failure-screenshots](#failure-screenshots)). → **`templates/playwright.config.ts`**.

<a id="global-setup"></a>
**[SHOULD] global-setup** — log in once, save `auth/admin.json`. Multisite logs in on parent host (cookie covers subsites under same host). → **`templates/global-setup.ts`**. Auth strategy scales with host count — see [auth-scales](#auth-scales).

<a id="fixtures-3-context"></a>
**[SHOULD] fixtures-3-context** — three pages (shopper / admin / email), `recordVideo` options bridged from `use.video`, video attached AFTER `ctx.close()` so `video.path()` resolves. → **`templates/fixtures.ts`** (includes the lazy-page Proxy).

<a id="lazy-init-fixtures"></a>
**[MUST] lazy-init-fixtures** — no context opens until it is used, `shopperPage` included. Wrap each page in a Proxy that initialises on first async call; after init, sync methods (`locator`, `getByRole`) MUST `.bind(page)` or `.first()` errors with "is not a function". → **`templates/fixtures.ts`** has the pattern. Two consequences of making ALL three lazy:
- **The shared-CDP browser needs a keepalive** — see [cdp-keepalive](#cdp-keepalive). Nothing else is holding a page open.
- **Register `page.on('dialog', …)` AFTER the first `goto`** on a proxied page. Registering before it double-inits the context and the handler binds to a different page instance than the one that navigates, so the dialog is never accepted ([refund-void](#refund-void)).

<a id="cdp-keepalive"></a>
**[MUST] cdp-keepalive — on the Stagehand/CDP browser, keep ONE real page open for the worker's lifetime.** A CDP-attached Chromium exits when its last real page closes, so with every fixture lazy ([lazy-init-fixtures](#lazy-init-fixtures)) the browser dies between tests and the next context fails with *"Target page, context or browser has been closed"*. A lone `about:blank` is NOT a keepalive either — it breaks `connectOverCDP`'s active-target resolution (*"Not attached to an active page"*). Do both in one move: `stagehand.init()` already leaves one blank page open, so **navigate that page to `baseURL`** and leave it — one real page, no blank target, one load per worker. Close any other stray pages. The plain-Playwright path (`NO_STAGEHAND=1`) needs none of this: `chromium.launch` keeps a browser alive with zero pages.

<a id="viewport-single-source"></a>
**[MUST] viewport-single-source — one viewport, living in the PROJECT's `use`, read once by the fixture.** Default to the device's own value (`devices['Desktop Chrome']` = 1280×720) and declare nothing: the spread lands in the project's `use`, which is where the fixture reads it. The fixture feeds that single read to all three consumers — Stagehand's `localBrowserLaunchOptions.viewport`, `browser.newContext({ viewport })`, and `recordVideo.size`. **If a suite genuinely needs a different size, change it in ONE place**: add `viewport` to that `projects[]` entry AFTER the spread. A top-level `use.viewport` does not work — the device spread clobbers it. Never hardcode a size anywhere else; the old template pinned `video.size` separately from the page size, so every video was a squashed rescale of the real viewport. The fixture's own fallback constant mirrors Playwright's documented default and is not a second declaration — it exists only so a Stagehand-launched browser can't silently fall back to Stagehand's 1288×711.

<a id="stagehand-viewport"></a>
**[MUST] stagehand-viewport — `newContext({viewport})` does NOT resize a browser Stagehand launched, and `viewportSize()` lies about it.** Measured: the suite renders at Stagehand's `DEFAULT_VIEWPORT` (**1288×711**, `stagehand/dist/esm/lib/v3/v3.js` → `configuredViewport`) while `page.viewportSize()` reports the size you asked `newContext` for — undetectable from inside a test, and it silently records an entire set of visual baselines at the wrong size. Only `localBrowserLaunchOptions.viewport` reaches it. Same for `slowMo`: Stagehand owns the launch, so slowMo rides `chromium.connectOverCDP(url, { slowMo })`, not the launch options. **Corollary — visual baselines are browser-source-dependent:** Stagehand's Chrome and Playwright's chromium render differently at an *identical* viewport (a full run under `NO_STAGEHAND=1` failed every screenshot baseline while every functional spec passed). Pick one browser source for visual specs and record + run on it; note that `reducedMotion: 'reduce'` ([view-transition-freeze](#view-transition-freeze)) can also shift baselines.

<a id="fixture-artifacts"></a>
**[MUST] fixture-artifacts — a fixture that owns its contexts owns their artifacts, and every one of them fails silently by default.** All four were live on the same suite; the run that hit them had no trace, no screenshot and a masked result. → **`templates/fixtures.ts`**.
- **NEVER call `ctx.tracing.start()` yourself — and MEASURE before hand-rolling the rest.** The runner's artifacts instrumentation has already started tracing on your manually-created context, so your own `start()` throws *"Tracing has been already started"* on both browser paths, always. Whether the runner also **saves** that recording is version-dependent and you must check, because both halves of the mistake are silent:
  - **Playwright ≥ 1.62 (measured 1.62.1 + Stagehand 3.7.1, CDP and plain-launch paths, passing and failing tests): the runner saves and attaches it by itself.** Do nothing. Every mode works as documented (`retain-on-failure` included — the runner knows the verdict, you don't), and the attachment is named `trace`, which is the **only** name the HTML report renders in its inline trace viewer. Hand-rolling here is worse than useless: `ctx.tracing.stop({ path })` steals the recording from the runner and re-attaches it as `shopperPage-trace.zip`, a plain download with no viewer.
  - **Playwright ≤ 1.59: the runner's teardown only ran for contexts IT created, so the recording was discarded on close and `trace: 'on'` produced no trace, ever.** There you must harvest it: mark the context, `ctx.tracing.stop({ path })` in teardown, `existsSync` → `testInfo.attach`, and collapse the modes to on/off since `retain-on-*` needs a verdict you don't have at start time.
  - **The 60-second check, before you write any of it:** a throwaway spec that opens the fixtures' contexts, navigates to a `data:text/html` page and passes; run it with `trace: 'on'`, then `ls reports/data/*.zip`. One zip → the runner has it, delete the whole block. No zip → harvest. Re-run it whenever you bump Playwright.
- **The failure screenshot needs `animations: 'disabled'`.** Without it `page.screenshot()` hangs on a page with a running animation and the failing run has no screenshot at all — exactly when you need one.
- **Guard the video attach with `existsSync`.** `attach()` COPIES the file and `video.path()` can point somewhere that doesn't exist locally when the browser arrived over CDP; the `ENOENT` throw escapes teardown and reports the whole test as a fixture error, masking the real result.
- **Read launch settings from `project.use`, never a bespoke env var.** `HEADED=1` reimplements `--headed` badly and hides the setting from the runner. A worker-scoped fixture gets `WorkerInfo`, not `TestInfo` — take the info object structurally (`{ project }`) since both carry `project.use`. Contexts themselves need no bridging: the runner injects `use` into every `browser.newContext()`, `baseURL` included. Only LAUNCH-time options ever need it.

<a id="failure-screenshots"></a>
**[MUST] failure-screenshots — disable the built-in (`screenshot: 'off'`); the fixture owns the named per-context shot.** The test runner instruments the shared `chromium` browserType, so Playwright's built-in screenshot-on-failure DOES fire on manually-created contexts (the same reason a fixture `ctx.tracing.start` can throw "already started") — it attaches a generic `screenshot.png` that duplicates the fixture's named `shopperPage.png`/`adminPage.png`. Set `screenshot: 'off'` in `playwright.config.ts` and make the fixture's `finishContext` capture a full-page shot gated on failure DIRECTLY (`testInfo.status !== testInfo.expectedStatus`), not on the config `screenshot` key. One named screenshot per context, no duplicate. (`screenshot: 'on'` in config may still force a shot every test if desired.)

<a id="wc-api"></a>
**[SHOULD] wc-api — use WC e2e-utils + REST clients** instead of hand-rolling. → **`templates/wc-api.ts`** (lazy `createClient`, retry Proxy, `WC_API_PATH`/`WP_API_PATH` constants), **`templates/woocommerce__e2e-utils-playwright.d.ts`** (ambient declaration — required, package ships JS only).

Migration gotchas when swapping a hand-rolled `fetch` client to `createClient`:
- **Lazy construction.** `createClient` throws at construction if creds are empty — wrap in `function wpClient() { if (!_c) _c = createClient(...); return _c; }` so import-time typecheck works.
- **No `/wp-json/`** in your paths — library appends it. Use `WC_API_PATH` (`wc/v3`), `WP_API_PATH` (`wp/v2`), or unprefixed strings (`'custom/v1/get-log'`).
- **Axios-shaped responses** — read via `.data`, not as the body directly.
- **Query params as object** — `client.get(path, { status: 'failed' })`. Don't manually build query strings.
- **No `patch`** on the returned client. Retry Proxy whitelists `['get', 'post', 'put', 'delete']` only.
- **Silence the bogus "Basic Auth over HTTP" warning.** Library checks `baseURL.startsWith('http')` to decide whether to warn — that prefix matches `https://...` too, so the warning fires on every non-localhost URL even when traffic is encrypted. Filter just that substring at module init: `console.warn = (...a) => { if (typeof a[0] === 'string' && a[0].includes('Basic Auth over HTTP')) return; orig(...a); }`.

---

## Checkout mechanics

<a id="nav-via-clicks"></a>
**[STRICT] nav-via-clicks — navigate via customer clicks; never `page.goto()` to cart or checkout.** Customers change URLs by clicking, not typing. Every navigation from add-to-cart → cart → checkout MUST follow the real click path:
- **To cart:** click the header cart icon/button → wait for mini-cart to expand → click "View cart" (or equivalent). Never `page.goto('cart/')`.
- **To checkout:** click "Proceed to checkout" on the cart page. Never `page.goto('checkout/')` or any `check-out/?...` URL.
- Implement `goToCart(page)` and `proceedToCheckout(page)` helpers (or site-equivalent names) in `helpers/<site>.ts`. `fillCheckoutAddress` must call them instead of `goto`.
- `page.goto()` is ONLY allowed for: initial home/priming visit, direct product add-to-cart links (`?add-to-cart=ID`), admin/backend pages, and email/Mailpit. Nowhere else in the customer flow.
- Why: click navigation exercises the mini-cart, cart totals, and redirect logic that URL-only navigation silently skips — these are real regression surfaces.

<a id="cart-helper-choice"></a>
**[SHOULD] cart-helper-choice — pick the right cart helper (or none).** `addAProductToCart(page, id)` goes via `/shop/?add-to-cart=ID`; `addOneOrMoreProductToCart(page, slug)` goes via `/product/{slug}`. If your existing flow uses `/checkout/?add-to-cart=ID` (lands directly on checkout), keep the hand-rolled helper — switching costs an extra `goto('checkout/')` and depends on a published shop page or accurate slug map.

<a id="real-events"></a>
**[MUST] real-events — never eval.** `el.value=…; dispatch('change')` won't trigger WC `update_checkout`/variations/composite validity; use Playwright `selectOption`/`fill`/`check`.

<a id="ajax-races"></a>
**[MUST] ajax-races** — `.blockUI` intercepts clicks (navigate remove-URLs instead); wait for a positive signal (recalc landed), not just "overlay hidden".

<a id="money-dom"></a>
**[MUST] money-dom — money/text DOM is messy.** Currency symbol in its own span, thousands commas, double-spaced labels, `<del>list</del><ins>discount</ins>`, discount-as-fee, select2 hidden natives, a "money" field that's actually a shipping-method label, pricing plugins that drop `bdi`, `$0`/"price on request" products → normalize + capture the right node, compare as money only when numeric.

**Scope every bare WooCommerce class name — `.first()` is not "the one on this page".** A persistent cart drawer / header mini-cart sits EARLIER in the DOM than `<main>`, so an unscoped `.total`, `.email` or `.method` with `.first()` on the thank-you page reads the mini-cart's stale subtotal and asserts it happily. Scope to the surface's own container (`.order_details` on order-received, `.woocommerce-order-details`, the admin order panel) before reading. Treat every generic Woo class as suspect until it is scoped.

<a id="stock-hold"></a>
**[MUST] stock-hold — a failed payment can make the product unbuyable for the NEXT run; rotate and retry.** On a catalogue where every product is quantity 1 (one-off / made-to-order stock, common on club/auction sites), WooCommerce holds stock for pending payments (~60 min by default) while STILL listing the product as "In stock". A run that fails at the gateway leaves a pending order holding that item, and the next run is refused at checkout with *"There are some issues with the items in your basket"* — which reads as a checkout bug, not a leftover. The flow must **rotate to another product and retry after emptying the basket**, not fail. No manual cleanup is needed: pending test orders auto-cancel when the hold expires. Related: leftover sandbox orders from gateway debugging are real orders on staging — list them at handoff.

<a id="classic-vs-blocks-branch"></a>
**[MUST] classic-vs-blocks-branch — single `isBlockCheckout(page)` helper picks the path.** Blocks uses `fillBillingCheckoutBlocks` / `fillShippingCheckoutBlocks` from e2e-utils; classic keeps hand-rolled selectors.

Blocks library quirks the helpers don't cover:
- **Email is OUTSIDE the address group** — fill it separately before calling the library.
- **Pick shipping vs billing group.** Physical → "Shipping address" group; virtual/downloadable → "Billing address" only. `await page.getByRole('group', { name: 'Shipping address' }).waitFor({ state: 'visible', timeout: 5_000 }).then(()=>true).catch(()=>false)` decides.
- **Short codes for state/country** — library passes value to a `<select>`, so `state: 'FL'`, `country: 'US'`. Keep both forms on `BillingDetails` (`shortState`/`shortCountry` for blocks, `state`/`country` for classic select2).
- **`address_2` is hidden behind `.wc-block-components-address-form__address_2-toggle`** — reveal then fill `#billing-address_2` / `#shipping-address_2` if needed.
- **Field map** — library accepts `{ firstName, lastName, address, city, state, zip, country, phone }`. Map your `BillingDetails` (don't pass `street`, `zipCode`, `shortState`, etc.).
- **Create-account password input is lazy.** Clicking the "Create an account?" checkbox reveals the password field — selector returns 0 elements before the click, so the next `.fill()` times out without a `waitFor`. Prefer a label-based selector (`page.getByLabel('Password', { exact: true })`) with a class fallback (`div.wc-block-components-address-form__password > input`), then `await password.first().waitFor({ state: 'visible', timeout: 15_000 })` before filling. Apply the same pattern (label-or-class) to the create-account checkbox itself — theme/plugin overrides change the wrapper class.

<a id="blocks-wizard-hydration"></a>
**[MUST] blocks-wizard-hydration — fill WC Blocks checkout via the e2e-utils helper, in the right ORDER, only once FULLY HYDRATED.** Learned live on PLS (pls-core 4-step wizard over WC Blocks + Stripe Payment Element).
- **Use `fillBillingCheckoutBlocks(page, {...})`** from `@woocommerce/e2e-utils-playwright` for the standard address fields — it scopes to the "Billing address" group and resolves inputs by WC-canonical labels (`Country`, `State/County`, `ZIP Code`/`Postal code`, `Phone`). It does NOT fill email, **company**, or custom fields (e.g. pls-core middle name) — set those yourself.
- **Blocks controlled selects revert to the geo-IP default.** Country/state `<select>` are React-controlled and pushed to the server on a debounce; a concurrent geo-IP address sync reverts them (PLS geo-defaults to Argentina). A native value-setter "force" fools the DOM `<select>` but NOT the blocks store the wizard validates — the state select then wipes to "". Fix: real `selectOption` → `settleNetwork` (bounded `networkidle`) so the push persists → verify against the STORE (`wp.data.select('wc/store/cart').getCustomerData().billingAddress.country`), re-filling idempotently until it holds.
- **Field ORDER is load-bearing.** Country FIRST (its change re-renders the address group, wiping earlier fields). Email EARLY (right after country): a brand-new guest email fires a debounced account lookup that switches the session — filled LATE it orphans the cart, filled BEFORE country it gets wiped by the re-render. Custom fields (middle name, company, address_2) after.
- **Wait for FULL hydration before touching any field** (`waitForCheckoutLoaded`): wizard mounted + country `<select>` option list populated (>10) + order-summary total present and non-zero (the cart actually loaded into the checkout) + spinners gone + network idle. Interacting against a half-mounted checkout races hydration and orphans the cart.
- **"Cannot create order from empty cart" at Place Order is an intermittent platform race** in the custom wizard, surviving all of the above — set `retries` in the config to absorb it (it's flaky infra, not a selector bug).
- **The order-received (thank-you) page differs for the auto-logged-in purchaser** of a guest order: NO email row and NO customer-details/address block — make those reads best-effort and assert address/email on My Account view-order + admin + email instead. The "Related subscriptions" table is a plain `<table>`; key its rows off `a[href*="/view-subscription/"]`, not a WC class. A downloadable-webinar Downloads section isn't guaranteed → warn, don't fail (see [warn-tax-shipping](#warn-tax-shipping)).
- **WooCommerce auto-logs-in the user right after a password reset** — a `loginAccount` that navigates to my-account/ then finds the logged-in dashboard, not the form (`#username` absent). Log out first if already authenticated, so the credentials are actually exercised.

---

## Assertions & parity

<a id="dont-weaken"></a>
**[MUST] dont-weaken — don't weaken assertions to paper over real bugs.** This is the unifying principle behind the whole section. If a value goes missing because of an async race (webhook hasn't fired yet, transient meta, plugin hook ordering), keep the strict assertion — let the test surface the bug. Add a wait / polling helper, raise the issue with the plugin maintainer, or split the assertion into "fast path" (synchronous DOM) + "eventual" (REST polled with timeout). Loosening a substring match to hide an empty `${chargeId}` (or any other empty plugin output) costs you the next regression. A cross-surface mismatch is a finding, not a test defect.

<a id="parity-matrix"></a>
**[MUST] parity-matrix — for EVERY place-order test.** Capture the core facts ONCE during the flow (order-received), then assert the SAME captured values on every surface that renders them — never hardcode, never assert only one surface:

| Surface | Product name + price / line total | Totals (subtotal · discount · shipping · tax · fees · total) | Full address (billing + shipping) | Payment method | Gateway order note |
|---|---|---|---|---|---|
| Thank-you (order-received) | ✓ | ✓ | ✓ | ✓ | — |
| My Account (view-order) | ✓ | ✓ | ✓ | ✓ | — |
| Order email (**opened** in `emailPage`) | ✓ | ✓ | ✓ | ✓ | — |
| Admin order editor | ✓ | ✓ | ✓ | ✓ (`Payment via <Method>` meta) | ✓ (scan-all + regex, [order-notes](#order-notes)) |

- **Products** — name + unit price + per-line total on every surface that lists items, per [line-item-parity](#line-item-parity). The grand total masks two line errors that cancel.
- **Totals** — assert EVERY row individually (subtotal · discount/coupon · shipping · tax · fees · total), not just the grand total, per [cart-checkout-totals](#cart-checkout-totals). Share one `expectMoney` that SKIPS rows legitimately absent on a surface (AU inclusive-tax has no Tax row; free shipping has no amount) instead of asserting `$0`/`NaN` — and warn on a missing/`$0` tax or shipping row rather than shrugging ([warn-tax-shipping](#warn-tax-shipping)). Don't assert a row that doesn't exist on that surface; don't silently drop one that should.
- **Address** — the FULL block, billing AND shipping, normalized rather than partially skipped: see [full-address](#full-address). The thank-you assert is sync over the capture, so capture the order-received address block into the Result.
- **Email** — the email is a first-class surface: OPEN it in `emailPage` and assert against the rendered DOM, never against an API extract alone ([email-open-in-page](#email-open-in-page)).
- **Payment method** — the customer-facing label on thank-you / My Account / email; the `Payment via <Method>` meta line on admin (plus the gateway note, [order-notes](#order-notes) + [refund-void](#refund-void)).
- A surface that genuinely doesn't render a fact (some themes omit payment method on view-order) is the ONLY reason to drop that cell — record it in the ledger, don't silently skip. Never weaken or × a value to paper over a real bug (see [dont-weaken](#dont-weaken)).
- **Tax is not ONE row on every surface** — the admin panel itemizes it per rate. SUM the tax rows before comparing: [itemized-tax](#itemized-tax).

<a id="itemized-tax"></a>
**[MUST] itemized-tax — SUM every tax row; the admin panel itemizes tax per RATE while the customer-facing surfaces show one aggregate.** WooCommerce renders `get_order_item_totals()` on thank-you / view-order / email — one combined `Tax:` row — but the admin order editor's totals panel always lists one row PER RATE, and a tax-service plugin routinely produces several. Measured on Pur Crystal (Avalara AvaTax, FL address): admin showed `State Sales Tax: $22.26` + `County Sales Tax: $3.71` against the customer's single `Tax: $25.97`. A reader written as `if (/tax/.test(label)) out.tax = amount` keeps the LAST match, so the parity assertion compared `$3.71` to `$25.97` and read as a tax regression — it was a reader bug, and the same last-row-wins shape would silently assert ONE rate on any multi-rate store (US state+county+city, CA GST+PST, EU multi-VAT).

- **Accumulate, don't overwrite.** Count the tax rows as you scan; on more than one, emit the SUM re-rendered with the row's own currency symbol. Keep the single row's RAW text when there is exactly one, so a one-rate store's display string is never reformatted by the test.
```typescript
let taxSum = 0, taxRows = 0, symbol = '$';
// …per row…
if (/\b(?:gst|hst|pst|qst|vat|tax)\b/.test(label)) {
  const n = parseFloat(amount.replace(/[^0-9.-]/g, ''));
  if (!Number.isNaN(n)) { taxSum += n; taxRows += 1; symbol = (amount.match(/[^\d.,\s-]/) ?? ['$'])[0]; }
  if (taxRows === 1) out.tax = amount;      // single row → keep it verbatim
}
// …after the scan…
if (taxRows > 1) out.tax = `${symbol}${taxSum.toFixed(2)}`;
```
- **Scan LEAF rows only.** Email templates nest tables inside table cells, so a generic `document.querySelectorAll('tr')` sweep also hits WRAPPER rows whose "label" cell contains the word tax and whose last cell holds the entire totals block — stripped to digits that summed to `$3494.37` on a `$25.97` order. Skip any row with a nested `<tr>`, and require the amount cell to READ as money (optional symbol, then digits) so a paragraph that merely contains a number can't enter the sum. The same guard is what finds the right line-item row ([email-line-row](#email-line-row)).
- **Apply it in EVERY totals reader** — front-end order-details/checkout-review, the admin panel, and the opened email. A store can be flipped to itemized tax display (`woocommerce_tax_total_display`) at any time, which turns the customer-facing surfaces multi-row too; a reader that sums is correct either way, one that overwrites breaks on a settings change nobody logged.
- **Match the label by INTENT, never the copy.** Rate labels are store-configured strings (`State Sales Tax`, `County Sales Tax`, `TVA`, `GST/HST`) — key off the tax token per [validation-token-intent](#validation-token-intent), not an exact label.
- **The items table itemizes too** — one tax COLUMN per rate (`State Sales Tax` / `County Sales Tax` on both the line item and the shipping row). Two consequences: a refund must copy EVERY `td.line_tax` cell, not the first ([refund-void](#refund-void)); and a tax RATE derived from the order must sum the columns before dividing ([warn-tax-shipping](#warn-tax-shipping)).
- **This does NOT weaken the row-level discipline** ([cart-checkout-totals](#cart-checkout-totals)): the aggregate is what the surfaces have in common, so it is what parity compares. If a specific rate matters to the suite, assert that rate's own row on the admin panel as an ADDITIONAL check — don't drop the aggregate.

<a id="full-address"></a>
**[MUST] full-address — assert the WHOLE address block, billing AND shipping.** This SUPERSEDES the older "assert name + street + city + postcode, skip state/country" shortcut. A dropped or wrong state/country line is exactly the checkout regression these suites exist to catch (tax zone, shipping zone, and gateway AVS all key off it), and a partial assert also hides a swapped or silently-mirrored billing/shipping pair. Assert every line the surface renders: first + last name, company (when the flow fills it), `address_1` + `address_2`, city, state, postcode, country, plus phone and email where present.
- **Normalize the form; never skip the field.** Surfaces disagree on long vs short form (`Florida` vs `FL`, `United States (US)` vs `US`) and on separators/line breaks. Keep both forms on `BillingDetails` (`state`/`shortState`, `country`/`shortCountry` — [classic-vs-blocks-branch](#classic-vs-blocks-branch)) and compare through one `normalizeAddress` that collapses whitespace/commas/`<br>` and accepts either form. Per-surface string drift is a normalization job, not a licence to drop the assertion ([dont-weaken](#dont-weaken)).
- **Assert both blocks against what checkout SUBMITTED**, not against each other — and where the flow ships to a different address, assert they genuinely DIFFER (a shipping block mirroring billing is a real bug; see the no-pong billing+shipping parity work).
- **Surfaces that genuinely omit a block** — the auto-logged-in purchaser's thank-you page renders no customer-details block ([blocks-wizard-hydration](#blocks-wizard-hydration)) — are best-effort there, but the block MUST still be asserted on My Account view-order + admin + the opened email. Ledger the omission; don't let a whole surface quietly lose its address check.

<a id="subscriptions-recurring"></a>
**[MUST] subscriptions-recurring — assert RECURRING totals too.** A subscription order has TWO totals: the FIRST payment (often includes a one-off sign-up fee) AND the per-renewal RECURRING total. Assert BOTH — the recurring total is the whole point of a subscription, so reviewing only the order total misses regressions in renewal pricing.
- **Capture the recurring total separately** from the first-payment total. WooCommerce renders them in distinct ways and a generic "read the totals table" will silently grab the wrong one: the CART marks recurring rows with the `recurring-total` class (a separate section), while the subscription ORDER-RECEIVED page often renders a single "Subscription totals" table whose Total IS the recurring `$X / period`, with the first payment only in the related-orders row. Branch your totals reader on the `recurring-total` class and fall back to the subscription-totals table.
- **Assert recurring on every surface that shows it** — thank-you / My Account view-subscription / email / the admin **subscription** editor (its recurring total, unconditionally — don't `if (found)`-skip). Compare the admin recurring total against the captured *recurring* total, NOT the first-payment total.
- **Region tax model still applies** — recurring consistency is `recurring total = recurring subtotal + recurring shipping` for tax-INCLUSIVE regions (AU); add `+ recurring tax` for tax-EXCLUSIVE regions (CA/US).

<a id="expect-home"></a>
**[MUST] expect-home — `expect()` lives in `assertions.ts` OR a named `assert*` helper, NEVER inline in a spec.** Every `expect()` from generated code lives on (reorganised, not removed). Default home is `helpers/assertions.ts`. A **feature-cohesive** check may instead live in a named `assert*` function co-located with its feature flow (`assertMyAccountTabs` in `account.ts`; klaviyo / contractor checks) — this is the ONLY allowed exception and matches the reference suites (bluesnap keeps the bulk in `assertions.ts` but a handful sit in `bluesnap.ts`). Specs stay assertion-free: they call flows + `assert*` helpers, never raw `expect()`. The single spec-level exception is `toHaveScreenshot` in a visual spec. Lint: `grep -rnE "expect\(" specs` should return only `toHaveScreenshot` lines.

<a id="expect-message"></a>
**[MUST] expect-message — every `expect(...)` carries a message.** Use the second-arg form for both value and locator forms; embed dynamic data:
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

<a id="classic-vs-block-copy"></a>
**[MUST] classic-vs-block-copy — copy and DOM diverge; branch the assertion.** Applies to every project that touches WC checkout — payment-gateway suites (bluesnap, mastercard, payoneer) AND full-site maintenance projects (repurposedmaterials, no-pong). The same plugin / theme / page can render different output per checkout style. Two families to handle:

- **Multi-line notice / banner text.** Classic templates render `<ul>` lists where each line is its own `<li>` — `textContent` puts a real `\n` between them. Blocks renders a single container that concatenates the lines with no separator. `toHaveText('Line A\nLine B')` only passes against classic. Use `toContainText` per line:
```typescript
const notice = page.locator('.woocommerce-error')
  .or(page.locator('div.wc-block-store-notice.is-error > div > div')).first();
await expect(notice, 'should display the headline').toContainText('Headline');
await expect(notice, 'should display the body line').toContainText('Detailed instruction');
```

- **Order-note / system-message copy differs.** Same plugin / theme can emit different note text on classic vs blocks (gateway example: classic emits `Payment via <Method> (<txid>).`, blocks emits `Payment complete.`; coupon / shipping / email plugins show similar splits). When the structured info is also exposed elsewhere (admin meta box, WC REST, email body), assert that for parity and branch the note-text assertion on `suiteVars.blog.includes('block')` (or however the project labels its block subsite).

The unifying rule: prefer **per-line `toContainText`** over `toHaveText` for any text with more than one logical line, and **branch assertions on classic vs block** whenever a plugin / theme's user-facing copy isn't identical between the two.

<a id="validation-token-intent"></a>
**[MUST] validation-token-intent — match field token + intent, not exact label copy.** WooCommerce/checkout plugins (wfacp etc.) reword field labels without changing meaning ("Country" → "Country / Region", "Town / City" → "City", "State / County" → "State / Province"). Asserting the literal string `'Country is a required field.'` breaks on every copy tweak — a false failure, not a real bug. Match on the distinctive field token + the intent keyword via regex (`/Country\b.*required/i`, `/(State|County|Region|Province)\b.*required/i`), keeping a human-readable `label` for the failure message. Same principle for any plugin-rendered notice whose wording is not contractually stable.

<a id="assert-behaviour"></a>
**[MUST] assert-behaviour — assert BEHAVIOUR and existence, not pinned indices / ids / names.** Broadens [validation-token-intent](#validation-token-intent) beyond label copy to any data the GI export pinned to a specific value that drifts: GI pinned FAQ item #7, a specific YouTube video id, specific store-locator result names. Assert the behaviour or existence — "an accordion item expands its answer", "at least one answer embeds a video", "an in-range search returns a non-empty result list" — never the specific item, id, or name. Pinned data is a guaranteed future flake as content changes; the behaviour is the actual regression surface.

<a id="guest-guard"></a>
**[MUST] guest-guard — guest users have no My Account; guard early.** WC `my-account/view-order/` redirects guests to login. Guard at top: `if (config.user === 'guest') return;` Don't rely on a generic page-text check that silently passes on the login page.

<a id="sequential-order-numbers"></a>
**[MUST] sequential-order-numbers — the DISPLAYED number is not the order ID, and it can carry an alpha PREFIX.** `my-account/view-order/{id}/` and `wp-admin/post.php?post={id}` need the numeric order/post ID (capture from the `/order-received/(\d+)/` URL) — feeding the displayed number yields WC **"Invalid order."** But display assertions (`mark.order-number`, the admin `Order #… details` heading) need the FULL displayed number, which may be prefixed (Pur Crystal shows `pc8703`). Capture `orderNumber` preserving the alpha prefix — strip only punctuation/whitespace (`replace(/[^a-z0-9]/gi,'')`), NEVER `[^0-9]` (that drops the prefix and breaks the admin-heading match) — and keep a separate numeric `postId` for every ID-based URL. The orders-LIST assertion passing while view-order 404s is the tell that only the URL identifier is wrong.

<a id="force-audit"></a>
**[SHOULD] force-audit.** Default to no `force`. Justified for: non-interactive elements with JS click handlers (`td`, `tr.shipping > td.line_cost`), fallback radios hidden behind labels (click input not label), WC Blocks place-order button briefly covered by `.blockUI`. Remove `force` from any click on a real button/link/input.

---

## Resilience

<a id="resilient-locators"></a>
**[MUST] resilient-locators — tiered fallback per action AND assertion (pure Playwright first, Stagehand last).** Maintenance-cycle suites must survive selector drift. Wrap every action and assertion in a tiered fallback. Stagehand AI is the **last resort only** — the primary path stays pure Playwright (fast, free, deterministic; if the suite already passes on Playwright, Stagehand is drift insurance, not the driver). → reference implementation **`templates/resilient-locators.ts`** (build it into the project as `helpers/resilient.ts`); reference design **`docs/locator-fallback-strategy.md`**.

**General elements** (Playwright official locator priority, most→least resilient):
1. **Primary — ARIA/role:** `getByRole(role, { name })`, `getByLabel(...)`.
2. **Fallback 1 — text/CSS:** a *different* Playwright strategy: `getByText`/`getByPlaceholder` or a stable CSS/`.or()` locator.
3. **Fallback 2 — Stagehand AI:** `stagehand.act("<NL instruction>", { page })` for actions; `stagehand.extract(instruction, zodSchema, { page })` for reads/assertions.

**Stable selectors** (stable IDs/names — checkout `#billing_*`/`#shipping_*`, `#place_order`, `#terms`, product variation selects): **skip Fallback 1**, use primary ID → **Stagehand-only** fallback. No value in a second CSS guess when the ID is stable.

**Stagehand setup** (per-project, shared util): `new Stagehand({ env: 'LOCAL', model: { modelName: 'anthropic/claude-sonnet-4-6', apiKey: process.env.ANTHROPIC_API_KEY }, selfHeal: true })` → `chromium.connectOverCDP({ wsEndpoint: stagehand.connectURL() })`, bridging `testInfo.project.use` into context options. (v3: use `model`, NOT top-level `modelName`/`modelClientOptions` — those are ignored and Stagehand silently defaults to OpenAI. No `enableCaching` option.) Prefer `observe()`→`act(action)` for reused steps (no LLM on the act); raw `act("NL")` is fine for the rare fallback path. Deps: `@browserbasehq/stagehand`, `playwright-core`, `zod`; env `ANTHROPIC_API_KEY`.

Build a shared wrapper so specs/helpers call `resilientClick/Fill/Select/Check/Text({ primary, alt?, ai })` (omit `alt` for stable-selector → Stagehand-only). Each tier in try/catch; on final failure throw an aggregated Error whose first line is `` `${target.ai} — not found.` `` followed by each tier's error on its own indented line (`Playwright:` / `Stagehand:`) — NOT `All resilient tiers failed for "…"`. Lead with the element phrase so the report reads as a plain not-found statement and the tier lines carry the real cause (timeout, API billing, etc.); write `ai` so that line scans as a sentence (`the subscription sign-up fee on the cart page`). Keep return/capture shapes identical so flow/assertion logic is unchanged.

**MANDATORY when refactoring: route EVERY action and assertion through the resilient wrapper.** In `helpers/*` and specs, do not call raw `page.locator(...).click()/.fill()/.selectOption()/.check()` or `expect(locator)` for content — use `resilientClick/Fill/Select/Check` for actions and `resilientText` (then assert on the returned string) for reads/assertions. `ai` is a NOUN phrase naming the element ("the Add to cart button", "the order total"); the wrapper composes the verb. The ONLY allowed raw calls: navigation/waits (`goto`, `waitForLoadState`, `waitFor`), `setInputFiles` (no wrapper for uploads), and genuinely custom JS interactions (e.g. clicking a plugin-injected `<a>` via `page.evaluate`). Build the helper at `helpers/resilient.ts` + wire it into fixtures via a worker-global `setActiveStagehand`/`ctxFor(page)` so helpers keep their `(page)` signatures.

<a id="view-transition-freeze"></a>
**[MUST] view-transition-freeze — set `reducedMotion: 'reduce'` on EVERY context.** wp-admin ships an inline `@media (prefers-reduced-motion: no-preference){ @view-transition{navigation:auto} }`. On a click-driven form-submit redirect the compositor holds the OLD page's snapshot: the page goes white, `page.screenshot()` hangs, the video freezes, and the NEXT click times out on *"waiting for element to be visible, enabled and stable"* — while the ARIA snapshot shows that element visible, enabled and correctly labelled. It reads as a broken selector and is not one. `reducedMotion: 'reduce'` stops the transition existing rather than racing it (A/B measured elsewhere: 20s freeze → 270ms); disabling the feature via a Chromium flag did NOT work. Note it can shift visual baselines ([stagehand-viewport](#stagehand-viewport)), so set it before recording them. Prior art: `~/.claude/projects/-Users-christian-Automation-template-automation/memory/playwright_view_transition_freeze.md`.

<a id="no-latching-flags"></a>
**[MUST] no-latching-flags — a retry loop re-reads real state every tick; never a one-shot `didX` bool.** `phoneSubmitted = true` set next to a `fill()` that silently didn't take means the run NEVER retries and spins on one screen for its whole budget (measured: 60 ticks on one screen, and 34 consecutive ticks on another). Re-read the truth each tick — `inputValue()`, `isVisible()`, the page's own copy — and act on that. Two companions: **React-controlled inputs** (Klarna, CommerceKit search, most modern gateway UIs) drop `fill()` silently — use `pressSequentially`; and **third-party screens vary run to run**, so drive them as a state machine reacting to what is on screen, never as a linear step list.

<a id="visual-lazy-load"></a>
**[MUST] visual-lazy-load — trigger lazy-load before every `toHaveScreenshot`.** `fullPage: true` resizes the viewport to content height but does NOT fire the scroll/intersection events lazy-loaded images (`loading="lazy"`, IntersectionObserver galleries) wait on — below-fold images capture blank or inconsistent, so baselines flake. Before each shot: step-scroll to the bottom (≈viewport-height increments, brief pause each step), await decode of every `<img>` (`document.images` where `!img.complete`), then scroll back to top. **BOUND every wait or the test hangs forever:** race each image's `load`/`error` against a `setTimeout(done, 3000)` — a lazy placeholder with empty/unassigned src stays `!complete` and fires neither event, so an unbounded `Promise.all` never resolves. Likewise give `waitForLoadState('networkidle', { timeout })` an explicit timeout + `.catch` — chat/analytics sockets mean idle may never arrive. Keep masking dynamic content (prices/dates) so baselines track LAYOUT, not value drift.

<a id="visual-image-lock"></a>
**[MUST] visual-image-lock — a product grid whose width flaps run to run is a REAL SITE BUG: diagnose and ledger it, never paper it over with injected screenshot CSS.** Grid/flex items default to `min-width: auto` and refuse to shrink below their content's min-content width, so while product images are still lazy placeholders a 4-up grid measures four equal tracks — but the instant one image lands at its intrinsic `1024px`, track 1 blows out to `1024px` and squeezes the rest to ~`35px` (one letter per line in the titles). Measured on Leggari `/store/`: `12453 / 16332 / 26040` px tall across three IDENTICAL loads. A visitor on a slow connection sees exactly that, so it is a **ledger entry**, and the fix is site-side (`min-width: 0`, or an explicit width, on those grid items — `ul.products > li`, `ul.wc-block-product-template > li`, `.wc-block-grid__products > li`, `.wp-block-post-template > li`). **Do NOT inject a `min-width: 0` stylesheet via `expect.toHaveScreenshot.stylePath`** (nor the GI "Block Image sizes" eval it replaced): it makes the baseline stable by making the baseline lie — the one defect the visual spec exists to catch is styled out of the capture, and broken/404 images stop showing up too. Diagnose the same way as [visual-width-flip](#visual-width-flip): ONE eval reading `getComputedStyle(grid).gridTemplateColumns` + `document.body.scrollHeight` right after `goto` and again after the lazy-scroll names it in a single shot — a blown-out track list (`1024px 35px 35px 35px`) is unmistakable. Until the site is fixed, keep the spec honest instead of quiet: `mask` that one region, or scope to an element shot ([visual-fullpage](#visual-fullpage)), with a comment naming the ledger entry.

<a id="visual-intrinsic-size"></a>
**[MUST] visual-intrinsic-size — a page whose HEIGHT moves run to run is WordPress's `contain-intrinsic-size` placeholder held by images that never decoded; the undecoded images are the finding.** WP ships this inline for `sizes="auto"` lazy loading: `img:is([sizes="auto" i], [sizes^="auto," i]) { contain-intrinsic-size: 3000px 1500px; }`. That is the box EVERY image reserves until it decodes — clamped into a 283px grid cell it is still **1500px tall**, so page height tracks how many images happened to decode before the capture rather than the content. [visual-lazy-load](#visual-lazy-load) is necessary but cannot close it, because images that **404 never decode** — no wait can succeed. **So go find the 404s.** One run-scoped listener names them instantly: `page.on('response', …)` / `page.on('requestfailed', …)` filtered to `resourceType() === 'image'`, cross-checked with `page.request.get(url)` because in-flight lazy images log a misleading `net::ERR_ABORTED` when a srcset re-evaluates (transient) that reads identically to a real 404 (permanent). Leggari preprod had 4 genuine 404s — one product image plus three mega-menu thumbnails — each holding a 1500px placeholder. Ledger them as **content bugs**. **Do NOT reset it in a screenshot stylesheet** (`img { contain-intrinsic-size: none !important }`): that flattens the placeholder so the run passes while the missing images — the actual bug — go invisible in every baseline.

<a id="visual-fullpage"></a>
**[SHOULD] visual-fullpage — every page shot is `fullPage: true`; an element shot is the narrow exception.** Default to `expect(page).toHaveScreenshot(name, { fullPage: true, animations: 'disabled', mask: [...] })` behind ONE `shot()` helper in the visual spec, so no page can be captured viewport-only by accident (note `fullPage` is a per-call option — `expect.toHaveScreenshot` config carries `maxDiffPixelRatio`/`animations` but NOT `fullPage`, so the helper is what enforces it). Scope down to `expect(locator).toHaveScreenshot()` only when the target genuinely IS one component — an open mega-menu/mobile drawer, a mini-cart panel, a single gateway iframe — where a full-page shot would drown a small diff in unrelated page noise or drag in a region you already know drifts. "The page is long" and "the baseline keeps failing" are NOT reasons to crop: a cropped baseline silently stops covering everything below the fold, which is exactly where [visual-lazy-load](#visual-lazy-load) and [visual-image-lock](#visual-image-lock) failures live.

<a id="visual-width-flip"></a>
**[MUST] visual-width-flip — `toHaveScreenshot` "Failed to take two consecutive stable screenshots" with a CHANGING WIDTH = a widget relaying-out during capture, not content jitter.** Learned live on Pur Crystal (Elementor + Crocoblock JetMenu). `fullPage` sizes the canvas to `documentElement.scrollWidth`; if height is stable but width flips between two values across the stability shots (e.g. `1280 ↔ 1852`, sometimes drifting `+Npx` each cycle), an element is overflowing right and being re-laid-out by the very resize/scroll `toHaveScreenshot` fires. Usual culprits: absolute-positioned **mega-menu dropdown panels** (JetMenu `.jet-mega-menu-mega-container`), **carousels/sliders** in loop mode (Swiper clones → the `+Npx` drift), off-screen modals. **Diagnose by instrumenting, never by guessing** — ONE eval walking every element for `getBoundingClientRect().right > innerWidth` names the exact node in a single shot (`playwright-cli --raw eval` against the live site is ideal). Blind fixes — accept/hide the cookie banner, eager-load images, retime the scroll — cost rounds and miss it; the banner is usually a RED HERRING here. **Fix = `display:none` the offending node inside the stabilize step** (it's typically a hover-only/hidden panel, invisible above the fold, so hiding it doesn't change the shot). Note `overflow-x: clip`/`hidden` on `html,body` does NOT clamp `scrollWidth` (absolute descendants escape the clip; `hidden` still reports content width) — only `display:none` removes the box from layout. Distinct from [visual-lazy-load](#visual-lazy-load) (below-fold lazy *images*).

<a id="cookie-consent"></a>
**[MUST] cookie-consent — identify the actual consent/cookie plugin before dismissing it, and prefer pre-seeding consent cookies over clicking a delayed banner.** A `dismissCookieBanner` written for one plugin's selectors is a SILENT no-op on another's: Pur Crystal ran the older **Cookie Law Info** (`cli-*`, `#cookie-law-info-bar`, accept `#cookie_action_close_header`) while the duplicated helper targeted **CookieYes** (`cky-*`), clicking a button that never existed. Confirm against the live DOM (`grep` the fetched page HTML for `cli-` / `cky-` / `#cookie-law-info-bar`). Banners frequently slide in AFTER load, so a click right after `goto` races the animation and is skipped — the deterministic fix is to set the plugin's OWN consent cookies BEFORE navigation so the bar never renders (Cookie Law Info: `viewed_cookie_policy=yes` + `cookielawinfo-checkbox-<category>=yes` via `context.addCookies`; CookieYes: its `cky-*` consent cookie). Cleaner than hiding it, and it also loads consent-gated content deterministically.

<a id="facade-not-widget"></a>
**[MUST] facade-not-widget — assert the lazy-embed placeholder, don't force-load it.** Lazy media/embed blocks (YouTube/Vimeo, maps, chat, "consent-gated" video) render a THUMBNAIL + a play/activate `<button>` and only mount the real cross-origin `<iframe>` after a click. Asserting the mounted iframe (`iframe[src*="youtube.com/embed"]`) fails because it never exists until interaction. Assert the FACADE's presence instead — it proves the embed is configured — and accept either form: `page.locator('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]').or(page.getByRole('button', { name: /youtube video/i }))`. Don't click through to load the heavy, flaky cross-origin frame just to satisfy an "embed exists" check (no-pong FAQ, GI 12). This is distinct from [visual-lazy-load](#visual-lazy-load) (lazy *images* in visual specs).

---

## Integrations

<a id="iframe-chain"></a>
**[MUST] iframe-chain — CSS doesn't cross iframes.** Chain `frameLocator()` per nesting level:
```typescript
await page
  .frameLocator('iframe[name^="__privateStripeFrame"]')
  .frameLocator('#challengeFrame')
  .locator('button[type="submit"]')
  .click();
```

<a id="gateway-popup-flow"></a>
**[MUST] gateway-popup-flow — hosted gateways are POPUPS now; three rules apply to all of them.** PayPal, Klarna and their peers moved their buyer flow out of the in-page iframe. Whatever the gateway, the shape is the same:
- **Wait for the popup to leave `about:blank`.** It opens blank and navigates seconds later, so every field check before that runs against a blank page and silently skips — the loop then burns its whole budget "finding nothing".
- **The popup is not your app** — plain Playwright locators inside it, never the resilient/Stagehand wrapper ([resilient-locators](#resilient-locators)). Do route the on-site gateway SELECT through the wrapper.
- **Drive it as a bounded state machine, not a step list** ([no-latching-flags](#no-latching-flags)), and match buttons by accessible name: sandbox screens routinely have no stable ids, and `getByRole('button', { name })` is the only thing that gets past them.

<a id="gateway-debug-env"></a>
**[MUST] gateway-debug-env — every gateway drive ships a `<GATEWAY>_DEBUG` switch.** `=1` prints one line per tick: the popup URL, each field's ACTUAL value (never the password itself, just whether it holds anything), the screen's visible copy, and every visible button with its id / aria-label / data-testid across all frames. `=2` additionally REFUSES to click on the final confirm screen — the observe-only run that shows you the review screen without spending a sandbox order. This is the cheapest tool in the migration: hosted gateways change without notice, a chain run costs ~4 minutes and one real order, and one dump beats three guesses. Wire it in before you need it, and name it in the failure message ([gateway-success-signal](#gateway-success-signal)).

<a id="gateway-success-signal"></a>
**[MUST] gateway-success-signal — only `/order-received/` proves payment; fail with a diagnostic body.** A closed popup, a vanished loader (what GI watched) and a redirect back to checkout all happen on ERROR too — the thank-you page renders only for a created order. So: loop until `/order-received/`, then `waitForURL` as a backstop, and if it still isn't there, throw an error carrying the **main page URL**, the **popup state** (never opened / closed / its current URL), any `.woocommerce-error` notices, and the `<GATEWAY>_DEBUG` hint. A bare `waitForURL` timeout names nothing and the next person starts the investigation from zero.

<a id="paypal-ppcp"></a>
**[SHOULD] paypal-ppcp — it's a popup, not just an iframe, and expensive to maintain.** → **`templates/paypal-ppcp.ts`** is the copy-paste-ready `payWithPayPal(page)` (env `PAYPAL_USERNAME`/`PAYPAL_PASSWORD`), proven across No Pong → Vesica → Cash Fore Clubs. **Port it verbatim** — CFC rewrote it by hand, lost days to a wrong CDP/zoid theory, and the fix was copying the proven version back in ([gateway-drift-recon](#gateway-drift-recon)). On top of [gateway-popup-flow](#gateway-popup-flow):
- The Smart Button lives in a cross-origin SDK iframe with a GENERATED name/src, mounted asynchronously — poll, and sweep `page.frames()` **unfiltered** for `getByRole('link',{name:/pay with paypal/i})` / `[data-funding-source="paypal"]`. Filtering frames on `frame.name()` (e.g. requiring `paypal_buttons`) is trusting a generated name, and it is what made CFC's button "click" without ever invoking `createOrder`.
- An unscoped `iframe[name*="paypal"]` matches PPCP's `__zoid__paypal_message__` frame (the "3 payments of £x" copy) FIRST — it holds no pay button; the unfiltered sweep is what saves you.
- **Fastlane** (`ppcp-axo-gateway`) is now often the default gateway: it hides `#place_order` behind *"Enter your email address above to continue"*, and selecting PayPal REMOVES `#place_order` entirely, replacing it with the Smart Button. A checkout helper that waits for `#place_order` after choosing PayPal waits forever.
- Order the loop **Next → Log In → approve, approve LAST**: Next and Log In belong to earlier screens, and trying approve first fires it at a screen that is not the review.
- The review SUBMIT is `#one-time-cta` (text "Pay"), NOT the "Pay in full" funding tile (`#id-pay-in-full-action`, a `role=checkbox` that only selects funding — clicking it forever never pays).
- **Throw when the sandbox creds are missing.** With empty creds every fill is a no-op and the run burns its full tick budget before failing as a generic timeout.
- GI's own recording may be BACKWARDS on the thank-you page: PPCP no longer substitutes the buyer's PayPal email, so the checkout email is what renders. Confirm live before porting an email assertion.
- Because it's this fragile, treat PayPal as **optional per region**: keep it on ONE reference region and DROP it from low-value regions (no-pong keeps PayPal on AU, dropped it from US) — pruning a high-maintenance flow is a valid migration decision, not a coverage gap.

<a id="klarna-adaptive"></a>
**[MUST] klarna-adaptive — Klarna's Adaptive Payment Flow is a popup; the GI iframe steps are dead but still present.** → **`templates/klarna.ts`** (`payWithKlarna(page, { popup })`). GI recorded in-page steps (`#onContinue__text` → `[data-testid="kaf-field"]` = `123456` → `#buy_button__text`); today Place order posts the order and Klarna opens a POPUP at `login.playground.klarna.com` for phone + OTP, while the in-page `js.playground.klarna.com` iframes stay INERT forever. A flat port doesn't error — it sits on `/checkout/` until the test times out. Capture the popup with `page.waitForEvent('popup')` armed AROUND the Place order click; it appears before your gateway helper is reached. Then:
- `[data-testid="kaf-field"]` is now the **phone** field, not the OTP field — both screens reuse it, so pick by the screen's copy, not the selector.
- `data-testid=confirm-and-pay` is on **three different buttons** across the screens — never select on it alone.
- The **offers dialog swallows clicks**: clicking the generic "Continue" opens it and its own `#offers-selector-continue-button` then sits on top, so a naive loop clicks the same button 20+ times and never pays. Try CTAs in priority order with the dialog's button FIRST and generic "Continue" LAST.
- Klarna's inputs are React-controlled — `pressSequentially`, not `fill` ([no-latching-flags](#no-latching-flags)).
- The popup sometimes **never opens** within 60s; Klarna then renders its own on-page recovery dialog (*"Don't see the Klarna window?"*) whose only handle is its accessible name. Handle it, and treat it as intermittent rather than a code bug.

<a id="email-open-in-page"></a>
**[MUST] email-open-in-page — always OPEN the email in `emailPage`; never assert on an API extract alone.** A Mailpit / Playgrounds REST fetch hands you a string; it does NOT prove the email renders. Navigate `emailPage` to the message's web view (Mailpit `/view/<id>`, the Playgrounds message URL) and run the assertions against the rendered DOM. Why it matters: a broken template — unparsed shortcode, missing totals table, empty `<del>`/`<ins>` refund pair, an address block that collapsed — passes a raw-body substring check but is visibly wrong in the page, and the trace/video/screenshot then carries the actual email the customer received.
- Use the API ONLY to RESOLVE which message to open — poll by subject + recency + non-empty body per [email-mailpit](#email-mailpit) — then hand the id to `emailPage.goto`.
- Assert the same facts you assert everywhere else in the opened page: product name + line total ([line-item-parity](#line-item-parity)), every total row ([cart-checkout-totals](#cart-checkout-totals)), the full billing + shipping block ([full-address](#full-address)), payment method. The email is a first-class parity surface, not a smoke check.
- Leave the message open at the end of the flow so a failure screenshot shows it, and log the subject you opened ([step-logging](#step-logging)).
- Emails run in the SAME test as the order that triggered them ([one-order-one-test](#one-order-one-test)).

<a id="email-line-row"></a>
**[MUST] email-line-row — read the email's line item from its ROW, not by pattern-matching the body; the email has a Quantity COLUMN where the thank-you page writes `× N`.** The order email template renders `Product | Quantity | Price` — the quantity is a cell of its own (`2`), while order-received/view-order render it inline as `Product × 2`. A quantity assertion ported from the thank-you page as `/(?:×|x)\s*2\b/` over the body therefore fails on an email that is perfectly correct, and relaxing it to a bare `\b2\b` is worse: it matches a digit inside a price and passes forever.

- **Find the row, then read its cells.** Prefer WooCommerce's own `tr.order_item`; else the INNERMOST row carrying the product name (>1 cell, no nested `<tr>` — the nested-table caveat from [itemized-tax](#itemized-tax) applies here too, since an outer wrapper row "contains" the name and comes first in document order).
- **Classify cells by shape, not position.** Quantity = a cell that is JUST a count (`2` or `× 2`); line total = the LAST cell that reads as money. Column order differs per template, and a Price column can sit either side of Quantity.
- **Verify the reader against a REAL message before spending a run.** A previously-sent email is still in the trap inbox: resolve it over the API, open it in a browser, and run the reader's `evaluate` body against it. That is seconds, needs no order, and it is how both of these bugs (the `× N` mismatch and the wrapper-row tax sum) were caught — each would otherwise have cost a full chain run and a real order ([verify-every-slice](#verify-every-slice)).

<a id="email-playgrounds"></a>
**[SHOULD] email-playgrounds — email assertions via SAU/CAL Email Redirect To Playgrounds plugin.** Runs through `page.evaluate()` (WPEngine WAF blocks non-browser POSTs to `admin-ajax.php`). Plugin must be active per-subsite, admin user added to each subsite. Filter by site title for parallel safety. → **`templates/playgrounds-email.ts`**. After viewing `mail.playgrounds.saucal.io/...` navigate back to subsite root before next call (different host strips `ajax_object`). **ESP relays lag AND reorder.** When a site sends through a real ESP (SendGrid etc. — tracker-link rewriting, e.g. `url….com/ls/click`) instead of a local trap, delivery is delayed and out-of-order: widen the email poll window (no-pong needed 60s→120s) and never assume `messages[0]` is the one you just triggered — resolve by subject + recency (see [email-mailpit](#email-mailpit), Mailpit newest-first).

<a id="email-mailpit"></a>
**[MUST] email-mailpit — wait for the BODY, and target the totals row, not the first match.** (a) Mailpit indexes a message (it appears in search) a beat BEFORE its HTML/Text body is stored; returning on the first search hit yields an empty body and a false content-assertion failure. Poll until a matching message with a non-empty body exists (fetch `/api/v1/message/<id>`, require `HTML||Text`), optionally gated on a `contains` token so you wait for the email that actually references this order. (b) Refund/order emails carry `<del>`/`<ins>` price pairs on EACH LINE ITEM as well as the totals row, so matching the FIRST `<del>` grabs an item price, not the order total — target the totals row: take the pair whose struck amount equals the captured order total (or the LAST pair, GI's `order-totals-last`).

<a id="order-notes"></a>
**[MUST] order-notes — scan all + regex match.** Plugins reorder/insert notes; `nth-of-type` selectors break across environments. → **`templates/order-notes.ts`**. Note that the **customer note is NOT in the notes timeline** — WooCommerce renders it as `p.order_note` inside the billing/shipping address block, so scanning `.order_notes li .note_content` for it never matches and reads as a missing note.

<a id="refund-void"></a>
**[MUST] refund-void — fill the refund form before submitting; note + post-status are gateway-specific, make them config-driven.** The admin gateway refund button is a silent no-op at $0 — WC computes the refund amount from the form, which starts empty. Before clicking the gateway refund button: copy each line item's ordered qty → `input.refund_order_item_qty` (WC auto-fills line totals on the `change` event), and copy fee/shipping `.view` amounts → `tr.fee` / `tr.shipping … input.refund_line_total` / `refund_line_tax`. **Poll the computed refund amount `> 0` before submitting** — a silent $0 refund leaves no gateway note and the assertion then fails on a *missing* note (misleading). Refund parity differs per gateway for the SAME GI step: a refund-capable gateway emits `<Gateway> Refund …` and the order goes **Refunded**; a gateway that voids the same-day auth emits `<Gateway> … Void … approved` and the order goes **Cancelled**. Drive the note regex + post-refund status off config (`OrderConfig.refundNotePattern`, `OrderConfig.refundedStatus`), never hardcode — see `specs/orders/place-order-composite.spec.ts`. Reverse line splits from the order itself (see [warn-tax-shipping](#warn-tax-shipping)), not a hardcoded rate. Three more silent traps, all learned live on Leggari Academy → reference implementation **`templates/admin-refund.ts`**:

- **The submit button confirms via a NATIVE dialog, and Playwright's default is to DISMISS it** — the click resolves, nothing refunds, no note, status stays `Processing`. GI has no step for this because **Ghost Inspector auto-ACCEPTS dialogs**, so every port silently loses the confirm. Register `page.on('dialog', (d) => d.accept())` BEFORE the click. Use `on`, not `once`: a [resilient-locators](#resilient-locators) click retries through alt/Stagehand tiers, and a consumed handler lets the retry's dialog fall back to auto-dismiss. Never `.catch()` the `accept()` — it rejects precisely when something else already dismissed the dialog. This applies to EVERY admin action behind a confirm (refund, delete, resync), not just refunds. **Then actually remove it** — `page.off('dialog', handler)` in a `finally`, with the handler in a named const. A comment claiming the handler "is then removed so it doesn't leak" next to code that never calls `off()` leaves an accept-all handler live for the rest of the test, silently auto-confirming every later dialog. On a lazy page, register only AFTER the first `goto` ([lazy-init-fixtures](#lazy-init-fixtures)).
- **More refund buttons keep appearing.** Store-credit / wallet plugins add their own (`Refund £89.99 via store credit` showed up mid-migration, making three where GI saw two). Anything selecting on `do-api-refund` must assume MULTIPLE matches — pin the gateway's own button by its full accessible name, not the class.
- **End the flow on a POSITIVE signal, not on swallowed waits.** `.blockUI` waits written as `.catch(() => {})` make "the refund never started" and "the refund succeeded" indistinguishable — the flow returns green and the failure surfaces 20s later in `assertRefundResult` as a wrong *status*, pointing at the wrong code. Wait for the artifact the gateway call produces: `tr.refund` (which GI's refund step asserts anyway).
- **"Config-driven" means the gateway SHAPE, not the AMOUNT.** A config `refundNotePattern: /Refunded \$?999\.00 .* Refund ID: re_\w+/` is still a hardcoded total: it silently stops matching the day the spec's plan becomes $199, and reads as a missing note. Derive the amount from the captured order total (`result.firstTotal`, regex-escaped so the currency symbol and thousands separators survive — the note prints the same `wc_price` string as the thank-you page). Keep the config override for genuinely gateway-specific wording only. Corollary: the note separator is often an **en dash** (`Refunded $199.00 – Refund ID: …`), so never pin the punctuation between fields.

<a id="account-creation"></a>
**[MUST] account-creation — passwordless verify-email + "logged user" = the SAME account, not admin.** Registration and checkout create-account can be **passwordless**: the form is email-only ("a link to set a new password will be sent"). Flow: register → fetch the "account has been created" email → follow the "set your new password" link → set `#password_1`/`#password_2` (this verifies the email AND logs the user in). It's the same set-password page as forgot-password — share one helper. Watch for **reCAPTCHA** on the standalone register form (a raw submit may be blocked). When a GI test reuses "the logged-in user" across orders, that means the **same account from the prior order**, not admin — its saved address prefills checkout. Playwright equivalent without the email round-trip: in a `describe.serial` block, save the new user's cookies (`context().storageState().cookies`) after order 1 and `addCookies` them in the logged-user test; drive identity off the reused account email (`OrderConfig.accountEmail`), not a per-test address. Contractor/role registration with a file upload (EIN/company/license) keeps a committed placeholder fixture under `tests/fixtures/` — see `helpers/contractor.ts`; don't delete it.

<a id="login-helper"></a>
**[MUST] login-helper — reuse the polling login helper; know which forms arm on blur.** Never hand-roll a login with a blind `waitForTimeout` — reuse one `loginAccount`-style helper that POLLS for a success signal (`expect(.woocommerce-MyAccount-navigation).toBeVisible`). Gotcha that costs a silent no-op: some REGISTER forms arm their submit button on the password field's `blur` event, so a submit-without-blur first click does nothing (no-pong `#reg_password`). The LOGIN form usually doesn't need the blur because the helper polls. A login/register that "does nothing on click" is probably missing a blur, not broken selectors (see [silent-failure-checklist](#silent-failure-checklist)).

---

## Multi-region / multi-env / multisite

<a id="region-outermost"></a>
**[MUST] region-outermost — region as the outermost dimension.** Per-region SuiteVars from per-region API. Per-region constants in a typed map (`regionConfig: Record<'au'|'ca'|'us', { currency, taxRate, ... }>`) inside the site helper. **Entity IDs drift per subsite** — product/term/page IDs are NOT shared across regional subsites (no-pong: the 85g product was `1684403` on AU but `750731` on CA). Confirm every hardcoded ID live on each region; a copied ID silently adds the wrong product or 404s. Keep IDs in the per-region `regionConfig` map, never a single shared constant.

<a id="env-as-project"></a>
**[MUST] env-as-project — every environment/tier is a Playwright PROJECT dimension, not an env var.** When a site has multiple deploy tiers/environments, don't gate on a `TARGET_ENV` env var — that only ever surfaces ONE per run and hides the others from the runner. Make each its own project with its own `baseURL`, so you get one selectable list per environment in the VS Code Explorer and `--project=<env>` on the CLI.
- **Multi-region:** generate region×tier from a typed map (`REGIONS × TIERS → baseUrlFor(region, tier)`), e.g. `au-preprod`, `au-develop`, `ca-preprod`.
- **Single-region, multiple sites (the common maintenance case — PLS runs on two staging sites, `pls-maintenance.mystagingwebsite.com` + `pls.mystagingwebsite.com`):** there is NO region dimension — map a flat `ENVIRONMENTS` array straight to projects:
  ```ts
  const ENVIRONMENTS = ['maintenance', 'main'] as const;         // faithful to the hostnames
  const baseUrlFor = (env: string) => process.env[`BASE_URL_${env.toUpperCase()}`] ?? process.env.BASE_URL;
  projects: ENVIRONMENTS.map((env) => ({ name: env, use: { ...devices['Desktop Chrome'], baseURL: baseUrlFor(env) } })),
  ```
  `.env` holds one `BASE_URL_<ENV>` per site with a `BASE_URL` fallback. Run one with `--project=maintenance`, all by omitting `--project`. Do NOT keep a top-level `use.baseURL` — the per-project one must win. Sites that share admin creds need no per-env creds; the lazy per-site auth ([auth-scales](#auth-scales)) already keys `auth/admin-<project>.json` off the project name + its `baseURL`, so only the site you run authenticates.
- **Consequence (both cases): visual baselines are per-project** — filenames carry the project (`home-au-develop-darwin.png`, `home-maintenance-darwin.png`); regenerate per environment with `--update-snapshots`.

<a id="multisite-subsite"></a>
**[MUST] multisite-subsite — subsite-per-project (payoneer pattern).** Each subsite is a Playwright project; `baseURL` ends with subsite path + trailing slash. **Never use leading `/`** in `page.goto` — strips subsite path. Always relative (`'cart/'`, `'wp-admin/'`, `'./'`). Refund/destructive specs run on a single project (`REFUND_PROJECT` env) — replicating across all 4 wastes time. Admin user must exist on EACH subsite (network-add or per-subsite User → Add Existing) — admin AJAX rejects users not registered to subsite.
```typescript
projects: [
  { name: 'embedded-classic', use: { ...devices['Desktop Chrome'], baseURL: `${MULTI_HOST}/embedded-classic/` },
    testMatch: ['cc/embedded.spec.ts', ...(REFUND_PROJECT === 'embedded-classic' ? ['refund/refund.spec.ts'] : [])] },
  { name: 'embedded-block', use: { ...devices['Desktop Chrome'], baseURL: `${MULTI_HOST}/embedded-block/` }, testMatch: ['cc/embedded.spec.ts'] },
  // ...
]
```

<a id="auth-scales"></a>
**[MUST] auth-scales — auth strategy scales with host count.** [global-setup](#global-setup) (log in once → `auth/admin.json`) is correct for one host (incl. a multisite whose subsites share the parent cookie). But when regions live on SEPARATE hosts (no-pong AU = `no-pong-au…`, US = `no-pong-america…`), a single global-setup either logs into all N hosts every run or covers only one. Drop global-setup and authenticate LAZILY per host: an `ensureAdminState(project, baseURL)` called on first `adminPage`/`emailPage` use logs into THIS project's host only if `auth/admin-<project>.json` is missing (cross-worker `.lock`), so you only authenticate the site you actually run. Do NOT use a setup-project dependency for this — it surfaces a fake "authenticate" entry as a test in the runner.

---

## Maintenance-suite specifics

<a id="warn-tax-shipping"></a>
**[WARN] warn-tax-shipping — warn (don't fail) when Tax or Shipping is missing OR $0.** On full-site maintenance suites (repurposedmaterials, no-pong, etc.) it is sometimes legitimate to ship a checkout with no tax line (digital-only catalog, tax-exempt region) or no shipping line (virtual products only, free-shipping zone covering the test address). On other sites the absence — or a present-but-`$0` value — is a real config regression: a tax class got unassigned, a shipping zone was deleted, a rate got zeroed, a product type got switched. Treat tax and shipping as **expected-by-default**: warn on both the missing-row case and the `$0` case.

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

Tax-rate-dependent calculations (partial refund splits, line-tax assertions) must derive the rate from the order itself (`order.shipping_tax / order.shipping_total`, or `line.total_tax / line.total`) — SUMMING every tax row/column first ([itemized-tax](#itemized-tax)) — rather than hard-coding a percentage — sites under maintenance can have any rate from 0% upwards, including changes between runs.

<a id="ci-record-compare"></a>
**[MUST] ci-record-compare — CI records baselines on content sync and compares on deploy; never runs on push.** → `templates/playwright.yml`

This suite places real orders, registers accounts and hits live payment gateways, so `on: push` / `on: pull_request` against every branch is wrong — the stock `npx playwright init` workflow (push + PR on `main`) is a landmine, delete it rather than adapt it. There are exactly two automatic triggers, and they are two halves of one cycle:

| | Trigger | Runs |
|---|---|---|
| **RECORD** | the content-sync job finishes green (Saucal platform: `Maintenance Handler` running `staging-sync`) | visual specs only, `--update-snapshots` |
| **COMPARE** | a maintenance PR merges into a non-production branch **and its deploy goes green** | full suite, no update flag |

The sync replaces content from production, so every prior baseline is stale by definition — re-record there. Content is then frozen until the next sync, which is what makes the merge-time screenshot diff *purely the code change*. Inverting this (recording on the compare run) rewrites the baseline it was supposed to check, and every visual test passes forever.

- **Wait for the deploy — merging only STARTS it.** Poll the deploy run for that exact merge commit (`gh run list --workflow=<deploy>.yml --commit "$sha" --json status,conclusion`) and fail on a red deploy. Without the wait you test the pre-merge site; without the conclusion check you report a failed *deployment* as a failed *test suite*. Budget ~5-6 min on the Saucal platform.
- **Baselines live in the Actions cache, never in git.** Full-page PNGs run to ~10MB each — tens of MB per site — and are re-recorded on every sync, which bloats history within a couple of maintenance cycles. Save under a key unique per run (`pw-snaps-<project>-${{ github.run_id }}`) so a record run always writes a NEW entry, and restore by the `pw-snaps-<project>-` prefix to pick up the last sync. Caches created on a branch are readable from PRs targeting it, which is exactly the record → compare hop.
- **Handle the cache miss explicitly.** Actions caches evict after 7 days unused. A missing baseline makes Playwright write the actual and fail — and `retries: 1` does *not* mask it, the retry fails too — so a whole evicted set surfaces as a screenful of mystery reds. On a restore miss, `--grep-invert` the visual tests with a `::warning::`; if the run was visual-only, `::error::` with the recording instructions instead of letting Playwright emit its bare `No tests found`.
- **The environment count is per project — do not assume two.** The trigger branches, the `environment` choice options, the branch → project map and the matrix all derive from the config's `ENVIRONMENTS` ([env-as-project](#env-as-project)). Some projects have two staging tiers (leggari `preprod` + `staging`, PLS `maintenance` + `main`), plenty have exactly one. With one tier: list the single env, drop the `both` option, collapse the map to a single arm, and let the matrix carry one entry — never invent a second tier to fill the template in. Baselines are cached per project either way, so the cache keys need no change.
- **No content-sync automation in the project?** Keep the compare trigger, delete the record trigger, and dispatch manually with `update_snapshots=true` after each content refresh.

Everything project-specific in the template is marked `ADAPT:` — `grep -n 'ADAPT:' .github/workflows/playwright.yml` after copying and work the list. The template assumes the suite is at the repo root; `ADAPT: suite root` marks every path to prefix if it is not.

<a id="coverage-tags"></a>
**[MUST] coverage-tags — every `test.describe` declares `@plugin` coverage tags.** Native Playwright tags name which WP plugins the spec exercises: `test.describe('…', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-composite-products'] }, () => { … })`. Slugs MUST be the WP plugin-folder slugs (anchored to a leading alphanumeric) so the maintenance `coverage-check` step can map an updated plugin → its tests. `npm run lint:plugin-tags` fails CI on any untagged spec; `npm run coverage:manifest` regenerates `coverage-manifest.json`; `npm run coverage:gaps` writes the gap list. A maintenance run filters to changed plugins via `--grep "@plugin:woocommerce|@plugin:kadence"`.

---

## Silent-failure checklist

Check these FIRST when a test fails for no obvious reason.

**Measure before you theorize.** The two most expensive debugs of the CFC migration were both plausible theories that outran the evidence — "CDP/out-of-process iframes break PPCP" (wrong: the same flow runs over CDP in a sibling suite; the defect was in our own helper) and "animations break the refund click" (wrong in the general form: it was specifically cross-document view transitions). Each was settled in minutes by ONE measurement — an A/B across browser sources, a page snapshot plus prior art — after hours of reasoning got nowhere. When a theory needs a third paragraph, stop and instrument: that is what the trace, the failure screenshot and `<GATEWAY>_DEBUG` are for ([fixture-artifacts](#fixture-artifacts), [gateway-debug-env](#gateway-debug-env)).

- **Wrong credential env key.** Login using `PASSWORD` when global-setup reads `ADMIN_PASS` (or vice-versa) fails silently at auth. Confirm the exact key global-setup reads.
- **Login/register "does nothing on click".** Probably a missing `blur` on the password field, not broken selectors (see [login-helper](#login-helper)).
- **UI-mode title edit orphans the test.** Editing a spec title in Playwright **UI mode** mid-run leaves a 0.0ms spinner that never resolves — run from the CLI to triage.
- **Mailpit search is newest-first.** When two same-subject emails land in one inbox (order 1 + order 2 on a reused account), `messages[0]` is the LATEST — order your assertions so each resolves the right message.
- **`$0` / "price on request" products** pass a naive `<= max` price picker and break price parity — require `p > 0` in the picker.
- **Visual "two stable screenshots" failing with a CHANGING WIDTH** → a widget is overflowing and relaying-out during capture (see [visual-width-flip](#visual-width-flip)). Eval-walk for `getBoundingClientRect().right > innerWidth` to name it; do NOT blame the cookie banner.
- **An admin button "clicks" but nothing happens** → it's behind a native `window.confirm` and Playwright **auto-dismissed** it (GI auto-accepted, so the ported step has no handler). Register `page.on('dialog', (d) => d.accept())` before the click (see [refund-void](#refund-void)).
- **A tax assertion fails with a value that is a FRACTION of the expected one** → the admin panel itemizes tax per rate (`State Sales Tax` + `County Sales Tax`) while the customer sees one aggregate, and the reader kept the last row instead of summing ([itemized-tax](#itemized-tax)). Reads as a tax regression; it is a reader bug.
- **A note/text assertion fails with the note plainly present in the dump** → the pattern pins a literal amount that no longer matches the spec's product, or pins punctuation between fields (WC uses an **en dash**). Derive amounts from captured values; use `.*` between fields.
- **Read the trace's `error-context.md` FIRST.** Its ARIA page snapshot shows the actual rendered state at failure (banner still visible, wrong heading text, "Invalid order." notice) and usually reframes the whole investigation before you touch code.
- **`dismissCookieBanner` doing nothing** → wrong plugin selectors (`cli-*` vs `cky-*`) or the banner slides in after the click; pre-seed consent cookies (see [cookie-consent](#cookie-consent)).
- **An element is visible, enabled, correctly labelled in the snapshot — and the click still times out on "stable"** → a cross-document view transition froze the compositor on the previous page's snapshot. Set `reducedMotion: 'reduce'` ([view-transition-freeze](#view-transition-freeze)). Same cause if `page.screenshot()` hangs or the video freezes white.
- **The shipping address block vanished and `fillShippingDetails` fails** → check `woocommerce_ship_to_destination` FIRST. Someone flipping it to `billing` (no repo code writes it, and WP has no activity log for it) makes `form-shipping.php` hide the whole block, and code that passed an hour ago starts failing.
- **A select2 country/state click hangs to timeout** → you re-clicked an ALREADY-selected option: the `<li>` passes actionability but select2 detaches it as the pointer event lands. Skip the select2 dance when the value is already correct.
- **The gateway "clicks" forever and never pays** → you're clicking a funding-source tile, not the submit (PayPal's `#id-pay-in-full-action` is a `role=checkbox`), or a dialog is sitting on top of your target and swallowing the click (Klarna's offers dialog). See [paypal-ppcp](#paypal-ppcp) / [klarna-adaptive](#klarna-adaptive).
- **The checkout just sits there with no error after choosing a gateway** → the gateway moved to a popup flow and the ported in-page iframes are inert-but-present ([gateway-drift-recon](#gateway-drift-recon)). Also check for Fastlane removing `#place_order`.
- **A run that passed yesterday is refused with "There are some issues with the items in your basket"** → a previous failed run left a pending order holding the only unit of that product ([stock-hold](#stock-hold)). Rotate products; the hold expires on its own.
- **A `resilient*` failure whose message mentions the AI tier** → if the Stagehand credit balance is exhausted, EVERY locator resolves on the Playwright tiers only, so the AI-tier line is noise and the real news is that primary AND alt were both wrong.
- **`CDP transport closed: socket-close code=1006` / "Target page, context or browser has been closed"** → infrastructure, not the helper the stack names; plain re-runs pass. If it becomes frequent, suspect the Stagehand-backed browser, and check the keepalive ([cdp-keepalive](#cdp-keepalive)).

---

## Coverage self-audit

A pass over the WHOLE suite before ship, answering two questions for EVERY order / subscription / membership test: *did the migration keep everything the GI suite checked?* and *does every fact get asserted on every surface that renders it?* The cheap regressions hide in the gap between "the grand total is right" and "every line that adds up to it is right" — a wrong subtotal cancelled by a wrong shipping passes a total-only check. Run this audit, record any deliberate omission in the ledger, then let [Definition of done](#definition-of-done) lint the mechanics.

<a id="gi-parity-audit"></a>
**[MUST] gi-parity-audit — every migrated spec accounts for its GI parent.** For each generated spec, diff its assertions against the source GI test's checks (the annotated `suites/**/<test>.json`). Every GI assertion maps to a kept `expect()` — reorganised per [expect-home](#expect-home), NEVER silently dropped ([What NOT to do](#what-not-to-do): every generated `expect()` is preserved). Any GI check with no home in the suite is a coverage regression: fix it, or record it in the ledger with a reason (GI-flake, pinned-data replaced by behaviour per [assert-behaviour](#assert-behaviour), surface genuinely gone). A spec is not "done" until its GI parent is fully accounted for — don't count green as complete while assertions went missing in translation.

**The migration's real failure mode is SILENT COVERAGE LOSS, not red tests.** GI assertion steps port as bare reads with no `expect()` — the value is captured, nothing is checked, the suite is green and the coverage is gone. This survives more than one review: on CFC an audit pass found a batch, then the final whole-branch review found **nine more** in specs that had already been reviewed. So audit twice, and audit mechanically: `grep -nE "await (resilientText|page|.*\.locator)\(" specs helpers | grep -v expect` gets you the candidate list, then check each against its GI parent. Two of those nine were correctly NOT assertions but missing **preconditions** — a thrown `Error` guarding a destructive publish click — so "add an `expect()`" isn't always the fix; "it must fail loudly" is.

<a id="line-item-parity"></a>
**[MUST] line-item-parity — assert the PRODUCTS, not only the money.** [parity-matrix](#parity-matrix) covers totals / address / payment but omits two columns that belong on every surface listing items — **product name** and **per-line product total**. Capture both once at order-received and assert them on thank-you, My Account view-order, order email, and the admin editor. `normalizeProductName` for cross-surface wording drift (see AU parity). A missing line, a renamed product, or a wrong line total is a real regression the grand-total assertion masks when two line errors cancel — assert each line, don't trust the sum.

<a id="cart-checkout-totals"></a>
**[MUST] cart-checkout-totals — assert EVERY total ROW individually, even when the sum is correct.** (Tax may be several rows on one surface and one on another — sum them first, [itemized-tax](#itemized-tax).) Extends the parity discipline BACK to the pre-order **cart** and **checkout review** pages, not just post-order surfaces. Assert each row as its own `expect()` — subtotal, shipping, tax, discount / coupon, fees, grand total — never only the total. A correct grand total built from a wrong subtotal + a compensating shipping error is a bug the sum hides. Use the shared `expectMoney` that SKIPS legitimately-absent rows per [parity-matrix](#parity-matrix) (don't assert `$0` for a row a surface omits), read money from the DOM per [money-dom](#money-dom), and NEVER weaken a row to make the page pass ([dont-weaken](#dont-weaken)).

<a id="subscription-audit"></a>
**[MUST] subscription-audit — first + recurring totals AND addresses, everywhere.** For every subscription test confirm the audit covers BOTH the first-payment total and the per-renewal recurring total per [subscriptions-recurring](#subscriptions-recurring), and BOTH billing and shipping address blocks (parity-matrix asserts billing — add shipping wherever the flow ships a physical product). Assert recurring on thank-you / My Account view-subscription / email / admin subscription editor unconditionally; compare admin recurring against the captured *recurring* total, not the first payment.

<a id="membership-audit"></a>
**[MUST] membership-audit — WooCommerce Memberships is its OWN coverage, not a subscription alias.** When a purchase grants a membership, assert three facts independently of any subscription: the **plan name**, the **membership status** (`Active`), and the **granted access** (a page / product that was restricted before is now reachable for the buyer). Surfaces: My Account **Memberships** tab, admin (the user's profile / the Memberships editor), and the membership email if the plan sends one. A membership can exist without a subscription and a subscription without a membership — never assert one and assume the other; renewal pricing still rides [subscriptions-recurring](#subscriptions-recurring).

<a id="visual-coverage"></a>
**[MUST] visual-coverage — the suite SHIPS visual comparisons, and the audit confirms it.** Every migrated suite needs at least one data-driven visual spec (`toHaveScreenshot`) covering the site's load-bearing templates — home, shop/archive, single product, cart, checkout, my-account — plus every page whose GI parent was a screenshot/nav test ([triage-tests](#triage-tests)). "This suite has no visual spec" is a coverage gap to fix or ledger, never a silent default. Confirm: baselines persisted per PROJECT (filenames carry the project — [env-as-project](#env-as-project)); WHERE they persist depends on who records them — a CI record/compare cycle keeps them in the Actions cache and gitignores them, a suite recorded only locally commits them and eats the size ([ci-record-compare](#ci-record-compare)); the lazy-load and width-flip stabilizers wired in ([visual-lazy-load](#visual-lazy-load), [visual-width-flip](#visual-width-flip)), and image-driven instability diagnosed + ledgered rather than styled out of the capture ([visual-image-lock](#visual-image-lock), [visual-intrinsic-size](#visual-intrinsic-size)); shots full-page unless the target is one component ([visual-fullpage](#visual-fullpage)); consent banner pre-seeded so it never lands in a baseline ([cookie-consent](#cookie-consent)); dynamic money/date regions masked so a baseline tracks LAYOUT, not value drift.

**Per-test tickbox** (run for every place-order / subscription / membership spec):
- [ ] Every GI-parent assertion has a home or a ledgered reason ([gi-parity-audit](#gi-parity-audit)).
- [ ] ONE test drives shopper + admin + email for that order — no split sibling tests ([one-order-one-test](#one-order-one-test)).
- [ ] Product name + unit price + per-line total asserted on thank-you, My Account, opened email, admin ([line-item-parity](#line-item-parity)).
- [ ] Every total ROW (subtotal · discount · shipping · tax · fees · total) asserted individually in **cart** AND **checkout** ([cart-checkout-totals](#cart-checkout-totals)) **and** on all four post-order surfaces ([parity-matrix](#parity-matrix)) — not just the sum.
- [ ] Tax present, or a warn emitted when missing/`$0`; shipping present, or a warn when missing/`$0` (`Free` is fine) ([warn-tax-shipping](#warn-tax-shipping)).
- [ ] FULL billing + shipping address asserted (every line, normalized) on every surface that renders it ([full-address](#full-address)).
- [ ] Order email OPENED in `emailPage` and asserted against the rendered DOM, not an API extract ([email-open-in-page](#email-open-in-page)).
- [ ] Payment method asserted customer-side + `Payment via <Method>` admin meta ([parity-matrix](#parity-matrix)).
- [ ] Subscription: first + recurring totals and both addresses on every surface ([subscription-audit](#subscription-audit)).
- [ ] Membership: plan + status + granted access on My Account / admin / email ([membership-audit](#membership-audit)).
- [ ] Step-completion `console.log` lines cover the whole journey ([step-logging](#step-logging)).

**Per-suite tickbox** (run once before handoff):
- [ ] Visual specs exist for the load-bearing templates, baselines persisted per project — cached if CI records them, committed if not ([visual-coverage](#visual-coverage), [ci-record-compare](#ci-record-compare)).
- [ ] Every `test.describe` carries `@plugin` tags ([coverage-tags](#coverage-tags)).
- [ ] Every deliberate omission is written down in the ledger, with its reason.

---

## Definition of done

Before emitting the suite, verify each — these are the lint gates the reference suites enforce:

- **No inline assertions in specs:** `grep -rnE "expect\(" specs` returns only `toHaveScreenshot` lines ([expect-home](#expect-home)).
- **Every assertion carries a message:** `grep -nE "expect\([^,]+\)\." helpers/assertions.ts` returns zero ([expect-message](#expect-message)).
- **No raw locator calls outside the wrapper** in `helpers/*` and specs, except the enumerated exceptions ([resilient-locators](#resilient-locators)).
- **No `page.goto()` to cart/checkout** — only the enumerated allowed `goto` targets ([nav-via-clicks](#nav-via-clicks)).
- **Every `test.describe` has `@plugin` tags:** `npm run lint:plugin-tags` passes ([coverage-tags](#coverage-tags)).
- **No `Record<string, string>` vars bags** remain ([config-objects](#config-objects)).
- **No hardcoded credentials or URLs** — all via `.env` ([credentials-env](#credentials-env)).

<a id="verify-every-slice"></a>
**[MUST] verify-every-slice — code-complete + typechecked + gate-clean is NOT verified.** Every slice gets at least one live run against the real environment before it ships, and any slice that didn't gets **named as unverified at handoff**, in the handoff notes and in the branch's problem log — not left to be discovered. An unrun slice is the largest risk on a branch precisely because it looks identical to a passing one in the diff (CFC shipped its quotes slice this way: code-complete, typechecked, gate-clean, never once executed). If an agent shouldn't spend the run — real sandbox refunds, real money, destructive admin actions — say so explicitly and hand the exact command to the user rather than marking the slice done. Same discipline for leftover state: list every real order / account / upload the migration created on staging.
- **`force: true` audited** — none on real buttons/links/inputs ([force-audit](#force-audit)).
- **Every generated `expect()` is preserved** (reorganised, never removed).
- **GI parity accounted** — every source GI assertion maps to a kept `expect()` or a ledgered omission ([gi-parity-audit](#gi-parity-audit)).
- **Line items asserted** — product name + unit price + per-line total on every surface that lists them ([line-item-parity](#line-item-parity)).
- **Every total row asserted individually** in cart + checkout + post-order surfaces, not only the grand total ([cart-checkout-totals](#cart-checkout-totals)).
- **Tax + shipping warned, not shrugged** — missing or `$0` emits `console.warn` (`Free` exempt) ([warn-tax-shipping](#warn-tax-shipping)).
- **Tax rows summed, not last-one-wins**, in every totals reader ([itemized-tax](#itemized-tax)).
- **Full billing + shipping address asserted**, normalized, on every surface that renders it ([full-address](#full-address)).
- **Order email OPENED in `emailPage`** — no assertion rides on an API extract alone ([email-open-in-page](#email-open-in-page)).
- **One order = one test** driving shopper + admin + email; serial chains only for order-mutating steps ([one-order-one-test](#one-order-one-test)).
- **Visual specs present** with per-project baselines persisted — cached if CI records them, committed if not ([visual-coverage](#visual-coverage), [ci-record-compare](#ci-record-compare)).
- **Step-completion `console.log`** on every flow phase, carrying the captured values ([step-logging](#step-logging)).
- **Subscription + membership coverage complete** — first/recurring totals + addresses ([subscription-audit](#subscription-audit)); plan/status/access ([membership-audit](#membership-audit)).
- **`test:<area>` scripts point only at folders that exist** ([package-json](#package-json)).
- **`npm run typecheck` (`tsc --noEmit`) passes.**

---

## Output format

Each file with full path and complete contents — no placeholders or `// ...existing code...`. Generate in this order:

1. `package.json`
2. `tsconfig.json`
3. `.env.example` / `.gitignore`
4. `playwright.config.ts` (← `templates/playwright.config.ts`)
5. `global-setup.ts` (← `templates/global-setup.ts`; or lazy per-site auth per [auth-scales](#auth-scales))
6. `types/test-config.ts` + `types/woocommerce__e2e-utils-playwright.d.ts` (← template)
7. `fixtures/index.ts` (← `templates/fixtures.ts`)
8. `helpers/resilient.ts` (← `templates/resilient-locators.ts`)
9. `helpers/<site>.ts` — site-specific selectors, card data, billing constants, classic/blocks branch, `waitForCheckoutReady`
10. `helpers/wc-api.ts` (← `templates/wc-api.ts`; OMIT if no REST usage)
11. `helpers/flows.ts` — high-level orchestrators returning Result objects
12. `helpers/assertions.ts` — all `expect()`, branching on TestConfig + SuiteVars
13. Spec files under `specs/<feature-area>/`

Do NOT generate the `README.md` here — it is a post-approval step (see [Handoff](#handoff)).

---

## Handoff

`template-automation` is the BUILD home, not the final home. Once the user has APPROVED the working suite (specs reviewed / passing live), do these — each gated on explicit user approval, in order:

1. **Run the pre-handoff verification pass — VERIFY in the code, don't assume.** The suite being green is not evidence that it covers what it should; green with a missing assertion looks identical to green with it. For each item below, grep/read the actual specs + helpers and report per test: **asserted** / **missing** / **ledgered omission with reason**. Anything missing gets fixed (or ledgered with the user's agreement) BEFORE the README and the repo move.
   - [ ] **Product name + price** asserted on all four surfaces — thank-you, My Account view-order, admin order editor, opened email ([line-item-parity](#line-item-parity)).
   - [ ] **Subtotal, discount, shipping, tax, fees, total** each asserted individually on all four surfaces AND in cart + checkout ([cart-checkout-totals](#cart-checkout-totals), [parity-matrix](#parity-matrix)) — a grand-total-only check is a fail here.
   - [ ] **Tax may legitimately be absent, but never silently** — missing or `$0` emits a `console.warn`; same for shipping, with `Free` exempt ([warn-tax-shipping](#warn-tax-shipping)).
   - [ ] **Every totals reader SUMS the tax rows** — the admin panel itemizes per rate ([itemized-tax](#itemized-tax)); a reader that keeps the last match asserts one rate against the whole tax figure.
   - [ ] **Every order email is OPENED in `emailPage`** and asserted against the rendered DOM, not just extracted over the API ([email-open-in-page](#email-open-in-page)).
   - [ ] **Full billing + shipping address**, every line, normalized ([full-address](#full-address)).
   - [ ] **One order = one test** — admin and email assertions merged into the placing test, not split siblings ([one-order-one-test](#one-order-one-test)).
   - [ ] **Visual comparisons exist** for the load-bearing templates, baselines persisted per project — cached if CI records them, committed if not ([visual-coverage](#visual-coverage), [ci-record-compare](#ci-record-compare)).
   - [ ] **Step-completion `console.log`** lines trace the whole journey in CI stdout ([step-logging](#step-logging)).
   - [ ] The [Coverage self-audit](#coverage-self-audit) tickboxes and the [Definition of done](#definition-of-done) lint gates both pass.

2. **Write the suite `README.md`** (in the suite root) — only now, not during initial generation, so it documents the settled shape. Cover: the environments/projects and how to select them, setup (`npm install`, `setup:browsers`, the `.env` keys incl. the per-environment base URLs), run commands (per environment, per feature area, single spec, `--ui`, `show-report`, `typecheck`), the `specs/`/`helpers/` layout, and the site's load-bearing gotchas. Keep it practical and runnable.

3. **Move the executable suite into the project's OWN repo** (the site's codebase, e.g. `saucal/<project>`). **Ask the user for — or confirm — the project's main repo and local clone path** first. Then:
   - Create a dedicated branch off the repo's mainline — **`main` or `production` (confirm which)** — e.g. `playwright` / `migration/playwright`.
   - Copy ONLY the runnable Playwright project into a **`tests/`** folder (or the repo's existing test dir): `specs/`, `helpers/`, `fixtures/`, `types/`, `playwright.config.ts`, `tsconfig.json`, `package.json` (+ lockfile), `README.md`, `.env.example`, the auth setup (`global-setup.ts` / `admin-login.ts`). Executables + config only.
   - **EXCLUDE everything not needed to run:** `node_modules/`, `generated/`, the raw GI JSON export folders, `auth/` / `reports/` / `test-results/`, the real `.env` (ship **`.env.example` only** — never secrets), visual `*-snapshots/` (re-seeded per machine), and **`docs/`** and any other non-executable build notes (site-exploration inventories stay in the `template-automation` build record, not the shipped suite). A clean copy: `rsync -a --exclude` the above.
   - Rename `package.json` `"name"` to `<project>-playwright`, and scrub any stale sibling-brand strings from `.env.example` / config headers / error messages when the suite was duplicated from another brand's suite.
   - It stays a self-contained nested project (own `package.json`/`node_modules`); Playwright runs from `tests/`. Push the branch — the suite now lives with the code under test. (Copy, don't delete from `template-automation`, unless the user asks; the migration branch is the build record.)

---

## What NOT to do

- Don't invent test cases not in generated code.
- Don't remove assertions — every `expect()` is preserved.
- Don't add error handling for impossible scenarios.
- Don't abstract one-time operations.
- Don't hardcode credentials or URLs.
- Don't use `page.evaluate()` when a locator works.
- Don't leave `Record<string, string>` vars bags.
- Don't weaken assertions to hide a real bug ([dont-weaken](#dont-weaken)).
- Don't `page.goto()` to cart/checkout ([nav-via-clicks](#nav-via-clicks)).
- Don't assert an email from an API extract without opening it ([email-open-in-page](#email-open-in-page)).
- Don't split one order across "place" / "backend" / "email" tests ([one-order-one-test](#one-order-one-test)).
- Don't assert only the grand total, or only a partial address ([cart-checkout-totals](#cart-checkout-totals), [full-address](#full-address)).
- Don't run a silent flow — every step logs on completion ([step-logging](#step-logging)).
