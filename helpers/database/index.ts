import { Database } from "firebase/database";
import ExperienceCtor from "./ExperienceCtor";
import HighlightsCtor from "./HighlightsCtor";
import LinksCtor from "./LinksCtor";
import PersonalInfoCtor from "./PersonalInfoCtor";
import ProjectsCtor from "./ProjectsCtor";

export default class DataObjects {
    projects: ProjectsCtor;
    links: LinksCtor;
    personalInfo: PersonalInfoCtor;
    experience: ExperienceCtor;
    highlights: HighlightsCtor;
    constructor(db: Database) {
        this.projects = new ProjectsCtor(db);
        this.links = new LinksCtor(db);
        this.personalInfo = new PersonalInfoCtor(db);
        this.experience = new ExperienceCtor(db);
        this.highlights = new HighlightsCtor(db);
    }
}
