import { build } from "esbuild";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const entry = resolve(__dirname, "prerender-entry.jsx");
const outfile = resolve(__dirname, ".prerender.mjs");
const htmlPath = resolve(__dirname, "../docs/index.html");

await build({
  entryPoints: [entry],
  bundle: true,
  outfile,
  format: "esm",
  platform: "node",
  jsx: "automatic",
  // react-dom/server is CJS non-bundleable; node resolves it at import time
  external: ["react-dom/server", "react", "react-dom", "react/jsx-runtime"],
});

const { renderApp } = await import(pathToFileURL(outfile).href);
const html = readFileSync(htmlPath, "utf8");
const marker = `<div id="root"></div>`;
const injection = `<div id="root">${renderApp()}</div>`;

if (!html.includes(marker)) {
  rmSync(outfile, { force: true });
  throw new Error("[prerender] <div id=\"root\"></div> not found in docs/index.html");
}

writeFileSync(htmlPath, html.replace(marker, injection));
rmSync(outfile, { force: true });

console.log("[prerender] injected server-rendered HTML into docs/index.html");