"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { content } from "@/lib/content";
import { site } from "@/lib/config";
import { otherLocale, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const t = content[locale].nav;
  const other = otherLocale[locale];
  const swapped = pathname.replace(new RegExp(`^/${locale}`), `/${other}`);

  const links = [
    { href: `/${locale}/cases`, label: t.cases },
    { href: `/${locale}/method`, label: t.method },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  return (
    <header className="hdr">
      <div className="hdr__in">
        <Link href={`/${locale}`} className="brand" onClick={() => setOpen(false)}>
          <span className="sq" style={{ margin: 0 }} />
          Ilyas Ouhnine <s>RAG · Intelligence documentaire</s>
        </Link>

        <nav className="hdr__nav" aria-label={t.home}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hdr__end">
          <Link href={swapped} className="lang" hrefLang={other}>
            <b>{locale}</b> / {other}
          </Link>
          <a className="btn hdr__book" href={site.cal} target="_blank" rel="noreferrer noopener">
            {t.book}
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={locale === "fr" ? "Menu" : "Menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div id="menu-mobile" className="menu" hidden={!open}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a className="btn" href={site.cal} target="_blank" rel="noreferrer noopener" onClick={() => setOpen(false)}>
          {t.book}
        </a>
      </div>
    </header>
  );
}
