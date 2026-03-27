import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchSgaOddPrice } from "@/lib/sga-api";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const totalPlayers = await prisma.player.count();

  // Find OPEN games where all players have submitted picks
  const openGames = await prisma.game.findMany({
    where: { status: "OPEN" },
    include: {
      event: true,
      picks: true,
    },
  });

  const gamesReady = openGames.filter((g) => g.picks.length >= totalPlayers);

  if (gamesReady.length === 0) {
    return NextResponse.json({ refreshed: 0, message: "No games ready for price refresh" });
  }

  const results: { gameId: number; status: string; price?: number; error?: string }[] = [];

  for (const game of gamesReady) {
    const oddUuids = game.picks.map((p) => p.oddUuid);
    try {
      const result = await fetchSgaOddPrice(game.event.externalEventId, oddUuids);
      await prisma.game.update({
        where: { id: game.id },
        data: {
          sgaPrice: result.price,
          sgaUuid: result.sgaUuid,
          sgaStatus: result.status,
        },
      });
      revalidatePath(`/play`);
      revalidatePath(`/games/${game.id}`);
      results.push({ gameId: game.id, status: "refreshed", price: result.price });
    } catch (e) {
      results.push({
        gameId: game.id,
        status: "error",
        error: e instanceof Error ? e.message : "unknown",
      });
    }
  }

  return NextResponse.json({ refreshed: results.length, results });
}
