import { prisma } from "@/lib/prisma";
import { fetchEvent } from "@/lib/offer-api";
import { fetchPreviewBetbuilderOdd, fetchSgaMarkets } from "@/lib/sga-api";
import { notFound } from "next/navigation";
import { PlayerGameView } from "./PlayerGameView";
import { formatDate } from "@/lib/utils";
import { Lock, Users, Clock, CheckCircle2, XCircle, Hourglass } from "lucide-react";

function TurnBanner({ isMyTurn, playerName }: { isMyTurn: boolean; playerName: string }) {
  return (
    <div
      className="relative -mx-4 px-6 pt-10 pb-8 text-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, var(--bg-match-card) 0%, var(--bg-hero) 45%, var(--bg-primary) 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 20%, rgba(192,57,43,0.20) 0%, transparent 70%)" }}
      />
      <div className="relative">
        <h2
          className="text-3xl font-black uppercase tracking-tight leading-tight mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            color: "var(--text-primary)",
            textShadow: "0 2px 24px rgba(0,0,0,0.7)",
          }}
        >
          {isMyTurn ? "Finish Your Turn" : `Waiting for ${playerName} to Pick`}
        </h2>
        <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {isMyTurn
            ? "Your friends have added their legs. It's your turn to lock in your selection!"
            : `${playerName} needs to make their pick before you can go.`}
        </p>
      </div>
    </div>
  );
}

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

  const [player, game, markets, allPlayers] = await Promise.all([
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
    prisma.player.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  if (!player) notFound();
  if (!game) notFound();

  const myPick = game.picks.find((p) => p.playerId === player.id);

  // Turn-order: first player (by creation) who hasn't picked yet
  const pickedIds = new Set(game.picks.map((p) => p.playerId));
  const currentTurnPlayer = allPlayers.find((p) => !pickedIds.has(p.id)) ?? null;
  const isMyTurn = currentTurnPlayer?.id === player.id;
  const isBlocked = !myPick && !isMyTurn && currentTurnPlayer !== null;
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

  const totalPlayers = allPlayers.length;
  const otherPicks = game.picks.filter((p) => p.playerId !== player.id);

  // For the pick selection UI: unavailable odds + SuperSub eligible market IDs
  let unavailableOddsUuids: string[] = [];
  let superSubMarketIds: number[] = [];

  if (game.status === "OPEN" && !myPick && isMyTurn) {
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
      {/* Turn banner — shown when game is OPEN and player hasn't picked yet */}
      {game.status === "OPEN" && !myPick && currentTurnPlayer && (
        <TurnBanner isMyTurn={isMyTurn} playerName={currentTurnPlayer.displayName} />
      )}

      {/* Match header */}
      <div className={`pb-6 ${game.status === "OPEN" && !myPick && currentTurnPlayer ? "pt-6" : "pt-8"}`}>
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
        <div className="rounded-xl border border-white/8 p-6 text-center" style={{ background: "var(--bg-panel)" }}>
          <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
          <p className="font-semibold mb-1" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
            {game.status === "PENDING" ? "Opening soon" : "Not yet open"}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {game.status === "PENDING"
              ? "This game hasn't opened yet. Check back soon."
              : "This game isn't ready yet."}
          </p>
        </div>
      )}

      {/* Results view — CLOSED or COMPLETED */}
      {isResulted && (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/8 p-4" style={{ background: "var(--bg-panel)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Results</span>
            </div>

            {game.picks.length === 0 ? (
              <p className="text-xs text-center py-2" style={{ color: "var(--text-muted)" }}>No picks were made for this game.</p>
            ) : (
              <div className="space-y-3">
                {game.picks.map((pick) => {
                  const result = oddsResultsMap.get(pick.oddUuid);
                  const isMe = pick.playerId === player.id;
                  return (
                    <div
                      key={pick.id}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5"
                      style={isMe
                        ? { background: "rgba(0,196,140,0.08)", border: "1px solid rgba(0,196,140,0.20)" }
                        : { background: "rgba(255,255,255,0.04)" }
                      }
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold mb-0.5" style={{ color: "var(--text-muted)" }}>
                          {pick.player.displayName}
                          {isMe && <span className="ml-1.5" style={{ color: "var(--accent-green)" }}>(you)</span>}
                        </p>
                        <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{pick.oddName}</p>
                        <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>{pick.marketName}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                        <span className="font-bold tabular-nums" style={{ color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>{pick.oddPrice.toFixed(2)}</span>
                        {result ? (
                          <ResultBadge status={result} />
                        ) : (
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Pending</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {game.sgaPrice && (
              <div className="mt-4 pt-4 border-t border-white/8 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Combined Price</p>
                <p className="text-4xl font-black tabular-nums" style={{ color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>{game.sgaPrice.toFixed(2)}</p>
              </div>
            )}
          </div>

          {!myPick && (
            <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>You didn&apos;t pick for this round.</p>
          )}
        </div>
      )}

      {/* Player already picked — OPEN game */}
      {game.status === "OPEN" && myPick && (
        <div className="space-y-4">
          <div className="rounded-xl border p-5" style={{ background: "var(--bg-panel)", borderColor: "rgba(0,196,140,0.25)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4" style={{ color: "var(--accent-green)" }} />
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>Your Pick</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>{myPick.marketName}</p>
            <p className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>{myPick.oddName}</p>
            <p className="font-black text-2xl tabular-nums mt-0.5" style={{ color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>{myPick.oddPrice.toFixed(2)}</p>
          </div>

          <div className="rounded-xl border border-white/8 p-4" style={{ background: "var(--bg-panel)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {game.picks.length} / {totalPlayers} picked
              </span>
            </div>
            <div className="space-y-2">
              {game.picks.map((pick) => (
                <div key={pick.id} className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "var(--text-primary)" }}>{pick.player.displayName}</span>
                  <div className="text-right">
                    <span className="text-xs mr-1" style={{ color: "var(--text-muted)" }}>{pick.marketName} ·</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{pick.oddName}</span>
                    <span className="font-bold text-sm ml-2 tabular-nums" style={{ color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>{pick.oddPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {game.sgaPrice && (
              <div className="mt-4 pt-4 border-t border-white/8 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Combined Price</p>
                <p className="text-4xl font-black tabular-nums" style={{ color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>{game.sgaPrice.toFixed(2)}</p>
              </div>
            )}

            {!game.sgaPrice && game.picks.length < totalPlayers && (
              <p className="mt-3 text-center text-xs" style={{ color: "var(--text-muted)" }}>
                Waiting for {totalPlayers - game.picks.length} more player{totalPlayers - game.picks.length !== 1 ? "s" : ""}…
              </p>
            )}
          </div>
        </div>
      )}

      {/* Blocked — OPEN, not yet picked, not my turn */}
      {game.status === "OPEN" && isBlocked && currentTurnPlayer && (
        <div className="space-y-3">
          <div className="rounded-xl border border-white/8 p-5 text-center" style={{ background: "var(--bg-panel)" }}>
            <Hourglass className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              You&apos;ll be able to pick once {currentTurnPlayer.displayName} has locked in their selection.
            </p>
          </div>
          {game.picks.length > 0 && (
            <div className="rounded-xl border border-white/8 p-4" style={{ background: "var(--bg-panel)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  {game.picks.length}/{totalPlayers} picked
                </span>
              </div>
              <div className="space-y-2">
                {allPlayers.map((p) => {
                  const pick = game.picks.find((pk) => pk.playerId === p.id);
                  return (
                    <div key={p.id} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: "var(--text-primary)" }}>{p.displayName}</span>
                      {pick ? (
                        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {pick.oddName}
                          <span className="font-bold ml-2 tabular-nums" style={{ color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>
                            {pick.oddPrice.toFixed(2)}
                          </span>
                        </span>
                      ) : (
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border"
                          style={{ background: "rgba(212,130,10,0.12)", color: "var(--accent-amber)", borderColor: "rgba(212,130,10,0.25)" }}
                        >
                          Pending
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pick UI — OPEN, not yet picked, my turn */}
      {game.status === "OPEN" && !myPick && isMyTurn && (
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
