"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { Badge } from "./Badge";

export type GroupPick = {
  playerId: number;
  playerSlug: string;
  playerName: string;
  marketName?: string;
  oddName?: string;
  oddPrice?: number;
  confirmed: boolean;
};

export function GroupPanel({
  groupName,
  totalPlayers,
  picks,
  currentPlayerSlug,
  timeRemaining,
  combinedPrice,
  turnPlayerName,
}: {
  groupName: string;
  totalPlayers: number;
  picks: GroupPick[];
  currentPlayerSlug: string;
  timeRemaining?: string;
  combinedPrice?: number;
  turnPlayerName?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const confirmedCount = picks.filter((p) => p.confirmed).length;

  // Build a full player list in pick order — confirmed ones + pending slots
  const allPlayerNames = picks.map((p) => p.playerName);

  // Progress bar segments
  const segments = Array.from({ length: totalPlayers }, (_, i) => i < confirmedCount);

  return (
    <div
      style={{
        background: "var(--color-card-surface)",
        borderRadius: "12px",
        padding: "14px 16px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
          <span style={{ fontWeight: 700, fontSize: "16px", color: "#FFFFFF", wordBreak: "break-word" }}>{groupName}</span>
          {turnPlayerName && (
            <Badge
              label={turnPlayerName === "You" ? "YOUR TURN" : `${turnPlayerName.toUpperCase()}'S TURN`}
              variant={turnPlayerName === "You" ? "green" : "amber"}
            />
          )}
        </div>
        {timeRemaining && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
            <Clock size={12} color="var(--text-muted)" />
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{timeRemaining}</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
        {segments.map((filled, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "2px",
              background: filled ? "var(--color-progress-fill)" : "var(--color-progress-empty)",
            }}
          />
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          👥 {confirmedCount}/{totalPlayers} Picks
        </span>
        {combinedPrice !== undefined && combinedPrice > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Combined Price</span>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                color: "var(--accent-green)",
                fontWeight: 700,
              }}
            >
              {combinedPrice.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "12px",
          color: "var(--text-muted)",
          padding: 0,
        }}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? "Hide group picks" : "Show group picks"}
      </button>

      {/* Expanded picks list */}
      {expanded && (
        <div style={{ marginTop: "12px", position: "relative" }}>
          {/* Vertical connector line */}
          <div
            style={{
              position: "absolute",
              left: "5px",
              top: "8px",
              bottom: "8px",
              width: "2px",
              background: "var(--text-muted)",
              opacity: 0.3,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {picks.map((pick) => {
              const isMe = pick.playerSlug === currentPlayerSlug;
              return (
                <div key={pick.playerId} style={{ display: "flex", alignItems: "center", paddingLeft: "20px", gap: "10px" }}>
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "2px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: pick.confirmed ? "var(--accent-green)" : "var(--text-muted)",
                      opacity: pick.confirmed ? 1 : 0.5,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, fontSize: "14px", color: "#FFFFFF" }}>
                      {pick.playerName}
                      {isMe && <span style={{ color: "var(--accent-green)", marginLeft: "4px" }}>(you)</span>}
                    </span>
                    {pick.confirmed && pick.marketName && (
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "1px 0 0" }}>
                        {pick.marketName} • {pick.oddName}
                      </p>
                    )}
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {pick.confirmed && pick.oddPrice ? (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "14px",
                          color: "#FFFFFF",
                          fontWeight: 700,
                        }}
                      >
                        {pick.oddPrice.toFixed(2)}
                      </span>
                    ) : (
                      <Badge label="PENDING" variant="amber" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
