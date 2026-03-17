import { prisma } from "@/lib/prisma";
import { fetchEvent } from "@/lib/offer-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GameControls } from "./GameControls";
import { MarketView } from "./MarketView";
import { formatDateTime, formatDisplayType } from "@/lib/utils";
import { ArrowLeft, Calendar, Trophy, Zap } from "lucide-react";
import type { GameStatus } from "@/app/generated/prisma";

const statusVariant: Record<GameStatus, "neutral" | "warning" | "success" | "info" | "danger"> = {
  DRAFT: "neutral",
  PENDING: "warning",
  OPEN: "success",
  CLOSED: "info",
  COMPLETED: "neutral",
};

const statusNext: Record<GameStatus, string | null> = {
  DRAFT: "Mark Pending",
  PENDING: "Open Game",
  OPEN: "Close Game",
  CLOSED: "Complete Game",
  COMPLETED: null,
};

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameId = parseInt(id);
  if (isNaN(gameId)) notFound();

  const [game, markets] = await Promise.all([
    prisma.game.findUnique({
      where: { id: gameId },
      include: { event: true },
    }),
    prisma.market.findMany({
      where: { enabled: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  if (!game) notFound();

  // Fetch live event data for OPEN/CLOSED/COMPLETED games
  const isLive = game.status === "OPEN" || game.status === "PENDING";
  const isResulted = game.status === "CLOSED" || game.status === "COMPLETED";
  const event = isLive || isResulted
    ? await fetchEvent(game.event.externalEventId, isResulted)
    : null;

  const odds = isResulted ? (event?.oddsResults ?? []) : (event?.odds ?? []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/games">
              <ArrowLeft className="w-4 h-4" />
              Games
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-slate-900">{game.name}</h1>
              <Badge variant={statusVariant[game.status]}>{game.status}</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{game.event.name}</p>
          </div>
        </div>
        {statusNext[game.status] && (
          <GameControls gameId={game.id} status={game.status} label={statusNext[game.status]!} />
        )}
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Start</p>
          <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            {formatDateTime(game.openTime)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">End</p>
          <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {formatDateTime(game.closeTime)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Multiplier</p>
          <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            ×{game.multiplier}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Prize Type</p>
          <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-emerald-500" />
            {game.prizeType === "FREE_BET" ? "Free Bet" : `Cash`}
            {game.bonusId && (
              <span className="font-mono text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                {game.bonusId}
              </span>
            )}
          </p>
        </Card>
      </div>

      {/* Event status alert */}
      {event && (
        <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <div className="text-sm text-indigo-800">
            <span className="font-semibold">{event.matchName}</span>
            {event.metadata?.status && (
              <span className="ml-2 text-indigo-600">· {event.metadata.status}</span>
            )}
            {(event.metadata?.homeTeamScore !== undefined) && (
              <span className="ml-2 font-mono font-bold">
                {event.metadata.homeTeamScore} – {event.metadata.awayTeamScore}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Markets */}
      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-slate-700">
            Active Markets ({markets.length})
          </span>
          {!event && game.status === "DRAFT" && (
            <span className="text-xs text-slate-400">
              Live odds will appear when game is opened
            </span>
          )}
        </CardHeader>

        {markets.length === 0 ? (
          <CardBody>
            <div className="text-center py-10">
              <p className="text-sm text-slate-500">
                No markets enabled.{" "}
                <Link href="/markets" className="text-indigo-600 font-medium hover:underline">
                  Configure markets
                </Link>{" "}
                first.
              </p>
            </div>
          </CardBody>
        ) : (
          <div className="divide-y divide-slate-50">
            {markets.map((market) => {
              const marketOdds = odds.filter((o) => o.marketId === market.marketId);
              return (
                <MarketView
                  key={market.id}
                  market={market}
                  odds={marketOdds}
                  showResults={isResulted}
                />
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
