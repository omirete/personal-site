import { Dictionaries } from "@/i18n/types/Dictionaries";

interface Dictionary {
    highlights: string;
    touchToLearn: string;
    hoverToLearn: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        highlights: "Highlights",
        touchToLearn: "Touch each card to learn more! 👇",
        hoverToLearn: "Hover or touch on each card to learn more! 👉",
    },
    es: {
        highlights: "Destacado",
        touchToLearn: "Haz clic en cada tarjeta para leer más! 👇",
        hoverToLearn: "Desplázate sobre las tarjetas para leer más! 👉",
    },
    de: {
        highlights: "Highlights",
        touchToLearn: "Auf die Kacheln klicken, um mehr zu erfahren! 👇",
        hoverToLearn: "Maus über die Kacheln bewegen, um mehr zu erfahren! 👉",
    },
};
