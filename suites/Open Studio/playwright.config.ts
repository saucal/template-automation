import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

export default defineConfig({
  // Refactored suite lives in ./specs (generated/ kept for reference, not run).
  testDir: './specs',
  timeout: 240_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.15 },
  },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15_000,
    // Failure-only artifacts: the fixture owns the named per-context shot, so the
    // built-in screenshot is off to avoid a duplicate screenshot.png (rule 25).
    trace: 'on',
    screenshot: 'off',
    video: { mode: 'retain-on-failure' },
    launchOptions: { slowMo: 500 },
    ignoreHTTPSErrors: true,
  },
  globalSetup: './global-setup.ts',
  // Single host. The `setup` project purchases ONE membership (member.setup.ts) and
  // saves auth/member.json + creds; `open-studio` depends on it so the member specs
  // always have a real purchaser to reuse (memberPage / memberCreds fixtures).
  // Relative goto() everywhere (no leading slash). Refund/renew specs are gated by
  // RUN_REFUND / RUN_RENEW via test.skip guards inside the specs — not by testMatch.
  projects: [
    { name: 'setup', testMatch: /member\.setup\.ts/ },
    {
      name: 'open-studio',
      testIgnore: /member\.setup\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
