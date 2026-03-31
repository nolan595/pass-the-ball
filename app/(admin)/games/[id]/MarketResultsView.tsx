"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Trophy } from "lucide-react";
import type { OfferOutcome } from "@/lib/offer-api";

type WonMarket = {
  marketId: number;
  marketName: string;
  winners: OfferOutcome[];
};

function WonMarketCard({ market }: { market: WonMarket }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Market header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-slate-800">{market.marketName}</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
            <Trophy className="w-3 h-3" />
            {market.winners.length} won
          </span>
        </div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="ml-3 shrink-0 text-slate-300 hover:text-slate-500 transition-colors"
        >
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Winning odds */}
      {!collapsed && (
        <div className="border-t border-slate-100 divide-y divide-slate-50">
          {market.winners.map((odd) => (
            <div key={odd.uuid} className="flex items-center justify-between px-5 py-3 gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-800">{odd.name}</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono text-[11px] text-slate-400 hidden sm:block truncate max-w-[140px]">
                  {odd.uuid}
                </span>
                <span className="text-base font-black text-emerald-600 tabular-nums">
                  {odd.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MarketResultsView({
  oddsResults,
  configuredMarketIds,
}: {
  oddsResults: OfferOutcome[];
  configuredMarketIds: Set<number>;
}) {
  // Group by marketId — only configured markets, only winners
  const marketMap = new Map<number, WonMarket>();
  for (const odd of oddsResults) {
    if (!configuredMarketIds.has(odd.marketId)) continue;
    const s = odd.status?.toLowerCase();
    if (s !== "win" && s !== "won") continue;
    if (!marketMap.has(odd.marketId)) {
      marketMap.set(odd.marketId, { marketId: odd.marketId, marketName: odd.marketName, winners: [] });
    }
    marketMap.get(odd.marketId)!.winners.push(odd);
  }

  const wonMarkets = Array.from(marketMap.values()).sort((a, b) =>
    a.marketName.localeCompare(b.marketName)
  );

  if (wonMarkets.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm py-10 text-center">
        <p className="text-sm text-slate-400">No winning markets yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {wonMarkets.map((market) => (
        <WonMarketCard key={market.marketId} market={market} />
      ))}
    </div>
  );
}
