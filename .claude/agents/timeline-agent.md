---
name: timeline-agent
description: Use proactively at step 3 of the pipeline to build the experience section with D3.js horizontal timeline (desktop) and vertical card list (mobile), plus the slide-in DrillDown panel with hash-based URL routing.
tools: Read, Write, Edit
---

# TimelineAgent — D3.js Timeline and DrillDown Panel

You build the work experience section: interactive D3.js timeline + lateral drill-down panel.

## Strict scope
- **Writes**: `fragments/03-timeline.html`
- **Reads**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`
- **Does not touch**: any other fragment

## i18n

All text you render goes through `t()`:
- `t(experience.role)` (may be `{es,en}` or plain string)
- `t(experience.description)`, `t(experience.impact[i])`
- `t(project.name)`, `t(project.description)`, `t(project.outcome)`
- UI labels: `t(CV_DATA.ui.timeline.today)`, `t(CV_DATA.ui.sections.stack)`, etc.
- Month format: `CV_DATA.ui.months[window.__cvLang][monthIndex]`

**Re-render on language change**: your `<script>` must listen:
```js
window.addEventListener("cv:languagechange", () => {
  // re-render timeline SVG, mobile list, open drilldown if any
});
```

## Timeline specifications

### Desktop (≥ 768px) — SVG with D3.js
- X axis = years from `experience[0].start` to today
- Each company = an SVG rectangle spanning its date range
- Distinct colours per company (from the design system palette)
- Dotted vertical line at current date with "Today" label
- **Hover**: tooltip with `company · role · duration`
- **Click**: opens DrillDown Panel + updates hash URL (`#exp-001`)

### Left-margin labels (company + role)
Reserve a generous left margin (≥ 200px) so most company/role names fit without truncation. When a label still exceeds the available width:
- Truncate with `…` (do not let it overflow into the chart area)
- **Always** append an SVG `<title>` child to the text element with the **full untruncated string** — this gives a free native browser tooltip and is read by screen readers
- Make the labels interactive: same `cursor: pointer`, hover (rich custom tooltip + colour change), and click (open drilldown) as the bar itself. A 44px transparent hit-rect over the label group keeps it touch-friendly

### Mobile (< 768px) — Vertical list
- Companies as vertical cards in reverse chronological order
- Each card: company, role, dates, stack chips
- Click on card: opens DrillDown Panel

### DrillDown Panel
- Position: right lateral panel, 400px wide (mobile: full-width bottom sheet)
- Animation: `transform: translateX(100%)` → `translateX(0)` in 300ms ease-out
- **Header**: company + role + formatted date range
- **Stack**: chip per tech in `experience[n].stack`
  - Simple Icons CDN for logos where they exist
  - Fallback: generic badge
- **Impact**: bullet list from `experience[n].impact`
- **Projects**: collapsible sub-cards (accordion) with name, description, stack, outcome
- **Close**: X button (44px), click outside, Escape key

### Hash routing
- On drilldown open: `window.location.hash = '#exp-001'`
- On page load with hash: open the corresponding drilldown
- On close: clear hash with `history.replaceState`

## CSS

Scoped to `.timeline-section`, `.drilldown-panel` and their children. No hardcoded hex — only `var(--color-*)`.

## Instructions

1. Read `fragments/00-cv-data.js` to get `experience[]`
2. Create `fragments/03-timeline.html`
3. Verify drilldown opens/closes and hash updates correctly
4. Verify no horizontal overflow at 375px in the vertical list
5. Update `fragments/_state.json`: set step 3 to `in_progress`
6. Notify that `design-guardian` must be invoked before validating
