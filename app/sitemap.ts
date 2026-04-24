import type { MetadataRoute } from "next";

/**
 * Sitemap généré automatiquement par Next.js à /sitemap.xml.
 * Les URLs sont calculées à partir de NEXT_PUBLIC_SITE_URL pour
 * rester cohérentes entre preview Vercel et domaine custom.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hl-conciergerie.com";

interface RouteConfig {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

const ROUTES: RouteConfig[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/diagnostic", changeFrequency: "monthly", priority: 0.8 },
  { path: "/proprietaires", changeFrequency: "monthly", priority: 0.8 },
  { path: "/voyageurs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.5 },
  { path: "/a-propos", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/mentions-legales", changeFrequency: "monthly", priority: 0.5 },
  { path: "/confidentialite", changeFrequency: "monthly", priority: 0.5 },
  { path: "/cgv", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
