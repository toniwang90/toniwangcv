# /reset-step [number] — Pipeline step reset

Resets a step (and optionally dependents) in `fragments/_state.json`.

## Usage

```
/reset-step 3           → resets step 3 only
/reset-step 3 cascade   → resets step 3 and all subsequent steps (4–8)
```

## Behaviour

1. Read `_state.json`
2. Show impact summary and wait for explicit confirmation:
   ```
   Step 3 (timeline-agent) → current: validated

   ⚠️ Dependent steps affected:
   - Step 4 (skills-agent): validated
   - Step 5 (content-agent): validated
   - Step 6 (print-agent): pending
   - Step 7 (assembler-agent): pending

   Reset step 3 only or cascade?
   → /reset-step 3
   → /reset-step 3 cascade
   ```
3. After confirmation: set the step (and dependents if `cascade`) to `"pending"`, update `current_step` to lowest reset step

## Notes
- Does not delete fragment files — only changes status
- The physical fragment still exists; the agent will overwrite it on re-execution
- Always confirms before writing
