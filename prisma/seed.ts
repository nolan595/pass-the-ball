import "dotenv/config";
import { prisma } from "../lib/prisma";

const players = [
  { slug: "rob", displayName: "Rob" },
  { slug: "renata", displayName: "Renata" },
  { slug: "mark", displayName: "Mark" },
  { slug: "dmytro", displayName: "Dmytro" },
];

async function main() {
  for (const p of players) {
    await prisma.player.upsert({
      where: { slug: p.slug },
      create: p,
      update: { displayName: p.displayName },
    });
    console.log(`Upserted player: ${p.slug} (${p.displayName})`);
  }
}

main()
  .catch(console.error);
