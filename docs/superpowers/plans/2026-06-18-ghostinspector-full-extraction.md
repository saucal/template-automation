# Ghost Inspector Full-Org Extraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `scripts/ghostinspector-extract-all.js` — a standalone tool that extracts an entire Ghost Inspector organization (every folder, suite, test) into a nested-by-folder `suites/` tree with `_gi` baked in, consumable by `migrate-gi.js` with no separate annotate step.

**Architecture:** Pure helper functions (sanitize, dir-path, `_gi` injection, name-matching, retrying `fetchJson`) are defined and exported for unit testing; the orchestration runs in a `main()` guarded by `require.main === module`. Tests use Node's built-in `node:test` + `node:assert` (no new dependency). Bulk suite ZIP export (3 API calls/suite) + per-suite tests-list for name→id mapping.

**Tech Stack:** Node 20 (CommonJS), `node:test`, `curl`/`unzip` via `child_process` (mirrors `ghostinspector-sync.js`), GI v1 REST API.

---

## File Structure

- Create: `scripts/ghostinspector-extract-all.js` — the extraction tool. Pure helpers exported; `main()` guarded.
- Create: `scripts/ghostinspector-extract-all.test.js` — `node:test` unit tests for the pure helpers.
- Reference (do not modify): `scripts/ghostinspector-sync.js` (helper source), `scripts/migrate-gi.js` (output consumer).

---

### Task 1: Scaffold module with exported pure helpers + test harness

**Files:**
- Create: `scripts/ghostinspector-extract-all.js`
- Create: `scripts/ghostinspector-extract-all.test.js`

- [ ] **Step 1: Write the failing test**

Create `scripts/ghostinspector-extract-all.test.js`:

```js
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const m = require('./ghostinspector-extract-all.js');

test('sanitizeName strips unsafe chars and collapses dashes', () => {
  assert.strictEqual(m.sanitizeName('Checkout / Flow!!'), 'Checkout - Flow');
  assert.strictEqual(m.sanitizeName('a@@@b'), 'a-b');
});

test('sanitizeTestName keeps word/space/dash, replaces rest with underscore', () => {
  assert.strictEqual(m.sanitizeTestName('Pay (Visa)'), 'Pay _Visa_');
  assert.strictEqual(m.sanitizeTestName('order #1'), 'order _1');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: FAIL — `Cannot find module './ghostinspector-extract-all.js'`.

- [ ] **Step 3: Write minimal implementation**

Create `scripts/ghostinspector-extract-all.js`:

```js
#!/usr/bin/env node
'use strict';

// sanitize for folder/suite directory names (from ghostinspector-sync.js sanitizeFolderName)
function sanitizeName(name) {
  return String(name).replace(/[^a-zA-Z0-9_\-\s]/g, '-').replace(/-+/g, '-').trim();
}

// sanitize for test file base names (from ghostinspector-sync.js extra-test path)
function sanitizeTestName(name) {
  return String(name).replace(/[^a-zA-Z0-9_\-\s]/g, '_');
}

module.exports = { sanitizeName, sanitizeTestName };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/ghostinspector-extract-all.js scripts/ghostinspector-extract-all.test.js
git commit -m "feat: scaffold gi-extract-all with sanitize helpers"
```

---

### Task 2: Suite directory path computation (folder nesting)

**Files:**
- Modify: `scripts/ghostinspector-extract-all.js`
- Test: `scripts/ghostinspector-extract-all.test.js`

- [ ] **Step 1: Write the failing test**

Append to `scripts/ghostinspector-extract-all.test.js`:

```js
test('suiteDir nests under resolved folder name', () => {
  const folders = { f1: 'Smoke Tests' };
  assert.strictEqual(
    m.suiteDir('suites', { name: 'Checkout', folder: 'f1' }, folders),
    'suites/Smoke Tests/Checkout'
  );
});

test('suiteDir falls back to _no-folder when suite has no folder', () => {
  assert.strictEqual(
    m.suiteDir('suites', { name: 'Checkout', folder: null }, {}),
    'suites/_no-folder/Checkout'
  );
});

