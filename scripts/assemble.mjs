#!/usr/bin/env node
// Deterministic assembler for index.html
//
// Modes:
//   node scripts/assemble.mjs            → strict (default, used by step 7)
//                                            requires steps 0–6 validated;
//                                            updates _state.json (step 7 → in_progress)
//   node scripts/assemble.mjs --partial  → best-effort (used by /build auto-preview)
//                                            never fails; missing fragments become
//                                            "Pending — not yet built" placeholders;
//                                            does NOT touch _state.json

import { readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const F = (p) => resolve(ROOT, p);
const PARTIAL = process.argv.includes('--partial') || process.argv.includes('--best-effort');

const STATE = JSON.parse(readFileSync(F('fragments/_state.json'), 'utf8'));

if (!PARTIAL) {
  const required = STATE.pipeline.filter((s) => s.step <= 6);
  const notValid = required.filter((s) => s.status !== 'validated');
  if (notValid.length) {
    console.error('Cannot assemble (strict mode): the following steps are not validated:');
    for (const s of notValid) console.error(`  step ${s.step} (${s.agent}): ${s.status}`);
    console.error('Hint: run `node scripts/assemble.mjs --partial` for a best-effort preview.');
    process.exit(1);
  }
}

const tryRead = (p) => existsSync(F(p)) ? readFileSync(F(p), 'utf8') : null;
const readOrEmpty = (p) => tryRead(p) ?? '';

// In strict mode, every fragment must exist. In partial mode, missing → null.
function loadFragment(path) {
  const text = tryRead(path);
  if (text === null && !PARTIAL) {
    console.error(`Missing fragment: ${path}`);
    process.exit(1);
  }
  return text;
}

const cvData      = loadFragment('fragments/00-cv-data.js');
const designCss   = loadFragment('fragments/01-design-system.css');
const layoutSrc   = loadFragment('fragments/02-layout.html');
const timelineSrc = loadFragment('fragments/03-timeline.html');
const skillsSrc   = loadFragment('fragments/04-skills.html');
const contentSrc  = loadFragment('fragments/05-content.html');
const printCss    = loadFragment('fragments/06-print.css');

// Track what is missing so we can render a banner in the preview
const missing = [];
const checkMissing = (label, src) => { if (src === null) missing.push(label); };
checkMissing('00 cv-data',      cvData);
checkMissing('01 design system', designCss);
checkMissing('02 layout',       layoutSrc);
checkMissing('03 timeline',     timelineSrc);
checkMissing('04 skills',       skillsSrc);
checkMissing('05 content',      contentSrc);
checkMissing('06 print',        printCss);

// Split a fragment into { style, html, script }
function splitFragment(text) {
  if (!text) return { style: '', html: '', script: '' };
  let style = '';
  const styleMatch = text.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    style = styleMatch[1];
    text = text.slice(0, styleMatch.index) + text.slice(styleMatch.index + styleMatch[0].length);
  }

  text = text.replace(/<script\s+src=["'][^"']+["']\s*><\/script>/g, '');

  let script = '';
  const re = /<script>([\s\S]*?)<\/script>/g;
  let last = null, m;
  while ((m = re.exec(text)) !== null) last = m;
  if (last) {
    script = last[1];
    text = text.slice(0, last.index) + text.slice(last.index + last[0].length);
  }

  return { style, html: text.trim(), script };
}

const layout   = splitFragment(layoutSrc);
const timeline = splitFragment(timelineSrc);
const skills   = splitFragment(skillsSrc);
const content  = splitFragment(contentSrc);

function pendingPlaceholder(label) {
  return `<div class="preview-pending" role="note" aria-label="Pending section">
    <strong>${label}</strong> — not yet built. Run the corresponding pipeline step.
  </div>`;
}

function extractDiv(html, id) {
  if (!html) return pendingPlaceholder(id);
  const re = new RegExp(`<div\\s+id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/div>`);
  const m = html.match(re);
  return m ? m[0] : pendingPlaceholder(id);
}

const resumenDiv   = extractDiv(content.html, 'resumen-content');
const proyectosDiv = extractDiv(content.html, 'proyectos-content');
const educacionDiv = extractDiv(content.html, 'educacion-content');

const timelineHtml = timeline.html || pendingPlaceholder('Timeline (#experience)');
const skillsHtml   = skills.html   || pendingPlaceholder('Skills (#skills)');

