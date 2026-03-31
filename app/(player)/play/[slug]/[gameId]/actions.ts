"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { fetchSgaOddPrice, fetchPreviewBetbuilderOdd } from "@/lib/sga-api";

// Calculates the SGA combined price for a specific group's picks (or all picks if no groupId).
async function triggerSgaPrice(gameId: number, groupId?: number) {
  const game = await prisma.game.findUniqueOrThrow({
    where: { id: gameId },
    include: { event: true, picks: { include: { player: true } } },
  });

  const picks = groupId
    ? game.picks.filter((p) => p.player.groupId === groupId)
    : game.picks;

  const oddUuids = picks.map((p) => p.oddUuid);
  if (oddUuids.length === 0) return;

  try {
    const result = await fetchSgaOddPrice(game.event.externalEventId, oddUuids);
    if (groupId) {
      await prisma.gameGroupPrice.upsert({
        where: { gameId_groupId: { gameId, groupId } },
        create: { gameId, groupId, price: result.price, sgaUuid: result.sgaUuid, sgaStatus: result.status },
        update: { price: result.price, sgaUuid: result.sgaUuid, sgaStatus: result.status },
      });
    } else {
      // Ungrouped players: fall back to game-level price
      await prisma.game.update({
        where: { id: gameId },
        data: { sgaPrice: result.price, sgaUuid: result.sgaUuid, sgaStatus: result.status },
      });
    }
  } catch {
    // SGA call failed — leave price null, admin can retry manually
  }
}

export async function submitPick(
  playerSlug: string,
  gameId: number,
  marketId: number,
  oddUuid: string,
  oddName: string,
  marketName: string,
  oddPrice: number
) {
  const [player, game] = await Promise.all([
    prisma.player.findUnique({ where: { slug: playerSlug } }),
    prisma.game.findUnique({
      where: { id: gameId },
      include: { picks: true },
    }),
  ]);

  if (!player) throw new Error("Player not found");
  if (!game) throw new Error("Game not found");
  if (game.status !== "OPEN") throw new Error("Game is not accepting picks");

  const existingPick = game.picks.find((p) => p.playerId === player.id);
  if (existingPick) throw new Error("You have already locked in your pick");

  // Turn-order enforcement: scoped to the player's group (or all players if ungrouped)
  const groupPlayers = player.groupId
    ? await prisma.player.findMany({ where: { groupId: player.groupId }, orderBy: { createdAt: "asc" } })
    : await prisma.player.findMany({ orderBy: { createdAt: "asc" } });

  const pickedIds = new Set(game.picks.map((p) => p.playerId));
  const currentTurnPlayer = groupPlayers.find((p) => !pickedIds.has(p.id));
  if (currentTurnPlayer && currentTurnPlayer.id !== player.id) {
    throw new Error(`It's ${currentTurnPlayer.displayName}'s turn to pick`);
  }

  // Server-side validation: check this UUID isn't blocked by existing group picks
  const otherGroupPickUuids = game.picks
    .filter((p) => p.playerId !== player.id && groupPlayers.some((gp) => gp.id === p.playerId))
    .map((p) => p.oddUuid);

  if (otherGroupPickUuids.length > 0) {
    const gameWithEvent = await prisma.game.findUniqueOrThrow({
      where: { id: gameId },
      include: { event: true },
    });
    try {
      const preview = await fetchPreviewBetbuilderOdd(
        gameWithEvent.event.externalEventId,
        otherGroupPickUuids
      );
      if (preview.unavailableOddsUuids?.includes(oddUuid)) {
        throw new Error("This selection can't be combined with existing picks");
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes("can't be combined")) throw e;
    }
  }

  await prisma.pick.create({
    data: { gameId, playerId: player.id, marketId, oddUuid, oddName, marketName, oddPrice },
  });

  // Check if all players in this group have now picked
  const groupPlayerIds = new Set(groupPlayers.map((p) => p.id));
  const groupPickCount = game.picks.filter((p) => groupPlayerIds.has(p.playerId)).length + 1; // +1 for the pick just created

  if (groupPickCount >= groupPlayers.length) {
    await triggerSgaPrice(gameId, player.groupId ?? undefined);
  }

  revalidatePath(`/play/${playerSlug}/${gameId}`);
}

export { triggerSgaPrice };
