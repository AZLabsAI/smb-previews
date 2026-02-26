import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
import type { Metadata } from "next";
import type { ProspectPreviewData } from "@/types/prospect";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/Stats";
import { ServicesSection } from "@/components/sections/Services";
import { HowItWorksSection } from "@/components/sections/HowItWorks";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { TeamSection } from "@/components/sections/Team";
import { ContactSection } from "@/components/sections/Contact";
import { FooterSection } from "@/components/sections/Footer";

const SMB_BASE = "https://smb.azlabs.ai";

async function getProspectData(
  slug: string,
): Promise<ProspectPreviewData | null> {
  try {
    const filePath = join(process.cwd(), "data", `${slug}.json`);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as ProspectPreviewData;
  } catch {
    return null;
  }
}

function buildBrandCss(data: ProspectPreviewData): string | null {
  const colors = data.brandColors ?? data.colors;
  if (!colors?.primary) return null;
  const primary = colors.primary;
  const secondary = "secondary" in colors ? colors.secondary : undefined;
  const accent = "accent" in colors ? colors.accent : undefined;
  const lines = [`  --brand-primary: ${primary};`];
  if (secondary) lines.push(`  --brand-secondary: ${secondary};`);
  if (accent) lines.push(`  --brand-accent: ${accent};`);
  return `:root {\n${lines.join("\n")}\n}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProspectData(slug);
  if (!data) return { title: "Preview Not Found" };
  return {
    title: `${data.businessName} — Website Preview`,
    description: data.tagline,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProspectData(slug);

  if (!data) return notFound();

  const brandCss = buildBrandCss(data);
  const { prospectId } = data;
  const pixelUrl = prospectId
    ? `${SMB_BASE}/api/preview/${prospectId}/view`
    : null;
  const ctaUrl = prospectId
    ? `${SMB_BASE}/api/preview/${prospectId}/interested`
    : "https://azlabs.ai";

  return (
    <div className="relative min-h-screen bg-zinc-950">
      {brandCss && <style dangerouslySetInnerHTML={{ __html: brandCss }} />}

      {/* Sticky CTA banner — always visible */}
      <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-3 px-4 py-2.5 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 shadow-lg">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="hidden sm:block w-2 h-2 rounded-full bg-indigo-400 animate-pulse flex-shrink-0" />
          <p className="text-sm text-zinc-400 truncate">
            <span className="font-semibold text-zinc-100">{data.businessName}</span>
            {" — "}
            <span>This is a free preview of your new website, built by AZ Labs.</span>
          </p>
        </div>
        <a
          href={ctaUrl}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-md"
        >
          I&apos;m interested
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      {/* Main content — offset by banner height */}
      <main className="pt-12 min-h-screen bg-zinc-950">
        <Navbar data={data} />
        <HeroSection data={data} />
        <StatsSection data={data} />
        <ServicesSection data={data} />
        <HowItWorksSection data={data} />
        <TeamSection data={data} />
        <TestimonialsSection data={data} />
        <ContactSection data={data} />
        <FooterSection data={data} />
      </main>

      {/* Invisible tracking pixel — fires when browser renders the page */}
      {pixelUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={pixelUrl}
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", top: -1, left: -1, opacity: 0, pointerEvents: "none" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
