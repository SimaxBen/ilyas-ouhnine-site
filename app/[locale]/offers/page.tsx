import type { Metadata } from "next";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { toLocale } from "@/lib/i18n";
import { Rich } from "@/components/Rich";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  return { title: content[locale].offersPage.title, description: content[locale].offersPage.lead };
}

export default async function OffersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale].offersPage;
  const h = content[locale].home;

  return (
    <>
      {/* Titre */}
      <section className="band sec" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <h1 className="display" style={{ maxWidth: "16ch" }}>{t.title}</h1>
          <p className="lead" style={{ margin: "22px 0 0", maxWidth: "62ch" }}>{t.lead}</p>
        </div>
      </section>

      {/* Les trois offres */}
      <section className="band sec">
        <div className="wrap">
          <ol className="num offers-list" style={{ margin: 0, padding: 0 }}>
            {t.items.map((o) => (
              <li key={o.n}>
                <span className="n">{o.n}</span>

                <div>
                  <h2 className="h3" style={{ marginBottom: 10 }}>{o.title}</h2>
                  <p className="offer-price">{o.price}</p>
                  <p className="tiny" style={{ marginTop: 6 }}>{o.duration}</p>
                </div>

                <div>
                  <p className="kicker" style={{ marginTop: 0 }}>{t.whoLabel}</p>
                  <p style={{ margin: "0 0 22px" }}>{o.who}</p>

                  <p className="kicker">{t.deliverLabel}</p>
                  <ul className="ticks" style={{ marginBottom: 22 }}>
                    {o.deliver.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>

                  <p className="kicker">{t.qualLabel}</p>
                  <p className="offer-qual">« {o.qual} »</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Comment ça se passe + ce que je ne fais pas */}
      <section className="band band--surface sec">
        <div className="wrap two">
          <div>
            <h2 className="h2" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>{t.howTitle}</h2>
            <ol className="num" style={{ margin: "24px 0 0", padding: 0 }}>
              {t.how.map((step, i) => (
                <li key={i} style={{ gridTemplateColumns: "54px 1fr" }}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <p><Rich text={step} /></p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="kicker kicker--accent">{t.notTitle}</p>
            <p className="tiny" style={{ marginTop: 10 }}>{t.notBody}</p>
            <p className="tiny" style={{ marginTop: 22, paddingTop: 16, borderTop: "var(--hair)" }}>{h.priceLine}</p>
          </div>
        </div>
      </section>

      {/* Appel */}
      <section className="band band--accent sec">
        <div className="wrap">
          <h2 className="display" style={{ maxWidth: "22ch" }}>{t.ctaTitle}</h2>
          <p style={{ margin: "20px 0 0", maxWidth: "56ch", fontSize: 16 }}>{t.ctaBody}</p>
          <div className="btns" style={{ marginTop: 26 }}>
            <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener">{h.ctaPrimary}</a>
            <a className="btn btn--ghost" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
