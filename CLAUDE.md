# CV Dashboard — Toni Wang

Interactive CV in analytic dashboard format. Output: a single static HTML file (`index.html`) deployable on GitHub Pages/Netlify/Vercel with no additional configuration.

---

## Agent architecture

Pattern **Orchestrator → Specialised subagents**, strictly sequential with human validation between each step.

| Subagent | Tools | Writes | Reads |
|----------|-------|--------|-------|
| `data-agent` | Read, Write, Edit | `fragments/00-cv-data.js` | CLAUDE.md |
| `design-system-agent` | Read, Write, Edit, Bash | `design-test.html` + `fragments/01-design-system.css` | CLAUDE.md |
| `design-guardian` | Read, Grep, Glob | — (reports only) | CSS fragments |
| `ux-advisor` | Read, Grep, Glob | — (reports only) | Visual HTML fragments |
| `layout-agent` | Read, Write, Edit | `fragments/02-layout.html` | 00, 01 |
| `timeline-agent` | Read, Write, Edit | `fragments/03-timeline.html` | 00, 01 |
| `skills-agent` | Read, Write, Edit | `fragments/04-skills.html` | 00, 01 |
| `content-agent` | Read, Write, Edit | `fragments/05-content.html` | 00, 01 |
| `print-agent` | Read, Write, Edit | `fragments/06-print.css` | 01, 02–05 |
| `assembler-agent` | Read, Write, Edit, Bash | `index.html` (via `scripts/assemble.mjs`) | `_state.json` |
| `qa-agent` | Read, Grep, Glob | — (reports only) | `index.html` |

### Pipeline

```
data-agent           → 00-cv-data.js          ↓ [human validation]
design-system-agent  → 01-design-system.css   ↓ design-guardian + [visual validation]
layout-agent         → 02-layout.html         ↓ design-guardian + ux-advisor + [validation]
timeline-agent       → 03-timeline.html       ↓ design-guardian + ux-advisor + [validation]
skills-agent         → 04-skills.html         ↓ design-guardian + ux-advisor + [validation]
content-agent        → 05-content.html        ↓ design-guardian + ux-advisor + [validation]
print-agent          → 06-print.css           ↓ design-guardian + [validation]
assembler-agent      → index.html             ↓ [visual validation]
qa-agent             → quality report         ↓ [human sign-off → DONE]
```

---

## Fragment contract

Each fragment is partial — no `<html>`, `<head>` or `<body>`. The assembler injects them.

| Fragment | Contains | Does not contain |
|----------|----------|-----------------|
| `00-cv-data.js` | only `const CV_DATA = {...}` + `t()` helper | `<script>` tags, exports |
| `01-design-system.css` | CSS variables + reset + base utilities | `<style>` tags |
| `02-layout.html` | Header/nav/KPI HTML + `<script>` | CSS variables (defined in 01) |
| `03-timeline.html` | Timeline section HTML + `<script>` with D3.js | References to CV_DATA outside its script |
| `04-skills.html` | Skills section HTML + `<script>` | CSS already defined in 01 |
| `05-content.html` | Summary + education + certifications HTML | Logic from other sections |
| `06-print.css` | only `@media print { ... }` | `<style>` tags |

---

## Design System

```css
/* === DARK MODE (default) === */
--color-primary:        #4f98a3;   /* teal — accent and data_engineering */
--color-bg:             #0d1117;
--color-surface:        #161b22;
--color-surface-2:      #21262d;
--color-surface-offset: #30363d;
--color-text:           #e6edf3;
--color-text-muted:     #8b949e;
--color-divider:        #21262d;

/* Category colours (skill matrix) */
--color-blue:           #58a6ff;   /* visualization */
--color-orange:         #f0883e;   /* cloud */
--color-success:        #3fb950;   /* languages */
--color-purple:         #bc8cff;   /* tools */

/* === LIGHT MODE ([data-theme="light"]) === */
--color-bg:             #ffffff;
--color-surface:        #f6f8fa;
--color-surface-2:      #eaeef2;
--color-surface-offset: #d0d7de;
--color-text:           #1f2328;
--color-text-muted:     #656d76;
--color-divider:        #d0d7de;

/* === TYPOGRAPHY === */
--font-display: 'Satoshi', sans-serif;
--font-mono:    'JetBrains Mono', monospace;

/* === SHAPE === */
--radius-md:   8px;
--radius-full: 9999px;
```

