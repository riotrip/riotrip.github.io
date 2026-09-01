import React, { useRef, useEffect, useMemo, useState } from "react";
import { WORLD_CONFIG } from "../content/zones";
import {
  TILE,
  tileUrl,
  GROUND,
  TREE_TILES,
  GROUND_DECOR,
  PROP,
  SCENERY,
  BLUEPRINTS,
  blueprintSize,
  blueprintParts,
  onPath,
} from "../content/worldTiles";
import { FONTS, PIXEL_COLORS } from "../theme/tokens";

function hash(x, y, s = 0) {
  let h = (Math.round(x) * 374761393 + Math.round(y) * 668265263 + s * 2246822519) | 0;
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  return (h >>> 0) / 4294967295;
}

function buildingRect(zone) {
  const bp = BLUEPRINTS[zone.building];
  const { cols, rows } = blueprintSize(bp);
  const W = cols * TILE;
  const H = rows * TILE;
  return { bp, W, H, left: Math.round(zone.x - W / 2), top: Math.round(zone.y - H) };
}

function generateProps(zones) {
  const W = WORLD_CONFIG.width;
  const H = WORLD_CONFIG.height;
  const items = [];

  const rects = zones.map((z) => {
    const r = buildingRect(z);
    return { x0: r.left - 16, y0: r.top - 16, x1: r.left + r.W + 16, y1: r.top + r.H + 22, W: r.W };
  });
  const signSpots = zones.map((z, i) => ({ x: z.x + rects[i].W / 2 + 18, y: z.y }));
  const gardens = [];

  const inRect = (x, y, f) => x >= f.x0 && x <= f.x1 && y >= f.y0 && y <= f.y1;
  const nearEdge = (x, y) => x < 120 || y < 120 || x > W - 120 || y > H - 120;
  const blocked = (x, y) =>
    onPath(x, y) ||
    nearEdge(x, y) ||
    rects.some((f) => inRect(x, y, f)) ||
    gardens.some((g) => inRect(x, y, g)) ||
    signSpots.some((s) => Math.abs(x - s.x) < 46 && Math.abs(y - s.y) < 64);

  const pick = (arr, seed) => arr[Math.floor(hash(seed, seed * 3, 17) * arr.length) % arr.length];
  const tree = (x, y, seed, autumnEvery = 5) => {
    const green = hash(x, y, 21) > 1 / autumnEvery;
    const id = green ? pick(PROP.treeGreen, seed) : pick(PROP.treeAutumn, seed);
    items.push({ x, y, w: 48, h: 48, id, kind: "tree" });
  };
  const bush = (x, y, seed) => items.push({ x, y, w: 32, h: 32, id: pick(PROP.bush, seed), kind: "bush" });

  SCENERY.forEach((s, si) => {
    if (s.type === "well") {
      items.push({ x: s.x, y: s.y, w: 48, h: 48, id: PROP.well, kind: "well" });
      items.push({ x: s.x - 44, y: s.y + 8, w: 26, h: 30, id: PROP.barrel, kind: "prop" });
      items.push({ x: s.x + 42, y: s.y - 4, w: 32, h: 32, id: PROP.bush[0], kind: "bush" });
    } else if (s.type === "garden") {
      const gw = s.w * TILE;
      const gh = s.h * TILE;
      const gx = s.x - gw / 2;
      const gy = s.y - gh / 2;
      gardens.push({ x0: gx - 10, y0: gy - 10, x1: gx + gw + 10, y1: gy + gh + 10 });
      [[gx, gy], [gx + gw, gy], [gx, gy + gh], [gx + gw, gy + gh]].forEach(([x, y]) =>
        items.push({ x, y, w: 16, h: 30, id: PROP.fencePost, kind: "fence" }));
      for (let x = gx + 24; x < gx + gw; x += 24) {
        if (Math.abs(x - s.x) > 34) items.push({ x, y: gy, w: 24, h: 28, id: PROP.fenceRun, kind: "fence" });
        items.push({ x, y: gy + gh, w: 24, h: 28, id: PROP.fenceRun, kind: "fence" });
      }
      for (let y = gy + 24; y < gy + gh; y += 24) {
        items.push({ x: gx, y, w: 16, h: 30, id: PROP.fencePost, kind: "fence" });
        items.push({ x: gx + gw, y, w: 16, h: 30, id: PROP.fencePost, kind: "fence" });
      }
      for (let x = gx + 18; x < gx + gw; x += 26)
        for (let y = gy + 20; y < gy + gh; y += 24)
          items.push({ x, y, w: 22, h: 22, id: GROUND.grassB, kind: "flower" });
      items.push({ x: s.x, y: s.y, w: 26, h: 28, id: PROP.hive, kind: "prop" });
    } else if (s.type === "grove") {
      for (let i = 0; i < s.n; i++) {
        const a = hash(s.x, s.y, i) * Math.PI * 2;
        const rad = 26 + hash(s.x, s.y, i + 100) * s.r;
        const x = Math.round(s.x + Math.cos(a) * rad);
        const y = Math.round(s.y + Math.sin(a) * rad);
        if (!blocked(x, y)) tree(x, y, si * 31 + i);
      }
      for (let i = 0; i < 3; i++) {
        const a = hash(s.x, s.y, i + 7) * Math.PI * 2;
        const rad = 30 + hash(s.x, s.y, i + 40) * (s.r * 0.7);
        const x = Math.round(s.x + Math.cos(a) * rad);
        const y = Math.round(s.y + Math.sin(a) * rad);
        if (!blocked(x, y)) bush(x, y, si * 13 + i);
      }
    }
  });

  const hx = 1300, hy = 1200;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    items.push({ x: Math.round(hx + Math.cos(a) * 82), y: Math.round(hy + Math.sin(a) * 66), w: 22, h: 22, id: GROUND.grassB, kind: "flower" });
  }
  [[hx - 96, hy - 78], [hx + 96, hy - 78], [hx - 96, hy + 82], [hx + 96, hy + 82]].forEach(([x, y], k) =>
    items.push({ x, y, w: 26, h: 28, id: k % 2 ? PROP.crate : PROP.crate2, kind: "prop" }));
  [[hx - 130, hy - 96], [hx + 130, hy - 96], [hx - 130, hy + 98], [hx + 130, hy + 98]].forEach(([x, y]) =>
    items.push({ x, y, w: 18, h: 40, id: PROP.fencePost, kind: "post" }));
  [[hx - 178, hy - 120], [hx + 178, hy - 120], [hx - 178, hy + 128], [hx + 178, hy + 128]].forEach(([x, y], i) => {
    if (!blocked(x, y)) tree(x, y, 900 + i);
  });

  for (let x = 540; x <= 2300; x += 150) {
    for (const oy of [-96, 100]) {
      const y = 1200 + oy;
      if (!blocked(x, y) && hash(x, y, 3) > 0.25) tree(x, y, x + y);
    }
  }
  const fenceRuns = [
    [560, 820, 1128],
    [980, 1140, 1128],
    [1470, 1630, 1128],
    [1980, 2090, 1128],
    [720, 900, 1272],
    [1520, 1760, 1272],
  ];
  fenceRuns.forEach(([a, b, y]) => {
    for (let x = a; x <= b; x += 24) if (!blocked(x, y)) items.push({ x, y, w: 24, h: 28, id: PROP.fenceRun, kind: "fence" });
  });

  const dressIds = [PROP.barrel, PROP.crate, PROP.crate2, PROP.pot];
  zones.forEach((z, i) => {
    if (z.building === "well" || z.building === "camp") return;
    const r = rects[i];
    const spots = [
      [z.x - r.W / 2 - 22, z.y - 26],
      [z.x - r.W / 2 - 22, z.y - 58],
      [z.x + r.W / 2 + 22, z.y - 26],
    ];
    spots.forEach(([x, y], k) => {
      if (!blocked(x, y)) items.push({ x, y, w: 26, h: 30, id: dressIds[(i + k) % dressIds.length], kind: "prop" });
    });
  });

  const folk = [
    [1180, 1250], [1440, 1160], [1300, 1310],
    [620, 760], [2020, 720], [1520, 2010],
  ];
  folk.forEach(([x, y], i) => {
    if (!blocked(x, y)) items.push({ x, y, w: 30, h: 34, id: PROP.npc, kind: "npc" });
  });

  return items;
}

