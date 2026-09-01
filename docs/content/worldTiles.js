export const TILE = 24;

export const STREET_Y = 1200;
export const PATH_HALF = 36;
export const PLAZA = { cx: 1300, cy: 1200, hw: 150, hh: 122 };
export const PATH_SEGMENTS = [
  [440, STREET_Y, 2360, STREET_Y],
  [480, 728, 480, STREET_Y],
  [2100, 688, 2100, STREET_Y],
  [1400, 428, 1400, STREET_Y],
  [1850, 1150, 1850, STREET_Y],
  [1780, STREET_Y, 1780, 1998], [1650, 1998, 1780, 1998],
  [680, STREET_Y, 680, 1898], [550, 1898, 680, 1898],
  [2130, STREET_Y, 2130, 1498], [2130, 1498, 2250, 1498],
  [940, 980, 940, STREET_Y],
  [1150, 1440, 1150, STREET_Y],
];

export function inPlaza(x, y) {
  return Math.abs(x - PLAZA.cx) <= PLAZA.hw && Math.abs(y - PLAZA.cy) <= PLAZA.hh;
}
export function onPath(x, y) {
  if (inPlaza(x, y)) return true;
  for (const [x0, y0, x1, y1] of PATH_SEGMENTS) {
    if (
      x >= Math.min(x0, x1) - PATH_HALF &&
      x <= Math.max(x0, x1) + PATH_HALF &&
      y >= Math.min(y0, y1) - PATH_HALF &&
      y <= Math.max(y0, y1) + PATH_HALF
    )
      return true;
  }
  return false;
}

export function tileUrl(index) {
  const n = String(index).padStart(4, "0");
  const folder = index >= 72 ? "props" : index >= 36 ? "buildings" : "tiles";
  return `/assets/${folder}/tile_${n}.png`;
}

export const GROUND = {
  grass: 0,
  grassA: 1,
  grassB: 2,
  dirt: 25,
  dirtA: 24,
  dirtB: 26,
};

export const TREE_TILES = [132, 133, 134, 133, 134, 15, 27];

export const GROUND_DECOR = [
  { id: 2, weight: 5 },
  { id: 1, weight: 5 },
  { id: 29, weight: 3 },
];

export const PROP = {
  treeGreen: [132, 133, 134],
  treeAutumn: [15, 27, 3],
  bush: [5],
  well: 57,
  barrel: 130,
  crate: 103,
  crate2: 131,
  pot: 107,
  npc: 104,
  sign: 83,
  hive: 94,
  fenceRun: 45,
  fencePost: 47,
};

export const SCENERY = [
  { type: "well", x: 940, y: 950 },
  { type: "well", x: 1760, y: 780 },
  { type: "garden", x: 1150, y: 1520, w: 6, h: 4 },
  { type: "grove", x: 980, y: 1560, n: 7, r: 130 },
  { type: "grove", x: 1660, y: 470, n: 6, r: 120 },
  { type: "grove", x: 2280, y: 980, n: 6, r: 120 },
  { type: "grove", x: 760, y: 1150, n: 5, r: 110 },
  { type: "grove", x: 2200, y: 1780, n: 6, r: 120 },
  { type: "grove", x: 1500, y: 1720, n: 5, r: 110 },
  { type: "grove", x: 620, y: 560, n: 5, r: 110 },
];

export const BLUEPRINTS = {
  lab: {
    rows: [
      [63, 63, 63, 63, 63],
      [48, 49, 49, 49, 50],
      [60, 61, 61, 61, 62],
      [60, 61, 61, 61, 62],
      [60, 61, 61, 61, 62],
      [60, 61, 51, 61, 62],
    ],
  },
  mart: {
    rows: [
      [67, 67, 67, 67, 67],
      [52, 53, 53, 53, 54],
      [64, 65, 65, 65, 66],
      [64, 65, 65, 65, 66],
      [64, 65, 65, 65, 66],
      [64, 65, 55, 65, 66],
    ],
  },
  academy: {
    rows: [
      [63, 63, 63, 63, 63, 63, 63],
      [48, 49, 49, 49, 49, 49, 50],
      [60, 61, 61, 61, 61, 61, 62],
      [60, 61, 61, 61, 61, 61, 62],
      [60, 61, 61, 61, 61, 61, 62],
      [60, 61, 61, 61, 61, 61, 62],
      [60, 61, 61, 51, 61, 61, 62],
    ],
  },
  pokecenter: {
    rows: [
      [67, 67, 67, 67, 67],
      [48, 49, 49, 49, 50],
      [60, 61, 61, 61, 62],
      [60, 61, 61, 61, 62],
      [60, 61, 61, 61, 62],
      [60, 61, 51, 61, 62],
    ],
  },
  guild: {
    rows: [
      [67, 67, 67, 67, 67],
      [52, 53, 53, 53, 54],
      [64, 65, 65, 65, 66],
      [64, 65, 65, 65, 66],
      [64, 65, 65, 65, 66],
      [64, 65, 65, 65, 66],
      [64, 65, 55, 65, 66],
    ],
  },
  tower: {
    rows: [
      [null, 95, null],
      [63, 63, 63],
      [48, 49, 50],
      [60, 61, 62],
      [60, 61, 62],
      [60, 61, 62],
      [60, 51, 62],
    ],
  },
  well: {
    parts: [{ id: 57, col: 0, row: 0, w: 2, h: 2 }],
  },
  camp: {
    parts: [
      { id: 92, col: 0, row: 0, w: 3, h: 3 },
      { id: 92, col: 6, row: 0, w: 3, h: 3 },
      { id: 92, col: 3, row: 1, w: 3, h: 3 },
      { id: 107, col: 2, row: 3, w: 1, h: 1 },
      { id: 130, col: 5, row: 3, w: 1, h: 1 },
      { id: 103, col: 8, row: 3, w: 1, h: 1 },
    ],
  },
};

export function blueprintSize(bp) {
  if (bp.rows) {
    return { cols: Math.max(...bp.rows.map((r) => r.length)), rows: bp.rows.length };
  }
  let cols = 0;
  let rows = 0;
  for (const p of bp.parts) {
    cols = Math.max(cols, p.col + p.w);
    rows = Math.max(rows, p.row + p.h);
  }
  return { cols, rows };
}

export function blueprintParts(bp) {
  if (bp.parts) return bp.parts;
  const out = [];
  bp.rows.forEach((row, r) => {
    row.forEach((id, c) => {
      if (id != null) out.push({ id, col: c, row: r, w: 1, h: 1 });
    });
  });
  return out;
}