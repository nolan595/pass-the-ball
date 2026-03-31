# SGA Void & Reprice Flow

> **Scope:** Production only. Not applicable to the simulation. Documented following discussion with Vedran Pintaric (Superbet BMB team) in `#bet-builder-tech`, 2026-03-31.
>
> For the complete end-to-end API flow (all 5 steps), see [`docs/ptb-api-flow.md`](./ptb-api-flow.md). This doc covers only the void & reprice piece.

---

## The Problem

When a player's leg in a PassTheBall SGA gets voided (e.g. a player doesn't feature in the match, market settled as "no action"), the group's combined price must be recalculated using only the remaining active legs. This is the **void & reprice** flow.

The current simulation uses the **frontend endpoint** (`/v2/getSgaOddPrice`) to fetch the combined price. That endpoint does not return the `pricingReferenceId` required for repricing. The production implementation must use the **backend endpoint** (`/v2/priceSgaOdd`) at price confirmation time so the reference ID is available if a leg is later voided.

---

## Endpoints Overview

All requests go to the Betbuilder service:

| Environment | Host |
|-------------|------|
| Stage | `betting.stage.incubator.superbet.com/betbuilder` |
| Production (origin) | `betting.prod.incubator.superbet.com/betbuilder` |
| Production (Fastly) | `production-superbet-bmb.freetls.fastly.net/betbuilder` |

| Endpoint | Audience | Auth required | Returns `pricingReferenceId` |
|----------|----------|---------------|------------------------------|
| `GET /v2/getSgaOddPrice` | Frontend | No | No |
| `GET /v2/priceSgaOdd` | Backend → Backend | Yes (OAuth, disabled on stage) | **Yes** |
| `GET /v2/repriceSgaOdd` | Backend → Backend | Yes (OAuth, disabled on stage) | N/A — this is the reprice call |

---

## Key Identifiers — Do Not Confuse These

| Field | What it identifies | Changes over time? |
|-------|--------------------|--------------------|
| `sgaUuid` | The combination of legs (defined purely by which odds are combined) | No — same combination always has the same UUID |
| `pricingReferenceId` / `game_state_reference_id` | The game state (point in time) when the price was calculated | Yes — changes as the match progresses |

**`sgaUuid` cannot be used as a substitute for `pricingReferenceId`.** The reprice endpoint requires the reference ID to know what moment in time to calculate the historic price against.

---

## Full Flow

### Step 1 — Price Confirmation (when last leg is locked)

When the final group member locks in their pick, call the **backend** price endpoint:

```
GET /v2/priceSgaOdd?match_id={matchId}&selected_odds_uuids={csv_sorted_uuids}&target={target}
```

Required headers:
```
X-Issuer: HUNCH_F2P
Authorization: Bearer {oauth_token}   ← production only; omit on stage
```

**Store from the response:**

| Field | Where to store | Purpose |
|-------|----------------|---------|
| `price` | `GameGroupPrice.price` | Display to players |
| `sgaUuid` | `GameGroupPrice.sgaUuid` | Identify the combination |
| `sgaStatus` / `bettingStatus` | `GameGroupPrice.sgaStatus` | Monitor combination health |
| `pricingReferenceId` | `GameGroupPrice.pricingReferenceId` | **Required for future repricing** |
| `repriceEligibility` | `GameGroupPrice.repriceEligibility` | Determines if repricing is even possible |

**Check `repriceEligibility` immediately:**

| Value | Meaning | Action |
|-------|---------|--------|
| `REPRICE_AVAILABLE` | Repricing supported for this combination | Store `pricingReferenceId`, proceed normally |
| `REPRICE_UNAVAILABLE` | Repricing intentionally not available | Do not attempt repricing if a leg voids |
| `REPRICE_DATA_INVALID` | System error — reprice data missing | Treat as unavailable; flag for investigation |
| `""` (empty) | Unexpected — bug | Discard the entire response, retry |

For football, `REPRICE_AVAILABLE` is the expected value in almost all cases. For other sports, `REPRICE_UNAVAILABLE` is common as repricing is not yet supported.

---

### Step 2 — Void Detection

Monitor each game's legs for void/refund via the **Offer API** (`oddsResults`):

```
GET /v2/{lang}/events/{eventId}?oddsResults=true
```

A leg is voided when `oddsResults[uuid].status === "refund"`.

