"use client";
import { i18n, LocaleFlags } from "@/i18n/config";
import FCi18n from "@/i18n/types/FCi18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DetailedHTMLProps, HTMLAttributes } from "react";

const LangSelector: FCi18n<
    Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        "children"
    >
> = ({ lang, className, ...props }) => {
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
                                    pathname === `/${lang}`
                                        ? `/${locale}`
                                        : pathname?.replace(
                                              `/${lang}/`,
                                              `/${locale}/`
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
