"use client";
import { i18n } from "@/i18n/config";
import IconFlagEn from "@/assets/svg/lang/en.svg";
import IconFlagEs from "@/assets/svg/lang/es.svg";
import IconFlagDe from "@/assets/svg/lang/de.svg";
const LocaleFlags = { en: IconFlagEn, es: IconFlagEs, de: IconFlagDe };
import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DetailedHTMLProps, HTMLAttributes } from "react";

const LangSelector: FC<{ lang: Locale } & Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        "children"
    >> = ({ lang, className, ...props }) => {
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
                                    pathname === "/"
                                        ? `/${locale}`
                                        : pathname === `/${lang}`
                                          ? `/${locale}`
                                          : pathname?.replace(
                                                `/${lang}/`,
                                                `/${locale}/`,
                                            ) ?? "/"
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

export default LangSelector;
