import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils";
import { Plus, Trophy } from "lucide-react";
import { DeleteGameButton } from "./DeleteGameButton";
import type { GameStatus } from "@/app/generated/prisma";

const statusVariant: Record<GameStatus, "neutral" | "warning" | "success" | "info" | "danger"> = {
  DRAFT: "neutral",
  PENDING: "warning",
  OPEN: "success",
  CLOSED: "info",
  COMPLETED: "neutral",
};

export default async function GamesPage() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: "desc" },
    include: { event: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Games</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Create and manage PassTheBall game rounds
          </p>
        </div>
        <Button asChild>
          <Link href="/games/new">
            <Plus className="w-4 h-4" />
            New Game
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-indigo-500" />
            All Games
          </span>
          <span className="text-xs text-slate-400">{games.length} total</span>
        </CardHeader>

        {games.length === 0 ? (
          <CardBody>
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-600">No games yet</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Create your first game to get started
              </p>
              <Button asChild size="sm">
                <Link href="/games/new">
                  <Plus className="w-3.5 h-3.5" />
                  New Game
                </Link>
              </Button>
            </div>
          </CardBody>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Game Name", "Event", "Start", "End", "Multiplier", "Status", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {games.map((game) => (
                  <tr key={game.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-3.5 font-semibold text-slate-900">
                      <Link
                        href={`/games/${game.id}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {game.name}
                      </Link>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 max-w-[180px] truncate">
                      {game.event.name}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 text-xs whitespace-nowrap">
                      {formatDateTime(game.openTime)}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 text-xs whitespace-nowrap">
                      {formatDateTime(game.closeTime)}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                        ×{game.multiplier}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge variant={statusVariant[game.status]}>{game.status}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/games/${game.id}`}>View</Link>
                        </Button>
                        <DeleteGameButton gameId={game.id} gameStatus={game.status} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
