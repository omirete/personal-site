import { Database } from "firebase/database";
import { PropertyGetterSetterCtor } from "../GenericCtors";

export interface ContactInfo {
    email: string;
    phone?: string;
}

export default class ContactInfoCtor {
    ALL: PropertyGetterSetterCtor<ContactInfo>;
    email: PropertyGetterSetterCtor<string>;
    phone: PropertyGetterSetterCtor<string | undefined>;

    constructor(db: Database, parent_path: string) {
        const path = `${parent_path}/contactInfo`;
        this.ALL = new PropertyGetterSetterCtor<ContactInfo>(db, path);
        this.email = new PropertyGetterSetterCtor<string>(db, path, "email");
        this.phone = new PropertyGetterSetterCtor<string | undefined>(
            db,
            path,
            "phone"
        );
    }
}
