"use client";
import { i18n } from "@/i18n/config";
import IconFlagEn from "@/assets/svg/lang/en.svg";
import IconFlagEs from "@/assets/svg/lang/es.svg";
import IconFlagDe from "@/assets/svg/lang/de.svg";
const LocaleFlags = { en: IconFlagEn, es: IconFlagEs, de: IconFlagDe };
import { Suspense, type ComponentProps, type FC } from "react";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { DetailedHTMLProps, HTMLAttributes } from "react";

const LanguageLinks: FC<
    { lang: Locale; query?: string } & Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        "children"
    >
> = ({ lang, query = "", className, ...props }) => {
    const pathname = usePathname();
    return (
        <div className={`d-flex ${className}`} {...props}>
            <ul className="list-group list-group-horizontal">
                {i18n.locales.map((locale) => {
                    const Icon = LocaleFlags[locale];
                    return (
                        <li
                            key={locale}
                            className={`
                                list-group-item p-0
                                bg-white bg-opacity-25
                                d-flex align-items-center justify-content-center
                                ${
                                    locale === lang
                                        ? "bg-opacity-75"
                                        : "bg-opacity-50-hover"
                                }
                            `}
                        >
                            <Link
                                className={`
                                    p-2
                                    d-flex
                                    align-items-center justify-content-center
                                `}
                                href={
                                    (pathname === "/"
                                        ? `/${locale}`
                                        : pathname === `/${lang}`
                                          ? `/${locale}`
                                          : (pathname?.replace(
                                                `/${lang}/`,
                                                `/${locale}/`,
                                            ) ?? "/")) +
                                    (query ? `?${query}` : "")
                                }
                            >
                                <Icon width="1em" height="1em" />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

type LangSelectorProps = Omit<ComponentProps<typeof LanguageLinks>, "query">;

const QueryAwareLanguageLinks: FC<LangSelectorProps> = (props) => {
    const searchParams = useSearchParams();
    return <LanguageLinks {...props} query={searchParams.toString()} />;
};

const LangSelector: FC<LangSelectorProps> = (props) => (
    <Suspense fallback={<LanguageLinks {...props} />}>
        <QueryAwareLanguageLinks {...props} />
    </Suspense>
);

export default LangSelector;
