// Vesica Institute (Vesica brand) — single Kinsta-hosted WooCommerce site.
// Pur Crystal is a SEPARATE branch/project (feat/purcrystal-playwright-refactor),
// core duplicated. DOM-first suite, no WC REST. Auth is lazy per-host (admin-login.ts,
// keyed on the project name → auth/admin-vesica.json) — no globalSetup here.
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: 'specs',
  timeout: 240_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list'],
  ],
  use: {
    trace: 'on',
    video: 'on',
    screenshot: 'off',
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
    launchOptions: { slowMo: 250 },
  },
  projects: [
    {
      // Project name doubles as the auth-state key (auth/admin-vesica.json).
      name: 'vesica',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.BASE_URL },
    },
  ],
});
