# UI Audit — Player Game Page (`/play/[slug]/[gameId]`)

**Audit date:** 2026-03-30
**Working URL:** `http://localhost:3000/play/user2/11` (OPEN game, user2's turn — richest state)
**Also audited:** `http://localhost:3000/play/user1/11` (WAITING state), `http://localhost:3000/play/user1/history`

---

## Screenshots

| Viewport | File |
|----------|------|
| 375×812 (mobile) — waiting state | `screenshots/play-mobile.png` |
| 768×1024 (tablet) — waiting state | `screenshots/play-tablet.png` |
| 1440×900 (desktop) — waiting state | `screenshots/play-desktop.png` |
| 1920×1080 (wide desktop) — waiting state | `screenshots/play-wide.png` |
| 375×812 (mobile) — pick/YOUR_TURN state | `screenshots/play-pick-mobile.png` |
| 1440×900 (desktop) — pick/YOUR_TURN state | `screenshots/play-pick-desktop.png` |
| 375×812 (mobile) — history | `screenshots/play-history-mobile.png` |
| 1440×900 (desktop) — history | `screenshots/play-history-desktop.png` |

---

## Root Cause of Desktop Issues

**The player layout hardcodes `maxWidth: "375px"`** in `app/(player)/layout.tsx`:

```tsx
<div style={{ maxWidth: "375px", margin: "0 auto", minHeight: "100dvh", ... }}>
```

This is the single source of every desktop layout problem. The entire player experience — all pages, all states — is capped at a phone-width column regardless of how large the viewport is.

The `BottomNavBar` compounds this by also hardcoding `width: "375px"` on its fixed-position element.

The `FixedHeader` uses `position: sticky` and inherits its width from the layout container — so at desktop it renders as a 375px sticky strip floating in the centre of the viewport.

---

## What the Page Looks Like at Each Viewport

### 375×812 — Mobile
The design works. The full-bleed dark/red gradient fills the phone screen. The sticky header, market cards, group panel, and bottom nav all feel purposeful and native. This is clearly the intended experience. The pick UI (YOUR_TURN state) is a long scrollable list of market cards — sensible on mobile, works fine.

### 768×1024 — Tablet
The 375px content column is centred on a 768px canvas. Left and right thirds of the screen are filled with raw background gradient. The content doesn't feel pinned to anything — it's a phone app floating in the middle of a tablet screen. The bottom nav bar is a 375px strip centred at the bottom. The overall impression is an unfinished, unoptimised experience.

### 1440×900 — Desktop
The problem is stark. The 375px column occupies ~26% of the horizontal viewport. The background gradient (dark top → red bottom) only covers the full width because it's on the outer wrapper (`background: var(--gradient-bg)`), but the inner content column is visually tiny, centred, and surrounded by flat gradient background with nothing in it. The bottom nav bar is a 375px dark strip floating in the bottom-centre, flanked by bright red gradient on either side — this looks broken. The sticky header is similarly a narrow strip. The pick UI (YOUR_TURN state with all the market cards) renders as a very long, very narrow scrolling column — the player props tables especially overflow their cells horizontally because the column is too narrow even for the content designed for it at 375px.

### 1920×1080 — Wide Desktop
Everything above is worse. The content column is now ~20% of the screen width. The background gradient dominates the visual field. The nav bar is a tiny centred rectangle at the bottom of a vast red expanse. The page communicates nothing about what the product is to anyone viewing it for the first time on a laptop or desktop.

### History Page — Desktop
Same 375px column problem. Two round cards centred in the middle of a 1440px screen, surrounded by gradient. The filter buttons (All Rounds / Won / Lost) and round cards look fine at that width; the problem is purely the surrounding emptiness.

---

## Specific Desktop Issues

### 1. Hard `maxWidth: 375px` on the layout
Every single page in the player experience is affected. This is not "mobile-first design" — it's "mobile-only design that doesn't degrade gracefully." There is no breakpoint, no responsive behaviour, no attempt to use the available space.

### 2. Bottom nav bar floats as a disconnected island
`BottomNavBar` uses `position: fixed; left: 50%; transform: translateX(-50%); width: 375px`. At desktop this renders as a dark pill-shaped bar floating at the bottom centre of the viewport, surrounded by red gradient on both sides. It looks like a detached component, not a navigation system.

### 3. Sticky header doesn't span the viewport
`FixedHeader` uses `position: sticky; top: 0` and inherits the 375px constraint. At desktop, the sticky header is a 375px-wide block that scrolls with the column — it doesn't create the expected full-width top navigation experience.

### 4. Background gradient / content contrast
The gradient goes from near-black at the top to bright red at the bottom. On a 375px mobile screen the proportions feel designed — the red is at the fold/bottom of the page. At 1440×900 the content only reaches ~460px tall (waiting state), so the gradient shows its full extent and the bottom-right and bottom-left corners are vivid red against nothing. It reads as an error state, not a designed background.

### 5. Player props tables overflow at 375px
The pick UI player props tables (7+ columns: player name + multiple price thresholds) are already crowded at 375px. At desktop they render at the same width with no additional space to breathe.

### 6. Group panel card title truncates "Germany vs Gh..."
The match name truncates in the GroupPanel header at 375px. At wider viewports there is ample room but the truncation persists because the column never expands.

---

## What a Good Desktop Layout Would Look Like

The content is inherently mobile in nature — it's a game played turn-by-turn on your phone. There are two valid approaches:

### Option A — Constrained centred layout with better framing (low effort, high impact)

Keep the ~375–480px content column but make the surrounding space intentional:
- Extend `maxWidth` to `480px` (comfortable breathing room without redesigning the app)
- Give the outer wrapper a proper full-bleed background that looks designed at all widths — either a dark solid background or a centred radial spotlight effect rather than the full top-to-bottom gradient
- Make the bottom nav span the full `max-width` column, not a fixed 375px strip — or switch to a sidebar nav at ≥768px
- Give the sticky header full-bleed within the viewport (or at minimum the column width) at all sizes
- Add a subtle card shadow or border-radius treatment to the content column at ≥768px so it reads as a "phone-in-browser" chrome rather than a broken layout

### Option B — Two-column layout at ≥768px (medium effort, genuinely responsive)

At ≥768px, split into two columns:
- **Left column (~360–400px):** The game content as-is (header, match card, market cards / waiting state)
- **Right column (~300–360px):** The GroupPanel — currently stacked below the content on mobile, it would live permanently visible alongside at desktop

This is actually the natural responsive version of the current design: the GroupPanel is supplementary context, and on desktop there's room to show it alongside rather than below. The pick flow would benefit hugely from seeing the group status while browsing markets.

### What not to do
- Don't blow the content to full-width — the market cards and odds buttons are designed for touch targets at ~375px and would look comically large at 1440px
- Don't add a sidebar nav unless the product genuinely expands beyond 2 tabs — the bottom nav works fine on mobile and a top nav bar at desktop would be sufficient
- Don't change the background gradient — it's a strong visual identity, the problem is the layout not using it well

---

## Priority Order for Fixes

1. **`app/(player)/layout.tsx` — change `maxWidth: "375px"` to `maxWidth: "480px"`** — one line change, immediate improvement at tablet and desktop without touching any component
2. **`BottomNavBar` — remove hardcoded `width: "375px"`, use `maxWidth` instead** — so the nav matches the layout width
3. **Background treatment at desktop** — wrap the content column in a subtle dark overlay or constrain the gradient radially so the outer canvas doesn't look like bare gradient
4. **GroupPanel side-by-side at ≥768px** — medium-effort responsive layout improvement for the pick and waiting states
