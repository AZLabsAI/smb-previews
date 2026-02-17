"use client";

import { useState, useEffect } from "react";
import type { ProspectPreviewData } from "@/types/prospect";

export function Navbar({ data }: { data: ProspectPreviewData }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <span className="font-bold text-zinc-100 text-lg tracking-tight">
          {data.businessName}
        </span>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "Services", href: "#services" },
            { label: "About", href: "#stats" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-900 text-sm font-semibold hover:bg-white transition-colors"
        >
          {data.ctaLabel ?? "Get a Quote"}
        </a>
      </div>
    </header>
  );
}