test('suiteDir uses _no-folder when folder id is unknown', () => {
  assert.strictEqual(
    m.suiteDir('suites', { name: 'X', folder: 'ghost' }, { f1: 'A' }),
    'suites/_no-folder/X'
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: FAIL — `m.suiteDir is not a function`.

- [ ] **Step 3: Write minimal implementation**

Add to `scripts/ghostinspector-extract-all.js` (above `module.exports`):

```js
const path = require('path');

// Compute the on-disk directory for a suite: <root>/<folder|_no-folder>/<suite>.
// `suite.folder` is a folder id; resolve it via the folders map, else _no-folder.
function suiteDir(root, suite, folders) {
  const folderName = (suite.folder && folders[suite.folder]) || '_no-folder';
  return path.join(root, sanitizeName(folderName), sanitizeName(suite.name));
}
```

Extend the export to: `module.exports = { sanitizeName, sanitizeTestName, suiteDir };`

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: PASS (5 tests).

> Note: tests assume POSIX separators. On the dev machine (darwin) `path.join` yields `/`. Fine.

- [ ] **Step 5: Commit**

```bash
git add scripts/ghostinspector-extract-all.js scripts/ghostinspector-extract-all.test.js
git commit -m "feat: suiteDir folder-nesting path computation"
```

---

### Task 3: `_gi` injection by name-match

**Files:**
- Modify: `scripts/ghostinspector-extract-all.js`
- Test: `scripts/ghostinspector-extract-all.test.js`

- [ ] **Step 1: Write the failing test**

Append to `scripts/ghostinspector-extract-all.test.js`:

```js
test('annotateGi injects _gi when test name matches the map', () => {
  const data = { name: 'Buy now', steps: [] };
  const out = m.annotateGi(data, { 'Buy now': 't1' }, 's1', 'My Suite');
  assert.deepStrictEqual(out.matched, true);
  assert.deepStrictEqual(data._gi, { testId: 't1', suiteId: 's1', suiteName: 'My Suite' });
});

test('annotateGi reports unmatched and leaves _gi absent', () => {
  const data = { name: 'Ghost', steps: [] };
  const out = m.annotateGi(data, { 'Buy now': 't1' }, 's1', 'My Suite');
  assert.strictEqual(out.matched, false);
  assert.strictEqual(data._gi, undefined);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: FAIL — `m.annotateGi is not a function`.

- [ ] **Step 3: Write minimal implementation**

Add to `scripts/ghostinspector-extract-all.js`:

```js
// Inject _gi { testId, suiteId, suiteName } by matching data.name in nameToId.
// Returns { matched } so the caller can warn on misses. Mutates `data` in place.
function annotateGi(data, nameToId, suiteId, suiteName) {
  const testId = nameToId[data && data.name];
  if (!testId) return { matched: false };
  data._gi = { testId, suiteId, suiteName };
  return { matched: true };
}
```

Add `annotateGi` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/ghostinspector-extract-all.js scripts/ghostinspector-extract-all.test.js
git commit -m "feat: _gi injection by name-match"
```

---

### Task 4: Retrying `fetchJson` (429 backoff)

**Files:**
- Modify: `scripts/ghostinspector-extract-all.js`
- Test: `scripts/ghostinspector-extract-all.test.js`

- [ ] **Step 1: Write the failing test**

Append to `scripts/ghostinspector-extract-all.test.js`:

```js
test('fetchJson retries on 429 then succeeds', async () => {
  let calls = 0;
  const fakeFetch = async () => {
    calls++;
    if (calls < 3) return { ok: false, status: 429, statusText: 'Too Many Requests' };
    return { ok: true, json: async () => ({ data: 'ok' }) };
  };
  const out = await m.fetchJson('http://x', { fetchImpl: fakeFetch, retries: 5, delayMs: 0 });
  assert.deepStrictEqual(out, { data: 'ok' });
  assert.strictEqual(calls, 3);
});

test('fetchJson throws on non-429 error', async () => {
  const fakeFetch = async () => ({ ok: false, status: 404, statusText: 'Not Found' });
  await assert.rejects(
    () => m.fetchJson('http://x', { fetchImpl: fakeFetch, retries: 2, delayMs: 0 }),
    /404/
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: FAIL — `m.fetchJson is not a function`.

- [ ] **Step 3: Write minimal implementation**

Add to `scripts/ghostinspector-extract-all.js`:

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Fetch JSON with bounded retry on HTTP 429. Injectable fetchImpl/delay for tests.
async function fetchJson(url, opts = {}) {
  const fetchImpl = opts.fetchImpl || globalThis.fetch;
  const retries = opts.retries != null ? opts.retries : 3;
  const delayMs = opts.delayMs != null ? opts.delayMs : 1000;
  for (let attempt = 0; ; attempt++) {
    const res = await fetchImpl(url);
    if (res.ok) return res.json();
    if (res.status === 429 && attempt < retries) {
      await sleep(delayMs * (attempt + 1));
      continue;
    }
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} for ${url}`);
  }
}
```

Add `fetchJson` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: PASS (9 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/ghostinspector-extract-all.js scripts/ghostinspector-extract-all.test.js
git commit -m "feat: retrying fetchJson with 429 backoff"
```

