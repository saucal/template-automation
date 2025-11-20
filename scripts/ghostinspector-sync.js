#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mappingFile = path.join(__dirname, 'suite-mapping.json');
const apiKey = process.env.GHOST_INSPECTOR_API_KEY;
const folderId = process.env.GHOST_INSPECTOR_FOLDER_ID;
const suiteUrlTemplate = process.env.GHOST_INSPECTOR_SUITE_URL_TEMPLATE || 'https://api.ghostinspector.com/v1/suites/{suiteId}/?apiKey={apiKey}&format=json';
const exportUrlTemplate = process.env.GHOST_INSPECTOR_EXPORT_URL_TEMPLATE || 'https://api.ghostinspector.com/v1/suites/{suiteId}/export/json/?apiKey={apiKey}';
const folderUrlTemplate = process.env.GHOST_INSPECTOR_FOLDER_URL_TEMPLATE || 'https://api.ghostinspector.com/v1/folders/{folderId}/suites/?apiKey={apiKey}';

function buildSuiteUrl(suiteId) {
  return suiteUrlTemplate.replace('{suiteId}', encodeURIComponent(suiteId)).replace('{apiKey}', encodeURIComponent(apiKey || ''));
}

function buildExportUrl(suiteId) {
  return exportUrlTemplate.replace('{suiteId}', encodeURIComponent(suiteId)).replace('{apiKey}', encodeURIComponent(apiKey || ''));
}

function buildFolderUrl() {
  return folderUrlTemplate.replace('{folderId}', encodeURIComponent(folderId)).replace('{apiKey}', encodeURIComponent(apiKey || ''));
}

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
    if (fs.existsSync(mappingFile)) {
      existingMapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
    }

    // Fetch suites from folder
    const folderUrl = buildFolderUrl();
    const folderData = await fetchJson(folderUrl);
    const suites = folderData.data || [];

    // Update mapping with suites (suiteId -> folderName)
    const updatedMapping = { ...existingMapping };

    for (const suite of suites) {
      const suiteId = suite._id;

      // Fetch suite data to get current name
      const suiteUrl = buildSuiteUrl(suiteId);
      const suiteData = await fetchJson(suiteUrl);
      const currentName = suiteData.name || suite.name;

      // Update mapping to current name
      const oldFolder = updatedMapping[suiteId];
      updatedMapping[suiteId] = currentName;

      console.log(`For suite ${suiteId}, currentName: '${currentName}', oldFolder: '${oldFolder}'`);

      // If folder name changed, rename the folder
      if (oldFolder && oldFolder !== currentName && fs.existsSync(oldFolder)) {
        fs.renameSync(oldFolder, currentName);
        console.log(`Renamed folder from ${oldFolder} to ${currentName}`);
      }

      const folder = updatedMapping[suiteId];

      console.log(`Processing suite ${suiteId} (${currentName}) for folder ${folder} ...`);

      // Download and sync test files
      const exportUrl = buildExportUrl(suiteId);
      const tempZip = `/tmp/ghost-${suiteId}.zip`;
      const tempDir = `/tmp/ghost-${suiteId}`;

      execSync(`curl -L -o "${tempZip}" "${exportUrl}"`, { stdio: 'inherit' });
      execSync(`unzip -q "${tempZip}" -d "${tempDir}"`, { stdio: 'inherit' });
      execSync(`rsync -aqc --delete "${tempDir}/" "${folder}/"`, { stdio: 'inherit' });
      execSync(`rm -rf "${tempZip}" "${tempDir}"`, { stdio: 'inherit' });

      // Save suite JSON
      const suiteFilePath = path.join(folder, 'suite.json');
      fs.writeFileSync(suiteFilePath, JSON.stringify(suiteData, null, 2), 'utf8');
      console.log(`Saved suite JSON to ${suiteFilePath} and synced test files for ${folder}`);
    }

    // Save updated mapping
    fs.writeFileSync(mappingFile, JSON.stringify(updatedMapping, null, 2), 'utf8');
    console.log('Updated suite mapping:', updatedMapping);
    console.log('Mapping file created/updated at', mappingFile);

    console.log('All suites processed.');
  } catch (err) {
    console.error('Error during Ghost Inspector sync:', err);
    process.exit(1);
  }
})();
