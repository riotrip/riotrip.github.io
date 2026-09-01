export const PIXEL_COLORS = {
  screenBg: "#0c101a",
  screenBgDeep: "#070a12",
  cardBg: "#121826",
  cardBgAlt: "#161e30",
  dialogBg: "#0f1624",
  border: "#25334d",
  borderBright: "#3c5075",
  borderDark: "#101622",
  accent: "#f4b41a",
  accentGlow: "#ffd269",
  accentCyan: "#38d9a9",
  accentRed: "#ff6b6b",
  accentBlue: "#4dabf7",
  text: "#e8efff",
  textDim: "#9ab0d3",
  textMuted: "#5e7399",
  textDark: "#080c14",
  boxHighlight: "#2d3d5d",
  boxShadow: "#060910",
};

export const FONTS = {
  pixelDisplay: "'Press Start 2P', monospace",
  pixelSub: "'Press Start 2P', monospace",
  companionMono: "'JetBrains Mono', monospace",
};

export const PIXEL_BOX_STYLES = {
  dialog: {
    backgroundColor: PIXEL_COLORS.dialogBg,
    border: `3px solid ${PIXEL_COLORS.borderBright}`,
    outline: `2px solid ${PIXEL_COLORS.borderDark}`,
    boxShadow: `inset 2px 2px 0px ${PIXEL_COLORS.boxHighlight}, inset -2px -2px 0px ${PIXEL_COLORS.boxShadow}, 4px 4px 0px rgba(0,0,0,0.6)`,
    imageRendering: "pixelated",
  },
  card: {
    backgroundColor: PIXEL_COLORS.cardBg,
    border: `2px solid ${PIXEL_COLORS.border}`,
    boxShadow: `inset 1px 1px 0px ${PIXEL_COLORS.boxHighlight}, inset -1px -1px 0px ${PIXEL_COLORS.boxShadow}, 3px 3px 0px rgba(0,0,0,0.4)`,
    imageRendering: "pixelated",
  },
  button: {
    backgroundColor: PIXEL_COLORS.cardBgAlt,
    border: `2px solid ${PIXEL_COLORS.borderBright}`,
    boxShadow: `inset 1px 1px 0px ${PIXEL_COLORS.boxHighlight}, inset -1px -1px 0px ${PIXEL_COLORS.boxShadow}, 2px 2px 0px rgba(0,0,0,0.5)`,
    fontFamily: FONTS.pixelDisplay,
    fontSize: "9px",
    color: PIXEL_COLORS.text,
    cursor: "pointer",
    padding: "8px 12px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    transition: "transform 0.05s ease, background-color 0.1s ease",
  }
};

export const SPRITES = {
  north: "/img/sprite/north.png",
  south: "/img/sprite/south.png",
  east: "/img/sprite/east.png",
  west: "/img/sprite/west.png",
  northEast: "/img/sprite/north-east.png",
  northWest: "/img/sprite/north-west.png",
  southEast: "/img/sprite/south-east.png",
  southWest: "/img/sprite/south-west.png",
};