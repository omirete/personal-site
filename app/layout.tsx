import { Metadata } from "next";
import { ReactNode } from "react";
import "./custom.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ClientSessionProvider from "@/components/next-auth/ClientSessionProvider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: "Federico Giancarelli",
    description: "Maker of things, dev, amazed by the world 🚀",
    themeColor: "#e3704f",
    icons: {
        icon: `${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/profile.png?v=0.1`,
        shortcut: `${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/profile.png?v=0.1`,
        apple: `${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/profile.png?v=0.1`,
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
                url: `${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/meta/twitter-card.webp?v=0.1`,
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
                url: `${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/meta/twitter-card.webp?v=0.1`,
                width: 1000,
                height: 500,
            },
        ],
        url: "https://federicogiancarelli.com",
    },
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
