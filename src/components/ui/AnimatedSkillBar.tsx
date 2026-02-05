"use client";

import { memo, useEffect, useRef, useState } from "react";
import { styles } from "@/lib";
import { getSkillIcon } from "./Icons";
import type { Skill, SoftSkill } from "@/types";

interface AnimatedSkillBarProps {
  skill: Skill | SoftSkill;
  showIcon?: boolean;
  delay?: number;
}

export const AnimatedSkillBar = memo(function AnimatedSkillBar({
  skill,
  showIcon = true,
  delay = 0,
}: AnimatedSkillBarProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasIcon = "icon" in skill && showIcon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate progress bar
          setTimeout(() => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${skill.level / 100})`;
            }
          }, delay);

          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, skill.level, delay]);

  return (
    <div
      ref={containerRef}
      className={`${styles.card} p-4 skill-container optimize-animations`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {hasIcon && (
            <span className="text-base text-white">
              {getSkillIcon((skill as Skill).icon)}
            </span>
          )}
          <span className="text-white text-sm font-medium uppercase tracking-wider">
            {skill.name}
          </span>
        </div>
        <span className="text-xs text-gray-500">{skill.level}%</span>
      </div>

      <div className="h-1 bg-white/10 overflow-hidden rounded-full">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-white to-gray-200 rounded-full skill-progress-bar"
          style={{
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: `transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
});
