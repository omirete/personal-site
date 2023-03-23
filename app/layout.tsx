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

export const metadata = {
    title: "Federico Giancarelli",
    description: "Maker of things. 🚀",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en" data-bs-theme="light">
            <body>
                <ClientSessionProvider session={session}>
                    <Navbar id="navbar">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto">
                                <NavbarAnchor href="/#" className="text-white">
                                    Home
                                </NavbarAnchor>
                                <NavbarAnchor
                                    href="/#highlights"
                                    className="text-white"
                                >
                                    Highlights
                                </NavbarAnchor>
                                <NavbarAnchor
                                    href="/#experience"
                                    className="text-white"
                                >
                                    Experience
                                </NavbarAnchor>
                                <NavbarAnchor
                                    href="/#projects"
                                    className="text-white"
                                >
                                    Projects
                                </NavbarAnchor>
                                <NavbarAnchor
                                    href="/#contact"
                                    className="text-white"
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
                                        className="text-white"
                                    >
                                        Admin
                                    </NavbarLink>
                                )}
                            </ul>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/cv/Federico_Giancarelli_ES.pdf`}
                                download
                                rel="noreferrer noopener"
                                target="_blank"
                                className="btn btn-primary text-white"
                            >
                                <FaDownload /> CV!
                            </Link>
                        </div>
                    </Navbar>
                    {children}
                </ClientSessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
