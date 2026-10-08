import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "./i18n/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hasLocale = i18n.locales.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    );
    if (hasLocale) return NextResponse.next();
    const languages = new Negotiator({
        headers: { "accept-language": request.headers.get("accept-language") ?? "" },
    }).languages().filter((language) => language !== "*");
    let locale: string = i18n.defaultLocale;
    try {
        locale = match(languages, [...i18n.locales], i18n.defaultLocale);
    } catch {
        // Malformed language tags should use the default, not fail the request.
    }
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\..*).*)"],
};
