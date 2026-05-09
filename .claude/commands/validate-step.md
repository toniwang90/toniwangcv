# /validate-step [number] — Manual step validation

Runs the validators (DesignGuardian and/or UX Advisor) on a specific step's fragment without going through the full `/build` flow.

## Usage

```
/validate-step 2        → validates fragments/02-layout.html
/validate-step 3 ux     → UX Advisor only on fragments/03-timeline.html
/validate-step 4 css    → DesignGuardian only on fragments/04-skills.html
/validate-step 1        → DesignGuardian + UX Advisor on 01-design-system.css
```

If no modifier is given, runs **both validators** where applicable.

## Step and validator map

| Step | Fragment | DesignGuardian | UX Advisor |
|------|----------|:--------------:|:----------:|
| 0 | `fragments/00-cv-data.js` | No | No |
| 1 | `fragments/01-design-system.css` | Yes | No |
| 2 | `fragments/02-layout.html` | Yes | Yes |
| 3 | `fragments/03-timeline.html` | Yes | Yes |
| 4 | `fragments/04-skills.html` | Yes | Yes |
| 5 | `fragments/05-content.html` | Yes | Yes |
| 6 | `fragments/06-print.css` | Yes | No |
| 7 | `index.html` | No | Yes |
| 8 | — | No | No |

## Behaviour

1. Read `fragments/_state.json` to identify the fragment for the given step
2. Verify the fragment exists on disk — if not, report and stop
3. Invoke the appropriate validators via Task tool:
   - `design-guardian` with instruction to review the specific fragment
   - `ux-advisor` with instruction to review the specific fragment
4. Display reports from both validators
5. **Does not modify `_state.json`** — this command is read-only

## Typical use cases

- Re-validate a fragment after fixing an issue flagged by DesignGuardian
- Request a second UX opinion before advancing to the next step
- Verify that a manual correction did not introduce new violations

## Notes

- Does not advance the pipeline — validation only
- The state in `_state.json` does not change after running this command
- To mark a step as `validated`, the user must explicitly confirm it in the `/build` flow
