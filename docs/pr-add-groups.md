# PR: Add Groups

## Summary

- Adds a `Group` model — players can belong to a named group (e.g. "Superbet", "Polytech")
- New admin page at `/groups` to create/rename/delete groups and add/remove players
- Player game view now scopes the `GroupPanel` to the viewing player's group only
- Two groups seeded: **Superbet** (Josh, Marco, Luiz, Marcelo) and **Polytech** (dev1, dev2, dev3, dev4)

## Files Changed

| File | Change |
|------|--------|
| `prisma/schema.prisma` | Added `Group` model; added `groupId` FK + relation on `Player` |
| `prisma/migrations/20260331111459_add_groups/` | New migration |
| `prisma/seed-groups.ts` | One-time seed script (idempotent) |
| `app/(admin)/groups/actions.ts` | New server actions for group CRUD |
| `app/(admin)/groups/page.tsx` | New admin page (server component) |
| `app/(admin)/groups/GroupsClient.tsx` | New admin UI (client component) |
| `app/(admin)/groups/loading.tsx` | Skeleton loading state |
| `components/layout/Sidebar.tsx` | Added "Groups" nav link |
| `app/(player)/play/[slug]/[gameId]/page.tsx` | Scoped player list to group; group name from group record |
| `docs/api-delta.md` | Documents schema and action changes |

## Environment Variables

No new variables required.

## Migration Steps

1. The migration `20260331111459_add_groups` has already been applied to the Railway DB
2. Run `npx prisma generate` if deploying to a fresh environment
3. Seed script is idempotent — safe to re-run: `npx tsx prisma/seed-groups.ts`

## Rollback Plan

If rollback is needed:
1. Revert code changes
2. Run: `npx prisma migrate resolve --rolled-back 20260331111459_add_groups`
3. Apply a new migration that drops `groupId` from `players` and drops the `groups` table
4. The `players` table is unaffected other than the nullable `groupId` column — existing picks remain intact

## QA Checklist

- [ ] `/groups` admin page loads, shows Superbet and Polytech groups
- [ ] Create new group dialog works; slug auto-derived
- [ ] Add player (new) to a group works
- [ ] Add existing ungrouped player to a group works
- [ ] Remove player from group (keeps player, clears groupId)
- [ ] Delete player from group (hard delete)
- [ ] Rename group works
- [ ] Delete group works (players become ungrouped, not deleted)
- [ ] Player game page: player in "Superbet" only sees Superbet members in GroupPanel
- [ ] Player game page: ungrouped player still sees all players (backwards-compatible)
- [ ] Sidebar shows "Groups" link on mobile and desktop
- [ ] TypeScript: `npx tsc --noEmit` passes clean
