"use client";

import { useState, useTransition } from "react";
import { submitPick } from "./actions";
import type { Market } from "@/app/generated/prisma";
import type { OfferOutcome } from "@/lib/offer-api";
import { ChevronUp, ChevronDown, CheckCircle, Lock } from "lucide-react";

export type OtherPickInfo = {
  oddUuid: string;
  playerDisplayName: string;
  playerIndex: number;
};

// Stable colour per player slot (index 0–3)
const PLAYER_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e"];

// ── Selectable odd button ──────────────────────────────────────────────────────
function OddButton({
  odd,
  isSelected,
  onSelect,
  locked,
  isUnavailable,
  takenBy,
}: {
  odd: OfferOutcome | null;
  isSelected: boolean;
  onSelect: (odd: OfferOutcome) => void;
  locked: boolean;
  isUnavailable?: boolean;
  takenBy?: OtherPickInfo;
}) {
  if (!odd) {
    return (
      <div className="flex items-center justify-center py-3 px-2 rounded-lg bg-[#16171e] border border-dashed border-[#2c2d3d]/60">
        <span className="text-xs text-white/15">—</span>
      </div>
    );
  }

  const disabled = locked || isUnavailable || !!takenBy;
  const color = takenBy ? (PLAYER_COLORS[takenBy.playerIndex % PLAYER_COLORS.length] ?? PLAYER_COLORS[0]) : null;
  const initial = takenBy ? takenBy.playerDisplayName.charAt(0).toUpperCase() : null;

  return (
    <button
      onClick={() => !disabled && onSelect(odd)}
      disabled={disabled}
      title={
        takenBy
          ? `Taken by ${takenBy.playerDisplayName}`
          : isUnavailable
          ? "Can't combine with existing picks"
          : undefined
      }
      className={`relative w-full flex items-center justify-center py-3 px-2 rounded-lg transition-all select-none
        ${isSelected
          ? "bg-indigo-600 border border-indigo-400 ring-2 ring-indigo-400/30 shadow-lg shadow-indigo-900/40"
          : takenBy
          ? "bg-[#16171e] border border-[#2c2d3d] opacity-50 cursor-not-allowed"
          : isUnavailable
          ? "bg-[#16171e] border border-dashed border-[#2c2d3d]/40 opacity-30 cursor-not-allowed"
          : locked
          ? "bg-[#252636] border border-[#2c2d3d] opacity-40 cursor-not-allowed"
          : "bg-[#252636] border border-[#2c2d3d] hover:bg-[#2c2e44] hover:border-[#3e3f5e] active:scale-95 cursor-pointer"
        }`}
    >
      {takenBy && color && (
        <span
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white ring-2 ring-[#0f1019] z-10"
          style={{ backgroundColor: color }}
        >
          {initial}
        </span>
      )}
      <span className={`text-sm font-bold tabular-nums ${isSelected ? "text-white" : takenBy ? "text-white/30" : isUnavailable ? "text-white/20 line-through" : "text-white/80"}`}>
        {odd.price > 0 ? odd.price.toFixed(2) : "—"}
      </span>
    </button>
  );
}

// ── Market card wrapper ────────────────────────────────────────────────────────
function MarketCard({
  market,
  odds,
  selectedUuid,
  onSelect,
  locked,
  unavailableUuids,
  takenMap,
  isSuperSub,
}: {
  market: Market;
  odds: OfferOutcome[];
  selectedUuid: string | null;
  onSelect: (odd: OfferOutcome, market: Market) => void;
  locked: boolean;
  unavailableUuids: Set<string>;
  takenMap: Map<string, OtherPickInfo>;
  isSuperSub?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const hasSelection = odds.some((o) => o.uuid === selectedUuid);

  return (
    <div className={`bg-[#1e1f2a] border rounded-xl overflow-hidden transition-colors ${
      hasSelection ? "border-indigo-500/40" : "border-[#2c2d3d]"
    }`}>
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2 min-w-0">
          {hasSelection && <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
          <span className="text-sm font-semibold text-white leading-snug truncate">{market.name}</span>
          {isSuperSub && (
            <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black tracking-wide bg-amber-500/15 text-amber-400 border border-amber-500/25 uppercase">
              SuperSub
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-white/25 hover:text-white/60 transition-colors ml-3 shrink-0"
        >
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="border-t border-[#2c2d3d] px-4 pb-4 pt-3.5">
          {odds.length === 0 ? (
            <p className="text-xs text-white/25 py-1">No odds available</p>
          ) : market.displayType === "ONE_X_TWO" ? (
            <OneXTwo odds={odds} selectedUuid={selectedUuid} onSelect={(o) => onSelect(o, market)} locked={locked} unavailableUuids={unavailableUuids} takenMap={takenMap} />
          ) : market.displayType === "OVER_UNDER" ? (
            <OverUnder odds={odds} selectedUuid={selectedUuid} onSelect={(o) => onSelect(o, market)} locked={locked} unavailableUuids={unavailableUuids} takenMap={takenMap} />
          ) : market.displayType === "ONE_FROM_TWO" ? (
            <OneFromTwo odds={odds} selectedUuid={selectedUuid} onSelect={(o) => onSelect(o, market)} locked={locked} unavailableUuids={unavailableUuids} takenMap={takenMap} />
          ) : (
            <PlayerProps odds={odds} selectedUuid={selectedUuid} onSelect={(o) => onSelect(o, market)} locked={locked} unavailableUuids={unavailableUuids} takenMap={takenMap} />
          )}
        </div>
      )}
    </div>
  );
}

type DisplayProps = {
  odds: OfferOutcome[];
  selectedUuid: string | null;
  onSelect: (o: OfferOutcome) => void;
  locked: boolean;
  unavailableUuids: Set<string>;
  takenMap: Map<string, OtherPickInfo>;
};

// ── Display type renderers ─────────────────────────────────────────────────────
function OneXTwo({ odds, selectedUuid, onSelect, locked, unavailableUuids, takenMap }: DisplayProps) {
  const home = odds.find((o) => o.code === "1") ?? null;
  const draw = odds.find((o) => o.code === "X" || o.name === "X") ?? null;
  const away = odds.find((o) => o.code === "2") ?? null;

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 mb-2 px-0.5">
        {["Home", "Draw", "Away"].map((label) => (
          <span key={label} className="text-[10px] font-bold uppercase tracking-widest text-white/25 text-center">{label}</span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <OddButton odd={home} isSelected={home?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={home ? unavailableUuids.has(home.uuid) : false} takenBy={home ? takenMap.get(home.uuid) : undefined} />
        <OddButton odd={draw} isSelected={draw?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={draw ? unavailableUuids.has(draw.uuid) : false} takenBy={draw ? takenMap.get(draw.uuid) : undefined} />
        <OddButton odd={away} isSelected={away?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={away ? unavailableUuids.has(away.uuid) : false} takenBy={away ? takenMap.get(away.uuid) : undefined} />
      </div>
    </div>
  );
}

function OverUnder({ odds, selectedUuid, onSelect, locked, unavailableUuids, takenMap }: DisplayProps) {
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
            <OddButton odd={under} isSelected={under?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={under ? unavailableUuids.has(under.uuid) : false} takenBy={under ? takenMap.get(under.uuid) : undefined} />
            <OddButton odd={over} isSelected={over?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={over ? unavailableUuids.has(over.uuid) : false} takenBy={over ? takenMap.get(over.uuid) : undefined} />
          </div>
        ))}
      </div>
    </div>
  );
}

function OneFromTwo({ odds, selectedUuid, onSelect, locked, unavailableUuids, takenMap }: DisplayProps) {
  const yes = odds.find((o) => o.name.toLowerCase() === "yes") ?? odds[0] ?? null;
  const no = odds.find((o) => o.name.toLowerCase() === "no") ?? odds[1] ?? null;

  return (
    <div className="grid grid-cols-2 gap-2 max-w-sm">
      <OddButton odd={yes} isSelected={yes?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={yes ? unavailableUuids.has(yes.uuid) : false} takenBy={yes ? takenMap.get(yes.uuid) : undefined} />
      <OddButton odd={no} isSelected={no?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={no ? unavailableUuids.has(no.uuid) : false} takenBy={no ? takenMap.get(no.uuid) : undefined} />
    </div>
  );
}

const PLAYER_PREVIEW = 5;

function PlayerProps({ odds, selectedUuid, onSelect, locked, unavailableUuids, takenMap }: DisplayProps) {
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

  const visiblePlayers = expanded ? allPlayers : allPlayers.slice(0, PLAYER_PREVIEW);
  const hiddenCount = allPlayers.length - PLAYER_PREVIEW;
  const colTemplate = `minmax(120px, 1fr) ${allTotals.map(() => "68px").join(" ")}`;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max pb-0.5">
        <div className="grid gap-2 mb-3 px-0.5" style={{ gridTemplateColumns: colTemplate }}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Player</span>
          {allTotals.map((t) => (
            <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-white/25 text-center">{t}+</span>
          ))}
        </div>
        <div className="space-y-2">
          {visiblePlayers.map((player) => (
            <div key={player} className="grid gap-2 items-center" style={{ gridTemplateColumns: colTemplate }}>
              <span className="text-sm text-white/75 pr-2 truncate">{player}</span>
              {allTotals.map((total) => {
                const odd = playerMap.get(player)?.get(total) ?? null;
                return (
                  <OddButton key={total} odd={odd} isSelected={odd?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={odd ? unavailableUuids.has(odd.uuid) : false} takenBy={odd ? takenMap.get(odd.uuid) : undefined} />
                );
              })}
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

// ── Main player view ───────────────────────────────────────────────────────────
export type MarketWithOdds = {
  market: Market;
  odds: OfferOutcome[];
};

export function PlayerGameView({
  playerSlug,
  gameId,
  markets,
  unavailableOddsUuids = [],
  otherPickedOdds = [],
  superSubMarketIds = [],
}: {
  playerSlug: string;
  gameId: number;
  markets: MarketWithOdds[];
  unavailableOddsUuids?: string[];
  otherPickedOdds?: OtherPickInfo[];
  superSubMarketIds?: number[];
}) {
  const unavailableSet = new Set(unavailableOddsUuids);
  const takenMap = new Map(otherPickedOdds.map((p) => [p.oddUuid, p]));
  const superSubSet = new Set(superSubMarketIds);
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);
  const [selectedOdd, setSelectedOdd] = useState<OfferOutcome | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSelect(odd: OfferOutcome, market: Market) {
    setSelectedUuid(odd.uuid);
    setSelectedOdd(odd);
    setSelectedMarket(market);
    setError(null);
  }

  function handleSubmit() {
    if (!selectedOdd || !selectedMarket) return;
    startTransition(async () => {
      try {
        await submitPick(
          playerSlug,
          gameId,
          selectedMarket.marketId,
          selectedOdd.uuid,
          selectedOdd.name,
          selectedMarket.name,
          selectedOdd.price
        );
        setSubmitted(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
        <div className="w-14 h-14 rounded-full bg-indigo-600/20 flex items-center justify-center mb-4">
          <Lock className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Pick Locked In</h2>
        <p className="text-white/50 text-sm max-w-xs">
          Your selection has been saved. Waiting for the other players to pick.
        </p>
        <div className="mt-6 px-5 py-3 rounded-xl bg-[#1e1f2a] border border-indigo-500/30">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">{selectedMarket?.name}</p>
          <p className="text-white font-semibold">{selectedOdd?.name}</p>
          <p className="text-indigo-400 font-bold text-lg tabular-nums">{selectedOdd?.price.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="space-y-3">
        {markets.map(({ market, odds }) => (
          <MarketCard
            key={market.id}
            market={market}
            odds={odds}
            selectedUuid={selectedUuid}
            onSelect={handleSelect}
            locked={false}
            unavailableUuids={unavailableSet}
            takenMap={takenMap}
            isSuperSub={superSubSet.has(market.marketId)}
          />
        ))}
      </div>

      {/* Floating confirm bar */}
      <div className={`fixed bottom-0 left-0 right-0 transition-all duration-300 ${
        selectedOdd ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="bg-[#1e1f2a]/95 backdrop-blur-sm border-t border-[#2c2d3d] px-4 py-4 safe-bottom">
          <div className="max-w-lg mx-auto">
            {error && (
              <p className="text-red-400 text-xs text-center mb-2">{error}</p>
            )}
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 truncate">{selectedMarket?.name}</p>
                <p className="text-white font-semibold text-sm truncate">{selectedOdd?.name}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-indigo-400 font-bold text-lg tabular-nums">{selectedOdd?.price.toFixed(2)}</p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={pending}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                {pending ? "Locking…" : "Lock In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
