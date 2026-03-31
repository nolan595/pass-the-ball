# PR: Fix per-group SGA combined price

## Problem
`game.sgaPrice` is a single field on the `Game` table. With multiple groups playing the same game, all groups were seeing the same combined price — calculated from ALL players' picks combined, not from their own group's picks.

## Solution
Added a `GameGroupPrice` junction table (`game_group_prices`) that stores one SGA price per group per game. The player page, pick submission action, and cron price-refresh route are all updated to be group-aware.

## Files Changed

| File | Change |
|------|--------|
| `prisma/schema.prisma` | Added `GameGroupPrice` model; relations added to `Game` and `Group` |
| `prisma/migrations/20260331140000_add_game_group_price/migration.sql` | New table migration |
| `app/(player)/play/[slug]/[gameId]/actions.ts` | `triggerSgaPrice` takes optional `groupId`; `submitPick` group-scoped completion check and turn-order enforcement |
| `app/(player)/play/[slug]/[gameId]/page.tsx` | Queries `GameGroupPrice` for player's group; shows group-specific combined price |
| `app/api/cron/price-refresh/route.ts` | Iterates per-group, checks per-group completion, upserts per-group prices |

## Environment Variables
None required.

## Migration Steps

**Run on deploy (Netlify auto-runs via build command if configured, otherwise run manually):**
```bash
npx prisma migrate deploy
```

This creates the `game_group_prices` table. Non-destructive — no existing data is altered.

## Rollback Plan
1. Revert the 5 files listed above to their previous git state
2. Drop the `game_group_prices` table: `DROP TABLE game_group_prices;`
3. Redeploy — `game.sgaPrice` fallback path remains intact

## Notes
- Admin `calculateGameSgaPrice` still writes to `game.sgaPrice` (all picks combined). Admin panel is unaffected.
- Ungrouped players continue to use `game.sgaPrice` as before.
- Existing game 14 will not show a combined price until the last player in each group picks again (or until the cron refreshes and all group members have picks).
