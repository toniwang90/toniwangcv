# /reset-step [número] — Reinicio de un paso del pipeline

Resetea el estado de un paso específico (y opcionalmente los pasos dependientes) en `fragments/_state.json` para permitir su re-ejecución.

## Uso

```
/reset-step 3           → resetea solo el paso 3
/reset-step 3 cascade   → resetea el paso 3 y todos los pasos posteriores (4, 5, 6, 7, 8)
```

## Comportamiento

1. Lee `fragments/_state.json`
2. Identifica el paso indicado
3. **Muestra un resumen del impacto** antes de actuar:
   ```
   Paso 3 (timeline-agent) → estado actual: validated
   
   ⚠️  Dependencias que se verán afectadas:
   - Paso 4 (skills-agent): validated
   - Paso 5 (content-agent): validated
   - Paso 6 (print-agent): pending
   - Paso 7 (assembler-agent): pending
   - Paso 8 (qa-agent): pending
   
   ¿Resetear solo el paso 3, o también los pasos dependientes?
   → /reset-step 3          (solo paso 3)
   → /reset-step 3 cascade  (paso 3 + todos los posteriores)
   ```
4. **Espera confirmación explícita** del usuario antes de modificar `_state.json`
5. Tras confirmación, actualiza el estado del paso (y dependientes si `cascade`) a `pending`
6. Actualiza `current_step` al paso reseteado más bajo
7. Confirma los cambios realizados

## Estados resultantes tras el reset

| Paso reseteado | Estado resultante |
|----------------|------------------|
| El paso indicado | `pending` |
| Pasos posteriores (con `cascade`) | `pending` |
| Pasos anteriores | Sin cambios |

## Casos de uso típicos

- El agente de un paso generó código incorrecto y se quiere re-ejecutar
- El usuario modificó manualmente un fragmento y quiere que el pipeline lo reconozca como no-validado
- Se cambió `CV_DATA` (paso 0) y se necesita re-ejecutar todo: `/reset-step 1 cascade`

## Notas

- **No borra** los ficheros de fragmentos — solo cambia el estado en `_state.json`
- Si se resetea a un paso ya validado, el fragmento físico sigue existiendo — el agente lo sobreescribirá al re-ejecutarse
- Siempre pide confirmación antes de escribir — nunca resetea sin aprobación explícita del usuario
