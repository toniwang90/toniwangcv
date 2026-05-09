# /validate-step [número] — Validación manual de un paso

Ejecuta los validadores (DesignGuardian y/o UX Advisor) sobre el fragmento de un paso específico sin necesidad de pasar por el flujo completo de `/build`.

## Uso

```
/validate-step 2        → valida fragments/02-layout.html
/validate-step 3 ux     → solo UX Advisor sobre fragments/03-timeline.html
/validate-step 4 css    → solo DesignGuardian sobre fragments/04-skills.html
/validate-step 1        → DesignGuardian + UX Advisor sobre 01-design-system.css
```

Si no se especifica modificador, corre **ambos validadores** cuando aplica.

## Mapa de pasos y validadores

| Paso | Fragmento | DesignGuardian | UX Advisor |
|------|-----------|:--------------:|:----------:|
| 0 | `fragments/00-cv-data.js` | No | No |
| 1 | `fragments/01-design-system.css` | Sí | No |
| 2 | `fragments/02-layout.html` | Sí | Sí |
| 3 | `fragments/03-timeline.html` | Sí | Sí |
| 4 | `fragments/04-skills.html` | Sí | Sí |
| 5 | `fragments/05-content.html` | Sí | Sí |
| 6 | `fragments/06-print.css` | Sí | No |
| 7 | `toni-wang-cv.html` | No | Sí |
| 8 | — | No | No |

## Comportamiento

1. Lee `fragments/_state.json` para identificar el fragmento del paso indicado
2. Verifica que el fragmento existe en disco — si no existe, informa y detiene
3. Invoca los validadores correspondientes vía Task tool:
   - `design-guardian` con instrucción de revisar el fragmento específico
   - `ux-advisor` con instrucción de revisar el fragmento específico
4. Muestra los informes de ambos validadores
5. **No modifica `_state.json`** — este comando es de solo lectura

## Casos de uso típicos

- Re-validar un fragmento tras corregir un problema detectado por el DesignGuardian
- Pedir una segunda opinión de UX antes de avanzar al siguiente paso
- Verificar que una corrección manual no introdujo nuevas violaciones

## Notas

- No avanza el pipeline — solo valida
- El estado en `_state.json` no cambia tras ejecutar este comando
- Para marcar un paso como `validated`, el usuario debe confirmarlo explícitamente en el flujo de `/build`
