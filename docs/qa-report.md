# QA Report

---

## 2026-03-30 — Results screen win/loss display fix

### Feature
When a player's pick wins, the ScoreRing showed it as red with 0/X won, and the picks list did not distinguish won vs lost legs.

### Root cause
The Offer API returns `status: "win"` on settled odds in `oddsResults[]`. The code compared against `"won"` (incorrect). The type comment in `offer-api.ts` also said `"won"` which propagated the misconception.

### Files changed
- `app/(player)/play/[slug]/[gameId]/page.tsx` — fixed `"won"` → `"win"` in `allWon` and `ringPlayers.won`; added `won` field to `resultPicks` construction
- `app/(player)/components/ResultScreen.tsx` — added `won?: boolean` to `ResultPick` type; pick rows now render green/red background and a Won/Lost label
- `lib/offer-api.ts` — corrected type comment: `"active" | "win" | "lost" | "refund"`

### Test scenarios
- [ ] Game in CLOSED/COMPLETED state where all picks won → ring shows all green, centre shows X/X, headline says "You Won"
- [ ] Game where some picks won → ring shows correct green/red per player, centre shows correct count, headline says "You Lost This One"
- [ ] Game where all picks lost → ring all red, 0/X, headline says "You Lost This One"
- [ ] Game where `oddsResults` is null (API hasn't settled yet) → ring all grey/red, picks show no Won/Lost label (graceful fallback via `won: undefined`)
- [ ] Picks accordion: each pick row shows green background + "Won" label or red background + "Lost" label

### Regression risk
Low. Change is isolated to the result screen data path. No schema changes, no API changes.
