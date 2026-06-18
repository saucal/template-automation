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
