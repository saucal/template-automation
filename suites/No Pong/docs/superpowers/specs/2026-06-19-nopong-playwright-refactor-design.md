# No Pong — Playwright refactor design

**Date:** 2026-06-19
**Source prompt:** `prompts/refactor-wc-automation.prompt.md`
**Reference implementation:** `/Users/christian/projects/leggari/tests` (completed GI→Playwright migration)
**Input (source of truth):** `suites/No Pong/generated/specs/*` + `generated/helpers/*` (lossy derivative) **and** the raw GI test JSON under `suites/No Pong/<suite>/*.json` (authoritative for selectors/flow).

Goal: refactor the GI-migrated No Pong project into a clean, config-driven Playwright suite mirroring the leggari architecture, nested by region.

---

## 1. Scope & decisions (locked)

| Decision | Value |
|---|---|
| Topology | **AU** = standalone host. **CA/US** = WP multisite, path segments `host/ca/`, `host/us/`. |
| Region model | Region is the **outermost** dimension — one Playwright project per region with its own `baseURL` + `testMatch` (rule 11). |
| Navigation | **Relative `goto` everywhere** (`'cart/'`, `'wp-admin/'`, `'./'`) — required for CA/US subsites (rule 12), harmless for AU. Never a leading `/`. |
| WC REST | **None for now** — DOM-first. No `helpers/wc-api.ts`. `SuiteVars` is minimal/DOM-read. Layer REST in later if creds appear. |
| Payment | `'stripe' | 'paypal'` union. Stripe = classic checkout, iframe `js.stripe.com`, card `4242…` (rule 15 frame chaining). PayPal = sandbox redirect flow (creds in `.env`). |
| Checkout style | **Classic** (confirmed in GI helper: `#billing_first_name`, select2 `#select2-billing_country-container`, `#payment_method_stripe`). Keep `isBlockCheckout(page)` branch for safety; assertions branch classic/blocks (rules 9, 21). |
| Resilient locators | **Full rule 23** incl. Stagehand. Port `helpers/resilient.ts` + Stagehand-over-CDP fixture verbatim from leggari. Stagehand active only when `ANTHROPIC_API_KEY` set; otherwise Playwright-only tiers. |
| Email | SAU/CAL Playgrounds Email Redirect plugin via `helpers/playgrounds-email.ts` (rule 14). Filter by site title for parallel safety. |
| Build order | **AU-first reference** — prove all AU patterns green, lock them, then replicate CA/US (mostly region-data swaps). |
| Plugins detected | WooCommerce, WC Subscriptions, WC Gateway Stripe, PayPal, a Points/Rewards plugin, a Wholesale plugin, a Store Locator plugin, an FAQ plugin. Tag every `describe` (rule 29); verify exact slugs at build time. |

---

## 2. Directory layout

```
suites/No Pong/
├── package.json            # +@woocommerce/e2e-utils-playwright, @browserbasehq/stagehand,
│                           #  playwright-core, zod, @babel/runtime, dotenv, dayjs
├── tsconfig.json  .env.example  .gitignore
├── playwright.config.ts    # 3 projects (au/ca/us), per-region baseURL, REFUND_PROJECT gate
├── global-setup.ts         # log in per host (AU host; CA/US parent host), save auth/admin.json
├── auth/                    # gitignored — admin.json (+ chain-nopong-*.json)
├── docs/superpowers/specs/  # this design + plan
├── types/
│   └── test-config.ts       # OrderConfig / OrderResult / SuiteVars / RegionConfig / SubscriptionConfig / WholesaleConfig
├── fixtures/
│   └── index.ts             # PORT from leggari — shopper/admin/email + Stagehand CDP bridge
├── helpers/
│   ├── nopong.ts            # site DOM: selectors, regionConfig map, Stripe+PayPal pay(),
│   │                        #  billing-by-region, addToCart variants, dismissPopups,
│   │                        #  waitForCheckoutReady, points helpers, warnIfNoTaxOrShipping
│   ├── resilient.ts         # PORT verbatim (rename comments) from leggari
│   ├── playgrounds-email.ts # PORT from leggari/template (rule 14)
│   ├── order-notes.ts       # PORT from template (rule 16)
│   ├── account.ts           # register + passwordless set-password (rule 28); assertMyAccount*
│   ├── flows.ts             # runOrderFlow / runSubscriptionFlow / runWholesaleFlow → Result
│   └── assertions.ts        # ALL expect(); classic/blocks + region branching
└── specs/
    ├── au/
    │   ├── basic/   visual.spec.ts · account.spec.ts · limits.spec.ts
    │   ├── orders/  place-order.spec.ts
    │   ├── subscriptions/  subscription.spec.ts · manage.spec.ts
    │   └── wholesale/  wholesale.spec.ts
    ├── ca/  basic/ · orders/ · subscriptions/        # no wholesale (not in GI set)
    └── us/  basic/ · orders/ · subscriptions/
```

