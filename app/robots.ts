import type { MetadataRoute } from "next";

/**
 * robots.txt généré automatiquement par Next.js à /robots.txt.
 * Autorise tout le crawl sauf /api et /admin, et pointe vers le
 * sitemap généré par app/sitemap.ts.
 */

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hl-conciergerie.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
