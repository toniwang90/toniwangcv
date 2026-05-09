# CV Dashboard — Toni Wang

> **Analytic-dashboard CV generator powered by Claude Code agents.**
> Feed it a LinkedIn PDF. Get a polished, interactive, single-file CV deployed anywhere in minutes.

**Live CV:** [toniwang90.github.io/toniwangcv](https://toniwang90.github.io/toniwangcv)

---

## What it builds

A single self-contained `index.html` — no backend, no build step, no dependencies to install. Push to GitHub Pages and your CV is live.

The CV looks like a precision analytics tool (think [Hex.tech](https://hex.tech) or [Linear](https://linear.app)), not a Word document:

- **Dark / light mode** toggle, respects `prefers-color-scheme`
- **D3.js interactive timeline** (desktop) + card list (mobile) with drill-down panels per company
- **Animated skill matrix** with SVG dots, grouped by category, triggered by IntersectionObserver
- **KPI bar** with count-up animation (years of experience, companies, projects, technologies)
- **Bilingual ES / EN** toggle, detected from `navigator.language`
- **Print-to-PDF** via `window.print()` with a clean print stylesheet
- **Hash-based URL routing** for drill-down panels (`#exp-001`)

---

## How it works

Three concepts:

1. **`CV_DATA`** — A single JavaScript object in `fragments/00-cv-data.js` is the single source of truth for all content. No data is hardcoded anywhere in the HTML.

2. **Agent pipeline** — Claude Code agents build the CV section by section. Each agent owns one file and only one file. Human validation gates every step.

3. **Assembler** — Once all fragments are validated, the assembler merges them into `index.html`. Done.

```
fragments/00-cv-data.js     ← your data (LinkedIn → CV_DATA)
fragments/01-design-system.css
fragments/02-layout.html    ← header, nav, KPI bar
fragments/03-timeline.html  ← D3.js experience timeline
fragments/04-skills.html    ← animated skill matrix
fragments/05-content.html   ← summary, education, certs
fragments/06-print.css      ← print/PDF stylesheet
                  ↓
              index.html     ← deploy this (GitHub Pages root)
```

---

## Prerequisites

- [Claude Code](https://claude.ai/code) (CLI or desktop app)
- A Claude account with access to Claude Sonnet or Opus
- Node.js ≥ 18 (for syntax validation only — no npm install needed)

---

## Getting started

### Option A — Build Toni's CV (data already loaded)

The `fragments/00-cv-data.js` is pre-populated from LinkedIn. Skip to step 1:

```
/build
```

The Orchestrator will show the pipeline state and guide you step by step.

### Option B — Adapt for your own CV

**1. Fork and clone**

```bash
git clone https://github.com/toniwang90/toniwangcv.git my-cv
cd my-cv
```

**2. Open in Claude Code**

```bash
claude .
```

**3. Add your LinkedIn PDF**

Export your LinkedIn profile as PDF (LinkedIn → Me → View Profile → More → Save to PDF) and note the path.

**4. Load your data**

Tell Claude:

> "Load my CV data from `~/Downloads/Profile.pdf`"

This invokes the `data-agent` which parses the PDF and populates `fragments/00-cv-data.js`. Review the generated data and confirm it's correct.

**5. Build**

```
/build
```

Answer each validation prompt as the pipeline progresses. Each step opens the fragment for visual inspection before continuing.

---

## Commands

| Command | What it does |
|---------|-------------|
| `/build` | Main orchestrator. Shows pipeline state, runs the next step, waits for your approval at each gate. |
| `/preview` | Serves the most advanced available artefact on a local HTTP server and opens it in the browser. |
| `/validate-step [N]` | Re-runs DesignGuardian and/or UX Advisor on step N without advancing the pipeline. |
| `/reset-step [N]` | Resets a pipeline step (with optional `cascade`) after your confirmation. |

---

## Pipeline

| Step | Agent | Output | Validation gates |
|------|-------|--------|-----------------|
| 0 | `data-agent` | `fragments/00-cv-data.js` | Human review of CV data |
| 1 | `design-system-agent` | `fragments/01-design-system.css` + `design-test.html` | DesignGuardian (CSS tokens) + visual review |
| 2 | `layout-agent` | `fragments/02-layout.html` | DesignGuardian + UX Advisor |
| 3 | `timeline-agent` | `fragments/03-timeline.html` | DesignGuardian + UX Advisor |
| 4 | `skills-agent` | `fragments/04-skills.html` | DesignGuardian + UX Advisor |
| 5 | `content-agent` | `fragments/05-content.html` | DesignGuardian + UX Advisor |
| 6 | `print-agent` | `fragments/06-print.css` | DesignGuardian |
| 7 | `assembler-agent` | `index.html` | UX Advisor + human visual review |
| 8 | `qa-agent` | Quality report | Human sign-off |

**`design-guardian`** runs automatically after any CSS-producing step. It's a read-only validator that checks: no hardcoded hex colours, no hardcoded fonts, WCAG AA contrast, no horizontal overflow at 375px.

**`ux-advisor`** runs automatically after any visual HTML step. It's a non-blocking consultive reviewer that checks: visual hierarchy, information density, colour semantics, typography correctness, anti-patterns, mobile layout, and consistency.

Pipeline state is tracked in `fragments/_state.json`. Each step is either `pending`, `in_progress`, or `validated`.

---

## GitHub Pages setup

The assembled `index.html` lives at the repository root, which is exactly what GitHub Pages needs.

**Steps to enable:**

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Branch: `main` · Folder: `/ (root)`
5. Click **Save**

After ~30 seconds, your CV will be live at:
```
https://<your-username>.github.io/<repo-name>/
```

For this repo: `https://toniwang90.github.io/toniwangcv/`

**Workflow after building:**

```bash
# After /build produces index.html
git add index.html
git commit -m "cv: update CV"
git push
# GitHub Pages deploys automatically — live in ~30s
```

You can also add a custom domain in Settings → Pages → Custom domain.

---

## Deployment alternatives

### Netlify Drop

Drag and drop the `index.html` file into [Netlify Drop](https://app.netlify.com/drop). Instant URL, no account needed.

### Vercel

```bash
npx vercel index.html
```

### Direct (local)

```bash
open index.html
```

---

## Iterating after the initial build

To change any section after the full build is complete:

1. **Edit `fragments/00-cv-data.js`** if it's a data change (text, dates, skills)
2. **Re-run the relevant agent** by telling Claude which section to rebuild
3. **Re-assemble** with `/reset-step 7` then `/build`

---

## Customising for your own CV

This repo is designed to be forked and personalised:

- **Your data**: edit `fragments/00-cv-data.js` — all content lives there
- **Colours**: the design system tokens are in `fragments/01-design-system.css` and documented in `CLAUDE.md`
- **Sections**: add or remove sections by editing the relevant agent's fragment
- **Output filename**: the assembler writes `index.html` at the repo root — do not rename it if you want GitHub Pages to work without a path

---

## Architecture

```
.claude/
├── commands/
│   ├── build.md          ← /build slash command (Orchestrator)
│   ├── preview.md        ← /preview
│   ├── validate-step.md  ← /validate-step
│   └── reset-step.md     ← /reset-step
└── agents/               ← subagents, each with restricted tool scope
    ├── data-agent.md
    ├── design-system-agent.md
    ├── design-guardian.md    ← read-only CSS validator
    ├── ux-advisor.md         ← read-only UX consultant
    ├── layout-agent.md
    ├── timeline-agent.md
    ├── skills-agent.md
    ├── content-agent.md
    ├── print-agent.md
    ├── assembler-agent.md
    └── qa-agent.md           ← read-only quality auditor

fragments/                ← build artefacts
├── _state.json           ← pipeline state machine
├── 00-cv-data.js         ← single source of truth for all CV content
├── 01-design-system.css
├── 02-layout.html
├── 03-timeline.html
├── 04-skills.html
├── 05-content.html
└── 06-print.css

index.html                ← final CV, served by GitHub Pages
```

Each agent is defined in `.claude/agents/` with YAML frontmatter that restricts which tools it can use. Read-only agents (`design-guardian`, `ux-advisor`, `qa-agent`) cannot write or edit files.

---

## Tech stack

| Layer | Tech |
|-------|------|
| Visualization | D3.js v7 |
| Icons | Lucide |
| Fonts | Satoshi (display) · JetBrains Mono (data) |
| Brand logos | Simple Icons (in drill-down panels) |
| Runtime | Vanilla JS — no framework |
| State | In-memory JS variables (no localStorage) |
| AI layer | Claude Code agents (Anthropic) |

---

## License

MIT — fork freely, adapt for your own CV.
