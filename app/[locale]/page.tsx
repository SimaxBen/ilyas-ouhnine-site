import Link from "next/link";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { publishedCases } from "@/lib/cases";
import { CaseLink } from "@/components/CaseLink";
import { RateAnchor } from "@/components/RateAnchor";
import { toLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale].home;
  const nav = content[locale].nav;

  return (
    <>
      {/* Hero */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="h1" style={{ maxWidth: "18ch" }}>{t.h1}</h1>
          <p className="lead" style={{ marginTop: "1.8rem" }}>{t.lead}</p>
          <div className="btn-row" style={{ marginTop: "2.2rem" }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">
              {t.ctaPrimary}
            </a>
            <Link className="btn btn--ghost" href={`/${locale}/cases`}>
              {t.ctaSecondary}
            </Link>
          </div>
          <RateAnchor locale={locale} />
        </div>
      </section>

      {/* Le problème */}
      <section className="section section--alt">
        <div className="wrap">
          <hr className="rule" />
          <h2 className="h2" style={{ maxWidth: "20ch" }}>{t.problemTitle}</h2>
          <div className="grid grid-3 numbered" style={{ marginTop: "2.8rem" }}>
            {t.problems.map((p) => (
              <article className="card" key={p.title}>
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Références */}
      <section className="section">
        <div className="wrap">
          <hr className="rule" />
          <h2 className="h2">{t.casesTitle}</h2>
          <p className="lead" style={{ marginTop: "0.9rem" }}>{t.casesLead}</p>
          <div style={{ marginTop: "2.4rem" }}>
            {publishedCases.map((item) => (
              <CaseLink key={item.slug} item={item} locale={locale} more={nav.cases} />
            ))}
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="section section--alt">
        <div className="wrap">
          <hr className="rule" />
          <h2 className="h2">{t.offerTitle}</h2>
          <div className="grid grid-3" style={{ marginTop: "2.4rem" }}>
            {t.offers.map((o) => (
              <article className="card" key={o.title}>
                <h3 className="h3">{o.title}</h3>
                <p>{o.body}</p>
              </article>
            ))}
          </div>
          <RateAnchor locale={locale} />
        </div>
      </section>

      {/* Secteurs */}
      <section className="section">
        <div className="wrap">
          <hr className="rule" />
          <h2 className="h2">{t.sectorsTitle}</h2>
          <p className="lead" style={{ marginTop: "0.9rem" }}>{t.sectorsLead}</p>
          <ul className="ticks" style={{ marginTop: "2rem", maxWidth: "42rem" }}>
            {t.sectors.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="wrap">
          <h2 className="h2" style={{ maxWidth: "16ch" }}>{t.ctaTitle}</h2>
          <p className="lead" style={{ marginTop: "1.1rem" }}>{t.ctaBody}</p>
          <div className="btn-row" style={{ marginTop: "2rem" }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">
              {t.ctaPrimary}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
