"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface CheckLinesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  opacity?: number;
  color?: string;
  variant?: "grid" | "dots" | "diagonal" | "cross" | "hexagon";
  interactive?: boolean;
  animationType?:
    | "none"
    | "mouseTrail"
    | "scrollWave"
    | "pulse"
    | "ripple"
    | "parallax"
    | "morph"
    | "particles"
    | "glow"
    | "magnetic";
  animationSpeed?: number;
  intensity?: number;
}

const CheckLinesBackground: React.FC<CheckLinesBackgroundProps> = ({
  children,
  className = "",
  gridSize = 40,
  opacity = 0.1,
  color = "white",
  variant = "grid",
  interactive = true,
  animationType = "mouseTrail",
  animationSpeed = 1,
  intensity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number; time: number }>
  >([]);
  const animationFrameRef = useRef<number | null>(null);

  const getPatternId = () =>
    `check-lines-${variant}-${gridSize}-${animationType}`;

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // Scroll tracking
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Click ripple effect
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || animationType !== "ripple") return;
      const rect = containerRef.current.getBoundingClientRect();
      const newRipple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now(),
        time: Date.now(),
      };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 2000);
    },
    [animationType],
  );

  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);
    container.addEventListener("mouseenter", () => setIsHovered(true));
    container.addEventListener("mouseleave", () => setIsHovered(false));
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("mouseenter", () => setIsHovered(true));
      container.removeEventListener("mouseleave", () => setIsHovered(false));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [interactive, handleMouseMove, handleClick, handleScroll]);

  // Animation loop
  useEffect(() => {
    if (!interactive || animationType === "none") return;

    const animate = () => {
      // Update animations here if needed
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [interactive, animationType]);

  const getAnimatedOpacity = () => {
    switch (animationType) {
      case "pulse":
        return (
          opacity * (0.5 + 0.5 * Math.sin(Date.now() * 0.001 * animationSpeed))
        );
      case "glow":
        return isHovered ? opacity * 2 : opacity;
      default:
        return opacity;
    }
  };

  const getTransform = () => {
    if (!interactive) return "";

    switch (animationType) {
      case "parallax":
        return `translate(0, ${scrollY * 0.5}px)`;
      case "magnetic":
        if (isHovered) {
          const centerX = containerRef.current?.clientWidth || 0;
          const centerY = containerRef.current?.clientHeight || 0;
          const offsetX = (mousePos.x - centerX / 2) * 0.02 * intensity;
          const offsetY = (mousePos.y - centerY / 2) * 0.02 * intensity;
          return `translate(${offsetX}px, ${offsetY}px)`;
        }
        return "";
      default:
        return "";
    }
  };

  const renderPattern = () => {
    const id = getPatternId();
    const animatedOpacity = getAnimatedOpacity();

    switch (variant) {
      case "grid":
        return (
          <pattern
            id={id}
            x="0"
            y="0"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={color}
              strokeWidth={animationType === "glow" && isHovered ? "2" : "1"}
              opacity={animatedOpacity}
            />
            {animationType === "mouseTrail" && (
              <circle
                cx={mousePos.x % gridSize}
                cy={mousePos.y % gridSize}
                r="3"
                fill={color}
                opacity={isHovered ? opacity * 3 : 0}
              />
            )}
          </pattern>
        );

      case "dots":
        return (
          <pattern
            id={id}
            x="0"
            y="0"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={gridSize / 2}
              cy={gridSize / 2}
              r={
                animationType === "pulse"
                  ? 1 + Math.sin(Date.now() * 0.003) * 0.5
                  : 1
              }
              fill={color}
              opacity={animatedOpacity}
            />
            {animationType === "particles" && (
              <>
                <circle
                  cx={gridSize / 2 + Math.sin(Date.now() * 0.001) * 5}
                  cy={gridSize / 2 + Math.cos(Date.now() * 0.001) * 5}
                  r="0.5"
                  fill={color}
                  opacity={animatedOpacity * 0.7}
                />
                <circle
                  cx={gridSize / 2 + Math.sin(Date.now() * 0.0015 + 1) * 3}
                  cy={gridSize / 2 + Math.cos(Date.now() * 0.0015 + 1) * 3}
                  r="0.3"
                  fill={color}
                  opacity={animatedOpacity * 0.5}
                />
              </>
            )}
          </pattern>
        );

      case "diagonal":
        return (
          <pattern
            id={id}
            x="0"
            y="0"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M 0 ${gridSize} L ${gridSize} 0`}
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity={animatedOpacity}
            />
            <path
              d={`M 0 0 L ${gridSize} ${gridSize}`}
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity={animatedOpacity}
            />
          </pattern>
        );

      case "cross":
        return (
          <pattern
            id={id}
            x="0"
            y="0"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize / 2} 0 L ${gridSize / 2} ${gridSize}`}
              fill="none"
              stroke={color}
              strokeWidth={
                animationType === "scrollWave"
                  ? 1 + Math.sin(scrollY * 0.01) * 0.5
                  : "1"
              }
              opacity={animatedOpacity}
            />
            <path
              d={`M 0 ${gridSize / 2} L ${gridSize} ${gridSize / 2}`}
              fill="none"
              stroke={color}
              strokeWidth={
                animationType === "scrollWave"
                  ? 1 + Math.cos(scrollY * 0.01) * 0.5
                  : "1"
              }
              opacity={animatedOpacity}
            />
          </pattern>
        );

      case "hexagon":
        const hexPoints = Array.from({ length: 6 }, (_, i) => {
          const angle = (i * Math.PI) / 3;
          const x = gridSize / 2 + (gridSize / 3) * Math.cos(angle);
          const y = gridSize / 2 + (gridSize / 3) * Math.sin(angle);
          return `${x},${y}`;
        }).join(" ");

        return (
          <pattern
            id={id}
            x="0"
            y="0"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points={hexPoints}
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity={animatedOpacity}
            />
          </pattern>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        cursor: animationType === "ripple" ? "pointer" : "default",
      }}
    >
      {/* SVG Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: getTransform() }}
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transition:
              animationType === "magnetic" ? "transform 0.1s ease-out" : "none",
          }}
        >
          <defs>
            {renderPattern()}

            {/* Gradient for glow effect */}
            {animationType === "glow" && (
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={color} stopOpacity={opacity * 2} />
                <stop
                  offset="100%"
                  stopColor={color}
                  stopOpacity={opacity * 0.1}
                />
              </radialGradient>
            )}

            {/* Filter for wave effect */}
            {animationType === "scrollWave" && (
              <filter id="wave">
                <feTurbulence
                  baseFrequency="0.01"
                  numOctaves="2"
                  seed={scrollY * 0.1}
                />
                <feDisplacementMap in="SourceGraphic" scale="2" />
              </filter>
            )}
          </defs>

          <rect
            width="100%"
            height="100%"
            fill={
              animationType === "glow" && isHovered
                ? "url(#glowGradient)"
                : `url(#${getPatternId()})`
            }
            style={{
              filter: animationType === "scrollWave" ? "url(#wave)" : "none",
            }}
          />

          {/* Mouse trail effect */}
          {animationType === "mouseTrail" && isHovered && (
            <circle
              cx={mousePos.x}
              cy={mousePos.y}
              r={20 * intensity}
              fill={color}
              opacity={opacity * 0.3}
              className="pointer-events-none"
            />
          )}

          {/* Ripple effects */}
          {animationType === "ripple" &&
            ripples.map((ripple) => {
              const age = (Date.now() - ripple.time) / 1000;
              const radius = age * 100 * intensity;
              const rippleOpacity = Math.max(0, opacity - age * 0.5);

              return (
                <circle
                  key={ripple.id}
                  cx={ripple.x}
                  cy={ripple.y}
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  opacity={rippleOpacity}
                  className="pointer-events-none"
                />
              );
            })}

          {/* Morph animation */}
          {animationType === "morph" && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="scale"
              values="1,1;1.1,0.9;1,1"
              dur={`${3 / animationSpeed}s`}
              repeatCount="indefinite"
            />
          )}
        </svg>
      </div>

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}

      {/* Interactive overlay for better mouse tracking */}
      {interactive && (
        <div className="absolute inset-0 pointer-events-auto opacity-0 z-0" />
      )}
    </div>
  );
};

export default CheckLinesBackground;
