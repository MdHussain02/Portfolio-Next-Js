"use client";

import React, { useEffect, useRef, useState } from "react";

interface StarFieldProps {
  starCount?: number;
  className?: string;
}

const StarField: React.FC<StarFieldProps> = ({
  starCount = 200,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<
    Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      delay: number;
      duration: number;
      animationType: string;
    }>
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const animations = ["star-blink", "star-twinkle", "star-flicker"];

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.7,
          delay: Math.random() * 5,
          duration: 1.5 + Math.random() * 3,
          animationType:
            animations[Math.floor(Math.random() * animations.length)],
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [starCount]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      {stars.map((star, index) => (
        <div
          key={index}
          className={`absolute rounded-full bg-white ${star.animationType}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
