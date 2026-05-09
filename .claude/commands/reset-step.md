# /reset-step [number] — Pipeline step reset

Resets the state of a specific step (and optionally dependent steps) in `fragments/_state.json` to allow re-execution.

## Usage

```
/reset-step 3           → resets step 3 only
/reset-step 3 cascade   → resets step 3 and all subsequent steps (4, 5, 6, 7, 8)
```

## Behaviour

1. Read `fragments/_state.json`
2. Identify the given step
3. **Display an impact summary** before acting:
   ```
   Step 3 (timeline-agent) → current status: validated

   ⚠️  Dependent steps that will be affected:
   - Step 4 (skills-agent): validated
   - Step 5 (content-agent): validated
   - Step 6 (print-agent): pending
   - Step 7 (assembler-agent): pending
   - Step 8 (qa-agent): pending

   Reset step 3 only, or also dependent steps?
   → /reset-step 3          (step 3 only)
   → /reset-step 3 cascade  (step 3 + all subsequent)
   ```
4. **Wait for explicit user confirmation** before modifying `_state.json`
5. After confirmation, update the step's status (and dependents if `cascade`) to `pending`
6. Update `current_step` to the lowest reset step
7. Confirm the changes made

## Resulting states after reset

| Reset target | Resulting state |
|--------------|----------------|
| The specified step | `pending` |
| Subsequent steps (with `cascade`) | `pending` |
| Prior steps | Unchanged |

## Typical use cases

- An agent produced incorrect code and needs to be re-run
- The user manually edited a fragment and wants the pipeline to treat it as unvalidated
- `CV_DATA` (step 0) was changed and everything needs re-running: `/reset-step 1 cascade`

## Notes

- **Does not delete** fragment files — only changes status in `_state.json`
- If a validated step is reset, the physical fragment still exists — the agent will overwrite it on re-execution
- Always asks for confirmation before writing — never resets without explicit user approval
