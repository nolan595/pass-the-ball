"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { fetchSgaOddPrice, fetchPreviewBetbuilderOdd } from "@/lib/sga-api";

async function triggerSgaPrice(gameId: number) {
  const game = await prisma.game.findUniqueOrThrow({
    where: { id: gameId },
    include: { event: true, picks: true },
  });

  const oddUuids = game.picks.map((p) => p.oddUuid);
  if (oddUuids.length === 0) return;

  try {
    const result = await fetchSgaOddPrice(game.event.externalEventId, oddUuids);
    await prisma.game.update({
      where: { id: gameId },
      data: { sgaPrice: result.price, sgaUuid: result.sgaUuid, sgaStatus: result.status },
    });
  } catch {
    // SGA call failed — leave sgaPrice null, admin can retry manually
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

  // Server-side validation: check this UUID isn't blocked by existing picks
  const otherPickUuids = game.picks
    .filter((p) => p.playerId !== player.id)
    .map((p) => p.oddUuid);

  if (otherPickUuids.length > 0) {
    const gameWithEvent = await prisma.game.findUniqueOrThrow({
      where: { id: gameId },
      include: { event: true },
    });
    try {
      const preview = await fetchPreviewBetbuilderOdd(
        gameWithEvent.event.externalEventId,
        otherPickUuids
      );
      if (preview.unavailableOddsUuids?.includes(oddUuid)) {
        throw new Error("This selection can't be combined with existing picks");
      }
    } catch (e) {
      // Re-throw validation errors, swallow API errors
      if (e instanceof Error && e.message.includes("can't be combined")) throw e;
    }
  }

  await prisma.pick.create({
    data: { gameId, playerId: player.id, marketId, oddUuid, oddName, marketName, oddPrice },
  });

  // Count all players to see if everyone has picked
  const [totalPlayers, totalPicks] = await Promise.all([
    prisma.player.count(),
    prisma.pick.count({ where: { gameId } }),
  ]);

  if (totalPicks >= totalPlayers) {
    await triggerSgaPrice(gameId);
  }

  revalidatePath(`/play/${playerSlug}/${gameId}`);
}

export { triggerSgaPrice };
