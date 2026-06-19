'use strict';
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const m = require('./migrate-gi.js');

test('module can be required without running migration', () => {
  assert.strictEqual(typeof m.parseArgs, 'function');
});

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
