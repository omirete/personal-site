import { Dictionaries } from "@/i18n/types/Dictionaries";

interface Dictionary {
    siteDescription: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        siteDescription: "Maker of things, dev, amazed by the world 🚀",
    },
    es: {
        siteDescription: "Creador, dev, maravillado por el mundo 🚀",
    },
    de: {
        siteDescription: "Maker of things, Entwickler, fasziniert von der Welt 🚀",
    },
};
