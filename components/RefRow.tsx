import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";
import type { Locale } from "@/lib/i18n";

export function RefRow({ item, locale }: { item: CaseStudy; locale: Locale }) {
  const c = item[locale];
  return (
    <Link href={`/${locale}/cases/${item.slug}`} className="ref">
      <div>
        <div className="ref__k">{c.kicker}</div>
        <div className="ref__t">{c.title}</div>
        <p className="ref__d">{c.summary}</p>
      </div>
      <div className="ref__p">
        <b>{c.proof.v}</b>
        <s>{c.proof.l}</s>
      </div>
    </Link>
  );
}
