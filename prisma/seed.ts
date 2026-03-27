import "dotenv/config";
import { prisma } from "../lib/prisma";

const players = [
  { slug: "user1", displayName: "Player 1" },
  { slug: "user2", displayName: "Player 2" },
  { slug: "user3", displayName: "Player 3" },
  { slug: "user4", displayName: "Player 4" },
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
