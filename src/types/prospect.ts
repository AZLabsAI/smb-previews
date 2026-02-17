export interface Service {
  name: string;
  description: string;
  icon: string | undefined;
}

export interface Stat {
  value: string;
  label: string;
  description: string | undefined;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string | undefined;
}

export interface TeamMember {
  name: string;
  title: string | undefined;
  photoUrl: string | undefined;
}

export interface BrandColors {
  primary: string;
  secondary: string | undefined;
  accent: string | undefined;
}

export interface ProspectPreviewData {
  slug: string;
  businessName: string;
  tagline: string;
  description: string;
  category: string;
  location: string;
  phone: string | undefined;
  email: string | undefined;
  address: string | undefined;
  website: string | undefined;
  siteQualityScore: number | undefined;
  decisionMakerName: string | undefined;
  services: Service[];
  stats: Stat[];
  testimonials: Testimonial[] | undefined;
  teamMembers: TeamMember[] | undefined;
  logoUrl: string | undefined;
  heroImageUrl: string | undefined;
  brandColors: BrandColors | undefined;
  colors: { primary: string; secondary: string | undefined } | undefined;
  ctaLabel: string | undefined;
  footerTagline: string | undefined;
}
