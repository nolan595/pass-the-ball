import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DisplayType } from "@/app/generated/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDisplayType(dt: DisplayType): string {
  const map: Record<DisplayType, string> = {
    ONE_X_TWO: "1×2",
    OVER_UNDER: "Over / Under",
    ONE_FROM_TWO: "1 from 2",
    PLAYER_PROPS: "Player Props",
    PLAYER_PROPS_SINGLE: "Player Props Single",
  };
  return map[dt];
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
