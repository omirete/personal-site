export const i18n = {
    defaultLocale: "en",
    locales: ["en", "es", "de"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
export const hasLocale = (locale: string): locale is Locale =>
    i18n.locales.some((supported) => supported === locale);
