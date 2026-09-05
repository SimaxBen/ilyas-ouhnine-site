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
  return { title: item[locale].title, description: item[locale].summary, alternates: { canonical: `/${locale}/cases/${slug}` } };
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
  const h = content[locale].home;
  const index = publishedCases.findIndex((x) => x.slug === slug);
  const next = publishedCases[(index + 1) % publishedCases.length];

  return (
    <>
      <section className="band split" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        <div>
          <Link href={`/${locale}/cases`} className="kicker kicker--accent" style={{ display: "inline-block", textDecoration: "none" }}>
            ← {t.back}
          </Link>
          <p className="kicker" style={{ marginBottom: 10 }}>{c.kicker}</p>
          <h1 className="display" style={{ fontSize: "clamp(30px,4.4vw,52px)", textTransform: "none", maxWidth: "20ch" }}>
            {c.title}
          </h1>
          <p className="lead" style={{ marginTop: 20, maxWidth: "56ch" }}>{c.summary}</p>
        </div>
        <div style={{ background: "var(--surface)" }}>
          <div className="ref__p" style={{ borderLeftWidth: 4, marginBottom: 22 }}>
            <b style={{ fontSize: 26 }}>{c.proof.v}</b>
            <s>{c.proof.l}</s>
          </div>
          <dl className="dl" style={{ margin: 0 }}>
            <div><dt>{t.role}</dt><dd style={{ fontSize: 13.5 }}>{c.role}</dd></div>
            <div><dt>{t.period}</dt><dd style={{ fontSize: 13.5 }}>{c.period}</dd></div>
          </dl>
          <p className="kicker" style={{ margin: "22px 0 10px" }}>{t.stack}</p>
          <ul className="tags">
            {item.stack.map((s) => (
              <li className="tag" key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band sec">
        <div className="wrap">
          <div className="prose">
            {c.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i}><Rich text={p} /></p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--surface sec">
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: 26 }}>{t.results}</h2>
          <ul className="results" style={{ maxWidth: "82ch" }}>
            {c.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <div className="prose" style={{ marginTop: 46 }}>
            <h2>{c.redoHeading}</h2>
            {c.redo.map((p, i) => (
              <p key={i}><Rich text={p} /></p>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--accent sec">
        <div className="wrap">
          <h2 className="display" style={{ maxWidth: "20ch" }}>{h.ctaTitle}</h2>
          <div className="btns" style={{ marginTop: 26 }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">{h.ctaPrimary}</a>
            <Link className="btn btn--ghost" href={`/${locale}/cases/${next.slug}`}>{t.next} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
