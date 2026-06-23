import { useState } from "react";
import { COLORS, sectionStyle, labelStyle } from "../constants";

const WORKS_DATA = [
  {
    year: "2022",
    title: "CareReport",
    role: "Full-Stack Developer",
    tech: "Laravel · Bootstrap · MySQL",
    link: "https://github.com/riotrip/aduan-masyarakat-beta/",
    desc: "Public complaint reporting platform for citizens to submit issues and track resolution status with centralized records and escalation workflow.",
  },
  {
    year: "2023",
    title: "Kas Online",
    role: "Project Manager",
    tech: "Java · Cash Flow",
    link: "https://github.com/riotrip/kas-online-java",
    desc: "Classroom cash management system with income and expense tracking, payment monitoring, and real-time balance visibility.",
  },
  {
    year: "2024",
    title: "SiPresma",
    role: "Front-End Developer",
    tech: "PHP · HTML/CSS · Bootstrap",
    link: "https://github.com/Kiaakk/PBL-PRESMA",
    desc: "Web application for students to upload and store digital achievement portfolios for centralized management.",
  },
  {
    year: "2024",
    title: "Newsphere",
    role: "Back-End Developer",
    tech: "PHP · MongoDB",
    link: "https://github.com/clockingoffbye/news-website",
    desc: "Dynamic news management website using MongoDB for flexible and scalable storage of articles, categories, and author data.",
  },
  {
    year: "2025",
    title: "SiPRAK",
    role: "Back-End Developer",
    tech: "Laravel · Tailwind CSS · MySQL",
    link: "https://github.com/naufal11705/PBL-SARPRAS",
    desc: "Campus facility reporting system to track repairs and replace manual reporting processes at Politeknik Negeri Malang.",
  },
  {
    year: "2025",
    title: "QRAFFITI",
    role: "Full-Stack Developer",
    tech: "Python · Flask",
    link: "https://qraffiti.vercel.app/",
    desc: "QR code generator web app with a simple interface for creating and downloading QR codes from text or URLs.",
  },
  {
    year: "2025",
    title: "ParisyApp",
    role: "Back-End Developer",
    tech: "Flask · Flutter · Machine Learning · Computer Vision",
    link: "https://www.linkedin.com/posts/rio-tri-prayogo_projectbasedlearning-machinelearning-computervision-activity-7412804238990540800-V-7h",
    desc: "Vegetable category classification system combining computer vision and ML model integration in a Flutter app.",
  },
];

export default function Works() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="works" style={sectionStyle}>
      <span style={labelStyle}>Works</span>
      <div>
        {WORKS_DATA.map((w, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr auto",
              gap: "0 32px",
              alignItems: "start",
              padding: "28px 0",
              borderBottom: `1px solid ${COLORS.border}`,
              transition: "all 0.15s",
              cursor: "default",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: hovered === i ? COLORS.accent : COLORS.muted,
                paddingTop: "3px",
                transition: "color 0.15s",
              }}
            >
              {w.year}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "18px",
                  fontWeight: "500",
                  color: hovered === i ? COLORS.text : "#C8C4BE",
                  margin: "0 0 6px",
                  transition: "color 0.15s",
                }}
              >
                {w.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: COLORS.muted,
                  margin: "0 0 12px",
                  lineHeight: "1.6",
                }}
              >
                {w.desc}
              </p>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: hovered === i ? COLORS.accentDim : "#555550",
                  transition: "color 0.15s",
                }}
              >
                {w.tech}
              </span>
              <div style={{ marginTop: "10px" }}>
                <a
                  href={w.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: COLORS.accent,
                    textDecoration: "none",
                    letterSpacing: "0.06em",
                  }}
                >
                  VIEW PROJECT ↗
                </a>
              </div>
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: COLORS.muted,
                paddingTop: "3px",
                whiteSpace: "nowrap",
              }}
            >
              {w.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
