import { COLORS, sectionStyle, labelStyle } from "../constants";

const EDU_DATA = [
  {
    period: "2011-2016",
    level: "Elementary School",
    institution: "SDN 2 Kepatihan",
    detail: "Primary education",
  },
  {
    period: "2017-2019",
    level: "Junior High School",
    institution: "SMPN 3 Tulungagung",
    detail: "Secondary education",
  },
  {
    period: "2020-2022",
    level: "Senior High School",
    institution: "SMKN 1 Boyolangu",
    detail: "Software Engineering",
  },
  {
    period: "2023-Present",
    level: "College",
    institution: "Politeknik Negeri Malang (Polinema)",
    detail: "Applied Informatics · GPA 3.90 / 4.00",
  },
];

export default function Education() {
  return (
    <section id="education" style={sectionStyle}>
      <span style={labelStyle}>Education</span>
      {EDU_DATA.map((ed, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "0 48px",
            padding: "14px 0",
            borderBottom:
              i === EDU_DATA.length - 1 ? "none" : `1px solid ${COLORS.border}`,
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: COLORS.muted,
              margin: "0",
              lineHeight: "1.6",
            }}
          >
            {ed.period}
          </p>
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "20px",
                fontWeight: "500",
                color: COLORS.text,
                margin: "0 0 6px",
              }}
            >
              {ed.level}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: COLORS.text,
                margin: "0 0 6px",
              }}
            >
              {ed.institution}
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: COLORS.accent,
                margin: "0",
              }}
            >
              {ed.detail}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
