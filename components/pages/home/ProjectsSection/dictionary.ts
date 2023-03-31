// import { Dictionary } from "@/i18n/types/Dictionary";

import { Dictionaries } from "@/i18n/types/Dictionaries";

interface Dictionary {
    projects: string;
    explanation: string;
    touchToLearn: string;
    hoverToLearn: string;
    loading: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        projects: "Projects",
        explanation:
            "This is a cherry-picked collection of some of my favorite personal projects.",
        touchToLearn: "Touch each card to learn more! 👇",
        hoverToLearn: "👈 Hover or touch on each card to learn more!",
        loading: "Loading"
    },
    es: {
        projects: "Proyectos",
        explanation:
            "Esta es una selección de mis proyectos personales favoritos.",
        touchToLearn: "Haz clic en cada tarjeta para leer más! 👇",
        hoverToLearn: "👈 Desplázate sobre las tarjetas para leer más!",
        loading: "Cargando",
    },
    de: {
        projects: "Projekte",
        explanation:
            "Dies ist eine Selektion meiner persönlichen Lieblingsprojekte.",
        touchToLearn: "Auf die Kacheln klicken, um mehr zu erfahren! 👇",
        hoverToLearn: "👈 Maus über die Kacheln bewegen, um mehr zu erfahren!",
        loading: "Wird geladen",
    },
};
