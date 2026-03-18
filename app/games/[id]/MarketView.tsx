"use client";

import { useState } from "react";
import type { Market } from "@/app/generated/prisma";
import type { OfferOutcome } from "@/lib/offer-api";
import { ChevronUp, ChevronDown, Info, CheckCircle, XCircle } from "lucide-react";

// ── Super Sub badge ───────────────────────────────────────────────────────────
function SuperSubBadge() {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/super-sub.svg" alt="" className="w-4 h-4 shrink-0" />
      <span className="text-[10px] font-black uppercase italic tracking-wide text-[#c9a227]">
        Super Sub
      </span>
    </div>
  );
}

// ── Odd button ────────────────────────────────────────────────────────────────
function OddButton({
  label,
  odd,
  showResult,
  compact = false,
}: {
  label?: string;
  odd: OfferOutcome | null;
  showResult: boolean;
  compact?: boolean;
}) {
  if (!odd) {
    return (
      <div className={`flex items-center ${compact ? "justify-center py-2.5 px-1" : "justify-between px-3 py-3"} rounded-lg bg-[#16171e] border border-dashed border-[#2c2d3d]/60`}>
        {!compact && <span className="text-xs text-white/20">{label ?? "—"}</span>}
        <span className="text-xs text-white/15">N/A</span>
      </div>
    );
  }

  const status = odd.status?.toLowerCase();
  const isWon = status === "won" || status === "win";
  const isLost = status === "lost";

  if (showResult) {
    return (
      <div
        className={`flex items-center ${compact ? "justify-center py-2.5 px-1" : "justify-between px-3 py-3"} rounded-lg ${
          isWon
            ? "bg-emerald-900/30 border border-emerald-500/30"
            : isLost
            ? "bg-red-900/25 border border-red-500/25"
            : "bg-[#252636] border border-[#2c2d3d]"
        }`}
      >
        {!compact && <span className="text-xs text-white/50">{label ?? odd.name}</span>}
        <span
          className={`text-xs font-bold flex items-center gap-1 ${
            isWon ? "text-emerald-400" : isLost ? "text-red-400" : "text-white/30"
          }`}
        >
          {isWon ? (
            <><CheckCircle className="w-3 h-3" /> {compact ? "✓" : "WON"}</>
          ) : isLost ? (
            <><XCircle className="w-3 h-3" /> {compact ? "✗" : "LOST"}</>
          ) : (
            "—"
          )}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${compact ? "justify-center py-2.5 px-1" : "justify-between px-3 py-3"} rounded-lg bg-[#252636] hover:bg-[#2c2e44] transition-colors cursor-default select-none`}>
      {!compact && <span className="text-xs text-white/60">{label ?? odd.name}</span>}
      <span className="text-sm font-bold text-white tabular-nums">
        {odd.price > 0 ? odd.price.toFixed(2) : "—"}
      </span>
    </div>
  );
}

// ── 1×2 ───────────────────────────────────────────────────────────────────────
function OneXTwo({ odds, showResults }: { odds: OfferOutcome[]; showResults: boolean }) {
  const home = odds.find((o) => o.code === "1") ?? null;
  const draw = odds.find((o) => o.code === "X") ?? null;
  const away = odds.find((o) => o.code === "2") ?? null;

  return (
    <div className="grid grid-cols-3 gap-2">
      <OddButton label="1" odd={home} showResult={showResults} />
      <OddButton label="X" odd={draw} showResult={showResults} />
      <OddButton label="2" odd={away} showResult={showResults} />
    </div>
  );
}

// ── Over/Under ────────────────────────────────────────────────────────────────
function OverUnder({ odds, showResults }: { odds: OfferOutcome[]; showResults: boolean }) {
  const byTotal = new Map<string, { over: OfferOutcome | null; under: OfferOutcome | null }>();

  for (const o of odds) {
    const total = o.specifiers?.total ?? o.info ?? o.name.replace(/[A-Za-z ]/g, "").trim();
    if (!byTotal.has(total)) byTotal.set(total, { over: null, under: null });
    const entry = byTotal.get(total)!;
    if (o.name.toLowerCase().startsWith("over")) entry.over = o;
    else entry.under = o;
  }

  const rows = Array.from(byTotal.entries()).sort(([a], [b]) => parseFloat(a) - parseFloat(b));

  if (rows.length === 0) return <p className="text-xs text-white/25 py-1">No odds available</p>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-2.5 px-0.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Line</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 text-center">Under</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 text-center">Over</span>
      </div>
      <div className="space-y-2">
        {rows.map(([total, { over, under }]) => (
          <div key={total} className="grid grid-cols-3 gap-2 items-center">
            <span className="text-sm font-bold text-white/60 pl-0.5">{total}</span>
            <OddButton odd={under} showResult={showResults} />
            <OddButton odd={over} showResult={showResults} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 1 from 2 ──────────────────────────────────────────────────────────────────
function OneFromTwo({ odds, showResults }: { odds: OfferOutcome[]; showResults: boolean }) {
  const yes = odds.find((o) => o.name.toLowerCase() === "yes") ?? odds[0] ?? null;
  const no = odds.find((o) => o.name.toLowerCase() === "no") ?? odds[1] ?? null;

  return (
    <div className="grid grid-cols-2 gap-2 max-w-sm">
      <OddButton label="Yes" odd={yes} showResult={showResults} />
      <OddButton label="No" odd={no} showResult={showResults} />
    </div>
  );
}

// ── Player Props ──────────────────────────────────────────────────────────────
const PLAYER_PREVIEW_COUNT = 5;

function PlayerProps({ odds, showResults }: { odds: OfferOutcome[]; showResults: boolean }) {
  const [expanded, setExpanded] = useState(false);

  const playerMap = new Map<string, Map<string, OfferOutcome>>();
  for (const o of odds) {
    const player = o.specifiers?.player_name ?? o.name;
    const total = o.specifiers?.total ?? "—";
    if (!playerMap.has(player)) playerMap.set(player, new Map());
    playerMap.get(player)!.set(total, o);
  }

  const allPlayers = Array.from(playerMap.keys());
  const allTotals = Array.from(new Set(odds.map((o) => o.specifiers?.total ?? "—"))).sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  );

  if (allPlayers.length === 0) return <p className="text-xs text-white/25 py-1">No odds available</p>;

  const visiblePlayers = expanded ? allPlayers : allPlayers.slice(0, PLAYER_PREVIEW_COUNT);
  const hiddenCount = allPlayers.length - PLAYER_PREVIEW_COUNT;
  const colTemplate = `minmax(120px, 1fr) ${allTotals.map(() => "68px").join(" ")}`;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max pb-0.5">
      <div className="grid gap-2 mb-3 px-0.5" style={{ gridTemplateColumns: colTemplate }}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Player</span>
        {allTotals.map((t) => (
          <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-white/25 text-center">
            {t}+
          </span>
        ))}
      </div>
      <div className="space-y-2">
        {visiblePlayers.map((player) => (
          <div key={player} className="grid gap-2 items-center" style={{ gridTemplateColumns: colTemplate }}>
            <span className="text-sm text-white/75 pr-2 truncate">{player}</span>
            {allTotals.map((total) => (
              <OddButton key={total} odd={playerMap.get(player)?.get(total) ?? null} showResult={showResults} compact />
            ))}
          </div>
        ))}
      </div>
      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 w-full py-3 text-[11px] font-bold uppercase tracking-widest text-white/35 hover:text-white/65 border-t border-[#2c2d3d] transition-colors"
        >
          {expanded ? "Show Less" : `Show More (${hiddenCount} more)`}
        </button>
      )}
      </div>
    </div>
  );
}

// ── MarketView ────────────────────────────────────────────────────────────────
export function MarketView({
  market,
  odds,
  showResults,
}: {
  market: Market;
  odds: OfferOutcome[];
  showResults: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-[#1e1f2a] border border-[#2c2d3d] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3.5">
        <div className="min-w-0">
          <span className="text-sm font-semibold text-white leading-snug block">{market.name}</span>
          {market.superSubEligible && <SuperSubBadge />}
        </div>
        <div className="flex items-center gap-2.5 ml-3 mt-0.5 shrink-0">
          <Info className="w-4 h-4 text-white/25 cursor-pointer hover:text-white/50 transition-colors" />
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Odds body */}
      {!collapsed && (
        <div className="border-t border-[#2c2d3d] px-4 pb-4 pt-3.5">
          {odds.length === 0 ? (
            <p className="text-xs text-white/25 py-1">No odds available for this market</p>
          ) : market.displayType === "ONE_X_TWO" ? (
            <OneXTwo odds={odds} showResults={showResults} />
          ) : market.displayType === "OVER_UNDER" ? (
            <OverUnder odds={odds} showResults={showResults} />
          ) : market.displayType === "ONE_FROM_TWO" ? (
            <OneFromTwo odds={odds} showResults={showResults} />
          ) : (
            <PlayerProps odds={odds} showResults={showResults} />
          )}
        </div>
      )}
    </div>
  );
}
