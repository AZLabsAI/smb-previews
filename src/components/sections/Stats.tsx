"use client";

import { motion } from "framer-motion";
import type { ProspectPreviewData } from "@/types/prospect";

export function StatsSection({ data }: { data: ProspectPreviewData }) {
  return (
    <section id="stats" className="px-6 py-24 bg-zinc-900/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
            By the Numbers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Trusted across {data.location}
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            Our track record speaks for itself.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all duration-300 group text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="text-3xl md:text-4xl font-bold text-zinc-100 mb-1 group-hover:text-white transition-colors">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="text-xs text-zinc-600">{stat.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
