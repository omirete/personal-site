import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale, type Locale } from "@/i18n/config";
import { lang as getLang } from "next/root-params";
import { notFound } from "next/navigation";

export default async function Loading({ lang, className }: { lang?: Locale; className?: string }) {
    const locale = lang ?? await getLang();
    if (!hasLocale(locale)) notFound();
    const localeDict = (await getDictionary(locale)).common;

    return <div className={className} role="status">{localeDict.loading}…</div>;
}
