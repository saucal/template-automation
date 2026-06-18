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

module.exports = { sanitizeName, sanitizeTestName, suiteDir };
