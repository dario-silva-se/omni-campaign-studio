---
name: omni-campaign-studio-setup
description: Use when starting, running, testing, building, or linting the omni-campaign-studio React project. Use to understand npm scripts, environment variables, mock mode, or project stack.
---

# omni-campaign-studio Setup

## Stack

React 19 · TypeScript 6 · Vite 8 · TailwindCSS 3 · React Query 5 · React Router 7 · i18next · Vitest 4 · Testing Library · jsdom

## First-time Setup

```bash
# Only needed on a fresh clone — skip if node_modules already present
npm install
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server at **http://localhost:5173** |
| `npm run build` | `tsc -b` + Vite build → `/dist` |
| `npm run preview` | Serve `/dist` locally |
| `npm run lint` | ESLint 10 + typescript-eslint |
| `npm run test` | Vitest single run (48 files · 179 tests) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run coverage` | v8 coverage report → `/coverage` |

## Environment Variables

| File | Used by | `VITE_USE_MOCKS` | `VITE_API_URL` |
|---|---|---|---|
| `.env.development` | `npm run dev` | `true` | `/api` |
| `.env.test` | `npm test` | `true` | — |
| `.env.example` | reference | `false` | `/api` |

**Mock mode** (`VITE_USE_MOCKS=true`): all data served from `src/mocks/fixtures/` — no backend required.

To connect a real backend, create `.env.local`:
```
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCKS=false
```

## TypeScript Config

- Path alias: `@/` → `src/`
- Strict: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- `erasableSyntaxOnly` — syntax that can't be stripped via erase-only transform is forbidden

## Known Issues

- `npm run lint` has **1 error**: `src/contexts/ThemeContext.tsx:38`
  Rule: `react-refresh/only-export-components`
  Cause: file exports a non-component alongside a component, breaking Vite HMR fast-refresh.
