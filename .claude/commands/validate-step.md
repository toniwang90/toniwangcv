# /validate-step [number] — Manual step validation

Runs validators on a specific step without going through the full `/build` flow.

## Usage

```
/validate-step 2        → DesignGuardian + UX Advisor on 02-layout.html
/validate-step 3 ux     → UX Advisor only on 03-timeline.html
/validate-step 4 css    → DesignGuardian only on 04-skills.html
```

If no modifier: runs both validators where applicable.

## Step map

| Step | Fragment | Guardian | UX Advisor |
|------|----------|:---:|:---:|
| 0 | `00-cv-data.js` | No | No |
| 1 | `01-design-system.css` | Yes | No |
| 2 | `02-layout.html` | Yes | Yes |
| 3 | `03-timeline.html` | Yes | Yes |
| 4 | `04-skills.html` | Yes | Yes |
| 5 | `05-content.html` | Yes | Yes |
| 6 | `06-print.css` | Yes | No |
| 7 | `index.html` | No | Yes |

## Behaviour

1. Read `_state.json` to identify the fragment
2. Verify the fragment exists — if not, stop
3. Invoke validators via Task tool with the specific fragment
4. Display reports

Does not modify `_state.json`. To mark a step validated, confirm explicitly in the `/build` flow.
