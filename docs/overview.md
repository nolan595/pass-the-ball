# PassTheBall — Data Flow Overview

All odds and event data comes from the **Superbet Offer Server API v2**:

```
Base URL: https://production-superbet-offer-ng-be.freetls.fastly.net
```

No auth required. Current integration uses the Belgium feed (`en-BE`). Brazil uses a separate base URL with `pt-BR`.

---

## Endpoints in Use

### 1. Events by date

```
GET /v2/en-BE/events/by-date?startDate=YYYY-MM-DD%2000:00:00
```

Used on the Events admin page to search for upcoming matches. Returns a flat list of all events on that date across all sports. Filtered to `sportId === 5` (football) before display. Only the event metadata is returned here — no odds. The `eventId` from this response is what gets saved to the database and used for all subsequent odds calls.

**Key response fields:**

| Field | Used for |
|---|---|
| `eventId` | Stored in DB as the reference ID for all future odds fetches |
| `matchName` | Display label (format: `"Bayern Munich·Atalanta"`) |
| `matchDate` | Shown in the event list |
| `sportId` | Filter — only `5` (football) is kept |

---

### 2. Single event — live odds

```
GET /v2/en-BE/events/:eventId
```

Called on the game detail page when a game is `PENDING` or `OPEN`. Returns the full event with an `odds[]` array containing every active odd across all markets for that event — **all markets in a single flat array**.

**Key response fields:**

| Field | Used for |
|---|---|
| `odds[]` | The full flat odds array — filtered per market at render time |
| `matchName` | Shown in the event status bar |
| `metadata.status` | e.g. `"LIVE"`, `"NOT_STARTED"` — shown in the status bar |
| `metadata.homeTeamScore` / `awayTeamScore` | Live score display |

---

### 3. Single event — results

```
GET /v2/en-BE/events/:eventId?oddsResults=true
```

Called when a game is `CLOSED` or `COMPLETED`. Returns the same event shape but with `oddsResults[]` instead of `odds[]`. Each odd in `oddsResults[]` has a `status` of `"won"` or `"lost"`, used to render the results view. The `odds[]` field is null when this param is passed.

---

## How the Flat Odds Array Maps to Display Types

The `odds[]` / `oddsResults[]` array contains every odd for every market mixed together. Each odd carries a `marketId` field. The admin configures which `marketId` maps to which display template — at render time, the flat array is filtered per market:

```
odds.filter(o => o.marketId === market.marketId)
```

That filtered slice is passed to the display template. The template then uses specific fields from each odd to build its layout:

### ONE_X_TWO

**Filter:** all odds where `marketId` matches (e.g. `547` for Match Betting)

**Field used:** `odd.code` — values `"1"` (home), `"X"` (draw), `"2"` (away)

The three odds are picked by their `code` value and placed into fixed columns. `code` is the only reliable discriminator — `name` varies by locale and team.

```
odds.find(o => o.code === "1")  → Home column
odds.find(o => o.code === "X")  → Draw column
odds.find(o => o.code === "2")  → Away column
```

---

### OVER_UNDER

**Filter:** all odds where `marketId` matches (e.g. `200734` for Total Goals)

**Fields used:** `odd.specifiers.total`, `odd.name` (prefix)

The API returns Over and Under odds interleaved. They're grouped by the `specifiers.total` value (e.g. `"2.5"`) into rows, then split into Over/Under columns by checking if `odd.name` starts with `"over"`.

```
specifiers.total = "2.5", name = "Over 2.5"  → row 2.5, Over column
specifiers.total = "2.5", name = "Under 2.5" → row 2.5, Under column
```

Fallback chain if `specifiers.total` is absent: `odd.info` → strip non-numeric chars from `odd.name`.

---

### ONE_FROM_TWO

**Filter:** all odds where `marketId` matches (e.g. `539` for Both Teams to Score)

**Field used:** `odd.name` — matched against `"yes"` / `"no"` (case-insensitive)

Two odds, two columns. Name matching is the discriminator. Fallback to array position `[0]` / `[1]` if names don't match (handles non-English locales).

---

### PLAYER_PROPS

**Filter:** all odds where `marketId` matches (e.g. `236218` for Player Total Shots)

**Fields used:** `odd.specifiers.player_name`, `odd.specifiers.total`

Odds are grouped into a two-dimensional structure — rows by player, columns by threshold:

```
specifiers.player_name = "Kane, Harry"
specifiers.total       = "2.5"
→ row: Kane, Harry | column: 2.5+
```

A player may not have an odd at every threshold — those cells render as N/A. The column set is derived from all unique `specifiers.total` values across all odds in the filtered slice, sorted ascending.

---

## Summary

```
Offer API (/by-date)
    └── eventId saved to DB

Offer API (/events/:eventId)
    └── returns flat odds[]
            └── filtered by marketId per configured Market
                    ├── code "1"/"X"/"2"          → ONE_X_TWO
                    ├── specifiers.total + name    → OVER_UNDER
                    ├── name "yes"/"no"            → ONE_FROM_TWO
                    └── specifiers.player_name     → PLAYER_PROPS
                        + specifiers.total

Offer API (/events/:eventId?oddsResults=true)
    └── same structure, odds have status "won"/"lost"
            └── same display templates, results mode
```
