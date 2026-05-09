# CV Dashboard — Toni Wang

CV interactivo en formato dashboard analítico. Output: un único fichero HTML estático (`toni-wang-cv.html`) deployable en GitHub Pages/Netlify/Vercel sin configuración adicional.

---

## Arquitectura de agentes

Patrón **Orchestrator → Subagentes especializados**, secuencial estricto con validación humana entre cada paso.

El usuario solo invoca **un slash command**: `/build`. Todos los demás roles son **subagentes** definidos en `.claude/agents/` con scope, herramientas y permisos restringidos vía frontmatter YAML. El Orchestrator los invoca vía Task tool.

### Roles y responsabilidades

| Subagente | Tools | Escribe | Lee |
|-----------|-------|---------|-----|
| `data-agent` | Read, Write, Edit | `fragments/00-cv-data.js` | CLAUDE.md |
| `design-system-agent` | Read, Write, Edit, Bash | `design-test.html` + `fragments/01-design-system.css` | CLAUDE.md |
| `design-guardian` | Read, Grep, Glob | — (solo reporta) | fragmentos CSS |
| `ux-advisor` | Read, Grep, Glob | — (solo reporta) | fragmentos HTML visuales |
| `layout-agent` | Read, Write, Edit | `fragments/02-layout.html` | 00, 01 |
| `timeline-agent` | Read, Write, Edit | `fragments/03-timeline.html` | 00, 01 |
| `skills-agent` | Read, Write, Edit | `fragments/04-skills.html` | 00, 01 |
| `content-agent` | Read, Write, Edit | `fragments/05-content.html` | 00, 01 |
| `print-agent` | Read, Write, Edit | `fragments/06-print.css` | 01, 02–05 |
| `assembler-agent` | Read, Write, Edit, Bash | `toni-wang-cv.html` | todos los fragmentos |
| `qa-agent` | Read, Grep, Glob | — (solo reporta) | `toni-wang-cv.html` |

Los read-only (`design-guardian`, `ux-advisor`, `qa-agent`) no tienen `Write` ni `Edit` — el frontmatter lo impide.

### Pipeline (secuencial estricto)

```
data-agent           → 00-cv-data.js
                       ↓ [validación humana]
design-system-agent  → design-test.html + 01-design-system.css
design-guardian (valida CSS)
                       ↓ [validación visual humana]
layout-agent         → 02-layout.html
design-guardian + ux-advisor
                       ↓ [validación humana]
timeline-agent       → 03-timeline.html
design-guardian + ux-advisor
                       ↓ [validación humana]
skills-agent         → 04-skills.html
design-guardian + ux-advisor
                       ↓ [validación humana]
content-agent        → 05-content.html
design-guardian + ux-advisor
                       ↓ [validación humana]
print-agent          → 06-print.css
design-guardian
                       ↓ [validación humana]
assembler-agent      → toni-wang-cv.html
ux-advisor (revisión final del CV completo)
                       ↓
qa-agent             → informe de calidad
                       ↓ [validación humana → DONE]
```

El Orchestrator (`/build`) gestiona `_state.json` e invoca al subagente correspondiente al paso actual vía Task tool.

### Slash commands disponibles

| Comando | Descripción |
|---------|-------------|
| `/build` | Orquestador principal — gestiona el pipeline completo |
| `/preview` | Sirve el artefacto más avanzado en un servidor local y lo abre en el browser |
| `/validate-step [N]` | Re-ejecuta DesignGuardian y/o UX Advisor sobre el paso N sin avanzar el pipeline |
| `/reset-step [N]` | Resetea el estado del paso N (y opcionalmente dependientes con `cascade`) |

---

## Estructura de ficheros

