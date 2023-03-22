import { Database } from "firebase/database";
import GenericDataObjectCtor from "../GenericCtors";

export interface Project {
    id: string;
    alias: string;
    name: string;
    description: string;
    fullContent: string;
    tags: string[];
    imgUrl?: string;
}

export default class ProjectsCtor extends GenericDataObjectCtor<Project> {
    constructor(db: Database) {
        super(db, "projects");
    }
}
