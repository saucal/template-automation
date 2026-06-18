# Ghost Inspector Full-Org Extraction — Design

**Date:** 2026-06-18
**Status:** Approved (design phase)
**Component:** `scripts/ghostinspector-extract-all.js` (new, standalone)

## Problem

The current `scripts/ghostinspector-sync.js` extracts only the single folder named by
`GHOST_INSPECTOR_FOLDER_ID`, plus a manual list of extra test IDs. There is no way to pull an
entire Ghost Inspector organization — every folder, every suite, every test — in one pass.

We want a full-org extraction whose on-disk output is directly consumable by `migrate-gi.js`
(the GI → Playwright migration tool) with **no separate annotation step**.

## Goals

- Walk the **whole organization**: every folder, every suite, every test definition.
- Output layout **nested by folder**, compatible with `migrate-gi.js`'s recursive `loadDir`.
- Each test JSON carries `_gi { testId, suiteId, suiteName }` baked in at extraction time —
  eliminating the `ghostinspector-test-index.js --annotate-local` pass for this flow.
- New **standalone** script. Leave `ghostinspector-sync.js` untouched (forked repos depend on
  its current single-folder behavior).

## Non-Goals

- Run history / execution results / stored screenshots / videos. Test **definitions** only.
- Per-test export calls (`/tests/{id}/export/json/`). Bulk suite ZIP export covers everything.
- Changes to `migrate-gi.js`. Output must match what it already consumes.

## Inputs (env)

| Var | Required | Notes |
|-----|----------|-------|
| `GHOST_INSPECTOR_API_KEY` | yes | aborts if missing |
| `GHOST_INSPECTOR_ORG_ID` | no | Org filter. Unset → extract the whole account (= whole org for single-org accounts). Set it to scope extraction to one org when the account spans several; a multi-org account with no filter logs a warning and extracts all. |

CLI: `--suites <path>` (default `./suites`) to override output dir; `--keep` to skip the fresh-wipe.

## API endpoints

> **Note:** GI folders/suites listing is **account-scoped**, not org-scoped (the
> `/organizations/{orgId}/folders|suites/` paths return 404). Org filtering is done
> client-side via each object's `organization` field — an id string on folders, an
> `{ _id, name }` object on suites.

| Purpose | Endpoint |
|---------|----------|
| List folders (account) | `GET /folders/?apiKey=` |
| List suites (account) | `GET /suites/?apiKey=` |
| Suite detail (name, variables, startUrl, viewport) | `GET /suites/{suiteId}/?apiKey=` |
| Bulk test export (ZIP) | `GET /suites/{suiteId}/export/json/?apiKey=` |
| Tests list (id + name) | `GET /suites/{suiteId}/tests/?apiKey=` |
| Org variables | `GET /organizations/{orgId}/?apiKey=` |

All overridable via existing `*_URL_TEMPLATE` env-var convention used in `ghostinspector-sync.js`.

## Flow

1. **Read optional org filter** from `GHOST_INSPECTOR_ORG_ID` (unset = whole account).
2. `GET /folders/` → build `{ folderId: folderName }`, filtered to the org if set.
3. `GET /suites/` → all account suites; filter to the org if set (each carries a `folder` id, or none).
4. **Fresh wipe**: remove + recreate `suites/` (unless `--keep`), matching current sync behavior.
5. **Per suite:**
   - Compute dir: `suites/<sanitized-folder | _no-folder>/<sanitized-suite>/`.
   - `GET /suites/{id}/export/json/` → ZIP → unzip into the suite dir (all tests at once).
   - `GET /suites/{id}/tests/` → build `{ testName: testId }` map for the suite.
   - For each unzipped test JSON: look up its `name` in the map → inject
     `_gi = { testId, suiteId, suiteName }`; prettify (2-space JSON).
     - On **no match** (name not in tests list): log a warning, leave file without `_gi`
       (`migrate-gi.js` will skip it). Do **not** invent an id.
   - `GET /suites/{id}/` → write `suite.json` (pretty).
6. `GET /organizations/{orgId}/` → write `suites/_organization.json` as `{ variables }`.

Per-suite cost: **3 API calls** (ZIP + tests-list + detail) regardless of test count.

## Output layout

```
suites/
  _organization.json                 # { variables: [...] }
  <folder-name>/
    <suite-name>/
      suite.json                      # GI suite detail (pretty)
      <test-name>.json                # test JSON + injected _gi
  _no-folder/
    <suite-name>/
      suite.json
      <test-name>.json
```

`migrate-gi.js` recurses this tree, keys suites by `suite.name`, groups tests by `_gi.suiteName`.

## Reused helpers (lift verbatim from `ghostinspector-sync.js`)

- `sanitizeFolderName(name)` — folder/suite dir names.
- test-name sanitize: `name.replace(/[^a-zA-Z0-9_\-\s]/g, '_')`.
- `fetchJson(url)`.
- ZIP handling via `curl` + `unzip` + prettify loop.

## Resilience

- **Per-suite** try/catch: a failing suite logs + continues; does not abort the run.
- **Per-test** annotation try/catch: a malformed test JSON logs + continues.
- **Throttle**: small delay (~150 ms) between API calls.
- **Retry-on-429**: bounded retries (e.g. 3) with backoff in `fetchJson`.
- Final summary: suites processed, tests annotated, unmatched-name warnings, suites failed.

## Known limitations (logged, not silently handled)

- **Duplicate suite names across folders**: disk nesting prevents file collisions, but
  `migrate-gi.js` keys by suite *name* and will merge them. Log a warning when a duplicate
  suite name is seen during extraction.
- **Unmatched test name**: written without `_gi`, skipped by `migrate-gi.js`. Logged.

## Testing

- Dry-run against a real org with `GHOST_INSPECTOR_API_KEY` + `GHOST_INSPECTOR_ORG_ID`;
  verify folder nesting, `suite.json` presence, `_gi` on every matched test, `_organization.json`.
- Run `node scripts/migrate-gi.js` against the produced `suites/` → confirm specs/helpers generate
  and the loaded-test count matches the org's test count (minus any logged unmatched).
- Verify `ghostinspector-sync.js` is byte-for-byte unchanged.
