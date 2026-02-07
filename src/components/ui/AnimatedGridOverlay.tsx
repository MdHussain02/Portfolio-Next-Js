"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedGridOverlayProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  opacity?: number;
  color?: string;
  animationType?:
    | "none"
    | "fade"
    | "slide"
    | "zoom"
    | "rotate"
    | "wave"
    | "pulse"
    | "flow"
    | "matrix"
    | "glitch";
  speed?: "slow" | "medium" | "fast";
  direction?: "up" | "down" | "left" | "right" | "diagonal";
  interactive?: boolean;
  showOnHover?: boolean;
}

const AnimatedGridOverlay: React.FC<AnimatedGridOverlayProps> = ({
  children,
  className = "",
  gridSize = 50,
  opacity = 0.05,
  color = "#ffffff",
  animationType = "fade",
  speed = "medium",
  direction = "up",
  interactive = false,
  showOnHover = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!showOnHover);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getSpeedDuration = () => {
    switch (speed) {
      case "slow":
        return "20s";
      case "fast":
        return "5s";
      default:
        return "10s";
    }
  };

  const getAnimationClasses = () => {
    const baseClasses = "absolute inset-0 pointer-events-none";
    const speedClass = `duration-${getSpeedDuration()}`;

    switch (animationType) {
      case "fade":
        return `${baseClasses} animate-pulse`;
      case "slide":
        return `${baseClasses} animate-slide-${direction}`;
      case "zoom":
        return `${baseClasses} animate-zoom`;
      case "rotate":
        return `${baseClasses} animate-spin`;
      case "wave":
        return `${baseClasses} animate-wave`;
      case "pulse":
        return `${baseClasses} animate-pulse-soft`;
      case "flow":
        return `${baseClasses} animate-flow`;
      case "matrix":
        return `${baseClasses} animate-matrix`;
      case "glitch":
        return `${baseClasses} animate-glitch`;
      default:
        return baseClasses;
    }
  };

  const getGridStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      backgroundImage: `
        linear-gradient(${color} 1px, transparent 1px),
        linear-gradient(90deg, ${color} 1px, transparent 1px)
      `,
      backgroundSize: `${gridSize}px ${gridSize}px`,
      opacity: isVisible ? opacity : 0,
      transition: showOnHover ? "opacity 0.3s ease" : "none",
    };

    if (interactive && mousePosition.x && mousePosition.y) {
      baseStyle.backgroundPosition = `${mousePosition.x * 0.1}px ${mousePosition.y * 0.1}px`;
    }

    switch (animationType) {
      case "wave":
        baseStyle.backgroundImage = `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `;
        baseStyle.transform = `translateY(${Math.sin(Date.now() * 0.001) * 10}px)`;
        break;

      case "flow":
        baseStyle.animation = `gridFlow ${getSpeedDuration()} linear infinite`;
        break;

      case "matrix":
        baseStyle.backgroundImage = `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${color} 2px,
            ${color} 4px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            ${color} 2px,
            ${color} 4px
          )
        `;
        baseStyle.animation = `matrixRain ${getSpeedDuration()} linear infinite`;
        break;

      case "glitch":
        baseStyle.animation = `glitchGrid ${getSpeedDuration()} infinite`;
        break;
    }

    return baseStyle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (showOnHover) setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (showOnHover) setIsVisible(false);
    setMousePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    // Add custom CSS animations to document head if they don't exist
    const styleId = "animated-grid-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes gridFlow {
          0% { background-position: 0 0; }
          100% { background-position: ${gridSize}px ${gridSize}px; }
        }

        @keyframes matrixRain {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 0 ${gridSize}px, ${gridSize}px 0; }
        }

        @keyframes glitchGrid {
          0%, 100% {
            background-position: 0 0;
            opacity: ${opacity};
          }
          10% {
            background-position: 2px 0;
            opacity: ${opacity * 1.5};
          }
          20% {
            background-position: -2px 0;
            opacity: ${opacity * 0.5};
          }
          30% {
            background-position: 0 0;
            opacity: ${opacity};
          }
          40% {
            background-position: 0 2px;
            opacity: ${opacity * 1.2};
          }
          50% {
            background-position: 0 -2px;
            opacity: ${opacity * 0.8};
          }
        }

        @keyframes slide-up {
          0% { background-position: 0 ${gridSize}px; }
          100% { background-position: 0 0; }
        }

        @keyframes slide-down {
          0% { background-position: 0 0; }
          100% { background-position: 0 ${gridSize}px; }
        }

        @keyframes slide-left {
          0% { background-position: ${gridSize}px 0; }
          100% { background-position: 0 0; }
        }

        @keyframes slide-right {
          0% { background-position: 0 0; }
          100% { background-position: ${gridSize}px 0; }
        }

        @keyframes slide-diagonal {
          0% { background-position: 0 0; }
          100% { background-position: ${gridSize}px ${gridSize}px; }
        }

        @keyframes zoom {
          0% { background-size: ${gridSize}px ${gridSize}px; }
          50% { background-size: ${gridSize * 1.2}px ${gridSize * 1.2}px; }
          100% { background-size: ${gridSize}px ${gridSize}px; }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: ${opacity}; }
          50% { opacity: ${opacity * 1.5}; }
        }

        .animate-slide-up { animation: slide-up ${getSpeedDuration()} linear infinite; }
        .animate-slide-down { animation: slide-down ${getSpeedDuration()} linear infinite; }
        .animate-slide-left { animation: slide-left ${getSpeedDuration()} linear infinite; }
        .animate-slide-right { animation: slide-right ${getSpeedDuration()} linear infinite; }
        .animate-slide-diagonal { animation: slide-diagonal ${getSpeedDuration()} linear infinite; }
        .animate-zoom { animation: zoom ${getSpeedDuration()} ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft ${getSpeedDuration()} ease-in-out infinite; }
        .animate-flow { animation: gridFlow ${getSpeedDuration()} linear infinite; }
        .animate-matrix { animation: matrixRain ${getSpeedDuration()} linear infinite; }
        .animate-glitch { animation: glitchGrid ${getSpeedDuration()} infinite; }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Cleanup: remove styles when component unmounts
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [gridSize, opacity, getSpeedDuration]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Primary Grid Layer */}
      <div
        className={getAnimationClasses()}
        style={getGridStyle()}
      />

      {/* Secondary Grid Layer for Complex Effects */}
      {(animationType === "matrix" || animationType === "glitch") && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(45deg, ${color} 1px, transparent 1px),
              linear-gradient(-45deg, ${color} 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize * 0.7}px ${gridSize * 0.7}px`,
            opacity: opacity * 0.3,
            animation: animationType === "matrix"
              ? `matrixRain ${getSpeedDuration()} linear infinite reverse`
              : `glitchGrid ${getSpeedDuration()} infinite`,
            animationDelay: "0.5s",
          }}
        />
      )}

      {/* Overlay Effects */}
      {animationType === "wave" && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 25% 25%, ${color}22 0%, transparent 50%)`,
              opacity: opacity * 2,
              animation: `pulse-soft ${getSpeedDuration()} ease-in-out infinite`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 75% 75%, ${color}22 0%, transparent 50%)`,
              opacity: opacity * 2,
              animation: `pulse-soft ${getSpeedDuration()} ease-in-out infinite reverse`,
              animationDelay: "1s",
            }}
          />
        </>
      )}

      {/* Interactive Cursor Effect */}
      {interactive && mousePosition.x > 0 && mousePosition.y > 0 && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
            background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
            borderRadius: "50%",
            transition: "opacity 0.1s ease",
            opacity: 0.5,
            zIndex: 2,
          }}
        />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default AnimatedGridOverlay;
