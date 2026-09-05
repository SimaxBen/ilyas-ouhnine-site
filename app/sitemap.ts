import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { locales } from "@/lib/i18n";
import { publishedCases } from "@/lib/cases";
import { publishedArticles } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/offers", "/cases", "/writing", "/method", "/about", "/contact"];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const p of paths) {
      entries.push({ url: `${site.url}/${locale}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : p === "/offers" ? 0.9 : 0.7 });
    }
    for (const c of publishedCases) {
      entries.push({ url: `${site.url}/${locale}/cases/${c.slug}`, changeFrequency: "monthly", priority: 0.8 });
    }
    for (const a of publishedArticles) {
      entries.push({ url: `${site.url}/${locale}/writing/${a.slug}`, changeFrequency: "monthly", priority: 0.8 });
    }
  }
  return entries;
}
