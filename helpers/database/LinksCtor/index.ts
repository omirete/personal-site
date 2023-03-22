import LinkInfo from "@/types/DataObjects/LinkInfo";
import { Database } from "firebase/database";
import GenericDataObjectCtor from "../GenericCtors";

export default class LinksCtor extends GenericDataObjectCtor<LinkInfo> {
    constructor(db: Database) {
        super(db, "links");
    }
}
