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
5. Write the updated file
6. Report exactly what changed (field path + old value → new value)

## Post-edit guidance

After the edit, remind the user which pipeline steps are affected and suggest the minimal reset needed:

| Changed section | Suggested reset |
|-----------------|----------------|
| `profile` (name, title, location, summary, contact) | `/reset-step 2 cascade` |
| `profile.kpis` | `/reset-step 2` (KPI bar is in layout) |
| `experience` | `/reset-step 3 cascade` |
| `skills` | `/reset-step 4 cascade` |
| `education`, `certifications`, `languages` | `/reset-step 5 cascade` |
| `ui` labels | `/reset-step 2 cascade` |
| Multiple sections | `/reset-step 1 cascade` |

If `index.html` already exists (pipeline was completed), also note that **a full rebuild is needed** for changes to appear in the deployed file.

## Rules

- **Never** touch any file other than `fragments/00-cv-data.js`
- **Never** remove existing fields unless explicitly asked
- **Never** change `CV_DATA.meta` (languages, default_language) unless explicitly asked
- **Preserve** the `t()` helper function at the end of the file — do not modify it
- If `fragments/00-cv-data.js` does not exist, tell the user to run `/build` first to initialise the pipeline
- Do **not** modify `fragments/_state.json` — this command is data-only and pipeline-state-agnostic
