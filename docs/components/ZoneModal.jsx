import React from "react";
import { FONTS, PIXEL_BOX_STYLES, PIXEL_COLORS } from "../theme/tokens";
import AboutSection from "./AboutSection";
import AskAISection from "./AskAISection";
import ContactSection from "./ContactSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import WorksSection from "./WorksSection";

export default function ZoneModal({ zone, onClose }) {
  if (!zone) return null;

  const renderContent = () => {
    switch (zone.type) {
      case "hero":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h1
              style={{
                fontFamily: FONTS.pixelDisplay,
                fontSize: "14px",
                color: PIXEL_COLORS.accent,
                letterSpacing: "1px",
                margin: "0 0 8px",
              }}
            >
              "HELLO WORLD! WELCOME TO PALLET TOWN."
            </h1>
            <p
              style={{
                fontFamily: FONTS.companionMono,
                fontSize: "13px",
                color: PIXEL_COLORS.textDim,
                lineHeight: "1.7",
              }}
            >
              {zone.data?.bio}
            </p>
            <div
              style={{
                ...PIXEL_BOX_STYLES.card,
                padding: "12px",
                backgroundColor: "#070a12",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "20px" }}>🗺️</span>
              <span
                style={{
                  fontFamily: FONTS.companionMono,
                  fontSize: "12px",
                  color: PIXEL_COLORS.accentCyan,
                }}
              >
                TOWN GUIDE: Walk North for Academy, West for Lab/AI, East for Mart/Center, and South for Quests/Expeditions!
              </span>
            </div>
          </div>
        );
      case "about":
        return <AboutSection config={{ mapArea: zone.subtitle, spriteMarker: zone.spriteFacing, data: zone.data }} />;
      case "skills":
        return <SkillsSection config={{ mapArea: zone.subtitle, spriteMarker: zone.spriteFacing, data: zone.data }} />;
      case "works":
        return <WorksSection config={{ mapArea: zone.subtitle, spriteMarker: zone.spriteFacing, data: zone.data }} />;
      case "experience":
        return <ExperienceSection config={{ mapArea: zone.subtitle, spriteMarker: zone.spriteFacing, data: zone.data }} />;
      case "education":
        return <EducationSection config={{ mapArea: zone.subtitle, spriteMarker: zone.spriteFacing, data: zone.data }} />;
      case "ask-ai":
        return <AskAISection config={{ mapArea: zone.subtitle, spriteMarker: zone.spriteFacing }} />;
      case "contact":
        return <ContactSection config={{ mapArea: zone.subtitle, spriteMarker: zone.spriteFacing, data: zone.data }} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(5, 8, 14, 0.82)",
        backdropFilter: "blur(4px)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        imageRendering: "pixelated",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "880px",
          maxHeight: "88vh",
          backgroundColor: "#0d1322",
          border: `3px solid ${PIXEL_COLORS.borderBright}`,
          outline: `3px solid ${PIXEL_COLORS.borderDark}`,
          boxShadow: `inset 2px 2px 0px ${PIXEL_COLORS.boxHighlight}, inset -2px -2px 0px ${PIXEL_COLORS.boxShadow}, 8px 8px 0px rgba(0,0,0,0.9)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundColor: "#080c14",
            borderBottom: `2px solid ${PIXEL_COLORS.borderBright}`,
            padding: "12px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px" }}>{zone.icon}</span>
            <div>
              <span
                style={{
                  fontFamily: FONTS.pixelDisplay,
                  fontSize: "10px",
                  color: zone.color || PIXEL_COLORS.accent,
                  letterSpacing: "1px",
                  display: "block",
                }}
              >
                {zone.buildingTitle || zone.name}
              </span>
              <span
                style={{
                  fontFamily: FONTS.companionMono,
                  fontSize: "9px",
                  color: PIXEL_COLORS.textMuted,
                }}
              >
                {zone.subtitle}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              ...PIXEL_BOX_STYLES.button,
              fontSize: "8px",
              padding: "6px 12px",
            }}
          >
            [X] CLOSE / ESC
          </button>
        </div>

        <div
          style={{
            padding: "24px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}