import { Locale } from "../config";
import StringI18N from "../types/StringI18N";

const buildStringI18N = (
    lang: Locale,
    str?: string
): StringI18N | undefined => {
    if (str !== undefined) {
        let newStr = {} as StringI18N;
        newStr[lang] = str;
        return newStr;
    }
    return undefined;
};

export default buildStringI18N;
