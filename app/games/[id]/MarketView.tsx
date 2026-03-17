import type { Market } from "@/app/generated/prisma";
import type { OfferOutcome } from "@/lib/offer-api";
import { formatDisplayType } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";

function OddCell({
  odd,
  showResult,
}: {
  odd: OfferOutcome | null;
  showResult: boolean;
}) {
  if (!odd) {
    return (
      <div className="flex flex-col items-center justify-center h-14 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
        N/A
      </div>
    );
  }

  const status = odd.status?.toLowerCase();
  const isWon = status === "won" || status === "win";
  const isLost = status === "lost";

  return (
    <div
      className={`flex flex-col items-center justify-center h-14 rounded-xl border text-sm font-semibold transition-colors ${
        showResult
          ? isWon
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : isLost
            ? "bg-red-50 border-red-200 text-red-500"
            : "bg-slate-50 border-slate-200 text-slate-500"
          : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 cursor-default"
      }`}
    >
      <span className="text-xs text-slate-500 font-normal">{odd.name}</span>
      <span className="font-bold mt-0.5">
        {showResult && isWon ? (
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> WON
          </span>
        ) : showResult && isLost ? (
          <span className="flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> LOST
          </span>
        ) : showResult ? (
          <span className="flex items-center gap-1">
            <MinusCircle className="w-3.5 h-3.5" /> —
          </span>
        ) : odd.price > 0 ? (
          odd.price.toFixed(2)
        ) : (
          "—"
        )}
      </span>
    </div>
  );
}

// 1×2 — exactly 3 outcomes: code "1", "X", "2"
function OneXTwo({ odds, showResults }: { odds: OfferOutcome[]; showResults: boolean }) {
  const home = odds.find((o) => o.code === "1") ?? null;
  const draw = odds.find((o) => o.code === "X") ?? null;
  const away = odds.find((o) => o.code === "2") ?? null;

  return (
    <div className="grid grid-cols-3 gap-2">
      <OddCell odd={home} showResult={showResults} />
      <OddCell odd={draw} showResult={showResults} />
      <OddCell odd={away} showResult={showResults} />
    </div>
  );
}

// Over/Under — group by specifiers.total, show threshold | Under | Over
function OverUnder({ odds, showResults }: { odds: OfferOutcome[]; showResults: boolean }) {
  // API delivers: Over 0.5, Under 0.5, Over 1.5, Under 1.5, …
  const byTotal = new Map<string, { over: OfferOutcome | null; under: OfferOutcome | null }>();

  for (const o of odds) {
    const total = o.specifiers?.total ?? o.info ?? o.name.replace(/[A-Za-z ]/g, "").trim();
    if (!byTotal.has(total)) byTotal.set(total, { over: null, under: null });
    const entry = byTotal.get(total)!;
    if (o.name.toLowerCase().startsWith("over")) entry.over = o;
    else entry.under = o;
  }

  const rows = Array.from(byTotal.entries()).sort(
    ([a], [b]) => parseFloat(a) - parseFloat(b)
  );

  if (rows.length === 0) return <p className="text-xs text-slate-400 py-2">No odds available</p>;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1">
        <span>Line</span>
        <span className="text-center">Under</span>
        <span className="text-center">Over</span>
      </div>
      {rows.map(([total, { over, under }]) => (
        <div key={total} className="grid grid-cols-3 gap-2 items-center">
          <div className="text-sm font-bold text-slate-700 px-1">{total}</div>
          <OddCell odd={under} showResult={showResults} />
          <OddCell odd={over} showResult={showResults} />
        </div>
      ))}
    </div>
  );
}

// 1 from 2 — Yes/No
function OneFromTwo({ odds, showResults }: { odds: OfferOutcome[]; showResults: boolean }) {
  const yes = odds.find((o) => o.name.toLowerCase() === "yes") ?? odds[0] ?? null;
  const no = odds.find((o) => o.name.toLowerCase() === "no") ?? odds[1] ?? null;

  return (
    <div className="grid grid-cols-2 gap-2 max-w-xs">
      <OddCell odd={yes} showResult={showResults} />
      <OddCell odd={no} showResult={showResults} />
    </div>
  );
}

// Player Props — group by player name, columns = thresholds
function PlayerProps({ odds, showResults }: { odds: OfferOutcome[]; showResults: boolean }) {
  const playerMap = new Map<string, Map<string, OfferOutcome>>();

  for (const o of odds) {
    const player = o.specifiers?.player_name ?? o.name;
    const total = o.specifiers?.total ?? "—";
    if (!playerMap.has(player)) playerMap.set(player, new Map());
    playerMap.get(player)!.set(total, o);
  }

  const players = Array.from(playerMap.keys());
  const allTotals = Array.from(
    new Set(odds.map((o) => o.specifiers?.total ?? "—"))
  ).sort((a, b) => parseFloat(a) - parseFloat(b));

  if (players.length === 0) return <p className="text-xs text-slate-400 py-2">No odds available</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="py-2 pr-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Player
            </th>
            {allTotals.map((t) => (
              <th key={t} className="py-2 px-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-center">
                {t}+
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {players.map((player) => (
            <tr key={player}>
              <td className="py-2 pr-4 font-medium text-slate-700 text-sm whitespace-nowrap">
                {player}
              </td>
              {allTotals.map((total) => {
                const odd = playerMap.get(player)?.get(total) ?? null;
                return (
                  <td key={total} className="py-2 px-2">
                    <OddCell odd={odd} showResult={showResults} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarketView({
  market,
  odds,
  showResults,
}: {
  market: Market;
  odds: OfferOutcome[];
  showResults: boolean;
}) {
  return (
    <div className="px-6 py-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold text-slate-900 text-sm">{market.name}</span>
        <Badge variant="neutral">{formatDisplayType(market.displayType)}</Badge>
        <span className="font-mono text-xs text-slate-400">ID: {market.marketId}</span>
        {odds.length === 0 && (
          <Badge variant="warning">No odds</Badge>
        )}
      </div>

      {market.displayType === "ONE_X_TWO" && (
        <OneXTwo odds={odds} showResults={showResults} />
      )}
      {market.displayType === "OVER_UNDER" && (
        <OverUnder odds={odds} showResults={showResults} />
      )}
      {market.displayType === "ONE_FROM_TWO" && (
        <OneFromTwo odds={odds} showResults={showResults} />
      )}
      {(market.displayType === "PLAYER_PROPS" || market.displayType === "PLAYER_PROPS_SINGLE") && (
        <PlayerProps odds={odds} showResults={showResults} />
      )}
    </div>
  );
}
