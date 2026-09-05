import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { locales, toLocale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { site } from "@/lib/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale];
  const title =
    locale === "fr"
      ? "Ilyas Ouhnine — Ingénieur IA · RAG et intelligence documentaire"
      : "Ilyas Ouhnine — AI engineer · RAG and document intelligence";
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: "%s · Ilyas Ouhnine" },
    description: t.home.lead,
    alternates: { canonical: `/${locale}`, languages: { fr: "/fr", en: "/en" } },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      url: `${site.url}/${locale}`,
      title,
      description: t.home.lead,
      siteName: "Ilyas Ouhnine",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = content[locale];

  return (
    <html lang={locale}>
      <head>
        {/* Archivo via Google Fonts : chargé par le navigateur, jamais au build.
            Le build reste hors-ligne, et la pile de repli est dans globals.css. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="skip">
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ilyas Ouhnine",
              jobTitle: locale === "fr" ? "Ingénieur IA indépendant" : "Independent AI engineer",
              description: t.home.lead,
              email: site.email,
              url: site.url,
              sameAs: [site.linkedin, site.github],
              address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
            }),
          }}
        />
      </body>
    </html>
  );
}