---

### Task 5: URL builders + env/arg wiring

**Files:**
- Modify: `scripts/ghostinspector-extract-all.js`
- Test: `scripts/ghostinspector-extract-all.test.js`

- [ ] **Step 1: Write the failing test**

Append to `scripts/ghostinspector-extract-all.test.js`:

```js
test('url builders encode ids and key', () => {
  const u = m.urls('KEY', 'ORG');
  assert.strictEqual(u.folders(), 'https://api.ghostinspector.com/v1/organizations/ORG/folders/?apiKey=KEY');
  assert.strictEqual(u.suites(), 'https://api.ghostinspector.com/v1/organizations/ORG/suites/?apiKey=KEY');
  assert.strictEqual(u.org(), 'https://api.ghostinspector.com/v1/organizations/ORG/?apiKey=KEY');
  assert.strictEqual(u.suiteDetail('S1'), 'https://api.ghostinspector.com/v1/suites/S1/?apiKey=KEY');
  assert.strictEqual(u.suiteTests('S1'), 'https://api.ghostinspector.com/v1/suites/S1/tests/?apiKey=KEY');
  assert.strictEqual(u.suiteExport('S1'), 'https://api.ghostinspector.com/v1/suites/S1/export/json/?apiKey=KEY');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: FAIL — `m.urls is not a function`.

- [ ] **Step 3: Write minimal implementation**

Add to `scripts/ghostinspector-extract-all.js`:

```js
const BASE = 'https://api.ghostinspector.com/v1';
const enc = encodeURIComponent;

// All GI endpoints used by this tool, with id/key encoding centralized.
function urls(apiKey, orgId) {
  const k = enc(apiKey);
  return {
    folders: () => `${BASE}/organizations/${enc(orgId)}/folders/?apiKey=${k}`,
    suites: () => `${BASE}/organizations/${enc(orgId)}/suites/?apiKey=${k}`,
    org: () => `${BASE}/organizations/${enc(orgId)}/?apiKey=${k}`,
    suiteDetail: (id) => `${BASE}/suites/${enc(id)}/?apiKey=${k}`,
    suiteTests: (id) => `${BASE}/suites/${enc(id)}/tests/?apiKey=${k}`,
    suiteExport: (id) => `${BASE}/suites/${enc(id)}/export/json/?apiKey=${k}`,
    orgsList: () => `${BASE}/organizations/?apiKey=${k}`,
  };
}
```

Add `urls` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: PASS (10 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/ghostinspector-extract-all.js scripts/ghostinspector-extract-all.test.js
git commit -m "feat: centralized GI URL builders"
```

---

### Task 6: Orchestration `main()` (guarded, run end-to-end)

**Files:**
- Modify: `scripts/ghostinspector-extract-all.js`

> This task wires the helpers into the full flow. It is integration-tested by a real run (Task 7), not a unit test — the orchestration is all I/O (network + fs + curl/unzip) and mocking it adds no signal over running it once.

- [ ] **Step 1: Add the buildNameToId helper + its test**

Append to `scripts/ghostinspector-extract-all.test.js`:

```js
test('buildNameToId maps test name to id, warns on duplicate names', () => {
  const warnings = [];
  const map = m.buildNameToId(
    [{ _id: 'a', name: 'X' }, { _id: 'b', name: 'Y' }, { _id: 'c', name: 'X' }],
    (msg) => warnings.push(msg)
  );
  assert.strictEqual(map['X'], 'a'); // first wins
  assert.strictEqual(map['Y'], 'b');
  assert.strictEqual(warnings.length, 1);
  assert.match(warnings[0], /duplicate test name/i);
});
```

Run: `node --test scripts/ghostinspector-extract-all.test.js` → FAIL (`buildNameToId is not a function`).

Add to `scripts/ghostinspector-extract-all.js`:

