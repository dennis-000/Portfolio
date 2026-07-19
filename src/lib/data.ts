// ============================================================
// DENNIS OPOKU ASIEDU — Dynamic Portfolio Data Types & References
// Client-safe module that syncs references dynamically on the server
// ============================================================
import dataJson from "./data.json";

// Define TypeScript interfaces for type-safety across components
export interface Company {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  founded: string;
  status: string;
  role: string;
  accent: string;
  website: string;
  tags: string[];
  achievements: string[];
  mission: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  impact: string;
  year: string;
  featured: boolean;
  accent: string;
  href: string;
  gradient: string;
  demoUrl?: string;
  githubUrl?: string;
  isPrivate?: boolean;
  cover?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  featured: boolean;
  content?: string[];
}

// ------------------------------------------------------------
// Client-safe reference values (mutated dynamically on server-side requests)
// ------------------------------------------------------------
export const PERSONAL: {
  name: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  location: string;
  available: boolean;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
} = { ...dataJson.PERSONAL };

export const DISCIPLINES: {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
  accent: string;
  accentRgb: string;
  href: string;
  position: [number, number, number];
}[] = [...(dataJson.DISCIPLINES as any[])];

export const JOURNEYS: {
  id: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
}[] = [...dataJson.JOURNEYS];

export const COMPANIES: Company[] = [...dataJson.COMPANIES];
export const FEATURED_PROJECTS: Project[] = [...dataJson.FEATURED_PROJECTS];

export const TECH_STACK: {
  languages: string[];
  frontend: string[];
  backend: string[];
  ai: string[];
  cloud: string[];
  design: string[];
  databases: string[];
} = { ...dataJson.TECH_STACK };

export const STATS: {
  label: string;
  value: string;
  suffix: string;
}[] = [...dataJson.STATS];

export const TIMELINE_EVENTS: {
  year: string;
  title: string;
  description: string;
  type: string;
  accent: string;
}[] = [...dataJson.TIMELINE_EVENTS];

export const NAV_ITEMS: {
  label: string;
  href: string;
  accent: string;
}[] = [...dataJson.NAV_ITEMS];

export const BLOG_POSTS: BlogPost[] = [...dataJson.BLOG_POSTS];

export const DESIGN_WORK: {
  title: string;
  type: string;
  color: string;
  tags: string[];
  image: string;
}[] = [...dataJson.DESIGN_WORK];

export const SUBSCRIBERS: string[] = [...(dataJson.SUBSCRIBERS || [])];
export const NEWSLETTERS: any[] = [...(dataJson.NEWSLETTERS || [])];

// ------------------------------------------------------------
// Client-Safe Dynamic Wrappers (Code-splits server-only imports)
// ------------------------------------------------------------

export async function getPortfolioData(): Promise<any> {
  const { getPortfolioData: dbGet } = await import("./db");
  return dbGet();
}

export async function savePortfolioData(updatedData: any): Promise<boolean> {
  const { savePortfolioData: dbSave } = await import("./db");
  const success = await dbSave(updatedData);
  await syncDatabase();
  return success;
}

// ------------------------------------------------------------
// Runtime Reference Syncing (Safe for browser / server split)
// ------------------------------------------------------------
export async function syncDatabase() {
  if (typeof window !== "undefined") return;

  try {
    const { getPortfolioData: dbGet } = await import("./db");
    const latestData = await dbGet();

    // Mutate exported object/array bindings in place
    Object.assign(PERSONAL, latestData.PERSONAL);
    Object.assign(TECH_STACK, latestData.TECH_STACK);

    if (latestData.DISCIPLINES) {
      DISCIPLINES.length = 0;
      DISCIPLINES.push(...latestData.DISCIPLINES);
    }
    if (latestData.JOURNEYS) {
      JOURNEYS.length = 0;
      JOURNEYS.push(...latestData.JOURNEYS);
    }
    if (latestData.COMPANIES) {
      COMPANIES.length = 0;
      COMPANIES.push(...latestData.COMPANIES);
    }
    if (latestData.FEATURED_PROJECTS) {
      FEATURED_PROJECTS.length = 0;
      FEATURED_PROJECTS.push(...latestData.FEATURED_PROJECTS);
    }
    if (latestData.STATS) {
      STATS.length = 0;
      STATS.push(...latestData.STATS);
    }
    if (latestData.TIMELINE_EVENTS) {
      TIMELINE_EVENTS.length = 0;
      TIMELINE_EVENTS.push(...latestData.TIMELINE_EVENTS);
    }
    if (latestData.NAV_ITEMS) {
      NAV_ITEMS.length = 0;
      NAV_ITEMS.push(...latestData.NAV_ITEMS);
    }
    if (latestData.BLOG_POSTS) {
      BLOG_POSTS.length = 0;
      BLOG_POSTS.push(...latestData.BLOG_POSTS);
    }
    if (latestData.DESIGN_WORK) {
      DESIGN_WORK.length = 0;
      DESIGN_WORK.push(...latestData.DESIGN_WORK);
    }
    if (latestData.SUBSCRIBERS) {
      SUBSCRIBERS.length = 0;
      SUBSCRIBERS.push(...latestData.SUBSCRIBERS);
    }
    if (latestData.NEWSLETTERS) {
      NEWSLETTERS.length = 0;
      NEWSLETTERS.push(...latestData.NEWSLETTERS);
    }
  } catch (e) {
    console.error("Runtime Reference Syncing Error:", e);
  }
}
