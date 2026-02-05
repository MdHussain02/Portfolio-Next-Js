import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, experience, and skills as a frontend developer.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
