import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";
import type { Locale } from "@/lib/i18n";

export function CaseLink({ item, locale, more }: { item: CaseStudy; locale: Locale; more: string }) {
  const c = item[locale];
  return (
    <Link href={`/${locale}/cases/${item.slug}`} className="case-link">
      <div className="case-link__kicker">{c.kicker}</div>
      <h3 className="case-link__title">{c.title}</h3>
      <p className="case-link__summary">{c.summary}</p>
      <span className="case-link__more">{more} →</span>
    </Link>
  );
}
