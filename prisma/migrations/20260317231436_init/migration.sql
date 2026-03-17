-- CreateEnum
CREATE TYPE "DisplayType" AS ENUM ('ONE_X_TWO', 'OVER_UNDER', 'ONE_FROM_TWO', 'PLAYER_PROPS', 'PLAYER_PROPS_SINGLE');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('DRAFT', 'PENDING', 'OPEN', 'CLOSED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PrizeType" AS ENUM ('CASH', 'FREE_BET');

-- CreateTable
CREATE TABLE "markets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "marketId" INTEGER NOT NULL,
    "displayType" "DisplayType" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "markets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "externalEventId" TEXT NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "external_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'DRAFT',
    "openTime" TIMESTAMP(3) NOT NULL,
    "closeTime" TIMESTAMP(3) NOT NULL,
    "prizeType" "PrizeType" NOT NULL,
    "bonusId" TEXT,
    "multiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "s3Status" TEXT,
    "paymentStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "markets_marketId_key" ON "markets"("marketId");

-- CreateIndex
CREATE UNIQUE INDEX "external_events_externalEventId_key" ON "external_events"("externalEventId");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "external_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
