"use client";

import { memo, useRef, useState } from "react";

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const FilterButton = memo(function FilterButton({
  label,
  active,
  onClick,
}: FilterButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden px-4 py-1.5 text-xs uppercase tracking-wider transition-colors ${
        active
          ? "bg-white text-black"
          : "border border-white/20 text-gray-400 hover:border-white/50 hover:text-white"
      }`}
    >
      {!active && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity,
            background: `radial-gradient(60px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 50%)`,
          }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
});
