-- CreateTable
CREATE TABLE "game_group_prices" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,
    "sgaUuid" TEXT,
    "sgaStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_group_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_group_prices_gameId_groupId_key" ON "game_group_prices"("gameId", "groupId");

-- AddForeignKey
ALTER TABLE "game_group_prices" ADD CONSTRAINT "game_group_prices_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_group_prices" ADD CONSTRAINT "game_group_prices_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
