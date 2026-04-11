"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/courses", label: "Kurse" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Newsletter" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[70] bg-[var(--background)]/90 backdrop-blur-lg border-b border-[var(--border)]/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-heading text-lg font-bold tracking-tight text-[var(--text-primary)]"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)] text-white text-sm transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[var(--accent)]/30">
            ✦
          </span>
          <span className="hidden sm:inline">Glowing Earrings</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--surface-tinted)] rounded-lg transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/newsletter"
            className="ml-3 px-4 py-2 text-sm font-bold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-[var(--accent)]/20"
          >
            Ein gutes Ding
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Menü öffnen"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
