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

## Scope

Maintenance WC sites (leggari, no-pong, repurposed) share this approach. Payment-
gateway plugin suites (mastercard, bluesnap) have a different architecture — don't
force this model onto them.
