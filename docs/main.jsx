import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Portfolio from "./Portofolio";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);

// Signal to loading screen that React app is ready
window.dispatchEvent(new CustomEvent("portfolio-ready"));