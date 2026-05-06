// Template for playwright.config.ts — copy into project root, adapt projects[]
// to the suite. WC tests share DB state; default sequential, raise workers
// only after confirming spec isolation.
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

export default defineConfig({
  testDir: './specs',
  timeout: 240_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { outputFolder: 'reports', open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL,
    actionTimeout: 15_000,
    trace: 'on',
    screenshot: 'on',
    video: {
      mode: 'on',
      size: { width: 1280, height: 720 },
      show: {
        actions: { duration: 500, position: 'top-right', fontSize: 14 },
        test: { level: 'step', position: 'bottom', fontSize: 12 },
      },
    },
    launchOptions: { slowMo: 250 },
    ignoreHTTPSErrors: true,
  },
  globalSetup: './global-setup.ts',
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
