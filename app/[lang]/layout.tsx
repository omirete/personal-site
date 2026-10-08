import { ReactNode } from "react";
import { Metadata } from "next";
import MyNavbar from "@/components/layout/MyNavbar";
import { i18n, Locale } from "@/i18n/config";
import { getPublicPersonalInfo } from "@/helpers/database/getPublicCollections";
import { getPersonalInfoMetadata } from "@/helpers/personalInfoPresentation";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function generateStaticParams() {
    return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const requestedLang = (await params).lang;
    const lang = i18n.locales.find((locale) => locale === requestedLang) ?? i18n.defaultLocale;
    return getPersonalInfoMetadata(await getPublicPersonalInfo(), lang);
}

const RootLayout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ lang: string }>;
}) => {
    const lang = (await params).lang as Locale;
    return (
        <html lang={lang} data-bs-theme="light">
            <body>
                <MyNavbar lang={lang} />
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
};

export default RootLayout;
