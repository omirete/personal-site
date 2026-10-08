import { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "./custom.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/auth";
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

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(authOptions);
    return (
        <ClientSessionProvider session={session}>
            {children}
            <Analytics />
        </ClientSessionProvider>
    );
};

export default RootLayout;
