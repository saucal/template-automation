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

Sections: 1. [Before you start](#before-you-start) · 2. [Inputs](#inputs) · 3. [Reference
architecture](#reference-architecture) · 4. [Woolverine surface map](#woolverine-surface-map) ·
5. [The recipe](#the-recipe) · 6. [Recon](#recon) · 7. [Site code rules](#site-code-rules) ·
8. [Checkout mechanics](#checkout-mechanics) · 9. [Assertions & parity](#assertions--parity) ·
10. [Resilience & visuals](#resilience--visuals) · 11. [Integrations](#integrations) · 12. [Multi-region
/ multi-env](#multi-region--multi-env) · 13. [Maintenance specifics](#maintenance-specifics) ·
14. [Live triage](#live-triage) · 15. [Coverage self-audit](#coverage-self-audit) · 16. [Definition of
done](#definition-of-done) · 17. [Contributing to woolverine](#contributing-to-woolverine) ·
18. [Handoff](#handoff) · 19. [What NOT to do](#what-not-to-do)

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
- **One reference pilot** shaped like your site (table below): its `tests/` is a copy-paste-ready
  starting point and shows exactly where the site/framework line falls.

| Site shape | Reference pilot (`saucal/<repo>`, branch `feat/woo-qa-migration`, dir `tests/`) |
|---|---|
| Classic checkout, Klarna + PayPal (PPCP + Fastlane), quote/marketplace plugin, Elementor | `cash-fore-clubs` |
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
5. Credentials go in `tests/.env` only (never in code): `BASE_URL_<ENV>`, `WP_ADMIN_USER`, `ADMIN_PASS`,
   customer creds, sandbox gateway creds, `OPENAI_API_KEY` (lokinator AI tier), `MAILPIT_URL`.

---

## Reference architecture

Everything lives in the site repo under `tests/`, a self-contained nested project:

```
tests/
├── .env / .env.example / .gitignore      # → templates/.env.example, templates/gitignore
├── package.json                          # → templates/package.json (deps: woolverine + dotenv; playwright + typescript dev)
├── tsconfig.json                         # → templates/tsconfig.json
├── playwright.config.ts                  # → templates/playwright.config.ts (defineProjects, LOKINATOR_CACHE anchored)
├── .lokinator-cache.json                 # COMMITTED — its diff is the selector-drift report
├── auth/                                 # gitignored: admin-<project>.json, chain-<site>-*.json, member state
├── fixtures/index.ts                     # → templates/fixtures.ts (createTest; ~30 lines)
├── types/test-config.ts                  # OrderConfig / Result shapes for THIS site
├── helpers/
│   ├── <site>.ts                         # site DOM only: selectors, nav paths, site readers, hooks
│   ├── flows.ts                          # orchestrators returning Result objects, no expect()
│   └── assertions.ts                     # every expect(); bodies are site-owned
└── specs/<area>/*.spec.ts                # thin: config → flow → assert*; @plugin tags
```

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
| `woolverine-lint specs` | policy: expect-home, plugin-tags, nav-clicks. `// lint-ok` opt-out with a reason. |

If your site needs something generic that is not here, see [Contributing to woolverine](#contributing-to-woolverine).

---

## The recipe

Proven order. Each step is a commit.

1. **Branch + worktree.** In the site repo: `git worktree add ../<site>-playwright -b playwright <mainline>`
   (or the repo's existing test branch). Work in the worktree — never in a checkout the user may
   be running. Suite root is `tests/`.
2. **Scaffold from templates.** `package.json` (pin the EXACT tag: `"woolverine": "github:saucal/woolverine-automation#vX.Y.Z"`
   — never `#semver:`, never a floating branch), `tsconfig.json`, `.env.example`, `.gitignore`,
   `playwright.config.ts` (`defineProjects`, `snapshotPathTemplate: SNAPSHOT_PATH_TEMPLATE` —
   woolverine >= v1.1.3, `LOKINATOR_CACHE ||= <tests>/.lokinator-cache.json`, `screenshot: 'off'`,
   `trace: 'retain-on-failure'`), `fixtures/index.ts` (`createTest`). `npm install`.
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
7. **Gates.** `npx tsc --noEmit` · `npx woolverine-lint specs` · `npx playwright test --list`
   (count matches the triage table). Commit.
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

## Site code rules

<a id="import-dont-write"></a>
**[MUST] import-dont-write.** Before any helper: `grep -n "^export" ~/helper/woolverine/src/*.ts`.
A site helper that reimplements a woolverine function is a bug. Point imports straight at
`'woolverine'` — no `helpers/resilient.ts`, no re-export shims, no wrapper that only renames.

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
- `LOKINATOR_CACHE` anchored in `playwright.config.ts` (default is cwd-relative — a run from the
  repo root and one from `tests/` would write two caches). Commit `.lokinator-cache.json`; when a
  heal lands, fix the primary in code and keep the cache entry as the drift record.
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
`tests/` holds ONLY what is the site's — the pilots landed at 25–50% of their GI-era size.

<a id="comments"></a>
**[MUST] comments — constraint notes, not narration.** One short line saying WHY (the measured
quirk, the trap) next to the code it protects. No essays, no history, no restating the code —
long comments burn tokens every session. Mark deliberate shortcuts `// ponytail: <ceiling>, <upgrade path>`.

<a id="credentials-env"></a>
**[MUST] credentials-env** — all creds/URLs via `tests/.env`; ship `.env.example` only.

<a id="package-json"></a>
**[MUST] package-json** — `test`, `test:<area>` per existing folder, `typecheck`, `lint`
(`woolverine-lint specs && tsc --noEmit`), `report`, `setup:browsers`. Deps: `woolverine` (exact
tag) + `dotenv`; dev: `@playwright/test`, `typescript`, `@types/node`. Nothing else unless the
site truly needs it (no Stagehand, zod, playwright-core, e2e-utils).

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
**[MUST] visual-spec — one data-driven visual spec at `specs/visual.spec.ts`, tagged `@visual`, on
the load-bearing templates (home, shop, product, cart, checkout, my-account + every GI screenshot
test), through `assertScreenshot`.** EVERY suite ships one: a GI suite with no screenshot tests is
not an exemption, the load-bearing templates still get baselines (fitcreamery shipped without any).
Not `specs/basic/`, not `specs/pages/` — that path IS the standard (icgbullion and bartenbach each
invented their own). Baselines land in `specs/visual-baselines/` via `snapshotPathTemplate:
SNAPSHOT_PATH_TEMPLATE` in the config, and `npm run baseline` re-records them — the same command in
every repo, never a hand-typed `playwright test <some/spec/path> --update-snapshots`.
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
`select` hook.

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
inside the framework (`runGatewayRefund`, `runOrderAction`, `cancelSubscriptionAsCustomer`).

---

## Multi-region / multi-env

<a id="env-as-project"></a>
**[MUST] env-as-project — `defineProjects({ environments, regions })`.** Every env/region cell is a
Playwright project with its own `baseURL` from `.env` (`BASE_URL_<REGION>_<ENV>`); empty cells
warn+skip; `--project=au-develop`. Visual baselines and `auth/admin-<project>.json` are per
project. Per-region constants (entity IDs drift per subsite) live in a typed map in the site helper.
Multisite: relative `goto` only (`'cart/'`, never `'/cart/'`). Scope per the user's decision (a
site may be "staging only" while another env carries unapproved work).

---

## Maintenance specifics

<a id="warn-tax-shipping"></a>
**[WARN] warn-tax-shipping** — `warnIfNoTaxOrShipping(totals, surface)`; `Free` is fine, missing or
literal `$0` warns. Promote to a hard `expect` only where the test depends on it (refund of shipping).

<a id="coverage-tags"></a>
**[MUST] coverage-tags** — every `test.describe` carries `@plugin:<wp-plugin-slug>` tags
(`woolverine-lint` fails otherwise); a maintenance run filters by changed plugins.

<a id="ci-record-compare"></a>
**[MUST] ci-record-compare** — CI records baselines after the content sync and compares after a
deploy goes green; never `on: push`. → `templates/playwright.yml` (`grep -n 'ADAPT:'`).

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

## Coverage self-audit

Per place-order / subscription / membership test:
- [ ] Every GI-parent assertion has a home or a ledgered reason (audit TWICE — silent coverage loss
  hides in bare reads with no `expect()`: `grep -nE "await (resilientText|readTotals|read\w+)\(" specs helpers | grep -v expect`).
- [ ] ONE test drives shopper + admin + email; serial links only for mutations.
- [ ] Product name + line total, every totals row, full address, payment method on all four surfaces.
- [ ] Cart + checkout rows asserted individually; tax/shipping warned when missing or `$0`.
- [ ] Email OPENED in `emailPage`.
- [ ] Subscriptions: first + recurring on every surface. Memberships: plan + status + granted access.
- [ ] Step logs cover the journey.

Per suite:
- [ ] `specs/visual.spec.ts` present and `@visual`-tagged; `npm run baseline` recorded them into
  `specs/visual-baselines/` (per project); the folder is committed and non-empty.
- [ ] `@plugin` tags everywhere.
- [ ] Every deliberate omission and every known site issue written in the ledger.
- [ ] Every site-side helper has its "why it stays" line, or was deleted in the slimming pass.

---

## Definition of done

- `npx tsc --noEmit` clean · `npx woolverine-lint specs` clean · `npx playwright test --list` count
  matches the triage table.
- `package.json` pins an EXACT woolverine tag; `node_modules/woolverine/dist` carries a marker of
  that version (a stale lock silently keeps the old resolution).
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
  `files: ["dist"]` — consumers never receive `src`/`test`.
- Bump a consumer with `npm install woolverine@github:saucal/woolverine-automation#vX.Y.Z` (editing
  the spec in `package.json` then `npm install` says "up to date" and keeps the OLD resolution),
  then `grep` a marker in `node_modules/woolverine/dist/`. Never `#semver:` — it floats.
- A behaviour delta for other pilots is listed in the release message; additive changes need no
  regression round, deltas get validated by each site's next routine run.

<a id="lokinator-changes"></a>
**[SHOULD] lokinator-changes** — locator-stack behaviour (tiers, cache eviction, AI prompt) lives
in `github:saucal/lokinator-automation`, tagged the same way and pinned inside woolverine.

---

## Handoff

1. **Pre-handoff verification pass** — grep/read the actual code, report per test asserted /
   missing / ledgered ([Coverage self-audit](#coverage-self-audit), [Definition of done](#definition-of-done)).
2. **`tests/README.md`** — projects and how to select them, setup (`npm install`, `.env` keys),
   run commands (per project / area / spec, `--ui`, `show-report`, `typecheck`, `lint`), layout,
   the site's load-bearing gotchas, known site issues. Practical and runnable.
3. **Branch** — the suite already lives in the site repo under `tests/` on the `playwright`
   (or agreed) branch. Commit; pushing and merging are the USER's call unless told otherwise.
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
- Don't pin a floating dependency (`#semver:`, a branch) — exact tags only.
- Don't run the live suite yourself; don't touch a checkout the user may be running.
- Don't leave a site helper without its one-line "why it stays".
- Don't write prose comments, one-caller abstractions or "for later" scaffolding; don't run a silent flow.
