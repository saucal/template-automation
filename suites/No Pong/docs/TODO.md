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

## CA/US replication — done

CA and US suites built and replicated from AU (commit `c8253d2` onward). See
[[nopong_refactor_resume_state]] for the full build log. No points/redeem spec
was added (not confirmed live yet).

## Live-run findings (2026-07-08, `-develop` tier, 75 tests: 60 pass / 10 fail / 5 skip)

First live run of CA/US, and first run against the `develop` tier at all
(`preprod` is what was previously proven green). Failures triaged:

- [x] **AU subscription qty discount regression** — RESOLVED (root-caused,
  not a site regression). `au/basic/cart.spec.ts` NP-AU-CART-01 had a
  sequencing bug: it changed cart qty to 2, *then* submitted the shipping
  calculator. Confirmed via network-trace inspection (see
  [[playwright_html_report_parsing]]-style dig, but on the live network log
  this time) that the classic-cart "Calculate shipping" form POST does not
  carry cart-quantity fields, and submitting it after a qty change silently
  resets the line item back to qty=1 server-side (the calc_shipping response
  itself re-renders `quantity="1"`) — a real bug in No Pong's classic cart,
  reproducible on demand on both develop and preprod. **Fix**: reorder to set
  the shipping destination *before* the qty change in `cart.spec.ts` for all
  three regions (au/ca/us) + call `goToCart` explicitly first. Verified
  green-on-the-discount-check across au-preprod, au-develop, ca-preprod,
  us-preprod (4/4 runs, no more flakiness). `setCartQtyAndUpdate` also
  hardened with a reload-verify-retry loop as defense in depth.
- [ ] **NEW — "sign-up fee not × qty" KNOWN BUG guard now fires for AU too,
  consistently (not flaky)**. `assertSubscriptionCartTotal` (helpers/assertions.ts)
  already has two assertions explicitly commented as "FAIL BY DESIGN as a
  regression guard" for a known site bug (line-item sign-up-fee display not
  multiplied by qty) — previously believed CA/US-only. With the qty-reset bug
  above fixed, the cart spec now reaches this guard for **AU too**, and it
  fails identically to CA/US: real subtotal is always exactly $1.00 *higher*
  than the guard's expected value (e.g. `$18.92` vs `$17.92`), meaning the
  cart's actual Subtotal/Total math **does** correctly multiply the sign-up
  fee by qty — it's only the per-line "…and a $1.00 sign-up fee" text that's
  stale. This is the opposite of what the guard's own comment anticipated
  ("when the site fixes the per-line display... expected == actual") — here
  the *total* is right and the *line text* is wrong, so the guard can't
  self-heal by reading a corrected line value. Net effect: **NP-{AU,CA,US}-CART-01
  can never go green as currently written** — the guard is doing its job
  (documenting a real bug) but that means these three tests are permanently
  red until either the site fixes the per-line sign-up-fee text, or someone
  decides to soften the assertion (e.g. `test.fail()` / a skip with a bug-ticket
  link) so it stops blocking the suite. Needs a decision, not a test hack —
  confirmed on au-preprod, au-develop, ca-preprod, us-preprod (4/4, exact
  $1.00 delta every time).
- [ ] **NEW — CA/US `develop` tier serves the WooCommerce Blocks cart, not
  classic**. `ca-develop`/`us-develop` render the React "Products in cart" /
  "Add coupons" Blocks cart with shipping already resolved (no
  `#calc_shipping_country` select2 at all), while `ca-preprod`/`us-preprod`
  still serve the classic cart. `setCartShippingDestination` only supports the
  classic cart; it now fails fast with a clear "Blocks cart detected, not
  supported" error instead of a bare 10s selector timeout (was previously
  masquerading as the vague "develop-tier timeout cluster" below — this is at
  least one concrete explanation for part of that cluster, not generic
  slowness). Needs actual Blocks-cart support in the helper (or an
  isBlockCart-style branch, mirroring `isBlockCheckout`) before CA/US
  develop cart/limits-adjacent specs can run there.
- [ ] **AU wholesale catalogue still empty on develop** —
  `au/wholesale/wholesale.spec.ts` NP-AU-WS-01 fails (restriction notice
  instead of products) even after un-skip in `485c72b`. Catalogue needs
  populating on develop, or re-skip until it is.
- [ ] **AU PayPal order-confirmation email never arrived** — polled Mailpit
  the full 120s (`findEmail`, 40×3s), nothing found. Not a poll/timeout bug
  (test ran 226s total). Check Mailpit UI directly for that address before
  changing test code.
- [ ] **Develop-tier timeout cluster** — 5 failures, all plain
  navigation/element timeouts, all on `ca-develop`/`us-develop`, none on
  au-develop: CA PO-03 (`my-account/` goto), CA PayPal (`goToCart`), CA
  ACC-02 forgot-password (`#password_1`), CA store-locator (`retailers/`
  goto), US SUB-01 (order-received waitForURL). Re-run these in isolation to
  check for flakiness before assuming a real bug — smells like develop being
  slower/less stable than preprod rather than code issues. (The cart spec's
  own develop failure turned out to have a concrete cause — see the Blocks-cart
  item above — so it's worth checking whether any of these five are also
  Blocks-vs-classic UI differences rather than pure timing/flakiness.)

