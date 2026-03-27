-- AlterTable
ALTER TABLE "games" ADD COLUMN     "sgaPrice" DOUBLE PRECISION,
ADD COLUMN     "sgaStatus" TEXT,
ADD COLUMN     "sgaUuid" TEXT;

-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picks" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "marketId" INTEGER NOT NULL,
    "oddUuid" TEXT NOT NULL,
    "oddName" TEXT NOT NULL,
    "marketName" TEXT NOT NULL,
    "oddPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "picks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_slug_key" ON "players"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "picks_gameId_playerId_key" ON "picks"("gameId", "playerId");

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picks" ADD CONSTRAINT "picks_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
