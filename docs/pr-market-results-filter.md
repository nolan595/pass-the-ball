# PR: Market Results Filter — Configured Markets Only

## Summary

When a game reaches CLOSED or COMPLETED state, the admin game detail page now shows a **"Results · Won Markets"** section instead of the empty player-view market grid. This section:

- Only includes markets that are in the admin's configured markets bank (the `markets` table)
- Only shows winning odds within those markets (status `"win"` or `"won"`)
- Displays each winning odd's outcome name, UUID, and price
- Shows multiple winners per market when applicable

Previously, the player-view market grid rendered empty for resulted games because the Offer API returns `oddsResults[]` (not `odds[]`) for settled events, and the existing `MarketView` component was wired to `odds`.

## Files Changed

| File | Change |
|------|--------|
| `app/(admin)/games/[id]/MarketResultsView.tsx` | New component — grouped by market, filtered to configured IDs + winners only |
| `app/(admin)/games/[id]/page.tsx` | Branch on `isResulted`: render `MarketResultsView` (with `configuredMarketIds`) or `MarketView` grid |

## Environment Variables

None.

## Migration Steps

None — no schema changes.

## Rollback Plan

Revert the two files. No data changes, no DB changes. Zero risk.
