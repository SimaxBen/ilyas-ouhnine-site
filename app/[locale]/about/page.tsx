import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { toLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  return { title: content[locale].about.title, description: content[locale].about.lead };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale].about;

  return (
    <>
      <section className="section">
        <div className="wrap">
          <hr className="rule" />
          <h1 className="h1">{t.title}</h1>
          <p className="lead" style={{ marginTop: "1.4rem" }}>{t.lead}</p>
          <div className="prose" style={{ marginTop: "2.6rem" }}>
            {t.body.map((p, i) => (
              <p key={i} style={{ color: "var(--ink-soft)" }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <hr className="rule" />
          <h2 className="h2" style={{ marginBottom: "2rem" }}>{t.factsTitle}</h2>
          <dl className="facts" style={{ maxWidth: "52rem" }}>
            {t.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <hr className="rule" />
          <h2 className="h2">{t.notTitle}</h2>
          <p className="lead" style={{ marginTop: "1.1rem" }}>{t.notBody}</p>
          <div className="btn-row" style={{ marginTop: "2.2rem" }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">
              {content[locale].home.ctaPrimary}
            </a>
            <Link className="btn btn--ghost" href={`/${locale}/cases`}>
              {content[locale].nav.cases}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
