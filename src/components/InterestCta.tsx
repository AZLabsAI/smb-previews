"use client";

import { useState, useEffect, useCallback } from "react";

type Props = {
  businessName: string;
  ctaUrl: string;
};

export function InterestCta({ businessName, ctaUrl }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
      setDismissed(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (dismissed) return;

    // Show after scrolling ~35% of the page OR after 8 seconds — whichever comes first
    const showCard = () => {
      if (!dismissed) setVisible(true);
    };

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.35) {
        showCard();
        window.removeEventListener("scroll", onScroll);
      }
    };

    const timer = setTimeout(showCard, 8000);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dismissed]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999] max-w-sm w-[calc(100vw-3rem)]
        transition-all duration-300 ease-out
        ${exiting
          ? "opacity-0 translate-y-4 scale-95"
          : "opacity-100 translate-y-0 scale-100"
        }
      `}
      role="dialog"
      aria-label="Preview interest prompt"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-2xl shadow-black/40 ring-1 ring-white/10">
        {/* Accent bar at top */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600" />

        <div className="px-5 pt-4 pb-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide leading-none mb-0.5">
                  AZ Labs Preview
                </p>
                <p className="text-sm font-bold text-zinc-900 leading-tight">
                  Like what you see?
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss"
              className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <p className="text-sm text-zinc-600 leading-snug mb-4">
            We built this preview specifically for{" "}
            <span className="font-semibold text-zinc-800">{businessName}</span>{" "}
            — for free. If you want a site like this live and working for your
            business, let&apos;s chat.
          </p>

          {/* CTA */}
          <a
            href={ctaUrl}
            className="group flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-md shadow-indigo-200"
          >
            Yes, I&apos;m interested
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          <p className="text-center text-xs text-zinc-400 mt-2.5">
            No commitment. Just a conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
