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

async function main() {
  const group = await prisma.group.upsert({
    where: { slug: "hunch" },
    update: { name: "Hunch" },
    create: { name: "Hunch", slug: "hunch" },
  });

  const players = [
    { displayName: "Rob", slug: "rob" },
    { displayName: "Renata", slug: "renata" },
    { displayName: "Mark", slug: "mark" },
    { displayName: "Dmytro", slug: "dmytro" },
  ];

  for (const p of players) {
    await prisma.player.upsert({
      where: { slug: p.slug },
      update: { displayName: p.displayName, groupId: group.id },
      create: { displayName: p.displayName, slug: p.slug, groupId: group.id },
    });
  }

  console.log(`✓ Group "Hunch" — Rob, Renata, Mark, Dmytro`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
