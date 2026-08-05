# Ricardo & Genesis · Invitación de boda

Landing page de una sola página que funciona como invitación formal de la boda de **Ricardo Márquez** y **Genesis Caldera**, el **sábado 28 de noviembre de 2026 a las 5:00 PM (EST)**. Pensada para compartirse principalmente por WhatsApp: se abre con un sobre animado que arranca la música de fondo, e incluye cuenta regresiva, fecha y lugar, programa, código de vestimenta y confirmación de asistencia.

Construida con [Astro](https://astro.build) 7 + [Tailwind CSS](https://tailwindcss.com) 4, 100% estática (sin backend), en una paleta azul empolvado / marfil.

## Contenido de la invitación

0. **Sobre de apertura** — portada con un sobre animado; al tocarlo se abre y arranca la música de fondo.
1. **Hero** — nombres de los novios y anuncio de la boda, con la foto (o placeholder) a pantalla completa.
2. **Invitación formal** — texto ceremonial, con espacio opcional para los padres.
3. **Cuenta regresiva** — hasta el instante exacto de la ceremonia.
4. **Fecha y lugar** — con botones "Cómo llegar" y "Añadir al calendario" (Google Calendar + `.ics`).
5. **Programa** — orden de la celebración.
6. **Código de vestimenta** — con paleta de colores sugerida.
7. **Nota de solo adultos**.
8. **Confirmación de asistencia (RSVP)** — botón directo a WhatsApp.
9. **Footer**.

## Requisitos

- **Node.js ≥ 22.12** (requerido por Astro 7; el proyecto no arranca con Node 20 o anterior).
- npm 10+.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | `astro check` (tipos) + build estático a `dist/`. |
| `npm run preview` | Sirve `dist/` localmente para revisar el build de producción. |

## Cómo completar los datos pendientes

Todo el contenido variable de la invitación vive en un único archivo:

```
src/data/wedding.ts
```

Los campos que todavía faltan están marcados literalmente como `"PENDIENTE"` con un comentario indicando el formato esperado:

| Campo | Dónde afecta |
|---|---|
| `venue.name`, `venue.addressLine`, `venue.mapsUrl` | Sección "Fecha y lugar". Si `mapsUrl` sigue en `"PENDIENTE"`, el botón "Cómo llegar" simplemente no se muestra (no genera un enlace roto). |
| `rsvp.whatsappPhone` (formato internacional sin signos, ej. `"584121234567"`) | Si sigue en `"PENDIENTE"`, la sección de RSVP muestra un aviso en vez de un botón de WhatsApp roto. |
| `rsvp.deadlineDisplay` | Fecha límite mostrada en la sección de RSVP. |
| `program` | Arreglo editable libremente: agregar, quitar o reordenar hitos del programa. |
| `parents.groom` / `parents.bride` | Opcional. Dejar los arreglos vacíos si no se quiere mostrar a los padres. |

**No hace falta tocar ningún componente de sección para actualizar estos datos** — es el propósito de tener una única fuente de verdad.

### La fecha de la boda

`weddingDateISO` en `wedding.ts` lleva un offset explícito (`"2026-11-28T17:00:00-05:00"`), no el texto `"EST"`. De ahí derivan automáticamente la cuenta regresiva, el archivo `.ics` y el enlace de Google Calendar — cada invitado, sin importar su zona horaria, cuenta hasta el mismo instante real. Si la hora de inicio cambia, solo hay que actualizar esta constante.

## Cómo agregar las fotos

Mientras no hay fotos, cada espacio de imagen usa el componente `src/components/PhotoSlot.astro`, que muestra un degradado con el monograma "R&G" y reserva exactamente el espacio final (mismo `aspect-ratio`), para que sustituir el placeholder no mueva ningún otro elemento de la página.

Para poner una foto real:

```astro
---
import miFoto from '../../assets/foto-hero.jpg';
---
<PhotoSlot src={miFoto} alt="Ricardo y Genesis" ratio="cover" priority />
```

Astro optimiza la imagen automáticamente (WebP, tamaños responsivos) al hacer build. Actualmente solo el hero (`src/components/secciones/Hero.astro`) usa una foto; si se agregan más adelante, se instancia `PhotoSlot` de la misma forma en cualquier otra sección.

## Sistema de diseño

- **Paleta**: tokens definidos en `src/styles/global.css` (bloque `@theme` de Tailwind v4) — `ivory`, `white`, `mist`, `sky`, `periwinkle`, `dusty`, `deep`, `ink`, `champagne`. Generan las utilidades `bg-*`, `text-*`, `border-*` directamente.
- **Tipografía**: Cormorant Garamond (serif, cuerpo y títulos), Great Vibes (script, acentos) y Jost (etiquetas y cifras), cargadas con la Fonts API nativa de Astro (`astro.config.mjs`).
- **Componentes reutilizables** en `src/components/`: `Section`, `Ornament`, `PhotoSlot`, `LinkButton`, `Countdown`, `FloatingRsvp`, `SobreApertura`. Las secciones de contenido viven en `src/components/secciones/`.
- **Revelado al scroll**: progresivo — sin JavaScript, toda la página es legible de inmediato; con JS, cada sección aparece con un fundido sutil al entrar en pantalla (`src/scripts/reveal.ts`).
- **Sobre de apertura**: mismo patrón de mejora progresiva — sin JavaScript no existe en el HTML (la invitación es accesible de inmediato); con JS, bloquea la página (`inert` + scroll bloqueado) hasta que se toca el sobre, gesto que además arranca la música (`src/components/SobreApertura.astro`, `src/scripts/sobre-apertura.ts`).

## Estructura del proyecto

```
src/
├── data/wedding.ts       # única fuente de verdad de todo el contenido
├── lib/calendar.ts       # generación de enlaces de Google Calendar y .ics
├── styles/global.css     # tokens de diseño y utilidades de Tailwind v4
├── layouts/Base.astro    # <head>, fuentes, Open Graph, favicon
├── components/           # componentes compartidos (Section, PhotoSlot, etc.)
│   └── secciones/         # una sección de la página por archivo
├── scripts/              # countdown, revelado, RSVP flotante, sobre de apertura
└── pages/index.astro     # compone las secciones en orden
```

## Flujo de trabajo con Git

Este repositorio sigue un flujo Git Flow simplificado:

- **`main`** — rama de despliegue. Solo recibe merges de `develop`.
- **`develop`** — rama de integración. Todo el trabajo pasa por aquí antes de llegar a `main`.
- **`feature/<nombre>`** — una rama por bloque de trabajo, creada desde `develop` actualizado y mergeada de vuelta con `--no-ff`.

```bash
git switch develop && git pull origin develop
git switch -c feature/mi-cambio
# ... commits ...
git push -u origin feature/mi-cambio
git switch develop && git merge --no-ff feature/mi-cambio
git push origin develop
```

`main` solo se actualiza mergeando `develop` cuando hay un conjunto de cambios listo para publicarse.

## Despliegue

Es un sitio 100% estático (`npm run build` genera `dist/`), desplegable en cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.).

Antes de publicar, actualizar `site` en `astro.config.mjs` con el dominio final — de ahí se derivan las URLs absolutas de Open Graph (`og:image`, `og:url`) necesarias para que el enlace se vea bien al compartirse por WhatsApp.

## Licencia

MIT — ver [LICENSE](LICENSE).
