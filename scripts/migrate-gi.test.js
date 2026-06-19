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
