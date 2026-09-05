import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import { publishedCases, getCase } from "@/lib/cases";
import { Rich } from "@/components/Rich";
import { site } from "@/lib/config";
import { locales, toLocale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => publishedCases.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const item = getCase(slug);
  if (!item) return {};
  const c = item[locale];
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/${locale}/cases/${slug}` },
  };
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const item = getCase(slug);
  if (!item) notFound();

  const c = item[locale];
  const t = content[locale].cases;

  const index = publishedCases.findIndex((x) => x.slug === slug);
  const next = publishedCases[(index + 1) % publishedCases.length];

  return (
    <>
      <section className="section">
        <div className="wrap">
          <Link href={`/${locale}/cases`} className="backlink">
            ← {t.back}
          </Link>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>{c.kicker}</p>
          <h1 className="h1" style={{ maxWidth: "20ch" }}>{c.title}</h1>
          <p className="lead" style={{ marginTop: "1.5rem" }}>{c.summary}</p>
          <div className="case-meta">
            <span>{t.role} — {c.role}</span>
            <span>{t.period} — {c.period}</span>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="case-body">
            {c.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>
                    <Rich text={p} />
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid-2">
            <div>
              <hr className="rule" />
              <h2 className="h2" style={{ marginBottom: "1.6rem" }}>{t.results}</h2>
              <ul className="results">
                {c.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <hr className="rule" />
              <h2 className="h2" style={{ marginBottom: "1.6rem" }}>{t.stack}</h2>
              <ul className="tags">
                {item.stack.map((s) => (
                  <li className="tag" key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="case-body" style={{ marginTop: "4rem" }}>
            <h2>{c.redoHeading}</h2>
            {c.redo.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="wrap">
          <h2 className="h2">{content[locale].home.ctaTitle}</h2>
          <p className="lead" style={{ marginTop: "1rem" }}>{content[locale].home.ctaBody}</p>
          <div className="btn-row" style={{ marginTop: "2rem" }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">
              {content[locale].home.ctaPrimary}
            </a>
            <Link className="btn btn--ghost" href={`/${locale}/cases/${next.slug}`} style={{ color: "var(--bg)", borderColor: "color-mix(in srgb, var(--bg) 40%, transparent)" }}>
              {t.next} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
