"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteGame } from "./actions";

interface Props {
  gameId: number;
  gameStatus: string;
}

export function DeleteGameButton({ gameId, gameStatus }: Props) {
  const [isPending, startTransition] = useTransition();
  const canDelete = gameStatus === "DRAFT" || gameStatus === "PENDING";

  if (!canDelete) return null;

  function handleClick() {
    if (!window.confirm("Delete this game? This cannot be undone.")) return;
    startTransition(async () => {
      try {
        await deleteGame(gameId);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete game");
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Delete game"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
