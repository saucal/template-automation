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

module.exports = { sanitizeName, sanitizeTestName };
