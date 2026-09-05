import { content } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/** Ligne de tarif, réutilisable hors accueil. */
export function RateAnchor({ locale }: { locale: Locale }) {
  return <p className="tiny">{content[locale].home.priceLine}</p>;
}
