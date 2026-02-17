"use client";

import { motion } from "framer-motion";
import type { ProspectPreviewData } from "@/types/prospect";

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="#facc15"
          stroke="#facc15"
          strokeWidth="1"
        >
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection({ data }: { data: ProspectPreviewData }) {
  const testimonials = data.testimonials ?? [];
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block border border-zinc-800 py-1.5 px-4 rounded-full text-sm text-zinc-400 mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            What our customers say
          </h2>
          <p className="text-zinc-500 text-lg">
            Real reviews from real {data.location} residents and businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all duration-300 flex flex-col gap-4"
            >
              <StarRating />
              <p className="text-zinc-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-200">
                    {t.author}
                  </div>
                  {t.role && (
                    <div className="text-[11px] text-zinc-500">{t.role}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
