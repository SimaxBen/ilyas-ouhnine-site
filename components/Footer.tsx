import { content } from "@/lib/content";
import { site } from "@/lib/config";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <footer className="ftr">
      <div className="ftr__in">
        <div>
          <b>Ilyas Ouhnine</b>
          <br />
          {t.footer.tagline}
        </div>
        <div>
          Casablanca, Maroc
          <br />
          UTC+1 — {locale === "fr" ? "même fuseau que Paris" : "same time zone as Paris"}
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div>
          © {new Date().getFullYear()} · {t.footer.rights}
          <br />
          <a href={site.linkedin} target="_blank" rel="noreferrer noopener">LinkedIn</a>
          {" · "}
          <a href={site.github} target="_blank" rel="noreferrer noopener">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