`generated/` is kept for reference, NOT run (`testDir: './specs'`).

---

## 3. AU GI triage (don't 1:1 port — rule 17)

| GI source (suite / tests) | → Spec | Notes |
|---|---|---|
| Basic: 01 home, 02 slider, 05 shop, 12 FAQ, 13 in-the-news, 14 store-locator, 19 sub-popup | `au/basic/visual.spec.ts` | Data-driven `toHaveScreenshot` over a page list (rule 24 lazy-load + masks). Slider-autoplay / FAQ-accordion / popup get small functional checks where a screenshot can't capture behaviour. |
| Basic: 09 registration+login, 11 forgot-password | `au/basic/account.spec.ts` | Functional. Passwordless set-password via email link (rule 28); watch reCAPTCHA. |
| Basic: 06 cart, 07 checkout, 15 Tin Limit, 16 85g Limit | `au/basic/limits.spec.ts` | Quantity-cap enforcement = real asserts. Cart/checkout page structure folded into visual where it's screenshot-only. |
| Place Order — New User 01–05 + Logged User 06–08 + 09 Not Wholesale | `au/orders/place-order.spec.ts` | **`describe.serial`, 3 contexts.** `test 1` new-user: place → thank-you → my-account → admin backend → order email (one flow, parity asserts). `test 2` refund: reads order # from `auth/chain-nopong-au.json` (rule 3) → admin refund form fill (rule 27) → refund note + status → refund email. `test 3` logged-user: reuses the new-user account cookies (rule 28). `09 Not Wholesale` = assert wholesale pricing/menu absent for a normal user. |
| Subscription test 01–04 | `au/subscriptions/subscription.spec.ts` | Place subscription → admin backend → email → renew (admin-trigger renewal, assert renewal order). |
| Subscription Cancel/Reactivate/Change Schedule 21–24 | `au/subscriptions/manage.spec.ts` | Place sub → admin cancel/activate → reactivation verification → change-schedule. Serial chain on one subscription. |
| Wholesale 17 (register/login) + 18 (place order) | `au/wholesale/wholesale.spec.ts` | Wholesale registration/login → wholesale-priced order. AU-only. |

CA/US later: `basic/` (visual + account + limits) + `orders/place-order` + `subscriptions/subscription`. No wholesale, no sub-management (not in GI set). Differences vs AU are region-data only (currency, billing address, product slugs, tax/shipping expectations) → driven by `regionConfig`.

---

## 4. Data model (`types/test-config.ts`)

Replaces the GI `Record<string,string>` vars bag (rule 9). Mirrors leggari's three roles, plus region & subscription/wholesale configs.

- `Region = 'au' | 'ca' | 'us'`
- `PaymentMethod = 'stripe' | 'paypal'`
- `UserKind = 'guest' | 'new' | 'logged' | 'wholesale'`
- `OrderConfig` — `{ testId, title, region, product, user, payment, pdp, expectedStatus, refundedStatus?, refundNotePattern? }`
- `OrderResult extends CapturedPrices` — `{ orderNumber, email, paymentLabel, pointsEarned? }`
- `SubscriptionConfig` / `SubscriptionResult` — subscription product, billing period, renewal expectations, post-action status.
- `WholesaleConfig` — wholesale account creds + expected wholesale pricing markers.
- `RegionConfig` — `Record<Region, { currency, billing: BillingDetails, products: {simple,variable,subscription,wholesale}, expectTax, expectShipping }>` (rule 11). Lives in `helpers/nopong.ts`.
- `SuiteVars` — `{ title, blog? }` DOM-read in `beforeAll` (parallel-safe email filter; classic/blocks marker).

