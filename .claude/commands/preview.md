# /preview — Local server + browser open

Serves the CV locally and opens it in the browser.

## Behaviour

1. Read `fragments/_state.json`. Detect the most advanced available artefact:
   - `index.html` exists → serve it
   - Otherwise: most recent visual fragment in order: `05-content.html` → `04-skills.html` → `03-timeline.html` → `02-layout.html` → `design-test.html`

2. Launch an HTTP server from the project root:
   ```bash
   python3 -m http.server 8765
   ```
   If 8765 is busy, try 8766, 8767.

3. Open in browser:
   ```bash
   open http://localhost:<port>/<detected-file>
   ```

4. Tell the user what is being served and at which URL.

If no visual artefact exists yet: "No visual artefact available. Run `/build` to start."
