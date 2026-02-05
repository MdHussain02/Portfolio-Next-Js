import { useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  end,
  duration = 2000,
  delay = 0,
  start = 0,
  suffix = "",
  prefix = "",
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCount(start);

    let animationId: number;
    const startTimestamp = performance.now() + delay;

    const animate = (currentTimestamp: number) => {
      if (currentTimestamp < startTimestamp) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTimestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ultra-smooth easing function with optimized curve
      const t = progress;
      const easeOutQuint = 1 - Math.pow(1 - t, 5);

      // Add subtle elastic effect for more natural feel
      const elasticEffect =
        progress >= 1
          ? 1
          : Math.pow(2, -10 * progress) * Math.sin((progress - 0.1) * 5) + 1;

      const smoothProgress = easeOutQuint * 0.95 + elasticEffect * 0.05;

      const currentCount = Math.round(
        start + (end - start) * Math.min(smoothProgress, 1),
      );

      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsAnimating(false);
      }
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup function for animation cancellation
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        setIsAnimating(false);
      }
    };
  };

  const reset = () => {
    if (isAnimating) {
      setIsAnimating(false);
    }
    setCount(start);
  };

  const displayValue = `${prefix}${count}${suffix}`;

  return {
    count,
    displayValue,
    startAnimation,
    reset,
    isAnimating,
  };
};
