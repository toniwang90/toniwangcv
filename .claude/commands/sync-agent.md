# /sync-agent — Detect and resolve agent ↔ fragment drift

Use after a fragment has been edited directly (manual fix, `/fix-step`, hotfix) to propagate the change back into the producer agent's spec.

## Usage

```
/sync-agent 02-layout.html
/sync-agent fragments/05-content.html
/sync-agent index.html      → walks every fragment-agent pair
/sync-agent                 → full audit: all fragments vs their producer specs
```

## Fragment → producer map

| Fragment | Producer agent |
|---|---|
| `fragments/00-cv-data.js` | `.claude/agents/data-agent.md` |
| `fragments/01-design-system.css` + `design-test.html` | `.claude/agents/design-system-agent.md` |
| `fragments/02-layout.html` | `.claude/agents/layout-agent.md` |
| `fragments/03-timeline.html` | `.claude/agents/timeline-agent.md` |
| `fragments/04-skills.html` | `.claude/agents/skills-agent.md` |
| `fragments/05-content.html` | `.claude/agents/content-agent.md` |
| `fragments/06-print.css` | `.claude/agents/print-agent.md` |

## Procedure

1. Find direct edits to the fragment not accompanied by agent spec changes:
   ```bash
   git log --oneline -20 -- <fragment-path>
   git show <hash> -- <fragment-path>
   ```
2. Read the producer agent spec. Identify sections contradicted by the fragment (IDs, structure, copy, colours, animations).
3. Edit the producer agent spec to match the current fragment. The fragment is the source of truth.
4. Show a diff summary and ask for confirmation.

## Rules
- Never read full fragments — use `git show`, `git log -p`, and targeted Grep
- Spec follows fragment, not the other way around
- No code changes outside `.claude/agents/*.md`