// Build body — either from the layout scaffold (if 02 exists) or a minimal fallback
function buildBody() {
  if (!layout.html) {
    return `<main class="preview-fallback">
      <h1>CV Preview — bootstrapping</h1>
      <p>The layout fragment (step 2) has not been built yet. The design tokens are loaded so you can verify the colour palette and typography below.</p>
      <section><h2>Resumen</h2>${resumenDiv}</section>
      <section><h2>Experience</h2>${timelineHtml}</section>
      <section><h2>Skills</h2>${skillsHtml}</section>
      <section><h2>Projects</h2>${proyectosDiv}</section>
      <section><h2>Education</h2>${educacionDiv}</section>
    </main>`;
  }

  const replaceOnce = (haystack, needle, replacement) => {
    const idx = haystack.indexOf(needle);
    if (idx === -1) return haystack;
    return haystack.slice(0, idx) + replacement + haystack.slice(idx + needle.length);
  };

  let body = layout.html;
  body = replaceOnce(body, '<!-- ContentAgent -->',  resumenDiv);
  body = replaceOnce(body, '<!-- TimelineAgent -->', timelineHtml);
  body = replaceOnce(body, '<!-- SkillsAgent -->',   skillsHtml);
  body = replaceOnce(body, '<!-- ContentAgent -->',  proyectosDiv);
  body = replaceOnce(body, '<!-- ContentAgent -->',  educacionDiv);
  return body;
}

const body = buildBody();

const profileName  = cvData ? (cvData.match(/name:\s*["']([^"']+)["']/) || [, 'CV'])[1] : 'CV';
const profileTitle = cvData ? (cvData.match(/title:\s*\{\s*es:\s*["']([^"']+)["']/) || [, 'Curriculum Vitae'])[1] : 'Curriculum Vitae';

const previewBanner = (PARTIAL && missing.length) ? `
<div id="preview-banner" role="status" style="position:fixed;top:0;left:0;right:0;z-index:9999;padding:8px 16px;background:#f0883e;color:#0d1117;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;font-weight:600;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.4);">
  PREVIEW (partial) — pending: ${missing.join(', ')}
</div>
<style>body{padding-top:36px}</style>
` : '';

const previewPendingCss = `
.preview-pending {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border: 1px dashed var(--color-divider, #30363d);
  border-radius: 8px;
  background: var(--color-surface, #161b22);
  color: var(--color-text-muted, #8b949e);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 13px;
}
.preview-pending strong { color: var(--color-text, #e6edf3); }
.preview-fallback { max-width: 960px; margin: 2rem auto; padding: 2rem; }
.preview-fallback h1 { font-family: var(--font-display, sans-serif); }
.preview-fallback section { margin-block: 2rem; }
`;

const html = `<!DOCTYPE html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${profileTitle} — CV de ${profileName}">
  <meta property="og:title" content="${profileName} — CV">
  <title>${profileName} — CV${PARTIAL ? ' (preview)' : ''}</title>

  <link rel="preconnect" href="https://api.fontshare.com">
  <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap">

  <style>
/* === DESIGN SYSTEM === */
${designCss || '/* design system not built yet */'}

/* === PREVIEW HELPERS === */
${previewPendingCss}

/* === LAYOUT === */
${layout.style}

/* === TIMELINE === */
${timeline.style}

/* === SKILLS === */
${skills.style}

/* === CONTENT === */
${content.style}

/* === PRINT === */
${printCss || ''}
  </style>
</head>
<body>
${previewBanner}

${body}

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
/* CV_DATA — must be first */
${cvData || '/* CV_DATA not built yet */ window.CV_DATA = window.CV_DATA || {};'}

/* Theme detection */
(function() {
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (!document.documentElement.hasAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();

/* Each fragment script is wrapped in try/catch in partial mode so a single
   broken/missing reference does not blank the whole preview. */
${PARTIAL ? wrapTry('LAYOUT',   layout.script)   : layout.script}
${PARTIAL ? wrapTry('TIMELINE', timeline.script) : timeline.script}
${PARTIAL ? wrapTry('SKILLS',   skills.script)   : skills.script}
${PARTIAL ? wrapTry('CONTENT',  content.script)  : content.script}

if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
</script>
</body>
</html>
`;

function wrapTry(label, code) {
  if (!code.trim()) return `/* ${label} script not built yet */`;
  return `try {\n${code}\n} catch (err) { console.warn('[preview] ${label} script failed:', err); }`;
}

const OUT = F('index.html');
writeFileSync(OUT, html, 'utf8');

const size = statSync(OUT).size;
console.log(`✓ Assembled ${OUT} (${PARTIAL ? 'partial' : 'strict'})`);
console.log(`  size: ${(size / 1024).toFixed(1)} KB`);
if (PARTIAL && missing.length) {
  console.log(`  pending: ${missing.join(', ')}`);
}

// Strict mode: bump step 7 → in_progress. Partial mode: never touch state.
if (!PARTIAL) {
  const stepIdx = STATE.pipeline.findIndex((s) => s.step === 7);
  if (stepIdx >= 0 && STATE.pipeline[stepIdx].status === 'pending') {
    STATE.pipeline[stepIdx].status = 'in_progress';
    STATE.current_step = 7;
    STATE.last_updated = new Date().toISOString().slice(0, 10);
    writeFileSync(F('fragments/_state.json'), JSON.stringify(STATE, null, 2) + '\n', 'utf8');
    console.log('  state: step 7 → in_progress');
  }
}
