# TimelineAgent — Timeline D3.js y DrillDown Panel

## Rol
Construir la sección de experiencia laboral: la timeline interactiva con D3.js y el panel lateral de drilldown.

## Scope
- **Escribe**: `fragments/03-timeline.html`
- **Lee**: `fragments/00-cv-data.js` (para `experience[]`), `fragments/01-design-system.css` (variables), `CLAUDE.md`
- **No toca**: ningún otro fragmento

## Contrato de output

`fragments/03-timeline.html` — fragmento que contiene el HTML de la sección experiencia y todo su JS.

## Especificaciones de la Timeline

### Desktop (≥ 768px) — SVG con D3.js
- Eje X = años desde `experience[0].start` hasta hoy
- Cada empresa = rectángulo SVG que ocupa su rango temporal (`start` → `end || today`)
- Colores distintos por empresa (asignar de la paleta del design system)
- Línea vertical punteada en la fecha actual con etiqueta "Hoy"
- **Hover**: tooltip flotante con `company · role · duración en meses/años`
- **Click**: activa el DrillDown Panel de esa empresa y actualiza el hash URL (`#exp-001`)

### Móvil (< 768px) — Lista vertical
- Las empresas se muestran como cards verticales en orden cronológico inverso
- Cada card: empresa, rol, rango de fechas, chips de stack
- Click en card: abre el DrillDown Panel

### DrillDown Panel
- Posición: panel lateral derecho, ancho 400px (móvil: full-width bottom sheet)
- Animación: `transform: translateX(100%)` → `translateX(0)` en 300ms ease-out
- **Header**: empresa + rol + rango de fechas formateado
- **Stack**: chips/badges por cada tecnología en `experience[n].stack`
  - Usar Simple Icons CDN para el logo de cada tecnología si existe
  - Fallback: badge genérico con el nombre
- **Impacto**: lista de bullets de `experience[n].impact`
- **Proyectos**: sub-cards colapsables (accordion) por cada item en `experience[n].projects`
  - Click para expandir/colapsar
  - Muestra: nombre, descripción, stack, outcome
- **Cerrar**: botón X (44px), click fuera del panel, tecla Escape

### Hash routing
- Al abrir el drilldown de `exp-001`: `window.location.hash = '#exp-001'`
- Al cargar la página con un hash: abrir automáticamente el drilldown correspondiente
- Al cerrar: limpiar el hash (`history.replaceState(null, '', ' ')`)

## CSS en este fragmento

Solo scoped a `.timeline-section`, `.drilldown-panel` y sus hijos. Sin hex hardcodeados — solo `var(--color-*)`.

## Instrucciones

1. Lee `fragments/00-cv-data.js` para obtener `experience[]`
2. Crea `fragments/03-timeline.html`
3. Verifica que el drilldown se abre/cierra correctamente y que el hash se actualiza
4. Verifica que en 375px la lista vertical se muestra sin scroll horizontal
5. Actualiza `fragments/_state.json`: cambia el paso 3 a `in_progress`
6. Avisa al usuario que debe ejecutar `/agent-design-guardian`
