# PR: Grouped Player Picks + Copy Group URLs

## Summary

- Admin game detail (`/games/[id]`) now separates player picks by group
- Each group section has a "Copy all URLs" button that writes all player game links to clipboard as newline-separated URLs
- Players without a group are shown in an "Ungrouped" section below all named groups
- If no groups exist at all, the original flat player list renders unchanged (backwards-compatible)

## Files Changed

| File | Change |
|------|--------|
| `app/(admin)/games/[id]/page.tsx` | Added `include: { group: true }` to `allPlayers` query |
| `app/(admin)/games/[id]/PicksSummary.tsx` | Grouped rendering logic + per-group "Copy all URLs" |

## Environment Variables

None.

## Migration Steps

None — no schema changes. Relies on `Group` model from `20260331111459_add_groups` which is already applied.

## Rollback Plan

Revert both files. No DB changes to undo.

## QA Checklist

- [ ] Game detail page loads for a game with grouped players
- [ ] Players are bucketed under their group name (Superbet / Polytech)
- [ ] Ungrouped players appear in "Ungrouped" section
- [ ] Per-player copy link still works (individual Copy button per row)
- [ ] "Copy all URLs" per group copies N newline-separated URLs to clipboard
- [ ] "Copied" confirmation shows and resets after 2s
- [ ] Game with no groups at all still renders flat list (no regression)
- [ ] TypeScript: `npx tsc --noEmit` passes clean