```js
// Build { testName: testId } from a suite's tests list. First occurrence wins;
// duplicates within a suite are warned (rare — would make name-match ambiguous).
function buildNameToId(tests, warn) {
  const map = {};
  for (const t of tests || []) {
    if (!t || !t._id || !t.name) continue;
    if (map[t.name] != null) { warn(`duplicate test name "${t.name}" in suite — keeping first`); continue; }
    map[t.name] = t._id;
  }
  return map;
}
```

Add `buildNameToId` to `module.exports`. Run tests → PASS (11 tests).

- [ ] **Step 2: Write the orchestration body**

Add to `scripts/ghostinspector-extract-all.js` (after helpers, before `module.exports`):

```js
const fs = require('fs');
const { execSync } = require('child_process');

function getArg(flag, def) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : def;
}

async function resolveOrgId(apiKey, u) {
  if (process.env.GHOST_INSPECTOR_ORG_ID) return process.env.GHOST_INSPECTOR_ORG_ID;
  const list = await fetchJson(urls(apiKey, '').orgsList());
  const orgs = list.data || [];
  if (orgs.length === 1) return orgs[0]._id;
  console.error('GHOST_INSPECTOR_ORG_ID not set and could not auto-resolve. Available orgs:');
  for (const o of orgs) console.error(`  ${o._id}  ${o.name}`);
  process.exit(2);
}

async function main() {
  const apiKey = process.env.GHOST_INSPECTOR_API_KEY;
  if (!apiKey) { console.error('Missing GHOST_INSPECTOR_API_KEY'); process.exit(2); }

  const root = path.resolve(getArg('--suites', './suites'));
  const keep = process.argv.includes('--keep');

  const orgId = await resolveOrgId(apiKey, null);
  const u = urls(apiKey, orgId);

  const folderData = await fetchJson(u.folders());
  const folders = {};
  for (const f of (folderData.data || [])) folders[f._id] = f.name;

  const suitesData = await fetchJson(u.suites());
  const suites = suitesData.data || [];

  if (!keep && fs.existsSync(root)) fs.rmSync(root, { recursive: true, force: true });
  fs.mkdirSync(root, { recursive: true });

  const seenSuiteNames = new Set();
  let processed = 0, failed = 0, annotated = 0, unmatched = 0;

  for (const suite of suites) {
    try {
      if (seenSuiteNames.has(suite.name)) {
        console.warn(`⚠ duplicate suite name "${suite.name}" across folders — migrate-gi.js will merge them`);
      }
      seenSuiteNames.add(suite.name);

      const dir = suiteDir(root, suite, folders);
      fs.mkdirSync(dir, { recursive: true });

      // Bulk export all tests for the suite (ZIP), unzip into dir
      const zip = `/tmp/gi-${suite._id}.zip`;
      const tmp = `/tmp/gi-${suite._id}`;
      execSync(`curl -L -sS -o "${zip}" "${u.suiteExport(suite._id)}"`, { stdio: 'inherit' });
      execSync(`unzip -q -o "${zip}" -d "${tmp}"`, { stdio: 'inherit' });
      execSync(`rsync -aqc "${tmp}/" "${dir}/"`, { stdio: 'inherit' });
      execSync(`rm -rf "${zip}" "${tmp}"`, { stdio: 'inherit' });

      // name → id map for this suite
      const testsData = await fetchJson(u.suiteTests(suite._id));
      const nameToId = buildNameToId(testsData.data || [], (msg) => console.warn(`⚠ ${msg}`));

      // annotate + prettify every test json (skip suite.json; created below)
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.json') || file === 'suite.json') continue;
        const fp = path.join(dir, file);
        const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
        const { matched } = annotateGi(data, nameToId, suite._id, suite.name);
        if (matched) annotated++;
        else { unmatched++; console.warn(`⚠ no testId match for "${data.name}" in suite "${suite.name}"`); }
        fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      }

      // suite detail
      const detail = await fetchJson(u.suiteDetail(suite._id));
      fs.writeFileSync(path.join(dir, 'suite.json'), JSON.stringify(detail, null, 2), 'utf8');

      processed++;
      console.log(`✓ ${folders[suite.folder] || '_no-folder'}/${suite.name}`);
      await sleep(150);
    } catch (e) {
      failed++;
      console.error(`✗ suite "${suite.name}" (${suite._id}) failed: ${e.message}`);
    }
  }

  // org variables
  try {
    const orgData = await fetchJson(u.org());
    const org = orgData.data ?? orgData;
    const variables = Array.isArray(org.variables) ? org.variables : [];
    fs.writeFileSync(path.join(root, '_organization.json'), JSON.stringify({ variables }, null, 2), 'utf8');
    console.log(`✓ _organization.json (${variables.length} vars)`);
  } catch (e) {
    console.error(`✗ org variables failed: ${e.message}`);
  }

  console.log(`\nDone. Suites: ${processed} ok, ${failed} failed. Tests: ${annotated} annotated, ${unmatched} unmatched.`);
}

if (require.main === module) {
  main().catch((e) => { console.error('Extraction error:', e); process.exit(1); });
}
```

