export type RingPlayer = {
  name: string;
  won: boolean;
};

export function ScoreRing({ players }: { players: RingPlayer[] }) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const n = players.length || 4;
  const gapDeg = 8; // degrees of gap between segments
  const segmentDeg = 360 / n - gapDeg;
  const segmentLen = (segmentDeg / 360) * circumference;
  const gapLen = (gapDeg / 360) * circumference;

  const wonCount = players.filter((p) => p.won).length;

  // Corner label positions (relative to centre)
  const labelPositions = [
    { x: cx - radius - strokeWidth - 8, y: cy - radius - strokeWidth - 8, anchor: "end" as const },   // top-left
    { x: cx + radius + strokeWidth + 8, y: cy - radius - strokeWidth - 8, anchor: "start" as const }, // top-right
    { x: cx - radius - strokeWidth - 8, y: cy + radius + strokeWidth + 24, anchor: "end" as const },  // bottom-left
    { x: cx + radius + strokeWidth + 8, y: cy + radius + strokeWidth + 24, anchor: "start" as const }, // bottom-right
  ];

  // Badge positions at segment midpoints
  const badgePositions = [
    { x: cx - 20, y: cy - radius - 4 },  // top
    { x: cx + radius + 4, y: cy - 8 },   // right
    { x: cx - 8, y: cy + radius + 14 },  // bottom
    { x: cx - radius - 20, y: cy - 8 },  // left
  ];

  return (
    <div style={{ position: "relative", width: `${size + 80}px`, height: `${size + 60}px`, margin: "0 auto" }}>
      <svg
        width={size + 80}
        height={size + 60}
        viewBox={`-40 -30 ${size + 80} ${size + 60}`}
        style={{ overflow: "visible" }}
      >
        {players.map((player, i) => {
          const startDeg = i * (360 / n) - 90 + gapDeg / 2;
          const color = player.won ? "#00C48C" : "#E8725A";
          const label = labelPositions[i % 4];
          const badge = badgePositions[i % 4];

          return (
            <g key={i}>
              {/* Arc segment */}
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLen} ${circumference - segmentLen}`}
                strokeDashoffset={-(((startDeg + 90) / 360) * circumference)}
                transform={`rotate(${startDeg - 90}, ${cx}, ${cy})`}
                strokeLinecap="butt"
              />

              {/* Win/Loss badge circle */}
              <circle
                cx={badge.x + 8}
                cy={badge.y - 8}
                r={10}
                fill={player.won ? "#00C48C" : "#E8725A"}
              />
              <text
                x={badge.x + 8}
                y={badge.y - 8}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                fontWeight="900"
                fill="#FFFFFF"
              >
                {player.won ? "✓" : "✗"}
              </text>

              {/* Player name label */}
              {label && (
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  fontSize="11"
                  fontWeight="700"
                  fontStyle="italic"
                  fontFamily="var(--font-display)"
                  fill="#FFFFFF"
                  style={{ textTransform: "uppercase" }}
                >
                  {player.name.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {/* Centre text */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="40"
          fontWeight="700"
          fontFamily="var(--font-display)"
          fill={wonCount === n ? "#FFFFFF" : "#E8725A"}
        >
          {wonCount}/{n}
        </text>
      </svg>
    </div>
  );
}
