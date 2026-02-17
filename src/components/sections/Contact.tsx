"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import type { ProspectPreviewData } from "@/types/prospect";

export function ContactSection({ data }: { data: ProspectPreviewData }) {
  return (
    <section id="contact" className="px-6 py-24 bg-zinc-900/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
              Contact Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-zinc-500 mb-10 leading-relaxed">
              {data.businessName} is ready to help. Reach out today and get a
              free quote from {data.decisionMakerName ?? "our team"}.
            </p>

            <div className="space-y-4">
              {data.phone && (
                <a
                  href={`tel:${data.phone}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors flex-shrink-0">
                    <Phone className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
                      Phone
                    </div>
                    <div className="text-sm font-medium text-zinc-100">
                      {data.phone}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 ml-auto group-hover:translate-x-1 group-hover:text-zinc-400 transition-all" />
                </a>
              )}

              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
                      Email
                    </div>
                    <div className="text-sm font-medium text-zinc-100">
                      {data.email}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 ml-auto group-hover:translate-x-1 group-hover:text-zinc-400 transition-all" />
                </a>
              )}

              {data.address && (
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
                      Address
                    </div>
                    <div className="text-sm font-medium text-zinc-100">
                      {data.address}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/50"
          >
            <h3 className="font-semibold text-zinc-100 text-xl mb-6">
              Request a Free Quote
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                  Phone or Email
                </label>
                <input
                  type="text"
                  placeholder="(512) 555-0100 or you@email.com"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                  What do you need?
                </label>
                <textarea
                  rows={4}
                  placeholder={`Briefly describe what ${data.category.toLowerCase()} service you need…`}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition-colors resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full py-3.5 rounded-xl bg-zinc-100 text-zinc-900 font-semibold text-sm hover:bg-white transition-colors"
              >
                {data.ctaLabel ?? "Get a Free Quote"}
              </button>
              <p className="text-center text-xs text-zinc-600">
                We&apos;ll respond within 1 hour during business hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
