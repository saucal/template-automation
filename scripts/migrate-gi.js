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
 *   --tests   .             (project root — where package.json and node_modules live)
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
const TESTS_DIR   = path.resolve(getArg('--tests',   '.'));   // where node_modules lives (project root)

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

// Strip scheme+host from a GI startUrl so page.goto() uses a relative path.
function toRelativePath(urlStr) {
  if (!urlStr) return '/';
  try {
    const u = new URL(urlStr);
    return (u.pathname + u.search + u.hash) || '/';
  } catch {
    return urlStr; // already a relative path
  }
}

// ─── Load all GI tests ────────────────────────────────────────────────────────

const testMap = {}; // testId → parsed JSON
const suiteStartUrls = {}; // suiteName → startUrl
const suiteViewports = {}; // suiteName → { width, height }
const suiteScreenshotThresholds = {}; // suiteName → maxDiffPixelRatio
const suiteVariables = {}; // suiteName → [{ name, value, private }]
let orgVariables = [];     // organization-level variables (lowest priority)

function loadDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      loadDir(full);
    } else if (entry.name.endsWith('.json')) {
      try {
        const data = JSON.parse(fs.readFileSync(full, 'utf8'));
        if (entry.name === 'suite.json') {
          const suite = data.data ?? data;
          if (suite.name) {
            if (suite.startUrl) suiteStartUrls[suite.name] = suite.startUrl;
            if (suite.viewportSize) suiteViewports[suite.name] = suite.viewportSize;
            if (suite.screenshotCompareEnabled && suite.screenshotCompareThreshold != null) {
              suiteScreenshotThresholds[suite.name] = suite.screenshotCompareThreshold;
            }
            if (Array.isArray(suite.variables)) {
              const usable = suite.variables.filter(v => !/\{\{/.test(v.value.replace(/\{\{alphanumeric\}\}/g, '')));
              if (usable.length > 0) suiteVariables[suite.name] = usable;
            }
          }
        } else if (data._gi?.testId) {
          testMap[data._gi.testId] = data;
        }
      } catch (e) {
        console.warn(`  ⚠ Could not parse ${full}: ${e.message}`);
      }
    }
  }
}

