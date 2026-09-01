import React, { useState, useEffect, useRef, useCallback } from "react";
import { SPRITES } from "../theme/tokens";

const DIRECTION_SPRITES = {
  north: SPRITES.north,
  south: SPRITES.south,
  east: SPRITES.east,
  west: SPRITES.west,
  northEast: SPRITES.northEast,
  northWest: SPRITES.northWest,
  southEast: SPRITES.southEast,
  southWest: SPRITES.southWest,
};

export default function PlayerSprite({
  containerRef,
  spriteSize = 72,
  onStateChange,
}) {
  const [position, setPosition] = useState({ x: 1300, y: 1200 });
  const [direction, setDirection] = useState("south");
  const [isMoving, setIsMoving] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0);

  const keysPressed = useRef({});
  const animFrameId = useRef(null);
  const posRef = useRef(position);
  const boundsRef = useRef({ width: 2600, height: 2200 });
  const lastStepTime = useRef(0);

  posRef.current = position;

  useEffect(() => {
    if (!containerRef?.current) return;

    const updateBounds = () => {
      const rect = containerRef.current.getBoundingClientRect();
      boundsRef.current = {
        width: rect.width || 2600,
        height: rect.height || 2200,
      };
    };

    updateBounds();
    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(containerRef.current);
    window.addEventListener("resize", updateBounds);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [containerRef]);

  const calculateDirection = (keys) => {
    const up = keys["w"] || keys["arrowup"];
    const down = keys["s"] || keys["arrowdown"];
    const left = keys["a"] || keys["arrowleft"];
    const right = keys["d"] || keys["arrowright"];

    if (up && right) return "northEast";
    if (up && left) return "northWest";
    if (down && right) return "southEast";
    if (down && left) return "southWest";
    if (up) return "north";
    if (down) return "south";
    if (right) return "east";
    if (left) return "west";
    return null;
  };

  const updateLoop = useCallback((time) => {
    const keys = keysPressed.current;
    const currentDir = calculateDirection(keys);

    if (currentDir) {
      setIsMoving(true);
      setDirection(currentDir);

      if (time - lastStepTime.current > 140) {
        setWalkFrame((prev) => (prev === 0 ? 1 : 0));
        lastStepTime.current = time;
      }

      const speed = 6.2;
      let dx = 0;
      let dy = 0;

      const up = keys["w"] || keys["arrowup"];
      const down = keys["s"] || keys["arrowdown"];
      const left = keys["a"] || keys["arrowleft"];
      const right = keys["d"] || keys["arrowright"];

      if (up) dy -= speed;
      if (down) dy += speed;
      if (left) dx -= speed;
      if (right) dx += speed;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      const { width, height } = boundsRef.current;
      const minX = 16;
      const maxX = Math.max(minX, width - spriteSize - 16);
      const minY = 16;
      const maxY = Math.max(minY, height - spriteSize - 16);

      const nextX = Math.max(minX, Math.min(maxX, posRef.current.x + dx));
      const nextY = Math.max(minY, Math.min(maxY, posRef.current.y + dy));

      setPosition({ x: nextX, y: nextY });

      if (onStateChange) {
        onStateChange({
          x: Math.round(nextX),
          y: Math.round(nextY),
          direction: currentDir,
          isMoving: true,
        });
      }
    } else {
      setIsMoving(false);
      setWalkFrame(0);
      if (onStateChange) {
        onStateChange({
          x: Math.round(posRef.current.x),
          y: Math.round(posRef.current.y),
          direction,
          isMoving: false,
        });
      }
    }

    animFrameId.current = requestAnimationFrame(updateLoop);
  }, [spriteSize, onStateChange, direction]);

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [updateLoop]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
          e.preventDefault();
        }
        keysPressed.current[key] = true;
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keysPressed.current[key]) {
        delete keysPressed.current[key];
      }
    };

    const handleBlur = () => {
      keysPressed.current = {};
      setIsMoving(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const spriteSrc = DIRECTION_SPRITES[direction] || SPRITES.south;

  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${spriteSize}px`,
        height: `${spriteSize}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        pointerEvents: "none",
        zIndex: 10,
        willChange: "transform, left, top",
      }}
    >
      <img
        src={spriteSrc}
        alt={`Trainer facing ${direction}`}
        style={{
          width: `${spriteSize}px`,
          height: `${spriteSize}px`,
          imageRendering: "pixelated",
          transform: isMoving
            ? `translateY(${walkFrame === 1 ? -4 : 0}px)`
            : "translateY(0px)",
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.8))",
          transition: isMoving ? "none" : "transform 0.15s ease",
        }}
      />

      <div
        style={{
          width: `${spriteSize * 0.55}px`,
          height: "8px",
          marginTop: "-6px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          transform: isMoving
            ? `scaleX(${walkFrame === 1 ? 0.75 : 1.15})`
            : "scaleX(1)",
          imageRendering: "pixelated",
          boxShadow: "0 0 6px rgba(0,0,0,0.8)",
        }}
      />
    </div>
  );
}