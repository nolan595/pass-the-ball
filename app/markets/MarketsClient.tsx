"use client";

import { useState, useTransition } from "react";
import type { Market } from "@/app/generated/prisma";
import { createMarket, updateMarket, toggleMarket, toggleSuperSub, deleteMarket } from "./actions";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDisplayType } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import { Plus, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";

const DISPLAY_TYPES = [
  { value: "ONE_X_TWO", label: "1×2" },
  { value: "OVER_UNDER", label: "Over / Under" },
  { value: "ONE_FROM_TWO", label: "1 from 2" },
  { value: "PLAYER_PROPS", label: "Player Props" },
  { value: "PLAYER_PROPS_SINGLE", label: "Player Props Single" },
] as const;

function MarketForm({
  market,
  onClose,
}: {
  market?: Market;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const isEdit = !!market;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      if (isEdit) {
        await updateMarket(market.id, fd);
      } else {
        await createMarket(fd);
      }
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          Market Name
        </label>
        <input
          name="name"
          defaultValue={market?.name}
          required
          placeholder="e.g. Match Betting"
          className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          Market ID
        </label>
        <input
          name="marketId"
          type="number"
          defaultValue={market?.marketId}
          required
          placeholder="e.g. 547"
          className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          Display Type
        </label>
        <select
          name="displayType"
          defaultValue={market?.displayType}
          required
          className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">Select a display type…</option>
          {DISPLAY_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3 py-1">
        <Switch.Root
          name="superSubEligible"
          defaultChecked={market?.superSubEligible ?? false}
          className="w-9 h-5 rounded-full transition-colors data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-slate-200"
        >
          <Switch.Thumb className="block w-4 h-4 rounded-full bg-white shadow-sm translate-x-0.5 transition-transform data-[state=checked]:translate-x-4" />
        </Switch.Root>
        <label className="text-sm text-slate-700 font-medium">Super Sub eligible</label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={pending} className="flex-1">
          {isEdit ? "Save Changes" : "Create Market"}
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export function MarketsClient({ markets }: { markets: Market[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Market | null>(null);
  const [, startTransition] = useTransition();

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(m: Market) {
    setEditing(m);
    setDialogOpen(true);
  }

  function handleToggle(id: number, enabled: boolean) {
    startTransition(() => toggleMarket(id, enabled));
  }

  function handleToggleSuperSub(id: number, value: boolean) {
    startTransition(() => toggleSuperSub(id, value));
  }

  function handleDelete(id: number) {
    if (!confirm("Delete this market?")) return;
    startTransition(() => deleteMarket(id));
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Markets</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure which Superbet markets are available in games
          </p>
        </div>
        <Button onClick={openCreate} size="md">
          <Plus className="w-4 h-4" />
          Add Market
        </Button>
      </div>

      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-slate-700">
            {markets.length} market{markets.length !== 1 ? "s" : ""} configured
          </span>
          <span className="text-xs text-slate-400">
            {markets.filter((m) => m.enabled).length} enabled
          </span>
        </CardHeader>

        {markets.length === 0 ? (
          <CardBody>
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-600">No markets yet</p>
              <p className="text-xs text-slate-400 mt-1">Add your first market to get started</p>
            </div>
          </CardBody>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Market Name
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Market ID
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Display Type
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Super Sub
                  </th>
                  <th className="px-4 py-3 w-12" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {markets.map((market) => (
                  <tr key={market.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-slate-900 whitespace-nowrap">{market.name}</td>
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                        {market.marketId}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge variant="neutral">{formatDisplayType(market.displayType)}</Badge>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <Switch.Root
                          checked={market.enabled}
                          onCheckedChange={(v) => handleToggle(market.id, v)}
                          className="w-9 h-5 rounded-full transition-colors data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-slate-200"
                        >
                          <Switch.Thumb className="block w-4 h-4 rounded-full bg-white shadow-sm translate-x-0.5 transition-transform data-[state=checked]:translate-x-4" />
                        </Switch.Root>
                        <span className="text-xs text-slate-500">
                          {market.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <Switch.Root
                        checked={market.superSubEligible}
                        onCheckedChange={(v) => handleToggleSuperSub(market.id, v)}
                        className="w-9 h-5 rounded-full transition-colors data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-slate-200"
                      >
                        <Switch.Thumb className="block w-4 h-4 rounded-full bg-white shadow-sm translate-x-0.5 transition-transform data-[state=checked]:translate-x-4" />
                      </Switch.Root>
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
                            className="z-50 bg-white rounded-xl border border-slate-200 shadow-lg p-1 min-w-[140px] text-sm"
                          >
                            <DropdownMenu.Item
                              onSelect={() => openEdit(market)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-700 outline-none"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Edit
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
                            <DropdownMenu.Item
                              onSelect={() => handleDelete(market.id)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-red-50 text-red-600 outline-none"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
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
      </Card>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-lg font-bold text-slate-900">
                {editing ? "Edit Market" : "Add Market"}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>
            <MarketForm
              market={editing ?? undefined}
              onClose={() => setDialogOpen(false)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
