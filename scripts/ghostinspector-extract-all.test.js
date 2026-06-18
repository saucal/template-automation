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
