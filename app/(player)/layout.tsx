export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--bg-primary)",
        fontFamily: "var(--font-display)",
        color: "var(--text-primary)",
      }}
    >
      {children}
    </div>
  );
}
