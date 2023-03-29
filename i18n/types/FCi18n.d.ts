import { Locale, i18n } from "../config";

type FCi18n<P = {}> = React.FC<P & { lang: Locale }>;

export default FCi18n;
