"use client";

export function CTAButton({
  label,
  disabled,
  loading,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: "calc(100% - 32px)",
        margin: "0 16px",
        height: "48px",
        borderRadius: "999px",
        border: "none",
        fontSize: "16px",
        fontWeight: 600,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "background 0.15s, opacity 0.15s",
        background: disabled ? "var(--color-cta-disabled)" : "var(--cta-red)",
        color: disabled ? "rgba(255,255,255,0.3)" : "#FFFFFF",
        fontFamily: "var(--font-display)",
      }}
    >
      {loading ? "Confirming…" : label}
    </button>
  );
}
