export type RingPlayer = {
  name: string;
  won: boolean;
  refunded?: boolean;
};

function deg2rad(d: number) {
  return (d * Math.PI) / 180;
}

function ptOnCircle(cx: number, cy: number, r: number, deg: number) {
  const rad = deg2rad(deg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = ptOnCircle(cx, cy, r, startDeg);
  const e = ptOnCircle(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x.toFixed(3)} ${s.y.toFixed(3)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(3)} ${e.y.toFixed(3)}`;
}

export function ScoreRing({ players }: { players: RingPlayer[] }) {
  const n = players.length || 4;
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 16;
  const r = (size - strokeWidth) / 2 - 6;
  const gapDeg = 8;
  const segDeg = 360 / n - gapDeg;

  const wonCount = players.filter((p) => p.won).length;

  // Extra canvas padding so names outside the ring aren't clipped
  const padX = 80;
  const padY = 56;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg
        width={size + padX * 2}
        height={size + padY * 2}
        viewBox={`${-padX} ${-padY} ${size + padX * 2} ${size + padY * 2}`}
      >
        {players.map((player, i) => {
          // Arc boundaries at cardinal points (12→3, 3→6, 6→9, 9→12)
          const boundaryDeg = i * (360 / n) - 90;
          const startDeg = boundaryDeg + gapDeg / 2;
          const endDeg = startDeg + segDeg;

          // Midpoint of the arc — dot and name sit here
          const midDeg = startDeg + segDeg / 2;

          const color = player.refunded ? "#6B7280" : player.won ? "#00C48C" : "#E8725A";

          // Dot sits at the midpoint of the arc
          const dot = ptOnCircle(cx, cy, r, midDeg);

          // Name outside the ring at the same midpoint angle
          const nameDist = r + strokeWidth / 2 + 22;
          const namePt = ptOnCircle(cx, cy, nameDist, midDeg);
          const anchor =
            namePt.x < cx - 6 ? "end" : namePt.x > cx + 6 ? "start" : "middle";

          return (
            <g key={i}>
              {/* Coloured arc segment */}
              <path
                d={arcPath(cx, cy, r, startDeg, endDeg)}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
              />

              {/* Junction dot */}
              <circle cx={dot.x} cy={dot.y} r={11} fill={color} />
              <text
                x={dot.x}
                y={dot.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="9"
                fontWeight="900"
                fill="#FFFFFF"
              >
                {player.refunded ? "~" : player.won ? "✓" : "✗"}
              </text>

              {/* Player name */}
              <text
                x={namePt.x}
                y={namePt.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="700"
                fontStyle="italic"
                fontFamily="var(--font-display)"
                fill="#FFFFFF"
                style={{ textTransform: "uppercase" } as React.CSSProperties}
              >
                {player.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Centre score */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="44"
          fontWeight="700"
          fontStyle="italic"
          fontFamily="var(--font-display)"
          fill={wonCount === n ? "#FFFFFF" : "#E8725A"}
        >
          {wonCount}/{n}
        </text>
      </svg>
    </div>
  );
}
