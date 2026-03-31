import { prisma } from "@/lib/prisma";
import { GroupsClient } from "./GroupsClient";

export default async function GroupsPage() {
  const groups = await prisma.group.findMany({
    include: { players: { orderBy: { createdAt: "asc" } } },
    orderBy: { createdAt: "asc" },
  });

  const ungroupedPlayers = await prisma.player.findMany({
    where: { groupId: null },
    orderBy: { createdAt: "asc" },
  });

  return <GroupsClient groups={groups} ungroupedPlayers={ungroupedPlayers} />;
}
