import { useState, useEffect } from "react";
import { COLORS } from "./constants";
import { useActiveSection } from "./hooks/useActiveSection";
import { Nav, MobileNav } from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";
import Experience from "./components/Experience";
import Education from "./components/Education";
import AskAI from "./components/AskAI";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Portfolio() {
  const active = useActiveSection();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const containerStyle = {
    width: "100%",
    maxWidth: "1180px",
    margin: "0 auto",
    padding: isMobile ? "0 16px" : "0 24px",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; color: ${COLORS.text}; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; }
        textarea::placeholder { color: ${COLORS.muted}; }
        @media (max-width: 640px) {
          .works-grid { grid-template-columns: 1fr !important; }
          .exp-grid { grid-template-columns: 1fr !important; gap: 8px 0 !important; }
          .edu-grid { grid-template-columns: 1fr !important; gap: 8px 0 !important; }
        }
      `}</style>

      {isMobile ? <MobileNav active={active} /> : <Nav active={active} />}

      <main
        style={{ ...containerStyle, paddingTop: isMobile ? "52px" : "56px" }}
      >
        <Hero />
        <About />
        <Works />
        <Experience />
        <Education />
        <AskAI />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
