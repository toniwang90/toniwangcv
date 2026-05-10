#!/usr/bin/env node
// Deterministic assembler for toni-wang-cv.html
// Usage: node scripts/assemble.mjs

import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const F = (p) => resolve(ROOT, p);

const STATE = JSON.parse(readFileSync(F('fragments/_state.json'), 'utf8'));

// Verify steps 0..6 are validated
const required = STATE.pipeline.filter((s) => s.step <= 6);
const notValid = required.filter((s) => s.status !== 'validated');
if (notValid.length) {
  console.error('Cannot assemble: the following steps are not validated:');
  for (const s of notValid) console.error(`  step ${s.step} (${s.agent}): ${s.status}`);
  process.exit(1);
}

const read = (p) => readFileSync(F(p), 'utf8');

const cvData      = read('fragments/00-cv-data.js');
const designCss   = read('fragments/01-design-system.css');
const layoutSrc   = read('fragments/02-layout.html');
const timelineSrc = read('fragments/03-timeline.html');
const skillsSrc   = read('fragments/04-skills.html');
const contentSrc  = read('fragments/05-content.html');
const printCss    = read('fragments/06-print.css');

// Split a fragment into { style, html, script }
// - first <style>...</style> block → style
// - last inline <script>...</script> (no src) → script
// - everything else → html (also strips <script src="..."></script> lines)
function splitFragment(text) {
  let style = '';
  const styleMatch = text.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    style = styleMatch[1];
    text = text.slice(0, styleMatch.index) + text.slice(styleMatch.index + styleMatch[0].length);
  }

  // Strip <script src="..."></script> (external CDNs - assembler injects them itself)
  text = text.replace(/<script\s+src=["'][^"']+["']\s*><\/script>/g, '');

  // Find LAST inline <script>...</script>
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

// Extract content's three named divs and replace ContentAgent placeholders in layout
function extractDiv(html, id) {
  const re = new RegExp(`<div\\s+id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/div>`);
  const m = html.match(re);
  return m ? m[0] : `<div id="${id}"></div>`;
}
const resumenDiv   = extractDiv(content.html, 'resumen-content');
const proyectosDiv = extractDiv(content.html, 'proyectos-content');
const educacionDiv = extractDiv(content.html, 'educacion-content');

// Layout placeholders → injected HTML
let body = layout.html;
const replaceOnce = (haystack, needle, replacement) => {
  const idx = haystack.indexOf(needle);
  if (idx === -1) throw new Error(`Placeholder not found in layout: ${needle}`);
  return haystack.slice(0, idx) + replacement + haystack.slice(idx + needle.length);
};

// The order of <!-- ContentAgent --> placeholders in layout is: resumen, proyectos, educacion
body = replaceOnce(body, '<!-- ContentAgent -->',  resumenDiv);
body = replaceOnce(body, '<!-- TimelineAgent -->', timeline.html);
body = replaceOnce(body, '<!-- SkillsAgent -->',   skills.html);
body = replaceOnce(body, '<!-- ContentAgent -->',  proyectosDiv);
body = replaceOnce(body, '<!-- ContentAgent -->',  educacionDiv);

// Profile metadata for <head>
const profileName  = (cvData.match(/name:\s*["']([^"']+)["']/) || [, 'CV'])[1];
const profileTitle = (cvData.match(/title:\s*\{\s*es:\s*["']([^"']+)["']/) || [, 'Curriculum Vitae'])[1];

const html = `<!DOCTYPE html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${profileTitle} — CV de ${profileName}">
  <meta property="og:title" content="${profileName} — CV">
  <title>${profileName} — CV</title>

  <link rel="preconnect" href="https://api.fontshare.com">
  <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap">

  <style>
/* === DESIGN SYSTEM === */
${designCss}

/* === LAYOUT === */
${layout.style}

/* === TIMELINE === */
${timeline.style}

/* === SKILLS === */
${skills.style}

/* === CONTENT === */
${content.style}

/* === PRINT === */
${printCss}
  </style>
</head>
<body>

${body}

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
/* CV_DATA — must be first */
${cvData}

/* Theme detection */
(function() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (!document.documentElement.hasAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();

/* === LAYOUT SCRIPT === */
${layout.script}

/* === TIMELINE SCRIPT === */
${timeline.script}

/* === SKILLS SCRIPT === */
${skills.script}

/* === CONTENT SCRIPT === */
${content.script}

if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
</script>
</body>
</html>
`;

const OUT = F('index.html');
writeFileSync(OUT, html, 'utf8');

const size = statSync(OUT).size;
console.log(`✓ Assembled ${OUT}`);
console.log(`  size: ${(size / 1024).toFixed(1)} KB`);

// Update _state.json: step 7 → in_progress
const stepIdx = STATE.pipeline.findIndex((s) => s.step === 7);
if (stepIdx >= 0 && STATE.pipeline[stepIdx].status === 'pending') {
  STATE.pipeline[stepIdx].status = 'in_progress';
  STATE.current_step = 7;
  STATE.last_updated = new Date().toISOString().slice(0, 10);
  writeFileSync(F('fragments/_state.json'), JSON.stringify(STATE, null, 2) + '\n', 'utf8');
  console.log('  state: step 7 → in_progress');
}
