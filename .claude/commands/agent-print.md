# PrintAgent — CSS de Impresión

## Rol
Crear el stylesheet de impresión que permite exportar el CV como PDF limpio desde el navegador.

## Scope
- **Escribe**: `fragments/06-print.css`
- **Lee**: todos los fragmentos `02–05` (para saber qué clases/IDs existen), `CLAUDE.md`
- **No toca**: ningún otro fragmento

## Contrato de output

`fragments/06-print.css` — solo CSS. Sin `<style>` tags. Todo dentro de `@media print { ... }`.

## Especificaciones

### Elementos a ocultar en impresión
```css
@media print {
  .site-header,
  .kpi-bar,
  .theme-toggle,
  .download-btn,
  .hamburger,
  .drilldown-panel,
  .timeline-controls,
  .skill-filter,
  nav { display: none !important; }
}
```

### Layout de impresión
- `body`: fondo blanco, texto negro (`#000`)
- Todo en una columna, sin grid ni flexbox complejos
- `max-width: 100%`, sin overflow
- Fuentes: mantener Satoshi y JetBrains Mono si el navegador las tiene cacheadas; fallback a `sans-serif` y `monospace`

### Timeline en impresión
- Ocultar el SVG de D3.js
- Mostrar en su lugar una lista imprimible de experiencias (`.timeline-print-list`) — el TimelineAgent debe incluir esta lista alternativa oculta por defecto

### Skill dots en impresión
- Los círculos SVG deben ser visibles en impresión
- Asegurarse de que los colores de relleno se imprimen (`-webkit-print-color-adjust: exact; print-color-adjust: exact`)

### Page breaks
```css
@media print {
  section { page-break-inside: avoid; }
  #educacion { page-break-before: always; }
}
```

### Colores en impresión
- Forzar light mode: `[data-theme="dark"]` → sobreescribir variables a los valores light
- Asegurar contraste suficiente con texto negro sobre blanco

## Nota para el AssemblerAgent
Este fichero se inyecta como segunda hoja de estilos en el HTML final, después de `01-design-system.css`.

## Instrucciones

1. Lee los fragmentos `02-layout.html` hasta `05-content.html` para identificar los selectores a ocultar/mostrar
2. Crea `fragments/06-print.css` con todas las reglas de impresión
3. Actualiza `fragments/_state.json`: cambia el paso 6 a `in_progress`
4. Avisa al usuario para que valide abriendo `toni-wang-cv.html` en el navegador y probando Cmd+P / Ctrl+P (una vez ensamblado)
