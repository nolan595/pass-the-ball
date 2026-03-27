# Audit: /

## Screenshots
- Desktop: home-desktop.png
- Tablet: home-tablet.png
- Mobile: home-mobile.png

## Issues Found

### Critical (broken / unusable)
- None on this page.

### Major (poor UX but functional)
- **Game name duplicated in subtitle**: Each game card shows the match name twice — once as the bold title and again as a smaller subtitle directly below it (e.g. "South Africa·Panama" repeated). The subtitle appears to be intended for a secondary label (segment, market, or competition name) but is just repeating the event name. This is pure redundancy.
- **Stat cards not clickable / no navigation**: The four KPI cards (Live Now, Need Result, Scheduled, Connect-3 Avg) appear interactive but clicking them does nothing. They link to no filtered view. Users expect numbers to be tappable drill-downs.
- **"Connect-3 Avg" stat shows "—"**: With 10 live games, this stat reads "no completed games yet". Acceptable for a new platform, but the card layout is jarring when three cards have numbers and one has a dash.
- **No empty state for the game list**: If there were 0 games, the "Live & Scheduled" section would just collapse to nothing. No empty state is visible/tested.

### Minor (polish / consistency)
- **Tablet: game name truncated at ~3 characters** ("So...", "U...", "Al...", "G..."). The name column shrinks too aggressively at 768px. The game name should be the primary identifier and should never truncate to just 2–3 characters. Increase column min-width or drop a secondary column at this breakpoint.
- **Mobile: the "N" avatar** in the bottom-left corner of the sidebar overlaps the game list row on scroll — it is a floating element that obscures content on mobile.
- **"OPEN" badge uses a teal/green border** on a white background — at small sizes the dot is 6px and the contrast of the text is marginal. Could benefit from a slightly stronger colour fill.
- **Date shown in top-right has no visual hierarchy** — it's plain grey text. Fine for an admin tool, but slightly detached from the heading block.
- **Hover on game card**: only the chevron arrow changes to accent colour. The whole card row could highlight (background tint) to make it clearer it's clickable. No visual feedback on the card itself beyond the arrow icon changing.

## Components Seen
- Sidebar navigation (desktop persistent, mobile drawer)
- App logo / wordmark block
- Live badge pill ("Live · v0.1")
- KPI stat cards (4× grid)
- Section heading with icon + count
- Game row cards (link rows with status badge, opens/closes columns, sheet count, chevron arrow)
- Status badge ("OPEN" — teal/green pill with dot)
- Mobile top bar (hamburger + live count pill)
- "10 live" pill badge in mobile top bar

## Visual Identity Notes
- Colours spotted: background `#f1f5f9` (slate-100), sidebar `#ffffff`, accent `#6d28d9` / `#7c3aed` (violet/indigo-600), green for "OPEN" badge and live dot `#10b981`, text primary ~`#0f172a` (slate-900), text secondary ~`#64748b` (slate-500), orange warning icon on "Need Result"
- Fonts spotted: Outfit (custom font via CSS var `--font-outfit`)
- Spacing: consistent — 4/6/8 gap scale used throughout, 8px border radii on cards
- Animations: hover arrow transition (colour change only, no motion). No page transition animation observed.
- States designed: loading=n (not visible on first load since SSR), empty=n (not seen, likely absent), error=n
