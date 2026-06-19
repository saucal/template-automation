# Per-Project Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `scripts/migrate-gi.js` migrate one project folder (`--project`) or all of them (`--all`), writing self-contained Playwright output into each `suites/<Project>/` (files only, no install).

**Architecture:** Refactor the top-to-bottom script into importable pure functions guarded by `require.main === module`. Load the whole `suites/` tree once (so cross-folder `execute` IDs resolve), then for each target project compute a transitive emit-set of suites (own suites + referenced helper suites), and generate specs/helpers/scaffold under `suites/<Project>/`.

**Tech Stack:** Node.js (CommonJS), `node:test` + `node:assert` for tests (existing convention — see `scripts/ghostinspector-extract-all.test.js`). No new dependencies.

---

## File Structure

- **Modify:** `scripts/migrate-gi.js` — extract pure functions, add `module.exports`, guard execution behind `main()`, parameterize output paths, remove the install block.
- **Create:** `scripts/migrate-gi.test.js` — unit tests for the new pure functions (`parseArgs`, `topFolderOf`, `resolveProjects`, `computeEmitSuites`, `projectPaths`).

All new logic lives in `migrate-gi.js`. No other files change.

---

## Data shapes (referenced by multiple tasks)

These are the in-memory shapes the functions pass around. Defined once here:

- `test` — a parsed GI test JSON: `{ name, importOnly?, steps: [{command, value, target, ...}], _gi: { testId, suiteId, suiteName } }`
- `testMap` — `{ [testId]: test }`
- `suitesByName` — `{ [suiteName]: test[] }`
- `suiteNameToFolder` — `{ [suiteName]: topFolder }` (topFolder = directory directly under `suites/`)
- `helperSuiteNames` — `Set<suiteName>` (a suite is a helper suite if ANY of its tests has `importOnly`)

---

## Task 1: Make the script importable (no behavior change yet)

**Files:**
- Modify: `scripts/migrate-gi.js` (wrap the procedural body, lines ~26–1179, into functions; add exports + `require.main` guard)
- Test: `scripts/migrate-gi.test.js` (new)

The script currently executes everything at `require` time (parses argv, reads `suites/`, writes files). It must be requirable without side effects so the test file can import functions.

- [ ] **Step 1: Write the failing test**

Create `scripts/migrate-gi.test.js`:

```js
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const m = require('./migrate-gi.js');

test('module can be required without running migration', () => {
  assert.strictEqual(typeof m.parseArgs, 'function');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/migrate-gi.test.js`
Expected: FAIL — requiring the module triggers the full script (argv parse / writes) and/or `m.parseArgs` is `undefined`.

- [ ] **Step 3: Make the module importable**

In `scripts/migrate-gi.js`, move the entire execution body (everything from the `const SUITES_DIR = ...` setup through the final `console.log` summary, lines ~33–1179) into a function `function main() { ... }`. At the very bottom of the file add:

```js
module.exports = {
  // pure helpers filled in by later tasks:
  parseArgs,
  slugify,
  toCamelCase,
};

if (require.main === module) {
  main();
}
```

Define a placeholder `parseArgs` near the top (replaced in Task 2) so the export resolves:

```js
function parseArgs(argv) {
  return { project: null, all: false, suitesDir: './suites' };
}
```

