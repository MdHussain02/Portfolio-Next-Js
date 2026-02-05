"use client";

import { memo, ReactNode } from "react";
import { styles } from "@/lib";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = memo(function Section({
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      <div className={styles.container}>{children}</div>
    </section>
  );
});

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export const SectionHeader = memo(function SectionHeader({
  label,
  title,
  description,
  center = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={`${styles.heading2} mt-1 mb-3`}>{title}</h2>
      {description && (
        <p className={`${styles.body} max-w-xl ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
});
