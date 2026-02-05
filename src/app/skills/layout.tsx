import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "My technical skills and expertise in frontend development, backend technologies, and development tools.",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
