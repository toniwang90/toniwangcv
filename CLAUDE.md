# CV Dashboard — Toni Wang

Interactive CV in analytic dashboard format. Output: a single static HTML file (`index.html`) deployable on GitHub Pages/Netlify/Vercel with no additional configuration.

---

## Agent architecture

Pattern **Orchestrator → Specialised subagents**, strictly sequential with human validation between each step.

The user only invokes **one slash command**: `/build`. All other roles are **subagents** defined in `.claude/agents/` with scope, tools, and permissions restricted via YAML frontmatter. The Orchestrator invokes them via the Task tool.

### Roles and responsibilities

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
| `assembler-agent` | Read, Write, Edit, Bash | `index.html` | all fragments |
| `qa-agent` | Read, Grep, Glob | — (reports only) | `index.html` |

Read-only agents (`design-guardian`, `ux-advisor`, `qa-agent`) have no `Write` or `Edit` — the frontmatter enforces this.

### Pipeline (strictly sequential)

```
data-agent           → 00-cv-data.js
                       ↓ [human validation]
design-system-agent  → design-test.html + 01-design-system.css
design-guardian (validates CSS)
                       ↓ [human visual validation]
layout-agent         → 02-layout.html
design-guardian + ux-advisor
                       ↓ [human validation]
timeline-agent       → 03-timeline.html
design-guardian + ux-advisor
                       ↓ [human validation]
skills-agent         → 04-skills.html
design-guardian + ux-advisor
                       ↓ [human validation]
content-agent        → 05-content.html
design-guardian + ux-advisor
                       ↓ [human validation]
print-agent          → 06-print.css
design-guardian
                       ↓ [human validation]
assembler-agent      → index.html
ux-advisor (final full CV review)
                       ↓
qa-agent             → quality report
                       ↓ [human validation → DONE]
```

The Orchestrator (`/build`) manages `_state.json` and invokes the subagent for the current step via the Task tool.

### Available slash commands

| Command | Description |
|---------|-------------|
| `/build` | Main orchestrator — manages the full pipeline |
| `/preview` | Serves the most advanced artefact on a local server and opens it in the browser |
| `/validate-step [N]` | Re-runs DesignGuardian and/or UX Advisor on step N without advancing the pipeline |
| `/reset-step [N]` | Resets step N status (and optionally dependents with `cascade`) |

---

## File structure

```
toniwangcv/
├── README.md
├── CLAUDE.md
├── .gitignore
├── index.html                    ← final CV output (assembler-agent) — served by GitHub Pages
├── design-test.html              ← design system proof (design-system-agent)
├── .claude/
│   ├── settings.json
│   ├── commands/
│   │   ├── build.md              ← /build slash command (Orchestrator)
│   │   ├── preview.md            ← /preview
│   │   ├── validate-step.md      ← /validate-step
│   │   └── reset-step.md         ← /reset-step
│   └── agents/                   ← subagents with YAML frontmatter (scope/tools restricted)
│       ├── data-agent.md
│       ├── design-system-agent.md
│       ├── design-guardian.md    ← read-only, no Write/Edit
│       ├── ux-advisor.md         ← read-only, no Write/Edit
│       ├── layout-agent.md
│       ├── timeline-agent.md
│       ├── skills-agent.md
│       ├── content-agent.md
│       ├── print-agent.md
│       ├── assembler-agent.md
│       └── qa-agent.md           ← read-only, no Write/Edit
└── fragments/
    ├── _state.json               ← pipeline state machine
    ├── 00-cv-data.js             ← single source of truth for all CV content
    ├── 01-design-system.css      ← CSS tokens (design-system-agent)
    ├── 02-layout.html            ← layout-agent
    ├── 03-timeline.html          ← timeline-agent
    ├── 04-skills.html            ← skills-agent
    ├── 05-content.html           ← content-agent
    └── 06-print.css              ← print-agent
```

---

## Fragment contract

