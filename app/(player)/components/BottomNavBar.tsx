import Link from "next/link";
import { Home, Bookmark } from "lucide-react";

export function BottomNavBar({
  activeTab,
  playerSlug,
  gameId,
}: {
  activeTab: "home" | "picks";
  playerSlug: string;
  gameId?: number;
}) {
  const homeHref = gameId ? `/play/${playerSlug}/${gameId}` : "#";
  const picksHref = `/play/${playerSlug}/history`;

  const activeStyle = { color: "#FFFFFF" };
  const inactiveStyle = { color: "var(--text-muted)" };

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "var(--player-max-w, 375px)",
        maxWidth: "100vw",
        height: "64px",
        background: "var(--color-nav-bg)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        zIndex: 50,
      }}
    >
      <Link
        href={homeHref}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          textDecoration: "none",
          ...(activeTab === "home" ? activeStyle : inactiveStyle),
        }}
      >
        <Home size={20} />
        <span style={{ fontSize: "10px", fontWeight: 600 }}>Home</span>
      </Link>
      <Link
        href={picksHref}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          textDecoration: "none",
          ...(activeTab === "picks" ? activeStyle : inactiveStyle),
        }}
      >
        <Bookmark size={20} />
        <span style={{ fontSize: "10px", fontWeight: 600 }}>My Picks</span>
      </Link>
    </nav>
  );
}
