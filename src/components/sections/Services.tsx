"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import {
  Wrench,
  Shield,
  Zap,
  Star,
  Settings,
  Flame,
  Droplets,
  CheckCircle,
  Phone,
  Clock,
  Home,
  Truck,
  Heart,
  Award,
  BarChart3,
  Layers,
} from "lucide-react";
import type { ProspectPreviewData } from "@/types/prospect";

const ICON_MAP: Record<string, FC<{ className?: string }>> = {
  Wrench,
  Shield,
  Zap,
  Star,
  Settings,
  Flame,
  Droplets,
  CheckCircle,
  Phone,
  Clock,
  Home,
  Truck,
  Heart,
  Award,
  BarChart3,
  Layers,
};

const FALLBACK_ICONS = [Wrench, Shield, Zap, Settings, Flame, Droplets];

function ServiceIcon({ name, index }: { name?: string; index: number }) {
  const Icon =
    (name ? ICON_MAP[name] : null) ??
    FALLBACK_ICONS[index % FALLBACK_ICONS.length];
  return (
    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
  );
}

const GRID_SPANS = [
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-3",
];

export function ServicesSection({ data }: { data: ProspectPreviewData }) {
  const services = data.services.slice(0, 6);

  return (
    <section id="services" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Everything you need, done right
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            {data.businessName} offers a full range of professional{" "}
            {data.category.toLowerCase()} services in {data.location}.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={GRID_SPANS[i] ?? "md:col-span-2"}
            >
              <div className="group h-full overflow-hidden border border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all duration-300 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <ServiceIcon name={service.icon} index={i} />
                  </motion.div>
                  <p className="font-semibold text-zinc-100">{service.name}</p>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
