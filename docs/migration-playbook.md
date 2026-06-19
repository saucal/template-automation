# GI → Playwright Migration Playbook

Hard-won lessons from migrating full WooCommerce maintenance suites (leggari, …)
from Ghost Inspector exports into resilient, config-driven Playwright. Read this
before starting a new project refactor — it turns multi-iteration debugging into
first-try wins.

## Process

1. **Live-explore before coding.** The GI export's selectors have drifted; the
   migrated TS is a lossy starting point, not truth. Do one `playwright-cli` pass
   over the real site to confirm the actual flow + selectors (e.g. checkout was a
   3-step WooFunnels Aero form, not the 2-section model the GI helper implied).
   One exploration pass saves dozens of blind test runs.
2. **Triage GI tests — don't 1:1 port.** Classify every GI test:
   - **nav-only / screenshot** → one data-driven visual-regression spec (not a test each)
   - **duplicate** of another flow → skip (e.g. cart/checkout asserts already covered by the order spec)
   - **genuinely new** → build properly (account flows, contractor onboarding, Klaviyo, negative validation)
   Resolve unresolved `execute` IDs by pulling `GHOST_INSPECTOR_EXTRA_TEST_IDS`,
   but expect some to be dead branches (other-project conditionals).
3. **typecheck (fast) → run (slow) loop.** Iterate on the *real* failure output;
   commit each green checkpoint; push small.

## Traps that bite repeatedly

4. **Real events, never eval.** `el.value = x; el.dispatchEvent(new Event('change'))`
   does NOT trigger WooCommerce `update_checkout`, variation selection, or composite
   validity — the page sits in a half-updated/error state with no shipping calc.
   Always use Playwright `selectOption` / `fill` / `check` (trusted events). This is
   the single biggest source of flake.
5. **Cart/checkout AJAX races.** `.blockUI`/`.blockOverlay` intercepts clicks and
   line items re-render after each change:
   - To remove cart items, **navigate the remove link's `href`** (`remove_item` +
     nonce) instead of clicking.
   - Before advancing a step, wait for a **positive signal** (the recalculated
     shipping/total landed in the summary), not just "overlay hidden" — the overlay
     may not have appeared yet.
6. **Money/text DOM quirks.** Assert tolerantly:
   - currency symbol lives in its own `<span>` → no contiguous `"$87.97"` in HTML/email
   - thousands commas (`$1,203.81`); strip `[\s,]` and compare numeric `toFixed(2)`
   - labels render double-spaced (`"Email  is a required field."`) → collapse `\s+`
   - sale/contractor pricing = `<del>list</del> <ins>discounted</ins>`; capture the
     right node (a plain `.price .amount` matches `<del>` first by DOM order)
   - discounts can apply as a **cart fee** — the line shows list price, totals reflect discount
   - select2 fields hide the native `<select>` and aren't always flagged invalid
   - **a "money" field may be a label, not money** — free local pickup renders the
     shipping method name (`"Pick-Up at Retail Location …"`), so `toAmount`→NaN and a
     `toBeCloseTo` crashes. Compare as money when numeric, else as normalized text.
   - **pricing plugins drop the `bdi`** — Tiered Pricing renders no `.woocommerce-Price-amount bdi`
     and no `.woocommerce-variation-price`. Match `.woocommerce-Price-amount.amount`
     directly; for variable products wait on the add-button losing `.disabled`, NOT on a
     variation-price node that never appears.
   - **`$0` / "price on request" products** pass a naive `<= max` picker and break price
     parity — require `p > 0`.

## Architecture that paid off

7. **Capture-once parity model.** Capture canonical values (product, prices,
   totals, payment label) ONCE at the source, then assert each downstream surface
   `== captured` — never hardcode literals. Survives price drift between maintenance
   cycles; one model covers cart→checkout→thank-you→my-account→admin→email.
8. **One test, three contexts.** Merge GI's split shopper/backend/email tests into
   a single atomic test with `shopperPage` (eager) + `adminPage`/`emailPage` (lazy).
