# PassTheBall — High Level Overview

PassTheBall is an admin simulation platform for a Hunch prediction game. Admins configure markets, register upcoming football events, and create game rounds. The platform pulls live odds from the Superbet Offer Server API and displays them to players in a structured market view.

---

## Data Sources

All live odds and event data comes from the **Superbet Offer Server API v2**, served via Fastly CDN:

```
Base URL: https://production-superbet-offer-ng-be.freetls.fastly.net
```

This is a public REST API — no auth token required. The current integration uses the Belgium feed (`en-BE`). Brazil uses a different base URL with `pt-BR` locale.

---

## Backend

The backend is **Next.js Server Actions and Server Components** — there is no separate API layer. All database reads and external API calls happen server-side at request time.

### Database (PostgreSQL via Prisma)

Three tables drive everything:

| Table | Purpose |
|---|---|
| `markets` | Admin-configured market templates — maps a Superbet `marketId` to a display type |
| `external_events` | Registered Superbet events (eventId, name, matchDate) |
| `games` | A round linking one event to a time window, prize config, and status |

### Offer Server API calls

Two endpoints are used, both called from `lib/offer-api.ts`:

**1. Events by date** — used on the Events admin page to search for upcoming matches:
```
GET /v2/en-BE/events/by-date?startDate=YYYY-MM-DD%2000:00:00
```
Returns all events on that date. Response is filtered to `sportId === 5` (football only) before being shown in the UI.

**2. Single event** — used on the Game detail page to fetch live odds:
```
GET /v2/en-BE/events/:eventId
GET /v2/en-BE/events/:eventId?oddsResults=true
```
The plain endpoint returns `odds[]` — active prematch/live prices. The `?oddsResults=true` variant returns `oddsResults[]` with each odd marked as `won` or `lost`, used once a game is closed or completed.

Which variant is called depends on game status:

```
DRAFT      → API not called (no odds needed)
PENDING    → /events/:eventId          → odds[]
OPEN       → /events/:eventId          → odds[]
CLOSED     → /events/:eventId?oddsResults=true  → oddsResults[]
COMPLETED  → /events/:eventId?oddsResults=true  → oddsResults[]
```

The response is a flat array of odds — every market for the event mixed together. The backend does not pre-group them; that happens on the frontend per market.

### Game lifecycle

Games move through five statuses, advanced manually by an admin:

```
DRAFT → PENDING → OPEN → CLOSED → COMPLETED
```

Status is updated via the `advanceGameStatus` Server Action. No automated transitions — all manual for simulation purposes.

---

## Frontend

The frontend is **Next.js App Router with React Server Components**. Pages fetch their own data server-side; client components handle interactivity (toggles, dialogs, collapsible markets).

### Key pages

| Route | What it does |
|---|---|
| `/markets` | CRUD for market configuration — add/edit/delete market templates |
| `/events` | Search the Offer API by date, register events to the DB |
| `/games` | List all game rounds with status |
| `/games/new` | Create a new round — pick event, set time window and prize config |
| `/games/[id]` | Game detail — live market odds view, status controls |

### Market rendering

The game detail page (`/games/[id]`) is the core player-facing view. The flow is:

1. Load all enabled `Market` records from the DB
2. Fetch the event from the Offer API (live or results depending on status)
3. For each market, filter the flat `odds[]` array by `odd.marketId === market.marketId`
4. Pass the filtered slice to the appropriate display template component in `MarketView.tsx`

Display templates (`MarketView.tsx`):

| Display Type | Layout | Key API fields |
|---|---|---|
| `ONE_X_TWO` | 3 columns: Home / Draw / Away | `odd.code` ("1", "X", "2") |
| `OVER_UNDER` | Grid: threshold rows × Under/Over cols | `odd.specifiers.total` |
| `ONE_FROM_TWO` | 2 columns: Yes / No | `odd.name` |
| `PLAYER_PROPS` | Table: players × thresholds | `odd.specifiers.player_name`, `odd.specifiers.total` |

See `docs/displayTypes.md` for full field-level detail on each template.

### Results view

When a game is `CLOSED` or `COMPLETED`, the same market cards render in results mode — each odd cell shows **WON** or **LOST** based on `odd.status` from the `oddsResults[]` response, colour-coded green/red.

---

## Infrastructure

| Layer | Service |
|---|---|
| Hosting | Netlify (`pass-the-ball.netlify.app`) |
| Database | PostgreSQL on Railway |
| Build | `npm run build` → `.next` → `@netlify/plugin-nextjs` |
| CI/CD | GitHub (`nolan595/pass-the-ball`) → webhook → Netlify auto-deploy on push to `main` |
