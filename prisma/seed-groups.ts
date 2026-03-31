import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

const GROUPS = [
  {
    name: "Superbet",
    slug: "superbet",
    players: [
      { displayName: "Josh", slug: "josh" },
      { displayName: "Marco", slug: "marco" },
      { displayName: "Luiz", slug: "luiz" },
      { displayName: "Marcelo", slug: "marcelo" },
    ],
  },
  {
    name: "Polytech",
    slug: "polytech",
    players: [
      { displayName: "dev1", slug: "dev1" },
      { displayName: "dev2", slug: "dev2" },
      { displayName: "dev3", slug: "dev3" },
      { displayName: "dev4", slug: "dev4" },
    ],
  },
];

async function main() {
  for (const groupData of GROUPS) {
    const group = await prisma.group.upsert({
      where: { slug: groupData.slug },
      update: { name: groupData.name },
      create: { name: groupData.name, slug: groupData.slug },
    });

    for (const playerData of groupData.players) {
      await prisma.player.upsert({
        where: { slug: playerData.slug },
        update: { displayName: playerData.displayName, groupId: group.id },
        create: { displayName: playerData.displayName, slug: playerData.slug, groupId: group.id },
      });
    }

    console.log(`✓ Group "${group.name}" — ${groupData.players.length} players`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
