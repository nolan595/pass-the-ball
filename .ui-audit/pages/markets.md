# Audit: /markets

## Screenshots
- Desktop: markets-desktop.png
- Tablet: markets-tablet.png
- Mobile: markets-mobile.png

## CRITICAL: Page Does Not Exist (404)

`/markets` returns a Next.js 404 — "This page could not be found."

There is **no `markets` route** in the application file structure. The directory `app/(admin)/` does not contain a `markets/` folder. The sidebar navigation also has no "Markets" link — the nav items are: Dashboard, Games, Weekend Setup, Analytics, Bingo Sheets, Events, Segments, Difficulties.

### Context
Based on `CLAUDE.md`, markets are configured at `app/markets/` — however, this directory either does not exist or is not mounted under the `(admin)` layout group. The markets functionality may have been moved, renamed, or is accessible via a different route (possibly embedded within the game detail view rather than as a top-level admin page).

## Issues Found

### Critical (broken / unusable)
- **`/markets` is a 404 — route does not exist**. If markets were ever a standalone admin page, the route has been removed without redirect.
- **No "Markets" entry in sidebar navigation** — there is no navigation path to market configuration from any visible UI.

### Major (poor UX but functional)
- N/A — page does not exist.

### Minor (polish / consistency)
- The 404 page uses the default Next.js error UI (plain white, no admin layout wrapper applied). If a user somehow navigates to `/markets` directly (e.g. from a bookmark), they see a broken unstyled 404 with the admin sidebar — the main content area switches to the Next.js raw 404 layout, which is inconsistent with the rest of the admin design.

## Components Seen
- Default Next.js 404 layout ("404 | This page could not be found.")
- Admin sidebar (renders correctly as the layout wrapper still applies)

## Visual Identity Notes
- 404 area: plain white, default Next.js sans-serif font — no Outfit font, no admin card styling
- Sidebar renders correctly with the admin design system
- States designed: error=partial (Next.js 404 shown but unstyled within the admin shell)
