import StringI18N from "@/i18n/types/StringI18N";
import { Database } from "firebase/database";
import GenericDataObjectCtor from "../GenericCtors";

export interface Highlight {
    id: string;
    title: StringI18N;
    description?: StringI18N;
}

export default class HighlightsCtor extends GenericDataObjectCtor<Highlight> {
    constructor(db: Database) {
        super(db, "highlights");
    }
}
