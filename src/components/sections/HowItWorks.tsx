"use client";

import { motion } from "framer-motion";
import { PhoneCall, ClipboardList, CheckCircle2 } from "lucide-react";
import type { ProspectPreviewData } from "@/types/prospect";

const STEPS = [
  {
    icon: PhoneCall,
    title: "Call or Request a Quote",
    description:
      "Reach us by phone or fill out our quick form. We'll get back to you within the hour.",
  },
  {
    icon: ClipboardList,
    title: "We Assess & Plan",
    description:
      "Our technician arrives on time, evaluates the job, and gives you a transparent upfront price.",
  },
  {
    icon: CheckCircle2,
    title: "We Get It Done",
    description:
      "Work is completed to code, cleaned up, and tested before we leave. Your satisfaction is guaranteed.",
  },
];

export function HowItWorksSection({ data }: { data: ProspectPreviewData }) {
  return (
    <section className="px-6 py-24 bg-zinc-900/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Simple. Fast. Done right.
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg">
            Working with {data.businessName} is hassle-free from start to
            finish.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-zinc-700 to-transparent z-0" />
                )}
                <div className="relative z-10 p-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                      <Icon className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-500">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-semibold text-zinc-100 text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
