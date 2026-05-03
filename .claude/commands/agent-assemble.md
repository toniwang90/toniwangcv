# AssemblerAgent — Ensamblado Final

## Rol
Ensamblar todos los fragmentos validados en el fichero HTML final `toni-wang-cv.html`. Eres el único agente que escribe en este fichero.

## Scope
- **Escribe**: `toni-wang-cv.html`
- **Lee**: todos los fragmentos en `fragments/` (00–06), `CLAUDE.md`
- **No modifica** ningún fragmento — los usa solo para leerlos

## Prerrequisito

Antes de ensamblar, verificar que todos los pasos 0–6 están en estado `validated` en `fragments/_state.json`. Si alguno no lo está, parar y avisar al usuario.

## Contrato de output

`toni-wang-cv.html` — fichero HTML completo, autocontenido, con esta estructura:

```html
<!DOCTYPE html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[profile.title] — CV de [profile.name]">
  <meta property="og:title" content="[profile.name] — CV">
  <meta property="og:description" content="[profile.summary truncado a 160 chars]">
  <title>[profile.name] — CV</title>

  <!-- Fuentes -->
  <link rel="preconnect" href="https://api.fontshare.com">
  <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap">

  <style>
    /* ==============================
       DESIGN SYSTEM — 01-design-system.css
       ============================== */
    [INJECT: fragments/01-design-system.css]

    /* ==============================
       PRINT — 06-print.css
       ============================== */
    [INJECT: fragments/06-print.css]
  </style>
</head>
<body>

  <!-- ==============================
       LAYOUT — 02-layout.html (header + KPI bar + section scaffold)
       ============================== -->
  [INJECT: fragments/02-layout.html — solo el HTML, sin su <script>]

  <!-- ==============================
       CONTENT — 05-content.html (resumen, proyectos, educación)
       Inyectar dentro de las secciones del scaffold
       ============================== -->
  [INJECT: contenido de 05-content.html en sus secciones #resumen, #proyectos, #educacion]

  <!-- ==============================
       TIMELINE — 03-timeline.html (experiencia + drilldown)
       ============================== -->
  [INJECT: contenido de 03-timeline.html en #experiencia]

  <!-- ==============================
       SKILLS — 04-skills.html
       ============================== -->
  [INJECT: contenido de 04-skills.html en #skills]

  <!-- CDNs -->
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <script>
    /* ==============================
       CV DATA — 00-cv-data.js (SIEMPRE PRIMERO)
       ============================== */
    [INJECT: fragments/00-cv-data.js]

    /* Theme detection al cargar */
    (function() {
      const saved = null; // sin localStorage
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    })();

    /* ==============================
       SCRIPTS DE FRAGMENTOS (en orden)
       02-layout scripts → 03-timeline scripts → 04-skills scripts
       ============================== */
    [INJECT: scripts de 02-layout.html]
    [INJECT: scripts de 03-timeline.html]
    [INJECT: scripts de 04-skills.html]

    /* Inicializar Lucide icons */
    lucide.createIcons();
  </script>

</body>
</html>
```

## Instrucciones de ensamblado

1. Lee `fragments/_state.json` — verifica que todos los pasos 0–6 son `validated`
2. Lee cada fragmento en orden
3. Para fragmentos que tienen `<script>` embebido (02, 03, 04): separar el HTML del script y colocar cada parte en su lugar correcto del template
4. Inyectar el contenido de las secciones content dentro del scaffold de layout (reemplazar los comentarios placeholder del fragmento 02)
5. Crear `toni-wang-cv.html` con el resultado ensamblado
6. Abrir en el navegador: `open toni-wang-cv.html`
7. Actualiza `fragments/_state.json`: cambia el paso 7 a `in_progress`
8. Indicar al usuario que verifique que el fichero abre correctamente antes de ejecutar `/agent-qa`
