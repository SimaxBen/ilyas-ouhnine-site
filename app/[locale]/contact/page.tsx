import type { Metadata } from "next";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { RateAnchor } from "@/components/RateAnchor";
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

  return (
    <>
      <section className="section">
        <div className="wrap">
          <hr className="rule" />
          <h1 className="h1">{t.title}</h1>
          <p className="lead" style={{ marginTop: "1.4rem" }}>{t.lead}</p>
          <div className="btn-row" style={{ marginTop: "2.2rem" }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">
              {t.bookCta}
            </a>
            <a className="btn btn--ghost" href={`mailto:${site.email}`}>
              {t.orEmail}
            </a>
          </div>
          <RateAnchor locale={locale} />
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="grid grid-2">
            <div>
              <hr className="rule" />
              <h2 className="h2" style={{ marginBottom: "1.6rem" }}>{t.helpTitle}</h2>
              <ul className="ticks">
                {t.help.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <hr className="rule" />
              <h2 className="h2" style={{ marginBottom: "1.6rem" }}>{t.replyTitle}</h2>
              <p style={{ color: "var(--ink-soft)" }}>{t.replyBody}</p>
              <dl className="facts" style={{ marginTop: "2rem" }}>
                <div>
                  <dt>Email</dt>
                  <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
                </div>
                <div>
                  <dt>LinkedIn</dt>
                  <dd><a href={site.linkedin} target="_blank" rel="noreferrer noopener">ilyas-ouhnine</a></dd>
                </div>
                <div>
                  <dt>{locale === "fr" ? "Fuseau" : "Time zone"}</dt>
                  <dd>{site.timezone}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
