import { URLs } from "@/lib/shared";
import { source } from "@/lib/source";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const docsRoutes = source.generateParams().map(({ slug }) => ({
    url: `${URLs.site}/docs/${(slug ?? []).join("/")}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: URLs.site,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...docsRoutes,
  ];
}
