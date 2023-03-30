import StringI18N from "@/i18n/types/StringI18N";
import { Database } from "firebase/database";
import GenericDataObjectCtor from "../GenericCtors";

export interface Project {
    id: string;
    alias: string;
    name: StringI18N;
    description: StringI18N;
    fullContent: StringI18N;
    tags: string[];
    imgUrl?: string;
}

export default class ProjectsCtor extends GenericDataObjectCtor<Project> {
    constructor(db: Database) {
        super(db, "projects");
    }
}
