"use client";

import { useState, useEffect, memo } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const TypeWriter = memo(function TypeWriter({
  text,
  speed = 80,
  delay = 0,
  className = "",
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, started]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-0.5 h-[1em] bg-white ml-1 animate-pulse" />
    </span>
  );
});
