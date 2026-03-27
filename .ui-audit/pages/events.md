# Audit: /events

## Screenshots
- Desktop: events-desktop.png
- Tablet: events-tablet.png
- Mobile: events-mobile.png
- Date picker focused: events-datepicker-open.png
- After date search (Mar 29): events-search-results.png
- Toggle switch ON state: events-toggle-on.png
- Text search ("England"): events-text-search.png
- Mobile nav drawer open: events-mobile-nav-open.png

## Page Summary
The Events page allows admins to browse Superbet football matches, search by date (fetches from Offer API), filter by name (client-side), and toggle events to "register" them as available for game creation. 2034 events loaded for today; 941 for Mar 29.

## Table Columns (Desktop)
| Column | Notes |
|--------|-------|
| Event | Full match name (truncated with "…" at ~35 chars) |
| Home | Home team name |
| Away | Away team name |
| Start | Date + time |
| Tournament | Tournament ID as "#XXXXX" (raw numeric ID — not human-readable) |
| (Toggle) | Switch to register/unregister event |

## Interactions Tested
- **Date search**: Changed date from 2026-03-27 to 2026-03-29, clicked Search — results updated correctly to 941 events for that date. Loading state shown briefly.
- **Text search**: Typing "England" in the search box filters client-side across ALL loaded events (not just the current date page). Returned 2 results from different dates (Apr 4 and Jun 17) even though the date picker showed Mar 29. This cross-date filter behaviour may be intentional (searching the local cache) but is surprising UX.
- **Toggle switch**: Clicking the switch on row "CSD Municipal·Malacateco" toggled it ON (green), the "24 active" counter in the header updated to "25 active" immediately. Toggling back decremented to 24. Optimistic update works correctly.
- **Pagination**: First/Prev buttons correctly disabled on page 1. Next and Last buttons present. "1–10 of 941" count displayed.
- **Mobile nav drawer**: Hamburger button opens a slide-in sidebar drawer with backdrop dimming. Close (×) button works. Active page (Events) highlighted correctly.

## Issues Found

### Critical (broken / unusable)
- None.

### Major (poor UX but functional)
- **Tournament column shows raw numeric IDs** ("#21782", "#292", etc.) rather than human-readable tournament names. This provides zero context to an admin trying to identify which competition a match belongs to. The Offer API response likely includes a `tournamentName` field — this should be used.
- **Text search crosses date boundaries unexpectedly**: The search box filters across ALL events in the client-side cache, ignoring the date picker context. Searching "England" while the date is set to Mar 29 returns England vs Croatia on Jun 17. An admin would expect search to operate within the selected date. Needs a clarifying label ("search within date" vs "search all registered") or the search should filter only the current date's result set.
- **Search button is disabled on initial load** (visible in first snapshot — button was disabled for ~1–2 seconds while events loaded). Once loaded it becomes enabled. There's no explicit loading state on the button or feedback that it's waiting for data.
- **Event name truncation at desktop**: "Juventude RS (W)·Flamengo..." — names are truncated in the Event column. This is worse at tablet (only first few chars visible). The Event column should be wider or the full name should be shown in a tooltip on hover.

### Minor (polish / consistency)
- **"24 active" counter placement**: shown top-right alongside the subtitle. At mobile it moves to below the heading. Consistent enough but a badge/pill style would look more intentional.
- **Toggle switch has no label/tooltip**: There is no label on the switch column header or on individual switches. New admins won't know what "toggling" an event does. A column header label ("Register") and/or a tooltip would help.
- **Date input uses native browser date picker** — consistent cross-platform appearance not guaranteed. A custom date picker component would give more visual control, especially important for this workflow-critical field.
- **Pagination buttons are icon-only** (prev/next/first/last arrows) with no page number input. With 2034 events / 941 results, jumping to a specific page is impossible. A page number input or jump-to field would help power users.
- **Mobile: Next.js dev tools overlay ("N" avatar)** appears bottom-left, partially overlapping row content on scroll.
- **Mobile: Search button loses its text label** and shows only the magnifying glass icon at 375px. Fine for space, but no tooltip is present.

## Components Seen
- Page heading + subtitle
- "24 active" count badge
- Text search input (with magnifying glass icon)
- Date input (native `<input type="date">`, wrapped with a calendar icon)
- "Search" button (icon + text label; icon-only on mobile)
- Data table with: Event, Home, Away, Start, Tournament, Toggle columns
- Toggle switch component (off=grey, on=green teal)
- Pagination controls (first/prev/next/last icon buttons + "1–10 of N" count label)
- Mobile card list layout (replaces table — shows match name, "Home vs Away" subtitle, date, toggle)
- Mobile top bar (hamburger, logo, "10 live" pill)
- Mobile nav drawer (slide-in with backdrop)

## Visual Identity Notes
- Colours spotted: toggle ON: `#10b981` (green/teal), toggle OFF: `#cbd5e1` (slate-300); search input focused border: `#6d28d9` (violet/indigo); tournament ID label: `#6d28d9` (violet — these are styled as violet badge/links); text primary `#0f172a`, secondary `#64748b`
- Fonts spotted: Outfit
- Spacing: consistent table row height (~56px desktop), good column padding
- Animations: toggle switch transitions smoothly; "active" counter updates immediately (no animation on the count change — a brief highlight/pulse would reinforce the feedback)
- States designed: loading=y (spinner + "Loading matches…" shown on initial fetch), empty=unknown (not tested with a date that has 0 results), error=n (network failure on the Offer API not tested)
