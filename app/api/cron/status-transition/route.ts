import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  // PENDING → OPEN: openTime has passed
  const toOpen = await prisma.game.findMany({
    where: { status: "PENDING", openTime: { lte: now } },
    select: { id: true, name: true },
  });

  // OPEN → CLOSED: closeTime has passed
  const toClose = await prisma.game.findMany({
    where: { status: "OPEN", closeTime: { lte: now } },
    select: { id: true, name: true },
  });

  const opened: number[] = [];
  const closed: number[] = [];

  for (const game of toOpen) {
    await prisma.game.update({ where: { id: game.id }, data: { status: "OPEN" } });
    revalidatePath(`/games/${game.id}`);
    opened.push(game.id);
  }

  for (const game of toClose) {
    await prisma.game.update({ where: { id: game.id }, data: { status: "CLOSED" } });
    revalidatePath(`/games/${game.id}`);
    closed.push(game.id);
  }

  if (opened.length > 0 || closed.length > 0) {
    revalidatePath("/games");
  }

  console.log(`Status transition: opened=${opened.join(",") || "none"} closed=${closed.join(",") || "none"}`);

  return NextResponse.json({ opened, closed });
}
