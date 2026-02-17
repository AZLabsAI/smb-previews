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
import { ContactSection } from "@/components/sections/Contact";
import { FooterSection } from "@/components/sections/Footer";

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

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar data={data} />
      <HeroSection data={data} />
      <StatsSection data={data} />
      <ServicesSection data={data} />
      <HowItWorksSection data={data} />
      <TestimonialsSection data={data} />
      <ContactSection data={data} />
      <FooterSection data={data} />
    </main>
  );
}
