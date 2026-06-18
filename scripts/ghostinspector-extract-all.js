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

module.exports = { sanitizeName, sanitizeTestName, suiteDir, annotateGi, fetchJson, urls };
