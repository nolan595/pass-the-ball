# PassTheBall Admin — CLAUDE.md

## What This Is

Admin simulation platform for PassTheBall — a Hunch prediction game where users pick outcomes
across multiple Superbet sportsbook markets. Admins configure markets, register events, and create
game rounds. The simulation shows the full lifecycle: PENDING → OPEN → CLOSED → COMPLETED.

## Working Directory

All development happens inside `pass-the-ball/`. Run all commands from there:

```bash
npm run dev                  # start dev server
npm run build                # production build
npm run lint                 # ESLint
npx prisma migrate dev       # run migrations
npx prisma studio            # browse DB
npx prisma generate          # regenerate client after schema changes
```

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Prisma v7, PostgreSQL (Railway),
Tailwind CSS v4, Netlify hosting.

**Pattern:** All data mutations use Next.js Server Actions (`"use server"`) — not API routes.
Prisma client is generated to `app/generated/prisma` (non-standard). Always import types from there:

```ts
import type { GameStatus, DisplayType } from "@/app/generated/prisma";
```

## Key Files

| File | Purpose |
|------|---------|
| `lib/offer-api.ts` | Superbet Offer API client (Belgium: en-BE) — `fetchEvent`, `fetchEventsByDate` |
| `lib/prisma.ts` | Shared Prisma client singleton with pg adapter |
| `lib/utils.ts` | `cn()`, `formatDisplayType()`, `formatDateTime()`, `formatDate()` |
| `app/markets/` | CRUD for market configuration (marketId, name, displayType, enabled) |
| `app/events/` | Register external Superbet events by date search |
| `app/games/` | Game list, create form, detail view with live market odds |
| `app/games/[id]/MarketView.tsx` | Renders odds per display type (1×2, O/U, 1from2, PlayerProps) |

## Game Lifecycle

```
DRAFT → PENDING → OPEN → CLOSED → COMPLETED
```

- Status advances manually via `advanceGameStatus` server action.
- OPEN/PENDING: fetches live `odds[]` from Offer API for display.
- CLOSED/COMPLETED: fetches `oddsResults[]` with `?oddsResults=true` to show WON/LOST.

## Offer API

- Base URL: `https://production-superbet-offer-ng-be.freetls.fastly.net`
- Events endpoint: `GET /v2/en-BE/events/{eventId}` (add `?oddsResults=true` for results)
- By date: `GET /v2/en-BE/events/by-date?startDate=YYYY-MM-DD%2000:00:00`
- Filters to football only (`sportId === 5`)

## Data Model

- `Market` — admin-configured market templates (marketId maps to Superbet market IDs)
- `ExternalEvent` — registered Superbet event IDs, with name + matchDate
- `Game` — links event + time window + prize config (prizeType, bonusId, multiplier)

## Display Types

| Enum | Renders as |
|------|-----------|
| `ONE_X_TWO` | 3 columns: Home / Draw / Away, matched by `code` (1/X/2) |
| `OVER_UNDER` | Grid: threshold rows, Under/Over columns, grouped by `specifiers.total` |
| `ONE_FROM_TWO` | 2 columns: Yes / No |
| `PLAYER_PROPS` | Table: players × thresholds, grouped by `specifiers.player_name` |
| `PLAYER_PROPS_SINGLE` | Same as PLAYER_PROPS |

## Design System

- Font: `Outfit` via `next/font/google` (var `--font-outfit`)
- Page bg: `bg-slate-100`, cards: `bg-white shadow-sm rounded-2xl border border-slate-200`
- Primary accent: indigo-600; gradient: indigo-500→violet-600
- Labels: `uppercase tracking-widest font-bold text-[11px]`
- Tailwind v4 arbitrary opacity syntax (e.g. `bg-white/80`)

## Environment Variables

| Var | Used by |
|-----|---------|
| `DATABASE_URL` | Prisma (Railway PostgreSQL) |