```
toniwangcv/
├── CLAUDE.md
├── design-test.html              ← proof del design system (design-system-agent)
├── toni-wang-cv.html             ← output final (assembler-agent)
├── .claude/
│   ├── settings.json
│   ├── commands/
│   │   └── build.md              ← /build (único slash command, el Orchestrator)
│   └── agents/                   ← subagentes con frontmatter (scope/tools restringidos)
│       ├── data-agent.md
│       ├── design-system-agent.md
│       ├── design-guardian.md
│       ├── layout-agent.md
│       ├── timeline-agent.md
│       ├── skills-agent.md
│       ├── content-agent.md
│       ├── print-agent.md
│       ├── assembler-agent.md
│       └── qa-agent.md
├── fragments/
│   ├── _state.json               ← estado del pipeline (Orchestrator)
│   ├── 00-cv-data.js             ← data-agent
│   ├── 01-design-system.css      ← design-system-agent
│   ├── 02-layout.html            ← layout-agent
│   ├── 03-timeline.html          ← timeline-agent
│   ├── 04-skills.html            ← skills-agent
│   ├── 05-content.html           ← content-agent
│   └── 06-print.css              ← print-agent
└── assets/
```

---

## Contrato de fragmentos

Cada fragmento es parcial — sin `<html>`, `<head>` ni `<body>`. El AssemblerAgent los inyecta en el HTML final.

| Fragmento | Contiene | No contiene |
|-----------|----------|-------------|
| `00-cv-data.js` | solo `const CV_DATA = {...}` | `<script>` tags, exports |
| `01-design-system.css` | variables CSS + reset + utilidades base | `<style>` tags |
| `02-layout.html` | HTML del header/nav/KPI + `<script>` de su lógica | variables CSS ya definidas en 01 |
| `03-timeline.html` | HTML sección timeline + `<script>` con D3.js | referencias a CV_DATA fuera de su script |
| `04-skills.html` | HTML sección skills + `<script>` de animaciones | CSS ya definido en 01 |
| `05-content.html` | HTML resumen + educación + certificaciones | lógica de otras secciones |
| `06-print.css` | solo `@media print { ... }` | `<style>` tags |

**Regla de fragmentos**: cada agente escribe **solo su fragmento asignado**. Ningún agente modifica ficheros de otros agentes.

---

## Design System

```css
/* === DARK MODE (default) === */
--color-primary:        #4f98a3;   /* teal — acento y data_engineering */
--color-bg:             #0d1117;
--color-surface:        #161b22;
--color-surface-2:      #21262d;
--color-surface-offset: #30363d;
--color-text:           #e6edf3;
--color-text-muted:     #8b949e;
--color-divider:        #21262d;

/* Colores de categoría (skill matrix) */
--color-blue:           #58a6ff;   /* visualization */
--color-orange:         #f0883e;   /* cloud */
--color-success:        #3fb950;   /* languages */
--color-purple:         #bc8cff;   /* tools */

/* === LIGHT MODE ([data-theme="light"]) === */
--color-bg:             #ffffff;
--color-surface:        #f6f8fa;
--color-surface-2:      #eaeef2;
--color-surface-offset: #d0d7de;
--color-text:           #1f2328;
--color-text-muted:     #656d76;
--color-divider:        #d0d7de;

/* === TIPOGRAFÍA === */
--font-display: 'Satoshi', sans-serif;        /* UI, headings, labels */
--font-mono:    'JetBrains Mono', monospace;  /* datos, KPIs, stack tech */

/* === FORMA === */
--radius-md:   8px;
--radius-full: 9999px;
```

**Regla del DesignGuardian**: ningún fragmento debe contener colores hex hardcodeados ni valores de tipografía fuera de las variables. El DesignGuardian valida esto antes de marcar un paso como `validated`.

---

## Internacionalización (i18n)

El CV es **bilingüe ES/EN** con un toggle de idioma en el header (junto al toggle dark/light). El idioma activo vive en `window.__cvLang` (`"es"` o `"en"`). Sin `localStorage` — al cargar se detecta vía `navigator.language` con `"es"` como fallback. La PrintAgent fuerza siempre el idioma activo en el momento de imprimir.

