"use client";

import { memo } from "react";
import Link from "next/link";
import { usePersonal, useNavLinks, useSocial } from "@/hooks";
import {
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DribbbleIcon,
} from "@/components/ui";

export const Footer = memo(function Footer() {
  const personal = usePersonal();
  const navLinks = useNavLinks();
  const social = useSocial();
  const year = new Date().getFullYear();

  const socialLinks = [
    { href: social.github, icon: <GithubIcon size={16} /> },
    { href: social.linkedin, icon: <LinkedinIcon size={16} /> },
    { href: social.twitter, icon: <TwitterIcon size={16} /> },
    { href: social.dribbble, icon: <DribbbleIcon size={16} /> },
  ];

  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold text-white tracking-tighter">
              {personal.initials}
              <span className="text-gray-500">.</span>
            </span>
            <p className="text-gray-500 text-sm mt-2">
              Crafting digital experiences with precision.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-white text-xs font-medium uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-500 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-medium uppercase tracking-wider mb-3">
              Connect
            </h3>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"
            >
              <MailIcon size={14} /> {personal.email}
            </a>
            <div className="flex gap-2 mt-3">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-gray-500 text-xs">
          <span>
            © {year} {personal.name}
          </span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
});
