import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

const NavbarLink: React.FC<
    LinkProps & { className?: string; children: ReactNode }
> = ({ className, children, ...props }) => {
    return (
        <li className="nav-item rounded">
            <Link className={`nav-link fw-bold ${className ?? ""}`} {...props}>
                {children}
            </Link>
        </li>
    );
};

export default NavbarLink;
