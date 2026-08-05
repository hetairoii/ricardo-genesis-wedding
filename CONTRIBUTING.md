# Guía de flujo de trabajo

Este documento define cómo se organiza el trabajo en este repositorio: ramas, issues, commits, Pull Requests y releases. Es la fuente de contexto para saber *cómo* se hace cualquier cambio, no solo *qué* cambio hacer — así que antes de crear una rama o abrir un PR, esto es lo que aplica.

## Modelo de ramas

```
main ────────────────────────────────────────●   despliegue
  └── develop ──●────●────●────●────●────●───┘   integración
        ├── feature/sobre-apertura ──┘
        ├── fix/countdown-calculo ───┘
        └── docs/actualizar-readme ──┘
```

| Rama | Propósito | Recibe merges de | Recibe commits directos |
|---|---|---|---|
| `main` | Rama de despliegue. Siempre debe estar lista para publicarse. | `develop`, o `hotfix/*` en una emergencia | Nunca |
| `develop` | Rama de integración. Todo el trabajo confluye aquí antes de `main`. | Ramas de trabajo, vía PR | Nunca |
| `feature/*` | Una funcionalidad nueva o un cambio visible para el invitado. | — | Sí (es tu rama) |
| `fix/*` | Corrección de un bug. | — | Sí |
| `chore/*` | Mantenimiento: limpieza de código muerto, dependencias, config. | — | Sí |
| `docs/*` | Documentación (README, esta guía, comentarios de arquitectura). | — | Sí |
| `hotfix/*` | Corrección urgente ya en producción; parte de `main`, se mergea a `main` **y** a `develop`. | — | Sí |

Toda rama de trabajo nace de `develop` actualizado y muere al mergearse — nunca se reutiliza.

## Ciclo estándar

```bash
# 1. Punto de partida siempre limpio
git switch develop
git pull origin develop

# 2. Rama nueva, nombrada por el issue que resuelve
git switch -c feature/nombre-descriptivo

# 3. Trabajo + commits (ver convención abajo)
git add <archivos>
git commit -m "feat(area): descripción breve"

# 4. Publicar la rama
git push -u origin feature/nombre-descriptivo

# 5. Abrir el PR contra develop (no contra main)
gh pr create --base develop --title "..." --body "Closes #N"

# 6. Tras aprobarse: merge con --no-ff, y borrar la rama
git switch develop
git merge --no-ff feature/nombre-descriptivo
git push origin develop
git push origin --delete feature/nombre-descriptivo
git branch -d feature/nombre-descriptivo
```

## Cuándo crear un issue

**Regla operativa: todo cambio que toque código, contenido o configuración nace de un issue.** Esto incluye bugs, funcionalidades nuevas, refactors, cambios de contenido (datos de la boda, copys) y ajustes de configuración del repo.

**Excepciones** (no requieren issue, pero sí commit descriptivo y, si el cambio es no trivial, PR igual):
- Corregir un typo o error de formato.
- Actualizar un dato puntual en `src/data/wedding.ts` que no cambia comportamiento (ej. rellenar un campo `"PENDIENTE"`).
- Un `README.md` o comentario que aclara algo ya existente.

**Título**: `tipo: descripción en imperativo` — mismo vocabulario que los commits (`feat`, `fix`, `chore`, `docs`, `a11y`, `perf`). Ejemplos: `feat: sobre de apertura con animación`, `fix: countdown muestra 60 en vez de 00`.

**Contenido mínimo de un issue**:
- Qué se quiere lograr o qué está fallando (con pasos para reproducir si es un bug).
- Por qué importa / a quién afecta.
- Criterios de aceptación — cómo se sabe que está resuelto.
- Archivos o áreas del código probablemente involucradas, si se conocen.

## Etiquetas

Tres ejes combinables:

| Eje | Etiquetas | Uso |
|---|---|---|
| Tipo | `bug`, `enhancement`, `documentation`, `a11y`, `perf`, `question` | Qué clase de cambio es. `a11y` y `perf` son propias del proyecto; el resto vienen por defecto en GitHub. |
| Área | `area:contenido`, `area:diseño`, `area:infra` | Qué parte del proyecto toca: datos/copys de la boda, UI/estilos, o herramienta/configuración del repo. |
| Prioridad | `prio:alta`, `prio:media`, `prio:baja` | Urgencia relativa. Todo lo que bloquea el envío de la invitación es `prio:alta`. |

