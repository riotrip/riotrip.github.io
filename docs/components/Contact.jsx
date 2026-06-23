import { COLORS, sectionStyle, labelStyle } from "../constants";

export default function Contact() {
  const links = [
    {
      label: "Instagram",
      value: "instagram.com/rio_t.p",
      href: "https://instagram.com/rio_t.p",
    },
    {
      label: "GitHub",
      value: "github.com/riotrip",
      href: "https://github.com/riotrip",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/rio-tri-prayogo",
      href: "https://linkedin.com/in/rio-tri-prayogo",
    },
    {
      label: "Portfolio",
      value: "prayogo.is-a.dev",
      href: "https://prayogo.is-a.dev",
    },
    {
      label: "Email",
      value: "riotriprayogo31@gmail.com",
      href: "mailto:riotriprayogo31@gmail.com",
    },
    { label: "Location", value: "Indonesia", href: null },
  ];

  return (
    <section id="contact" style={{ ...sectionStyle, paddingBottom: "36px" }}>
      <span style={labelStyle}>Contact</span>
      <div style={{ width: "100%" }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: "500",
            color: COLORS.text,
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
            lineHeight: "1.1",
          }}
        >
          Open to opportunities.
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            color: COLORS.muted,
            lineHeight: "1.7",
            margin: "0 0 24px",
          }}
        >
          I'm always interested in new opportunities and collaborations. Whether
          you have a project in mind or just want to say hello, feel free to
          reach out.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {links.map((l, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: COLORS.muted,
                  letterSpacing: "0.08em",
                }}
              >
                {l.label}
              </span>
              {l.href ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    color: COLORS.text,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = COLORS.accent)}
                  onMouseLeave={(e) => (e.target.style.color = COLORS.text)}
                >
                  {l.value} ↗
                </a>
              ) : (
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    color: COLORS.muted,
                  }}
                >
                  {l.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
