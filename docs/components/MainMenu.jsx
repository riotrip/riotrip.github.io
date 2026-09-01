import React, { useState, useEffect } from "react";
import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES } from "../theme/tokens";

const TECH_STACK = [
  { name: "React 18", role: "UI LIBRARY" },
  { name: "Vite", role: "BUILD TOOL" },
  { name: "Tailwind CSS", role: "STYLING" },
  { name: "JetBrains Mono", role: "MONO FONT" },
  { name: "Press Start 2P", role: "PIXEL FONT" },
  { name: "GitHub Pages", role: "HOSTING" },
];

export default function MainMenu({ onStart }) {
  const [view, setView] = useState("main");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const OPTIONS = [
    { id: "start", label: "ENTER GAME" },
    { id: "about", label: "ABOUT" },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (view === "about") {
        if (e.code === "Escape" || e.code === "Backspace") {
          e.preventDefault();
          setView("main");
        }
        return;
      }
      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + OPTIONS.length) % OPTIONS.length);
          break;
        case "ArrowDown":
        case "KeyS":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % OPTIONS.length);
          break;
        case "Enter":
        case "Space":
          e.preventDefault();
          if (OPTIONS[selectedIndex].id === "start") onStart();
          else setView("about");
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, view, onStart]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: PIXEL_COLORS.screenBgDeep,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${PIXEL_COLORS.borderDark} 1px, transparent 1px),
            linear-gradient(90deg, ${PIXEL_COLORS.borderDark} 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div className="scanlines-overlay" />

      {view === "main" ? (
        <>
          <img
            src="/img/logo.png"
            alt="Logo"
            style={{
              width: "128px",
              height: "128px",
              imageRendering: "pixelated",
              filter: "drop-shadow(4px 4px 0px rgba(0,0,0,0.6))",
              animation: "menuFloat 3s ease-in-out infinite",
              marginBottom: "32px",
              zIndex: 5,
            }}
          />

          <div
            style={{
              fontFamily: FONTS.pixelDisplay,
              fontSize: "24px",
              color: PIXEL_COLORS.accent,
              textShadow: "3px 3px 0px #000",
              letterSpacing: "2px",
              marginBottom: "12px",
              zIndex: 5,
              textAlign: "center",
            }}
          >
            PORTFOLIO OVERWORLD
          </div>
          <div
            style={{
              fontFamily: FONTS.companionMono,
              fontSize: "10px",
              color: PIXEL_COLORS.textDim,
              letterSpacing: "6px",
              marginBottom: "56px",
              zIndex: 5,
            }}
          >
            RIO TRI PRAYOGO
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              zIndex: 5,
              alignItems: "center",
            }}
          >
            {OPTIONS.map((option, index) => (
              <div
                key={option.id}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  if (option.id === "start") onStart();
                  else setView("about");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  fontFamily: FONTS.pixelDisplay,
                  fontSize: "13px",
                  letterSpacing: "2px",
                  color:
                    index === selectedIndex ? PIXEL_COLORS.accent : PIXEL_COLORS.textDim,
                  textShadow: "2px 2px 0px #000",
                  transition: "color 0.1s ease",
                }}
              >
                <span style={{ visibility: index === selectedIndex ? "visible" : "hidden" }}>
                  ▶
                </span>
                {option.label}
                <span style={{ visibility: "hidden" }}>▶</span>
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              fontFamily: FONTS.companionMono,
              fontSize: "8px",
              color: PIXEL_COLORS.textMuted,
              letterSpacing: "1px",
              zIndex: 5,
            }}
          >
            ↑↓ NAVIGATE // ENTER SELECT // V5.0
          </div>
        </>
      ) : (
        <div
          style={{
            ...PIXEL_BOX_STYLES.dialog,
            padding: "32px",
            maxWidth: "520px",
            width: "calc(100% - 48px)",
            maxHeight: "80vh",
            overflowY: "auto",
            zIndex: 5,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.pixelDisplay,
              fontSize: "16px",
              color: PIXEL_COLORS.accent,
              textShadow: "2px 2px 0px #000",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            ABOUT
          </div>

          <div
            style={{
              fontFamily: FONTS.pixelDisplay,
              fontSize: "9px",
              color: PIXEL_COLORS.accentCyan,
              marginBottom: "12px",
            }}
          >
            ▼ TECH STACK
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: FONTS.companionMono,
                  fontSize: "11px",
                  borderBottom: `1px solid ${PIXEL_COLORS.borderDark}`,
                  paddingBottom: "6px",
                }}
              >
                <span style={{ color: PIXEL_COLORS.text }}>{tech.name}</span>
                <span style={{ color: PIXEL_COLORS.textMuted }}>{tech.role}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: FONTS.pixelDisplay,
              fontSize: "9px",
              color: PIXEL_COLORS.accentCyan,
              marginBottom: "12px",
            }}
          >
            ▼ CREDITS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: FONTS.companionMono,
                fontSize: "11px",
                borderBottom: `1px solid ${PIXEL_COLORS.borderDark}`,
                paddingBottom: "6px",
              }}
            >
              <span style={{ color: PIXEL_COLORS.text }}>Design & Code</span>
              <span style={{ color: PIXEL_COLORS.accent }}>RIO TRI PRAYOGO</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: FONTS.companionMono,
                fontSize: "11px",
                borderBottom: `1px solid ${PIXEL_COLORS.borderDark}`,
                paddingBottom: "6px",
              }}
            >
              <span style={{ color: PIXEL_COLORS.text }}>Inspired by</span>
              <span style={{ color: PIXEL_COLORS.textMuted }}>GBA / POKEMON OVERWORLD</span>
            </div>
          </div>

          <button
            onClick={() => setView("main")}
            style={{
              ...PIXEL_BOX_STYLES.button,
              width: "100%",
              fontSize: "10px",
              padding: "12px",
            }}
          >
            ◀ BACK (ESC)
          </button>
        </div>
      )}
    </div>
  );
}