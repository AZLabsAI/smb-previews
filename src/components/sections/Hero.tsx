"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import type { ProspectPreviewData } from "@/types/prospect";

export function HeroSection({ data }: { data: ProspectPreviewData }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-transparent to-transparent" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: data.colors?.primary ?? "#3b82f6" }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-zinc-400">
            {data.category} · {data.location}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
        >
          <span className="text-zinc-100 block">{data.businessName}</span>
          <span className="block mt-2 bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 bg-clip-text text-transparent text-4xl md:text-5xl">
            {data.tagline}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-100 text-zinc-900 font-semibold text-sm hover:bg-white transition-all shadow-lg shadow-zinc-900/50"
          >
            {data.ctaLabel ?? "Get a Free Quote"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="group flex items-center gap-2 px-6 py-4 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {data.phone}
            </a>
          )}
        </motion.div>

        {data.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {data.stats.slice(0, 4).map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50"
              >
                <div className="text-2xl font-bold text-zinc-100">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
