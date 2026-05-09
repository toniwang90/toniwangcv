# /preview — Local server + browser open

Serves the CV locally and opens it in the browser. Automatically detects which file to open based on pipeline state.

## Behaviour

1. Read `fragments/_state.json` to determine the most advanced available artefact:
   - If `index.html` exists → serve from the project root
   - Otherwise, look for the most recent visual fragment in order: `05-content.html`, `04-skills.html`, `03-timeline.html`, `02-layout.html`, `design-test.html`

2. Launch an HTTP server at the project root:
   ```bash
   python3 -m http.server 8765 --directory /Users/tonywang/Documents/GitHub/toniwangcv
   ```
   If port 8765 is busy, try 8766, 8767 (up to 3 attempts).

3. Open the file in the browser:
   ```bash
   open http://localhost:8765/[detected-file]
   ```

4. Inform the user what is being served and at which URL.

## Notes

- The server runs in the background — the user can stop it with Ctrl+C in the terminal where it was launched, or by killing the process manually
- If no visual artefact exists yet, inform the user: "No visual artefact available. Run `/build` to start."
- Does not modify any project file

## Expected output

```
Serving: index.html
URL: http://localhost:8765/index.html

HTTP server running on port 8765.
```
