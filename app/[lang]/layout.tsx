import { ReactNode, Suspense } from "react";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../custom.scss";
import MyNavbar from "@/components/layout/MyNavbar";
import ClientSessionProvider from "@/components/next-auth/ClientSessionProvider";
import { i18n, hasLocale } from "@/i18n/config";
import { getDictionary } from "./dictionaries";
import { getFileUrl } from "@/helpers/fileStorage/publicUrl";
import { getPublicPersonalInfo } from "@/helpers/database/getPublicCollections";
import { getPersonalInfoMetadata } from "@/helpers/personalInfoPresentation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export function generateStaticParams() {
    return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    return {
        icons: {
            icon: getFileUrl("profile.png"),
            shortcut: getFileUrl("profile.png"),
            apple: getFileUrl("profile.png"),
        },
        category: "portfolio",
        ...getPersonalInfoMetadata(await getPublicPersonalInfo(), lang),
    };
}

export const viewport: Viewport = { themeColor: "#e3704f" };

export default async function RootLayout({ children, params }: {
    children: ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    const dictionary = await getDictionary(lang);
    return (
        <html lang={lang} data-bs-theme="light">
            <body>
                <ClientSessionProvider>
                    <Suspense fallback={<div role="status">Loading…</div>}>
                        <MyNavbar lang={lang} dictionary={dictionary.myNavbar} loginDictionary={dictionary.loginButton} />
                        {children}
                    </Suspense>
                </ClientSessionProvider>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
