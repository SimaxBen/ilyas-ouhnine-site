import type { Metadata } from "next";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { toLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  return { title: content[locale].contact.title, description: content[locale].contact.lead };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale].contact;
  const h = content[locale].home;

  return (
    <>
      <section className="band sec">
        <div className="wrap">
          <h1 className="display" style={{ maxWidth: "14ch" }}>{t.title}</h1>
          <p className="lead" style={{ margin: "24px 0 0", maxWidth: "62ch" }}>{t.lead}</p>
          <div className="btns" style={{ marginTop: 28 }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">{t.bookCta}</a>
            <a className="btn btn--ghost" href={`mailto:${site.email}`}>{t.orEmail}</a>
          </div>
          <p className="tiny" style={{ marginTop: 24, paddingTop: 16, borderTop: "var(--hair)" }}>{h.priceLine}</p>
        </div>
      </section>

      <section className="band split band--surface">
        <div>
          <p className="kicker">{t.helpTitle}</p>
          <ul className="ticks">
            {t.help.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker">{t.replyTitle}</p>
          <p className="lead" style={{ marginBottom: 22 }}>{t.replyBody}</p>
          <dl className="dl" style={{ margin: 0 }}>
            <div><dt>Email</dt><dd><a href={`mailto:${site.email}`} style={{ color: "var(--accent)" }}>{site.email}</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href={site.linkedin} target="_blank" rel="noreferrer noopener" style={{ color: "var(--accent)" }}>ilyas-ouhnine</a></dd></div>
            <div><dt>GitHub</dt><dd><a href={site.github} target="_blank" rel="noreferrer noopener" style={{ color: "var(--accent)" }}>SimaxBen</a></dd></div>
            <div><dt>{locale === "fr" ? "Fuseau" : "Time zone"}</dt><dd>{site.timezone}</dd></div>
          </dl>
        </div>
      </section>
    </>
  );
}
