"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { advanceGameStatus } from "../actions";
import type { GameStatus } from "@/app/generated/prisma";
import { ChevronRight } from "lucide-react";

export function GameControls({
  gameId,
  status,
  label,
}: {
  gameId: number;
  status: GameStatus;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  const variant = status === "OPEN" ? "danger" : "primary";

  function handleAdvance() {
    if (status === "OPEN" && !confirm("Close this game? This cannot be undone.")) return;
    startTransition(() => advanceGameStatus(gameId));
  }

  return (
    <Button variant={variant} loading={pending} onClick={handleAdvance}>
      {label}
      <ChevronRight className="w-4 h-4" />
    </Button>
  );
}
