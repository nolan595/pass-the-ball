"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteGame } from "../actions";

interface Props {
  gameId: number;
  gameStatus: string;
}

export function DeleteGameDetailButton({ gameId, gameStatus }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const canDelete = gameStatus === "DRAFT" || gameStatus === "PENDING";

  if (!canDelete) return null;

  function handleClick() {
    if (!window.confirm("Delete this game? This cannot be undone.")) return;
    startTransition(async () => {
      try {
        await deleteGame(gameId);
        router.push("/games");
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete game");
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Delete game"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
      Delete Round
    </button>
  );
}
