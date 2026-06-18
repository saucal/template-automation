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

test('url builders use account-scoped folders/suites and encode ids/key', () => {
  const u = m.urls('KEY');
  assert.strictEqual(u.folders(), 'https://api.ghostinspector.com/v1/folders/?apiKey=KEY');
  assert.strictEqual(u.suites(), 'https://api.ghostinspector.com/v1/suites/?apiKey=KEY');
  assert.strictEqual(u.org('ORG'), 'https://api.ghostinspector.com/v1/organizations/ORG/?apiKey=KEY');
  assert.strictEqual(u.suiteDetail('S1'), 'https://api.ghostinspector.com/v1/suites/S1/?apiKey=KEY');
  assert.strictEqual(u.suiteTests('S1'), 'https://api.ghostinspector.com/v1/suites/S1/tests/?apiKey=KEY');
  assert.strictEqual(u.suiteExport('S1'), 'https://api.ghostinspector.com/v1/suites/S1/export/json/?apiKey=KEY');
});

test('orgIdOf reads id-string (folder) and object (suite) shapes', () => {
  assert.strictEqual(m.orgIdOf({ organization: 'org1' }), 'org1');
  assert.strictEqual(m.orgIdOf({ organization: { _id: 'org2', name: 'Acme' } }), 'org2');
  assert.strictEqual(m.orgIdOf({}), null);
  assert.strictEqual(m.orgIdOf(null), null);
});

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
