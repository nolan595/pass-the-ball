import { prisma } from "@/lib/prisma";
import { fetchEvent } from "@/lib/offer-api";
import { notFound } from "next/navigation";
import { FixedHeader } from "@/app/(player)/components/FixedHeader";
import { BottomNavBar } from "@/app/(player)/components/BottomNavBar";
import { HistoryView, type HistoryRound } from "./HistoryView";

export default async function PlayerHistoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const player = await prisma.player.findUnique({ where: { slug } });
  if (!player) notFound();

  // Fetch all closed/completed games this player participated in
  const games = await prisma.game.findMany({
    where: {
      status: { in: ["CLOSED", "COMPLETED"] },
      picks: { some: { playerId: player.id } },
    },
    include: {
      event: true,
      picks: { include: { player: true } },
    },
    orderBy: { closeTime: "desc" },
  });

  // For each game, determine win/loss by fetching oddsResults
  const rounds: HistoryRound[] = [];

  for (const game of games) {
    let oddsResultsMap = new Map<string, string>();
    try {
      const resultEvent = await fetchEvent(game.event.externalEventId, true);
      for (const o of resultEvent?.oddsResults ?? []) {
        oddsResultsMap.set(o.uuid, o.status);
      }
    } catch {
      // Non-fatal — treat as pending
    }

    const allSettled = game.picks.every((p) => oddsResultsMap.has(p.oddUuid));
    const allWon = allSettled && game.picks.every((p) => oddsResultsMap.get(p.oddUuid) === "won");
    const anyLost = allSettled && game.picks.some((p) => oddsResultsMap.get(p.oddUuid) === "lost");

    const result: "win" | "loss" | "pending" = !allSettled
      ? "pending"
      : allWon
      ? "win"
      : anyLost
      ? "loss"
      : "pending";

    const prizeAmount =
      result === "win" && game.prizeType === "CASH" && game.multiplier > 1
        ? game.multiplier
        : undefined;

    const dateStr = game.closeTime
      ? new Date(game.closeTime).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          timeZone: "Europe/London",
        })
      : "Unknown date";

    rounds.push({
      id: game.id,
      date: dateStr,
      gameName: game.name,
      result,
      prizeAmount,
      picks: game.picks.map((pick) => ({
        playerName: pick.player.displayName,
        marketName: pick.marketName,
        oddName: pick.oddName,
        oddPrice: pick.oddPrice,
        isMe: pick.playerId === player.id,
      })),
    });
  }

  return (
    <div>
      <FixedHeader state="HISTORY" backHref={`/play/${slug}`} />
      <HistoryView rounds={rounds} />
      <BottomNavBar activeTab="picks" playerSlug={slug} />
    </div>
  );
}
