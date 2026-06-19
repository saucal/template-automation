'use strict';
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const m = require('./migrate-gi.js');

test('module can be required without running migration', () => {
  assert.strictEqual(typeof m.parseArgs, 'function');
});
