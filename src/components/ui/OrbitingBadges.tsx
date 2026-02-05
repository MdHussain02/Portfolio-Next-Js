"use client";

import { memo, useRef, useState } from "react";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiGit,
  SiFramer,
} from "react-icons/si";

const innerOrbit = [
  { icon: SiReact, name: "React" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiNextdotjs, name: "Next.js" },
];

const outerOrbit = [
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiGit, name: "Git" },
  { icon: SiFramer, name: "Framer" },
];

export const OrbitingBadges = memo(function OrbitingBadges() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 160, y: 160 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative w-80 h-80"
    >
      {/* Center static glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Interactive cursor glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          width: 200,
          height: 200,
          opacity,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Outer orbit ring */}
      <div className="absolute inset-0 border border-white/15 rounded-full" />

      {/* Inner orbit ring */}
      <div className="absolute inset-14 border border-white/15 rounded-full" />

      {/* Center - code symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 border border-white/30 bg-black flex items-center justify-center relative overflow-hidden">
          {/* Inner glow on center */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity,
              background: `radial-gradient(60px circle at ${position.x - 133}px ${position.y - 133}px, rgba(255,255,255,0.2), transparent 50%)`,
            }}
          />
          <span className="text-xl font-bold text-white/50 relative z-10">
            &lt;/&gt;
          </span>
        </div>
      </div>

      {/* Inner orbit icons - faster, clockwise */}
      <div className="absolute inset-14 animate-orbit-inner">
        {innerOrbit.map((tech, i) => {
          const angle = (i * 360) / innerOrbit.length - 90;
          const radian = (angle * Math.PI) / 180;
          const radius = 104;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={tech.name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="animate-orbit-inner-reverse p-2 bg-black border border-white/30 hover:border-white hover:bg-white/10 transition-all">
                <tech.icon size={18} className="text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Outer orbit icons - slower, counter-clockwise */}
      <div className="absolute inset-0 animate-orbit-outer">
        {outerOrbit.map((tech, i) => {
          const angle = (i * 360) / outerOrbit.length - 90;
          const radian = (angle * Math.PI) / 180;
          const radius = 160;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={tech.name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="animate-orbit-outer-reverse p-2.5 bg-black border border-white/30 hover:border-white hover:bg-white/10 transition-all">
                <tech.icon size={20} className="text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