This is already implemented in the codebase — the result screen renders refunded legs with a grey "Refunded" state. What's missing is the repricing trigger.

---

### Step 3 — Reprice

When one or more legs are detected as voided, call:

```
GET /v2/repriceSgaOdd?target={target}&match_id={matchId}&selected_odds_uuids={remaining_active_uuids}&pricing_reference_id={pricingReferenceId}
```

- `selected_odds_uuids` — **only the remaining active legs** (exclude voided ones), comma-separated, alphabetically sorted
- `pricing_reference_id` — the value stored in Step 1

**Response (HTTP 200):**
```json
{ "price": 3.40 }
```

Store this as the updated combined price for the group.

**If all legs are voided:** void the entire combination (treat combined price as 1.0).

---

### Step 4 — Update & Display

Update `GameGroupPrice` with the repriced value. The result screen already handles the refunded-leg display — the combined price shown to players should reflect the new repriced value.

---

## Data Model Changes Required for Production

The `GameGroupPrice` table needs four additional fields:

```prisma
model GameGroupPrice {
  // ... existing fields ...
  pricingReferenceId  String?   // from /v2/priceSgaOdd response
  repriceEligibility  String?   // REPRICE_AVAILABLE | REPRICE_UNAVAILABLE | REPRICE_DATA_INVALID
  repricedPrice       Float?    // price after void/reprice (null if no void occurred)
  repricedAt          DateTime? // when the reprice was applied
}
```

---

## Auth Setup for Production

OAuth is required on the production betbuilder endpoints for `priceSgaOdd` and `repriceSgaOdd`. Auth is **disabled on stage** for easy testing.

Vedran (BMB team) will provide the OAuth setup guide. Contact `#bet-builder-tech` and tag `@Vedran Pintaric` + `@betbuilder-team` when ready to proceed.

When calling either backend endpoint, set:
```
X-Issuer: HUNCH_F2P
```
This is used by BMB for internal logging and metrics — use a meaningful, consistent value.

---

## Operational Requirements

### Throttling

Void events surge at predictable moments (match kick-off when lineups are announced, player markets voided in bulk). Implement a rate limiter on the repricing trigger:

- Stay under **a few hundred RPS**
- Queue reprice requests rather than firing them concurrently
- Simple queue with concurrency limit is sufficient — doesn't need to be complex

### Retry Policy

| Error | Retry strategy |
|-------|----------------|
| HTTP 404 | Linear backoff 1–2s, max 3 retries — event data may be delayed |
| HTTP 500 | Exponential backoff |
| HTTP 501 (`REPRICE_DISABLED`) | **Do not retry** |
| `repriceEligibility: REPRICE_UNAVAILABLE` | **Do not attempt reprice** |

---

## Testing on Stage

Auth is disabled on stage — start testing immediately:

```bash
# Step 1: Get pricing reference ID
curl -H "X-Issuer: HUNCH_F2P" \
  "https://betting.stage.incubator.superbet.com/betbuilder/v2/priceSgaOdd?target=SB_BR&match_id={matchId}&selected_odds_uuids={uuid1},{uuid2}"

# Step 2: Reprice with remaining legs after a void
curl \
  "https://betting.stage.incubator.superbet.com/betbuilder/v2/repriceSgaOdd?target=SB_BR&match_id={matchId}&selected_odds_uuids={uuid2}&pricing_reference_id={pricingReferenceId}"
```

---

## Go-Live Announcement

When ready to use these endpoints in production, post in `#bet-builder-tech` tagging:
- `@Ivan Hrastinski`
- `@betbuilder-team`

Include the endpoints being used, expected RPS, and market/target.

---

## Reference

- Slack: `#bet-builder-tech`, thread from 2026-03-31 (Vedran Pintaric)
- Notion: [Betbuilder API documentation](https://www.notion.so/superbet/Betbuilder-API-documentation-3e4b114fb90d48f9beac7ac40cc14058)
- Notion: [Price SGA odd (BE endpoint)](https://www.notion.so/superbet/Price-SGA-odd-91fd43de8f3b4e8cad742c6439de94f7)
- Notion: [Reprice SGA odd](https://www.notion.so/superbet/Reprice-SGA-odd-22b032f852c580048d13cbd728a07665)
- Notion: [Get SGA odd price (FE endpoint)](https://www.notion.so/superbet/Get-SGA-odd-price-11b032f852c58009babcc514d8c92185)
