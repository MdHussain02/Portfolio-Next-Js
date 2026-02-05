"use client";

import { memo } from "react";
import { styles } from "@/lib";
import { getSkillIcon } from "./Icons";
import type { Skill, SoftSkill } from "@/types";

interface SkillBarProps {
  skill: Skill | SoftSkill;
  showIcon?: boolean;
}

export const SkillBar = memo(function SkillBar({
  skill,
  showIcon = true,
}: SkillBarProps) {
  const hasIcon = "icon" in skill && showIcon;

  return (
    <div className={`${styles.card} p-4`}>
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
      <div className="h-1 bg-white/10 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
});
