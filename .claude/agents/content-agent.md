---
name: content-agent
description: Use proactively at step 5 of the pipeline to build the textual content sections (hero summary, personal projects, education + languages, certifications + honors) into fragments/05-content.html.
tools: Read, Write, Edit
---

# ContentAgent — Hero, Projects, Formación and Logros

You build the text content sections: hero summary, personal projects, education+languages (`#formacion`), and certifications+honors (`#logros`).

## Strict scope
- **Writes**: `fragments/05-content.html`
- **Reads**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`
- **Does not touch**: any other fragment

## Output contract — four content divs

`05-content.html` exposes **four** top-level content divs that the assembler injects into the layout's section scaffold:

```html
<div id="resumen-content">  <!-- rendered into <section id="resumen"> --> </div>
<div id="proyectos-content"><!-- rendered into <section id="proyectos"> --></div>
<div id="formacion-content"><!-- rendered into <section id="formacion"> --></div>
<div id="logros-content">   <!-- rendered into <section id="logros"> --> </div>
```

The IDs above are required — `scripts/assemble.mjs` matches them literally.

The fragment's `<script>` defines four render functions and calls them on load and on `cv:languagechange`:

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

## i18n

All visible text goes through `t()`:
- `t(CV_DATA.profile.summary)`, `t(CV_DATA.profile.location)`
- `t(personal_projects[i].name)`, `t(personal_projects[i].description)`
- `t(education[i].degree)`, `t(education[i].field)`
- `t(certifications[i].name)` (often plain — `t()` handles either)
- `t(honors[i].name)`, `t(languages[i].name)`, `t(languages[i].level)`
- Section titles: `t(CV_DATA.ui.sections.certifications)`, `…honors`, `…languages`, etc.
- Action labels: `t(CV_DATA.ui.actions.show_more)`, `…show_less`, `…view_project`

## Hero — `#resumen-content`

Compact info widget, NOT a welcome page. Layout: flex row on desktop (name/title/summary left, contact right), vertical stack on mobile.

- **Name**: `CV_DATA.profile.name` — Satoshi bold, H1
- **Title**: `CV_DATA.profile.title` — Satoshi regular, `--color-text-muted`
- **Location**: Lucide `map-pin` icon + `t(profile.location)`
- **Summary**: short paragraph (3 lines max) from `t(profile.summary)`
- **Contact** (`.hero__contact` block, larger font/icons for legibility — ~text-sm with 18px icons):
  - `linkedin` (Lucide `linkedin`) → `profile.contact.linkedin`
  - `github` (Lucide `github`) → `profile.contact.github`
  - `email` (Lucide `mail`) → `mailto:profile.contact.email`, in `--font-mono`, class `hero__contact-link--email`
  - **Extensible**: iterate `profile.contact.links[]` and render one link per entry (`{ icon, label, url }`). Use Lucide for known icons; fallback to a generic icon.
  - All external links: `target="_blank" rel="noopener noreferrer"`

**Do not include in the hero**: language chips, KPIs, tech badges, or anything that already renders elsewhere. Languages live in `#formacion`. KPIs are in the layout's KPI bar.

## Projects — `#proyectos-content`

Reads `CV_DATA.personal_projects` (NOT `experience[].projects`). The latter belong to the timeline drilldown.

- Card grid: name, description, stack chips, `year`, optional `status` badge, optional URL link via `t(CV_DATA.ui.actions.view_project)` ("Ver proyecto →" / "View project →"). External links: `target="_blank" rel="noopener noreferrer"`.
- **Show-more pattern**: render the first 6 projects by default; if `personal_projects.length > 6`, append a button toggling between `t(ui.actions.show_more)` and `t(ui.actions.show_less)` to reveal/hide the rest. This keeps the section compact while supporting unlimited projects.
- Skip entries whose `name` is `[TODO]` or empty so placeholders never render visibly.

## Formación — `#formacion-content` (2-column grid)

A two-column block on desktop (single-column stack on mobile):

- **Left column — Education** (`CV_DATA.education[]`):
  - One `.edu-block` card per institution: institution, degree, field, year range
  - `highlights[]` rendered as bullets if present
  - Section title via `t(CV_DATA.ui.sections.education)` or appropriate UI key
- **Right column — Languages** (`CV_DATA.languages[]`):
  - Spoken languages only (programming languages live in the skills matrix)
  - Each row: `name · level` (use a chip/badge style; values via `t(lang.name)` and `t(lang.level)`)
  - Section title via `t(CV_DATA.ui.sections.languages)`

## Logros — `#logros-content` (2-column grid)

A two-column block on desktop (single-column stack on mobile):

- **Left column — Certifications** (`CV_DATA.certifications[]`):
  - Badge cards: `name`, `issuer`, `year`, optional external link (`url`)
  - Lucide `award` icon
  - Section header includes a count badge (`CV_DATA.certifications.length`)
  - Section title via `t(CV_DATA.ui.sections.certifications)`
- **Right column — Honors / Awards** (`CV_DATA.honors[]`):
  - Card per entry: `t(honor.name)`, `honor.issuer`, `honor.year`
  - Section title via `t(CV_DATA.ui.sections.honors)` ("Reconocimientos" / "Honors & Awards")
  - When `CV_DATA.honors` is empty or missing, render an empty-state instead of the cards (do not crash)

## Section header pattern

For Logros (and where useful in Formación), use a header with title + optional count badge:

```html
<div class="section-header">
  <h2 class="section-header__title">[title]</h2>
  <span class="section-header__count">[count]</span>
</div>
```

## CSS

Scoped to `#resumen`, `#proyectos`, `#formacion`, `#logros`, and the helper classes (`.hero__contact`, `.hero__contact-link`, `.edu-block`, `.honors-list`, `.section-header`, etc.). No hardcoded hex values — only `var(--color-*)` and `var(--font-*)`.

## Instructions

1. Read `fragments/00-cv-data.js`
2. Create / edit `fragments/05-content.html` with the four content divs and their render functions
3. Verify readability at 375px (≥ 12px, no horizontal overflow); confirm the 2-col Formación and Logros stack into a single column on mobile
4. Confirm `[TODO]` entries in `personal_projects` are not rendered
5. Update `fragments/_state.json`: set step 5 to `in_progress`
6. Notify that `design-guardian` must be invoked before validating
