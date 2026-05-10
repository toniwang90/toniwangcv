# /fix-step [number] "description" — Targeted step fix

Resets a step and re-runs its agent with the fix context. Faster than a full `/build`.

## Usage

```
/fix-step 3 "el tooltip de la timeline aparece cortado en móvil"
/fix-step 2 "el KPI bar no se ve en light mode"
/fix-step 4 "los dots de skills no animan en Safari"
```

## Behaviour

1. Read `_state.json` — identify fragment and subagent for the given step
2. Verify the fragment exists — if not, tell the user to run `/build` first
3. Show intent summary and wait for explicit user confirmation:
   ```
   Step 3 (timeline-agent) → fragments/03-timeline.html
   Fix: "el tooltip..."
   Will: reset step 3 → invoke timeline-agent → run design-guardian + ux-advisor → rebuild partial preview → request validation
   Proceed? (yes/no)
   ```
4. After confirmation:
   a. Set step to `in_progress` in `_state.json`
   b. Invoke subagent via Task tool — the agent must **edit** the existing fragment, not rewrite from scratch
   c. Run validators per step config
   d. `node scripts/assemble.mjs --partial` and open in browser
   e. Show reports + URL, request validation
   f. On confirmation: mark step `validated`; if `index.html` exists, rebuild strict: `node scripts/assemble.mjs`

## Subagent prompt template

```
Fix the existing fragment at [fragment path]. Do NOT rewrite from scratch.

Read the file first (it exists on disk), then apply the minimal targeted edit
that resolves the problem. Preserve all existing structure, logic, and design tokens.

Problem: "[user's description]"
```

**Do not inline file contents.** Let the subagent read the file with its Read tool.

## Step map

| Step | Subagent | Fragment | Guardian | UX Advisor |
|------|----------|----------|:---:|:---:|
| 0 | `data-agent` | `00-cv-data.js` | No | No |
| 1 | `design-system-agent` | `01-design-system.css` | Yes | No |
| 2 | `layout-agent` | `02-layout.html` | Yes | Yes |
| 3 | `timeline-agent` | `03-timeline.html` | Yes | Yes |
| 4 | `skills-agent` | `04-skills.html` | Yes | Yes |
| 5 | `content-agent` | `05-content.html` | Yes | Yes |
| 6 | `print-agent` | `06-print.css` | Yes | No |

Steps 7 and 8 are not valid targets — use `/build` to re-assemble or re-run QA.

## Notes
- Does not cascade — only the specified step is reset
- For data changes use `/edit-cv` instead; `/fix-step 0` is blocked
- If the fix affects downstream steps (e.g. a CSS variable in step 1), suggest `/reset-step N cascade`
