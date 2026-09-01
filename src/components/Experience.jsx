import { COLORS, sectionStyle, labelStyle } from "../constants";

const EXP_GROUPS = [
  {
    title: "Internship",
    entries: [
      {
        period: "NOW",
        badge: "INTERN",
        role: "Web Developer Intern",
        company: "PT Multi Spunindo Jaya",
        detail:
          "Currently working as a backend developer intern, contributing to system development and enterprise software delivery.",
        tags: ["Laravel", "PHP", "MySQL"],
      },
      {
        period: "2022",
        badge: "INTERN",
        role: "Digital Marketing & WordPress Developer Intern",
        company: "Indoweb.id",
        detail:
          "Handled WordPress customization, responsive website improvements, and digital campaign execution.",
        tags: ["WordPress", "Digital Marketing", "SEO"],
      },
    ],
  },
  {
    title: "Organization",
    entries: [
      {
        period: "NOW",
        badge: "Student Executive Board",
        role: "Vice Minister of Finance",
        company: "Advocacy & Welfare Ministry — Polinema",
        detail:
          "Oversee financial planning and management for welfare initiatives including scholarship and tuition assistance programs.",
        tags: ["Finance", "Coordination", "Management"],
      },
      {
        period: "2024-25",
        badge: "Student Executive Board",
        role: "Staff",
        company: "Advocacy & Welfare Ministry — Polinema",
        detail:
          "Advocated for student rights, ran campaigns, and facilitated student and administration communication.",
        tags: ["Advocacy", "Public Speaking", "Leadership"],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={sectionStyle}>
      <span style={labelStyle}>Experience</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {EXP_GROUPS.map((group) => (
          <div key={group.title}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: COLORS.accent,
                margin: "0 0 16px",
                textTransform: "uppercase",
              }}
            >
              {group.title}
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {group.entries.map((exp, i) => (
                <article
                  key={`${group.title}-${i}`}
                  style={{
                    border: `1px solid ${COLORS.border}`,
                    padding: "18px 20px",
                    background: COLORS.surface,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: COLORS.accent,
                      }}
                    >
                      {exp.period}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        color: COLORS.muted,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.badge}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "20px",
                      fontWeight: "500",
                      color: COLORS.text,
                      margin: "10px 0 4px",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: COLORS.accent,
                      margin: "0 0 10px",
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: COLORS.muted,
                      lineHeight: "1.7",
                      margin: "0",
                    }}
                  >
                    {exp.detail}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px 12px",
                      flexWrap: "wrap",
                      marginTop: "12px",
                    }}
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px",
                          color: COLORS.muted,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
