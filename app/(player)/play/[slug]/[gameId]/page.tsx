import { prisma } from "@/lib/prisma";
import { fetchEvent } from "@/lib/offer-api";
import { fetchPreviewBetbuilderOdd, fetchSgaMarkets } from "@/lib/sga-api";
import { notFound } from "next/navigation";
import { PlayerGameView } from "./PlayerGameView";
import { formatDate, resolveMarketName } from "@/lib/utils";
import { Clock } from "lucide-react";
import { FixedHeader } from "@/app/(player)/components/FixedHeader";
import { MatchCard } from "@/app/(player)/components/MatchCard";
import { GroupPanel, type GroupPick } from "@/app/(player)/components/GroupPanel";
import { BottomNavBar } from "@/app/(player)/components/BottomNavBar";
import { ResultScreen, type ResultPick } from "@/app/(player)/components/ResultScreen";
import type { RingPlayer } from "@/app/(player)/components/ScoreRing";

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

  const pickedIds = new Set(game.picks.map((p) => p.playerId));
  const currentTurnPlayer = allPlayers.find((p) => !pickedIds.has(p.id)) ?? null;
  const isMyTurn = currentTurnPlayer?.id === player.id;
  const isBlocked = !myPick && !isMyTurn && currentTurnPlayer !== null;
  const isResulted = game.status === "CLOSED" || game.status === "COMPLETED";
  const totalPlayers = allPlayers.length;

  const [homeTeam, awayTeam] = game.event.name.split("·").map((s) => s.trim());

  const event =
    game.status === "OPEN" ? await fetchEvent(game.event.externalEventId) : null;

  const odds = event?.odds ?? [];
  const marketsWithOdds = markets
    .map((m) => {
      const marketOdds = odds.filter((o) => o.marketId === m.marketId);
      const rawName = marketOdds[0]?.marketName ?? m.name;
      return {
        market: m,
        odds: marketOdds,
        displayName: resolveMarketName(rawName, event?.homeTeamName, event?.awayTeamName),
      };
    })
    .filter((m) => m.odds.length > 0);

  const otherPicks = game.picks.filter((p) => p.playerId !== player.id);

  let unavailableOddsUuids: string[] = [];
  let superSubMarketIds: number[] = [];

  if (game.status === "OPEN" && !myPick && isMyTurn) {
    const [previewResult, sgaMarketsResult] = await Promise.allSettled([
      otherPicks.length > 0
        ? fetchPreviewBetbuilderOdd(
            game.event.externalEventId,
            otherPicks.map((p) => p.oddUuid)
          )
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

  let oddsResultsMap = new Map<string, string>();
  if (isResulted && game.picks.length > 0) {
    try {
      const resultEvent = await fetchEvent(game.event.externalEventId, true);
      for (const o of resultEvent?.oddsResults ?? []) {
        oddsResultsMap.set(o.uuid, o.status);
      }
    } catch {
      // Non-fatal
    }
  }

  const otherPickedOdds = [...otherPicks]
    .sort((a, b) => a.playerId - b.playerId)
    .map((p, index) => ({
      oddUuid: p.oddUuid,
      playerDisplayName: p.player.displayName,
      playerIndex: index,
    }));

  const groupPicks: GroupPick[] = allPlayers.map((p) => {
    const pick = game.picks.find((pk) => pk.playerId === p.id);
    return {
      playerId: p.id,
      playerSlug: p.slug,
      playerName: p.displayName,
      marketName: pick?.marketName,
      oddName: pick?.oddName,
      oddPrice: pick?.oddPrice ?? undefined,
      confirmed: !!pick,
    };
  });

  const confirmedPrices = groupPicks
    .filter((p) => p.confirmed && p.oddPrice)
    .map((p) => p.oddPrice!);
  const totalOdds =
    confirmedPrices.length > 0
      ? confirmedPrices.reduce((acc, p) => acc * p, 1)
      : undefined;

  const turnPlayerName = isMyTurn
    ? "You"
    : currentTurnPlayer?.displayName ?? undefined;

  let timeRemaining: string | undefined;
  if (game.closeTime) {
    const diffMs = new Date(game.closeTime).getTime() - Date.now();
    if (diffMs > 0) {
      const diffHrs = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffHrs / 24);
      const remHrs = diffHrs % 24;
      timeRemaining = diffDays > 0 ? `${diffDays}d ${remHrs}hr` : `${diffHrs}hr`;
    }
  }

  const matchCardProps = {
    homeTeam: homeTeam ?? game.event.name,
    awayTeam: awayTeam ?? "",
    competition: "PassTheBall",
    matchDate: game.event.matchDate ? formatDate(game.event.matchDate) : undefined,
  };

  const groupPanelProps = {
    groupName: game.name ?? "The Group",
    totalPlayers,
    picks: groupPicks,
    currentPlayerSlug: slug,
    timeRemaining,
    totalOdds,
    turnPlayerName,
  };

  // ── Result screen ───────────────────────────────────────────────────────────
  if (isResulted) {
    const allWon = game.picks.every((p) => oddsResultsMap.get(p.oddUuid) === "win");
    const ringPlayers: RingPlayer[] = allPlayers.map((p) => {
      const pick = game.picks.find((pk) => pk.playerId === p.id);
      const status = pick ? oddsResultsMap.get(pick.oddUuid) : undefined;
      return {
        name: p.displayName,
        won: status === "win",
        refunded: status === "refund",
      };
    });

    const resultPicks: ResultPick[] = game.picks.map((pick) => {
      const resultStatus = oddsResultsMap.get(pick.oddUuid);
      return {
        playerName: pick.player.displayName,
        marketName: pick.marketName,
        oddName: pick.oddName,
        oddPrice: pick.oddPrice,
        isMe: pick.playerId === player.id,
        won: resultStatus === "win" ? true : resultStatus === "lost" ? false : undefined,
        refunded: resultStatus === "refund",
      };
    });

    const prizeAmount =
      game.prizeType === "CASH" && game.multiplier > 1 ? game.multiplier : undefined;
    const splitAmount = prizeAmount ? Math.floor(prizeAmount / totalPlayers) : undefined;

    return (
      <div>
        <FixedHeader state="RESULT" backHref={`/play/${slug}/history`} />
        <ResultScreen
          result={allWon ? "win" : "loss"}
          players={ringPlayers}
          prizeAmount={prizeAmount}
          splitAmount={splitAmount}
          groupName={game.name ?? "The Group"}
          picks={resultPicks}
        />
        <BottomNavBar activeTab="home" playerSlug={slug} gameId={gameId} />
      </div>
    );
  }

  // ── Not open yet ────────────────────────────────────────────────────────────
  if (game.status === "DRAFT" || game.status === "PENDING") {
    return (
      <div style={{ padding: "32px 16px" }}>
        <MatchCard {...matchCardProps} />
        <div
          style={{
            marginTop: "24px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "24px",
            textAlign: "center",
            background: "var(--color-card-surface)",
          }}
        >
          <Clock size={32} style={{ color: "var(--text-muted)", margin: "0 auto 12px" }} />
          <p style={{ fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>
            {game.status === "PENDING" ? "Opening soon" : "Not yet open"}
          </p>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
            {game.status === "PENDING"
              ? "This game hasn't opened yet. Check back soon."
              : "This game isn't ready yet."}
          </p>
        </div>
        <BottomNavBar activeTab="home" playerSlug={slug} gameId={gameId} />
      </div>
    );
  }

  // ── Already picked — waiting ────────────────────────────────────────────────
  if (game.status === "OPEN" && myPick) {
    return (
      <div>
        <FixedHeader state="WAITING" waitingForName={currentTurnPlayer?.displayName} />
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <MatchCard {...matchCardProps} />

          <div
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(0,196,140,0.25)",
              padding: "16px",
              background: "var(--color-card-surface)",
            }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", margin: "0 0 4px" }}>
              Your Pick
            </p>
            <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", margin: "0 0 2px" }}>
              {myPick.marketName}
            </p>
            <p style={{ fontWeight: 600, fontSize: "18px", color: "#FFFFFF", margin: "0 0 2px" }}>
              {myPick.oddName}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "24px", color: "var(--accent-green)", margin: 0 }}>
              {myPick.oddPrice.toFixed(2)}
            </p>
          </div>

          <GroupPanel {...groupPanelProps} />

          {game.sgaPrice && (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "4px" }}>
                Combined Price
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "48px", color: "var(--accent-green)", margin: 0 }}>
                {game.sgaPrice.toFixed(2)}
              </p>
            </div>
          )}

          {!game.sgaPrice && game.picks.length < totalPlayers && (
            <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-muted)" }}>
              Waiting for {totalPlayers - game.picks.length} more player
              {totalPlayers - game.picks.length !== 1 ? "s" : ""}…
            </p>
          )}
        </div>
        <BottomNavBar activeTab="home" playerSlug={slug} gameId={gameId} />
      </div>
    );
  }

  // ── Blocked — not my turn ──────────────────────────────────────────────────
  if (game.status === "OPEN" && isBlocked && currentTurnPlayer) {
    return (
      <div>
        <FixedHeader state="WAITING" waitingForName={currentTurnPlayer.displayName} />
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <MatchCard {...matchCardProps} />
          <GroupPanel {...groupPanelProps} />
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
              textAlign: "center",
              background: "var(--color-card-surface)",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "24px" }}>
              ⏳
            </div>
            <p style={{ fontWeight: 600, color: "#FFFFFF", marginBottom: "6px" }}>
              {currentTurnPlayer.displayName}&apos;s turn
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
              You&apos;ll be able to pick once {currentTurnPlayer.displayName} has locked in their selection.
            </p>
          </div>
        </div>
        <BottomNavBar activeTab="home" playerSlug={slug} gameId={gameId} />
      </div>
    );
  }

  // ── My turn — pick UI ───────────────────────────────────────────────────────
  return (
    <div>
      <FixedHeader state="YOUR_TURN" />
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <MatchCard {...matchCardProps} />

        <div>
          <p style={{ fontWeight: 700, fontSize: "16px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#FFFFFF", margin: "0 0 4px" }}>
            Pick Your Market
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 12px" }}>
            Pick one market below to add to the group bet
          </p>
          <PlayerGameView
            playerSlug={slug}
            gameId={gameId}
            markets={marketsWithOdds}
            unavailableOddsUuids={unavailableOddsUuids}
            otherPickedOdds={otherPickedOdds}
            superSubMarketIds={superSubMarketIds}
          />
        </div>

        <GroupPanel {...groupPanelProps} />
      </div>
      <BottomNavBar activeTab="home" playerSlug={slug} gameId={gameId} />
    </div>
  );
}
