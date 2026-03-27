import { prisma } from "@/lib/prisma";
import { MarketsClient } from "./MarketsClient";

export default async function MarketsPage() {
  const markets = await prisma.market.findMany({ orderBy: { createdAt: "asc" } });
  return <MarketsClient markets={markets} />;
}
