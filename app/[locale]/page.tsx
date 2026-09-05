import Link from "next/link";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { publishedCases } from "@/lib/cases";
import { CitationDemo } from "@/components/CitationDemo";
import { RefRow } from "@/components/RefRow";
import { toLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale].home;

  return (
    <>
      {/* Héros : le texte à gauche, la démonstration à droite */}
      <section className="band split">
        <div>
          <p className="kicker kicker--accent">{t.eyebrow}</p>
          <h1 className="display">
            {t.h1a}
            <em>{t.h1em}</em>
            {t.h1b}
          </h1>
          <p className="lead" style={{ margin: "26px 0 0", maxWidth: "46ch" }}>{t.lead}</p>
          <div className="btns" style={{ marginTop: 28 }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">{t.ctaPrimary}</a>
            <Link className="btn btn--ghost" href={`/${locale}/cases`}>{t.ctaSecondary}</Link>
          </div>
          <p className="tiny" style={{ marginTop: 24, paddingTop: 16, borderTop: "var(--hair)" }}>{t.priceLine}</p>
        </div>
        <div style={{ background: "var(--surface)" }}>
          <CitationDemo demo={t.demo} />
        </div>
      </section>

      {/* Tableau de bord */}
      <section className="band">
        <p className="kicker" style={{ padding: "12px var(--pad) 0", margin: 0 }}>
          <span className="sq" />{t.scoreLabel}
        </p>
        <div className="score" style={{ borderTop: 0, marginTop: 10 }}>
          {t.score.map((s) => (
            <div key={s.v}>
              <b className={s.hi ? "hi" : undefined}>{s.v}</b>
              <s>{s.l}</s>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi ça casse */}
      <section className="band band--surface sec">
        <div className="wrap">
          <h2 className="h2" style={{ maxWidth: "30ch" }}>{t.problemTitle}</h2>
          <p className="tiny" style={{ marginTop: 12 }}>{t.problemLead}</p>
          <ol className="num" style={{ margin: "30px 0 0", padding: 0 }}>
            {t.problems.map((p, i) => (
              <li key={p.title}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Le pipeline */}
      <section className="band sec" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <h2 className="h2" style={{ fontSize: "clamp(20px,2.4vw,26px)", display: "inline" }}>{t.pipelineTitle}</h2>
          <span className="tiny" style={{ marginLeft: 12 }}>{t.pipelineLead}</span>
        </div>
        <div className="cards" style={{ marginTop: 26, borderBottom: "var(--rule)" }}>
          {t.pipeline.map((s, i) => (
            <article key={s.t} style={s.hi ? { background: "var(--accent-100)" } : undefined}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h3" style={{ fontSize: 15, textTransform: "uppercase", letterSpacing: ".04em" }}>{s.t}</h3>
              <p style={{ fontSize: 13 }}>{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Offres */}
      <section className="band band--surface sec">
        <div className="wrap">
          <h2 className="h2">{t.offerTitle}</h2>
          <ol className="num" style={{ margin: "30px 0 0", padding: 0 }}>
            {t.offers.map((o, i) => (
              <li key={o.title}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{o.title}</h3>
                <p>{o.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Références */}
      <section className="band sec">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
            <h2 className="h2">{t.refsTitle}</h2>
            <Link href={`/${locale}/cases`} className="kicker kicker--accent" style={{ margin: 0, textDecoration: "none" }}>
              {t.refsAll} →
            </Link>
          </div>
          <div className="refs" style={{ marginTop: 26 }}>
            {publishedCases.map((item) => (
              <RefRow key={item.slug} item={item} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Appel */}
      <section className="band band--accent sec">
        <div className="wrap">
          <h2 className="display" style={{ maxWidth: "20ch" }}>{t.ctaTitle}</h2>
          <p style={{ margin: "22px 0 0", maxWidth: "68ch", fontSize: 17, lineHeight: 1.6 }}>{t.ctaBody}</p>
          <div className="btns" style={{ marginTop: 28 }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">{t.ctaPrimary}</a>
            <a className="btn btn--ghost" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
