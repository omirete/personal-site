import { Dictionaries } from "@/i18n/types/Dictionaries";

interface Dictionary {
    hello: string;
    iamName: (name: string) => string;
    seeMore: string;
    profilePictureAlt: string;
}

export const dict: Dictionaries<Dictionary> = {
    en: {
        hello: "Hello,",
        iamName: (name) => `I am ${name}`,
        seeMore: "See more",
        profilePictureAlt: "Profile picture"
    },
    es: {
        hello: "Hola,",
        iamName: (name) => `Soy ${name}`,
        seeMore: "Ver más",
        profilePictureAlt: "Imagen de perfil"
    },
    de: {
        hello: "Hallo,",
        iamName: (name) => `Ich bin ${name}`,
        seeMore: "Mehr",
        profilePictureAlt: "Profil Bild"
    },
};
