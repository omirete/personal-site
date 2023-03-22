"use client";

import LinkInfo from "@/types/DataObjects/LinkInfo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNav: React.FC = () => {
    const links: Omit<LinkInfo, "id">[] = [
        { url: "/admin/files", text: "Files" },
        { url: "/admin/personal-info", text: "Personal info" },
        { url: "/admin/links", text: "Links" },
    ];
    const pathname = usePathname();
    return (
        <ul className="nav nav-tabs">
            {links.map((link, i) => {
                return (
                    <li className="nav-item" key={i}>
                        <Link
                            className={`
                                    nav-link
                                    ${pathname === link.url ? "active" : ""}
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
