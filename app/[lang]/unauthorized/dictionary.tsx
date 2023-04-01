import LoginButton from "@/components/next-auth/LoginButton";
import { Dictionaries } from "@/i18n/types/Dictionaries";
import { ReactNode } from "react";

interface Dictionary {
    niceTry: string;
    goHome: string;
    orSignIn: ReactNode;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        niceTry: "Yeah, right. Nice try. 🤣",
        goHome: "Go home",
        orSignIn: (
            <>
                Or <LoginButton lang="en" className="btn-sm" /> if you are me. 🙄
            </>
        ),
    },
    es: {
        niceTry: "Sí, claro. Buen intento. 🤣",
        goHome: "Ir al inicio",
        orSignIn: (
            <>
                O <LoginButton lang="es" className="btn-sm" /> si sos yo. 🙄
            </>
        ),
    },
    de: {
        niceTry: "Ja, klar. Netter Versuch. 🤣",
        goHome: "Startseite",
        orSignIn: (
            <>
                O <LoginButton lang="de" className="btn-sm" />, wenn du mich bist. 🙄
            </>
        ),
    },
};
