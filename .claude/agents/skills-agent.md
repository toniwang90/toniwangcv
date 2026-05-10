---
name: skills-agent
description: Use proactively at step 4 of the pipeline to build the skill matrix with SVG dots animated via IntersectionObserver, grouped by category (data_engineering, sql_databases, languages, visualization, devops, ai_agentic, soft_skills).
tools: Read, Write, Edit
---

# SkillsAgent — Skill Matrix with SVG Dots

## Strict scope
- **Writes**: `fragments/04-skills.html`
- **Reads**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`

## i18n
- Category titles: `t(CV_DATA.ui.skills.categories[cat])`
- Tooltip: `t(CV_DATA.ui.skills.tooltip_format)` with `{years}` and `{level}` replaced
- `soft_skills` names: `t(skill.name)` (they are `{ es, en }`)
- On `cv:languagechange`: refresh tooltip strings and category labels (SVG dots don't need re-rendering)

## Layout

**Tab strip** (`.skills-tabs`, `role=tablist`) + one panel per category below:
- One `.skills-tab` per category: title + `.skills-tab__badge` (count). `aria-selected="true"` on active tab
- Active indicator colour = category colour (see map below)
- Tabs horizontally scrollable on mobile (no wrapping)
- One `.skills-panel` per category; only `.skills-panel--active` visible
- Panel grid: 3 cols desktop · 2 tablet · 1 mobile
- Each `.skill-row`: `name + 5 SVG dots`, ~32px row height

## Category order and default tab

```js
var CATEGORY_ORDER = Object.keys(CV_DATA.skills);  // dynamic — never hardcode
var DEFAULT_TAB    = CATEGORY_ORDER[0];             // always the first category
```

## Colour map

Known categories map to design-system variables; unknown categories fall back to `var(--color-primary)`:

```
data_engineering → var(--color-primary)
sql_databases    → var(--color-primary)
ai_agentic       → var(--color-primary)
languages        → var(--color-success)
visualization    → var(--color-blue)
devops           → var(--color-purple)
soft_skills      → var(--color-text-muted)
// any other key → var(--color-primary)   ← fallback
```

## SVG Dots
- 5 circles per skill, radius ~4px, tight gap
- Filled = level reached · Empty = `var(--color-surface-2)` + `var(--color-surface-offset)` border
- Fill colour: category colour from map above

## Hover tooltip
`"X years · Level Y/5"` (or `"Level Y/5"` for soft_skills). Tooltip style: `var(--color-surface)` bg, `var(--color-divider)` border, `--font-mono` text.

## Animation
- First tab: animates on viewport entry via `IntersectionObserver` (threshold ~0.3)
- Other tabs: animate on first selection, then stay filled — track an `animated` flag per category
- Delay per dot: 0/80/160/240/320ms, `fill` transition ~200ms ease-in-out
- **Never repeats** on re-scroll or tab revisit

## CSS
Scoped to `.skills-section`. No hardcoded hex.

## Instructions
1. Read `fragments/00-cv-data.js` to get `skills{}`
2. Create `fragments/04-skills.html`
3. Verify animation only triggers on viewport entry
4. Verify tooltip shows real values
5. Update `fragments/_state.json`: set step 4 to `in_progress`
6. Notify that `design-guardian` must be invoked before validating