- [ ] **Step 3: Verify the module still loads and unit tests pass**

Run: `node --test scripts/ghostinspector-extract-all.test.js`
Expected: PASS (11 tests) — `require.main === module` guard means importing the module does NOT run `main()`.

- [ ] **Step 4: Verify the script is syntactically runnable (no creds needed)**

Run: `GHOST_INSPECTOR_API_KEY= node scripts/ghostinspector-extract-all.js`
Expected: prints `Missing GHOST_INSPECTOR_API_KEY` and exits 2 (proves `main()` wires up without throwing).

- [ ] **Step 5: Commit**

```bash
git add scripts/ghostinspector-extract-all.js scripts/ghostinspector-extract-all.test.js
git commit -m "feat: full-org extraction orchestration"
```

---

### Task 7: Live integration validation + migrate round-trip

**Files:**
- No code changes unless a defect is found (then fix + commit on top).

- [ ] **Step 1: Run a real extraction**

Run (with real creds in env or `.env`):
```bash
GHOST_INSPECTOR_API_KEY=... GHOST_INSPECTOR_ORG_ID=... node scripts/ghostinspector-extract-all.js --suites ./suites
```
Expected: per-suite `✓` lines, an `_organization.json` line, a final summary. `0 failed` ideally; investigate any `✗`.

- [ ] **Step 2: Inspect output layout**

Run: `find suites -maxdepth 3 -type f | head -50`
Expected: `suites/<folder>/<suite>/suite.json` and `<test>.json` files; `suites/_organization.json` present.

- [ ] **Step 3: Confirm `_gi` baked into a sample test**

Run: `grep -l '"_gi"' suites/*/*/*.json | head; echo "unmatched warnings above should equal files missing _gi"`
Expected: matched test files contain `_gi`. Cross-check the summary's `unmatched` count.

- [ ] **Step 4: Migrate round-trip**

Run: `node scripts/migrate-gi.js --suites ./suites`
Expected: `Loaded N GI tests` where N ≈ (annotated count from Step 1); specs/helpers generate without crashing.

- [ ] **Step 5: Confirm sync script untouched**

Run: `git status --porcelain scripts/ghostinspector-sync.js`
Expected: empty output (no modification).

- [ ] **Step 6: Commit any fixes**

If Steps 1–4 surfaced defects, fix in `ghostinspector-extract-all.js`, re-run, then:
```bash
git add scripts/ghostinspector-extract-all.js
git commit -m "fix: <describe defect found during live validation>"
```

---

## Self-Review

**Spec coverage:**
- Whole-org walk → Task 6 (`u.suites()` lists all org suites, folders mapped).
- Nested-by-folder layout → Task 2 (`suiteDir`).
- `_gi` baked in, no annotate step → Task 3 (`annotateGi`) + Task 6 (per-suite name→id map).
- Standalone, sync untouched → new files only; Task 7 Step 5 verifies.
- orgId required w/ single-org fallback → Task 6 (`resolveOrgId`).
- Bulk ZIP, no per-test export → Task 6 (`suiteExport` + unzip).
- Fresh wipe + `--keep` → Task 6.
- `_organization.json` → Task 6.
- Retry/throttle → Task 4 (`fetchJson`) + Task 6 (`sleep(150)`).
- Duplicate suite-name warning → Task 6 (`seenSuiteNames`).
- Unmatched test-name warning, no invented id → Task 3 + Task 6.

**Placeholder scan:** none — every code step shows complete code.

**Type/name consistency:** `sanitizeName`, `sanitizeTestName`, `suiteDir`, `annotateGi`, `fetchJson`, `urls`, `buildNameToId` are defined once and reused with matching signatures across tasks. `urls(apiKey, orgId)` returns the method set used in Task 6.
