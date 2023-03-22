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
                                <NavbarAnchor href="/#">Home</NavbarAnchor>
                                <NavbarAnchor href="/#highlights">
                                    Highlights
                                </NavbarAnchor>
                                <NavbarAnchor href="/#experience">
                                    Experience
                                </NavbarAnchor>
                                <NavbarAnchor href="/#projects">
                                    Projects
                                </NavbarAnchor>
                                <NavbarAnchor href="/#contact">
                                    Contact
                                </NavbarAnchor>
                                {/* <NavbarLink href="/chat">
                                    Chat with "me" now! (AI)
                                </NavbarLink> */}
                                {/* <NavbarLink href="/playground">Playground</NavbarLink> */}
                                {session && (
                                    <NavbarLink href="/admin/files">Admin</NavbarLink>
                                )}
                            </ul>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/cv/Federico_Giancarelli_ES.pdf`}
                                download
                                rel="noreferrer noopener"
                                target="_blank"
                                className="btn btn-primary"
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
