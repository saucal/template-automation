#!/usr/bin/env node
/**
 * Ghost Inspector → Playwright migration script
 *
 * Usage:
 *   node scripts/migrate-gi.js [--suites <path>] [--output <path>] [--tests <path>]
 *
 * Defaults:
 *   --suites  ./suites
 *   --output  ./generated
 *   --tests   ./tests       (directory containing node_modules with @playwright/test)
 *
 * Output structure:
 *   generated/
 *     helpers/<suite-slug>.ts    ← importOnly suites become helper functions
 *     specs/<suite-slug>.spec.ts ← runnable suites become test specs
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(flag, def) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : def;
}

const SUITES_DIR  = path.resolve(getArg('--suites', './suites'));
const OUT_DIR     = path.resolve(getArg('--output',  './generated'));
const TESTS_DIR   = path.resolve(getArg('--tests',   './tests'));   // where node_modules lives

// ─── Utilities ────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, c => c.toLowerCase());
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// ─── Load all GI tests ────────────────────────────────────────────────────────

const testMap = {}; // testId → parsed JSON

function loadDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      loadDir(full);
    } else if (entry.name.endsWith('.json') && entry.name !== 'suite.json') {
      try {
        const data = JSON.parse(fs.readFileSync(full, 'utf8'));
        if (data._gi?.testId) {
          testMap[data._gi.testId] = data;
        }
      } catch (e) {
        console.warn(`  ⚠ Could not parse ${full}: ${e.message}`);
      }
    }
  }
}

loadDir(SUITES_DIR);
console.log(`\nLoaded ${Object.keys(testMap).length} GI tests from ${SUITES_DIR}\n`);

// ─── Build helper function map ────────────────────────────────────────────────
// For every test that will end up in a helper file, pre-compute its function
// name and helper file slug so that execute steps can emit function calls +
// import statements instead of inlining all referenced steps.
//
// A test is a helper if it has importOnly OR if any sibling in the same suite
// has importOnly (the file generator treats the whole suite as helpers).

const helperFnMap = {}; // testId → { fnName, slug, suiteName }

// First pass: find suites that contain at least one importOnly test
const helperSuites = new Set();
for (const data of Object.values(testMap)) {
  if (data.importOnly) helperSuites.add(data._gi.suiteName);
}

// Second pass: register every test in those suites
for (const [id, data] of Object.entries(testMap)) {
  if (!helperSuites.has(data._gi.suiteName)) continue;
  helperFnMap[id] = {
    fnName: toCamelCase(data.name),
    slug: slugify(data._gi.suiteName),
    suiteName: data._gi.suiteName,
  };
}

// ─── Selector helpers ─────────────────────────────────────────────────────────

function singleLocator(sel) {
  if (!sel) return null;
  sel = sel.trim();
  // Interpolate GI {{vars}} first so selectors like tfoot:nth-of-type({{idx}})
  // become live TypeScript template expressions: tfoot:nth-of-type(${vars.idx ?? ''})
  const escaped = escInner(interpolate(sel));
  const prefix = (sel.startsWith('//') || sel.startsWith('(//')) ? 'xpath=' : '';
  // String concatenation keeps ${...} expressions from being re-evaluated by the
  // generator's own template literals.
  return 'page.locator(`' + prefix + escaped + '`)';
}

function makeLocator(target) {
  if (!target) return null;
  if (Array.isArray(target)) {
    const parts = target.map(t => singleLocator(t.selector)).filter(Boolean);
    if (parts.length === 0) return null;
    if (parts.length === 1) return parts[0];
    // Fallback chain: first.or(second).or(third)...
    return parts.reduce((a, b) => `${a}.or(${b})`);
  }
  return singleLocator(target);
}

// ─── String helpers ───────────────────────────────────────────────────────────

// Escape backslashes and backticks for embedding inside a generated template literal.
// Does NOT escape ${ so that ${vars.x ?? ''} expressions remain live in the output.
function escInner(str) {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
}

// Replace GI {{varName}} with ${vars.varName ?? ''} — for TypeScript template literals
function interpolate(str) {
  if (!str) return '';
  return str.replace(/\{\{(\w+)\}\}/g, (_, n) => `\${vars.${n} ?? ''}`);
}

// Replace GI {{varName}} with vars.varName — for code inside page.evaluate() bodies.
// Quoted forms '{{x}}' / "{{x}}" have their surrounding quotes removed too.
function interpolateForBrowser(str) {
  if (!str) return '';
  str = str.replace(/['"](\{\{(\w+)\}\})['"]/g, (_, __, n) => `vars.${n}`);
  str = str.replace(/\{\{(\w+)\}\}/g, (_, n) => `vars.${n}`);
  return typeDOMQueries(str);
}

// Add TypeScript generics to querySelectorAll/querySelector calls so
// the generated evaluate() bodies don't trigger Element-property errors.
const DOM_TAG_TYPE_MAP = {
  select:   'HTMLSelectElement',
  iframe:   'HTMLIFrameElement',
  input:    'HTMLInputElement',
  a:        'HTMLAnchorElement',
  img:      'HTMLImageElement',
  form:     'HTMLFormElement',
  button:   'HTMLButtonElement',
  textarea: 'HTMLTextAreaElement',
  option:   'HTMLOptionElement',
  table:    'HTMLTableElement',
  tr:       'HTMLTableRowElement',
  td:       'HTMLTableCellElement',
  th:       'HTMLTableCellElement',
};

function typeDOMQueries(code) {
  // Pass 1: Add generics only to document.querySelector(All)? calls
  // (other objects like targetTfoot may be "any", causing "Untyped function calls" errors)
  code = code.replace(
    /document\.querySelector(All)?\(\s*(['"])((?:(?!\2).)*)\2\s*\)/g,
    (match, all, q, selector) => {
      for (const [tag, type] of Object.entries(DOM_TAG_TYPE_MAP)) {
        if (new RegExp(`\\b${tag}\\b`).test(selector)) {
          return `document.querySelector${all || ''}<${type}>(${q}${selector}${q})`;
        }
      }
      return match;
    }
  );

  // Pass 2: Wrap querySelectorAll results in Array.from() when assigned
  // Uses quoted-string matching to handle selectors with parens like :not(script)
  code = code.replace(
    /(=\s*)(\S+?\.querySelectorAll(?:<\w+>)?\(\s*(?:'[^']*'|"[^"]*")\s*\)(?:\s*\|\|\s*\[\])?)/g,
    (match, eq, qsa) => {
      if (qsa.includes('Array.from')) return match;
      return `${eq}Array.from(${qsa})`;
    }
  );

  // Pass 3: Fix Array.from(any) → unknown[] by adding explicit <any> type param
  code = code.replace(/\bArray\.from\(/g, 'Array.from<any>(');

  // Pass 4: Fix .checked on Element → assert as HTMLInputElement
  code = code.replace(/(\w+)\.checked\b/g, '($1 as HTMLInputElement).checked');

  return code;
}

// Build a TypeScript template-literal value: `...${vars.x ?? ''}...`
// Uses string concatenation so the generator template literal never sees the ${.
function tpl(str) {
  if (!str) return '``';
  return '`' + escInner(interpolate(str)) + '`';
}

// JS-safe single-quoted string (for test/describe names)
function singleQuote(str) {
  return `'${str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

// ─── Condition helpers ────────────────────────────────────────────────────────

/**
 * Try to convert a GI condition statement to a pure TypeScript expression
 * so it can be checked without page.evaluate().
 *
 * Returns the TS expression string, or null if the condition requires
 * browser context (DOM queries, etc.).
 */
