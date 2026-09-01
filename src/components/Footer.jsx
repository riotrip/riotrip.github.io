import { COLORS } from "../constants";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: "24px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: COLORS.muted,
        }}
      >
        © 2025 Rio Tri Prayogo
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: COLORS.muted,
        }}
      >
        ID
      </span>
    </footer>
  );
}
