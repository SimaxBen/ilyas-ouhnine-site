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
  const nav = content[locale].nav;

  return (
    <>
      <section className="band split" style={{ gridTemplateColumns: "1.35fr 1fr" }}>
        <div>
          <h1 className="h2">{t.title}</h1>
          <p className="lead" style={{ margin: "18px 0 26px", maxWidth: "50ch" }}>{t.lead}</p>
          <div className="prose">
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div style={{ background: "var(--surface)" }}>
          <p className="kicker">{t.factsTitle}</p>
          <dl className="dl" style={{ margin: 0 }}>
            {t.facts.map(([k, v]) => (
              <div key={k} style={{ gridTemplateColumns: "1fr" }}>
                <dt>{k}</dt>
                <dd style={{ fontSize: 13.5 }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band band--surface sec">
        <div className="wrap">
          <h2 className="h2" style={{ maxWidth: "18ch" }}>{t.notTitle}</h2>
          <p className="lead" style={{ marginTop: 16, maxWidth: "70ch" }}>{t.notBody}</p>
          <div className="btns" style={{ marginTop: 26 }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">{content[locale].home.ctaPrimary}</a>
            <Link className="btn btn--ghost" href={`/${locale}/cases`}>{nav.cases}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
