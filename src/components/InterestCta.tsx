"use client";

import { useState, useEffect, useCallback } from "react";

type CardState = "idle" | "loading" | "confirmed" | "error";

type Props = {
  businessName: string;
  prospectId: string | null;
  decisionMakerName: string | null;
};

const SMB_BASE = "https://smb.azlabs.ai";
const AUBREY_WHATSAPP = "27812527098";

export function InterestCta({ businessName, prospectId, decisionMakerName }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [cardState, setCardState] = useState<CardState>("idle");

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

  async function handleInterested() {
    if (!prospectId) {
      window.open("https://azlabs.ai", "_blank");
      return;
    }
    setCardState("loading");
    try {
      const res = await fetch(`${SMB_BASE}/api/preview/${prospectId}/interested`, {
        method: "POST",
      });
      setCardState(res.ok ? "confirmed" : "error");
    } catch {
      setCardState("error");
    }
  }

  const firstName = decisionMakerName?.split(" ")[0] ?? null;

  const emailSubject = `Interested in a website — ${businessName}`;
  const emailBody = [
    `Hi Aubrey,`,
    ``,
    `I just saw the preview you built for ${businessName} and I'm interested.`,
    ``,
    `Let's chat.`,
    ``,
    `— ${decisionMakerName ?? businessName}`,
  ].join("\n");
  const emailHref = `mailto:hello@azlabs.ai?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const waText = `Hi Aubrey, I'm interested in a website for ${businessName}.${decisionMakerName ? ` This is ${decisionMakerName}.` : ""}`;
  const whatsappHref = `https://wa.me/${AUBREY_WHATSAPP}?text=${encodeURIComponent(waText)}`;

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
      <div className="relative overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-2xl shadow-black/40 ring-1 ring-black/5">
        {/* Accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600" />

        <div className="px-5 pt-4 pb-5">
          {/* Idle + Loading state */}
          <div
            className={`transition-all duration-300 ${
              cardState === "idle" || cardState === "loading"
                ? "opacity-100"
                : "opacity-0 pointer-events-none absolute inset-x-5 top-5"
            }`}
          >
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-zinc-600 leading-snug mb-4">
              We built this preview specifically for{" "}
              <span className="font-semibold text-zinc-800">{businessName}</span>{" "}
              — for free. If you want a site like this live and working for your business, let&apos;s chat.
            </p>

            <button
              onClick={handleInterested}
              disabled={cardState === "loading"}
              className="group flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-md shadow-indigo-200"
            >
              {cardState === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Yes, I&apos;m interested
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-xs text-zinc-400 mt-2.5">No commitment. Just a conversation.</p>
          </div>

          {/* Confirmed state */}
          <div
            className={`transition-all duration-300 ${
              cardState === "confirmed"
                ? "opacity-100"
                : "opacity-0 pointer-events-none absolute inset-x-5 top-5"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide leading-none mb-0.5">
                    You&apos;re on the list
                  </p>
                  <p className="text-sm font-bold text-zinc-900 leading-tight">
                    {firstName ? `Thanks, ${firstName}!` : "Got it — thanks!"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-zinc-600 leading-snug mb-4">
              Aubrey from AZ Labs will be in touch within{" "}
              <span className="font-semibold text-zinc-800">24 hours</span>.
              Want to connect sooner?
            </p>

            <a
              href={emailHref}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors shadow-md shadow-indigo-200 mb-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Aubrey
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L0 24l6.336-1.498A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.587-.502-5.082-1.374l-.362-.215-3.763.889.94-3.668-.237-.376A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>

            <p className="text-center text-xs text-zinc-400 mt-2.5">hello@azlabs.ai · azlabs.ai</p>
          </div>

          {/* Error state */}
          <div
            className={`transition-all duration-300 ${
              cardState === "error"
                ? "opacity-100"
                : "opacity-0 pointer-events-none absolute inset-x-5 top-5"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="text-sm font-bold text-zinc-900">Something went wrong</p>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-zinc-600 mb-4">No worries — reach us directly:</p>
            <a
              href={emailHref}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors mb-2"
            >
              Email Aubrey
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-sm font-semibold transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
