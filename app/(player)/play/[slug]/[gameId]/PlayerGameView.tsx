"use client";

import { useState, useTransition } from "react";
import { submitPick } from "./actions";
import type { Market } from "@/app/generated/prisma";
import type { OfferOutcome } from "@/lib/offer-api";
import { ChevronUp, ChevronDown, CheckCircle, Lock } from "lucide-react";

export type OtherPickInfo = {
  oddUuid: string;
  playerDisplayName: string;
  playerIndex: number;
};

const PLAYER_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e"];

// ── Selectable odd button ──────────────────────────────────────────────────────
function OddButton({
  odd,
  isSelected,
  onSelect,
  locked,
  isUnavailable,
  takenBy,
}: {
  odd: OfferOutcome | null;
  isSelected: boolean;
  onSelect: (odd: OfferOutcome) => void;
  locked: boolean;
  isUnavailable?: boolean;
  takenBy?: OtherPickInfo;
}) {
  if (!odd) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 8px",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.04)",
          border: "1px dashed rgba(255,255,255,0.1)",
        }}
      >
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>—</span>
      </div>
    );
  }

  const disabled = locked || isUnavailable || !!takenBy;
  const color = takenBy
    ? (PLAYER_COLORS[takenBy.playerIndex % PLAYER_COLORS.length] ?? PLAYER_COLORS[0])
    : null;
  const initial = takenBy ? takenBy.playerDisplayName.charAt(0).toUpperCase() : null;

  const selectedBg = isSelected
    ? { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }
    : {};

  const baseBg = takenBy
    ? { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", opacity: 0.5 }
    : isUnavailable
    ? { background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.06)", opacity: 0.3 }
    : locked
    ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", opacity: 0.4 }
    : isSelected
    ? selectedBg
    : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" };

  return (
    <button
      onClick={() => !disabled && onSelect(odd)}
      disabled={disabled}
      title={
        takenBy
          ? `Taken by ${takenBy.playerDisplayName}`
          : isUnavailable
          ? "Can't combine with existing picks"
          : undefined
      }
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 8px",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.1s, border 0.1s",
        userSelect: "none",
        ...baseBg,
      }}
    >
      {takenBy && color && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-6px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "9px",
            fontWeight: 900,
            color: "#FFFFFF",
            background: color,
            zIndex: 10,
          }}
        >
          {initial}
        </span>
      )}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "16px",
          fontWeight: 700,
          color: isSelected
            ? "#FFFFFF"
            : takenBy
            ? "rgba(255,255,255,0.3)"
            : isUnavailable
            ? "rgba(255,255,255,0.2)"
            : "rgba(255,255,255,0.85)",
          textDecoration: isUnavailable ? "line-through" : "none",
        }}
      >
        {odd.price > 0 ? odd.price.toFixed(2) : "—"}
      </span>
    </button>
  );
}

