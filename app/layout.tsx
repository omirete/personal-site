import { Metadata, Viewport } from "next";
import { ReactNode, Suspense } from "react";
import "./custom.scss";
import ClientSessionProvider from "@/components/next-auth/ClientSessionProvider";
import { Analytics } from "@vercel/analytics/react";
import { getFileUrl } from "@/helpers/fileStorage/publicUrl";
import { getPublicPersonalInfo } from "@/helpers/database/getPublicCollections";
import { getPersonalInfoMetadata } from "@/helpers/personalInfoPresentation";
import { i18n } from "@/i18n/config";

const baseMetadata: Metadata = {
    icons: {
        icon: getFileUrl("profile.png"),
        shortcut: getFileUrl("profile.png"),
        apple: getFileUrl("profile.png"),
    },
    category: "portfolio",
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        ...baseMetadata,
        ...getPersonalInfoMetadata(await getPublicPersonalInfo(), i18n.defaultLocale),
    };
}

export const viewport: Viewport = {
    themeColor: "#e3704f",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ClientSessionProvider>
            {/* Locale params can become runtime data when a public route is revalidated. */}
            <Suspense fallback={
                <html lang={i18n.defaultLocale} data-bs-theme="light">
                    <body><div role="status">Loading…</div></body>
                </html>
            }>
                {children}
            </Suspense>
            <Analytics />
        </ClientSessionProvider>
    );
};

export default RootLayout;
