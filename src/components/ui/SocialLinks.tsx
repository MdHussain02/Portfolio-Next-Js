"use client";

import { memo, useRef, useState } from "react";
import { useSocial } from "@/hooks";
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from "./Icons";

interface SocialLinksProps {
  className?: string;
}

const SocialIcon = memo(function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden p-3 border border-white/30 text-white hover:border-white transition-colors"
      aria-label={label}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity,
          background: `radial-gradient(60px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.2), transparent 50%)`,
        }}
      />
      <span className="relative z-10">{icon}</span>
    </a>
  );
});

export const SocialLinks = memo(function SocialLinks({
  className = "",
}: SocialLinksProps) {
  const social = useSocial();

  const links = [
    { href: social.github, icon: <GithubIcon />, label: "GitHub" },
    { href: social.linkedin, icon: <LinkedinIcon />, label: "LinkedIn" },
    { href: social.twitter, icon: <TwitterIcon />, label: "Twitter" },
    { href: social.dribbble, icon: <DribbbleIcon />, label: "Dribbble" },
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {links.map((link) => (
        <SocialIcon key={link.label} {...link} />
      ))}
    </div>
  );
});
