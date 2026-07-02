# No Pong AU suite — open TODOs

Tracking the loose ends after the AU reference build (29 tests / 7 specs). Live
run + live-site triage are the user's to drive.

## AU GI parity gaps (missed in the basic suite)

From `AU - Basic WooCommerce Test`. Most tests map cleanly to existing specs;
these two did not — both now closed:

- [x] **GI 10 — Subscription test - Cart Page** (testId `6718e94494fa0c2a9c5affaf`).
  Added as `specs/au/basic/cart.spec.ts` (NP-AU-CART-01): add a subscription
  product → cart → set qty=2 → assert the **recurring** total recomputes to unit
  price × 2 (the recurring total excludes the one-off sign-up fee, so it's the
  clean invariant). Assertion = `assertSubscriptionCartTotal` in assertions.ts.
  Picks the first sub product rather than hardcoding `1270`. Skipped GI's full
  sub-flow/shipping-calc/order-placement — that's the subscription specs' job.

- [x] **GI 19 — Subscription popup is a MOBILE test** (testId
  `646d4a99e71b46cb75cb79b1`). Rewrote `visual.spec.ts` "subscription popup" into
  "mobile add-to-cart popup". Runs on a new **`mobileShopperPage`** fixture
  (Playwright `devices['iPhone X']` = 375×812 + mobile UA + scale 3 + touch,
  baked into the context at creation, not `setViewportSize` after load — the
  popup is breakpoint/touch-gated) and asserts
  `.nopong-product-popup-modal` is visible for **both** a subscription product
  (Monthly Club) and a simple product (Shop grid). NB the GI's two asserts were
  viewport-conditional (mobile→visible / desktop→not-visible), NOT open-then-close
  as an earlier ledger note guessed.

## Blockers / data drift

- [x] **Limits spec (NP-AU-LIM-01/02)** — fixed; both run and pass live.

## Live-run validation (user runs, not Claude)

- [ ] **Full AU run** never executed live: `npx playwright test --project=au`
  (29 tests). Expect selector drift on the live VIP site, especially the
  subscription / wholesale / refund paths (built from GI JSON + generated
  helpers, not all live-explored).
- [ ] **forgotPassword reset link is a single-use SendGrid tracker**
  (`url7488.nopong.com.au/ls/click?...`). `findEmail` + link-regex are verified
  working; if the flow fails *after* findEmail at `page.goto(link)`, the tracker
  is the cause (already-clicked / expired), not the email lookup. Harden if seen.

## Confirm-then-simplify

- [ ] **Drop redundant `?saucal-skip-captcha=1`** on the subscription checkout
  (`helpers/flows.ts` `SUBSCRIPTION_CHECKOUT_PATH`) once a live run confirms the
  shopper-context `?sc_bypass=1` priming covers captcha site-wide. (TODO also
  inline in flows.ts.)
- [ ] **Watch Wordfence `wfls-email-verification`** on the register form — a
  hidden field today, harmless, but if registration starts demanding email
  verification it'll break `registerNewUser`.

## Follow-up — CA/US replication (separate plan)

AU is at full GI parity (+ extras). CA and US are **0% covered** — no `specs/ca/`
or `specs/us/` dirs exist. Mostly a region-swap of `au/`, but **not entirely**
(CA has a points test that AU doesn't). Per the GI source:

- [ ] **Config first** — fill `regionConfig.ca` / `.us` (billing, slugs, currency,
  tax/shipping from the GI CA/US suites) before copying any spec.

- [ ] **CA place-order** (GI `ca-place-order.spec.ts`, 10 tests) → `specs/ca/orders/`:
  - 01–03 new user (place/email/backend), 05–06 refund + refund email,
    07–09 logged user (place/email/backend) — pure swap of AU `PO-01..03`.
  - [ ] **10 - Minimum redeem points** — loyalty/points redemption. **NOT in AU**,
    so not a region-swap — needs its own spec + points/coupon setup. Confirm the
    points plugin (likely a WooCommerce Points & Rewards variant) on the live CA flow.
  - Note: GI CA has no `04` (refund step numbering skips it) — GI's own gap.

- [ ] **CA subscription** (GI `ca-subscription-test.spec.ts`, 4 tests) →
  `specs/ca/subscriptions/` — swap of AU `SUB-01..04` (place/backend/email/renew).

- [ ] **US place-order** (GI `us-place-order.spec.ts`, 5 tests) → `specs/us/orders/`:
  - 01 new user, 02 email, 03 backend, 04 refund, 05 refund email — swap of AU
    `PO-01..02`. **No logged-user, no wholesale, no subscription** for US (not in GI).

- [ ] No wholesale / no manage for CA or US (absent from the GI set).
