#!/usr/bin/env node
/*
Builds a local index of Ghost Inspector test IDs for all suites in a folder.

Why: Exported suite JSON often does not include the test _id, but "execute" steps
may reference other tests by ID. This script lets you map testId <-> name <-> suite.

Usage:
  node ./scripts/ghostinspector-test-index.js            # defaults to --annotate-local
  node ./scripts/ghostinspector-test-index.js --annotate-local
  node ./scripts/ghostinspector-test-index.js --scan-local
  node ./scripts/ghostinspector-test-index.js --write-index
  node ./scripts/ghostinspector-test-index.js --annotate-local --write-index

Env:
  GHOST_INSPECTOR_API_KEY (required)
  GHOST_INSPECTOR_FOLDER_ID (required)

Optional env templates:
  GHOST_INSPECTOR_FOLDER_URL_TEMPLATE default:
    https://api.ghostinspector.com/v1/folders/{folderId}/suites/?apiKey={apiKey}
  GHOST_INSPECTOR_SUITE_TESTS_URL_TEMPLATE default:
    https://api.ghostinspector.com/v1/suites/{suiteId}/tests/?apiKey={apiKey}

Outputs:
  scripts/test-index.json (only with --write-index)
  scripts/execute-ref-report.json (only with --scan-local)
  (modifies suite test json files only with --annotate-local)
*/

const fs = require('fs');
const path = require('path');

const apiKey = process.env.GHOST_INSPECTOR_API_KEY;
const folderId = process.env.GHOST_INSPECTOR_FOLDER_ID;

const folderUrlTemplate =
  process.env.GHOST_INSPECTOR_FOLDER_URL_TEMPLATE ||
  'https://api.ghostinspector.com/v1/folders/{folderId}/suites/?apiKey={apiKey}';

const suiteTestsUrlTemplate =
  process.env.GHOST_INSPECTOR_SUITE_TESTS_URL_TEMPLATE ||
  'https://api.ghostinspector.com/v1/suites/{suiteId}/tests/?apiKey={apiKey}';

const args = new Set(process.argv.slice(2));
if (args.has('--help') || args.has('-h')) {
  console.log('Usage:');
  console.log('  node ./scripts/ghostinspector-test-index.js            # defaults to --annotate-local');
  console.log('  node ./scripts/ghostinspector-test-index.js --annotate-local');
  console.log('  node ./scripts/ghostinspector-test-index.js --scan-local');
  console.log('  node ./scripts/ghostinspector-test-index.js --write-index');
  console.log('  node ./scripts/ghostinspector-test-index.js --annotate-local --write-index');
  process.exit(0);
}

// Default behavior: annotate local exported tests.
if (args.size === 0) args.add('--annotate-local');

if (!apiKey) {
  console.error('Missing GHOST_INSPECTOR_API_KEY environment variable.');
  process.exit(2);
}

if (!folderId) {
  console.error('Missing GHOST_INSPECTOR_FOLDER_ID environment variable.');
  process.exit(2);
}

function template(url, replacements) {
  let out = url;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.replace(`{${key}}`, encodeURIComponent(value));
  }
  return out;
}

function buildFolderUrl() {
  return template(folderUrlTemplate, { folderId, apiKey });
}

