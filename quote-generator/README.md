# Quote Generator

A simple quote generator built with Next.js for learning and practice. It fetches random quotes and updates the page with a minimal UI.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

- Local URL: http://localhost:3000
- Entry file: `src/app/page.tsx`

## Features

- Generate and display random quotes
- Refresh quote content with a button click
- Built as a focused learning project

## Tech Stack

- Next.js (App Router, create-next-app)
- React
- TypeScript
- next/font (Geist)

## Deployment

### GitHub Pages

This app is configured for static export (`output: "export"` in `next.config.ts`) and deployed from the monorepo root workflows:

- `.github/workflows/deploy-quote.yml`
- `.github/workflows/deploy-todo.yml`
- `.github/workflows/deploy-calculator.yml`

Steps:

1. Push the project to GitHub with a `main` branch.
2. In your repository, open `Settings > Pages`.
3. Set Source to `GitHub Actions`.
4. Push to `main` (or run the workflow manually from the Actions tab).

Published route for this app: `/quote/`

## Course Context

This project is part of the Coursera course:
Vibe Coding Essentials – Build Apps with AI Specialization
https://www.coursera.org/programs/fpt-faculty-learning-program-spring-2026-9n75a/specializations/vibe-coding

## Copyright

&copy; 2026 by Tien Huynh tienhuynh-tn, supported by Codex.
