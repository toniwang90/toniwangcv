# ContentAgent — Resumen, Educación y Certificaciones

## Rol
Construir las secciones de contenido textual: el hero de resumen, educación y certificaciones.

## Scope
- **Escribe**: `fragments/05-content.html`
- **Lee**: `fragments/00-cv-data.js` (para `profile`, `education[]`, `certifications[]`, `languages[]`), `fragments/01-design-system.css`, `CLAUDE.md`
- **No toca**: ningún otro fragmento

## Contrato de output

`fragments/05-content.html` — fragmento con tres subsecciones: resumen, educación y certificaciones.

## Especificaciones

### Sección Resumen (#resumen)
Hero compacto — no es una página de bienvenida, es un widget de información densa:

- **Nombre**: `CV_DATA.profile.name` — Satoshi bold, H1 semántico, tamaño grande pero no gigante
- **Título**: `CV_DATA.profile.title` — Satoshi regular, `--color-text-muted`
- **Localización**: icono Lucide `map-pin` + `CV_DATA.profile.location`
- **Summary**: `CV_DATA.profile.summary` — párrafo corto, Satoshi, máximo 3 líneas
- **Links de contacto**: iconos Lucide para LinkedIn (`linkedin`), GitHub (`github`), email (`mail`)
  - Cada link: `target="_blank" rel="noopener noreferrer"` si es externo
  - Texto en `--font-mono` para el email

Layout: flex row en desktop (nombre+title a la izquierda, summary en el centro, links a la derecha), stack vertical en móvil.

### Sección Proyectos (#proyectos)
Cards de proyectos más allá de los que ya aparecen en el drilldown de experiencia. Si `CV_DATA` no tiene proyectos standalone (solo tiene los embebidos en `experience`), mostrar los 3 mejores de `experience[].projects` con un link "Ver en experiencia →" que abre el drilldown correspondiente.

### Sección Educación + Certificaciones (#educacion)

**Educación** (`CV_DATA.education[]`):
- Una card por institución: logo/icono, nombre de la institución, título, campo, rango de años
- Si hay highlights, mostrarlos como bullets bajo la card

**Certificaciones** (`CV_DATA.certifications[]`):
- Grid de badges: nombre de la cert, emisor, año, link externo si tiene URL
- Icono Lucide `award` en los badges

**Idiomas** (`CV_DATA.languages[]`):
- Chips simples: `nombre · nivel`, en `--font-mono`
- No necesitan dots SVG — son texto plano con un badge de nivel

## CSS en este fragmento

Scoped a `#resumen`, `#proyectos`, `#educacion`. Sin hex hardcodeados.

## Instrucciones

1. Lee `fragments/00-cv-data.js` para obtener los datos necesarios
2. Crea `fragments/05-content.html` con las tres secciones
3. Verifica que en 375px todo el texto es legible (≥ 12px) y sin overflow
4. Actualiza `fragments/_state.json`: cambia el paso 5 a `in_progress`
5. Avisa al usuario que debe ejecutar `/agent-design-guardian`
