"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScoreRing, type RingPlayer } from "./ScoreRing";
import { Badge } from "./Badge";

export type ResultPick = {
  playerName: string;
  marketName: string;
  oddName: string;
  oddPrice: number;
  isMe: boolean;
};

export function ResultScreen({
  result,
  players,
  prizeAmount,
  splitAmount,
  groupName,
  picks,
}: {
  result: "win" | "loss";
  players: RingPlayer[];
  prizeAmount?: number;
  splitAmount?: number;
  groupName: string;
  picks: ResultPick[];
}) {
  const [picksExpanded, setPicksExpanded] = useState(false);
  const isWin = result === "win";

  return (
    <div style={{ padding: "24px 16px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      {/* Score ring */}
      <ScoreRing players={players} />

      {/* Result headline */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "24px",
            textTransform: "uppercase",
            color: "#FFFFFF",
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}
        >
          {isWin ? `You Won${prizeAmount ? ` £${prizeAmount.toLocaleString()}` : ""}` : "You Lost This One"}
        </h2>
        <p style={{ fontSize: "14px", color: "#FFFFFF", margin: 0 }}>
          {isWin
            ? `The ${groupName} just won big!`
            : "Better luck next time — keep building that streak."}
        </p>
      </div>

      {/* Prize card */}
      <div
        style={{
          width: "100%",
          background: "var(--color-card-surface)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "16px",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {isWin ? (
          <>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
              <div>
                {prizeAmount && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "var(--color-gold)",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    £{prizeAmount.toLocaleString()}
                  </p>
                )}
                {splitAmount && (
                  <div style={{ marginTop: "6px" }}>
                    <Badge label={`Your split £${splitAmount.toLocaleString()}`} variant="amber" />
                  </div>
                )}
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(0,196,140,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                🏆
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "14px", color: "#FFFFFF" }}>All time high!</span>
              <Badge label={groupName} variant="green" />
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--color-gold)",
                  margin: 0,
                }}
              >
                NO WIN
              </p>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(232,114,90,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                😔
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "#FFFFFF", margin: "0 0 8px" }}>
              Come back next time to try again
            </p>
            <Badge label={groupName} variant="amber" />
          </>
        )}
      </div>

      {/* View picks accordion */}
      <button
        onClick={() => setPicksExpanded((v) => !v)}
        style={{
          width: "100%",
          height: "44px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "transparent",
          color: "#FFFFFF",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          fontFamily: "var(--font-display)",
        }}
      >
        {picksExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        View picks
      </button>

      {picksExpanded && (
        <div
          style={{
            width: "100%",
            background: "var(--color-card-surface)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {picks.map((pick, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
                padding: "8px 10px",
                borderRadius: "8px",
                background: pick.isMe ? "rgba(0,196,140,0.08)" : "transparent",
                border: pick.isMe ? "1px solid rgba(0,196,140,0.20)" : "1px solid transparent",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", margin: "0 0 2px" }}>
                  {pick.playerName}
                  {pick.isMe && <span style={{ color: "var(--accent-green)", marginLeft: "4px" }}>(you)</span>}
                </p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", margin: "0 0 2px" }}>
                  {pick.oddName}
                </p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>{pick.marketName}</p>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "14px",
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
}
