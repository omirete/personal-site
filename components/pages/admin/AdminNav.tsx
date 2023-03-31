"use client";

import FCi18n from "@/i18n/types/FCi18n";
import LinkInfo from "@/types/DataObjects/LinkInfo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNav: FCi18n = ({ lang }) => {
    const links: Omit<LinkInfo, "id">[] = [
        { url: `/${lang}/admin/files`, text: "Files" },
        { url: `/${lang}/admin/personal-info`, text: "Personal info" },
        { url: `/${lang}/admin/highlights`, text: "Highlights" },
        { url: `/${lang}/admin/experience`, text: "Experience" },
        { url: `/${lang}/admin/projects`, text: "Projects" },
    ];
    const pathname = usePathname();
    return (
        <ul className="nav nav-tabs border-0">
            {links.map((link, i) => {
                return (
                    <li className="nav-item border-0" key={i}>
                        <Link
                            className={`
                                    nav-link link-dark bg-white
                                    border-0 me-1
                                    ${
                                        pathname === link.url
                                            ? "bg-opacity-75"
                                            : "bg-opacity-25 bg-opacity-50-hover"
                                    }
                                `}
                            href={link.url}
                        >
                            {link.text}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default AdminNav;
