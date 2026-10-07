import { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "./custom.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/auth";
import ClientSessionProvider from "@/components/next-auth/ClientSessionProvider";
import { Analytics } from "@vercel/analytics/react";
import { getFileUrl } from "@/helpers/fileStorage/publicUrl";

export const metadata: Metadata = {
    title: "Federico Giancarelli",
    description: "Maker of things, dev, amazed by the world 🚀",
    icons: {
        icon: getFileUrl("profile.png"),
        shortcut: getFileUrl("profile.png"),
        apple: getFileUrl("profile.png"),
    },
    category: "portfolio",
    twitter: {
        card: "summary_large_image",
        title: "Federico Giancarelli",
        description: "Maker of things, dev, amazed by the world 🚀",
        site: "@fedegianca",
        creator: "@fedegianca",
        images: [
            {
                url: getFileUrl("meta/twitter-card.webp"),
                width: 1000,
                height: 500,
                alt: "Twitter card for website federicogiancarelli.com",
            },
        ],
    },
    openGraph: {
        title: "Federico Giancarelli",
        type: "website",
        images: [
            {
                url: getFileUrl("meta/twitter-card.webp"),
                width: 1000,
                height: 500,
            },
        ],
        url: "https://federicogiancarelli.com",
    },
};

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