function conditionToTS(statement) {
  let s = statement.trim();
  // Strip leading "return "
  s = s.replace(/^return\s+/, '');

  // Replace window.location.href → page.url() (synchronous in Playwright)
  s = s.replace(/window\.location\.href/g, 'page.url()');

  // If the condition still accesses the DOM, keep it in page.evaluate
  if (/document\.|querySelector|getElement/.test(s)) {
    return null;
  }

  // Replace quoted and bare GI {{var}} → vars.var
  s = s.replace(/['"]?\{\{(\w+)\}\}['"]?/g, (_, name) => `vars.${name}`);

  // Vars are stored as strings — adjust bare boolean comparisons:
  //   vars.x === true  →  vars.x === 'true'
  s = s.replace(/===\s*true\b/g, "=== 'true'");
  s = s.replace(/===\s*false\b/g, "=== 'false'");
  s = s.replace(/!==\s*true\b/g, "!== 'true'");
  s = s.replace(/!==\s*false\b/g, "!== 'false'");

  return s;
}

// ─── Step code generator ──────────────────────────────────────────────────────

/**
 * Generate TypeScript lines for a single GI step.
 *
 * @param {object}  step    - GI step object
 * @param {string}  indent  - current indentation string
 * @param {Set}     chain   - testIds on the call stack (cycle guard for execute)
 * @param {object}  imports - accumulated imports: { helperSlug → Set<fnName> }
 * @returns {string[]} lines of TypeScript code
 */
function genStep(step, indent, chain, imports) {
  const { command, target, value, condition, variableName, optional } = step;
  const lines = [];
  let ind = indent;

  // ── Optional step wrapper (try/catch) ─────────────────────────────────────
  if (optional) {
    lines.push(`${ind}try {`);
    ind = indent + '  ';
  }

  // ── Conditional wrapper ───────────────────────────────────────────────────
  if (condition?.statement) {
    const tsExpr = conditionToTS(condition.statement);
    if (tsExpr) {
      // Pure TS condition — no browser roundtrip needed
      lines.push(`${ind}if (${tsExpr}) {`);
    } else {
      // Complex condition — needs browser context
      const cond = interpolateForBrowser(condition.statement);
      lines.push(ind + 'if (await page.evaluate((vars: any) => { ' + cond + ' }, vars)) {');
    }
    ind += '  ';
  }

  const loc = makeLocator(target);

  switch (command) {

    // ── Sub-test ────────────────────────────────────────────────────────────
    case 'execute': {
      const ref = testMap[value];
      if (!ref) {
        lines.push(`${ind}// TODO: unresolved GI test ID ${value} — inline steps manually`);
        break;
      }
      if (chain.has(value)) {
        lines.push(`${ind}// Skipped: circular reference to "${ref.name}"`);
        break;
      }

      const helper = helperFnMap[value];
      if (helper) {
        // importOnly test → call the generated helper function
        if (!imports[helper.slug]) imports[helper.slug] = new Set();
        imports[helper.slug].add(helper.fnName);
        lines.push(`${ind}await ${helper.fnName}(page, vars);`);
      } else {
        // Non-importOnly test → inline its steps (with comment markers)
        lines.push(`${ind}// ↓ ${ref.name}`);
        const next = new Set(chain).add(value);
        for (const s of ref.steps) {
          lines.push(...genStep(s, ind, next, imports));
        }
        lines.push(`${ind}// ↑ end ${ref.name}`);
      }
      break;
    }

    // ── Assertions ──────────────────────────────────────────────────────────
    case 'assertElementPresent':
      // Element exists in DOM — does not need to be visible
      lines.push(`${ind}await expect(${loc}).toBeAttached();`);
      break;

    case 'assertElementNotPresent':
      lines.push(`${ind}await expect(${loc}).not.toBeAttached();`);
      break;

    case 'assertElementVisible':
      lines.push(`${ind}await expect(${loc}).toBeVisible();`);
      break;

    case 'assertElementNotVisible':
      lines.push(`${ind}await expect(${loc}).not.toBeVisible();`);
      break;

    case 'assertText':
      lines.push(`${ind}await expect(${loc}).toHaveText(${tpl(value)});`);
      break;

    case 'assertTextPresent':
      lines.push(`${ind}await expect(${loc}).toContainText(${tpl(value)});`);
      break;

    case 'assertEval': {
      const code = interpolateForBrowser(value);
      lines.push(ind + 'expect(await page.evaluate((vars: any) => { ' + code + ' }, vars)).toBeTruthy();');
      break;
    }

    case 'eval': {
      const code = interpolateForBrowser(value);
      lines.push(ind + 'await page.evaluate((vars: any) => { ' + code + ' }, vars);');
      break;
    }

    case 'assertVariable':
      lines.push(`${ind}expect(vars.${variableName}).toBe(${tpl(value)});`);
      break;

    // ── Interactions ────────────────────────────────────────────────────────
    case 'click':
      lines.push(`${ind}await ${loc}.click();`);
      break;

    case 'assign':
      lines.push(`${ind}await ${loc}.fill(${tpl(value)});`);
      break;

    case 'mouseOver':
    case 'hover':
      lines.push(`${ind}await ${loc}.hover();`);
      break;

    case 'scrollTo':
      lines.push(`${ind}await ${loc}.scrollIntoViewIfNeeded();`);
      break;

    case 'select':
      lines.push(`${ind}await ${loc}.selectOption(${tpl(value)});`);
      break;

    case 'check':
      lines.push(`${ind}await ${loc}.check();`);
      break;

    case 'uncheck':
      lines.push(`${ind}await ${loc}.uncheck();`);
      break;

    case 'type':
    case 'sendKeys':
      lines.push(`${ind}await ${loc}.pressSequentially(${tpl(value)});`);
      break;

    case 'clear':
      lines.push(`${ind}await ${loc}.clear();`);
      break;

    // ── Navigation ──────────────────────────────────────────────────────────
    case 'open':
    case 'navigate': {
      const url = tpl(value || target);
      lines.push(`${ind}await page.goto(${url});`);
      lines.push(`${ind}await page.waitForLoadState('load');`);
      break;
    }

    case 'refresh':
    case 'reload':
      lines.push(`${ind}await page.reload();`);
      lines.push(`${ind}await page.waitForLoadState('load');`);
      break;

    case 'goBack':
      lines.push(`${ind}await page.goBack();`);
      break;

    // ── Waits ────────────────────────────────────────────────────────────────
    case 'waitForElement':
    case 'waitForElementPresent':
      lines.push(`${ind}await ${loc}.waitFor({ state: 'attached' });`);
      break;

    case 'waitForElementNotPresent':
      lines.push(`${ind}await ${loc}.waitFor({ state: 'detached' });`);
      break;

    case 'pause': {
      const ms = parseInt(value, 10) || 1000;
      lines.push(`${ind}await page.waitForTimeout(${ms});`);
      break;
    }

    // ── Variables ────────────────────────────────────────────────────────────
    case 'store':
      if (variableName) {
        lines.push(`${ind}vars.${variableName} = ${tpl(value)};`);
      }
      break;

    case 'extract':
      if (variableName && loc) {
        lines.push(`${ind}vars.${variableName} = ((await ${loc}.textContent()) ?? '').trim();`);
      }
      break;

    case 'extractEval': {
      const code = interpolateForBrowser(value);
      if (variableName) {
        lines.push(ind + `vars.${variableName} = String(await page.evaluate((vars: any) => { ` + code + ` }, vars));`);
      }
      break;
    }

    // ── Screenshots ──────────────────────────────────────────────────────────
    case 'screenshotComparison': {
      const name = slugify(value || 'screenshot');
      lines.push(`${ind}await expect(page).toHaveScreenshot(${singleQuote(`${name}.png`)}, { fullPage: true });`);
      break;
    }

    case 'screenshot': {
      if (loc) {
        lines.push(`${ind}await ${loc}.screenshot();`);
      } else {
        lines.push(`${ind}await page.screenshot();`);
      }
      break;
    }

    // ── Keyboard ─────────────────────────────────────────────────────────────
    case 'keypress': {
      const keyMap = { '8': 'Backspace', '9': 'Tab', '13': 'Enter', '27': 'Escape', '46': 'Delete' };
      const key = keyMap[value] || value;
      lines.push(`${ind}await page.keyboard.press(${singleQuote(key)});`);
      break;
    }

    // ── Fallback ─────────────────────────────────────────────────────────────
    default:
      lines.push(`${ind}// TODO: command=${JSON.stringify(command)} target=${JSON.stringify(target)} value=${JSON.stringify(value)}`);
  }

  // Close conditional
  if (condition?.statement) {
    ind = ind.slice(2);
    lines.push(`${ind}}`);
  }

  // Close optional try/catch
  if (optional) {
    lines.push(`${indent}} catch { /* optional step: ${command} */ }`);
  }

  return lines;
}

/**
 * Generate TypeScript lines for an array of GI steps.
 * Each top-level step starts with a fresh cycle-guard chain.
 */
function genSteps(steps, indent, imports) {
  const lines = [];
  for (const step of steps) {
    lines.push(...genStep(step, indent, new Set(), imports));
  }
  return lines;
}

// ─── Group tests by suite ─────────────────────────────────────────────────────

const suites = {}; // suiteName → test[]

for (const data of Object.values(testMap)) {
  const name = data._gi.suiteName;
  if (!suites[name]) suites[name] = [];
  suites[name].push(data);
}

for (const tests of Object.values(suites)) {
  tests.sort((a, b) => a.name.localeCompare(b.name));
}

// ─── Generate files ───────────────────────────────────────────────────────────

for (const [suiteName, tests] of Object.entries(suites)) {
  // If ANY test in the suite is importOnly it's a shared-helper suite — treat all as helpers.
  // This handles "Common Steps" suites where some entries have importOnly:false by mistake.
  const anyImportOnly = tests.some(t => t.importOnly);
  const slug = slugify(suiteName);

  // ── Helpers file (importOnly suite) ─────────────────────────────────────────
  if (anyImportOnly) {
    const outFile = path.join(OUT_DIR, 'helpers', `${slug}.ts`);
    mkdirp(path.dirname(outFile));

    const fileImports = {}; // helperSlug → Set<fnName>
    const bodyLines = [];

    for (const t of tests) {
      const fn = toCamelCase(t.name);
      const stepImports = {};
      const stepLines = genSteps(t.steps, '  ', stepImports);

      // Merge step-level imports, skipping self-references
      for (const [s, fns] of Object.entries(stepImports)) {
        if (s === slug) continue; // same file — no import needed
        if (!fileImports[s]) fileImports[s] = new Set();
        for (const f of fns) fileImports[s].add(f);
      }

      bodyLines.push(`// GI: "${t.name}" (${t._gi.testId})`);
      bodyLines.push(`export async function ${fn}(page: Page, vars: Record<string, string> = {}): Promise<void> {`);
      bodyLines.push(...stepLines);
      bodyLines.push(`}`);
      bodyLines.push('');
    }

    // Assemble final file with imports
    const lines = [
      `// Auto-generated from Ghost Inspector suite: "${suiteName}"`,
      `// Review all TODOs before using in production.`,
      `import { expect, type Page } from '@playwright/test';`,
    ];

    for (const [s, fns] of Object.entries(fileImports).sort()) {
      lines.push(`import { ${[...fns].sort().join(', ')} } from './${s}';`);
    }

    lines.push('', ...bodyLines);

    fs.writeFileSync(outFile, lines.join('\n'));
    console.log(`✓  helpers/${slug}.ts  (${tests.length} functions)`);

  // ── Spec file (runnable suite) ───────────────────────────────────────────────
  } else {
    const outFile = path.join(OUT_DIR, 'specs', `${slug}.spec.ts`);
    mkdirp(path.dirname(outFile));

    const runnable = tests.filter(t => !t.importOnly);
    const fileImports = {}; // helperSlug → Set<fnName>
    const bodyLines = [];

    for (const t of runnable) {
      const stepImports = {};
      const stepLines = [];

      if (t.startUrl) {
        stepLines.push(`    await page.goto(\`${escInner(interpolate(t.startUrl))}\`);`);
        stepLines.push(`    await page.waitForLoadState('load');`);
      }

      stepLines.push('');
      stepLines.push(...genSteps(t.steps, '    ', stepImports));

      // Merge step-level imports
      for (const [s, fns] of Object.entries(stepImports)) {
        if (!fileImports[s]) fileImports[s] = new Set();
        for (const f of fns) fileImports[s].add(f);
      }

      bodyLines.push(`  test(${singleQuote(t.name)}, async ({ page }) => {`);
      bodyLines.push(`    const vars: Record<string, string> = {};`);
      bodyLines.push(...stepLines);
      bodyLines.push(`  });`);
      bodyLines.push('');
    }

    // Assemble final file with imports
    const lines = [
      `// Auto-generated from Ghost Inspector suite: "${suiteName}"`,
      `// Review all TODOs before running.`,
      `import { test, expect } from '@playwright/test';`,
    ];

    for (const [s, fns] of Object.entries(fileImports).sort()) {
      lines.push(`import { ${[...fns].sort().join(', ')} } from '../helpers/${s}';`);
    }

    lines.push('');
    lines.push(`test.describe.serial(${singleQuote(suiteName)}, () => {`);
    lines.push('');
    lines.push(...bodyLines);
    lines.push(`});`);
    lines.push('');

    fs.writeFileSync(outFile, lines.join('\n'));
    console.log(`✓  specs/${slug}.spec.ts  (${runnable.length} tests)`);
  }
}

// ─── Generated tsconfig.json ──────────────────────────────────────────────────
// Extends the main tests/ config for module resolution, but relaxes strict mode
// since this is auto-generated code that will be refactored later.
const relTests = path.relative(OUT_DIR, TESTS_DIR).replace(/\\/g, '/');
const tsconfig = {
  compilerOptions: {
    target: 'ESNext',
    module: 'ESNext',
    moduleResolution: 'bundler',
    lib: ['ESNext', 'DOM'],
    strict: false,
    esModuleInterop: true,
    typeRoots: [`${relTests}/node_modules/@types`],
    paths: {
      '@playwright/test': [`${relTests}/node_modules/@playwright/test`]
    }
  },
  include: ['**/*.ts']
};
fs.writeFileSync(path.join(OUT_DIR, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2) + '\n');

// ─── Summary ──────────────────────────────────────────────────────────────────

const todoCount = (() => {
  let n = 0;
  function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scan(full);
      else if (entry.name.endsWith('.ts')) {
        n += (fs.readFileSync(full, 'utf8').match(/\/\/ TODO:/g) || []).length;
      }
    }
  }
  scan(OUT_DIR);
  return n;
})();

// Count helper function calls to show how much inlining was avoided
const helperCallCount = (() => {
  let n = 0;
  function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scan(full);
      else if (entry.name.endsWith('.ts')) {
        n += (fs.readFileSync(full, 'utf8').match(/await \w+\(page, vars\);/g) || []).length;
      }
    }
  }
  scan(OUT_DIR);
  return n;
})();

console.log(`\nDone! Output → ${OUT_DIR}`);
console.log(`TODOs to review: ${todoCount}`);
console.log(`Helper function calls (avoided inlining): ${helperCallCount}`);
console.log(`\nNext steps:`);
console.log(`  1. Fix // TODO comments in generated files`);
console.log(`  2. Refactor helpers into typed functions`);
console.log(`  3. Copy specs/ and helpers/ into your tests/ directory`);
