export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const otherLocale: Record<Locale, Locale> = { fr: "en", en: "fr" };

/** Restreint un segment d'URL a une locale connue.
 *  Avec `dynamicParams = false`, seules "fr" et "en" atteignent les pages :
 *  le repli n'est la que pour satisfaire le typage des routes Next. */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}
