# Audit: /games

## Screenshots
- Desktop: games-list-desktop.png
- Tablet: games-list-tablet.png
- Mobile: games-list-mobile.png
- Hover state: games-list-row-hover.png

## Table Columns Observed
| Column | Notes |
|--------|-------|
| Name | Bold, game name |
| Event | Lighter weight, external event name (always same as Name currently) |
| Status | "OPEN" pill badge with green dot |
| Opens | Date + time |
| Closes | Date + time |
| (Actions) | Hidden until row hover: "View →" link button + trash/delete icon button |

**No s3Status, s3_status, sgaStatus, or paymentStatus columns present.** These have already been removed or were never added.

**Delete button confirmed present** — a trash icon button appears per row on hover (alongside the "View" link). No confirmation dialog was visible from the accessibility snapshot; this should be verified — destructive actions should require a confirm step.

## Issues Found

### Critical (broken / unusable)
- **"New Game" button crashes** — clicking "+ New Game" navigates to `/games/new` which throws a `PrismaClientValidationError`: `Invalid prisma.game.findUnique() invocation — id: Int` expected. The `/games/new` page file exists at `app/(admin)/games/new/page.tsx` but the Next.js dynamic segment `[id]` is being matched instead. This is likely a Turbopack build cache issue where the `new` static segment is not winning the route resolution over `[id]`. **The primary creation flow is completely broken.**
- **Delete button has no visible confirmation** — a destructive action (deleting a game round) appears to fire directly on click with no modal/dialog confirmation visible in the snapshot. This risks accidental data deletion. Needs a confirmation dialog.

### Major (poor UX but functional)
- **Name and Event columns show identical values** for all 10 rows. The game name IS the event name (e.g. "South Africa·Panama" in both columns). This is redundant column space. Either the game should have its own name (e.g. "WC Qualifier Round 1") or the Event column should show the event ID / competition name instead.
- **Table actions are hover-only** — View and Delete buttons only appear on hover. There is no touch equivalent on tablet/mobile. Mobile correctly switches to a card layout where View and Delete are always visible, but at 768px tablet the table layout is kept and the actions remain hover-dependent (not ideal for touch).
- **Tablet overflow**: at 768px the Opens, Closes columns overflow or push content right — the rightmost column (actions) is clipped out of view (only "N..." is visible for the rightmost cell in the screenshot).

### Minor (polish / consistency)
- **"10 games" count** is plain grey text with no visual emphasis — could be a badge pill to match the Games nav badge style.
- **Status badge inconsistency**: on the dashboard the status badge renders as `OPEN` (uppercase), here it also renders as `Open` (mixed case in table row but uppercase in badge pill). The badge says "OPEN" correctly; the table `cell "Open"` text suggests the row label in accessible text is mixed case. Visual is consistent though.
- **Row height is tall** (roughly 64px per row) — with only 5 columns of simple data this wastes vertical space. 48px rows would fit more games without scrolling.

## Components Seen
- Page heading + subtitle
- Game count label
- "New Game" primary CTA button (icon + text, violet fill)
- Data table (sortable headers implied but no sort arrows visible)
- Table row with: Name cell, Event cell, Status badge pill, date cells (Opens/Closes), actions cell (View link + delete icon button)
- "View →" link button (outlined/ghost style, with arrow icon)
- Trash icon delete button (icon-only, no label)
- Sidebar navigation (same as all pages)

## Visual Identity Notes
- Colours spotted: Table header labels `#64748b` (slate-500) uppercase tracking; row text `#0f172a` (slate-900) for name bold, `#64748b` for event; OPEN badge: green dot + teal-bordered pill; View button: slate border + slate text; primary button: violet gradient `#6d28d9`→`#7c3aed`
- Fonts spotted: Outfit
- Spacing: consistent 16px row padding, table header consistent with rest of admin
- Animations: row hover causes action buttons to appear (likely opacity/visibility transition, smooth)
- States designed: loading=n (SSR), empty=n (no empty state for 0 games), error=n