function buildSuiteTestsUrl(suiteId) {
  return template(suiteTestsUrlTemplate, { suiteId, apiKey });
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText} for ${url}`);
  return await res.json();
}

function isLikelyObjectId(value) {
  return typeof value === 'string' && /^[a-f0-9]{24}$/i.test(value);
}

function walkJson(value, visit) {
  if (Array.isArray(value)) {
    for (const item of value) walkJson(item, visit);
    return;
  }
  if (value && typeof value === 'object') {
    visit(value);
    for (const child of Object.values(value)) walkJson(child, visit);
  }
}

function readAllExportedTests(suitesDir) {
  const results = [];
  if (!fs.existsSync(suitesDir)) return results;

  const suiteFolders = fs
    .readdirSync(suitesDir)
    .map((name) => path.join(suitesDir, name))
    .filter((p) => fs.statSync(p).isDirectory());

  for (const suiteFolder of suiteFolders) {
    const files = fs
      .readdirSync(suiteFolder)
      .filter((f) => f.endsWith('.json') && f !== 'suite.json');

    for (const file of files) {
      const filePath = path.join(suiteFolder, file);
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        results.push({ filePath, data });
      } catch (e) {
        console.warn(`Skipping invalid JSON: ${filePath}`);
      }
    }
  }

  return results;
}

function readSuiteIdForFolder(suiteFolder) {
  const suiteJsonPath = path.join(suiteFolder, 'suite.json');
  if (!fs.existsSync(suiteJsonPath)) return null;
  try {
    const suiteData = JSON.parse(fs.readFileSync(suiteJsonPath, 'utf8'));
    // GI API wraps response in { code, data: { _id, ... } }
    const inner = suiteData?.data ?? suiteData;
    return inner?._id || inner?.id || null;
  } catch {
    return null;
  }
}

function resolveTestIdForSuite(indexByName, testName, suiteId) {
  const candidates = indexByName[testName];
  if (!Array.isArray(candidates) || candidates.length === 0) return null;

  if (suiteId) {
    const inSuite = candidates.filter((c) => c.suiteId === suiteId);
    if (inSuite.length === 1) return inSuite[0];
    if (inSuite.length > 1) return { ambiguous: true, candidates: inSuite };
  }

  if (candidates.length === 1) return candidates[0];
  return { ambiguous: true, candidates };
}

(async () => {
  try {
    const folderData = await fetchJson(buildFolderUrl());
    const suites = folderData.data || [];

    const indexById = {};
    const indexByName = {}; // name -> [{id, suiteId, suiteName}]

    for (const suite of suites) {
      const suiteId = suite._id;
      const suiteName = suite.name;
      const testsData = await fetchJson(buildSuiteTestsUrl(suiteId));
      const tests = testsData.data || [];

      for (const test of tests) {
        const testId = test._id;
        const testName = test.name;
        if (!testId || !testName) continue;

        indexById[testId] = { id: testId, name: testName, suiteId, suiteName };

        if (!indexByName[testName]) indexByName[testName] = [];
        indexByName[testName].push({ id: testId, suiteId, suiteName });
      }

      process.stdout.write(`Indexed suite ${suiteId} (${suiteName}): ${tests.length} tests\n`);
    }

    const outDir = __dirname;
    if (args.has('--write-index')) {
      const outIndexPath = path.join(outDir, 'test-index.json');
      fs.writeFileSync(
        outIndexPath,
        JSON.stringify(
          {
            generatedAt: new Date().toISOString(),
            folderId,
            suiteCount: suites.length,
            testCount: Object.keys(indexById).length,
            byId: indexById,
            byName: indexByName
          },
          null,
          2
        ),
        'utf8'
      );
      console.log(`\nWrote ${outIndexPath}`);
    }

    if (args.has('--scan-local')) {
      const suitesDir = path.join(process.cwd(), 'suites');
      const exported = readAllExportedTests(suitesDir);

      const references = []; // { fromTestName, fromFile, executeValue, resolved }
      const referencedIds = new Set();

      for (const { filePath, data } of exported) {
        const fromTestName = data && data.name ? data.name : path.basename(filePath);

        // Specifically look at steps[] entries with command === 'execute'
        const steps = Array.isArray(data.steps) ? data.steps : [];
        for (const step of steps) {
          if (!step || step.command !== 'execute') continue;
          const ref = step.value;
          if (!isLikelyObjectId(ref)) continue;

          referencedIds.add(ref);
          const resolved = indexById[ref] || null;
          references.push({ fromTestName, fromFile: filePath, executeValue: ref, resolved });
        }
      }

      const unresolved = references.filter((r) => !r.resolved);
      const reportPath = path.join(outDir, 'execute-ref-report.json');

      fs.writeFileSync(
        reportPath,
        JSON.stringify(
          {
            generatedAt: new Date().toISOString(),
            folderId,
            scannedSuitesDir: suitesDir,
            exportedTestFilesScanned: exported.length,
            executeReferencesFound: references.length,
            distinctReferencedIds: referencedIds.size,
            unresolvedCount: unresolved.length,
            references
          },
          null,
          2
        ),
        'utf8'
      );

      console.log(`Wrote ${reportPath}`);
      console.log(`Resolved: ${references.length - unresolved.length}, Unresolved: ${unresolved.length}`);
    }

    if (args.has('--annotate-local')) {
      const suitesDir = path.join(process.cwd(), 'suites');
      const exported = readAllExportedTests(suitesDir);

      let annotated = 0;
      let skippedNoName = 0;
      let skippedNoMatch = 0;
      let skippedAmbiguous = 0;

      for (const { filePath, data } of exported) {
        const testName = data && data.name;
        if (!testName) {
          skippedNoName++;
          continue;
        }

        const suiteFolder = path.dirname(filePath);
        const suiteId = readSuiteIdForFolder(suiteFolder);

        const resolution = resolveTestIdForSuite(indexByName, testName, suiteId);
        if (!resolution) {
          skippedNoMatch++;
          continue;
        }

        if (resolution.ambiguous) {
          skippedAmbiguous++;
          continue;
        }

        const { id: resolvedTestId, suiteId: resolvedSuiteId, suiteName } = resolution;
        const nextGi = {
          testId: resolvedTestId,
          suiteId: resolvedSuiteId,
          suiteName
        };

        const existingGi = data._gi;
        const same =
          existingGi &&
          existingGi.testId === nextGi.testId &&
          existingGi.suiteId === nextGi.suiteId;

        if (!same) {
          data._gi = nextGi;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          annotated++;
        }
      }

      console.log(
        `Annotated ${annotated} files. Skipped: no name=${skippedNoName}, no match=${skippedNoMatch}, ambiguous=${skippedAmbiguous}`
      );
    }
  } catch (err) {
    console.error('Error building Ghost Inspector test index:', err);
    process.exit(1);
  }
})();
