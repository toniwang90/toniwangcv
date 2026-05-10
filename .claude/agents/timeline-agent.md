---
name: timeline-agent
description: Use proactively at step 3 of the pipeline to build the experience section with D3.js horizontal timeline (desktop) and vertical card list (mobile), plus the slide-in DrillDown panel with hash-based URL routing.
tools: Read, Write, Edit
---

# TimelineAgent — D3.js Timeline and DrillDown Panel

## Strict scope
- **Writes**: `fragments/03-timeline.html`
- **Reads**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`

## i18n
All rendered text goes through `t()`. Re-render on language change:
```js
window.addEventListener("cv:languagechange", () => { /* re-render SVG, list, open drilldown */ });
```
Month format: `CV_DATA.ui.months[window.__cvLang][monthIndex]`

## Timeline — Desktop (≥ 768px) — D3.js SVG
- X axis = years from earliest `experience[].start` to today
- Each entry = SVG rect spanning its date range, distinct colour per company (from design system palette)
- Dotted vertical line at today with `t(CV_DATA.ui.timeline.today)` label
- **Hover**: tooltip `company · role · duration`. When `exp.client` set: `"Company › Client"`
- **Click**: opens DrillDown + sets hash URL (`#exp-001`)

### Multi-role grouping
Consecutive entries with the same `company` (e.g. Capgemini split across two clients):
- One company header above the group's first bar
- Each bar: `role` line + `client` line (smaller, `var(--color-primary)` ~75% opacity, `var(--font-display)`)

### Left-margin labels
- `MARGIN.left = 240px`. Truncation: company at 28 chars, role/client at 32 chars, with `…` suffix
- Truncated labels always have an SVG `<title>` child with the full string
- Labels: `cursor: pointer`, 44px transparent hit-rect for touch. Hover/click behaviour matches bars

## Timeline — Mobile (< 768px) — vertical card list
Reverse chronological. Each card: company · role (+ `· client` when set) · dates · stack chips. Click → DrillDown.

## DrillDown Panel
- Desktop: right lateral panel 400px wide · Mobile: full-width bottom sheet
- Animation: `transform: translateX(100%)` → `translateX(0)`, 300ms ease-out
- **Header**: company (or `"company › client"`) · role · formatted date range
- **Stack**: chip per tech, Simple Icons CDN logo or fallback badge
- **Impact**: bullet list from `experience[n].impact`
- **Projects**: collapsible accordion (name · description · stack · outcome)
- **Close**: X button (44px) · click outside · Escape key

### Hash routing
- Open: `window.location.hash = '#exp-001'`
- On page load with hash: open matching drilldown
- Close: `history.replaceState(null, '', location.pathname)`

## CSS
Scoped to `.timeline-section`, `.drilldown-panel`. No hardcoded hex — only `var(--color-*)`.

## Instructions
1. Read `fragments/00-cv-data.js` to get `experience[]`
2. Create `fragments/03-timeline.html`
3. Verify drilldown opens/closes and hash updates
4. Verify no horizontal overflow at 375px in the vertical list
5. Update `fragments/_state.json`: set step 3 to `in_progress`
6. Notify that `design-guardian` must be invoked before validating
