// Template for serial-chain state persistence + skip-guard.
// Each chain test reads / writes auth/chain-<projectName>-<testId>.json so
// mid-chain tests can run standalone after a successful seed run.
import fs from 'fs';
import path from 'path';

export interface ChainState {
  sharedEmail: string;
  sharedVaultedShopperId?: string;
  // ...add per-suite fields
}

const CHAIN_DIR = path.join(__dirname, '..', 'auth');

export function chainFile(projectName: string, testId: string): string {
  return path.join(CHAIN_DIR, `chain-${projectName}-${testId}.json`);
}

export function saveChainState(projectName: string, testId: string, state: ChainState): void {
  fs.mkdirSync(CHAIN_DIR, { recursive: true });
  fs.writeFileSync(chainFile(projectName, testId), JSON.stringify(state, null, 2));
}

export function loadChainState(projectName: string, testId: string): ChainState | null {
  const f = chainFile(projectName, testId);
  if (!fs.existsSync(f)) return null;
  try { return JSON.parse(fs.readFileSync(f, 'utf-8')) as ChainState; } catch { return null; }
}

// Usage in spec:
//
//   test.describe.serial('CHAIN-001 — vaulted shopper chain', () => {
//     let state: ChainState;
//     test.beforeAll(async ({}, workerInfo) => {
//       state = loadChainState(workerInfo.project.name, 'CHAIN-001') ?? { sharedEmail: '' };
//     });
//     test.beforeEach(async ({}, testInfo) => {
//       if (!testInfo.title.startsWith('CHAIN-001-seed')) {
//         test.skip(!state.sharedVaultedShopperId,
//           'Requires CHAIN-001-seed to have run first');
//       }
//     });
//     test('CHAIN-001-seed', async (...) => { /* populate state then save */ });
//     test('CHAIN-001-reuse', async (...) => { /* read state.sharedVaultedShopperId */ });
//   });
