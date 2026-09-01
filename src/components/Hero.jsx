import { COLORS, SKILLS, labelStyle } from "../constants";

export default function Hero() {
  return (
    <section
      style={{
        padding: "96px 0 48px",
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "36px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1", minWidth: "280px" }}>
          <p style={{ ...labelStyle, marginBottom: "24px" }}>
            Full-Stack Developer
          </p>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: "600",
              color: COLORS.text,
              lineHeight: "1.05",
              margin: "0 0 32px",
              letterSpacing: "-0.02em",
            }}
          >
            Building systems
            <br />
            that work.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: COLORS.muted,
              lineHeight: "1.7",
              maxWidth: "480px",
              margin: "0 0 40px",
            }}
          >
            Informatics student at Polinema with production experience in
            Laravel, REST APIs, Flutter, and ML pipelines. I care about clean
            architecture and systems that last.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {SKILLS.slice(0, 8).map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: COLORS.accentDim,
                  letterSpacing: "0.08em",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <div
            style={{
              width: "200px",
              height: "200px",
              border: `1px solid ${COLORS.border}`,
              overflow: "hidden",
              position: "relative",
              background: COLORS.surface,
            }}
          >
            <img
              src="../img/profile.png"
              alt="Rio Tri Prayogo"
              width="200"
              height="200"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.display = "flex";
                e.target.parentElement.style.alignItems = "center";
                e.target.parentElement.style.justifyContent = "center";
                e.target.parentElement.innerHTML = `<span style="font-family:'Space Grotesk',sans-serif;font-size:48px;font-weight:600;color:${COLORS.accentDim}">RTP</span>`;
              }}
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: COLORS.muted,
                margin: "0 0 2px",
              }}
            >
              Malang, ID
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
