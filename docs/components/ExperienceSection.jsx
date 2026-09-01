import React from "react";
import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES } from "../theme/tokens";
import { AreaMarker, SectionDialog, SectionFrame, SectionHeading } from "./SectionParts";

export default function ExperienceSection({ config }) {
  const groups = config?.data || [];

  return (
    <SectionFrame id="experience">
      <AreaMarker
        mapArea={config?.mapArea || "AREA 05: GUILD EXPERIENCE"}
        spriteMarker={config?.spriteMarker || "northWest"}
        rightLabel="GUILD EXPEDITIONS LOG"
      />

      <SectionDialog>
        <SectionHeading
          title="GUILD ROLES & LEADERSHIP EXPEDITIONS"
          subtitle="Track record across professional software engineering internships and collegiate student governance."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {groups.map((grp, gIdx) => (
            <div key={gIdx}>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#070a12",
                  border: `1px solid ${PIXEL_COLORS.accentCyan}`,
                  padding: "4px 10px",
                  fontFamily: FONTS.pixelDisplay,
                  fontSize: "8px",
                  color: PIXEL_COLORS.accentCyan,
                  letterSpacing: "1px",
                  marginBottom: "16px",
                }}
              >
                [ {grp.title} ]
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "16px",
                }}
              >
                {grp.entries.map((entry, eIdx) => (
                  <div
                    key={eIdx}
                    style={{
                      ...PIXEL_BOX_STYLES.card,
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: FONTS.pixelDisplay,
                            fontSize: "8px",
                            color: PIXEL_COLORS.accent,
                          }}
                        >
                          {entry.period}
                        </span>
                        <span
                          style={{
                            fontFamily: FONTS.companionMono,
                            fontSize: "10px",
                            color: PIXEL_COLORS.textMuted,
                            border: `1px solid ${PIXEL_COLORS.border}`,
                            padding: "2px 6px",
                            backgroundColor: "#080c14",
                          }}
                        >
                          {entry.badge}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: FONTS.pixelDisplay,
                          fontSize: "11px",
                          color: PIXEL_COLORS.text,
                          margin: "0 0 6px",
                        }}
                      >
                        {entry.role}
                      </h3>

                      <p
                        style={{
                          fontFamily: FONTS.companionMono,
                          fontSize: "12px",
                          color: PIXEL_COLORS.accentCyan,
                          margin: "0 0 12px",
                        }}
                      >
                        @{entry.company}
                      </p>

                      <p
                        style={{
                          fontFamily: FONTS.companionMono,
                          fontSize: "12px",
                          color: PIXEL_COLORS.textDim,
                          lineHeight: "1.7",
                          margin: "0 0 16px",
                        }}
                      >
                        {entry.detail}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: FONTS.companionMono,
                            fontSize: "10px",
                            color: PIXEL_COLORS.textMuted,
                            backgroundColor: "#080c14",
                            border: `1px solid ${PIXEL_COLORS.border}`,
                            padding: "2px 6px",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionDialog>
    </SectionFrame>
  );
}