"use client";

import { useTransition, useState } from "react";
import { calculateGameSgaPrice } from "../actions";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, RefreshCw, Copy, Check, CheckCircle2, XCircle } from "lucide-react";

type Pick = {
  id: number;
  oddUuid: string;
  oddName: string;
  marketName: string;
  oddPrice: number;
  player: { id: number; slug: string; displayName: string };
};

type Player = { id: number; slug: string; displayName: string };

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

  function handleCalculate() {
    setError(null);
    startTransition(async () => {
      try {
        await calculateGameSgaPrice(gameId);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to calculate SGA price");
      }
    });
  }

  function copyLink(slug: string) {
    const url = `${window.location.origin}/play/${slug}/${gameId}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  }

  const picksByPlayer = new Map(picks.map((p) => [p.player.id, p]));

  return (
    <Card>
      <CardHeader>
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-500" />
          Player Picks
        </span>
        <span className="text-xs text-slate-400">
          {picks.length} / {allPlayers.length} picked
        </span>
      </CardHeader>

      <CardBody className="divide-y divide-slate-50">
        {/* Player rows */}
        {allPlayers.map((player) => {
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
                {pick && oddsResultsMap[pick.oddUuid] === "won" && (
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> WON
                  </span>
                )}
                {pick && oddsResultsMap[pick.oddUuid] === "lost" && (
                  <span className="inline-flex items-center gap-1 text-red-500 text-xs font-bold">
                    <XCircle className="w-3.5 h-3.5" /> LOST
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
        })}
      </CardBody>

      {/* SGA price + calculate button */}
      <div className="px-6 pb-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div>
          {sgaPrice ? (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Combined SGA Price</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-indigo-600 tabular-nums">{sgaPrice.toFixed(2)}</span>
                {sgaStatus && (
                  <Badge variant={sgaStatus === "ACTIVE" ? "success" : "warning"}>{sgaStatus}</Badge>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              {picks.length === 0 ? "No picks yet" : "SGA price not yet calculated"}
            </p>
          )}
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleCalculate}
          loading={pending}
          disabled={picks.length === 0}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {sgaPrice ? "Recalculate" : "Calculate Price"}
        </Button>
      </div>
    </Card>
  );
}
