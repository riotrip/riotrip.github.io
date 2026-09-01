import React, { useState, useEffect, useRef, useCallback } from "react";
import { FONTS, PIXEL_COLORS, PIXEL_BOX_STYLES } from "./theme/tokens";
import { WORLD_CONFIG, ZONES } from "./content/zones";
import PlayerSprite from "./components/PlayerSprite";
import OverworldMap from "./components/OverworldMap";
import HUD from "./components/HUD";
import Minimap from "./components/Minimap";
import ZoneModal from "./components/ZoneModal";
import MainMenu from "./components/MainMenu";

export default function Portfolio() {
  const [showMenu, setShowMenu] = useState(true);

  const [playerPos, setPlayerPos] = useState(WORLD_CONFIG.spawn);
  const [playerDir, setPlayerDir] = useState("south");
  const [isMoving, setIsMoving] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const [selectedZoneModal, setSelectedZoneModal] = useState(null);

  const worldRef = useRef(null);
  const cameraRef = useRef({ x: WORLD_CONFIG.spawn.x, y: WORLD_CONFIG.spawn.y });
  const viewportRef = useRef({ width: window.innerWidth, height: window.innerHeight });
  const audioRef = useRef(null);
  const [bgmOn, setBgmOn] = useState(false);

  // Update viewport dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      viewportRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check proximity to all zones
  useEffect(() => {
    let nearest = null;
    let minDistance = Infinity;

    for (const zone of ZONES) {
      const dx = playerPos.x - zone.x;
      const dy = playerPos.y - zone.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < zone.radius && dist < minDistance) {
        nearest = zone;
        minDistance = dist;
      }
    }

    setActiveZone(nearest);
  }, [playerPos]);

  // Handle Spacebar or Enter to interact with active zone
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === "Space" || e.code === "Enter") && activeZone && !selectedZoneModal) {
        e.preventDefault();
        setSelectedZoneModal(activeZone);
      } else if (e.code === "Escape" && selectedZoneModal) {
        e.preventDefault();
        setSelectedZoneModal(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeZone, selectedZoneModal]);

  // Smooth Camera Follow Loop using requestAnimationFrame
  const updateCamera = useCallback(() => {
    const vw = viewportRef.current.width;
    const vh = viewportRef.current.height;

    // Target camera centered on player
    const targetX = playerPos.x - vw / 2;
    const targetY = playerPos.y - vh / 2;

    // Clamp camera within world bounds
    const maxCamX = Math.max(0, WORLD_CONFIG.width - vw);
    const maxCamY = Math.max(0, WORLD_CONFIG.height - vh);

    const clampedTargetX = Math.max(0, Math.min(maxCamX, targetX));
    const clampedTargetY = Math.max(0, Math.min(maxCamY, targetY));

    // Smooth Lerp (12% per frame)
    cameraRef.current.x += (clampedTargetX - cameraRef.current.x) * 0.12;
    cameraRef.current.y += (clampedTargetY - cameraRef.current.y) * 0.12;

    if (worldRef.current) {
      worldRef.current.style.transform = `translate3d(${-Math.round(cameraRef.current.x)}px, ${-Math.round(cameraRef.current.y)}px, 0)`;
    }

    requestAnimationFrame(updateCamera);
  }, [playerPos]);

  useEffect(() => {
    const animId = requestAnimationFrame(updateCamera);
    return () => cancelAnimationFrame(animId);
  }, [updateCamera]);

  const handleSpriteState = (state) => {
    setPlayerPos({ x: state.x, y: state.y });
    setPlayerDir(state.direction);
    setIsMoving(state.isMoving);
  };

  const handleTeleport = (tx, ty) => {
    setPlayerPos({ x: tx, y: ty + 40 });
  };

  const handleMenuStart = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/bgm.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }
    audioRef.current.play().then(() => setBgmOn(true)).catch(() => {});
    setTimeout(() => setShowMenu(false), 600);
  };

  const toggleBgm = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (bgmOn) {
      audio.pause();
      setBgmOn(false);
    } else {
      audio.play().catch(() => {});
      setBgmOn(true);
    }
  };

  if (showMenu) {
    return <MainMenu onStart={handleMenuStart} />;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#070b14",
        userSelect: "none",
      }}
    >
      {/* Retro CRT Scanlines */}
      <div className="scanlines-overlay" />

      {/* BGM Toggle */}
      <button
        onClick={toggleBgm}
        style={{
          position: "fixed",
          bottom: "16px",
          left: "16px",
          zIndex: 200,
          ...PIXEL_BOX_STYLES.button,
          fontSize: "8px",
          padding: "6px 10px",
          color: bgmOn ? PIXEL_COLORS.accentCyan : PIXEL_COLORS.textMuted,
        }}
      >
        {bgmOn ? "♪ BGM ON" : "♪ BGM OFF"}
      </button>

      {/* Fixed HUD System */}
      <HUD
        playerPos={playerPos}
        direction={playerDir}
        isMoving={isMoving}
        activeZone={activeZone}
        onInteract={(zone) => setSelectedZoneModal(zone)}
      />

      {/* Radar Minimap */}
      <Minimap
        worldWidth={WORLD_CONFIG.width}
        worldHeight={WORLD_CONFIG.height}
        playerPos={playerPos}
        zones={ZONES}
        activeZone={activeZone}
        onTeleport={handleTeleport}
      />

      {/* World Map Container (Camera Translated) */}
      <div
        ref={worldRef}
        style={{
          position: "absolute",
          width: `${WORLD_CONFIG.width}px`,
          height: `${WORLD_CONFIG.height}px`,
          backgroundColor: "#5a9349",
          willChange: "transform",
        }}
      >
        {/* World Map Graphics, Biomes & Buildings */}
        <OverworldMap
          zones={ZONES}
          playerPos={playerPos}
          activeZone={activeZone}
          onZoneClick={(zone) => setSelectedZoneModal(zone)}
        />

        {/* Freely Movable Character Sprite in World Space */}
        <PlayerSprite
          containerRef={worldRef}
          spriteSize={72}
          onStateChange={handleSpriteState}
        />
      </div>

      {/* Interactive Zone Modal (When triggered) */}
      {selectedZoneModal && (
        <ZoneModal
          zone={selectedZoneModal}
          onClose={() => setSelectedZoneModal(null)}
        />
      )}
    </div>
  );
}