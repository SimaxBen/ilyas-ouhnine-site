import { site } from "@/lib/config";
import { content } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function RateAnchor({ locale }: { locale: Locale }) {
  const t = content[locale].home;
  return (
    <p className="anchor">
      {t.anchor}
      <b>{site.rateFrom}</b>
      {t.anchorMid}
      <b>{site.dayRate}</b>
      {t.anchorEnd}
    </p>
  );
}
