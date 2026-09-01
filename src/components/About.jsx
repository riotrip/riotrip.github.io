import { COLORS, SKILLS, sectionStyle, labelStyle } from "../constants";

export default function About() {
  return (
    <section id="about" style={sectionStyle}>
      <span style={labelStyle}>About</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: COLORS.text,
              lineHeight: "1.8",
              margin: "0 0 24px",
            }}
          >
            An Informatics Engineering student at State Polytechnic of Malang
            with a strong passion for backend development and system logic.
            Actively involved in campus organizations, developing leadership and
            collaborative skills alongside technical expertise in
            problem-solving.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: COLORS.muted,
              lineHeight: "1.8",
              margin: "0",
            }}
          >
            Each project begins with research and understanding, followed by
            structured ideation and meticulous execution. I recently completed
            an industry internship at PT Multi Spunindo Jaya and currently serve
            as Vice Minister of Finance in BEM Polinema.
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: COLORS.text,
              lineHeight: "1.8",
              margin: "0 0 24px",
            }}
          >
            Outside of backend work, I explore ML system integration, IoT
            architecture (ESP32), and I run Ubuntu with a heavily customized XFCE
            setup.
          </p>
          <div style={{ marginTop: "32px" }}>
            <p style={labelStyle}>Full stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
              {SKILLS.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    color: COLORS.muted,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
