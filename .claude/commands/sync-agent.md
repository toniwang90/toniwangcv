# /sync-agent — Detect and resolve agent ↔ fragment drift

Use this command after a fragment (or `index.html`) has been edited directly — by the user, by `/fix-step`, or by a hotfix branch — to **propagate the change back into the producer agent's spec** so a fresh `/build` would re-emit the new version.

## Usage

```
/sync-agent <fragment-path>
/sync-agent 02-layout.html
/sync-agent fragments/05-content.html
/sync-agent index.html        # special: walks every fragment-agent pair
```

If no argument is given, run the **full audit** mode: walk every fragment in `fragments/`, compare its current state against its producer agent's spec, and report drift.

## Fragment → producer map

| Fragment | Producer agent spec |
|---|---|
| `fragments/00-cv-data.js` | `.claude/agents/data-agent.md` |
| `fragments/01-design-system.css` + `design-test.html` | `.claude/agents/design-system-agent.md` |
| `fragments/02-layout.html` | `.claude/agents/layout-agent.md` |
| `fragments/03-timeline.html` | `.claude/agents/timeline-agent.md` |
| `fragments/04-skills.html` | `.claude/agents/skills-agent.md` |
| `fragments/05-content.html` | `.claude/agents/content-agent.md` |
| `fragments/06-print.css` | `.claude/agents/print-agent.md` |

## Procedure

1. **Find the most recent direct edits** to the fragment that did NOT come from a `/build` run:
   ```bash
   git log --oneline -20 -- <fragment-path>
   ```
   Identify commits that modified the fragment without modifying the producer agent's `.md` in the same commit. These are the drift sources.

2. **Read the relevant commits' diffs** (only those — not the full file):
   ```bash
   git show <hash> -- <fragment-path>
   ```

3. **Read the producer agent spec** and identify which sections describe behaviour now contradicted by the fragment (HTML structure, IDs, copy, colours, animations, KPI fields, etc.).

4. **Edit the producer agent spec** so its instructions, examples, and structural descriptions match the current fragment. Do **not** rewrite the fragment — the fragment is the source of truth here; the spec catches up to it.

5. Show the user a short diff summary of what was added/changed in the spec, and ask for confirmation.

## Rules

- **Token discipline**: never read full fragments — use `git show`, `git log -p`, and targeted `Grep`.
- **Spec follows fragment**, not the other way around. The user has been iterating on the visible artefact; the spec is what's stale.
- **One agent at a time**. If multiple fragments drifted, fix one producer agent per turn so the diff stays reviewable.
- **No code changes** outside `.claude/agents/*.md`. This command never edits fragments or `index.html`.
