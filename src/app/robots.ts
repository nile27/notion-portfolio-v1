import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // API 경로는 수집 제외
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
