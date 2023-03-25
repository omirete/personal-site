"use client";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import SignatureLine from "@/assets/svg/signature-line.svg";
import { MdClose } from "react-icons/md";

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
        let timeout: NodeJS.Timeout | undefined = undefined;
        if (navState.transitioning) {
            timeout = setTimeout(() => {
                setNavState(() => ({
                    expanded: navState.expanded,
                    transitioning: false,
                }));
            }, 400);
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
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
                <button
                    className="navbar-toggler border-0"
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
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-none d-sm-block">{children}</div>
                <div
                    className={`
                        offcanvas offcanvas-end bg-dark d-block d-sm-none
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
                    <div className="offcanvas-header">
                        <div className="offcanvas-title">
                            <SignatureLine className="fill-white" />
                        </div>
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
                            <MdClose />
                        </button>
                    </div>
                    <div className="offcanvas-body fs-4">{children}</div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
