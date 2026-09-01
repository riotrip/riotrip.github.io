import React from "react";
import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES } from "../theme/tokens";
import { AreaMarker, SectionDialog, SectionFrame, SectionHeading } from "./SectionParts";

export default function ContactSection({ config }) {
  const links = config?.data || [];

  return (
    <SectionFrame id="contact">
      <AreaMarker
        mapArea={config?.mapArea || "AREA 08: POKEMON CENTER (CONTACT)"}
        spriteMarker={config?.spriteMarker || "south"}
        rightLabel="HEALING STATION READY"
      />

      <SectionDialog>
        <SectionHeading
          title="BEACON BEAM // OPEN FOR COLLABORATION"
          subtitle="Seeking full-time roles, engineering contracts, or cutting-edge technical collaborations."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "12px",
          }}
        >
          {links.map((item, idx) => (
            <div
              key={idx}
              style={{
                ...PIXEL_BOX_STYLES.card,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.pixelDisplay,
                  fontSize: "8px",
                  color: PIXEL_COLORS.textMuted,
                  letterSpacing: "0.5px",
                }}
              >
                {item.label}
              </span>

              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: FONTS.companionMono,
                    fontSize: "12px",
                    color: PIXEL_COLORS.accent,
                    textDecoration: "none",
                    wordBreak: "break-all",
                  }}
                >
                  {item.value} ↗
                </a>
              ) : (
                <span
                  style={{
                    fontFamily: FONTS.companionMono,
                    fontSize: "12px",
                    color: PIXEL_COLORS.textDim,
                  }}
                >
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </SectionDialog>
    </SectionFrame>
  );
}