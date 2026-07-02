// Deployment-tier selector for base URLs. .env holds per-region, per-tier keys:
//   BASE_URL_AU_PREPROD / BASE_URL_AU_DEVELOP / BASE_URL_CA_PREPROD / ... etc.
// Pick the tier with TARGET_ENV (preprod | develop); defaults to preprod:
//   TARGET_ENV=develop npx playwright test --project=au
// Region is still selected with --project (au|ca|us). Both playwright.config.ts and
// global-setup.ts resolve through here, so the admin-login host and the test host
// always share one tier.
import type { Region } from './types/test-config';

const VALID_TIERS = ['preprod', 'develop'];
export const TARGET_ENV = (process.env.TARGET_ENV || 'preprod').toLowerCase();

if (!VALID_TIERS.includes(TARGET_ENV)) {
  throw new Error(`TARGET_ENV="${process.env.TARGET_ENV}" is invalid — use one of: ${VALID_TIERS.join(', ')}`);
}

/** Base URL for a region on the selected tier, or undefined if that key isn't set
 *  (CA/US may be unconfigured; a real goto will surface it). Read at call time so it
 *  resolves after dotenv has loaded .env. */
export function baseUrlFor(region: Region): string | undefined {
  return process.env[`BASE_URL_${region.toUpperCase()}_${TARGET_ENV.toUpperCase()}`];
}
