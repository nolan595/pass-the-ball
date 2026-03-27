"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { fetchSgaOddPrice } from "@/lib/sga-api";
import type { PrizeType } from "@/app/generated/prisma";

export async function createGame(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const eventId = parseInt(formData.get("eventId") as string);
  const openTime = new Date(formData.get("openTime") as string);
  const closeTime = new Date(formData.get("closeTime") as string);
  const prizeType = formData.get("prizeType") as PrizeType;
  const bonusId = (formData.get("bonusId") as string)?.trim() || null;
  const multiplier = parseFloat(formData.get("multiplier") as string) || 1.0;

  if (!name || isNaN(eventId) || !prizeType) throw new Error("Missing required fields");
  if (closeTime <= openTime) throw new Error("Close time must be after open time");

  const game = await prisma.game.create({
    data: { name, eventId, openTime, closeTime, prizeType, bonusId, multiplier, status: "PENDING" },
  });

  revalidatePath("/games");
  redirect(`/games/${game.id}`);
}

export async function deleteGame(gameId: number) {
  const game = await prisma.game.findUniqueOrThrow({ where: { id: gameId } });
  if (game.status === "OPEN" || game.status === "CLOSED" || game.status === "COMPLETED") {
    throw new Error("Cannot delete a game that is OPEN or has been played");
  }
  await prisma.game.delete({ where: { id: gameId } });
  revalidatePath("/games");
}

export async function advanceGameStatus(id: number) {
  const game = await prisma.game.findUniqueOrThrow({ where: { id } });

  const next = {
    DRAFT: "PENDING",
    PENDING: "OPEN",
    OPEN: "CLOSED",
    CLOSED: "COMPLETED",
    COMPLETED: "COMPLETED",
  } as const;

  await prisma.game.update({
    where: { id },
    data: { status: next[game.status] },
  });

  revalidatePath(`/games/${id}`);
  revalidatePath("/games");
}

export async function calculateGameSgaPrice(gameId: number) {
  const game = await prisma.game.findUniqueOrThrow({
    where: { id: gameId },
    include: { event: true, picks: true },
  });

  const oddUuids = game.picks.map((p) => p.oddUuid);
  if (oddUuids.length === 0) throw new Error("No picks to price");

  const result = await fetchSgaOddPrice(game.event.externalEventId, oddUuids);

  await prisma.game.update({
    where: { id: gameId },
    data: { sgaPrice: result.price, sgaUuid: result.sgaUuid, sgaStatus: result.status },
  });

  revalidatePath(`/games/${gameId}`);
}
