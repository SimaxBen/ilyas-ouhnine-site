import type { Metadata } from "next";
import { content } from "@/lib/content";
import { publishedCases } from "@/lib/cases";
import { CaseLink } from "@/components/CaseLink";
import { toLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  return { title: content[locale].cases.title, description: content[locale].cases.lead };
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale].cases;

  return (
    <section className="section">
      <div className="wrap">
        <hr className="rule" />
        <h1 className="h1">{t.title}</h1>
        <p className="lead" style={{ marginTop: "1.2rem" }}>{t.lead}</p>
        <div style={{ marginTop: "3rem" }}>
          {publishedCases.map((item) => (
            <CaseLink key={item.slug} item={item} locale={locale} more={content[locale].nav.cases} />
          ))}
        </div>
      </div>
    </section>
  );
}
