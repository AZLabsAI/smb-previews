/**
 * ProspectPreviewData — the JSON shape written by SMB Acquire into GitHub
 * and consumed by the smb-previews Next.js app.
 *
 * File location in repo: data/{slug}.json
 */
export interface Service {
  name: string;
  description: string;
  /** lucide-react icon name, e.g. "Wrench", "Shield", "Star" */
  icon?: string;
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role?: string;
  /** URL to avatar image – optional */
  avatar?: string;
}

export interface ProspectPreviewData {
  /** URL slug — must match filename: data/{slug}.json */
  slug: string;

  /** Business display name */
  businessName: string;

  /** One-liner value proposition for the hero */
  tagline: string;

  /** Sub-tagline / hero description paragraph */
  description: string;

  /** Business category, e.g. "Plumbing", "Dental Practice" */
  category: string;

  /** City, State */
  location: string;

  /** Public phone number */
  phone?: string;

  /** Public email */
  email?: string;

  /** Physical address */
  address?: string;

  /** Existing website URL (the one being replaced) */
  website?: string;

  /** Site quality score 0-100 from enrichment */
  siteQualityScore?: number;

  /** Primary decision maker name (shown in contact section) */
  decisionMakerName?: string;

  /** Services offered — up to 6 for the bento grid */
  services: Service[];

  /** Trust / social-proof stats — ideally 4 */
  stats: Stat[];

  /** Customer testimonials — ideally 3 */
  testimonials?: Testimonial[];

  /** Brand colours. Defaults to zinc/slate if omitted. */
  colors?: {
    /** CSS colour value, e.g. "#1a56db" */
    primary: string;
    /** CSS colour value */
    secondary?: string;
  };

  /** Call-to-action label in hero */
  ctaLabel?: string;

  /** Footer tagline */
  footerTagline?: string;
}
