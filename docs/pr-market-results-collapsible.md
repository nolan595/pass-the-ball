# PR: Market Results — Collapsible Cards

## Summary

Each winning-market card in the "Results · Won Markets" section on the admin game detail page is now collapsible. Clicking the chevron in the card header hides/shows the winning odds rows. Cards default to expanded. Each card has independent state.

Pattern mirrors `MarketView.tsx` which already had this behaviour.

## Files Changed

| File | Change |
|------|--------|
| `app/(admin)/games/[id]/MarketResultsView.tsx` | Added `"use client"`, extracted `WonMarketCard` sub-component with `useState` collapse toggle |

## Environment Variables

None.

## Migration Steps

None.

## Rollback Plan

Revert the single file. No data or config changes.
