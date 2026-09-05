import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { publishedArticles } from "@/lib/writing";
import { toLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  return { title: content[locale].writing.title, description: content[locale].writing.lead };
}

export default async function WritingIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale].writing;
  const h = content[locale].home;

  return (
    <>
      <section className="band sec" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <h1 className="display" style={{ maxWidth: "14ch" }}>{t.title}</h1>
          <p className="lead" style={{ margin: "22px 0 0", maxWidth: "62ch" }}>{t.lead}</p>
        </div>
      </section>

      <section className="band sec">
        <div className="wrap">
          <div className="refs">
            {publishedArticles.map((a) => {
              const c = a[locale];
              return (
                <Link key={a.slug} href={`/${locale}/writing/${a.slug}`} className="ref">
                  <div>
                    <p className="ref__k">{c.kicker}</p>
                    <h2 className="ref__t">{c.title}</h2>
                    <p className="ref__d">{c.standfirst}</p>
                  </div>
                  <div>
                    <p className="art-meta" style={{ marginTop: 4 }}>
                      <span>{a.date}</span>
                      <span>{a.minutes} {t.readSuffix}</span>
                    </p>
                    <ul className="tags" style={{ marginTop: 14 }}>
                      {a.tags.map((tag) => (
                        <li key={tag} className="tag">{tag}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: 40, maxWidth: "68ch" }}>
            <p className="kicker kicker--accent">{t.noteTitle}</p>
            <p className="tiny" style={{ marginTop: 10 }}>{t.noteBody}</p>
          </div>
        </div>
      </section>

      <section className="band band--accent sec">
        <div className="wrap">
          <h2 className="display" style={{ maxWidth: "22ch" }}>{h.ctaTitle}</h2>
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
