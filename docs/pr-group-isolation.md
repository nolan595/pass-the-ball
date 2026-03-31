# PR: Group Isolation — Per-Group Picks

## Summary

Each group now has fully isolated selections. Players in Polytech cannot see Hunch's picks, and vice versa. Groups independently progress through their pick order and see their own result screen.

## What Changed

| Behaviour | Before | After |
|-----------|--------|-------|
| "Taken" odd overlays | Showed all game participants' picks | Group members only |
| SGA unavailability check | Based on all picks in game | Group picks only |
| Result screen picks list | All picks across all groups | Group picks only |
| "all won" result | True if every pick in game won | True if every pick in this group won |
| Waiting counter | `game.picks.length` (all groups) | Group picks count only |

## Files Changed

| File | Change |
|------|--------|
| `app/(player)/play/[slug]/[gameId]/page.tsx` | Derive `groupPlayerIds` + `groupPicksAll`; scope `otherPicks`, `allWon`, `resultPicks`, waiting counter |

## Environment Variables

None.

## Migration Steps

None — data model unchanged.

## Rollback Plan

Revert the single file. No DB changes.

## QA Checklist

- [ ] Player in Superbet group sees only Superbet members' picks as "taken" on odds
- [ ] Player in Hunch group cannot see Polytech picks or vice versa
- [ ] Turn order advances within the group only
- [ ] Waiting counter shows remaining pickers within the group (not across all groups)
- [ ] Result screen only shows the player's own group members' picks and outcome
- [ ] "All won" banner only fires if everyone in the same group won
- [ ] Ungrouped players (no groupId) still see all ungrouped players — backwards-compatible
- [ ] TypeScript: `npx tsc --noEmit` passes clean
