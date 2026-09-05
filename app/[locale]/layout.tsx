import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { locales, toLocale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { site } from "@/lib/config";

// Polices : piles systeme, definies dans app/globals.css.
// Zero requete reseau, zero decalage de mise en page au chargement.
//
// Pour passer a Google Fonts (fonctionne sur Vercel, bloque dans certains reseaux) :
//   1. import { Inter, Newsreader } from "next/font/google";
//   2. const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
//      const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: ["400","500"] });
//   3. <html className={`${inter.variable} ${newsreader.variable}`}>
//   4. dans globals.css : --sans: var(--font-sans), <pile systeme>;  --serif: var(--font-serif), <pile systeme>;

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
  return {
    metadataBase: new URL(site.url),
    title: {
      default:
        locale === "fr"
          ? "Ilyas Ouhnine — Ingénieur IA · RAG et intelligence documentaire"
          : "Ilyas Ouhnine — AI engineer · RAG and document intelligence",
      template: "%s · Ilyas Ouhnine",
    },
    description: t.home.lead,
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      url: `${site.url}/${locale}`,
      title: `Ilyas Ouhnine — ${t.home.h1}`,
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
              sameAs: [site.linkedin],
              address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
            }),
          }}
        />
      </body>
    </html>
  );
}
