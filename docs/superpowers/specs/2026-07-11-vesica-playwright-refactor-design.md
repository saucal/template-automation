# Vesica Institute — GI → Playwright Refactor Design

**Date:** 2026-07-11
**Branch:** `feat/vesica-playwright-refactor` (worktree `.worktrees/vesica`)
**Project dir:** `suites/Vesica Institute/` (self-contained Playwright project, PLS pattern)
**References:** PLS (in-`suites/` layout, DOM-first, lazy auth, refund), No Pong (parity matrix, PayPal PPCP, resilient+Stagehand, brand-as-project), repurposedMaterials (nav+visual merge, card label).
**Canonical rules:** `prompts/refactor-wc-automation.prompt.md` + `docs/{migration-playbook,maintenance-cycle,locator-fallback-strategy}.md`.

## Source of truth
GI export under `suites/Vesica Institute/` — 2 brands × {Guest, User}. Flattened generated specs at `suites/Vesica Institute/generated/` (read-only reference; regenerate with `node scripts/migrate-gi.js --project "Vesica Institute"`). GI parity is mandatory — capture-once, assert every surface, never weaken.

| Sub-suite | Tests | Shape |
|---|---|---|
| Vesica – Guest | 14 | home/about/courses(×5)/articles/shop/members/contact/product/cart/checkout — nav+visual |
| Vesica – User | 8 | CC new-user(+backend), PayPal logged-user(+backend+refund+refund-email), register, forgot-pw |
| Pur Crystal – Guest | 13 | home/crystals-minerals/category/mineral/articles/article/contact/submit-contact/simple+variable product/cart/checkout |
| Pur Crystal – User | 4 | CC new-user(+backend), refund-by-admin, refund-email |

## Stack (from GI + live-confirm)
- Two **separate hosts** (Kinsta): `stg-vesica-staging.kinsta.cloud`, `stg-purcrystal-staging.kinsta.cloud`.
- **CC = Authorize.Net** (AIM emulation), label "Credit Card". **No manual card entry** — test gateway prefills; flow waits `#place_order` enable then clicks. Watch checkout-in-iframe (`#wcp-checkout-iframe` / `?iframe_checkout=1`).
- **PayPal PPCP** (logged-user leg, Vesica only). Popup loop from No Pong.
- **DOM-first** — no WC REST / `wc-api.ts`.
- Email: `qa+gi_*@saucal.com` via SAU/CAL Playgrounds redirect plugin (confirm active per host; widen poll if ESP-relayed). PayPal sandbox user `qa+gi_sb-8eg0v132169@saucal.com`.
- Creds via `.env`: `ADMIN_PASS`, `PASSWORD`, `PASSWORD2`, `PAY_PAL_PASS`, `BASE_URL_VESICA`, `BASE_URL_PURCRYSTAL`, `REFUND_BRAND`.

## §1 Layout
```
suites/Vesica Institute/
  package.json · playwright.config.ts · tsconfig.json · .env(.example) · .gitignore
  admin-login.ts                 # lazy per-host auth (2 hosts → No Pong pattern, no global-setup)
  types/test-config.ts           # OrderConfig / OrderResult / BrandConfig / (no SuiteVars — DOM-first)
  fixtures/index.ts              # shopper(eager)/admin/email(lazy Proxy), video attach after close
  helpers/
    vesica.ts                    # site DOM: brandConfig map, addToCart, goToCart, proceedToCheckout,
                                 #   checkout-iframe, Auth.Net place-order, payPal PPCP loop,
                                 #   refund qty-fill (#refund_amount>0 poll), readOrderReceived
    flows.ts                     # runOrderFlow / runRefundFlow / runRegisterFlow / runForgotPasswordFlow
    assertions.ts                # ALL expect(): parity matrix, refund, email, nav
    resilient.ts                 # tiered Playwright→Stagehand wrapper
    playgrounds-email.ts         # @saucal.com inbox
    order-notes.ts               # scan-all + regex
  specs/
    basic/vesica-nav.spec.ts        # 14 guest pages → data-driven visual/nav
    basic/purcrystal-nav.spec.ts    # 13 guest pages → data-driven visual/nav
    orders/vesica-orders.spec.ts    # serial: CC new-user → backend → PayPal logged → refund → refund-email
    orders/vesica-account.spec.ts   # register + forgot-password
    orders/purcrystal-orders.spec.ts# serial: CC new-user → backend → refund-by-admin → refund-email
  generated/                     # read-only GI-flattened reference
```

## §2 Brand = Playwright project dimension
`BRANDS = ['vesica','purcrystal']` → typed `brandConfig` map (baseURL key, product/page slugs+IDs **per brand, never shared**, refund note/status). Two projects in `playwright.config.ts` via `baseUrlFor(brand)`. Own `auth/admin-<brand>.json`. Relative `goto` only. Refund on one brand per run (`REFUND_BRAND`). Visual baselines per-project (`*-vesica-darwin.png`).

## §3 Capture-once parity (per place-order — MANDATORY)
Capture totals(subtotal·shipping·tax·total) + billing(name/street/city/postcode) + payment-method + gateway-note **once** at order-received; assert SAME values on **thank-you · My Account · email · admin**. `expectMoney` skips legitimately-absent rows, never asserts `$0`/`NaN`. Payment label: `Credit Card` / `PayPal`; admin `Payment via <Method>` meta + gateway note (scan-all+regex). A cross-surface mismatch is a finding, not a test defect.

## §4 Gateway specifics
- **Auth.Net:** wait `#place_order` enable → click. `frameLocator('#wcp-checkout-iframe')` if checkout renders in iframe. Refund note regex + post-refund status (`Refunded` vs `Cancelled`/void) **config-driven** — confirm live.
- **PayPal PPCP:** No Pong popup loop — wait leave about:blank, resilient email/pass/Next loop, submit `#one-time-cta` (NOT the funding tile).
- **Passwordless account:** emailed "Click here to set your new password" → `#password_1/2` (shared helper with forgot-pw). Watch reCAPTCHA on standalone register.

## §5 Triage
Guest nav pages → 2 data-driven visual/nav specs (lazy-load scroll+decode before `toHaveScreenshot`, mask dynamic). Place-order chains → serial `describe.serial` + `chain-<brand>.json` + skip-guard. `submit-contact` → functional form check (not screenshot). Cross-project common-step dups (`common-steps-for-all-projects`, `avison`, `top-g-supplements` helpers) collapse into `vesica.ts`/`flows.ts` — don't 1:1 port. `expect()` only in `assertions.ts` (or named `assert*`); resilient wrapper on every action/assert; every `expect` carries a message; `@plugin` tags per describe.

## Sequence
Vesica brand first, end-to-end, prove green (user runs tests) → then Pur Crystal (reuse core + Auth.Net + refund; add variable-product + contact-form; no PayPal/register).

## Out of scope / defer
WC REST parity, subscriptions (none evident in GI — confirm on courses/members live), maintenance-cycle coverage tags automation. Live-explore confirms: Playgrounds email active, entity IDs per brand, Auth.Net refund-vs-void, checkout-iframe presence, courses = product vs membership.
