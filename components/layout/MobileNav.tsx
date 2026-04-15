"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFocusTrap } from "@/lib/use-focus-trap";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileNav({ open, onClose, links }: MobileNavProps) {
  const trapRef = useFocusTrap(open);

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
    <div ref={trapRef} className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
      <div
        className="absolute inset-0 bg-black/60 animate-fade-in"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-72 bg-[var(--background)] border-l-4 border-[var(--neo-border)] animate-slide-in-right p-6 flex flex-col">
        <button
          className="self-end p-2 border-2 border-[var(--neo-border)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition-all duration-100"
          style={{ boxShadow: '3px 3px 0px 0px var(--neo-shadow-color)' }}
          onClick={onClose}
          aria-label="Menü schließen"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="mt-8 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg font-bold uppercase tracking-wide text-[var(--text-primary)] border-4 border-[var(--neo-border)] px-4 py-3 hover:bg-[var(--pop-turquoise)] hover:text-[var(--foreground)] transition-all duration-100 press-feedback"
              style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <Link
            href="/newsletter"
            onClick={onClose}
            className="block w-full text-center px-4 py-3 text-sm font-black uppercase tracking-wide text-white bg-[var(--accent)] border-4 border-[var(--neo-border)] transition-all duration-100 press-feedback"
            style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }}
          >
            Ein gutes Ding
          </Link>
        </div>
      </div>
    </div>
  );
}
