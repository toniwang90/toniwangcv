---
name: skills-agent
description: Use proactively at step 4 of the pipeline to build the skill matrix with SVG dots animated via IntersectionObserver, grouped by category (data_engineering, visualization, cloud, languages, tools).
tools: Read, Write, Edit
---

# SkillsAgent — Skill Matrix with SVG Dots

You build the skills section: a grid of skills with animated SVG circles, grouped by category.

## Strict scope
- **Writes**: `fragments/04-skills.html`
- **Reads**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`
- **Does not touch**: any other fragment

## i18n

- Category titles: `t(CV_DATA.ui.skills.categories.data_engineering)` etc. (also acceptable via `data-i18n="skills.categories.data_engineering"`)
- Tooltip: use the format `t(CV_DATA.ui.skills.tooltip_format)` and replace `{years}` and `{level}`
- `skill.name` stays as plain string (tech name, not translated)
- Refresh tooltip strings and labels on `cv:languagechange`:

```js
window.addEventListener("cv:languagechange", () => {
  // refresh tooltip strings and categories; SVG dots do not need re-rendering
});
```

## Skill Matrix specifications

### Layout — category tabs + compact panel
The skills section uses a **horizontal tab strip** with one tab per category, and a single visible panel below. There is no all-categories-at-once grid.

- Tab strip: `.skills-tabs` (role=`tablist`), one `.skills-tab` per category (5 tabs). Each tab shows category title + a small `.skills-tab__badge` with the skill count. Selected state via `aria-selected="true"`.
- Active indicator under the selected tab uses the category colour (see colour map below).
- Tabs are horizontally scrollable on mobile (no wrapping).
- Below the tabs: one `.skills-panel` per category. Only `.skills-panel--active` is visible.
- Panel grid (`.skills-panel__grid`): **3 columns on desktop, 2 on tablet, 1 on mobile**.
- Each row (`.skill-row`): `name + 5 SVG dots`, compact ~32px row height.

### SVG Dots
- 5 circles per skill, horizontal row, class `.skill-dot-circle`
- Filled = level reached, empty = level not reached
- Fill colour: `var(--color-[category])` per the map below
- Empty: `var(--color-surface-2)` with `var(--color-surface-offset)` border
- Compact size: radius ~4px, tight gap (smaller than the previous 6px-radius dots — the panel is dense)

### Colour map by category
```
data_engineering → var(--color-primary)   teal
visualization    → var(--color-blue)
cloud            → var(--color-orange)
languages        → var(--color-success)
tools            → var(--color-purple)
```

### Hover tooltip
On hover over the dots: `"X years · Level Y/5"`
- Data from `CV_DATA.skills.[category][n].years` and `.level`
- Tooltip: `var(--color-surface)`, `var(--color-divider)` border, `--font-mono` text

### Entry animation — per tab, on first open
- Dots in each panel start empty
- The **first tab** (default-selected) animates on viewport entry via `IntersectionObserver` (threshold ~0.3)
- Each other tab animates **the first time it is selected**, then stays filled — track an `animated` flag per category
- Incremental delay per dot (0ms, 80ms, 160ms, 240ms, 320ms), `fill` transition ~200ms ease-in-out
- **Animates only once per category** — does not repeat when tabs are revisited

## CSS

Scoped to `.skills-section`. No hardcoded hex values.

## Instructions

1. Read `fragments/00-cv-data.js` to get `skills{}`
2. Create `fragments/04-skills.html`
3. Verify animation only triggers on viewport entry
4. Verify tooltip shows real values
5. Update `fragments/_state.json`: set step 4 to `in_progress`
6. Notify that `design-guardian` must be invoked before validating
