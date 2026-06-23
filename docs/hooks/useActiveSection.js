import { useState, useEffect } from "react";

export function useActiveSection() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = [
      "about",
      "works",
      "experience",
      "education",
      "ask-ai",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id === "ask-ai" ? "ask ai" : e.target.id;
            setActive(id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}
