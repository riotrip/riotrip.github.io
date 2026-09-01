import React from "react";
import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES } from "../theme/tokens";
import { AreaMarker, SectionDialog, SectionFrame, SectionHeading } from "./SectionParts";

export default function EducationSection({ config }) {
  const education = config?.data || [];

  return (
    <SectionFrame id="education">
      <AreaMarker
        mapArea={config?.mapArea || "AREA 06: TRAINER ACADEMY"}
        spriteMarker={config?.spriteMarker || "southWest"}
        rightLabel="ACADEMY RECORDS"
      />

      <SectionDialog>
        <SectionHeading
          title="ACADEMY PROGRESSION & CERTIFIED DEGREES"
          subtitle="Chronological academic foundation from foundational computing to applied engineering."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {education.map((item, idx) => (
            <div
              key={idx}
              style={{
                ...PIXEL_BOX_STYLES.card,
                padding: "16px 20px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.pixelDisplay,
                      fontSize: "8px",
                      color: PIXEL_COLORS.accent,
                    }}
                  >
                    {item.period}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#070a12",
                      border: `1px solid ${PIXEL_COLORS.border}`,
                      color: PIXEL_COLORS.accentCyan,
                      fontFamily: FONTS.companionMono,
                      fontSize: "10px",
                      padding: "2px 6px",
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: FONTS.pixelDisplay,
                    fontSize: "11px",
                    color: PIXEL_COLORS.text,
                    margin: 0,
                  }}
                >
                  {item.level}
                </h3>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: FONTS.companionMono,
                    fontSize: "13px",
                    color: PIXEL_COLORS.textDim,
                    margin: "0 0 4px",
                  }}
                >
                  {item.institution}
                </p>
                <p
                  style={{
                    fontFamily: FONTS.companionMono,
                    fontSize: "11px",
                    color: PIXEL_COLORS.accentGlow,
                    margin: 0,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionDialog>
    </SectionFrame>
  );
}