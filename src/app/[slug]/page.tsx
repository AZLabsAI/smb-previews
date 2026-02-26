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
import { InterestCta } from "@/components/InterestCta";

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
  const decisionMakerName = data.decisionMakerName ?? null;

  return (
    <main className="min-h-screen bg-zinc-950">
      {brandCss && <style dangerouslySetInnerHTML={{ __html: brandCss }} />}
      <Navbar data={data} />
      <HeroSection data={data} />
      <StatsSection data={data} />
      <ServicesSection data={data} />
      <HowItWorksSection data={data} />
      <TeamSection data={data} />
      <TestimonialsSection data={data} />
      <ContactSection data={data} />
      <FooterSection data={data} />

      {/* Scroll-triggered floating interest card — appears after 35% scroll or 8s */}
      <InterestCta
        businessName={data.businessName}
        prospectId={prospectId ?? null}
        decisionMakerName={decisionMakerName}
      />

      {/* Invisible tracking pixel — fires on page load */}
      {pixelUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={pixelUrl}
          alt=""
          width={1}
          height={1}
          style={{
            position: "absolute",
            top: -1,
            left: -1,
            opacity: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      )}
    </main>
  );
}
