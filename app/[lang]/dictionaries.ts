import "server-only";
import type { Locale } from "@/i18n/config";

const dictionaries = {
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    es: () => import("./dictionaries/es.json").then((module) => module.default),
    de: () => import("./dictionaries/de.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;
export const getDictionary = (locale: Locale) => dictionaries[locale]();
