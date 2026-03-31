import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchSgaOddPrice } from "@/lib/sga-api";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find all OPEN games with their picks and player group memberships
  const openGames = await prisma.game.findMany({
    where: { status: "OPEN" },
    include: {
      event: true,
      picks: { include: { player: true } },
    },
  });

  const results: { gameId: number; groupId: number | null; status: string; price?: number; error?: string }[] = [];

  for (const game of openGames) {
    // Collect all distinct groups that have players with picks in this game
    const groupIds = new Set(
      game.picks.map((p) => p.player.groupId).filter((id): id is number => id !== null)
    );

    // Per-group price refresh: only refresh groups where all members have picked
    for (const groupId of groupIds) {
      const groupPlayerCount = await prisma.player.count({ where: { groupId } });
      const groupPickCount = game.picks.filter((p) => p.player.groupId === groupId).length;

      if (groupPickCount < groupPlayerCount) continue;

      const oddUuids = game.picks
        .filter((p) => p.player.groupId === groupId)
        .map((p) => p.oddUuid);

      try {
        const result = await fetchSgaOddPrice(game.event.externalEventId, oddUuids);
        await prisma.gameGroupPrice.upsert({
          where: { gameId_groupId: { gameId: game.id, groupId } },
          create: { gameId: game.id, groupId, price: result.price, sgaUuid: result.sgaUuid, sgaStatus: result.status },
          update: { price: result.price, sgaUuid: result.sgaUuid, sgaStatus: result.status },
        });
        revalidatePath(`/play`);
        results.push({ gameId: game.id, groupId, status: "refreshed", price: result.price });
      } catch (e) {
        results.push({ gameId: game.id, groupId, status: "error", error: e instanceof Error ? e.message : "unknown" });
      }
    }

    // Ungrouped players: refresh game-level price if all ungrouped players have picked
    const ungroupedPlayers = await prisma.player.count({ where: { groupId: null } });
    if (ungroupedPlayers > 0) {
      const ungroupedPickCount = game.picks.filter((p) => p.player.groupId === null).length;
      if (ungroupedPickCount >= ungroupedPlayers) {
        const oddUuids = game.picks.filter((p) => p.player.groupId === null).map((p) => p.oddUuid);
        try {
          const result = await fetchSgaOddPrice(game.event.externalEventId, oddUuids);
          await prisma.game.update({
            where: { id: game.id },
            data: { sgaPrice: result.price, sgaUuid: result.sgaUuid, sgaStatus: result.status },
          });
          revalidatePath(`/play`);
          results.push({ gameId: game.id, groupId: null, status: "refreshed", price: result.price });
        } catch (e) {
          results.push({ gameId: game.id, groupId: null, status: "error", error: e instanceof Error ? e.message : "unknown" });
        }
      }
    }
  }

  if (results.length === 0) {
    return NextResponse.json({ refreshed: 0, message: "No groups ready for price refresh" });
  }

  return NextResponse.json({ refreshed: results.length, results });
}
