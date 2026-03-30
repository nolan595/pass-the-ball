import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export function FixedHeader({
  state,
  waitingForName,
  backHref,
}: {
  state: "YOUR_TURN" | "WAITING" | "RESULT" | "HISTORY";
  waitingForName?: string;
  backHref?: string;
}) {
  const headline =
    state === "YOUR_TURN"
      ? "FINISH YOUR TURN"
      : state === "WAITING"
      ? `WAITING FOR ${waitingForName?.toUpperCase() ?? "PLAYER"} TO PICK`
      : state === "HISTORY"
      ? "MY PICKS"
      : "RESULTS";

  const subtext =
    state === "YOUR_TURN" || state === "WAITING"
      ? "Your friends have added their legs, it's your turn to lock in your selections!"
      : state === "HISTORY"
      ? "Your pick history across all rounds."
      : null;

  return (
    <div
      className="sticky top-0 z-40"
      style={{
        minHeight: "115px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
        background: "var(--gradient-bg)",
        backgroundAttachment: "fixed",
      }}
    >
      {backHref && (
        <Link
          href={backHref}
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            color: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ChevronLeft size={20} />
        </Link>
      )}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(22px, 4vw, 32px)",
          textTransform: "uppercase",
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {headline}
      </h1>
      {subtext && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            textAlign: "center",
            maxWidth: "340px",
            margin: "6px 0 0",
            lineHeight: 1.4,
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
