import React, { useState, useEffect } from "react";
import { FONTS, PIXEL_BOX_STYLES, PIXEL_COLORS } from "../theme/tokens";

export default function HUD({
  playerPos,
  direction,
  isMoving,
  activeZone,
  onInteract,
}) {
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock(now.toTimeString().split(" ")[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "rgba(8, 12, 20, 0.92)",
          border: `2px solid ${PIXEL_COLORS.borderBright}`,
          padding: "8px 14px",
          boxShadow: "3px 3px 0px rgba(0,0,0,0.8)",
          imageRendering: "pixelated",
          userSelect: "none",
        }}
      >
        <img
          src="/img/logo.png"
          alt="Logo"
          style={{ width: "24px", height: "24px", imageRendering: "pixelated" }}
        />
        <div>
          <span
            style={{
              fontFamily: FONTS.pixelDisplay,
              fontSize: "10px",
              color: PIXEL_COLORS.accent,
              letterSpacing: "1px",
              display: "block",
            }}
          >
            RIO TRI PRAYOGO
          </span>
          <span
            style={{
              fontFamily: FONTS.companionMono,
              fontSize: "9px",
              color: PIXEL_COLORS.textDim,
            }}
          >
            OVERWORLD v5.2 • PORTFOLIO MAP
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#05080e",
            border: `1px solid ${PIXEL_COLORS.border}`,
            padding: "3px 8px",
            fontFamily: FONTS.companionMono,
            fontSize: "10px",
            color: PIXEL_COLORS.accentCyan,
          }}
        >
          {clock}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 100,
          backgroundColor: "rgba(8, 12, 20, 0.92)",
          border: `2px solid ${PIXEL_COLORS.borderBright}`,
          padding: "8px 14px",
          boxShadow: "3px 3px 0px rgba(0,0,0,0.8)",
          imageRendering: "pixelated",
          userSelect: "none",
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.pixelDisplay,
            fontSize: "7px",
            color: activeZone ? activeZone.color : PIXEL_COLORS.accentCyan,
            letterSpacing: "1px",
            marginBottom: "3px",
          }}
        >
          LOCATION: {activeZone ? activeZone.name : "WILD AREA (ROAMING)"}
        </div>
        <div
          style={{
            fontFamily: FONTS.companionMono,
            fontSize: "10px",
            color: PIXEL_COLORS.textMuted,
          }}
        >
          DIR: {direction.toUpperCase()} • POS: {Math.round(playerPos.x)}, {Math.round(playerPos.y)}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "16px",
          left: "16px",
          zIndex: 100,
          backgroundColor: "rgba(8, 12, 20, 0.9)",
          border: `2px solid ${PIXEL_COLORS.borderBright}`,
          padding: "10px 14px",
          boxShadow: "3px 3px 0px rgba(0,0,0,0.8)",
          imageRendering: "pixelated",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "14px" }}>🎮</span>
        <div>
          <div
            style={{
              fontFamily: FONTS.pixelDisplay,
              fontSize: "8px",
              color: PIXEL_COLORS.text,
              letterSpacing: "0.5px",
              marginBottom: "2px",
            }}
          >
            [W][A][S][D] / ARROWS TO WALK
          </div>
          <div
            style={{
              fontFamily: FONTS.companionMono,
              fontSize: "10px",
              color: PIXEL_COLORS.textMuted,
            }}
          >
            Approach any building or signpost to interact
          </div>
        </div>
      </div>

      {activeZone && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 150,
            backgroundColor: "#0d1322",
            border: `3px solid ${activeZone.color || PIXEL_COLORS.accent}`,
            outline: "2px solid #000",
            boxShadow: "0 6px 0 rgba(0,0,0,0.9)",
            padding: "14px 22px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            imageRendering: "pixelated",
            animation: "pixelPulse 1.8s infinite",
          }}
        >
          <span style={{ fontSize: "20px" }}>{activeZone.icon}</span>
          <div>
            <div
              style={{
                fontFamily: FONTS.pixelDisplay,
                fontSize: "10px",
                color: activeZone.color || PIXEL_COLORS.accent,
                letterSpacing: "1px",
                marginBottom: "4px",
              }}
            >
              ARRIVED AT {activeZone.buildingTitle || activeZone.name}
            </div>
            <div
              style={{
                fontFamily: FONTS.companionMono,
                fontSize: "11px",
                color: PIXEL_COLORS.textDim,
              }}
            >
              {activeZone.subtitle}
            </div>
          </div>

          <button
            onClick={() => onInteract && onInteract(activeZone)}
            style={{
              ...PIXEL_BOX_STYLES.button,
              backgroundColor: activeZone.color || PIXEL_COLORS.accent,
              color: "#080c14",
              fontWeight: "bold",
              fontSize: "9px",
              padding: "8px 14px",
              marginLeft: "8px",
            }}
          >
            [SPACE] ENTER / OPEN
          </button>
        </div>
      )}
    </>
  );
}