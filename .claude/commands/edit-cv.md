# /edit-cv — CV Data Editor

Invokes the `data-agent` to make targeted edits to `fragments/00-cv-data.js` without running the full pipeline.

## Usage

```
/edit-cv cambia el título de exp-001 a "Senior Data Engineer"
/edit-cv añade un nuevo skill: Apache Kafka, nivel 4, 2 años, categoría data_engineering
/edit-cv actualiza el summary en inglés con: "..."
/edit-cv el proyecto "Data Warehouse Migration" en exp-002 tuvo un outcome de reducir costes un 40%
```

## Behaviour

1. Read `fragments/00-cv-data.js` — always read first
2. Apply the change with `Edit` (not `Write`) — only change the requested fields
3. Respect i18n shape: `{ es, en }` fields → update both unless user specifies one
4. Recompute KPIs if the change affects experience / projects / skills:
   - `years_experience` = current year − min(`experience[].start` year)
   - `companies` = unique `experience[].company` values (`client` does NOT count)
   - `projects` = `personal_projects.length` + Σ `experience[i].projects.length`
   - `technologies` = unique skill names across all groups **excluding `soft_skills`**
5. Report exactly what changed (field path + old → new), including any KPI corrections

## Post-edit — minimal rebuild

**Text/numbers changed only** (summary, impact, descriptions, contact, KPI values):
→ `node scripts/assemble.mjs` — no agent re-run needed

**Skills structure changed** (new category, skill added/removed):
→ Re-run `skills-agent` → `node scripts/assemble.mjs`

**Experience changed** (new job, stack, project):
→ Re-run `timeline-agent` + `content-agent` → `node scripts/assemble.mjs`

**Profile/KPIs changed** (name, title, KPI values):
→ Re-run `layout-agent` → `node scripts/assemble.mjs`

**Design tokens changed** (`01-design-system.css`):
→ Full rebuild — `/reset-step 1 cascade`

Before reassembling, set the affected steps to `validated` in `_state.json`. Use the Agent tool to invoke the relevant agent directly — no need for `/reset-step` unless the fragment is structurally broken.

## Rules
- Never touch any file other than `fragments/00-cv-data.js`
- Never remove existing fields unless explicitly asked
- Preserve the `t()` helper — do not modify it
- Do not modify `fragments/_state.json`
- If `00-cv-data.js` doesn't exist, tell the user to run `/build` first
