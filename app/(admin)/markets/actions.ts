"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { DisplayType } from "@/app/generated/prisma";

export async function createMarket(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const marketId = parseInt(formData.get("marketId") as string);
  const displayType = formData.get("displayType") as DisplayType;
  const superSubEligible = formData.get("superSubEligible") === "on";

  if (!name || isNaN(marketId) || !displayType) throw new Error("All fields are required");

  await prisma.market.create({ data: { name, marketId, displayType, superSubEligible } });
  revalidatePath("/markets");
}

export async function updateMarket(id: number, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const marketId = parseInt(formData.get("marketId") as string);
  const displayType = formData.get("displayType") as DisplayType;
  const superSubEligible = formData.get("superSubEligible") === "on";

  if (!name || isNaN(marketId) || !displayType) throw new Error("All fields are required");

  await prisma.market.update({ where: { id }, data: { name, marketId, displayType, superSubEligible } });
  revalidatePath("/markets");
}

export async function toggleSuperSub(id: number, superSubEligible: boolean) {
  await prisma.market.update({ where: { id }, data: { superSubEligible } });
  revalidatePath("/markets");
}

export async function toggleMarket(id: number, enabled: boolean) {
  await prisma.market.update({ where: { id }, data: { enabled } });
  revalidatePath("/markets");
}

export async function deleteMarket(id: number) {
  await prisma.market.delete({ where: { id } });
  revalidatePath("/markets");
}
