// tests/playwright.config.ts — woolverine defineProjects builds one project per environment
// (× region). baseURL comes from .env: BASE_URL_<REGION>_<ENV> / BASE_URL_<ENV> / BASE_URL.
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { defineProjects, SNAPSHOT_PATH_TEMPLATE } from 'woolverine';

dotenv.config({ path: path.join(__dirname, '.env') });
// lokinator's heal cache is cwd-relative by default — anchor it next to the suite (it is committed).
process.env.LOKINATOR_CACHE ||= path.join(__dirname, '.lokinator-cache.json');

export default defineConfig({
  testDir: 'specs',
  // Every suite's baselines in specs/visual-baselines/ — never next to the spec.
  snapshotPathTemplate: SNAPSHOT_PATH_TEMPLATE,
  timeout: 240_000,
  expect: { timeout: 15_000, toHaveScreenshot: { maxDiffPixelRatio: 0.1 } },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { outputFolder: 'reports', open: 'never' }], ['list']],
  use: {
    actionTimeout: 15_000,
    navigationTimeout: 60_000, // slow stagings (Kinsta/VIP) regularly take >15s to fire 'load'
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'off', // the woolverine fixture owns one named full-page shot per context on failure
    ignoreHTTPSErrors: true,
    launchOptions: { slowMo: Number(process.env.SLOWMO ?? 0) },
  },
  // ADAPT: environments (['staging'] | ['maintenance', 'main'] …) and regions (['au', 'ca', 'us']) as the site has them.
  projects: defineProjects({ environments: ['staging'] }),
});
