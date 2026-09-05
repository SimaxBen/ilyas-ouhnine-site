import type { Metadata } from "next";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { toLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  return { title: content[locale].method.title, description: content[locale].method.lead };
}

export default async function MethodPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale].method;
  const h = content[locale].home;

  return (
    <>
      <section className="band split" style={{ gridTemplateColumns: "1.55fr 1fr" }}>
        <div>
          <h1 className="h2" style={{ marginBottom: 12 }}>{t.title}</h1>
          <p className="tiny">{t.lead}</p>
          <ol className="num" style={{ margin: "28px 0 0", padding: 0 }}>
            {t.items.map((it, i) => (
              <li key={it.title}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="h3">{it.title}</h2>
                <p>{it.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div style={{ background: "var(--surface)" }}>
          <p className="kicker">{t.sectorsTitle}</p>
          <dl className="dl" style={{ margin: 0 }}>
            {t.sectors.map((s) => (
              <div key={s.t} style={{ gridTemplateColumns: "1fr" }}>
                <dt style={{ letterSpacing: 0, textTransform: "none", fontSize: 14, color: "var(--ink)", fontWeight: 700 }}>{s.t}</dt>
                <dd style={{ fontSize: 13 }}>{s.d}</dd>
              </div>
            ))}
          </dl>
          <p className="tiny" style={{ marginTop: 18 }}>{t.sectorsNote}</p>
        </div>
      </section>

      <section className="band band--accent sec">
        <div className="wrap">
          <h2 className="display" style={{ maxWidth: "20ch" }}>{h.ctaTitle}</h2>
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
