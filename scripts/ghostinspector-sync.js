#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const apiKey = process.env.GHOST_INSPECTOR_API_KEY;
const folderId = process.env.GHOST_INSPECTOR_FOLDER_ID;
const orgId = process.env.GHOST_INSPECTOR_ORG_ID || '';
const suiteUrlTemplate = process.env.GHOST_INSPECTOR_SUITE_URL_TEMPLATE || 'https://api.ghostinspector.com/v1/suites/{suiteId}/?apiKey={apiKey}&format=json';
const exportUrlTemplate = process.env.GHOST_INSPECTOR_EXPORT_URL_TEMPLATE || 'https://api.ghostinspector.com/v1/suites/{suiteId}/export/json/?apiKey={apiKey}';
const folderUrlTemplate = process.env.GHOST_INSPECTOR_FOLDER_URL_TEMPLATE || 'https://api.ghostinspector.com/v1/folders/{folderId}/suites/?apiKey={apiKey}';
const extraTestIds = (process.env.GHOST_INSPECTOR_EXTRA_TEST_IDS || '').split(',').map(id => id.trim()).filter(Boolean);

function buildSuiteUrl(suiteId) {
  return suiteUrlTemplate.replace('{suiteId}', encodeURIComponent(suiteId)).replace('{apiKey}', encodeURIComponent(apiKey || ''));
}

function buildExportUrl(suiteId) {
  return exportUrlTemplate.replace('{suiteId}', encodeURIComponent(suiteId)).replace('{apiKey}', encodeURIComponent(apiKey || ''));
}

function buildTestUrl(testId) {
  return `https://api.ghostinspector.com/v1/tests/${encodeURIComponent(testId)}/?apiKey=${encodeURIComponent(apiKey || '')}`;
}

function buildTestExportUrl(testId) {
  return `https://api.ghostinspector.com/v1/tests/${encodeURIComponent(testId)}/export/json/?apiKey=${encodeURIComponent(apiKey || '')}`;
}

function buildFolderUrl() {
  return folderUrlTemplate.replace('{folderId}', encodeURIComponent(folderId)).replace('{apiKey}', encodeURIComponent(apiKey || ''));
}

function buildOrgUrl() {
  return `https://api.ghostinspector.com/v1/organizations/${encodeURIComponent(orgId)}/?apiKey=${encodeURIComponent(apiKey || '')}`;
}
function sanitizeFolderName(folderName) {
	return folderName.replace(/[^a-zA-Z0-9_-\s]/g, '-').replace(/-+/g, '-').trim();
};

if (!apiKey) {
  console.error('Missing GHOST_INSPECTOR_API_KEY environment variable. Set it as a secret in the workflow.');
  process.exit(2);
}

if (!folderId) {
  console.error('Missing GHOST_INSPECTOR_FOLDER_ID environment variable. Set it as a secret in the workflow.');
  process.exit(2);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText} for ${url}`);
  return await res.json();
}

(async () => {
  try {
    // Load existing mapping or create empty
    let existingMapping = {};

    // Fetch suites from folder
    const folderUrl = buildFolderUrl();
    const folderData = await fetchJson(folderUrl);
    const suites = folderData.data || [];

    // Update mapping with suites (suiteId -> folderName)
    const updatedMapping = { ...existingMapping };

    const suitesDir = path.join(process.cwd(), 'suites');
    // Cleanup so that we start fresh
    if (fs.existsSync(suitesDir)) {
      fs.rmSync(suitesDir, { recursive: true, force: true });
      fs.mkdirSync(suitesDir, { recursive: true });
    }

    if (!fs.existsSync(suitesDir)) {
      fs.mkdirSync(suitesDir, { recursive: true });
    }

    for (const suite of suites) {
      const suiteId = suite._id;

      // Fetch suite data to get current name
      const suiteUrl = buildSuiteUrl(suiteId);
      const suiteData = await fetchJson(suiteUrl);
      const currentName = suiteData.name || suite.name;

      // Update mapping to current name
      updatedMapping[suiteId] = currentName;

      console.log(`For suite ${suiteId}, currentName: '${currentName}'`);

      const folder = path.join( suitesDir, sanitizeFolderName(updatedMapping[suiteId]) );
      fs.mkdirSync(folder, { recursive: true });

      console.log(`Processing suite ${suiteId} (${currentName}) for folder ${folder} ...`);

      // Download and sync test files
      const exportUrl = buildExportUrl(suiteId);
      const tempZip = `/tmp/ghost-${suiteId}.zip`;
      const tempDir = `/tmp/ghost-${suiteId}`;

      execSync(`curl -L -o "${tempZip}" "${exportUrl}"`, { stdio: 'inherit' });
      execSync(`unzip -q "${tempZip}" -d "${tempDir}"`, { stdio: 'inherit' });
      execSync(`rsync -aqc --delete "${tempDir}/" "${folder}/"`, { stdio: 'inherit' });
      execSync(`rm -rf "${tempZip}" "${tempDir}"`, { stdio: 'inherit' });

      // Make json pretty for all json files in the folder
      const files = fs.readdirSync(folder);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(folder, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const jsonData = JSON.parse(content);
          fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
        }
      }

      // Save suite JSON
      const suiteFilePath = path.join(folder, 'suite.json');
      fs.writeFileSync(suiteFilePath, JSON.stringify(suiteData, null, 2), 'utf8');
      console.log(`Saved suite JSON to ${suiteFilePath} and synced test files for ${currentName}`);
    }

    // Export individual extra tests not covered by any synced suite
    for (const testId of extraTestIds) {
      console.log(`Fetching extra test ${testId} ...`);

      const testMeta = await fetchJson(buildTestUrl(testId));
      const testData = testMeta.data;
      const suiteName = testData.suite?.name;
      const suiteId = testData.suite?._id;

      // Find the matching suite folder (already created above, or create it now)
      const folderName = sanitizeFolderName(updatedMapping[suiteId] || suiteName || testId);
      const targetFolder = path.join(suitesDir, folderName);
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
        console.log(`Created new folder ${targetFolder} for extra test ${testId}`);
      }

      const tempFile = `/tmp/ghost-test-${testId}.json`;

      execSync(`curl -L -o "${tempFile}" "${buildTestExportUrl(testId)}"`, { stdio: 'inherit' });

      const content = fs.readFileSync(tempFile, 'utf8');
      const jsonData = JSON.parse(content);

      // Annotate with _gi so testId/suiteId are available (this suite is outside the synced folder)
      jsonData._gi = {
        testId: testData._id,
        suiteId: testData.suite?._id,
        suiteName: testData.suite?.name
      };

      const testName = (testData.name || testId).replace(/[^a-zA-Z0-9_\-\s]/g, '_');
      const destPath = path.join(targetFolder, `${testName}.json`);
      fs.writeFileSync(destPath, JSON.stringify(jsonData, null, 2), 'utf8');
      console.log(`Saved extra test to ${destPath}`);

      execSync(`rm -f "${tempFile}"`, { stdio: 'inherit' });
    }

    // Fetch and save organization variables
    if (orgId) {
      const orgData = await fetchJson(buildOrgUrl());
      const org = orgData.data ?? orgData;
      const variables = Array.isArray(org.variables) ? org.variables : [];
      const orgFilePath = path.join(suitesDir, '_organization.json');
      fs.writeFileSync(orgFilePath, JSON.stringify({ variables }, null, 2), 'utf8');
      console.log(`Saved ${variables.length} organization variable(s) to _organization.json`);
    }

    console.log('All suites processed.');
  } catch (err) {
    console.error('Error during Ghost Inspector sync:', err);
    process.exit(1);
  }
})();
