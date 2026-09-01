import { createElement } from "react";
import { renderToString } from "react-dom/server";
import Portfolio from "../src/Portofolio";

export function renderApp() {
  return renderToString(createElement(Portfolio));
}