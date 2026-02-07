import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { portfolioData } from "@/hooks/usePortfolioData";
import { StarField } from "@/components/ui";
import { LoadingProvider } from "@/components/providers/LoadingProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const { personal, skills } = portfolioData;
const skillNames = [...skills.frontend, ...skills.backend, ...skills.tools]
  .slice(0, 10)
  .map((s) => s.name);

export const metadata: Metadata = {
  title: {
    default: `${personal.name} | ${personal.title}`,
    template: `%s | ${personal.name}`,
  },
  description: personal.bio,
  keywords: [personal.title, "Portfolio", "Web Developer", ...skillNames],
  authors: [{ name: personal.name }],
  creator: personal.name,
  metadataBase: new URL("https://johndoe.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${personal.name} Portfolio`,
    title: `${personal.name} | ${personal.title}`,
    description: personal.bio,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | ${personal.title}`,
    description: personal.bio,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-black min-h-screen bg-check-lines`}
      >
        <LoadingProvider>
          <StarField starCount={300} />
          <div className="relative z-10">
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
