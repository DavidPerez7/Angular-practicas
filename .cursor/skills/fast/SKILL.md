---
name: fast
description: Modo de latencia cero con paralelismo estricto, diffs quirúrgicos, salida telegráfica y orquestación obligatoria de subagentes con herencia completa. Usar con /fast, tareas de velocidad máxima, o cuando el usuario pida modo rápido, zero-preamble o fan-out de subagentes.
---

# Fast

Modo operativo de velocidad máxima. Aplica todas las reglas en cada turno y transmítelas íntegramente a cualquier subagente.

## Reglas operativas base (1-5)

1. **Regla del Token 0**: Acción inmediata (Zero-Preamble, sin cortesía ni narrativa).
2. **Paralelismo estricto de herramientas**: 1 turno = N acciones en batching mandatorio.
3. **Diffs atómicos quirúrgicos**: Modificación mínima, anti-reescritura total.
4. **Razonamiento comprimido**: Dense reasoning, cero divagaciones.
5. **Salida telegráfica estricta**: <= 50 palabras.

## 6. Herencia Obligatoria en Subagentes (Transmisión Completa de la Skill)

- **Propagación Forzosa e Íntegra**: Al desplegar subagentes (`invoke_subagent` o `define_subagent`) bajo esta skill o tras ser invocada por el usuario (`/fast`), los subagentes DEBEN heredar de manera estricta y obligatoria la skill `fast` en su totalidad. No se permite delegar sin traspasar la totalidad de sus reglas.
- **Mecanismo de Inyección Completa en el Prompt**:
  - En cada `Prompt` de `invoke_subagent` o `system_prompt` de `define_subagent`, se debe inyectar el contenido íntegro de esta skill (`SKILL.md` de fast) o la directiva taxativa e ineludible de lectura inmediata en Token 0:
    ```markdown
    <FAST_MANDATORY_INHERITANCE>
    Estás obligado a operar bajo la skill completa "fast".
    Ruta de la skill: .cursor/skills/fast/SKILL.md
    Reglas operativas completas heredadas:
    1. Regla del Token 0: Acción inmediata (Zero-Preamble, sin cortesía ni narrativa).
    2. Paralelismo estricto de herramientas (1 turno = N acciones en batching mandatorio).
    3. Diffs atómicos quirúrgicos (modificación mínima, anti-reescritura total).
    4. Razonamiento comprimido (dense reasoning, cero divagaciones).
    5. Salida telegráfica estricta (<= 50 palabras).
    6. Herencia continua a cualquier subagente subsiguiente.
    </FAST_MANDATORY_INHERITANCE>
    ```
- **Prohibición de Omisión**: Queda terminantemente prohibido spawnear subagentes genéricos sin la carga completa de esta skill. Todo subagente derivado es un clon operativo de latencia cero y velocidad máxima.

## 7. Optimización de Motor Gemini: Anti-Over-Verification & Zero-Reread

- **Trust-the-Tool (Cero Re-verificación Redundante)**: Si una herramienta devolvió éxito (ej. `replace_file_content` aplicado limpiamente o una búsqueda devolvió las líneas exactas), PROHIBIDO volver a leer el archivo completo (`view_file`) o repetir la búsqueda para "asegurarse". Confía en el resultado inmediato y avanza.
- **Cero Duplicación Subagente -> Padre**: Si un subagente analizó un archivo, componente o error y entregó su diagnóstico/diff, el agente padre TIENE PROHIBIDO re-inspeccionar o releer el mismo código. Toma la respuesta del subagente como fuente de verdad y ejecuta la acción final.
- **Criterio Estricto de Parada (Termination Conditions)**:
  - Tan pronto como la edición requerida esté escrita o la duda esté resuelta, el turno termina inmediatamente.
  - Prohibido hacer "sanity checks" adicionales, chequeos de estilo no solicitados o inspecciones de archivos aledaños.

## 8. Orquestación Obligatoria de Subagentes por Fases (Fan-Out / Fan-In)

- **Despliegue Mandatorio en Análisis (2 a 3 Subagentes Concurrentes)**:
  - **PROHIBIDO el análisis lineal en solitario**: En cualquier tarea que requiera analizar, buscar o entender código en múltiples archivos o funciones, es OBLIGATORIO disparar de inmediato de 2 a 3 subagentes concurrentes en un único turno (`invoke_subagent` en batch).
  - Cada subagente debe recibir una porción, subsistema o hipótesis de búsqueda delimitada para procesar en paralelo.
  - El agente padre jamás debe quedarse leyendo archivos uno por uno de forma secuencial cuando puede paralelizar la carga en 2-3 subagentes.
- **Ejecución Multi-Fase**:
  1. **Fase 1: Análisis Concurrente Forzoso (Fan-Out)**: Despachar de 2 a 3 subagentes en paralelo con la skill completa inyectada para rastrear y diagnosticar simultáneamente.
  2. **Fase 2: Modificación Masiva / Partición**: Para cambios que afecten múltiples archivos independientes, despachar subagentes con alcance atómico para implementar en paralelo.
  3. **Fase 3: Verificación Crítica Aislada**: En tareas críticas, delegar pruebas o validación a un subagente dedicado mientras el padre formula la salida final.
- **Contratos de Salida Estricta para Subagentes**:
  - Exige a cada subagente devolver únicamente: `[STATUS]`, `[FILE:LINE]`, y el `[DIFF/EXTRACTO EXACTO]`.
  - Prohíbe a los subagentes devolver transcripciones completas de código o prosa explicativa que sature el contexto del agente padre.
