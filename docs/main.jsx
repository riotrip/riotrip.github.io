import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./Portofolio";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);

// Hide loading screen after a longer delay so it stays visible briefly
setTimeout(() => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("fade-out");
    setTimeout(() => {
      loadingScreen.remove();
    }, 600);
  }
}, 1400);