// ── Market card ────────────────────────────────────────────────────────────────
function MarketCard({
  market,
  displayName,
  odds,
  selectedUuid,
  onSelect,
  locked,
  unavailableUuids,
  takenMap,
  isSuperSub,
}: {
  market: Market;
  displayName: string;
  odds: OfferOutcome[];
  selectedUuid: string | null;
  onSelect: (odd: OfferOutcome, market: Market, displayName: string) => void;
  locked: boolean;
  unavailableUuids: Set<string>;
  takenMap: Map<string, OtherPickInfo>;
  isSuperSub?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const hasSelection = odds.some((o) => o.uuid === selectedUuid);

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "var(--color-match-card-bg)",
        border: hasSelection
          ? "1px solid rgba(255,255,255,0.25)"
          : "1px solid rgba(255,255,255,0.07)",
        transition: "border 0.15s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
          {hasSelection && (
            <CheckCircle size={14} style={{ color: "var(--accent-green)", flexShrink: 0 }} />
          )}
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {displayName}
          </span>
          {isSuperSub && (
            <span
              style={{
                flexShrink: 0,
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "9px",
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "rgba(217,119,6,0.15)",
                color: "#fbbf24",
                border: "1px solid rgba(217,119,6,0.25)",
              }}
            >
              SuperSub
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          style={{
            color: "rgba(255,255,255,0.35)",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "12px",
            flexShrink: 0,
            padding: 0,
          }}
        >
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {!collapsed && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "14px 16px 16px",
          }}
        >
          {odds.length === 0 ? (
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", padding: "4px 0" }}>
              No odds available
            </p>
          ) : market.displayType === "ONE_X_TWO" ? (
            <OneXTwo
              odds={odds}
              selectedUuid={selectedUuid}
              onSelect={(o) => onSelect(o, market, displayName)}
              locked={locked}
              unavailableUuids={unavailableUuids}
              takenMap={takenMap}
            />
          ) : market.displayType === "OVER_UNDER" ? (
            <OverUnder
              odds={odds}
              selectedUuid={selectedUuid}
              onSelect={(o) => onSelect(o, market, displayName)}
              locked={locked}
              unavailableUuids={unavailableUuids}
              takenMap={takenMap}
            />
          ) : market.displayType === "ONE_FROM_TWO" ? (
            <OneFromTwo
              odds={odds}
              selectedUuid={selectedUuid}
              onSelect={(o) => onSelect(o, market, displayName)}
              locked={locked}
              unavailableUuids={unavailableUuids}
              takenMap={takenMap}
            />
          ) : (
            <PlayerProps
              odds={odds}
              selectedUuid={selectedUuid}
              onSelect={(o) => onSelect(o, market, displayName)}
              locked={locked}
              unavailableUuids={unavailableUuids}
              takenMap={takenMap}
            />
          )}
        </div>
      )}
    </div>
  );
}

type DisplayProps = {
  odds: OfferOutcome[];
  selectedUuid: string | null;
  onSelect: (o: OfferOutcome) => void;
  locked: boolean;
  unavailableUuids: Set<string>;
  takenMap: Map<string, OtherPickInfo>;
};

const colHeaderStyle = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "var(--text-muted)",
  textAlign: "center" as const,
};

