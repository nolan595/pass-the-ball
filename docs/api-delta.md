# API Delta — Add Groups Feature

## Schema Changes

### New model: `Group`

```prisma
model Group {
  id        Int      @id @default(autoincrement())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  players   Player[]
  @@map("groups")
}
```

### Modified model: `Player`

Added fields:
- `groupId Int?` — nullable FK to `groups.id`
- `group Group?` — relation

Migration: `20260331111459_add_groups`

---

## New Server Actions — `app/(admin)/groups/actions.ts`

| Action | Args | Description |
|--------|------|-------------|
| `createGroup(formData)` | `name: string` | Creates a group; slug auto-derived from name |
| `deleteGroup(groupId)` | `groupId: number` | Unassigns players then deletes group |
| `renameGroup(groupId, formData)` | `name: string` | Updates group name and slug |
| `addPlayerToGroup(playerId, groupId)` | both numbers | Sets `player.groupId` |
| `removePlayerFromGroup(playerId)` | `playerId: number` | Sets `player.groupId = null` |
| `createPlayerInGroup(formData, groupId)` | `displayName: string`, `groupId: number` | Creates new player and assigns to group |
| `deletePlayer(playerId)` | `playerId: number` | Hard-deletes a player |

All actions call `revalidatePath("/groups")`.

---

## Player game page change

`app/(player)/play/[slug]/[gameId]/page.tsx` — `allPlayers` query is now scoped:
- If the viewing player belongs to a group → only players in that group are loaded
- If ungrouped → falls back to all players (backwards-compatible)

`GroupPanel.groupName` now uses `player.group.name` when available, falling back to `game.name`.
