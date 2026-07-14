# Vesica Institute — Playwright E2E

End-to-end tests for the Vesica Institute WooCommerce site, migrated from the Ghost
Inspector suite to a config-driven Playwright project. DOM-first (no WC REST), driven
against the live Kinsta staging site.

> Pur Crystal is a **separate** suite (its own branch); this project covers the Vesica
> brand only.

## Requirements

- Node 20+ (CI pins 24)
- A `.env` (copy `.env.example`) — see [Environment](#environment)

## Setup

```bash
npm install
npm run setup:browsers      # playwright install chromium
cp .env.example .env        # then fill in the values
```

## Environment (`.env`)

| Key | What |
|---|---|
| `BASE_URL` | Vesica site base URL (trailing slash) — e.g. `https://stg-vesica-staging.kinsta.cloud/` |
| `WP_ADMIN_USER` / `ADMIN_PASS` | WP admin login (lazy per-host auth for the admin/email contexts) |
| `PASSWORD` / `PASSWORD2` | Shopper passwords for the account (register / forgot-password) flows |
| `PAY_PAL_USER` / `PAY_PAL_PASS` | PayPal **sandbox** buyer creds (PPCP checkout) |
| `ANTHROPIC_API_KEY` | Optional — enables the Stagehand AI locator-fallback tier |

Generated shopper emails use `@playgrounds.saucal.io` so the SAU/CAL email-redirect
plugin traps them (assertions read them via the Playgrounds Mailpit API). The site
sends through an ESP that rewrites links as `track.smtpsendemail.com` redirects.

## Run

```bash
npm test                              # everything (single Playwright project: "vesica")
npm run test:orders                   # order + account chain (CC, PayPal, refund, register, forgot)
npm run test:basic                    # guest nav + visual + contact form
npx playwright test specs/orders/vesica-orders.spec.ts --project=vesica
npx playwright test -g "VES-PO-02"    # a single test by title
npx playwright test --ui              # interactive runner
npx playwright show-report reports    # last HTML report
npm run typecheck                     # tsc --noEmit
npm run lint:plugin-tags              # every describe declares @plugin tags
```

Visual baselines are per-project (`*-vesica-darwin.png`). Seed / refresh them with:

```bash
npx playwright test specs/basic --project=vesica --update-snapshots
```

## Layout

```
specs/
  orders/vesica-orders.spec.ts    # serial chain: CC membership → backend/email → PayPal → refund → refund email
  orders/vesica-account.spec.ts   # register (passwordless set-password) + forgot-password
  basic/vesica-nav.spec.ts        # data-driven guest nav + visual (incl course dropdown + product PDP)
  basic/vesica-contact.spec.ts    # contact-form submit
helpers/
  vesica.ts        # site DOM: cart/checkout, Auth.Net + PayPal PPCP, order-received capture, admin refund, chain auth
  flows.ts         # runOrderFlow + account flows (return captured results; no expect())
  assertions.ts    # ALL expect() — capture-once parity across thank-you / My Account / admin / email
  resilient.ts     # tiered Playwright → Stagehand locator wrapper
  playgrounds-email.ts · order-notes.ts
fixtures/index.ts  # shopper (eager) + admin/email (lazy) contexts, video/trace, Stagehand bridge
types/test-config.ts
admin-login.ts     # lazy per-host admin auth → auth/admin-vesica.json
```

Config → flow → `assert*`; specs hold no inline `expect()` (only `toHaveScreenshot` in the visual spec).

## Site gotchas (load-bearing)

- **Kinsta + Cloudflare never fire `load`** on wp-admin / redirect chains — navigate with `waitUntil: 'domcontentloaded'`, then assert a positive signal.
- **Auth.Net (AIM emulation) TEST MODE prefills the card** — placing a CC order = check `#terms` + click `#place_order`, no card entry.
- **PayPal PPCP** is a cross-origin Smart Button → sandbox popup (starts `about:blank`); driven by a resilient login loop, submit is `#one-time-cta`.
- **Two brands' shape**: the first ALL-PRODUCTS item is a **membership** (Completed, no shipping); physical products (biogeometry category) carry shipping + tax.
- **Tax** via WC AvaTax — address-dependent (`BILLING` = Safford AZ, taxable). Never hardcode amounts; totals derive from the order.
- **Legacy `post.php`** admin order editor (not HPOS). Auth.Net refunds are manual; PayPal supports the gateway API refund.
- **Account is passwordless** — checkout auto-creates + auto-logs-in the buyer; the "set your new password" email link (ESP-wrapped) is followed to set a password. The order chain persists that logged-in session to `auth/chain-vesica.json` so the PayPal (logged-user) test runs standalone.
- **Course pages** are reached through the Courses header dropdown (real interaction).

See `docs/site-exploration.md` for the full live-explored selector inventory.
