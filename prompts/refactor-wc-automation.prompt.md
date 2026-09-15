# Migrate a Ghost Inspector suite to Playwright on woolverine

Turn a WooCommerce site's Ghost Inspector export into a thin Playwright suite that runs on
**woolverine** (`github:saucal/woolverine-automation`, Saucal's shared WooCommerce test
framework, self-healing locators via **lokinator**). The suite you write is the SITE: its DOM
quirks, its flows, its assertions. Everything WooCommerce-generic — fixtures, checkout/cart
fill, money readers, admin editor, refunds, Mailpit, account flows, gateway drivers, visual
stabilizer, chain state, lint — is imported, never re-implemented.

This is the recipe proven on 11 sites (leggari, nopong, pls, open-studio, repurposed,
purcrystal, vesica, melon, leggari academy, 2m, cash fore clubs): every one is green live on
one framework version, and every migration shrank the suite by 25–50% while KEEPING every GI
assertion. Follow it; where you learn something generic, put it in the framework, not the site.

## How to read this doc

Tags: **[MUST]** non-negotiable · **[STRICT]** hard rule with enumerated exceptions · **[SHOULD]**
strong default · **[WARN]** detect + `console.warn`, never fail. Headings are stable anchors.

Sections: 1. [Before you start](#before-you-start) · 2. [Inputs](#inputs) · 3. [Reference architecture](#reference-architecture) · 4. [Woolverine surface map](#woolverine-surface-map) · 5. [The recipe](#the-recipe) · 6. [Recon](#recon) · 7. [Runner settings](#runner-settings) · 8. [Site code rules](#site-code-rules) · 9. [Checkout mechanics](#checkout-mechanics) · 10. [Assertions & parity](#assertions--parity) · 11. [Resilience & visuals](#resilience--visuals) · 12. [Integrations](#integrations) · 13. [Multi-region / multi-env](#multi-region--multi-env) · 14. [Maintenance specifics](#maintenance-specifics) · 15. [Live triage](#live-triage) · 16. [False passes](#false-passes) · 17. [Coverage self-audit](#coverage-self-audit) · 18. [Definition of done](#definition-of-done) · 19. [Contributing to woolverine](#contributing-to-woolverine) · 20. [Handoff](#handoff) · 21. [What NOT to do](#what-not-to-do)

<a id="settled-decisions"></a>
**[MUST] settled-decisions — the choices written here were already argued with the team. Implement
them; do not re-derive them.** Node 22 in `.nvmrc` with the workflow reading it, the framework
consumed from GitHub Packages as `@saucal/woolverine`, tooling at the repo root with the suite in
`e2e/`: each one is the OUTCOME of a review (cash-fore-clubs #115, Sept 2026), written as the
answer, not as an open question.

- **Copy the reference pilot's shape; don't design a new one.** cash-fore-clubs is the layout
  reference — `diff` the repo you are migrating against it instead of reasoning from first
  principles. A structure you derived yourself is wrong even when it is defensible.
- **Stay inside the repo you were asked to change.** Not the shared deploy actions
  (`saucal/action-*`), not repo or org CI variables, not the other pilots, not this prompt.
- **A hazard you verified is a paragraph, not a mandate.** Report it and stop: e.g. the deploy
  build runs `npm ci` + `npm run --if-present build` + `npm run --if-present test` in the repo
  ROOT, so a root `test` script meaning `playwright test` fires the suite on every deploy (no
  browsers on that runner → red deploy). Saying that is right. Fixing the deploy pipeline,
  mirroring CI variables across repos or rewriting a rule to suit the finding is not yours to do —
  the user scopes it, you execute.
- **Never edit this doc to match your own conclusion.** It is the record of what was decided; a
  rule you rewrote mid-task hides the decision it replaced. Raise it, wait, then edit.

---

## Before you start

Read, in this order:

- **`~/helper/woolverine/README.md` + the one-line header of every `src/*.ts`** — the framework IS
  the reference architecture. Before writing any helper, `grep -n "^export" ~/helper/woolverine/src/*.ts`
  and check whether it already exists. (Clone: `github:saucal/woolverine-automation`.)
- **`~/helper/lokinator/README.md`** — the resilient-locator stack (`heal`, `resilientClick/Fill/…`,
  `ctxFor`, `.lokinator-cache.json`).
- **`docs/migration-playbook.md`** — the hard-won WooCommerce lessons (real events, AJAX races, money DOM).
- **`docs/maintenance-cycle.md`** — the steady-state loop after migration.
- **One reference pilot** shaped like your site (table below): its `e2e/` plus the root tooling
  files is a copy-paste-ready starting point and shows exactly where the site/framework line falls.

| Site shape | Reference pilot (`saucal/<repo>`, branch `feat/woo-qa-migration`, dir `e2e/`) |
|---|---|
| Classic checkout, Klarna + PayPal (PPCP + Fastlane), quote/marketplace plugin, Elementor — also the layout reference (root tooling, `.nvmrc`, `.npmrc`, `.deployignore`) | `cash-fore-clubs` |
| Blocks checkout, multi-region × multi-env (VIP), WCS subscriptions, wholesale, Kadence drawer | `nopong-limited` |
| Blocks checkout inside a custom 4-step wizard (client plugin), Stripe PE, two envs | `pls` |
| FunnelKit funnel over Blocks, membership subscription, LWA login, Josephine handoff | `open-studio` |
| WFACP multi-step classic checkout, composite products, Authorize.Net + Affirm, contractor registration | `leggari` |
| Memberships (WC Memberships), PayPal, Auth.Net, Kinsta (slow host) | `vesica-institute` |
| Elementor + JetMenu, Accept.Blue, alpha-prefixed order numbers, AvaTax itemized tax | `purcrystal` |
| Multi-region EU/UK, category-nav visuals | `melon-optics` |
| Custom subscription builder, saved-card Stripe, subscription switch + proration, wps-hide-login | `2m-networks` |

The essentials (each expanded later):

- **GI export is the SOURCE OF TRUTH — dump the test JSON, don't guess.** `suites/<Site>/*.json`
  (annotated with `_gi`) is what the client approved. The old generated TS is a lossy derivative.
- **Live-explore the real site first** (`playwright-cli`) — GI selectors have drifted.
- **Triage GI tests, don't 1:1 port** — nav/screenshot → one data-driven visual spec; duplicates → skip.
- **Start from the baseline, then add what the explore found.** `templates/baseline-suite.md` is
  the floor every WooCommerce site gets whether or not the GI export or the client mentioned it;
  the explore ADDS to that list, it does not replace it. A site missing a baseline row has a gap to
  ledger, not a shorter suite.
- **Import, don't write.** If woolverine has it, use it. If two sites need it, graduate it.
- **Real events, never eval. Capture once, assert everywhere. Every step logs.**
- **You do not run the live suite unless the user asks** — you write, typecheck, lint, list,
  and hand the exact commands over. The user runs; you triage their report.

## Inputs

1. The GI export folder: `suites/<Site>/*.json` (+ `suite.json`). Extra tests via
   `GHOST_INSPECTOR_EXTRA_TEST_IDS` if `execute` steps reference them.
2. Site name, environments (`staging`, `preprod`, `maintenance`…), regions if any, and their base URLs.
3. The target repo (`saucal/<repo>`, local clone path) and its mainline branch (`main` / `production` — ask).
4. Checkout variant (classic / Blocks), admin storage (HPOS / legacy), gateways in play, email trap
   (Mailpit on `playgrounds.saucal.io` by default), consent plugin.
5. Credentials go in the repo-root `.env` only (never in code): `BASE_URL_<ENV>`, `WP_ADMIN_USER`, `ADMIN_PASS`,
   customer creds, sandbox gateway creds, `OPENAI_API_KEY` (lokinator AI tier), `MAILPIT_URL`.

---

## Reference architecture

The Node project lives at the site repo's ROOT; the suite itself lives under `e2e/`. Every
command (`npm install`, `npm run e2e`, `npx playwright test …`) runs from the root — no `cd e2e`.
(Decided on the cash-fore-clubs review, Sept 2026: the suite in its own folder is common
practice, a nested `package.json` that forces a directory switch is not. The folder is `e2e`,
not `tests`, and the script is `e2e`, not `test` — see [script-not-test](#script-not-test).)

```
<repo root>
├── package.json / package-lock.json      # → templates/package.json (deps: woolverine + dotenv; playwright + typescript dev)
├── tsconfig.json                         # → templates/tsconfig.json (include: e2e/**/*.ts + the config)
├── playwright.config.ts                  # → templates/playwright.config.ts (testDir e2e/specs, outputs under e2e/)
├── .env / .env.example                   # → templates/.env.example; .env gitignored at the root
├── .nvmrc                                # → templates/nvmrc (Node 22)
├── .npmrc                                # → templates/npmrc (@saucal → npm.pkg.github.com; reads NODE_AUTH_TOKEN)
├── .gitignore                            # the site's own; make sure it has `node_modules` and `.env`
├── .deployignore                         # the site's own; append templates/deployignore-snippet
├── .github/workflows/playwright.yml      # → templates/playwright.yml
└── e2e/
    ├── .gitignore                        # → templates/gitignore (auth/, reports/, test-results/, *-snapshots/)
    ├── .lokinator-cache.json             # COMMITTED — its diff is the selector-drift report
    ├── auth/                             # gitignored: admin-<project>.json, chain-<site>-*.json, member state
    ├── reports/ · test-results/          # gitignored: html report, traces + videos
    ├── fixtures/index.ts                 # → templates/fixtures.ts (createTest; ~30 lines)
    ├── types/test-config.ts              # OrderConfig / Result shapes for THIS site
    ├── helpers/
    │   ├── <site>.ts                     # site DOM only: selectors, nav paths, site readers, hooks
    │   ├── flows.ts                      # orchestrators returning Result objects, no expect()
    │   └── assertions.ts                 # every expect(); bodies are site-owned
    └── specs/<area>/*.spec.ts            # thin: config → flow → assert*; @plugin tags
```

Paths in this doc that start with `specs/`, `helpers/`, `fixtures/` are relative to `e2e/`.
Playwright matches CLI file arguments against the path, so `npx playwright test specs/basic`
still selects `e2e/specs/basic`; `woolverine-lint` takes the real path (`e2e/specs`).

| Layer | Owns | Never |
|---|---|---|
| woolverine | fixtures/contexts, resilient stack, checkout/cart/pdp/account/admin/mailpit/payments/subscriptions/visual/chain readers + drivers, lint, projects matrix | site selectors, site business rules |
| `helpers/<site>.ts` | site selectors, click paths, site-specific readers, quirk hooks passed INTO woolverine | re-implementing a woolverine helper, `expect()` |
| `helpers/flows.ts` | multi-step journeys → typed Result | `expect()` |
| `helpers/assertions.ts` | all `expect()` — WHAT to check (framework owns reading/comparing, project owns deciding) | navigation |
| specs | config + flow + assert*, `@plugin` tags | inline selectors, raw `expect()` (except `toHaveScreenshot`) |

Deliberately NOT shared, by design: `flows.ts` bodies, `assertions.ts` bodies, brand helpers,
client-plugin flows (a wizard the client's own plugin renders, a quote marketplace, a course
dashboard). Gateway plugin testing is a separate initiative.

---

## Woolverine surface map

Check this BEFORE writing a helper. Names are exports; read the source for options.

| Module | Use it for |
|---|---|
| `createTest(config, testsDir)` → `{ test, config }` | `shopperPage` / `mobileShopperPage` / `adminPage` / `emailPage` (all lazy), artifacts, 429 backoff, view-transition freeze fix. Config: `checkout`, `cart`, `admin`, `adminAuth(project, baseURL)`, `shopperPrepare(page)`, `mobileDevice`, `mailpitUrl`. `makeLazyPage` / `openContext` for extra project contexts (open-studio `memberPage`). |
| `defineProjects({ environments, regions? })` | env × region → Playwright projects; `baseURL` from `BASE_URL_<REGION>_<ENV>` / `BASE_URL_<ENV>` / `BASE_URL`; empty cells warn+skip. |
| lokinator: `heal`, `resilientClick/Fill/Select/Check/Text/Locator/ExpectText`, `ctxFor(page)` | every action/read: `{ primary, alt?, ai }` — `ai` is a NOUN phrase ("the Add to basket button"). |
| `account.ts`: `navigateToMyAccount`, `registerCustomer`, `loginAccount`, `logoutAccount`, `isLoggedIn`, `openAccountTab`, `assertMyAccountTabs`, `DEFAULT_ACCOUNT_TABS`, `PAYMENT_METHODS_TAB`, `customAccountTab`, `forgotPassword`, `setPasswordFromEmail` | standard Woo My Account markup, click-based. Hooks: `prepare`, `fillExtra`, `navigate`, `success`, `inboxEmail`, `emailPage` evidence. |
| `cart.ts`: `goToCart({ toggle, viewCart, prepare })`, `addToCartById`, `setCartQtyAndUpdate`, `setCartShippingDestination`, `proceedToCheckout`, `readCartTotals`, `readCartLineItems`, `isBlocksCart` | drawer-aware cart nav that PROVES it reached the cart; classic + Blocks. |
| `pdp.ts`: `openPdp`, `readPdp`, `addSimpleToCart`, `addVariableToCart`, `pickFirstProduct`, `waitUntilSettled`, `waitForStablePrice` | PDP capture/add; settle utils for AJAX-recomputed prices. |
| `checkout.ts`: `fillCheckout(page, address, config, opts)`, `waitForCheckoutReady`, `nextCheckoutStep`, `readCheckoutTotals`, `waitForStableTotals`, `readBlocksSettled`, `readBlocksTotalsSettled`, `placeOrder`, `applyCoupon`, `orderIdFromUrl`, `settleNetwork`, `isBlockCheckout`, `waitForBlocksIdle` | classic + Blocks fill (live DOM outranks config), hooks: `prepare`, `fillExtra(page, step)`, `steps: CheckoutField[][]` + `advance` (WFACP/Aero), `fieldOverrides`, `shipTo`. Blocks path = commit-per-field + country-revert reconcile. |
| `payments.ts`: `selectPaymentMethod`, `acceptTerms`, `clickPlaceOrder`, `submitEmptyCheckout`, `payWithStripe` / `fillStripeCard`, `payWithPaypalSandbox`, `findPaypalSmartButton`, `payWithKlarna`, `payWithAuthnet`, `payWithAffirmSandbox`, `payWithAcceptBlue`, `STRIPE_CARD` | gateway drivers (the gateway owns that DOM, not the site). `PAYPAL_DEBUG` / `KLARNA_DEBUG` = 1 dump, 2 observe-only. Verified gateway selection with retry (Fastlane re-arms). |
| `money.ts`: `readTotals`, `readTotalsTable`, `readTotalsTableRows`, `readLineItems`, `readBlocksTotals`, `readTotalsSection({ recurring })`, `readBlocksTotalsSection`, `readAdminTotals`, `readAdminLineItems`, `readAdminOrderTotals`, `money`, `amount`, `normalizeProductName` | label-based, tax-summing, `<ins>`-aware readers for every surface. Never nth-of-type. |
| `order-received.ts`: `readCustomerDetails`, `readOrderPaymentMethod`, `readOrderLineItem`, `normalizeAddress`, `normalizeText`, `ORDER_DETAILS_TABLE` | thank-you + view-order (same markup). |
| `admin.ts`: `ensureAdminState`, `openOrdersList`, `openOrder`, `openSubscription`, `readOrderStatus`, `readPaymentMeta`, `readBillingEmail/Phone/Address`, `readAdminAddresses`, `readOrderTotalsRow`, `runGatewayRefund`, `readRefundLineTotal`, `readRefundedTotal`, `readComputedRefundAmount`, `dismissAdminNotices`, `gotoOrderEditorFresh`, `runOrderAction`, `trashCustomerOrders/Subscriptions` | HPOS + legacy (configured first, other as fallback); refund with all four silent-failure guards + alert surfacing (no manual fallback on a gateway refusal). |
| `order-notes.ts`: `getOrderNoteTexts`, `expectOrderNoteMatches` | scan-all + regex, polling (HPOS renders notes late). Customer note is `p.order_note`, NOT in the timeline. |
| `subscriptions.ts`: `openSubscription`, `goToSubscription`, `readSubscriptionDetails`, `cancelSubscriptionAsCustomer`, `setSubscriptionStatusAsAdmin`, `processRenewalAsAdmin` | WCS customer + admin; renewal settles a Pending renewal manually where the gateway can't charge (`settlePendingManually`). `wcs_debug_toggle_renewals` ships in serviceapp-client. |
| `mailpit.ts`: `waitForMessage({ to, subject, contains })`, `findEmail`, `openEmail(emailPage, email, subject)`, `deleteMessages`, `mailpitViewUrl`, `findSiteLink`, `uniqueEmail`, `setMailpitUrl` | body-race safe, newest-first aware; ESP relays reorder — always `contains` a token of THIS order. |
| `popups.ts`: `dismissPopups({ extra })`, `armPopupDismissal`, `preseedCookieConsent(page, family)` | common consent/newsletter families; arm the locator handler for TIMED popups; pre-seed consent cookies instead of clicking banners. |
| `chain.ts`: `chainState<T>(file)` → `{ load, save(patch), clear }` | serial chains where a link depends on an EXPENSIVE prior step (order → refund/refund-email, account → logged shopper). Seed clears + overwrites; links merge; non-seed links `test.skip` with a runnable hint. |
| `visual.ts`: `assertScreenshot(page, name, { mask, fullPage, locator, soft, stabilize })`, `stabilizeForScreenshot({ hide, hideOverflowRight, hideFixed })`, `dynamicMasks(page, extra)` | ONE stabilizer (lazy media forced, image poll bounded); site extras as opt-ins. |
| `assertions.ts`: `assertTotalsParity`, `warnIfNoTaxOrShipping`, `isZeroAmount` | parity primitives. |
| `testdata.ts`: `testAddress('US'|'CA'|'AU'|'GB'|'ES'|'DE')`, `testCustomer`, `runEmail`, `uniqueRef`, `uniquePassword` | addresses in Woo's own label forms. |
| `auth.ts`: `ensureAdminState({ baseURL, statePath, prepare, loginPath })` | validates cached state before re-login (12h, cross-worker lock, throttle-safe, bot-gate `prepare`, wps-hide-login `loginPath`). |
| `woolverine-lint e2e/specs` | policy: expect-home, plugin-tags, nav-clicks. `// lint-ok` opt-out with a reason. |

If your site needs something generic that is not here, see [Contributing to woolverine](#contributing-to-woolverine).

---

## The recipe

Proven order. Each step is a commit.

1. **Branch + worktree.** In the site repo: `git worktree add ../<site>-playwright -b playwright <mainline>`
   (or the repo's existing test branch). Work in the worktree — never in a checkout the user may
   be running. Tooling at the repo root, suite under `e2e/` ([Reference architecture](#reference-architecture)).
2. **Scaffold from templates** ([repo-root-tooling](#repo-root-tooling)). At the root: `package.json`
   (`"@saucal/woolverine": "^X.Y.Z"` — a normal semver range from GitHub Packages; the lockfile
   pins the resolution), `tsconfig.json`, `.env.example`, `.nvmrc`, `.npmrc`,
   `playwright.config.ts` (`defineProjects`, `snapshotPathTemplate: SNAPSHOT_PATH_TEMPLATE` —
   woolverine >= v1.1.3, `LOKINATOR_CACHE ||= <root>/e2e/.lokinator-cache.json`, `screenshot: 'off'`,
   `trace: 'retain-on-failure'`); check the site's `.gitignore` has `node_modules` + `.env` and
   append `templates/deployignore-snippet` to its `.deployignore`. Under `e2e/`: `.gitignore`,
   `fixtures/index.ts` (`createTest`). `npm install` from the root.
3. **Recon** ([Recon](#recon)): dump every GI JSON, live-explore every surface with `playwright-cli`,
   write the triage table (GI test → spec / merged / dropped-with-reason).
4. **Types + site helper.** `types/test-config.ts` (OrderConfig, Result). `helpers/<site>.ts`: ONLY
   what the site does differently — nav paths, drawer selectors, site fields, site readers. Every
   standard Woo action is a woolverine call with a hook; site quirks go INTO the hook
   (`prepare`, `fillExtra`, `navigate`, `steps`, `fieldOverrides`, `shipTo`, drawer `toggle`/`viewCart`).
5. **Flows + assertions + specs.** Flows return typed Results and log each step. Assertions carry
   messages and assert the CAPTURED values on every surface. Specs are thin, tagged, serial only for
   order-mutating links, chain state via `chainState`.
6. **Diff against GI.** For every GI assertion: a kept `expect()` or a ledgered reason. Also diff any
   helper you rewrote against the LAST GI-era version: two of four leggari failures were code silently
   LOST in migration (a staging branch of a selector, a commented-out field list).
7. **Gates.** `npx tsc --noEmit` · `npx woolverine-lint e2e/specs` · `npx playwright test --list`
   (count matches the triage table). All from the root. Commit.
8. **Live run — the USER's.** Hand over the exact commands per project / per area. Triage their
   report from the trace (`error-context.md` first, then network doc requests, then `frame-snapshots`).
   Fix in `helpers/*`, never by weakening an assertion. Bump budgets only after measuring (trace
   profile: pair before/after by `callId`, sum by selector).
9. **Slimming pass** (after green): for every site-side function ask *"¿y por qué esto queda?"* —
   if woolverine has it, delete yours and point the import at woolverine (no shims, no wrappers
   that only rename); if it is a 1:1 dupe spread over several functions, collapse it; if it is a
   generic Woo behaviour, graduate it ([Contributing](#contributing-to-woolverine)). Keep only what
   is genuinely the site's, and write the one-line reason next to it.
10. **Handoff** ([Handoff](#handoff)).

---

## Recon

<a id="read-all-gi"></a>
**[MUST] read-all-gi — dump every GI test JSON before writing code.** The step list carries the
real flow (refund qty fill, `selectFirstAvailableVariation`, set-password), the selectors GI used
(port them as `primary` + `alt`), the assertions (each one must keep a home) and `screenshotExclusions`
(your visual masks). Note `optional: true` steps (GI never failed on them) and `condition` branches
that belong to other projects.

<a id="live-explore"></a>
**[MUST] live-explore — one `playwright-cli` pass over every surface before coding.** Confirm the
checkout variant, the drawer/mini-cart shape, the consent plugin (`cli-*` vs `cky-*`), the account
menu slugs, the gateways actually enabled (Fastlane default? Klarna popup?), price markup (`bdi` or
not), the order-received markup for an auto-logged-in buyer (no email row, no address block).
`curl` the page HTML for hidden/duplicate markup (desktop + mobile menus both render; a closed modal
that is CSS-"visible").

<a id="triage-tests"></a>
**[MUST] triage-tests — don't 1:1 port.** Nav/screenshot tests → one data-driven visual spec.
Place-order chains (place → email → backend) → ONE test driving shopper + admin + email; a
separate serial link ONLY where the order is MUTATED (refund, renewal, switch). Duplicates → skip.
Pinned data (FAQ item #7, a video id, a store-locator result) → behaviour assertion. Don't invent
tests that are not in the export.

<a id="gateway-drift-recon"></a>
**[MUST] gateway-drift-recon — the GI recording of any hosted gateway is STALE; use the woolverine
driver, and do one observe-only run before trusting it on a new site.** `PAYPAL_DEBUG=2` /
`KLARNA_DEBUG=2` dump every tick and refuse the final confirm — one dump beats three sandbox orders.
A gateway woolverine doesn't drive yet gets its driver written IN woolverine (`payments.ts`, hooks
for site tiles), not in the site.

---

## Runner settings

The template's `playwright.config.ts` is the default, not the answer. Four of its knobs are worth a
decision per site, and each costs a live run to get wrong.

<a id="workers"></a>
**[MUST] workers — 2 is the template default; the money paths decide whether the site can take
it.** Drop to 1 when the target is a single shared container, and say so in the config with what you
measured. On raven-rocks (Convesio express, one container, page caching) two workers produced a
cart reading ANOTHER context's quantity and an admin-ajax charge answering "Request failed."; both
disappeared at one worker (2026-09-11). Neither is fixed by test-side hygiene: an `emptyCart` at
the start of a flow isolates your own leftovers, not the host's session and cache, and a shared
admin storage state means two workers hit the same gateway plugin at once. Where wall clock
matters, raise it on the CLI for the READ-ONLY slices (`--workers=2` over `@visual`, search,
security) instead of in the config — the file should stay the setting the money tests need.

<a id="artifacts"></a>
**[SHOULD] artifacts — know what `retain-on-failure` actually does before choosing it.** It RECORDS
every test and deletes the passing ones: the capture cost is paid on the green path, only the
retention is conditional. `on-first-retry` captures nothing until a test has already failed once,
which with `retries: 1` still yields a trace and a video for every problem case and costs nothing
on a green run — at the price that what you open afterwards is the RETRY, so a flake that passes
the second time leaves a green trace of a red run. Both are defensible; pick one per site and write
the trade in the config. Tracing is the heavier of the two (a DOM snapshot per action).

<a id="screenshot-off"></a>
**[MUST] screenshot-off — `'off'` does not mean "no screenshots" in a woolverine suite.** The
fixture builds the contexts itself and reads this option: it takes one named full-page shot per
context whenever a test FAILS, whatever the value says, and `'on'` adds one per context on every
test (three per test, on pages that run to megabytes). Leave it `'off'` and let the comment name
where the failure shots come from, or someone will keep re-deciding it.

<a id="retries-report"></a>
**[MUST] retries-report — a retry does not hide a flake, but your REPORT filter can.** Playwright
reports a test that failed and then passed as `flaky`, not as `passed`, so `retries: 1` locally is
a legitimate choice. What breaks is summarising a run with `grep -E "passed|failed"`: `flaky` never
matches, and a per-file loop reports a green table over a suite that wobbled (measured 2026-09-14).
Any command you hand over in the [Handoff](#handoff) greps `passed|failed|flaky`.

<a id="what-kills-a-run"></a>
**[SHOULD] what-kills-a-run — before blaming the suite for memory, count the browsers.** A killed
run does not always take its `headless_shell` with it, and they accumulate across attempts. The
laptop that stopped two `npm run e2e` runs mid-flight had 8 GB of RAM with 6.8 GB of swap already
in use, a SECOND Playwright suite running from another checkout, and ~240 MB of orphaned browsers
from earlier aborts; one worker is 400-600 MB and was the last straw, not the cause
(raven-rocks, 2026-09-14). `pgrep -fl headless_shell` and `sysctl vm.swapusage` answer this in two
seconds. Running one spec file per process releases everything between files.

---

## Site code rules

<a id="import-dont-write"></a>
**[MUST] import-dont-write.** Before any helper: `grep -n "^export" ~/helper/woolverine/src/*.ts`.
A site helper that reimplements a woolverine function is a bug. Point imports straight at
`'@saucal/woolverine'` — no `helpers/resilient.ts`, no re-export shims, no wrapper that only renames.

<a id="hooks-not-forks"></a>
**[MUST] hooks-not-forks — a site quirk is a hook argument, not a copy of the framework function.**
`prepare` (popups, bot gates, splash pages), `fillExtra` (site fields, blur quirks), `navigate`
(non-standard way into My Account), `steps`/`advance` (multi-step checkout), `fieldOverrides`
(remapped ids), `shipTo` (different shipping address), `success` (register proof), drawer
`toggle`/`viewCart`, `select` (gateway tile), `extra` (popup selectors), `stabilize.hide`.
Measured primaries stay primary: when you move a site's known-good `{primary, alt}` pair into a
framework call, keep the MEASURED selector as `primary` (leggari's cart decoy link "clicked" fine
and never navigated when the tiers were inverted).

<a id="keep-site-owned"></a>
**[STRICT] keep-site-owned — these stay in the site, with a one-line reason next to them:**
client-plugin flows (pls wizard steps, c4c quotes, open-studio funnel/survey/Josephine handoff,
2m subscription builder); readers for site-specific widgets; a framework call that provably
misfits (c4c `goToBasket`: woolverine's drawer probe reads the off-canvas link as visible;
c4c `calculateShipping`: UK-only store has no country select; open-studio LWA login: header
panel, not Woo's form). Everything else that is "Woo behaviour" goes to the framework.

<a id="lokinator-rules"></a>
**[MUST] lokinator-rules.**
- `{ primary, alt?, ai }`: `ai` is a noun phrase naming the element; `alt` is a DIFFERENT strategy
  (role ↔ css), omit it for stable ids. Framework helpers already carry the other checkout
  variant's selector as `alt`.
- `LOKINATOR_CACHE` anchored to `e2e/.lokinator-cache.json` in `playwright.config.ts` (default is
  cwd-relative — a run from another directory would write a second cache). Commit it; when a heal
  lands, fix the primary in code and keep the cache entry as the drift record.
- A heal error WITHOUT `| AI suggested:` means the AI tier never answered — check the key/model
  (`LOKINATOR_MODEL` is a bare model id, no `openai/` prefix; `||` not `??` for empty `.env` lines),
  not the page.
- `resilientText` reads `textContent`: CSS `text-transform` is NOT applied (compare
  case-insensitively) and `<br>` lines GLUE together — read address blocks with `innerText`
  (`(await heal(page, target)).innerText()`) when line structure matters. Never `split('\n')` a
  `resilientText` result.
- Playwright does NOT normalize whitespace for a REGEX `hasText`: anchor on the leaf cell
  (`td.label`), never on a `<tr>`/container whose text starts with whitespace.

<a id="config-objects"></a>
**[MUST] config-objects — typed configs, no `Record<string, string>` vars bags.** `OrderConfig`
(what THIS test does: user, product, gateway, expected status, shipTo, contact owner, refund shape),
`Result` (what the flow captured). Woolverine ships `Address`, `Totals`, `LineItem`, `OrderCapture`.

<a id="expect-home"></a>
**[MUST] expect-home — `expect()` lives in `assertions.ts` or a named `assert*` helper, never
inline in a spec** (the one spec-level exception is `toHaveScreenshot`). `woolverine-lint` enforces it.

<a id="expect-message"></a>
**[MUST] expect-message — every `expect()` carries a message phrased as the expected behaviour
with the dynamic values embedded.** Lint: `grep -nE "expect\([^,]+\)\." helpers/assertions.ts` → zero.

<a id="step-logging"></a>
**[MUST] step-logging — log every flow step as it COMPLETES, with the captured values, prefixed by
the test id** (and region on multi-region). Wrap phases in `test.step()` too. A four-minute order
flow that prints nothing is unreviewable. No logging inside loops or before an action.

<a id="minimal-code"></a>
**[MUST] minimal-code — the shortest working diff, in the fewest files.** Before writing: does it
need to exist? does woolverine have it? can it be one hook argument? one line? Delete over add;
boring over clever; no abstraction with one caller, no config for a value that never changes, no
scaffolding "for later". A helper called once is inlined. A migration is done when the site's
`e2e/` holds ONLY what is the site's — the pilots landed at 25–50% of their GI-era size.

<a id="comments"></a>
**[MUST] comments — constraint notes, not narration.** One short line saying WHY (the measured
quirk, the trap) next to the code it protects. No essays, no history, no restating the code —
long comments burn tokens every session. Mark deliberate shortcuts `// ponytail: <ceiling>, <upgrade path>`.

<a id="credentials-env"></a>
**[MUST] credentials-env** — all creds/URLs via the repo-root `.env`; ship `.env.example` only.

<a id="script-not-test"></a>
**[MUST] script-not-test — the suite's npm script is `e2e`, NEVER `test`, and its folder is `e2e/`,
never `tests/`.** The platform deploy runs, in the repo ROOT, `npm ci` -> `npm run --if-present
build` -> `npm run --if-present test` (`saucal/action-maintenance` -> `action-build` ->
`build-for-deployment.sh`, in that script since 2022). A root `test` script that means `playwright
test` therefore fires on every deploy: that runner has no browsers and no `.env`, so the config
throws and the DEPLOY goes red for unrelated changes — and if those vars were ever set it would
place real orders instead. `--if-present` only skips a script that does not exist; it does not
ignore failures. That slot belongs to the repo's own unit tests (leggari: three `wp-scripts
test-unit-js` suites, reachable as `lerna run test`), which is the other reason the folder leaves
`e2e/` free. Measured on harmony, cash-fore-clubs, repurposedmaterials and leggari, Sept 2026 —
none had merged, so it had never fired.

<a id="package-json"></a>
**[MUST] package-json** — `e2e`, `e2e:<area>` per existing folder, `baseline`, `typecheck`, `lint`
(`woolverine-lint e2e/specs && tsc --noEmit`), `report` (`e2e/reports`), `setup:browsers`.
Deps: `woolverine` (exact tag) + `dotenv`; dev: `@playwright/test`, `typescript`, `@types/node`
(major matching `.nvmrc`). Nothing else unless the site truly needs it (no Stagehand, zod,
playwright-core, e2e-utils).

<a id="repo-root-tooling"></a>
**[MUST] repo-root-tooling — npm, Node pinned, git deps allowed, nothing test-related deployed.**
- `package.json`, lockfile, `tsconfig.json`, `playwright.config.ts`, `.env(.example)`, `.nvmrc`,
  `.npmrc` at the repo ROOT; never a nested `package.json` under `e2e/`.
- **An allowlist-style `.gitignore` has to allowlist the suite too.** A repo that ignores `/*`
  and re-adds paths with `!` (harmony) keeps tracked files working after a rename — nothing gets
  untracked — while silently ignoring the folder: `git add e2e/<new spec>` is refused and a spec
  added later never lands. Point the `!` exception at `e2e/`.
- **`.nvmrc` = `22`** (current LTS the pilots run on); the workflow reads it via `node-version-file`.
- **`.npmrc` maps the scope to GitHub Packages**, nothing else:
  `@saucal:registry=https://npm.pkg.github.com` +
  `//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}`. No `allow-git` — there are no git
  dependencies left ([private-packages](#private-packages)).
- **npm or pnpm, both work** (measured 2026-09-11, pnpm 12.4): install, typecheck, lint and
  `--list` are identical under either, with no pnpm-specific config. Until Sept 2026 the framework
  was a git dependency and pnpm refused it outright — `blockExoticSubdeps` on the transitive
  lokinator, then `allowBuilds` keyed by the EXACT resolved commit sha of both packages (the tag
  form, bare names and wildcards are all rejected: "Use exact versions only"), rewritten in every
  consumer on every release. The registry removed all of it. npm stays the default because the
  pilots and CI run it; a repo that moves must move whole (`pnpm import`, drop
  `package-lock.json`, swap `npm ci` for `pnpm install --frozen-lockfile` in the workflow) — and
  note pnpm FAILS on an import the `package.json` does not declare, which npm's hoisting hides.
- **`.deployignore`** must exclude `e2e`, `package-lock.json`, `playwright.config.ts`,
  `tsconfig.json`, `.npmrc`, `.env.example` (`node_modules`, `package.json`, `.nvmrc` usually are
  already) — the suite never ships to the host. **A repo with NO `.deployignore` still needs one:**
  `action-build-to-git` copies its own default in and then empties every `.gitignore` in the
  bundle, so the whole suite — `.env.example` included — reaches the webroot. The new file has to
  REPEAT the platform default verbatim (anything dropped from it starts being deployed) and add
  the suite; measured on elka, leggariacademy and nopong-limited, Sept 2026.
<a id="private-packages"></a>
**[MUST] private-packages — the framework is a PRIVATE package; every install needs a token.**
`@saucal/woolverine` and its `@saucal/lokinator` dependency live in GitHub Packages, private like
their repos, so `npm install` without credentials dies on `401 Unauthorized` and neither error
says a token is missing.
- **Locally:** `export NODE_AUTH_TOKEN=$(gh auth token)` in the shell profile, once the `gh` login
  carries `read:packages` (`gh auth refresh -h github.com -s read:packages`). A dev without `gh`
  puts a classic PAT with that scope in their OWN `~/.npmrc`, never in the repo's.
- **In CI:** a workflow's `GITHUB_TOKEN` does NOT reach a package linked to another repo — it
  fails with `403 permission_denied: read_package`. The suite workflow therefore passes
  `NODE_AUTH_TOKEN: ${{ secrets.PACKAGES_TOKEN || secrets.GITHUB_TOKEN }}` to its install step and
  declares `permissions: packages: read`. The org either sets a `PACKAGES_TOKEN` secret
  (`read:packages`, from the bot account, visibility all) or grants each repo read access per
  package (Packages → package settings → Manage Actions access). Package `internal` visibility,
  which would need neither, requires an Enterprise plan — saucal is on Team.
- **[WARN] the platform deploy runs `npm ci` in the repo ROOT** ([script-not-test](#script-not-test)),
  and the root `package.json` now declares a private package. On the first merge to a deploying
  branch that install needs a registry token ON THE DEPLOY RUNNER, which is outside these repos.
  Raise it before the merge; do not go fix the deploy actions.

- **Local-only clutter (a GI export folder, prompt drafts, `.qa/`) goes in `.git/info/exclude`**, not
  the repo's `.gitignore`. Only what every clone produces (`node_modules`, `.env`, `e2e/auth/`,
  `e2e/reports/`, `e2e/test-results/`, `*-snapshots/`) belongs in a committed ignore file.

---

## Checkout mechanics

<a id="nav-via-clicks"></a>
**[STRICT] nav-via-clicks — navigate like a customer; never `goto()` cart or checkout.** Header
cart → drawer → View cart (`goToCart` with the site's `toggle`/`viewCart`), cart → Proceed to
checkout (`proceedToCheckout`). `goto` is allowed only for: home/priming, `?add-to-cart=` links,
wp-admin, Mailpit, category/My-Account entry points, and RECOVERY plumbing (emptying a basket
after a stock hold) — say so in a comment. `woolverine-lint` flags the rest.

<a id="real-events"></a>
**[MUST] real-events — never eval.** `el.value = …; dispatch('change')` does not trigger Woo's
`update_checkout` / variation / composite validity. Playwright `selectOption` / `fill` / `check`.
React-controlled inputs (Klarna, CommerceKit search) drop `fill()` — `pressSequentially`.

<a id="ajax-races"></a>
**[MUST] ajax-races.** `.blockUI` intercepts clicks (navigate remove-URLs instead). Wait for a
POSITIVE signal (the recalculated total landed, `waitForStableTotals`), not "overlay hidden" — an
overlay not yet raised is already hidden. Blocks summaries lazy-paint: read them through
`readBlocksSettled` (retries until subtotal + total hold). Two equal early reads are NOT settled —
the AJAX starts a beat after the interaction (`waitUntilSettled`).
**Place order can fire while an `update_checkout` is still in flight.** Woo debounces it ~1s and a
tax round-trip behind it can land AFTER the order exists; an integration that empties the cart on
creation then answers that late `update_order_review` with "Sorry, your session has expired",
reloads, and bounces to `/cart/` MID-PAYMENT. `clickPlaceOrder` waits for a QUIET checkout (no
`update_checkout`/`updated_checkout` for 2.5s, no overlay). Measured on harmony/FastSpring, Sept
2026 — a real customer whose round-trip lands late hits the same bounce, so it is a FINDING for the
client, not only a test fix.

<a id="money-dom"></a>
**[MUST] money-dom.** Use woolverine readers (label-based, tax-summed, `<ins>` over `<del>`,
`Free` as label not `$0`, recurring rows skipped). Scope EVERY bare Woo class to the surface's own
container — a header mini-cart earlier in the DOM reuses `.total`, `.email`, `.product-name`
(`ORDER_DETAILS_TABLE`, `.order_details`, `.woocommerce-customer-details`). Compare as money only
when numeric (`amount()` → NaN for labels).

<a id="classic-vs-blocks"></a>
**[MUST] classic-vs-blocks — `fillCheckout` decides from the live DOM** (config is the hint, the
other variant's selectors are the alt tier). Country/state first (a country change re-renders the
address group), email early, site fields in `fillExtra`. Blocks: commit-per-field + reconcile
against the geo-IP revert is inside the framework — do not hand-roll it. Multi-step (WFACP/Aero,
wizards): `steps: CheckoutField[][]` + `advance`; a CLIENT plugin's wizard keeps its own steps in
the site helper (pls).

<a id="stock-hold"></a>
**[MUST] stock-hold** — on quantity-one catalogues a failed payment holds the product ~60 min while
it still lists "In stock"; the flow rotates products and retries after emptying the basket (c4c
`openBuyableProduct`).

<a id="gateway-select"></a>
**[MUST] gateway-select — `selectPaymentMethod` before paying, and only through it.** It verifies
the radio HELD (PPCP Fastlane re-arms its own radio after an async email lookup) and names the
winner on failure. Fastlane also hides `#place_order`; selecting PayPal REPLACES it with the Smart
Button — a wait for `#place_order` after choosing PayPal waits forever.

---

## Assertions & parity

<a id="dont-weaken"></a>
**[MUST] dont-weaken — never loosen an assertion to pass over a real bug.** A cross-surface
mismatch is a FINDING (ledger it, report it), not a test defect. Add a settle/poll, split into
fast + eventual, but keep the strict check.

<a id="money-asserts"></a>
**[MUST] money-asserts — woolverine ships the READERS, and every suite then reinvents the
comparison. Don't invent a ninth.** `expectMoney` exists, hand-written and subtly different, in
harmony, leggari, leggariacademy, melon-optics, nopong-limited, pls and repurposedmaterials; the
"one totals ROW, skip when the surface legitimately omits it" helper exists five times under five
names (`expectMoneyRow`, `expectRow`, `cmp`, a `MONEY_ROWS` loop, an empty-both guard). Worse, they
do not agree on STRICTNESS: leggari compares exact cents on purpose ("toBeCloseTo's tolerance is
the size of the bugs we are hunting"), harmony/pls/repurposedmaterials/nopong use
`toBeCloseTo(…, 2)`, leggariacademy `toBe`. Copy the nearest existing one, state the tolerance in a
comment, and say in the handoff that it is a graduation candidate ([graduate](#graduate)) — the
superset is: NaN-safe (a label like `Free` compares as text, never as `$0`), row-absent skips while
row-present-and-wrong fails, and the message carries both rendered strings. A second suite needing
a money assert is the trigger to move it, not to fork it again (measured across 16 suites, Sept 2026).
- **Compare the money, not the BUCKET.** An integration can book the same amount under a different
  row: FastSpring posts tax as a FEE named after the rate ("US (8.25%)"), so the admin box shows
  `Fees: $82.42` and NO tax line while the storefront read that row as tax. Sum tax + fees on both
  sides before asserting (harmony US; on CA the same order is real Woo tax on both sides).

<a id="surface-matrix"></a>
**[MUST] surface-matrix — fill the matrix explicitly; an empty cell is a gap you ledger, not a cell
you skip.** Before calling a place-order test done, write the table out and put the assertion's
name in every cell:

| | cart | checkout | thank-you | admin | email |
|---|---|---|---|---|---|
| product name | | | | | |
| line total | | | | | |
| every totals row | | | | | |
| full address (billing AND shipping) | | | | | |
| payment method + transaction id | | | | | |
| order note the gateway wrote | | | | | |

The customer's three surfaces get asserted because that is where the flow walks; the MERCHANT's
copy is what gets forgotten. On raven-rocks the suite had product, line total and totals parity
across cart → checkout → thank-you, the payment meta and the gateway note in the admin, and the
product + total + order number in the e-mail — and still asserted NOTHING about the admin's totals
rows, the admin's line item, or ANY address on any surface (measured 2026-09-14, after the suite
was already green). That checkout ticks "Ship to a different address?" by default, so a dropped
shipping block is a parcel that never arrives and every other assertion still passes. Capture the
address the flow FILLED into the capture object and compare the admin against it — rebuilding a
fresh `testAddress()` at assert time asserts your generator, not the order.

<a id="gi-negative-controls"></a>
**[MUST] gi-negative-controls — a GI assertion that something did NOT happen is usually an artifact
of GI's own setup.** GI's "this order earns no commission" held only because that step paid with
`#payment_method_bacs`: Bank Transfer parks the order On hold, the referral stays `pending`, and
"Unpaid Referrals" never counts it. Paid through the site's real gateway — and with `AffiliateWP
Lifetime Commissions` active, which credits the affiliate for EVERY later order by a referred
customer — the same order earns its 5%. Verify the MECHANISM before copying a negative control;
where the site really does credit it, assert that positively (the derived amount, the note, the
row) and ledger the GI assertion as not-kept (harmony 05/07, Sept 2026).

<a id="parity-matrix"></a>
**[MUST] parity-matrix — capture ONCE at order-received, assert the SAME values on every surface.**

| Surface | Product name + line total | Every totals row | Full address (billing + shipping) | Payment method | Gateway note |
|---|---|---|---|---|---|
| Thank-you | ✓ | ✓ | ✓ | ✓ | — |
| My Account view-order | ✓ | ✓ | ✓ | ✓ | — |
| Order email (OPENED in `emailPage`) | ✓ | ✓ | ✓ | ✓ | — |
| Admin order editor | ✓ | ✓ | ✓ | ✓ (`Payment via …`) | ✓ (`expectOrderNoteMatches`) |

Readers: `readLineItems` / `readOrderLineItem`, `readTotals` / `readThankYouTotals` /
`readAdminOrderTotals`, `readCustomerDetails` / `readAdminAddresses` (both `normalizeAddress`'d —
compare normalized parts, `hasPart(block, part)`), `readOrderPaymentMethod` / `readPaymentMeta`.
A row a surface legitimately omits is skipped with a warn, never asserted as `$0`. Persist the typed
values you'll need later (the random surnames typed at checkout) ON the capture — a standalone
re-run of a chain link cannot recompute them.

<a id="itemized-tax"></a>
**[MUST] itemized-tax** — the admin panel itemizes tax per RATE; every woolverine reader SUMS tax
rows. If you write a site reader, do the same and scan LEAF rows only (email templates nest tables).

<a id="full-address"></a>
**[MUST] full-address — the WHOLE block, billing AND shipping, normalized, on every surface that
renders it.** Assert both against what checkout SUBMITTED; where the flow ships elsewhere, assert
they DIFFER. The auto-logged-in buyer's thank-you may omit the block (best-effort there, hard
everywhere else).

<a id="subscriptions-recurring"></a>
**[MUST] subscriptions-recurring** — first payment AND recurring total, on every surface that shows
them (`readTotalsSection({ recurring: true })`, `readBlocksTotalsSection({ recurring: true })`,
`td.subscription-total` on order pages, the admin SUBSCRIPTION editor). `readTotalsTable` skips
`.recurring-total` rows so a recurring "Subtotal" never overwrites the first-payment one.

<a id="line-item-parity"></a>
**[MUST] line-item-parity** — product name + per-line total on every surface listing items;
`normalizeProductName` for wording drift ("Course × 1"). The grand total masks two cancelling errors.

<a id="cart-checkout-totals"></a>
**[MUST] cart-checkout-totals** — every row individually in CART and CHECKOUT REVIEW too, not just
post-order.

<a id="classic-vs-block-copy"></a>
**[MUST] classic-vs-block-copy** — per-line `toContainText`, never one multi-line `toHaveText`;
branch note-text assertions on the checkout variant when a plugin's copy differs.

<a id="validation-token-intent"></a>
**[MUST] validation-token-intent** — match field token + intent (`/(Town|City)\b.*required/i`), not
the literal label (plugins reword).

<a id="assert-behaviour"></a>
**[MUST] assert-behaviour** — never pin indices / ids / names GI happened to record.

<a id="sequential-order-numbers"></a>
**[MUST] sequential-order-numbers** — `orderIdFromUrl(page.url())` is the numeric id every URL
needs; the DISPLAYED number may carry an alpha prefix (`pc8703`) — strip punctuation only
(`/[^a-z0-9]/gi`), never `[^0-9]`.

<a id="refund-asserts"></a>
**[MUST] refund-asserts** — `runGatewayRefund` returns the amount computed BEFORE submit (assert it
equals the order total); then `readRefundLineTotal` is NEGATIVE, `readRefundedTotal` by MAGNITUDE
(`Math.abs` — Woo flips this cell's sign between versions), status from `readOrderStatus`, the
gateway's own note via `expectOrderNoteMatches` with the amount derived from the capture (never a
hardcoded total; en dash between fields). A gateway refusal (Stripe "No such charge") is a SITE
finding — the framework throws it, never falls back to a manual refund.

<a id="guest-guard"></a>
**[MUST] guest-guard** — guests have no My Account; guard early.

<a id="force-audit"></a>
**[SHOULD] force-audit** — no `force` on real buttons/links/inputs. Justified: 0-height triggers
that need `dispatchEvent`, animating funnel CTAs, styled checkboxes hiding the input (framework
handles `#terms`).

---

## Resilience & visuals

<a id="visual-spec"></a>
**[MUST] visual-spec — one `@visual`-tagged slice over the load-bearing templates (home, shop,
product, cart, checkout, my-account + every GI screenshot test), through `assertScreenshot`.**
EVERY suite ships one: a GI suite with no screenshot tests is not an exemption, the load-bearing
templates still get baselines (fitcreamery shipped without any). What is standard is the SLICE,
not the file: `@visual` is the tag, `specs/visual-baselines/` is the one folder (via
`snapshotPathTemplate: SNAPSHOT_PATH_TEMPLATE` in the config), and `npm run baseline` is the one
command that re-records — the same three in every repo, never a hand-typed `playwright test
<some/spec/path> --update-snapshots` and never a second baseline folder (icgbullion parked them
under `specs/basic/`, bartenbach under `specs/pages/`).

Two shapes are allowed, and the choice is per suite:
- **Standalone** — `specs/visual.spec.ts`, data-driven over a page table. The default: pick it
  whenever the shots do not need a journey to reach the page.
- **Woven** — the shot rides along with the functional test that already navigated there, and the
  tag goes on those tests (or their describe). Pick it when a surface is only reachable through a
  click path the functional spec already walks (cart, checkout, an order confirmation), so a
  standalone spec would re-drive the same journey purely to photograph it. repurposedMATERIALS
  runs this shape: navigation + contact own all ten baselines, each page visited once.

Woven has one trap: `npm run baseline` runs every `@visual` test, side effects included. A tagged
test that WRITES to the site (a real form submission, a placed order) means re-recording writes
too. That is allowed on staging, but say so in the spec header and in the README — never discover
it from a record run.

`stabilizeForScreenshot` forces lazy media (`loading=lazy`, `data-src` libraries), step-scrolls,
polls until no image is loading (bounded), scrolls back. Site extras are OPT-INS: `hide`
(off-canvas drawers that inflate `scrollWidth`), `hideOverflowRight` (mega-menu panels / carousel
clones flipping width between the two stability shots), `hideFixed` (sticky chrome). Masks:
`dynamicMasks(page, extra)` — prices, dates, plus the site's counters/reviews. `fullPage` by default;
element shots only for a genuine single component. `soft: true` (warn-only) is a per-site policy
decision, not a way to hide drift. Baselines are per project + platform; re-record on the machine
you compare on; content drift (dynamic grids consumed by your own test orders) is a re-record or a
mask, not a wider `maxDiffPixelRatio`.

<a id="visual-diagnose"></a>
**[MUST] visual-diagnose — a flapping grid width or height is a SITE bug: name it, ledger it,
never style it away.** Grid items with `min-width: auto` blow out when one image lands
(`1024px 35px 35px 35px`); `contain-intrinsic-size` placeholders held by 404 images move page
height. ONE eval (`gridTemplateColumns` + `scrollHeight` before/after the lazy scroll; a
`page.on('requestfailed')` filtered to images) names it. Mask the region or scope the shot with a
comment naming the ledger entry. No `stylePath` injection.

<a id="cookie-consent"></a>
**[MUST] cookie-consent** — identify the plugin from the live HTML, then `preseedCookieConsent(page,
family)` in `shopperPrepare` so the bar never renders. Site popups: `dismissPopups({ extra })` +
`armPopupDismissal` for TIMED leadgen popups (Kadence Conversions fires after the one-shot pass).

<a id="facade-not-widget"></a>
**[MUST] facade-not-widget** — assert the lazy-embed facade OR the mounted iframe, never click
through to load the cross-origin frame.

<a id="no-latching-flags"></a>
**[MUST] no-latching-flags** — retry loops re-read real state every tick (`inputValue`,
`isVisible`, the page's copy); drive third-party screens as a state machine.

<a id="budgets"></a>
**[SHOULD] budgets — measure before raising.** Slow hosts (Kinsta/VIP: 10s+/goto, 27s admin
searches) kill tests by a thousand cuts. Trace-profile first (pair before/after by `callId`, sum
per selector); the usual culprits are a primary that never matches on this theme (15s to alt ×
N calls) and `networkidle` on a beacon-heavy site. `describe.configure({ timeout })` for a chain
that legitimately polls an ESP for two mails (~125s each, `findEmail` leaves NO trace entries).
Running 3 suites in parallel against slow stagings surfaces `ERR_ABORTED` races (a `goto` racing a
click's late navigation) — good stress test, expect flakes, fix with `waitForURL` on the destination.

---

## Integrations

<a id="gateways"></a>
**[MUST] gateways — woolverine drivers only** (`payWithStripe`/`fillStripeCard` for funnels that
own the submit, `payWithPaypalSandbox`, `payWithKlarna`, `payWithAuthnet`, `payWithAffirmSandbox`,
`payWithAcceptBlue`). Popups leave `about:blank` late, buttons match by accessible name, only
`/order-received/` proves payment. Sandbox creds from `.env` (PayPal buyer MUST be a
`@playgrounds.saucal.io` address when PPCP stamps the payer email onto the order — otherwise the
order mail is unreadable). Missing creds throw, they don't no-op. A site tile around a gateway is a
`select` hook. **A chained suite pays as a RETURNING customer:** a subscription purchase forces the
card to be saved, so that customer's NEXT Stripe checkout is offered the token and
`#wc-stripe-upe-form` is hidden — there is no card field to fill. Branch on the live DOM
(`input[name*="payment-token"]:not([value="new"])` → `payWithStripe(page, { useSavedCard: true })`)
and pay with what the customer would; don't force the new-card form back open (harmony 05 after 03,
CA, Sept 2026).

<a id="email"></a>
**[MUST] email — `waitForMessage({ to, subject, contains: <this order's token> })`, then OPEN it in
`emailPage` (`openEmail` / `mailpitViewUrl`) and assert the rendered DOM.** Mailpit is
newest-first and ESPs reorder: `contains` discriminates same-subject mails; `deleteMessages`
before a reset request (the register mail also carries a key). The email's line item has a
Quantity COLUMN (`2`), not `× 2`. Refund emails: struck total in `tr.order-totals-total`, not the
first `<del>`. Emails assert in the SAME test as the order.

<a id="accounts"></a>
**[MUST] accounts — woolverine account flows with hooks.** `registerCustomer` (passwordless sites:
omit `password`, then `setPasswordFromEmail`; proof = notice OR logged-in), `loginAccount`
(asserts nothing on purpose — the project asserts the landing), `logoutAccount` (verifies via
`isLoggedIn`, falls back to the Woo endpoint), `forgotPassword` (inbox cleared, one retry on a
superseded key, `inboxEmail` for relays that rewrite recipients), `openAccountTab({ slug, name })`
+ `DEFAULT_ACCOUNT_TABS`/`customAccountTab`. "Logged user" in GI = the SAME account from the prior
order; carry it with `chainState` (email + cookies), not a set-password round-trip.

<a id="admin"></a>
**[MUST] admin — `openOrder` / `openOrdersList` / `openSubscription` by URL (HPOS + legacy), never
click through the wp-admin menu** (submenus are parked off-screen; slow dashboards re-navigate
after `load`). Admin auth is the `adminAuth` hook → `ensureAdminState({ baseURL, statePath:
auth/admin-<project>.json, prepare })` — lazy per project, cached, validated before re-login
(Defender/Malcare throttle repeated logins). Admin actions behind a native `confirm` are handled
inside the framework (`runGatewayRefund`, `runOrderAction`, `cancelSubscriptionAsCustomer`) — **a
SITE helper that saves an editor has to do it itself.** Playwright DISMISSES dialogs by default,
dismissing a leave-confirmation means "stay", and the failure surfaces one step LATER as the next
`goto` timing out with no document request in the trace. Bind `page.on('dialog', d => d.accept())`
AFTER the `goto` that opened the editor — on a lazy page an earlier bind attaches to the wrong
instance. Harmony: an order-status save on an order that owns a subscription, 3 of 3 CA runs
(Sept 2026).

---

## Multi-region / multi-env

<a id="env-as-project"></a>
**[MUST] env-as-project — `defineProjects({ environments, regions })`.** Every env/region cell is a
Playwright project with its own `baseURL` from `.env` (`BASE_URL_<REGION>_<ENV>`); empty cells
warn+skip; `--project=au-develop`. Visual baselines and `auth/admin-<project>.json` are per
project. Per-region constants (entity IDs drift per subsite) live in a typed map in the site helper.
Multisite: relative `goto` only (`'cart/'`, never `'/cart/'`). Scope per the user's decision (a
site may be "staging only" while another env carries unapproved work).

<a id="regional-rate-labels"></a>
**[WARN] regional-rate-labels — a rate is labelled in the region's own words, not "tax".** Canada
labels its rows `HST (13%)` / `PST` / `QST`; a reader keyed on `tax|vat|gst` finds none of them and
reports a taxless order that the storefront taxed (harmony CA order 125021, C$1,514.50 missing;
fixed in woolverine 1.4.4). A totals row that is missing on ONE region only is a framework bug —
report it, don't special-case the spec.

---

## Maintenance specifics

<a id="warn-tax-shipping"></a>
**[WARN] warn-tax-shipping** — `warnIfNoTaxOrShipping(totals, surface)`; `Free` is fine, missing or
literal `$0` warns. Promote to a hard `expect` only where the test depends on it (refund of shipping).

<a id="coverage-tags"></a>
**[MUST] coverage-tags** — every `test.describe` carries `@plugin:<wp-plugin-slug>` tags
(`woolverine-lint` fails otherwise); a maintenance run filters by changed plugins.

<a id="ci-manual-dispatch"></a>
**[MUST] ci-manual-dispatch** — `workflow_dispatch` is the workflow's ONLY trigger: these suites
place real orders on real sites, so a person starts every run. The record/compare cycle stays, as
two dispatches — after a content sync, the `@visual` slice with `update_snapshots=true`; after a
deploy, the suite with the flag off — and the baselines travel between them through the Actions
cache, never git. Ship the `pull_request` / `workflow_run` job logic but NOT the triggers; a
project that has earned automatic runs turns them on by adding the two blocks back. Never
`on: push`. → `templates/playwright.yml` (`grep -n 'ADAPT:'`).

---

## Live triage

The user runs; you read. Check these FIRST:

- **`error-context.md` in the trace** — the ARIA snapshot shows the real page at failure (a login
  form, a 404, "Invalid order.", production instead of staging).
- **Network doc requests in the trace** — did the navigation you assume actually happen? A decoy
  link that `preventDefault`s "clicks" fine and goes nowhere (framework `goToCart` and
  `navigateToMyAccount` now PROVE the landing).
- **A heal error without `| AI suggested:`** → the AI tier never answered (key/model), not the page.
- **A regex `hasText` that "never matches" a row** → whitespace; anchor on the leaf cell.
- **Uppercase/glued text in a comparison** → `textContent` vs `innerText` (CSS transform, `<br>`).
- **A recurring "Subtotal" overwrote the first-payment one** → use the section readers.
- **The gateway radio flips back after selection** → Fastlane re-arm; `selectPaymentMethod` retries.
- **`ERR_ABORTED` on a `goto` right after a click** → the click's navigation was still in flight
  on a slow host; `waitForURL(..., { waitUntil: 'commit' })` before the fallback.
- **A `goto` that times out with NO document request in the trace** → nothing ever left the page:
  a native dialog was raised and Playwright dismissed it ([admin](#admin)). It reads exactly like
  host latency, and raising `navigationTimeout` does not fix it — harmony burned two CA runs at 120s.
- **240s test death with no single slow step** → budget burn (15s primary misses × N, `networkidle`
  that never settles, `toHaveCount(0)` on permanently-present hidden overlays) — profile the trace.
- **"There are some issues with the items in your basket"** → stock hold from an earlier run.
- **A refund that "did nothing"** → the native confirm (framework accepts it) or a gateway alert
  (framework surfaces it) — read the thrown message, don't loosen the status assert.
- **An order mail that never arrives** → the order carries a non-trap email (PPCP payer email);
  the fix is the sandbox account's address, not the assertion.
- **Selector drift** → let lokinator heal it, then fix the primary in code; keep the cache entry.
- **Known site issues are not test bugs** — staging key mismatches (Stripe "No such charge"), a
  wholesale catalogue with no products, a production URL in an ACF redirect row. Ledger + report.

---

## False passes

A green test that proves nothing is worse than a red one: it spends the run and buys no
information. Every pattern below was a test that PASSED on raven-rocks (Sept 2026) before someone
looked at what it had actually observed.

<a id="answer-not-prompt"></a>
**[MUST] answer-not-prompt — assert the site's ANSWER, never wording the page already carried.**
A restock signup asserted `/thank|notif|sign/i` against the form's own container — which reads
"Want to be notified when this product is back in stock?" before anything is submitted. It passed
without signing anyone up. Read the element the site ADDS on success (a `.woocommerce-message`, a
redirect), and write the regex against words that only exist afterwards ("successfully signed up").

<a id="prove-the-session"></a>
**[MUST] prove-the-session — a permission test must prove WHOSE session it ran as.** A case
asserting "a Customer cannot reach this endpoint" logged in, silently failed to, and asserted that
an ANONYMOUS request was refused — a fact about logged-out visitors, not about the capability
check. Assert `isLoggedIn` (or the role's own marker) before probing, and let the refusal message
name which gate fired: a nonce failure and a capability failure are different findings.

<a id="wait-for-change"></a>
**[MUST] wait-for-change — wait for the page to CHANGE, not for a pattern that matches where you
already are.** `waitForURL(/thank-you|contact/)` on `/contact-us/` resolves instantly against the
document already loaded, and the helper returns the pre-submit page as the outcome: a form that was
never sent reads exactly like one that was. Capture the path first and wait for a different one.

<a id="assert-from-a-fresh-state"></a>
**[MUST] assert-from-a-fresh-state — when a flow's last step grants what you are testing, re-prove
it from outside.** WooCommerce's password reset signs the customer in as it finishes, so "the flow
completed" says nothing about the password. Log OUT and log in again with the new one. Same shape
for anything self-confirming: a registration that auto-logins, a coupon the cart applied for you.

<a id="cache-can-answer"></a>
**[SHOULD] cache-can-answer — a page cache can serve HTML older than the change you are testing.**
A settings change (new reCAPTCHA keys) was invisible for minutes behind WP Rocket, and a `?nocache=`
bust was what proved it had actually landed. When a test disagrees with the admin screen, suspect
the cache before the code — and remember the browser gets the same cached page a `curl` does.

<a id="duplicated-widgets"></a>
**[MUST] duplicated-widgets — `.first()` hides a twin.** Elementor renders desktop and mobile
containers with the SAME ids, so an out-of-stock PDP printed its restock form twice and a click
landed on the hidden one. Filter by `{ visible: true }` and scope the fields to that container. The
same shape is worth ASSERTING where a duplicate would be a bug: a panel that must render exactly
once (a theme copy and a plugin copy of the same feature both hooked) is `toHaveCount(1)`, not
`.first()`.

<a id="dont-eat-your-fixture"></a>
**[MUST] dont-eat-your-fixture — never pin a product a purchase test consumes.** A pinned variable
product was bought out by its own spec; the next run found stock 0, the add-to-cart disabled, and
the resilient click fell through to a related tile's "Add to cart" — buying a DIFFERENT product
while asserting the pinned one. Pin for visuals and readers; let the catalogue choose for
purchases (`pickFirstProduct`, first available option per axis).

<a id="shared-context"></a>
**[MUST] shared-context — one test's leftover state is the next test's starting state.** The
shopper context is reused across tests in a worker, and a declined-card case keeps its cart ON
PURPOSE, so the next purchase asserted against a line it never added. Start every purchase flow
from `emptyCart`; never assume a fixture is fresh because the test is.

<a id="captcha-policy"></a>
**[MUST] captcha-policy — read the site key before deciding a form is testable.** With Google's
public TEST pair (`6LeIxAcT…`) the widget validates anything and the form submits for real; with a
production key, do NOT try — assert the form's contract instead (every field still collected, the
guard still present, an empty submit still refused) and say in the handoff that the submission is
not automatable. `readRecaptchaSiteKey` answers this in one call. A suite that starts failing at a
checkbox is telling you the key changed, not that the test is flaky.

---

## Coverage self-audit

Per place-order / subscription / membership test:
- [ ] The [surface matrix](#surface-matrix) is filled in, with the MERCHANT's cells named — admin
      totals rows, admin line item, both address blocks — or each empty cell ledgered.
- [ ] Every assertion re-read against [False passes](#false-passes): does it observe something the
      page did NOT already say, from a session it proved, after a state it did not itself grant?
- [ ] Every GI-parent assertion has a home or a ledgered reason (audit TWICE — silent coverage loss
  hides in bare reads with no `expect()`: `grep -nE "await (resilientText|readTotals|read\w+)\(" specs helpers | grep -v expect`).
- [ ] ONE test drives shopper + admin + email; serial links only for mutations.
- [ ] Product name + line total, every totals row, full address, payment method on all four surfaces.
- [ ] Cart + checkout rows asserted individually; tax/shipping warned when missing or `$0`.
- [ ] Email OPENED in `emailPage`.
- [ ] Subscriptions: first + recurring on every surface. Memberships: plan + status + granted access.
- [ ] Step logs cover the journey.

Per suite:
- [ ] A `@visual` slice exists (standalone or woven) and `npm run baseline` recorded it into
  `specs/visual-baselines/` (per project); the folder is committed and non-empty. Any write side
  effect a tagged test carries is named in the spec header and the README.
- [ ] `@plugin` tags everywhere.
- [ ] Every deliberate omission and every known site issue written in the ledger.
- [ ] Every site-side helper has its "why it stays" line, or was deleted in the slimming pass.

---

## Definition of done

- `npx tsc --noEmit` clean · `npx woolverine-lint e2e/specs` clean · `npx playwright test --list`
  count matches the triage table — all from the repo root.
- `package.json` takes `@saucal/woolverine` as a semver range and the lockfile resolves it from
  `npm.pkg.github.com` — a `github:` URL anywhere in the lockfile means the migration is half done.
- Root tooling complete: `.nvmrc` (22), `.npmrc` (the `@saucal` registry + `NODE_AUTH_TOKEN`),
  `.deployignore` excludes the suite, `.gitignore` covers `node_modules` + `.env`; a fresh
  `npm install` on Node 24 succeeds with the token exported ([private-packages](#private-packages)).
- No `expect()` in specs but `toHaveScreenshot`; every `expect` has a message.
- `specs/visual-baselines/` exists and holds a `.png` per project — an empty or missing folder
  means the visual slice never ran, not that the site has no visuals.
- No `goto` to cart/checkout; no raw locator actions outside lokinator wrappers (allowed: waits,
  `setInputFiles`, `dispatchEvent` for 0-height triggers, popup pages).
- No helper that duplicates a woolverine export; no shims.
- `.lokinator-cache.json` committed and anchored.
- Every slice NOT live-run is named as unverified in the handoff, with the exact command to run it.

---

## Contributing to woolverine

<a id="graduate"></a>
**[MUST] graduate — two consumers = framework code.** When a second site needs a helper a first
site owns (or you find yourself copying one), move it to `~/helper/woolverine/src/<module>.ts` as
the SUPERSET of both, with the site differences as hooks, plus ONE mock test in `test/*.spec.ts`
(`page.setContent` fixtures; see `test/checkout-coupon.spec.ts`). Adopt it in both sites in the
same pass and delete the private copies. One consumer + clearly generic Woo behaviour (a gateway
driver) may graduate at once.

<a id="release"></a>
**[MUST] release — tags, exact pins, verified bumps.**
- `npm run check` + `npx playwright test test/` green → commit → `npm version patch|minor|major -m "woolverine v%s — <what>"`
  (patch = fix, minor = compatible behaviour/API addition, major = break) → `git push --follow-tags`.
  The tag fires `.github/workflows/publish.yml`, which publishes to GitHub Packages;
  `files: ["dist"]` — consumers never receive `src`/`test`. A laptop can publish the same thing
  with `NODE_AUTH_TOKEN=$(gh auth token) npm publish` when CI cannot.
- Bump a consumer with `npm update @saucal/woolverine` (inside the range) or
  `npm i @saucal/woolverine@^X.Y.Z` (outside it), then check `npm ls @saucal/woolverine`. The
  transitive `@saucal/lokinator` now follows semver on its own — as a git dep it did NOT, and
  thirteen lockfiles sat on lokinator v1.0.0 under a v1.3.x woolverine until someone ran
  `npm update lokinator` by hand. A lokinator release needs a woolverine release behind it to
  reach the sites.
- A behaviour delta for other pilots is listed in the release message; additive changes need no
  regression round, deltas get validated by each site's next routine run.
- **Fetch before you bump.** Several pilots release woolverine in the same week from different
  sessions: `git fetch --tags` and read the CURRENT version before `npm version`, or the bump
  collides with a tag that already exists (harmony tried to cut v1.3.6; it was taken).

<a id="lokinator-changes"></a>
**[SHOULD] lokinator-changes** — locator-stack behaviour (tiers, cache eviction, AI prompt) lives
in `github:saucal/lokinator-automation`, tagged the same way and pinned inside woolverine.

---

## Handoff

1. **Pre-handoff verification pass** — grep/read the actual code, report per test asserted /
   missing / ledgered ([Coverage self-audit](#coverage-self-audit), [Definition of done](#definition-of-done)).
2. **`e2e/README.md`** — projects and how to select them, setup (`nvm use`, `npm install`, `.env` keys — all from the root),
   run commands (per project / area / spec, `--ui`, `show-report`, `typecheck`, `lint`), layout,
   the site's load-bearing gotchas, known site issues. Practical and runnable.
3. **Branch** — the suite already lives in the site repo (tooling at the root, suite under
   `e2e/`) on the `playwright` (or agreed) branch. Commit; pushing and merging are the USER's call unless told otherwise.
4. **Framework changes** — released and pushed per [release](#release); the site pinned to the tag.
5. **State left on staging** — list every real order / account / upload the migration created.
6. **Ledger** — GI assertions not kept (with reason), known site issues, slices not live-run.

---

## What NOT to do

- Don't reimplement anything woolverine exports; don't add shims or re-exports.
- Don't invent test cases not in the GI export; don't drop a GI assertion silently.
- Don't weaken assertions, widen `maxDiffPixelRatio`, or `stylePath` a flaky page.
- Don't `goto()` cart/checkout; don't `page.evaluate()` where a locator works; don't eval-set values.
- Don't hardcode credentials, URLs, entity IDs across regions, or totals in note regexes.
- Don't put a token in the repo's `.npmrc` — it reads `${NODE_AUTH_TOKEN}`
  ([private-packages](#private-packages)).
- Don't nest `package.json` under `e2e/`, don't name the suite's script `test` or its folder
  `tests` ([script-not-test](#script-not-test)), don't hardcode a Node version in the workflow —
  `.nvmrc` + `.npmrc` at the root ([repo-root-tooling](#repo-root-tooling)).
- Don't relitigate a settled decision, wander into the deploy actions or CI variables, or edit this
  doc to fit what you concluded ([settled-decisions](#settled-decisions)).
- Don't save an admin editor, or fire an order action, without a `dialog → accept` bound first —
  Playwright dismisses, and a dismissed dialog fails the NEXT step ([admin](#admin)).
- Don't run the live suite yourself; don't touch a checkout the user may be running.
- Don't leave a site helper without its one-line "why it stays".
- Don't write prose comments, one-caller abstractions or "for later" scaffolding; don't run a silent flow.
