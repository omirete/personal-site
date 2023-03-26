import ClientSessionProvider from "@/components/next-auth/ClientSessionProvider";
import Navbar from "@/components/ui/Navbar";
import NavbarAnchor from "@/components/ui/Navbar/NavbarAnchor";
import NavbarLink from "@/components/ui/Navbar/NavbarLink";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Script from "next/script";
import { ReactNode } from "react";
import { FaDownload } from "react-icons/fa";

import "./custom.scss";

export const metadata = {
    title: "Federico Giancarelli",
    description: "Maker of things. 🚀",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(authOptions);
    const linkClasses = "text-white fw-sm-bold";
    return (
        <html lang="en" data-bs-theme="light">
            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-L1HLH88FGG"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-L1HLH88FGG');
                    `}
            </Script>
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
                                <FaDownload /> CV!
                            </span>
                            <span className="d-block d-sm-none fs-4">
                                <FaDownload /> CV!
                            </span>
                        </Link>
                    </Navbar>
                    {children}
                </ClientSessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
