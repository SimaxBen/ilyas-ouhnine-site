import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { locales } from "@/lib/i18n";
import { publishedCases } from "@/lib/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/cases", "/about", "/contact"];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const p of paths) {
      entries.push({ url: `${site.url}/${locale}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 });
    }
    for (const c of publishedCases) {
      entries.push({ url: `${site.url}/${locale}/cases/${c.slug}`, changeFrequency: "monthly", priority: 0.8 });
    }
  }
  return entries;
}
