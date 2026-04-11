# Template Automation - Ghost Inspector Sync

This repository provides a template for automating the synchronization of Ghost Inspector test suites into a local git repository. It fetches suite data from a specified Ghost Inspector folder, downloads test files, annotates them with their Ghost Inspector IDs, and opens a pull request with the changes.

## Features

- Automatically syncs Ghost Inspector suites from a folder
- Downloads and extracts test files per suite
- Supports extra individual tests outside the synced folder via `GHOST_INSPECTOR_EXTRA_TEST_IDS`
- Annotates every exported test JSON with `_gi` metadata (testId, suiteId, suiteName)
- Runs daily via GitHub Actions or on-demand
- Auto-creates a pull request to `main` when changes are detected

## Prerequisites

- Node.js 20 or later
- A Ghost Inspector account with API access
- GitHub repository with Actions enabled

## Setup

1. Create a new repository from this template
2. Configure the following in your repository settings (`Settings > Secrets and variables > Actions`):

### Required Secret

- `GHOST_INSPECTOR_API_KEY`: Your Ghost Inspector API key

### Required Variable or Secret

- `GHOST_INSPECTOR_FOLDER_ID`: The ID of the Ghost Inspector folder containing the suites to sync

### Optional Variables or Secrets

These have default values but can be overridden as repository variables (`vars`) or secrets:

- `GHOST_INSPECTOR_SUITE_URL_TEMPLATE`: URL template for fetching suite metadata
  - Default: `https://api.ghostinspector.com/v1/suites/{suiteId}/?apiKey={apiKey}&format=json`
- `GHOST_INSPECTOR_EXPORT_URL_TEMPLATE`: URL template for exporting suite tests as a ZIP
  - Default: `https://api.ghostinspector.com/v1/suites/{suiteId}/export/json/?apiKey={apiKey}`
- `GHOST_INSPECTOR_FOLDER_URL_TEMPLATE`: URL template for listing suites in a folder
  - Default: `https://api.ghostinspector.com/v1/folders/{folderId}/suites/?apiKey={apiKey}`
- `GHOST_INSPECTOR_EXTRA_TEST_IDS`: Comma-separated list of individual test IDs to fetch outside the synced folder
  - Example: `abc123,def456`

## How It Works

1. Fetches the list of suites from the specified Ghost Inspector folder
2. For each suite:
   - Sanitizes the suite name to create a valid folder name
   - Downloads the test files as a ZIP archive and extracts them to `suites/<suite-name>/`
   - Saves suite metadata to `suites/<suite-name>/suite.json`
3. For each extra test ID in `GHOST_INSPECTOR_EXTRA_TEST_IDS`:
   - Fetches the test and saves it to the matching suite folder
   - Annotates it with `_gi` metadata (testId, suiteId, suiteName)
4. Annotates all exported test JSON files with `_gi` metadata by calling the Ghost Inspector API to resolve test IDs by name
5. Checks for changes and auto-creates a pull request to `main` if anything changed

## Scripts

- `scripts/ghostinspector-sync.js` — Main sync script. Downloads all suites and extra tests.
- `scripts/ghostinspector-test-index.js` — Annotation script. Resolves test IDs from the API and writes `_gi` metadata into each exported test file. Supports three modes:
  - `--annotate-local` *(default)*: Annotates exported test JSON files with their Ghost Inspector IDs
  - `--scan-local`: Scans for `execute` step references and reports unresolved IDs
  - `--write-index`: Writes a full `scripts/test-index.json` with all test IDs indexed by ID and name

## File Structure

After running, your repository will contain:

```
suites/
  <suite-name>/
    suite.json         # Suite metadata
    <test-name>.json   # Exported test files, annotated with _gi
```
