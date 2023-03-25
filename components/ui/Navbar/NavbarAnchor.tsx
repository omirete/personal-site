import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

const NavbarAnchor: React.FC<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = ({ className, children, ...props }) => {
    return (
        <li className="nav-item rounded">
            <a className={`nav-link ${className ?? ""}`} {...props}>
                {children}
            </a>
        </li>
    );
};

export default NavbarAnchor;
