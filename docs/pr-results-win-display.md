# PR: Fix results screen win/loss display

## Summary
- The ScoreRing on the results screen showed 0/X and all red even when picks won
- The picks accordion showed no win/loss indicator per leg
- Root cause: API returns `status: "win"`, code compared against `"won"`

## Changes
- `page.tsx` — compare `oddsResultsMap.get(uuid) === "win"` (was `"won"`)
- `ResultScreen.tsx` — `ResultPick` now carries `won?: boolean`; pick rows render green/red with Won/Lost label
- `offer-api.ts` — corrected misleading type comment

## Env vars
None required.

## Migration steps
None. No schema changes.

## Rollback plan
Revert the three file changes. No data was mutated.
