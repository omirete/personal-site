import { Dictionaries } from "@/i18n/types/Dictionaries";

interface Dictionary {
    home: string;
    highlights: string;
    experience: string;
    projects: string;
    contact: string;
    admin: string;
    cv: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        home: "Home",
        highlights: "Highlights",
        experience: "Experience",
        projects: "Projects",
        contact: "Contact",
        admin: "Admin",
        cv: "CV",
    },
    es: {
        home: "Inicio",
        highlights: "Destacado",
        experience: "Experiencia",
        projects: "Projectos",
        contact: "Contacto",
        admin: "Admin",
        cv: "CV",
    },
    de: {
        home: "Home",
        highlights: "Höhepunkte",
        experience: "Erfahrung",
        projects: "Projekte",
        contact: "Kontakt",
        admin: "Admin",
        cv: "Lebenslauf",
    },
};
