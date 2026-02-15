# Task Checklist

A task checklist app built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Persist tasks in `localStorage`

## Local Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

This app uses static export (`output: "export"`), so build output is generated in `out/`.

## GitHub Pages Deployment

Primary workflow:

- `../.github/workflows/deploy-task-checklist.yml`

Published route:

- `/task-checklist/`

## Course Context

This project is part of the Coursera course:
Vibe Coding Essentials - Build Apps with AI Specialization
https://www.coursera.org/programs/fpt-faculty-learning-program-spring-2026-9n75a/specializations/vibe-coding
