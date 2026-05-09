# CV Dashboard — Toni Wang

> **Analytic-dashboard CV generator powered by Claude Code agents.**
> Feed it a LinkedIn PDF. Get a polished, interactive, single-file CV deployed anywhere in minutes.

---

## What it builds

A single self-contained `toni-wang-cv.html` — no backend, no build step, no dependencies to install. Just open the file or push it to GitHub Pages.

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

3. **Assembler** — Once all fragments are validated, the assembler merges them into one HTML file. Done.

```
fragments/00-cv-data.js     ← your data (LinkedIn → CV_DATA)
fragments/01-design-system.css
fragments/02-layout.html    ← header, nav, KPI bar
fragments/03-timeline.html  ← D3.js experience timeline
fragments/04-skills.html    ← animated skill matrix
fragments/05-content.html   ← summary, education, certs
fragments/06-print.css      ← print/PDF stylesheet
                  ↓
          toni-wang-cv.html  ← deploy this
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

The pipeline is sequential and human-gated — you approve each step before the next runs.

---

## Pipeline

| Step | Agent | Output | Validation gates |
|------|-------|--------|-----------------|
| 0 | `data-agent` | `fragments/00-cv-data.js` | Human review of CV data |
| 1 | `design-system-agent` | `fragments/01-design-system.css` + `design-test.html` | DesignGuardian (CSS tokens) + visual review |
| 2 | `layout-agent` | `fragments/02-layout.html` | DesignGuardian |
| 3 | `timeline-agent` | `fragments/03-timeline.html` | DesignGuardian |
| 4 | `skills-agent` | `fragments/04-skills.html` | DesignGuardian |
| 5 | `content-agent` | `fragments/05-content.html` | DesignGuardian |
| 6 | `print-agent` | `fragments/06-print.css` | Human review (Cmd+P) |
| 7 | `assembler-agent` | `toni-wang-cv.html` | Human visual review |
| 8 | `qa-agent` | Quality report | Human sign-off |

**`design-guardian`** runs automatically after any CSS-producing step. It's a read-only validator that checks: no hardcoded hex colors, no hardcoded fonts, WCAG AA contrast, no horizontal overflow at 375px.

Pipeline state is tracked in `fragments/_state.json`. Each step is either `pending`, `in_progress`, or `validated`.

---

## Deployment

The output is a single HTML file with all CSS and JS inlined. No server needed.

### GitHub Pages

1. Push `toni-wang-cv.html` to your repo's root
2. Go to Settings → Pages → Source: Deploy from branch → `main` / `root`
3. Your CV is live at `https://<username>.github.io/<repo>/toni-wang-cv.html`

### Netlify / Vercel

Drag and drop the `toni-wang-cv.html` file into Netlify Drop or Vercel's deploy interface.

### Direct link

The file opens locally without a server:

```bash
open toni-wang-cv.html
```

---

## Iterating after the initial build

To change any section after the full build is complete:

1. **Edit `fragments/00-cv-data.js`** if it's a data change (text, dates, skills)
2. **Re-run the relevant agent** by telling Claude which section to rebuild
3. **Re-assemble** by running step 7 (`assembler-agent`)

To re-run a specific pipeline step: tell `/build` which step you want to restart, or edit `fragments/_state.json` to set that step back to `pending`.

---

## Customising for your own CV

This repo is designed to be forked and personalised:

- **Your data**: edit `fragments/00-cv-data.js` — all content lives there
- **Colors**: the design system tokens are in `fragments/01-design-system.css` and documented in `CLAUDE.md`
- **Sections**: add or remove sections by editing the relevant agent's fragment
- **Aesthetic**: the `CLAUDE.md` documents the visual references (Hex.tech, Linear, Retool) and the design rules agents follow

If you adapt this for your own CV, rename `toni-wang-cv.html` in `assembler-agent.md` and `CLAUDE.md`.

---

## Architecture

```
.claude/
├── commands/
│   └── build.md          ← /build slash command (Orchestrator)
└── agents/               ← subagents, each with restricted tool scope
    ├── data-agent.md
    ├── design-system-agent.md
    ├── design-guardian.md    ← read-only CSS validator
    ├── layout-agent.md
    ├── timeline-agent.md
    ├── skills-agent.md
    ├── content-agent.md
    ├── print-agent.md
    ├── assembler-agent.md
    └── qa-agent.md           ← read-only quality auditor

fragments/                ← build artifacts (gitignored until deployed)
├── _state.json           ← pipeline state machine
├── 00-cv-data.js         ← single source of truth for all CV content
├── 01-design-system.css
├── 02-layout.html
├── 03-timeline.html
├── 04-skills.html
├── 05-content.html
└── 06-print.css
```

Each agent is defined in `.claude/agents/` with a YAML frontmatter that restricts which tools it can use. Read-only agents (`design-guardian`, `qa-agent`) cannot write or edit files — the frontmatter enforces this.

---

## Tech stack

| Layer | Tech |
|-------|------|
| Visualization | D3.js v7 |
| Icons | Lucide |
| Fonts | Satoshi (display) · JetBrains Mono (data) |
| Simple Icons | brand logos in drill-down panels |
| Runtime | Vanilla JS — no framework |
| State | In-memory JS variables (no localStorage) |
| AI layer | Claude Code agents (Anthropic) |

---

## License

MIT — fork freely, adapt for your own CV.
