import { Locale } from "../config";

export default interface IntlString
    extends Record<Locale, string | undefined> {}
