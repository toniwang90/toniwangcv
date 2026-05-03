---
name: layout-agent
description: Use proactively at step 2 of the pipeline to build the layout fragment (header, navigation, KPI bar with count-up animation, and section scaffold) into fragments/02-layout.html.
tools: Read, Write, Edit
---

# LayoutAgent — Header, Navegación y KPI Bar

Construyes el esqueleto de la aplicación: header, navegación, KPI bar y el scaffold de secciones que el resto de agentes rellenarán.

## Scope estricto
- **Escribes**: `fragments/02-layout.html`
- **Lees**: `fragments/00-cv-data.js`, `fragments/01-design-system.css`, `CLAUDE.md`
- **No tocas**: ningún otro fragmento

## Contrato de output

`fragments/02-layout.html` — fragmento HTML parcial:

```html
<!-- HEADER -->
<header class="site-header" role="banner">
  <!-- Logo SVG con iniciales + nombre -->
  <!-- Nav: Resumen | Experiencia | Skills | Proyectos | Educación -->
  <!-- Toggle dark/light + botón Descargar CV -->
  <!-- Menú hamburguesa (visible solo en móvil) -->
</header>

<!-- KPI BAR -->
<div class="kpi-bar" role="region" aria-label="Métricas del perfil">
  <!-- 4 KPI cards: años exp, empresas, proyectos, tecnologías -->
</div>

<!-- SCAFFOLD DE SECCIONES (placeholders para otros agentes) -->
<main id="main-content">
  <section id="resumen"><!-- ContentAgent --></section>
  <section id="experiencia"><!-- TimelineAgent --></section>
  <section id="skills"><!-- SkillsAgent --></section>
  <section id="proyectos"><!-- ContentAgent --></section>
  <section id="educacion"><!-- ContentAgent --></section>
</main>

<script>
  // Toggle dark/light, hamburguesa, scroll nav, KPI count-up
</script>
```

## Especificaciones del header

- **Logo**: SVG inline con iniciales (de `CV_DATA.profile.name`) en `--font-mono`
- **Nav links**: scroll suave a `#resumen`, `#experiencia`, `#skills`, `#proyectos`, `#educacion`
- **Toggle dark/light**: icono Lucide `sun`/`moon`, cambia `data-theme` en `<html>`, ≥ 44px
- **Botón Descargar CV**: icono Lucide `download`, dispara `window.print()`
- **Hamburguesa** (≤ 768px): icono `menu`/`x`, abre/cierra nav vertical, área ≥ 44px

## Especificaciones de la KPI Bar

- Posición: debajo del header, sticky en scroll
- 4 cards: `⚡ Años exp` · `🏢 Empresas` · `📦 Proyectos` · `🔧 Tecnologías`
- Números en `--font-mono`, bold, tamaño grande
- Labels en `--font-display`, `--color-text-muted`
- **Count-up animation**: al cargar, números suben desde 0 hasta el valor en `CV_DATA.profile.kpis` en 1.5s con easing

## CSS permitido

Solo CSS scoped al header y KPI bar, usando exclusivamente variables de `01-design-system.css`. Sin colores hex ni valores de fuente hardcodeados.

## Instrucciones

1. Lee `fragments/00-cv-data.js` para obtener KPIs y nombre
2. Crea `fragments/02-layout.html` con la estructura completa
3. Verifica menú hamburguesa a 375px y touch targets ≥ 44px
4. Actualiza `fragments/_state.json`: paso 2 a `in_progress`
5. Avisa que se debe invocar al `design-guardian` antes de validar
