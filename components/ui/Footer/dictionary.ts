import { Dictionaries } from "@/i18n/types/Dictionaries";

interface Dictionary {
    sourceCodeAvailableOn: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        sourceCodeAvailableOn: "Source code available on",
    },
    es: {
        sourceCodeAvailableOn: "Código fuente disponible en",
    },
    de: {
        sourceCodeAvailableOn: "Quellcode verfübar auf",
    },
};
