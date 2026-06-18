#!/usr/bin/env node
'use strict';

// sanitize for folder/suite directory names (from ghostinspector-sync.js sanitizeFolderName)
function sanitizeName(name) {
  return String(name)
    .replace(/[^a-zA-Z0-9_\-\s]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim();
}

// sanitize for test file base names (from ghostinspector-sync.js extra-test path)
function sanitizeTestName(name) {
  return String(name).replace(/[^a-zA-Z0-9_\-\s]/g, '_');
}

const path = require('path');

// Compute the on-disk directory for a suite: <root>/<folder|_no-folder>/<suite>.
// `suite.folder` is a folder id; resolve it via the folders map, else _no-folder.
function suiteDir(root, suite, folders) {
  const folderName = (suite.folder && folders[suite.folder]) || '_no-folder';
  return path.join(root, sanitizeName(folderName), sanitizeName(suite.name));
}

// Inject _gi { testId, suiteId, suiteName } by matching data.name in nameToId.
// Returns { matched } so the caller can warn on misses. Mutates `data` in place.
function annotateGi(data, nameToId, suiteId, suiteName) {
  const testId = nameToId[data && data.name];
  if (!testId) return { matched: false };
  data._gi = { testId, suiteId, suiteName };
  return { matched: true };
}

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

module.exports = { sanitizeName, sanitizeTestName, suiteDir, annotateGi, fetchJson, urls, buildNameToId };

// ─── Orchestration ──────────────────────────────────────────────────────────

const fs = require('fs');
const { execSync } = require('child_process');

function getArg(flag, def) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : def;
}

async function resolveOrgId(apiKey) {
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

  const orgId = await resolveOrgId(apiKey);
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
