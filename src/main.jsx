import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Portfolio from "./Portofolio";

const rootEl = document.getElementById("root");
const app = (
  <StrictMode>
    <Portfolio />
  </StrictMode>
);

if (rootEl.childElementCount > 0) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

// Hide loading screen quickly so content is visible sooner (better LCP)
setTimeout(() => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("fade-out");
    setTimeout(() => {
      loadingScreen.remove();
    }, 600);
  }
}, 600);
