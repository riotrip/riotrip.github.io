import React from "react";
import { FONTS, PIXEL_COLORS } from "../theme/tokens";
import { PATH_SEGMENTS, PLAZA } from "../content/worldTiles";

export default function Minimap({
  worldWidth,
  worldHeight,
  playerPos,
  zones,
  activeZone,
  onTeleport,
}) {
  const mapW = 190;
  const mapH = 150;

  const scaleX = mapW / worldWidth;
  const scaleY = mapH / worldHeight;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        width: `${mapW}px`,
        height: `${mapH}px`,
        backgroundColor: "rgba(8, 12, 20, 0.94)",
        border: `2px solid ${PIXEL_COLORS.borderBright}`,
        outline: "2px solid #05080e",
        boxShadow: "4px 4px 0px rgba(0,0,0,0.8)",
        zIndex: 100,
        imageRendering: "pixelated",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "6px",
          fontFamily: FONTS.pixelDisplay,
          fontSize: "6px",
          color: PIXEL_COLORS.accent,
          letterSpacing: "0.5px",
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        MAP RADAR // PORTFOLIO OVERWORLD
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(77, 171, 247, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(77, 171, 247, 0.08) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          pointerEvents: "none",
        }}
      />

      {PATH_SEGMENTS.map(([x0, y0, x1, y1], i) => {
        const lx = Math.min(x0, x1) * scaleX;
        const ly = Math.min(y0, y1) * scaleY;
        const w = Math.max(2, (Math.abs(x1 - x0) || 4) * scaleX);
        const h = Math.max(2, (Math.abs(y1 - y0) || 4) * scaleY);
        return (
          <div
            key={`road-${i}`}
            style={{
              position: "absolute",
              left: `${lx - 1}px`,
              top: `${ly - 1}px`,
              width: `${w}px`,
              height: `${h}px`,
              backgroundColor: "rgba(210, 180, 120, 0.22)",
              pointerEvents: "none",
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: `${(PLAZA.cx - PLAZA.hw) * scaleX}px`,
          top: `${(PLAZA.cy - PLAZA.hh) * scaleY}px`,
          width: `${PLAZA.hw * 2 * scaleX}px`,
          height: `${PLAZA.hh * 2 * scaleY}px`,
          backgroundColor: "rgba(210, 180, 120, 0.3)",
          pointerEvents: "none",
        }}
      />

      {zones.map((z) => {
        const zX = z.x * scaleX;
        const zY = z.y * scaleY;
        const isCurrent = activeZone?.id === z.id;

        return (
          <div
            key={z.id}
            onClick={() => onTeleport && onTeleport(z.x, z.y)}
            title={`${z.name} (Click to fast-travel)`}
            style={{
              position: "absolute",
              left: `${zX - 5}px`,
              top: `${zY - 5}px`,
              width: "10px",
              height: "10px",
              backgroundColor: z.color || PIXEL_COLORS.accentCyan,
              border: `1px solid ${isCurrent ? "#ffffff" : "#000000"}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: isCurrent ? "scale(1.4)" : "scale(1)",
              transition: "transform 0.2s ease",
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          left: `${playerPos.x * scaleX - 4}px`,
          top: `${playerPos.y * scaleY - 4}px`,
          width: "8px",
          height: "8px",
          backgroundColor: "#ffffff",
          border: "1px solid #ff4444",
          boxShadow: "0 0 6px #ffffff",
          pointerEvents: "none",
          animation: "pixelPulse 0.8s infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "3px",
          left: "6px",
          right: "6px",
          fontFamily: FONTS.companionMono,
          fontSize: "8px",
          color: PIXEL_COLORS.textMuted,
          display: "flex",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <span>X:{Math.round(playerPos.x)} Y:{Math.round(playerPos.y)}</span>
        <span style={{ color: PIXEL_COLORS.accentCyan }}>CLICK TO TP</span>
      </div>
    </div>
  );
}