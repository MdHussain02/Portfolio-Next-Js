"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavLinks, usePersonal } from "@/hooks";
import { MenuIcon, CloseIcon } from "@/components/ui";

export const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navLinks = useNavLinks();
  const { initials } = usePersonal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-200 border-b ${scrolled
          ? "bg-black/95 border-white/20 py-3"
          : "bg-black/50 border-white/10 py-5"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white tracking-tighter"
        >
          {initials}
          <span className="text-gray-500">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-wider transition-colors ${pathname === link.href
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10 mt-3">
          <div className="py-3 px-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm uppercase tracking-wider ${pathname === link.href ? "text-white" : "text-gray-500"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
});
