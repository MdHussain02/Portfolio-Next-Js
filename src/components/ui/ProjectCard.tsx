"use client";

import { memo, useRef, useState } from "react";
import type { Project } from "@/types";
import { styles } from "@/lib";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard = memo(function ProjectCard({
  project,
  index = 0,
}: ProjectCardProps) {
  const { title, description, tags, liveUrl, githubUrl } = project;
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-black border border-white/20 group"
    >
      {/* Inner glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
        style={{
          opacity,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.8), transparent 50%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Number */}
      <div className="h-32 bg-white/5 border-b border-white/10 flex items-center justify-center relative z-10">
        <span className="text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 relative z-10">
        <h3 className={styles.heading3}>{title}</h3>
        <p className={`${styles.body} text-sm line-clamp-2`}>{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-white/10">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white hover:text-gray-300 uppercase tracking-wider"
            >
              Live →
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-white uppercase tracking-wider"
            >
              Code →
            </a>
          )}
        </div>
      </div>
    </div>
  );
});
