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
