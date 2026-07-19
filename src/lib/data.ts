// ============================================================
// DENNIS OPOKU ASIEDU — Dynamic Portfolio Data
// Reads from data.json dynamically on server, falls back to bundle on client
// ============================================================

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

let dataJson: any;

if (typeof window === "undefined") {
  // Server-side: read dynamically from disk to enable instant CMS updates
  // We use require() dynamically to prevent Webpack/Next.js from bundling fs on the client side
  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "src/lib/data.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    dataJson = JSON.parse(fileContent);
  } catch (e) {
    // Fallback to static require
    dataJson = require("./data.json");
  }
} else {
  // Client-side: use bundled static JSON
  dataJson = require("./data.json");
}

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
} = dataJson.PERSONAL;

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
}[] = dataJson.DISCIPLINES;

export const JOURNEYS: {
  id: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
}[] = dataJson.JOURNEYS;

export const COMPANIES: Company[] = dataJson.COMPANIES;
export const FEATURED_PROJECTS: Project[] = dataJson.FEATURED_PROJECTS;

export const TECH_STACK: {
  languages: string[];
  frontend: string[];
  backend: string[];
  ai: string[];
  cloud: string[];
  design: string[];
  databases: string[];
} = dataJson.TECH_STACK;

export const STATS: {
  label: string;
  value: string;
  suffix: string;
}[] = dataJson.STATS;

export const TIMELINE_EVENTS: {
  year: string;
  title: string;
  description: string;
  type: string;
  accent: string;
}[] = dataJson.TIMELINE_EVENTS;

export const NAV_ITEMS: {
  label: string;
  href: string;
  accent: string;
}[] = dataJson.NAV_ITEMS;

export const BLOG_POSTS: BlogPost[] = dataJson.BLOG_POSTS;

export const DESIGN_WORK: {
  title: string;
  type: string;
  color: string;
  tags: string[];
  image: string;
}[] = dataJson.DESIGN_WORK;

export const SUBSCRIBERS: string[] = dataJson.SUBSCRIBERS || [];
export const NEWSLETTERS: any[] = dataJson.NEWSLETTERS || [];