---

## Internationalisation (i18n)

Bilingual ES/EN. Active language in `window.__cvLang` (`"es"` | `"en"`), detected from `navigator.language`, fallback `"es"`. No localStorage.

- **Translatable fields**: `{ es: "...", en: "..." }` — anything visible in a different language
- **Plain fields**: names, dates, URLs, stack arrays, numbers — unchanged across languages
- **`CV_DATA.ui`**: all UI labels (nav, KPI, buttons, categories, tooltips, months) as `{ es, en }` pairs. No agent may hardcode UI text — always via `t()`
- **`t(value, lang?)`**: defined at end of `00-cv-data.js`. Accepts plain string or `{es,en}`. Falls back to `es`
- **Language change**: toggle fires `cv:languagechange` custom event. LayoutAgent owns `setLanguage()`. Dynamic agents (timeline, skills, content) listen and re-render

---

## Authorised CDNs

```
D3.js:         https://cdn.jsdelivr.net/npm/d3@7
Chart.js:      https://cdn.jsdelivr.net/npm/chart.js
Lucide:        https://unpkg.com/lucide@latest/dist/umd/lucide.min.js
Simple Icons:  https://cdn.jsdelivr.net/npm/simple-icons@latest
Satoshi:       https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap
JetBrains:     https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap
```

---

## Global rules (non-negotiable)

1. **Single final HTML file** — all CSS and JS embedded, assembled by AssemblerAgent into `index.html`
2. **CV_DATA first** — always the first `<script>` in the assembled HTML
3. **Vanilla JS** — no React, Vue, Alpine, Svelte or any framework
4. **No localStorage or sessionStorage** — state only in in-memory JS variables
5. **External links** — always `target="_blank" rel="noopener noreferrer"`
6. **No invented data** — `[TODO]` are descriptive placeholders until the user fills them in
7. **Mobile-first** — design at 375px and expand with breakpoints 768px and 1440px
8. **Touch targets** ≥ 44px · No text < 12px
9. **One agent, one fragment** — no one writes outside their assigned scope
10. **DesignGuardian before validating** — no CSS-producing step can be marked `validated` without passing the guardian
11. **Deterministic assembly** — step 7 is performed by `scripts/assemble.mjs`. The assembler-agent only invokes it; must never re-emit the final HTML as tokens
12. **Bilingual ES/EN** — all visible UI text goes through `t()`. Nothing hardcoded in HTML/JS
13. **HTML → agent sync** — when a fragment is edited directly, update the producer agent's spec in the same change. Use `/sync-agent <fragment>` to surface drift
14. **Token-efficient agents** — read-only agents must prefer `Grep` over `Read`. Generator agents must not re-read sibling fragments to verify
15. **New command → README** — adding `.claude/commands/*.md` requires updating the Commands table in `README.md` in the same change
16. **No hardcoded absolute paths** — agent specs and command files must never contain `/Users/…` paths. Use paths relative to the project root
17. **New Bash call → settings.json** — when an agent or command adds a new shell invocation, add `"Bash(command:*)"` to `.claude/settings.json` allow-list in the same change
18. **No CV_DATA keys hardcoded in fragments** — never hardcode values derivable from CV_DATA (category names, KPI values, counts). Always derive dynamically
19. **`_state.json` always committed as all-pending** — never commit a mid-pipeline state. Reset to `"pending"` / `current_step: 0` before committing
20. **Verify assemble.mjs after touching it** — run `node scripts/assemble.mjs --partial` before committing any edit to the script
21. **Single source of truth for formulas** — when a formula appears in more than one file, grep for all copies and update them together

---

## Visual reference

- **Feel**: precision analytics — Hex.tech, Linear.app, Retool
- **Avoid**: decorative gradients, icons in coloured circles, excessive `text-align: center`
- **Seek**: controlled information density, clear hierarchy, colour only for data, intentional whitespace
- **Data typography**: numbers and tech stack always in `--font-mono`
