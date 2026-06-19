# Per-project migration in `migrate-gi.js`

**Date:** 2026-06-19
**Status:** Approved — ready for implementation plan

## Problem

`suites/` now holds a **whole-org Ghost Inspector dump** (one top-level folder per
client/project: `MasterCard`, `No Pong`, `2M`, `BlueSnap Inc- - Server 1`, …).
`migrate-gi.js` currently walks the entire tree and emits one shared
`generated/{specs,helpers}` for the whole org. There is no way to migrate a single
project, and there is no per-project output.

We want to migrate **one project at a time** (`--project`) or **all projects**
(`--all`), with each project's output written **inside its own folder** so it can be
forked into a standalone automation repo later.

### Cross-folder reference constraint

Measured on the current dump: **6789** `execute` steps, of which **987 are
cross-folder** (e.g. `BlueSnap Inc- - Server 1 → BlueSnap Inc- - Common steps`,
many projects → `Template`). Strict per-folder filtering would break ~15% of
`execute` references. The design must resolve these.

## CLI

```
node scripts/migrate-gi.js --project "MasterCard"   # one top-level folder
node scripts/migrate-gi.js --all                     # every top-level folder
node scripts/migrate-gi.js                           # no flag → usage + list folders, exit
node scripts/migrate-gi.js --suites <path>           # still supported (default ./suites)
```

- `--project <name>` matches a top-level directory under `suites/`, **case-insensitive**.
  On ambiguous/substring match or no match, print candidate list and exit non-zero.
- `--all` loops every top-level directory, **skipping `_`-prefixed entries**
  (`_no-folder`, `_organization.json`).
- `--output` is **removed** — output location is now derived per project.
- No install flags. The script never installs (see Scaffold).

## Load phase (global, runs once)

Unchanged from today: `loadDir(SUITES_DIR)` over the whole tree so `testMap` is
**complete** and cross-folder `execute` IDs resolve. `_organization.json` org vars
load once and stay global.

Add two maps built during load:
- `testId → topFolder`
- `suiteName → topFolder`

(`topFolder` = the top-level directory name directly under `suites/`.)

## Per-project emit set (new core logic)

For each target project, compute the set of suites to write as a transitive closure:

1. **Seed** = the suites whose `topFolder` is the selected project.
2. **Closure** = walk `execute` steps of every test in the current set. For each
   referenced `testId`, find its suite. If that suite is a **helper suite**
   (`importOnly`) living in another folder, add it to the set. Recurse until the set
   stops growing.
3. Foreign helper suites are written into **this project's** `generated/helpers/`.
   Because helper file slugs are `slugify(suiteName)` with no folder prefix, the
   existing `../helpers/<slug>` import path resolves with no change to import logic.
4. Non-helper (runnable) foreign references keep **inlining** their steps, exactly as
   today — that path is already self-contained.

Result: every emitted project is self-contained and runnable in isolation. The same
shared helper suite copied into two projects produces two independent copies (by design).

## Per-project scaffold (files only — no install)

For each emitted project, write into `suites/<Project>/`:

```
suites/<Project>/
  <suite>/suite.json          ← untouched source
  generated/
    specs/*.spec.ts
    helpers/*.ts              ← own + pulled-in foreign helpers
    tsconfig.json             ← references ../node_modules (relative to project root)
  playwright.config.ts        ← testDir './generated/specs'
  package.json
  global-setup.ts
  .env.example
  tsconfig.json
```

- `playwright.config.ts`: `testDir` = `generated/specs`; viewport and
  `toHaveScreenshot.maxDiffPixelRatio` computed as most-common **across that
  project's emitted suites only** (not the whole org).
- `.env.example`: private GI vars scoped to **that project's emitted suites** (+ org
  private vars), deduplicated.
- **Removed entirely:** the `npm init playwright@latest` `execSync` block and any
  `node_modules` creation. The script writes files and nothing else. Install + refactor
  are done by hand afterward.

`global-setup.ts`, `package.json`, both `tsconfig.json` files: same content as today,
just written under the project folder instead of repo root.

## Out of scope

- Installing dependencies / running Playwright.
- Deduplicating shared helper suites across projects (intentional copies).
- Touching `_no-folder` or `_organization.json` as standalone projects.
- Refactoring generated TypeScript (done later, by hand).

## Risks / notes

- `--all` writes scaffolds for ~55 folders; pure-helper folders (e.g. `Template`,
  `BlueSnap Inc- - Common steps`) produce only `helpers/`, no specs — acceptable.
- `unresolved` execute IDs (1616 measured) that point at tests absent from the dump
  still become `// TODO: unresolved GI test ID` comments, unchanged from today.
- Slug collisions are scoped to a single project's emit set (low risk); revisit only
  if a collision is observed.
