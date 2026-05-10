---
name: layout-agent
description: Use proactively at step 2 of the pipeline to build the layout fragment (header, navigation, KPI bar with count-up animation, and section scaffold) into fragments/02-layout.html.
tools: Read, Write, Edit
---

# LayoutAgent — Header, Navigation and KPI Bar

## Strict scope
- **Writes**: `fragments/02-layout.html`
- **Reads**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`

## Output structure

```html
<header class="site-header" role="banner">
  <!-- SVG logo (initials in --font-mono) · Nav links · ES/EN toggle · theme toggle · Download CV · Hamburger -->
</header>

<div class="kpi-bar" id="kpi-bar" role="region" aria-label="Profile metrics">
  <!-- 4 KPI cards with data-kpi="years_experience|companies|projects|technologies" -->
</div>

<main id="main-content">
  <section id="resumen"     aria-label="Resumen"><!-- ContentAgent --></section>
  <section id="experiencia" aria-label="Experiencia"><!-- TimelineAgent --></section>
  <section id="skills"      aria-label="Skills"><!-- SkillsAgent --></section>
  <section id="proyectos"   aria-label="Proyectos"><!-- ContentAgent --></section>
  <section id="formacion"   aria-label="Formación"><!-- ContentAgent --></section>
  <section id="logros"      aria-label="Logros"><!-- ContentAgent --></section>
</main>

<script>
  // i18n system · dark/light toggle · hamburger · scroll-spy · KPI count-up
</script>
```

## Header specifications

- **Logo**: inline SVG with initials from `CV_DATA.profile.name`, `--font-mono`
- **Nav**: 6 links smooth-scrolling to `#resumen`, `#experiencia`, `#skills`, `#proyectos`, `#formacion`, `#logros`. Each has `data-i18n="nav.{summary|experience|skills|projects|background|achievements}"`
- **ES/EN toggle**: pill showing the opposite language. On click: `setLanguage(otherLang)`. ≥ 44px
- **Theme toggle**: Lucide `sun`/`moon`, toggles `data-theme` on `<html>`. ≥ 44px
- **Download CV**: Lucide `download`, fires `downloadCV()` — exports `CV_DATA` as JSON file. Text via `data-i18n="actions.download"`
- **Hamburger** (≤ 768px): Lucide `menu`/`x`, opens vertical nav with the 6 links + Download. ≥ 44px

## i18n system (LayoutAgent owns this)

```js
window.__cvLang = (navigator.language || "es").startsWith("en") ? "en" : "es";
document.documentElement.setAttribute("lang", window.__cvLang);

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

function setLanguage(lang) {
  window.__cvLang = lang;
  document.documentElement.setAttribute("lang", lang);
  applyStaticLabels();
  window.dispatchEvent(new CustomEvent("cv:languagechange", { detail: { lang } }));
}

applyStaticLabels();
```

Other agents do NOT duplicate this — they only listen to `cv:languagechange` to re-render.

## KPI Bar

- Sticky below header. `id="kpi-bar"`. 4 cards: years exp, companies, projects, technologies
- Labels via `data-i18n="kpi.{key}"`. Numbers in `--font-mono` bold large. Labels in `--font-display --color-text-muted`
- **KPIs are computed dynamically** at runtime from CV_DATA arrays — never read `CV_DATA.profile.kpis` directly:
  ```js
  years_experience = currentYear − min(experience[].start year)
  companies        = new Set(experience[].company).size
  projects         = personal_projects.length + Σ experience[i].projects.length
  technologies     = unique skill names across all groups except soft_skills
  ```
  Overwrite `data-kpi-value` attributes with computed values before the count-up animation runs.
- **Count-up**: 0 → value over ~1.5s with easing, triggered by IntersectionObserver
- **Scroll-spy**: highlight active nav link via `getBoundingClientRect().top`. Add bottom-of-page guard so `#logros` activates when scrolling to end

## Instructions

1. Read `fragments/00-cv-data.js` to get name and data shape
2. Create `fragments/02-layout.html`
3. Verify hamburger at 375px and touch targets ≥ 44px
4. Update `fragments/_state.json`: set step 2 to `in_progress`
5. Notify that `design-guardian` must be invoked before validating
