import { prisma } from "@/lib/prisma";
import { fetchEvent } from "@/lib/offer-api";
import { fetchPreviewBetbuilderOdd } from "@/lib/sga-api";
import { notFound } from "next/navigation";
import { PlayerGameView } from "./PlayerGameView";
import { formatDate } from "@/lib/utils";
import { Lock, Users, Clock } from "lucide-react";
import type { GameStatus } from "@/app/generated/prisma";

const statusLabel: Record<GameStatus, string> = {
  DRAFT: "Not yet open",
  PENDING: "Opening soon",
  OPEN: "Open",
  CLOSED: "Closed",
  COMPLETED: "Completed",
};

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

  // Fetch live odds for OPEN games (needed for the selection UI)
  const event = game.status === "OPEN"
    ? await fetchEvent(game.event.externalEventId)
    : null;

  const odds = event?.odds ?? [];

  const marketsWithOdds = markets.map((m) => ({
    market: m,
    odds: odds.filter((o) => o.marketId === m.marketId),
  }));

  // Count all players for "waiting" display
  const totalPlayers = await prisma.player.count();

  // If other players have already picked, fetch which odds are blocked from combining
  // with their selections — these will be greyed out for this player
  let unavailableOddsUuids: string[] = [];
  const otherPicks = game.picks.filter((p) => p.playerId !== player.id);
  if (game.status === "OPEN" && !myPick && otherPicks.length > 0) {
    try {
      const preview = await fetchPreviewBetbuilderOdd(
        game.event.externalEventId,
        otherPicks.map((p) => p.oddUuid)
      );
      unavailableOddsUuids = preview.unavailableOddsUuids ?? [];
    } catch {
      // Non-fatal — if preview fails, show all odds as available
    }
  }

  // Build stable per-player info for the "taken" avatars in the pick UI
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

      {/* Game not open */}
      {game.status !== "OPEN" && (
        <div className="rounded-xl bg-[#1e1f2a] border border-[#2c2d3d] p-6 text-center">
          <Clock className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-white font-semibold mb-1">{statusLabel[game.status]}</p>
          <p className="text-white/40 text-sm">
            {game.status === "PENDING"
              ? "This game hasn't opened yet. Check back soon."
              : game.status === "DRAFT"
              ? "This game isn't ready yet."
              : "This game is no longer accepting picks."}
          </p>
          {(game.status === "CLOSED" || game.status === "COMPLETED") && game.sgaPrice && (
            <div className="mt-5 pt-5 border-t border-[#2c2d3d]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Combined Price</p>
              <p className="text-4xl font-black text-indigo-400 tabular-nums">{game.sgaPrice.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}

      {/* Player already picked */}
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

          {/* Who else has picked */}
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

      {/* Pick UI */}
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
          />
        </div>
      )}
    </div>
  );
}
