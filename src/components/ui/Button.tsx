"use client";

import { memo, ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { styles } from "@/lib";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  external?: boolean;
}

export const Button = memo(function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  external = false,
}: ButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const classes = `
    ${styles.btnBase}
    ${variant === "primary" ? styles.btnPrimary : styles.btnOutline}
    ${styles.btnSizes[size]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `.trim();

  const glowStyle =
    variant === "outline"
      ? {
          opacity,
          background: `radial-gradient(80px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 50%)`,
        }
      : {};

  const content = (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden"
    >
      {variant === "outline" && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={glowStyle}
        />
      )}
      <span className="relative z-10">{children}</span>
    </div>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
});