// Load organization-level variables from _organization.json
const orgFile = path.join(SUITES_DIR, '_organization.json');
if (fs.existsSync(orgFile)) {
  try {
    const orgData = JSON.parse(fs.readFileSync(orgFile, 'utf8'));
    if (Array.isArray(orgData.variables)) {
      orgVariables = orgData.variables.filter(v => !/\{\{/.test(v.value.replace(/\{\{alphanumeric\}\}/g, '')));
    }
  } catch { /* ignore malformed file */ }
}

loadDir(SUITES_DIR);
console.log(`\nLoaded ${Object.keys(testMap).length} GI tests from ${SUITES_DIR}\n`);

// ─── Variable helpers ─────────────────────────────────────────────────────────

// Returns the safe TypeScript property access for a GI variable name.
// e.g. 'foo' → 'vars.foo', '3ds' → "vars['3ds']", 'a-b' → "vars['a-b']"
function varProp(name) {
  return /^[a-zA-Z_$][\w$]*$/.test(name) ? `vars.${name}` : `vars['${name}']`;
}

// Convert camelCase/PascalCase variable name to SCREAMING_SNAKE_CASE for env vars.
// e.g. payPalPass → PAY_PAL_PASS, password2 → PASSWORD2
function toEnvVar(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toUpperCase();
}

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
  return str.replace(/\{\{(\w+)\}\}/g, (_, n) => `\${${varProp(n)} ?? ''}`);
}

// Replace GI {{varName}} with vars.varName — for code inside page.evaluate() bodies.
// Quoted forms '{{x}}' / "{{x}}" have their surrounding quotes removed too.
// Template literal forms `...{{x}}...` keep the backticks but use ${vars.x}.
function interpolateForBrowser(str) {
  if (!str) return '';
  // Quoted forms: '{{x}}' / "{{x}}" → vars.x (strip surrounding quotes)
  str = str.replace(/['"](\{\{(\w+)\}\})['"]/g, (_, __, n) => varProp(n));
  // Template literal context: `...{{x}}...` → `...${vars.x}...`
  // [^`]* matches any char including newlines except backtick, covering multi-line tpls.
  str = str.replace(/`[^`]*`/g, tpl => tpl.replace(/\{\{(\w+)\}\}/g, (_, n) => `\${${varProp(n)}}`));
  // Bare {{x}} anywhere else → vars.x
  str = str.replace(/\{\{(\w+)\}\}/g, (_, n) => varProp(n));
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
      lines.push(ind + `if (await page.evaluate((vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); ` + cond + ` }, vars)) {`);
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
        // Known helpers replaced with native Playwright equivalents
        if (/^page.?full.?loaded$/i.test(ref.name.trim())) {
          lines.push(`${ind}await page.waitForLoadState('load');`);
          break;
        }

        // importOnly test → call the generated helper function
        if (!imports[helper.slug]) imports[helper.slug] = new Set();
        imports[helper.slug].add(helper.fnName);
        lines.push(`${ind}await ${helper.fnName}(page, vars);`);
      } else {
        // Non-importOnly test → inline its steps (with comment markers)
        lines.push(`${ind}// ↓ ${ref.name}`);
        const childChain = new Set(chain).add(value);
        lines.push(...genSteps(ref.steps, ind, childChain, imports));
        lines.push(`${ind}// ↑ end ${ref.name}`);
      }
      break;
    }

    // ── Assertions ──────────────────────────────────────────────────────────
    case 'assertElementPresent':
      // At least one element matches — not.toHaveCount(0) avoids strict mode violations
      lines.push(`${ind}await expect(${loc}).not.toHaveCount(0);`);
      break;

    case 'assertElementNotPresent':
      lines.push(`${ind}await expect(${loc}).toHaveCount(0);`);
      break;

    case 'assertElementVisible':
      lines.push(`${ind}await expect(${loc}.first()).toBeVisible();`);
      break;

    case 'assertElementNotVisible':
      lines.push(`${ind}await expect(${loc}.first()).not.toBeVisible();`);
      break;

    case 'assertText':
      lines.push(`${ind}await expect(${loc}.first()).toHaveText(${tpl(value)});`);
      break;

    case 'assertTextPresent':
      lines.push(`${ind}await expect(${loc}.first()).toContainText(${tpl(value)});`);
      break;

    case 'assertEval': {
      const code = interpolateForBrowser(value);
      lines.push(ind + `expect(await page.evaluate((vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); ` + code + ` }, vars)).toBeTruthy();`);
      break;
    }

    case 'eval': {
      const code = interpolateForBrowser(value);
      lines.push(ind + `await page.evaluate((vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); ` + code + ` }, vars);`);
      break;
    }

    case 'assertVariable':
      lines.push(`${ind}expect(vars.${variableName}).toBe(${tpl(value)});`);
      break;

    // ── Interactions ────────────────────────────────────────────────────────
    case 'click': {
      const rawSel = Array.isArray(target) ? (target[0]?.selector || '') : (target || '');
      // GI pattern for Select2 dropdowns: click parent select, then click option[value="..."].
      // Convert the option click to selectOption() on the parent; skip the preceding select click.
      const optionMatch = rawSel.match(/^(.+?)\s*>\s*option\[value=["']?(.+?)["']?\]$/i);
      if (optionMatch) {
        // click on "parent > option[value='X']" → selectOption('X') on parent
        const parentLoc = singleLocator(optionMatch[1].trim());
        const optVal = tpl(optionMatch[2]);
        lines.push(`${ind}await ${parentLoc}.first().selectOption(${optVal});`);
      } else if (/^select[\s#.\[]/i.test(rawSel.trim())) {
        // Click on a <select> element — skip, selectOption() doesn't need the dropdown open.
        lines.push(`${ind}// skipped: select-open click on '${rawSel}' — use selectOption instead`);
      } else {
        lines.push(`${ind}await ${loc}.first().click();`);
      }
      break;
    }

    case 'assign': {
      const rawSel = Array.isArray(target) ? (target[0]?.selector || '') : (target || '');
      if (/input\[type=["']?file["']?\]/i.test(rawSel)) {
        // File upload — GI value is a URL; Playwright needs a local path or buffer.
        lines.push(`${ind}// TODO: file upload — replace URL with a local file path or fetch buffer`);
        lines.push(`${ind}await ${loc}.first().setInputFiles(${tpl(value)});`);
      } else {
        // Most targets are text inputs; some are <select> — try fill(), fall back to selectOption().
        lines.push(`${ind}try { await ${loc}.first().fill(${tpl(value)}); } catch { await ${loc}.first().selectOption(${tpl(value)}); }`);
      }
      break;
    }

    case 'mouseOver':
    case 'hover':
      lines.push(`${ind}await ${loc}.first().hover();`);
      break;

    case 'scrollTo':
      lines.push(`${ind}await ${loc}.first().scrollIntoViewIfNeeded();`);
      break;

    case 'select':
      lines.push(`${ind}await ${loc}.first().selectOption(${tpl(value)});`);
      break;

    case 'check':
      lines.push(`${ind}await ${loc}.first().check();`);
      break;

    case 'uncheck':
      lines.push(`${ind}await ${loc}.first().uncheck();`);
      break;

    case 'type':
    case 'sendKeys':
      lines.push(`${ind}await ${loc}.first().pressSequentially(${tpl(value)});`);
      break;

    case 'clear':
      lines.push(`${ind}await ${loc}.first().clear();`);
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
      lines.push(`${ind}await page.waitForTimeout(${ms}); // TODO: replace with a proper wait`);
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
        lines.push(ind + `vars.${variableName} = String(await page.evaluate((vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); ` + code + ` }, vars));`);
      }
      break;
    }

    // ── Screenshots ──────────────────────────────────────────────────────────
    case 'screenshotComparison': {
      const name = slugify(value || 'screenshot');
      lines.push(`${ind}await expect(page).toHaveScreenshot(${singleQuote(`${name}.png`)}, { fullPage: true });`);
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
 *
 * @param {object[]} steps   - GI step objects
 * @param {string}   indent  - current indentation string
 * @param {Set}      chain   - testIds on the call stack (cycle guard); pass new Set() at top level
 * @param {object}   imports - accumulated imports: { helperSlug → Set<fnName> }
 */
function genSteps(steps, indent, chain, imports) {
  const lines = [];
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const nextStep = steps[i + 1];

    // Detect Select2 two-step pattern:
    //   step[i]:   click('#billing_country')                         ← opens the dropdown
    //   step[i+1]: click('#billing_country > option[value="US"]')    ← picks the value
    // Skip step[i] because step[i+1] will be converted to selectOption() on the parent.
    if (step.command === 'click' && nextStep?.command === 'click') {
      const rawSel     = Array.isArray(step.target)     ? (step.target[0]?.selector     || '') : (step.target     || '');
      const nextRawSel = Array.isArray(nextStep.target) ? (nextStep.target[0]?.selector || '') : (nextStep.target || '');
      const optMatch   = nextRawSel.match(/^(.+?)\s*>\s*option\[value=["']?(.+?)["']?\]$/i);
      if (optMatch && optMatch[1].trim() === rawSel.trim()) {
        // Skip this "open select" click — the next step handles the value via selectOption()
        lines.push(`${indent}// skipped: select-open click on '${rawSel}' (Select2 pattern)`);
        continue;
      }
    }

    lines.push(...genStep(step, indent, chain, imports));
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
      const stepLines = genSteps(t.steps, '  ', new Set(), stepImports);

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

      const startUrl = t.startUrl || suiteStartUrls[suiteName];
      if (startUrl) {
        const relPath = toRelativePath(startUrl);
        stepLines.push(`    await page.goto(\`${escInner(interpolate(relPath))}\`);`);
        stepLines.push(`    await page.waitForLoadState('load');`);
      }

      stepLines.push('');
      stepLines.push(...genSteps(t.steps, '    ', new Set(), stepImports));

      // Merge step-level imports
      for (const [s, fns] of Object.entries(stepImports)) {
        if (!fileImports[s]) fileImports[s] = new Set();
        for (const f of fns) fileImports[s].add(f);
      }

      bodyLines.push(`  test(${singleQuote(t.name)}, async ({ page }) => {`);
      bodyLines.push(...stepLines);
      bodyLines.push(`  });`);
      bodyLines.push('');
    }

    // vars declared at describe scope so values persist across sequential tests.
    // Proxy returns '' for missing keys, matching GI's default-to-empty-string behaviour.
    // Priority (lowest → highest): org vars → suite vars (suite vars override org vars by key).
    const svars = suiteVariables[suiteName] || [];
    const suiteVarNames = new Set(svars.map(v => v.name));
    const mergedVars = [
      ...orgVariables.filter(v => !suiteVarNames.has(v.name)),
      ...svars,
    ];
    const hasPrivateVars = mergedVars.some(v => v.private);

    // Assemble final file with imports
    const lines = [
      `// Auto-generated from Ghost Inspector suite: "${suiteName}"`,
      `// Review all TODOs before running.`,
    ];
    if (hasPrivateVars) {
      lines.push(`import dotenv from 'dotenv';`);
      lines.push(`dotenv.config();`);
    }
    lines.push(`import { test, expect } from '@playwright/test';`);

    for (const [s, fns] of Object.entries(fileImports).sort()) {
      lines.push(`import { ${[...fns].sort().join(', ')} } from '../helpers/${s}';`);
    }

    // Build describe-scope vars block
    const proxyHandler = `{ get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') }`;
    const varsDecl = [];
    if (mergedVars.length > 0) {
      varsDecl.push(`  const vars = new Proxy<Record<string, string>>({`);
      for (const v of mergedVars) {
        if (v.private) {
          varsDecl.push(`    ${JSON.stringify(v.name)}: process.env.${toEnvVar(v.name)} ?? '',`);
        } else if (/\{\{alphanumeric\}\}/.test(v.value)) {
          const escaped = v.value.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
          const tplVal = escaped.replace(/\{\{alphanumeric\}\}/g, '${Math.random().toString(36).substring(2, 10)}');
          varsDecl.push(`    ${JSON.stringify(v.name)}: \`${tplVal}\`,`);
        } else {
          varsDecl.push(`    ${JSON.stringify(v.name)}: ${JSON.stringify(v.value)},`);
        }
      }
      varsDecl.push(`  }, ${proxyHandler});`);
    } else {
      varsDecl.push(`  const vars = new Proxy<Record<string, string>>({}, ${proxyHandler});`);
    }

    lines.push('');
    lines.push(`test.describe(${singleQuote(suiteName)}, () => {`);
    lines.push('');
    lines.push(...varsDecl);
    lines.push('');
    lines.push(...bodyLines);
    lines.push(`});`);
    lines.push('');

    fs.writeFileSync(outFile, lines.join('\n'));
    console.log(`✓  specs/${slug}.spec.ts  (${runnable.length} tests)`);
  }
}

// ─── Ensure tests/ has a package.json and node_modules ───────────────────────

mkdirp(TESTS_DIR);
const testsPkg = path.join(TESTS_DIR, 'package.json');
let testsPkgCreated = false;
if (!fs.existsSync(testsPkg)) {
  testsPkgCreated = true;
  const repoName = path.basename(path.resolve('.')).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const pkg = {
    name: `${repoName}-playwright`,
    version: '1.0.0',
    private: true,
    scripts: {
      test: 'playwright test',
      'setup:browsers': 'playwright install chromium',
    },
    dependencies: {
      dotenv: '^16.0.0',
    },
    devDependencies: {
      '@playwright/test': '^1.49.0',
      '@types/node': '^20.0.0',
    },
  };
  fs.writeFileSync(testsPkg, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✓  Created ${testsPkg}`);
}
if (testsPkgCreated || !fs.existsSync(path.join(TESTS_DIR, 'node_modules'))) {
  const { execSync } = require('child_process');
  console.log('  Running npm init playwright@latest ...');
  execSync(
    'npm init playwright@latest --yes -- . --quiet --browser=chromium --browser=firefox --browser=webkit --lang=ts --gha',
    { cwd: TESTS_DIR, stdio: 'inherit' }
  );
  console.log('✓  Playwright init done');
}

// ─── playwright.config.ts ─────────────────────────────────────────────────────

const relSpecsDir = path.relative(TESTS_DIR, path.join(OUT_DIR, 'specs')).replace(/\\/g, '/');
const playwrightConfig = path.join(TESTS_DIR, 'playwright.config.ts');
{
  function mostCommon(values) {
    if (values.length === 0) return null;
    const counts = {};
    for (const v of values) { const k = JSON.stringify(v); counts[k] = (counts[k] || 0) + 1; }
    return JSON.parse(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]);
  }
  const viewport           = mostCommon(Object.values(suiteViewports));
  const screenshotThreshold = mostCommon(Object.values(suiteScreenshotThresholds));

  const configContent = [
    `import { defineConfig, devices } from '@playwright/test';`,
    `import dotenv from 'dotenv';`,
    `import path from 'path';`,
    ``,
    `dotenv.config({ path: path.join(__dirname, '.env') });`,
    ``,
    `export default defineConfig({`,
    `  testDir: '${relSpecsDir}',`,
    `  timeout: 240_000,`,
    `  expect: {`,
    `    timeout: 15_000,`,
    ...(screenshotThreshold != null ? [`    toHaveScreenshot: { maxDiffPixelRatio: ${screenshotThreshold} },`] : []),
    `  },`,
    `  fullyParallel: false,`,
    `  workers: 1,`,
    `  retries: process.env.CI ? 1 : 0,`,
    `  reporter: [`,
    `    ['html', { outputFolder: 'reports', open: 'never' }],`,
    `    ['list'],`,
    `  ],`,
    `  use: {`,
    `    baseURL: process.env.BASE_URL,`,
    ...(viewport ? [`    viewport: { width: ${viewport.width}, height: ${viewport.height} },`] : []),
    `    actionTimeout: 15_000,`,
    `    trace: 'on',`,
    `    screenshot: 'on',`,
    `    video: { mode: 'on' },`,
    `    launchOptions: { slowMo: 250 },`,
    `    ignoreHTTPSErrors: true,`,
    `  },`,
    `  globalSetup: './global-setup.ts',`,
    `  projects: [`,
    `    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },`,
    `  ],`,
    `});`,
    ``,
  ].join('\n');
  fs.writeFileSync(playwrightConfig, configContent);
  console.log(`✓  Updated ${playwrightConfig}`);
}

// ─── Root tsconfig.json (covers playwright.config.ts + global-setup.ts) ───────
const rootTsconfig = path.join(TESTS_DIR, 'tsconfig.json');
if (!fs.existsSync(rootTsconfig)) {
  const rootTsconfigContent = {
    compilerOptions: {
      target: 'ESNext',
      module: 'ESNext',
      moduleResolution: 'bundler',
      lib: ['ESNext', 'DOM'],
      strict: false,
      esModuleInterop: true,
      typeRoots: ['node_modules/@types'],
    },
    include: ['playwright.config.ts', 'global-setup.ts'],
  };
  fs.writeFileSync(rootTsconfig, JSON.stringify(rootTsconfigContent, null, 2) + '\n');
  console.log(`✓  Created ${rootTsconfig}`);
}

// ─── global-setup.ts ─────────────────────────────────────────────────────────
const globalSetup = path.join(TESTS_DIR, 'global-setup.ts');
if (!fs.existsSync(globalSetup)) {
  const gsContent = [
    `import { chromium } from '@playwright/test';`,
    `import path from 'path';`,
    `import fs from 'fs';`,
    `import dotenv from 'dotenv';`,
    ``,
    `dotenv.config({ path: path.join(__dirname, '.env') });`,
    ``,
    `export default async function globalSetup() {`,
    `  const authDir = path.join(__dirname, 'auth');`,
    `  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });`,
    ``,
    `  const browser = await chromium.launch();`,
    `  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });`,
    `  const page = await ctx.newPage();`,
    ``,
    `  await page.goto(\`\${process.env.BASE_URL}/wp-admin\`);`,
    `  await page.locator('#user_login').fill(process.env.WP_ADMIN_USER!);`,
    `  await page.locator('#user_pass').fill(process.env.ADMIN_PASS!);`,
    `  await page.locator('#wp-submit').click();`,
    `  await page.waitForURL('**/wp-admin/**');`,
    ``,
    `  await ctx.storageState({ path: path.join(authDir, 'admin.json') });`,
    `  await browser.close();`,
    `}`,
    ``,
  ].join('\n');
  fs.writeFileSync(globalSetup, gsContent);
  console.log(`✓  Created ${globalSetup}`);
}

// ─── .env.example ────────────────────────────────────────────────────────────

const envExample = path.join(TESTS_DIR, '.env.example');
if (!fs.existsSync(envExample)) {
  // Collect all private var names across org + all suite variables, deduplicated.
  const allPrivate = new Map(); // envVarName → GI varName
  for (const v of [...orgVariables, ...Object.values(suiteVariables).flat()]) {
    if (v.private) allPrivate.set(toEnvVar(v.name), v.name);
  }

  const lines = [
    '# Base URL of the test site (no trailing slash)',
    'BASE_URL=https://your-test-site.local',
    '',
    '# WordPress admin credentials — used for browser session (global-setup)',
    'WP_ADMIN_USER=admin',
    'ADMIN_PASS=password',
    '',
  ];

  if (allPrivate.size > 0) {
    lines.push('# Test credentials (private GI variables)');
    for (const [envKey] of allPrivate) {
      if (envKey !== 'ADMIN_PASS') lines.push(`${envKey}=`);
    }
    lines.push('');
  }

  fs.writeFileSync(envExample, lines.join('\n'));
  console.log(`✓  Created ${envExample}`);
}

// ─── generated/tsconfig.json (for generated files — relaxed, references root node_modules) ───
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
