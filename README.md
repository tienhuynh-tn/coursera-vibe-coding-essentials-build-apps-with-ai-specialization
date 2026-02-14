# Coursera Vibe Coding Essentials Projects

This repository contains three sub-projects from the Coursera specialization:

- `to-do-demo`: To-Do app (HTML/CSS/JS in a single page)
- `quote-generator`: Quote app (Next.js, static export)
- `calculator`: Calculator app (HTML/CSS/JS)

## Project Structure

```text
.
|-- to-do-demo/
|-- quote-generator/
|-- calculator/
`-- .github/workflows/
```

## Local Development

1. To-Do: open `to-do-demo/to-do-list/index.html` in your browser.
2. Calculator: open `calculator/index.html` in your browser.
3. Quote Generator:

```bash
cd quote-generator
npm ci
npm run dev
```

## GitHub Pages Deployment

Deployments are configured at repository root:

- `.github/workflows/deploy-todo.yml`
- `.github/workflows/deploy-quote.yml`
- `.github/workflows/deploy-calculator.yml`

Each workflow publishes a Pages site containing all apps at:

- `/todo/`
- `/quote/`
- `/calculator/`

Repository root page (`/`) includes quick links to all three.

## Setup Notes

1. In GitHub repository settings, set **Pages Source** to **GitHub Actions**.
2. Push to `main` (or run workflows manually from the Actions tab).

## Course Context

This project is part of the Coursera course:
Vibe Coding Essentials – Build Apps with AI Specialization
https://www.coursera.org/programs/fpt-faculty-learning-program-spring-2026-9n75a/specializations/vibe-coding

## Copyright

&copy; 2026 by Tien Huynh tienhuynh-tn, supported by Codex.