### Estructura en CV_DATA

Los campos traducibles son **objetos** `{ es, en }`. Los campos que no varían entre idiomas (nombres propios, fechas, tech names, números) se mantienen como **strings planos**.

```js
// Traducible:
summary: { es: "Ingeniero...", en: "Software engineer..." }
role:    { es: "Programador Web", en: "Web Developer" }
// Plano:
name: "Toni Wang"
stack: ["Snowflake", "Python"]
```

`CV_DATA.ui` agrupa **todas** las labels de UI (nav, KPI, botones, categorías de skill, formato de tooltips, meses) en pares `{ es, en }`. Ningún agente puede hardcodear texto en la UI — todo viene de `CV_DATA.ui.*` vía el helper `t()`.

### Helper `t(value, lang?)`

Definido al final de `fragments/00-cv-data.js`. Acepta tanto strings planos como objetos `{es, en}`. Usa `window.__cvLang` cuando se omite `lang`. Fallback a `es` si la traducción de `en` no existe.

```js
t(CV_DATA.profile.summary)        // texto traducido del idioma actual
t(CV_DATA.ui.nav.experience)      // "Experiencia" / "Experience"
t(experience.role)                // funciona con string plano o {es,en}
```

### Cambio de idioma en runtime

Toggle dispara un evento custom `cv:languagechange` con `detail: { lang }`. El **LayoutAgent** posee:
- la función `setLanguage(lang)` que actualiza `window.__cvLang`, ejecuta `applyStaticLabels()` (recorre elementos con `data-i18n` y reemplaza su `textContent`) y dispara el evento
- el atributo `data-i18n="path.to.key"` en cada elemento de UI estática

**TimelineAgent**, **SkillsAgent** y **ContentAgent** suscriben `window.addEventListener('cv:languagechange', () => render())` para repintar contenido dinámico (D3 timeline, drilldown, skill tooltips, etc.).

---

## CDNs autorizados

```
D3.js:         https://cdn.jsdelivr.net/npm/d3@7
Chart.js:      https://cdn.jsdelivr.net/npm/chart.js
Lucide:        https://unpkg.com/lucide@latest/dist/umd/lucide.min.js
Simple Icons:  https://cdn.jsdelivr.net/npm/simple-icons@latest
Satoshi:       https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap
JetBrains:     https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap
```

---

## Reglas globales (no negociables)

1. **Un único fichero HTML final** — todo CSS y JS embebido, ensamblado por AssemblerAgent
2. **CV_DATA primero** — siempre el primer `<script>` del HTML ensamblado
3. **Vanilla JS** — sin React, Vue, Alpine, Svelte ni ningún framework
4. **Sin localStorage ni sessionStorage** — estado solo en variables JS en memoria
5. **Links externos** — siempre `target="_blank" rel="noopener noreferrer"`
6. **No inventar datos** — los `[COMPLETAR]` son placeholders descriptivos hasta que el usuario los rellene
7. **Mobile-first** — diseñar a 375px y expandir con breakpoints 768px y 1440px
8. **Touch targets** ≥ 44px · Sin texto < 12px
9. **Un agente, un fragmento** — nadie escribe fuera de su scope asignado
10. **DesignGuardian antes de validar** — ningún paso que genere CSS se marca `validated` sin pasar el guardián
11. **Bilingüe ES/EN** — todo texto visible en la UI pasa por `t()`. Nada hardcodeado en HTML/JS — siempre desde `CV_DATA.ui.*` o campos `{es, en}`

---

## Referencia visual

- **Feel**: precision analytics — Hex.tech, Linear.app, Retool
- **Evitar**: gradientes decorativos, iconos en círculos de colores, `text-align: center` masivo
- **Buscar**: densidad de información controlada, jerarquía clara, color solo para datos, whitespace intencional
- **Tipografía de datos**: números y stack tech siempre en `--font-mono`
