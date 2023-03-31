import StringI18N from "@/i18n/types/StringI18N";
import { Database } from "firebase/database";
import GenericDataObjectCtor from "../GenericCtors";

export type SupportedExperienceTypes = "work" | "studies";

export interface Experience {
    id: string;
    institution: string;
    relevantUrl?: string;
    title: StringI18N;
    dateFrom: string;
    dateTo?: string;
    description?: StringI18N;
    type: SupportedExperienceTypes;
    tags: string[];
}

export default class ExperienceCtor extends GenericDataObjectCtor<Experience> {
    constructor(db: Database) {
        super(db, "experience");
    }
}
