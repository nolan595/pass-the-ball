import { prisma } from "@/lib/prisma";
import { fetchEvent } from "@/lib/offer-api";
import { fetchPreviewBetbuilderOdd, fetchSgaMarkets } from "@/lib/sga-api";
import { notFound } from "next/navigation";
import { PlayerGameView } from "./PlayerGameView";
import { formatDate } from "@/lib/utils";
import { Lock, Users, Clock, CheckCircle2, XCircle } from "lucide-react";

function ResultBadge({ status }: { status: string }) {
  if (status === "won") {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold">
        <CheckCircle2 className="w-3.5 h-3.5" /> WON
      </span>
    );
  }
  if (status === "lost") {
    return (
      <span className="inline-flex items-center gap-1 text-red-400 text-xs font-bold">
        <XCircle className="w-3.5 h-3.5" /> LOST
      </span>
    );
  }
  return null;
}

export default async function PlayerGamePage({
  params,
}: {
  params: Promise<{ slug: string; gameId: string }>;
}) {
  const { slug, gameId: rawGameId } = await params;
  const gameId = parseInt(rawGameId);
  if (isNaN(gameId)) notFound();

  const [player, game, markets] = await Promise.all([
    prisma.player.findUnique({ where: { slug } }),
    prisma.game.findUnique({
      where: { id: gameId },
      include: {
        event: true,
        picks: { include: { player: true } },
      },
    }),
    prisma.market.findMany({
      where: { enabled: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  if (!player) notFound();
  if (!game) notFound();

  const myPick = game.picks.find((p) => p.playerId === player.id);
  const isResulted = game.status === "CLOSED" || game.status === "COMPLETED";

  // Fetch live odds for OPEN games (pick selection UI)
  const event = game.status === "OPEN"
    ? await fetchEvent(game.event.externalEventId)
    : null;

  const odds = event?.odds ?? [];
  const marketsWithOdds = markets.map((m) => ({
    market: m,
    odds: odds.filter((o) => o.marketId === m.marketId),
  }));

  const totalPlayers = await prisma.player.count();
  const otherPicks = game.picks.filter((p) => p.playerId !== player.id);

  // For the pick selection UI: unavailable odds + SuperSub eligible market IDs
  let unavailableOddsUuids: string[] = [];
  let superSubMarketIds: number[] = [];

  if (game.status === "OPEN" && !myPick) {
    const [previewResult, sgaMarketsResult] = await Promise.allSettled([
      otherPicks.length > 0
        ? fetchPreviewBetbuilderOdd(game.event.externalEventId, otherPicks.map((p) => p.oddUuid))
        : Promise.resolve(null),
      fetchSgaMarkets(game.event.externalEventId),
    ]);

    if (previewResult.status === "fulfilled" && previewResult.value) {
      unavailableOddsUuids = previewResult.value.unavailableOddsUuids ?? [];
    }
    if (sgaMarketsResult.status === "fulfilled") {
      for (const market of sgaMarketsResult.value.markets ?? []) {
        if (market.odds?.some((o) => o.superSubEligible)) {
          superSubMarketIds.push(market.id);
        }
      }
    }
  }

  // Fetch results for CLOSED/COMPLETED games
  let oddsResultsMap = new Map<string, string>();
  if (isResulted && game.picks.length > 0) {
    try {
      const resultEvent = await fetchEvent(game.event.externalEventId, true);
      for (const o of resultEvent?.oddsResults ?? []) {
        oddsResultsMap.set(o.uuid, o.status);
      }
    } catch {
      // Non-fatal — results show as pending if API unavailable
    }
  }

  // Build stable per-player info for taken-odd avatars in the pick UI
  const otherPickedOdds = [...otherPicks]
    .sort((a, b) => a.playerId - b.playerId)
    .map((p, index) => ({
      oddUuid: p.oddUuid,
      playerDisplayName: p.player.displayName,
      playerIndex: index,
    }));

  const [homeTeam, awayTeam] = game.event.name.split("·").map((s) => s.trim());

  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      {/* Match header */}
      <div className="pt-8 pb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3 text-center">
          PassTheBall
        </p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-lg font-bold text-white leading-tight text-right flex-1">{homeTeam ?? game.event.name}</span>
          <span className="text-sm font-bold text-white/30 shrink-0">vs</span>
          <span className="text-lg font-bold text-white leading-tight text-left flex-1">{awayTeam ?? ""}</span>
        </div>
        {game.event.matchDate && (
          <p className="text-center text-white/35 text-xs">{formatDate(game.event.matchDate)}</p>
        )}
      </div>

      {/* Game not yet open */}
      {(game.status === "DRAFT" || game.status === "PENDING") && (
        <div className="rounded-xl bg-[#1e1f2a] border border-[#2c2d3d] p-6 text-center">
          <Clock className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-white font-semibold mb-1">
            {game.status === "PENDING" ? "Opening soon" : "Not yet open"}
          </p>
          <p className="text-white/40 text-sm">
            {game.status === "PENDING"
              ? "This game hasn't opened yet. Check back soon."
              : "This game isn't ready yet."}
          </p>
        </div>
      )}

      {/* Results view — CLOSED or COMPLETED */}
      {isResulted && (
        <div className="space-y-4">
          <div className="rounded-xl bg-[#1e1f2a] border border-[#2c2d3d] p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-white/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Results</span>
            </div>

            {game.picks.length === 0 ? (
              <p className="text-xs text-white/25 text-center py-2">No picks were made for this game.</p>
            ) : (
              <div className="space-y-3">
                {game.picks.map((pick) => {
                  const result = oddsResultsMap.get(pick.oddUuid);
                  const isMe = pick.playerId === player.id;
                  return (
                    <div key={pick.id} className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${isMe ? "bg-indigo-500/10 border border-indigo-500/20" : "bg-[#252636]"}`}>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white/50 mb-0.5">
                          {pick.player.displayName}{isMe && <span className="ml-1.5 text-indigo-400">(you)</span>}
                        </p>
                        <p className="text-sm font-semibold text-white truncate">{pick.oddName}</p>
                        <p className="text-[10px] text-white/35 truncate">{pick.marketName}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                        <span className="text-indigo-400 font-bold tabular-nums">{pick.oddPrice.toFixed(2)}</span>
                        {result ? (
                          <ResultBadge status={result} />
                        ) : (
                          <span className="text-[10px] text-white/25">Pending</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {game.sgaPrice && (
              <div className="mt-4 pt-4 border-t border-[#2c2d3d] text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Combined Price</p>
                <p className="text-4xl font-black text-indigo-400 tabular-nums">{game.sgaPrice.toFixed(2)}</p>
              </div>
            )}
          </div>

          {!myPick && (
            <p className="text-center text-xs text-white/25">You didn&apos;t pick for this round.</p>
          )}
        </div>
      )}

      {/* Player already picked — OPEN game */}
      {game.status === "OPEN" && myPick && (
        <div className="space-y-4">
          <div className="rounded-xl bg-[#1e1f2a] border border-indigo-500/30 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold text-white">Your Pick</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">{myPick.marketName}</p>
            <p className="text-white font-semibold text-lg">{myPick.oddName}</p>
            <p className="text-indigo-400 font-bold text-2xl tabular-nums mt-0.5">{myPick.oddPrice.toFixed(2)}</p>
          </div>

          <div className="rounded-xl bg-[#1e1f2a] border border-[#2c2d3d] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-white/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                {game.picks.length} / {totalPlayers} picked
              </span>
            </div>
            <div className="space-y-2">
              {game.picks.map((pick) => (
                <div key={pick.id} className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{pick.player.displayName}</span>
                  <div className="text-right">
                    <span className="text-xs text-white/40">{pick.marketName} · </span>
                    <span className="text-sm font-semibold text-white">{pick.oddName}</span>
                    <span className="text-indigo-400 font-bold text-sm ml-2 tabular-nums">{pick.oddPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {game.sgaPrice && (
              <div className="mt-4 pt-4 border-t border-[#2c2d3d] text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Combined Price</p>
                <p className="text-4xl font-black text-indigo-400 tabular-nums">{game.sgaPrice.toFixed(2)}</p>
              </div>
            )}

            {!game.sgaPrice && game.picks.length < totalPlayers && (
              <p className="mt-3 text-center text-xs text-white/25">
                Waiting for {totalPlayers - game.picks.length} more player{totalPlayers - game.picks.length !== 1 ? "s" : ""}…
              </p>
            )}
          </div>
        </div>
      )}

      {/* Pick UI — OPEN, not yet picked */}
      {game.status === "OPEN" && !myPick && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Pick one outcome
            </p>
            {game.picks.length > 0 && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                {game.picks.length}/{totalPlayers} picked
              </p>
            )}
          </div>
          <PlayerGameView
            playerSlug={slug}
            gameId={gameId}
            markets={marketsWithOdds}
            unavailableOddsUuids={unavailableOddsUuids}
            otherPickedOdds={otherPickedOdds}
            superSubMarketIds={superSubMarketIds}
          />
        </div>
      )}
    </div>
  );
}
