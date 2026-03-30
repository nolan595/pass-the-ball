export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-dvh"
      style={{
        background: "var(--gradient-bg)",
        backgroundAttachment: "fixed",
        color: "var(--text-primary)",
        fontFamily: "var(--font-display)",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/*
        Single centred column — intentionally narrow, like a phone UI in a browser.
        The gradient fills the full viewport background. The column gets a little
        wider on larger screens but stays phone-proportioned.
      */}
      <div
        className="mx-auto w-full relative"
        style={{
          maxWidth: "var(--player-max-w, 375px)",
          minHeight: "100dvh",
          paddingBottom: "64px",
        }}
      >
        {children}
      </div>

      <style>{`
        @media (min-width: 480px)  { :root { --player-max-w: 440px; } }
        @media (min-width: 640px)  { :root { --player-max-w: 500px; } }
        @media (min-width: 768px)  { :root { --player-max-w: 540px; } }
        @media (min-width: 1024px) { :root { --player-max-w: 560px; } }
        @media (min-width: 1280px) { :root { --player-max-w: 580px; } }
      `}</style>
    </div>
  );
}
