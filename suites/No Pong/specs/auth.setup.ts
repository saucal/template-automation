// Per-site admin authentication. Runs as a `setup-<region>-<tier>` project that each
// test project depends on, so ONLY the site you actually run authenticates (Playwright
// runs the dependency of the selected project). Logs into this project's baseURL host
// and writes auth/admin-<region>-<tier>.json for the matching test project's fixtures.
import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { loginOnHost, originOf, authStatePath } from '../admin-login';

setup('authenticate admin on this site', async ({ page, baseURL }) => {
  const origin = originOf(baseURL);
  if (!origin) {
    throw new Error(`auth.setup: project "${setup.info().project.name}" has no baseURL — set BASE_URL_<REGION>_<TIER> in .env`);
  }
  await loginOnHost(page, origin);
  const out = authStatePath(setup.info().project.name);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.context().storageState({ path: out });
});
