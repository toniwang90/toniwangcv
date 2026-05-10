# /edit-cv — CV Data Editor

Invokes the `data-agent` directly to make targeted edits to `fragments/00-cv-data.js` without running the full build pipeline.

## Usage

```
/edit-cv <natural language description of the change>
```

### Examples

```
/edit-cv cambia el título de exp-001 a "Senior Data Engineer"
/edit-cv añade un nuevo skill: Apache Kafka, nivel 4, 2 años, categoría data_engineering
/edit-cv actualiza el summary en inglés con: "..."
/edit-cv el proyecto "Data Warehouse Migration" en exp-002 tuvo un outcome de reducir costes un 40%
/edit-cv actualiza kpis: years_experience a 15, technologies a 35
```

## Behaviour

1. Read `fragments/00-cv-data.js` — **always read first**, never overwrite without loading current state
2. Parse the user's requested change from the command arguments
3. Identify the exact field(s) to update in `CV_DATA`
4. Apply the edit:
   - Preserve **all** existing data — only change the requested fields
   - Respect the i18n shape: if a field is `{ es, en }`, update both unless the user specifies one language
   - Respect plain-string fields: names, dates, URLs, stack arrays, numbers stay as plain strings
   - Never invent data — if the user's instruction is ambiguous, ask before writing
5. **Recalculate KPIs** — after every edit, check if `profile.kpis` needs updating:
   - `companies` = number of **unique** `company` values in `experience[]` (not entry count)
   - `projects` = total `projects[]` items across all `experience[]` entries (non-empty) + `personal_projects[]` items with `status === "live"`
   - `technologies` = total items across all `skills.*` arrays **excluding `soft_skills`**
   - `years_experience` = manually maintained; only update if the user explicitly asks or if the earliest `start` date changes
   - If any KPI value changes, include it in the edit and report it
6. Write the updated file
7. Report exactly what changed (field path + old value → new value), including any KPI corrections

## Post-edit guidance

After the edit, apply the **minimal rebuild** — never cascade unless a parent step truly changed.

### Decision tree

**Did only text/numbers change** (summary, impact bullets, project descriptions, outcome, KPI values, contact info, education text)?
→ Just reassemble: `node scripts/assemble.mjs`
→ No agent re-run needed. `00-cv-data.js` is the first `<script>` in the assembled file — updating it is enough.

**Did skill structure change** (new category, renamed category, skill added/removed)?
→ Re-run skills-agent to regenerate `fragments/04-skills.html`, then reassemble.
→ Mark step 4 `validated` in `_state.json` before assembling.

**Did experience entries change** (new job, stack change, new project)?
→ Re-run timeline-agent (`fragments/03-timeline.html`) + content-agent (`fragments/05-content.html`), then reassemble.
→ Mark steps 3 and 5 `validated` before assembling.

**Did profile/KPIs change** (name, title, KPI bar numbers)?
→ Re-run layout-agent (`fragments/02-layout.html`), then reassemble.
→ Mark step 2 `validated` before assembling.

**Did `ui` labels change** (nav, section headings, button text)?
→ Re-run layout-agent only (it owns `applyStaticLabels`), then reassemble.

**Did design tokens change** (`01-design-system.css`)?
→ This is a full rebuild — `/reset-step 1 cascade` and re-run from step 1.

### Minimal reassemble command
```bash
node scripts/assemble.mjs
```

### Quick agent re-run (without full pipeline)
Invoke the relevant agent directly via the Agent tool with a targeted prompt, then `node scripts/assemble.mjs`. No need for `/reset-step` unless the fragment is structurally broken.

### When NOT to use `/build`
`/build` runs all agents from the current step forward — use it only when multiple fragments need regeneration or the pipeline state is unknown. For isolated CV data edits, the direct approach above is always faster.

## Rules

- **Never** touch any file other than `fragments/00-cv-data.js`
- **Never** remove existing fields unless explicitly asked
- **Never** change `CV_DATA.meta` (languages, default_language) unless explicitly asked
- **Preserve** the `t()` helper function at the end of the file — do not modify it
- If `fragments/00-cv-data.js` does not exist, tell the user to run `/build` first to initialise the pipeline
- Do **not** modify `fragments/_state.json` — this command is data-only and pipeline-state-agnostic
