// Vesica Institute — two Kinsta-hosted WooCommerce brands (Vesica + Pur Crystal),
// each modeled as its own Playwright project so specs can target either host
// via `--project`. No WC REST; DOM-first suite. Auth is lazy per-host (added
// in a later task) — no globalSetup here.
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const BRANDS = ['vesica', 'purcrystal'] as const;
type Brand = (typeof BRANDS)[number];

const BASE_URLS: Record<Brand, string | undefined> = {
  vesica: process.env.BASE_URL_VESICA,
  purcrystal: process.env.BASE_URL_PURCRYSTAL,
};

function baseUrlFor(brand: Brand): string | undefined {
  return BASE_URLS[brand];
}

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
      name: 'vesica',
      use: { ...devices['Desktop Chrome'], baseURL: baseUrlFor('vesica') },
    },
    {
      name: 'purcrystal',
      use: { ...devices['Desktop Chrome'], baseURL: baseUrlFor('purcrystal') },
    },
  ],
});
