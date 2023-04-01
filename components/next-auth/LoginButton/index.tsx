"use client";

import { Locale } from "@/i18n/config";
import { useSession, signIn, signOut } from "next-auth/react";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { dict } from "./dictionary";

export type LoginButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    Partial<{ lang?: Locale }>;

const LoginButton: React.FC<LoginButtonProps> = ({
    lang,
    className,
    ...props
}) => {
    const { data: session } = useSession();
    const localeDict = dict[lang ?? "en"];
    if (session) {
        return (
            <button
                onClick={() => signOut()}
                className={`btn btn-secondary ${className ?? ""}`}
                {...props}
            >
                {localeDict.signOut}
            </button>
        );
    }
    return (
        <button
            onClick={() => signIn()}
            className={`btn btn-primary ${className ?? ""}`}
            {...props}
        >
            {localeDict.signIn}
        </button>
    );
};

export default LoginButton;
