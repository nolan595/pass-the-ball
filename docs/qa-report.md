# QA Report

---

## 2026-03-31 — Groups page: client-side pagination (3 per page)

### Feature
The admin groups list is paginated at 3 groups per page. Previous/Next buttons and a "Page X of Y" counter appear only when there are more than 3 groups. Pagination controls are hidden for ≤3 groups.

### Files changed
- `app/(admin)/groups/GroupsClient.tsx` — added `GROUPS_PER_PAGE = 3` constant, `Pagination` component, `page` + `safePage` state, slice logic

### Edge cases reviewed
| Scenario | Behaviour |
|----------|-----------|
| 0 groups | Empty state renders as before; no pagination controls |
| 1–3 groups | All groups shown; pagination hidden (`totalPages = 1`, condition `> 1` skips render) |
| 4+ groups | Groups sliced per page; Prev/Next rendered |
| First page | Previous button disabled |
| Last page | Next button disabled |
| Create group (total crosses page boundary) | `totalPages` grows; user stays on current page; new group appears on correct page |
| Delete last group on page 2 | `safePage = Math.min(page, totalPages - 1)` clamps to last valid page — no empty view |
| Page state after server revalidation | React keeps `page` state across re-renders (server action → revalidatePath → fresh props). `safePage` clamping handles any out-of-bounds case |

### TypeScript
All types are inferred — no explicit casting or `any`. Component is fully typed.

### Regression risk
None. No data fetching logic changed. Ungrouped players section, dialogs, and server actions are unaffected. All changes are in the render path of `GroupsClient`.

---

## 2026-03-31 — Market results view: collapsible cards

### Feature
Each winning-market card in `MarketResultsView` is now collapsible via a chevron toggle button in the header, matching the existing `MarketView` pattern.

### Files changed
- `app/(admin)/games/[id]/MarketResultsView.tsx` — added `"use client"`, extracted `WonMarketCard` with `useState(false)` collapsed state, chevron toggle button

### Edge cases
| Scenario | Behaviour |
|----------|-----------|
| Card collapsed | Header + badge visible; winners body hidden |
| Card expanded (default) | Full card as before |
| Multiple markets | Each has independent collapse state |
| Empty state | Unchanged — no cards rendered |

### TypeScript
`npx tsc --noEmit` — clean.

### Regression risk
None. Data filtering logic unchanged. `MarketView` unaffected. Non-resulted game path unaffected.

---

## 2026-03-31 — Market results view: configured-markets filter

### Feature
Admin game detail page now shows a "Results · Won Markets" section for CLOSED/COMPLETED games instead of the empty player-view market grid. Only markets in the admin's configured markets bank are shown; winning odds within those markets are displayed with outcome name, UUID, and price.

### Files changed
- `app/(admin)/games/[id]/MarketResultsView.tsx` — new component
- `app/(admin)/games/[id]/page.tsx` — renders `MarketResultsView` for resulted games, `MarketView` grid otherwise

### Edge case review
| Scenario | Behaviour |
|----------|-----------|
| `event.oddsResults` is null | `?? []` gives empty array → "No winning markets yet" empty state |
| No configured markets match | Empty map → empty state |
| `markets` DB query returns empty | `new Set([])` → all odds filtered out → empty state |
| API returns `status: "won"` vs `"win"` | Both handled: `s !== "win" && s !== "won"` |
| DRAFT/PENDING/OPEN games | `isResulted` is false → `MarketView` grid renders as before |
| Market has multiple winning odds | All accumulated into `winners[]` array, all rendered |

### TypeScript
`npx tsc --noEmit` — clean, no errors.

### Test scenarios
- [ ] COMPLETED game with known winning odds → only configured-market winners appear
- [ ] COMPLETED game where API returns markets not in our bank → those markets are absent from the view
- [ ] COMPLETED game with no winners in configured markets → "No winning markets yet" empty state
- [ ] OPEN game → player-view market grid renders normally, no regression
- [ ] DRAFT game → no markets section change

### Regression risk
None. The `MarketView` grid path is unchanged for non-resulted games. `MarketResultsView` is a new isolated component.

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
