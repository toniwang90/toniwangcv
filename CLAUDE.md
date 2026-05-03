# CV Dashboard — Toni Wang

CV interactivo en formato dashboard analítico. Output: un único fichero HTML estático (`toni-wang-cv.html`) deployable en GitHub Pages/Netlify/Vercel sin configuración adicional.

---

## Arquitectura de agentes

Patrón **Orchestrator → Workers especializados**, secuencial estricto con validación humana entre cada paso.

### Roles y responsabilidades

| Agente | Comando | Escribe | Solo lee |
|--------|---------|---------|----------|
| Orchestrator | `/build` | `fragments/_state.json` | todo |
| DataAgent | `/agent-data` | `fragments/00-cv-data.js` | CLAUDE.md |
| DesignSystemAgent | `/agent-design-system` | `design-test.html` + `fragments/01-design-system.css` | CLAUDE.md |
| DesignGuardian | `/agent-design-guardian` | — (solo reporta) | fragmentos CSS |
| LayoutAgent | `/agent-layout` | `fragments/02-layout.html` | 00, 01 |
| TimelineAgent | `/agent-timeline` | `fragments/03-timeline.html` | 00, 01 |
| SkillsAgent | `/agent-skills` | `fragments/04-skills.html` | 00, 01 |
| ContentAgent | `/agent-content` | `fragments/05-content.html` | 00, 01 |
| PrintAgent | `/agent-print` | `fragments/06-print.css` | 01, 02–05 |
| AssemblerAgent | `/agent-assemble` | `toni-wang-cv.html` | todos los fragmentos |
| QAAgent | `/agent-qa` | — (solo reporta) | `toni-wang-cv.html` |

### Pipeline (secuencial estricto)

```
/agent-data          → 00-cv-data.js
                       ↓ [validación humana]
/agent-design-system → design-test.html + 01-design-system.css
/agent-design-guardian (valida CSS)
                       ↓ [validación visual humana]
/agent-layout        → 02-layout.html
/agent-design-guardian (valida CSS inline si existe)
                       ↓ [validación humana]
/agent-timeline      → 03-timeline.html
/agent-design-guardian (valida CSS)
                       ↓ [validación humana]
/agent-skills        → 04-skills.html
/agent-design-guardian (valida CSS)
                       ↓ [validación humana]
/agent-content       → 05-content.html
/agent-design-guardian (valida CSS)
                       ↓ [validación humana]
/agent-print         → 06-print.css
                       ↓ [validación humana]
/agent-assemble      → toni-wang-cv.html
                       ↓
/agent-qa            → informe de calidad
                       ↓ [validación humana → DONE]
```

El Orchestrator (`/build`) gestiona `_state.json` y siempre indica el siguiente paso.

---

## Estructura de ficheros

```
toniwangcv/
├── CLAUDE.md
├── design-test.html              ← proof del design system (DesignSystemAgent)
├── toni-wang-cv.html             ← output final (AssemblerAgent)
├── fragments/
│   ├── _state.json               ← estado del pipeline (Orchestrator)
│   ├── 00-cv-data.js             ← DataAgent
│   ├── 01-design-system.css      ← DesignSystemAgent
│   ├── 02-layout.html            ← LayoutAgent
│   ├── 03-timeline.html          ← TimelineAgent
│   ├── 04-skills.html            ← SkillsAgent
│   ├── 05-content.html           ← ContentAgent
│   └── 06-print.css              ← PrintAgent
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

---

## Referencia visual

- **Feel**: precision analytics — Hex.tech, Linear.app, Retool
- **Evitar**: gradientes decorativos, iconos en círculos de colores, `text-align: center` masivo
- **Buscar**: densidad de información controlada, jerarquía clara, color solo para datos, whitespace intencional
- **Tipografía de datos**: números y stack tech siempre en `--font-mono`
