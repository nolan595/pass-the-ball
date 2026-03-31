"use client";

import { useTransition, useState } from "react";
import { calculateGameSgaPrice, calculateGroupSgaPrice } from "../actions";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, RefreshCw, Copy, Check, CheckCircle2, XCircle, RotateCcw, Link2 } from "lucide-react";

type Pick = {
  id: number;
  oddUuid: string;
  oddName: string;
  marketName: string;
  oddPrice: number;
  player: { id: number; slug: string; displayName: string };
};

type Player = {
  id: number;
  slug: string;
  displayName: string;
  group: { id: number; name: string; slug: string } | null;
};

type GroupSgaResult = { price: number; status: string };

export function PicksSummary({
  gameId,
  picks,
  allPlayers,
  sgaPrice,
  sgaStatus,
  oddsResultsMap = {},
}: {
  gameId: number;
  picks: Pick[];
  allPlayers: Player[];
  sgaPrice: number | null;
  sgaStatus: string | null;
  oddsResultsMap?: Record<string, string>;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [copiedGroupSlug, setCopiedGroupSlug] = useState<string | null>(null);
  const [groupSgaResults, setGroupSgaResults] = useState<Record<string, GroupSgaResult>>({});
  const [activeGroupSlugState, setActiveGroupSlug] = useState<string | null>(null);

  // Build group buckets once
  const groupMap = new Map<string, { id: number; name: string; slug: string; players: Player[] }>();
  const ungrouped: Player[] = [];
  for (const player of allPlayers) {
    if (player.group) {
      const key = player.group.slug;
      if (!groupMap.has(key)) {
        groupMap.set(key, { id: player.group.id, name: player.group.name, slug: key, players: [] });
      }
      groupMap.get(key)!.players.push(player);
    } else {
      ungrouped.push(player);
    }
  }
  const groups = Array.from(groupMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  const hasGroups = groups.length > 0;
  // Default to first group; fall back to null (flat list) if no groups exist
  const activeGroupSlug = activeGroupSlugState ?? groups[0]?.slug ?? null;

  const picksByPlayer = new Map(picks.map((p) => [p.player.id, p]));

  function copyLink(slug: string) {
    const url = `${window.location.origin}/play/${slug}/${gameId}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  }

  function copyGroupLinks(players: Player[], groupSlug: string) {
    const urls = players
      .map((p) => `${window.location.origin}/play/${p.slug}/${gameId}`)
      .join("\n");
    navigator.clipboard.writeText(urls);
    setCopiedGroupSlug(groupSlug);
    setTimeout(() => setCopiedGroupSlug(null), 2000);
  }

  function handleCalculateAll() {
    setError(null);
    startTransition(async () => {
      try {
        await calculateGameSgaPrice(gameId);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to calculate SGA price");
      }
    });
  }

  function handleCalculateGroup(groupSlug: string, playerIds: number[]) {
    setError(null);
    startTransition(async () => {
      try {
        const result = await calculateGroupSgaPrice(gameId, playerIds);
        setGroupSgaResults((prev) => ({ ...prev, [groupSlug]: result }));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to calculate group SGA price");
      }
    });
  }

  function renderPlayerRow(player: Player) {
    const pick = picksByPlayer.get(player.id);
    return (
      <div key={player.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-indigo-600">
              {player.displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800">{player.displayName}</p>
            {pick ? (
              <p className="text-xs text-slate-500 truncate">
                {pick.marketName} · <span className="font-medium text-slate-700">{pick.oddName}</span>
                <span className="ml-1.5 font-bold text-indigo-600 tabular-nums">{pick.oddPrice.toFixed(2)}</span>
              </p>
            ) : (
              <p className="text-xs text-slate-400">Waiting…</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          {pick && oddsResultsMap[pick.oddUuid] === "win" && (
            <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> WON
            </span>
          )}
          {pick && oddsResultsMap[pick.oddUuid] === "lost" && (
            <span className="inline-flex items-center gap-1 text-red-500 text-xs font-bold">
              <XCircle className="w-3.5 h-3.5" /> LOST
            </span>
          )}
          {pick && oddsResultsMap[pick.oddUuid] === "refund" && (
            <span className="inline-flex items-center gap-1 text-amber-500 text-xs font-bold">
              <RotateCcw className="w-3.5 h-3.5" /> REFUND
            </span>
          )}
          {pick && !oddsResultsMap[pick.oddUuid] ? (
            <Badge variant="success">Picked</Badge>
          ) : !pick ? (
            <Badge variant="neutral">Waiting</Badge>
          ) : null}
          <button
            onClick={() => copyLink(player.slug)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title={`Copy link for ${player.displayName}`}
          >
            {copiedSlug === player.slug
              ? <Check className="w-3.5 h-3.5 text-emerald-500" />
              : <Copy className="w-3.5 h-3.5" />
            }
          </button>
        </div>
      </div>
    );
  }

  // Derived values for the active view
  const activeGroup = groups.find((g) => g.slug === activeGroupSlug) ?? null;
  const visiblePlayers = activeGroup ? activeGroup.players : allPlayers;
  const visiblePicks = activeGroup
    ? picks.filter((p) => activeGroup.players.some((pl) => pl.id === p.player.id))
    : picks;

  // Per-group naive combined price (product of individual oddPrices)
  const groupNaivePrice =
    activeGroup && visiblePicks.length > 0
      ? visiblePicks.reduce((acc, p) => acc * p.oddPrice, 1)
      : null;

  const activeSgaResult = activeGroup ? groupSgaResults[activeGroup.slug] : null;

  return (
    <Card>
      <CardHeader>
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-500" />
          Player Picks
        </span>
        <span className="text-xs text-slate-400">
          {visiblePicks.length} / {visiblePlayers.length} picked
        </span>
      </CardHeader>

      {/* Group toggle tabs — only shown when groups exist */}
      {hasGroups && (
        <div className="px-4 pt-1 pb-3 flex items-center gap-1.5 overflow-x-auto border-b border-slate-100">
          {groups.map((group) => {
            const groupPicks = picks.filter((p) =>
              group.players.some((pl) => pl.id === p.player.id)
            );
            const isActive = activeGroupSlug === group.slug;
            return (
              <button
                key={group.slug}
                onClick={() => setActiveGroupSlug(group.slug)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                }`}
              >
                {group.name}
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-500"
                  }`}
                >
                  {groupPicks.length}/{group.players.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Player list */}
      {activeGroup ? (
        // Single group view
        <div>
          {/* Group copy-all URLs button */}
          <div className="flex items-center justify-end px-6 py-2 border-b border-slate-50">
            <button
              onClick={() => copyGroupLinks(activeGroup.players, activeGroup.slug)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {copiedGroupSlug === activeGroup.slug
                ? <><Check className="w-3 h-3 text-emerald-500" /> Copied</>
                : <><Link2 className="w-3 h-3" /> Copy all URLs</>
              }
            </button>
          </div>
          <div className="px-6 divide-y divide-slate-50">
            {activeGroup.players.map(renderPlayerRow)}
          </div>
        </div>
      ) : (
        // No groups at all — flat list
        <CardBody className="divide-y divide-slate-50">
          {allPlayers.map(renderPlayerRow)}
        </CardBody>
      )}

      {/* Footer — SGA price section */}
      <div className="px-6 pb-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div>
          {activeGroup ? (
            // Per-group price display
            activeSgaResult ? (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                  {activeGroup.name} SGA Price
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-indigo-600 tabular-nums">
                    {activeSgaResult.price.toFixed(2)}
                  </span>
                  <Badge variant={activeSgaResult.status === "ACTIVE" ? "success" : "warning"}>
                    {activeSgaResult.status}
                  </Badge>
                  {groupNaivePrice !== null && (
                    <span className="text-xs text-slate-400 tabular-nums">
                      (naive: {groupNaivePrice.toFixed(2)})
                    </span>
                  )}
                </div>
              </div>
            ) : groupNaivePrice !== null ? (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                  {activeGroup.name} Combined (naive)
                </p>
                <span className="text-2xl font-black text-slate-600 tabular-nums">
                  {groupNaivePrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                {visiblePicks.length === 0 ? "No picks yet" : "Calculate SGA price for this group"}
              </p>
            )
          ) : null}
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        {activeGroup ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              handleCalculateGroup(
                activeGroup.slug,
                activeGroup.players.map((p) => p.id)
              )
            }
            loading={pending}
            disabled={visiblePicks.length === 0}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {activeSgaResult ? "Recalculate" : "Calculate SGA"}
          </Button>
        ) : (
          // No groups — flat list fallback button
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCalculateAll}
            loading={pending}
            disabled={picks.length === 0}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {sgaPrice ? "Recalculate" : "Calculate Price"}
          </Button>
        )}
      </div>
    </Card>
  );
}
