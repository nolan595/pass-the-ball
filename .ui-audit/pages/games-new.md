# Audit: /games/new

## Screenshots
- Desktop: games-new-desktop.png  (shows error)
- Tablet: games-new-tablet.png    (shows error)
- Mobile: games-new-mobile.png    (shows error)

## CRITICAL: Page Does Not Render

**`/games/new` throws a server-side exception on every load and is completely unusable.**

### Error
```
Runtime PrismaClientValidationError — Server
Invalid `prisma.game.findUnique()` invocation:
{
  where: {
  + id: Int   ← expected integer, received string "new"
  },
  include: { ...
```

### Root Cause
The `app/(admin)/games/new/page.tsx` file exists as a static segment and should take precedence over `app/(admin)/games/[id]/page.tsx`. However, Next.js (Turbopack, v16.1.6) is routing `/games/new` to the dynamic `[id]` segment handler, which attempts `prisma.game.findUnique({ where: { id: parseInt("new") } })` and throws a `PrismaClientValidationError`.

This is likely a **Turbopack build cache issue** — static segments should always beat dynamic segments in Next.js App Router. Clearing the `.next` cache (`rm -rf .next`) and restarting the dev server would confirm whether this is a cache poisoning problem. If the issue persists post-cache-clear, a workaround would be to rename the route to `/games/create` to avoid the conflict.

### Form Fields (from source code inspection of `NewGameForm.tsx` — form could not be interacted with)
From `app/(admin)/games/new/NewGameForm.tsx`:
- **Event selector** — dropdown/combobox populated from `prisma.externalEvent.findMany()`. The page itself handles the empty state ("No events registered yet — register an event first").
- Expected additional fields based on the `Game` model: opens datetime, closes datetime, prize type, bonus ID, multiplier — exact form field list could not be confirmed since the page errors before rendering.

## Issues Found

### Critical (broken / unusable)
- **Page crashes with a 500 server error on every visit** — the entire New Game creation flow is inaccessible. No form is rendered.
- **"New Game" button in `/games` links to this broken page** — the primary admin creation path is dead.

### Major (poor UX but functional)
- N/A — page cannot render.

### Minor (polish / consistency)
- N/A — page cannot render.

## Components Seen
- Next.js error overlay (dev mode only)
- "1 Issue" badge (bottom-left, dev tools)

## Visual Identity Notes
- No app UI rendered — only the Next.js error overlay is visible.
- States designed: error=y (Next.js dev overlay shown), loading=unknown, empty=unknown (there is an empty-state warning in the page source for no events)
