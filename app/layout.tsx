import { Analytics } from "@vercel/analytics/react";
import ClientSessionProvider from "@/components/next-auth/ClientSessionProvider";
import Navbar from "@/components/ui/Navbar";
import NavbarAnchor from "@/components/ui/Navbar/NavbarAnchor";
import NavbarLink from "@/components/ui/Navbar/NavbarLink";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ReactNode } from "react";
import { FaDownload } from "react-icons/fa";

import "./custom.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Federico Giancarelli",
    description: "Maker of things, dev, amazed by the world 🚀",
    themeColor: "#e3704f",
    icons: {
        icon: "https://files.federicogiancarelli.com/profile.png",
        shortcut: "https://files.federicogiancarelli.com/profile.png",
        apple: "https://files.federicogiancarelli.com/profile.png",
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
    const session = await getServerSession(authOptions);
    const linkClasses = "text-white fw-sm-bold";
    return (
        <html lang="en" data-bs-theme="light">
            <body>
                <ClientSessionProvider session={session}>
                    <Navbar id="navbar">
                        <ul className="navbar-nav me-auto">
                            <NavbarAnchor href="/#" className={linkClasses}>
                                Home
                            </NavbarAnchor>
                            <NavbarAnchor
                                href="/#highlights"
                                className={linkClasses}
                            >
                                Highlights
                            </NavbarAnchor>
                            <NavbarAnchor
                                href="/#experience"
                                className={linkClasses}
                            >
                                Experience
                            </NavbarAnchor>
                            <NavbarAnchor
                                href="/#projects"
                                className={linkClasses}
                            >
                                Projects
                            </NavbarAnchor>
                            <NavbarAnchor
                                href="/#contact"
                                className={linkClasses}
                            >
                                Contact
                            </NavbarAnchor>
                            {/* <NavbarLink href="/chat">
                                    Chat with "me" now! (AI)
                                </NavbarLink> */}
                            {/* <NavbarLink href="/playground">Playground</NavbarLink> */}
                            {session && (
                                <NavbarLink
                                    href="/admin/files"
                                    className={linkClasses}
                                >
                                    Admin
                                </NavbarLink>
                            )}
                        </ul>
                        <Link
                            href={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/cv/Federico_Giancarelli_EN.pdf`}
                            download
                            rel="noreferrer noopener"
                            target="_blank"
                            className="btn btn-primary text-white mt-3 mt-sm-0"
                        >
                            <span className="d-none d-sm-block">
                                <FaDownload /> CV
                            </span>
                            <span className="d-block d-sm-none fs-4">
                                <FaDownload /> CV
                            </span>
                        </Link>
                    </Navbar>
                    {children}
                </ClientSessionProvider>
                <Analytics />
            </body>
        </html>
    );
};

export default RootLayout;
