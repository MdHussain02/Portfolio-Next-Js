"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks";

interface CountUpStatProps {
  value: string;
  label: string;
  delay?: number;
}

const parseStatValue = (value: string) => {
  // Extract number and suffix from strings like "5+", "50+", etc.
  const match = value.match(/^(\d+)(\+?)$/);
  if (match) {
    return {
      number: parseInt(match[1]),
      suffix: match[2],
    };
  }

  // Fallback for pure numbers
  const numValue = parseInt(value);
  if (!isNaN(numValue)) {
    return {
      number: numValue,
      suffix: "",
    };
  }

  return {
    number: 0,
    suffix: value,
  };
};

export const CountUpStat = ({ value, label, delay = 0 }: CountUpStatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const { number, suffix } = parseStatValue(value);

  const { displayValue, startAnimation } = useCountUp({
    end: number,
    duration: 1800,
    delay,
    suffix,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          startAnimation();
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startAnimation, hasStarted]);

  return (
    <div ref={ref} className="text-center animate-count-up gpu-accelerated">
      <span className="text-3xl font-bold text-white tabular-nums smooth-hover">
        {displayValue}
      </span>
      <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
};