---

## 5. Layer responsibilities (unchanged from prompt §"Layer responsibilities")

- `fixtures/index.ts` — 3 contexts + Stagehand CDP; **port verbatim** from leggari.
- `helpers/nopong.ts` — all site DOM + `regionConfig` + `pay()` (Stripe iframe / PayPal redirect) + `addToCart` variants + `dismissPopups` + `waitForCheckoutReady` + points readers + `warnIfNoTaxOrShipping` (rule 22). No assertions.
- `helpers/flows.ts` — `runOrderFlow` / `runSubscriptionFlow` / `runWholesaleFlow`, return typed `*Result`. No `expect()`.
- `helpers/assertions.ts` — every `expect()` (default home). Branch on classic/blocks (rule 21) + region. Each `expect` carries a message (rule 19). Feature-cohesive `assert*` may co-locate (rule 6): `assertMyAccount*` in `account.ts`.
- `helpers/account.ts` — register + passwordless set-password (rule 28) + my-account assertions.
- `helpers/resilient.ts`, `playgrounds-email.ts`, `order-notes.ts` — port from leggari/template.
- Specs — thin: config → flow → `assert*`. Only raw `expect` allowed = `toHaveScreenshot` in `visual.spec.ts` (rule 6). Lint: `grep -rnE "expect\(" specs` returns only `toHaveScreenshot`.

All actions/assertions route through the resilient wrapper (rule 23) except navigation/waits, `setInputFiles`, and genuinely-custom JS.

---

## 6. playwright.config.ts — region projects

```
testDir: './specs'
trace/video: 'retain-on-failure'   screenshot: 'off'   (fixture owns named shots — rule 25)
workers: 2   fullyParallel: false   timeout: 240s   expect 15s
projects:
  au → { baseURL: BASE_URL_AU, testMatch: 'au/**' , (+ refund if REFUND_PROJECT==='au') }
  ca → { baseURL: BASE_URL_CA, testMatch: 'ca/**' }
  us → { baseURL: BASE_URL_US, testMatch: 'us/**' }
```
Refund/destructive specs gated to one region via `REFUND_PROJECT` env (rule 12) — don't replay a refund on every region.

`global-setup.ts` logs in on AU host and the CA/US parent host, saving `auth/admin.json`. Admin user must already exist on each CA/US subsite (rule 12).

---

## 7. Build sequence

1. **Scaffold** — `package.json`, `tsconfig`, `.env.example`, `.gitignore`, `playwright.config.ts` (3 projects), `global-setup.ts`, `types/test-config.ts`, `fixtures/index.ts`, `helpers/{resilient,playgrounds-email,order-notes}.ts` (ported), `helpers/nopong.ts` skeleton (`regionConfig`, selectors, `pay`, `dismissPopups`, `waitForCheckoutReady`). `tsc --noEmit` clean.
2. **AU basic** — `visual` + `account` + `limits`. Validates fixtures + resilient + Stagehand + email cheaply.
3. **AU orders** — `place-order.spec.ts` (the hard one: 3-context chain, Stripe iframe + PayPal, refund form, points, chain-state). Build `flows.runOrderFlow` + `assertions` here.
4. **AU subscriptions + wholesale** — `subscription`, `manage`, `wholesale`.
5. **Lock patterns → replicate CA/US** — basic + orders + subscription per region; differences are `regionConfig` data only.

Each stage: live-explore the real site (playwright-cli) + read the GI JSON before writing (prompt §"Before you start"); run green before moving on.

---

## 8. Out of scope (YAGNI)

- WC REST / `wc-api.ts` (DOM-first; revisit if creds appear).
- CA/US wholesale + subscription-management (not in the GI set).
- Blocks checkout primary path (site is classic; keep the branch but don't build block-only flows).
- New test cases not present in the GI export (prompt §"What NOT to do").
