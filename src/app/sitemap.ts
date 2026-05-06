import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { portfolioData } from "@/data/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();


  const routes = [
    "",

  ].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified,
    changeFrequency: "daily" as const,
    priority: 1,
  }));



  return [...routes];
}
