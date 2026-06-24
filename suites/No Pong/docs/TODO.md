# No Pong AU suite — open TODOs

Tracking the loose ends after the AU reference build (29 tests / 7 specs). Live
run + live-site triage are the user's to drive.

## AU GI parity gaps (missed in the basic suite)

From `AU - Basic WooCommerce Test`. Most tests map cleanly to existing specs;
these two do not:

- [ ] **GI 10 — Subscription test - Cart Page** (testId `6718e94494fa0c2a9c5affaf`).
  Not replicated. GI flow: add subscription product `?add-to-cart=1270` → cart →
  set **qty=2** on `input[aria-label="Product quantity"]` → toggle
  `.subscription-price > .subscription-details` → run sub-flow `6022b74a262f437a9af8d9a3`
  → refresh. None of our subscription specs (`SUB-*`, `SUBM-*`) do a cart-page
  quantity change on a subscription product. Add it (likely `specs/au/subscriptions/`).

- [ ] **GI 19 — Subscription popup verification is a MOBILE test** (testId
  `646d4a99e71b46cb75cb79b1`). GI ran at **viewport 375×812**; our
  `monthly-club "Join the Club" opens product popup` (`visual.spec.ts`) runs at the
  default desktop size. Two fixes:
  - [ ] Set `page.setViewportSize({ width: 375, height: 812 })` (mobile).
  - [ ] GI asserts the modal `assertElementVisible` **then** `assertElementNotVisible`
    (open *and* close). Ours only asserts open — add the close assertion.

## Blockers / data drift

- [ ] **Limits spec uses a pre-order product (BLOCKS NP-AU-LIM-02).**
  `specs/au/basic/limits.spec.ts` hardcodes `TIN_PRODUCT_ID = 616` and
  `SECOND_PRODUCT_ID = 1684403` (from GI 15/16). Product **616 is now a
  pre-order** — adding it then a second product errors with
  *"This product cannot be added to your cart because it already contains a
  pre-order, which must be purchased separately."* instead of the qty/weight cap.
  - Fix: find two **non-pre-order** tins — one that hits the per-item tin cap
    (LIM-01), and a pair that together trip the 85g combined-weight cap (LIM-02).
  - Other add-to-cart ids seen in the GI export to vet: `1270`, `704019`,
    `95853` (confirm none are pre-orders / bundles, confirm weights).
  - Also empty the cart at the start of each limit test for hygiene.
  - Couldn't explore live to pick IDs — site returned **503 / "Site Unavailable"**
    on 2026-06-23 (VIP flakiness; the storefront also showed an Australia Post
    API banner). Re-explore the shop when it's back up.

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
