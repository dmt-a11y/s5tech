# s5tech

React + TypeScript app built with Vite, styled with Tailwind CSS v4, forms handled with React Hook Form + Zod.

## Requirements

- Node.js 20+ (developed against Node 22)
- npm

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`) — open it in a browser.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure

```
src/
  modules/
    WalletPage/   — wallet balances list (fetch, filter/sort, render)
    SwapForm/     — token swap form (React Hook Form + Zod)
    SumOfN/       — misc exercise module
  shares/
    modules/      — cross-feature building blocks (e.g. Toast)
```

Each feature module follows the same internal layout: `hooks/` for data + state, `helpers/` for pure logic, `components/` for presentational pieces, and a `styles.ts` collecting that module's Tailwind class strings.

## Docs

Before touching a module, check [`docs/`](./docs) — write-ups of non-obvious decisions, bug fixes, and refactors live there rather than in code comments. Start with [`docs/wallet-page-code-review.md`](./docs/wallet-page-code-review.md) for the reasoning behind `WalletPage`'s current structure.
