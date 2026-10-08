"use client";

import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import { useSession, signIn, signOut } from "next-auth/react";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export type LoginButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const LoginButton: FC<{ lang: Locale; dictionary: Dictionary["loginButton"] } & LoginButtonProps> = ({ dictionary,
    lang,
    className,
    ...props
}) => {
    const { data: session } = useSession();
    const localeDict = dictionary;
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
