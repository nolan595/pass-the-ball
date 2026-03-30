function TeamDot({ name }: { name: string }) {
  // Simple deterministic colour from first char
  const colours = ["#C0392B", "#D4820A", "#00C48C", "#6366f1", "#f43f5e", "#0ea5e9"];
  const idx = (name.charCodeAt(0) ?? 0) % colours.length;
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: colours[idx],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        fontWeight: 700,
        color: "#fff",
        flexShrink: 0,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export function MatchCard({
  homeTeam,
  awayTeam,
  competition,
  matchDate,
}: {
  homeTeam: string;
  awayTeam: string;
  competition?: string;
  matchDate?: string;
}) {
  return (
    <div
      style={{
        background: "var(--color-match-card-bg)",
        borderRadius: "12px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <TeamDot name={homeTeam} />
      <div style={{ flex: 1, textAlign: "center", minWidth: 0 }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: "15px",
            color: "#FFFFFF",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {homeTeam} vs {awayTeam}
        </p>
        {(competition || matchDate) && (
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              margin: "3px 0 0",
            }}
          >
            {[competition, matchDate].filter(Boolean).join(" — ")}
          </p>
        )}
      </div>
      <TeamDot name={awayTeam} />
    </div>
  );
}
