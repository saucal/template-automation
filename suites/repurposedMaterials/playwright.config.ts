import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

export default defineConfig({
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
    trace: 'on',
    screenshot: 'only-on-failure',
    video: { mode: 'on' },
    launchOptions: { slowMo: 250 },
    ignoreHTTPSErrors: true,
  },
  globalSetup: './global-setup.ts',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
