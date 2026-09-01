import React, { useState } from "react";
import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES } from "../theme/tokens";
import { AreaMarker, SectionDialog, SectionFrame, SectionHeading } from "./SectionParts";

export default function WorksSection({ config }) {
  const quests = config?.data || [];
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <SectionFrame id="works">
      <AreaMarker
        mapArea={config?.mapArea || "AREA 04: MISSION ARCHIVE"}
        spriteMarker={config?.spriteMarker || "southEast"}
        rightLabel={`${quests.length} COMPLETED MISSIONS`}
      />

      <SectionDialog>
        <SectionHeading
          title="QUEST LOG: BUILT SYSTEMS & CODE ARTIFACTS"
          subtitle="Verified software builds, open-source repositories, and production systems."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {quests.map((q, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  ...PIXEL_BOX_STYLES.card,
                  padding: "18px 20px",
                  backgroundColor: isHovered ? PIXEL_COLORS.cardBgAlt : PIXEL_COLORS.cardBg,
                  borderColor: isHovered ? PIXEL_COLORS.accent : PIXEL_COLORS.border,
                  transform: isHovered ? "translateY(-2px)" : "none",
                  transition: "all 0.15s ease",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#070a12",
                        border: `1px solid ${PIXEL_COLORS.borderBright}`,
                        color: PIXEL_COLORS.accentCyan,
                        fontFamily: FONTS.pixelDisplay,
                        fontSize: "7px",
                        padding: "3px 6px",
                      }}
                    >
                      {q.questType || "QUEST"}
                    </span>
                    <span
                      style={{
                        fontFamily: FONTS.companionMono,
                        fontSize: "11px",
                        color: PIXEL_COLORS.textMuted,
                      }}
                    >
                      YEAR: {q.year}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: FONTS.pixelDisplay,
                      fontSize: "12px",
                      color: isHovered ? PIXEL_COLORS.accent : PIXEL_COLORS.text,
                      margin: "0 0 8px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {q.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: FONTS.companionMono,
                      fontSize: "12px",
                      color: PIXEL_COLORS.textDim,
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {q.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#080c14",
                      border: `1px solid ${PIXEL_COLORS.border}`,
                      padding: "8px 10px",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.pixelDisplay,
                        fontSize: "7px",
                        color: PIXEL_COLORS.textMuted,
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      TECH STACK EQUIPPED:
                    </span>
                    <span
                      style={{
                        fontFamily: FONTS.companionMono,
                        fontSize: "11px",
                        color: PIXEL_COLORS.accentGlow,
                      }}
                    >
                      {q.tech}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.companionMono,
                        fontSize: "11px",
                        color: PIXEL_COLORS.textMuted,
                      }}
                    >
                      ROLE: {q.role}
                    </span>

                    <a
                      href={q.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...PIXEL_BOX_STYLES.button,
                        textDecoration: "none",
                        fontSize: "8px",
                        padding: "6px 10px",
                        backgroundColor: isHovered ? PIXEL_COLORS.accent : PIXEL_COLORS.cardBgAlt,
                        color: isHovered ? "#080c14" : PIXEL_COLORS.accent,
                        display: "inline-block",
                      }}
                    >
                      INSPECT ↗
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionDialog>
    </SectionFrame>
  );
}