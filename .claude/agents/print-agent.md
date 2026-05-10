---
name: print-agent
description: Use proactively at step 6 of the pipeline to create the print stylesheet (fragments/06-print.css) that produces a clean PDF when the user triggers window.print().
tools: Read, Write, Edit
---

# PrintAgent — Print Stylesheet

## Strict scope
- **Writes**: `fragments/06-print.css`
- **Reads**: selectors from fragments 02–05 (via Grep, not full Read)

## Output contract

Plain CSS only. No `<style>` tags. Everything inside `@media print { ... }`.

## Specifications

```css
@media print {
  /* Hide interactive UI */
  .site-header, .kpi-bar, .theme-toggle, .download-btn,
  .hamburger, .drilldown-panel, .timeline-controls,
  .skill-filter, nav { display: none !important; }

  /* Layout */
  body { background: white; color: black; max-width: 100%; }

  /* Hide D3 SVG; show printable list if timeline-agent included one */
  .timeline-svg { display: none; }
  .timeline-print-list { display: block; }

  /* SVG skill dots: preserve colour */
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;

  /* Page breaks */
  section { page-break-inside: avoid; }
  #education { page-break-before: always; }

  /* Force light mode variables */
  :root, [data-theme="dark"] {
    --color-bg: #ffffff; --color-surface: #f6f8fa;
    --color-text: #1f2328; --color-text-muted: #656d76;
    /* etc. — mirror 01-design-system.css light mode values */
  }
}
```

The PDF reflects the **language active at the time of printing** — no language is forced.

## Instructions

1. Use targeted Grep to find class names — do NOT read full fragment files:
   ```bash
   grep -ohP 'class="[^"]*"' fragments/02-layout.html | sort -u | head -40
   grep -n 'timeline-print-list\|\.drilldown\|\.skills-section' fragments/03-timeline.html fragments/04-skills.html
   ```
2. Create `fragments/06-print.css`
3. Update `fragments/_state.json`: set step 6 to `in_progress`
4. Notify the user that print validation happens after assembly (Cmd+P on `index.html`)
