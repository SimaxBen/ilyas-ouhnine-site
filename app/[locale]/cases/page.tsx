import type { Metadata } from "next";
import { content } from "@/lib/content";
import { publishedCases } from "@/lib/cases";
import { RefRow } from "@/components/RefRow";
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
    <section className="band sec">
      <div className="wrap">
        <h1 className="h2">{t.title}</h1>
        <p className="tiny" style={{ marginTop: 12, maxWidth: "60ch" }}>{t.lead}</p>
        <div className="refs" style={{ marginTop: 30 }}>
          {publishedCases.map((item) => (
            <RefRow key={item.slug} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
