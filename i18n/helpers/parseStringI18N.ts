import { i18n, Locale } from "../config";
import StringI18N from "../types/StringI18N";

const parseStringI18N_SingleLang = (
    str: StringI18N,
    lang: Locale
): string | undefined => {
    if (Object.keys(str).includes(lang)) {
        const result = str[lang];
        if (result && result !== "") {
            return result;
        }
    }
};
const parseStringI18N = (str: StringI18N | undefined, lang: Locale): string => {
    if (str) {
        const langOrder = [
            lang,
            i18n.defaultLocale,
            ...i18n.locales.filter(
                (x) => x !== lang && x !== i18n.defaultLocale
            ),
        ];
        let result = "";
        for (let i = 0; i < langOrder.length; i++) {
            result = parseStringI18N_SingleLang(str, langOrder[i]) ?? "";
            if (result !== "") {
                break;
            }
        }
        return result;
    } else {
        return "";
    }
};

export default parseStringI18N;
