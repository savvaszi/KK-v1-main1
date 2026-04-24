# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the Krypto Knight institutional crypto fintech landing page.

## Artifacts

- **krypto-knight** (`artifacts/krypto-knight/`) — Main marketing/landing page website. React + Vite, dark institutional design with electric green accents. MiCA-regulated crypto infrastructure landing page.
- **api-server** (`artifacts/api-server/`) — Shared Express 5 backend API server.
- **mockup-sandbox** (`artifacts/mockup-sandbox/`) — Design prototyping sandbox.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion

## Krypto Knight Site Structure

- `artifacts/krypto-knight/src/pages/Home.tsx` — Main page composition
- `artifacts/krypto-knight/src/pages/sections/` — Individual page sections:
  - `HeroSection.tsx` — Hero with knight logo and CTAs
  - `TrustStrip.tsx` — MiCA/CySEC compliance badges
  - `CoreServices.tsx` — Product offerings (5 modules)
  - `PlatformShowcase.tsx` — Live-looking dashboard with recharts
  - `WhyKryptoKnight.tsx` — Differentiation section
  - `UseCases.tsx` — Enterprise/fund/fintech use cases
  - `FinalCta.tsx` — Conversion section
- `artifacts/krypto-knight/src/components/Navbar.tsx` — Fixed top navbar
- `artifacts/krypto-knight/src/components/Footer.tsx` — Site footer
- `artifacts/krypto-knight/public/` — Brand assets (knight-logo.png, knight-head.png, knight-full.png)

## Brand Design System

- **Background**: Deep navy/black (#0A0A0F, #0D0F18)
- **Accent**: Electric green (#00FF9C)
- **Font**: Inter
- **Style**: Dark mode, glassmorphism, Framer Motion animations

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
