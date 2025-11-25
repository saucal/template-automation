#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const mappingFile = path.join(__dirname, 'suite-mapping.json');
const apiKey = process.env.GHOST_INSPECTOR_API_KEY;
const folderId = process.env.GHOST_INSPECTOR_FOLDER_ID;

function buildTestsUrl(suiteId) {
  return `https://api.ghostinspector.com/v1/suites/${encodeURIComponent(suiteId)}/tests/?apiKey=${encodeURIComponent(apiKey)}`;
}

function buildTestUrl(testId) {
  return `https://api.ghostinspector.com/v1/tests/${encodeURIComponent(testId)}/?apiKey=${encodeURIComponent(apiKey)}`;
}

function buildImportUrl(suiteId) {
  return `https://api.ghostinspector.com/v1/suites/${encodeURIComponent(suiteId)}/import-test/json?apiKey=${encodeURIComponent(apiKey)}`;
}

function buildUpdateUrl(testId) {
  return `https://api.ghostinspector.com/v1/tests/${encodeURIComponent(testId)}/?apiKey=${encodeURIComponent(apiKey)}`;
}

function buildDeleteUrl(testId) {
  return `https://api.ghostinspector.com/v1/tests/${encodeURIComponent(testId)}/?apiKey=${encodeURIComponent(apiKey)}`;
}

if (!apiKey) {
  console.error('Missing GHOST_INSPECTOR_API_KEY environment variable.');
  process.exit(2);
}

if (!folderId) {
  console.error('Missing GHOST_INSPECTOR_FOLDER_ID environment variable.');
  process.exit(2);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText} for ${url}`);
  return await res.json();
}

async function postJson(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Post failed: ${res.status} ${res.statusText} for ${url}`);
  return await res.json();
}

async function deleteRequest(url) {
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Delete failed: ${res.status} ${res.statusText} for ${url}`);
  return await res.json();
}

(async () => {
  try {
    // Load mapping
    if (!fs.existsSync(mappingFile)) {
      console.error('Mapping file not found:', mappingFile);
      process.exit(1);
    }
    const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

    for (const suiteId of Object.keys(mapping)) {
      const folder = mapping[suiteId];
      const folderPath = path.join(__dirname, '..', folder);

      if (!fs.existsSync(folderPath)) {
        console.log(`Folder ${folder} does not exist, skipping suite ${suiteId}`);
        continue;
      }

      console.log(`Processing suite ${suiteId} in folder ${folder}`);

      // Get local tests
      const localTests = {};
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json') && f !== 'suite.json');
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (json.name) {
          localTests[json.name] = json;
        }
      }

      // Get GI tests
      const testsUrl = buildTestsUrl(suiteId);
      const giResponse = await fetchJson(testsUrl);
      const giTests = {};
      for (const test of giResponse.data || []) {
        giTests[test.name] = { id: test._id, name: test.name };
      }

      // Create missing tests
      for (const name of Object.keys(localTests)) {
        if (!giTests[name]) {
          console.log(`Creating test ${name} in suite ${suiteId}`);
          const importUrl = buildImportUrl(suiteId);
          await postJson(importUrl, localTests[name]);
        }
      }

      // Update existing tests
      for (const name of Object.keys(localTests)) {
        if (giTests[name]) {
          const testId = giTests[name].id;
          const testUrl = buildTestUrl(testId);
          const giJson = await fetchJson(testUrl);
          // Remove _id and other meta fields if present
          delete giJson._id;
          delete giJson.dateCreated;
          delete giJson.dateUpdated;
          delete giJson.suite;
          const localJson = localTests[name];
          if (JSON.stringify(localJson) !== JSON.stringify(giJson)) {
            console.log(`Updating test ${name} (${testId})`);
            const updateUrl = buildUpdateUrl(testId);
            await postJson(updateUrl, localJson);
          }
        }
      }

      // Delete extra tests
      for (const name of Object.keys(giTests)) {
        if (!localTests[name]) {
          const testId = giTests[name].id;
          console.log(`Deleting test ${name} (${testId})`);
          const deleteUrl = buildDeleteUrl(testId);
          await deleteRequest(deleteUrl);
        }
      }
    }

    console.log('Sync to Ghost Inspector completed.');
  } catch (err) {
    console.error('Error during sync to Ghost Inspector:', err);
    process.exit(1);
  }
})();