import React from "react";
import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES } from "../theme/tokens";
import { AreaMarker, SectionDialog, SectionFrame } from "./SectionParts";

export default function AboutSection({ config }) {
  const profile = config?.data || {};

  return (
    <SectionFrame id="about">
      <AreaMarker
        mapArea={config?.mapArea || "AREA 02: POKEDEX LAB"}
        spriteMarker={config?.spriteMarker || "east"}
        rightLabel="NPC LECTURER ACTIVE"
      />

      <SectionDialog>
        <div
          style={{
            borderBottom: `2px solid ${PIXEL_COLORS.border}`,
            paddingBottom: "16px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: FONTS.pixelDisplay,
                fontSize: "14px",
                color: PIXEL_COLORS.accent,
                letterSpacing: "1px",
                margin: "0 0 6px",
              }}
            >
              TRAINER ID: #031 — {profile.name || "RIO TRI PRAYOGO"}
            </h2>
            <p
              style={{
                fontFamily: FONTS.companionMono,
                fontSize: "11px",
                color: PIXEL_COLORS.textDim,
                margin: 0,
              }}
            >
              CLASS: {profile.classTitle}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#080c14",
              border: `1px solid ${PIXEL_COLORS.accentCyan}`,
              padding: "4px 10px",
              fontFamily: FONTS.pixelDisplay,
              fontSize: "8px",
              color: PIXEL_COLORS.accentCyan,
            }}
          >
            {profile.gpa}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: FONTS.companionMono,
                fontSize: "13px",
                color: PIXEL_COLORS.text,
                lineHeight: "1.8",
                margin: "0 0 16px",
              }}
            >
              Informatics Engineering scholar at <strong>Politeknik Negeri Malang</strong> with strong specialization in server-side architectures, robust database modeling, and system reliability.
            </p>
            <p
              style={{
                fontFamily: FONTS.companionMono,
                fontSize: "13px",
                color: PIXEL_COLORS.textDim,
                lineHeight: "1.8",
                margin: "0 0 16px",
              }}
            >
              Completed industry internship at <strong>PT Multi Spunindo Jaya</strong>, serving as Vice Minister of Finance in BEM Polinema, and consistently maintaining a 3.90 GPA.
            </p>
            <p
              style={{
                fontFamily: FONTS.companionMono,
                fontSize: "12px",
                color: PIXEL_COLORS.textMuted,
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              Daily driver: Ubuntu with custom customized XFCE desktop environment, terminal-driven workflows, and Docker microservice sandboxes.
            </p>
          </div>

          <div
            style={{
              ...PIXEL_BOX_STYLES.card,
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.pixelDisplay,
                fontSize: "9px",
                color: PIXEL_COLORS.accent,
                letterSpacing: "1px",
                borderBottom: `1px solid ${PIXEL_COLORS.border}`,
                paddingBottom: "8px",
              }}
            >
              BASE ATTRIBUTES & GUILD STATUS
            </div>

            {profile.stats?.map((stat, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: FONTS.pixelDisplay,
                    fontSize: "8px",
                  }}
                >
                  <span style={{ color: PIXEL_COLORS.textDim }}>{stat.label}</span>
                  <span style={{ color: stat.color }}>{stat.val}</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "#070a12",
                    border: `1px solid ${PIXEL_COLORS.border}`,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: i === 0 ? "100%" : i === 1 ? "95%" : "100%",
                      backgroundColor: stat.color,
                      imageRendering: "pixelated",
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "6px",
                padding: "8px",
                backgroundColor: "#070a12",
                border: `1px solid ${PIXEL_COLORS.border}`,
                fontFamily: FONTS.companionMono,
                fontSize: "11px",
                color: PIXEL_COLORS.textDim,
              }}
            >
              LOC: {profile.location}
              <br />
              AFFILIATION: {profile.guild}
            </div>
          </div>
        </div>
      </SectionDialog>
    </SectionFrame>
  );
}