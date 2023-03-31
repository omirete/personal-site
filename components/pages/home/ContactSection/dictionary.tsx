// import { Dictionary } from "@/i18n/types/Dictionary";

import { Dictionaries } from "@/i18n/types/Dictionaries";
import { ReactNode } from "react";
import ButtonLaunchContactForm from "./ButtonLaunchContactForm";

interface Dictionary {
    contact: string;
    youMayReachOut: string;
    orYouMaySendMeAMessageWithTheForm: ReactNode;
    myHomeTown: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        contact: "Contact",
        youMayReachOut:
            "If you are interested in collaborating, have some fancy freelancing request, or just want to have a chat about life, you may reach out in any of the networks listed below.",
        orYouMaySendMeAMessageWithTheForm: (
            <>
                Also, if you are a form person, you may use{" "}
                <ButtonLaunchContactForm className="btn btn-dark btn-sm d-inline">
                    ✨ the form ✨
                </ButtonLaunchContactForm>{" "}
                as well. 🥳
            </>
        ),
        myHomeTown: "My home town",
    },
    es: {
        contact: "Contacto",
        youMayReachOut:
            "Si estás interesad@ en colaborar, tienes algún encargo, o solo quieres hablar un rato acerca de lo que sea, puedes contactarte conmigo utilizando cualquiera de las redes que aparecen abajo.",
        orYouMaySendMeAMessageWithTheForm: (
            <>
                Claro, si eres de los formularios, también puedes usar{" "}
                <ButtonLaunchContactForm className="btn btn-dark btn-sm d-inline">
                    ✨ el formulario ✨
                </ButtonLaunchContactForm>
                . 🥳
            </>
        ),
        myHomeTown: "Mi ciudad natal",
    },
    de: {
        contact: "Kontakt",
        youMayReachOut:
            "Falls du Interesse daran hast zu für ein Projekt zusammen zu arbeiten, oder du eine freiberufliche Anfrage hast oder einfach nur über das Leben plaudern möchtest, kontaktiere mich gerne über die unten aufgeführten sozialen Netzwerke.",
        orYouMaySendMeAMessageWithTheForm: (
            <>
                Außerdem, falls du eine Formular-Person bist, kannst du auch
                gerne{" "}
                <ButtonLaunchContactForm className="btn btn-dark btn-sm d-inline">
                    ✨ das Formular ✨
                </ButtonLaunchContactForm>{" "}
                benutzen. 🥳
            </>
        ),
        myHomeTown: "Meine Heimat",
    },
};
