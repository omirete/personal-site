import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { Metadata } from "next";
import MyNavbar from "@/components/layout/MyNavbar";
import { i18n, Locale } from "@/i18n/config";
import { dict } from "./dictionary";

export async function generateMetadata({
    params,
}: {
    params: { lang: string };
}): Promise<Metadata> {
    // read route params
    const lang = params.lang as Locale;
    const localeDict = dict[lang] ?? dict[i18n.defaultLocale];
    return {
        description: localeDict.siteDescription,
    };
}

const RootLayout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: { lang: Locale };
}) => {
    const session = await getServerSession(authOptions);
    return (
        <html lang={params.lang} data-bs-theme="light">
            <body>
                <MyNavbar session={session} lang={params.lang as Locale} />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
