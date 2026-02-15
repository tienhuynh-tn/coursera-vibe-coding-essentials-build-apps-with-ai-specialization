# Task Checklist

A task checklist app built with Next.js and Tailwind CSS.

## Features

- Add new tasks
- Toggle completion with checkbox
- Strikethrough style for completed tasks
- Delete tasks
- Persist tasks in `localStorage`
- Background image UI with centered card layout

## Getting Started

Run the development server:

```bash
npm run dev
```

- Local URL: http://localhost:3000
- Main page file: `src/app/page.tsx`
- Main component: `src/components/TaskChecklist.tsx`

## Deployment

### GitHub Pages

This app is configured for static export in `next.config.ts` and deployed from monorepo root workflows:

- `.github/workflows/deploy-task-checklist.yml`
- `.github/workflows/deploy-todo.yml`
- `.github/workflows/deploy-quote.yml`
- `.github/workflows/deploy-calculator.yml`

Published route for this app: `/task-checklist/`

## Course Context

This project is part of the Coursera course:
Vibe Coding Essentials – Build Apps with AI Specialization
https://www.coursera.org/programs/fpt-faculty-learning-program-spring-2026-9n75a/specializations/vibe-coding

## Copyright

&copy; 2026 by Tien Huynh tienhuynh-tn, supported by Codex.
