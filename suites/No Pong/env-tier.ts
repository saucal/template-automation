// Region × tier matrix for base URLs. .env holds one key per combination:
//   BASE_URL_AU_PREPROD / BASE_URL_AU_DEVELOP / BASE_URL_CA_PREPROD / ... etc.
// playwright.config.ts turns each (region, tier) into its own project — `au-preprod`,
// `au-develop`, … — so the VS Code Test Explorer shows one selectable list per tier
// with the same tests, and the CLI selects with `--project=au-develop`.
import type { Region } from './types/test-config';

export const TIERS = ['preprod', 'develop'] as const;
export type Tier = (typeof TIERS)[number];
export const REGIONS: Region[] = ['au', 'ca', 'us'];

/** Base URL for a region on a tier, or undefined if that key isn't set in .env
 *  (CA/US may be unconfigured; a real goto will surface it). */
export function baseUrlFor(region: Region, tier: Tier): string | undefined {
  return process.env[`BASE_URL_${region.toUpperCase()}_${tier.toUpperCase()}`];
}
