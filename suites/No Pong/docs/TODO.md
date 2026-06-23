# No Pong AU suite — open TODOs

Tracking the loose ends after the AU reference build (29 tests / 7 specs). Live
run + live-site triage are the user's to drive.

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

## Follow-up (separate plan)

- [ ] **CA/US replication** — fill `regionConfig.ca` / `.us` (billing, slugs,
  currency, tax/shipping from GI CA/US suites), copy `au/` specs swapping the
  `region`. No wholesale / no manage for CA/US (not in the GI set).
