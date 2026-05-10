---
name: layout-agent
description: Use proactively at step 2 of the pipeline to build the layout fragment (header, navigation, KPI bar with count-up animation, and section scaffold) into fragments/02-layout.html.
tools: Read, Write, Edit
---

# LayoutAgent — Header, Navigation and KPI Bar

You build the application skeleton: header, navigation, KPI bar, and the section scaffold that other agents will fill.

## Strict scope
- **Writes**: `fragments/02-layout.html`
- **Reads**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`
- **Does not touch**: any other fragment

## Output contract

`fragments/02-layout.html` — partial HTML fragment:

```html
<!-- HEADER -->
<header class="site-header" role="banner">
  <!-- SVG logo with initials + name -->
  <!-- Nav: uses data-i18n (e.g. data-i18n="nav.experience") -->
  <!-- ES/EN toggle + dark/light toggle + Download CV button -->
  <!-- Hamburger menu (mobile only) -->
</header>

<!-- KPI BAR -->
<div class="kpi-bar" role="region" aria-label="Profile metrics">
  <!-- 4 KPI cards: years exp, companies, projects, technologies -->
</div>

<!-- SECTION SCAFFOLD (placeholders for other agents) -->
<!-- IDs are in Spanish (matching nav hrefs and assemble.mjs extractDiv calls) -->
<main id="main-content">
  <section id="resumen"     aria-label="Resumen"><!-- ContentAgent --></section>
  <section id="experiencia" aria-label="Experiencia"><!-- TimelineAgent --></section>
  <section id="skills"      aria-label="Skills"><!-- SkillsAgent --></section>
  <section id="proyectos"   aria-label="Proyectos"><!-- ContentAgent --></section>
  <section id="formacion"   aria-label="Formación"><!-- ContentAgent --></section>
  <section id="logros"      aria-label="Logros"><!-- ContentAgent --></section>
</main>

<script>
  // Dark/light toggle, hamburger, scroll nav, KPI count-up
</script>
```

## Header specifications

- **Logo**: inline SVG with initials (from `CV_DATA.profile.name`) in `--font-mono`
- **Nav links** (6, in this order): smooth scroll to `#resumen`, `#experiencia`, `#skills`, `#proyectos`, `#formacion`, `#logros`. Each link has the matching `data-i18n="nav.{summary|experience|skills|projects|background|achievements}"`.
- **ES/EN toggle**: small pill button showing the OPPOSITE language to the current one (e.g. in `es` mode shows "EN"). Uses `t(CV_DATA.ui.actions.toggle_language)`. On click executes `setLanguage(otherLang)`. ≥ 44px.
- **Dark/light toggle**: Lucide `sun`/`moon` icon, changes `data-theme` on `<html>`, ≥ 44px. Uses `data-i18n-aria="actions.toggle_theme"` for the accessible label.
- **Download CV button**: Lucide `download` icon, fires `downloadCV()` — a function defined in this fragment that **exports `CV_DATA` as a JSON file** (`cv-toni-wang.json`). It is NOT `window.print()` (the print pipeline is owned by `print-agent`). Text via `data-i18n="actions.download"`.
- **Hamburger** (≤ 768px): `menu`/`x` icon, opens/closes vertical nav, area ≥ 44px. Mobile nav duplicates the 6 nav links and the Download button.

## i18n system (LayoutAgent's responsibility)

The LayoutAgent owns the global language logic. In its `<script>`:

```js
// 1. Global state
window.__cvLang = (navigator.language || "es").startsWith("en") ? "en" : "es";
document.documentElement.setAttribute("lang", window.__cvLang);

// 2. Apply static labels.
//    - data-i18n="path.to.key"      → element.textContent
//    - data-i18n-aria="path.to.key" → element.aria-label (icon-only buttons)
function applyStaticLabels() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const path = el.dataset.i18n.split(".");
    let v = CV_DATA.ui;
    for (const p of path) v = v?.[p];
    if (v != null) el.textContent = t(v);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const path = el.dataset.i18nAria.split(".");
    let v = CV_DATA.ui;
    for (const p of path) v = v?.[p];
    if (v != null) el.setAttribute("aria-label", t(v));
  });
}

// 3. Language change
function setLanguage(lang) {
  window.__cvLang = lang;
  document.documentElement.setAttribute("lang", lang);
  applyStaticLabels();
  window.dispatchEvent(new CustomEvent("cv:languagechange", { detail: { lang } }));
}

// 4. Initialisation
applyStaticLabels();
```

Other agents (timeline, skills, content) **do not duplicate** this logic — they only listen to the `cv:languagechange` event to re-render their dynamic content.

## KPI Bar specifications

- Position: below the header, sticky on scroll. Element id `#kpi-bar`.
- 4 cards using translated labels: `t(CV_DATA.ui.kpi.years_experience)` etc.
- Each label in its `<span data-i18n="kpi.years_experience">…</span>` for auto-update on language change
- Numbers in `--font-mono`, bold, large size
- Labels in `--font-display`, `--color-text-muted`
- **Values are read at runtime from `CV_DATA.profile.kpis`** (not hardcoded). The `data-agent` keeps them computed; the layout simply consumes them. This guarantees they never drift after data edits.
- **Count-up animation**: on load, numbers rise from 0 to their value over ~1.5s with easing
- **Scroll-spy**: highlight the active nav link based on `getBoundingClientRect().top` of each section (NOT `offsetTop` — broken for nested elements). Add a bottom-of-page guard so the last section (`#logros`) gets marked active when scrolling to the end.

## Allowed CSS

Only CSS scoped to the header and KPI bar, using exclusively variables from `01-design-system.css`. No hardcoded hex values or font values.

## Instructions

1. Read `fragments/00-cv-data.js` to get KPIs and name
2. Create `fragments/02-layout.html` with the full structure
3. Verify hamburger menu at 375px and touch targets ≥ 44px
4. Update `fragments/_state.json`: set step 2 to `in_progress`
5. Notify that `design-guardian` must be invoked before validating
