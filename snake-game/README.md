# Snake Game (Next.js)

This is a Snake game built with Next.js (App Router + TypeScript + Tailwind CSS).

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

The project is configured with static export (`output: "export"`), so build output is generated in `out/`.

## GitHub Pages deployment

This app is deployed from the repository root GitHub Actions workflow:

- `../.github/workflows/deploy-snake-game.yml`

On Pages, the app is available at:

- `/snake-game/`
