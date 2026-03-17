"use client";

import { useState } from "react";
import { createGame } from "../actions";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import Link from "next/link";
import type { ExternalEvent } from "@/app/generated/prisma";

type Props = { events: ExternalEvent[] };

export function NewGameForm({ events }: Props) {
  const [openTime, setOpenTime]   = useState("");
  const [closeTime, setCloseTime] = useState("");

  return (
    <Card>
      <CardHeader>
        <span className="text-sm font-semibold text-slate-700">Game Details</span>
      </CardHeader>
      <CardBody>
        <form action={createGame} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
              Round Name
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Man City vs Arsenal — MW32"
              className="w-full h-9 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-400 bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
              External Event
            </label>
            <select
              name="eventId"
              required
              disabled={events.length === 0}
              className="w-full h-9 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-400 bg-white disabled:opacity-50 transition-all"
            >
              <option value="">Select an event…</option>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
                Round Start
              </label>
              <DateTimePicker
                value={openTime}
                onChange={setOpenTime}
                placeholder="Pick open time…"
              />
              <input type="hidden" name="openTime" value={openTime} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
                Round End
              </label>
              <DateTimePicker
                value={closeTime}
                onChange={setCloseTime}
                placeholder="Pick close time…"
              />
              <input type="hidden" name="closeTime" value={closeTime} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
              Prize Type
            </label>
            <select
              name="prizeType"
              required
              className="w-full h-9 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-400 bg-white transition-all"
            >
              <option value="">Select prize type…</option>
              <option value="FREE_BET">Free Bet (uses VD default bonus ID)</option>
              <option value="CASH">Cash (requires bonus ID)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
              Bonus ID{" "}
              <span className="text-slate-400 normal-case tracking-normal font-normal">
                (required for Cash prizes)
              </span>
            </label>
            <input
              name="bonusId"
              placeholder="e.g. BONUS_12345"
              className="w-full h-9 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-400 bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
              Multiplier
            </label>
            <input
              name="multiplier"
              type="number"
              step="0.1"
              min="0.1"
              defaultValue="1.0"
              required
              className="w-full h-9 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-400 bg-white transition-all"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={events.length === 0} className="flex-1">
              Create Game
            </Button>
            <Button asChild variant="secondary">
              <Link href="/games">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
