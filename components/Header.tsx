"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { content } from "@/lib/content";
import { otherLocale, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const t = content[locale].nav;
  const other = otherLocale[locale];
  const swapped = pathname.replace(new RegExp(`^/${locale}`), `/${other}`);

  const links = [
    { href: `/${locale}`, label: t.home, exact: true },
    { href: `/${locale}/cases`, label: t.cases, exact: false },
    { href: `/${locale}/about`, label: t.about, exact: false },
    { href: `/${locale}/contact`, label: t.contact, exact: false },
  ];

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href={`/${locale}`} className="brand">
          Ilyas Ouhnine <span>— AI</span>
        </Link>
        <nav className="nav" aria-label={t.home}>
          {links.map((l) => {
            const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}>
                {l.label}
              </Link>
            );
          })}
          <Link href={swapped} className="lang" hrefLang={other}>
            {other}
          </Link>
        </nav>
      </div>
    </header>
  );
}
