"use client";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import SignatureLine from "@/assets/svg/signature-line.svg";
import { MdClose, MdMenu } from "react-icons/md";

export interface NavbarProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

interface NavbarState {
    expanded: boolean;
    transitioning: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
    className,
    style,
    children,
    ...props
}) => {
    const [scrolled, setScrolled] = useState(false);
    const [navState, setNavState] = useState<NavbarState>({
        expanded: false,
        transitioning: false,
    });
    useEffect(() => {
        const handleScroll = (e: Event) => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            const navItemsDesktop = document.getElementById(
                "navbar-items-desktop"
            );
            const navItemsMobile = document.getElementById(
                "navbar-items-mobile"
            );
            if (
                navState.expanded &&
                (navItemsMobile?.contains(el) || navItemsDesktop?.contains(el))
            ) {
                setNavState(() => ({
                    expanded: false,
                    transitioning: true,
                }));
            }
        };
        let timeout: NodeJS.Timeout | undefined = undefined;
        if (navState.transitioning) {
            timeout = setTimeout(() => {
                setNavState(() => ({
                    expanded: navState.expanded,
                    transitioning: false,
                }));
            }, 400);
        }
        window.addEventListener("click", handleClick);
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            window.removeEventListener("click", handleClick);
        };
    }, [navState]);

    return (
        <nav
            className={`
                navbar navbar-expand-sm
                position-fixed w-100
                transition-all
                ${scrolled ? "bg-dark bg-opacity-75" : ""}
                ${className}
            `}
            style={{ top: 0, left: 0, zIndex: 9999, ...style }}
            {...props}
        >
            <div className="container-fluid">
                <a className="navbar-brand d-block d-sm-none" href="/#home">
                    <SignatureLine className="fill-white" />
                </a>
                <button
                    className="btn border-0 shadow-none text-white"
                    type="button"
                    aria-expanded={navState.expanded}
                    aria-label="Toggle navigation"
                    onClick={() => {
                        setNavState((prev) => ({
                            expanded: !prev.expanded,
                            transitioning: true,
                        }));
                    }}
                >
                    <MdMenu style={{ width: "1.7em", height: "1.7em" }} />
                </button>
                <div
                    id="navbar-items-desktop"
                    className="collapse navbar-collapse d-none d-sm-block"
                >
                    {children}
                </div>
                <div
                    className={`
                        offcanvas offcanvas-end
                        w-100 border-0 bg-dark
                        d-block d-sm-none
                        ${
                            navState.expanded && navState.transitioning
                                ? "showing"
                                : ""
                        }
                        ${
                            !navState.expanded && navState.transitioning
                                ? "hiding"
                                : ""
                        }
                        ${
                            navState.expanded && !navState.transitioning
                                ? "show"
                                : ""
                        }
                    `}
                    tabIndex={-1}
                >
                    <div className="offcanvas-header pt-2">
                        <a
                            className="offcanvas-title"
                            href="/#home"
                            onClick={() =>
                                setNavState({
                                    expanded: false,
                                    transitioning: true,
                                })
                            }
                        >
                            <SignatureLine className="fill-white" />
                        </a>
                        <button
                            type="button"
                            className="btn border-0 shadow-none text-white"
                            aria-label="Close"
                            onClick={() => {
                                setNavState(() => ({
                                    expanded: false,
                                    transitioning: true,
                                }));
                            }}
                        >
                            <MdClose
                                style={{ width: "1.7em", height: "1.7em" }}
                            />
                        </button>
                    </div>
                    <div
                        id="navbar-items-mobile"
                        className="offcanvas-body fs-4"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
