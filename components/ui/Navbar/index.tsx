"use client";
import {
    DetailedHTMLProps,
    HTMLAttributes,
    useEffect,
    useState,
} from "react";

export interface NavbarProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

const Navbar: React.FC<NavbarProps> = ({
    className,
    style,
    children,
    ...props
}) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = (e: Event) => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <nav
            className={`
                navbar navbar-expand-sm
                position-fixed w-100
                transition-all
                ${scrolled ? "bg-dark bg-opacity-25" : ""}
                ${className}
            `}
            style={{ top: 0, left: 0, zIndex: 9999, ...style }}
            {...props}
        >
            <div className="container-fluid">{children}</div>
        </nav>
    );
};
export default Navbar;
