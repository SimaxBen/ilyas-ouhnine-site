import Link from "next/link";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div>
          <p style={{ marginBottom: "0.4rem" }}>{t.footer.tagline}</p>
          <p className="small">
            © {new Date().getFullYear()} Ilyas Ouhnine. {t.footer.rights}
          </p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer noopener">LinkedIn</a>
          <Link href={`/${locale}/contact`}>{t.nav.contact}</Link>
        </div>
      </div>
    </footer>
  );
}
