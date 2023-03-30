import { i18n, Locale } from "../config";

export default interface StringI18N
    extends Record<Locale, string | undefined> {}

// export const EmptyStringI18N: StringI18N = Object.fromEntries(
//     i18n.locales.map((lang) => [lang, ""])
// );
