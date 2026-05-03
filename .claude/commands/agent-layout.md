# LayoutAgent — Header, Navegación y KPI Bar

## Rol
Construir el esqueleto de la aplicación: header, navegación, KPI bar y el scaffold de secciones. Defines la estructura que todos los demás agentes rellenarán.

## Scope
- **Escribe**: `fragments/02-layout.html`
- **Lee**: `fragments/00-cv-data.js` (para KPIs y nav links), `fragments/01-design-system.css` (para variables), `CLAUDE.md`
- **No toca**: ningún otro fragmento

## Contrato de output

`fragments/02-layout.html` — fragmento HTML parcial que contiene:

### Estructura HTML a generar

```html
<!-- HEADER -->
<header class="site-header" role="banner">
  <!-- Logo SVG con iniciales + nombre -->
  <!-- Nav principal: Resumen | Experiencia | Skills | Proyectos | Educación -->
  <!-- Controles: toggle dark/light + botón Descargar CV -->
  <!-- Menú hamburguesa (visible solo en móvil) -->
</header>

<!-- KPI BAR -->
<div class="kpi-bar" role="region" aria-label="Métricas del perfil">
  <!-- 4 KPI cards: años exp, empresas, proyectos, tecnologías -->
</div>

<!-- SCAFFOLD DE SECCIONES (placeholders para otros agentes) -->
<main id="main-content">
  <section id="resumen" aria-label="Resumen"><!-- ContentAgent --></section>
  <section id="experiencia" aria-label="Experiencia"><!-- TimelineAgent --></section>
  <section id="skills" aria-label="Skills"><!-- SkillsAgent --></section>
  <section id="proyectos" aria-label="Proyectos"><!-- ContentAgent --></section>
  <section id="educacion" aria-label="Educación"><!-- ContentAgent --></section>
</main>

<script>
  // Lógica del header: toggle dark/light, menú hamburguesa, scroll nav activo
  // KPI count-up animation (1.5s, usa CV_DATA.profile.kpis)
  // Scroll suave a secciones al hacer click en nav
</script>
```

## Especificaciones del header

- **Logo**: SVG inline con las iniciales del nombre (de `CV_DATA.profile.name`) en `--font-mono`
- **Nav links**: scroll suave a `#resumen`, `#experiencia`, `#skills`, `#proyectos`, `#educacion`
- **Toggle dark/light**: icono Lucide `sun`/`moon`, cambia `data-theme` en `<html>`, ancho mínimo 44px
- **Botón Descargar CV**: icono Lucide `download`, dispara `window.print()`, clase `.btn-primary`
- **Hamburguesa** (≤ 768px): icono `menu`/`x`, abre/cierra nav en vertical, área ≥ 44px

## Especificaciones de la KPI Bar

- Posición: debajo del header, sticky en scroll
- 4 cards horizontales: `⚡ Años exp` · `🏢 Empresas` · `📦 Proyectos` · `🔧 Tecnologías`
- Números en `--font-mono`, bold, tamaño grande
- Labels en `--font-display`, `--color-text-muted`
- **Count-up animation**: al cargar la página, los números suben desde 0 hasta el valor en `CV_DATA.profile.kpis` en 1.5s con easing

## CSS permitido en este fragmento

Solo CSS scoped al header y KPI bar, usando exclusivamente variables de `01-design-system.css`. Sin colores hex ni valores de fuente hardcodeados.

## Instrucciones

1. Lee `fragments/00-cv-data.js` para obtener los KPIs y el nombre
2. Crea `fragments/02-layout.html` con la estructura completa
3. Verifica que el menú hamburguesa funciona a 375px y que todos los touch targets son ≥ 44px
4. Actualiza `fragments/_state.json`: cambia el paso 2 a `in_progress`
5. Avisa al usuario que debe ejecutar `/agent-design-guardian` antes de validar
