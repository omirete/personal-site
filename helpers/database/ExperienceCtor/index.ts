import { Database } from "firebase/database";
import GenericDataObjectCtor from "../GenericCtors";

export type SupportedExperienceTypes = "work" | "studies";

export interface Experience {
    id: string;
    institution: string;
    relevantUrl?: string;
    title: string;
    dateFrom: string;
    dateTo?: string;
    description?: string;
    type: SupportedExperienceTypes;
    tags: string[];
}

export default class ExperienceCtor extends GenericDataObjectCtor<Experience> {
    constructor(db: Database) {
        super(db, "experience");
    }
}
