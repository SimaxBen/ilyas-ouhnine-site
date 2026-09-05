import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import { publishedArticles, getArticle } from "@/lib/writing";
import { Rich } from "@/components/Rich";
import { site } from "@/lib/config";
import { locales, toLocale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => publishedArticles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const item = getArticle(slug);
  if (!item) return {};
  return {
    title: item[locale].title,
    description: item[locale].standfirst,
    alternates: { canonical: `/${locale}/writing/${slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const item = getArticle(slug);
  if (!item) notFound();

  const a = item[locale];
  const t = content[locale].writing;
  const h = content[locale].home;
  const index = publishedArticles.findIndex((x) => x.slug === slug);
  const next = publishedArticles[(index + 1) % publishedArticles.length];

  return (
    <>
      <section className="band sec" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <Link href={`/${locale}/writing`} className="kicker kicker--accent" style={{ display: "inline-block", textDecoration: "none" }}>
            ← {t.back}
          </Link>
          <p className="kicker" style={{ marginBottom: 10 }}>{a.kicker}</p>
          <h1 className="display" style={{ fontSize: "clamp(30px,4.2vw,50px)", textTransform: "none", maxWidth: "22ch" }}>
            {a.title}
          </h1>
          <p className="lead" style={{ marginTop: 20, maxWidth: "60ch" }}>{a.standfirst}</p>
          <p className="art-meta" style={{ marginTop: 22, paddingTop: 14, borderTop: "var(--hair)" }}>
            <span>{item.date}</span>
            <span>{item.minutes} {t.readSuffix}</span>
            <span>{item.tags.join(" · ")}</span>
          </p>
        </div>
      </section>

      <section className="band sec">
        <div className="wrap art">
          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}><Rich text={p} /></p>
              ))}
              {s.pre ? <pre className="art-pre">{s.pre}</pre> : null}
              {s.table ? (
                <div className="art-tw">
                  <table className="art-table">
                    <thead>
                      <tr>{s.table.head.map((th) => <th key={th}>{th}</th>)}</tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row, ri) => (
                        <tr key={ri}>{row.map((td, ci) => <td key={ci}><Rich text={td} /></td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </section>

      <section className="band band--surface sec">
        <div className="wrap">
          <h2 className="h2" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>{a.takeawayHeading}</h2>
          <ul className="ticks" style={{ marginTop: 22, maxWidth: "78ch" }}>
            {a.takeaway.map((x) => (
              <li key={x}><Rich text={x} /></li>
            ))}
          </ul>
          {publishedArticles.length > 1 ? (
            <p style={{ marginTop: 30, paddingTop: 18, borderTop: "var(--hair)" }}>
              <Link href={`/${locale}/writing/${next.slug}`} className="kicker kicker--accent" style={{ margin: 0, textDecoration: "none" }}>
                {t.next} : {next[locale].title} →
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <section className="band band--accent sec">
        <div className="wrap">
          <h2 className="display" style={{ maxWidth: "22ch" }}>{h.ctaTitle}</h2>
          <p style={{ margin: "20px 0 0", maxWidth: "56ch", fontSize: 16 }}>{h.ctaBody}</p>
          <div className="btns" style={{ marginTop: 26 }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">{h.ctaPrimary}</a>
            <a className="btn btn--ghost" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
