"use client";

import { useState, useTransition } from "react";
import type { Group, Player } from "@/app/generated/prisma";
import {
  createGroup,
  deleteGroup,
  renameGroup,
  addPlayerToGroup,
  removePlayerFromGroup,
  createPlayerInGroup,
  deletePlayer,
} from "./actions";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Plus, MoreHorizontal, Pencil, Trash2, X, UserPlus, Users } from "lucide-react";

type GroupWithPlayers = Group & { players: Player[] };

// ── Create group dialog ────────────────────────────────────────────────────────
function CreateGroupDialog({ onClose }: { onClose: () => void }) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await createGroup(fd);
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          Group Name
        </label>
        <input
          name="name"
          required
          autoFocus
          placeholder="e.g. Superbet"
          className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={pending} className="flex-1">
          Create Group
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

// ── Rename group dialog ────────────────────────────────────────────────────────
function RenameGroupDialog({
  group,
  onClose,
}: {
  group: Group;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await renameGroup(group.id, fd);
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          Group Name
        </label>
        <input
          name="name"
          required
          defaultValue={group.name}
          className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={pending} className="flex-1">
          Save Changes
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

// ── Add player dialog ──────────────────────────────────────────────────────────
function AddPlayerDialog({
  group,
  ungroupedPlayers,
  onClose,
}: {
  group: Group;
  ungroupedPlayers: Player[];
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"new" | "existing">(
    ungroupedPlayers.length > 0 ? "existing" : "new"
  );
  const [pending, startTransition] = useTransition();

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await createPlayerInGroup(fd, group.id);
      onClose();
    });
  }

  function handleAssign(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const playerId = parseInt(fd.get("playerId") as string);
    startTransition(async () => {
      await addPlayerToGroup(playerId, group.id);
      onClose();
    });
  }

  return (
    <div className="space-y-4">
      {ungroupedPlayers.length > 0 && (
        <div className="flex gap-2">
          <button
            onClick={() => setMode("existing")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              mode === "existing"
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            Existing player
          </button>
          <button
            onClick={() => setMode("new")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              mode === "new"
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            New player
          </button>
        </div>
      )}

      {mode === "existing" && ungroupedPlayers.length > 0 ? (
        <form onSubmit={handleAssign} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
              Player
            </label>
            <select
              name="playerId"
              required
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">Select a player…</option>
              {ungroupedPlayers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.displayName} ({p.slug})
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={pending} className="flex-1">
              Add to Group
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
              Display Name
            </label>
            <input
              name="displayName"
              required
              autoFocus
              placeholder="e.g. Josh"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={pending} className="flex-1">
              Create &amp; Add
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

// ── Group card ─────────────────────────────────────────────────────────────────
function GroupCard({
  group,
  ungroupedPlayers,
}: {
  group: GroupWithPlayers;
  ungroupedPlayers: Player[];
}) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [, startTransition] = useTransition();

  function handleRemovePlayer(playerId: number) {
    startTransition(() => removePlayerFromGroup(playerId));
  }

  function handleDeletePlayer(playerId: number) {
    if (!confirm("Delete this player? This cannot be undone.")) return;
    startTransition(() => deletePlayer(playerId));
  }

  function handleDeleteGroup() {
    if (
      !confirm(
        `Delete group "${group.name}"? Players will be unassigned but not deleted.`
      )
    )
      return;
    startTransition(() => deleteGroup(group.id));
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-500" />
          <span className="font-semibold text-slate-900">{group.name}</span>
          <span className="text-xs text-slate-400 font-mono">/{group.slug}</span>
          <span className="ml-1 text-xs text-slate-400">
            · {group.players.length} player{group.players.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setAddOpen(true)}>
            <UserPlus className="w-3.5 h-3.5" />
            Add Player
          </Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="z-50 bg-white rounded-xl border border-slate-200 shadow-lg p-1 min-w-[140px] text-sm"
              >
                <DropdownMenu.Item
                  onSelect={() => setRenameOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-700 outline-none"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Rename
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
                <DropdownMenu.Item
                  onSelect={handleDeleteGroup}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-red-50 text-red-600 outline-none"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Group
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </CardHeader>

      {group.players.length === 0 ? (
        <CardBody>
          <div className="text-center py-8">
            <p className="text-sm text-slate-400">No players in this group yet</p>
            <button
              onClick={() => setAddOpen(true)}
              className="text-xs text-indigo-600 hover:underline mt-1"
            >
              Add the first player
            </button>
          </div>
        </CardBody>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Display Name
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Slug
                </th>
                <th className="px-4 py-3 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {group.players.map((player) => (
                <tr key={player.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-slate-900">{player.displayName}</td>
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                      {player.slug}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          align="end"
                          className="z-50 bg-white rounded-xl border border-slate-200 shadow-lg p-1 min-w-[160px] text-sm"
                        >
                          <DropdownMenu.Item
                            onSelect={() => handleRemovePlayer(player.id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-700 outline-none"
                          >
                            <X className="w-3.5 h-3.5" />
                            Remove from group
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
                          <DropdownMenu.Item
                            onSelect={() => handleDeletePlayer(player.id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-red-50 text-red-600 outline-none"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete player
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rename dialog */}
      <Dialog.Root open={renameOpen} onOpenChange={setRenameOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-lg font-bold text-slate-900">
                Rename Group
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>
            <RenameGroupDialog group={group} onClose={() => setRenameOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Add player dialog */}
      <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-lg font-bold text-slate-900">
                Add Player to {group.name}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>
            <AddPlayerDialog
              group={group}
              ungroupedPlayers={ungroupedPlayers}
              onClose={() => setAddOpen(false)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Card>
  );
}

const GROUPS_PER_PAGE = 3;

// ── Pagination controls ────────────────────────────────────────────────────────
function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Previous
      </button>
      <span className="text-xs text-slate-400 tabular-nums">
        Page {page + 1} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page >= totalPages - 1}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

// ── Main client component ──────────────────────────────────────────────────────
export function GroupsClient({
  groups,
  ungroupedPlayers,
}: {
  groups: GroupWithPlayers[];
  ungroupedPlayers: Player[];
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(groups.length / GROUPS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const pagedGroups = groups.slice(safePage * GROUPS_PER_PAGE, (safePage + 1) * GROUPS_PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Groups</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage player groups — each group plays together in a game
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} size="md">
          <Plus className="w-4 h-4" />
          New Group
        </Button>
      </div>

      <div className="space-y-4">
        {groups.length === 0 ? (
          <Card>
            <CardBody>
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-600">No groups yet</p>
                <p className="text-xs text-slate-400 mt-1">Create your first group to get started</p>
              </div>
            </CardBody>
          </Card>
        ) : (
          <>
            {pagedGroups.map((group) => (
              <GroupCard key={group.id} group={group} ungroupedPlayers={ungroupedPlayers} />
            ))}
            {totalPages > 1 && (
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onPrev={() => setPage((p) => Math.max(0, p - 1))}
                onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              />
            )}
          </>
        )}

        {ungroupedPlayers.length > 0 && (
          <Card>
            <CardHeader>
              <span className="text-sm font-semibold text-slate-500">
                Ungrouped players ({ungroupedPlayers.length})
              </span>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-50">
                  {ungroupedPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-3.5 font-medium text-slate-700">{player.displayName}</td>
                      <td className="px-6 py-3.5">
                        <span className="font-mono text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
                          {player.slug}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Create group dialog */}
      <Dialog.Root open={createOpen} onOpenChange={setCreateOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-lg font-bold text-slate-900">
                New Group
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>
            <CreateGroupDialog onClose={() => setCreateOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
