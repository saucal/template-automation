# Build a WooCommerce site's Playwright suite on woolverine

Turn a WooCommerce site — its Ghost Inspector export when it has one, the baseline when it does
not — into a thin Playwright suite that runs on
**woolverine** (`@saucal/woolverine` from GitHub Packages, Saucal's shared WooCommerce test
framework, self-healing locators via **lokinator**; source: `github:saucal/woolverine-automation`). The suite you write is the SITE: its DOM
quirks, its flows, its assertions. Everything WooCommerce-generic — fixtures, checkout/cart
fill, money readers, admin editor, refunds, Mailpit, account flows, gateway drivers, visual
stabilizer, chain state, lint — is imported, never re-implemented.

This is the recipe proven on 11 sites (leggari, nopong, pls, open-studio, repurposed,
purcrystal, vesica, melon, leggari academy, 2m, cash fore clubs): every one is green live on
one framework version, and every migration shrank the suite by 25–50% while KEEPING every GI
assertion. Follow it; where you learn something generic, put it in the framework, not the site.

**No Ghost Inspector export?** Same recipe, same layout, same rules. Skip [read-all-gi](#read-all-gi)
and the GI diff (recipe step 6); the triage table starts from `templates/baseline-suite.md` plus
what [live-explore](#live-explore) finds, and the ledger records what the baseline asks for and the
site does not have. Everything from [The recipe](#the-recipe) on applies unchanged.

## How to read this doc

Tags: **[MUST]** non-negotiable · **[STRICT]** hard rule with enumerated exceptions · **[SHOULD]**
strong default · **[WARN]** detect + `console.warn`, never fail. Headings are stable anchors.

<a id="settled-decisions"></a>
**[MUST] settled-decisions — the choices written here were already argued with the team. Implement
them; do not re-derive them.** Node 22 in `e2e/.nvmrc`, the framework consumed from GitHub
Packages as `@saucal/woolverine`, the suite as its OWN package under `e2e/`, runs started through
the platform's `maintenance.yml action=e2e`: each one is the OUTCOME of a review (cash-fore-clubs
#115, Sept 2026; the e2e runner, action-maintenance #122, 25 Sept 2026), written as the answer,
not as an open question.

- **Copy the reference pilot's shape; don't design a new one.** cash-fore-clubs is the layout
  reference for what lives INSIDE `e2e/` — `diff` the repo you are migrating against it instead
  of reasoning from first principles. Its tooling still sits at the repo root (it predates
  [e2e-package](#e2e-package)); the package files come from `templates/`, not from the pilot.
  A structure you derived yourself is wrong even when it is defensible.
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
- **One reference pilot** shaped like your site (table below): its `e2e/` is a copy-paste-ready
  starting point and shows exactly where the site/framework line falls.

| Site shape | Reference pilot (`saucal/<repo>`, branch `feat/woo-qa-migration`, dir `e2e/`) |
|---|---|
| Classic checkout, Klarna + PayPal (PPCP + Fastlane), quote/marketplace plugin, Elementor — also the layout reference for the suite's insides (its tooling is still at the root: move it per [e2e-package](#e2e-package)) | `cash-fore-clubs` |
| Blocks checkout, multi-region × multi-env (VIP), WCS subscriptions, wholesale, Kadence drawer | `nopong-limited` |
| Blocks checkout inside a custom 4-step wizard (client plugin), Stripe PE, two envs | `pls` |
| FunnelKit funnel over Blocks, membership subscription, LWA login, Josephine handoff | `open-studio` |
| WFACP multi-step classic checkout, composite products, Authorize.Net + Affirm, contractor registration | `leggari` |
| Memberships (WC Memberships), PayPal, Auth.Net, Kinsta (slow host) | `vesica-institute` |
| Elementor + JetMenu, Accept.Blue, alpha-prefixed order numbers, AvaTax itemized tax | `purcrystal` |
| Multi-region EU/UK, category-nav visuals | `melon-optics` |
| Custom subscription builder, saved-card Stripe, subscription switch + proration, wps-hide-login | `2m-networks` |

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

`e2e/` is its own Node package — `package.json`, lockfile, config, `.env`, `.nvmrc`, `.npmrc`
and the suite all inside it — and every command (`npm install`, `npm run e2e`, `npx playwright
test …`) runs from `e2e/`. (Decided on the e2e runner review, 25 Sept 2026: the platform deploy
runs `npm ci` at the repo ROOT with no registry token, so a root `package.json` that declares
`@saucal/woolverine` fails every deploy — see [e2e-package](#e2e-package). The folder is `e2e`,
not `tests`, and the script is `e2e`, not `test` — see [script-not-test](#script-not-test).)

```
<repo root>
├── .gitignore                            # the site's own; untouched (everything the suite produces is ignored inside e2e/)
├── .deployignore                         # the site's own; append templates/deployignore-snippet (`/e2e/`)
└── e2e/
    ├── package.json / package-lock.json  # → templates/package.json (deps: woolverine + dotenv; playwright + typescript dev)
    ├── tsconfig.json                     # → templates/tsconfig.json (include: **/*.ts)
    ├── playwright.config.ts              # → templates/playwright.config.ts (testDir specs, outputs beside it)
    ├── .env / .env.example               # → templates/.env.example; .env gitignored
    ├── .nvmrc                            # → templates/nvmrc (Node 22)
    ├── .npmrc                            # → templates/npmrc (@saucal → npm.pkg.github.com; reads NODE_AUTH_TOKEN)
    ├── .gitignore                        # → templates/gitignore (node_modules/, .env, auth/, reports/, test-results/, specs/visual-baselines/)
    ├── .lokinator-cache.json             # COMMITTED — its diff is the selector-drift report
    ├── README.md                         # how to run it: locally AND through GitHub ([Handoff](#handoff))
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

No per-repo GitHub workflow: runs go through the platform's `maintenance.yml action=e2e`
([e2e-runner](#e2e-runner)).

Paths in this doc that start with `specs/`, `helpers/`, `fixtures/` are relative to `e2e/`, which
is also the working directory of every command.

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

**Read it from the source, never from a copy here.** `grep -n "^export" ~/helper/woolverine/src/*.ts`
lists every export in one call, the one-line header of each `src/*.ts` says what the module owns, and
the README carries the options. A table in this doc goes stale silently — the framework releases
weekly ([release](#release)) and a helper you "know" is missing is a helper you reimplement.

Roughly: `createTest`/`defineProjects` (fixtures + the env×region matrix), lokinator (`heal`,
`resilient*`), and one module per surface — `account` `cart` `pdp` `checkout` `payments` `money`
`order-received` `admin` `order-notes` `subscriptions` `mailpit` `popups` `chain` `visual`
`assertions` `testdata` `auth` — plus `woolverine-lint`. If a site needs something generic that the
grep does not show, see [Contributing to woolverine](#contributing-to-woolverine).

---

## The recipe

Proven order. Each step is a commit.

1. **Branch + worktree.** In the site repo: `git worktree add ../<site>-playwright -b playwright <mainline>`
   (or the repo's existing test branch). Work in the worktree — never in a checkout the user may
   be running. Everything under `e2e/` ([Reference architecture](#reference-architecture)).
2. **Scaffold from templates** ([e2e-package](#e2e-package)). In `e2e/`: `package.json`
   (`"@saucal/woolverine": "^X.Y.Z"` — a normal semver range from GitHub Packages; the lockfile
   pins the resolution), `tsconfig.json`, `.env.example`, `.nvmrc`, `.npmrc`, `.gitignore`,
   `playwright.config.ts` (`defineProjects`, `snapshotPathTemplate: SNAPSHOT_PATH_TEMPLATE` —
   woolverine >= v1.1.3, `LOKINATOR_CACHE ||= <e2e>/.lokinator-cache.json`, `screenshot: 'off'`,
   `trace: 'retain-on-failure'`), `fixtures/index.ts` (`createTest`). Append
   `templates/deployignore-snippet` to the site's `.deployignore`. `npm install` in `e2e/`.
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
   (count matches the triage table). All from `e2e/`. Commit.
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
tests that are not in the export. Start from `templates/baseline-suite.md` — the floor every
WooCommerce site gets whether or not the GI export or the client mentioned it; the explore ADDS to
that list, it does not replace it, and a missing baseline row is a gap to ledger, not a shorter suite.

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
measured. On raven-rocks (Convesio express, one container, page caching) two workers were
recorded producing a cart that read ANOTHER context's quantity and an admin-ajax charge answering
"Request failed."; both went away at one worker (2026-09-11). Treat the first as an OBSERVATION
whose mechanism was never established, and note what it cannot be: workers are separate processes
with separate browsers, and the page fixtures are test-scoped, so nothing is shared client-side.
If you see it, look server-side — a page cache serving one session's cart HTML or fragments to
another, an object cache keyed without the session — or at the test itself
([verify-the-mechanism](#verify-the-mechanism)). The second one has a plain explanation: a small
container runs few PHP workers, and two concurrent admin-ajax charges are enough to starve it. Where wall clock
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
**[MUST] credentials-env** — all creds/URLs via `e2e/.env`; ship `.env.example` only. The names
are the runner's ([e2e-runner](#e2e-runner)): `BASE_URL` / `BASE_URL_<ENV>`, `WP_ADMIN_USER` /
`ADMIN_PASS`, `CUSTOMER_USER` / `CUSTOMER_PASS`, `HTTP_AUTH_USER` / `HTTP_AUTH_PASS`, `PAY_PAL_USER` /
`PAY_PAL_PASS`, `AFTERPAY_USER` / `AFTERPAY_PASS`, `MAILPIT_URL`, `OPENAI_API_KEY`. A suite that
reads its own names (`PAYPAL_USERNAME`, `PASSWORD`, `QA_CUSTOMER_USER`) gets nothing from the
runner. No plaintext fallback password anywhere in the code.

<a id="script-not-test"></a>
**[MUST] script-not-test — the suite's npm script is `e2e`, NEVER `test` or `build`, and its folder
is `e2e/`, never `tests/`.** The e2e runner installs `e2e/` with `saucal/action-build`, exactly as
a deploy installs a package: `npm ci` -> `npm run --if-present build` -> `npm run --if-present
test`. A `test` script that means `playwright test` therefore fires INSIDE the install step, before
the site is prepared and the env exported: the config throws and the run is red before it started.
`--if-present` only skips a script that does not exist; it does not ignore failures. The same three
steps run at the repo ROOT on every deploy, which is the other half of why the suite is its own
package ([e2e-package](#e2e-package)): the root `test` slot belongs to the repo's own unit tests
(leggari: three `wp-scripts test-unit-js` suites, reachable as `lerna run test`).

<a id="package-json"></a>
**[MUST] package-json** — `e2e`, `e2e:<area>` per existing folder, `baseline`, `typecheck`, `lint`
(`woolverine-lint specs && tsc --noEmit`), `report` (`reports`), `setup:browsers`.
Deps: `@saucal/woolverine` (a semver range — the lockfile pins it) + `dotenv`; dev: `@playwright/test`, `typescript`, `@types/node`
(major matching `.nvmrc`). Nothing else unless the site truly needs it (no Stagehand, zod,
playwright-core, e2e-utils).

<a id="repo-root-tooling"></a>
<a id="e2e-package"></a>
**[MUST] e2e-package — `e2e/` is a standalone npm package: nothing of the suite at the repo root,
nothing of it deployed.** The platform deploy runs `npm ci` + `build` + `test` at the repo ROOT
(`saucal/action-maintenance` -> `action-build` -> `build-for-deployment.sh`, since 2022) with NO
registry token, so a root `package.json` that declares the private `@saucal/woolverine` fails
every deploy on `401`, and one that merely lists Playwright installs it on every deploy for
nothing. Decided on the e2e runner review (action-maintenance #122, 25 Sept 2026), reversing the
cash-fore-clubs #115 layout; the pilots still on root tooling move with their next update.
- `package.json`, lockfile, `tsconfig.json`, `playwright.config.ts`, `.env(.example)`, `.nvmrc`,
  `.npmrc`, `.gitignore` all INSIDE `e2e/`. Never a workspace member, never referenced from a
  root `package.json` — the root stays exactly as the site had it.
- **An allowlist-style `.gitignore` has to allowlist the suite too.** A repo that ignores `/*`
  and re-adds paths with `!` (harmony) keeps tracked files working after a rename — nothing gets
  untracked — while silently ignoring the folder: `git add e2e/<new spec>` is refused and a spec
  added later never lands. Point the `!` exception at `e2e/`.
- **`e2e/.nvmrc` = `22`** (current LTS the pilots run on); the runner installs on it.
- **`e2e/.npmrc` maps the scope to GitHub Packages**, nothing else:
  `@saucal:registry=https://npm.pkg.github.com` +
  `//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}`. No `allow-git` — there are no git
  dependencies left ([private-packages](#private-packages)).
- **npm or pnpm, both work** (measured 2026-09-11, pnpm 12.4): install, typecheck, lint and
  `--list` are identical under either, with no pnpm-specific config, and `action-build` installs
  from whichever lockfile it finds. Until Sept 2026 the framework was a git dependency and pnpm
  refused it outright — `blockExoticSubdeps` on the transitive lokinator, then `allowBuilds` keyed
  by the EXACT resolved commit sha of both packages, rewritten in every consumer on every release.
  The registry removed all of it. npm stays the default because the pilots and the runner run it;
  a suite that moves must move whole (`pnpm import`, drop `package-lock.json`) — and note pnpm
  FAILS on an import the `package.json` does not declare, which npm's hoisting hides.
- **`.deployignore`** gets one anchored line, `/e2e/` (`templates/deployignore-snippet`) — the
  suite never ships to the host, and the anchor keeps a theme's or plugin's own `e2e/` folder
  out of it. **A repo with NO `.deployignore` still needs one:** `action-build-to-git` copies its
  own default in and then empties every `.gitignore` in the bundle, so the whole suite —
  `.env.example` included — reaches the webroot. The new file has to REPEAT the platform default
  verbatim (anything dropped from it starts being deployed) and add `/e2e/`; measured on elka,
  leggariacademy and nopong-limited, Sept 2026.
<a id="private-packages"></a>
**[MUST] private-packages — the framework is a PRIVATE package; every install needs a token.**
`@saucal/woolverine` and its `@saucal/lokinator` dependency live in GitHub Packages, private like
their repos, so `npm install` without credentials dies on `401 Unauthorized` and neither error
says a token is missing.
- **Locally:** `export NODE_AUTH_TOKEN=$(gh auth token)` in the shell profile, once the `gh` login
  carries `read:packages` (`gh auth refresh -h github.com -s read:packages`). A dev without `gh`
  puts a classic PAT with that scope in their OWN `~/.npmrc`, never in the repo's.
- **In CI:** a workflow's `GITHUB_TOKEN` does NOT reach a package linked to another repo — it
  fails with `403 permission_denied: read_package`. The e2e runner passes the org secret
  `PACKAGES_TOKEN` (`read:packages`, from the bot account, visibility all) as `NODE_AUTH_TOKEN` to
  the install of `e2e/`; the deploy's own root install never sees the package
  ([e2e-package](#e2e-package)), so the deploy runner needs no token. Package `internal`
  visibility, which would need neither, requires an Enterprise plan — saucal is on Team.

- **Local-only clutter (a GI export folder, prompt drafts, `.qa/`) goes in `.git/info/exclude`**, not
  the repo's `.gitignore`. Only what every clone produces (`node_modules/`, `.env`, `auth/`,
  `reports/`, `test-results/`, `specs/visual-baselines/`) belongs in a committed ignore file, and
  that file is `e2e/.gitignore`.

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

<a id="visual-baselines-not-committed"></a>
**[MUST] visual-baselines-not-committed — `specs/visual-baselines/` is gitignored, and the run after a
live→staging sync is `npm run baseline`, not a diff.** The baselines are environment state, not suite
code: staging's content is replaced every time live is synced onto it, catalogue churn moves every
archive page in between (a category gaining or losing its last product re-flows the whole page), and
a PNG carries the platform of the machine that shot it. Committing them puts megabytes of images in
every commit that touches the suite (flyingtech pushed 14 of them before this rule and had to untrack
them) and gives every other clone a baseline it can only fail against. So: the template `.gitignore`
ignores the folder; the first visual run on a machine RECORDS (Playwright writes the missing PNG and
fails that one test — that is expected, say so in the README); after every sync of live onto staging
the maintainer runs `npm run baseline` once, then the suite (on the platform, ServiceApp sends
`update_snapshots: true` for the same reason — [e2e-runner](#e2e-runner)). A visual failure between syncs is drift
to triage (content or layout, see visual-diagnose), never a reason to re-record blind.

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

<a id="no-region-less-script"></a>
**[MUST] no-region-less-script — on a site that runs ONE region per run, every script names a
project.** The template set (`e2e`, `e2e:<area>`) carries no `--project`, so on such a site those
scripts select every configured project and the guard fails each test: a command that can only ever
end in a screen of red. Ship `e2e:<region>` as the entry point and pass the area as an argument
(`npm run e2e:ca -- specs/orders`), and delete the region-less names rather than leaving them as
traps — `npm run e2e` then fails with npm's own "Missing script" and the list of what does exist
(harmony, Sept 2026).

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
<a id="e2e-runner"></a>
**[MUST] e2e-runner — runs go through the platform's `maintenance.yml action=e2e`; no per-repo
workflow.** These suites place real orders on real sites, so nothing starts one but a person or
ServiceApp — never `on: push`, never on every PR. The one workflow that runs them is the site's
`.github/workflows/maintenance.yml` (`saucal/action-maintenance` v3), which ServiceApp dispatches
and a person dispatches by hand:

```
gh workflow run maintenance.yml --ref <branch> -f action=e2e -f payload='{"grep":"@smoke"}'
gh workflow run maintenance.yml --ref <branch> -f action=e2e -f payload='{"update_snapshots":true,"grep":"@visual"}'
```

A repo used to carry `.github/workflows/playwright.yml` (manual dispatch); it is retired — two
workflows reading the same env and cache drift apart — delete it on the next update. What the
runner does, so the suite does not:
- **Users.** On every non-production run it creates `e2e-bot` (administrator) and `e2e-customer`
  (customer) on the target with per-run passwords, bypassing 2FA and captcha, and exports them as
  `WP_ADMIN_USER`/`ADMIN_PASS` and `CUSTOMER_USER`/`CUSTOMER_PASS`. Locally, `e2e/.env` carries the
  staging users ServiceApp's staging action creates.
- **Env.** `BASE_URL` and `BASE_URL_<ENV>` from the site's own home URL, `HTTP_AUTH_USER`/`PASS`
  from the payload or repo secrets, `PAY_PAL_*` / `AFTERPAY_*` / `OPENAI_API_KEY` from org secrets,
  `MAILPIT_URL` from a repo variable, `NODE_AUTH_TOKEN` for the install. Nothing per repo beyond
  the site's SSH vars a deploy already needs.
- **Baselines.** The Actions cache, never git: ServiceApp sends `update_snapshots: true` after
  every staging sync to record, and every later run compares. With no cached baselines the
  `@visual` slice is skipped (a `@visual` grep fails asking for `update_snapshots`).
- **Heals.** A green run whose `.lokinator-cache.json` changed becomes a PR (`lokinator fix
  --commit`, woolverine >= 2.0.0) against the active maintenance branch, else the default branch.

<a id="blank-customer"></a>
**[MUST] blank-customer — the suite assumes the shopper account is EMPTY and creates the state it
needs.** `e2e-customer` is recreated on every run: no orders, no saved addresses, no payment
methods, no subscriptions. A spec that expects "the customer's last order" or "the saved card"
finds nothing; a flow that needs one places it first (`chainState` carries it to the tests that
follow). The local `.env` user is whatever the staging has — never write a spec that only passes
because of what it accumulated.

<a id="no-production"></a>
**[STRICT] no-production — no run against production until the suite carries a read-only slice.**
The runner refuses production without `allow_production` + `grep`, and ServiceApp never sends
`allow_production`. Before a production slice exists: a `@readonly` tag on tests that place no
order, register nothing and change no setting, an audited list of them in the README, and the
runner review's sign-off. There is no back door: a `base_url` on any host other than the site's
own home counts as production and is refused the same way.

---

## Live triage

The user runs; you read. Read the trace in this order: `error-context.md` (the ARIA snapshot shows
the real page at failure — a login form, a 404, "Invalid order.", production instead of staging),
then the network doc requests (did the navigation you assume actually happen? a decoy link that
`preventDefault`s "clicks" fine and goes nowhere), then `frame-snapshots`.

Then match the symptom; each one is a rule above, not a new fact:

| Symptom | It is |
|---|---|
| A heal error without `\| AI suggested:` | the AI tier never answered (key/model), not the page — [lokinator-rules](#lokinator-rules) |
| A regex `hasText` that "never matches" a row | whitespace; anchor on the leaf cell — [lokinator-rules](#lokinator-rules) |
| Uppercase or glued text in a comparison | `textContent` vs `innerText` — [lokinator-rules](#lokinator-rules) |
| Selector drift | heal it, then fix the primary in code; keep the cache entry — [lokinator-rules](#lokinator-rules) |
| A recurring "Subtotal" overwrote the first-payment one | the section readers — [subscriptions-recurring](#subscriptions-recurring) |
| The gateway radio flips back after selection | Fastlane re-arm — [gateway-select](#gateway-select) |
| `ERR_ABORTED` on a `goto` right after a click | the click's navigation was still in flight — [budgets](#budgets) |
| 240s test death with no single slow step | budget burn; profile the trace — [budgets](#budgets) |
| A `goto` that times out with NO document request | a native dialog was raised and Playwright dismissed it — [admin](#admin). It reads exactly like host latency, and raising `navigationTimeout` does not fix it (harmony burned two CA runs at 120s) |
| A refund that "did nothing" | the native confirm or a gateway alert; read the thrown message — [refund-asserts](#refund-asserts) |
| "There are some issues with the items in your basket" | a stock hold from an earlier run — [stock-hold](#stock-hold) |
| An order mail that never arrives | the order carries a non-trap email; fix the sandbox account's address, not the assertion — [gateways](#gateways) |

**Known site issues are not test bugs** — staging key mismatches (Stripe "No such charge"), a
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

<a id="verify-the-mechanism"></a>
**[MUST] verify-the-mechanism — a plausible cause you did not check is a rule you will write
wrong.** A purchase found a product in the cart that it had not added, and the obvious story — a
previous test's leftovers — got a fix, a code comment, a README paragraph and a framework release
before anyone checked it. woolverine's page fixtures are TEST-scoped: every test opens its own
context and it is torn down afterwards, so a cart cannot survive into the next test (proved
directly: a test that leaves a line behind is followed by one that opens an empty cart). The real
cause was in the same test — its add-to-cart fell through to a related product's button. The tell
was there and got ignored: the "fix" did not fix it. When a fix does not change the symptom, stop
and find the mechanism instead of adding a second fix.

<a id="captcha-policy"></a>
**[MUST] captcha-policy — read the site key before deciding a form is testable.** With Google's
public TEST pair (`6LeIxAcT…`) the widget validates anything and the form submits for real; with a
production key, do NOT try — assert the form's contract instead (every field still collected, the
guard still present, an empty submit still refused) and say in the handoff that the submission is
not automatable. `readRecaptchaSiteKey` answers this in one call. A suite that starts failing at a
checkbox is telling you the key changed, not that the test is flaky.

---

## Definition of done

**Per place-order / subscription / membership test:**
- [ ] The [surface matrix](#surface-matrix) is filled in, with the MERCHANT's cells named — admin
      totals rows, admin line item, both address blocks — or each empty cell ledgered.
- [ ] Product name + line total, every totals row, full address, payment method on all four
      surfaces; cart + checkout rows asserted individually; tax/shipping warned when missing or `$0`.
- [ ] Every assertion re-read against [False passes](#false-passes): does it observe something the
      page did NOT already say, from a session it proved, after a state it did not itself grant?
- [ ] Every GI-parent assertion has a home or a ledgered reason (audit TWICE — silent coverage loss
  hides in bare reads with no `expect()`: `grep -nE "await (resilientText|readTotals|read\w+)\(" specs helpers | grep -v expect`).
- [ ] ONE test drives shopper + admin + email; serial links only for mutations. Email OPENED in `emailPage`.
- [ ] Subscriptions: first + recurring on every surface. Memberships: plan + status + granted access.
- [ ] Step logs cover the journey.

**Per suite:**
- [ ] A `@visual` slice exists (standalone or woven) and `npm run baseline` recorded it into
  `specs/visual-baselines/` on the machine that compares — gitignored, so a fresh clone has none and
  an empty folder AFTER a run means the slice never ran
  ([visual-baselines-not-committed](#visual-baselines-not-committed)). Any write side effect a tagged
  test carries is named in the spec header and the README.
- [ ] `@plugin` tags everywhere; no `expect()` in specs but `toHaveScreenshot`; every `expect` has a message.
- [ ] No `goto` to cart/checkout; no raw locator actions outside lokinator wrappers (allowed: waits,
  `setInputFiles`, `dispatchEvent` for 0-height triggers, popup pages).
- [ ] No helper that duplicates a woolverine export; no shims. Every site-side helper has its
  "why it stays" line, or was deleted in the slimming pass.
- [ ] Every deliberate omission, known site issue and NOT-live-run slice is in the ledger — the
  last with the exact command to run it.

**Per repo:**
- [ ] `npx tsc --noEmit` clean · `npx woolverine-lint specs` clean · `npx playwright test --list`
  count matches the triage table — all from `e2e/`.
- [ ] `package.json` takes `@saucal/woolverine` as a semver range and the lockfile resolves it from
  `npm.pkg.github.com` — a `github:` URL anywhere in the lockfile means the migration is half done.
- [ ] `e2e/` package complete: `.nvmrc` (22), `.npmrc`, `.gitignore` (`node_modules/`, `.env`,
  `auth/`, `reports/`, `test-results/`, `specs/visual-baselines/`); no `test`/`build` script; the
  site's `.deployignore` has `/e2e/`; nothing of the suite at the repo root; a fresh `npm install`
  in `e2e/` on the `.nvmrc` Node succeeds with the token exported ([private-packages](#private-packages)).
- [ ] No `.github/workflows/playwright.yml`; the README shows the `maintenance.yml action=e2e`
  dispatch ([e2e-runner](#e2e-runner)). Env names are the runner's ([credentials-env](#credentials-env)).
- [ ] Every spec passes against a blank `e2e-customer` ([blank-customer](#blank-customer)).
- [ ] `.lokinator-cache.json` committed and anchored.

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
   missing / ledgered ([Definition of done](#definition-of-done)).
2. **`e2e/README.md`** — two ways to run it, both copy-pasteable. **Through GitHub** first: the
   exact `gh workflow run maintenance.yml --ref <branch> -f action=e2e -f payload='…'` lines for
   a smoke run, a full run and a baseline record, what ServiceApp sends on its own, where the
   report artifact and the heals PR land ([e2e-runner](#e2e-runner)). Then **locally**: projects
   and how to select them, setup (`cd e2e`, `nvm use`, `npm install`, `.env` keys), run commands
   (per project / area / spec, `--ui`, `show-report`, `typecheck`, `lint`), layout, the site's
   load-bearing gotchas, known site issues. Practical and runnable.
3. **Branch** — the suite already lives in the site repo (the `e2e/` package) on the `playwright`
   (or agreed) branch. Commit; pushing and merging are the USER's call unless told otherwise.
4. **Framework changes** — released and pushed per [release](#release); the site pinned to the tag.
5. **State left on staging** — list every real order / account / upload the migration created.
6. **Ledger** — GI assertions not kept (with reason), known site issues, slices not live-run.
