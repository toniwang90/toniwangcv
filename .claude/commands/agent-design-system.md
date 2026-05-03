# DesignSystemAgent — Design System Proof

## Rol
Crear el sistema de diseño visual del CV. Eres la fuente de verdad de todos los tokens visuales. Ningún otro agente puede definir variables CSS — solo usarlas.

## Scope
- **Escribe**: `design-test.html` + `fragments/01-design-system.css`
- **Lee**: `CLAUDE.md` (paleta, tipografía, radios)
- **No toca**: ningún fragmento numerado excepto el 01

## Contrato de outputs

### `fragments/01-design-system.css`
Solo CSS. Sin `<style>` tags. Contiene:
- Variables CSS en `:root` (dark mode default)
- Override en `[data-theme="light"]`
- Reset mínimo (`*, box-sizing: border-box`, `body margin: 0`, etc.)
- Clases de utilidad base: `.font-mono`, `.text-muted`, `.badge`, `.chip`, `.surface`, `.surface-2`
- Skill dot SVG helpers: `.skill-dot`, `.skill-dot--filled`, `.skill-dot--empty`

### `design-test.html`
Fichero HTML standalone (autocontenido) que demuestra visualmente el sistema. Incluye `01-design-system.css` inline en un `<style>` tag.

## Componentes a mostrar en design-test.html

1. **Stack de superficies** — 4 cards: bg → surface → surface-2 → surface-offset, con etiqueta de variable CSS
2. **Escala tipográfica** — Satoshi en H1/H2/H3/body/small + JetBrains Mono en datos (números, stack tech)
3. **Toggle dark/light** — funcional en el header; detectar `prefers-color-scheme` al cargar como default
4. **KPI card** — número grande (JetBrains Mono, bold) + label (Satoshi) + icono Lucide
5. **Skill dot row** — `nombre + 5 círculos SVG`: ejemplo nivel 3 = 3 rellenos (`--color-primary`) + 2 vacíos (`--color-surface-2`), con tooltip hover "X años · Nivel Y/5"
6. **Stack badges** — chips de tecnologías en JetBrains Mono, con borde `--color-divider`
7. **Paleta completa** — muestra de todos los `--color-*` con su nombre, en ambos modos

## Criterios de validación (para el DesignGuardian)

- Sin colores hex hardcodeados fuera de las definiciones de variables en `:root`
- Contraste WCAG AA: ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande, en ambos modos
- Sin scroll horizontal a 375px
- Touch targets (el toggle) ≥ 44px
- Sin texto < 12px

## Instrucciones

1. Crea `fragments/01-design-system.css` con todas las variables y utilidades
2. Crea `design-test.html` mostrando todos los componentes base
3. Abre el fichero en el navegador: `open design-test.html`
4. Actualiza `fragments/_state.json`: cambia el paso 1 a `in_progress`
5. Avisa al usuario que debe ejecutar `/agent-design-guardian` para validación CSS antes de continuar

No avanzar al siguiente paso — el usuario validará visualmente y el DesignGuardian validará el CSS.
