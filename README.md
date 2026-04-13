# Coursera Vibe Coding Essentials Projects

This repository contains six projects from the Coursera specialization.

- `to-do-demo`: To-Do app (HTML, CSS, JavaScript)
- `calculator`: Calculator app (HTML, CSS, JavaScript)
- `quote-generator`: Quote app (Next.js, static export)
- `task-checklist`: Task checklist app (Next.js, static export)
- `snake-game`: Snake game app (Next.js, static export)
- `weather-data-fetcher`: MCP server for mock package tracking and weather data (Node.js, TypeScript)

## Project Structure

```text
.
|-- to-do-demo/
|-- calculator/
|-- quote-generator/
|-- task-checklist/
|-- snake-game/
|-- weather-data-fetcher/
`-- .github/workflows/
```

## Local Development

1. To-Do Demo:

```bash
open to-do-demo/to-do-list/index.html
```

2. Calculator:

```bash
open calculator/index.html
```

3. Quote Generator:

```bash
cd quote-generator
npm ci
npm run dev
```

4. Task Checklist:

```bash
cd task-checklist
npm ci
npm run dev
```

5. Snake Game:

```bash
cd snake-game
npm ci
npm run dev
```

6. Weather Data Fetcher:

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

The weather project exposes stdio-based MCP tools and resources. See [weather-data-fetcher/README.md](/Users/tienhuynh-tn/Study/coursera/coursera-vibe-coding-essentials-build-apps-with-ai-specialization/weather-data-fetcher/README.md) for the project-specific commands and behavior.

## GitHub Pages Deployment

Pages deployment is handled by GitHub Actions workflows in `.github/workflows/`.

- `deploy-todo.yml`
- `deploy-calculator.yml`
- `deploy-quote.yml`
- `deploy-task-checklist.yml`
- `deploy-snake-game.yml`

Each workflow assembles and publishes all apps to these routes:

- `/todo/`
- `/calculator/`
- `/quote/`
- `/task-checklist/`
- `/snake-game/`

`weather-data-fetcher` is a local MCP server project and is not part of the GitHub Pages deployment.

## Pages Setup

1. In repository settings, open **Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` or run a deploy workflow manually from **Actions**.

## Course Context

This project is part of the Coursera course:
Vibe Coding Essentials - Build Apps with AI Specialization
https://www.coursera.org/programs/fpt-faculty-learning-program-spring-2026-9n75a/specializations/vibe-coding

## Copyright

Copyright 2026 Tien Huynh (`tienhuynh-tn`), supported by Codex.
