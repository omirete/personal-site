import { SVGProps } from "react";
import IconFlagEn from "@/assets/svg/lang/en.svg";
import IconFlagEs from "@/assets/svg/lang/es.svg";
import IconFlagDe from "@/assets/svg/lang/de.svg";

export const i18n = {
    defaultLocale: "en",
    locales: ["en", "es", "de"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const LocaleFlags: Record<Locale, React.FC<SVGProps<SVGSVGElement>>> = {
    en: IconFlagEn,
    es: IconFlagEs,
    de: IconFlagDe,
};
