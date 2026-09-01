import { useState } from "react";
import { COLORS, NAV_ITEMS } from "../constants";

export function Nav({ active }) {
  const scroll = (id) => {
    const elId = id === "ask ai" ? "ask-ai" : id;
    document.getElementById(elId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: "56px",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: COLORS.accent,
          letterSpacing: "0.05em",
        }}
      >
        RIO TRI PRAYOGO
      </span>
      <div style={{ display: "flex", gap: "32px" }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => scroll(item)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: active === item ? COLORS.text : COLORS.muted,
              padding: "0",
              transition: "color 0.2s",
              textTransform: "capitalize",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function MobileNav({ active }) {
  const [open, setOpen] = useState(false);
  const scroll = (id) => {
    const elId = id === "ask ai" ? "ask-ai" : id;
    document.getElementById(elId)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: "52px",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: COLORS.accent,
          }}
        >
          RIO TRI PRAYOGO
        </span>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: COLORS.text,
            fontSize: "20px",
            padding: "4px",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div
          style={{
            background: COLORS.bg,
            borderTop: `1px solid ${COLORS.border}`,
            padding: "12px 20px 16px",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scroll(item)}
              style={{
                display: "block",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: active === item ? COLORS.text : COLORS.muted,
                padding: "10px 0",
                textTransform: "capitalize",
                textAlign: "left",
                width: "100%",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
