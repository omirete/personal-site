import { Database } from "firebase/database";
import GenericDataObjectCtor from "../GenericCtors";

export interface Highlight {
    id: string;
    title: string;
    description: string;
    tags: string[];
}

export default class HighlightsCtor extends GenericDataObjectCtor<Highlight> {
    constructor(db: Database) {
        super(db, "highlights");
    }
}