9. **Resilient locator wrapper** (rule 23) — ARIA → text/CSS → Stagehand, observe-gated,
   AI last-resort + flagged. Drift insurance without slowing the pure-Playwright happy path.
10. **Email via Mailpit REST**, not in-page `ajax_object`: search by recipient on the
    catch domain (`@playgrounds.saucal.io`), subject-filter to disambiguate multiple
    emails, poll ~60s (order mail lags). **Unique per-run data** (a module-level
    `RUN_ID` in the email) to avoid "account already exists" / stale-state collisions.
    Mailpit search is **newest-first**: when two same-subject emails hit one inbox
    (order 1 + order 2 on a reused account), `messages[0]` is the latest — order your
    assertions so each resolves the right one.

## Fixture gotchas (manual contexts)

11. Creating contexts manually (needed for the 3-context + Stagehand-CDP model)
    bypasses Playwright's auto trace/screenshot/video — honor the config yourself:
    - allow-list valid `BrowserContext` options (don't spread all of `project.use`)
    - apply `actionTimeout`/`navigationTimeout` via `page.setDefault*Timeout`
    - capture trace/screenshot/video in fixture teardown per config mode
    - bridge `--headed` into both Stagehand (`localBrowserLaunchOptions.headless`)
      and any manual `chromium.launch`
    - don't depend on the built-in `browser` fixture if Stagehand owns the browser
      (it launches a second, unused one); close Stagehand's stray `about:blank`
    - silence the AI-SDK system-message warning (`AI_SDK_LOG_WARNINGS = false`)

## Refund / void / account parity

12. **`do-api-refund` no-ops at $0.** Clicking the gateway refund button does nothing
    unless the refund form is filled first: copy each line item's ordered qty →
    `input.refund_order_item_qty` (WC auto-fills line totals on `change`), and copy
    fee/shipping `.view` amounts → `tr.fee`/`tr.shipping … input.refund_line_total`/`refund_line_tax`.
    **Poll the computed amount > 0 before submitting** — else a silent $0 refund leaves
    no gateway note and the assertion fails on a missing note.
13. **Refund parity is gateway-specific — same GI step, different note + status.**
    Accept.Blue → `accept.blue Gateway v2 Refund …`, status **Refunded**. Authorize.Net
    VOIDS the same-day auth → `Authorize.Net Credit Card Void in the amount of … approved`,
    status **Cancelled**. Make the note regex + post-refund status config-driven, don't hardcode.
14. **"Logged user" = the SAME account, not admin.** GI reused the new-user account
    (set-password email flow) so order-1's saved address prefills checkout. Playwright
    equivalent without the email round-trip: in a `describe.serial` block, save the
    new-user's logged-in cookies (`context().storageState().cookies`) after order 1 and
    `addCookies` them in the logged-user test. Drive the order email/identity off the
    reused **account email** (e.g. `OrderConfig.accountEmail`), not a per-test address.
15. **Passwordless accounts + verify-email.** Registration (and checkout create-account)
    can be passwordless — the form is email-only ("a link to set a new password will be
    sent"). Register → fetch the "account has been created" email → follow the
    "set your new password" link → set `#password_1/#password_2` (this verifies the email
    and logs the user in). Same set-password page as forgot-password — share one helper.
    Watch for **reCAPTCHA** on the standalone register form (a raw submit may be blocked).
16. **GI is the source of truth — dump the test JSON, don't guess.** Every fix above
    came from reading the actual GI step list (refund qty-fill, `selectFirstAvailableVariation`,
    the set-password flow), not from inferring selectors/flow. Pair it with **live
    `playwright-cli` exploration** to confirm current DOM (it caught the no-`bdi` markup,
    the pickup-label-not-price, reCAPTCHA, real product prices).
17. **Silent failures to check first:** wrong credential env key (login used `PASSWORD`
    vs the working `ADMIN_PASS` — check what global-setup uses); and editing a spec title
    in Playwright **UI mode** mid-run orphans the test (0.0ms spinner) — run from CLI.

## Scope

Maintenance WC sites (leggari, no-pong, repurposed) share this approach. Payment-
gateway plugin suites (mastercard, bluesnap) have a different architecture — don't
force this model onto them.
