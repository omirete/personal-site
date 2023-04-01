import { Dictionaries } from "@/i18n/types/Dictionaries";

interface Dictionary {
    followMeOn: string;
    sendMeAMessageOver: string;
    sendMeAnEmail: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        followMeOn: "Follow me on",
        sendMeAMessageOver: "Send me a message over",
        sendMeAnEmail: "Send me an email!",
    },
    es: {
        followMeOn: "Seguime en",
        sendMeAMessageOver: "Envíame un mensaje por",
        sendMeAnEmail: "Envíame un email!",
    },
    de: {
        followMeOn: "Folge mich auf",
        sendMeAMessageOver: "Schicke mir eine Nachricht über",
        sendMeAnEmail: "Schicke mir eine E-Mail!",
    },
};