## Live-run findings (`reports/index.html`, timestamped 2026-07-08 18:26 — all `-preprod`, NOT develop)

**Discrepancy flag:** the report artifact actually on disk for this timestamp
contains only `au-preprod`/`ca-preprod`/`us-preprod` projects (75 tests: 48
pass / 14 fail / 13 skip) — no `-develop` project appears anywhere in it. That
doesn't match the "develop tier, 60/10/5" narrative in the section above,
which describes develop-specific failures (Blocks cart, develop timeout
cluster). Either a later run overwrote this report file, or that section was
written from a different source. Treat the develop-tier findings above as
unconfirmed against this artifact until re-checked.

Triaged from this report (see [[playwright_html_report_parsing]] for the
extraction method):

- [ ] **Bare `page.goto` timeouts (5), all preprod** — ca-preprod "home
  gallery slider autoplays" (goto `/ca/`), ca-preprod mobile popup —
  subscription product (goto `/ca/monthly-club/`), ca-preprod PayPal
  place-order (goto `./`), us-preprod ACC-01 register (goto
  `my-account/?sc_bypass=1`), us-preprod PO-01 Stripe (goto `./`). All five
  fail at the very first navigation before any test logic runs — smells like
  preprod being slow/unavailable at that moment rather than a selector issue.
  Re-run in isolation before treating as real bugs.
- [ ] **ca-preprod PO-01 (Stripe) — Stagehand AI-healing tier hit an
  Anthropic org rate limit** (10k input tokens/min), not a broken selector.
  Masks whether the underlying add-to-cart click would've worked without the
  AI fallback — inconclusive, re-run without exhausting the quota.
- [ ] **NEW — subscription thank-you-vs-checkout shipping mismatch (CA
  SUB-01, US SUB-01)**. `assertMoney`-style check "thank-you vs checkout
  shipping should match" fails because checkout shows no shipping line
  (`expected ""`) but the thank-you page shows a real charge (CA `$7.00`, US
  `$3.20`). Not the known sign-up-fee bug — a distinct discrepancy between
  what checkout quotes and what's actually charged. Needs investigation.
- [ ] **NEW — us-preprod "home gallery slider autoplays" — slider never
  initializes**. Page loads fine (unlike CA's goto-timeout version of the
  same test), but the slider locator (`.embla--initialized` / `#tns2-mw`)
  never appears within 20s. AU's equivalent test is fully green, so this
  looks US-region-specific rather than a shared regression.
- [ ] **NEW — us-preprod ACC-02 "forgot password" actually fails inside
  registration setup**, not the forgot-password flow itself: the
  "registration should land on the logged-in My Account dashboard" assertion
  in `registerNewUser` times out before the test gets to the forgot-password
  steps. Check whether this is the same preprod slowness as the goto-timeout
  cluster above, or a real registration regression.

## WooCommerce Blocks cart/checkout (2026-07-17)

Helpers now dispatch classic vs Blocks by live DOM check (`isBlocksCart` /
`isBlockCheckout`). AU, CA, and US develop all render Blocks now — the only per-region
difference is tax mode (AU inclusive / CA exclusive / US none), driven by
`regionConfig.taxInclusive`. Classic path stays only as a fallback for any tier still
serving the old cart/checkout, and is deleted once Blocks is fully rolled out everywhere.

**2026-07-17 live run — 4 Blocks bugs root-caused from trace DOM + fixed** (commit on branch):
- `setCartQtyAndUpdate` detected cart type off-cart (limits.spec) → now navigates to cart first.
- `fillCheckoutAddressBlocks` role/name fragility (AU Address = autocomplete combobox) →
  now uses stable ids (`#email`, `#shipping-*`; country/state `<select>`, rest `<input>`).
- `payStripeBlocks` expiry label mismatch (CA "Expiration (MM/YY)") → now Stripe iframe
  `input[name=number/expiry/cvc]`.
- `assertSubscriptionCartTotalBlocks` read skeleton loaders → now waits for load, reads via
  structural selectors + WCS recurring panel; recurring = first-payment total − sign-up fee.

**BLOCKER:** Stagehand AI tier is dead — org is **out of usage credits** ("credit balance
too low"). Not a code issue. Every resilient fallback → hard error, so Blocks primaries were
made id/structural-based (no AI needed). Restore credits before relying on the AI tier again.

**TODO(live-verify) — still unconfirmed:**
- `assertSubscriptionCartTotalBlocks`: recurring = total − fee assumes recurring shipping/tax
  equal the first payment; `.wc-block-cart-item__prices` discounted-unit selector.
- `setCartShippingDestinationBlocks` Change-address mini-form (not in any trace yet).
- `payStripeBlocks` saved-token radio markup (useSavedCard path).
- `payPaypalBlocks` radio + Smart Button render point (CA PO-05 timed out at 240s — revisit
  once Stagehand credits are back / PayPal popup flow re-explored).

**Not Blocks bugs (pre-existing / data):** AU WS-01 empty wholesale catalogue; US ACC-02
`#password_1` forgot-password (registration setup slowness).
