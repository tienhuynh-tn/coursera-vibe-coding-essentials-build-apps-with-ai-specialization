# Coursera Vibe Coding Essentials Projects

This repository collects the hands-on projects built for the Coursera specialization "Vibe Coding Essentials - Build Apps with AI". It includes browser apps, static Next.js exports, and one local MCP server project.

## Projects

### Static browser apps

- `to-do-demo`: To-Do app
- `calculator`: Calculator app
- `cake-raffle-app`: Cake raffle picker
- `drum-kit-app`: Drum pad with keyboard-triggered sounds
- `face-bomp`: Reflex game with image and sound effects
- `interactive-event-invite`: RSVP event invite page
- `smart-home-mobile-interface`: Smart home mobile control mockup

### Static Next.js apps

- `quote-generator`: Quote generator
- `task-checklist`: Task checklist app
- `snake-game`: Snake game

### Local Node.js project

- `weather-data-fetcher`: MCP server for mock package tracking and weather data

## Repository Layout

```text
.
|-- .github/workflows/deploy-pages.yml
|-- calculator/
|-- cake-raffle-app/
|-- drum-kit-app/
|-- face-bomp/
|-- interactive-event-invite/
|-- quote-generator/
|-- smart-home-mobile-interface/
|-- snake-game/
|-- task-checklist/
|-- to-do-demo/
`-- weather-data-fetcher/
```

## Local Development

### Open static apps directly

```bash
open to-do-demo/to-do-list/index.html
open calculator/index.html
open cake-raffle-app/index.html
open drum-kit-app/index.html
open face-bomp/index.html
open interactive-event-invite/index.html
open smart-home-mobile-interface/index.html
```

### Run Next.js apps

```bash
cd quote-generator
npm ci
npm run dev
```

```bash
cd task-checklist
npm ci
npm run dev
```

```bash
cd snake-game
npm ci
npm run dev
```

### Run the MCP server project

```bash
cd weather-data-fetcher
npm install
npm install -D tsx
npx tsx server.ts
```

To inspect the MCP server:

```bash
cd weather-data-fetcher
npx @modelcontextprotocol/inspector@latest
```

See [weather-data-fetcher/README.md](/Users/tienhuynh-tn/Study/coursera/coursera-vibe-coding-essentials-build-apps-with-ai-specialization/weather-data-fetcher/README.md) for project-specific details.

## GitHub Pages Deployment

GitHub Pages is published by a single workflow: `.github/workflows/deploy-pages.yml`.

The workflow:

- builds the three Next.js apps as static exports
- copies each static app into the Pages artifact
- publishes one combined site from the `main` branch through GitHub Actions

Published routes:

- `/todo/`
- `/calculator/`
- `/quote/`
- `/task-checklist/`
- `/snake-game/`
- `/cake-raffle/`
- `/drum-kit/`
- `/face-bomp/`
- `/event-invite/`
- `/smart-home/`

`weather-data-fetcher` is intentionally excluded from GitHub Pages because it runs as a local MCP server, not a static site.

## Pages Setup

1. In repository settings, open **Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` or run **Deploy GitHub Pages** manually from the **Actions** tab.

## Course Context

This repository is part of the Coursera course:
Vibe Coding Essentials - Build Apps with AI Specialization

[Course link](https://www.coursera.org/programs/fpt-faculty-learning-program-spring-2026-9n75a/specializations/vibe-coding)

## Copyright

Copyright 2026 Tien Huynh (`tienhuynh-tn`), supported by Codex.
