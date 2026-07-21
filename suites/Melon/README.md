# Melon Optics — Playwright E2E suite

Config-driven Playwright migration of the Melon Optics Ghost Inspector suites.
Covers the **UK** (`/`, GBP) and **EU** (`/eu/`, Germany, EUR) storefronts:
home, mega-menu navigation, product, cart, checkout, account (register / login /
forgot-password), and order placement (with the wfocu upsell on UK).

Melon is a **path-based WordPress multisite on one host** — region is not a
separate site, it is reached at runtime by priming `?mocs=<country>` (which wins
over the persisted country cookie and redirects to the right blog). So region is
a **spec-folder + config** dimension (`specs/uk`, `specs/eu`), NOT a Playwright
project.

## Environments (Playwright projects)

Environment = one host = one Playwright **project**. Selected with `--project`:

| Project | Base URL env var | Notes |
|---|---|---|
| `maintenance` | `BASE_URL_MAINTENANCE` | primary build/run target |
| `staging` | `BASE_URL` (fallback) | secondary |

```bash
npx playwright test --project=maintenance      # run everything on maintenance
npx playwright test specs/uk --project=staging  # UK specs on staging
```

There is **no `globalSetup`** — admin auth is lazy per-environment
(`helpers/admin-login.ts`, logs into `wp-login.php` and reuses storage state).

## Setup

```bash
npm install
npm run setup:browsers        # playwright install chromium
cp .env.example .env          # then fill in the values below
```

### `.env`

```
BASE_URL_MAINTENANCE=https://…mystagingwebsite.com/   # WITH trailing slash (goto is relative)
BASE_URL=https://…mystagingwebsite.com/                # fallback = "staging"
WP_ADMIN_USER=…                                        # wp-admin login (lazy admin auth)
ADMIN_PASS=…
PASSWORD=…                                             # account-flow test password
PASSWORD2=…                                            # second password (forgot-password reset)
PAY_PAL_PASS=…                                         # (reserved)
```

Base URLs **must end in `/`** — every `goto()` is relative so the per-project
base URL wins.

## Running

```bash
npm test                                   # all specs, all projects
npm run test:uk         # or: npx playwright test specs/uk --project=maintenance
npm run test:eu         # or: npx playwright test specs/eu --project=maintenance
npx playwright test specs/uk/orders/place-order.spec.ts --project=maintenance
npx playwright test -g "accept the upsell" --project=maintenance
npm run test:ui                            # interactive runner
npm run test:report                        # open the HTML report (reports/)
npm run typecheck                          # tsc --noEmit
```

Runs **serially by default** (`workers` is low, `fullyParallel: false`); the
maintenance host is slow and rate-limits rapid country switches, so prefer
`--workers=1` for a clean signal on the full suite.

## Layout

```
specs/<region>/basic/    home, navigation, product, cart, checkout, account, forgot-password
specs/<region>/orders/   place-order (UK: upsell accept/reject; EU: no-upsell) + receipt email
helpers/
  melon.ts               selectors, REGIONS, region/country data, popup + nav + region priming, money()
  orders.ts              WFACP checkout fill, Stripe card, place-order, wfocu upsell, makeCustomer
  account.ts             register / login / logout / password-reset / openMyAccountOrder
  assertions.ts          ALL expect() lives here (or named assert* helpers) — specs stay assertion-free
  playgrounds-email.ts   Mailpit (mail.playgrounds.saucal.io) email fetch/open
  resilient.ts           resilientClick/Fill/Select/Text — Playwright tier + optional Stagehand AI fallback
  admin-login.ts         lazy per-env wp-admin auth
fixtures/index.ts        shopperPage / adminPage / emailPage contexts (+ optional Stagehand CDP)
types/test-config.ts     RegionConfig, CountrySwitch, Customer, order/cart/checkout types
```

`expect()` never appears in a spec — every assertion is an `assert*` helper
(default home `assertions.ts`; feature-cohesive ones may co-locate, e.g.
`openMyAccountOrder` in `account.ts`). Lint: `grep -rnE "expect\(" specs`
returns nothing (except `toHaveScreenshot` in a visual spec, if any).

## Load-bearing gotchas

- **`?mocs=<code>` replaces IP geolocation.** Prime each region with its own
  `?mocs=` (UK=GB, EU=DE). It sets the country cookie so later cart/checkout
  pages (reached without `mocs`) don't geo-redirect. No XFF/IP spoofing.
- **Runner IP geolocates wrong at checkout** — AR on the UK blog, **Austria on
  the EU blog**. `fillCheckout` selects the country explicitly (GB / DE).
- **Prices are locale-formatted.** `money()` is separator-aware: UK `£1,234.50`
  and EU `€1.234,56` / `€80,00` both parse. EU is **VAT-inclusive** but
  `total = subtotal + shipping` still holds (VAT sits inside the subtotal) — never
  compute tax.
- **Klaviyo popup fires once on the first page load** of a session (not per page);
  `closePopup` runs only on the initial landing gotos.
- **Composite product pages load slowly** (~10–15s: the configurator resolves the
  combo + per-component images) → `navigationTimeout: 45_000`; nav-triggering
  clicks use `noWaitAfter`.
- **WFACP checkout re-mounts the Stripe iframe** on `update_checkout` — call
  `settlePaymentSection` before `fillStripeCard`, which also verifies + re-fills
  if the card gets wiped.
- **Post-pay overlays**: `.blockUI.blockOverlay` (checkout processing),
  `.wfocuswal-container` (wfocu upsell, injected+removed per transition).
- **Order backend is unreachable** — the admin account has no wp-admin order caps
  and there are no WC REST keys, so address is asserted in the receipt email and
  the My Account order record instead.
- **Emails via Mailpit** (`mail.playgrounds.saucal.io`, public HTTP API); test
  emails use `@playgrounds.saucal.io`. UK/EU receipt subjects differ ("… order
  receipt from" vs "… **EU** order receipt from").
- **View-transition freeze**: the site's `@view-transition{navigation:auto}` can
  freeze click-driven form submits — the fixture injects 0s-animation CSS.
- Reach orders the customer way (My Account → Orders → View), not a direct
  `goto` to `/view-order/<id>/` (rule 30). `goto` is only for the initial region
  prime, direct composite-preset product loads, admin login, and Mailpit.
