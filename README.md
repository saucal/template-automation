# Template Automation - Ghost Inspector Sync

This repository provides a template for automating the synchronization of Ghost Inspector test suites with local folders. It fetches suite data from a specified Ghost Inspector folder, downloads test files, and keeps local directories in sync with the remote suites.

## Features

- Automatically syncs Ghost Inspector suites from a folder
- Downloads and unzips test files
- Maintains local folder structure matching suite names
- Saves suite metadata as JSON
- Runs daily via GitHub Actions or on-demand

## Prerequisites

- Node.js 20 or later
- A Ghost Inspector account with API access
- GitHub repository with Actions enabled

## Setup

1. Create a new repository from this template
2. Configure the following secrets in your repository settings (`Settings > Secrets and variables > Actions`):

### Required Secrets

- `GHOST_INSPECTOR_API_KEY`: Your Ghost Inspector API key
- `GHOST_INSPECTOR_FOLDER_ID`: The ID of the Ghost Inspector folder containing the suites to sync

### Optional Secrets

These have default values but can be customized:

- `GHOST_INSPECTOR_SUITE_URL_TEMPLATE`: URL template for fetching suite data (default: `https://api.ghostinspector.com/v1/suites/{suiteId}/?apiKey={apiKey}&format=json`)
- `GHOST_INSPECTOR_EXPORT_URL_TEMPLATE`: URL template for exporting suite tests (default: `https://api.ghostinspector.com/v1/suites/{suiteId}/export/json/?apiKey={apiKey}`)
- `GHOST_INSPECTOR_FOLDER_URL_TEMPLATE`: URL template for fetching folder suites (default: `https://api.ghostinspector.com/v1/folders/{folderId}/suites/?apiKey={apiKey}`)

## How It Works

1. Fetches the list of suites from the specified Ghost Inspector folder
2. For each suite:
   - Sanitizes the suite name to create a valid folder name (replaces `/` with `-`)
   - Downloads the test files as a ZIP archive
   - Extracts and syncs files to a local folder named after the sanitized suite name
   - Saves suite metadata to `suite.json`
3. Updates a mapping file (`scripts/suite-mapping.json`) to track suite IDs and sanitized folder names
4. Handles folder renames if suite names change

## File Structure

After running, your repository will contain:
- `scripts/suite-mapping.json`: Maps suite IDs to sanitized folder names
- Folders for each suite (with sanitized names) containing test files and `suite.json`

