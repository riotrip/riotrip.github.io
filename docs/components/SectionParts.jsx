import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES, SPRITES } from "../theme/tokens";

export function AreaMarker({ mapArea, spriteMarker, rightLabel }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <span
        style={{
          fontFamily: FONTS.pixelDisplay,
          fontSize: "8px",
          color: PIXEL_COLORS.accentCyan,
          letterSpacing: "1px",
        }}
      >
        {mapArea}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={SPRITES[spriteMarker || "south"]}
          alt="Marker sprite"
          style={{ width: "24px", height: "24px", imageRendering: "pixelated" }}
        />
        <span
          style={{
            fontFamily: FONTS.pixelDisplay,
            fontSize: "8px",
            color: PIXEL_COLORS.textMuted,
          }}
        >
          {rightLabel}
        </span>
      </div>
    </div>
  );
}

export function SectionDialog({ children, padding = "28px" }) {
  return (
    <div style={{ ...PIXEL_BOX_STYLES.dialog, padding }}>
      {children}
    </div>
  );
}

export function SectionHeading({ title, subtitle }) {
  return (
    <div
      style={{
        borderBottom: `2px solid ${PIXEL_COLORS.border}`,
        paddingBottom: "16px",
        marginBottom: "24px",
      }}
    >
      <h2
        style={{
          fontFamily: FONTS.pixelDisplay,
          fontSize: "13px",
          color: PIXEL_COLORS.accent,
          letterSpacing: "1px",
          margin: "0 0 6px",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: FONTS.companionMono,
            fontSize: "11px",
            color: PIXEL_COLORS.textDim,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function SectionFrame({ id, children }) {
  return (
    <section
      id={id}
      style={{
        padding: "64px 0",
        borderTop: `2px dashed ${PIXEL_COLORS.border}`,
      }}
    >
      {children}
    </section>
  );
}