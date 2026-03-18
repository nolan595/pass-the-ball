# PassTheBall — Display Types

This document is the reference for BE and FE developers working with market display templates in PassTheBall. It covers how each display type maps to Superbet Offer Server API fields, the parsing logic, and how the FE renders each template.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Superbet Offer API — Key Types](#superbet-offer-api--key-types)
3. [Display Type Reference](#display-type-reference)
   - [ONE_X_TWO](#one_x_two)
   - [OVER_UNDER](#over_under)
   - [ONE_FROM_TWO](#one_from_two)
   - [PLAYER_PROPS](#player_props)
   - [PLAYER_PROPS_SINGLE](#player_props_single)
4. [Market Configuration Model](#market-configuration-model)
5. [Game State and Odds Selection](#game-state-and-odds-selection)
6. [Known Market IDs](#known-market-ids)
7. [Edge Cases and Gotchas](#edge-cases-and-gotchas)

---

## Architecture Overview

Each `Market` record in the database maps a Superbet `marketId` to a `DisplayType` enum. At render time, the game detail page:

1. Fetches the full event from the Offer Server API (`GET /v2/en-BE/events/:eventId`)
2. Receives a flat `odds[]` array (or `oddsResults[]` for settled games) — **not** pre-grouped by market
3. For each configured `Market`, filters the flat array by `odd.marketId === market.marketId`
4. Passes the filtered odds slice to the appropriate display template component

```
Offer API (flat odds[])
        │
        ▼
filter by marketId
        │
        ▼
DisplayType component (ONE_X_TWO / OVER_UNDER / ONE_FROM_TWO / PLAYER_PROPS)
        │
        ▼
Rendered market card
```

The key implication: **odds from different markets are mixed in the same array**. The `marketId` field on each odd is what separates them.

---

## Superbet Offer API — Key Types

### `OfferOutcome` — a single selectable odd

This is the core unit everything is built from. All display templates receive `OfferOutcome[]`.

```typescript
type OfferOutcome = {
  uuid: string;           // Unique odd identifier — used for SGA selections
  marketUuid: string;     // UUID of the parent market
  marketId: number;       // Numeric market ID — used to filter odds per template
  outcomeId: number;      // Numeric outcome ID
  price: number;          // Decimal odds price, e.g. 1.85
  status: string;         // "active" | "won" | "lost" — "won"/"lost" only on settled events
  code: string;           // Short outcome code — "1", "X", "2" for match betting
  name: string;           // Human-readable outcome name, e.g. "Over 2.5", "Harry Kane"
  marketName: string;     // Name of the parent market
  info?: string;          // Secondary description (sometimes contains threshold value)
  specifiers?: Record<string, string>; // Structured key-value data — see per-type docs below
  offerStateId: number;   // 1 = prematch, 2 = in-play
  superSubEligible?: boolean; // Whether this odd is eligible for Super Sub mechanic
};
```

### `OfferEvent` — the top-level event response

```typescript
type OfferEvent = {
  uuid: string;
  eventId: number;
  matchName: string;       // e.g. "Bayern Munich·Atalanta" (middle dot separator)
  matchDate: string;       // ISO timestamp
  homeTeamName?: string;
  awayTeamName?: string;
  sportId: number;         // 5 = football
  metadata?: {
    status?: string;           // e.g. "LIVE", "FINISHED", "NOT_STARTED"
    homeTeamScore?: string;
    awayTeamScore?: string;
  };
  offerStateStatus: Record<string, string>; // e.g. { "1": "active" } or { "1": "finished" }
  odds: OfferOutcome[] | null;              // Live/prematch odds — null when not requested
  oddsResults: OfferOutcome[] | null;       // Settled odds with won/lost status — null unless ?oddsResults=true
};
```

### API Endpoints

| Purpose | Endpoint |
|---|---|
| Single event (live odds) | `GET /v2/en-BE/events/:eventId` |
| Single event (settled) | `GET /v2/en-BE/events/:eventId?oddsResults=true` |
| Events by date | `GET /v2/en-BE/events/by-date?startDate=YYYY-MM-DD%2000:00:00` |

Base URL: `https://production-superbet-offer-ng-be.freetls.fastly.net`

---

## Display Type Reference

---

### ONE_X_TWO

**Used for:** Match result markets — Home / Draw / Away.

**Example markets:** Match Betting (Full Time), 1st Half Result, 2nd Half 1X2

#### API Fields Used

| Field | Purpose |
|---|---|
| `code` | Primary selector — identifies the outcome column. Must be `"1"` (home), `"X"` (draw), or `"2"` (away) |
| `price` | Displayed in each column button |
| `status` | Used in results view to colour WON (green) / LOST (red) |
| `uuid` | Used by SGA selection system |

#### Parsing Logic

```typescript
const home = odds.find(o => o.code === "1") ?? null;
const draw = odds.find(o => o.code === "X") ?? null;
const away = odds.find(o => o.code === "2") ?? null;
```

The `code` field is the **only reliable discriminator** for 1X2 outcomes. Do not use `name` — the team names differ per event and per locale.

#### Rendered Layout

```
┌──────────┬──────────┬──────────┐
│    1     │    X     │    2     │
│  1.40    │  N/A     │  6.50    │
└──────────┴──────────┴──────────┘
```

- 3 equal columns, single row
- N/A cell rendered when the odd is missing from the API response (e.g. draw not offered in some markets)
- In results view: WON cells highlight green, LOST cells highlight red

---

### OVER_UNDER

**Used for:** Any market with paired Over/Under outcomes grouped by a threshold value.

**Example markets:** Total Goals, 1st Half Total Goals, Total Corners, Total Cards, Player Total Goals (team-scoped)

#### API Fields Used

| Field | Purpose |
|---|---|
| `specifiers.total` | **Primary** threshold value — e.g. `"2.5"` |
| `info` | Fallback if `specifiers.total` is absent |
| `name` | Last-resort fallback — strips non-numeric characters to extract threshold |
| `name` (prefix) | Determines Over vs Under: `name.toLowerCase().startsWith("over")` |
| `price` | Displayed in each cell |
| `status` | Used in results view |
| `uuid` | Used by SGA selection system |

#### Parsing Logic

```typescript
// Build a map: threshold string → { over, under }
const byTotal = new Map<string, { over: OfferOutcome | null; under: OfferOutcome | null }>();

for (const o of odds) {
  const total = o.specifiers?.total      // preferred
    ?? o.info                            // fallback
    ?? o.name.replace(/[A-Za-z ]/g, "").trim(); // last resort

  if (!byTotal.has(total)) byTotal.set(total, { over: null, under: null });
  const entry = byTotal.get(total)!;

  if (o.name.toLowerCase().startsWith("over")) entry.over = o;
  else entry.under = o;
}

// Sort rows ascending by threshold
const rows = Array.from(byTotal.entries()).sort(([a], [b]) => parseFloat(a) - parseFloat(b));
```

**Important:** The API returns Over and Under odds interleaved (Over 0.5, Under 0.5, Over 1.5, Under 1.5...). The grouping by `specifiers.total` is what reconstructs the row structure.

#### Rendered Layout

```
LINE    UNDER     OVER
─────────────────────────
0.5     25.00     1.01
1.5      7.30     1.09
2.5      3.30     1.34
3.5      1.97     1.85
...
```

- Column 1: threshold value (from `specifiers.total`)
- Column 2: Under price
- Column 3: Over price
- Rows sorted ascending by threshold
- Missing side (Over or Under) renders as N/A

---

### ONE_FROM_TWO

**Used for:** Binary Yes/No markets with exactly two outcomes.

**Example markets:** Both Teams to Score, HT Both Teams to Score, Odd/Even Goals

#### API Fields Used

| Field | Purpose |
|---|---|
| `name` | Used to identify Yes vs No: `name.toLowerCase() === "yes"` / `"no"` |
| `price` | Displayed in each button |
| `status` | Used in results view |
| `uuid` | Used by SGA selection system |

#### Parsing Logic

```typescript
const yes = odds.find(o => o.name.toLowerCase() === "yes") ?? odds[0] ?? null;
const no  = odds.find(o => o.name.toLowerCase() === "no")  ?? odds[1] ?? null;
```

The fallback to `odds[0]` / `odds[1]` handles non-English locales where the outcome names may differ. For English (en-BE) the `name` match is reliable.

#### Rendered Layout

```
┌──────────┬──────────┐
│   Yes    │    No    │
│  1.50    │  2.42    │
└──────────┴──────────┘
```

- 2 columns, single row, constrained to `max-w-sm`
- N/A cell if either outcome is absent from the API response

---

### PLAYER_PROPS

**Used for:** Player-scoped markets where each player has odds across multiple threshold values.

**Example markets:** Player Total Shots on Target, Player Total Shots, Player Total Fouls Conceded, Player to Score

#### API Fields Used

| Field | Purpose |
|---|---|
| `specifiers.player_name` | Groups odds by player — the row key |
| `specifiers.total` | Threshold value — the column key, e.g. `"0.5"`, `"1.5"`, `"2.5"` |
| `name` | Fallback for `specifiers.player_name` when specifier is absent |
| `price` | Displayed in each cell |
| `status` | Used in results view (compact WON/LOST indicator) |
| `uuid` | Used by SGA selection system |

#### Parsing Logic

```typescript
// Build nested map: playerName → Map<threshold, OfferOutcome>
const playerMap = new Map<string, Map<string, OfferOutcome>>();

for (const o of odds) {
  const player = o.specifiers?.player_name ?? o.name;
  const total  = o.specifiers?.total ?? "—";

  if (!playerMap.has(player)) playerMap.set(player, new Map());
  playerMap.get(player)!.set(total, o);
}

// Derive sorted unique threshold columns
const allTotals = Array.from(
  new Set(odds.map(o => o.specifiers?.total ?? "—"))
).sort((a, b) => parseFloat(a) - parseFloat(b));
```

A player may not have odds at every threshold — cells are filled with N/A where `playerMap.get(player)?.get(total)` is undefined.

#### Rendered Layout

```
PLAYER                  0.5+   1.5+   2.5+   3.5+   4.5+
──────────────────────────────────────────────────────────
De Roon, Marten         1.26   2.22   4.65  10.00   N/A
Bakker, Mitchel         1.30   2.42   5.15  12.00   N/A
Kane, Harry             1.42   2.92   6.60   N/A    N/A
Raspadori, Giacomo      1.31   2.47   5.30  12.00   N/A
Hien, Isak              1.23   2.12   4.30   9.00   N/A
...                     [Show More]
```

- Row = player (from `specifiers.player_name`)
- Column = threshold (from `specifiers.total`)
- Cells are price-only (compact mode) — row/column headers provide context
- Truncated to 5 players by default; "Show More" expands all
- The table is horizontally scrollable on narrow viewports
- Column template: `minmax(120px, 1fr)` for player name + `68px` per threshold column

#### Column Template Note for FE

The grid uses inline `style` because Tailwind cannot generate dynamic column counts:

```typescript
const colTemplate = `minmax(120px, 1fr) ${allTotals.map(() => "68px").join(" ")}`;
// e.g. for 4 thresholds: "minmax(120px, 1fr) 68px 68px 68px 68px"
```

This is intentional — do not replace with Tailwind grid classes.

---

### PLAYER_PROPS_SINGLE

**Used for:** Player markets where there is only one threshold per player (binary — scored / didn't score).

**Example markets:** Player to Score (Anytime), First Goalscorer

This type shares the same `PlayerProps` component as `PLAYER_PROPS` — the `PLAYER_PROPS_SINGLE` enum value exists to allow future differentiation (e.g. a single-column layout without threshold headers) and for clearer admin labelling.

At present, rendering is identical to `PLAYER_PROPS`.

---

## Market Configuration Model

Markets are configured in the admin and stored in the `markets` table:

```prisma
model Market {
  id               Int         @id @default(autoincrement())
  name             String                    // Display label in the UI
  marketId         Int         @unique       // Superbet numeric market ID — the filter key
  displayType      DisplayType               // Controls which template renders
  enabled          Boolean     @default(true)  // Only enabled markets appear in games
  superSubEligible Boolean     @default(false) // Shows Super Sub badge on market card
  createdAt        DateTime    @default(now())
}
```

**`marketId` is the join key** between our configuration and the Offer API. Every odd in the API response carries `odd.marketId` — this is how the FE maps a flat odds array to the right display template.

---

## Game State and Odds Selection

The correct odds array to use depends on game status:

| Game Status | API param | Source field | Odd `status` values |
|---|---|---|---|
| `PENDING` | none | `event.odds[]` | `"active"` |
| `OPEN` | none | `event.odds[]` | `"active"` |
| `CLOSED` | `?oddsResults=true` | `event.oddsResults[]` | `"active"`, `"won"`, `"lost"` |
| `COMPLETED` | `?oddsResults=true` | `event.oddsResults[]` | `"active"`, `"won"`, `"lost"` |
| `DRAFT` | — | not fetched | — |

```typescript
// From app/games/[id]/page.tsx
const isLive     = game.status === "OPEN" || game.status === "PENDING";
const isResulted = game.status === "CLOSED" || game.status === "COMPLETED";

const event = isLive || isResulted
  ? await fetchEvent(game.event.externalEventId, isResulted)
  : null;

const odds = isResulted
  ? (event?.oddsResults ?? [])
  : (event?.odds ?? []);
```

When `showResults` is `true`, all display templates switch to a results view:
- `OddButton` renders WON (green + checkmark) or LOST (red + X) instead of price
- In `PLAYER_PROPS` compact mode, WON shows `✓` and LOST shows `✗`

---

## Known Market IDs

These are the Superbet market IDs confirmed in use for PassTheBall (Belgium feed, `en-BE`):

| Market Name | Market ID | Display Type | Notes |
|---|---|---|---|
| Match Betting (Full Time) | 547 | `ONE_X_TWO` | Home/Draw/Away via `code` 1/X/2 |
| Total Goals | 200734 | `OVER_UNDER` | Full match |
| 1st Half - Total Goals | 200735 | `OVER_UNDER` | HT only |
| Total Corners | 704 | `OVER_UNDER` | Often 15+ threshold rows |
| Total Cards | 690 | `OVER_UNDER` | |
| Both Teams to Score | 539 | `ONE_FROM_TWO` | Yes/No via `name` |
| Player Total Fouls Conceded | 236216 | `PLAYER_PROPS` | `specifiers.player_name` + `specifiers.total` |
| Player Total Shots | 236218 | `PLAYER_PROPS` | Up to 8 threshold columns |
| Player Total Shots on Target | 200702 | `OVER_UNDER` | Team-level SOT, not per-player |
| Player to Score | 236226 | `PLAYER_PROPS_SINGLE` | One threshold per player |

> These IDs are stable per market type across events in the same feed. Confirm against the live API if adding new markets — IDs can differ between BE (`en-BE`) and BR (`pt-BR`) feeds.

---

## Edge Cases and Gotchas

### `specifiers` is not always populated

`specifiers` is a `Record<string, string> | undefined`. For Over/Under markets, `specifiers.total` is the canonical source of the threshold value, but some older or non-standard markets populate `info` instead. The parsing always checks `specifiers.total` → `info` → name-scrape in that order.

### Odd `status` field casing

The API returns status in lowercase (`"active"`, `"won"`, `"lost"`), but some historical data has uppercase variants. The FE normalises with `.toLowerCase()` before comparison. BE should do the same.

### `price === 0` is not a valid price

A `price` of `0` means the odd is suspended or the price was not returned. The FE renders `"—"` instead of `0.00` in this case:

```typescript
{odd.price > 0 ? odd.price.toFixed(2) : "—"}
```

Never trust a `0` price as a real decimal odds value.

### `odds` vs `oddsResults` are mutually exclusive per request

The API does not return both in the same request. If you request `?oddsResults=true`, `odds` will be null (or absent). If you do not request it, `oddsResults` will be null. The FE handles this by always passing one or the other depending on game state — never merge them.

### `matchName` uses a middle dot separator

`matchName` is formatted as `"Bayern Munich·Atalanta"` — the separator is U+00B7 (MIDDLE DOT), not a hyphen or slash. Do not split on `-` or `/` to extract team names. Use `homeTeamName` / `awayTeamName` fields instead, or split on `·`.

### SGA odd UUID ordering

When calling the SGA/Betbuilder `getSgaOddPrice` endpoint with multiple selected odds, the `selected_odds_uuids` parameter **must be alphabetically sorted** before joining with commas. The API will return an error or incorrect pricing if they are out of order. This is a BE concern if constructing SGA pricing calls server-side.

```typescript
// Correct
const uuids = selectedOdds.map(o => o.uuid).sort().join(",");
```

### Brazil vs Belgium market IDs

The Brazil feed (`pt-BR`, `SB_BR` target) uses the same market ID numbers for the same market types, but the locale of outcome `name` fields will be Portuguese (e.g. `"Sim"` / `"Não"` instead of `"Yes"` / `"No"`). The `ONE_FROM_TWO` template uses name-matching — if targeting Brazil, the parser needs to handle Portuguese outcome names or rely on `outcomeId` instead.
