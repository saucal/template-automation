# PLS — Playwright Test Suite

End-to-end Playwright suite for **Professional Learning Services**, refactored
from the Ghost Inspector export into a clean, config-driven suite (thin specs →
flows → assertions, no selectors in specs). Covers the storefront basics and the
full course-purchase lifecycle.

The site is WooCommerce on the **Kadence** theme, with checkout rendered as **WC
Blocks** wrapped in the custom **pls-core** 4-step wizard (Billing → Participants
→ Payment → Confirmation), paid via the **Stripe** Payment Element. Courses are
WooCommerce **subscriptions** (one subscription per participant/seat).

## Environments

The suite runs against **two staging sites**, each its own Playwright project:

| Project        | Site                                        |
| -------------- | ------------------------------------------- |
| `maintenance`  | `https://pls-maintenance.mystagingwebsite.com/` |
| `main`         | `https://pls.mystagingwebsite.com/`         |

Pick one with `--project=<name>`, or omit `--project` to run both.

## Prerequisites

- Node.js 20 or later
- A `.env` file (see below)

## Setup

```bash
npm install
npm run setup:browsers          # playwright install chromium
cp .env.example .env            # then fill in the values
```

### `.env`

```bash
# One base URL per environment (trailing slash required — all goto() are relative).
BASE_URL_MAINTENANCE=https://pls-maintenance.mystagingwebsite.com/
BASE_URL_MAIN=https://pls.mystagingwebsite.com/
BASE_URL=                       # fallback when a BASE_URL_<ENV> is unset

# WordPress admin (same account works on both sites). Lazy per-site login on
# first adminPage/emailPage use → auth/admin-<project>.json.
WP_ADMIN_USER=
ADMIN_PASS=

# Existing staging customer for the login / My Account spec.
STAGING_USER_EMAIL=
PASSWORD=                       # login is tried with PASSWORD then PASSWORD2
PASSWORD2=                      # (the password-reset flow leaves the account on PASSWORD2)

# Optional — Stagehand AI locator fallback (rule 23). Leave unset to run pure
# Playwright tiers (the primary path; AI is drift insurance only).
ANTHROPIC_API_KEY=
STAGEHAND_MODEL=anthropic/claude-sonnet-4-6

# Optional — override the Playgrounds Mailpit inbox host used for email checks.
MAILPIT_URL=
```

## Running

```bash
# One environment
npx playwright test --project=maintenance
npx playwright test --project=main

# Both environments
npx playwright test

# By feature area (add --project to scope to one site)
npm run test:basic              # storefront: account, cart, forms, translation, visual
npm run test:orders             # the place-order / refund / password-reset chain

# A single spec / test
npx playwright test specs/orders/place-order.spec.ts --project=maintenance
npx playwright test -g "guest order" --project=maintenance

# Interactive runner / report
npx playwright test --ui
npx playwright show-report reports

# Type-check only (no run)
npm run typecheck
```

## Structure

```
specs/
  basic/          account · course-cart · forms · translation · visual
  orders/         place-order.spec.ts (serial: order → refund → password reset)
helpers/
  pls.ts          all selectors + DOM interactions for the PLS site
  flows.ts        high-level order orchestration → capture objects
  assertions.ts   every expect() (specs stay assertion-free)
  playgrounds-email.ts   Mailpit lookup (email parity)
  order-notes.ts · resilient.ts   order-note matching · tiered locator fallback
fixtures/         shopper / admin / email contexts (admin+email are lazy)
types/            typed config model (+ e2e-utils .d.ts)
admin-login.ts    lazy per-site admin auth (auth/admin-<project>.json)
playwright.config.ts   one project per environment
docs/site-exploration.md   live-captured site shape + gotchas
```

`generated/` is the raw Ghost Inspector → TypeScript output, kept for reference
only — it is **not** run. The suite lives in `specs/`.

## Notes & gotchas

- **Billing address**: the checkout geo-defaults the country (to AR) and WC Blocks
  reverts programmatic changes on its debounced address sync. The helper sets the
  country first, verifies it against the Blocks store, and waits for full checkout
  hydration before filling — don't reorder the billing fill.
- **Intermittent "empty cart" at Place Order**: a platform-level session race in
  the pls-core wizard. `retries` in the config absorb it (the order places on
  ~most attempts); a failed attempt auto-retries.
- **Visual baselines** (`toHaveScreenshot`) are per-project and kept **local only**
  (git-ignored). Generate/refresh them per environment with:
  `npx playwright test specs/basic/visual.spec.ts --project=maintenance --update-snapshots`.
- **Emails** are read from Playgrounds **Mailpit** (`@playgrounds.saucal.io`
  recipients) — no ESP relay, near-instant.
- **Admin auth is lazy**: only the site you actually run logs in; the session is
  cached in `auth/admin-<project>.json` (git-ignored).
