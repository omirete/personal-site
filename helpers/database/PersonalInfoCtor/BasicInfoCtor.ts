import StringI18N from "@/i18n/types/StringI18N";
import { Database } from "firebase/database";
import { PropertyGetterSetterCtor } from "../GenericCtors";

export interface BasicInfo {
    name: string;
    lastName?: string;
    dateOfBirth?: string;
    title?: StringI18N;
    subtitle?: StringI18N;
    description?: StringI18N;
}

export default class BasicInfoCtor {
    ALL: PropertyGetterSetterCtor<BasicInfo>;
    name: PropertyGetterSetterCtor<string>;
    lastName: PropertyGetterSetterCtor<string | undefined>;
    dateOfBirth: PropertyGetterSetterCtor<string | undefined>;
    title: PropertyGetterSetterCtor<string | undefined>;
    subtitle: PropertyGetterSetterCtor<string | undefined>;
    description: PropertyGetterSetterCtor<string | undefined>;

    constructor(db: Database, parent_path: string) {
        const path = `${parent_path}/basicInfo`;
        this.ALL = new PropertyGetterSetterCtor<BasicInfo>(
            db,
            path
        )
        this.name = new PropertyGetterSetterCtor<string>(db, path, "name");
        this.lastName = new PropertyGetterSetterCtor<string | undefined>(
            db,
            path,
            "lastName"
        );
        this.dateOfBirth = new PropertyGetterSetterCtor<string | undefined>(
            db,
            path,
            "dateOfBirth"
        );
        this.title = new PropertyGetterSetterCtor<string | undefined>(
            db,
            path,
            "title"
        );
        this.subtitle = new PropertyGetterSetterCtor<string | undefined>(
            db,
            path,
            "subtitle"
        );
        this.description = new PropertyGetterSetterCtor<string | undefined>(
            db,
            path,
            "subtitle"
        );
    }
}
