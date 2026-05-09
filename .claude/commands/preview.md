# /preview — Servidor local + apertura en browser

Sirve el CV localmente y lo abre en el browser. Detecta automáticamente qué fichero abrir según el estado del pipeline.

## Comportamiento

1. Lee `fragments/_state.json` para determinar el artefacto más avanzado disponible:
   - Si existe `toni-wang-cv.html` → sirve el fichero raíz del proyecto
   - Si no, busca el fragmento visual más reciente en orden: `05-content.html`, `04-skills.html`, `03-timeline.html`, `02-layout.html`, `design-test.html`

2. Lanza un servidor HTTP en el directorio raíz del proyecto:
   ```bash
   python3 -m http.server 8765 --directory /Users/tonywang/Documents/GitHub/toniwangcv
   ```
   Si el puerto 8765 está ocupado, prueba 8766, 8767 (hasta 3 intentos).

3. Abre el fichero en el browser:
   ```bash
   open http://localhost:8765/[fichero-detectado]
   ```

4. Informa al usuario de qué está sirviendo y en qué URL.

## Notas

- El servidor corre en background — el usuario puede pararlo con Ctrl+C en la terminal donde lo lanzó, o cerrando el proceso manualmente
- Si ningún artefacto visual existe aún, informa al usuario: "No hay artefacto visual disponible. Ejecuta `/build` para empezar."
- No modifica ningún fichero del proyecto

## Ejemplo de output esperado

```
Sirviendo: toni-wang-cv.html
URL: http://localhost:8765/toni-wang-cv.html

Servidor HTTP activo en puerto 8765.
```