function OneXTwo({ odds, selectedUuid, onSelect, locked, unavailableUuids, takenMap }: DisplayProps) {
  const home = odds.find((o) => o.code === "1") ?? null;
  const draw = odds.find((o) => o.code === "X" || o.name === "X") ?? null;
  const away = odds.find((o) => o.code === "2") ?? null;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px", marginBottom: "8px", padding: "0 2px" }}>
        {["Home", "Draw", "Away"].map((label) => (
          <span key={label} style={colHeaderStyle}>{label}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        <OddButton odd={home} isSelected={home?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={home ? unavailableUuids.has(home.uuid) : false} takenBy={home ? takenMap.get(home.uuid) : undefined} />
        <OddButton odd={draw} isSelected={draw?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={draw ? unavailableUuids.has(draw.uuid) : false} takenBy={draw ? takenMap.get(draw.uuid) : undefined} />
        <OddButton odd={away} isSelected={away?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={away ? unavailableUuids.has(away.uuid) : false} takenBy={away ? takenMap.get(away.uuid) : undefined} />
      </div>
    </div>
  );
}

function OverUnder({ odds, selectedUuid, onSelect, locked, unavailableUuids, takenMap }: DisplayProps) {
  const byTotal = new Map<string, { over: OfferOutcome | null; under: OfferOutcome | null }>();

  for (const o of odds) {
    const total = o.specifiers?.total ?? o.info ?? o.name.replace(/[A-Za-z ]/g, "").trim();
    if (!byTotal.has(total)) byTotal.set(total, { over: null, under: null });
    const entry = byTotal.get(total)!;
    if (o.name.toLowerCase().startsWith("over")) entry.over = o;
    else entry.under = o;
  }

  const rows = Array.from(byTotal.entries()).sort(([a], [b]) => parseFloat(a) - parseFloat(b));
  if (rows.length === 0) return <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>No odds available</p>;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "10px", padding: "0 2px" }}>
        <span style={colHeaderStyle}>Goals</span>
        <span style={colHeaderStyle}>Under</span>
        <span style={colHeaderStyle}>Over</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {rows.map(([total, { over, under }]) => (
          <div key={total} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.6)", paddingLeft: "2px" }}>{total}</span>
            <OddButton odd={under} isSelected={under?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={under ? unavailableUuids.has(under.uuid) : false} takenBy={under ? takenMap.get(under.uuid) : undefined} />
            <OddButton odd={over} isSelected={over?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={over ? unavailableUuids.has(over.uuid) : false} takenBy={over ? takenMap.get(over.uuid) : undefined} />
          </div>
        ))}
      </div>
    </div>
  );
}

function OneFromTwo({ odds, selectedUuid, onSelect, locked, unavailableUuids, takenMap }: DisplayProps) {
  const yes = odds.find((o) => o.name.toLowerCase() === "yes") ?? odds[0] ?? null;
  const no = odds.find((o) => o.name.toLowerCase() === "no") ?? odds[1] ?? null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", maxWidth: "240px" }}>
      <OddButton odd={yes} isSelected={yes?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={yes ? unavailableUuids.has(yes.uuid) : false} takenBy={yes ? takenMap.get(yes.uuid) : undefined} />
      <OddButton odd={no} isSelected={no?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={no ? unavailableUuids.has(no.uuid) : false} takenBy={no ? takenMap.get(no.uuid) : undefined} />
    </div>
  );
}

const PLAYER_PREVIEW = 5;

function PlayerProps({ odds, selectedUuid, onSelect, locked, unavailableUuids, takenMap }: DisplayProps) {
  const [expanded, setExpanded] = useState(false);

  const playerMap = new Map<string, Map<string, OfferOutcome>>();
  for (const o of odds) {
    const player = o.specifiers?.player_name ?? o.name;
    const total = o.specifiers?.total ?? "—";
    if (!playerMap.has(player)) playerMap.set(player, new Map());
    playerMap.get(player)!.set(total, o);
  }

  const allPlayers = Array.from(playerMap.keys());
  const allTotals = Array.from(new Set(odds.map((o) => o.specifiers?.total ?? "—"))).sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  );

  if (allPlayers.length === 0)
    return <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>No odds available</p>;

  const visiblePlayers = expanded ? allPlayers : allPlayers.slice(0, PLAYER_PREVIEW);
  const hiddenCount = allPlayers.length - PLAYER_PREVIEW;
  const colTemplate = `minmax(120px, 1fr) ${allTotals.map(() => "68px").join(" ")}`;

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "max-content", paddingBottom: "2px" }}>
        <div style={{ display: "grid", gap: "8px", marginBottom: "12px", padding: "0 2px", gridTemplateColumns: colTemplate }}>
          <span style={{ ...colHeaderStyle, textAlign: "left" }}>Player</span>
          {allTotals.map((t) => (
            <span key={t} style={colHeaderStyle}>{t}+</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {visiblePlayers.map((player) => (
            <div key={player} style={{ display: "grid", gap: "8px", alignItems: "center", gridTemplateColumns: colTemplate }}>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", paddingRight: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{player}</span>
              {allTotals.map((total) => {
                const odd = playerMap.get(player)?.get(total) ?? null;
                return (
                  <OddButton key={total} odd={odd} isSelected={odd?.uuid === selectedUuid} onSelect={onSelect} locked={locked} isUnavailable={odd ? unavailableUuids.has(odd.uuid) : false} takenBy={odd ? takenMap.get(odd.uuid) : undefined} />
                );
              })}
            </div>
          ))}
        </div>
        {hiddenCount > 0 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              marginTop: "4px",
              width: "100%",
              padding: "12px 0",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.35)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              background: "none",
              border: "none",
              borderTopWidth: "1px",
              borderTopStyle: "solid",
              borderTopColor: "rgba(255,255,255,0.07)",
              cursor: "pointer",
            }}
          >
            {expanded ? "Show Less" : `Show More (${hiddenCount} more)`}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main player view ───────────────────────────────────────────────────────────
export type MarketWithOdds = {
  market: Market;
  odds: OfferOutcome[];
  displayName: string;
};

export function PlayerGameView({
  playerSlug,
  gameId,
  markets,
  unavailableOddsUuids = [],
  otherPickedOdds = [],
  superSubMarketIds = [],
}: {
  playerSlug: string;
  gameId: number;
  markets: MarketWithOdds[];
  unavailableOddsUuids?: string[];
  otherPickedOdds?: OtherPickInfo[];
  superSubMarketIds?: number[];
}) {
  const unavailableSet = new Set(unavailableOddsUuids);
  const takenMap = new Map(otherPickedOdds.map((p) => [p.oddUuid, p]));
  const superSubSet = new Set(superSubMarketIds);
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);
  const [selectedOdd, setSelectedOdd] = useState<OfferOutcome | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [selectedDisplayName, setSelectedDisplayName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSelect(odd: OfferOutcome, market: Market, displayName: string) {
    setSelectedUuid(odd.uuid);
    setSelectedOdd(odd);
    setSelectedMarket(market);
    setSelectedDisplayName(displayName);
    setError(null);
  }

  function handleSubmit() {
    if (!selectedOdd || !selectedMarket) return;
    startTransition(async () => {
      try {
        await submitPick(
          playerSlug,
          gameId,
          selectedMarket.marketId,
          selectedOdd.uuid,
          selectedOdd.name,
          selectedDisplayName ?? selectedMarket.name,
          selectedOdd.price
        );
        setSubmitted(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  }

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "40vh", textAlign: "center", padding: "0 16px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            background: "rgba(0,196,140,0.15)",
          }}
        >
          <Lock size={28} style={{ color: "var(--accent-green)" }} />
        </div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "4px",
            color: "#FFFFFF",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
          }}
        >
          Pick Locked In
        </h2>
        <p style={{ fontSize: "14px", maxWidth: "240px", color: "var(--text-muted)", margin: "0 0 24px" }}>
          Your selection has been saved. Waiting for the other players to pick.
        </p>
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "12px",
            border: "1px solid rgba(0,196,140,0.20)",
            background: "var(--color-card-surface)",
          }}
        >
          <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "4px" }}>
            {selectedDisplayName}
          </p>
          <p style={{ fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>{selectedOdd?.name}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "18px", color: "var(--accent-green)", margin: 0 }}>
            {selectedOdd?.price.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: "120px" }}>
      {/* Separator */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "0 0 12px" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {markets.map(({ market, odds, displayName }) => (
          <MarketCard
            key={market.id}
            market={market}
            displayName={displayName}
            odds={odds}
            selectedUuid={selectedUuid}
            onSelect={handleSelect}
            locked={false}
            unavailableUuids={unavailableSet}
            takenMap={takenMap}
            isSuperSub={superSubSet.has(market.marketId)}
          />
        ))}
      </div>

      {/* Floating CTA bar — matches layout container width via CSS variable */}
      <div
        className="player-cta-bar"
        style={{
          position: "fixed",
          bottom: "64px",
          left: "50%",
          width: "var(--player-max-w, 375px)",
          maxWidth: "100vw",
          padding: "12px 16px 16px",
          background: "rgba(7,7,8,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          zIndex: 45,
          transition: "opacity 0.2s, transform 0.2s",
          opacity: selectedOdd ? 1 : 0,
          pointerEvents: selectedOdd ? "auto" : "none",
          transform: selectedOdd ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(100%)",
        }}
      >
        {error && (
          <p style={{ fontSize: "12px", textAlign: "center", color: "#f87171", marginBottom: "8px" }}>{error}</p>
        )}
        {selectedOdd && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {selectedDisplayName}
              </p>
              <p style={{ fontWeight: 600, fontSize: "14px", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {selectedOdd?.name}
              </p>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "18px", color: "var(--accent-green)", flexShrink: 0 }}>
              {selectedOdd?.price.toFixed(2)}
            </span>
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={!selectedOdd || pending}
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "999px",
            border: "none",
            fontSize: "16px",
            fontWeight: 600,
            cursor: !selectedOdd || pending ? "not-allowed" : "pointer",
            background: !selectedOdd ? "var(--color-cta-disabled)" : "var(--cta-red)",
            color: !selectedOdd ? "rgba(255,255,255,0.3)" : "#FFFFFF",
            fontFamily: "var(--font-display)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.15s",
          }}
        >
          <Lock size={16} />
          {pending ? "Confirming…" : "Confirm this leg"}
        </button>
      </div>
    </div>
  );
}