Each fragment is partial — no `<html>`, `<head>` or `<body>`. The AssemblerAgent injects them into the final HTML.

| Fragment | Contains | Does not contain |
|----------|----------|-----------------|
| `00-cv-data.js` | only `const CV_DATA = {...}` | `<script>` tags, exports |
| `01-design-system.css` | CSS variables + reset + base utilities | `<style>` tags |
| `02-layout.html` | Header/nav/KPI HTML + `<script>` with its logic | CSS variables already defined in 01 |
| `03-timeline.html` | Timeline section HTML + `<script>` with D3.js | References to CV_DATA outside its script |
| `04-skills.html` | Skills section HTML + `<script>` with animations | CSS already defined in 01 |
| `05-content.html` | Summary + education + certifications HTML | Logic from other sections |
| `06-print.css` | only `@media print { ... }` | `<style>` tags |

**Fragment rule**: each agent writes **only its assigned fragment**. No agent modifies files owned by other agents.

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
--font-display: 'Satoshi', sans-serif;        /* UI, headings, labels */
--font-mono:    'JetBrains Mono', monospace;  /* data, KPIs, tech stack */

/* === SHAPE === */
--radius-md:   8px;
--radius-full: 9999px;
```

**DesignGuardian rule**: no fragment may contain hardcoded hex colours or typography values outside the variables. The DesignGuardian validates this before any step can be marked `validated`.

---

## Internationalisation (i18n)

The CV is **bilingual ES/EN** with a language toggle in the header (next to the dark/light toggle). The active language lives in `window.__cvLang` (`"es"` or `"en"`). No `localStorage` — on load it is detected via `navigator.language` with `"es"` as fallback. The PrintAgent always uses the language active at the time of printing.

### Structure in CV_DATA

Translatable fields are **objects** `{ es, en }`. Fields that do not vary between languages (proper names, dates, tech names, numbers) stay as **plain strings**.

```js
// Translatable:
summary: { es: "Ingeniero...", en: "Software engineer..." }
role:    { es: "Programador Web", en: "Web Developer" }
// Plain:
name: "Toni Wang"
stack: ["Snowflake", "Python"]
```

`CV_DATA.ui` groups **all** UI labels (nav, KPI, buttons, skill categories, tooltip formats, months) as `{ es, en }` pairs. No agent may hardcode text in the UI — everything comes from `CV_DATA.ui.*` via the `t()` helper.

### `t(value, lang?)` helper

Defined at the end of `fragments/00-cv-data.js`. Accepts both plain strings and `{es, en}` objects. Uses `window.__cvLang` when `lang` is omitted. Falls back to `es` if the `en` translation does not exist.

```js
t(CV_DATA.profile.summary)        // translated text for the current language
t(CV_DATA.ui.nav.experience)      // "Experiencia" / "Experience"
t(experience.role)                // works with plain string or {es,en}
```

### Runtime language change

The toggle fires a custom `cv:languagechange` event with `detail: { lang }`. The **LayoutAgent** owns:
- the `setLanguage(lang)` function that updates `window.__cvLang`, runs `applyStaticLabels()` (iterates elements with `data-i18n` and replaces their `textContent`), and fires the event
- the `data-i18n="path.to.key"` attribute on each static UI element

**TimelineAgent**, **SkillsAgent** and **ContentAgent** subscribe to `window.addEventListener('cv:languagechange', () => render())` to re-paint dynamic content (D3 timeline, drilldown, skill tooltips, etc.).

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
11. **Bilingual ES/EN** — all visible UI text goes through `t()`. Nothing hardcoded in HTML/JS — always from `CV_DATA.ui.*` or `{es, en}` fields

---

## Visual reference

- **Feel**: precision analytics — Hex.tech, Linear.app, Retool
- **Avoid**: decorative gradients, icons in coloured circles, excessive `text-align: center`
- **Seek**: controlled information density, clear hierarchy, colour only for data, intentional whitespace
- **Data typography**: numbers and tech stack always in `--font-mono`
