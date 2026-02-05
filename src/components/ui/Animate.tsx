"use client";

import { memo, ReactNode } from "react";
import { motion } from "framer-motion";
import { DURATION, STAGGER, VIEWPORT_AMOUNT } from "@/lib";

interface AnimateProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  // If true, animates when scrolled into view. If false, animates on mount.
  onScroll?: boolean;
}

// Memoized animation component
export const Animate = memo(function Animate({
  children,
  delay = 0,
  className = "",
  onScroll = false
}: AnimateProps) {
  const props = onScroll
    ? {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: VIEWPORT_AMOUNT },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      {...props}
      transition={{ duration: DURATION.fast, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

// Stagger animation for lists
interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export const StaggerList = memo(function StaggerList({ children, className = "" }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: STAGGER } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export const StaggerItem = memo(function StaggerItem({ children, className = "" }: StaggerProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: DURATION.fast } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});
