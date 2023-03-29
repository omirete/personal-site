import LangSelector from "@/components/ui/LangSelector";
import Navbar from "@/components/ui/Navbar";
import NavbarAnchor from "@/components/ui/Navbar/NavbarAnchor";
import NavbarLink from "@/components/ui/Navbar/NavbarLink";
import FCi18n from "@/i18n/types/FCi18n";
import { Session } from "next-auth";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { dict } from "./dictionary";

const MyNavbar: FCi18n<{ session: Session | null }> = ({ session, lang }) => {
    const linkClasses = "text-white fw-sm-bold";
    const localeDict = dict[lang];
    return (
        <Navbar id="navbar">
            <ul className="navbar-nav me-auto">
                <NavbarAnchor href="#" className={linkClasses}>
                    {localeDict.home}
                </NavbarAnchor>
                <NavbarAnchor href="#highlights" className={linkClasses}>
                    {localeDict.highlights}
                </NavbarAnchor>
                <NavbarAnchor href="#experience" className={linkClasses}>
                    {localeDict.experience}
                </NavbarAnchor>
                <NavbarAnchor href="#projects" className={linkClasses}>
                    {localeDict.projects}
                </NavbarAnchor>
                <NavbarAnchor href="#contact" className={linkClasses}>
                    {localeDict.contact}
                </NavbarAnchor>
                {/* <NavbarLink href="/chat">
                    Chat with "me" now! (AI)
                </NavbarLink> */}
                {/* <NavbarLink href="/playground">Playground</NavbarLink> */}
                {session && (
                    <NavbarLink href="/admin/files" className={linkClasses}>
                        {localeDict.admin}
                    </NavbarLink>
                )}
            </ul>
            <div
                className={`
                    mt-3 mt-md-0 me-0 me-md-2
                `}
            >
                <Link
                    href={`${
                        process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL
                    }/cv/Federico_Giancarelli_${lang.toUpperCase()}.pdf`}
                    download
                    rel="noreferrer noopener"
                    target="_blank"
                    className={`
                    btn px-2 py-1 btn-primary text-white text-nowrap
                `}
                >
                    <span className="d-none d-md-block">
                        <FaDownload /> {localeDict.cv}
                    </span>
                    <span className="d-block d-md-none fs-4">
                        <FaDownload /> {localeDict.cv}
                    </span>
                </Link>
            </div>
            <div className="mt-4 mt-md-0">
                <LangSelector lang={lang} className="" />
            </div>
        </Navbar>
    );
};

export default MyNavbar;
