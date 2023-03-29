import "../custom.scss";
import { Analytics } from "@vercel/analytics/react";
import ClientSessionProvider from "@/components/next-auth/ClientSessionProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { Metadata } from "next";
import MyNavbar from "@/components/layout/MyNavbar";
import { Locale } from "@/i18n/config";

export const metadata: Metadata = {
    title: "Federico Giancarelli",
    description: "Maker of things, dev, amazed by the world 🚀",
    themeColor: "#e3704f",
    icons: {
        icon: "https://files.federicogiancarelli.com/profile.png?v=0.1",
        shortcut: "https://files.federicogiancarelli.com/profile.png?v=0.1",
        apple: "https://files.federicogiancarelli.com/profile.png?v=0.1",
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
                url: "https://files.federicogiancarelli.com/meta/twitter-card.webp?v=0.1",
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
                url: "https://files.federicogiancarelli.com/meta/twitter-card.webp?v=0.1",
                width: 1000,
                height: 500,
            },
        ],
        url: "https://federicogiancarelli.com",
    }
};

const RootLayout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: { lang: string };
}) => {
    const session = await getServerSession(authOptions);
    return (
        <html lang={params.lang} data-bs-theme="light">
            <body>
                <ClientSessionProvider session={session}>
                    <MyNavbar session={session} lang={params.lang as Locale} />
                    {children}
                </ClientSessionProvider>
                <Analytics />
            </body>
        </html>
    );
};

export default RootLayout;