Keep `slugify` / `toCamelCase` where they are (they're already function declarations, so hoisting makes them visible to `module.exports`).

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/migrate-gi.test.js`
Expected: PASS, and no files written / no `suites/` read on require.

- [ ] **Step 5: Verify the CLI still runs end-to-end (regression)**

Run: `node scripts/migrate-gi.js --suites ./suites 2>&1 | tail -5`
Expected: it still loads tests and prints the "Done!" summary (old global behavior — replaced in later tasks). No crash.

- [ ] **Step 6: Commit**

```bash
git add scripts/migrate-gi.js scripts/migrate-gi.test.js
git commit -m "refactor(migrate-gi): make script importable behind main() guard"
```

---

## Task 2: `parseArgs(argv)`

**Files:**
- Modify: `scripts/migrate-gi.js` (replace placeholder `parseArgs`, lines ~26–35 old arg handling)
- Test: `scripts/migrate-gi.test.js`

- [ ] **Step 1: Write the failing test**

Append to `scripts/migrate-gi.test.js`:

```js
test('parseArgs reads --project value', () => {
  assert.deepStrictEqual(
    m.parseArgs(['--project', 'MasterCard']),
    { project: 'MasterCard', all: false, suitesDir: './suites' }
  );
});

test('parseArgs reads --all', () => {
  const r = m.parseArgs(['--all']);
  assert.strictEqual(r.all, true);
  assert.strictEqual(r.project, null);
});

test('parseArgs honors --suites override', () => {
  assert.strictEqual(m.parseArgs(['--suites', '/tmp/s']).suitesDir, '/tmp/s');
});

test('parseArgs defaults: no project, not all, default suites', () => {
  assert.deepStrictEqual(
    m.parseArgs([]),
    { project: null, all: false, suitesDir: './suites' }
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/migrate-gi.test.js`
Expected: FAIL — placeholder returns fixed defaults, ignores `--project`/`--all`/`--suites`.

- [ ] **Step 3: Implement `parseArgs`**

Replace the placeholder:

```js
function parseArgs(argv) {
  const get = (flag) => {
    const i = argv.indexOf(flag);
    return i !== -1 ? argv[i + 1] : undefined;
  };
  return {
    project: get('--project') ?? null,
    all: argv.includes('--all'),
    suitesDir: get('--suites') ?? './suites',
  };
}
```

In `main()`, replace the old `getArg`/`SUITES_DIR`/`OUT_DIR`/`TESTS_DIR` lines (~28–35) with:

```js
const opts = parseArgs(process.argv.slice(2));
const SUITES_DIR = path.resolve(opts.suitesDir);
```

(`OUT_DIR` / `TESTS_DIR` are now computed per-project in Task 7 — remove the old module-level constants.)

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/migrate-gi.test.js`
Expected: PASS (4 parseArgs tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate-gi.js scripts/migrate-gi.test.js
git commit -m "feat(migrate-gi): parseArgs for --project/--all/--suites"
```

---

## Task 3: Track top-level folder during load

**Files:**
- Modify: `scripts/migrate-gi.js` (`loadDir`, lines ~120–163; add `topFolderOf` + maps)
- Test: `scripts/migrate-gi.test.js`

The load must record which top-level folder each test/suite belongs to. Add a pure `topFolderOf(filePath, suitesDir)` and populate `suiteNameToFolder` during load.

- [ ] **Step 1: Write the failing test**

```js
const path = require('node:path');

test('topFolderOf returns the dir directly under suites', () => {
  const suites = '/repo/suites';
  assert.strictEqual(
    m.topFolderOf(path.join(suites, 'MasterCard', 'Suite A', 't.json'), suites),
    'MasterCard'
  );
  assert.strictEqual(
    m.topFolderOf(path.join(suites, '2M', 'Sub', 'Deep', 't.json'), suites),
    '2M'
  );
});

test('topFolderOf returns null for files directly in suites root', () => {
  const suites = '/repo/suites';
  assert.strictEqual(
    m.topFolderOf(path.join(suites, '_organization.json'), suites),
    null
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/migrate-gi.test.js`
Expected: FAIL — `m.topFolderOf` is undefined.

- [ ] **Step 3: Implement `topFolderOf` and wire it into load**

Add near the other utilities:

```js
// First path segment under suitesDir, or null if the file sits in the root.
function topFolderOf(filePath, suitesDir) {
  const rel = path.relative(suitesDir, filePath);
  const parts = rel.split(path.sep);
  return parts.length > 1 ? parts[0] : null;
}
```

In `loadDir`, where a test JSON is stored (the `else if (data._gi?.testId)` branch, ~141–143), also record the folder. Change the load to thread the file path:

```js
} else if (data._gi?.testId) {
  testMap[data._gi.testId] = data;
  const folder = topFolderOf(full, SUITES_DIR);
  if (folder && data._gi.suiteName) suiteNameToFolder[data._gi.suiteName] = folder;
}
```

Declare `const suiteNameToFolder = {};` alongside the other top-of-`main` maps (`testMap`, etc., ~113–118).

Add `topFolderOf` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/migrate-gi.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate-gi.js scripts/migrate-gi.test.js
git commit -m "feat(migrate-gi): record top-level folder per suite during load"
```

---

## Task 4: `resolveProjects(suitesDir, opts)`

**Files:**
- Modify: `scripts/migrate-gi.js`
- Test: `scripts/migrate-gi.test.js`

Decide which project folders to migrate. Pure function takes a list of available folder names (injected, so it's testable without the filesystem) plus opts.

- [ ] **Step 1: Write the failing test**

```js
const AVAIL = ['2M', 'MasterCard', 'No Pong', '_no-folder'];

test('resolveProjects --all returns all non-underscore folders', () => {
  assert.deepStrictEqual(
    m.resolveProjects(AVAIL, { all: true, project: null }),
    ['2M', 'MasterCard', 'No Pong']
  );
});

test('resolveProjects --project matches case-insensitively', () => {
  assert.deepStrictEqual(
    m.resolveProjects(AVAIL, { all: false, project: 'mastercard' }),
    ['MasterCard']
  );
});

test('resolveProjects throws on no match, listing candidates', () => {
  assert.throws(
    () => m.resolveProjects(AVAIL, { all: false, project: 'nope' }),
    /No project folder matches "nope"/
  );
});

test('resolveProjects throws when neither --project nor --all given', () => {
  assert.throws(
    () => m.resolveProjects(AVAIL, { all: false, project: null }),
    /Specify --project <name> or --all/
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/migrate-gi.test.js`
Expected: FAIL — `m.resolveProjects` undefined.

- [ ] **Step 3: Implement `resolveProjects`**

```js
// available: string[] of top-level folder names. Returns the folders to migrate.
function resolveProjects(available, opts) {
  const projects = available.filter((n) => !n.startsWith('_'));
  if (opts.all) return projects;
  if (!opts.project) {
    throw new Error(
      `Specify --project <name> or --all.\nAvailable:\n  ${projects.join('\n  ')}`
    );
  }
  const want = opts.project.toLowerCase();
  const exact = projects.filter((n) => n.toLowerCase() === want);
  if (exact.length === 1) return exact;
  if (exact.length === 0) {
    throw new Error(
      `No project folder matches "${opts.project}".\nAvailable:\n  ${projects.join('\n  ')}`
    );
  }
  throw new Error(`Ambiguous project "${opts.project}": ${exact.join(', ')}`);
}
```

Add to `module.exports`. In `main()`, build `available` from the filesystem:

```js
const available = fs.readdirSync(SUITES_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);
const targetProjects = resolveProjects(available, opts);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/migrate-gi.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate-gi.js scripts/migrate-gi.test.js
git commit -m "feat(migrate-gi): resolveProjects selection (--project/--all)"
```

---

## Task 5: `computeEmitSuites(projectFolder, ctx)` — transitive closure

**Files:**
- Modify: `scripts/migrate-gi.js`
- Test: `scripts/migrate-gi.test.js`

The core. Given a project, return the set of suite names to emit: the project's own suites plus every helper suite reachable through `execute` references (including refs reached via inlined non-helper tests).

- [ ] **Step 1: Write the failing test**

```js
function fixture() {
  // own runnable test -> executes a foreign helper test
  const own = { name: 'Buy', importOnly: false,
    steps: [{ command: 'execute', value: 'h1' }],
    _gi: { testId: 'own1', suiteName: 'MC Suite' } };
  const helper = { name: 'login', importOnly: true,
    steps: [{ command: 'execute', value: 'h2' }],
    _gi: { testId: 'h1', suiteName: 'Common Steps' } };
  const helper2 = { name: 'wait', importOnly: true, steps: [],
    _gi: { testId: 'h2', suiteName: 'Deep Helpers' } };
  const unrelated = { name: 'x', importOnly: false, steps: [],
    _gi: { testId: 'u1', suiteName: 'Other Project Suite' } };
  return {
    testMap: { own1: own, h1: helper, h2: helper2, u1: unrelated },
    suitesByName: {
      'MC Suite': [own], 'Common Steps': [helper],
      'Deep Helpers': [helper2], 'Other Project Suite': [unrelated],
    },
    suiteNameToFolder: {
      'MC Suite': 'MasterCard', 'Common Steps': 'Template',
      'Deep Helpers': 'Template', 'Other Project Suite': 'Botany',
    },
    helperSuiteNames: new Set(['Common Steps', 'Deep Helpers']),
  };
}

test('computeEmitSuites includes own suites + transitive helper suites', () => {
  const ctx = fixture();
  const got = m.computeEmitSuites('MasterCard', ctx);
  assert.deepStrictEqual(
    [...got].sort(),
    ['Common Steps', 'Deep Helpers', 'MC Suite']
  );
});

test('computeEmitSuites excludes unrelated foreign suites', () => {
  const ctx = fixture();
  assert.ok(!m.computeEmitSuites('MasterCard', ctx).has('Other Project Suite'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/migrate-gi.test.js`
Expected: FAIL — `m.computeEmitSuites` undefined.

- [ ] **Step 3: Implement `computeEmitSuites`**

```js
// Returns Set<suiteName> to emit for one project: own suites + helper suites
// reachable via execute refs (following inlined non-helper tests too).
function computeEmitSuites(projectFolder, ctx) {
  const { testMap, suitesByName, suiteNameToFolder, helperSuiteNames } = ctx;
  const emit = new Set();
  const seenTests = new Set();
  const queue = [];

  for (const [suiteName, tests] of Object.entries(suitesByName)) {
    if (suiteNameToFolder[suiteName] === projectFolder) {
      emit.add(suiteName);
      for (const t of tests) if (t._gi) queue.push(t._gi.testId);
    }
  }

  while (queue.length) {
    const id = queue.shift();
    if (seenTests.has(id)) continue;
    seenTests.add(id);
    const t = testMap[id];
    if (!t) continue;
    for (const step of t.steps || []) {
      if (step.command !== 'execute') continue;
      const ref = testMap[step.value];
      if (!ref || !ref._gi) continue;
      if (helperSuiteNames.has(ref._gi.suiteName)) emit.add(ref._gi.suiteName);
      queue.push(ref._gi.testId);
    }
  }
  return emit;
}
```

In `main()`, build `helperSuiteNames` and `suitesByName` once (replacing the old `helperSuites` set ~193–196 and `suites` grouping ~779–789):

```js
const suitesByName = {};
for (const data of Object.values(testMap)) {
  const name = data._gi.suiteName;
  (suitesByName[name] ||= []).push(data);
}
const helperSuiteNames = new Set();
for (const [name, tests] of Object.entries(suitesByName)) {
  if (tests.some((t) => t.importOnly)) helperSuiteNames.add(name);
}
```

Add `computeEmitSuites` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/migrate-gi.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate-gi.js scripts/migrate-gi.test.js
git commit -m "feat(migrate-gi): computeEmitSuites transitive closure"
```

---

## Task 6: `projectPaths(suitesDir, projectFolder)`

**Files:**
- Modify: `scripts/migrate-gi.js`
- Test: `scripts/migrate-gi.test.js`

Pure helper deriving per-project output dirs.

- [ ] **Step 1: Write the failing test**

```js
test('projectPaths derives outDir and testsDir under the project', () => {
  const r = m.projectPaths('/repo/suites', 'MasterCard');
  assert.strictEqual(r.testsDir, path.join('/repo/suites', 'MasterCard'));
  assert.strictEqual(r.outDir, path.join('/repo/suites', 'MasterCard', 'generated'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/migrate-gi.test.js`
Expected: FAIL — `m.projectPaths` undefined.

- [ ] **Step 3: Implement `projectPaths`**

```js
function projectPaths(suitesDir, projectFolder) {
  const testsDir = path.join(suitesDir, projectFolder);
  return { testsDir, outDir: path.join(testsDir, 'generated') };
}
```

Add to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/migrate-gi.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate-gi.js scripts/migrate-gi.test.js
git commit -m "feat(migrate-gi): projectPaths helper"
```

---

## Task 7: Parameterize generation into `generateProject(projectFolder, emitSuites, paths)`

**Files:**
- Modify: `scripts/migrate-gi.js` (the file-generation loop ~791–940 and scaffold ~979–1137)

Wrap the existing per-suite generation and scaffold writing into a function that takes the project's emit-set and paths. The per-suite TypeScript emission logic (`genStep`/`genSteps`/locator helpers/var blocks) is **unchanged** — only the iteration scope and output paths change.

- [ ] **Step 1: Wrap generation in a function**

Define:

```js
function generateProject(projectFolder, emitSuites, paths, shared) {
  const { OUT_DIR, TESTS_DIR } = paths;
  const { suitesByName, suiteViewports, suiteScreenshotThresholds,
          suiteVariables, orgVariables } = shared;

  // Sort tests within each emitted suite (was lines ~787–789)
  for (const name of emitSuites) {
    (suitesByName[name] || []).sort((a, b) => a.name.localeCompare(b.name));
  }

  // --- per-suite emission: iterate ONLY emitSuites ---
  for (const suiteName of emitSuites) {
    const tests = suitesByName[suiteName] || [];
    // ... existing body of the `for (const [suiteName, tests] of Object.entries(suites))`
    //     loop (lines ~793–940) verbatim, with OUT_DIR used as today ...
  }

  // --- scaffold (was lines ~979–1137), per-project ---
  writeScaffold(OUT_DIR, TESTS_DIR, emitSuites, shared);
}
```

Move the existing per-suite loop body (helpers-file branch + spec-file branch, ~793–940) inside, iterating `emitSuites` instead of all suites. The `mergedVars` / private-var logic stays as-is.

- [ ] **Step 2: Extract scaffold into `writeScaffold`, scoped per project, install removed**

```js
function writeScaffold(OUT_DIR, TESTS_DIR, emitSuites, shared) {
  const { suiteViewports, suiteScreenshotThresholds, suiteVariables, orgVariables } = shared;
  mkdirp(TESTS_DIR);

  // package.json (was ~944–968) — keep, but DO NOT run npm init.
  const testsPkg = path.join(TESTS_DIR, 'package.json');
  if (!fs.existsSync(testsPkg)) {
    const repoName = path.basename(TESTS_DIR).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    const pkg = {
      name: `${repoName}-playwright`, version: '1.0.0', private: true,
      scripts: { test: 'playwright test', 'setup:browsers': 'playwright install chromium' },
      dependencies: { dotenv: '^16.0.0' },
      devDependencies: { '@playwright/test': '^1.49.0', '@types/node': '^20.0.0' },
    };
    fs.writeFileSync(testsPkg, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✓  ${testsPkg}`);
  }
  // NOTE: the old `execSync('npm init playwright@latest ...')` block (lines ~969–977) is REMOVED.

  // playwright.config.ts (was ~979–1033): viewport/threshold scoped to emitSuites
  const mostCommon = (values) => {
    if (!values.length) return null;
    const counts = {};
    for (const v of values) { const k = JSON.stringify(v); counts[k] = (counts[k] || 0) + 1; }
    return JSON.parse(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]);
  };
  const inEmit = (map) => [...emitSuites].map((s) => map[s]).filter(Boolean);
  const viewport = mostCommon(inEmit(suiteViewports));
  const screenshotThreshold = mostCommon(inEmit(suiteScreenshotThresholds));
  const relSpecsDir = path.relative(TESTS_DIR, path.join(OUT_DIR, 'specs')).replace(/\\/g, '/');
  // ... write configContent exactly as existing lines ~993–1031, using relSpecsDir/viewport/screenshotThreshold ...

  // global-setup.ts, root tsconfig.json, generated/tsconfig.json: existing content
  // (lines ~1036–1086, ~1120–1137), written under TESTS_DIR / OUT_DIR.

  // .env.example (was ~1090–1118): private vars from orgVariables + ONLY emitSuites' suiteVariables
  const allPrivate = new Map();
  const scopedSuiteVars = [...emitSuites].flatMap((s) => suiteVariables[s] || []);
  for (const v of [...orgVariables, ...scopedSuiteVars]) {
    if (v.private) allPrivate.set(toEnvVar(v.name), v.name);
  }
  // ... write .env.example exactly as existing, using allPrivate ...
}
```

- [ ] **Step 3: Wire the project loop in `main()`**

After `targetProjects` is resolved, replace the old global generation/scaffold/summary (~791–1179) with:

```js
const shared = { suitesByName, suiteViewports, suiteScreenshotThresholds,
                 suiteVariables, orgVariables };
for (const project of targetProjects) {
  const emitSuites = computeEmitSuites(project, {
    testMap, suitesByName, suiteNameToFolder, helperSuiteNames,
  });
  const paths = projectPaths(SUITES_DIR, project);
  console.log(`\n=== ${project} → ${paths.outDir} (${emitSuites.size} suites) ===`);
  generateProject(project, emitSuites, paths, shared);
}
```

- [ ] **Step 4: Run the unit tests (regression — no pure-function behavior changed)**

Run: `node --test scripts/migrate-gi.test.js`
Expected: PASS (all prior tests still green).

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate-gi.js
git commit -m "feat(migrate-gi): per-project generation + scaffold, drop npm install"
```

---

## Task 8: Usage output when no flag given

**Files:**
- Modify: `scripts/migrate-gi.js` (`main()`)

`resolveProjects` already throws a usage message when neither flag is passed. Ensure `main()` catches it and exits cleanly (code 1) instead of dumping a stack trace.

- [ ] **Step 1: Wrap the selection in `main()`**

```js
let targetProjects;
try {
  targetProjects = resolveProjects(available, opts);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
```

- [ ] **Step 2: Verify usage path**

Run: `node scripts/migrate-gi.js`
Expected: prints `Specify --project <name> or --all.` followed by the folder list; exit code 1 (`echo $?` → `1`). No stack trace.

- [ ] **Step 3: Verify bad project path**

Run: `node scripts/migrate-gi.js --project doesnotexist`
Expected: `No project folder matches "doesnotexist".` + folder list; exit 1.

- [ ] **Step 4: Commit**

```bash
git add scripts/migrate-gi.js
git commit -m "feat(migrate-gi): clean usage output and exit code on bad selection"
```

---

## Task 9: Smoke-test against a real small project

**Files:** none (verification only)

- [ ] **Step 1: Pick a small project and run a single-project migration**

Run: `node scripts/migrate-gi.js --project "CI Chris Test"`
Expected: prints the `=== CI Chris Test → .../generated (N suites) ===` banner and per-file `✓` lines; no crash; no `npm`/`node_modules` activity.

- [ ] **Step 2: Verify expected files exist and no install happened**

Run:
```bash
ls suites/"CI Chris Test"/playwright.config.ts \
   suites/"CI Chris Test"/package.json \
   suites/"CI Chris Test"/generated/specs \
   suites/"CI Chris Test"/generated/helpers 2>&1
test ! -d suites/"CI Chris Test"/node_modules && echo "OK: no node_modules"
```
Expected: config + package.json + generated dirs listed; `OK: no node_modules`.

- [ ] **Step 3: Verify cross-folder helpers were pulled in (if the project references any)**

Run: `grep -rl "from '../helpers/" suites/"CI Chris Test"/generated/specs | head`
Expected: spec files importing helpers resolve to files that exist in `generated/helpers/` (no dangling imports). Spot-check one import target exists.

- [ ] **Step 4: Discard smoke-test output (keep the tree clean)**

Run:
```bash
git status --porcelain suites/"CI Chris Test" | head
rm -rf suites/"CI Chris Test"/generated \
       suites/"CI Chris Test"/playwright.config.ts \
       suites/"CI Chris Test"/package.json \
       suites/"CI Chris Test"/global-setup.ts \
       suites/"CI Chris Test"/.env.example \
       suites/"CI Chris Test"/tsconfig.json
```
Expected: generated artifacts removed; `git status` shows the working tree clean of smoke output. (No commit — verification only.)

---

## Self-Review

- **Spec coverage:**
  - CLI `--project`/`--all`/no-flag/`--suites`, `--output` removed → Tasks 2, 4, 8.
  - Global load + folder maps → Task 3.
  - Transitive emit-set incl. foreign helper copy → Task 5 (+ generation in Task 7 writes them into the project's `generated/helpers`).
  - Per-project output under `suites/<Project>/generated` → Tasks 6, 7.
  - Files-only scaffold, install block removed, per-project viewport/threshold/.env scoping → Task 7.
  - Org vars global, merged per project → preserved in Task 7 (`mergedVars` logic untouched).
  - `_`-prefixed folders skipped → Task 4.
- **Placeholder scan:** Task 7 references existing line ranges for the unchanged TypeScript-emission body rather than re-pasting ~150 lines verbatim; the *changed* surfaces (iteration scope, paths, scoped vars, removed install) show full code. Acceptable for an in-place refactor.
- **Type/name consistency:** `parseArgs` → `{project, all, suitesDir}` used in Tasks 2/4/7; `computeEmitSuites(projectFolder, ctx)` ctx shape matches the `main()` call in Task 7; `projectPaths` returns `{testsDir, outDir}` consumed in Task 7; `helperSuiteNames`/`suitesByName`/`suiteNameToFolder` named identically across Tasks 3/5/7.
