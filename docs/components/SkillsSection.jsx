import React, { useState } from "react";
import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES } from "../theme/tokens";
import { AreaMarker, SectionDialog, SectionFrame } from "./SectionParts";

export default function SkillsSection({ config }) {
  const skills = config?.data || [];
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedSkill, setSelectedSkill] = useState(skills[0] || null);

  const categories = ["ALL", "Backend", "Frontend", "Database", "Core / ML", "DevOps"];

  const filtered = activeFilter === "ALL"
    ? skills
    : skills.filter((s) => s.type.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <SectionFrame id="skills">
      <AreaMarker
        mapArea={config?.mapArea || "AREA 03: ITEM BAG & SKILL SLOTS"}
        spriteMarker={config?.spriteMarker || "northEast"}
        rightLabel="BAG CAPACITY: 14/99 ITEMS"
      />

      <SectionDialog padding="24px">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            borderBottom: `2px solid ${PIXEL_COLORS.border}`,
            paddingBottom: "16px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontFamily: FONTS.pixelDisplay,
              fontSize: "13px",
              color: PIXEL_COLORS.accent,
              letterSpacing: "1px",
              margin: 0,
            }}
          >
            TECH INVENTORY & MOVE SET (TM/HM)
          </h2>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  ...PIXEL_BOX_STYLES.button,
                  fontSize: "7px",
                  padding: "5px 8px",
                  backgroundColor: activeFilter === cat ? PIXEL_COLORS.accent : PIXEL_COLORS.cardBg,
                  color: activeFilter === cat ? "#080c14" : PIXEL_COLORS.textDim,
                  borderColor: activeFilter === cat ? PIXEL_COLORS.accent : PIXEL_COLORS.border,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: "10px",
              maxHeight: "360px",
              overflowY: "auto",
              paddingRight: "6px",
            }}
          >
            {filtered.map((item, idx) => {
              const isSelected = selectedSkill?.name === item.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(item)}
                  style={{
                    ...PIXEL_BOX_STYLES.card,
                    padding: "10px 12px",
                    cursor: "pointer",
                    borderColor: isSelected ? PIXEL_COLORS.accent : PIXEL_COLORS.border,
                    backgroundColor: isSelected ? PIXEL_COLORS.cardBgAlt : PIXEL_COLORS.cardBg,
                    transition: "all 0.1s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.pixelDisplay,
                      fontSize: "9px",
                      color: isSelected ? PIXEL_COLORS.accent : PIXEL_COLORS.text,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "6px",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.companionMono,
                      fontSize: "9px",
                      color: PIXEL_COLORS.textMuted,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{item.type}</span>
                    <span style={{ color: PIXEL_COLORS.accentCyan }}>{item.power}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedSkill && (
            <div
              style={{
                ...PIXEL_BOX_STYLES.card,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#0a0f1c",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid ${PIXEL_COLORS.border}`,
                    paddingBottom: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.pixelDisplay,
                      fontSize: "11px",
                      color: PIXEL_COLORS.accent,
                    }}
                  >
                    {selectedSkill.icon} {selectedSkill.name.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.pixelDisplay,
                      fontSize: "8px",
                      color: PIXEL_COLORS.accentCyan,
                      backgroundColor: "#070a12",
                      padding: "4px 8px",
                      border: `1px solid ${PIXEL_COLORS.border}`,
                    }}
                  >
                    TYPE: {selectedSkill.type.toUpperCase()}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: FONTS.companionMono,
                    fontSize: "12px",
                    color: PIXEL_COLORS.textDim,
                    lineHeight: "1.7",
                    marginBottom: "16px",
                  }}
                >
                  Equipped core competency utilized across enterprise systems, production applications, and high-performance server architectures.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#070a12",
                  border: `1px solid ${PIXEL_COLORS.border}`,
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: FONTS.pixelDisplay,
                    fontSize: "8px",
                    color: PIXEL_COLORS.textDim,
                    marginBottom: "6px",
                  }}
                >
                  <span>MASTERY POWER</span>
                  <span style={{ color: PIXEL_COLORS.accentCyan }}>{selectedSkill.power}</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "#161e30",
                    border: `1px solid ${PIXEL_COLORS.border}`,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: selectedSkill.power,
                      backgroundColor: PIXEL_COLORS.accentCyan,
                      imageRendering: "pixelated",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionDialog>
    </SectionFrame>
  );
}