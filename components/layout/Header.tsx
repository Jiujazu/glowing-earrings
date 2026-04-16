"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import LogoIcon from "@/components/ui/LogoIcon";

const navLinks = [
  { href: "/courses", label: "Kurse" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Newsletter" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[70] bg-[var(--background)] border-b-4 border-[var(--neo-border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-heading text-lg font-black uppercase tracking-tight text-[var(--text-primary)]"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 border-4 border-[var(--neo-border)] bg-[var(--accent)] text-white transition-all duration-100 group-hover:rotate-12 group-hover:scale-110"
              style={{ boxShadow: '3px 3px 0px 0px var(--neo-shadow-color)' }}
            >
              <LogoIcon className="w-5 h-5" strokeWidth={2.5} />
            </span>
            <span className="hidden sm:inline">Glowing Earrings</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-bold uppercase tracking-wide text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white border-2 border-transparent hover:border-[var(--neo-border)] transition-all duration-100"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/newsletter"
              className="ml-3 px-4 py-2 text-sm font-black uppercase tracking-wide text-white bg-[var(--accent)] border-4 border-[var(--neo-border)] transition-all duration-100 hover:-translate-y-0.5 press-feedback"
              style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }}
            >
              Ein gutes Ding
            </Link>
          </nav>

          {/* Mobile: Theme toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 border-2 border-[var(--neo-border)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition-all duration-100"
              style={{ boxShadow: '3px 3px 0px 0px var(--neo-shadow-color)' }}
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
