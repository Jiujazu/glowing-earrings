"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileNav({ open, onClose, links }: MobileNavProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-72 bg-[var(--background)] shadow-xl animate-slide-up p-6 flex flex-col">
        {/* Close button */}
        <button
          className="self-end p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          onClick={onClose}
          aria-label="Menü schließen"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="mt-8 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <Link
            href="/newsletter"
            onClick={onClose}
            className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl transition-colors"
          >
            Das&apos;n gutes Ding
          </Link>
        </div>
      </div>
    </div>
  );
}
