"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createGroup(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name) throw new Error("Group name is required");

  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  await prisma.group.create({ data: { name, slug } });
  revalidatePath("/groups");
}

export async function deleteGroup(groupId: number) {
  // Unassign players first so we don't delete them
  await prisma.player.updateMany({ where: { groupId }, data: { groupId: null } });
  await prisma.group.delete({ where: { id: groupId } });
  revalidatePath("/groups");
}

export async function renameGroup(groupId: number, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name) throw new Error("Group name is required");

  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  await prisma.group.update({ where: { id: groupId }, data: { name, slug } });
  revalidatePath("/groups");
}

export async function addPlayerToGroup(playerId: number, groupId: number) {
  await prisma.player.update({ where: { id: playerId }, data: { groupId } });
  revalidatePath("/groups");
}

export async function removePlayerFromGroup(playerId: number) {
  await prisma.player.update({ where: { id: playerId }, data: { groupId: null } });
  revalidatePath("/groups");
}

export async function createPlayerInGroup(formData: FormData, groupId: number) {
  const displayName = (formData.get("displayName") as string)?.trim();
  if (!displayName) throw new Error("Player name is required");

  const slug = displayName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  await prisma.player.create({ data: { displayName, slug, groupId } });
  revalidatePath("/groups");
}

export async function deletePlayer(playerId: number) {
  await prisma.player.delete({ where: { id: playerId } });
  revalidatePath("/groups");
}
