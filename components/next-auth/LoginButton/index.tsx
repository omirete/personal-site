"use client";

import { i18n } from "@/i18n/config";
import FCi18n from "@/i18n/types/FCi18n";
import { useSession, signIn, signOut } from "next-auth/react";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { dict } from "./dictionary";

export type LoginButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const LoginButton: FCi18n<LoginButtonProps> = ({
    lang,
    className,
    ...props
}) => {
    const { data: session } = useSession();
    const localeDict = dict[lang] ?? dict[i18n.defaultLocale];
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
