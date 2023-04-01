import LoginButton from "@/components/next-auth/LoginButton";
import { Dictionaries } from "@/i18n/types/Dictionaries";
import { ReactNode } from "react";

interface Dictionary {
    signIn: string;
    signOut: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        signIn: "Sign in",
        signOut: "Sign out",
    },
    es: {
        signIn: "Iniciar sesión",
        signOut: "Cerrar sessión",
    },
    de: {
        signIn: "Einloggen",
        signOut: "Ausloggen",
    },
};
