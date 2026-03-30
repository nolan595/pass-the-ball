export function Badge({
  label,
  variant = "amber",
}: {
  label: string;
  variant?: "green" | "amber";
}) {
  return (
    <span
      style={{
        borderRadius: "999px",
        padding: "3px 8px",
        fontWeight: 700,
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#FFFFFF",
        background: variant === "green" ? "#00C48C" : "#D4820A",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
