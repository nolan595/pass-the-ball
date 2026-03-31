# PassTheBall — End-to-End API Flow

Complete reference for every external Superbet API call made during a PassTheBall game, in order.

---

## Overview

Two external services are used:

| Service | Base URL | Used for |
|---------|----------|----------|
| **SGA / Betbuilder API** | `production-superbet-bmb.freetls.fastly.net/betbuilder` | Markets, odds blocking, combined pricing |
| **Offer API** | `production-superbet-offer-ng-be.freetls.fastly.net` | Match state validation, settlement |

Code: `lib/sga-api.ts` (SGA), `lib/offer-api.ts` (Offer)

---

## Step 1 — Game Opening: Fetch Available Markets

**When:** Player opens the game lobby.

**Endpoint:** `GET /v2/getBetbuilderMarketsForMatch`
**Service:** SGA API
**Code function:** `fetchSgaMarkets(matchId)` in `lib/sga-api.ts`

```
GET /v2/getBetbuilderMarketsForMatch?match_id={matchId}&target={target}&lang={lang}
```

**Returns:** Available betting markets with odds for the match (`markets[]`, each with `id`, `name`, `odds[]`).

**Caching:** Eager cache, 60-second TTL. Players hitting the lobby within 60 seconds share a cached response.

---

## Step 2 — Pick Submission: Match State Validation

**When:** Right before saving a submitted pick to the DB.

**Endpoint:** `GET /v2/{lang}/events/{eventId}`
**Service:** Offer API
**Code function:** `fetchEvent(externalEventId)` in `lib/offer-api.ts`

```
GET /v2/en-BE/events/{eventId}
```

**Purpose:** Verify the real-world match is still strictly **ACTIVE**. If the match is suspended, cancelled, or has already started, **reject the pick.**

**Check:** `event.offerStateStatus["1"]` must be `"active"` (not `"suspended"`, `"finished"`, etc.)

**No caching** — this is a safety gate; must be fresh.

---

## Step 3 — Pick Submission: Block Mutually Exclusive Odds

**When:** After Player N submits a pick, and before Player N+1 opens the market picker.

**Endpoint:** `GET /v2/previewBetbuilderOdd` (aka `previewSgaBetbuilderOdd`)
**Service:** SGA API
**Code function:** `fetchPreviewBetbuilderOdd(matchId, selectedOddUuids)` in `lib/sga-api.ts`

```
GET /v2/previewBetbuilderOdd?match_id={matchId}&selected_odds_uuids={csv_sorted_uuids}&target={target}&lang={lang}
```

**Returns:** `unavailableOddsUuids[]` — odds that cannot be combined with the already-selected legs (mutually exclusive outcomes).

**Used for:** Greying out or blocking market options in the UI for the next player's turn.

**Caching:** Lazy cache strategy.
- Cache is **invalidated immediately** when a player submits a pick.
- The next player's page load triggers a fresh call to get the updated blocked odds.

---

## Step 4 — Final Pick: Calculate Combined SGA Price

**When:** The last player (Player 4) locks in their selection.

**Endpoint:** `GET /v2/getSgaOddPrice`
**Service:** SGA API
**Code function:** `fetchSgaOddPrice(matchId, selectedOddUuids)` in `lib/sga-api.ts`

```
GET /v2/getSgaOddPrice?match_id={matchId}&selected_odds_uuids={csv_alpha_sorted_uuids}&target={target}&lang={lang}
```

**Important:** `selected_odds_uuids` must be **alphabetically sorted** before sending.

**Returns:** `sgaUuid`, `price`, `status`, `legs[]`

**What we store:** `price` → `GameGroupPrice.price`, `sgaUuid` → `GameGroupPrice.sgaUuid`, `status` → `GameGroupPrice.sgaStatus`

**Key notes:**
- This endpoint is **stateless** — it does not place a ticket on Superbet's backend. It is a pure price calculator.
- The "SGA Recipe" we save is: 4 odd UUIDs + 1 `sgaUuid` + the combined price.
- Called synchronously on the 4th pick only (not on each submission).

> **⚠️ Production note:** This FE endpoint does **not** return `pricingReferenceId`. For the production void & reprice flow, the final-pick price confirmation must switch to the backend endpoint `/v2/priceSgaOdd` instead. See [`docs/sga-void-reprice-flow.md`](./sga-void-reprice-flow.md).

---

## Step 5 — Settlement: Determine Win/Loss Outcomes

**When:** After the match finishes; during or after the game is moved to CLOSED/COMPLETED.

**Endpoint:** `GET /v2/{lang}/events/{eventId}?oddsResults=true`
**Service:** Offer API
**Code function:** `fetchEvent(externalEventId, true)` in `lib/offer-api.ts`

```
GET /v2/en-BE/events/{eventId}?oddsResults=true
```

**Strategy:** SSE/polling until `event.offerStateStatus["1"] === "finished"`.

**Returns:** `oddsResults[]` — each settled odd with a `status` field:

| Status | Meaning |
|--------|---------|
| `"win"` | Leg won |
| `"lost"` | Leg lost |
| `"refund"` | Leg voided / no action |

**What we do:** Match each player's saved `oddUuid` against `oddsResults` to determine per-leg outcome, update the DB, and trigger prize distribution.

**Refund handling:** A `"refund"` status means that leg is void. The combined price must be repriced using the remaining active legs. See [`docs/sga-void-reprice-flow.md`](./sga-void-reprice-flow.md) for the full void & reprice flow.

---

## Caching Summary

| Step | Endpoint | Cache strategy | TTL / Invalidation |
|------|----------|----------------|--------------------|
| 1 — Markets | `getBetbuilderMarketsForMatch` | Eager | 60 seconds |
| 2 — Validation | `getOfferEvent` | None | Always fresh |
| 3 — Blocking | `previewBetbuilderOdd` | Lazy | Invalidated on each pick submission |
| 4 — SGA Price | `getSgaOddPrice` | None | Called once (on final pick) |
| 5 — Settlement | `getOfferEvent?oddsResults=true` | None | Polled until FINISHED |

---

## Sequence Diagram

```
Player 1 opens lobby
  └─► getSgaBetbuilderMarkets [cache: 60s]

Player 1 submits pick
  ├─► getOfferEvent [validate match ACTIVE]
  └─► invalidate preview cache

Player 2 opens lobby
  ├─► getSgaBetbuilderMarkets [cached]
  └─► previewBetbuilderOdd [fresh — Player 1's pick now blocks some odds]

Player 2 submits pick
  ├─► getOfferEvent [validate match ACTIVE]
  └─► invalidate preview cache

Player 3 & 4 follow same pattern...

Player 4 submits final pick
  ├─► getOfferEvent [validate match ACTIVE]
  └─► getSgaOddPrice [all 4 UUIDs] → store combined price + sgaUuid

Match finishes
  └─► getOfferEvent?oddsResults=true [poll/SSE]
        ├─► all legs "win"  → group wins
        ├─► any leg "lost"  → group loses
        └─► any leg "refund" → reprice SGA with remaining legs
```

---

## Related Docs

- [`docs/sga-void-reprice-flow.md`](./sga-void-reprice-flow.md) — production void & reprice implementation guide
- [Betbuilder API documentation (Notion)](https://www.notion.so/superbet/Betbuilder-API-documentation-3e4b114fb90d48f9beac7ac40cc14058)
- [Offer Server API — MEMORY.md](../.claude/projects/-Users-marknolan-Code-PassTheBall/memory/MEMORY.md)
