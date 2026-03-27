"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { fetchEventsByDate } from "@/lib/offer-api";

export async function getEventsByDate(date: string) {
  return fetchEventsByDate(date);
}

export async function registerEvent(externalEventId: string, name: string, matchDate?: string) {
  const parsed = matchDate ? new Date(matchDate) : null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma.externalEvent.upsert as any)({
    where: { externalEventId },
    update: { name, matchDate: parsed },
    create: { externalEventId, name, matchDate: parsed },
  });
  revalidatePath("/events");
  revalidatePath("/games");
}

export async function deleteEvent(id: number) {
  await prisma.externalEvent.delete({ where: { id } });
  revalidatePath("/events");
  revalidatePath("/games");
}
