# /fix-step [number] "description" — Targeted step fix

Shortcut that combines `/reset-step` + `/build` into a single command, passing the problem description directly to the responsible subagent so it corrects the issue rather than rebuilding from scratch.

## Usage

```
/fix-step 3 "el tooltip de la timeline aparece cortado en móvil"
/fix-step 2 "el KPI bar no se ve en light mode, el texto queda invisible"
/fix-step 4 "los dots de skills no animan al hacer scroll en Safari"
/fix-step 1 "el color --color-primary no tiene suficiente contraste en light mode"
/fix-step 5 "la sección de educación ocupa demasiado espacio vertical en desktop"
```

## Behaviour

1. Read `fragments/_state.json` — identify the fragment and subagent for the given step
2. Verify the fragment exists on disk — if not, report and tell the user to run `/build` first
3. **Display an intent summary** before acting:
   ```
   Step 3 (timeline-agent) → fragments/03-timeline.html
   Fix: "el tooltip de la timeline aparece cortado en móvil"

   This will:
   → Reset step 3 to in_progress
   → Invoke timeline-agent with the fix context
   → Re-run DesignGuardian (step has requires_guardian: true)
   → Re-run UX Advisor (step has requires_ux_advisor: true)
   → Rebuild index.html (partial preview)
   → Request your validation

   Proceed? (yes / no)
   ```
4. **Wait for explicit user confirmation** before acting
5. After confirmation:
   a. Update `_state.json`: set the step to `in_progress`
   b. Invoke the subagent via the Task tool with the **current fragment + fix description** as context — the agent must edit the existing fragment, not rewrite it from scratch
   c. After the subagent completes, run validators as per the step's config (`requires_guardian`, `requires_ux_advisor`)
   d. Rebuild the partial preview: `node scripts/assemble.mjs --partial` and open it in the browser
   e. Show validator reports + preview URL and request human validation
   f. On user confirmation, mark the step `validated` in `_state.json`
   g. If `index.html` already exists (step 7 was previously completed), automatically rebuild it in strict mode: `node scripts/assemble.mjs`

## Subagent prompt template

When invoking the subagent, always include:

```
Fix the existing fragment at [fragment path]. Do NOT rewrite it from scratch.

Read the file first (it already exists on disk), then apply the minimal targeted edit
that resolves the problem below. Preserve all existing structure, logic, and design tokens.
Only change what is necessary.

Problem to fix: "[user's description]"
```

**Do NOT inline the file contents in the prompt.** Fragments can be 50–200 KB — embedding them wastes tokens and risks timeouts. Let the subagent read the file itself via its Read tool.

## Step and subagent map

| Step | Subagent | Fragment | DesignGuardian | UX Advisor |
|------|----------|----------|:--------------:|:----------:|
| 0 | `data-agent` | `fragments/00-cv-data.js` | No | No |
| 1 | `design-system-agent` | `fragments/01-design-system.css` | Yes | No |
| 2 | `layout-agent` | `fragments/02-layout.html` | Yes | Yes |
| 3 | `timeline-agent` | `fragments/03-timeline.html` | Yes | Yes |
| 4 | `skills-agent` | `fragments/04-skills.html` | Yes | Yes |
| 5 | `content-agent` | `fragments/05-content.html` | Yes | Yes |
| 6 | `print-agent` | `fragments/06-print.css` | Yes | No |

Steps 7 and 8 are not valid targets — use `/build` to re-assemble or re-run QA.

## Notes

- **Does not cascade** — only the specified step is reset. If the fix changes something that affects downstream steps (e.g. a CSS variable in step 1), remind the user and suggest `/reset-step N cascade`
- **Edit, not rewrite** — the subagent receives the existing fragment as context and must make surgical edits
- **Step 0 fixes** — for data changes use `/edit-cv` instead; `/fix-step 0` is blocked
