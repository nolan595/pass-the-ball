import { prisma } from "@/lib/prisma";
import { NewGameForm } from "./NewGameForm";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewGamePage() {
  const events = await prisma.externalEvent.findMany({
    where: { matchDate: { gte: new Date() } },
    orderBy: { matchDate: "asc" },
  });

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/games">
            <ArrowLeft className="w-4 h-4" />
            Games
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Game</h1>
          <p className="text-sm text-slate-500 mt-0.5">Configure a new PassTheBall round</p>
        </div>
      </div>

      {events.length === 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
          No events registered yet.{" "}
          <Link href="/events" className="font-semibold underline">
            Register an event first
          </Link>{" "}
          before creating a game.
        </div>
      )}

      <NewGameForm events={events} />
    </div>
  );
}
