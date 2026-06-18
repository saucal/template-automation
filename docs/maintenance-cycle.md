# Maintenance-Cycle Runbook

The recurring operational flow for an **already-migrated** suite: run it against the
live site each maintenance window, triage what drifted, and keep the suite green
without masking real regressions. (Building a suite from a GI export is a one-time
job — see `migration-playbook.md`. This doc is the steady-state loop after that.)

Applies to maintenance WC sites (leggari, no-pong, repurposed). Payment-gateway
plugin suites (mastercard, bluesnap) run differently — don't force this loop on them.

## When to run

- **Each maintenance window** (the regular cadence the engagement defines).
- **Around any site change** — plugin/theme update, content edit, checkout config
  change. Run BEFORE the change to establish the current baseline, AFTER to catch
  what the change moved. Same machine/env both times so headed-vs-headless rendering
  never mismatches within a cycle.

## Run order

1. **Pre-flight.** `.env` present + correct (`BASE_URL`, `WP_ADMIN_USER`, `ADMIN_PASS`
   — confirm the key global-setup actually reads; wrong creds key is a classic silent
   failure). `ANTHROPIC_API_KEY` set only if you want the Stagehand drift-insurance
   tier live; the happy path is pure Playwright without it.
2. **Functional specs first** (orders / account / checkout / klaviyo). Run from CLI,
   not UI mode (editing a title mid-run orphans the test). Headless by default;
   `--headed` only to debug.
3. **Visual spec last** — see baseline discipline below.
4. **Triage failures** with the decision tree. Fix selectors/copy-regex in `helpers/*`
   and `assertions.ts`, NOT in individual specs. Re-run the narrowed area
   (`npx playwright test -g "…"`) until green, then a full pass.

## Visual baseline discipline

`specs/visual` compares `toHaveScreenshot` against committed `*-chromium-darwin.png`
baselines. Maintenance-cycle workflow:

- **Refresh BEFORE site changes:** `npx playwright test specs/visual --update-snapshots`
  establishes "current correct" in the run env.
- **Compare AFTER:** plain `npx playwright test specs/visual` flags what the change moved.
- A diff is **not automatically a bug** — run it through the tree below.
- Baselines are env-sensitive (headed vs headless render differently). If the run env
  changed since the last refresh, refresh first, then compare in the same env — the
  cycle self-corrects.
- Lazy-loaded images: the spec scrolls + waits for decode before each shot (rule 24).
  If a visual diff is only below-the-fold image noise, suspect a lazy-load/timing gap,
  not a layout regression.

## Drift triage — decision tree

When a check goes red, classify before "fixing":

1. **Copy reword** — error/label text changed, meaning didn't ("Country" →
   "Country / Region"). NOT a bug. Assert on field-token + intent regex, never exact
   copy (rule 26). Update the regex, move on.
2. **Selector drift** — element moved/renamed, behavior intact. The resilient wrapper
   (rule 23) may have already healed it via the Stagehand tier — check the report for
   the `[resilient] locators failed → using Stagehand` warning. That warning means
   **fix the primary selector** (don't leave the suite leaning on AI). Update the
   `primary`/`alt` locator in the helper.
3. **Layout change (visual)** — intentional design/content change → re-baseline
   (`--update-snapshots`) and note it. Unintended shift → real bug, report it.
4. **Real regression** — flow broke, total/tax/shipping wrong, an expected element
   gone. This is the signal the suite exists for. Report it; do NOT loosen the
   assertion to make it pass.
5. **Expected-absence vs config regression** — tax or shipping row missing OR `$0`.
   Maintenance suites **warn, don't hard-fail** here (rule 22): could be legitimate
   (tax-exempt region, free-shipping zone) or a real config regression (zone deleted,
   rate zeroed). Surface the warning; a human decides per cycle.

Rule of thumb: **loosen for wording/format drift, hold firm for value/flow/structure.**
If you're editing an assertion to make a failure disappear, be certain you're in
case 1/3, not silencing case 4.

## Plugin coverage tags (`@plugin`)

Every `test.describe` declares which plugins it exercises via a native Playwright tag:
`test.describe('…', { tag: ['@plugin:woocommerce'] }, () => { … })`. Slugs are the WP
plugin-folder slugs ServiceApp reports in `plugin-diff.json` — they MUST match, or the
maintenance `coverage-check` step can't map an updated plugin to its tests.

- `npm run lint:plugin-tags` — fails CI if any spec has no `@plugin` tag.
- `npm run coverage:manifest` — regenerates `coverage-manifest.json` (slug → spec paths).
- `npm run coverage:gaps -- plugin-diff.json coverage-manifest.json` — writes `gap-list.json`
  (updated plugins with no covering spec). The maintenance cycle routes gaps to the parallel
  generate-tests workflow; the run never blocks on a gap.

Filter a maintenance run to only the updated plugins' specs:
`npx playwright test --grep "@plugin:woocommerce|@plugin:kadence"`.

## Where Stagehand fits

Last resort only. Pure Playwright is the driver every cycle (fast, free,
deterministic). Stagehand is drift insurance: it keeps a cycle green when a selector
breaks, while the warning tells you to repair the selector before next cycle. A
cycle that leans on Stagehand for many steps is a cycle of deferred maintenance —
clear the warnings.

## Failure artifacts

On failure each context attaches its own named full-page screenshot
(`shopperPage.png`, `adminPage.png`, …) + trace + video. The built-in generic
`screenshot.png` is disabled on purpose (rule 25) so there's no duplicate — if you
see one reappear, the config `screenshot` key drifted back on.
