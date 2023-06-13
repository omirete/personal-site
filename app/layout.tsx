import { Metadata } from "next";
import { ReactNode } from "react";
import "./custom.scss";

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
    },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
    return children;
};

export default RootLayout;
