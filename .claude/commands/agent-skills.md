# SkillsAgent — Skill Matrix con SVG Dots

## Rol
Construir la sección de habilidades: un grid de skills representadas con círculos SVG animados, agrupadas por categoría.

## Scope
- **Escribe**: `fragments/04-skills.html`
- **Lee**: `fragments/00-cv-data.js` (para `skills{}`), `fragments/01-design-system.css` (variables), `CLAUDE.md`
- **No toca**: ningún otro fragmento

## Contrato de output

`fragments/04-skills.html` — fragmento con el HTML de la sección skills y su JS de animación.

## Especificaciones del Skill Matrix

### Layout
- Grid responsivo por categoría: 5 grupos (data_engineering, visualization, cloud, languages, tools)
- Cada grupo: título de categoría + lista de skills
- Cada skill: `nombre + 5 círculos SVG`
- Responsive: 2 columnas en desktop, 1 columna en móvil

### SVG Dots
- 5 círculos por skill, en línea horizontal
- Círculo relleno = nivel alcanzado, círculo vacío = nivel no alcanzado
- Relleno: `var(--color-[categoria])` según el mapa de abajo
- Vacío: `var(--color-surface-2)` con borde `var(--color-surface-offset)`
- Radio: 6px, gap entre circles: 4px
- Usar `--radius-full` (son círculos perfectos)

### Mapa de colores por categoría
```
data_engineering → var(--color-primary)   #4f98a3 teal
visualization    → var(--color-blue)      #58a6ff
cloud            → var(--color-orange)    #f0883e
languages        → var(--color-success)   #3fb950
tools            → var(--color-purple)    #bc8cff
```

### Tooltip en hover
Al hacer hover sobre los dots de una skill, mostrar: `"X años · Nivel Y/5"`
- Datos de `CV_DATA.skills.[categoria][n].years` y `.level`
- Tooltip: posición absoluta, fondo `var(--color-surface)`, borde `var(--color-divider)`, texto en `--font-mono`

### Animación de entrada
- Los dots comienzan vacíos (sin relleno)
- Al entrar en viewport (IntersectionObserver con `threshold: 0.3`), se rellenan progresivamente
- Animación: cada dot relleno aparece con un delay incremental (0ms, 80ms, 160ms, 240ms, 320ms)
- Transición: `fill` de transparente al color de categoría en 200ms ease-in-out
- **Solo se anima una vez** — no repetir al hacer scroll arriba y abajo

## Filtrado por tecnología (deseable)
Si el tiempo lo permite, añadir un selector de tecnología en el header de la sección que filtra qué experiencias la usan. Solo si no compromete la animación ni el responsive.

## CSS en este fragmento

Scoped a `.skills-section` y sus hijos. Sin hex hardcodeados.

## Instrucciones

1. Lee `fragments/00-cv-data.js` para obtener `skills{}`
2. Crea `fragments/04-skills.html`
3. Verifica que la animación solo se dispara al entrar en viewport (no al cargar)
4. Verifica el tooltip en hover con valores reales
5. Actualiza `fragments/_state.json`: cambia el paso 4 a `in_progress`
6. Avisa al usuario que debe ejecutar `/agent-design-guardian`
