"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/app/(player)/components/Badge";

export type HistoryPick = {
  playerName: string;
  marketName: string;
  oddName: string;
  oddPrice: number;
  isMe: boolean;
};

export type HistoryRound = {
  id: number;
  date: string;
  gameName: string;
  result: "win" | "loss" | "pending";
  prizeAmount?: number;
  picks: HistoryPick[];
};

type Tab = "all" | "won" | "lost";

export function HistoryView({ rounds }: { rounds: HistoryRound[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const filtered = rounds.filter((r) => {
    if (activeTab === "won") return r.result === "win";
    if (activeTab === "lost") return r.result === "loss";
    return true;
  });

  function toggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: "All Rounds" },
    { id: "won", label: "Won" },
    { id: "lost", label: "Lost" },
  ];

  return (
    <div style={{ padding: "16px" }}>
      {/* Tab strip */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s, border 0.15s",
              background: activeTab === tab.id ? "#C0392B" : "transparent",
              color: "#FFFFFF",
              border: activeTab === tab.id ? "1px solid #C0392B" : "1px solid rgba(255,255,255,0.25)",
              fontFamily: "var(--font-display)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: "14px", color: "var(--text-muted)", textAlign: "center", padding: "32px 0" }}>
          No rounds yet.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((round) => {
          const isExpanded = expandedIds.has(round.id);
          return (
            <div
              key={round.id}
              style={{
                background: "var(--color-card-surface)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "16px",
              }}
            >
              <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 8px" }}>{round.date}</p>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {round.result === "win" && round.prizeAmount ? (
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "var(--color-gold)",
                        margin: "0 0 4px",
                      }}
                    >
                      £{round.prizeAmount.toLocaleString()}
                    </p>
                  ) : round.result === "loss" ? (
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "var(--color-gold)",
                        margin: "0 0 4px",
                      }}
                    >
                      NO WIN
                    </p>
                  ) : (
                    <Badge label="Pending" variant="amber" />
                  )}
                  {round.result === "win" && (
                    <p style={{ fontSize: "14px", color: "#FFFFFF", margin: 0 }}>Come back and keep it going!</p>
                  )}
                  {round.result === "loss" && (
                    <p style={{ fontSize: "14px", color: "#FFFFFF", margin: 0 }}>Come back next time to try again</p>
                  )}
                </div>
                <Badge label={round.gameName} variant="amber" />
              </div>

              {/* View picks toggle */}
              <button
                onClick={() => toggleExpand(round.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  padding: "4px 0 0",
                  fontFamily: "var(--font-display)",
                }}
              >
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                View picks
              </button>

              {isExpanded && round.picks.length > 0 && (
                <div
                  style={{
                    marginTop: "12px",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    paddingTop: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {round.picks.map((pick, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                        padding: "8px",
                        borderRadius: "8px",
                        background: pick.isMe ? "rgba(0,196,140,0.08)" : "transparent",
                        border: pick.isMe ? "1px solid rgba(0,196,140,0.20)" : "1px solid transparent",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", margin: "0 0 2px" }}>
                          {pick.playerName}
                          {pick.isMe && (
                            <span style={{ color: "var(--accent-green)", marginLeft: "4px" }}>(you)</span>
                          )}
                        </p>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", margin: "0 0 1px" }}>{pick.oddName}</p>
                        <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>{pick.marketName}</p>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          fontSize: "13px",
                          color: "var(--accent-green)",
                          flexShrink: 0,
                        }}
                      >
                        {pick.oddPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