Un issue típico lleva una etiqueta de cada eje, ej. `bug` + `area:diseño` + `prio:alta`.

## Convención de commits

[Conventional Commits](https://www.conventionalcommits.org/), ya en uso en el historial:

```
tipo(alcance): descripción breve en presente/imperativo

Cuerpo opcional explicando el *por qué*, no el *qué* (el diff ya dice qué cambió).
```

Tipos: `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`.

Ejemplos reales de este repo:
```
feat(hero-invitacion): secciones 1-2 (hero e invitacion formal)
feat(seo-share): Open Graph completo, favicon y preview para WhatsApp
fix(countdown): corregir calculo que mostraba 60 y valores negativos
docs: agregar README con descripcion del proyecto y guia de uso
```

## Pull Requests

- **Siempre contra `develop`**, nunca contra `main` (ver sección de forks más abajo — esto es lo que falló en el PR #1).
- Usar la plantilla de `.github/pull_request_template.md`.
- Vincular el issue que cierra con `Closes #N` en la descripción — el merge cierra el issue automáticamente.
- Preferir PRs pequeños y enfocados en una sola cosa; si un cambio crece mucho, es señal de que debería partirse en varios issues.
- **Checklist antes de abrir el PR** (ver también la plantilla):
  - `npm run build` corre sin errores ni warnings.
  - Sin scroll horizontal en 375 / 768 / 1024 / 1440 px.
  - Contraste de texto cumple AA (4.5:1 normal, 3:1 texto grande ≥24px).
  - La página es legible con JavaScript desactivado.
  - `prefers-reduced-motion` se respeta en cualquier animación nueva.

## Política de merge

- **`--no-ff` siempre** al mergear a `develop` o `main` — conserva un merge commit identificable por rama en vez de disolver el historial en una línea plana.
- En un proyecto de un solo desarrollador activo, el propio autor puede aprobar y mergear su PR tras pasar el checklist; la plantilla de PR existe igual para dejar rastro de qué se revisó.
- Con más de un colaborador, ningún PR se automerge sin al menos una aprobación de otra persona.

## Colaboradores externos y PRs desde forks

Un PR desde un fork **siempre apunta a `develop`**, nunca a `main`. `main` es la rama de despliegue y solo debe recibir código que ya pasó por `develop`.

Si alguien abre un PR contra `main` por error (como ocurrió con el PR #1, que entró desde `Annimus1:main` directo a `main`):
1. No mergear.
2. Pedir en el PR que se re-apunte a `develop` (`gh pr edit <N> --base develop`, si el autor tiene permisos, o cerrarlo y pedir que abran uno nuevo contra `develop`).
3. Si ya se mergeó por error, replicar el cambio en `develop` vía cherry-pick o un nuevo PR, para que ambas ramas queden consistentes con el mismo origen.

## Releases

`develop → main` se mergea solo cuando hay un conjunto de cambios completo y verificado — no en cada PR individual. Al mergear:

```bash
git switch main
git merge --no-ff develop -m "Merge develop into main: <resumen del release>"
git push origin main
git switch develop
```

Etiquetar el release con una versión semántica (`v0.2.0`, etc.) cuando el conjunto de cambios sea significativo:

```bash
git tag -a v0.2.0 -m "Sobre de apertura, correcciones de countdown y aportes"
git push origin v0.2.0
```

## Higiene de ramas

- Borrar la rama (local y remota) inmediatamente después de mergear — ver paso 6 del ciclo estándar.
- No dejar ramas `feature/*` mergeadas acumulándose en el remoto; si una rama lleva más de una semana sin actividad y no está mergeada, evaluar si sigue viva o se cierra.

## Protección de ramas (pendiente de activar)

Recomendado para `main` y `develop` una vez el flujo esté rodado, pero requiere aprobación explícita porque mal configurado bloquea el propio flujo de trabajo:

```bash
gh api repos/hetairoii/ricardo-genesis-wedding/branches/main/protection \
  --method PUT \
  -f required_status_checks=null \
  -f enforce_admins=false \
  -f required_pull_request_reviews[required_approving_review_count]=1 \
  -f restrictions=null
```

(Repetir para `develop`, ajustando `required_approving_review_count` a `0` si se trabaja en solitario.) No se ha activado todavía.
