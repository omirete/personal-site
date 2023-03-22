import { Database } from "firebase/database";
import GenericDataObjectCtor from "../GenericCtors";

export interface Experience {
    id: string;
    company: string;
    companyUrl?: string;
    position: string;
    dateFrom: string;
    dateTo?: string;
    description?: string;
    tags: string[];
}

export default class ExperienceCtor extends GenericDataObjectCtor<Experience> {
    constructor(db: Database) {
        super(db, "experience");
    }
}
