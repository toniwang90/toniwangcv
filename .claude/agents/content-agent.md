---
name: content-agent
description: Use proactively at step 5 of the pipeline to build the textual content sections (hero summary, personal projects, education + languages, certifications + honors) into fragments/05-content.html.
tools: Read, Write, Edit
---

# ContentAgent — Hero, Projects, Formación and Logros

## Strict scope
- **Writes**: `fragments/05-content.html`
- **Reads**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`

## Output — four content divs (IDs are required; assembler matches them literally)

```html
<div id="resumen-content">   <!-- → <section id="resumen"> --></div>
<div id="proyectos-content"> <!-- → <section id="proyectos"> --></div>
<div id="formacion-content"> <!-- → <section id="formacion"> --></div>
<div id="logros-content">    <!-- → <section id="logros"> --></div>
```

Script defines four render functions, calls them on load, and re-calls on `cv:languagechange`:

```js
function renderResumen()   { /* fills #resumen-content */ }
function renderProyectos() { /* fills #proyectos-content */ }
function renderFormacion() { /* fills #formacion-content */ }
function renderLogros()    { /* fills #logros-content */ }

renderResumen(); renderProyectos(); renderFormacion(); renderLogros();
window.addEventListener("cv:languagechange", () => {
  renderResumen(); renderProyectos(); renderFormacion(); renderLogros();
});
```

## Section specifications

### Hero — `#resumen-content`
Compact info widget. Flex row desktop / vertical stack mobile.
- **Name**: H1, Satoshi bold
- **Title**: Satoshi regular, `--color-text-muted`
- **Location**: Lucide `map-pin` + `t(profile.location)`
- **Summary**: ≤ 3 lines, `t(profile.summary)`
- **Contact**: LinkedIn (Lucide `linkedin`) · GitHub (Lucide `github`) · email (Lucide `mail`, `--font-mono`) · extensible via `profile.contact.links[]`
- All external links: `target="_blank" rel="noopener noreferrer"`
- Do NOT include: language chips, KPIs, tech badges (they render elsewhere)

### Projects — `#proyectos-content`
Reads `CV_DATA.personal_projects` (NOT `experience[].projects` — those belong in the timeline drilldown).
- Card grid: name · description · stack chips · year · optional `status` badge · optional URL (`t(ui.actions.view_project)`)
- Show-more: render first 6 by default; if more exist, show `t(ui.actions.show_more)` / `t(ui.actions.show_less)` toggle
- Skip entries where `name` is `[TODO]` or empty

### Formación — `#formacion-content` (2-col grid → 1-col mobile)
- **Left — Education**: one `.edu-block` per entry (institution, degree, field, year range, highlights if any)
- **Right — Languages**: spoken languages only; each row: `t(lang.name) · t(lang.level)` with chip style

### Logros — `#logros-content` (2-col grid → 1-col mobile)
- **Left — Certifications**: badge cards with Lucide `award`, name · issuer · year · optional link. Section header includes count badge
- **Right — Honors**: `t(honor.name)` · issuer · year. If `CV_DATA.honors` is empty, render an empty-state (don't crash)

### Section header pattern
```html
<div class="section-header">
  <h2 class="section-header__title">[t(ui.sections.key)]</h2>
  <span class="section-header__count">[count]</span>
</div>
```

## CSS
Scoped to `#resumen`, `#proyectos`, `#formacion`, `#logros` and helpers. No hardcoded hex — only `var(--color-*)` and `var(--font-*)`.

## Instructions
1. Read `fragments/00-cv-data.js`
2. Create `fragments/05-content.html` with the four divs and render functions
3. Verify ≥ 12px text, no horizontal overflow at 375px, 2-col layouts stack to 1-col on mobile
4. Confirm `[TODO]` projects are not rendered
5. Update `fragments/_state.json`: set step 5 to `in_progress`
6. Notify that `design-guardian` must be invoked before validating
