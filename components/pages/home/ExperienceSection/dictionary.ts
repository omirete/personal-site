import { Dictionaries } from "@/i18n/types/Dictionaries";

interface Dictionary {
    experience: string;
    viewCertificate: string;
    seeLink: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        experience: "Experience",
        viewCertificate: "View certificate",
        seeLink: "See link"
    },
    es: {
        experience: "Experiencia",
        viewCertificate: "Ver certificado",
        seeLink: "Ver enlace"
    },
    de: {
        experience: "Erfahrung",
        viewCertificate: "Bescheinigung sehen",
        seeLink: "Link ansehen"
    },
};
