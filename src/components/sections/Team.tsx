"use client";

import { motion } from "framer-motion";
import type { ProspectPreviewData, TeamMember } from "@/types/prospect";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const PLACEHOLDER_MEMBERS: TeamMember[] = [
  { name: "Lead Technician", title: "Senior Specialist", photoUrl: undefined },
  { name: "Project Manager", title: "Operations", photoUrl: undefined },
  { name: "Customer Support", title: "Client Relations", photoUrl: undefined },
];

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const initials = getInitials(member.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all duration-300"
    >
      {member.photoUrl ? (
        <img
          src={member.photoUrl}
          alt={member.name}
          className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-zinc-800"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const sibling = target.nextElementSibling as HTMLElement | null;
            if (sibling) sibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-4 ring-2 ring-zinc-700 text-xl font-bold text-zinc-300"
        style={{ display: member.photoUrl ? "none" : "flex" }}
      >
        {initials}
      </div>
      <div className="font-semibold text-zinc-100 text-sm">{member.name}</div>
      {member.title && (
        <div className="text-xs text-zinc-500 mt-1">{member.title}</div>
      )}
    </motion.div>
  );
}

export function TeamSection({ data }: { data: ProspectPreviewData }) {
  const members =
    data.teamMembers && data.teamMembers.length > 0
      ? data.teamMembers
      : PLACEHOLDER_MEMBERS;

  const hasRealMembers = data.teamMembers && data.teamMembers.length > 0;

  return (
    <section id="team" className="px-6 py-24 border-t border-zinc-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block border border-zinc-800 py-1.5 px-4 rounded-full text-sm text-zinc-400 mb-6">
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            {hasRealMembers ? "Meet the team" : "Experienced professionals"}
          </h2>
          <p className="text-zinc-500 text-lg">
            {hasRealMembers
              ? `The people behind ${data.businessName}.`
              : `Skilled, certified, and dedicated to serving ${data.location}.`}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {members.map((member, i) => (
            <MemberCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