export default function OverworldMap({ zones, playerPos, activeZone, onZoneClick }) {
  const canvasRef = useRef(null);
  const drawnRef = useRef(false);

  const [vp, setVp] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  useEffect(() => {
    if (drawnRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cols = Math.ceil(WORLD_CONFIG.width / TILE);
    const rows = Math.ceil(WORLD_CONFIG.height / TILE);
    canvas.width = cols * TILE;
    canvas.height = rows * TILE;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const footprints = zones.map((z) => {
      const r = buildingRect(z);
      return { x0: r.left - 6, y0: r.top - 6, x1: r.left + r.W + 6, y1: r.top + r.H + 6 };
    });
    const underBuilding = (x, y) =>
      footprints.some((f) => x >= f.x0 && x <= f.x1 && y >= f.y0 && y <= f.y1);

    const ids = new Set([
      GROUND.grass, GROUND.grassA, GROUND.grassB, GROUND.dirt, GROUND.dirtA, GROUND.dirtB,
      ...TREE_TILES,
    ]);
    GROUND_DECOR.forEach((d) => ids.add(d.id));
    const decorTotal = GROUND_DECOR.reduce((s, d) => s + d.weight, 0);

    const imgs = {};
    let pending = ids.size;
    let failed = false;
    const paint = () => {
      if (failed) return;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dx = c * TILE;
          const dy = r * TILE;
          const cx = dx + TILE / 2;
          const cy = dy + TILE / 2;

          const gv = hash(c, r, 1);
          const gb = gv < 0.12 ? GROUND.grassA : gv < 0.16 ? GROUND.grassB : GROUND.grass;
          ctx.drawImage(imgs[gb], dx, dy, TILE, TILE);

          const ring = Math.min(c, r, cols - 1 - c, rows - 1 - r);
          if (ring < 2 || (ring === 2 && hash(c, r, 7) < 0.6) || (ring === 3 && hash(c, r, 8) < 0.22)) {
            const t = TREE_TILES[Math.floor(hash(c, r, 9) * TREE_TILES.length) % TREE_TILES.length];
            ctx.drawImage(imgs[t], dx, dy, TILE, TILE);
            continue;
          }

          if (onPath(cx, cy)) {
            const edge = !onPath(cx - TILE, cy) || !onPath(cx + TILE, cy) ||
                         !onPath(cx, cy - TILE) || !onPath(cx, cy + TILE);
            const d = edge && hash(c, r, 6) < 0.5 ? GROUND.dirtB
                    : hash(c, r, 4) < 0.18 ? GROUND.dirtA : GROUND.dirt;
            ctx.drawImage(imgs[d], dx, dy, TILE, TILE);
            continue;
          }

          const meadow = hash(c >> 2, r >> 2, 11);
          const prob = meadow > 0.72 ? 0.30 : meadow > 0.55 ? 0.09 : 0.03;
          if (!underBuilding(cx, cy) && hash(c, r, 3) < prob) {
            let p = hash(c, r, 5) * decorTotal;
            let chosen = GROUND_DECOR[0].id;
            for (const d of GROUND_DECOR) {
              if (p < d.weight) { chosen = d.id; break; }
              p -= d.weight;
            }
            ctx.drawImage(imgs[chosen], dx, dy, TILE, TILE);
          }
        }
      }
      drawnRef.current = true;
    };

    ids.forEach((id) => {
      const img = new Image();
      img.onload = () => { imgs[id] = img; if (--pending === 0) paint(); };
      img.onerror = () => { failed = true; if (--pending === 0) paint(); };
      img.src = tileUrl(id);
    });
  }, [zones]);

  const props = useMemo(() => generateProps(zones), [zones]);

  const feetY = playerPos.y + 58;
  const mX = vp.w / 2 + 300;
  const mY = vp.h / 2 + 320;
  const visible = (x, y) => Math.abs(x - playerPos.x) <= mX && Math.abs(y - playerPos.y) <= mY;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${Math.ceil(WORLD_CONFIG.width / TILE) * TILE}px`,
          height: `${Math.ceil(WORLD_CONFIG.height / TILE) * TILE}px`,
          imageRendering: "pixelated",
          zIndex: 1,
        }}
      />

      {props.map((p, i) => {
        if (!visible(p.x, p.y)) return null;
        const z = feetY < p.y ? 20 : 4;
        return (
          <img
            key={`p${i}`}
            src={tileUrl(p.id)}
            alt=""
            style={{
              position: "absolute",
              left: `${Math.round(p.x - p.w / 2)}px`,
              top: `${Math.round(p.y - p.h)}px`,
              width: `${p.w}px`,
              height: `${p.h}px`,
              imageRendering: "pixelated",
              zIndex: z,
              pointerEvents: "none",
              filter: p.kind === "tree" || p.kind === "well"
                ? "drop-shadow(1px 3px 2px rgba(0,0,0,0.35))"
                : "none",
            }}
          />
        );
      })}

      {zones.map((zone) => {
        const { bp, W, H, left, top } = buildingRect(zone);
        const parts = blueprintParts(bp);
        const isActive = activeZone?.id === zone.id;
        const behindPlayer = feetY < zone.y;
        const bZ = behindPlayer ? 30 : 6;
        const halfW = W / 2;

        return (
          <React.Fragment key={zone.id}>
            <div
              style={{
                position: "absolute",
                left: `${zone.x - 36}px`,
                top: `${zone.y - 36}px`,
                width: "72px",
                height: "72px",
                border: `2px solid ${zone.color}`,
                backgroundColor: zone.color,
                opacity: isActive ? 0.5 : 0.16,
                boxShadow: isActive ? `0 0 24px ${zone.color}` : "none",
                zIndex: 2,
                pointerEvents: "none",
                animation: isActive ? "pixelPulse 1.6s infinite" : "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: `${zone.x - halfW * 0.85}px`,
                top: `${zone.y - 14}px`,
                width: `${W * 0.85}px`,
                height: "18px",
                backgroundColor: "rgba(0,0,0,0.33)",
                borderRadius: "50%",
                filter: "blur(3px)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />

            <div
              onClick={() => onZoneClick && onZoneClick(zone)}
              title={zone.buildingTitle}
              style={{
                position: "absolute",
                left: `${left}px`,
                top: `${top}px`,
                width: `${W}px`,
                height: `${H}px`,
                cursor: "pointer",
                zIndex: bZ,
                filter: isActive
                  ? `drop-shadow(0 0 8px ${zone.color})`
                  : "drop-shadow(3px 5px 4px rgba(0,0,0,0.45))",
              }}
            >
              {parts.map((p, i) => (
                <img
                  key={i}
                  src={tileUrl(p.id)}
                  alt=""
                  style={{
                    position: "absolute",
                    left: `${p.col * TILE}px`,
                    top: `${p.row * TILE}px`,
                    width: `${p.w * TILE}px`,
                    height: `${p.h * TILE}px`,
                    imageRendering: "pixelated",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                left: `${zone.x + halfW + 2}px`,
                top: `${zone.y - 6}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: behindPlayer ? 30 : 9,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.pixelDisplay,
                  fontSize: "6px",
                  lineHeight: 1.3,
                  color: PIXEL_COLORS.text,
                  backgroundColor: "rgba(8,12,20,0.92)",
                  border: `1px solid ${zone.color}`,
                  padding: "3px 5px",
                  marginBottom: "2px",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.6)",
                }}
              >
                {zone.name}
              </div>
              <img
                src={tileUrl(PROP.sign)}
                alt="signpost"
                style={{ width: "30px", height: "30px", imageRendering: "pixelated" }}
              />
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}