# PR: Paginate Groups Page (3 per page)

## Summary

- Groups admin page now paginates at 3 groups per page
- Previous/Next controls and "Page X of Y" counter appear only when there are more than 3 groups
- Pure client-side state — no API changes, no schema changes, no new env vars

## Files Changed

| File | Change |
|------|--------|
| `app/(admin)/groups/GroupsClient.tsx` | Added `Pagination` component, `page` + `safePage` state, slice logic |
| `docs/qa-report.md` | QA section appended |
| `docs/pr-paginate-groups.md` | This file |

## Environment Variables

None. No new env vars required.

## Migration Steps

None. No schema changes.

## Build / Deploy Notes

- Standard Netlify auto-deploy from `main` branch
- No build config changes required
- Next.js static analysis will type-check the new component automatically

## Rollback Plan

Revert the `GroupsClient.tsx` change: remove the `Pagination` component, `GROUPS_PER_PAGE` constant, `page`/`safePage` state, and slice — restore `groups.map(...)` directly. One-file revert, zero data impact.
